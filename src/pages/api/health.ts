import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import { Resend } from 'resend'
import { withTimeout } from '@/lib/apiHelpers'

const resend = new Resend(process.env.RESEND_API_KEY)

// Called daily by Vercel Cron (vercel.json). Alerts by email when the KV
// store is unreachable, so a dead database can no longer go unnoticed.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ error: 'Nicht autorisiert' })
  }

  let kvOk = false
  let detail = ''
  try {
    const probeKey = `health:${Date.now()}`
    await withTimeout(kv.set(probeKey, 'ok', { ex: 60 }), 3000)
    const value = await withTimeout(kv.get(probeKey), 3000)
    kvOk = value === 'ok'
    if (!kvOk) detail = 'Probe-Wert nicht zurücklesbar'
  } catch (error) {
    detail = error instanceof Error ? error.message : String(error)
  }

  if (!kvOk) {
    try {
      await resend.emails.send({
        from: 'Hof Gabathuler <noreply@hof-gabathuler.ch>',
        to: 'zwahlen.st@tcnet.ch',
        subject: 'ALARM hof-gabathuler.ch: Datenbank nicht erreichbar',
        text: `Der tägliche Gesundheitscheck von hof-gabathuler.ch meldet ein Problem:

Die Datenbank (Upstash Redis / KV) ist nicht erreichbar.
Fehler: ${detail}

Folgen, solange das Problem besteht:
- Preise und Schlachttermine laufen auf einprogrammierten Standardwerten
- Speichern im Admin-Bereich funktioniert nicht
- Bestell- und Kontaktformular funktionieren weiterhin (E-Mail-Versand)

Prüfen: Vercel-Dashboard -> Storage -> Upstash for Redis -> Verbindung zum Projekt hof-familie-gabathuler.
`,
      })
    } catch (error) {
      console.error('Health alert email failed:', error)
    }
  }

  return res.status(kvOk ? 200 : 503).json({
    kv: kvOk ? 'ok' : 'down',
    ...(detail && { detail }),
  })
}

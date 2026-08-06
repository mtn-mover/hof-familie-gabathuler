import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import { Resend } from 'resend'
import { withTimeout } from '@/lib/apiHelpers'

const resend = new Resend(process.env.RESEND_API_KEY)

// incr proves connectivity and write access in a single atomic request —
// unlike the previous set-then-get probe there is no read-after-write race
// with replicated stores, which caused false alarms while the DB was healthy
async function probeKv(): Promise<{ ok: boolean; detail: string }> {
  try {
    const count = await withTimeout(kv.incr('health:probe-counter'), 4000)
    if (typeof count === 'number' && count > 0) {
      await withTimeout(kv.expire('health:probe-counter', 172800), 4000).catch(() => {})
      return { ok: true, detail: '' }
    }
    return { ok: false, detail: `Unerwartete Antwort: ${String(count)}` }
  } catch (error) {
    return { ok: false, detail: error instanceof Error ? error.message : String(error) }
  }
}

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

  let probe = await probeKv()
  if (!probe.ok) {
    // One in-run retry so a transient hiccup does not send an alert
    await new Promise((resolve) => setTimeout(resolve, 1000))
    probe = await probeKv()
  }
  const kvOk = probe.ok
  const detail = probe.detail

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

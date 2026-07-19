import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'
import { clip, isValidEmail, rateLimit } from '@/lib/apiHelpers'

const resend = new Resend(process.env.RESEND_API_KEY)

type ContactResponse = {
  success?: boolean
  message?: string
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!(await rateLimit(req, 'contact', 5, 600))) {
    return res
      .status(429)
      .json({ error: 'Zu viele Anfragen. Bitte versuchen Sie es in ein paar Minuten erneut.' })
  }

  const raw = req.body ?? {}

  // Honeypot: bots fill every field; real users never see this one
  if (clip(raw.firma, 100)) {
    return res.status(200).json({ success: true, message: 'Nachricht erfolgreich gesendet' })
  }

  const name = clip(raw.name, 120)
  const email = clip(raw.email, 254)
  const phone = clip(raw.phone, 50)
  const message = clip(raw.message, 5000)

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Bitte füllen Sie alle Pflichtfelder aus' })
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse an' })
  }

  try {
    // Send email to Gabathuler — resend v6 reports API errors via `error`, it does not throw
    const { error: farmEmailError } = await resend.emails.send({
      from: 'Hof Gabathuler <noreply@hof-gabathuler.ch>',
      to: 'info@hof-gabathuler.ch',
      replyTo: email,
      subject: `Kontaktanfrage von ${name}`,
      text: `
NEUE KONTAKTANFRAGE - Hof Familie Gabathuler
==========================================

Name: ${name}
E-Mail: ${email}
Telefon: ${phone || 'Nicht angegeben'}

NACHRICHT:
${message}

==========================================
Anfrage eingegangen am: ${new Date().toLocaleString('de-CH')}
`,
    })

    if (farmEmailError) {
      console.error('Contact form email error:', farmEmailError)
      return res.status(500).json({
        error: 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.',
      })
    }

    // Send confirmation to sender; a failure here must not fail the request
    const confirmResult = await resend.emails.send({
      from: 'Hof Gabathuler <noreply@hof-gabathuler.ch>',
      to: email,
      subject: 'Ihre Anfrage bei Hof Familie Gabathuler',
      text: `Guten Tag ${name},

Vielen Dank für Ihre Nachricht!

Wir haben Ihre Anfrage erhalten und werden uns so bald wie möglich bei Ihnen melden.

Bei dringenden Fragen erreichen Sie uns unter:
- Telefon: 079 640 01 83
- E-Mail: info@hof-gabathuler.ch

Freundliche Grüsse
Familie Gabathuler-Risch

---
Ihre Nachricht:
${message}
`,
    }).catch((error: unknown) => {
      console.error('Contact confirmation email error:', error)
      return null
    })

    if (confirmResult?.error) {
      console.error('Contact confirmation email error:', confirmResult.error)
    }

    return res.status(200).json({
      success: true,
      message: 'Nachricht erfolgreich gesendet',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({
      error: 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.',
    })
  }
}

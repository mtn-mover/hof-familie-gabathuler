import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type ContactRequest = {
  name: string
  email: string
  phone?: string
  message: string
}

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

  const { name, email, phone, message }: ContactRequest = req.body

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Bitte füllen Sie alle Pflichtfelder aus' })
  }

  try {
    // Send email to Gabathuler
    await resend.emails.send({
      from: 'Hof Gabathuler <noreply@hof-gabathuler.ch>',
      to: 'jann_gaba@hotmail.ch',
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

    // Send confirmation to sender
    await resend.emails.send({
      from: 'Hof Gabathuler <noreply@hof-gabathuler.ch>',
      to: email,
      subject: 'Ihre Anfrage bei Hof Familie Gabathuler',
      text: `Guten Tag ${name},

Vielen Dank für Ihre Nachricht!

Wir haben Ihre Anfrage erhalten und werden uns so bald wie möglich bei Ihnen melden.

Bei dringenden Fragen erreichen Sie uns unter:
- Telefon: 079 640 01 83
- E-Mail: jann_gaba@hotmail.ch

Freundliche Grüsse
Familie Gabathuler-Risch

---
Ihre Nachricht:
${message}
`,
    })

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

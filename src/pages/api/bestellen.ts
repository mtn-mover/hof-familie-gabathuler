import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type Bestellung = {
  // Customer data
  name: string
  adresse: string
  plzOrt: string
  telefon: string
  email: string

  // Order details
  liefertermin: string
  mischpaketGroesse?: '10' | '15' | '20' | ''
  portionsgroesse?: string

  // Special requests
  mehrGehacktes: boolean
  bratenAufteilen: boolean
  bratenAufteilungDetails?: string

  // Individual items
  einzelbestellungen?: {
    fleischstueck: string
    portionen: number
    gramm: number
  }[]
}

type BestellungResponse = {
  success?: boolean
  message?: string
  error?: string
}

function formatBestellung(bestellung: Bestellung): string {
  let text = `
NEUE BESTELLUNG - Hof Familie Gabathuler
==========================================

KUNDENDATEN:
- Name: ${bestellung.name}
- Adresse: ${bestellung.adresse}
- PLZ/Ort: ${bestellung.plzOrt}
- Telefon: ${bestellung.telefon}
- E-Mail: ${bestellung.email}

LIEFERTERMIN: ${bestellung.liefertermin}
`

  if (bestellung.mischpaketGroesse) {
    text += `
MISCHPAKET:
- Grösse: ${bestellung.mischpaketGroesse} kg
- Portionsgrösse: ${bestellung.portionsgroesse || 'Standard'} g
`
  }

  if (bestellung.mehrGehacktes || bestellung.bratenAufteilen) {
    text += `
SONDERWÜNSCHE:
`
    if (bestellung.mehrGehacktes) {
      text += `- Anstelle von Siedfleisch mehr Gehacktes
`
    }
    if (bestellung.bratenAufteilen) {
      text += `- Braten aufteilen: ${bestellung.bratenAufteilungDetails || 'Keine Details angegeben'}
`
    }
  }

  if (bestellung.einzelbestellungen && bestellung.einzelbestellungen.length > 0) {
    text += `
EINZELBESTELLUNGEN:
`
    bestellung.einzelbestellungen.forEach((item) => {
      if (item.portionen > 0) {
        text += `- ${item.fleischstueck}: ${item.portionen} Portionen à ${item.gramm}g
`
      }
    })
  }

  text += `
==========================================
Bestellung eingegangen am: ${new Date().toLocaleString('de-CH')}
`

  return text
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BestellungResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const bestellung: Bestellung = req.body

  // Validate required fields
  if (!bestellung.name || !bestellung.email || !bestellung.liefertermin) {
    return res.status(400).json({ error: 'Bitte füllen Sie alle Pflichtfelder aus' })
  }

  try {
    const bestellungText = formatBestellung(bestellung)

    // Send email to Gabathuler
    await resend.emails.send({
      from: 'Hof Gabathuler <noreply@resend.dev>',
      to: 'jogari@outlook.ch',
      subject: `Neue Bestellung von ${bestellung.name}`,
      text: bestellungText,
    })

    // Send confirmation to customer
    await resend.emails.send({
      from: 'Hof Gabathuler <noreply@resend.dev>',
      to: bestellung.email,
      subject: 'Ihre Bestellung bei Hof Familie Gabathuler',
      text: `Guten Tag ${bestellung.name},

Vielen Dank für Ihre Bestellung!

Wir haben Ihre Bestellung erhalten und werden diese prüfen.
Sie werden von uns kontaktiert, sobald wir Ihre Bestellung bearbeitet haben.

Bei Fragen erreichen Sie uns unter:
- Telefon: 081 302 23 19
- E-Mail: jogari@outlook.ch

Freundliche Grüsse
Familie Gabathuler-Risch

---
Ihre Bestellung:
${bestellungText}
`,
    })

    return res.status(200).json({
      success: true,
      message: 'Bestellung erfolgreich gesendet',
    })
  } catch (error) {
    console.error('Bestellung error:', error)
    return res.status(500).json({
      error: 'Fehler beim Senden der Bestellung. Bitte versuchen Sie es später erneut.',
    })
  }
}

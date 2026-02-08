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
  mitteilung?: string

  // Order details
  liefertermin: string
  mischpaketGroesse?: '10' | '15' | '20' | ''
  portionsgroesse?: string

  // Special requests
  mehrGehacktes: boolean
  bratenAufteilung?: string[] // Array of selected options: 'Braten', 'Plätzli für Fleischvögel', 'Saftplätzli'

  // Individual items
  einzelbestellungen?: {
    fleischstueck: string
    portionen: number
    portionsgroesse: string
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

  if (bestellung.mehrGehacktes || (bestellung.bratenAufteilung && bestellung.bratenAufteilung.length > 0)) {
    text += `
SONDERWÜNSCHE:
`
    if (bestellung.mehrGehacktes) {
      text += `- Anstelle von Siedfleisch mehr Gehacktes
`
    }
    if (bestellung.bratenAufteilung && bestellung.bratenAufteilung.length > 0) {
      text += `- Braten aufteilen in: ${bestellung.bratenAufteilung.join(', ')}
`
    }
  }

  if (bestellung.einzelbestellungen && bestellung.einzelbestellungen.length > 0) {
    const activeItems = bestellung.einzelbestellungen.filter((item) => item.portionen > 0)
    if (activeItems.length > 0) {
      text += `
EINZELBESTELLUNGEN:
`
      activeItems.forEach((item) => {
        text += `- ${item.fleischstueck}: ${item.portionen} Portionen (${item.portionsgroesse})
`
      })
    }
  }

  if (bestellung.mitteilung) {
    text += `
MITTEILUNG DES KUNDEN:
${bestellung.mitteilung}
`
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
      to: 'jann_gaba@hotmail.ch',
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
- Telefon: 079 640 01 83
- E-Mail: jann_gaba@hotmail.ch

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

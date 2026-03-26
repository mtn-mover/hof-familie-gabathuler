import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'
import { kv } from '@vercel/kv'
import type { Preise } from './preise'

const resend = new Resend(process.env.RESEND_API_KEY)

const fleischstuecke = [
  { key: 'siedfleisch', label: 'Siedfleisch' },
  { key: 'gehacktes', label: 'Gehacktes' },
  { key: 'geschnetzeltes', label: 'Geschnetzeltes' },
  { key: 'voressen', label: 'Voressen' },
  { key: 'braten', label: 'Braten' },
  { key: 'fleischvogelPlaetzli', label: 'Fleischvögel Plätzli' },
  { key: 'saftplaetzli', label: 'Saftplätzli' },
  { key: 'plaetzli', label: 'Plätzli' },
  { key: 'steak', label: 'Steak' },
  { key: 'huft', label: 'Huft' },
  { key: 'filet', label: 'Filet' },
  { key: 'leber', label: 'Leber' },
]

const portionsgroessen = [
  { value: 'mittel', label: 'ca. 250g (2 Personen pro Pack)', gramm: 250 },
  { value: 'gross', label: 'ca. 500g (4 Personen pro Pack)', gramm: 500 },
]

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

    // Fetch prices for confirmation email
    let preise = await kv.get<Preise>('preise')
    if (!preise) {
      preise = {
        mischpaketProKg: 29.0,
        einzelpreise: {
          siedfleisch: 21.0, gehacktes: 21.0, geschnetzeltes: 35.0,
          voressen: 25.0, braten: 32.0, fleischvogelPlaetzli: 32.0,
          saftplaetzli: 34.0, plaetzli: 45.0, steak: 57.0,
          huft: 65.0, filet: 75.0, leber: 21.0,
        },
      }
    }

    // Calculate prices
    const mischpaketKg = bestellung.mischpaketGroesse ? parseInt(bestellung.mischpaketGroesse) : 0
    const mischpaketTotal = mischpaketKg * preise.mischpaketProKg

    let einzelTotal = 0
    const einzelDetails: string[] = []
    if (bestellung.einzelbestellungen) {
      bestellung.einzelbestellungen.forEach((item) => {
        if (item.portionen > 0) {
          const fleischItem = fleischstuecke.find((f) => f.label === item.fleischstueck)
          if (fleischItem) {
            const pricePerKg = preise!.einzelpreise[fleischItem.key as keyof typeof preise.einzelpreise] || 0
            const selectedSize = portionsgroessen.find((p) => p.label === item.portionsgroesse)
            const grammPerPortion = selectedSize?.gramm || 250
            const totalKg = (item.portionen * grammPerPortion) / 1000
            const itemTotal = totalKg * pricePerKg
            einzelTotal += itemTotal
            einzelDetails.push(`  ${item.fleischstueck}: ${item.portionen} x ${item.portionsgroesse} = ${totalKg.toFixed(1)} kg x CHF ${pricePerKg.toFixed(2)}/kg = CHF ${itemTotal.toFixed(2)}`)
          }
        }
      })
    }

    const gesamt = mischpaketTotal + einzelTotal

    // Build price summary
    let preisSummary = `
PREISÜBERSICHT:
`
    if (mischpaketKg > 0) {
      preisSummary += `  Mischpaket ${mischpaketKg} kg x CHF ${preise.mischpaketProKg.toFixed(2)}/kg = CHF ${mischpaketTotal.toFixed(2)}
`
    }
    if (einzelDetails.length > 0) {
      preisSummary += einzelDetails.join('\n') + '\n'
    }
    preisSummary += `
  TOTAL: CHF ${gesamt.toFixed(2)}
`

    // Send email to Gabathuler
    await resend.emails.send({
      from: 'Hof Gabathuler <noreply@hof-gabathuler.ch>',
      to: 'info@hof-gabathuler.ch',
      subject: `Neue Bestellung von ${bestellung.name}`,
      text: bestellungText + preisSummary,
    })

    // Send confirmation to customer
    await resend.emails.send({
      from: 'Hof Gabathuler <noreply@hof-gabathuler.ch>',
      to: bestellung.email,
      subject: 'Ihre Bestellung bei Hof Familie Gabathuler',
      text: `Guten Tag ${bestellung.name},

Vielen Dank für Ihre Bestellung!

Wir haben Ihre Bestellung erhalten und werden diese prüfen.
Sie werden von uns kontaktiert, sobald wir Ihre Bestellung bearbeitet haben.

Bei Fragen erreichen Sie uns unter:
- Telefon: 079 640 01 83
- E-Mail: info@hof-gabathuler.ch

Freundliche Grüsse
Familie Gabathuler-Risch

---
Ihre Bestellung:
${bestellungText}
${preisSummary}
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

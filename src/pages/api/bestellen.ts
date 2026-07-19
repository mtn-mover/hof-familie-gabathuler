import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'
import { kv } from '@vercel/kv'
import { defaultPreise, type Preise } from './preise'
import { clip, isValidEmail, rateLimit, withTimeout } from '@/lib/apiHelpers'

const resend = new Resend(process.env.RESEND_API_KEY)

const bratenOptionen = ['Braten', 'Plätzli für Fleischvögel', 'Saftplätzli']

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

  if (!(await rateLimit(req, 'bestellen', 5, 600))) {
    return res
      .status(429)
      .json({ error: 'Zu viele Anfragen. Bitte versuchen Sie es in ein paar Minuten erneut.' })
  }

  const raw = req.body ?? {}

  // Honeypot: bots fill every field; real users never see this one
  if (clip(raw.firma, 100)) {
    return res.status(200).json({ success: true, message: 'Bestellung erfolgreich gesendet' })
  }

  const fleischLabels = fleischstuecke.map((f) => f.label)
  const portionsLabels = portionsgroessen.map((p) => p.label)

  const rawEinzel = (Array.isArray(raw.einzelbestellungen) ? raw.einzelbestellungen : []) as Array<{
    fleischstueck?: unknown
    portionen?: unknown
    portionsgroesse?: unknown
  }>

  const einzelbestellungen = rawEinzel
    .slice(0, 30)
    .map((item) => ({
      fleischstueck:
        typeof item?.fleischstueck === 'string' && fleischLabels.includes(item.fleischstueck)
          ? item.fleischstueck
          : '',
      portionen:
        typeof item?.portionen === 'number' && Number.isInteger(item.portionen) && item.portionen > 0
          ? Math.min(item.portionen, 999)
          : 0,
      portionsgroesse:
        typeof item?.portionsgroesse === 'string' && portionsLabels.includes(item.portionsgroesse)
          ? item.portionsgroesse
          : portionsgroessen[0].label,
    }))
    .filter((item) => item.fleischstueck && item.portionen > 0)

  const bestellung: Bestellung = {
    name: clip(raw.name, 120),
    adresse: clip(raw.adresse, 200),
    plzOrt: clip(raw.plzOrt, 100),
    telefon: clip(raw.telefon, 50),
    email: clip(raw.email, 254),
    mitteilung: clip(raw.mitteilung, 2000),
    liefertermin: clip(raw.liefertermin, 100),
    mischpaketGroesse: ['10', '15', '20'].includes(raw.mischpaketGroesse)
      ? raw.mischpaketGroesse
      : '',
    portionsgroesse: portionsLabels.includes(raw.portionsgroesse) ? raw.portionsgroesse : '',
    mehrGehacktes: raw.mehrGehacktes === true,
    bratenAufteilung: (Array.isArray(raw.bratenAufteilung) ? raw.bratenAufteilung : []).filter(
      (option: unknown): option is string =>
        typeof option === 'string' && bratenOptionen.includes(option)
    ),
    einzelbestellungen,
  }

  if (!bestellung.name || !bestellung.email || !bestellung.liefertermin) {
    return res.status(400).json({ error: 'Bitte füllen Sie alle Pflichtfelder aus' })
  }

  if (!isValidEmail(bestellung.email)) {
    return res.status(400).json({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse an' })
  }

  if (!bestellung.mischpaketGroesse && einzelbestellungen.length === 0) {
    return res
      .status(400)
      .json({ error: 'Bitte wählen Sie ein Mischpaket oder mindestens ein Fleischstück aus' })
  }

  try {
    const bestellungText = formatBestellung(bestellung)

    // Fetch prices for confirmation email; a KV outage must not block the order
    let preise: Preise = defaultPreise
    try {
      const stored = await withTimeout(kv.get<Preise>('preise'), 1500)
      if (stored) preise = stored
    } catch (error) {
      console.error('Preise fetch failed, using defaults:', error)
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
            const pricePerKg = preise.einzelpreise[fleischItem.key as keyof typeof preise.einzelpreise] || 0
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

    // Send email to Gabathuler — resend v6 reports API errors via `error`, it does not throw
    const { error: farmEmailError } = await resend.emails.send({
      from: 'Hof Gabathuler <noreply@hof-gabathuler.ch>',
      to: 'info@hof-gabathuler.ch',
      replyTo: bestellung.email,
      subject: `Neue Bestellung von ${bestellung.name}`,
      text: bestellungText + preisSummary,
    })

    if (farmEmailError) {
      console.error('Bestellung email error:', farmEmailError)
      return res.status(500).json({
        error: 'Fehler beim Senden der Bestellung. Bitte versuchen Sie es später erneut.',
      })
    }

    // Send confirmation to customer; a failure here must not fail the order (farm email is out)
    const confirmResult = await resend.emails.send({
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
    }).catch((error: unknown) => {
      console.error('Bestellung confirmation email error:', error)
      return null
    })

    if (confirmResult?.error) {
      console.error('Bestellung confirmation email error:', confirmResult.error)
    }

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

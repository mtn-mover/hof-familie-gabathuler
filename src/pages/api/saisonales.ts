import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import { isAdminAuthorized, clip, withTimeout } from '@/lib/apiHelpers'

export type SaisonalesProdukt = {
  id: string
  name: string
  beschreibung: string
  verfuegbar: boolean
}

type SaisonalesResponse = {
  saisonales?: SaisonalesProdukt[]
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SaisonalesResponse>
) {
  try {
    if (req.method === 'GET') {
      let saisonales = await withTimeout(kv.get<SaisonalesProdukt[]>('saisonales'), 1500)

      if (!saisonales) {
        saisonales = []
        await kv.set('saisonales', saisonales)
      }

      return res.status(200).json({ saisonales })
    }

    if (req.method === 'POST') {
      const { password, saisonales } = req.body

      if (!isAdminAuthorized(password)) {
        return res.status(401).json({ error: 'Nicht autorisiert' })
      }

      if (!Array.isArray(saisonales) || saisonales.length > 50) {
        return res.status(400).json({ error: 'Ungültige Daten' })
      }

      const sanitized: SaisonalesProdukt[] = saisonales.map((p) => ({
        id: clip(p?.id, 40),
        name: clip(p?.name, 100),
        beschreibung: clip(p?.beschreibung, 300),
        verfuegbar: p?.verfuegbar === true,
      }))

      await kv.set('saisonales', sanitized)

      return res.status(200).json({ saisonales: sanitized })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('Saisonales API error:', error)
    if (req.method === 'GET') {
      return res.status(200).json({ saisonales: [] })
    }
    return res.status(500).json({ error: 'Server error' })
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'

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
      let saisonales = await kv.get<SaisonalesProdukt[]>('saisonales')

      if (!saisonales) {
        saisonales = []
        await kv.set('saisonales', saisonales)
      }

      return res.status(200).json({ saisonales })
    }

    if (req.method === 'POST') {
      const { password, saisonales } = req.body

      if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Nicht autorisiert' })
      }

      await kv.set('saisonales', saisonales)

      return res.status(200).json({ saisonales })
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

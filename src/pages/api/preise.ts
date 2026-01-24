import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'

export type Preise = {
  mischpaketProKg: number
  einzelpreise: {
    siedfleisch: number
    gehacktes: number
    geschnetzeltes: number
    voressen: number
    braten: number
    fleischvogelPlaetzli: number
    saftplaetzli: number
    plaetzli: number
    steak: number
    huft: number
    filet: number
    leber: number
  }
}

type PreiseResponse = {
  preise?: Preise
  error?: string
}

// Default preise based on the order form
const defaultPreise: Preise = {
  mischpaketProKg: 29.0,
  einzelpreise: {
    siedfleisch: 21.0,
    gehacktes: 21.0,
    geschnetzeltes: 35.0,
    voressen: 25.0,
    braten: 32.0,
    fleischvogelPlaetzli: 32.0,
    saftplaetzli: 34.0,
    plaetzli: 45.0,
    steak: 57.0,
    huft: 65.0,
    filet: 75.0,
    leber: 21.0,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PreiseResponse>
) {
  try {
    if (req.method === 'GET') {
      // Get preise from KV store
      let preise = await kv.get<Preise>('preise')

      if (!preise) {
        // Initialize with defaults if empty
        preise = defaultPreise
        await kv.set('preise', preise)
      }

      return res.status(200).json({ preise })
    }

    if (req.method === 'POST') {
      // Verify admin password
      const { password, preise } = req.body

      if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Nicht autorisiert' })
      }

      // Save preise to KV store
      await kv.set('preise', preise)

      return res.status(200).json({ preise })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('Preise API error:', error)
    // Return default preise if KV is not configured
    if (req.method === 'GET') {
      return res.status(200).json({ preise: defaultPreise })
    }
    return res.status(500).json({ error: 'Server error' })
  }
}

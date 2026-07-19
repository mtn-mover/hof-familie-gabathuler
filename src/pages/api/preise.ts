import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import { isAdminAuthorized, withTimeout } from '@/lib/apiHelpers'

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
export const defaultPreise: Preise = {
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

function toPrice(value: unknown): number | null {
  const num = typeof value === 'number' ? value : NaN
  if (!Number.isFinite(num) || num < 0 || num > 10000) return null
  return Math.round(num * 100) / 100
}

// Rebuilds the object from known keys so NaN/junk from the admin form never reaches KV
function sanitizePreise(input: unknown): Preise | null {
  if (!input || typeof input !== 'object') return null
  const raw = input as Record<string, unknown>

  const mischpaketProKg = toPrice(raw.mischpaketProKg)
  if (mischpaketProKg === null) return null

  const einzelRaw = (raw.einzelpreise ?? {}) as Record<string, unknown>
  const einzelpreise = {} as Preise['einzelpreise']
  for (const key of Object.keys(defaultPreise.einzelpreise) as (keyof Preise['einzelpreise'])[]) {
    const price = toPrice(einzelRaw[key])
    if (price === null) return null
    einzelpreise[key] = price
  }

  return { mischpaketProKg, einzelpreise }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PreiseResponse>
) {
  try {
    if (req.method === 'GET') {
      // Get preise from KV store
      let preise = await withTimeout(kv.get<Preise>('preise'), 1500)

      if (!preise) {
        // Initialize with defaults if empty
        preise = defaultPreise
        await kv.set('preise', preise)
      }

      return res.status(200).json({ preise })
    }

    if (req.method === 'POST') {
      const { password, preise } = req.body

      if (!isAdminAuthorized(password)) {
        return res.status(401).json({ error: 'Nicht autorisiert' })
      }

      const sanitized = sanitizePreise(preise)
      if (!sanitized) {
        return res.status(400).json({ error: 'Ungültige Preise' })
      }

      await kv.set('preise', sanitized)

      return res.status(200).json({ preise: sanitized })
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

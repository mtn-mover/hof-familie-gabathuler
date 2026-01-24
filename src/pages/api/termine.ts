import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'

export type Termin = {
  id: string
  name: string
  status: 'aktiv' | 'ausverkauft'
}

type TermineResponse = {
  termine?: Termin[]
  error?: string
}

// Default termine if none exist
const defaultTermine: Termin[] = [
  { id: '1', name: 'November 2024', status: 'aktiv' },
  { id: '2', name: 'Dezember 2024', status: 'aktiv' },
  { id: '3', name: 'April/Mai 2025', status: 'aktiv' },
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TermineResponse>
) {
  try {
    if (req.method === 'GET') {
      // Get termine from KV store
      let termine = await kv.get<Termin[]>('termine')

      if (!termine) {
        // Initialize with defaults if empty
        termine = defaultTermine
        await kv.set('termine', termine)
      }

      return res.status(200).json({ termine })
    }

    if (req.method === 'POST') {
      // Verify admin password
      const { password, termine } = req.body

      if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Nicht autorisiert' })
      }

      // Save termine to KV store
      await kv.set('termine', termine)

      return res.status(200).json({ termine })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('Termine API error:', error)
    // Return default termine if KV is not configured
    if (req.method === 'GET') {
      return res.status(200).json({ termine: defaultTermine })
    }
    return res.status(500).json({ error: 'Server error' })
  }
}

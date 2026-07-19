import type { NextApiRequest, NextApiResponse } from 'next'
import { isAdminAuthorized, rateLimit } from '@/lib/apiHelpers'

type AuthResponse = {
  success: boolean
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  if (!(await rateLimit(req, 'admin-auth', 10, 900))) {
    return res
      .status(429)
      .json({ success: false, message: 'Zu viele Versuche. Bitte warten Sie 15 Minuten.' })
  }

  if (isAdminAuthorized(req.body?.password)) {
    return res.status(200).json({ success: true })
  }

  return res.status(401).json({ success: false, message: 'Falsches Passwort' })
}

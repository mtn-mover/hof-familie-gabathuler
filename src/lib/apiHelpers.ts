import type { NextApiRequest } from 'next'
import { timingSafeEqual } from 'crypto'
import { kv } from '@vercel/kv'

// Fails closed: an unset ADMIN_PASSWORD must never allow writes
export function isAdminAuthorized(password: unknown): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword || typeof password !== 'string' || password.length === 0) {
    return false
  }
  const provided = Buffer.from(password)
  const expected = Buffer.from(adminPassword)
  if (provided.length !== expected.length) {
    return false
  }
  return timingSafeEqual(provided, expected)
}

export function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim()
  }
  return req.socket.remoteAddress || 'unknown'
}

// Caps how long we wait for KV — a slow or dead store must not stall requests
export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    ),
  ])
}

// Fixed-window limiter. Fails open: KV problems must never block real orders
export async function rateLimit(
  req: NextApiRequest,
  scope: string,
  limit: number,
  windowSeconds: number
): Promise<boolean> {
  try {
    const window = Math.floor(Date.now() / 1000 / windowSeconds)
    const key = `ratelimit:${scope}:${getClientIp(req)}:${window}`
    const count = await withTimeout(kv.incr(key), 1500)
    if (count === 1) {
      // Best-effort cleanup; correctness comes from the windowed key
      await withTimeout(kv.expire(key, windowSeconds * 2), 1500).catch(() => {})
    }
    return count <= limit
  } catch (error) {
    console.error('Rate limit check failed:', error)
    return true
  }
}

export function clip(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// src/lib/admin-auth.ts
// Simple single-password admin auth for the /admin section.
//
// One user, one password (ADMIN_PASSWORD env var). On successful login
// we set an httpOnly cookie containing an HMAC token signed with ADMIN_SECRET.
// Every admin page verifies the cookie via requireAdmin().
//
// Why not NextAuth: overkill for one user, one site, one password.

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import crypto from 'node:crypto'

const COOKIE_NAME = 'js_admin'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 14 // 14 days

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET
  if (!secret) throw new Error('ADMIN_SECRET env var is required')
  return secret
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('hex')
}

function makeToken(): string {
  const payload = String(Date.now())
  return `${payload}.${sign(payload)}`
}

function verifyToken(token: string | undefined): boolean {
  if (!token) return false
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return false
  const expected = sign(payload)
  // Constant-time compare
  const a = Buffer.from(sig, 'hex')
  const b = Buffer.from(expected, 'hex')
  if (a.length !== b.length) return false
  if (!crypto.timingSafeEqual(a, b)) return false
  // Expiry check
  const issued = parseInt(payload, 10)
  if (!Number.isFinite(issued)) return false
  return Date.now() - issued < COOKIE_MAX_AGE * 1000
}

/** Verify the password and, if correct, set the admin cookie. */
export async function signIn(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) throw new Error('ADMIN_PASSWORD env var is required')
  if (password !== expected) return false

  const jar = await cookies()
  jar.set(COOKIE_NAME, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  })
  return true
}

/** Clear the admin cookie. */
export async function signOut(): Promise<void> {
  const jar = await cookies()
  jar.delete(COOKIE_NAME)
}

/** Returns true if the current request has a valid admin cookie. */
export async function isSignedIn(): Promise<boolean> {
  const jar = await cookies()
  return verifyToken(jar.get(COOKIE_NAME)?.value)
}

/** Throws via redirect() to /admin/login if not authed. Use at top of admin pages. */
export async function requireAdmin(): Promise<void> {
  if (!(await isSignedIn())) redirect('/admin/login')
}

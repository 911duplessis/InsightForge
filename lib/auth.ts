import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'

const SESSION_COOKIE = 'vdos_session'
const BUSINESS_COOKIE = 'vdos_business'

function getSecret() {
  const secret = process.env.SESSION_SECRET
  if (!secret) {
    throw new Error('SESSION_SECRET environment variable is not set')
  }
  return new TextEncoder().encode(secret)
}

export interface ConsultantSession {
  consultantId: string
  email: string
  role: 'consultant' | 'admin'
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createSessionToken(session: ConsultantSession): Promise<string> {
  return new SignJWT({ ...session })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(getSecret())
}

export async function verifySessionToken(token: string): Promise<ConsultantSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return {
      consultantId: payload.consultantId as string,
      email: payload.email as string,
      role: payload.role as 'consultant' | 'admin',
    }
  } catch {
    return null
  }
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE
export const BUSINESS_COOKIE_NAME = BUSINESS_COOKIE

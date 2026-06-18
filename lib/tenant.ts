import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySessionToken, SESSION_COOKIE_NAME, BUSINESS_COOKIE_NAME, type ConsultantSession } from './auth'

/** Reads and verifies the consultant session cookie. Returns null if absent/invalid. */
export async function getConsultantSession(): Promise<ConsultantSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!token) return null
  return verifySessionToken(token)
}

/** Redirects to /command/login if there is no valid consultant session. */
export async function requireConsultant(): Promise<ConsultantSession> {
  const session = await getConsultantSession()
  if (!session) {
    redirect('/command/login')
  }
  return session
}

/** Reads the active business id selected via the business switcher. */
export async function getActiveBusinessId(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(BUSINESS_COOKIE_NAME)?.value ?? null
}

/**
 * Guard used at the top of any API route/page that reads or writes tenant data.
 * Throws if no business is selected — callers should catch and return 400/redirect.
 */
export async function requireBusiness(): Promise<string> {
  const businessId = await getActiveBusinessId()
  if (!businessId) {
    throw new Error('No active business selected')
  }
  return businessId
}

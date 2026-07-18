import type { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

/**
 * Best-effort, fail-open rate limiter backed by the rate_limit_hits table.
 *
 * The public VDOS/Discover intake and analysis routes are unauthenticated by
 * design (capability-link flow) but trigger paid LLM calls, so they need abuse
 * protection. This uses a fixed window per bucket. It is intentionally
 * fail-open: any error (including the table not existing yet) allows the
 * request, so rate limiting can never break the app — apply migration
 * 0003_rate_limit.sql to actually enforce it.
 *
 * Note: at low volume this is adequate; a shared store like Upstash/Vercel KV
 * would give stronger guarantees under high concurrency.
 */
export async function checkRateLimit(
  bucket: string,
  limit: number,
  windowSeconds: number
): Promise<{ ok: boolean; retryAfter: number }> {
  try {
    const since = new Date(Date.now() - windowSeconds * 1000).toISOString()
    const { count, error } = await supabaseAdmin
      .from('rate_limit_hits')
      .select('id', { count: 'exact', head: true })
      .eq('bucket', bucket)
      .gte('created_at', since)

    if (error) return { ok: true, retryAfter: 0 } // fail open

    if ((count ?? 0) >= limit) {
      return { ok: false, retryAfter: windowSeconds }
    }

    await supabaseAdmin.from('rate_limit_hits').insert({ bucket })
    return { ok: true, retryAfter: 0 }
  } catch {
    return { ok: true, retryAfter: 0 } // fail open
  }
}

/** Best-effort client IP from the proxy headers Vercel sets. */
export function clientIp(req: NextRequest | Request): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Defer createClient() until first property access so module import never
// executes it at build time (Next.js 15 evaluates routes during build; env
// vars are absent then, causing "supabaseUrl is required" errors).
function lazySingleton(factory: () => SupabaseClient): SupabaseClient {
  let instance: SupabaseClient | null = null
  return new Proxy({} as SupabaseClient, {
    get(_target, prop, receiver) {
      if (!instance) instance = factory()
      return Reflect.get(instance, prop, receiver)
    },
  })
}

// Client for browser/public operations
export const supabase = lazySingleton(() =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
)

// Admin client for server-side operations (bypasses RLS)
export const supabaseAdmin = lazySingleton(() =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
)

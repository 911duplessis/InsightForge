// One-off script to create the first consultant account (no signup UI exists yet
// since auth is invite-only / admin-provisioned). Run with:
//   node --env-file=.env.local --import tsx scripts/seed-consultant.ts <email> <password> <displayName> [role]
//
// role defaults to "admin" so the first consultant can see/manage every business
// and grant access to others via consultant_business_access.

import { createClient } from '@supabase/supabase-js'
import { hashPassword } from '../lib/auth'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.')
  process.exit(1)
}

const [email, password, displayName, role = 'admin'] = process.argv.slice(2)

if (!email || !password || !displayName) {
  console.error('Usage: seed-consultant.ts <email> <password> <displayName> [role=admin|consultant]')
  process.exit(1)
}

if (role !== 'admin' && role !== 'consultant') {
  console.error('role must be "admin" or "consultant"')
  process.exit(1)
}

const db = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function main() {
  const { data: existing } = await db.from('consultants').select('id').eq('email', email).maybeSingle()
  if (existing) {
    console.log(`Consultant ${email} already exists (${existing.id}) — nothing to do.`)
    return
  }

  const password_hash = await hashPassword(password)
  const { data: consultant, error } = await db
    .from('consultants')
    .insert({ email, password_hash, display_name: displayName, role })
    .select('*')
    .single()
  if (error) throw error

  console.log(`Created consultant "${consultant.display_name}" <${consultant.email}> (${consultant.role})`)

  if (role === 'admin') {
    console.log('Role is admin — this consultant can see every business without an explicit consultant_business_access grant.')
  } else {
    console.log('Role is consultant — grant business access via an insert into consultant_business_access.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

// One-off script: imports Ready & Rooted's partially-completed VDOS engagement
// (parsed from 6 uploaded NZ venture-strategy HTML files, in
// scripts/seed-readyrooted-data.ts) into the database as a real, in-progress
// engagement — mirroring scripts/seed-primeturf.ts, but for a second, fully
// separate `businesses` tenant. Run manually with: npm run seed:readyrooted
//
// Unlike PrimeTurf (status='completed', all 12 stages + 6 ASQs), only Stages 0,
// 6, 9, and 11 have real source content for Ready & Rooted — there is no source
// material for the remaining stages or any ASQ instrument, so only those four
// stage rows are inserted and the engagement is marked status='in_progress'.
// The vdos_blueprints row is only created if Stage 11 output is present (which
// it is here), since /vdos-blueprint renders off that stage.
//
// Idempotent: if a `businesses` row with slug "ready-rooted" already exists,
// the script reuses it; if a `vdos_engagements` row already exists for that
// business it exits without creating a duplicate engagement.

import { createClient } from '@supabase/supabase-js'
import { STAGE_SEQUENCE } from '../types/vdos'
import {
  readyRootedBusiness,
  readyRootedClient,
  readyRootedIntake,
  readyRootedStages,
  readyRootedOpportunities,
} from './seed-readyrooted-data'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.')
  process.exit(1)
}

const db = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function main() {
  console.log('Seeding Ready & Rooted VDOS engagement...')

  // 1. Business (idempotent on slug) — a distinct tenant from PrimeTurf
  let { data: business } = await db
    .from('businesses')
    .select('*')
    .eq('slug', readyRootedBusiness.slug)
    .maybeSingle()

  if (!business) {
    const { data: created, error } = await db
      .from('businesses')
      .insert({ ...readyRootedBusiness, status: 'active' })
      .select('*')
      .single()
    if (error) throw error
    business = created
    console.log(`Created business "${business.name}" (${business.id})`)
  } else {
    console.log(`Reusing existing business "${business.name}" (${business.id})`)
  }

  // 2. Bail out early if this business already has an engagement (idempotency)
  const { data: existingEngagement } = await db
    .from('vdos_engagements')
    .select('id')
    .eq('business_id', business.id)
    .maybeSingle()

  if (existingEngagement) {
    console.log(`Business already has engagement ${existingEngagement.id} — nothing to do.`)
    return
  }

  // 3. Client (upsert by email)
  let { data: client } = await db
    .from('clients')
    .select('*')
    .eq('email', readyRootedClient.email)
    .maybeSingle()

  if (!client) {
    const { data: created, error } = await db.from('clients').insert(readyRootedClient).select('*').single()
    if (error) throw error
    client = created
    console.log(`Created client "${client.first_name} ${client.last_name}" (${client.id})`)
  } else {
    console.log(`Reusing existing client "${client.first_name} ${client.last_name}" (${client.id})`)
  }

  // 4. Engagement — marked in_progress since only 4 of 12 stages have real
  // source content (no ASQs, no Stages 1-5/7/8/10)
  const highestPopulatedStage = Math.max(...Object.keys(readyRootedStages).map(Number))
  const { data: engagement, error: engagementError } = await db
    .from('vdos_engagements')
    .insert({
      business_id: business.id,
      client_id: client.id,
      process_type: 'vdos',
      status: 'in_progress',
      current_stage: highestPopulatedStage,
      intake_summary: readyRootedIntake,
    })
    .select('*')
    .single()
  if (engagementError) throw engagementError
  console.log(`Created engagement ${engagement.id}`)

  // 5. Only the stages with real source content (0, 6, 9, 11)
  const now = new Date().toISOString()
  const stageRows = STAGE_SEQUENCE.filter((def) => readyRootedStages[def.stageNumber]).map((def) => {
    const seed = readyRootedStages[def.stageNumber]!
    return {
      engagement_id: engagement.id,
      business_id: business.id,
      stage_number: def.stageNumber,
      stage_key: seed.stage_key,
      status: 'complete' as const,
      is_gate: seed.is_gate,
      gate_passed: seed.gate_passed,
      output: seed.output,
      model_used: 'manual-import',
      started_at: now,
      completed_at: now,
    }
  })
  const { error: stagesError } = await db.from('vdos_stages').insert(stageRows)
  if (stagesError) throw stagesError
  console.log(`Inserted ${stageRows.length} stage rows (stages: ${stageRows.map((s) => s.stage_number).join(', ')})`)

  // 6. Opportunities (Stage 0 emergent ventures + Stage 6 ranked opportunities)
  const opportunityRows = readyRootedOpportunities.map((o) => ({
    engagement_id: engagement.id,
    business_id: business.id,
    source_stage: o.source_stage,
    title: o.title,
    description: o.description,
    market_demand_score: o.market_demand_score,
    defensibility_score: o.defensibility_score,
    scalability_score: o.scalability_score,
    founder_fit_score: o.founder_fit_score,
    speed_to_revenue_score: o.speed_to_revenue_score,
    total_score: o.total_score,
    rank: o.rank,
    probability_of_success: o.probability_of_success,
    notes: o.notes,
  }))
  const { error: oppsError } = await db.from('vdos_opportunities').insert(opportunityRows)
  if (oppsError) throw oppsError
  console.log(`Inserted ${opportunityRows.length} vdos_opportunities rows`)

  // 7. Blueprint record — only if Stage 11 (vos_design) output exists, since
  // /vdos-blueprint/[engagementId] renders off that stage
  if (readyRootedStages[11]) {
    const { error: blueprintError } = await db.from('vdos_blueprints').insert({
      engagement_id: engagement.id,
      business_id: business.id,
      generated_at: now,
    })
    if (blueprintError) throw blueprintError
    console.log('Inserted vdos_blueprints row (Stage 11 output present)')
  } else {
    console.log('Skipped vdos_blueprints row — no Stage 11 output present')
  }

  console.log(`\nDone. View at /vdos-blueprint/${engagement.id}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

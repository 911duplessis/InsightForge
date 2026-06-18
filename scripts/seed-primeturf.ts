// One-off script: imports PrimeTurf's already-completed VDOS engagement (parsed
// from their 7 reference HTML reports in scripts/seed-primeturf-data.ts) into the
// database as a real, fully-`complete` engagement rather than re-running it
// through Claude. Run manually with: npm run seed:primeturf
//
// Idempotent: if a `businesses` row with slug "primeturf" already exists, the
// script reuses it; if a `vdos_engagements` row already exists for that business
// it exits without creating a duplicate engagement.

import { createClient } from '@supabase/supabase-js'
import { ASQ_KEYS, STAGE_SEQUENCE } from '../types/vdos'
import {
  primeTurfBusiness,
  primeTurfClient,
  primeTurfIntake,
  primeTurfStages,
  primeTurfAsqInstruments,
  primeTurfAsq4Deals,
  primeTurfOpportunities,
} from './seed-primeturf-data'

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
  console.log('Seeding PrimeTurf VDOS engagement...')

  // 1. Business (idempotent on slug)
  let { data: business } = await db
    .from('businesses')
    .select('*')
    .eq('slug', primeTurfBusiness.slug)
    .maybeSingle()

  if (!business) {
    const { data: created, error } = await db
      .from('businesses')
      .insert({ ...primeTurfBusiness, status: 'active' })
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
    .eq('email', primeTurfClient.email)
    .maybeSingle()

  if (!client) {
    const { data: created, error } = await db.from('clients').insert(primeTurfClient).select('*').single()
    if (error) throw error
    client = created
    console.log(`Created client "${client.first_name} ${client.last_name}" (${client.id})`)
  } else {
    console.log(`Reusing existing client "${client.first_name} ${client.last_name}" (${client.id})`)
  }

  // 4. Engagement — marked fully completed since this is real already-completed work
  const { data: engagement, error: engagementError } = await db
    .from('vdos_engagements')
    .insert({
      business_id: business.id,
      client_id: client.id,
      process_type: 'vdos',
      status: 'completed',
      current_stage: 11,
      intake_summary: primeTurfIntake,
      completed_at: new Date().toISOString(),
    })
    .select('*')
    .single()
  if (engagementError) throw engagementError
  console.log(`Created engagement ${engagement.id}`)

  // 5. Stages 0-11
  const stageRows = STAGE_SEQUENCE.map((def) => {
    const seed = primeTurfStages[def.stageNumber]
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
      started_at: engagement.completed_at,
      completed_at: engagement.completed_at,
    }
  })
  const { error: stagesError } = await db.from('vdos_stages').insert(stageRows)
  if (stagesError) throw stagesError
  console.log(`Inserted ${stageRows.length} stage rows`)

  // 6. ASQ instruments
  const asqRows = ASQ_KEYS.map((key) => {
    const seed = primeTurfAsqInstruments[key]
    return {
      engagement_id: engagement.id,
      business_id: business.id,
      asq_key: key,
      status: 'analyzed' as const,
      raw_input: seed.raw_input,
      analysis_output: seed.analysis_output,
      submitted_at: engagement.completed_at,
      analyzed_at: engagement.completed_at,
    }
  })
  const { data: insertedAsq, error: asqError } = await db.from('asq_instruments').insert(asqRows).select('*')
  if (asqError) throw asqError
  console.log(`Inserted ${insertedAsq.length} ASQ instrument rows`)

  // 7. ASQ4 deal rows, linked to the asq4 instrument row just created
  const asq4Instrument = insertedAsq.find((a) => a.asq_key === 'asq4')
  if (asq4Instrument && primeTurfAsq4Deals.length > 0) {
    const dealRows = primeTurfAsq4Deals.map((d) => ({
      asq_instrument_id: asq4Instrument.id,
      business_id: business.id,
      deal_id: d.deal_id,
      channel: d.channel,
      sub_source: d.sub_source,
      deal_size: d.deal_size,
      price_per_sqm: d.price_per_sqm,
      close_rate_signal: d.close_rate_signal,
      cac_time_days: d.cac_time_days,
      cac_direct_cost: d.cac_direct_cost,
      gross_margin: d.gross_margin,
      repeatability: d.repeatability,
      objection_type: d.objection_type,
      geography: d.geography,
      project_type: d.project_type,
      upsell_potential: d.upsell_potential,
    }))
    const { error: dealsError } = await db.from('asq4_deals').insert(dealRows)
    if (dealsError) throw dealsError
    console.log(`Inserted ${dealRows.length} asq4_deals rows`)
  }

  // 8. Opportunities (Stage 0 emergent ventures + Stage 6 ranked opportunities)
  const opportunityRows = primeTurfOpportunities.map((o) => ({
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

  // 9. Blueprint record so /vdos-blueprint/[engagementId] renders immediately
  const { error: blueprintError } = await db.from('vdos_blueprints').insert({
    engagement_id: engagement.id,
    business_id: business.id,
    generated_at: engagement.completed_at,
  })
  if (blueprintError) throw blueprintError
  console.log('Inserted vdos_blueprints row')

  console.log(`\nDone. View at /vdos-blueprint/${engagement.id}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

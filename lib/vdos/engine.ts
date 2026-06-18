import { supabaseAdmin } from '@/lib/supabase'
import { runClaudeCompletion, parseJsonResponse } from '@/lib/claude'
import { STAGE_SEQUENCE, ASQ_PREREQUISITES_BY_STAGE } from '@/types/vdos'
import type {
  AsqInstrumentRecord,
  AsqKey,
  Business,
  StageContext,
  VdosEngagement,
  VdosStageRecord,
} from '@/types/vdos'
import { STAGE_MODULES } from './stages'
import { ASQ_MODULES } from './asq'

export class AsqNotReadyError extends Error {
  constructor(public missingAsqKeys: AsqKey[]) {
    super(`ASQ instruments not yet analyzed: ${missingAsqKeys.join(', ')}`)
  }
}

export class GateBlockedError extends Error {
  constructor(public blockedAtStage: number, public reasons: string[]) {
    super(`Stage ${blockedAtStage} gate is blocked: ${reasons.join('; ')}`)
  }
}

async function loadEngagement(engagementId: string): Promise<{ engagement: VdosEngagement; business: Business }> {
  const { data: engagement, error } = await supabaseAdmin
    .from('vdos_engagements')
    .select('*')
    .eq('id', engagementId)
    .single()
  if (error || !engagement) throw new Error(`Engagement ${engagementId} not found`)

  const { data: business, error: bizError } = await supabaseAdmin
    .from('businesses')
    .select('*')
    .eq('id', engagement.business_id)
    .single()
  if (bizError || !business) throw new Error(`Business ${engagement.business_id} not found`)

  return { engagement: engagement as VdosEngagement, business: business as Business }
}

async function loadStages(engagementId: string): Promise<VdosStageRecord[]> {
  const { data, error } = await supabaseAdmin
    .from('vdos_stages')
    .select('*')
    .eq('engagement_id', engagementId)
    .order('stage_number', { ascending: true })
  if (error) throw error
  return (data ?? []) as VdosStageRecord[]
}

async function loadAsqInstruments(engagementId: string): Promise<AsqInstrumentRecord[]> {
  const { data, error } = await supabaseAdmin
    .from('asq_instruments')
    .select('*')
    .eq('engagement_id', engagementId)
  if (error) throw error
  return (data ?? []) as AsqInstrumentRecord[]
}

/** Determines the next runnable stage number, or null if the process is complete/blocked. */
export function getNextStage(stages: VdosStageRecord[]): number | null {
  const sorted = [...stages].sort((a, b) => a.stage_number - b.stage_number)
  for (const stage of sorted) {
    if (stage.status === 'gated_blocked') return null
    if (stage.status !== 'complete') return stage.stage_number
  }
  return null
}

function buildStageContext(
  engagement: VdosEngagement,
  business: Business,
  stages: VdosStageRecord[],
  asqInstruments: AsqInstrumentRecord[]
): StageContext {
  const priorStageOutputs: StageContext['priorStageOutputs'] = {}
  for (const stage of stages) {
    if (stage.status === 'complete' && stage.output) {
      priorStageOutputs[stage.stage_key] = stage.output
    }
  }

  const asqOutputs: StageContext['asqOutputs'] = {}
  for (const asq of asqInstruments) {
    if (asq.status === 'analyzed' && asq.analysis_output) {
      asqOutputs[asq.asq_key] = asq.analysis_output
    }
  }

  if (!engagement.intake_summary) {
    throw new Error('Engagement has no intake_summary; cannot build stage context')
  }

  return {
    engagement,
    business,
    intakeSummary: engagement.intake_summary,
    priorStageOutputs,
    asqOutputs,
  }
}

export async function runStage(engagementId: string, stageNumber: number): Promise<VdosStageRecord> {
  const { engagement, business } = await loadEngagement(engagementId)
  const stages = await loadStages(engagementId)
  const asqInstruments = await loadAsqInstruments(engagementId)

  const stageRow = stages.find((s) => s.stage_number === stageNumber)
  if (!stageRow) throw new Error(`Stage ${stageNumber} row not found for engagement ${engagementId}`)

  const nextRunnable = getNextStage(stages)
  if (nextRunnable !== stageNumber) {
    throw new GateBlockedError(stageNumber, [
      `Stage ${stageNumber} is not the next runnable stage (next is ${nextRunnable ?? 'none — process blocked or complete'}).`,
    ])
  }

  const requiredAsqs = ASQ_PREREQUISITES_BY_STAGE[stageNumber] ?? []
  const missingAsqs = requiredAsqs.filter((key) => {
    const instrument = asqInstruments.find((a) => a.asq_key === key)
    return !instrument || instrument.status !== 'analyzed'
  })
  if (missingAsqs.length > 0) {
    throw new AsqNotReadyError(missingAsqs)
  }

  const stageModule = STAGE_MODULES[stageNumber]
  if (!stageModule) throw new Error(`No stage module registered for stage ${stageNumber}`)

  const context = buildStageContext(engagement, business, stages, asqInstruments)

  await supabaseAdmin
    .from('vdos_stages')
    .update({ status: 'in_progress', started_at: new Date().toISOString() })
    .eq('id', stageRow.id)

  const prompt = stageModule.buildPrompt(context)
  const { text, tokensUsed } = await runClaudeCompletion(prompt)
  const output = parseJsonResponse<Record<string, unknown>>(text, `Stage ${stageNumber} output`)

  let status: VdosStageRecord['status'] = 'complete'
  let gatePassed: boolean | null = null

  if (stageModule.validateGate) {
    const result = stageModule.validateGate(output)
    gatePassed = result.passed
    status = result.passed ? 'complete' : 'gated_blocked'
  }

  const { data: updated, error } = await supabaseAdmin
    .from('vdos_stages')
    .update({
      status,
      gate_passed: gatePassed,
      output,
      model_used: 'claude-opus-4-8',
      tokens_used: tokensUsed,
      completed_at: new Date().toISOString(),
    })
    .eq('id', stageRow.id)
    .select('*')
    .single()
  if (error || !updated) throw error ?? new Error('Failed to persist stage output')

  const updatedStages = stages.map((s) => (s.id === stageRow.id ? (updated as VdosStageRecord) : s))
  const next = getNextStage(updatedStages)
  await supabaseAdmin
    .from('vdos_engagements')
    .update({
      current_stage: next ?? stageNumber,
      status: status === 'gated_blocked' ? 'gated' : next === null ? 'completed' : 'active',
      completed_at: next === null && status !== 'gated_blocked' ? new Date().toISOString() : null,
    })
    .eq('id', engagementId)

  return updated as VdosStageRecord
}

export async function runAsq(engagementId: string, asqKey: AsqKey): Promise<AsqInstrumentRecord> {
  const { engagement, business } = await loadEngagement(engagementId)
  const stages = await loadStages(engagementId)
  const asqInstruments = await loadAsqInstruments(engagementId)

  const instrument = asqInstruments.find((a) => a.asq_key === asqKey)
  if (!instrument) throw new Error(`ASQ ${asqKey} row not found for engagement ${engagementId}`)
  if (instrument.status === 'awaiting_data') {
    throw new Error(`ASQ ${asqKey} has no submitted raw_input yet`)
  }

  const asqModule = ASQ_MODULES[asqKey]
  const context = buildStageContext(engagement, business, stages, asqInstruments)
  const prompt = asqModule.buildAnalysisPrompt(instrument.raw_input, context)
  const { text } = await runClaudeCompletion(prompt, 8000)
  const analysisOutput = parseJsonResponse<Record<string, unknown>>(text, `ASQ ${asqKey} analysis`)

  const { data: updated, error } = await supabaseAdmin
    .from('asq_instruments')
    .update({
      status: 'analyzed',
      analysis_output: analysisOutput,
      analyzed_at: new Date().toISOString(),
    })
    .eq('id', instrument.id)
    .select('*')
    .single()
  if (error || !updated) throw error ?? new Error('Failed to persist ASQ analysis')

  return updated as AsqInstrumentRecord
}

export { STAGE_SEQUENCE }

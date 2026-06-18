// Types for the VDOS (Venture Discovery Operating System) engine.
// Kept separate from types/index.ts (FORGE Lite types) so the two processes
// can evolve independently while sharing the same Supabase project.

export type StageKey =
  | 'assumption_destruction'
  | 'surface_idea'
  | 'outcome_discovery'
  | 'emotional_driver'
  | 'market_gap'
  | 'capability_alignment'
  | 'opportunity_ranking'
  | 'venture_thesis'
  | 'mvp_discovery'
  | 'category_creation'
  | 'brand_discovery'
  | 'vos_design'

export interface StageDefinition {
  stageNumber: number // 0-11
  stageKey: StageKey
  title: string
  isGate: boolean
}

export const STAGE_SEQUENCE: StageDefinition[] = [
  { stageNumber: 0, stageKey: 'assumption_destruction', title: 'Assumption Destruction', isGate: false },
  { stageNumber: 1, stageKey: 'surface_idea', title: 'Surface Idea Discovery', isGate: false },
  { stageNumber: 2, stageKey: 'outcome_discovery', title: 'Outcome Discovery', isGate: false },
  { stageNumber: 3, stageKey: 'emotional_driver', title: 'Emotional Driver Discovery', isGate: false },
  { stageNumber: 4, stageKey: 'market_gap', title: 'Market Gap Discovery', isGate: false },
  { stageNumber: 5, stageKey: 'capability_alignment', title: 'Capability Alignment', isGate: false },
  { stageNumber: 6, stageKey: 'opportunity_ranking', title: 'Opportunity Ranking', isGate: false },
  { stageNumber: 7, stageKey: 'venture_thesis', title: 'Venture Thesis', isGate: true },
  { stageNumber: 8, stageKey: 'mvp_discovery', title: 'MVP Discovery', isGate: false },
  { stageNumber: 9, stageKey: 'category_creation', title: 'Category Creation', isGate: true },
  { stageNumber: 10, stageKey: 'brand_discovery', title: 'Brand Discovery', isGate: false },
  { stageNumber: 11, stageKey: 'vos_design', title: 'Venture Operating System Design', isGate: false },
]

export type AsqKey = 'asq1' | 'asq2' | 'asq3' | 'asq4' | 'asq5' | 'asq6'

export const ASQ_KEYS: AsqKey[] = ['asq1', 'asq2', 'asq3', 'asq4', 'asq5', 'asq6']

/** Which ASQ instruments must be `analyzed` before a given stage can run. */
export const ASQ_PREREQUISITES_BY_STAGE: Partial<Record<number, AsqKey[]>> = {
  6: ['asq1', 'asq2'],
  7: ['asq3', 'asq4', 'asq5', 'asq6'],
}

// ---------------------------------------------------------------------------
// Tenant / engagement types
// ---------------------------------------------------------------------------

export interface Business {
  id: string
  name: string
  slug: string
  industry?: string | null
  primary_contact_name?: string | null
  primary_contact_email?: string | null
  status: 'active' | 'paused' | 'archived'
  created_at: string
  updated_at: string
}

export interface BusinessAgnosticIntake {
  contact: {
    first_name: string
    last_name: string
    email: string
    phone: string
  }
  stated_idea: string
  stated_industry: string
  founder_background: string
  available_resources: string
  time_horizon: string
}

export interface VdosEngagement {
  id: string
  business_id: string
  client_id?: string | null
  process_type: 'vdos' | 'forge_lite'
  status:
    | 'in_progress'
    | 'stage_0_complete'
    | 'asq_pending'
    | 'active'
    | 'gated'
    | 'completed'
    | 'archived'
  current_stage: number
  intake_summary: BusinessAgnosticIntake | null
  started_at: string
  completed_at?: string | null
}

export interface VdosStageRecord {
  id: string
  engagement_id: string
  business_id: string
  stage_number: number
  stage_key: StageKey
  status: 'pending' | 'awaiting_input' | 'in_progress' | 'complete' | 'gated_blocked'
  is_gate: boolean
  gate_passed: boolean | null
  input_context: Record<string, unknown> | null
  output: Record<string, unknown> | null
  model_used: string | null
  tokens_used: number | null
  started_at: string | null
  completed_at: string | null
}

export interface AsqInstrumentRecord {
  id: string
  engagement_id: string
  business_id: string
  asq_key: AsqKey
  status: 'awaiting_data' | 'submitted' | 'analyzed'
  raw_input: Record<string, unknown>
  analysis_output: Record<string, unknown> | null
  submitted_at: string | null
  analyzed_at: string | null
}

export interface StageContext {
  engagement: VdosEngagement
  business: Business
  intakeSummary: BusinessAgnosticIntake
  priorStageOutputs: Partial<Record<StageKey, Record<string, unknown>>>
  asqOutputs: Partial<Record<AsqKey, Record<string, unknown>>>
}

// ---------------------------------------------------------------------------
// Stage 0 — Assumption Destruction
// ---------------------------------------------------------------------------

export type AssumptionCategoryName =
  | 'Industry'
  | 'Product'
  | 'Customer'
  | 'Business Model'
  | 'Geography'
  | 'Delivery'
  | 'Problem'
  | 'Competitive'
  | 'Founder Role'
  | 'Revenue'
  | 'Scale'
  | 'Format/Digital'

export interface AssumptionCategory {
  category: AssumptionCategoryName
  stated_assumption: string
  falsification_probability: number // 0-100
  alternative_possibilities: string[]
  emergent_opportunities: string[]
}

export interface EmergentVentureScore {
  name: string
  description: string
  market_demand: number // 0-10
  defensibility: number // 0-10
  scalability: number // 0-10
  founder_fit: number // 0-10
  speed_to_revenue: number // 0-10
  total: number // sum, /50
}

export interface Stage0Output {
  assumption_categories: AssumptionCategory[] // 12 entries
  destruction_matrix: Array<{
    category: AssumptionCategoryName
    rank: number
    falsification_probability: number
  }>
  emergent_ventures: EmergentVentureScore[] // ~9 entries, ranked
}

// ---------------------------------------------------------------------------
// Stages 1-3
// ---------------------------------------------------------------------------

export interface Stage1Output {
  surface_idea_statement: string
  founder_stated_problem: string
  founder_stated_solution: string
  unexamined_assumptions: string[]
}

export interface Stage2Output {
  desired_outcomes: Array<{ outcome: string; for_whom: string; evidence: string }>
  outcome_vs_output_gap: string
}

export interface Stage3Output {
  founder_emotional_drivers: string[]
  market_emotional_drivers: string[]
  divergence_assessment: string
}

// ---------------------------------------------------------------------------
// Stage 4 — Market Gap Discovery (representative middle stage)
// ---------------------------------------------------------------------------

export interface Stage4Output {
  identified_gaps: Array<{
    gap: string
    evidence: string
    market_size_estimate: string
    contradictory_evidence: string
  }>
  founder_desire_vs_market_demand: {
    founder_stated_desire: string
    market_evidence: string
    divergence_assessment: string
  }
  positioning_opportunities: string[]
}

// ---------------------------------------------------------------------------
// Stage 5 — Capability Alignment
// ---------------------------------------------------------------------------

export interface Stage5Output {
  founder_capabilities: string[]
  capability_gaps: string[]
  alignment_score: number // 0-10
  build_vs_partner_recommendations: string[]
}

// ---------------------------------------------------------------------------
// Stage 6 — Opportunity Ranking
// ---------------------------------------------------------------------------

export interface RankedOpportunity {
  title: string
  description: string
  market_demand_score: number
  defensibility_score: number
  scalability_score: number
  founder_fit_score: number
  speed_to_revenue_score: number
  total_score: number // /50
  rank: number
  probability_of_success: number // percentage
}

export interface Stage6Output {
  ranked_opportunities: RankedOpportunity[]
  top_recommendation: string
  rationale: string
}

// ---------------------------------------------------------------------------
// Stage 7 — Venture Thesis (GATE before MVP)
// ---------------------------------------------------------------------------

export interface Stage7Output {
  venture_thesis_statement: string
  supporting_evidence: string[]
  contradictory_evidence_considered: string[]
  selected_opportunity_title: string
  gate_criteria: {
    market_demand_validated: boolean
    founder_market_divergence_resolved: boolean
    asq_evidence_consistent: boolean
    objections_addressed: boolean
  }
  gate_decision: 'pass' | 'block'
  gate_rationale: string
}

// ---------------------------------------------------------------------------
// Stage 8 — MVP Discovery
// ---------------------------------------------------------------------------

export interface Stage8Output {
  mvp_definition: string
  in_scope: string[]
  out_of_scope: string[]
  validation_plan: string[]
}

// ---------------------------------------------------------------------------
// Stage 9 — Category Creation (GATE before Branding)
// ---------------------------------------------------------------------------

export interface Stage9Output {
  category_options: Array<{ category_name: string; rationale: string }>
  selected_category: string
  category_definition_statement: string
  gate_criteria: {
    category_distinct_from_incumbents: boolean
    category_defensible: boolean
    category_resonant_with_evidence: boolean
  }
  gate_decision: 'pass' | 'block'
  gate_rationale: string
}

// ---------------------------------------------------------------------------
// Stage 10 — Brand Discovery
// ---------------------------------------------------------------------------

export interface Stage10Output {
  brand_name_options: Array<{ name: string; rationale: string }>
  selected_brand_name: string
  positioning_statement: string
  brand_voice: string
}

// ---------------------------------------------------------------------------
// Stage 11 — Venture Operating System Design (final)
// ---------------------------------------------------------------------------

export interface Stage11Output {
  sales_system: {
    channels: string[]
    process: string
    pricing_architecture: string
  }
  operations_system: {
    delivery_model: string
    key_processes: string[]
    bottleneck_mitigations: string[]
  }
  financial_architecture: {
    revenue_layers: string[]
    margin_targets: string
    breakeven_assessment: string
  }
  brand_marketing_system: {
    positioning_statement: string
    primary_channels: string[]
    messaging_pillars: string[]
  }
  capability_scaling_plan: {
    current_capability_gaps: string[]
    hiring_or_partnering_plan: string[]
    timeline: string
  }
  risk_register: Array<{
    risk: string
    likelihood: string
    impact: string
    mitigation: string
  }>
}

// ---------------------------------------------------------------------------
// ASQ instrument input/output shapes
// ---------------------------------------------------------------------------

export interface Asq1Input {
  conversion_driver_question: string
  founder_answer: string
}

export interface Asq2Input {
  price_points_tested: Array<{ price: number; purchase_intent_signal: string }>
}

export interface Asq3PriceBand {
  band: string // e.g. "E R190-280"
  price_low: number
  price_high: number
  override_factor_effectiveness: Record<string, number> // factor name -> effectiveness %
}

export interface Asq3Input {
  price_bands: Asq3PriceBand[]
  water_tariff_inputs?: Record<string, number>
}

export interface Asq4DealRow {
  deal_id: string
  channel: string
  sub_source?: string
  deal_size?: number
  price_per_sqm?: number
  close_rate_signal?: string
  cac_time_days?: number
  cac_direct_cost?: number
  gross_margin?: number
  repeatability?: string
  objection_type?: string
  geography?: string
  project_type?: string
  upsell_potential?: string
}

export interface Asq4Input {
  deals: Asq4DealRow[]
  hidden_demand_signals?: Array<{ signal: string; estimated_value: number }>
}

export interface Asq5DealClassification {
  deal_id: string
  classification: 'S1' | 'S2' | 'S3' | 'S4'
  margin: number
}

export interface Asq5Input {
  deals_classified: Asq5DealClassification[]
}

export interface Asq6Input {
  control_points_evidence: string
  revenue_physics_inputs: Record<string, number>
}

export type AsqRawInput = Asq1Input | Asq2Input | Asq3Input | Asq4Input | Asq5Input | Asq6Input

export interface ChannelPowerIndexResult {
  channel: string
  revenue: number
  repeatability: number
  margin: number
  cac: number
  cpi: number
}

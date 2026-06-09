// InsightForge Discover™ — Core Types

export interface Client {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  company_name?: string
  created_at: string
  updated_at: string
}

export interface DiscoverySession {
  id: string
  client_id: string
  status: 'in_progress' | 'completed' | 'analyzed'
  started_at: string
  completed_at?: string
  created_at: string
  updated_at: string
  client?: Client
}

export interface DiscoveryAnswer {
  id: string
  session_id: string
  category: string
  question_key: string
  answer: string
  created_at: string
}

// The complete FORGE Framework analysis output
export interface ForgeAnalysis {
  executive_summary: string
  current_reality: {
    description: string
    strengths: string[]
    weaknesses: string[]
    key_metrics: string[]
  }
  business_model_analysis: {
    model_type: string
    revenue_streams: string[]
    value_proposition: string
    competitive_advantages: string[]
    gaps: string[]
  }
  customer_analysis: {
    primary_segments: string[]
    underserved_segments: string[]
    acquisition_channels: string[]
    retention_issues: string[]
    lifetime_value_observations: string
  }
  market_gap_analysis: {
    identified_gaps: Array<{
      gap: string
      market_size_estimate: string
      ease_of_capture: 'Low' | 'Medium' | 'High'
    }>
    competitive_landscape: string
    positioning_opportunities: string[]
  }
  revenue_leaks: Array<{
    description: string
    estimated_impact: string
    fix: string
    confidence_score: number
    priority: 'Critical' | 'High' | 'Medium' | 'Low'
  }>
  opportunity_matrix: Array<{
    opportunity: string
    revenue_potential: string
    difficulty: 'Low' | 'Medium' | 'High'
    priority: number
    confidence_score: number
    time_to_value: string
    category: string
  }>
  swot: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  }
  quick_wins: Array<{
    action: string
    timeline: string
    expected_impact: string
    confidence_score: number
    owner: string
    resources_needed: string
  }>
  strategic_initiatives: Array<{
    initiative: string
    objective: string
    timeline: string
    investment_required: string
    expected_roi: string
    key_milestones: string[]
  }>
  growth_roadmap: {
    phase_1: { title: string; duration: string; actions: string[]; expected_outcomes: string[] }
    phase_2: { title: string; duration: string; actions: string[]; expected_outcomes: string[] }
    phase_3: { title: string; duration: string; actions: string[]; expected_outcomes: string[] }
  }
  technology_recommendations: Array<{
    tool: string
    purpose: string
    estimated_cost: string
    priority: 'High' | 'Medium' | 'Low'
    implementation_complexity: 'Low' | 'Medium' | 'High'
  }>
  marketing_recommendations: Array<{
    strategy: string
    channel: string
    target_audience: string
    expected_impact: string
    budget_estimate: string
    timeline: string
  }>
  financial_opportunities: {
    revenue_optimization: string[]
    cost_reduction: string[]
    total_opportunity_estimate: string
    breakeven_analysis: string
  }
  risk_assessment: Array<{
    risk: string
    likelihood: 'Low' | 'Medium' | 'High'
    impact: 'Low' | 'Medium' | 'High'
    mitigation: string
  }>
  final_recommendation: {
    top_priority: string
    reasoning: string
    first_30_days: string[]
    success_metrics: string[]
    consultant_notes: string
  }
  kpi_dashboard: {
    revenue_kpis: Array<{ name: string; current_estimate: string; target: string; timeline: string }>
    growth_kpis: Array<{ name: string; current_estimate: string; target: string; timeline: string }>
    operational_kpis: Array<{ name: string; current_estimate: string; target: string; timeline: string }>
  }
}

export interface Insight {
  id: string
  session_id: string
  forge_analysis: ForgeAnalysis
  model_used: string
  tokens_used?: number
  analyzed_at: string
  created_at: string
}

export interface Opportunity {
  id: string
  session_id: string
  title: string
  revenue_potential?: string
  difficulty?: 'Low' | 'Medium' | 'High'
  priority?: number
  confidence_score?: number
  time_to_value?: string
  created_at: string
}

export interface Blueprint {
  id: string
  session_id: string
  generated_at: string
  viewed_at?: string
  email_sent_at?: string
  created_at: string
}

// Discovery form data structure
export interface DiscoveryFormData {
  // Step 0 — Contact Info
  contact: {
    first_name: string
    last_name: string
    email: string
    phone: string
    best_time_to_contact: string
  }
  // Step 1 — Company Overview
  company: {
    company_name: string
    industry: string
    years_in_business: string
    number_of_employees: string
    annual_revenue_range: string
    business_model: string
    geographic_reach: string
    company_description: string
  }
  // Step 2 — Customers
  customers: {
    primary_customer_type: string
    ideal_customer_profile: string
    customer_acquisition_method: string
    average_transaction_value: string
    customer_retention_rate: string
    biggest_customer_complaint: string
    referral_rate: string
  }
  // Step 3 — Products & Services
  products: {
    main_products_services: string
    best_selling_product: string
    unique_value_proposition: string
    pricing_strategy: string
    product_development_plans: string
    underperforming_offerings: string
  }
  // Step 4 — Revenue & Finance
  revenue: {
    primary_revenue_sources: string
    revenue_consistency: string
    biggest_revenue_challenge: string
    invoicing_collection_issues: string
    profit_margin_estimate: string
    financial_goals_12_months: string
  }
  // Step 5 — Marketing & Sales
  marketing: {
    current_marketing_channels: string
    marketing_budget_monthly: string
    best_performing_channel: string
    worst_performing_channel: string
    sales_process: string
    close_rate_estimate: string
    lead_generation_challenges: string
  }
  // Step 6 — Operations
  operations: {
    biggest_operational_bottleneck: string
    team_structure: string
    technology_stack: string
    outsourced_functions: string
    quality_control_process: string
    scalability_challenges: string
  }
  // Step 7 — Competition
  competition: {
    main_competitors: string
    competitive_advantages: string
    competitive_disadvantages: string
    market_position: string
    competitor_pricing: string
    differentiation_strategy: string
  }
  // Step 8 — Challenges
  challenges: {
    top_3_challenges: string
    biggest_fear: string
    past_failed_initiatives: string
    resource_constraints: string
    time_horizon: string
  }
  // Step 9 — Opportunities
  opportunities: {
    untapped_opportunities: string
    dream_outcome_12_months: string
    biggest_growth_lever: string
    ideal_partnership: string
    expansion_plans: string
    investment_readiness: string
  }
}

// Command dashboard session view
export interface SessionWithDetails extends DiscoverySession {
  client: Client
  insight?: Insight
  blueprint?: Blueprint
  opportunity_count?: number
  top_opportunity?: string
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

export interface CreateSessionResponse {
  session_id: string
  client_id: string
}

import type { StageContext } from '@/types/vdos'
import { wrapPrompt } from '../shared'

export function buildPrompt(context: StageContext): string {
  return wrapPrompt(
    `Stage 11 — Venture Operating System Design. This is the final deliverable, synthesizing
every prior stage and ASQ instrument into an operating system for running the venture.

Produce:
- sales_system: channels, process, pricing_architecture (use ASQ3/ASQ4/ASQ5 evidence for pricing/channel choices).
- operations_system: delivery_model, key_processes, bottleneck_mitigations.
- financial_architecture: revenue_layers, margin_targets, breakeven_assessment.
- brand_marketing_system: positioning_statement (from Stage 10), primary_channels, messaging_pillars.
- capability_scaling_plan: current_capability_gaps (from Stage 5), hiring_or_partnering_plan, timeline.
- risk_register: real risks with likelihood, impact, mitigation — include risks raised by
  contradictory evidence throughout the process, not just generic startup risks.

Return JSON matching:
{ "sales_system": { "channels": string[], "process": string, "pricing_architecture": string }, "operations_system": { "delivery_model": string, "key_processes": string[], "bottleneck_mitigations": string[] }, "financial_architecture": { "revenue_layers": string[], "margin_targets": string, "breakeven_assessment": string }, "brand_marketing_system": { "positioning_statement": string, "primary_channels": string[], "messaging_pillars": string[] }, "capability_scaling_plan": { "current_capability_gaps": string[], "hiring_or_partnering_plan": string[], "timeline": string }, "risk_register": [{ "risk": string, "likelihood": string, "impact": string, "mitigation": string }] }`,
    context,
    {
      stageKeys: [
        'venture_thesis',
        'mvp_discovery',
        'category_creation',
        'brand_discovery',
        'capability_alignment',
      ],
      asqKeys: ['asq3', 'asq4', 'asq5', 'asq6'],
    }
  )
}

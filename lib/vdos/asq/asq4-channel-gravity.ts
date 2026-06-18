import type { Asq4Input, StageContext } from '@/types/vdos'
import { VDOS_RULES, renderContext } from '../shared'
import { computeChannelPowerIndex } from './formulas'

export function buildAnalysisPrompt(rawInput: Asq4Input, context: StageContext): string {
  const cpiResults = computeChannelPowerIndex(rawInput.deals)
  const hiddenDemandTotal = (rawInput.hidden_demand_signals ?? []).reduce(
    (sum, s) => sum + s.estimated_value,
    0
  )

  return `${VDOS_RULES}\n\n${renderContext(context)}

## ASQ4 — Channel Gravity + Hidden Demand Scan
Pre-computed Channel Power Index per channel (do not recompute — CPI = (Rev × Repeatability × Margin) ÷ CAC):
${JSON.stringify(cpiResults, null, 2)}

Hidden demand signals supplied (total estimated value: ${hiddenDemandTotal}):
${JSON.stringify(rawInput.hidden_demand_signals ?? [], null, 2)}

## Task
Interpret the CPI ranking: which channel(s) the evidence says deserve more investment, and
which are a trap (high deal count but low CPI). Build a priority investment matrix
(quadrants: high CPI/high volume, high CPI/low volume, low CPI/high volume, low CPI/low volume)
and a 90-day channel migration plan moving effort toward the highest-CPI channel(s).

Return JSON matching:
{ "cpi_ranking": [{ "channel": string, "cpi": number }], "priority_matrix": { "invest": string[], "scale_carefully": string[], "fix_or_exit": string[], "deprioritize": string[] }, "hidden_demand_total": number, "ninety_day_plan": string[] }`
}

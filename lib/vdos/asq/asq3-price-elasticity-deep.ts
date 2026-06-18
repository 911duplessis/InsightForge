import type { Asq3Input, StageContext } from '@/types/vdos'
import { VDOS_RULES, renderContext } from '../shared'
import { computeRoiPaybackMonths } from './formulas'

export function buildAnalysisPrompt(rawInput: Asq3Input, context: StageContext): string {
  const paybackByBand = rawInput.price_bands.map((band) => {
    const monthlySavings = rawInput.water_tariff_inputs?.monthly_savings_estimate ?? 0
    return {
      band: band.band,
      payback_months: computeRoiPaybackMonths(band.price_high, monthlySavings),
    }
  })

  return `${VDOS_RULES}\n\n${renderContext(context)}

## ASQ3 — Price Elasticity Instrument (deep)
Price bands and override-factor effectiveness percentages tested:
${JSON.stringify(rawInput.price_bands, null, 2)}

Pre-computed ROI/payback per band (do not recompute, interpret these):
${JSON.stringify(paybackByBand, null, 2)}

## Task
For each band, identify which override factors (referral, warranty, financing, portfolio,
ROI calculator, specification) most effectively restore conversion when price resistance
appears. Build a close-rate scenario decision tree across the bands. Give a final verdict:
is the business underpriced, correctly priced, or overpriced, and what target price band
the evidence supports.

Return JSON matching:
{ "band_analysis": [{ "band": string, "most_effective_override_factors": string[], "payback_months": number|null }], "decision_tree_summary": string, "verdict": "underpriced"|"correctly_priced"|"overpriced", "target_price_band": string }`
}

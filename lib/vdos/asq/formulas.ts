import type { Asq4DealRow, ChannelPowerIndexResult } from '@/types/vdos'

/**
 * Channel Power Index: CPI = (Revenue × Repeatability × Margin) ÷ CAC
 * Repeatability and margin are normalized to a 0-1 multiplier before the
 * formula is applied; CAC defaults to a deal's direct cost if a time-based
 * figure isn't supplied.
 */
function repeatabilitySignalToMultiplier(signal?: string): number {
  switch (signal?.toLowerCase()) {
    case 'high':
      return 1
    case 'medium':
      return 0.6
    case 'low':
      return 0.3
    default:
      return 0.5
  }
}

export function computeChannelPowerIndex(deals: Asq4DealRow[]): ChannelPowerIndexResult[] {
  const byChannel = new Map<string, Asq4DealRow[]>()
  for (const deal of deals) {
    const list = byChannel.get(deal.channel) ?? []
    list.push(deal)
    byChannel.set(deal.channel, list)
  }

  const results: ChannelPowerIndexResult[] = []
  for (const [channel, channelDeals] of Array.from(byChannel.entries())) {
    const revenue = channelDeals.reduce((sum, d) => sum + (d.deal_size ?? 0), 0)
    const avgMargin =
      channelDeals.reduce((sum, d) => sum + (d.gross_margin ?? 0), 0) / channelDeals.length
    const avgRepeatability =
      channelDeals.reduce((sum, d) => sum + repeatabilitySignalToMultiplier(d.repeatability), 0) /
      channelDeals.length
    const totalCac = channelDeals.reduce((sum, d) => sum + (d.cac_direct_cost ?? 0), 0)

    const cpi = totalCac > 0 ? (revenue * avgRepeatability * avgMargin) / totalCac : 0

    results.push({
      channel,
      revenue,
      repeatability: avgRepeatability,
      margin: avgMargin,
      cac: totalCac,
      cpi,
    })
  }

  return results.sort((a, b) => b.cpi - a.cpi)
}

/** Simple payback-period ROI calc for price-elasticity / water-savings style instruments. */
export function computeRoiPaybackMonths(price: number, monthlySavings: number): number | null {
  if (monthlySavings <= 0) return null
  return Math.round((price / monthlySavings) * 10) / 10
}

/** Margin delta in percentage points between two deal classifications (e.g. S1 vs S4). */
export function computeMarginDelta(marginA: number, marginB: number): number {
  return Math.round((marginA - marginB) * 1000) / 10 // percentage points, 1dp
}

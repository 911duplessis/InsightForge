import type { AsqKey, StageContext } from '@/types/vdos'

import * as asq1 from './asq1-conversion-driver'
import * as asq2 from './asq2-price-elasticity-brief'
import * as asq3 from './asq3-price-elasticity-deep'
import * as asq4 from './asq4-channel-gravity'
import * as asq5 from './asq5-specification-reality'
import * as asq6 from './asq6-specification-origin-map'

export interface AsqModule {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildAnalysisPrompt: (rawInput: any, context: StageContext) => string
}

export const ASQ_MODULES: Record<AsqKey, AsqModule> = {
  asq1,
  asq2,
  asq3,
  asq4,
  asq5,
  asq6,
}

export { computeChannelPowerIndex, computeRoiPaybackMonths, computeMarginDelta } from './formulas'

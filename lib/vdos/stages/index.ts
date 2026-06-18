import type { StageContext } from '@/types/vdos'

import * as stage0 from './stage0-assumption-destruction'
import * as stage1 from './stage1-surface-idea'
import * as stage2 from './stage2-outcome-discovery'
import * as stage3 from './stage3-emotional-driver'
import * as stage4 from './stage4-market-gap'
import * as stage5 from './stage5-capability-alignment'
import * as stage6 from './stage6-opportunity-ranking'
import * as stage7 from './stage7-venture-thesis'
import * as stage8 from './stage8-mvp-discovery'
import * as stage9 from './stage9-category-creation'
import * as stage10 from './stage10-brand-discovery'
import * as stage11 from './stage11-vos-design'

export interface StageModule {
  buildPrompt: (context: StageContext) => string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateGate?: (output: any) => { passed: boolean; reasons: string[] }
}

export const STAGE_MODULES: Record<number, StageModule> = {
  0: stage0,
  1: stage1,
  2: stage2,
  3: stage3,
  4: stage4,
  5: stage5,
  6: stage6,
  7: stage7,
  8: stage8,
  9: stage9,
  10: stage10,
  11: stage11,
}

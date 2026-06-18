'use client'

import { useState } from 'react'
import type { Stage11Output, VdosStageRecord } from '@/types/vdos'
import { STAGE_SEQUENCE } from '@/types/vdos'

interface VdosBlueprintClientProps {
  vosDesign: Stage11Output
  businessName: string
  founderName: string
  stages: VdosStageRecord[]
  engagementId: string
}

const TABS = [
  'Sales System',
  'Operations System',
  'Financial Architecture',
  'Brand & Marketing',
  'Capability Scaling',
  'Risk Register',
  'Discovery Trail',
] as const

export default function VdosBlueprintClient({ vosDesign, businessName, founderName, stages }: VdosBlueprintClientProps) {
  const [tab, setTab] = useState<typeof TABS[number]>('Sales System')
  const [openStage, setOpenStage] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 print:bg-white print:text-black">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 print:hidden">
          <div>
            <h1 className="text-2xl font-black text-white">Venture Operating System Design</h1>
            <p className="text-slate-400 text-sm mt-1">{businessName} · prepared for {founderName}</p>
          </div>
          <button onClick={() => window.print()} className="bg-gold-500 hover:bg-gold-400 text-white text-sm font-semibold px-4 py-2 rounded-lg">
            Print / Export PDF
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 print:hidden">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                tab === t ? 'bg-forge-600 text-white' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-200">
          {tab === 'Sales System' && (
            <Section title="Sales System">
              <Field label="Channels" items={vosDesign.sales_system.channels} />
              <Text label="Process" value={vosDesign.sales_system.process} />
              <Text label="Pricing Architecture" value={vosDesign.sales_system.pricing_architecture} />
            </Section>
          )}
          {tab === 'Operations System' && (
            <Section title="Operations System">
              <Text label="Delivery Model" value={vosDesign.operations_system.delivery_model} />
              <Field label="Key Processes" items={vosDesign.operations_system.key_processes} />
              <Field label="Bottleneck Mitigations" items={vosDesign.operations_system.bottleneck_mitigations} />
            </Section>
          )}
          {tab === 'Financial Architecture' && (
            <Section title="Financial Architecture">
              <Field label="Revenue Layers" items={vosDesign.financial_architecture.revenue_layers} />
              <Text label="Margin Targets" value={vosDesign.financial_architecture.margin_targets} />
              <Text label="Breakeven Assessment" value={vosDesign.financial_architecture.breakeven_assessment} />
            </Section>
          )}
          {tab === 'Brand & Marketing' && (
            <Section title="Brand & Marketing System">
              <Text label="Positioning Statement" value={vosDesign.brand_marketing_system.positioning_statement} />
              <Field label="Primary Channels" items={vosDesign.brand_marketing_system.primary_channels} />
              <Field label="Messaging Pillars" items={vosDesign.brand_marketing_system.messaging_pillars} />
            </Section>
          )}
          {tab === 'Capability Scaling' && (
            <Section title="Capability Scaling Plan">
              <Field label="Current Capability Gaps" items={vosDesign.capability_scaling_plan.current_capability_gaps} />
              <Field label="Hiring / Partnering Plan" items={vosDesign.capability_scaling_plan.hiring_or_partnering_plan} />
              <Text label="Timeline" value={vosDesign.capability_scaling_plan.timeline} />
            </Section>
          )}
          {tab === 'Risk Register' && (
            <Section title="Risk Register">
              <div className="grid gap-3">
                {vosDesign.risk_register.map((r, i) => (
                  <div key={i} className="border border-slate-800 rounded-xl p-4">
                    <p className="text-white font-semibold text-sm">{r.risk}</p>
                    <p className="text-slate-400 text-xs mt-1">
                      Likelihood: {r.likelihood} · Impact: {r.impact}
                    </p>
                    <p className="text-slate-300 text-sm mt-2">{r.mitigation}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}
          {tab === 'Discovery Trail' && (
            <Section title="Discovery Trail">
              <p className="text-slate-400 text-sm mb-4">Drill into any prior stage that produced this VOS Design.</p>
              <div className="flex flex-col gap-2">
                {STAGE_SEQUENCE.filter((s) => s.stageNumber < 11).map((def) => {
                  const stage = stages.find((s) => s.stage_number === def.stageNumber)
                  const open = openStage === def.stageNumber
                  return (
                    <div key={def.stageNumber} className="border border-slate-800 rounded-xl">
                      <button
                        onClick={() => setOpenStage(open ? null : def.stageNumber)}
                        className="w-full text-left px-4 py-3 text-sm text-white font-medium"
                      >
                        {def.stageNumber}. {def.title}
                      </button>
                      {open && stage?.output && (
                        <pre className="bg-slate-950 text-slate-300 text-[10px] p-4 overflow-x-auto max-h-72 rounded-b-xl">
                          {JSON.stringify(stage.output, null, 2)}
                        </pre>
                      )}
                    </div>
                  )
                })}
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-gold-400 font-bold text-sm uppercase tracking-wide mb-4">{title}</h2>
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  )
}

function Text({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-slate-500 text-xs font-semibold uppercase mb-1">{label}</p>
      <p className="text-slate-200 text-sm">{value}</p>
    </div>
  )
}

function Field({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-slate-500 text-xs font-semibold uppercase mb-1">{label}</p>
      <ul className="list-disc list-inside text-slate-200 text-sm flex flex-col gap-1">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

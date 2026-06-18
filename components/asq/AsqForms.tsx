'use client'

import { useState } from 'react'
import type {
  Asq1Input,
  Asq2Input,
  Asq3Input,
  Asq4DealRow,
  Asq4Input,
  Asq5DealClassification,
  Asq5Input,
  Asq6Input,
  AsqKey,
} from '@/types/vdos'

const fieldClass =
  'w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forge-500'

interface AsqFormProps {
  asqKey: AsqKey
  onSubmit: (rawInput: unknown) => Promise<void>
  submitting: boolean
}

export function AsqForm({ asqKey, onSubmit, submitting }: AsqFormProps) {
  switch (asqKey) {
    case 'asq1':
      return <Asq1Form onSubmit={onSubmit} submitting={submitting} />
    case 'asq2':
      return <Asq2Form onSubmit={onSubmit} submitting={submitting} />
    case 'asq3':
      return <Asq3Form onSubmit={onSubmit} submitting={submitting} />
    case 'asq4':
      return <Asq4Form onSubmit={onSubmit} submitting={submitting} />
    case 'asq5':
      return <Asq5Form onSubmit={onSubmit} submitting={submitting} />
    case 'asq6':
      return <Asq6Form onSubmit={onSubmit} submitting={submitting} />
  }
}

function SubmitButton({ submitting }: { submitting: boolean }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      className="bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
    >
      {submitting ? 'Submitting…' : 'Submit Evidence'}
    </button>
  )
}

function Asq1Form({ onSubmit, submitting }: { onSubmit: (v: Asq1Input) => Promise<void>; submitting: boolean }) {
  const [question, setQuestion] = useState('What made you actually decide to buy / move forward?')
  const [answer, setAnswer] = useState('')
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ conversion_driver_question: question, founder_answer: answer })
      }}
      className="flex flex-col gap-3"
    >
      <label className="text-slate-400 text-xs">Conversion driver question asked to a real closed deal</label>
      <input className={fieldClass} value={question} onChange={(e) => setQuestion(e.target.value)} />
      <label className="text-slate-400 text-xs">Real customer's answer</label>
      <textarea required rows={3} className={fieldClass} value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <SubmitButton submitting={submitting} />
    </form>
  )
}

function Asq2Form({ onSubmit, submitting }: { onSubmit: (v: Asq2Input) => Promise<void>; submitting: boolean }) {
  const [rows, setRows] = useState([{ price: 0, purchase_intent_signal: '' }])
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ price_points_tested: rows })
      }}
      className="flex flex-col gap-3"
    >
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Price"
            className={fieldClass}
            value={row.price}
            onChange={(e) => {
              const next = [...rows]
              next[i] = { ...next[i], price: Number(e.target.value) }
              setRows(next)
            }}
          />
          <input
            placeholder="Purchase intent signal (e.g. 'hesitated', 'closed immediately')"
            className={fieldClass}
            value={row.purchase_intent_signal}
            onChange={(e) => {
              const next = [...rows]
              next[i] = { ...next[i], purchase_intent_signal: e.target.value }
              setRows(next)
            }}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => setRows([...rows, { price: 0, purchase_intent_signal: '' }])}
        className="text-slate-400 hover:text-white text-xs self-start"
      >
        + Add price point
      </button>
      <SubmitButton submitting={submitting} />
    </form>
  )
}

function Asq3Form({ onSubmit, submitting }: { onSubmit: (v: Asq3Input) => Promise<void>; submitting: boolean }) {
  const [rows, setRows] = useState([{ band: '', price_low: 0, price_high: 0 }])
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({
          price_bands: rows.map((r) => ({ ...r, override_factor_effectiveness: {} })),
        })
      }}
      className="flex flex-col gap-3"
    >
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-3 gap-2">
          <input
            placeholder="Band label"
            className={fieldClass}
            value={row.band}
            onChange={(e) => {
              const next = [...rows]
              next[i] = { ...next[i], band: e.target.value }
              setRows(next)
            }}
          />
          <input
            type="number"
            placeholder="Price low"
            className={fieldClass}
            value={row.price_low}
            onChange={(e) => {
              const next = [...rows]
              next[i] = { ...next[i], price_low: Number(e.target.value) }
              setRows(next)
            }}
          />
          <input
            type="number"
            placeholder="Price high"
            className={fieldClass}
            value={row.price_high}
            onChange={(e) => {
              const next = [...rows]
              next[i] = { ...next[i], price_high: Number(e.target.value) }
              setRows(next)
            }}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => setRows([...rows, { band: '', price_low: 0, price_high: 0 }])}
        className="text-slate-400 hover:text-white text-xs self-start"
      >
        + Add price band
      </button>
      <SubmitButton submitting={submitting} />
    </form>
  )
}

function Asq4Form({ onSubmit, submitting }: { onSubmit: (v: Asq4Input) => Promise<void>; submitting: boolean }) {
  const blank: Asq4DealRow = { deal_id: '', channel: '' }
  const [rows, setRows] = useState<Asq4DealRow[]>([blank])

  const updateRow = (i: number, patch: Partial<Asq4DealRow>) => {
    const next = [...rows]
    next[i] = { ...next[i], ...patch }
    setRows(next)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ deals: rows })
      }}
      className="flex flex-col gap-3"
    >
      <p className="text-slate-500 text-xs">Enter real closed-deal rows. Numeric fields drive the Channel Power Index calculation.</p>
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-4 gap-2 bg-slate-800/50 p-2 rounded-lg">
          <input placeholder="Deal ID" className={fieldClass} value={row.deal_id} onChange={(e) => updateRow(i, { deal_id: e.target.value })} />
          <input placeholder="Channel" className={fieldClass} value={row.channel} onChange={(e) => updateRow(i, { channel: e.target.value })} />
          <input type="number" placeholder="Deal size" className={fieldClass} value={row.deal_size ?? ''} onChange={(e) => updateRow(i, { deal_size: Number(e.target.value) })} />
          <input type="number" placeholder="Gross margin (0-1)" className={fieldClass} value={row.gross_margin ?? ''} onChange={(e) => updateRow(i, { gross_margin: Number(e.target.value) })} />
          <input type="number" placeholder="CAC direct cost" className={fieldClass} value={row.cac_direct_cost ?? ''} onChange={(e) => updateRow(i, { cac_direct_cost: Number(e.target.value) })} />
          <select className={fieldClass} value={row.repeatability ?? ''} onChange={(e) => updateRow(i, { repeatability: e.target.value })}>
            <option value="">Repeatability</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <input placeholder="Geography" className={fieldClass} value={row.geography ?? ''} onChange={(e) => updateRow(i, { geography: e.target.value })} />
          <input placeholder="Project type" className={fieldClass} value={row.project_type ?? ''} onChange={(e) => updateRow(i, { project_type: e.target.value })} />
        </div>
      ))}
      <button type="button" onClick={() => setRows([...rows, blank])} className="text-slate-400 hover:text-white text-xs self-start">
        + Add deal
      </button>
      <SubmitButton submitting={submitting} />
    </form>
  )
}

function Asq5Form({ onSubmit, submitting }: { onSubmit: (v: Asq5Input) => Promise<void>; submitting: boolean }) {
  const blank: Asq5DealClassification = { deal_id: '', classification: 'S1', margin: 0 }
  const [rows, setRows] = useState<Asq5DealClassification[]>([blank])
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ deals_classified: rows })
      }}
      className="flex flex-col gap-3"
    >
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-3 gap-2">
          <input
            placeholder="Deal ID"
            className={fieldClass}
            value={row.deal_id}
            onChange={(e) => {
              const next = [...rows]
              next[i] = { ...next[i], deal_id: e.target.value }
              setRows(next)
            }}
          />
          <select
            className={fieldClass}
            value={row.classification}
            onChange={(e) => {
              const next = [...rows]
              next[i] = { ...next[i], classification: e.target.value as Asq5DealClassification['classification'] }
              setRows(next)
            }}
          >
            {['S1', 'S2', 'S3', 'S4'].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Margin (0-1)"
            className={fieldClass}
            value={row.margin}
            onChange={(e) => {
              const next = [...rows]
              next[i] = { ...next[i], margin: Number(e.target.value) }
              setRows(next)
            }}
          />
        </div>
      ))}
      <button type="button" onClick={() => setRows([...rows, blank])} className="text-slate-400 hover:text-white text-xs self-start">
        + Add deal
      </button>
      <SubmitButton submitting={submitting} />
    </form>
  )
}

function Asq6Form({ onSubmit, submitting }: { onSubmit: (v: Asq6Input) => Promise<void>; submitting: boolean }) {
  const [evidence, setEvidence] = useState('')
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ control_points_evidence: evidence, revenue_physics_inputs: {} })
      }}
      className="flex flex-col gap-3"
    >
      <label className="text-slate-400 text-xs">
        Describe, with real examples, who controls the decision before/during/after the sale (specifiers, influencers, competitors)
      </label>
      <textarea required rows={5} className={fieldClass} value={evidence} onChange={(e) => setEvidence(e.target.value)} />
      <SubmitButton submitting={submitting} />
    </form>
  )
}

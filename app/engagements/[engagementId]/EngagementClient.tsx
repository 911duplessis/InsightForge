'use client'

import { useState } from 'react'
import Link from 'next/link'
import { STAGE_SEQUENCE, ASQ_PREREQUISITES_BY_STAGE } from '@/types/vdos'
import type { AsqKey, VdosStageRecord, AsqInstrumentRecord } from '@/types/vdos'
import { AsqForm } from '@/components/asq/AsqForms'

interface EngagementClientProps {
  engagement: {
    id: string
    status: string
    current_stage: number
    business: { name: string }
    client: { first_name: string; last_name: string; email: string }
  }
  initialStages: VdosStageRecord[]
  initialAsqInstruments: AsqInstrumentRecord[]
}

export default function EngagementClient({ engagement, initialStages, initialAsqInstruments }: EngagementClientProps) {
  const [stages, setStages] = useState(initialStages)
  const [asqInstruments, setAsqInstruments] = useState(initialAsqInstruments)
  const [running, setRunning] = useState(false)
  const [missingAsqKeys, setMissingAsqKeys] = useState<AsqKey[]>([])
  const [error, setError] = useState('')
  const [openStageId, setOpenStageId] = useState<string | null>(null)

  const currentStage = stages.find((s) => s.stage_number === engagement.current_stage)
  const isDone = stages.length > 0 && stages.every((s) => s.status === 'complete')

  const refetch = async () => {
    const res = await fetch(`/api/engagements/${engagement.id}`)
    const json = await res.json()
    if (json.success) {
      setStages(json.data.stages)
      setAsqInstruments(json.data.asq_instruments)
    }
  }

  const runStage = async (stageNumber: number) => {
    setRunning(true)
    setError('')
    setMissingAsqKeys([])
    try {
      const res = await fetch(`/api/engagements/${engagement.id}/stages/${stageNumber}`, { method: 'POST' })
      const json = await res.json()
      if (!json.success) {
        if (json.missing_asq_keys) setMissingAsqKeys(json.missing_asq_keys)
        setError(json.error)
        return
      }
      await refetch()
    } catch {
      setError('Failed to run stage')
    } finally {
      setRunning(false)
    }
  }

  const submitAsq = async (asqKey: AsqKey, rawInput: unknown) => {
    setRunning(true)
    setError('')
    try {
      const res = await fetch(`/api/engagements/${engagement.id}/asq/${asqKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rawInput),
      })
      const json = await res.json()
      if (!json.success) {
        setError(json.error)
        return
      }
      await refetch()
      setMissingAsqKeys((prev) => prev.filter((k) => k !== asqKey))
    } catch {
      setError('Failed to submit ASQ evidence')
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white">{engagement.business.name} — VDOS Engagement</h1>
          <p className="text-slate-400 text-sm mt-1">
            Founder: {engagement.client.first_name} {engagement.client.last_name} ({engagement.client.email})
          </p>
        </div>

        {isDone && (
          <div className="bg-green-900/30 border border-green-800 text-green-400 rounded-xl px-4 py-3 text-sm mb-6 flex items-center justify-between">
            <span>All stages complete. The Venture Operating System Design is ready.</span>
            <Link href={`/vdos-blueprint/${engagement.id}`} target="_blank" className="bg-gold-500 hover:bg-gold-400 text-white font-semibold px-3 py-1.5 rounded-lg text-xs">
              View VOS Blueprint
            </Link>
          </div>
        )}

        <div className="grid md:grid-cols-[280px_1fr] gap-6">
          <ol className="flex flex-col gap-1">
            {STAGE_SEQUENCE.map((def) => {
              const stage = stages.find((s) => s.stage_number === def.stageNumber)
              const isOpen = openStageId === stage?.id
              return (
                <li key={def.stageNumber}>
                  <button
                    onClick={() => stage && setOpenStageId(isOpen ? null : stage.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                      stage?.stage_number === engagement.current_stage ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <StatusDot status={stage?.status} isGate={def.isGate} />
                    {def.stageNumber}. {def.title}
                  </button>
                  {isOpen && stage?.output && (
                    <pre className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-[10px] text-slate-300 overflow-x-auto mt-1 mb-2 max-h-64">
                      {JSON.stringify(stage.output, null, 2)}
                    </pre>
                  )}
                </li>
              )
            })}
          </ol>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            {error && (
              <div className="bg-red-900/30 border border-red-800 text-red-400 rounded-xl px-4 py-3 text-sm mb-4">{error}</div>
            )}

            {!isDone && currentStage && (
              <>
                <h2 className="text-white font-bold text-lg mb-2">
                  Stage {currentStage.stage_number}: {STAGE_SEQUENCE.find((s) => s.stageNumber === currentStage.stage_number)?.title}
                </h2>
                {currentStage.is_gate && (
                  <p className="text-gold-400 text-xs font-semibold mb-3 uppercase tracking-wide">Gate Stage</p>
                )}

                {currentStage.status === 'gated_blocked' ? (
                  <div className="bg-red-900/30 border border-red-800 text-red-400 rounded-xl px-4 py-3 text-sm mb-4">
                    This gate is currently blocked. Review the output for gate_rationale, gather more evidence, then re-run the stage.
                    <button
                      onClick={() => runStage(currentStage.stage_number)}
                      disabled={running}
                      className="block mt-3 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
                    >
                      Re-run Stage
                    </button>
                  </div>
                ) : missingAsqKeys.length > 0 ? (
                  <div className="flex flex-col gap-6">
                    <p className="text-slate-400 text-sm">
                      This stage needs real evidence from the following ASQ instrument(s) before it can run:
                    </p>
                    {missingAsqKeys.map((key) => (
                      <div key={key} className="border border-slate-800 rounded-xl p-4">
                        <h3 className="text-white font-semibold text-sm mb-3 uppercase">{key}</h3>
                        <AsqForm asqKey={key} submitting={running} onSubmit={(raw) => submitAsq(key, raw)} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <button
                    onClick={() => runStage(currentStage.stage_number)}
                    disabled={running}
                    className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl"
                  >
                    {running ? 'Running…' : `Run Stage ${currentStage.stage_number} →`}
                  </button>
                )}

                {ASQ_PREREQUISITES_BY_STAGE[currentStage.stage_number] && missingAsqKeys.length === 0 && (
                  <p className="text-slate-500 text-xs mt-3">
                    Requires evidence from: {ASQ_PREREQUISITES_BY_STAGE[currentStage.stage_number]!.join(', ')}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusDot({ status, isGate }: { status?: string; isGate: boolean }) {
  const color =
    status === 'complete'
      ? 'bg-green-400'
      : status === 'gated_blocked'
        ? 'bg-red-400'
        : status === 'in_progress'
          ? 'bg-gold-400 animate-pulse'
          : 'bg-slate-600'
  return <span className={`w-2 h-2 rounded-full ${color} ${isGate ? 'ring-2 ring-offset-1 ring-offset-slate-950 ring-gold-500' : ''}`} />
}

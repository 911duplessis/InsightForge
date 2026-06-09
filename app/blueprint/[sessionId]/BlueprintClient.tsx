'use client'

import { useState } from 'react'
import type { ForgeAnalysis } from '@/types'

interface BlueprintClientProps {
  analysis: ForgeAnalysis
  clientName: string
  companyName: string
  sessionId: string
  generatedAt: string
}

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) {
  return (
    <div className="blueprint-header flex items-center gap-4 bg-forge-950 text-white px-8 py-5 rounded-t-xl">
      <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center text-forge-950 font-black text-lg flex-shrink-0">
        {number}
      </div>
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        {subtitle && <p className="text-slate-300 text-sm mt-0.5">{subtitle}</p>}
      </div>
    </div>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`blueprint-card bg-white rounded-xl border border-slate-200 p-6 ${className}`}>
      {children}
    </div>
  )
}

function Badge({
  children,
  variant = 'default',
}: {
  children: React.ReactNode
  variant?: 'default' | 'green' | 'red' | 'yellow' | 'blue' | 'purple'
}) {
  const styles = {
    default: 'bg-slate-100 text-slate-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-gold-100 text-gold-800',
    blue: 'bg-forge-100 text-forge-700',
    purple: 'bg-purple-100 text-purple-700',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${styles[variant]}`}>
      {children}
    </span>
  )
}

function ConfidenceBar({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-gold-500' : 'bg-red-400'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-100 rounded-full h-2">
        <div
          className={`confidence-bar h-full rounded-full ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-slate-600 w-8 text-right">{score}%</span>
    </div>
  )
}

function DifficultyBadge({ difficulty }: { difficulty: 'Low' | 'Medium' | 'High' }) {
  const map = { Low: 'green', Medium: 'yellow', High: 'red' } as const
  return <Badge variant={map[difficulty]}>{difficulty}</Badge>
}

function PriorityBadge({ priority }: { priority: 'Critical' | 'High' | 'Medium' | 'Low' }) {
  const map = { Critical: 'red', High: 'yellow', Medium: 'blue', Low: 'default' } as const
  return <Badge variant={map[priority]}>{priority}</Badge>
}

export default function BlueprintClient({
  analysis,
  clientName,
  companyName,
  sessionId,
  generatedAt,
}: BlueprintClientProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'opportunities' | 'roadmap' | 'kpis'>('overview')

  const handlePrint = () => {
    window.print()
  }

  const formattedDate = new Date(generatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const tabs = [
    { id: 'overview' as const, label: 'Executive Overview' },
    { id: 'opportunities' as const, label: 'Opportunities' },
    { id: 'roadmap' as const, label: 'Growth Roadmap' },
    { id: 'kpis' as const, label: 'KPI Dashboard' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Print Header (shown only when printing) */}
      <div className="hidden print:block bg-forge-950 text-white p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center">
                <span className="text-forge-950 font-bold text-sm">IF</span>
              </div>
              <span className="font-bold text-xl">InsightForge Discover™</span>
            </div>
            <h1 className="text-3xl font-black">Strategic Blueprint</h1>
            <p className="text-slate-300 mt-1">FORGE Framework™ Analysis</p>
          </div>
          <div className="text-right">
            <p className="text-slate-300 text-sm">Prepared for</p>
            <p className="text-xl font-bold">{companyName}</p>
            <p className="text-slate-300 text-sm">{clientName}</p>
            <p className="text-slate-400 text-xs mt-1">Generated {formattedDate}</p>
          </div>
        </div>
      </div>

      {/* Screen Header */}
      <div className="no-print bg-forge-950 text-white py-5 px-6 sticky top-0 z-30 shadow-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center">
              <span className="text-forge-950 font-bold text-sm">IF</span>
            </div>
            <div>
              <span className="font-bold text-lg">InsightForge Blueprint™</span>
              <p className="text-slate-400 text-xs">{companyName} · {formattedDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-forge-800 hover:bg-forge-700 border border-forge-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print / Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Cover Section */}
      <div className="no-print bg-gradient-to-r from-forge-900 to-forge-700 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div>
              <Badge variant="yellow">FORGE Framework™ Analysis</Badge>
              <h1 className="text-4xl font-black mt-3 mb-2">Strategic Blueprint</h1>
              <p className="text-slate-300 text-lg">
                Prepared for <span className="text-white font-semibold">{companyName}</span>
              </p>
              <p className="text-slate-400 text-sm mt-1">Att: {clientName} · {formattedDate}</p>
            </div>
            <div className="flex gap-4">
              {analysis.opportunity_matrix && (
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-black text-gold-400">
                    {analysis.opportunity_matrix.length}
                  </div>
                  <div className="text-slate-300 text-xs mt-1">Opportunities</div>
                </div>
              )}
              {analysis.quick_wins && (
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-black text-green-400">
                    {analysis.quick_wins.length}
                  </div>
                  <div className="text-slate-300 text-xs mt-1">Quick Wins</div>
                </div>
              )}
              {analysis.revenue_leaks && (
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-black text-red-400">
                    {analysis.revenue_leaks.length}
                  </div>
                  <div className="text-slate-300 text-xs mt-1">Revenue Leaks</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="no-print bg-white border-b border-slate-200 sticky top-[72px] z-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-forge-500 text-forge-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* ==================== OVERVIEW TAB ==================== */}
        {(activeTab === 'overview' || typeof window === 'undefined') && (
          <div className="space-y-8">

            {/* Executive Summary */}
            <div className="blueprint-section rounded-xl overflow-hidden shadow-sm">
              <SectionHeader number="01" title="Executive Summary" subtitle="FORGE Framework™ Intelligence Report" />
              <Card className="rounded-t-none border-t-0">
                <div className="prose max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
                  {analysis.executive_summary}
                </div>
              </Card>
            </div>

            {/* Current Reality */}
            <div className="blueprint-section rounded-xl overflow-hidden shadow-sm">
              <SectionHeader number="02" title="Current Reality" subtitle="F — Find Reality" />
              <div className="bg-white border border-t-0 border-slate-200 rounded-b-xl">
                <div className="p-6 border-b border-slate-100">
                  <p className="text-slate-700 leading-relaxed">{analysis.current_reality?.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                  <div className="p-6">
                    <h3 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                      <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">✓</span>
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {analysis.current_reality?.strengths?.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-red-600 mb-3 flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xs">!</span>
                      Weaknesses
                    </h3>
                    <ul className="space-y-2">
                      {analysis.current_reality?.weaknesses?.map((w, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Leaks */}
            <div className="blueprint-section rounded-xl overflow-hidden shadow-sm">
              <SectionHeader number="03" title="Revenue Leak Analysis" subtitle="Where money is leaving your business" />
              <div className="bg-white border border-t-0 border-slate-200 rounded-b-xl divide-y divide-slate-100">
                {analysis.revenue_leaks?.map((leak, i) => (
                  <div key={i} className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold text-sm flex-shrink-0">
                          {i + 1}
                        </div>
                        <h3 className="font-semibold text-slate-900">{leak.description}</h3>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <PriorityBadge priority={leak.priority} />
                        <span className="text-sm font-bold text-red-600">{leak.estimated_impact}</span>
                      </div>
                    </div>
                    <div className="ml-11">
                      <p className="text-sm text-slate-600 mb-3">
                        <span className="font-medium text-green-700">Fix: </span>
                        {leak.fix}
                      </p>
                      <ConfidenceBar score={leak.confidence_score} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SWOT */}
            <div className="blueprint-section rounded-xl overflow-hidden shadow-sm">
              <SectionHeader number="04" title="SWOT Analysis" subtitle="Strategic position assessment" />
              <div className="grid grid-cols-2 gap-0 bg-white border border-t-0 border-slate-200 rounded-b-xl overflow-hidden">
                {[
                  { key: 'strengths', label: 'Strengths', color: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-200' },
                  { key: 'weaknesses', label: 'Weaknesses', color: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-200' },
                  { key: 'opportunities', label: 'Opportunities', color: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200' },
                  { key: 'threats', label: 'Threats', color: 'bg-amber-50', textColor: 'text-amber-700', borderColor: 'border-amber-200' },
                ].map((quadrant, qi) => (
                  <div
                    key={quadrant.key}
                    className={`p-6 ${quadrant.color} ${qi === 0 ? 'border-r border-b border-slate-200' : qi === 1 ? 'border-b border-slate-200' : qi === 2 ? 'border-r border-slate-200' : ''}`}
                  >
                    <h3 className={`font-bold text-sm uppercase tracking-wider mb-3 ${quadrant.textColor}`}>
                      {quadrant.label}
                    </h3>
                    <ul className="space-y-1.5">
                      {(analysis.swot?.[quadrant.key as keyof typeof analysis.swot] as string[])?.map((item, i) => (
                        <li key={i} className="text-sm text-slate-700 flex items-start gap-1.5">
                          <span className={`${quadrant.textColor} mt-1 flex-shrink-0 text-xs`}>▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Wins */}
            <div className="blueprint-section rounded-xl overflow-hidden shadow-sm">
              <SectionHeader number="05" title="Quick Win Playbook" subtitle="G — Generate Solutions · Immediate actions" />
              <div className="bg-white border border-t-0 border-slate-200 rounded-b-xl divide-y divide-slate-100">
                {analysis.quick_wins?.map((win, i) => (
                  <div key={i} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold text-sm flex-shrink-0">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <h3 className="font-semibold text-slate-900">{win.action}</h3>
                          <Badge variant="green">{win.timeline}</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          <span className="font-medium">Impact: </span>{win.expected_impact}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span><span className="font-medium">Owner:</span> {win.owner}</span>
                          <span><span className="font-medium">Resources:</span> {win.resources_needed}</span>
                        </div>
                        <div className="mt-2">
                          <ConfidenceBar score={win.confidence_score} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Recommendation */}
            <div className="blueprint-section rounded-xl overflow-hidden shadow-sm">
              <SectionHeader number="06" title="Final Recommendation" subtitle="E — Execute & Evolve · Your top priority" />
              <div className="bg-white border border-t-0 border-slate-200 rounded-b-xl p-6">
                <div className="bg-forge-50 border border-forge-200 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-forge-900 mb-2">Top Priority</h3>
                  <p className="text-forge-800 font-semibold text-lg">{analysis.final_recommendation?.top_priority}</p>
                </div>
                <p className="text-slate-700 mb-6">{analysis.final_recommendation?.reasoning}</p>
                <div>
                  <h4 className="font-bold text-slate-800 mb-3">First 30 Days Action Plan</h4>
                  <div className="space-y-2">
                    {analysis.final_recommendation?.first_30_days?.map((action, i) => (
                      <div key={i} className="flex items-start gap-3 bg-slate-50 rounded-lg p-3">
                        <div className="w-6 h-6 bg-forge-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </div>
                        <p className="text-sm text-slate-700">{action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== OPPORTUNITIES TAB ==================== */}
        {activeTab === 'opportunities' && (
          <div className="space-y-8">

            {/* Opportunity Matrix */}
            <div className="blueprint-section rounded-xl overflow-hidden shadow-sm">
              <SectionHeader number="07" title="Opportunity Matrix" subtitle="R — Reveal Opportunities · Ranked by priority" />
              <div className="bg-white border border-t-0 border-slate-200 rounded-b-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold text-slate-600">#</th>
                        <th className="text-left px-4 py-3 font-semibold text-slate-600">Opportunity</th>
                        <th className="text-left px-4 py-3 font-semibold text-slate-600">Revenue Potential</th>
                        <th className="text-left px-4 py-3 font-semibold text-slate-600">Difficulty</th>
                        <th className="text-left px-4 py-3 font-semibold text-slate-600">Time to Value</th>
                        <th className="text-left px-4 py-3 font-semibold text-slate-600">Confidence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {analysis.opportunity_matrix?.map((opp, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-4">
                            <div className="w-7 h-7 bg-forge-100 text-forge-700 rounded-lg flex items-center justify-center font-bold text-xs">
                              {opp.priority}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <p className="font-medium text-slate-900">{opp.opportunity}</p>
                            <Badge variant="blue" >{opp.category}</Badge>
                          </td>
                          <td className="px-4 py-4 font-semibold text-green-700">{opp.revenue_potential}</td>
                          <td className="px-4 py-4">
                            <DifficultyBadge difficulty={opp.difficulty} />
                          </td>
                          <td className="px-4 py-4 text-slate-600">{opp.time_to_value}</td>
                          <td className="px-4 py-4 w-32">
                            <ConfidenceBar score={opp.confidence_score} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Market Gap Analysis */}
            {analysis.market_gap_analysis && (
              <div className="blueprint-section rounded-xl overflow-hidden shadow-sm">
                <SectionHeader number="08" title="Market Gap Analysis" subtitle="O — Observe Patterns" />
                <div className="bg-white border border-t-0 border-slate-200 rounded-b-xl p-6">
                  <p className="text-slate-700 mb-6">{analysis.market_gap_analysis.competitive_landscape}</p>
                  <div className="space-y-4">
                    {analysis.market_gap_analysis.identified_gaps?.map((gap, i) => (
                      <div key={i} className="border border-slate-200 rounded-xl p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-900 mb-1">{gap.gap}</p>
                            <p className="text-sm text-green-700 font-medium">{gap.market_size_estimate}</p>
                          </div>
                          <Badge variant={gap.ease_of_capture === 'High' ? 'green' : gap.ease_of_capture === 'Medium' ? 'yellow' : 'red'}>
                            {gap.ease_of_capture} ease
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Financial Opportunities */}
            {analysis.financial_opportunities && (
              <div className="blueprint-section rounded-xl overflow-hidden shadow-sm">
                <SectionHeader number="09" title="Financial Opportunities" subtitle="Revenue optimization and cost reduction" />
                <div className="bg-white border border-t-0 border-slate-200 rounded-b-xl p-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                    <p className="text-sm text-green-700 font-medium">Total Opportunity Estimate</p>
                    <p className="text-2xl font-black text-green-800">{analysis.financial_opportunities.total_opportunity_estimate}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-slate-800 mb-3">Revenue Optimization</h4>
                      <ul className="space-y-2">
                        {analysis.financial_opportunities.revenue_optimization?.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <span className="text-green-500 mt-0.5">↑</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-3">Cost Reduction</h4>
                      <ul className="space-y-2">
                        {analysis.financial_opportunities.cost_reduction?.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <span className="text-blue-500 mt-0.5">↓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Strategic Initiatives */}
            {analysis.strategic_initiatives && (
              <div className="blueprint-section rounded-xl overflow-hidden shadow-sm">
                <SectionHeader number="10" title="Strategic Initiatives" subtitle="High-impact programs for sustained growth" />
                <div className="bg-white border border-t-0 border-slate-200 rounded-b-xl divide-y divide-slate-100">
                  {analysis.strategic_initiatives?.map((init, i) => (
                    <div key={i} className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="font-bold text-slate-900 text-lg">{init.initiative}</h3>
                        <Badge variant="blue">{init.timeline}</Badge>
                      </div>
                      <p className="text-slate-600 mb-3">{init.objective}</p>
                      <div className="flex flex-wrap gap-4 text-sm mb-4">
                        <span className="text-slate-600"><span className="font-medium">Investment:</span> {init.investment_required}</span>
                        <span className="text-green-700 font-medium"><span className="text-slate-600 font-normal">Expected ROI:</span> {init.expected_roi}</span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Key Milestones</p>
                        <div className="flex flex-wrap gap-2">
                          {init.key_milestones?.map((m, mi) => (
                            <span key={mi} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-lg">{m}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== ROADMAP TAB ==================== */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8">

            {/* 90-Day Growth Roadmap */}
            <div className="blueprint-section rounded-xl overflow-hidden shadow-sm">
              <SectionHeader number="11" title="90-Day Growth Roadmap" subtitle="E — Execute & Evolve · Phased action plan" />
              <div className="bg-white border border-t-0 border-slate-200 rounded-b-xl p-6">
                <div className="space-y-6">
                  {[
                    { phase: 'phase_1', color: 'green', borderColor: 'border-green-200', bgColor: 'bg-green-50', textColor: 'text-green-800' },
                    { phase: 'phase_2', color: 'blue', borderColor: 'border-forge-200', bgColor: 'bg-forge-50', textColor: 'text-forge-800' },
                    { phase: 'phase_3', color: 'purple', borderColor: 'border-purple-200', bgColor: 'bg-purple-50', textColor: 'text-purple-800' },
                  ].map(({ phase, borderColor, bgColor, textColor }) => {
                    const phaseData = analysis.growth_roadmap?.[phase as keyof typeof analysis.growth_roadmap]
                    if (!phaseData) return null
                    return (
                      <div key={phase} className={`border ${borderColor} rounded-xl overflow-hidden`}>
                        <div className={`${bgColor} px-6 py-4`}>
                          <div className="flex items-center justify-between">
                            <h3 className={`font-bold text-lg ${textColor}`}>{phaseData.title}</h3>
                            <Badge variant={phase === 'phase_1' ? 'green' : phase === 'phase_2' ? 'blue' : 'purple'}>
                              {phaseData.duration}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wider">Actions</h4>
                            <ul className="space-y-2">
                              {phaseData.actions?.map((action: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                  <span className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 text-xs font-bold flex-shrink-0 mt-0.5">
                                    {i + 1}
                                  </span>
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wider">Expected Outcomes</h4>
                            <ul className="space-y-2">
                              {phaseData.expected_outcomes?.map((outcome: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                  <span className="text-green-500 mt-0.5">✓</span>
                                  {outcome}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Marketing Recommendations */}
            {analysis.marketing_recommendations && (
              <div className="blueprint-section rounded-xl overflow-hidden shadow-sm">
                <SectionHeader number="12" title="Marketing Recommendations" subtitle="Growth channel strategy" />
                <div className="bg-white border border-t-0 border-slate-200 rounded-b-xl divide-y divide-slate-100">
                  {analysis.marketing_recommendations?.map((rec, i) => (
                    <div key={i} className="p-6">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-bold text-slate-900">{rec.strategy}</h3>
                        <Badge variant="purple">{rec.channel}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">
                        <span className="font-medium">Target:</span> {rec.target_audience}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                        <span><span className="font-medium">Impact:</span> {rec.expected_impact}</span>
                        <span><span className="font-medium">Budget:</span> {rec.budget_estimate}</span>
                        <span><span className="font-medium">Timeline:</span> {rec.timeline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Recommendations */}
            {analysis.technology_recommendations && (
              <div className="blueprint-section rounded-xl overflow-hidden shadow-sm">
                <SectionHeader number="13" title="Technology Recommendations" subtitle="Tools to accelerate your growth" />
                <div className="bg-white border border-t-0 border-slate-200 rounded-b-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="text-left px-4 py-3 font-semibold text-slate-600">Tool</th>
                          <th className="text-left px-4 py-3 font-semibold text-slate-600">Purpose</th>
                          <th className="text-left px-4 py-3 font-semibold text-slate-600">Cost/mo</th>
                          <th className="text-left px-4 py-3 font-semibold text-slate-600">Priority</th>
                          <th className="text-left px-4 py-3 font-semibold text-slate-600">Complexity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {analysis.technology_recommendations?.map((tech, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-semibold text-slate-900">{tech.tool}</td>
                            <td className="px-4 py-3 text-slate-600">{tech.purpose}</td>
                            <td className="px-4 py-3 text-slate-700">{tech.estimated_cost}</td>
                            <td className="px-4 py-3">
                              <Badge variant={tech.priority === 'High' ? 'red' : tech.priority === 'Medium' ? 'yellow' : 'default'}>
                                {tech.priority}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <DifficultyBadge difficulty={tech.implementation_complexity as 'Low' | 'Medium' | 'High'} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Risk Assessment */}
            {analysis.risk_assessment && (
              <div className="blueprint-section rounded-xl overflow-hidden shadow-sm">
                <SectionHeader number="14" title="Risk Assessment" subtitle="Know the obstacles before you hit them" />
                <div className="bg-white border border-t-0 border-slate-200 rounded-b-xl divide-y divide-slate-100">
                  {analysis.risk_assessment?.map((risk, i) => (
                    <div key={i} className="p-5 flex items-start gap-4">
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <Badge variant={risk.likelihood === 'High' ? 'red' : risk.likelihood === 'Medium' ? 'yellow' : 'green'}>
                          {risk.likelihood}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 mb-1">{risk.risk}</p>
                        <p className="text-sm text-slate-600">
                          <span className="font-medium text-slate-700">Mitigation: </span>
                          {risk.mitigation}
                        </p>
                      </div>
                      <Badge variant={risk.impact === 'High' ? 'red' : risk.impact === 'Medium' ? 'yellow' : 'green'}>
                        {risk.impact} impact
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== KPIs TAB ==================== */}
        {activeTab === 'kpis' && analysis.kpi_dashboard && (
          <div className="space-y-8">
            <div className="blueprint-section rounded-xl overflow-hidden shadow-sm">
              <SectionHeader number="15" title="KPI Dashboard" subtitle="Measurable targets for success" />
              <div className="bg-white border border-t-0 border-slate-200 rounded-b-xl p-6 space-y-8">

                {[
                  { key: 'revenue_kpis', label: 'Revenue KPIs', color: 'green' },
                  { key: 'growth_kpis', label: 'Growth KPIs', color: 'blue' },
                  { key: 'operational_kpis', label: 'Operational KPIs', color: 'purple' },
                ].map(({ key, label }) => {
                  const kpis = analysis.kpi_dashboard?.[key as keyof typeof analysis.kpi_dashboard]
                  if (!kpis || kpis.length === 0) return null
                  return (
                    <div key={key}>
                      <h3 className="font-bold text-slate-800 text-lg mb-4">{label}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {kpis.map((kpi, i) => (
                          <div key={i} className="border border-slate-200 rounded-xl p-4">
                            <p className="font-semibold text-slate-900 mb-3">{kpi.name}</p>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-slate-500">Current</span>
                              <span className="font-medium text-slate-700">{kpi.current_estimate}</span>
                            </div>
                            <div className="flex justify-between text-sm mb-3">
                              <span className="text-slate-500">Target</span>
                              <span className="font-bold text-green-700">{kpi.target}</span>
                            </div>
                            <div className="border-t border-slate-100 pt-2">
                              <Badge variant="blue">{kpi.timeline}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}

                {/* Success Metrics */}
                {analysis.final_recommendation?.success_metrics && (
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg mb-4">Success Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {analysis.final_recommendation.success_metrics.map((metric, i) => (
                        <div key={i} className="flex items-center gap-3 bg-forge-50 border border-forge-200 rounded-xl p-4">
                          <div className="w-8 h-8 bg-forge-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {i + 1}
                          </div>
                          <p className="text-forge-900 font-medium text-sm">{metric}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="no-print border-t border-slate-200 pt-8 pb-4 text-center text-slate-400 text-sm">
          <p>Session ID: {sessionId}</p>
          <p className="mt-1">© InsightForge Discover™ · Powered by FORGE Framework™</p>
        </div>
      </div>
    </div>
  )
}

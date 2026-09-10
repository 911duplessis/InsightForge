'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { STAGE_SEQUENCE } from '@/types/vdos'

interface Business {
  id: string
  name: string
  slug: string
  status: string
}

interface ClientInfo {
  first_name: string
  last_name: string
  email: string
  company_name?: string
}

export interface VdosEngagementRow {
  id: string
  status: string
  current_stage: number
  created_at: string
  client: ClientInfo
}

export interface ForgeLiteSessionRow {
  id: string
  status: string
  created_at: string
  client: ClientInfo
  insight?: { id: string; analyzed_at: string; tokens_used?: number }
  blueprint?: { id: string; viewed_at?: string; generated_at: string }
  opportunities?: Array<{ id: string; title: string; revenue_potential?: string; priority?: number }>
}

interface CommandDashboardProps {
  businesses: Business[]
  activeBusinessId: string | null
  engagements: VdosEngagementRow[]
  forgeLiteSessions: ForgeLiteSessionRow[]
  blueprintEngagementIds: string[]
  isAdmin: boolean
}

export default function CommandDashboard({
  businesses,
  activeBusinessId,
  engagements,
  forgeLiteSessions,
  blueprintEngagementIds,
  isAdmin,
}: CommandDashboardProps) {
  const router = useRouter()
  const [switching, setSwitching] = useState(false)

  const handleSwitchBusiness = async (businessId: string) => {
    setSwitching(true)
    await fetch('/api/command/select-business', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ business_id: businessId }),
    })
    router.refresh()
    setSwitching(false)
  }

  const handleLogout = async () => {
    await fetch('/api/command/logout', { method: 'POST' })
    window.location.href = '/command/login'
  }

  const activeBusiness = businesses.find((b) => b.id === activeBusinessId)

  return (
    <div className="min-h-screen bg-slate-950">
      <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IF</span>
            </div>
            <div>
              <span className="text-white font-bold text-lg">InsightForge</span>
              <span className="text-gold-400 font-bold text-lg"> COMMAND™</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={activeBusinessId ?? ''}
              disabled={switching}
              onChange={(e) => handleSwitchBusiness(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-forge-500"
            >
              {businesses.length === 0 && <option value="">No businesses assigned</option>}
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            {activeBusiness && (
              <Link
                href={`/discover?business=${activeBusiness.slug}`}
                target="_blank"
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                ↗ New Engagement
              </Link>
            )}
            <button onClick={handleLogout} className="text-slate-400 hover:text-white text-sm transition-colors">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!activeBusiness ? (
          <div className="py-20 text-center text-slate-500">
            <p className="text-lg">No business selected</p>
            <p className="text-sm mt-1">
              {isAdmin ? 'Onboard a business via the businesses API to get started.' : 'Ask an admin to grant you access to a business.'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <p className="text-slate-400 text-sm mb-1">VDOS Engagements</p>
                <p className="text-3xl font-black text-white">{engagements.length}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <p className="text-slate-400 text-sm mb-1">Completed VOS Blueprints</p>
                <p className="text-3xl font-black text-gold-400">
                  {engagements.filter((e) => e.status === 'completed').length}
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <p className="text-slate-400 text-sm mb-1">FORGE Lite Sessions</p>
                <p className="text-3xl font-black text-white">{forgeLiteSessions.length}</p>
              </div>
            </div>

            <section className="mb-10">
              <h2 className="text-white font-bold text-lg mb-4">VDOS Engagements — {activeBusiness.name}</h2>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                {engagements.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-sm">
                    No VDOS engagements yet for this business.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-800 bg-slate-800/50">
                          <th className="text-left px-6 py-4 font-semibold text-slate-400">Founder</th>
                          <th className="text-left px-6 py-4 font-semibold text-slate-400">Stage</th>
                          <th className="text-left px-6 py-4 font-semibold text-slate-400">Status</th>
                          <th className="text-left px-6 py-4 font-semibold text-slate-400">Date</th>
                          <th className="text-left px-6 py-4 font-semibold text-slate-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/50">
                        {engagements.map((e) => {
                          const stageDef = STAGE_SEQUENCE.find((s) => s.stageNumber === e.current_stage)
                          return (
                            <tr key={e.id} className="hover:bg-slate-800/30 transition-colors">
                              <td className="px-6 py-4">
                                <p className="font-semibold text-white">
                                  {e.client.first_name} {e.client.last_name}
                                </p>
                                <p className="text-slate-500 text-xs mt-0.5">{e.client.email}</p>
                              </td>
                              <td className="px-6 py-4 text-slate-300">
                                {stageDef ? `${stageDef.stageNumber}. ${stageDef.title}` : '—'}
                              </td>
                              <td className="px-6 py-4">
                                <EngagementStatusBadge status={e.status} />
                              </td>
                              <td className="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">
                                {new Date(e.created_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <Link
                                    href={`/engagements/${e.id}`}
                                    className="bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                                  >
                                    Open
                                  </Link>
                                  {blueprintEngagementIds.includes(e.id) && (
                                    <Link
                                      href={`/vdos-blueprint/${e.id}`}
                                      target="_blank"
                                      className="bg-gold-500 hover:bg-gold-400 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                                    >
                                      View VOS
                                    </Link>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-4">FORGE Lite Sessions — {activeBusiness.name}</h2>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                {forgeLiteSessions.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-sm">
                    No FORGE Lite sessions yet for this business.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-800 bg-slate-800/50">
                          <th className="text-left px-6 py-4 font-semibold text-slate-400">Client</th>
                          <th className="text-left px-6 py-4 font-semibold text-slate-400">Status</th>
                          <th className="text-left px-6 py-4 font-semibold text-slate-400">Top Opportunity</th>
                          <th className="text-left px-6 py-4 font-semibold text-slate-400">Date</th>
                          <th className="text-left px-6 py-4 font-semibold text-slate-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/50">
                        {forgeLiteSessions.map((s) => {
                          const topOpp = s.opportunities?.sort((a, b) => (a.priority || 99) - (b.priority || 99))[0]
                          return (
                            <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                              <td className="px-6 py-4">
                                <p className="font-semibold text-white">
                                  {s.client.first_name} {s.client.last_name}
                                </p>
                                <p className="text-slate-500 text-xs mt-0.5">{s.client.email}</p>
                              </td>
                              <td className="px-6 py-4">
                                <ForgeStatusBadge status={s.status} viewed={!!s.blueprint?.viewed_at} />
                              </td>
                              <td className="px-6 py-4">
                                {topOpp ? (
                                  <p className="text-slate-300 text-xs leading-snug max-w-xs truncate">{topOpp.title}</p>
                                ) : (
                                  <span className="text-slate-600">—</span>
                                )}
                              </td>
                              <td className="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">
                                {new Date(s.created_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </td>
                              <td className="px-6 py-4">
                                {s.status === 'analyzed' ? (
                                  <Link
                                    href={`/blueprint/${s.id}`}
                                    target="_blank"
                                    className="bg-gold-500 hover:bg-gold-400 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                                  >
                                    View Blueprint
                                  </Link>
                                ) : (
                                  <span className="text-slate-600 text-xs">Awaiting analysis</span>
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}

function EngagementStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    completed: 'bg-green-900/50 text-green-400 border border-green-800',
    gated: 'bg-red-900/50 text-red-400 border border-red-800',
    active: 'bg-gold-900/50 text-gold-400 border border-gold-800',
    in_progress: 'bg-slate-800 text-slate-400',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${styles[status] ?? styles.in_progress}`}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}

function ForgeStatusBadge({ status, viewed }: { status: string; viewed: boolean }) {
  if (status === 'analyzed') {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${
        viewed ? 'bg-slate-700 text-slate-300' : 'bg-green-900/50 text-green-400 border border-green-800'
      }`}>
        {viewed ? 'Viewed' : 'Blueprint Ready'}
      </span>
    )
  }
  if (status === 'completed') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-gold-900/50 text-gold-400 border border-gold-800">
        Analyzing
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400">
      In Progress
    </span>
  )
}

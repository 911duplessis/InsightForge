'use client'

import { useState } from 'react'
import Link from 'next/link'

interface SessionRow {
  id: string
  status: string
  created_at: string
  completed_at?: string
  client: {
    first_name: string
    last_name: string
    email: string
    company_name?: string
  }
  insight?: {
    id: string
    analyzed_at: string
    tokens_used?: number
  }
  blueprint?: {
    id: string
    viewed_at?: string
    generated_at: string
  }
  opportunities?: Array<{
    id: string
    title: string
    revenue_potential?: string
    priority?: number
    confidence_score?: number
  }>
}

interface CommandDashboardProps {
  sessions: SessionRow[]
  totalClients: number
  analyzedSessions: number
}

export default function CommandDashboard({
  sessions,
  totalClients,
  analyzedSessions,
}: CommandDashboardProps) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'analyzed' | 'pending'>('all')

  const filtered = sessions.filter((s) => {
    const matchesSearch =
      !search ||
      s.client.first_name.toLowerCase().includes(search.toLowerCase()) ||
      s.client.last_name.toLowerCase().includes(search.toLowerCase()) ||
      s.client.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.client.company_name || '').toLowerCase().includes(search.toLowerCase())

    const matchesFilter =
      filter === 'all' ||
      (filter === 'analyzed' && s.status === 'analyzed') ||
      (filter === 'pending' && s.status !== 'analyzed')

    return matchesSearch && matchesFilter
  })

  const handleLogout = async () => {
    await fetch('/api/command/logout', { method: 'POST' })
    window.location.href = '/command/login'
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Nav */}
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
            <Link
              href="/discover"
              target="_blank"
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              ↗ Discovery Form
            </Link>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Clients', value: totalClients, color: 'text-white' },
            { label: 'Total Sessions', value: sessions.length, color: 'text-white' },
            { label: 'Blueprints Generated', value: analyzedSessions, color: 'text-gold-400' },
            {
              label: 'Pending Analysis',
              value: sessions.filter((s) => s.status !== 'analyzed').length,
              color: 'text-red-400',
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
              <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search clients, companies, emails..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forge-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'analyzed', 'pending'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${
                  filter === f
                    ? 'bg-forge-600 text-white'
                    : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Sessions Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-20 text-center text-slate-500">
              <p className="text-lg">No sessions found</p>
              <p className="text-sm mt-1">
                {sessions.length === 0
                  ? 'Discovery sessions will appear here once submitted'
                  : 'Try adjusting your search or filter'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-800/50">
                    <th className="text-left px-6 py-4 font-semibold text-slate-400">Client</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-400">Company</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-400">Status</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-400">Top Opportunity</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-400">Date</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filtered.map((session) => {
                    const topOpp = session.opportunities?.sort((a, b) => (a.priority || 99) - (b.priority || 99))[0]
                    return (
                      <tr key={session.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-white">
                            {session.client.first_name} {session.client.last_name}
                          </p>
                          <p className="text-slate-500 text-xs mt-0.5">{session.client.email}</p>
                        </td>
                        <td className="px-6 py-4 text-slate-300">
                          {session.client.company_name || '—'}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={session.status} viewed={!!session.blueprint?.viewed_at} />
                        </td>
                        <td className="px-6 py-4">
                          {topOpp ? (
                            <div>
                              <p className="text-slate-300 text-xs leading-snug max-w-xs truncate">
                                {topOpp.title}
                              </p>
                              {topOpp.revenue_potential && (
                                <p className="text-green-400 text-xs font-medium mt-0.5">
                                  {topOpp.revenue_potential}
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">
                          {new Date(session.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {session.status === 'analyzed' ? (
                              <Link
                                href={`/blueprint/${session.id}`}
                                target="_blank"
                                className="bg-gold-500 hover:bg-gold-400 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                              >
                                View Blueprint
                              </Link>
                            ) : (
                              <span className="text-slate-600 text-xs">Awaiting analysis</span>
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

        <div className="mt-6 text-center text-slate-600 text-xs">
          InsightForge COMMAND™ · {filtered.length} of {sessions.length} sessions shown
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status, viewed }: { status: string; viewed: boolean }) {
  if (status === 'analyzed') {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${
        viewed ? 'bg-slate-700 text-slate-300' : 'bg-green-900/50 text-green-400 border border-green-800'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${viewed ? 'bg-slate-400' : 'bg-green-400'}`} />
        {viewed ? 'Viewed' : 'Blueprint Ready'}
      </span>
    )
  }
  if (status === 'completed') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-gold-900/50 text-gold-400 border border-gold-800">
        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
        Analyzing
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
      In Progress
    </span>
  )
}

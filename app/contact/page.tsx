'use client'

import { useState } from 'react'
import Link from 'next/link'

const BUDGET_OPTIONS = [
  { value: 'under_5k', label: 'Under R5,000' },
  { value: 'r5k_15k', label: 'R5,000 – R15,000' },
  { value: 'r15k_50k', label: 'R15,000 – R50,000' },
  { value: 'r50k_plus', label: 'R50,000+' },
]

const URGENCY_OPTIONS = [
  { value: 'immediate', label: 'Immediate — this changes how we operate right now' },
  { value: 'this_month', label: 'This month' },
  { value: 'this_quarter', label: 'This quarter' },
  { value: 'exploring', label: 'Exploring — no fixed timeline yet' },
]

type Status = 'idle' | 'submitting' | 'error' | { tier: 'forge_lite' | 'vdos' }

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    const form = new FormData(e.currentTarget)
    const payload = {
      first_name: String(form.get('first_name') || ''),
      last_name: String(form.get('last_name') || ''),
      email: String(form.get('email') || ''),
      phone: String(form.get('phone') || ''),
      industry: String(form.get('industry') || ''),
      budget_range: String(form.get('budget_range') || ''),
      urgency: String(form.get('urgency') || ''),
      problem_description: String(form.get('problem_description') || ''),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus({ tier: data.recommended_tier })
    } catch {
      setErrorMsg('Could not reach the server. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-forge-950 via-forge-900 to-forge-800">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IF</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">InsightForge</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/about" className="text-slate-400 hover:text-white text-sm transition-colors">About</Link>
          <Link href="/process" className="text-slate-400 hover:text-white text-sm transition-colors">Process</Link>
          <Link href="/projects" className="text-slate-400 hover:text-white text-sm transition-colors">Projects</Link>
          <Link href="/partners" className="text-slate-400 hover:text-white text-sm transition-colors">Partners</Link>
          <Link href="/contact" className="text-white text-sm font-medium">Contact</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-8 pt-16 pb-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white mb-4">Start a Discovery</h1>
          <p className="text-slate-300 leading-relaxed">
            A short intake, not a sales call. Answer honestly — we route you toward the
            right tier based on what you tell us, not what&apos;s easiest to sell.
          </p>
        </div>

        {typeof status === 'object' ? (
          <div className="bg-forge-900/50 border border-forge-700 rounded-2xl p-8 text-center">
            <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">Thanks — here&apos;s where to start.</h2>
            {status.tier === 'vdos' ? (
              <p className="text-slate-300 leading-relaxed mb-8">
                Based on what you shared, this looks like a full VDOS engagement —
                the 11-stage gated Discovery, validated by evidentiary instruments.
              </p>
            ) : (
              <p className="text-slate-300 leading-relaxed mb-8">
                Based on what you shared, FORGE Lite — a fast, single-pass Discovery — is
                the right place to start.
              </p>
            )}
            <Link
              href={status.tier === 'vdos' ? '/discover' : '/discover-lite'}
              className="inline-block bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all transform hover:scale-105 shadow-2xl shadow-gold-900/30"
            >
              {status.tier === 'vdos' ? 'Begin VDOS Discovery →' : 'Begin FORGE Lite →'}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-forge-900/50 border border-forge-700 rounded-2xl p-8 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label="First name" name="first_name" required />
              <Field label="Last name" name="last_name" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" />
            </div>
            <Field label="Industry" name="industry" />
            <Select label="Budget range" name="budget_range" options={BUDGET_OPTIONS} required />
            <Select label="Timeline" name="urgency" options={URGENCY_OPTIONS} required />
            <div>
              <label htmlFor="problem_description" className="text-slate-500 text-xs font-semibold uppercase mb-1.5 block">
                What&apos;s the problem you actually need solved?
              </label>
              <textarea
                id="problem_description"
                name="problem_description"
                required
                rows={5}
                className="w-full bg-forge-950 border border-forge-700 rounded-lg px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-gold-500"
                placeholder="Not what you want built — what you're actually trying to fix."
              />
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-sm">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 disabled:opacity-50 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all"
            >
              {status === 'submitting' ? 'Submitting…' : 'Submit →'}
            </button>
          </form>
        )}
      </div>

      <footer className="border-t border-forge-800 py-8 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} InsightForge™. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="text-slate-500 text-xs font-semibold uppercase mb-1.5 block">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full bg-forge-950 border border-forge-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500"
      />
    </div>
  )
}

function Select({
  label,
  name,
  options,
  required = false,
}: {
  label: string
  name: string
  options: { value: string; label: string }[]
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="text-slate-500 text-xs font-semibold uppercase mb-1.5 block">
        {label}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        className="w-full bg-forge-950 border border-forge-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500"
      >
        <option value="" disabled>Select one…</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

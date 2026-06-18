'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { BusinessAgnosticIntake } from '@/types/vdos'

const EMPTY_INTAKE: BusinessAgnosticIntake = {
  contact: { first_name: '', last_name: '', email: '', phone: '' },
  stated_idea: '',
  stated_industry: '',
  founder_background: '',
  available_resources: '',
  time_horizon: '',
}

function DiscoverFormInner() {
  const router = useRouter()
  const params = useSearchParams()
  const businessSlug = params.get('business')

  const [businessId, setBusinessId] = useState<string | null>(null)
  const [businessName, setBusinessName] = useState<string | null>(null)
  const [resolveError, setResolveError] = useState('')
  const [intake, setIntake] = useState<BusinessAgnosticIntake>(EMPTY_INTAKE)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!businessSlug) {
      setResolveError('No business specified. Use a link of the form /discover?business=your-business-slug.')
      return
    }
    fetch(`/api/businesses/by-slug/${businessSlug}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setBusinessId(json.data.id)
          setBusinessName(json.data.name)
        } else {
          setResolveError('This business link is not valid or is no longer active.')
        }
      })
      .catch(() => setResolveError('Could not verify this business link.'))
  }, [businessSlug])

  const update = <K extends keyof BusinessAgnosticIntake>(key: K, value: BusinessAgnosticIntake[K]) =>
    setIntake((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!businessId) return
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/engagements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ business_id: businessId, intake }),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error || 'Failed to start engagement')
      router.push(`/engagements/${json.data.engagement_id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (resolveError) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="bg-slate-900 border border-red-800 rounded-2xl p-8 max-w-md text-center">
          <p className="text-red-400 font-semibold">{resolveError}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white">VDOS Discovery Intake</h1>
          <p className="text-slate-400 text-sm mt-2">
            {businessName ? `Starting a Venture Discovery engagement for ${businessName}` : 'Loading…'}
          </p>
          <p className="text-slate-500 text-xs mt-2 max-w-lg mx-auto">
            This is a short intake. VDOS does not ask you to justify your idea — it interrogates
            it through evidence over the stages that follow. Answer honestly, including where
            you&apos;re uncertain.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="First name">
              <input
                required
                value={intake.contact.first_name}
                onChange={(e) => update('contact', { ...intake.contact, first_name: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Last name">
              <input
                required
                value={intake.contact.last_name}
                onChange={(e) => update('contact', { ...intake.contact, last_name: e.target.value })}
                className={inputClass}
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Email">
              <input
                required
                type="email"
                value={intake.contact.email}
                onChange={(e) => update('contact', { ...intake.contact, email: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Phone">
              <input
                value={intake.contact.phone}
                onChange={(e) => update('contact', { ...intake.contact, phone: e.target.value })}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="In your own words, what business idea or venture are we exploring?">
            <textarea
              required
              rows={3}
              value={intake.stated_idea}
              onChange={(e) => update('stated_idea', e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="What industry would you say this is?">
            <input
              required
              value={intake.stated_industry}
              onChange={(e) => update('stated_industry', e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Your background — skills, experience, network relevant to this venture">
            <textarea
              required
              rows={3}
              value={intake.founder_background}
              onChange={(e) => update('founder_background', e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="What resources do you currently have available (capital, team, existing customers, assets)?">
            <textarea
              required
              rows={3}
              value={intake.available_resources}
              onChange={(e) => update('available_resources', e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="What time horizon are you working with?">
            <input
              required
              value={intake.time_horizon}
              onChange={(e) => update('time_horizon', e.target.value)}
              className={inputClass}
              placeholder="e.g. 6 months to first revenue"
            />
          </Field>

          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-400 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !businessId}
            className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all"
          >
            {submitting ? 'Starting Discovery…' : 'Begin VDOS Discovery →'}
          </button>
        </form>
      </div>
    </div>
  )
}

const inputClass =
  'w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forge-500 focus:border-transparent'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-slate-400 text-sm font-medium block mb-2">{label}</label>
      {children}
    </div>
  )
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={null}>
      <DiscoverFormInner />
    </Suspense>
  )
}

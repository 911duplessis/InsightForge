'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CommandLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/command/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/command')
        router.refresh()
      } else {
        setError('Incorrect password. Access denied.')
      }
    } catch {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-black text-xl">IF</span>
          </div>
          <h1 className="text-2xl font-black text-white">COMMAND™</h1>
          <p className="text-slate-400 text-sm mt-1">Consultant Access Portal</p>
        </div>

        <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-slate-400 text-sm font-medium block mb-2">Access Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your consultant password"
                className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forge-500 focus:border-transparent"
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-800 text-red-400 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all"
            >
              {loading ? 'Authenticating...' : 'Access Command Center →'}
            </button>
          </div>
        </form>

        <p className="text-center text-slate-600 text-xs mt-6">
          InsightForge Discover™ · Consultant Portal
        </p>
      </div>
    </div>
  )
}

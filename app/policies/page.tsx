import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payment & Partnership Policies | InsightForge™',
  description:
    'How InsightForge structures deposits, milestone payments, and revenue share — public, specific, and the same for every engagement. No surprise invoices, no informal verbal terms.',
  openGraph: {
    title: 'Payment & Partnership Policies',
    description: 'Deposits, milestones, and revenue share — public and specific, not a PDF nobody reads.',
    type: 'website',
  },
}

const MILESTONES = [
  {
    pct: '30%',
    label: 'To begin',
    desc: 'Due on agreement of scope, before work starts. This isn’t a booking fee — it’s what lets us commit real time to your engagement instead of working it in around unpaid ones.',
  },
  {
    pct: '30%',
    label: 'At working demo',
    desc: 'Due once there’s something real to test — a working MVP or milestone build you can actually use, not a progress report or a screenshot.',
  },
  {
    pct: '40%',
    label: 'At final delivery',
    desc: 'Due on handover: final delivery, testing complete, training done, go-live support included. The largest share is tied to the thing actually being finished.',
  },
]

const POLICIES = [
  {
    title: 'You never pay for time — only for progress',
    desc: 'A milestone is paid when the agreed thing exists and works, never just because a week or a month has passed. You’re not billed for hours; you’re billed for something you can see and test.',
  },
  {
    title: 'You know the full cost and schedule before anything starts',
    desc: 'Deposit percentage, milestone triggers, and total value are set out in writing before the first hour of work — not negotiated informally partway through and formalized later. No mid-project surprises.',
  },
  {
    title: 'You’re never left chasing an update',
    desc: 'If something’s going to run late, you hear it directly and get a real date — not silence, and not a promise repeated without ever landing. This has cost us before; it’s why it’s policy now.',
  },
  {
    title: 'A referral never inflates what you pay',
    desc: 'Where InsightForge or a network partner refers you to another partner, the standard commission is 5% of the closed deal value — paid by the parties who benefited from the introduction, once work is delivered, never added to your invoice as a finder’s fee.',
  },
  {
    title: 'You never pay to access the network',
    desc: 'Consistent with the Partners page: there is no cost to be listed, recommended, or referred work. The only money that ever changes hands is commission on a real, closed transaction — never a fee for the introduction itself.',
  },
]

export default function PoliciesPage() {
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
          <Link href="/policies" className="text-white text-sm font-medium">Policies</Link>
          <Link href="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">Contact</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl mx-auto px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-forge-800/50 border border-forge-700 rounded-full px-4 py-2 mb-8">
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
          <span className="text-gold-300 text-sm font-medium">Public, Not a PDF Nobody Reads</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
          How money moves.
          <br />
          <span className="gold-gradient-text">Same terms, every time.</span>
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          You&apos;ll know exactly what you owe, when, and why — before you sign anything.
          Deposits, milestones, and revenue share, published here instead of buried in a
          contract appendix.
        </p>
      </div>

      {/* Milestone structure */}
      <div className="border-y border-forge-800 bg-forge-950/40 py-20">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">What you pay, and when</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              30 / 30 / 40 — tied to what&apos;s actually delivered, adjusted per engagement
              scope but never abandoned.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MILESTONES.map((m) => (
              <div key={m.label} className="bg-forge-900/40 border border-forge-700/50 rounded-2xl p-8 text-center">
                <div className="text-4xl font-black gold-gradient-text mb-3">{m.pct}</div>
                <h3 className="text-white font-bold mb-3">{m.label}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Policies */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">What this guarantees you</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Every one of these exists because of a real situation it was written to prevent
              — for a client, not just for us.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {POLICIES.map((p) => (
              <div key={p.title} className="bg-forge-900/40 border border-forge-700/50 rounded-xl p-6">
                <h3 className="text-white font-bold mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-8">
          <h2 className="text-4xl font-black text-white mb-6">
            Questions about how
            <br />
            <span className="gold-gradient-text">a specific engagement is structured?</span>
          </h2>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all transform hover:scale-105 shadow-2xl shadow-gold-900/30"
          >
            Start a Discovery →
          </Link>
        </div>
      </div>

      <footer className="border-t border-forge-800 py-8 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} InsightForge™. All rights reserved.
        </p>
        <p className="text-slate-600 text-xs mt-2">
          126 Campbell Road, Fourways, Johannesburg &middot; +27 71 770 0072
        </p>
      </footer>
    </div>
  )
}

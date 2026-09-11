import Link from 'next/link'

const CATEGORIES = [
  'Hosting & cloud infrastructure',
  'Cybersecurity & networking',
  'Hardware',
  'AI tools & automation platforms',
  'Marketing & SEO platforms',
  'Payment solutions',
]

export default function PartnersPage() {
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
          <Link href="/partners" className="text-white text-sm font-medium">Partners</Link>
          <Link href="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">Contact</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl mx-auto px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-forge-800/50 border border-forge-700 rounded-full px-4 py-2 mb-8">
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
          <span className="text-gold-300 text-sm font-medium">A Network, Not a Kickback List</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
          Verified in public.
          <br />
          <span className="gold-gradient-text">Not just on our word.</span>
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Every partner we work with is a specialist in their field first — recommended
          because they&apos;re good, not because they pay to be listed. And every client
          who comes through a Discovery becomes part of the same network: someone we&apos;d
          just as easily refer to, as refer work to.
        </p>
      </div>

      {/* Public ledger / review system */}
      <div className="border-y border-forge-800 bg-forge-950/40 py-20">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">A review you don&apos;t have to take our word for</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            Partner standing is recorded on a tamper-evident public ledger — hash-chained,
            append-only, and checkable by anyone with no login and no credentials required.
            You don&apos;t trust our rating of a partner. You verify the chain yourself.
          </p>
          <p className="text-slate-400 leading-relaxed">
            This isn&apos;t a concept — it&apos;s the same architecture already running in
            production on our Connection Network platform: every entry hash-linked to the
            one before it, publicly verifiable with a single read-only call, no admin access
            needed to prove nothing&apos;s been quietly edited after the fact.
          </p>
        </div>
      </div>

      {/* No fees, ever */}
      <div className="py-24">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">No fees. Ever. Unless value actually changes hands.</h2>
          <p className="text-slate-300 leading-relaxed">
            No listing fee to join the network, no fee to be recommended, no fee for a
            client to find a partner through us. The only time anything is owed is when a
            real transaction closes through the network — disclosed, agreed in advance, and
            shared with whoever helped make the introduction happen.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-forge-950/50 border-t border-forge-800 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">Where the network runs deep</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Specialists we recommend because we&apos;ve used them, not because they
              advertise with us.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CATEGORIES.map((c) => (
              <div key={c} className="bg-forge-900/40 border border-forge-700/50 rounded-xl px-5 py-4 text-slate-200 text-sm font-medium">
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-8">
          <h2 className="text-4xl font-black text-white mb-6">
            Specialist in your field?
            <br />
            <span className="gold-gradient-text">Client looking for one?</span>
          </h2>
          <p className="text-slate-400 mb-10">Either way, it starts the same place.</p>
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
      </footer>
    </div>
  )
}

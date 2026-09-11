import Link from 'next/link'

const CASE_STUDIES = [
  {
    name: 'PrimeTurf',
    tag: 'Gauteng & Cape Town · Artificial turf installer',
    findings:
      'A GitHub Pages → Wix migration left the site with exactly one surviving organic keyword in the South African search index, an estimated 0 monthly organic visits, and its last real ranking pointed at a confirmed-404 page.',
    evidence:
      'Four pages already had enhanced, rewritten SEO metadata post-migration — none of them ranked. That ruled out "the copy is bad" and pointed straight at the missing redirect layer instead.',
    recommendation:
      'Configure the redirect layer before building anything new — the cheapest fix, and the one the evidence said was actually blocking recovery. Then rebuild the single highest-value missing page first (720 searches/month, easiest difficulty), not the whole site at once.',
    outcome:
      'A dated, numbers-attached baseline the client can be re-measured against in 90 days — not a redesign pitch.',
  },
  {
    name: 'Ready & Rooted',
    tag: 'Canterbury, New Zealand · Early-years development',
    findings:
      'The founder’s original idea — an 8-week physical movement programme for ages 3-8 — scored lowest of four tested ventures on defensibility (3/10) and scalability (5/10): real unit economics, but a crowded, low-ceiling category.',
    evidence:
      'Re-scoring the underlying need against market-gap evidence surfaced a different framing entirely: emotional regulation, social skills, and school readiness scored as "one product viewed from three angles," not three separate offers — 41/50 across all five VDOS opportunity dimensions, the highest of anything tested.',
    recommendation:
      'Pivot the venture toward the merged emotional-readiness programme before building anything, rather than defaulting to the founder’s original framing because it was the one already in motion.',
    outcome:
      'A fully staged VDOS engagement through Stage 11 Venture Operating System Design — sales system, financial architecture, and a capability-scaling plan built around the venture the evidence actually supported.',
  },
]

const NETWORK_PROJECTS = [
  {
    name: 'Proteus Kids Sports Academy',
    location: 'Canterbury, New Zealand',
    desc: 'Youth sports development brand — full brand architecture, programme delivery pages, and a parent-facing progress hub.',
  },
  {
    name: 'SAPS Police Clearance',
    location: 'Christchurch, New Zealand',
    desc: 'Marketing site coordinating South African Police Clearance and international fingerprint clearance for South Africans abroad.',
  },
  {
    name: 'CrossTech Systems',
    location: 'Randburg, South Africa',
    desc: 'Premium tech retail, repairs, and digital services — site, hosting, and IT support.',
  },
  {
    name: 'Kopano B&B',
    location: 'Ferndale, Randburg',
    desc: 'A premium guesthouse — brand presence and booking-facing site.',
  },
]

export default function ProjectsPage() {
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
          <Link href="/projects" className="text-white text-sm font-medium">Projects</Link>
          <Link href="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">Contact</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-forge-800/50 border border-forge-700 rounded-full px-4 py-2 mb-8">
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
          <span className="text-gold-300 text-sm font-medium">Proof, Not Portfolio Filler</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
          Real engagements.
          <br />
          <span className="gold-gradient-text">Findings before outcomes.</span>
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Every case study below follows the same structure every Master Blueprint does —
          Findings, Evidence, Recommendation, Outcome. No invented logos, no rounded-up numbers.
        </p>
      </div>

      {/* Full case studies */}
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-8 flex flex-col gap-8">
          {CASE_STUDIES.map((c) => (
            <div key={c.name} className="bg-forge-900/40 border border-forge-700/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-1">{c.name}</h2>
              <p className="text-gold-300/80 text-xs uppercase tracking-wide font-semibold mb-6">{c.tag}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CaseField label="Findings" text={c.findings} />
                <CaseField label="Evidence" text={c.evidence} />
                <CaseField label="Recommendation" text={c.recommendation} />
                <CaseField label="Outcome" text={c.outcome} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Across the network */}
      <div className="bg-forge-950/50 border-t border-forge-800 py-24 mt-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">Across the network</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Range across real industries — not every project needed a full VDOS engagement
              to be worth building well.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NETWORK_PROJECTS.map((p) => (
              <div key={p.name} className="bg-forge-900/40 border border-forge-700/50 rounded-xl p-6">
                <h3 className="text-white font-bold mb-1">{p.name}</h3>
                <p className="text-gold-300/70 text-xs uppercase tracking-wide font-semibold mb-3">{p.location}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-8">
          <h2 className="text-4xl font-black text-white mb-6">
            Want to be the next
            <br />
            <span className="gold-gradient-text">verified case study?</span>
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
      </footer>
    </div>
  )
}

function CaseField({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-slate-500 text-xs font-semibold uppercase mb-1.5">{label}</p>
      <p className="text-slate-300 text-sm leading-relaxed">{text}</p>
    </div>
  )
}

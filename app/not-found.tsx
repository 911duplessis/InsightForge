import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-forge-950 flex items-center justify-center text-center px-4">
      <div>
        <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-white font-black text-2xl">IF</span>
        </div>
        <h1 className="text-6xl font-black text-white mb-4">404</h1>
        <p className="text-slate-300 text-xl mb-2">Blueprint not found</p>
        <p className="text-slate-500 mb-8">This session may have expired or doesn&apos;t exist.</p>
        <Link
          href="/discover"
          className="inline-block bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold py-3 px-8 rounded-xl transition-all hover:scale-105"
        >
          Start a New Discovery Session →
        </Link>
      </div>
    </div>
  )
}

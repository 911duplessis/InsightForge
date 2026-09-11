// Renders a VDOS stage's output object as readable sections instead of raw
// JSON. Every stage (0-11) outputs plain objects/arrays/strings/numbers per
// types/vdos.ts, so one recursive formatter covers all of them instead of a
// bespoke component per stage shape.

function titleCase(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export default function StageOutputView({ output }: { output: unknown }) {
  if (output == null) return null
  return <ValueView value={output} depth={0} />
}

function ValueView({ value, depth }: { value: unknown; depth: number }) {
  if (value == null) return null

  if (typeof value === 'string') {
    return <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{value}</p>
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return <p className="text-slate-300 text-sm">{String(value)}</p>
  }

  if (Array.isArray(value)) {
    if (value.every((item) => typeof item === 'string' || typeof item === 'number')) {
      return (
        <ul className="list-disc list-inside text-slate-300 text-sm flex flex-col gap-1.5">
          {value.map((item, i) => (
            <li key={i}>{String(item)}</li>
          ))}
        </ul>
      )
    }
    return (
      <div className="flex flex-col gap-3">
        {value.map((item, i) => (
          <div key={i} className="border border-slate-800 rounded-lg p-3 bg-slate-950/40">
            <ValueView value={item} depth={depth + 1} />
          </div>
        ))}
      </div>
    )
  }

  if (isPlainObject(value)) {
    const entries = Object.entries(value)
    return (
      <div className="flex flex-col gap-4">
        {entries.map(([key, val]) => (
          <div key={key}>
            <p
              className={
                depth === 0
                  ? 'text-gold-400 font-semibold text-xs uppercase tracking-wide mb-1.5'
                  : 'text-slate-500 font-semibold text-xs uppercase tracking-wide mb-1.5'
              }
            >
              {titleCase(key)}
            </p>
            <ValueView value={val} depth={depth + 1} />
          </div>
        ))}
      </div>
    )
  }

  return null
}

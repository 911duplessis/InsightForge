# 2. Corporate Identity Guide

Target feeling: **"Strategic intelligence combined with engineering excellence."** Every
visual decision below is judged against that sentence — if an element reads as purely
decorative, cut it.

## Logo concepts

Three directions, in priority order:

1. **The Forge Mark (primary recommendation).** A geometric anvil/hammer-strike abstraction
   reduced to two intersecting angular strokes forming an implied "I" and "F" — no literal
   anvil illustration (too artisanal/blacksmith, undercuts "premium global"). The mark should
   read equally well as a 16px favicon and a building-lobby wall treatment.
2. **The Compass-Blueprint Mark.** A single angular line that reads as both a compass needle
   (strategy, direction) and a blueprint corner-fold (construction, precision). More abstract,
   safer for a McKinsey-adjacent audience that finds "forge" imagery slightly too industrial.
3. **Wordmark-only, no symbol (fallback).** "INSIGHTFORGE" in a custom-spaced geometric sans
   with the crossbar of the "F" extended into a subtle upward arrow. Cheapest to execute
   correctly, lowest risk, least distinctive — use only if budget or timeline forces a choice.

**Recommendation: #1.** It is the only option that visually encodes both halves of the brand
(insight = the strategic angle; forge = the build), matches the "FORGE Framework" naming
already in product copy, and scales cleanly to a single-color favicon.

Lockups needed: full horizontal (mark + wordmark), stacked (mark over wordmark, for square
social/app-icon contexts), mark-only (favicon, app icon, watermark on PDF exports), and a
monochrome/reversed version for dark dashboard chrome.

## Colour psychology

| Role | Colour | Hex (reference) | Why |
|---|---|---|---|
| Primary — Forge Ink | Near-black navy | `#0B1220` | Authority, trust, engineering seriousness — not literal black (too severe, no warmth) |
| Secondary — Insight Amber | Warm amber/bronze | `#C9852B` | The "forge" heat metaphor without going orange-startup; signals human warmth against the cold navy |
| Accent — Signal Teal | Desaturated teal | `#2C8C8C` | Used only for live data, charts, and "verified" states — never in the logo — so it reads as *evidence*, not *decoration* |
| Neutral base | Warm off-white / graphite | `#F7F5F1` / `#1C1F24` | Document and dashboard backgrounds; warm-white for print/proposals, graphite for the client portal dark mode |

Rule of use: navy carries authority (headers, nav, cover pages), amber carries the brand
moment (CTAs, the FORGE Framework phase markers, the logo), teal is reserved *exclusively*
for verified/live data points (a "Discovery complete" badge, a live dashboard metric) — if
teal starts appearing decoratively, it stops meaning "evidence" and the system has failed.

## Typography

- **Display / headers:** A geometric sans with slightly humanist detailing — e.g. Söhne,
  General Sans, or (Google Fonts equivalent) **Space Grotesk** at weight 500–600. Never below
  weight 500 for headers; thin geometric sans reads as "startup," not "consulting firm."
- **Body / long-form:** A workhorse humanist sans for readability across proposals and
  dashboards — **Inter** or **IBM Plex Sans**, weight 400, generous line-height (1.6+) since
  Master Blueprint reports run long.
- **Data / monospace:** For stage IDs, hashes, ledger-style references, and code — **IBM Plex
  Mono** or **JetBrains Mono** — signals "this number is a real system output," reinforcing
  the evidence-over-opinion value.
- Never use a serif anywhere in digital product; a serif may appear *only* on the cover page
  of a printed Master Blueprint report, in Forge Ink navy, as the one deliberate "this is a
  formal document" cue — used exactly once per document, not as a running body font.

## Visual identity system

- **Grid, not flourish.** All layouts sit on a strict column grid; the brand's premium feel
  comes from restraint and whitespace, not gradients or illustration.
- **The stage marker.** A small numbered angular tick (visually derived from the logo mark)
  used everywhere a process stage is shown — the VDOS 11 stages, the FORGE Framework's 7
  phases, the client journey map. This is the one recurring motif allowed to repeat across
  every touchpoint; it is what makes the "gated methodology" feel tangible rather than
  abstract.
- **Photography/imagery:** none of the network's members appear as generic stock "team
  brainstorming" photography. Prefer abstracted data visualisation (real or representative
  charts, dependency graphs, the ledger/audit-trail concept) over people-in-a-room stock
  imagery — the product is intelligence, not office culture.

## Presentation style (decks, proposals, reports)

- Every deliverable opens with a one-page **"What we found"** summary before any
  recommendation — mirrors the Discover → Forge sequence at the document level, not just the
  engagement level.
- Every claim in a Master Blueprint report carries a citation to the underlying artifact
  (an ASQ instrument, an audit dataset, a named competitor data point) in a right-margin
  annotation — this is the single visual habit that most differentiates InsightForge
  documents from a typical agency deck.
- Section dividers use the stage-marker motif with the phase name and number, not a
  full-bleed stock photo.

## Client reports

Structure every Master Blueprint / VDOS-stage report identically regardless of client:
**Findings → Evidence → Recommendation → Investment → Timeline.** Never lead with
recommendation; the fixed order is itself a trust signal (it shows the same rigor was
applied every time, not tailored to justify a predetermined sale).

## Dashboard design

The client portal (see `09-technology-architecture.md`) should visually separate three
data trust-levels using the colour system above: **navy** chrome for static/structural UI,
**teal** exclusively for numbers pulled live from a connected source (GA4, GSC, the VDOS
ledger), and **amber** only for an action the client can take (approve a stage gate, release
a milestone payment). A user should be able to tell, at a glance and without reading labels,
what's structural, what's live evidence, and what's actionable.

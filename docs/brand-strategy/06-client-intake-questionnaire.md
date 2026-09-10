# 6. Client Intake System — Discovery Questionnaire

## Relationship to what's built

`types/index.ts`'s `DiscoveryFormData` already captures structured operational data across
five categories — Company, Customers, Products, Revenue, Marketing. That data feeds
`lib/forge-prompt.ts` directly. What's missing from the current form, and what this document
adds, is a short set of **psychological/strategic questions** — the ones that surface
assumptions and blind spots rather than facts the client already knows. These belong as a
final section on both `/discover` and `/discover-lite`, answered in free text, and passed
into the FORGE prompt verbatim (not summarised) so "Find Reality" has something harder to
work with than operational metrics alone.

## Section structure (matches existing form categories)

1. **Company Overview** *(existing)* — name, industry, years in business, headcount, revenue
   range, business model, geographic reach, description.
2. **Customers** *(existing)* — primary customer type, ICP, acquisition method, average
   transaction value, retention rate, biggest complaint, referral rate.
3. **Products & Services** *(existing)* — main offerings, best seller, UVP, pricing strategy,
   development plans, underperforming offerings.
4. **Revenue & Finance** *(existing)* — primary sources, consistency, biggest challenge,
   invoicing/collection issues, margin estimate, 12-month goals.
5. **Marketing & Sales** *(existing)* — channels, budget, best/worst performing channel,
   sales process, close rate, lead-gen challenges.
6. **Strategic & Psychological** *(new — add this section)*

## New Section 6 — Strategic & Psychological questions

These are the questions that separate a real Discovery from a form-fill. Ask them last, after
the client has already spent effort on Sections 1–5 and is past the point of giving guarded
answers.

**Success definition**
> What does success look like in measurable terms — not "more customers" or "more revenue,"
> but the specific number, by the specific date, that would make you call this a win?

**Failure definition**
> What would make this project a complete failure? Not "it doesn't work" — what specifically
> would have to happen, or not happen, for you to regret starting it?

**Assumption audit**
> What assumptions about your industry might be wrong? Name one thing "everyone knows" about
> your market that you've never actually seen tested.

**Ignored opportunity**
> What opportunity exists that your competitors are ignoring — and why do you think they're
> ignoring it? (If the honest answer is "I don't know of one," say that; it's a valid and
> useful answer.)

**Decision ownership**
> Who actually makes the final call on this project, and has that person seen this form?
> (Surfaces stalled projects before they start — a Blueprint sold to the wrong decision-maker
> is the single most common cause of a stalled Build phase.)

**Prior attempts**
> Has something like this been tried before, internally or with another agency? What
> happened, and why do you think it stalled or fell short?

**Budget reality check**
> If the Blueprint recommends something outside your stated budget range, do you want us to
> say so anyway, or scope only within budget? (Forces an explicit choice between "tell me the
> truth" and "tell me what's affordable" — never assume the client wants the former.)

**Time horizon**
> Is there an external deadline driving this (funding round, launch date, competitor move),
> or is the timeline entirely internal? External deadlines change how Phase 5/6 gets sequenced.

## Why these specific questions, not generic ones

Each question is designed to produce a *falsifiable* answer InsightForge can hold the client
to later — "more revenue" can't be checked against at the end of an engagement; "close rate
from 12% to 20% by Q3" can. The Assumption Audit and Ignored Opportunity questions exist
specifically to feed VDOS Stage 0 (Assumption Destruction) and Stage 4 (Market Gap) with raw
material a structured operational form cannot produce — a client will not volunteer "I think
our whole pricing model might be wrong" in a field labeled "Pricing Strategy," but will
volunteer it when asked directly what might be wrong.

## Intake routing

The public `/contact` form (see `03-website-architecture.md`) should ask only a 5–7 field
qualifying subset (industry, revenue range, urgency, and one open-ended "what's the problem"
field) — the full instrument above belongs inside `/discover` or `/discover-lite` once a lead
is qualified, not on the public marketing site, where a long form kills conversion.

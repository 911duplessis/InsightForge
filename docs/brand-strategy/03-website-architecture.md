# 3. Website Architecture

## Current state vs. this spec

This repo today is the **product** (the VDOS/FORGE Lite engine, the consultant `/command`
console, client-facing `/engagements` and `/vdos-blueprint` views) — it is not yet a public
**marketing site**. `app/page.tsx` is currently a lightweight landing/entry point, not the
full positioning homepage described below. This document specifies the marketing site that
should sit in front of the product (new routes under the existing Next.js app, or a
`/(marketing)` route group), so nothing here should be read as "already built."

## Sitemap

```
/                        Homepage
/about                   About
/process                 InsightForge Process (hub)
  /process/discovery        Discovery Phase detail
  /process/blueprint        Master Blueprint detail
  /process/development      Development detail
  /process/growth           Growth detail
/methodology              The FORGE Framework™ (public-facing IP asset page)
/projects                 Case studies / proof-of-concept showcase
/partners                 Partner & affiliate ecosystem
/services                 Service catalogue (see 13-service-catalogue.md)
/contact                  Strategic discovery intake (public form → seeds a real intake)
--- existing product routes, linked from the marketing shell once a lead converts ---
/discover                 VDOS intake (Stage 0 Assumption Destruction entry point)
/discover-lite            FORGE Lite intake (single-shot)
/blueprint/[sessionId]    FORGE Lite generated report
/vdos-blueprint/[id]      VDOS staged blueprint (client-facing, per engagement)
/engagements/[id]         Client engagement dashboard
/command                  Consultant console (admin/consultant login + business switcher)
```

## Homepage

- **Hero:** the positioning statement, not a generic "we build software" line — see
  `04-homepage-copy.md` for exact copy.
- **Trust indicators:** number of engagements run through VDOS, number of gated stages,
  "every recommendation is evidence-backed" as a stated mechanism, not just a claim — link to
  a real (anonymised where needed) Master Blueprint excerpt.
- **Global capability:** a simple map/list of the network's specialist countries and
  disciplines — framed as "one network," never "our offices."
- **Process explanation:** the four-stage Discover → Forge → Build → Scale arc, using the
  stage-marker visual motif from `02-corporate-identity-guide.md`.
- **Featured projects:** PrimeTurf and Ready & Rooted (already-seeded real engagements) as the
  first two proof points — real data beats invented case studies.
- **Partner ecosystem:** logos/categories, linking to `/partners`.
- **Call to action:** one primary CTA only — "Start a Discovery" → `/contact` → `/discover` or
  `/discover-lite` depending on qualification. Never more than one competing CTA per screen.

## About

- **Story:** why InsightForge exists — the "most businesses don't fail for lack of ideas"
  thesis, stated plainly, not as an origin myth.
- **Team network:** specialist disciplines and combined-experience framing (20+ years
  combined), presented as a network map, not headshot grid.
- **Philosophy:** Discover → Forge → Build → Scale, expanded from the homepage's short form.
- **Experience:** the proof-of-concept project list (Global Bible School platforms, Voices of
  Hope, PrimeTurf, ride-hailing concepts, real-time club communication, business websites,
  SEO systems, custom software) framed as range, not a client-logo wall.

## InsightForge Process (hub + four sub-pages)

- **Discovery Phase:** business audit, competitor analysis, market intelligence, opportunity
  discovery, and the "assumption destruction" methodology (Stage 0 of VDOS) — explained in
  plain language with one concrete before/after example.
- **Master Blueprint:** strategic report, roadmap, implementation timeline, investment
  planning — link through to a redacted real example.
- **Development:** software, websites, apps, AI systems, automation — framed explicitly as
  "only after strategic clarity," reinforcing the brand's central differentiator.
- **Growth:** SEO, analytics, optimisation, expansion — framed as a retained relationship,
  not a one-time project.

## Methodology (`/methodology`)

Public-facing explanation of the FORGE Framework™ (see `05-forge-framework.md`) — this page
exists to make the methodology itself a marketable, referenceable asset (something a
prospect can point to and say "this is why we're hiring them"), not just internal process
documentation.

## Projects

Verified case studies only — no invented client logos. Each case study follows the same
Findings → Evidence → Recommendation → Investment → Timeline → Outcome structure used in
real Master Blueprint reports, so the marketing site and the actual deliverable feel like the
same company.

## Partners

Premium technology partners and the affiliate ecosystem — see
`07-partner-ecosystem-strategy.md` for the category list and transparency mechanics. This
page must disclose the "no hidden commissions" policy explicitly and visibly, not bury it in
a footer link.

## Contact

A strategic discovery intake form, not a generic "send us a message" box — a short (5–7
field) qualifying version of the full instrument in `06-client-intake-questionnaire.md`,
designed to route the lead into either `/discover` (VDOS) or `/discover-lite` (FORGE Lite)
based on stated budget/urgency/complexity, exactly as the product already tiers engagements.

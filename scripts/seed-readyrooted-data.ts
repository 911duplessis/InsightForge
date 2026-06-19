// One-off seed data module for Ready & Rooted — a New Zealand (Canterbury)
// children's movement / emotional-readiness venture, mirroring the pattern
// established in scripts/seed-primeturf-data.ts for a different VDOS client.
//
// IMPORTANT: This file contains REAL content extracted from 6 uploaded source
// documents:
//   - mvpmovementprogram.html        (original children's movement-program MVP)
//   - venturestrategy2026.html       (pivot reasoning: movement -> "emotional
//                                      readiness"; 3 near-identical copies were
//                                      provided, only 1 was processed)
//   - highestprobabilityventure.html (8-candidate opportunity-scoring matrix
//                                      converging on a merged readiness/regulation
//                                      /social-skills venture)
//   - ventureos.html                 (category-creation argument + 5-layer
//                                      Venture OS + Scale Architecture + Revenue
//                                      Architecture)
//
// UNLIKE PrimeTurf's 7 source documents, these 6 NZ files only contain evidence
// for FOUR of the twelve VDOS stage-equivalents: Stage 0 (assumption_destruction),
// Stage 6 (opportunity_ranking), Stage 9 (category_creation), and Stage 11
// (vos_design). There is NO source material for Stages 1-5, 7, 8, 10, or any of
// the 6 ASQ instruments (asq1-asq6). Those stages/instruments are deliberately
// OMITTED below rather than fabricated. Where the source documents did not
// contain a literal data point required by the schema, the field is built
// conservatively from the closest real evidence in the documents and flagged
// with an inline comment ("VDOS-inferred" / "reconstructed from evidence")
// rather than invented from nothing — following the same convention used in
// seed-primeturf-data.ts.
//
// This module only exports data shapes for later DB insertion. It does not
// perform any database writes itself.

import type {
  BusinessAgnosticIntake,
  Stage0Output,
  Stage6Output,
  Stage9Output,
  Stage11Output,
  StageKey,
} from '@/types/vdos'

// ---------------------------------------------------------------------------
// Business / Client / Intake
// ---------------------------------------------------------------------------

// NAMING NOTE: the source documents are not fully consistent about the venture's
// final name. mvpmovementprogram.html proposes three brand directions for the
// *movement* programme ("Tūī & Totara", "Sprout Movement", "Wild Movers").
// venturestrategy2026.html (the pivot document) uses the working name "Steady
// Kids" for the emotional-readiness pivot, with "Sprout" suggested as a
// retained/adapted name. highestprobabilityventure.html's own brand-directions
// section (Part 09) presents three NEW candidate names and explicitly marks
// "Ready & Rooted" with the `br chosen` / "Direction: The school-readiness
// frame" styling — the only document that marks a name as actually selected
// rather than merely proposed. "Ready & Rooted" is therefore used here as the
// business name, since it is the most final/chosen name across all sources,
// not because the sources are unanimous (they are not).
export const readyRootedBusiness = {
  name: 'Ready & Rooted',
  slug: 'ready-rooted',
  industry: "Children's Emotional Readiness & Movement Programs (Early Childhood Development Services)",
  primary_contact_name: 'Ready & Rooted Founder',
  // PLACEHOLDER PATTERN ONLY — no real contact email exists in any of the 6
  // source documents (they are venture-strategy/MVP design documents, not
  // founder correspondence). Mirrors the explicit placeholder-flagging
  // convention used for PrimeTurf's undisclosed phone number in
  // seed-primeturf-data.ts. Using the session user's email domain pattern is
  // not appropriate here since this is a distinct, unrelated NZ venture — a
  // clearly-marked placeholder is used instead.
  primary_contact_email: 'founder@readyandrooted.example.nz', // not disclosed in source documents — placeholder only, no real contact found
}

export const readyRootedClient = {
  first_name: 'Ready & Rooted',
  last_name: 'Founder',
  email: 'founder@readyandrooted.example.nz', // placeholder — see note above
  phone: '+64 00 000 0000', // not disclosed in source documents (placeholder pattern only — no real phone number found in any source file)
  company_name: 'Ready & Rooted',
}

// Source: mvpmovementprogram.html header ("MVP System Document — Canterbury,
// NZ", "Ages 3-8", "1 instructor", "Canterbury NZ") combined with
// venturestrategy2026.html and highestprobabilityventure.html's repositioning
// of the same founder/operator toward an emotional-readiness practice.
export const readyRootedIntake: BusinessAgnosticIntake = {
  contact: {
    first_name: 'Ready & Rooted',
    last_name: 'Founder',
    email: 'founder@readyandrooted.example.nz',
    phone: '+64 00 000 0000',
  },
  stated_idea:
    "A children's movement program for ages 3-8, delivered in-school, after-school, and on weekends across Canterbury, NZ, executable by a single instructor within 30 days.",
  stated_industry: "Children's Movement / Physical Activity Coaching (original framing) — repositioned during VDOS analysis toward Children's Emotional Readiness & Development Services.",
  founder_background:
    'Solo operator / instructor model — one founder delivering all sessions directly, with no technology beyond WhatsApp for parent communication. No disclosed prior credentials beyond a recommended minimum (First Aid certificate, police vetting) called out as pre-launch requirements rather than existing qualifications.',
  available_resources:
    'No disclosed capital beyond ad-hoc equipment spend (~$60-100 NZD). No existing customer base (this is a from-scratch launch, unlike PrimeTurf). Primary leverage is access to one Canterbury school willing to host a free pilot in exchange for a testimonial, plus WhatsApp as the sole parent-communication channel.',
  time_horizon:
    'A 30-day pilot launch plan (access -> school meeting -> parent sign-up -> preparation -> launch) culminating in an 8-week program term, with a multi-year scale path (Year 1 single-school pilot through Year 3-5 national/certification-network expansion) mapped in ventureos.html.',
}

// ---------------------------------------------------------------------------
// Stage 0 — Assumption Destruction
// (Sources: mvpmovementprogram.html — original movement-program framing/
// assumptions; venturestrategy2026.html — the pivot reasoning to "emotional
// readiness", which is structured as an explicit assumption-challenge argument
// before recommending the pivot.)
// ---------------------------------------------------------------------------

// CATEGORY COUNT NOTE: PrimeTurf's Stage 0 had exactly 12 assumption_categories
// (one per AssumptionCategoryName value in types/vdos.ts). The NZ source
// documents do not run a full 12-category assumption-destruction matrix the way
// PrimeTurf's dedicated Stage 0 document did — venturestrategy2026.html instead
// runs a more narrative argument across "What parents actually want", "The
// underserved gaps", and "The verdict" sections. The categories below are
// reconstructed by mapping the real assumption-challenges actually present in
// the source text onto the AssumptionCategoryName taxonomy required by the
// schema. Only 6 categories have direct, substantial textual evidence in the
// source (Industry, Product, Customer, Problem, Competitive, Format/Digital);
// the remaining 6 taxonomy slots (Business Model, Geography, Delivery, Founder
// Role, Revenue, Scale) are NOT fabricated — they are omitted from this array,
// since no real evidence for them exists in mvpmovementprogram.html or
// venturestrategy2026.html. This is a deliberate, smaller-than-PrimeTurf
// category count (6, not 12), flagged here rather than padded out.
const stage0Output: Stage0Output = {
  assumption_categories: [
    {
      category: 'Industry',
      stated_assumption: "This is a children's movement / physical activity coaching business (in-school, after-school, weekend sport-style sessions).",
      falsification_probability: 85, // VDOS-inferred: venturestrategy2026.html's cover line ("They don't want a sport programme. They want their child to be okay.") and Part 07 ("Where movement fits") argue this framing is close to entirely wrong, supporting a high falsification probability
      alternative_possibilities: [
        "Children's emotional readiness / regulation practice",
        'Non-clinical early-intervention support for the "below diagnostic threshold" majority of children',
        'School-readiness (social-emotional) preparation service',
        'Parental-anxiety-relief product sold to parents, not a children\'s activity sold to children',
      ],
      emergent_opportunities: [
        'Reframe entirely as an emotional readiness practice for ages 3-8, using movement as one of several delivery mechanisms rather than the product itself (venturestrategy2026.html, "Option A: Full Re-frame").',
        'Position in the white space between sport, ECE, and clinical child psychology — "a prevention-level developmental programme for children who are fine but could be flourishing" (highestprobabilityventure.html, Part 03).',
      ],
    },
    {
      category: 'Product',
      stated_assumption: 'The product is a structured movement/skill-progression session (balance, catching, core strength, agility) tracked via 5 physical metrics.',
      falsification_probability: 80,
      alternative_possibilities: [
        'The product is reassurance/proof that a child is emotionally okay, not the physical activity itself',
        'The product is a coping-skills toolkit (naming feelings, pausing, asking for help) delivered through movement, story, and routine',
        'The product is the WhatsApp parent-communication system, not the in-room session',
      ],
      emergent_opportunities: [
        '8-week emotional curriculum (Noticing Feelings -> Bodies Know First -> When Anger Comes -> Worry and What Helps -> Asking for Help -> When Things Don\'t Go Your Way -> I Am Brave -> My Feelings Toolkit) replacing the physical-skill-only curriculum (venturestrategy2026.html, Part 04).',
        '5 redefined metrics (Emotion Identification, Impulse Control, Frustration Recovery, Social Engagement, Brave Attempt) replacing the original 5 physical metrics (Balance, Coordination, Core Strength, Body Control, Confidence) (highestprobabilityventure.html, Part 05).',
      ],
    },
    {
      category: 'Customer',
      stated_assumption: 'The customer is the child attending the session; the parent is simply the payer/logistics contact.',
      falsification_probability: 78,
      alternative_possibilities: [
        'The real customer is the anxious parent; the child is the delivery surface for a product that is actually sold to the parent',
        'The school/principal is a gatekeeper-customer whose endorsement is the primary acquisition channel',
      ],
      emergent_opportunities: [
        '"You are not entering the children\'s activity market. You are entering the parental anxiety market." (highestprobabilityventure.html, Part 09) — re-orients all messaging, pricing, and retention design around parental fear-resolution rather than child enjoyment.',
        'Parent-facing deliverables (WhatsApp updates, Week 8 progress-sheet photo, optional parent workshop) treated as core product surface, not an add-on.',
      ],
    },
    {
      category: 'Problem',
      stated_assumption: 'The problem is that children ages 3-8 lack structured physical activity / sport access in Canterbury.',
      falsification_probability: 90, // VDOS-inferred: this is the single most explicitly destroyed assumption in venturestrategy2026.html and highestprobabilityventure.html, both built around NZ-specific mental-health/readiness data (UNICEF lowest-in-OECD ranking, 25-35% of NZ children 3-8 showing abnormal-range psychological symptoms, school psychologist waitlists)
      alternative_possibilities: [
        'The problem is a structural child-mental-health-support gap: NZ ranks lowest in the OECD for child wellbeing; 25-35% of children 3-8 show abnormal-range psychological symptoms; waitlists and cost block 53%/43% of parents from clinical help',
        'The problem is school-readiness anxiety specifically around social-emotional (not academic) preparedness',
        'The problem is parental guilt/overwhelm (screen time, two-income households, $452/week childcare costs, 443 NZ childcare-provider closures 2022-2025) more than any deficit in the child',
      ],
      emergent_opportunities: [
        'Position directly in "the critical gap": "nothing accessible, affordable, non-stigmatising, and practically effective for a 4-year-old who has big feelings... but who does not meet the threshold for clinical referral" (venturestrategy2026.html, Part 02).',
        'Price and message against the real comparison set parents use — not a $12-22/session sport class, but a $120-250/hr speech therapist or child psychologist session with a months-long waitlist (venturestrategy2026.html Part 05; highestprobabilityventure.html Part 06).',
      ],
    },
    {
      category: 'Competitive',
      stated_assumption: 'Competitors are other children\'s sport/movement coaching providers (football, gymnastics, swimming) in Canterbury.',
      falsification_probability: 75,
      alternative_possibilities: [
        'Competitors are child psychologists and clinical services (differentiated by waitlist length, cost, and stigma rather than activity type)',
        'Competitors are ECE/kindy programmes and school pastoral-care provision, which claim to but structurally cannot deliver individualised emotional development (child-to-teacher ratios)',
        '"Nothing" / inertia is the dominant competitor — most parents in the underserved gap currently access no structured support at all',
      ],
      emergent_opportunities: [
        'Gap-map analysis (highestprobabilityventure.html, Part 02) explicitly scores "Sport / physical coaching" as Crowded while scoring "Emotional regulation + self-control", "Social skills / play skills" and "School readiness" as starred strong gaps — directing competitive strategy away from the sport-coaching field entirely.',
        'Differentiate against both clinical providers (12+ week waitlist, $150-250/session, referral required, stigma) and generic enrichment (sport, music) by occupying the "white space" between them.',
      ],
    },
    {
      category: 'Format/Digital',
      stated_assumption: 'This is a purely physical, in-person, non-digital service requiring no technology beyond basic logistics.',
      falsification_probability: 55,
      alternative_possibilities: [
        'WhatsApp-based parent communication is itself a core differentiating product surface (named recognition, progress-sheet photos), not merely an admin tool',
        'The methodology could eventually be productised digitally (training curriculum, certification course, published assessment instrument) per ventureos.html\'s Layer 2/Layer 4 — though this is explicitly deferred, not part of the MVP',
      ],
      emergent_opportunities: [
        'WhatsApp messaging scripts (Welcome, Post-Session Highlight, Midpoint Check-in, Results + Re-enrolment) treated as the primary retention mechanism, more powerful than any app dashboard (mvpmovementprogram.html Part 06; venturestrategy2026.html "the message is the product, as much as the session").',
        'Long-run (Year 2+) digital/IP productisation via an instructor-certification course and a licensable curriculum (ventureos.html Part IV, Layer 2 and Layer 4) — explicitly sequenced after, not instead of, the physical pilot.',
      ],
    },
  ],
  destruction_matrix: [
    { category: 'Problem', rank: 1, falsification_probability: 90 },
    { category: 'Industry', rank: 2, falsification_probability: 85 },
    { category: 'Product', rank: 3, falsification_probability: 80 },
    { category: 'Customer', rank: 4, falsification_probability: 78 },
    { category: 'Competitive', rank: 5, falsification_probability: 75 },
    { category: 'Format/Digital', rank: 6, falsification_probability: 55 },
  ],
  // Source: highestprobabilityventure.html Part 02 "The underserved gap map"
  // table scores each candidate category qualitatively (Parent Demand: Medium/
  // High/Very High; Supply Gap: Low/Moderate/High; Measurable in 8wks: Yes/
  // Partial/Hard; Solo Viable: Yes/Harder) rather than as 0-50 numeric venture
  // totals the way PrimeTurf's Stage 0 did. The scores below are VDOS-inferred
  // numeric translations of those qualitative table cells (Very High/High ->
  // 8-9, Medium -> 5-6, Low -> 2-3), distributed across the five required
  // dimensions in proportion to the qualitative signal given per category, and
  // are NOT verbatim numeric data from the source. Only the relative ordering
  // (which categories are starred "Strong gap" / "Best gap" vs "Crowded") is
  // directly evidenced.
  emergent_ventures: [
    {
      name: 'Merged Readiness Venture — Emotional Regulation + Social Skills + School Readiness',
      description:
        'The converged venture from highestprobabilityventure.html: "emotional regulation, social skills, and school readiness... are not three separate products. They are one product viewed from three angles." A small-group programme (ages 3-8) building emotional regulation, social confidence, and self-control through structured play, positioned in the white space between sport, ECE, and clinical psychology. This is the highest-probability venture and is carried forward into Stage 6 ranking below.',
      market_demand: 9,
      defensibility: 8,
      scalability: 8,
      founder_fit: 8,
      speed_to_revenue: 8,
      total: 41,
    },
    {
      name: 'School Readiness (Emotional + Social) — Standalone',
      description:
        'A programme narrowly targeting kindergarten/school-entry readiness framed around social-emotional preparedness (frustration tolerance, sharing, following instructions, disappointment tolerance) rather than the full 3-8 age range. Scored "Very High" demand and "High" supply gap in the source gap-map, but narrower in scope than the merged venture.',
      market_demand: 9,
      defensibility: 7,
      scalability: 6,
      founder_fit: 8,
      speed_to_revenue: 8,
      total: 38,
    },
    {
      name: 'Original Children\'s Movement Programme (Unpivoted)',
      description:
        "The original mvpmovementprogram.html concept: an 8-week, ages-3-8 physical movement/skill-progression program (balance, catching, core strength, agility) tracked via 5 physical metrics, priced $16-20/session. Solid execution plan and real unit economics, but explicitly identified across both later documents as a crowded, lower-ceiling category once compared to the emotional-readiness reframe.",
      market_demand: 6,
      defensibility: 3,
      scalability: 5,
      founder_fit: 8,
      speed_to_revenue: 8,
      total: 30,
    },
    {
      name: 'Inner Readiness — National Category/Methodology Play',
      description:
        'The long-horizon version proposed in ventureos.html: not a local programme but a created category ("Inner Readiness") with its own named methodology, instructor certification, published research partnership (e.g. University of Canterbury), and eventual national franchise/certification network. Highest long-run defensibility and scalability, but explicitly sequenced for Year 2-5, not an immediate MVP — lower speed-to-revenue than the Stage-1 pilot ventures.',
      market_demand: 8,
      defensibility: 10,
      scalability: 10,
      founder_fit: 6,
      speed_to_revenue: 3,
      total: 37,
    },
    {
      name: 'Screen-Free / Analog Enrichment (Crafts, Nature)',
      description:
        'A screen-free, "analog childhood" enrichment offering (crafts, nature-based play) responding to the documented 2026 cultural trend (Jonathan Haidt-driven analog-childhood movement, 66% of parents wanting to reduce screen time). Scored "Medium-high" demand but "Hard to measure" outcomes and only "Moderate" supply gap in the source gap-map — explicitly weaker than the readiness/regulation cluster.',
      market_demand: 6,
      defensibility: 4,
      scalability: 5,
      founder_fit: 6,
      speed_to_revenue: 5,
      total: 26,
    },
    {
      name: 'Parent Coaching',
      description:
        'A direct-to-parent coaching offering addressing parental guilt/overwhelm. Source gap-map scores demand "High" but flags this as "Harder alone" for solo viability and a "Complex sell" overall — explicitly one of the weaker candidates evaluated.',
      market_demand: 7,
      defensibility: 5,
      scalability: 4,
      founder_fit: 4,
      speed_to_revenue: 4,
      total: 24,
    },
  ],
}

// ---------------------------------------------------------------------------
// Stage 6 — Opportunity Ranking
// (Source: highestprobabilityventure.html, Part 02 "The underserved gap map"
// matrix, which evaluates 8 category candidates — Sport/physical coaching,
// Emotional regulation + self-control, Social skills/play skills, Academic
// tutoring, Screen-free enrichment, School readiness, Parent coaching, Music/
// creative arts — across parent demand, supply gap, 8-week measurability, and
// solo viability, converging on the merged readiness/regulation/social-skills
// venture as the "Verdict".)
// ---------------------------------------------------------------------------

// Source gives qualitative cell labels (Very High / High / Medium / Low /
// Crowded / Strong gap / Best gap, etc.) rather than the literal 1-10 numeric
// dimension scores or a /50 total the way PrimeTurf's Stage 6 table did. The
// scores below are VDOS-inferred numeric translations of those qualitative
// labels (following the same translation convention as the Stage 0
// emergent_ventures above), distributed across the 5 required scoring
// dimensions per opportunity. probability_of_success values are VDOS-inferred
// from the explicit "Crowded" / "★ Strong gap" / "★ Best gap" verdict labels in
// the source, not from any literal numeric figure.
const stage6Output: Stage6Output = {
  ranked_opportunities: [
    {
      title: 'School Readiness (Emotional + Social)',
      description: 'Structured small-group programme explicitly framed around social-emotional school readiness for ages 3-8. Source-verdict: "★ Best gap" — Very High parent demand, High supply gap (ECE doesn\'t fill it), measurable in 8 weeks, solo-viable.',
      market_demand_score: 9,
      defensibility_score: 7,
      scalability_score: 8,
      founder_fit_score: 8,
      speed_to_revenue_score: 9,
      total_score: 41,
      rank: 1,
      probability_of_success: 80, // VDOS-inferred from explicit "★ Best gap" verdict
    },
    {
      title: 'Emotional Regulation + Self-Control',
      description: 'Programme centred on teaching emotional regulation and self-control directly. Source-verdict: "★ Strong gap" — Very High demand, High supply gap (explicitly described as a "clinical gap"), measurable, solo-viable.',
      market_demand_score: 9,
      defensibility_score: 8,
      scalability_score: 7,
      founder_fit_score: 8,
      speed_to_revenue_score: 8,
      total_score: 40,
      rank: 2,
      probability_of_success: 78, // VDOS-inferred from explicit "★ Strong gap" verdict
    },
    {
      title: 'Social Skills / Play Skills',
      description: 'Programme targeting post-pandemic social-skill deficits through structured play. Source-verdict: "★ Strong gap" — High demand (post-pandemic), High supply gap (no structured offer currently exists), measurable, solo-viable.',
      market_demand_score: 8,
      defensibility_score: 7,
      scalability_score: 7,
      founder_fit_score: 8,
      speed_to_revenue_score: 8,
      total_score: 38,
      rank: 3,
      probability_of_success: 75, // VDOS-inferred from explicit "★ Strong gap" verdict
    },
    {
      title: 'Academic Tutoring (Literacy/Numeracy)',
      description: 'Direct academic tutoring for young children. Source-verdict: "Crowded" despite High parent demand — Low supply gap (Kumon, existing tutors already serve this), only partially measurable in 8 weeks.',
      market_demand_score: 8,
      defensibility_score: 3,
      scalability_score: 5,
      founder_fit_score: 5,
      speed_to_revenue_score: 6,
      total_score: 27,
      rank: 4,
      probability_of_success: 30, // VDOS-inferred — explicitly "Crowded" verdict despite high demand
    },
    {
      title: 'Screen-Free Enrichment (Crafts, Nature)',
      description: 'Analog/screen-free enrichment activities (crafts, nature play). Source-verdict: "Soft demand" — Medium-high demand, only Moderate supply gap, outcomes explicitly flagged "Hard to measure" in 8 weeks.',
      market_demand_score: 6,
      defensibility_score: 4,
      scalability_score: 5,
      founder_fit_score: 6,
      speed_to_revenue_score: 4,
      total_score: 25,
      rank: 5,
      probability_of_success: 35, // VDOS-inferred from "Soft demand" verdict
    },
    {
      title: 'Parent Coaching',
      description: 'Direct-to-parent coaching service. Source-verdict: "Complex sell" — High demand but only Moderate supply gap, partial measurability, and explicitly flagged "Harder alone" for solo viability.',
      market_demand_score: 7,
      defensibility_score: 5,
      scalability_score: 4,
      founder_fit_score: 4,
      speed_to_revenue_score: 4,
      total_score: 24,
      rank: 6,
      probability_of_success: 25, // VDOS-inferred from "Complex sell" verdict and "Harder alone" solo-viability flag
    },
    {
      title: 'Music / Creative Arts',
      description: 'Traditional music or creative-arts enrichment programme. Source-verdict: "Crowded" — Medium demand, Low supply gap (well served already), only partial 8-week measurability.',
      market_demand_score: 5,
      defensibility_score: 3,
      scalability_score: 4,
      founder_fit_score: 5,
      speed_to_revenue_score: 5,
      total_score: 22,
      rank: 7,
      probability_of_success: 20, // VDOS-inferred — explicitly "Crowded" verdict
    },
    {
      title: 'Sport / Physical Coaching (Original Movement Programme)',
      description: 'The original, unpivoted children\'s movement/sport coaching programme. Source-verdict: "Crowded" — Medium demand, explicitly "Low — well served" supply gap, despite being easily measurable and solo-viable.',
      market_demand_score: 5,
      defensibility_score: 2,
      scalability_score: 4,
      founder_fit_score: 8,
      speed_to_revenue_score: 8,
      total_score: 27,
      rank: 8,
      probability_of_success: 20, // VDOS-inferred — explicitly "Crowded" verdict, the original idea being displaced by this analysis
    },
  ],
  top_recommendation:
    'A merged "emotional regulation + social skills + school readiness" venture — explicitly identified in the source as one product viewed from three angles, not three separate products.',
  rationale:
    '"The convergence point is clear. Three categories cluster together and overlap almost completely: emotional regulation, social skills, and school readiness. They share the same age range (3-8), the same gap in Canterbury\'s market, the same measurability window, and the same parent fear. They are not three separate products. They are one product viewed from three angles." (highestprobabilityventure.html, Part 02). Sport/physical coaching and music/creative arts are explicitly disqualified as "Crowded"; academic tutoring is disqualified despite high demand for the same reason. School Readiness, Emotional Regulation, and Social Skills are the three starred ("★") rows and are recommended to be merged into a single small-group readiness programme rather than launched as competing or separate offers.',
}

// ---------------------------------------------------------------------------
// Stage 9 — Category Creation (GATE)
// (Source: ventureos.html, Part I "Challenge every assumption" + Part II
// "Seven candidates. What actually scales?" + Part III "The Category Answer".)
// ---------------------------------------------------------------------------

// GATE-FRAMING RECONSTRUCTION NOTE: ventureos.html does not use VDOS's literal
// gate_criteria/gate_decision/gate_rationale boolean-gate language. It instead
// runs a category-candidate comparison table (Part II) and a narrative
// "Category Answer" argument (Part III) that concludes definitively in favour
// of "Inner Readiness", and the same document then proceeds (Parts IV-VI) to
// build out the full Venture OS (Philosophy/Methodology/Products/Evidence/
// Brand layers, Scale Architecture, Revenue Architecture) on the assumption
// that this category is accepted. The `gate_decision: 'pass'` and the three
// `gate_criteria` booleans below are therefore a VDOS-reconstruction of that
// narrative conclusion, not a literal pass/fail checklist present in the
// source — flagged here explicitly per the task's own instruction.
const stage9Output: Stage9Output = {
  category_options: [
    {
      category_name: 'Emotional Regulation',
      rationale: 'Fails challenge: "Emotional regulation is a mechanism — not a category. Parents don\'t search for it... Regulation is the how, not the what." (ventureos.html, Part I)',
    },
    {
      category_name: 'School Readiness',
      rationale: 'Fails challenge: has an age cliff (relevant only ages 3-5, expires as a parent concern by school entry) and is "already owned by ECE centres and kindy programmes." (ventureos.html, Part I)',
    },
    {
      category_name: 'Social Skills / Confidence Development',
      rationale: 'Fails challenge: "Confidence is an outcome, not a category... it is on every gymnastics flyer, every music school brochure" — completely undifferentiated; "Social skills" separately sounds remedial and parents resist self-identifying their child as lacking it. (ventureos.html, Part I)',
    },
    {
      category_name: 'Leadership Development',
      rationale: 'Fails challenge: "Leadership is a concept parents don\'t apply to children under 8... For a 4-year-old, leadership is either meaningless or slightly alarming." Wrong age frame for the founding category. (ventureos.html, Part I)',
    },
    {
      category_name: 'Movement Literacy',
      rationale: 'Survives challenge (real, research-backed, institutionally credible via Sport NZ, ages across 3-16) but assessed in the Part II comparison table as "Real, but narrow alone" — insufficient as a standalone founding category. (ventureos.html, Part I-II)',
    },
    {
      category_name: 'Inner Readiness',
      rationale: 'The selected new category: "the state of being prepared from the inside — the capacity to meet the world with regulation, curiosity, courage, and social ease," distinct from academic and physical readiness, applicable from age 4 through adulthood, modeled on how Montessori/Waldorf/Reggio Emilia each created a named worldview about children rather than a named programme. Scored "★ Category creation play" — the only candidate winning cleanly across all six evaluation dimensions in the Part II comparison table (parent searches for it once named, no age cliff, completely unowned in NZ, maximum scalability to curriculum/IP, deep evidence base across fields).',
    },
  ],
  selected_category: 'Inner Readiness',
  category_definition_statement:
    '"Inner Readiness is the foundational capability — before academic skill, before physical fitness, before any specialist learning — to be present, regulated, resilient, and genuinely engaged with the world." (ventureos.html, Part III, Category Definition box)',
  gate_criteria: {
    // RECONSTRUCTED — see note above. Booleans inferred from the Part II
    // comparison-table dimensions ("Parent searches for it?", "Unowned in
    // NZ?", "Scales to curriculum/IP?", "Evidence base exists?") which the
    // source scores "Once named ✓ / Completely ✓ / Maximum ✓ / Deep across
    // fields ✓" for Inner Readiness specifically.
    category_distinct_from_incumbents: true, // Part II table: "Unowned in NZ? Completely ✓" — distinct from emotional regulation, school readiness, confidence development, leadership development, movement literacy, and the SEL digital-curriculum market
    category_defensible: true, // Part III: modeled explicitly on Montessori/Waldorf/Reggio's named-worldview-> certifiable-methodology pattern, and contrasted with Gymboree's collapse ("It had a programme but not a philosophy... no philosophy, no moat")
    category_resonant_with_evidence: true, // Part III: "grounded in neuroscience, attachment theory, polyvagal theory, and developmental psychology... emotionally true to parents (they recognise the child who has it and the child who doesn't)"
  },
  gate_decision: 'pass', // VDOS-reconstructed — see note above; the source proceeds directly to building the full 5-layer Venture OS on this category in Parts IV-VI, implying acceptance
  gate_rationale:
    '(Gate framing is a VDOS reconstruction; the source itself does not use pass/block language.) The Part II seven-candidate comparison table shows "no single existing category wins cleanly... either have an age cliff, are owned by a competitor, are mechanism-level (not category-level), or are so generic they differentiate nothing." Inner Readiness is the only row scoring "★ Category creation play" across all six dimensions. Part III grounds the decision in the historical pattern of Montessori, Waldorf, and Reggio Emilia, each of which "scaled because it had a named worldview... not because it had a good programme," and contrasts this directly with Gymboree, which "had a programme but not a philosophy" and collapsed under debt and declining mall traffic with no defensive moat. On this basis the category is treated as validated and the document proceeds to design the full Venture OS around it.',
}

// ---------------------------------------------------------------------------
// Stage 11 — Venture Operating System Design
// (Source: ventureos.html, Part IV "The Venture OS" 5-layer stack
// [Philosophy/Methodology/Products/Evidence/Brand], Part V "Scale
// Architecture" 5-stage numerically-gated path, and Part VI "Revenue
// Architecture" 3-epoch revenue model.)
// ---------------------------------------------------------------------------

// MAPPING NOTE: ventureos.html's own structure (5 OS layers + 5 scale stages +
// 3 revenue epochs) does not map 1:1 onto Stage11Output's five named systems
// (sales_system / operations_system / financial_architecture /
// brand_marketing_system / capability_scaling_plan) plus risk_register. The
// mapping used below is:
//   - sales_system           <- Layer 3 (Products) + Epoch 1 direct-to-parent/
//                                school-contract revenue mechanics
//   - operations_system      <- Layer 1 (Philosophy) + Layer 2 (Methodology) +
//                                Scale Stages 1-2 (proving + transmitting the
//                                methodology)
//   - financial_architecture <- Part VI Revenue Architecture (3 epochs)
//   - brand_marketing_system <- Layer 5 (Brand) + Layer 4 (Evidence), since the
//                                source explicitly sequences brand AFTER
//                                evidence and treats published evidence as the
//                                core "marketing" asset
//   - capability_scaling_plan <- Part V Scale Architecture (5 numerically-gated
//                                stages, Stage 1 through Stage 5)
//   - risk_register           <- VDOS-reconstructed from the explicit risk
//                                language scattered through Parts IV-VI (the
//                                Gymboree case study, the "one risk that kills
//                                national brands" callout, the methodology-
//                                transmissibility risk) since the source has no
//                                dedicated risk-register section
const stage11Output: Stage11Output = {
  sales_system: {
    channels: [
      'Direct-to-parent enrolment for small-group sessions (the core MVP product — "Core: small-group sessions 3-8"), sold via school-endorsed sign-up notes and WhatsApp, per ventureos.html Layer 3.',
      'School programme contracts — selling the weekly in-school session directly to the school rather than to individual parents, billed institutionally (ventureos.html Layer 3 + Part VI Epoch 1).',
      'Extension products on the same methodology: school-based curriculum licences, a family workshop series, an 8-12 "pre-leadership" cohort, and a 12-16 "leadership" cohort (ventureos.html Layer 3) — all explicitly deferred until the core methodology is proven and named.',
      'Instructor certification cohorts (Epoch 2) and, eventually, regional territory licences (Epoch 3) — B2B/B2B2C channels that sell the methodology itself rather than direct child-facing delivery.',
    ],
    process:
      'Stage 1 (Terms 1-2): single-school pilot, direct parent sign-up via school-sent note, free or low-cost. Stage 2 (Terms 3-4): methodology is named and written down; a second instructor is trained to test transmissibility. Stage 4 (Year 2-3): the school-contract product and the instructor-certification product are formally launched as priced B2B revenue lines once outcomes and transmissibility are both proven (ventureos.html, Part V, Stages 1, 2, and 4).',
    pricing_architecture:
      'Epoch 1 (Now -> Year 2): direct-to-parent programme fees of $1,500-3,500 per term per class of 10; school programme contracts of $4,000-8,000 per school per year. Epoch 2 (Year 2-3): instructor certification at $800-1,200 per trainee per cohort; ECE/school curriculum licence at $600-1,200 per year per institution. Epoch 3 (Year 4+): national franchise/territory licence at $15,000-25,000 per territory, plus variable government/philanthropy funding (Sport NZ, Ministry of Education, Lion Foundation, Lottery Grants Board) once peer-reviewed evidence and an established certification exist. (ventureos.html, Part VI)',
  },
  operations_system: {
    delivery_model:
      'Single founder-led delivery initially (Scale Stage 1: "One school. One cohort of 10."), executing a fixed 5-layer Venture OS in strict build order — Layer 1 Philosophy (the named belief about children) must be written down and defended before Layer 2 Methodology (the four delivery mechanisms — embodied play/cooperative challenge/relational presence/emotional language — formalised into a certifiable framework) is built, before Layer 3 Products (the age/format-adapted programme portfolio) is built, before Layer 4 Evidence (session-level data -> dataset -> case study -> published report) is built, before Layer 5 Brand (name, visual identity, mascot, website) is built. "Miss a layer and the whole structure is unstable." (ventureos.html, Part IV)',
    key_processes: [
      'Per-session data capture across 5 observable metrics from Day 1, building toward a dataset usable for an eventual research partnership (Layer 4).',
      'Formal write-down of the methodology (the belief, the four delivery mechanisms, the session structure, the metrics system) at Scale Stage 2, which becomes the literal training curriculum for a second instructor.',
      'Co-facilitator supervision process: a second instructor is run through the programme as a co-facilitator and must independently deliver "comparable outcomes" before the venture is considered to have a transmissible (not just personally-delivered) methodology (Scale Stage 2 gate).',
      'Formal instructor certification course (2 days in-person + 8-week supervised delivery) developed at Scale Stage 4, turning the methodology into a credential.',
    ],
    bottleneck_mitigations: [
      'Founder-as-single-point-of-failure mitigated by the explicit Stage 2 gate requiring a second, independently-trained instructor to produce comparable outcomes before any further scaling is attempted — "you are now testing whether the methodology is transmissible, which is the only thing that scales."',
      'Premature-scaling risk mitigated by the strict layer-build-order rule (Philosophy before Methodology before Products before Evidence before Brand) and by explicit "Gate" criteria attached to every one of the 5 Scale Architecture stages (e.g. Stage 1 gate: "≥70% re-enrol + ≥1-point improvement avg across all 5 metrics" before proceeding to Stage 2).',
      'Credibility/trust risk mitigated by sequencing a university research partnership (University of Canterbury College of Education or AUT Early Childhood Faculty) at Scale Stage 3, before any institutional or government-funding conversations are attempted.',
    ],
  },
  financial_architecture: {
    revenue_layers: [
      'Epoch 1 — Direct-to-parent programme fees: $1,500-3,500 per term per class of 10 ("the engine that funds everything else").',
      'Epoch 1 — School programme contracts: $4,000-8,000 per school per year; 3-5 Canterbury schools = $12,000-40,000/year stable recurring revenue.',
      'Epoch 2 — Instructor certification: $800-1,200 per instructor per cohort, 2-3 cohorts/year of 8-12 trainees — "grows the programme without growing your delivery hours."',
      'Epoch 2 — ECE/school curriculum licence: $600-1,200 per year per institution — "low delivery cost; pure IP revenue."',
      'Epoch 3 — National franchise/certification network territory licence: $15,000-25,000 per territory (not viable before Year 4).',
      'Epoch 3 — Government + philanthropy funding (Sport NZ, Ministry of Education, Lion Foundation, Lottery Grants Board): variable, requires peer-reviewed evidence and demonstrated outcomes at scale.',
    ],
    margin_targets:
      'No explicit gross-margin percentages are given in the source (unlike PrimeTurf\'s ASQ3 price-band margin data); the source instead frames returns as flat per-term/per-cohort/per-territory dollar figures by epoch. Cost structure is implied to be low — equipment, venue, and printing costs in the low hundreds of dollars per term once past Term 1 (per the companion mvpmovementprogram.html / highestprobabilityventure.html unit-economics tables: e.g. ~$1,500-1,600 net per class per term after one-off equipment costs are absorbed).',
    breakeven_assessment:
      'Epoch 1 (direct-to-parent + school contracts) is explicitly framed as self-funding from Term 1 onward and as the sole funder of all later-epoch infrastructure: "The trap is trying to reach Epoch 3 revenue without building Epoch 1 and 2 infrastructure." Each epoch is gated on the prior epoch being "stable" before the next is attempted, per the Scale Architecture\'s numeric gates (Part V).',
  },
  brand_marketing_system: {
    positioning_statement:
      '"The category we are creating is Inner Readiness — and it is not a programme. It is a new field." (ventureos.html, Part VI closing argument) Modeled explicitly on Montessori, Waldorf, and Reggio Emilia, each of which "did not compete in existing categories. They created new ones," and scaled via a named worldview rather than a marketed programme.',
    primary_channels: [
      'Published evidence as the primary marketing asset: per-session data -> multi-cohort dataset -> case study -> formal published report -> peer-reviewed research partnership (e.g. with the University of Canterbury College of Education or AUT Early Childhood Faculty) — "a peer-reviewed paper with your name attached changes every institutional conversation you will ever have."',
      'School/principal endorsement as the primary early acquisition channel (school-sent sign-up notes carry institutional credibility that direct-to-parent marketing cannot).',
      'Government/philanthropy and press channels unlocked only once evidence and certification exist (Sport NZ, Ministry of Education, philanthropic foundations) — explicitly sequenced as an Epoch 3 (Year 4+) activity, not an early-stage marketing channel.',
      'Brand identity itself (name, visual identity, mascot system, website) is explicitly deferred: "Brand comes last... none of this exists until Layer 4 is generating real evidence. Then the brand has something true to say."',
    ],
    messaging_pillars: [
      'Inner Readiness as a named worldview about children, not a named programme — "the capacity to meet the world with regulation, curiosity, courage, and social ease," applicable across ages 4 to adulthood.',
      'Distinctness from academic readiness (prepares for tests) and physical readiness (prepares for sport): Inner Readiness "lives in the nervous system, the social brain, and the body."',
      'Evidence-led credibility ("grounded in neuroscience, attachment theory, polyvagal theory, and developmental psychology") rather than activity-led appeal.',
      'The Montessori/Waldorf/Reggio analogy used explicitly and repeatedly as the proof-pattern for how a category becomes a global methodology rather than staying a local class.',
    ],
  },
  capability_scaling_plan: {
    current_capability_gaps: [
      'No second instructor yet — methodology exists only in the founder\'s head, not yet formally written down or proven transmissible (pre-Stage-2 state).',
      'No published or even informally documented outcome evidence yet (pre-Stage-3 state) — required before any research partnership, school contract at scale, or government/philanthropy conversation is credible.',
      'No certification programme, training curriculum, or assessment instrument built yet (pre-Stage-4 state) — the "Inner Readiness Index" 5-dimension assessment instrument is explicitly named as needed but only "at prototype level" so far.',
      'No brand identity (name, visual identity, mascot, website) — deliberately not yet built, per the Layer 5 sequencing rule.',
    ],
    hiring_or_partnering_plan: [
      'Stage 1 (Terms 1-2 / Months 1-6): founder-only delivery, one school, one cohort of 10. Gate: ≥70% re-enrolment and ≥1-point average improvement across all 5 metrics before proceeding.',
      'Stage 2 (Terms 3-4 / Months 7-12): formally document the methodology; recruit and train one co-facilitator/second instructor under supervision. Gate: second instructor delivers the 8-week programme with comparable outcomes.',
      'Stage 3 (Year 2): build the evidence base across 40-80 children / 2-4 cohorts; approach a university research partner (University of Canterbury College of Education or AUT Early Childhood Faculty). Gate: research partnership secured or formal data report published.',
      'Stage 4 (Year 2-3): formalise instructor certification (2-day in-person + 8-week supervised delivery, $800-1,200/instructor) and launch the school-licence B2B product (3 Canterbury schools targeted, $4,000-8,000/year each). Gate: first certification cohort completed and first school contract signed.',
      'Stage 5 (Year 3-5): expand nationally with a named brand, a working certification system, institutional school contracts, a research partnership, and a multi-instructor team; approach Sport NZ, Ministry of Education, and philanthropic foundations; target Auckland, Wellington, Dunedin. Gate: 10+ certified instructors operating, 5+ school contracts, published evidence.',
    ],
    timeline:
      'Stage 1: Months 1-6 (Terms 1-2). Stage 2: Months 7-12 (Terms 3-4). Stage 3: Year 2. Stage 4: Year 2-3. Stage 5: Year 3-5. (ventureos.html, Part V, Scale Architecture.)',
  },
  risk_register: [
    {
      // VDOS-reconstructed entry — source frames this as a named historical
      // case study (Gymboree) rather than a forward-looking risk-register row,
      // but the source itself explicitly generalises it as "the one risk that
      // kills national brands."
      risk: 'Scaling the brand/franchise before the methodology is proven transmissible to other instructors (the "Gymboree risk")',
      likelihood: 'High if Scale Architecture stages are skipped or compressed',
      impact: 'Collapse of the venture\'s defensibility and moat — "It had a programme but not a philosophy... no philosophy, no moat" — historically associated with Gymboree\'s collapse under acquisition debt and declining mall traffic',
      mitigation: 'Strict adherence to the 5-layer build order (Philosophy before Methodology before Products before Evidence before Brand) and to the numeric Scale Architecture gates, especially the Stage 2 gate requiring a second, independently-trained instructor to produce comparable outcomes before further scaling. (ventureos.html, Part IV-V)',
    },
    {
      risk: 'Founder-as-single-point-of-delivery (key person dependency)',
      likelihood: 'High at current (Stage 1) state',
      impact: 'Venture cannot scale beyond one founder\'s personal delivery capacity, and cannot be sold, licensed, or transferred',
      mitigation: 'Formal written documentation of the methodology at Stage 2, specifically so it can be taught to and independently delivered by a second instructor — explicitly tested via the Stage 2 "comparable outcomes" gate.',
    },
    {
      risk: 'Outcomes/evidence not credible enough to unlock institutional revenue (school contracts, government/philanthropy funding)',
      likelihood: 'Medium — depends on disciplined data capture from Day 1',
      impact: 'Epoch 3 revenue (national franchise, government/philanthropy funding) and Stage 4-5 institutional partnerships become unreachable without it',
      mitigation: 'Capture per-session data on every cohort from Day 1; build toward a 40-80-child dataset by Year 2; secure a formal university research partnership (University of Canterbury / AUT) before approaching schools at scale or government funders.',
    },
    {
      risk: 'Premature brand investment before the underlying work is real',
      likelihood: 'Medium — a natural founder temptation given how marketable the "Inner Readiness" category framing is',
      impact: 'Brand built on no evidence base risks looking exactly like the generic, undifferentiated "confidence development" category explicitly rejected in Part I, undermining the entire category-creation thesis',
      mitigation: 'Explicit Layer 5 sequencing rule deferring all brand-identity work (name, visual identity, mascot, website) until Layer 4 (Evidence) is generating real, usable data — modeled directly on Montessori\'s own sequencing ("She opened the first Casa dei Bambini... observed 50 children for two years, and published her findings. The brand became inevitable because the work was real").',
    },
  ],
}

// ---------------------------------------------------------------------------
// Combined stages export — ONLY Stage 0, 6, 9, 11 (no source evidence exists
// for Stages 1-5, 7, 8, 10 — they are intentionally omitted, not fabricated).
// ---------------------------------------------------------------------------

type AnyStageOutput = Stage0Output | Stage6Output | Stage9Output | Stage11Output

export const readyRootedStages: Partial<
  Record<number, { stage_key: StageKey; output: AnyStageOutput; is_gate: boolean; gate_passed: boolean | null }>
> = {
  0: { stage_key: 'assumption_destruction', output: stage0Output, is_gate: false, gate_passed: null },
  6: { stage_key: 'opportunity_ranking', output: stage6Output, is_gate: false, gate_passed: null },
  9: { stage_key: 'category_creation', output: stage9Output, is_gate: true, gate_passed: true },
  11: { stage_key: 'vos_design', output: stage11Output, is_gate: false, gate_passed: null },
}

// ---------------------------------------------------------------------------
// Opportunities (Stage 0 emergent ventures + Stage 6 ranked opportunities)
// Mirrors the construction of primeTurfOpportunities in seed-primeturf-data.ts.
// ---------------------------------------------------------------------------

export const readyRootedOpportunities: Array<{
  source_stage: number
  title: string
  description?: string
  market_demand_score: number
  defensibility_score: number
  scalability_score: number
  founder_fit_score: number
  speed_to_revenue_score: number
  total_score: number
  rank: number
  probability_of_success?: number
  notes?: string
}> = [
  // Stage 0 — Emergent Ventures (6 entries)
  ...stage0Output.emergent_ventures.map((v, idx) => ({
    source_stage: 0,
    title: v.name,
    description: v.description,
    market_demand_score: v.market_demand,
    defensibility_score: v.defensibility,
    scalability_score: v.scalability,
    founder_fit_score: v.founder_fit,
    speed_to_revenue_score: v.speed_to_revenue,
    total_score: v.total,
    rank: idx + 1,
    notes:
      'Stage 0 totals (/50) are VDOS-inferred numeric translations of the qualitative gap-map labels (Very High/High/Medium/Low, Crowded/Strong gap/Best gap) given in highestprobabilityventure.html and venturestrategy2026.html — these source documents do not publish literal 0-10 dimension scores or /50 totals the way PrimeTurf\'s Stage 0 document did. Relative ranking is evidenced; exact point values are reconstructed.',
  })),
  // Stage 6 — Ranked Opportunities (8 entries)
  ...stage6Output.ranked_opportunities.map((o) => ({
    source_stage: 6,
    title: o.title,
    description: o.description,
    market_demand_score: o.market_demand_score,
    defensibility_score: o.defensibility_score,
    scalability_score: o.scalability_score,
    founder_fit_score: o.founder_fit_score,
    speed_to_revenue_score: o.speed_to_revenue_score,
    total_score: o.total_score,
    rank: o.rank,
    probability_of_success: o.probability_of_success,
    notes:
      'All five dimension scores and totals are VDOS-inferred numeric translations of the qualitative cell labels in highestprobabilityventure.html\'s Part 02 gap-map table (Parent Demand / Supply Gap / Measurable in 8wks / Solo Viable / Verdict columns) — not verbatim numeric data, since the source publishes no numeric scoring table. probability_of_success is VDOS-inferred from the explicit verdict labels ("★ Best gap", "★ Strong gap", "Crowded", "Complex sell", "Soft demand").',
  })),
]

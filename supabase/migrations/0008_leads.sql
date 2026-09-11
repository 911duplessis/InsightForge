-- Public contact/intake qualifying form (app/contact). Distinct from
-- discovery_sessions/vdos_engagements: a lead here hasn't chosen or started
-- a tier yet — this table is the pre-tier qualifying step described in
-- docs/brand-strategy/03-website-architecture.md, routing a visitor toward
-- FORGE Lite or VDOS based on their answers.

create table if not exists leads (
  id uuid default uuid_generate_v4() primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  industry text,
  budget_range text,
  urgency text,
  problem_description text,
  recommended_tier text check (recommended_tier in ('forge_lite', 'vdos')),
  created_at timestamptz default now() not null
);

create index if not exists idx_leads_created_at on leads(created_at desc);

alter table leads enable row level security;

create policy "service_role_all_leads" on leads
  for all using ((select auth.role()) = 'service_role');

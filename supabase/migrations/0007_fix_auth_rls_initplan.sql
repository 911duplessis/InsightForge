-- Fixes the Supabase linter's auth_rls_initplan WARN (18 findings): every
-- policy in the schema called auth.role()/auth.jwt() directly in its USING
-- clause, which re-evaluates the function per row instead of once per query.
-- Wrapping the call as (select auth.<fn>()) lets Postgres treat it as a
-- stable subquery the planner can evaluate once. Same predicate, same
-- effective access — this only changes evaluation cost.

-- ---------------------------------------------------------------------------
-- Legacy FORGE tables (schema.sql)
-- ---------------------------------------------------------------------------
drop policy if exists "service_role_all_clients" on clients;
create policy "service_role_all_clients" on clients
  for all using ((select auth.role()) = 'service_role');

drop policy if exists "service_role_all_sessions" on discovery_sessions;
create policy "service_role_all_sessions" on discovery_sessions
  for all using ((select auth.role()) = 'service_role');

drop policy if exists "service_role_all_answers" on discovery_answers;
create policy "service_role_all_answers" on discovery_answers
  for all using ((select auth.role()) = 'service_role');

drop policy if exists "service_role_all_insights" on insights;
create policy "service_role_all_insights" on insights
  for all using ((select auth.role()) = 'service_role');

drop policy if exists "service_role_all_opportunities" on opportunities;
create policy "service_role_all_opportunities" on opportunities
  for all using ((select auth.role()) = 'service_role');

drop policy if exists "service_role_all_blueprints" on blueprints;
create policy "service_role_all_blueprints" on blueprints
  for all using ((select auth.role()) = 'service_role');

-- ---------------------------------------------------------------------------
-- VDOS tables (0002_vdos.sql)
-- ---------------------------------------------------------------------------
drop policy if exists "service_role_all_businesses" on businesses;
create policy "service_role_all_businesses" on businesses
  for all using ((select auth.role()) = 'service_role');

drop policy if exists "service_role_all_consultants" on consultants;
create policy "service_role_all_consultants" on consultants
  for all using ((select auth.role()) = 'service_role');

drop policy if exists "service_role_all_consultant_business_access" on consultant_business_access;
create policy "service_role_all_consultant_business_access" on consultant_business_access
  for all using ((select auth.role()) = 'service_role');

drop policy if exists "service_role_all_engagements" on vdos_engagements;
create policy "service_role_all_engagements" on vdos_engagements
  for all using ((select auth.role()) = 'service_role');

drop policy if exists "service_role_all_stages" on vdos_stages;
create policy "service_role_all_stages" on vdos_stages
  for all using ((select auth.role()) = 'service_role');

drop policy if exists "service_role_all_asq_instruments" on asq_instruments;
create policy "service_role_all_asq_instruments" on asq_instruments
  for all using ((select auth.role()) = 'service_role');

drop policy if exists "service_role_all_asq4_deals" on asq4_deals;
create policy "service_role_all_asq4_deals" on asq4_deals
  for all using ((select auth.role()) = 'service_role');

drop policy if exists "service_role_all_vdos_opportunities" on vdos_opportunities;
create policy "service_role_all_vdos_opportunities" on vdos_opportunities
  for all using ((select auth.role()) = 'service_role');

drop policy if exists "service_role_all_vdos_blueprints" on vdos_blueprints;
create policy "service_role_all_vdos_blueprints" on vdos_blueprints
  for all using ((select auth.role()) = 'service_role');

drop policy if exists "business_scoped_engagements" on vdos_engagements;
create policy "business_scoped_engagements" on vdos_engagements
  for select using (business_id::text = ((select auth.jwt()) ->> 'business_id'));

drop policy if exists "business_scoped_stages" on vdos_stages;
create policy "business_scoped_stages" on vdos_stages
  for select using (business_id::text = ((select auth.jwt()) ->> 'business_id'));

-- ---------------------------------------------------------------------------
-- rate_limit_hits (0005_rate_limit_hits_rls.sql)
-- ---------------------------------------------------------------------------
drop policy if exists "service_role_all_rate_limit_hits" on rate_limit_hits;
create policy "service_role_all_rate_limit_hits" on rate_limit_hits
  for all using ((select auth.role()) = 'service_role');

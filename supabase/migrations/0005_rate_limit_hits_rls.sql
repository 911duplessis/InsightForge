-- Fixes the Supabase linter's rls_disabled_in_public ERROR: rate_limit_hits
-- (added in 0003_rate_limit.sql) was exposed to PostgREST with no RLS, so the
-- anon key could read/write every row. lib/rateLimit.ts only ever touches this
-- table via supabaseAdmin (service role, which bypasses RLS), so locking it to
-- service_role-only costs the app nothing — same pattern every other table in
-- this schema already uses.

alter table rate_limit_hits enable row level security;

create policy "service_role_all_rate_limit_hits" on rate_limit_hits
  for all using (auth.role() = 'service_role');

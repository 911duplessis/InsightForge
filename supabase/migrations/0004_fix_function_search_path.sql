-- Pins search_path on update_updated_at_column(), fixing the Supabase
-- linter's "function_search_path_mutable" WARN. The function only calls
-- now() (pg_catalog, always resolvable regardless of search_path) and
-- touches NEW/OLD directly, so an empty search_path is safe and forces
-- any future edit to this function to fully-qualify identifiers.

create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql
set search_path = '';

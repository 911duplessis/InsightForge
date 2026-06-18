import { supabaseAdmin } from '@/lib/supabase'

/**
 * Every tenant-data read/update/delete must go through one of these helpers
 * rather than calling supabaseAdmin.from(table) directly, so the business_id
 * filter is always visible and impossible to omit by accident. Service role
 * bypasses RLS, so this app-layer filter is the real isolation boundary
 * between businesses.
 */

export function scopedSelect(businessId: string, table: string, columns = '*') {
  return supabaseAdmin.from(table).select(columns).eq('business_id', businessId)
}

export function scopedUpdate(businessId: string, table: string, values: Record<string, unknown>) {
  return supabaseAdmin.from(table).update(values).eq('business_id', businessId)
}

export function scopedDelete(businessId: string, table: string) {
  return supabaseAdmin.from(table).delete().eq('business_id', businessId)
}

/** Inserts always carry business_id explicitly in the row payload — no filter needed. */
export function insertScoped(table: string, row: Record<string, unknown>) {
  return supabaseAdmin.from(table).insert(row)
}

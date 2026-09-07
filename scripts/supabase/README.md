# Supabase database records

This directory keeps reproducible database SQL and structural snapshots for NoUploadTools.

## Files

- `database-inventory.sql` - read-only SQL that inventories schemas, tables, columns, constraints, indexes, RLS policies, triggers, views, functions, grants, extensions, publications, and Supabase roles without dumping application rows or auth-user data.
- `snapshots/database-inventory-2026-09-07.json.gz` - compressed structural inventory exported from the NoUploadTools Supabase project on 2026-09-07. This snapshot was taken immediately before the Devil's Advocate waitlist table was created.
- `migrations/2026-09-07-devils-advocate-waitlist.sql` - SQL used to create and secure `public.devils_advocate_waitlist`.

## Devil's Advocate waitlist security

`public.devils_advocate_waitlist` has RLS enabled and intentionally has no policies for `anon` or `authenticated`. Those roles have no table grants. The Next.js route `/api/devils-advocate-waitlist` performs validated writes from the server with `service_role`.

The service role is granted only `SELECT`, `INSERT`, and `UPDATE` for this table. The API uses email as the unique upsert key so repeat signups can update website/paid-interest information without creating duplicate email rows.

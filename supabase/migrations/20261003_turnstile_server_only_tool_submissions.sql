-- Tool submissions are protected by Cloudflare Turnstile and written server-side.
-- Close the legacy direct browser -> Supabase insert path.

begin;

drop policy if exists "Anyone can submit a tool" on public.tools;
revoke insert on table public.tools from anon, authenticated;

commit;

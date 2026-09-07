-- Tool submissions now pass through /api/submit-tool, where Turnstile is verified
-- before the server writes with the service-role key.
--
-- Apply this migration to the NoUploadTools Supabase project only after the
-- protected server route is deployed and verified. This closes the old direct
-- browser -> Supabase insert path without changing public SELECT access.

begin;

revoke insert on table public.tools from anon, authenticated;

commit;

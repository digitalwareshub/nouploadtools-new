-- The existing slug trigger uses unqualified public function/table names.
-- Browser roles cannot CREATE in public; this RPC remains service-role-only.
alter function public.insert_tool_submission(jsonb, text, text)
  set search_path = pg_catalog, public;

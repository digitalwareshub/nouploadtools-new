-- NoUploadTools Supabase database inventory
-- READ ONLY
--
-- Produces a single JSON document describing database structure and security
-- without returning application rows, auth users, email addresses, or stored data.
--
-- Run in Supabase Dashboard -> SQL Editor.

with

user_schemas as (
  select
    n.oid,
    n.nspname as schema_name,
    pg_get_userbyid(n.nspowner) as owner,
    n.nspacl::text as acl
  from pg_namespace n
  where n.nspname not in ('pg_catalog', 'information_schema')
    and n.nspname not like 'pg_toast%'
    and n.nspname not like 'pg_temp_%'
    and n.nspname not like 'pg_toast_temp_%'
),

tables as (
  select
    s.schema_name,
    c.relname as table_name,
    case c.relkind
      when 'r' then 'table'
      when 'p' then 'partitioned_table'
      else c.relkind::text
    end as table_type,
    pg_get_userbyid(c.relowner) as owner,
    c.relrowsecurity as rls_enabled,
    c.relforcerowsecurity as rls_forced,
    c.relreplident::text as replica_identity,
    c.reloptions,
    obj_description(c.oid, 'pg_class') as comment
  from pg_class c
  join user_schemas s on s.oid = c.relnamespace
  where c.relkind in ('r', 'p')
),

columns as (
  select
    s.schema_name,
    c.relname as table_name,
    a.attnum as position,
    a.attname as column_name,
    format_type(a.atttypid, a.atttypmod) as data_type,
    a.attnotnull as not_null,
    pg_get_expr(ad.adbin, ad.adrelid) as default_value,
    case a.attidentity
      when 'a' then 'always'
      when 'd' then 'by_default'
      else null
    end as identity_type,
    case a.attgenerated
      when 's' then 'stored'
      else null
    end as generated_type,
    col_description(c.oid, a.attnum) as comment
  from pg_attribute a
  join pg_class c on c.oid = a.attrelid
  join user_schemas s on s.oid = c.relnamespace
  left join pg_attrdef ad
    on ad.adrelid = a.attrelid
   and ad.adnum = a.attnum
  where c.relkind in ('r', 'p', 'v', 'm')
    and a.attnum > 0
    and not a.attisdropped
),

constraints as (
  select
    s.schema_name,
    c.relname as table_name,
    con.conname as constraint_name,
    case con.contype
      when 'p' then 'primary_key'
      when 'f' then 'foreign_key'
      when 'u' then 'unique'
      when 'c' then 'check'
      when 'x' then 'exclusion'
      when 'n' then 'not_null'
      else con.contype::text
    end as constraint_type,
    con.condeferrable as deferrable,
    con.condeferred as initially_deferred,
    pg_get_constraintdef(con.oid, true) as definition
  from pg_constraint con
  join pg_class c on c.oid = con.conrelid
  join user_schemas s on s.oid = c.relnamespace
),

indexes as (
  select
    schemaname as schema_name,
    tablename as table_name,
    indexname as index_name,
    indexdef as definition
  from pg_indexes
  where schemaname in (select schema_name from user_schemas)
),

policies as (
  select
    schemaname as schema_name,
    tablename as table_name,
    policyname as policy_name,
    permissive,
    roles,
    cmd as command,
    qual as using_expression,
    with_check as with_check_expression
  from pg_policies
  where schemaname in (select schema_name from user_schemas)
),

triggers as (
  select
    s.schema_name,
    c.relname as table_name,
    t.tgname as trigger_name,
    case t.tgenabled
      when 'O' then 'enabled'
      when 'D' then 'disabled'
      when 'R' then 'replica'
      when 'A' then 'always'
      else t.tgenabled::text
    end as status,
    p.proname as function_name,
    pn.nspname as function_schema,
    pg_get_triggerdef(t.oid, true) as definition
  from pg_trigger t
  join pg_class c on c.oid = t.tgrelid
  join user_schemas s on s.oid = c.relnamespace
  join pg_proc p on p.oid = t.tgfoid
  join pg_namespace pn on pn.oid = p.pronamespace
  where not t.tgisinternal
),

views as (
  select
    v.schemaname as schema_name,
    v.viewname as view_name,
    v.viewowner as owner,
    c.reloptions,
    v.definition
  from pg_views v
  join pg_namespace n on n.nspname = v.schemaname
  join pg_class c
    on c.relnamespace = n.oid
   and c.relname = v.viewname
   and c.relkind = 'v'
  where v.schemaname in (select schema_name from user_schemas)
),

materialized_views as (
  select
    m.schemaname as schema_name,
    m.matviewname as view_name,
    m.matviewowner as owner,
    m.ispopulated as populated,
    m.definition
  from pg_matviews m
  where m.schemaname in (select schema_name from user_schemas)
),

functions as (
  select
    s.schema_name,
    p.proname as function_name,
    format(
      '%I.%I(%s)',
      s.schema_name,
      p.proname,
      pg_get_function_identity_arguments(p.oid)
    ) as signature,
    pg_get_function_result(p.oid) as return_type,
    l.lanname as language,
    case p.prokind
      when 'f' then 'function'
      when 'p' then 'procedure'
      when 'a' then 'aggregate'
      when 'w' then 'window'
      else p.prokind::text
    end as object_type,
    pg_get_userbyid(p.proowner) as owner,
    p.prosecdef as security_definer,
    case p.provolatile
      when 'i' then 'immutable'
      when 's' then 'stable'
      when 'v' then 'volatile'
      else p.provolatile::text
    end as volatility,
    case p.proparallel
      when 's' then 'safe'
      when 'r' then 'restricted'
      when 'u' then 'unsafe'
      else p.proparallel::text
    end as parallel_safety,
    p.proleakproof as leakproof,
    p.proacl::text as acl
  from pg_proc p
  join user_schemas s on s.oid = p.pronamespace
  join pg_language l on l.oid = p.prolang
),

sequences as (
  select
    schemaname as schema_name,
    sequencename as sequence_name,
    sequenceowner as owner,
    data_type,
    start_value,
    min_value,
    max_value,
    increment_by,
    cycle,
    cache_size
  from pg_sequences
  where schemaname in (select schema_name from user_schemas)
),

enums as (
  select
    s.schema_name,
    t.typname as enum_name,
    jsonb_agg(e.enumlabel order by e.enumsortorder) as values
  from pg_type t
  join user_schemas s on s.oid = t.typnamespace
  join pg_enum e on e.enumtypid = t.oid
  group by s.schema_name, t.typname
),

table_grants as (
  select
    grantor,
    grantee,
    table_schema as schema_name,
    table_name,
    privilege_type,
    is_grantable
  from information_schema.table_privileges
  where table_schema in (select schema_name from user_schemas)
),

column_grants as (
  select
    grantor,
    grantee,
    table_schema as schema_name,
    table_name,
    column_name,
    privilege_type,
    is_grantable
  from information_schema.column_privileges
  where table_schema in (select schema_name from user_schemas)
),

default_privileges as (
  select
    coalesce(n.nspname, '*') as schema_name,
    r.rolname as owner,
    d.defaclobjtype::text as object_type,
    d.defaclacl::text as acl
  from pg_default_acl d
  join pg_roles r on r.oid = d.defaclrole
  left join pg_namespace n on n.oid = d.defaclnamespace
),

extensions as (
  select
    e.extname as extension_name,
    e.extversion as version,
    n.nspname as schema_name,
    e.extrelocatable as relocatable
  from pg_extension e
  join pg_namespace n on n.oid = e.extnamespace
),

event_triggers as (
  select
    e.evtname as event_trigger_name,
    e.evtevent as event,
    case e.evtenabled
      when 'O' then 'enabled'
      when 'D' then 'disabled'
      when 'R' then 'replica'
      when 'A' then 'always'
      else e.evtenabled::text
    end as status,
    e.evttags as tags,
    e.evtfoid::regproc::text as function_name
  from pg_event_trigger e
),

publications as (
  select
    p.pubname as publication_name,
    pg_get_userbyid(p.pubowner) as owner,
    p.puballtables as all_tables,
    p.pubinsert as publish_insert,
    p.pubupdate as publish_update,
    p.pubdelete as publish_delete,
    p.pubtruncate as publish_truncate
  from pg_publication p
),

publication_tables as (
  select
    pubname as publication_name,
    schemaname as schema_name,
    tablename as table_name
  from pg_publication_tables
),

installed_roles as (
  select
    rolname as role_name,
    rolsuper as superuser,
    rolinherit as inherit,
    rolcreaterole as create_role,
    rolcreatedb as create_database,
    rolcanlogin as can_login,
    rolreplication as replication,
    rolbypassrls as bypass_rls
  from pg_roles
  where rolname in (
    'anon',
    'authenticated',
    'service_role',
    'supabase_auth_admin',
    'supabase_storage_admin',
    'postgres'
  )
)

select jsonb_pretty(
  jsonb_build_object(
    'generated_at', now(),
    'database', current_database(),
    'server_version', current_setting('server_version'),
    'schemas', coalesce((select jsonb_agg(to_jsonb(x) order by x.schema_name) from user_schemas x), '[]'::jsonb),
    'tables', coalesce((select jsonb_agg(to_jsonb(x) order by x.schema_name, x.table_name) from tables x), '[]'::jsonb),
    'columns', coalesce((select jsonb_agg(to_jsonb(x) order by x.schema_name, x.table_name, x.position) from columns x), '[]'::jsonb),
    'constraints', coalesce((select jsonb_agg(to_jsonb(x) order by x.schema_name, x.table_name, x.constraint_name) from constraints x), '[]'::jsonb),
    'indexes', coalesce((select jsonb_agg(to_jsonb(x) order by x.schema_name, x.table_name, x.index_name) from indexes x), '[]'::jsonb),
    'rls_policies', coalesce((select jsonb_agg(to_jsonb(x) order by x.schema_name, x.table_name, x.policy_name) from policies x), '[]'::jsonb),
    'triggers', coalesce((select jsonb_agg(to_jsonb(x) order by x.schema_name, x.table_name, x.trigger_name) from triggers x), '[]'::jsonb),
    'views', coalesce((select jsonb_agg(to_jsonb(x) order by x.schema_name, x.view_name) from views x), '[]'::jsonb),
    'materialized_views', coalesce((select jsonb_agg(to_jsonb(x) order by x.schema_name, x.view_name) from materialized_views x), '[]'::jsonb),
    'functions', coalesce((select jsonb_agg(to_jsonb(x) order by x.schema_name, x.function_name, x.signature) from functions x), '[]'::jsonb),
    'sequences', coalesce((select jsonb_agg(to_jsonb(x) order by x.schema_name, x.sequence_name) from sequences x), '[]'::jsonb),
    'enums', coalesce((select jsonb_agg(to_jsonb(x) order by x.schema_name, x.enum_name) from enums x), '[]'::jsonb),
    'table_grants', coalesce((select jsonb_agg(to_jsonb(x) order by x.schema_name, x.table_name, x.grantee, x.privilege_type) from table_grants x), '[]'::jsonb),
    'column_grants', coalesce((select jsonb_agg(to_jsonb(x) order by x.schema_name, x.table_name, x.column_name, x.grantee, x.privilege_type) from column_grants x), '[]'::jsonb),
    'default_privileges', coalesce((select jsonb_agg(to_jsonb(x) order by x.schema_name, x.owner, x.object_type) from default_privileges x), '[]'::jsonb),
    'extensions', coalesce((select jsonb_agg(to_jsonb(x) order by x.extension_name) from extensions x), '[]'::jsonb),
    'event_triggers', coalesce((select jsonb_agg(to_jsonb(x) order by x.event_trigger_name) from event_triggers x), '[]'::jsonb),
    'publications', coalesce((select jsonb_agg(to_jsonb(x) order by x.publication_name) from publications x), '[]'::jsonb),
    'publication_tables', coalesce((select jsonb_agg(to_jsonb(x) order by x.publication_name, x.schema_name, x.table_name) from publication_tables x), '[]'::jsonb),
    'supabase_roles', coalesce((select jsonb_agg(to_jsonb(x) order by x.role_name) from installed_roles x), '[]'::jsonb)
  )
) as database_inventory;

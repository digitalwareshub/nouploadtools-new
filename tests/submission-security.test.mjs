import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import { loadTypeScript } from './load-typescript.mjs';

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
let quotaCalls;
let quotaAllowed;
let quotaFailure;
let databaseFailure;
let databaseStatus;
let siteverify;
let databaseBodies;
let redisArgs;
let POST;
let turnstile;
let abuse;

beforeEach(() => {
  Object.assign(process.env, {
    NEXT_PUBLIC_SUPABASE_URL: 'https://database.example',
    SUPABASE_SERVICE_ROLE_KEY: 'test-service-key',
    TURNSTILE_SECRET_KEY: 'test-turnstile-secret',
    TURNSTILE_ALLOWED_HOSTNAMES: 'nouploadtools.com',
    SUBMISSION_FINGERPRINT_SECRET: 'test-private-secret-of-at-least-32-characters',
    UPSTASH_REDIS_REST_URL: 'https://redis.example',
    UPSTASH_REDIS_REST_TOKEN: 'test-redis-token',
  });
  quotaCalls = 0;
  quotaAllowed = true;
  quotaFailure = false;
  databaseFailure = false;
  databaseStatus = 200;
  databaseBodies = [];
  redisArgs = [];
  siteverify = { success: true, action: 'submit-tool', hostname: 'nouploadtools.com' };
  turnstile = loadTypeScript('lib/turnstile.ts');
  abuse = loadTypeScript('lib/submission-abuse.ts', {
    './turnstile': turnstile,
    '@upstash/redis': {
      Redis: class {
        async eval(...args) {
          quotaCalls++;
          redisArgs.push(args);
          if (quotaFailure) throw new Error('Redis unavailable');
          return [quotaAllowed ? 1 : 0, quotaAllowed ? 0 : 120];
        }
      },
    },
  });
  POST = loadTypeScript('app/api/submit-tool/route.ts', {
    '@/lib/turnstile': turnstile,
    '@/lib/submission-abuse': abuse,
  }).POST;
  globalThis.fetch = async (url, options) => {
    if (url.includes('siteverify')) return Response.json(siteverify);
    databaseBodies.push(JSON.parse(options.body));
    if (databaseFailure) throw new Error('Database unreachable');
    return Response.json(databaseStatus === 409 ? { code: '23505' } : 'tool-id', {
      status: databaseStatus,
    });
  };
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const key of Object.keys(process.env)) {
    if (!Object.hasOwn(originalEnv, key)) delete process.env[key];
  }
  Object.assign(process.env, originalEnv);
});

function request(body, headers = {}) {
  return new Request('https://nouploadtools.com/api/submit-tool', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-vercel-forwarded-for': '192.0.2.1',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}
const valid = {
  name: 'Example tool',
  url: 'https://example.com',
  tagline: 'A useful browser tool',
  category: 'images',
  submitted_by_email: 'founder@example.com',
  submitted_by_name: 'Founder',
  is_no_upload: true,
  turnstile_token: 'verified-token',
};

test('malformed shapes and field mistakes do not call verification, Redis, or the database', async () => {
  for (const body of [
    null,
    [],
    'string',
    42,
    {},
    { ...valid, submitted_by_email: 'bad' },
    { ...valid, category: 'unknown' },
    { ...valid, is_no_upload: false },
    { ...valid, is_open_source: true },
  ]) {
    assert.equal((await POST(request(body))).status, 400);
  }
  const malformed = request(valid);
  malformed.json = async () => {
    throw new SyntaxError();
  };
  assert.equal((await POST(malformed)).status, 400);
  assert.equal(quotaCalls, 0);
  assert.equal(databaseBodies.length, 0);
});

test('missing/fake/oversized tokens, action and hostname mismatches cannot consume quota or insert', async () => {
  for (const token of [undefined, '', ' '.repeat(4), 'x'.repeat(2049)]) {
    assert.equal((await POST(request({ ...valid, turnstile_token: token }))).status, 403);
  }
  for (const result of [
    { success: false },
    { success: true, action: 'other', hostname: 'nouploadtools.com' },
    { success: true, action: 'submit-tool', hostname: 'attacker.example' },
    { success: true, action: 'submit-tool' },
    { success: 'true', action: 'submit-tool', hostname: 'nouploadtools.com' },
  ]) {
    siteverify = result;
    assert.equal((await POST(request(valid))).status, 403);
  }
  assert.equal(quotaCalls, 0);
  assert.equal(databaseBodies.length, 0);
});

test('missing secret and Cloudflare network/HTTP/JSON failures fail closed', async () => {
  delete process.env.TURNSTILE_SECRET_KEY;
  assert.equal((await POST(request(valid))).status, 503);
  process.env.TURNSTILE_SECRET_KEY = 'test-secret';
  globalThis.fetch = async () => {
    throw new Error('Cloudflare unavailable');
  };
  assert.equal((await POST(request(valid))).status, 503);
  globalThis.fetch = async () => new Response('down', { status: 503 });
  assert.equal((await POST(request(valid))).status, 503);
  globalThis.fetch = async () => new Response('invalid JSON');
  assert.equal((await POST(request(valid))).status, 403);
  assert.equal(quotaCalls, 0);
});

test('valid submission consumes one attempt and requests an atomic pending insert/log without raw IP', async () => {
  const response = await POST(request({ ...valid, status: 'approved', fingerprint: 'forged' }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(quotaCalls, 1);
  assert.equal(databaseBodies.length, 1);
  const body = databaseBodies[0];
  assert.equal(body.p_domain, 'example.com');
  assert.equal(body.p_tool.status, 'pending');
  assert.match(body.p_fingerprint, /^[0-9a-f]{64}$/);
  assert.equal(JSON.stringify(body).includes('192.0.2.1'), false);
  assert.equal(JSON.stringify(redisArgs).includes('192.0.2.1'), false);
});

test('quota rejection is friendly, supplies Retry-After, and never inserts', async () => {
  quotaAllowed = false;
  const response = await POST(request(valid));
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('Retry-After'), '120');
  assert.match((await response.json()).error, /Please wait/);
  assert.equal(databaseBodies.length, 0);
});

test('missing HMAC/Redis configuration, unknown IP, and Redis outage fail closed', async () => {
  delete process.env.SUBMISSION_FINGERPRINT_SECRET;
  assert.equal((await POST(request(valid))).status, 503);
  process.env.SUBMISSION_FINGERPRINT_SECRET = 'a'.repeat(64);
  assert.equal(
    (await POST(request(valid, { 'x-vercel-forwarded-for': 'invalid-ip' }))).status,
    503,
  );
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  assert.equal((await POST(request(valid))).status, 503);
  process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token';
  quotaFailure = true;
  assert.equal((await POST(request(valid))).status, 503);
  assert.equal(databaseBodies.length, 0);
});

test('database outages and conflicts return clean errors after counting the verified attempt', async () => {
  databaseFailure = true;
  assert.equal((await POST(request(valid))).status, 503);
  databaseFailure = false;
  databaseStatus = 409;
  assert.equal((await POST(request(valid))).status, 409);
  databaseStatus = 500;
  assert.equal((await POST(request(valid))).status, 500);
  assert.equal(quotaCalls, 3);
});

test('HMAC is stable, secret-dependent, and canonicalizes equivalent IPv6 addresses', () => {
  const a = abuse.submissionFingerprint(request(valid));
  assert.equal(abuse.submissionFingerprint(request(valid)), a);
  assert.notEqual(
    abuse.submissionFingerprint(request(valid, { 'x-vercel-forwarded-for': '192.0.2.2' })),
    a,
  );
  process.env.SUBMISSION_FINGERPRINT_SECRET = 'b'.repeat(64);
  assert.notEqual(abuse.submissionFingerprint(request(valid)), a);
  assert.equal(
    abuse.submissionFingerprint(request(valid, { 'x-vercel-forwarded-for': '2001:db8::1' })),
    abuse.submissionFingerprint(
      request(valid, { 'x-vercel-forwarded-for': '2001:0db8:0000:0000:0000:0000:0000:0001' }),
    ),
  );
});

test('honeypot never inserts or consumes quota', async () => {
  assert.equal((await POST(request({ ...valid, company: 'bot' }))).status, 200);
  assert.equal(quotaCalls, 0);
  assert.equal(databaseBodies.length, 0);
});

test('directory explicitly projects public columns and admin fetches counts separately', async () => {
  const urls = [];
  globalThis.fetch = async (url) => {
    urls.push(url);
    if (url.includes('submission_source_counts'))
      return Response.json([{ tool_id: 'id', submission_count: 8 }]);
    return Response.json([]);
  };
  const publicDb = loadTypeScript('lib/supabase.ts');
  assert.equal(publicDb.PUBLIC_TOOL_COLUMNS.includes('submitted_by'), false);
  await publicDb.getApprovedTools();
  assert.match(urls[0], /select=id,name,url/);
  const admin = loadTypeScript('lib/admin-supabase.ts');
  assert.equal((await admin.adminGetSubmissionSourceCounts()).get('id'), 8);
});

test('admin warning appears at 3+ recent submissions and does not label the source as spam', async () => {
  const { renderToStaticMarkup } = await import('react-dom/server');
  const fixture = {
    ...valid,
    id: 'tool-id',
    slug: 'example-tool',
    status: 'pending',
    submitted_at: new Date().toISOString(),
    approved_at: null,
  };
  let count = 2;
  const adminPage = loadTypeScript('app/admin/page.tsx', {
    '@/lib/admin-auth': { isAdminAuthenticated: async () => true },
    '@/lib/admin-supabase': {
      adminGetAllTools: async () => [fixture],
      adminGetSubmissionSourceCounts: async () => new Map([['tool-id', count]]),
      adminGetClickStats: async () => ({
        totalClicks: 0,
        clicksToday: 0,
        clicksLast7d: 0,
        topTools: [],
      }),
    },
    './actions': Object.fromEntries(
      [
        'loginAction',
        'logoutAction',
        'approveAction',
        'rejectAction',
        'pendingAction',
        'deleteAction',
        'submitSitemapToIndexNow',
      ].map((key) => [key, () => {}]),
    ),
  }).default;
  const render = async () =>
    renderToStaticMarkup(await adminPage({ searchParams: Promise.resolve({}) }));
  assert.equal((await render()).includes('submissions from same source in 24h'), false);
  count = 3;
  const html = await render();
  assert.ok(html.includes('3 submissions from same source in 24h'));
  assert.ok(html.includes('does not necessarily indicate spam'));
  assert.equal(html.includes('fingerprint'), false);
});

test('Cloudflare visitor IP is trusted only behind a verified proxy, preventing shared-proxy quotas and header spoofing', () => {
  const direct = request(valid, { 'cf-connecting-ip': '203.0.113.9' });
  assert.equal(turnstile.getClientIp(direct), '192.0.2.1');
  const proxy = request(valid, {
    'x-vercel-forwarded-for': '104.16.10.1',
    'cf-connecting-ip': '203.0.113.9',
  });
  assert.equal(turnstile.getClientIp(proxy), '203.0.113.9');
  assert.equal(
    turnstile.getClientIp(request(valid, { 'x-vercel-forwarded-for': '104.16.10.1' })),
    undefined,
  );
  assert.equal(
    turnstile.getClientIp(
      request(valid, {
        'x-vercel-forwarded-for': '2606:4700::1',
        'cf-connecting-ip': '2001:db8::5',
      }),
    ),
    '2001:db8::5',
  );
  assert.notEqual(abuse.submissionFingerprint(proxy), abuse.submissionFingerprint(direct));
  assert.notEqual(
    abuse.submissionFingerprint(proxy),
    abuse.submissionFingerprint(
      request(valid, {
        'x-vercel-forwarded-for': '104.16.10.1',
        'cf-connecting-ip': '203.0.113.10',
      }),
    ),
  );
});

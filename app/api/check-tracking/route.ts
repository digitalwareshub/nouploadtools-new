import { NextRequest, NextResponse } from 'next/server';
import { promises as dns } from 'dns';
import { isIPv4, isIPv6 } from 'net';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { verifyTurnstileToken } from '@/lib/turnstile';

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const ratelimit =
  redisUrl && redisToken
    ? new Ratelimit({
        redis: new Redis({ url: redisUrl, token: redisToken }),
        limiter: Ratelimit.slidingWindow(10, '1 m'),
        prefix: 'tracking-checker',
      })
    : null;

const TRACKER_PATTERNS: Record<string, string[]> = {
  Analytics: [
    'google-analytics.com',
    'googletagmanager.com',
    'plausible.io',
    'fathom',
    'posthog',
    'segment.com',
    'mixpanel.com',
    'amplitude.com',
    'fullstory.com',
    'clarity.ms',
    'hotjar.com',
  ],
  Advertising: [
    'googlesyndication.com',
    'doubleclick.net',
    'adsystem',
    'adservice',
    'taboola',
    'outbrain',
  ],
  'Social / tracking': ['facebook.net', 'connect.facebook.net', 'tiktok.com'],
  'Support widgets': ['intercom', 'crisp.chat'],
};

function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((n) => isNaN(n) || n < 0 || n > 255)) return true;
  const [a, b, c] = parts;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    (a === 100 && b >= 64 && b <= 127) ||
    a >= 224
  );
}

function isPrivateIPv6(ip: string): boolean {
  const addr = ip.toLowerCase().replace(/^\[/, '').replace(/\]$/, '');
  return (
    addr === '::1' ||
    addr.startsWith('fc') ||
    addr.startsWith('fd') ||
    addr.startsWith('fe8') ||
    addr.startsWith('fe9') ||
    addr.startsWith('fea') ||
    addr.startsWith('feb') ||
    addr === '::'
  );
}

async function isPrivateHost(hostname: string): Promise<boolean> {
  if (!hostname.includes('.') && !hostname.startsWith('[')) return true;

  if (isIPv4(hostname)) return isPrivateIPv4(hostname);
  const v6 = hostname.replace(/^\[/, '').replace(/\]$/, '');
  if (isIPv6(v6)) return isPrivateIPv6(v6);

  try {
    const [v4addrs, v6addrs] = await Promise.all([
      dns.resolve4(hostname).catch(() => [] as string[]),
      dns.resolve6(hostname).catch(() => [] as string[]),
    ]);
    const all = [...v4addrs, ...v6addrs];
    if (all.length === 0) return true;
    return all.some((ip) => (isIPv4(ip) ? isPrivateIPv4(ip) : isPrivateIPv6(ip)));
  } catch {
    return true;
  }
}

async function isSafeUrl(raw: string): Promise<{ ok: boolean; reason?: string }> {
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return { ok: false, reason: 'Invalid URL.' };
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return { ok: false, reason: 'Only http and https URLs are allowed.' };
  }

  const hostname = parsed.hostname;

  if (/^[0-9]+$/.test(hostname)) {
    return { ok: false, reason: 'Private or reserved addresses are not allowed.' };
  }

  if (await isPrivateHost(hostname)) {
    return { ok: false, reason: 'Private or reserved addresses are not allowed.' };
  }

  return { ok: true };
}

function detectTrackers(html: string): Record<string, string[]> {
  const found: Record<string, string[]> = {};
  for (const [category, patterns] of Object.entries(TRACKER_PATTERNS)) {
    const hits = patterns.filter((p) => html.toLowerCase().includes(p));
    if (hits.length > 0) found[category] = hits;
  }
  return found;
}

function extractThirdPartyDomains(html: string, ownHost: string): string[] {
  const srcRe = /(?:src|href)=["']https?:\/\/([^/"']+)/gi;
  const domains = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = srcRe.exec(html)) !== null) {
    const d = m[1].replace('www.', '');
    if (d && !d.includes(ownHost.replace('www.', ''))) domains.add(d);
  }
  return [...domains].slice(0, 30);
}

function basicScanScore(trackers: Record<string, string[]>): number {
  const count = Object.values(trackers).flat().length;
  if (count === 0) return 100;
  if (count <= 1) return 75;
  if (count <= 3) return 50;
  if (count <= 6) return 25;
  return 0;
}

const MAX_REDIRECTS = 3;
const MAX_BYTES = 500_000;
const TIMEOUT_MS = 10_000;

async function safeFetch(startUrl: string): Promise<{ html: string; finalUrl: string }> {
  let currentUrl = startUrl;

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const safety = await isSafeUrl(currentUrl);
    if (!safety.ok) throw new Error(safety.reason ?? 'Blocked URL');

    const res = await fetch(currentUrl, {
      headers: {
        'User-Agent':
          'NoUploadTools-TrackingChecker/1.0 (+https://nouploadtools.com/tracking-checker)',
        Accept: 'text/html',
      },
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      if (!location) throw new Error('Redirect with no Location header');
      currentUrl = new URL(location, currentUrl).toString();
      continue;
    }

    const ct = res.headers.get('content-type') ?? '';
    if (!ct.includes('text/html')) {
      throw new Error('URL did not return an HTML page');
    }

    const raw = await res.text();
    return { html: raw.slice(0, MAX_BYTES), finalUrl: res.url || currentUrl };
  }

  throw new Error('Too many redirects');
}

export async function POST(req: NextRequest) {
  if (ratelimit) {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'anonymous';
    try {
      const { success, limit, remaining, reset } = await ratelimit.limit(ip);
      if (!success) {
        return NextResponse.json(
          { error: 'Too many scans. Please wait a minute and try again.' },
          {
            status: 429,
            headers: {
              'X-RateLimit-Limit': String(limit),
              'X-RateLimit-Remaining': String(remaining),
              'X-RateLimit-Reset': String(reset),
            },
          },
        );
      }
    } catch {
      console.warn('[rate-limit] Upstash unavailable, skipping rate limit check');
    }
  }

  const body = await req.json().catch(() => ({}));
  const url: string = typeof body.url === 'string' ? body.url.trim() : '';

  if (!url) return NextResponse.json({ error: 'URL is required.' }, { status: 400 });

  const safety = await isSafeUrl(url);
  if (!safety.ok) return NextResponse.json({ error: safety.reason }, { status: 400 });

  const turnstile = await verifyTurnstileToken(body.turnstile_token, req, 'tracking-checker');
  if (!turnstile.success) {
    return NextResponse.json(
      {
        error: turnstile.temporaryFailure
          ? 'Security verification is temporarily unavailable. Please try again.'
          : 'Please complete the security check and try again.',
      },
      { status: turnstile.temporaryFailure ? 503 : 403 },
    );
  }

  let html: string;
  let finalUrl: string;
  try {
    ({ html, finalUrl } = await safeFetch(url));
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    const isBlocked =
      msg.includes('Blocked') || msg.includes('not allowed') || msg.includes('Too many redirects');
    return NextResponse.json(
      {
        error: isBlocked
          ? msg
          : 'Could not fetch the page. It may be offline, blocking bots, or returned a non-HTML response.',
      },
      { status: isBlocked ? 400 : 502 },
    );
  }

  const ownHost = new URL(finalUrl).hostname;
  const trackers = detectTrackers(html);
  const thirdParty = extractThirdPartyDomains(html, ownHost);
  const score = basicScanScore(trackers);
  const totalTrackers = Object.values(trackers).flat().length;

  return NextResponse.json({
    url: finalUrl,
    score,
    totalTrackers,
    trackers,
    thirdPartyDomains: thirdParty,
    summary:
      totalTrackers === 0
        ? 'No common tracking scripts were found in the initial HTML scan.'
        : `Found ${totalTrackers} common tracking pattern${totalTrackers !== 1 ? 's' : ''} in the initial HTML scan.`,
    disclaimer:
      'This checker performs a basic scan of the page HTML for common analytics, ad, and tracking scripts. It may not detect trackers loaded later by JavaScript, after user interaction, or through server-side tracking. NoUploadTools does not store submitted URLs or scan results. Hosting providers may retain standard request logs.',
  });
}

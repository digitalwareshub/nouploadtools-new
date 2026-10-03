import { BlockList, isIP } from 'node:net';

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

// Cloudflare's published proxy ranges, checked 2026-10-03:
// https://www.cloudflare.com/ips-v4/ and https://www.cloudflare.com/ips-v6/
const cloudflareProxies = new BlockList();
for (const range of [
  '173.245.48.0/20',
  '103.21.244.0/22',
  '103.22.200.0/22',
  '103.31.4.0/22',
  '141.101.64.0/18',
  '108.162.192.0/18',
  '190.93.240.0/20',
  '188.114.96.0/20',
  '197.234.240.0/22',
  '198.41.128.0/17',
  '162.158.0.0/15',
  '104.16.0.0/13',
  '104.24.0.0/14',
  '172.64.0.0/13',
  '131.0.72.0/22',
  '2400:cb00::/32',
  '2606:4700::/32',
  '2803:f800::/32',
  '2405:b500::/32',
  '2405:8100::/32',
  '2a06:98c0::/29',
  '2c0f:f248::/32',
]) {
  const [address, prefix] = range.split('/');
  cloudflareProxies.addSubnet(address, Number(prefix), isIP(address) === 6 ? 'ipv6' : 'ipv4');
}

interface TurnstileResponse {
  success: boolean;
  action?: string;
  hostname?: string;
  'error-codes'?: string[];
}

export interface TurnstileVerification {
  success: boolean;
  configured: boolean;
  temporaryFailure?: boolean;
}

export function getClientIp(request: Request): string | undefined {
  const peer =
    request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip')?.trim();
  if (!peer || !isIP(peer)) return undefined;

  // Vercel overwrites its forwarding headers. Trust CF-Connecting-IP only
  // when that trusted peer is Cloudflare, never on direct Vercel requests.
  if (cloudflareProxies.check(peer, isIP(peer) === 6 ? 'ipv6' : 'ipv4')) {
    const visitor = request.headers.get('cf-connecting-ip')?.trim();
    return visitor && isIP(visitor) ? visitor : undefined;
  }
  return peer;
}

export async function verifyTurnstileToken(
  token: unknown,
  request: Request,
  expectedAction?: string,
): Promise<TurnstileVerification> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();

  // Fail closed in production: a missing secret must never silently disable bot protection.
  if (!secret) {
    console.error('[turnstile] TURNSTILE_SECRET_KEY is not configured');
    return { success: false, configured: false, temporaryFailure: true };
  }

  if (typeof token !== 'string' || !token.trim() || token.length > 2048) {
    return { success: false, configured: true };
  }

  const form = new FormData();
  form.set('secret', secret);
  form.set('response', token.trim());

  const remoteIp = getClientIp(request);
  if (remoteIp) form.set('remoteip', remoteIp);

  let response: Response;
  try {
    response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      body: form,
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    console.error('[turnstile] Siteverify request failed');
    return { success: false, configured: true, temporaryFailure: true };
  }

  if (!response.ok) {
    console.error('[turnstile] Siteverify returned', response.status);
    return { success: false, configured: true, temporaryFailure: true };
  }

  const result = (await response.json().catch(() => null)) as TurnstileResponse | null;

  if (result?.success !== true) {
    console.warn('[turnstile] Verification rejected', result?.['error-codes'] ?? []);
    return { success: false, configured: true };
  }

  if (expectedAction && result.action !== expectedAction) {
    console.warn('[turnstile] Action mismatch', {
      expected: expectedAction,
      received: result.action,
    });
    return { success: false, configured: true };
  }

  const allowedHostnames = (
    process.env.TURNSTILE_ALLOWED_HOSTNAMES ??
    'nouploadtools.com,www.nouploadtools.com,nouploadtools-new.vercel.app'
  )
    .split(',')
    .map((hostname) => hostname.trim().toLowerCase())
    .filter(Boolean);
  if (
    typeof result.hostname !== 'string' ||
    !allowedHostnames.includes(result.hostname.toLowerCase())
  ) {
    console.warn('[turnstile] Hostname mismatch');
    return { success: false, configured: true };
  }

  return { success: true, configured: true };
}

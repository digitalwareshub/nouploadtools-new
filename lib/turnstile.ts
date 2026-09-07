const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

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
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    undefined
  );
}

export async function verifyTurnstileToken(
  token: unknown,
  request: Request,
  expectedAction?: string,
): Promise<TurnstileVerification> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();

  // Safe rollout: protection becomes active when the production secret is configured.
  // This keeps previews/local development functional before Cloudflare credentials are added.
  if (!secret) {
    return { success: true, configured: false };
  }

  if (typeof token !== 'string' || !token.trim()) {
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
      signal: AbortSignal.timeout(5000),
    });
  } catch (error) {
    console.error('[turnstile] Siteverify request failed', error);
    return { success: false, configured: true, temporaryFailure: true };
  }

  if (!response.ok) {
    console.error('[turnstile] Siteverify returned', response.status);
    return { success: false, configured: true, temporaryFailure: true };
  }

  const result = (await response.json().catch(() => null)) as TurnstileResponse | null;
  if (!result?.success) {
    console.warn('[turnstile] Verification rejected', result?.['error-codes'] ?? []);
    return { success: false, configured: true };
  }

  if (expectedAction && result.action && result.action !== expectedAction) {
    console.warn('[turnstile] Action mismatch', {
      expected: expectedAction,
      received: result.action,
    });
    return { success: false, configured: true };
  }

  return { success: true, configured: true };
}

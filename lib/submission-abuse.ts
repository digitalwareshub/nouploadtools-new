import { createHmac, randomUUID } from 'node:crypto';
import { isIP } from 'node:net';
import { Redis } from '@upstash/redis';
import { getClientIp } from './turnstile';

// One atomic rolling-window check: rejected requests do not consume either quota.
export const SUBMISSION_RATE_LIMIT_SCRIPT = `
local now = tonumber(ARGV[1])
local hour = 3600000
local day = 86400000
redis.call('ZREMRANGEBYSCORE', KEYS[1], '-inf', now - day)
local hourly = redis.call('ZCOUNT', KEYS[1], '(' .. (now - hour), '+inf')
local daily = redis.call('ZCARD', KEYS[1])
local retry = 0
if hourly >= 5 then
  local oldest = redis.call('ZRANGEBYSCORE', KEYS[1], '(' .. (now - hour), '+inf', 'WITHSCORES', 'LIMIT', 0, 1)
  retry = tonumber(oldest[2]) + hour - now
end
if daily >= 10 then
  local oldest = redis.call('ZRANGE', KEYS[1], 0, 0, 'WITHSCORES')
  retry = math.max(retry, tonumber(oldest[2]) + day - now)
end
if retry > 0 then return {0, math.max(1, math.ceil(retry / 1000))} end
redis.call('ZADD', KEYS[1], now, ARGV[2])
redis.call('PEXPIRE', KEYS[1], day)
return {1, 0}
`;

export function submissionFingerprint(request: Request): string {
  const secret = process.env.SUBMISSION_FINGERPRINT_SECRET?.trim();
  const ip = getClientIp(request);
  if (!secret || secret.length < 32) throw new Error('Submission fingerprint secret unavailable');
  if (!ip || !isIP(ip)) throw new Error('Submission source unavailable');

  // Canonicalize equivalent IPv6 spellings, including IPv4-mapped IPv6 addresses.
  const normalized = isIP(ip) === 6 ? new URL(`http://[${ip}]`).hostname : ip;
  return createHmac('sha256', secret).update(`submit-tool:v1:${normalized}`).digest('hex');
}

export async function consumeSubmissionQuota(
  fingerprint: string,
): Promise<{ allowed: boolean; retryAfter: number }> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error('Submission rate limiter unavailable');

  const redis = new Redis({ url, token, retry: false, signal: AbortSignal.timeout(5000) });
  const result = await redis.eval<[number, string], [number, number]>(
    SUBMISSION_RATE_LIMIT_SCRIPT,
    [`submit-tool:v1:${fingerprint}`],
    [Date.now(), randomUUID()],
  );
  if (!Array.isArray(result) || ![0, 1].includes(result[0])) {
    throw new Error('Invalid submission rate-limit response');
  }
  return { allowed: result[0] === 1, retryAfter: result[1] };
}

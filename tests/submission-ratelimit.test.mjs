import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { after, before, test } from 'node:test';
import { loadTypeScript } from './load-typescript.mjs';

const { SUBMISSION_RATE_LIMIT_SCRIPT: script } = loadTypeScript('lib/submission-abuse.ts', {
  './turnstile': {},
});
// macOS Unix socket paths must fit within 104 bytes.
const directory = mkdtempSync('/tmp/nut-redis-');
const socket = join(directory, 'redis.sock');
const base = 1791030000000;
let sequence = 0;
function command(...args) {
  return JSON.parse(
    execFileSync('redis-cli', ['--json', '-s', socket, ...args.map(String)], { encoding: 'utf8' }),
  );
}
function consume(key, now) {
  return command('EVAL', script, 1, key, now, `attempt-${sequence++}`);
}
before(async () => {
  execFileSync('redis-server', [
    '--port',
    '0',
    '--unixsocket',
    socket,
    '--save',
    '',
    '--appendonly',
    'no',
    '--daemonize',
    'yes',
    '--pidfile',
    join(directory, 'redis.pid'),
    '--logfile',
    join(directory, 'redis.log'),
  ]);
  for (let i = 0; i < 100 && !existsSync(socket); i++) {
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  assert.equal(command('PING'), 'PONG');
});
after(() => {
  try {
    command('SHUTDOWN', 'NOSAVE');
  } catch {
    /* Redis closes before returning a reply. */
  }
  rmSync(directory, { recursive: true, force: true });
});

test('5/hour is enforced atomically, rejection does not consume quota, boundary expires', () => {
  for (let i = 0; i < 5; i++) assert.deepEqual(consume('hour', base), [1, 0]);
  assert.deepEqual(consume('hour', base), [0, 3600]);
  assert.deepEqual(consume('hour', base + 1000), [0, 3599]);
  assert.equal(command('ZCARD', 'hour'), 5);
  assert.deepEqual(consume('hour', base + 3600000), [1, 0]);
  assert.deepEqual(consume('another-source', base), [1, 0]);
});

test('10/day survives hourly reset and expires at the rolling 24h boundary', () => {
  for (let i = 0; i < 5; i++) assert.deepEqual(consume('day', base), [1, 0]);
  for (let i = 0; i < 5; i++) assert.deepEqual(consume('day', base + 3600000), [1, 0]);
  assert.deepEqual(consume('day', base + 7200000), [0, 79200]);
  assert.equal(command('ZCARD', 'day'), 10);
  assert.deepEqual(consume('day', base + 86400000), [1, 0]);
  assert.ok(command('PTTL', 'day') > 86390000);
});

test('concurrent requests admit at most five attempts from one source', async () => {
  const { execFile } = await import('node:child_process');
  const { promisify } = await import('node:util');
  const run = promisify(execFile);
  const results = await Promise.all(
    Array.from({ length: 20 }, (_, i) =>
      run('redis-cli', [
        '--json',
        '-s',
        socket,
        'EVAL',
        script,
        '1',
        'concurrent',
        String(base),
        `parallel-${i}`,
      ]),
    ),
  );
  assert.equal(results.filter((r) => JSON.parse(r.stdout)[0] === 1).length, 5);
  assert.equal(command('ZCARD', 'concurrent'), 5);
});

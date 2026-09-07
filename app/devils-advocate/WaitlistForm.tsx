'use client';

import { FormEvent, useId, useState } from 'react';
import TurnstileWidget, { isTurnstileEnabledInBrowser } from '@/components/TurnstileWidget';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function WaitlistForm() {
  const [state, setState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');
  const [turnstileReset, setTurnstileReset] = useState(0);
  const instanceId = useId().replace(/:/g, '');
  const emailId = `devils-advocate-email-${instanceId}`;
  const websiteId = `devils-advocate-website-${instanceId}`;
  const companyId = `devils-advocate-company-${instanceId}`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    const form = event.currentTarget;
    const data = new FormData(form);
    const turnstileToken = (data.get('turnstile_token') as string | null)?.trim() || '';

    if (isTurnstileEnabledInBrowser() && !turnstileToken) {
      setState('error');
      setMessage('Security verification is still completing. Please try again in a moment.');
      return;
    }

    setState('submitting');

    try {
      const response = await fetch('/api/devils-advocate-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          website_url: data.get('website_url'),
          paid_interest: data.get('paid_interest') === 'on',
          company: data.get('company'),
          turnstile_token: turnstileToken,
        }),
      });

      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || 'Could not join the waitlist. Please try again.');
      }

      setState('success');
      setMessage("You're on the list. We'll email you when Devil's Advocate opens.");
      form.reset();
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setTurnstileReset((value) => value + 1);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: 20,
        border: '1px solid var(--border)',
        borderRadius: 12,
        background: 'var(--bg-card)',
        boxShadow: '0 18px 50px rgba(26, 27, 38, 0.08)',
      }}
    >
      <div>
        <label
          htmlFor={emailId}
          style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6 }}
        >
          Email address
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="you@startup.com"
          style={{
            width: '100%',
            minHeight: 44,
            padding: '10px 12px',
            border: '1px solid var(--border)',
            borderRadius: 8,
            background: '#fff',
            color: 'var(--text)',
            font: 'inherit',
            fontSize: 14,
            outlineColor: 'var(--accent)',
          }}
        />
      </div>

      <div>
        <label
          htmlFor={websiteId}
          style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6 }}
        >
          Your website <span style={{ color: 'var(--text-3)', fontWeight: 500 }}>(optional)</span>
        </label>
        <input
          id={websiteId}
          name="website_url"
          type="text"
          inputMode="url"
          autoComplete="url"
          maxLength={500}
          placeholder="yourstartup.com"
          style={{
            width: '100%',
            minHeight: 44,
            padding: '10px 12px',
            border: '1px solid var(--border)',
            borderRadius: 8,
            background: '#fff',
            color: 'var(--text)',
            font: 'inherit',
            fontSize: 14,
            outlineColor: 'var(--accent)',
          }}
        />
      </div>

      <label
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 9,
          fontSize: 12,
          color: 'var(--text-2)',
          lineHeight: 1.5,
          cursor: 'pointer',
        }}
      >
        <input
          type="checkbox"
          name="paid_interest"
          style={{ marginTop: 2, width: 15, height: 15, accentColor: 'var(--accent)' }}
        />
        I&apos;d also like to know when the deeper paid business investigation is available.
      </label>

      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1 }}>
        <label htmlFor={companyId}>Company</label>
        <input id={companyId} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <TurnstileWidget action="devils-advocate" resetKey={turnstileReset} />

      <button
        type="submit"
        disabled={state === 'submitting'}
        style={{
          minHeight: 46,
          border: 0,
          borderRadius: 8,
          background: state === 'submitting' ? 'var(--accent-dk)' : 'var(--accent)',
          color: '#fff',
          font: 'inherit',
          fontSize: 14,
          fontWeight: 700,
          cursor: state === 'submitting' ? 'wait' : 'pointer',
          opacity: state === 'submitting' ? 0.8 : 1,
        }}
      >
        {state === 'submitting' ? 'Joining…' : 'Join the waitlist →'}
      </button>

      <p style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.5, textAlign: 'center' }}>
        No spam. We&apos;ll only use your email for Devil&apos;s Advocate launch updates.
      </p>

      {message ? (
        <p
          role="status"
          style={{
            fontSize: 12,
            lineHeight: 1.5,
            padding: '9px 10px',
            borderRadius: 7,
            border: `1px solid ${state === 'success' ? 'var(--green-br)' : 'var(--red-br)'}`,
            background: state === 'success' ? 'var(--green-bg)' : 'var(--red-bg)',
            color: state === 'success' ? 'var(--green)' : 'var(--red)',
          }}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

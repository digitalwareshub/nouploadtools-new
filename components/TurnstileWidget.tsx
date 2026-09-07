'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef } from 'react';

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? '';
const TOKEN_WAIT_TIMEOUT_MS = 5000;
const TOKEN_POLL_INTERVAL_MS = 100;

type TurnstileOptions = {
  sitekey: string;
  theme?: 'auto' | 'light' | 'dark';
  appearance?: 'always' | 'execute' | 'interaction-only';
  action?: string;
  callback?: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: (errorCode?: string) => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileOptions) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function isTurnstileEnabledInBrowser(): boolean {
  return Boolean(SITE_KEY);
}

export default function TurnstileWidget({
  action,
  resetKey = 0,
}: {
  action: string;
  resetKey?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const setToken = useCallback((value: string) => {
    if (inputRef.current) inputRef.current.value = value;
  }, []);

  const renderWidget = useCallback(() => {
    if (!SITE_KEY || !containerRef.current || !window.turnstile || widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      theme: 'auto',
      appearance: 'interaction-only',
      action,
      callback: (value) => setToken(value),
      'expired-callback': () => setToken(''),
      'error-callback': (errorCode) => {
        setToken('');
        if (errorCode) console.warn('[turnstile] Client verification error', errorCode);
      },
    });
  }, [action, setToken]);

  useEffect(() => {
    renderWidget();
  }, [renderWidget]);

  // A user can submit before Turnstile's async callback has populated the token.
  // Hold the native submit briefly, then replay it once the token is ready.
  // If verification still has not completed after the timeout, let the form's
  // existing React handler surface its normal security-verification message.
  useEffect(() => {
    if (!SITE_KEY || !containerRef.current) return;

    const form = containerRef.current.closest('form');
    if (!form) return;

    let waiting = false;
    let bypassNextSubmit = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const continueSubmit = () => {
      waiting = false;
      bypassNextSubmit = true;
      form.requestSubmit();
    };

    const handleSubmit = (event: SubmitEvent) => {
      if (bypassNextSubmit) {
        bypassNextSubmit = false;
        return;
      }

      if (inputRef.current?.value.trim()) return;

      event.preventDefault();
      event.stopPropagation();

      if (waiting) return;
      waiting = true;
      const startedAt = performance.now();

      const pollForToken = () => {
        if (inputRef.current?.value.trim()) {
          continueSubmit();
          return;
        }

        if (performance.now() - startedAt >= TOKEN_WAIT_TIMEOUT_MS) {
          continueSubmit();
          return;
        }

        timer = setTimeout(pollForToken, TOKEN_POLL_INTERVAL_MS);
      };

      pollForToken();
    };

    form.addEventListener('submit', handleSubmit, true);

    return () => {
      form.removeEventListener('submit', handleSubmit, true);
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!resetKey || !widgetIdRef.current || !window.turnstile) return;
    setToken('');
    window.turnstile.reset(widgetIdRef.current);
  }, [resetKey, setToken]);

  useEffect(
    () => () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    },
    [],
  );

  if (!SITE_KEY) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
      <div ref={containerRef} style={{ width: '100%' }} />
      <input ref={inputRef} type="hidden" name="turnstile_token" defaultValue="" />
    </>
  );
}

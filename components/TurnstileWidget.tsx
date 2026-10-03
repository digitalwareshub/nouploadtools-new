'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? '';

type TurnstileOptions = {
  sitekey: string;
  theme?: 'auto' | 'light' | 'dark';
  appearance?: 'always' | 'execute' | 'interaction-only';
  action?: string;
  retry?: 'auto' | 'never';
  'retry-interval'?: number;
  'refresh-expired'?: 'auto' | 'manual' | 'never';
  'refresh-timeout'?: 'auto' | 'manual' | 'never';
  'response-field'?: boolean;
  callback?: (token: string) => void;
  'expired-callback'?: () => void;
  'timeout-callback'?: () => void;
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
  onTokenChange,
}: {
  action: string;
  resetKey?: number;
  onTokenChange: (token: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const [verificationError, setVerificationError] = useState(false);
  const readyRef = useRef(false);

  const showError = useCallback(() => {
    onTokenChangeRef.current('');
    setVerificationError(true);
  }, []);

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  const renderWidget = useCallback(() => {
    if (!SITE_KEY || !containerRef.current || !window.turnstile || widgetIdRef.current) return;

    readyRef.current = true;
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      theme: 'auto',
      appearance: 'interaction-only',
      action,
      retry: 'auto',
      'retry-interval': 8000,
      'refresh-expired': 'auto',
      'refresh-timeout': 'auto',
      'response-field': false,
      callback: (token) => {
        setVerificationError(false);
        onTokenChangeRef.current(token);
      },
      'expired-callback': () => onTokenChangeRef.current(''),
      'timeout-callback': showError,
      'error-callback': (errorCode) => {
        showError();
        if (errorCode) console.warn('[turnstile] Client verification error', errorCode);
      },
    });
  }, [action, showError]);

  useEffect(() => {
    if (!SITE_KEY) return;
    const timer = window.setTimeout(() => {
      if (!readyRef.current) showError();
    }, 15000);
    return () => window.clearTimeout(timer);
  }, [showError]);

  useEffect(() => {
    renderWidget();
  }, [renderWidget]);

  useEffect(() => {
    if (!resetKey || !widgetIdRef.current || !window.turnstile) return;
    onTokenChangeRef.current('');
    window.turnstile.reset(widgetIdRef.current);
  }, [resetKey]);

  useEffect(
    () => () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    },
    [],
  );

  if (!SITE_KEY) {
    return (
      <p style={{ fontSize: 12, color: 'var(--red)', margin: 0 }}>
        Security verification is temporarily unavailable.
      </p>
    );
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
        onError={showError}
      />
      <div ref={containerRef} style={{ width: '100%', minHeight: 1 }} />
      {verificationError && (
        <div role="alert" style={{ fontSize: 12, color: 'var(--red)' }}>
          Security verification could not load or complete. Please retry.
          <button
            type="button"
            onClick={() => {
              if (widgetIdRef.current && window.turnstile) {
                setVerificationError(false);
                window.turnstile.reset(widgetIdRef.current);
              } else {
                window.location.reload();
              }
            }}
            style={{ marginLeft: 8, cursor: 'pointer' }}
          >
            Retry verification
          </button>
        </div>
      )}
    </>
  );
}

'use client';

import { useEffect } from 'react';

function withHttps(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export default function NormalizeUrlInputs({ names }: { names: string[] }) {
  useEffect(() => {
    const selector = names.map((name) => `input[name="${name}"]`).join(',');
    if (!selector) return;

    const normalize = (target: EventTarget | null) => {
      if (!(target instanceof HTMLInputElement) || !target.matches(selector)) return;
      const normalized = withHttps(target.value);
      if (normalized !== target.value) target.value = normalized;
    };

    const onFocusOut = (event: FocusEvent) => normalize(event.target);
    const onSubmit = (event: SubmitEvent) => {
      if (!(event.target instanceof HTMLFormElement)) return;
      event.target.querySelectorAll<HTMLInputElement>(selector).forEach((input) => {
        input.value = withHttps(input.value);
      });
    };

    document.addEventListener('focusout', onFocusOut);
    document.addEventListener('submit', onSubmit, true);

    return () => {
      document.removeEventListener('focusout', onFocusOut);
      document.removeEventListener('submit', onSubmit, true);
    };
  }, [names]);

  return null;
}

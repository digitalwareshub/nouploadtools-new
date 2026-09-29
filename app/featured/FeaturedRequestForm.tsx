'use client';

import { FormEvent, useMemo, useState } from 'react';

type ApprovedTool = {
  id: string;
  name: string;
  url: string;
};

type FormState = 'idle' | 'submitting' | 'success' | 'error';

function field(style?: React.CSSProperties): React.CSSProperties {
  return {
    width: '100%',
    padding: '9px 12px',
    fontSize: 13,
    fontFamily: 'Inter, sans-serif',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    background: 'var(--bg-card)',
    color: 'var(--text)',
    outline: 'none',
    ...style,
  };
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function FeaturedRequestForm({ tools }: { tools: ApprovedTool[] }) {
  const sortedTools = useMemo(
    () => [...tools].sort((a, b) => a.name.localeCompare(b.name)),
    [tools],
  );
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [state, setState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Record<string, boolean> = {};

    const toolId = String(data.get('tool_id') || '').trim();
    const applicant = String(data.get('applicant') || '').trim();
    const email = String(data.get('email') || '').trim();
    const role = String(data.get('role') || '').trim();
    const timing = String(data.get('timing') || '').trim();
    const reason = String(data.get('reason') || '').trim();
    const ownership = data.get('ownership') === 'on';

    if (!toolId || !sortedTools.some((tool) => tool.id === toolId)) nextErrors.tool = true;
    if (!applicant) nextErrors.applicant = true;
    if (!validEmail(email)) nextErrors.email = true;
    if (!role) nextErrors.role = true;
    if (!timing) nextErrors.timing = true;
    if (!reason) nextErrors.reason = true;
    if (!ownership) nextErrors.ownership = true;

    setErrors(nextErrors);
    setMessage('');

    if (Object.keys(nextErrors).length > 0) {
      setState('error');
      setMessage('Please fix the highlighted fields before submitting.');
      return;
    }

    setState('submitting');

    try {
      const response = await fetch('/api/featured-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool_id: toolId,
          applicant_name: applicant,
          applicant_email: email,
          role,
          preferred_timing: timing,
          reason,
          message: String(data.get('message') || '').trim(),
          ownership_confirmed: ownership,
          website: String(data.get('website') || '').trim(),
        }),
      });

      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || 'Could not submit your request. Please try again.');
      }

      form.reset();
      setErrors({});
      setState('success');
      setMessage(
        'Request received. We’ll review the tool and contact you at your submitted email if a placement is available.',
      );
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}
      >
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
          Approved tool <span style={{ color: 'var(--red)' }}>*</span>
        </label>
        <select
          name="tool_id"
          defaultValue=""
          disabled={state === 'submitting'}
          style={field({
            borderColor: errors.tool ? 'var(--red)' : undefined,
            cursor: state === 'submitting' ? 'wait' : 'pointer',
          })}
        >
          <option value="">— Select your listed tool —</option>
          {sortedTools.map((tool) => (
            <option key={tool.id} value={tool.id}>
              {tool.name}
            </option>
          ))}
        </select>
        {errors.tool && (
          <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 5 }}>
            Select an approved tool from the directory.
          </p>
        )}
        <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 5, lineHeight: 1.5 }}>
          Not listed yet?{' '}
          <a href="/submit" style={{ color: 'var(--accent)', fontWeight: 600 }}>
            Submit your tool for free first.
          </a>
        </p>
      </div>

      <div className="featured-two-col">
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            Your name <span style={{ color: 'var(--red)' }}>*</span>
          </label>
          <input
            name="applicant"
            type="text"
            maxLength={100}
            disabled={state === 'submitting'}
            autoComplete="name"
            placeholder="Your name"
            style={field({ borderColor: errors.applicant ? 'var(--red)' : undefined })}
          />
          {errors.applicant && (
            <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 5 }}>Required.</p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            Work email <span style={{ color: 'var(--red)' }}>*</span>
          </label>
          <input
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            disabled={state === 'submitting'}
            placeholder="you@yourtool.com"
            style={field({ borderColor: errors.email ? 'var(--red)' : undefined })}
          />
          {errors.email && (
            <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 5 }}>
              Enter a valid email address.
            </p>
          )}
        </div>
      </div>

      <div className="featured-two-col">
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            Your role <span style={{ color: 'var(--red)' }}>*</span>
          </label>
          <select
            name="role"
            defaultValue=""
            disabled={state === 'submitting'}
            style={field({
              borderColor: errors.role ? 'var(--red)' : undefined,
              cursor: state === 'submitting' ? 'wait' : 'pointer',
            })}
          >
            <option value="">— Select —</option>
            <option value="owner_founder">Owner / founder</option>
            <option value="employee_team_member">Employee / team member</option>
            <option value="agency_representative">Agency / representative</option>
            <option value="other">Other</option>
          </select>
          {errors.role && (
            <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 5 }}>Required.</p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            Preferred timing <span style={{ color: 'var(--red)' }}>*</span>
          </label>
          <select
            name="timing"
            defaultValue=""
            disabled={state === 'submitting'}
            style={field({
              borderColor: errors.timing ? 'var(--red)' : undefined,
              cursor: state === 'submitting' ? 'wait' : 'pointer',
            })}
          >
            <option value="">— Select —</option>
            <option value="asap">As soon as a slot is available</option>
            <option value="next_month">Within the next month</option>
            <option value="exploring">Later / just exploring</option>
          </select>
          {errors.timing && (
            <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 5 }}>Required.</p>
          )}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
          Why should NoUploadTools visitors care about this tool?{' '}
          <span style={{ color: 'var(--red)' }}>*</span>
        </label>
        <textarea
          name="reason"
          rows={3}
          maxLength={220}
          disabled={state === 'submitting'}
          placeholder="One concise reason your tool is useful to this audience."
          style={field({
            resize: 'vertical',
            borderColor: errors.reason ? 'var(--red)' : undefined,
          })}
        />
        {errors.reason && (
          <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 5 }}>Required.</p>
        )}
      </div>

      <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
          Anything else?{' '}
          <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--text-3)' }}>Optional</span>
        </label>
        <textarea
          name="message"
          rows={3}
          maxLength={500}
          disabled={state === 'submitting'}
          placeholder="Anything we should know before reviewing the request."
          style={field({ resize: 'vertical' })}
        />
      </div>

      <label
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          border: `1px solid ${errors.ownership ? 'var(--red)' : 'var(--border)'}`,
          borderRadius: 'var(--radius)',
          background: 'var(--bg-card)',
          padding: '12px 13px',
          marginBottom: 18,
          cursor: state === 'submitting' ? 'wait' : 'pointer',
        }}
      >
        <input
          type="checkbox"
          name="ownership"
          disabled={state === 'submitting'}
          style={{ marginTop: 3, accentColor: 'var(--accent)', cursor: 'pointer' }}
        />
        <span style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.55 }}>
          I confirm that I own this tool or officially represent the organisation responsible for
          it. I understand that sponsorship does not affect editorial review, badges, or organic
          ranking.
        </span>
      </label>
      {errors.ownership && (
        <p style={{ fontSize: 12, color: 'var(--red)', marginTop: -10, marginBottom: 14 }}>
          Please confirm that you are authorised to request the placement.
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        style={{
          width: '100%',
          padding: 12,
          background: state === 'submitting' ? 'var(--accent-dk)' : 'var(--accent)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius)',
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 650,
          cursor: state === 'submitting' ? 'wait' : 'pointer',
          opacity: state === 'submitting' ? 0.85 : 1,
        }}
      >
        {state === 'submitting' ? 'Submitting…' : 'Request featured placement →'}
      </button>

      <p
        style={{
          fontSize: 11,
          color: 'var(--text-3)',
          textAlign: 'center',
          marginTop: 10,
          lineHeight: 1.55,
        }}
      >
        No payment details are collected here. Pricing and availability are provided only after
        manual review.
      </p>

      {message && (
        <div
          role="status"
          aria-live="polite"
          style={{
            marginTop: 14,
            padding: '10px 12px',
            border: `1px solid ${state === 'success' ? 'var(--green-br)' : 'var(--red-br)'}`,
            background: state === 'success' ? 'var(--green-bg)' : 'var(--red-bg)',
            color: state === 'success' ? 'var(--green)' : 'var(--red)',
            borderRadius: 'var(--radius)',
            fontSize: 12,
            lineHeight: 1.55,
          }}
        >
          {message}
        </div>
      )}
    </form>
  );
}

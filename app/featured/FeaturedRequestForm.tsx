'use client';

import { useMemo, useState } from 'react';

type ApprovedTool = {
  name: string;
  url: string;
};

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
  const [prepared, setPrepared] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: Record<string, boolean> = {};

    const toolValue = String(data.get('tool') || '').trim();
    const applicant = String(data.get('applicant') || '').trim();
    const email = String(data.get('email') || '').trim();
    const role = String(data.get('role') || '').trim();
    const timing = String(data.get('timing') || '').trim();
    const reason = String(data.get('reason') || '').trim();
    const message = String(data.get('message') || '').trim();
    const ownership = data.get('ownership') === 'on';
    const website = String(data.get('website') || '').trim();

    if (website) return;
    if (!toolValue) nextErrors.tool = true;
    if (!applicant) nextErrors.applicant = true;
    if (!validEmail(email)) nextErrors.email = true;
    if (!role) nextErrors.role = true;
    if (!timing) nextErrors.timing = true;
    if (!reason) nextErrors.reason = true;
    if (!ownership) nextErrors.ownership = true;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setPrepared(false);
      return;
    }

    const selected = sortedTools.find((tool) => `${tool.name} — ${tool.url}` === toolValue);
    const toolName = selected?.name ?? toolValue;

    const body = [
      'Featured placement request',
      '',
      `Tool: ${toolValue}`,
      `Applicant: ${applicant}`,
      `Work email: ${email}`,
      `Role: ${role}`,
      `Preferred timing: ${timing}`,
      '',
      'Why this tool is useful:',
      reason,
      '',
      'Additional note:',
      message || '—',
      '',
      'I confirm that I own or officially represent this tool.',
    ].join('\n');

    const mailto = `mailto:write@digiwares.xyz?subject=${encodeURIComponent(
      `Featured placement request — ${toolName}`,
    )}&body=${encodeURIComponent(body)}`;

    setPrepared(true);
    window.location.href = mailto;
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'none' }} aria-hidden="true">
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
          name="tool"
          defaultValue=""
          style={field({
            borderColor: errors.tool ? 'var(--red)' : undefined,
            cursor: 'pointer',
          })}
        >
          <option value="">— Select your listed tool —</option>
          {sortedTools.map((tool) => (
            <option key={tool.url} value={`${tool.name} — ${tool.url}`}>
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
            maxLength={200}
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
            style={field({
              borderColor: errors.role ? 'var(--red)' : undefined,
              cursor: 'pointer',
            })}
          >
            <option value="">— Select —</option>
            <option value="Owner / founder">Owner / founder</option>
            <option value="Employee / team member">Employee / team member</option>
            <option value="Agency / representative">Agency / representative</option>
            <option value="Other">Other</option>
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
            style={field({
              borderColor: errors.timing ? 'var(--red)' : undefined,
              cursor: 'pointer',
            })}
          >
            <option value="">— Select —</option>
            <option value="As soon as a slot is available">As soon as a slot is available</option>
            <option value="Within the next month">Within the next month</option>
            <option value="Later / just exploring">Later / just exploring</option>
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
          cursor: 'pointer',
        }}
      >
        <input
          type="checkbox"
          name="ownership"
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
        style={{
          width: '100%',
          padding: 12,
          background: 'var(--accent)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius)',
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 650,
          cursor: 'pointer',
        }}
      >
        Prepare featured request email →
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
        This pilot does not collect payment details. Submitting prepares an email to
        write@digiwares.xyz for manual review.
      </p>

      {prepared && (
        <div
          role="status"
          style={{
            marginTop: 14,
            padding: '10px 12px',
            border: '1px solid var(--green-br)',
            background: 'var(--green-bg)',
            color: 'var(--green)',
            borderRadius: 'var(--radius)',
            fontSize: 12,
            lineHeight: 1.55,
          }}
        >
          Your email app should open with the request prepared. Send that email to complete your
          request.
        </div>
      )}
    </form>
  );
}

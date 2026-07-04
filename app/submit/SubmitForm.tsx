'use client';

import { useState, useRef } from 'react';
import { submitTool } from '@/lib/supabase';

const CATEGORIES = [
  { value: 'documents', label: '📄 Documents' },
  { value: 'images', label: '🖼️ Images' },
  { value: 'text-writing', label: '✍️ Text & Writing' },
  { value: 'audio-video', label: '🎵 Audio & Video' },
  { value: 'security-privacy', label: '🔐 Security & Privacy' },
  { value: 'learning', label: '📚 Learning' },
  { value: 'calculators-data', label: '🧮 Data & Calculators' },
  { value: 'developer-tools', label: '💻 Developer Tools' },
];

type CheckboxDef = { name: string; label: string; desc: string };

const CHECKBOXES: CheckboxDef[] = [
  { name: 'is_no_upload', label: 'No upload', desc: 'Files never leave the browser' },
  { name: 'is_open_source', label: 'Open source', desc: 'Public repo anyone can audit' },
  { name: 'is_zero_login', label: 'Zero login', desc: 'No account required' },
  { name: 'is_no_ads', label: 'No ads', desc: 'Clean, distraction-free' },
  { name: 'is_works_offline', label: 'Works offline', desc: 'No internet after load' },
  { name: 'is_mobile_friendly', label: 'Mobile friendly', desc: 'Tested on small screens' },
  { name: 'is_free_forever', label: 'Free forever', desc: 'No freemium bait-and-switch' },
];

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
    WebkitAppearance: 'none',
    ...style,
  };
}

function validUrl(s: string) {
  try {
    return ['http:', 'https:'].includes(new URL(s).protocol);
  } catch {
    return false;
  }
}

function validEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export default function SubmitForm() {
  const [isOss, setIsOss] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successEmail, setSuccessEmail] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const data = new FormData(f);
    const errs: Record<string, boolean> = {};

    const name = (data.get('name') as string).trim();
    const url = (data.get('url') as string).trim();
    const tagline = (data.get('tagline') as string).trim();
    const category = data.get('category') as string;
    const email = (data.get('submitted_by_email') as string).trim();
    const ghUrl = (data.get('github_url') as string | null)?.trim() || '';

    if (!name) errs['name'] = true;
    if (!validUrl(url)) errs['url'] = true;
    if (!tagline || tagline.length > 120) errs['tagline'] = true;
    if (!category) errs['category'] = true;
    if (!validEmail(email)) errs['email'] = true;

    const anyChecked = CHECKBOXES.some((cb) => data.get(cb.name) === 'on');
    if (!anyChecked) errs['features'] = true;
    if (isOss && !validUrl(ghUrl)) errs['github_url'] = true;

    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setError('Please fix the errors above before submitting.');
      return;
    }
    setError('');
    setSubmitting(true);

    const payload = {
      name,
      url,
      tagline,
      category,
      slug: '',
      description: (data.get('description') as string).trim() || null,
      github_url: isOss && ghUrl ? ghUrl : null,
      submitted_by_email: email,
      submitted_by_name: (data.get('submitted_by_name') as string).trim() || null,
      is_no_upload: data.get('is_no_upload') === 'on',
      is_open_source: data.get('is_open_source') === 'on',
      is_zero_login: data.get('is_zero_login') === 'on',
      is_no_ads: data.get('is_no_ads') === 'on',
      is_works_offline: data.get('is_works_offline') === 'on',
      is_mobile_friendly: data.get('is_mobile_friendly') === 'on',
      is_free_forever: data.get('is_free_forever') === 'on',
      status: 'pending',
    };

    const result = await submitTool(payload);
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }
    setSuccessEmail(email);
    setSuccess(true);
  }

  if (success) {
    return (
      <div style={{ textAlign: 'center', padding: '56px 24px' }}>
        <div style={{ fontSize: 44, marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 8 }}>
          Submission received
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-2)', maxWidth: 400, margin: '0 auto 24px' }}>
          Thanks! We&apos;ll review your tool and email you at <strong>{successEmail}</strong> when
          it goes live. Usually 1–3 days.
        </p>
        <a
          href="/directory"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            padding: '9px 18px',
            borderRadius: 'var(--radius)',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          ← Browse the directory
        </a>
      </div>
    );
  }

  return (
    <>
      {error && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius)',
            fontSize: 13,
            marginBottom: 20,
            background: 'var(--red-bg)',
            border: '1px solid var(--red-br)',
            color: 'var(--red)',
          }}
        >
          {error}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        {/* Tool details */}
        <div style={{ marginBottom: 32 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              paddingBottom: 10,
              borderBottom: '1px solid var(--border)',
              marginBottom: 18,
            }}
          >
            Tool details
          </p>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
              Tool name <span style={{ color: 'var(--red)' }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Squoosh"
              maxLength={80}
              style={field({ borderColor: errors['name'] ? 'var(--red)' : undefined })}
            />
            {errors['name'] && (
              <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 5 }}>
                Please enter the tool name.
              </p>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
              Tool URL <span style={{ color: 'var(--red)' }}>*</span>
            </label>
            <input
              type="url"
              name="url"
              placeholder="https://example.com"
              maxLength={300}
              style={field({ borderColor: errors['url'] ? 'var(--red)' : undefined })}
            />
            {errors['url'] && (
              <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 5 }}>
                Please enter a valid URL starting with https://
              </p>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
              One-line description <span style={{ color: 'var(--red)' }}>*</span>{' '}
              <span style={{ fontWeight: 400, color: 'var(--text-3)', fontSize: 12 }}>
                max 120 chars
              </span>
            </label>
            <input
              type="text"
              name="tagline"
              placeholder="e.g. Compress images in your browser — no upload needed."
              maxLength={120}
              style={field({ borderColor: errors['tagline'] ? 'var(--red)' : undefined })}
            />
            {errors['tagline'] && (
              <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 5 }}>
                Required. Max 120 characters.
              </p>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
              Longer description{' '}
              <span style={{ fontWeight: 400, color: 'var(--text-3)', fontSize: 12 }}>
                Optional, 300 chars max
              </span>
            </label>
            <textarea
              name="description"
              placeholder="Who is it for? What makes it different?"
              maxLength={300}
              rows={3}
              style={field({ resize: 'vertical' })}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
              Category <span style={{ color: 'var(--red)' }}>*</span>
            </label>
            <select
              name="category"
              style={field({
                borderColor: errors['category'] ? 'var(--red)' : undefined,
                cursor: 'pointer',
              })}
            >
              <option value="">— Select a category —</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            {errors['category'] && (
              <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 5 }}>
                Please select a category.
              </p>
            )}
          </div>
        </div>

        {/* Privacy features */}
        <div style={{ marginBottom: 32 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              paddingBottom: 10,
              borderBottom: '1px solid var(--border)',
              marginBottom: 18,
            }}
          >
            Privacy features{' '}
            <span
              style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: 11 }}
            >
              — tick all that apply (at least one required)
            </span>
          </p>
          <div className="checkbox-grid">
            {CHECKBOXES.map((cb) => (
              <label
                key={cb.name}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  padding: '11px 13px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  name={cb.name}
                  style={{
                    width: 'auto',
                    padding: 0,
                    marginTop: 3,
                    flexShrink: 0,
                    accentColor: 'var(--accent)',
                    cursor: 'pointer',
                  }}
                  onChange={
                    cb.name === 'is_open_source' ? (e) => setIsOss(e.target.checked) : undefined
                  }
                />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{cb.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{cb.desc}</div>
                </div>
              </label>
            ))}
          </div>
          {errors['features'] && (
            <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 8 }}>
              Please tick at least one privacy feature.
            </p>
          )}

          {isOss && (
            <div style={{ marginTop: 14 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
                GitHub / source URL <span style={{ color: 'var(--red)' }}>*</span>
                <span
                  style={{ fontWeight: 400, color: 'var(--text-3)', fontSize: 12, marginLeft: 6 }}
                >
                  Required for open source tools.
                </span>
              </label>
              <input
                type="url"
                name="github_url"
                placeholder="https://github.com/username/repo"
                maxLength={300}
                style={field({ borderColor: errors['github_url'] ? 'var(--red)' : undefined })}
              />
              {errors['github_url'] && (
                <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 5 }}>
                  Please add the source repository URL.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Submitter details */}
        <div style={{ marginBottom: 32 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              paddingBottom: 10,
              borderBottom: '1px solid var(--border)',
              marginBottom: 18,
            }}
          >
            Your details
          </p>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
              Your email <span style={{ color: 'var(--red)' }}>*</span>
              <span
                style={{ fontWeight: 400, color: 'var(--text-3)', fontSize: 12, marginLeft: 6 }}
              >
                We&apos;ll notify you when approved. Not published.
              </span>
            </label>
            <input
              type="email"
              name="submitted_by_email"
              placeholder="you@example.com"
              maxLength={200}
              style={field({ borderColor: errors['email'] ? 'var(--red)' : undefined })}
            />
            {errors['email'] && (
              <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 5 }}>
                Please enter a valid email address.
              </p>
            )}
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
              Your name / handle{' '}
              <span style={{ fontWeight: 400, color: 'var(--text-3)', fontSize: 12 }}>
                Optional
              </span>
            </label>
            <input
              type="text"
              name="submitted_by_name"
              placeholder="e.g. @yourhandle"
              maxLength={80}
              style={field()}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: 12,
            background: 'var(--accent)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'Inter, sans-serif',
            border: 'none',
            borderRadius: 'var(--radius)',
            cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.5 : 1,
          }}
        >
          {submitting ? 'Submitting…' : 'Submit for review →'}
        </button>
        <p
          style={{
            fontSize: 12,
            color: 'var(--text-3)',
            textAlign: 'center',
            marginTop: 10,
            lineHeight: 1.5,
          }}
        >
          By submitting you confirm this tool genuinely processes data without unnecessary uploads.
          False claims will be rejected.
        </p>
      </form>
    </>
  );
}

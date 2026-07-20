import Link from 'next/link';
import Image from 'next/image';
import SubmissionBanner from './SubmissionBanner';

export default function Nav() {
  return (
    <>
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(247,246,243,0.96)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px',
      }}
    >
      {/* Desktop row */}
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 54,
          gap: 24,
        }}
      >
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          <Image src="/favicon-32x32.png" alt="" width={22} height={22} style={{ borderRadius: 4 }} />
          No<span style={{ color: 'var(--accent)' }}>Upload</span>Tools
        </Link>

        <ul
          className="nav-links"
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            gap: 20,
            listStyle: 'none',
          }}
        >
          <li>
            <Link href="/directory" style={{ fontSize: 13, color: 'var(--text-2)' }}>
              Directory
            </Link>
          </li>
          <li>
            <Link href="/tracking-checker" style={{ fontSize: 13, color: 'var(--text-2)' }}>
              Tracking Checker
            </Link>
          </li>
        </ul>

        <Link
          href="/submit"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            background: 'var(--accent)',
            color: '#fff',
            padding: '7px 16px',
            borderRadius: 'var(--radius)',
            fontSize: 13,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          + Submit a tool
        </Link>
      </div>

      {/* Mobile second row — links only, hidden on desktop */}
      <div className="nav-mobile-links">
        <Link href="/directory" style={{ fontSize: 13, color: 'var(--text-2)' }}>
          Directory
        </Link>
        <Link href="/tracking-checker" style={{ fontSize: 13, color: 'var(--text-2)' }}>
          Tracking Checker
        </Link>
      </div>
    </nav>
    <SubmissionBanner />
    </>
  );
}

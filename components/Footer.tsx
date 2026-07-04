import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-card)',
        padding: '32px 24px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 32,
            flexWrap: 'wrap',
            marginBottom: 28,
          }}
        >
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em' }}>
              No<span style={{ color: 'var(--accent)' }}>Upload</span>Tools
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>
              We verify tools, not promises.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <strong
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '.07em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                marginBottom: 2,
              }}
            >
              Directory
            </strong>
            <Link href="/directory" style={{ fontSize: 13, color: 'var(--text-2)' }}>
              All Tools
            </Link>
            <Link href="/submit" style={{ fontSize: 13, color: 'var(--text-2)' }}>
              Submit a Tool
            </Link>
            <Link href="/tracking-checker" style={{ fontSize: 13, color: 'var(--text-2)' }}>
              Tracking Checker
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <strong
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '.07em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                marginBottom: 2,
              }}
            >
              Categories
            </strong>
            <Link href="/directory?cat=documents" style={{ fontSize: 13, color: 'var(--text-2)' }}>
              Documents
            </Link>
            <Link href="/directory?cat=images" style={{ fontSize: 13, color: 'var(--text-2)' }}>
              Images
            </Link>
            <Link
              href="/directory?cat=security-privacy"
              style={{ fontSize: 13, color: 'var(--text-2)' }}
            >
              Security
            </Link>
            <Link
              href="/directory?cat=developer-tools"
              style={{ fontSize: 13, color: 'var(--text-2)' }}
            >
              Developer
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <strong
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '.07em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                marginBottom: 2,
              }}
            >
              Company
            </strong>
            <Link href="/privacy" style={{ fontSize: 13, color: 'var(--text-2)' }}>
              Privacy Policy
            </Link>
            <Link href="/terms" style={{ fontSize: 13, color: 'var(--text-2)' }}>
              Terms
            </Link>
            <Link href="/contact" style={{ fontSize: 13, color: 'var(--text-2)' }}>
              Contact
            </Link>
            <Link href="/how-we-review" style={{ fontSize: 13, color: 'var(--text-2)' }}>
              How We Review
            </Link>
            <a
              href="https://digiwares.xyz"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 13, color: 'var(--text-2)' }}
            >
              Digiwares
            </a>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
            fontSize: 12,
            color: 'var(--text-3)',
          }}
        >
          <span>
            © {new Date().getFullYear()} NoUploadTools · A{' '}
            <a href="https://digiwares.xyz" style={{ color: 'var(--text-2)' }}>
              Digiwares
            </a>{' '}
            product
          </span>
          <span>Made in Bangkok 🇹🇭</span>
        </div>
      </div>
    </footer>
  );
}

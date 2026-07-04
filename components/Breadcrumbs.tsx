import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

const BASE_URL = 'https://nouploadtools.com';

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const all = [{ label: 'Home', href: '/' }, ...items];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${BASE_URL}${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav
        aria-label="Breadcrumb"
        style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 24px 0' }}
      >
        <ol
          style={{
            listStyle: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            flexWrap: 'wrap',
          }}
        >
          {all.map((item, i) => {
            const isLast = i === all.length - 1;
            return (
              <li key={item.href} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {i > 0 && (
                  <span style={{ fontSize: 12, color: 'var(--text-3)', userSelect: 'none' }}>
                    /
                  </span>
                )}
                {isLast ? (
                  <span aria-current="page" style={{ fontSize: 12, color: 'var(--text-3)' }}>
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    style={{ fontSize: 12, color: 'var(--text-2)', textDecoration: 'none' }}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

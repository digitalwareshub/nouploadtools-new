import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://nouploadtools.com'),
  title: {
    default: "NoUploadTools — Privacy-First Web Tools That Don't Upload Your Files",
    template: '%s — NoUploadTools',
  },
  description:
    'A curated directory of open-source, no-login, no-ads web tools that work locally in your browser whenever possible.',
  keywords: [
    'no upload tools',
    'privacy first web tools',
    'browser tools that do not upload files',
    'client side browser tools',
    'offline browser tools',
    'no login web tools',
    'no ads web tools',
    'open source web tools',
    'local first web tools',
    'website tracking checker',
  ],
  openGraph: {
    type: 'website',
    siteName: 'NoUploadTools',
    title: "NoUploadTools — Privacy-First Web Tools That Don't Upload Your Files",
    description:
      'A curated directory of open-source, no-login, no-ads web tools that work locally in your browser whenever possible.',
    url: 'https://nouploadtools.com',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "NoUploadTools — Privacy-First Web Tools That Don't Upload Your Files",
    description:
      'A curated directory of open-source, no-login, no-ads web tools that work locally in your browser whenever possible.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'NoUploadTools',
  url: 'https://nouploadtools.com',
  description:
    'A curated directory of privacy-first browser tools that avoid unnecessary uploads, logins, ads, and tracking.',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NoUploadTools',
  url: 'https://nouploadtools.com',
  email: 'write@digiwares.xyz',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {process.env.NODE_ENV === 'production' && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};`,
              }}
            />
          </>
        )}
      </head>
      <body className={inter.className}>
        {children}
        {process.env.NODE_ENV === 'production' && (
          <script defer src="/_vercel/insights/script.js" />
        )}
      </body>
    </html>
  );
}

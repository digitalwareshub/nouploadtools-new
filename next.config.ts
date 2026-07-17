import type { NextConfig } from 'next';

const legacyToolRedirects = [
  // General
  { source: '/about', destination: '/how-we-review', permanent: true },

  // Documents
  { source: '/image-to-pdf', destination: '/directory?cat=documents', permanent: true },
  { source: '/tools/compress-pdf', destination: '/directory?cat=documents', permanent: true },
  { source: '/tools/pdf-to-image', destination: '/directory?cat=documents', permanent: true },
  { source: '/tools/merge-pdf', destination: '/directory?cat=documents', permanent: true },
  { source: '/metadata-remover', destination: '/directory?cat=documents', permanent: true },

  // Images
  { source: '/image-compressor', destination: '/directory?cat=images', permanent: true },
  { source: '/color-picker', destination: '/directory?cat=images', permanent: true },
  { source: '/favicon-generator', destination: '/directory?cat=images', permanent: true },
  { source: '/image-format-converter', destination: '/directory?cat=images', permanent: true },
  { source: '/qr-generator', destination: '/directory?cat=images', permanent: true },
  { source: '/svg-optimizer', destination: '/directory?cat=images', permanent: true },
  { source: '/barcode-scanner', destination: '/directory?cat=images', permanent: true },
  { source: '/png-to-jpg', destination: '/directory?cat=images', permanent: true },
  { source: '/webp-to-png', destination: '/directory?cat=images', permanent: true },
  { source: '/image-resizer', destination: '/directory?cat=images', permanent: true },
  { source: '/heic-to-jpg', destination: '/directory?cat=images', permanent: true },
  { source: '/exif-remover', destination: '/directory?cat=images', permanent: true },
  { source: '/svg-to-png', destination: '/directory?cat=images', permanent: true },

  // Text & Writing
  { source: '/text-diff', destination: '/directory?cat=text-writing', permanent: true },
  { source: '/lorem-ipsum', destination: '/directory?cat=text-writing', permanent: true },
  { source: '/markdown-editor', destination: '/directory?cat=text-writing', permanent: true },
  { source: '/word-counter', destination: '/directory?cat=text-writing', permanent: true },
  { source: '/case-converter', destination: '/directory?cat=text-writing', permanent: true },

  // Security & Privacy
  { source: '/password-generator', destination: '/directory?cat=security-privacy', permanent: true },
  { source: '/hash-generator', destination: '/directory?cat=security-privacy', permanent: true },
  { source: '/file-encryptor', destination: '/directory?cat=security-privacy', permanent: true },
  { source: '/secure-password-checker', destination: '/directory?cat=security-privacy', permanent: true },
  { source: '/text-encryptor', destination: '/directory?cat=security-privacy', permanent: true },
  { source: '/jwt-decoder', destination: '/directory?cat=security-privacy', permanent: true },

  // Developer Tools
  { source: '/base64-encoder', destination: '/directory?cat=developer-tools', permanent: true },
  { source: '/json-formatter', destination: '/directory?cat=developer-tools', permanent: true },
  { source: '/csv-converter', destination: '/directory?cat=developer-tools', permanent: true },
  { source: '/regex-tester', destination: '/directory?cat=developer-tools', permanent: true },
  { source: '/file-splitter', destination: '/directory?cat=developer-tools', permanent: true },
  { source: '/code-beautifier', destination: '/directory?cat=developer-tools', permanent: true },
  { source: '/html-entity-encoder', destination: '/directory?cat=developer-tools', permanent: true },
  { source: '/uuid-generator', destination: '/directory?cat=developer-tools', permanent: true },
  { source: '/url-encoder', destination: '/directory?cat=developer-tools', permanent: true },

  // Calculators & Data
  { source: '/unit-converter', destination: '/directory?cat=calculators-data', permanent: true },
  { source: '/timer-stopwatch', destination: '/directory?cat=calculators-data', permanent: true },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/submit.html', destination: '/submit', permanent: true },
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/terms.html', destination: '/terms', permanent: true },
      ...legacyToolRedirects,
    ];
  },
};

export default nextConfig;

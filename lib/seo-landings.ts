export type SeoLanding = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  category?: string;
  feature?: 'is_works_offline';
  searchIntent: string[];
  checks: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export const seoLandings: SeoLanding[] = [
  {
    slug: 'no-upload-pdf-tools',
    title: 'No-Upload PDF Tools',
    shortTitle: 'No-upload PDF tools',
    description:
      'Find privacy-first PDF tools that avoid unnecessary uploads, forced accounts, ads, and opaque server-side processing.',
    intro:
      'PDFs often contain contracts, invoices, IDs, medical records, and internal documents. Use this page to find document tools that are reviewed for local processing, no-login access, and clear privacy behavior.',
    category: 'documents',
    searchIntent: [
      'Merge, split, compress, edit, or convert PDF files without handing documents to an unknown server.',
      'Prefer tools that work in the browser, are open source where possible, and disclose when an API is used.',
      'Use extra caution with scanned IDs, contracts, legal documents, financial files, and medical records.',
    ],
    checks: [
      'Open browser developer tools and watch the Network tab while processing a test PDF.',
      'Try the same workflow after the page has loaded and the network is disconnected.',
      'Check whether the tool requires an account before the main PDF action works.',
      'Review whether the project is open source or explains how files are handled.',
    ],
    faqs: [
      {
        question: 'Are all PDF tools on this page guaranteed to be fully private?',
        answer:
          'No. Listings are reviewed and labeled, but they are not security certifications. You should verify sensitive workflows yourself before using a tool with private documents.',
      },
      {
        question: 'What is the safest kind of PDF tool?',
        answer:
          'For sensitive files, prefer tools that process files locally in your browser or tools you can self-host and inspect.',
      },
    ],
  },
  {
    slug: 'privacy-first-image-tools',
    title: 'Privacy-First Image Tools',
    shortTitle: 'Privacy-first image tools',
    description:
      'Browse image tools for compression, conversion, resizing, and metadata cleanup with a privacy-first review lens.',
    intro:
      'Images can expose private details through file contents, EXIF metadata, location tags, and upload logs. These listings focus on image utilities that reduce unnecessary sharing.',
    category: 'images',
    searchIntent: [
      'Compress, resize, optimize, and convert images without unnecessary uploads.',
      'Look for tools that strip metadata locally before sharing public files.',
      'Choose browser-based tools when images contain people, locations, screenshots, or private projects.',
    ],
    checks: [
      'Inspect network requests while loading and processing a test image.',
      'Confirm whether EXIF metadata is removed or preserved before exporting.',
      'Check mobile support if you plan to clean photos directly from a phone.',
      'Prefer open-source tools when handling images that reveal private locations.',
    ],
    faqs: [
      {
        question: 'Why does image privacy matter?',
        answer:
          'Photos can contain GPS coordinates, device details, timestamps, thumbnails, and other metadata that may reveal more than the visible image.',
      },
      {
        question: 'Should I upload private photos to image converters?',
        answer:
          'Avoid uploading private photos when a local or client-side tool can do the same job in your browser.',
      },
    ],
  },
  {
    slug: 'client-side-developer-tools',
    title: 'Client-Side Developer Tools',
    shortTitle: 'Client-side developer tools',
    description:
      'Find developer utilities for formatting, encoding, diagrams, APIs, and data work that can run locally in the browser.',
    intro:
      'Developer tools often touch production snippets, API payloads, tokens, logs, and customer data. Client-side utilities reduce the chance that sensitive text leaves your machine.',
    category: 'developer-tools',
    searchIntent: [
      'Format JSON, test regular expressions, generate diagrams, and transform code without sending sensitive snippets away.',
      'Prefer tools that work locally for API payloads, logs, secrets, and customer data samples.',
      'Check source code when a tool claims local processing for complex transformations.',
    ],
    checks: [
      'Use fake data first and inspect network requests during transformations.',
      'Never paste live secrets, private keys, access tokens, or customer records into tools you have not verified.',
      'Prefer local-first or open-source utilities for recurring workflows.',
      'Check whether the tool loads third-party scripts that could observe pasted input.',
    ],
    faqs: [
      {
        question: 'Are browser developer tools safer than cloud tools?',
        answer:
          'They can be safer when processing happens locally, but you still need to check third-party scripts, storage behavior, and project trustworthiness.',
      },
      {
        question: 'Can I paste API keys into these tools?',
        answer:
          'No. Treat secrets as sensitive even when a tool is listed. Use redacted or fake values unless you fully control the environment.',
      },
    ],
  },
  {
    slug: 'offline-browser-tools',
    title: 'Offline Browser Tools',
    shortTitle: 'Offline browser tools',
    description:
      'Browse tools that can keep working without a network connection after the page has loaded.',
    intro:
      'Offline-capable tools are useful when you want a stronger signal that processing can happen on your own device. Offline support is not a complete security audit, but it is a helpful privacy check.',
    feature: 'is_works_offline',
    searchIntent: [
      'Find utilities that can continue working after the initial page load.',
      'Use offline behavior as one practical test for local processing.',
      'Prefer offline-capable tools for travel, unreliable connections, or sensitive files.',
    ],
    checks: [
      'Load the tool, disconnect from the internet, then process a harmless test file.',
      'Reloading the page offline may fail unless the tool is built as a PWA, so test the actual workflow after load.',
      'Confirm exported files are created locally and do not require a server round trip.',
      'Pair offline testing with Network tab inspection for stronger evidence.',
    ],
    faqs: [
      {
        question: 'Does offline support prove a tool is private?',
        answer:
          'No. It is a useful signal, not proof. A tool may still load analytics, store data locally, or have other risks.',
      },
      {
        question: 'Why list offline tools separately?',
        answer:
          'Offline behavior is one of the easiest checks non-technical users can perform when evaluating local processing claims.',
      },
    ],
  },
];

export function getSeoLandingBySlug(slug: string) {
  return seoLandings.find((landing) => landing.slug === slug);
}

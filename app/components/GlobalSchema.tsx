/**
 * Global Schema Component
 * 
 * Injects Organization and Website schemas that should appear on every page.
 * These are the foundation schemas for Google and AI search engines.
 * 
 * Usage: Include in root layout.tsx
 */

import Script from 'next/script';
import { organizationSchema, websiteSchema } from '../lib/schemaConfig';

export default function GlobalSchema() {
  return (
    <>
      {/* Organization Schema - Appears on all pages */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
        strategy="beforeInteractive"
      />

      {/* Website Schema - Appears on all pages */}
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
        strategy="beforeInteractive"
      />
    </>
  );
}
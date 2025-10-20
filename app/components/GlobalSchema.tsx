// app/components/GlobalSchema.tsx
import Script from 'next/script';
import { organizationSchema, websiteSchema } from '../lib/schemaConfig';

// Remove 'use client' directive
export default function GlobalSchema() {
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
        strategy="beforeInteractive"
      />
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
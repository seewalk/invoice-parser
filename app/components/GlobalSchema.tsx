// app/components/GlobalSchema.tsx
// Server Component - renders inline schemas for SSG
import { organizationSchema, websiteSchema } from '../lib/schemaConfig';

export default function GlobalSchema() {
  return (
    <>
      {/* Organization Schema - MUST appear on all 85 pages */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {/* Website Schema - main site identity */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
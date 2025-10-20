// app/components/HomePageSchema.tsx
// Server Component - renders homepage-specific schemas
import { 
  softwareApplicationSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  type FAQItem
} from '../lib/schemaConfig';

export default function HomePageSchema({ faqs }: { faqs: FAQItem[] }) {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' }
  ]);

  return (
    <>
      {/* Software Application Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema)
        }}
      />
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </>
  );
}

// app/components/HomePageSchema.tsx
// Server Component - renders homepage-specific schemas
import { 
  softwareApplicationSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
  type FAQItem
} from '../lib/schemaConfig';

export default function HomePageSchema({ faqs }: { faqs: FAQItem[] }) {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' }
  ]);

  // HowTo Schema for "How It Works" section
  const howToSchema = generateHowToSchema(
    'How to Automate Invoice Processing with AI',
    'Learn how to automate your invoice processing workflow in 4 simple steps. From upload to automated data export, no technical skills required.',
    [
      {
        name: 'Upload Your Invoice',
        text: 'Drag & drop PDFs, images, or email invoices directly to our platform. Works with any supplier format.',
      },
      {
        name: 'AI Extracts Everything',
        text: 'Our AI reads line items, prices, quantities, dates, and categorizes products automatically in seconds.',
      },
      {
        name: 'Review & Approve',
        text: 'Quick visual review with 99% accuracy. Edit anything if needed, or approve with one click.',
      },
      {
        name: 'Auto-Integrate',
        text: 'Data flows directly to QuickBooks, Xero, your POS, or inventory system. Zero manual entry.',
      },
    ]
  );

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
      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema)
        }}
      />
    </>
  );
}

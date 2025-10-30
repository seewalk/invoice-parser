// app/components/HomePageSchema.tsx
// Server Component - renders homepage-specific schemas
import { 
  softwareApplicationSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
  generateFeaturesSchema,
  generateROISchema,
  type FAQItem
} from '../../lib/schemaConfig';
import { 
  HOW_IT_WORKS_SCHEMA_META,
  getHowItWorksSchemaSteps
} from '../../lib/howItWorksData';
import {
  FEATURES_SCHEMA_META,
  getFeaturesForSchema
} from '../../lib/featuresData';
import {
  ROI_SCHEMA_META,
  getROIStatsForSchema
} from '../../lib/roiData';

export default function HomePageSchema({ faqs }: { faqs: FAQItem[] }) {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' }
  ]);

  // HowTo Schema for "How It Works" section - using centralized data
  const howToSchema = generateHowToSchema(
    HOW_IT_WORKS_SCHEMA_META.name,
    HOW_IT_WORKS_SCHEMA_META.description,
    getHowItWorksSchemaSteps(),
    {
      totalTime: HOW_IT_WORKS_SCHEMA_META.totalTime, // 5 minutes
      estimatedCost: {
        currency: 'GBP',
        value: '0', // Free to try
      },
      tool: [
        'Web Browser',
        'PDF Invoice',
        'Invoice Automation Software',
      ],
    }
  );

  // Features/ItemList Schema - using centralized data
  const featuresSchema = generateFeaturesSchema(
    FEATURES_SCHEMA_META.name,
    FEATURES_SCHEMA_META.description,
    getFeaturesForSchema()
  );

  // ROI Schema - using centralized data
  const roiSchema = generateROISchema(
    ROI_SCHEMA_META.name,
    ROI_SCHEMA_META.description,
    getROIStatsForSchema(),
    {
      annualSavings: ROI_SCHEMA_META.annualSavings,
      currency: ROI_SCHEMA_META.currency,
      timeReduction: ROI_SCHEMA_META.timeReduction,
      accuracyRate: ROI_SCHEMA_META.accuracyRate,
    }
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
      {/* Features/ItemList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(featuresSchema)
        }}
      />
      {/* ROI Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(roiSchema)
        }}
      />
    </>
  );
}

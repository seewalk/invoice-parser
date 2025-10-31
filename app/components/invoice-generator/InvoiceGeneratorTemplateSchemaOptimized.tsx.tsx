/**
 * OPTIMIZED Invoice Generator Template Schema (Server Component)
 * 
 * Strategic 4-Schema Approach for Maximum SEO & AI Engine Visibility:
 * 1. SoftwareApplication - The tool (Google rich results, AI understanding)
 * 2. HowTo - Step-by-step guide (Voice search, AI responses)
 * 3. FAQPage - Template-specific Q&A (FAQ snippets, AI Q&A)
 * 4. BreadcrumbList - Navigation (Site structure)
 * 
 * Data Sources:
 * - Template library (requiredFields, industryStandards, searchVolume)
 * - Existing FAQ database (generic invoice questions)
 * - Dynamic generation (template-specific FAQs)
 * 
 * Server-rendered for SEO optimization
 */

import { 
  generateBreadcrumbSchema, 
  generateHowToSchema, 
  generateFAQSchema,
  BUSINESS_INFO,
  type FAQItem
} from '@/app/lib/schemaConfig';
import { InvoiceTemplate } from '@/app/lib/invoiceTemplateLibrary';
import { getFAQsByCategory } from '@/app/lib/faqData';

interface InvoiceGeneratorTemplateSchemaOptimizedProps {
  template: InvoiceTemplate;
  industryName: string;
  slug: string;
}

export default function InvoiceGeneratorTemplateSchemaOptimized({
  template,
  industryName,
  slug,
}: InvoiceGeneratorTemplateSchemaOptimizedProps) {
  // Safety check
  if (!template || !template.requiredFields || !template.optionalFields) {
    return null;
  }

  const templateUrl = `${BUSINESS_INFO.url}/invoice-generator/${slug}`;

  // Extract rich data from template
  const totalFields = template.requiredFields.length + template.optionalFields.length;
  const complianceStandards = template.industryStandards
    ? template.industryStandards
        .filter(s => s.complianceLevel === 'required')
        .map(s => s.standard)
    : [];
  // ============================================================================
  // 1. SoftwareApplication Schema - The Tool
  // ============================================================================
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${templateUrl}#webapp`,
    name: `Free ${template.name} Generator`,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Invoice Generator',
    operatingSystem: 'Web Browser',
    description: `${template.description} Free online tool to create professional ${template.name.toLowerCase()} with instant PDF download. ${totalFields} customizable fields with ${complianceStandards.length > 0 ? complianceStandards.join(', ') + ' compliance' : 'UK invoicing compliance'}.`,
    
    url: templateUrl,
    browserRequirements: 'Requires JavaScript. Modern browser (Chrome, Firefox, Safari, Edge)',
    inLanguage: 'en-GB',
    
    // Free offering
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2099-12-31',
    },
    
    // Dynamic features from template data
    featureList: [
      `${industryName}-specific invoice template`,
      `${totalFields} customizable fields (${template.requiredFields.length} required, ${template.optionalFields.length} optional)`,
      ...complianceStandards.map(s => `${s} compliant`),
      'Instant PDF download',
      'Live preview as you type',
      'No registration required',
      'Free forever',
      'Mobile-friendly interface',
      'Professional design',
    ],
    
    // Publisher/Provider
    author: {
      '@id': `${BUSINESS_INFO.url}/#organization`,
    },
    provider: {
      '@id': `${BUSINESS_INFO.url}/#organization`,
    },
    
    // Industry context
    about: {
      '@type': 'Thing',
      name: industryName,
      description: `Invoice template designed for ${industryName} businesses`,
    },
    
    // Popularity metric (real data from template)
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/SearchAction',
      userInteractionCount: template.searchVolume,
    },
  };

  // ============================================================================
  // 2. HowTo Schema - Step-by-Step Guide
  // ============================================================================
  
  // Generate supply list from required fields (top 5)
  const requiredSupplies = template.requiredFields
    .slice(0, 5)
    .map(f => f.label);

  // Dynamic steps based on actual template fields
  const businessFields = template.requiredFields.filter(f => f.fieldName.includes('business'));
  const clientFields = template.requiredFields.filter(f => f.fieldName.includes('client'));

  const howToSchema = generateHowToSchema(
    `How to Create a ${template.name}`,
    `Step-by-step guide to generate professional ${template.name.toLowerCase()} for ${industryName} businesses. Complete ${template.requiredFields.length} required fields in about 2 minutes.`,
    [
      {
        name: 'Enter Your Business Information',
        text: `Fill in your business details including ${businessFields.length > 0 ? businessFields.map(f => f.label).join(', ') : 'business name, address, VAT number, and contact information'}.`,
      },
      {
        name: 'Add Client Details',
        text: `Enter your client's information: ${clientFields.length > 0 ? clientFields.map(f => f.label).join(', ') : 'client name, address, and contact details'}.`,
      },
      {
        name: 'List Invoice Items',
        text: `Add line items with ${template.requiredFields.find(f => f.fieldName === 'lineItems')?.helpText || 'descriptions, quantities, unit prices, and VAT rates'}.`,
      },
      ...(complianceStandards.length > 0 ? [{
        name: 'Review Compliance Requirements',
        text: `Verify all ${complianceStandards.join(', ')} compliance requirements are met for ${industryName} industry standards.`,
      }] : []),
      {
        name: 'Download Your Invoice',
        text: `Review your ${template.name.toLowerCase()} with live preview, then download as professional PDF instantly.`,
      },
    ],
    {
      totalTime: 'PT5M', // 5 minutes
      estimatedCost: {
        currency: 'GBP',
        value: '0',
      },
      tool: [
        'Web Browser',
        'Internet Connection',
        ...requiredSupplies.slice(0, 3), // Top 3 required data
      ],
      supply: requiredSupplies,
    }
  );

  // ============================================================================
  // 3. FAQPage Schema - Hybrid Approach
  // ============================================================================
  
  // Get generic invoice template FAQs from existing database (2-3 FAQs)
  const genericFAQs = getFAQsByCategory('Invoice Formats & Templates')
    .filter(faq => 
      faq.keywords.some(k => k.includes('template') || k.includes('format'))
    )
    .slice(0, 2) // Top 2 generic FAQs
    .map(faq => ({
      question: faq.question,
      answer: faq.answer,
    }));

  // Generate template-specific FAQs dynamically (3-4 FAQs)
  const templateSpecificFAQs: FAQItem[] = [
    {
      question: `What fields are required for a ${template.name}?`,
      answer: `A ${template.name} requires ${template.requiredFields.length} essential fields: ${template.requiredFields.slice(0, 5).map(f => f.label).join(', ')}${template.requiredFields.length > 5 ? `, and ${template.requiredFields.length - 5} more` : ''}. ${template.optionalFields.length > 0 ? `Additionally, there are ${template.optionalFields.length} optional fields you can include for more detailed invoicing.` : ''}`,
    },
    {
      question: `Is this ${template.name} compliant with ${industryName} standards?`,
      answer: `Yes, this ${template.name.toLowerCase()} is designed specifically for ${industryName} businesses and includes ${complianceStandards.length > 0 ? complianceStandards.join(', ') + ' compliance' : 'all UK invoicing requirements including VAT compliance and HMRC-approved formatting'}. ${template.industryStandards.length > 0 ? `It meets ${template.industryStandards.length} industry standards to ensure your invoices are legally compliant.` : ''}`,
    },
    {
      question: `How long does it take to create a ${template.name}?`,
      answer: `Creating a ${template.name.toLowerCase()} takes approximately 5 minutes. You'll need to complete ${totalFields} fields in total (${template.requiredFields.length} required and ${template.optionalFields.length} optional). The template includes live preview, so you can see your invoice as you fill it in, and instant PDF download when you're done.`,
    },
    {
      question: `Can I customize this ${template.name} for my business?`,
      answer: `Absolutely! This ${template.name.toLowerCase()} is fully customizable with ${totalFields} fields you can modify. You can add your business logo, customize colors, adjust payment terms, and modify any field to match your ${industryName} business needs. All customizations are saved in the PDF you download.`,
    },
  ];

  // Combine generic + specific FAQs (5-6 total for optimal SEO)
  const allFAQs = [...genericFAQs, ...templateSpecificFAQs];
  const faqSchema = generateFAQSchema(allFAQs);

  // ============================================================================
  // 4. BreadcrumbList Schema - Navigation
  // ============================================================================
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Invoice Generator', url: '/invoice-generator' },
    { name: template.name, url: templateUrl },
  ]);

  // ============================================================================
  // Render All Schemas
  // ============================================================================
  return (
    <>
      {/* 1. SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareAppSchema),
        }}
      />

      {/* 2. HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      {/* 3. FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* 4. BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
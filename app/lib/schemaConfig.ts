// ============================================================================
// BUSINESS INFORMATION (Single Source of Truth)
// ============================================================================

export const BUSINESS_INFO = {
  // Legal Entity
  legalName: 'Elektroluma Ltd',
  tradingName: 'Elektroluma',
  companyNumber: '16392032',
  
  // Contact Details
  email: 'ed@elektroluma.co.uk',
  phone: '+44 7944 020910', // Update with real phone if available
  
  // Address (Registered Office)
  address: {
    streetAddress: '20 Wenlock Road',
    addressLocality: 'London',
    addressRegion: 'England',
    postalCode: 'N1 7GU',
    addressCountry: 'GB'
  },
  
  // Online Presence
  domain: 'elektroluma.co.uk',
  url: 'https://elektroluma.co.uk',
  logoUrl: 'https://elektroluma.co.uk/logo.png',
  
  // Social Media (update with real profiles when available)
  social: {
    twitter: 'https://twitter.com/elektroluma',
    linkedin: 'https://linkedin.com/company/elektroluma',
    facebook: 'https://facebook.com/elektroluma',
  },
  
  // Business Details
  foundingDate: '2025-04-01', 
  areaServed: 'GB',
  availableLanguage: ['en-GB'],
} as const;

// ============================================================================
// GLOBAL ORGANIZATION SCHEMA (Used across all pages)
// ============================================================================

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BUSINESS_INFO.url}/#organization`,
  name: BUSINESS_INFO.legalName,
  alternateName: BUSINESS_INFO.tradingName,
  legalName: BUSINESS_INFO.legalName,
  url: BUSINESS_INFO.url,
  logo: {
    '@type': 'ImageObject',
    url: BUSINESS_INFO.logoUrl,
    width: '512',
    height: '512',
  },
  
  // Contact Information
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: BUSINESS_INFO.phone,
      contactType: 'customer service',
      email: BUSINESS_INFO.email,
      areaServed: BUSINESS_INFO.areaServed,
      availableLanguage: BUSINESS_INFO.availableLanguage,
    },
    {
      '@type': 'ContactPoint',
      telephone: BUSINESS_INFO.phone,
      contactType: 'sales',
      email: BUSINESS_INFO.email,
      areaServed: BUSINESS_INFO.areaServed,
      availableLanguage: BUSINESS_INFO.availableLanguage,
    },
  ],
  
  // Address
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS_INFO.address.streetAddress,
    addressLocality: BUSINESS_INFO.address.addressLocality,
    addressRegion: BUSINESS_INFO.address.addressRegion,
    postalCode: BUSINESS_INFO.address.postalCode,
    addressCountry: BUSINESS_INFO.address.addressCountry,
  },
  
  // Social Media
  sameAs: Object.values(BUSINESS_INFO.social),
  
  // Business Metadata
  foundingDate: BUSINESS_INFO.foundingDate,
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: '1-10', // Update as company grows
  },
  
  // UK Company Registration
  identifier: {
    '@type': 'PropertyValue',
    propertyID: '16392032',
    value: BUSINESS_INFO.companyNumber,
  },
};

// ============================================================================
// WEBSITE SCHEMA (Main site identity)
// ============================================================================

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BUSINESS_INFO.url}/#website`,
  url: BUSINESS_INFO.url,
  name: BUSINESS_INFO.tradingName,
  description: 'AI-powered invoice processing and automation software for UK businesses',
  publisher: {
    '@id': `${BUSINESS_INFO.url}/#organization`,
  },
  inLanguage: 'en-GB',
  
  // Search Action for site search (if implemented)
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BUSINESS_INFO.url}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// ============================================================================
// SOFTWARE APPLICATION SCHEMA (Main Product)
// ============================================================================

/**
 * Generate Software Application Schema with dynamic pricing
 * Uses centralized pricing from pricingConfig.ts
 */
export function generateSoftwareApplicationSchema() {
  // Import pricing dynamically to avoid circular dependencies
  const { PRICING_PLANS } = require('./pricingConfig');
  
  const allPlans = Object.values(PRICING_PLANS) as any[];
  const paidPlans = allPlans.filter((p: any) => p.price.monthly > 0 && p.tier !== 'enterprise');
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${BUSINESS_INFO.url}/#software`,
    name: BUSINESS_INFO.tradingName,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Invoice Processing Software',
    operatingSystem: 'Web Browser',
    
    description: 'AI-powered invoice processing and automation software for UK businesses. Extract data from supplier invoices automatically with 99% accuracy in 30 seconds. Perfect for restaurants, warehouses, and accounting firms.',
    
    featureList: [
      'AI-powered OCR invoice data extraction',
      'Multi-page PDF support',
      'Batch invoice processing',
      'QuickBooks & Xero integration',
      'Real-time data validation',
      'Automated accounts payable',
      'Mobile invoice capture',
      'API access for automation',
    ],
    
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'GBP',
      lowPrice: '0',
      highPrice: String(Math.max(...paidPlans.map((p: any) => p.price.monthly))),
      offerCount: String(paidPlans.length + 1), // +1 for free tier
      offers: [
        {
          '@type': 'Offer',
          name: 'Free Plan',
          price: '0',
          priceCurrency: 'GBP',
          description: 'All templates with watermark, perfect for trying out the platform',
        },
        ...paidPlans.map((plan: any) => ({
          '@type': 'Offer',
          name: `${plan.name} Plan`,
          price: String(plan.price.monthly),
          priceCurrency: 'GBP',
          description: plan.tagline,
        })),
      ],
    },
    
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    
    author: {
      '@id': `${BUSINESS_INFO.url}/#organization`,
    },
    
    provider: {
      '@id': `${BUSINESS_INFO.url}/#organization`,
    },
    
    image: BUSINESS_INFO.logoUrl,
    screenshot: `${BUSINESS_INFO.url}/screenshot.png`,
    url: BUSINESS_INFO.url,
    
    installUrl: `${BUSINESS_INFO.url}/signup`,
    softwareHelp: `${BUSINESS_INFO.url}/faq`,
    softwareVersion: '1.0',
    
    releaseNotes: 'Multi-page PDF support, batch processing, enhanced AI accuracy',
    
    browserRequirements: 'Requires JavaScript. Modern browser (Chrome, Firefox, Safari, Edge)',
  };
}

/**
 * @deprecated Use generateSoftwareApplicationSchema() instead
 * Kept for backward compatibility
 */
export const softwareApplicationSchema = generateSoftwareApplicationSchema();

// ============================================================================
// BREADCRUMB GENERATOR (For AI-powered search summaries)
// ============================================================================

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BUSINESS_INFO.url}${item.url}`,
    })),
  };
}

// ============================================================================
// ARTICLE SCHEMA GENERATOR (For Blog Posts)
// ============================================================================

export interface ArticleSchemaProps {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  keywords: string[];
  category: string;
  imageUrl?: string;
  url: string;
}

export function generateArticleSchema(props: ArticleSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${BUSINESS_INFO.url}${props.url}`,
    headline: props.headline,
    description: props.description,
    image: props.imageUrl || BUSINESS_INFO.logoUrl,
    
    author: {
      '@type': 'Person',
      name: props.author,
    },
    
    publisher: {
      '@id': `${BUSINESS_INFO.url}/#organization`,
    },
    
    datePublished: props.datePublished,
    dateModified: props.dateModified,
    
    keywords: props.keywords.join(', '),
    articleSection: props.category,
    
    inLanguage: 'en-GB',
    
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BUSINESS_INFO.url}${props.url}`,
    },
  };
}

// ============================================================================
// FAQ SCHEMA GENERATOR (For FAQ Pages)
// ============================================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ============================================================================
// PRODUCT COMPARISON SCHEMA (For pricing/comparison pages)
// ============================================================================

export interface ComparisonProduct {
  name: string;
  description: string;
  price: string;
  features: string[];
  url?: string;
}

/**
 * Generate Product Comparison Schema from manual product data
 * Legacy function - kept for backward compatibility
 */
export function generateProductComparisonSchema(products: ComparisonProduct[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'GBP',
          availability: 'https://schema.org/InStock',
          url: product.url || BUSINESS_INFO.url,
        },
        additionalProperty: product.features.map((feature) => ({
          '@type': 'PropertyValue',
          name: 'Feature',
          value: feature,
        })),
      },
    })),
  };
}

/**
 * Generate Product Comparison Schema from centralized pricing config
 * Automatically uses the latest pricing data
 * 
 * @param context - Pricing context (homepage, full, templates, parser)
 */
export function generatePricingComparisonSchema(context: 'homepage' | 'full' | 'templates' | 'parser' = 'full') {
  // Import dynamically to avoid circular dependencies
  const { getPricingPlansForContext } = require('./pricingConfig');
  
  const plans = getPricingPlansForContext(context);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Elektroluma Pricing Plans',
    description: 'Compare pricing plans for Elektroluma invoice processing software',
    itemListElement: plans.map((plan: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: `${plan.name} Plan`,
        description: plan.tagline,
        brand: {
          '@type': 'Brand',
          name: BUSINESS_INFO.tradingName,
        },
        offers: {
          '@type': 'Offer',
          price: String(plan.price.monthly),
          priceCurrency: 'GBP',
          priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year
          availability: 'https://schema.org/InStock',
          url: `${BUSINESS_INFO.url}${plan.ctaUrl}`,
          eligibleRegion: {
            '@type': 'Country',
            name: 'United Kingdom',
          },
        },
        additionalProperty: plan.features.map((feature: string) => ({
          '@type': 'PropertyValue',
          name: 'Feature',
          value: feature,
        })),
      },
    })),
  };
}

// ============================================================================
// HOW-TO SCHEMA GENERATOR (For tutorial/guide content)
// ============================================================================

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export function generateHowToSchema(
  name: string,
  description: string,
  steps: HowToStep[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    })),
  };
}

// ============================================================================
// SERVICE SCHEMA (For service pages)
// ============================================================================

export function generateServiceSchema(
  serviceName: string,
  description: string,
  serviceType: string,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    serviceType: serviceType,
    provider: {
      '@id': `${BUSINESS_INFO.url}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${BUSINESS_INFO.url}${url}`,
    },
  };
}

// ============================================================================
// HELPER: Inject Schema into Head
// ============================================================================

export function injectSchema(schema: object) {
  if (typeof window === 'undefined') return;
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}

export function injectSchemas(schemas: object[]) {
  schemas.forEach((schema) => injectSchema(schema));
}

// ============================================================================
// PRICING INTEGRATION EXPORTS
// ============================================================================

/**
 * For pricing-specific schemas, use these functions:
 * 
 * RECOMMENDED (uses centralized pricing data):
 * - generatePricingComparisonSchema('homepage')  // For homepage pricing section
 * - generatePricingComparisonSchema('full')      // For pricing page
 * - generatePricingComparisonSchema('templates') // For template pages
 * - generatePricingComparisonSchema('parser')    // For parser page
 * - generateSoftwareApplicationSchema()          // For global app schema (auto-pricing)
 * 
 * LEGACY (manual data - avoid if possible):
 * - generateProductComparisonSchema([...])       // Use only for non-pricing comparisons
 * 
 * Pricing data source: @/app/lib/pricingConfig.ts
 */
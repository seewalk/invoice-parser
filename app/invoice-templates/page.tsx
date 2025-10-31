'use client';

import React, { useMemo } from 'react';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { useScroll, useTransform } from 'framer-motion';
import { 
  allIndustries, 
  getIndustryStats,
  getAllIndustriesWithPremium,
  getTotalTemplateCount,
  type InvoiceTemplate 
} from '@/app/lib/invoiceTemplateLibrary';
import {
  getIndustryStats as getNewIndustryStats,
  getIndustriesByPopularity,
} from '@/app/lib/invoice-templates/invoiceTemplateIndustries';
import { BUSINESS_INFO, generateBreadcrumbSchema } from '@/app/lib/schemaConfig';

// Import invoice templates components
import  BenefitsSection  from '../components/invoice-templates/BenefitsSection';
import HeroSection from '../components/invoice-templates/HeroSection';
import IndustryGrid from '../components/invoice-templates/IndustryGrid';

// Import first industry section immediately (above fold)
import { IndustrySection } from '@/app/components/invoice-templates';

// Lazy load below-fold industry sections with skeletons
const LazyIndustrySection = dynamic(
  () => import('@/app/components/invoice-templates').then(mod => ({ default: mod.IndustrySection })),
  { 
    loading: () => import('@/app/components/invoice-templates').then(mod => <mod.IndustrySectionSkeleton cardCount={3} />),
    ssr: true // Maintain SEO
  }
);

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getTemplateSlug(template: InvoiceTemplate): string {
  return slugify(template.keywords[0]);
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function InvoiceTemplatesPage() {
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  // Combine free + premium templates for display (legacy)
  const allIndustriesWithPremium = useMemo(() => getAllIndustriesWithPremium(), []);
  const stats = getIndustryStats();
  
  // Calculate totals (free templates only for hero stats, premium shown separately)
  const freeTemplateCount = getTotalTemplateCount(false);
  const totalTemplateCount = getTotalTemplateCount(true);
  const premiumTemplateCount = totalTemplateCount - freeTemplateCount;
  
  // NEW: Get industries from invoiceTemplateIndustries.ts
  const newIndustryStats = useMemo(() => getNewIndustryStats(), []);
  const sortedIndustries = useMemo(() => getIndustriesByPopularity(), []);
  
  // Memoize industry entries for performance (includes premium)
  const industryEntries = useMemo(() => Object.entries(allIndustriesWithPremium), [allIndustriesWithPremium]);
  
  // Split industries: first one immediately, rest lazy loaded
  const [firstIndustry, ...restIndustries] = industryEntries;

  // Collect all templates for schema (including premium)
  const allTemplates: Array<{name: string; slug: string}> = [];
  for (const [industryId, industry] of Object.entries(allIndustriesWithPremium)) {
    for (const category of Object.values(industry.categories)) {
      for (const subCategory of Object.values(category.subCategories)) {
        for (const template of subCategory.templates) {
          allTemplates.push({
            name: template.name,
            slug: getTemplateSlug(template)
          });
        }
      }
    }
  }

  // Generate template library schemas
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Free UK Invoice Templates by Industry',
    description: `Professional, industry-specific invoice templates for UK businesses. ${freeTemplateCount} free templates, ${totalTemplateCount} total with premium.`,
    url: `${BUSINESS_INFO.url}/invoice-templates`,
    numberOfItems: totalTemplateCount
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: totalTemplateCount,
    itemListElement: allTemplates.slice(0, 50).map((template, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'DigitalDocument',
        name: template.name,
        url: `${BUSINESS_INFO.url}/invoice-templates/${template.slug}`,
        fileFormat: ['application/msword', 'application/pdf'],
        provider: {
          '@id': `${BUSINESS_INFO.url}/#organization`
        }
      }
    }))
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Invoice Templates', url: '/invoice-templates' }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Server-Rendered Template Library Schemas */}
      <Script
        id="template-collection"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema)
        }}
        strategy="beforeInteractive"
      />
      <Script
        id="template-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema)
        }}
        strategy="beforeInteractive"
      />
      <Script
        id="template-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
        strategy="beforeInteractive"
      />
      
      {/* Hero Section */}
      <HeroSection
        opacity={opacity}
        scale={scale}
        freeTemplateCount={freeTemplateCount}
        premiumTemplateCount={premiumTemplateCount}
        totalIndustries={newIndustryStats.totalIndustries}
        totalCategories={newIndustryStats.totalCategories}
      />

      {/* Industry Grid Navigation */}
      <IndustryGrid
        industries={sortedIndustries}
        totalIndustries={newIndustryStats.totalIndustries}
        totalTemplates={newIndustryStats.totalTemplates}
      />

      {/* Templates by Industry - Legacy System */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* First Industry Section - Load Immediately (Above Fold) */}
          {firstIndustry && (
            <IndustrySection 
              key={firstIndustry[0]} 
              industryId={firstIndustry[0]} 
              industry={firstIndustry[1]}
              getTemplateSlug={getTemplateSlug}
            />
          )}
          
          {/* Remaining Industry Sections - Lazy Loaded (Below Fold) */}
          {restIndustries.map(([key, industry]) => (
            <LazyIndustrySection 
              key={key} 
              industryId={key} 
              industry={industry}
              getTemplateSlug={getTemplateSlug}
            />
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <BenefitsSection />

    </div>
  );
}
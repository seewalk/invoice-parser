'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { 
  allIndustries, 
  getIndustryStats,
  getAllIndustriesWithPremium,
  getTotalTemplateCount,
  type InvoiceTemplate 
} from '@/app/lib/invoiceTemplateLibrary';
import { 
  Search, 
  Download, 
  FileText, 
  TrendingUp, 
  Users,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import PageHero from '@/app/components/PageHero';
import { BUSINESS_INFO, generateBreadcrumbSchema } from '@/app/lib/schemaConfig';

// Import first industry section immediately (above fold)
import { IndustrySection } from '@/app/components/template-landing';

// Lazy load below-fold industry sections with skeletons
const LazyIndustrySection = dynamic(
  () => import('@/app/components/template-landing').then(mod => ({ default: mod.IndustrySection })),
  { 
    loading: () => import('@/app/components/template-landing').then(mod => <mod.IndustrySectionSkeleton cardCount={3} />),
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
  // Combine free + premium templates for display
  const allIndustriesWithPremium = useMemo(() => getAllIndustriesWithPremium(), []);
  const stats = getIndustryStats();
  
  // Calculate totals (free templates only for hero stats, premium shown separately)
  const freeTemplateCount = getTotalTemplateCount(false);
  const totalTemplateCount = getTotalTemplateCount(true);
  const premiumTemplateCount = totalTemplateCount - freeTemplateCount;
  const totalSearchVolume = Object.values(stats).reduce((sum, stat) => sum + stat.totalSearchVolume, 0);
  
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
      
      <PageHero
        badge="Free Invoice Templates UK"
        title={<>Free UK Invoice Templates<br /><span className="gradient-text"> By Industry</span></>}
        description={`Download professional, industry-specific invoice templates for UK businesses. ${freeTemplateCount} free templates (with watermark) or upgrade to Pro for ${totalTemplateCount} total templates. Available in Word, Excel, and PDF formats.`}
        size="default"
      >
        <nav className="flex justify-center items-center gap-2 text-sm text-slate-600 mb-6">
          <Link href="/" className="hover:text-indigo-600 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Invoice Templates</span>
        </nav>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <div className="bg-white rounded-xl px-6 py-3 shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-1">{freeTemplateCount}</div>
            <div className="text-sm text-gray-600">Free Templates</div>
          </div>
          <div className="bg-white rounded-xl px-6 py-3 shadow-lg border-2 border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-1">+{premiumTemplateCount}</div>
            <div className="text-sm text-gray-600">Premium Templates (Pro)</div>
          </div>
          <div className="bg-white rounded-xl px-6 py-3 shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-1">{Object.keys(allIndustriesWithPremium).length}</div>
            <div className="text-sm text-gray-600">Industries Covered</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
          <div className="flex items-start gap-3 text-left">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">
                100% Free Forever
              </h3>
              <p className="text-sm text-slate-600">
                No sign-up, no credit card, no hidden fees
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">
                UK-Compliant
              </h3>
              <p className="text-sm text-slate-600">
                VAT-ready, HMRC-approved formats
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">
                Easy Customization
              </h3>
              <p className="text-sm text-slate-600">
                Editable Word, Excel, PDF templates
              </p>
            </div>
          </div>
        </div>

        {/* Quick Industry Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Browse by Industry
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {industryEntries.map(([key, industry]) => (
              <a
                key={key}
                href={`#${key}`}
                className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition group"
              >
                <span className="text-3xl">{industry.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition">
                    {industry.name}
                  </div>
                  <div className="text-xs text-slate-600">
                    {stats[key]?.totalTemplates || 0} templates
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </PageHero>

      {/* Templates by Industry */}
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

      {/* Why Use Our Templates Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why Use Our Invoice Templates?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Professional, compliant, and easy to customize for UK businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Industry-Specific
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Templates designed for your specific industry with pre-filled fields 
                and industry standards (CIS, Gas Safe, NICEIC, VAT compliance)
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                HMRC Compliant
              </h3>
              <p className="text-slate-600 leading-relaxed">
                All templates meet HMRC requirements for invoicing, including VAT 
                registration, UTR numbers, and proper business details
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Multiple Formats
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Download in Word (.docx), Excel (.xlsx), or PDF formats. 
                Easily edit, customize, and send to clients
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Professional Design
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Clean, modern layouts that make your business look professional. 
                Impress clients with well-designed invoices
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Get Paid Faster
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Clear payment terms, bank details, and professional presentation 
                help you get paid 2x faster
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Used by Thousands
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Join 10,000+ UK freelancers, contractors, and small businesses 
                using our templates every month
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Need More Than Just Templates?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
            Try our AI-powered invoice processing automation. Extract data from 
            supplier invoices automatically with 99.2% accuracy. Save 15+ hours weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/parser"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition shadow-xl"
            >
              Try Invoice Parser
            </Link>
            <Link
              href="/pricing"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}
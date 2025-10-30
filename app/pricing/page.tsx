/**
 * ============================================================================
 * PRICING PAGE
 * ============================================================================
 * 
 * Main pricing page showing plans, feature comparison, and FAQs.
 * Refactored to use UI components and centralized data from lib files.
 */

'use client';

import Script from 'next/script';
import PageHero from '../components/PageHero';
import PricingComparisonCard from '../components/monetization/PricingComparisonCard';
import { EnterpriseCTA } from '../components/CTASectionBlack';
import { 
  generateProductComparisonSchema,
  generateBreadcrumbSchema 
} from '../lib/schemaConfig';
import { FeatureComparisonTable } from '../components/pricing/FeatureComparisonTable';
import { PricingValueSection } from '../components/pricing/PricingValueSection';

export default function PricingPage() {
  // Generate pricing schemas for SEO
  const pricingSchema = generateProductComparisonSchema([
    {
      name: 'Free',
      description: 'All 11 templates with watermark',
      price: '0',
      features: ['11 invoice templates', 'PDF download with watermark', 'UK VAT compliant'],
      url: '/pricing'
    },
    {
      name: 'Premium',
      description: 'All templates without watermark',
      price: '9.99',
      features: ['11 templates (no watermark)', 'Unlimited downloads', 'Custom branding', '24hr support'],
      url: '/pricing'
    },
    {
      name: 'Pro',
      description: 'Premium + AI parser + automation',
      price: '29.99',
      features: ['Everything in Premium', 'AI parser (200/month)', 'Team collaboration', 'Priority support'],
      url: '/pricing'
    }
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Pricing', url: '/pricing' }
  ]);

  // CTA handlers
  const handleFreeCTA = () => {
    window.location.href = '/invoice-templates';
  };

  const handlePremiumCTA = () => {
    alert('Premium subscription coming soon! Get notified when payment integration is ready.');
  };

  const handleProCTA = () => {
    alert('Pro subscription coming soon! Get notified when payment integration is ready.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* SEO Schemas */}
      <Script
        id="pricing-comparison"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingSchema)
        }}
        strategy="beforeInteractive"
      />
      <Script
        id="pricing-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
        strategy="beforeInteractive"
      />

      {/* Hero Section */}
      <PageHero
        badge="Simple, Transparent Pricing"
        title={
          <>
            Start Free, <span className="gradient-text">Upgrade When Ready</span>
          </>
        }
        description="All 11 invoice templates available for free with watermark. Upgrade anytime for watermark-free downloads and advanced features. No credit card required to start."
        size="default"
      />

      {/* Main Content */}
      <div className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Three-Tier Pricing Comparison */}
          <div className="mb-16">
            <PricingComparisonCard 
              emphasize="premium"
              compact={false}
              onFreeCTA={handleFreeCTA}
              onPremiumCTA={handlePremiumCTA}
              onProCTA={handleProCTA}
            />
          </div>

          {/* Value Proposition with Features Grid */}
          <PricingValueSection />

          {/* Feature Comparison Table */}
          <FeatureComparisonTable />

          {/* Enterprise CTA */}
          <EnterpriseCTA />

         
        </div>

      </div>
    </div>
  );
}

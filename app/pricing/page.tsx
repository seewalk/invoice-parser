'use client';

import { useState } from 'react';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { CheckCircle, X, ArrowRight, Rocket } from 'lucide-react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import FinalCTASection from '../components/FinalCTASection';
import PageHero from '../components/PageHero';
import PricingComparisonCard from '../components/monetization/PricingComparisonCard';
import { 
  generateProductComparisonSchema,
  generateBreadcrumbSchema 
} from '../lib/schemaConfig';

export default function PricingPage() {
  // Generate pricing schemas (server-side)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Server-Rendered Pricing Schemas */}
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

      <div className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Three-Tier Pricing Comparison */}
          <div className="mb-16">
            <PricingComparisonCard 
              emphasize="premium"
              compact={false}
              onFreeCTA={() => {
                window.location.href = '/invoice-templates';
              }}
              onPremiumCTA={() => {
                alert('Premium subscription coming soon! Get notified when payment integration is ready.');
              }}
              onProCTA={() => {
                alert('Pro subscription coming soon! Get notified when payment integration is ready.');
              }}
            />
          </div>

          {/* Value Proposition Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional invoice templates designed specifically for UK businesses. 
              VAT compliant, industry-specific fields, and ready to use in minutes.
            </p>
          </div>

          {/* Feature Comparison Grid */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Compare Plans
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Features</th>
                    <th className="text-center py-4 px-4 text-gray-700 font-semibold">Free</th>
                    <th className="text-center py-4 px-4 text-blue-700 font-semibold">Premium</th>
                    <th className="text-center py-4 px-4 text-purple-700 font-semibold">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { feature: 'Invoice Templates', free: '11', premium: '11', pro: '11' },
                    { feature: 'Watermark', free: 'Yes', premium: 'No', pro: 'No' },
                    { feature: 'PDF Downloads', free: 'Unlimited', premium: 'Unlimited', pro: 'Unlimited' },
                    { feature: 'Custom Branding', free: '—', premium: 'Basic (logo)', pro: 'Advanced' },
                    { feature: 'Invoice History', free: '—', premium: '30 days', pro: '1 year' },
                    { feature: 'Support', free: 'Community', premium: '24hr email', pro: '1hr priority' },
                    { feature: 'AI Invoice Parser', free: '—', premium: '—', pro: '200/month' },
                    { feature: 'Team Collaboration', free: '—', premium: '—', pro: '3 users' },
                    { feature: 'Automation', free: '—', premium: '—', pro: '✓' },
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-gray-900 font-medium">{row.feature}</td>
                      <td className="py-4 px-4 text-center text-gray-600">{row.free}</td>
                      <td className="py-4 px-4 text-center text-blue-700 font-semibold">{row.premium}</td>
                      <td className="py-4 px-4 text-center text-purple-700 font-semibold">{row.pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Enterprise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-12 text-white text-center mb-16"
          >
            <Rocket className="w-16 h-16 mx-auto mb-4 text-accent-400" />
            <h2 className="text-3xl font-bold mb-4">Enterprise Solutions</h2>
            <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
              Unlimited invoices • Custom ML training • White-label options • Dedicated support • SLA guarantees
            </p>
            <button className="bg-accent-400 text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent-500 transition-all inline-flex items-center space-x-2">
              <span>Contact Sales</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Pricing FAQs</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Can I change plans later?',
                  a: 'Yes! You can upgrade or downgrade at any time. Changes take effect immediately.',
                },
                {
                  q: 'What happens if I exceed my invoice limit?',
                  a: "We'll notify you when you're approaching your limit. You can upgrade or purchase additional invoices as needed.",
                },
                {
                  q: 'Is there a setup fee?',
                  a: 'No setup fees. Ever. Just pick a plan and start processing invoices immediately.',
                },
                {
                  q: 'Do you offer refunds?',
                  a: "Yes, we offer a 30-day money-back guarantee if you're not satisfied.",
                },
              ].map((faq) => (
                <div key={faq.q} className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <FinalCTASection variant="pricing" />

      </div>
    </div>
  );
}

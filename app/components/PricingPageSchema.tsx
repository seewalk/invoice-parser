/**
 * Pricing Page Schema Component
 * 
 * Generates Product Comparison schema for the pricing page.
 * Shows all pricing plans and their features for Google Shopping/comparison.
 */

'use client';

import { useEffect } from 'react';
import { generateProductComparisonSchema, generateBreadcrumbSchema } from '../lib/schemaConfig';

export default function PricingPageSchema() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if already injected
    const existing = document.querySelectorAll('script[id^="pricing-page-"]');
    if (existing.length >= 2) return;

    // Define pricing plans for schema
    const pricingPlans = [
      {
        name: 'Free Plan',
        description: 'Perfect for small businesses getting started with invoice automation',
        price: '0',
        features: [
          '10 invoices per month',
          'AI-powered OCR extraction',
          'PDF and image support',
          'Email support',
          'Web interface access',
        ],
        url: '/pricing',
      },
      {
        name: 'Professional Plan',
        description: 'Ideal for growing businesses needing unlimited processing',
        price: '29',
        features: [
          'Unlimited invoices',
          'AI-powered OCR extraction',
          'Multi-page PDF support',
          'Batch processing',
          'API access',
          'QuickBooks & Xero integration',
          'Priority email support',
          'Custom templates',
        ],
        url: '/pricing',
      },
      {
        name: 'Individual Template',
        description: 'One-time purchase for watermark-free templates',
        price: '9.99',
        features: [
          'Single template purchase',
          'Remove watermark',
          'Lifetime access',
          'Professional design',
          'Instant download',
        ],
        url: '/pricing',
      },
    ];

    // Generate product comparison schema
    const comparisonSchema = generateProductComparisonSchema(pricingPlans);

    // Breadcrumb schema
    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Pricing', url: '/pricing' },
    ]);

    // Inject comparison schema
    const comparisonScript = document.createElement('script');
    comparisonScript.id = 'pricing-page-comparison';
    comparisonScript.type = 'application/ld+json';
    comparisonScript.text = JSON.stringify(comparisonSchema);
    document.head.appendChild(comparisonScript);

    // Inject breadcrumb schema
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.id = 'pricing-page-breadcrumb';
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    return () => {
      // Don't remove on cleanup
    };
  }, []);

  return null;
}
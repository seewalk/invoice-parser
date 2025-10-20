/**
 * Invoice Generator Schema Component
 * 
 * Generates WebApplication and ItemList schemas for the invoice generator page.
 * Shows free tool and available templates.
 */

'use client';

import { useEffect } from 'react';
import { generateBreadcrumbSchema, generateHowToSchema, BUSINESS_INFO } from '../lib/schemaConfig';

interface InvoiceGeneratorSchemaProps {
  templateCount: number;
}

export default function InvoiceGeneratorSchema({ 
  templateCount 
}: InvoiceGeneratorSchemaProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if already injected
    const existing = document.querySelectorAll('script[id^="invoice-generator-"]');
    if (existing.length >= 3) return;

    // WebApplication schema (free tool)
    const webAppSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Free UK Invoice Generator',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Invoice Generator',
      operatingSystem: 'Web Browser',
      description: `Generate professional invoices online with our free invoice generator. Choose from ${templateCount}+ industry-specific templates and customize for your business needs.`,
      
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
      },
      
      featureList: [
        'Professional invoice templates',
        'Industry-specific customization',
        'Instant PDF download',
        'No registration required',
        'UK VAT compliance',
        'HMRC-approved formats',
        'Multiple file formats',
        'Free forever',
      ],
      
      author: {
        '@id': `${BUSINESS_INFO.url}/#organization`,
      },
      
      provider: {
        '@id': `${BUSINESS_INFO.url}/#organization`,
      },
      
      url: `${BUSINESS_INFO.url}/invoice-generator`,
      browserRequirements: 'Requires JavaScript. Modern browser (Chrome, Firefox, Safari, Edge)',
      inLanguage: 'en-GB',
    };

    // HowTo schema for using the generator
    const howToSchema = generateHowToSchema(
      'How to Generate an Invoice Online',
      'Create professional invoices in 3 simple steps with our free invoice generator',
      [
        {
          name: 'Choose Template',
          text: 'Select an industry-specific invoice template from our library of professional designs',
        },
        {
          name: 'Customize Details',
          text: 'Fill in your business information, client details, line items, and pricing',
        },
        {
          name: 'Download Invoice',
          text: 'Generate and download your invoice as PDF, Word, or Excel instantly',
        },
      ]
    );

    // Breadcrumb schema
    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Invoice Generator', url: '/invoice-generator' },
    ]);

    // Inject WebApplication schema
    const webAppScript = document.createElement('script');
    webAppScript.id = 'invoice-generator-webapp';
    webAppScript.type = 'application/ld+json';
    webAppScript.text = JSON.stringify(webAppSchema);
    document.head.appendChild(webAppScript);

    // Inject HowTo schema
    const howToScript = document.createElement('script');
    howToScript.id = 'invoice-generator-howto';
    howToScript.type = 'application/ld+json';
    howToScript.text = JSON.stringify(howToSchema);
    document.head.appendChild(howToScript);

    // Inject breadcrumb schema
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.id = 'invoice-generator-breadcrumb';
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    return () => {
      // Don't remove on cleanup
    };
  }, [templateCount]);

  return null;
}
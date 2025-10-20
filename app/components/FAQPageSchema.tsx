/**
 * FAQ Page Schema Component
 * 
 * Generates comprehensive FAQPage schema for the /faq route.
 * Includes all FAQs for maximum SEO value.
 */

'use client';

import { useEffect } from 'react';
import { generateFAQSchema, generateBreadcrumbSchema } from '../lib/schemaConfig';
import comprehensiveFAQs from '../lib/faqData';

export default function FAQPageSchema() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if already injected
    const existing = document.querySelectorAll('script[id^="faq-page-"]');
    if (existing.length >= 2) return;

    // Generate FAQ schema with ALL FAQs
    const faqSchema = generateFAQSchema(
      comprehensiveFAQs.map(faq => ({
        question: faq.question,
        answer: faq.answer
      }))
    );

    // Breadcrumb schema
    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'FAQ', url: '/faq' }
    ]);

    // Inject FAQ schema
    const faqScript = document.createElement('script');
    faqScript.id = 'faq-page-schema';
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    // Inject breadcrumb schema
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.id = 'faq-page-breadcrumb';
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    return () => {
      // Don't remove on cleanup
    };
  }, []);

  return null;
}

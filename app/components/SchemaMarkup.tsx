'use client';

import { useEffect } from 'react';
import { 
  softwareApplicationSchema, 
  generateFAQSchema,
  generateBreadcrumbSchema 
} from '../lib/schemaConfig';
import { getFAQsByCategory } from '../lib/faqData';

/**
 * Homepage Schema Markup Component
 * 
 * Injects homepage-specific schemas:
 * - Software Application (product info)
 * - FAQ (from Invoice Automation category)
 * - Breadcrumb (for AI summaries)
 * 
 * Organization and Website schemas are in GlobalSchema (layout.tsx)
 */
export default function SchemaMarkup() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Check if schemas already exist to avoid duplicates
    const existingSchemas = document.querySelectorAll('script[id^="homepage-"]');
    if (existingSchemas.length >= 3) return; // Already injected

    // Get FAQs for schema
    const faqs = getFAQsByCategory('Invoice Automation').slice(0, 10);
    const faqSchema = generateFAQSchema(
      faqs.map(faq => ({
        question: faq.question,
        answer: faq.answer
      }))
    );

    // Breadcrumb for homepage
    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', url: '/' }
    ]);

    // Inject software application schema
    const softwareScript = document.createElement('script');
    softwareScript.id = 'homepage-software';
    softwareScript.type = 'application/ld+json';
    softwareScript.text = JSON.stringify(softwareApplicationSchema);
    document.head.appendChild(softwareScript);

    // Inject FAQ schema
    const faqScript = document.createElement('script');
    faqScript.id = 'homepage-faq';
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    // Inject breadcrumb schema
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.id = 'homepage-breadcrumb';
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    // Cleanup function
    return () => {
      // Don't remove on cleanup as they should persist for SEO
    };
  }, []);

  // This component renders nothing visible
  return null;
}
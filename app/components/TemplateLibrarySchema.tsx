/**
 * Template Library Schema Component
 * 
 * Generates CollectionPage and ItemList schemas for the template library.
 * Shows all invoice templates for Google Shopping and discovery.
 */

'use client';

import { useEffect } from 'react';
import { generateBreadcrumbSchema, BUSINESS_INFO } from '../lib/schemaConfig';

interface TemplateLibrarySchemaProps {
  totalTemplates: number;
  templates?: Array<{
    name: string;
    description: string;
    slug: string;
  }>;
}

export default function TemplateLibrarySchema({ 
  totalTemplates,
  templates = []
}: TemplateLibrarySchemaProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if already injected
    const existing = document.querySelectorAll('script[id^="template-library-"]');
    if (existing.length >= 3) return;

    // CollectionPage schema
    const collectionSchema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Free UK Invoice Templates by Industry',
      description: 'Download professional, industry-specific invoice templates for UK businesses. Free templates for restaurants, photographers, builders, freelancers, and more.',
      url: `${BUSINESS_INFO.url}/invoice-templates`,
      numberOfItems: totalTemplates,
      publisher: {
        '@id': `${BUSINESS_INFO.url}/#organization`,
      },
      about: {
        '@type': 'Thing',
        name: 'Invoice Templates',
        description: 'Professional invoice templates for UK businesses',
      },
      inLanguage: 'en-GB',
    };

    // ItemList schema for templates (if provided)
    const itemListSchema = templates.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Invoice Templates Collection',
      itemListElement: templates.slice(0, 50).map((template, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'DigitalDocument',
          name: template.name,
          description: template.description,
          url: `${BUSINESS_INFO.url}/invoice-templates/${template.slug}`,
          fileFormat: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'],
        },
      })),
    } : null;

    // Breadcrumb schema
    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Invoice Templates', url: '/invoice-templates' },
    ]);

    // Inject CollectionPage schema
    const collectionScript = document.createElement('script');
    collectionScript.id = 'template-library-collection';
    collectionScript.type = 'application/ld+json';
    collectionScript.text = JSON.stringify(collectionSchema);
    document.head.appendChild(collectionScript);

    // Inject ItemList schema if we have templates
    if (itemListSchema) {
      const itemListScript = document.createElement('script');
      itemListScript.id = 'template-library-itemlist';
      itemListScript.type = 'application/ld+json';
      itemListScript.text = JSON.stringify(itemListSchema);
      document.head.appendChild(itemListScript);
    }

    // Inject breadcrumb schema
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.id = 'template-library-breadcrumb';
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    return () => {
      // Don't remove on cleanup
    };
  }, [totalTemplates, templates]);

  return null;
}
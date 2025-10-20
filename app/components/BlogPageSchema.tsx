/**
 * Blog Page Schema Component
 * 
 * Generates ItemList schema for the main blog page listing all articles.
 * Shows all blog posts for Google discovery.
 */

'use client';

import { useEffect } from 'react';
import { generateBreadcrumbSchema, BUSINESS_INFO } from '../lib/schemaConfig';
import { getAllBlogArticles } from '../lib/blogData';

export default function BlogPageSchema() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if already injected
    const existing = document.querySelectorAll('script[id^="blog-page-"]');
    if (existing.length >= 2) return;

    // Get all articles for ItemList
    const articles = getAllBlogArticles();

    // ItemList schema for blog collection
    const itemListSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Invoice Processing & Automation Blog',
      description: 'Expert insights on invoice parsing, OCR technology, and AP automation',
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          '@id': `${BUSINESS_INFO.url}/blog/${article.slug}`,
          headline: article.title,
          description: article.excerpt,
          datePublished: article.publishedDate,
          author: {
            '@type': 'Person',
            name: article.author,
          },
          articleSection: article.category,
        },
      })),
    };

    // Breadcrumb schema
    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
    ]);

    // Inject ItemList schema
    const itemListScript = document.createElement('script');
    itemListScript.id = 'blog-page-itemlist';
    itemListScript.type = 'application/ld+json';
    itemListScript.text = JSON.stringify(itemListSchema);
    document.head.appendChild(itemListScript);

    // Inject breadcrumb schema
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.id = 'blog-page-breadcrumb';
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    return () => {
      // Don't remove on cleanup
    };
  }, []);

  return null;
}

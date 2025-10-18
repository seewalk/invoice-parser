'use client';

import { useEffect } from 'react';
import { homepageSchema } from '../metadata';

/**
 * Client component to inject schema markup into document head
 * This approach maintains SSR benefits while keeping page as 'use client'
 */
export default function SchemaMarkup() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Check if schemas already exist to avoid duplicates
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    if (existingSchemas.length >= 3) return; // Already injected

    // Inject software application schema
    const softwareScript = document.createElement('script');
    softwareScript.type = 'application/ld+json';
    softwareScript.text = JSON.stringify(homepageSchema.softwareApplication);
    document.head.appendChild(softwareScript);

    // Inject FAQ schema
    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(homepageSchema.faqPage);
    document.head.appendChild(faqScript);

    // Inject organization schema
    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.text = JSON.stringify(homepageSchema.organization);
    document.head.appendChild(orgScript);

    // Cleanup function to remove schemas on unmount
    return () => {
      // Don't remove on cleanup as they should persist for SEO
    };
  }, []);

  // This component renders nothing visible
  return null;
}

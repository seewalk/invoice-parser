import { MetadataRoute } from 'next';

/**
 * Robots.txt Configuration for Elektroluma
 * 
 * This file tells search engines:
 * 1. What they can and cannot crawl
 * 2. Where to find your sitemap
 * 3. Special rules for AI crawlers (ChatGPT, Perplexity, etc.)
 * 
 * Automatically served at /robots.txt
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ========================================================================
      // DEFAULT RULES - For all search engines
      // ========================================================================
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',              // Don't crawl API routes
          '/account/',          // Don't crawl user account pages
          '/_next/',            // Don't crawl Next.js internals
          '/sign-in',           // Don't index sign-in page
          '/sign-up',           // Don't index sign-up page
          '/reset-password',    // Don't index password reset
          '/*.json',            // Don't crawl JSON files directly
          '/admin',             // Don't crawl admin routes (if any)
        ],
      },

      // ========================================================================
      // GOOGLE BOT - Allow everything public
      // ========================================================================
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/account/',
          '/_next/',
        ],
      },

      // ========================================================================
      // OPENAI BOT (ChatGPT) - Allow full access for AI search
      // ========================================================================
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: [
          '/account/',          // Protect user data
          '/api/',              // Protect API routes
        ],
      },

      // ========================================================================
      // PERPLEXITY AI BOT - Allow full access for AI search
      // ========================================================================
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: [
          '/account/',
          '/api/',
        ],
      },

      // ========================================================================
      // ANTHROPIC BOT (Claude) - Allow full access for AI search
      // ========================================================================
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: [
          '/account/',
          '/api/',
        ],
      },

      // ========================================================================
      // BING BOT - Allow full access
      // ========================================================================
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/account/',
        ],
      },

      // ========================================================================
      // SEMRUSH BOT - Block (they crawl for competitor analysis)
      // ========================================================================
      {
        userAgent: 'SemrushBot',
        disallow: '/',
      },

      // ========================================================================
      // AHREFS BOT - Block (they crawl for competitor analysis)
      // ========================================================================
      {
        userAgent: 'AhrefsBot',
        disallow: '/',
      },

      // ========================================================================
      // SCREAMING FROG - Block (SEO crawler tool)
      // ========================================================================
      {
        userAgent: 'Screaming Frog SEO Spider',
        disallow: '/',
      },
    ],

    // ==========================================================================
    // SITEMAP LOCATION
    // ==========================================================================
    sitemap: 'https://elektroluma.co.uk/sitemap.xml',
  };
}

/**
 * 🎯 Why These Rules?
 * 
 * 1. ALLOW public content (templates, blog, parser info)
 * 2. BLOCK user-specific content (accounts, API)
 * 3. WELCOME AI crawlers (ChatGPT, Perplexity) for AI search visibility
 * 4. BLOCK competitor analysis bots (Semrush, Ahrefs) to protect strategy
 * 5. PROVIDE sitemap for efficient crawling
 * 
 * 📈 SEO Impact:
 * - Helps Google index your site faster
 * - Prevents wasted crawl budget on private pages
 * - Enables AI search engines to cite your content
 * - Protects sensitive routes from indexing
 */

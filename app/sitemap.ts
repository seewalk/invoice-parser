import { MetadataRoute } from 'next';

/**
 * Dynamic Sitemap Generation for Elektroluma
 * 
 * This generates an XML sitemap that helps search engines crawl your site efficiently.
 * It includes:
 * - Static pages (homepage, parser, pricing, etc.)
 * - Dynamic template pages
 * - Blog posts
 * - FAQ pages
 * 
 * Google will automatically discover this at /sitemap.xml
 */

// Import your data fetching functions
// Note: Update these imports based on your actual file structure
async function getAllTemplates() {
  // TODO: Import from your actual template library
  // import { getAllTemplates } from './lib/invoiceTemplateLibrary';
  // For now, return empty array - you'll need to implement this
  return [];
}

async function getAllBlogPosts() {
  // TODO: Import from your actual blog data
  // import { getAllBlogPosts } from './lib/blogData';
  return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://elektroluma.co.uk';
  const currentDate = new Date();

  // ============================================================================
  // STATIC PAGES - High priority pages that don't change often
  // ============================================================================
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/parser`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/invoice-generator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/invoice-templates`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sign-up`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sign-in`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // ============================================================================
  // DYNAMIC TEMPLATE PAGES
  // ============================================================================
  const templates = await getAllTemplates();
  const templateRoutes: MetadataRoute.Sitemap = templates.map((template: any) => ({
    url: `${baseUrl}/invoice-templates/${template.slug}`,
    lastModified: template.updatedAt || currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // ============================================================================
  // BLOG POSTS
  // ============================================================================
  const blogPosts = await getAllBlogPosts();
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt || post.updatedAt || currentDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // ============================================================================
  // UK INVOICE GUIDES (if you have them)
  // ============================================================================
  const guideRoutes: MetadataRoute.Sitemap = [
    // Add your guide pages here
    // Example:
    // {
    //   url: `${baseUrl}/uk-invoice-guide/vat-invoices`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly',
    //   priority: 0.7,
    // },
  ];

  // ============================================================================
  // COMBINE ALL ROUTES
  // ============================================================================
  return [
    ...staticRoutes,
    ...templateRoutes,
    ...blogRoutes,
    ...guideRoutes,
  ];
}

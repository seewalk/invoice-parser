/**
 * ============================================================================
 * DYNAMIC OG IMAGE GENERATION FOR BLOG POSTS
 * ============================================================================
 * 
 * Automatically generates Open Graph images for each blog post.
 * 
 * Features:
 * - Generated on-demand (no storage needed)
 * - Automatically cached on Vercel Edge Network
 * - Consistent branding across all posts
 * - Uses Inter font (matching site design)
 * - Optimized for social sharing (1200x630px)
 * 
 * URL Pattern:
 * https://yoursite.com/blog/[slug]/opengraph-image
 */

import { ImageResponse } from 'next/og';
import { getBlogArticleBySlug } from '@/app/lib/blogData';

// Image metadata
export const runtime = 'edge';
export const alt = 'Elektroluma Blog Post';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  // Get blog post data
  const article = getBlogArticleBySlug(params.slug);
  
  if (!article) {
    // Fallback for invalid slugs
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1e40af',
          }}
        >
          <div style={{ fontSize: 48, color: 'white' }}>
            Article Not Found
          </div>
        </div>
      ),
      { ...size }
    );
  }

  // Truncate title if too long (max 100 chars for readability)
  const displayTitle = article.title.length > 100 
    ? article.title.substring(0, 97) + '...'
    : article.title;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '80px',
        }}
      >
        {/* Header with Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 40,
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '-0.02em',
            }}
          >
            ⚡
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 36,
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '-0.02em',
            }}
          >
            Elektroluma
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '1000px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 64,
              fontWeight: 'bold',
              color: 'white',
              lineHeight: 1.2,
              letterSpacing: '-0.03em',
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            }}
          >
            {displayTitle}
          </div>
        </div>

        {/* Footer with Category and Meta */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Category Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '16px 24px',
              borderRadius: '12px',
              fontSize: 24,
              fontWeight: '600',
              color: 'white',
            }}
          >
            {article.categoryIcon} {article.category}
          </div>

          {/* Reading Time */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: 24,
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: '500',
            }}
          >
            📖 {article.readingTime} min read
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
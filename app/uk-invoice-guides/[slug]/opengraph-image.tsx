/**
 * ============================================================================
 * DYNAMIC OG IMAGE FOR UK INVOICE GUIDE ARTICLES
 * ============================================================================
 * 
 * Generates OG images for individual UK invoice guide articles.
 * Shows guide title, category, and UK focus.
 */

import { ImageResponse } from 'next/og';
import { getGuideBySlug } from '../../lib/ukInvoiceGuidesData';
import { COLORS, GRADIENTS, TYPOGRAPHY, SPACING, BRAND, STYLE_PRESETS } from '../../lib/ogImageStyles';

export const runtime = 'edge';
export const alt = 'UK Invoice Guide';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  
  if (!guide) {
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
            backgroundColor: COLORS.primary[600],
          }}
        >
          <div style={{ fontSize: 48, color: COLORS.white }}>
            Guide Not Found
          </div>
        </div>
      ),
      { ...size }
    );
  }

  // Truncate title if too long
  const displayTitle = guide.title.length > 80 
    ? guide.title.substring(0, 77) + '...'
    : guide.title;

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
          backgroundColor: COLORS.white,
          backgroundImage: GRADIENTS.primaryPurple,
          padding: `${SPACING['5xl']}px`,
        }}
      >
        {/* Header with Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: `${SPACING.md}px`,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 48,
            }}
          >
            {BRAND.emoji}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 36,
              fontWeight: 'bold',
              color: COLORS.white,
              letterSpacing: '-0.02em',
            }}
          >
            {BRAND.name}
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: `${SPACING.xl}px`,
            maxWidth: '1000px',
          }}
        >
          {/* UK Flag Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: `${SPACING.sm}px`,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.md}px ${SPACING.lg}px`,
              borderRadius: `${SPACING.md}px`,
              alignSelf: 'flex-start',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 32,
              }}
            >
              🇬🇧
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.base.size,
                fontWeight: '600',
                color: COLORS.white,
              }}
            >
              UK Invoice Guide
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              display: 'flex',
              fontSize: TYPOGRAPHY.displayLg.size,
              fontWeight: TYPOGRAPHY.displayLg.weight,
              color: COLORS.white,
              lineHeight: TYPOGRAPHY.displayLg.lineHeight,
              letterSpacing: '-0.03em',
              textShadow: STYLE_PRESETS.textShadow.medium,
            }}
          >
            {displayTitle}
          </div>
        </div>

        {/* Footer with Category and Reading Time */}
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
              gap: `${SPACING.sm}px`,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.md}px ${SPACING.lg}px`,
              borderRadius: `${SPACING.md}px`,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.base.size,
                fontWeight: '600',
                color: COLORS.white,
              }}
            >
              {guide.category}
            </div>
          </div>

          {/* Reading Time */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: `${SPACING.sm}px`,
              fontSize: TYPOGRAPHY.base.size,
              color: `rgba(255, 255, 255, ${STYLE_PRESETS.opacity.light})`,
              fontWeight: '500',
            }}
          >
            📖 {guide.readTime} min read
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
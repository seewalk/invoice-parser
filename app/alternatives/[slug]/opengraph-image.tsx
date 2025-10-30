/**
 * ============================================================================
 * DYNAMIC OG IMAGE FOR COMPETITOR ALTERNATIVES
 * ============================================================================
 * 
 * Generates OG images for individual competitor comparison pages.
 * Shows competitor name, comparison focus, and Elektroluma advantage.
 */

import { ImageResponse } from 'next/og';
import { getCompetitorBySlug } from '../../lib/alternativesKnowledgeBase';
import { COLORS, GRADIENTS, TYPOGRAPHY, SPACING, BRAND, STYLE_PRESETS } from '../../lib/ogImageStyles';

export const runtime = 'edge';
export const alt = 'Invoice Parser Alternative Comparison';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const competitor = getCompetitorBySlug(params.slug);
  
  if (!competitor) {
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
            Competitor Not Found
          </div>
        </div>
      ),
      { ...size }
    );
  }

  // Truncate name if too long
  const displayName = competitor.name.length > 40 
    ? competitor.name.substring(0, 37) + '...'
    : competitor.name;

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
          {/* Alternative Badge */}
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
                fontSize: TYPOGRAPHY.base.size,
                fontWeight: '600',
                color: COLORS.white,
              }}
            >
              🔍 Alternative Comparison
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
            {displayName} Alternative
          </div>

          {/* Subtitle */}
          <div
            style={{
              display: 'flex',
              fontSize: TYPOGRAPHY.xl.size,
              color: `rgba(255, 255, 255, ${STYLE_PRESETS.opacity.light})`,
              lineHeight: 1.4,
            }}
          >
            Compare features, pricing & UK compliance
          </div>
        </div>

        {/* Footer with Key Advantages */}
        <div
          style={{
            display: 'flex',
            gap: `${SPACING.xl}px`,
            width: '100%',
          }}
        >
          {/* Price Advantage */}
          {competitor.pricing.model && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                padding: `${SPACING.lg}px ${SPACING.xl}px`,
                borderRadius: `${SPACING.md}px`,
                flex: 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: 40,
                  fontWeight: 'bold',
                  color: COLORS.accent[400],
                  marginBottom: `${SPACING.xs}px`,
                }}
              >
                {competitor.pricing .model}
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: TYPOGRAPHY.base.size,
                  color: COLORS.white,
                  fontWeight: '600',
                }}
              >
                More Affordable
              </div>
            </div>
          )}

          {/* UK Compliance Badge */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.lg}px ${SPACING.xl}px`,
              borderRadius: `${SPACING.md}px`,
              border: `2px solid ${COLORS.accent[400]}`,
              flex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 48,
                marginBottom: `${SPACING.xs}px`,
              }}
            >
              🇬🇧
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.base.size,
                color: COLORS.white,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              UK-First Compliance
            </div>
          </div>

          {/* Integration Badge */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.lg}px ${SPACING.xl}px`,
              borderRadius: `${SPACING.md}px`,
              flex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 48,
                marginBottom: `${SPACING.xs}px`,
              }}
            >
              ✨
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.base.size,
                color: COLORS.white,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              Better Integration
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
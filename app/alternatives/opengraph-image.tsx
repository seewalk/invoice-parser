/**
 * ============================================================================
 * OG IMAGE FOR ALTERNATIVES PAGE
 * ============================================================================
 * 
 * Alternatives & competitors comparison page OG image.
 * Highlights comprehensive comparison and UK-first approach.
 */

import { ImageResponse } from 'next/og';
import { COLORS, GRADIENTS, TYPOGRAPHY, SPACING, BRAND, ICONS, STYLE_PRESETS } from '../lib/ogImageStyles';

export const runtime = 'edge';
export const alt = 'Invoice Parser Alternatives & Competitors Comparison';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
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
        {/* Header */}
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
          {/* Title */}
          <div
            style={{
              display: 'flex',
              fontSize: TYPOGRAPHY.displayXl.size,
              fontWeight: TYPOGRAPHY.displayXl.weight,
              color: COLORS.white,
              lineHeight: TYPOGRAPHY.displayXl.lineHeight,
              letterSpacing: '-0.03em',
              textShadow: STYLE_PRESETS.textShadow.medium,
            }}
          >
            Compare Invoice Solutions
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
            Find the perfect invoice automation tool for your UK business
          </div>
        </div>

        {/* Comparison Stats */}
        <div
          style={{
            display: 'flex',
            gap: `${SPACING['3xl']}px`,
            width: '100%',
          }}
        >
          {/* Stat 1 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.xl}px`,
              borderRadius: `${SPACING.md}px`,
              minWidth: '220px',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 48,
                fontWeight: 'bold',
                color: COLORS.white,
                marginBottom: `${SPACING.xs}px`,
              }}
            >
              65+
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.base.size,
                color: `rgba(255, 255, 255, ${STYLE_PRESETS.opacity.medium})`,
              }}
            >
              Competitors Analyzed
            </div>
          </div>

          {/* Stat 2 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.xl}px`,
              borderRadius: `${SPACING.md}px`,
              minWidth: '220px',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 48,
                fontWeight: 'bold',
                color: COLORS.white,
                marginBottom: `${SPACING.xs}px`,
              }}
            >
              60%
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.base.size,
                color: `rgba(255, 255, 255, ${STYLE_PRESETS.opacity.medium})`,
              }}
            >
              More Affordable
            </div>
          </div>

          {/* Stat 3 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.xl}px`,
              borderRadius: `${SPACING.md}px`,
              minWidth: '220px',
              border: `2px solid ${COLORS.accent[400]}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 48,
                fontWeight: 'bold',
                color: COLORS.accent[400],
                marginBottom: `${SPACING.xs}px`,
              }}
            >
              {ICONS.check}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.base.size,
                color: COLORS.white,
                fontWeight: '600',
              }}
            >
              UK-First Compliance
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
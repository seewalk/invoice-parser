/**
 * ============================================================================
 * OG IMAGE FOR PARSER PAGE
 * ============================================================================
 * 
 * AI Parser page Open Graph image.
 * Highlights AI automation and parsing capabilities.
 */

import { ImageResponse } from 'next/og';
import { COLORS, GRADIENTS, TYPOGRAPHY, SPACING, BRAND, ICONS, STYLE_PRESETS } from '../lib/ogImageStyles';

export const runtime = 'edge';
export const alt = 'AI Invoice Parser - Automate Invoice Data Extraction';
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
          backgroundImage: GRADIENTS.primary,
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
            maxWidth: '900px',
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
            AI Invoice Parser
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
            Extract invoice data from PDFs and emails automatically
          </div>
        </div>

        {/* Stats Row */}
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
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.xl}px ${SPACING['2xl']}px`,
              borderRadius: `${SPACING.md}px`,
              flex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 56,
                fontWeight: 'bold',
                color: COLORS.accent[400],
                marginBottom: `${SPACING.sm}px`,
              }}
            >
              99%
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
              Accuracy
            </div>
          </div>

          {/* Stat 2 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.xl}px ${SPACING['2xl']}px`,
              borderRadius: `${SPACING.md}px`,
              flex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 56,
                fontWeight: 'bold',
                color: COLORS.accent[400],
                marginBottom: `${SPACING.sm}px`,
              }}
            >
              &lt;5s
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
              Processing
            </div>
          </div>

          {/* Stat 3 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.xl}px ${SPACING['2xl']}px`,
              borderRadius: `${SPACING.md}px`,
              flex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 56,
                fontWeight: 'bold',
                color: COLORS.accent[400],
                marginBottom: `${SPACING.sm}px`,
              }}
            >
              90%
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
              Time Saved
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
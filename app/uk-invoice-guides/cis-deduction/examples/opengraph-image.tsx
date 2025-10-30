/**
 * ============================================================================
 * OG IMAGE FOR CIS DEDUCTION EXAMPLES PAGE
 * ============================================================================
 * 
 * OG image for CIS invoice examples and templates page.
 */

import { ImageResponse } from 'next/og';
import { COLORS, GRADIENTS, TYPOGRAPHY, SPACING, BRAND, ICONS, STYLE_PRESETS } from '../../../lib/ogImageStyles';

export const runtime = 'edge';
export const alt = 'CIS Deduction Invoice Examples - UK Construction';
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
            maxWidth: '900px',
          }}
        >
          {/* UK Construction Badge */}
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
              {ICONS.building}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.base.size,
                fontWeight: '600',
                color: COLORS.white,
              }}
            >
              UK Construction
            </div>
          </div>

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
            CIS Deduction Invoice Examples
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
            Construction Industry Scheme compliant templates
          </div>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: 'flex',
            gap: `${SPACING.lg}px`,
            width: '100%',
          }}
        >
          {/* Feature 1 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: `${SPACING.sm}px`,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.lg}px`,
              borderRadius: `${SPACING.md}px`,
              flex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 32,
              }}
            >
              {ICONS.check}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.base.size,
                fontWeight: '600',
                color: COLORS.white,
              }}
            >
              CIS Rates
            </div>
          </div>

          {/* Feature 2 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: `${SPACING.sm}px`,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.lg}px`,
              borderRadius: `${SPACING.md}px`,
              flex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 32,
              }}
            >
              {ICONS.document}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.base.size,
                fontWeight: '600',
                color: COLORS.white,
              }}
            >
              HMRC Format
            </div>
          </div>

          {/* Feature 3 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: `${SPACING.sm}px`,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.lg}px`,
              borderRadius: `${SPACING.md}px`,
              flex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 32,
              }}
            >
              {ICONS.sparkles}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.base.size,
                fontWeight: '600',
                color: COLORS.white,
              }}
            >
              Free Downloads
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
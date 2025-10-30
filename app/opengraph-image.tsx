/**
 * ============================================================================
 * OG IMAGE FOR HOME PAGE
 * ============================================================================
 * 
 * Main landing page Open Graph image.
 * Showcases the core value proposition and brand.
 */

import { ImageResponse } from 'next/og';
import { COLORS, GRADIENTS, TYPOGRAPHY, SPACING, BRAND, ICONS, STYLE_PRESETS } from './lib/ogImageStyles';

export const runtime = 'edge';
export const alt = 'Elektroluma - AI-Powered Invoice Automation for UK Small Businesses';
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
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.white,
          backgroundImage: GRADIENTS.primary,
          padding: `${SPACING['5xl']}px`,
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: `${SPACING.lg}px`,
            marginBottom: `${SPACING['2xl']}px`,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 80,
              fontWeight: 'bold',
            }}
          >
            {BRAND.emoji}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 64,
              fontWeight: 'bold',
              color: COLORS.white,
              letterSpacing: '-0.02em',
            }}
          >
            {BRAND.name}
          </div>
        </div>

        {/* Main Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: `${SPACING.xl}px`,
            maxWidth: '1000px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: TYPOGRAPHY.display2xl.size,
              fontWeight: TYPOGRAPHY.display2xl.weight,
              color: COLORS.white,
              lineHeight: TYPOGRAPHY.display2xl.lineHeight,
              letterSpacing: '-0.03em',
              textShadow: STYLE_PRESETS.textShadow.medium,
            }}
          >
            AI-Powered Invoice
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: TYPOGRAPHY.display2xl.size,
              fontWeight: TYPOGRAPHY.display2xl.weight,
              color: COLORS.accent[400],
              lineHeight: TYPOGRAPHY.display2xl.lineHeight,
              letterSpacing: '-0.03em',
              textShadow: STYLE_PRESETS.textShadow.medium,
            }}
          >
            Automation
          </div>
        </div>

        {/* Subheadline */}
        <div
          style={{
            display: 'flex',
            fontSize: TYPOGRAPHY.xl.size,
            color: `rgba(255, 255, 255, ${STYLE_PRESETS.opacity.light})`,
            lineHeight: 1.4,
            textAlign: 'center',
            maxWidth: '800px',
            marginTop: `${SPACING.xl}px`,
          }}
        >
          Built for UK small businesses. Parse invoices from emails in seconds.
        </div>

        {/* Key Features */}
        <div
          style={{
            display: 'flex',
            gap: `${SPACING['3xl']}px`,
            marginTop: `${SPACING['4xl']}px`,
          }}
        >
          {/* Feature 1 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: `${SPACING.sm}px`,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 40,
              }}
            >
              {ICONS.zap}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.base.size,
                fontWeight: TYPOGRAPHY.xl.weight,
                color: COLORS.white,
              }}
            >
              99% Accurate
            </div>
          </div>

          {/* Feature 2 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: `${SPACING.sm}px`,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 40,
              }}
            >
              {ICONS.check}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.base.size,
                fontWeight: TYPOGRAPHY.xl.weight,
                color: COLORS.white,
              }}
            >
              UK Compliant
            </div>
          </div>

          {/* Feature 3 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: `${SPACING.sm}px`,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 40,
              }}
            >
              {ICONS.sparkles}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.base.size,
                fontWeight: TYPOGRAPHY.xl.weight,
                color: COLORS.white,
              }}
            >
              90% Faster
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: `${SPACING['4xl']}px`,
            display: 'flex',
            fontSize: TYPOGRAPHY.base.size,
            color: `rgba(255, 255, 255, ${STYLE_PRESETS.opacity.medium})`,
          }}
        >
          {BRAND.url}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
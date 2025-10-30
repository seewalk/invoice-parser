/**
 * ============================================================================
 * OG IMAGE FOR PRICING PAGE
 * ============================================================================
 * 
 * Pricing page Open Graph image.
 * Highlights transparent pricing and value proposition.
 */

import { ImageResponse } from 'next/og';
import { COLORS, GRADIENTS, TYPOGRAPHY, SPACING, BRAND, ICONS, STYLE_PRESETS } from '../lib/ogImageStyles';

export const runtime = 'edge';
export const alt = 'Elektroluma Pricing - Simple, Transparent Invoice Automation Plans';
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
            Simple, Transparent Pricing
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
            Pay-per-invoice model. No hidden fees. Cancel anytime.
          </div>
        </div>

        {/* Pricing Cards */}
        <div
          style={{
            display: 'flex',
            gap: `${SPACING.xl}px`,
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          {/* Free Plan */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.xl}px`,
              borderRadius: `${SPACING.md}px`,
              minWidth: '280px',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.base.size,
                color: COLORS.white,
                fontWeight: '600',
                marginBottom: `${SPACING.sm}px`,
              }}
            >
              Free
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: `${SPACING.xs}px`,
                marginBottom: `${SPACING.md}px`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: 48,
                  fontWeight: 'bold',
                  color: COLORS.white,
                }}
              >
                £0
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: TYPOGRAPHY.base.size,
                  color: `rgba(255, 255, 255, ${STYLE_PRESETS.opacity.medium})`,
                }}
              >
                /month
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.sm.size,
                color: `rgba(255, 255, 255, ${STYLE_PRESETS.opacity.medium})`,
              }}
            >
              Templates with watermark
            </div>
          </div>

          {/* Premium Plan */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.xl}px`,
              borderRadius: `${SPACING.md}px`,
              minWidth: '280px',
              border: `2px solid ${COLORS.accent[400]}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.base.size,
                color: COLORS.accent[400],
                fontWeight: '600',
                marginBottom: `${SPACING.sm}px`,
              }}
            >
              Premium {ICONS.star}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: `${SPACING.xs}px`,
                marginBottom: `${SPACING.md}px`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: 48,
                  fontWeight: 'bold',
                  color: COLORS.white,
                }}
              >
                £0.01
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: TYPOGRAPHY.base.size,
                  color: `rgba(255, 255, 255, ${STYLE_PRESETS.opacity.medium})`,
                }}
              >
                /invoice
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.sm.size,
                color: `rgba(255, 255, 255, ${STYLE_PRESETS.opacity.medium})`,
              }}
            >
              AI parsing + automation
            </div>
          </div>

          {/* Enterprise Plan */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.xl}px`,
              borderRadius: `${SPACING.md}px`,
              minWidth: '280px',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.base.size,
                color: COLORS.white,
                fontWeight: '600',
                marginBottom: `${SPACING.sm}px`,
              }}
            >
              Enterprise
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: `${SPACING.xs}px`,
                marginBottom: `${SPACING.md}px`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: COLORS.white,
                }}
              >
                Custom
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: TYPOGRAPHY.sm.size,
                color: `rgba(255, 255, 255, ${STYLE_PRESETS.opacity.medium})`,
              }}
            >
              Volume pricing available
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
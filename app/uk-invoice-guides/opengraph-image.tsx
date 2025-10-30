/**
 * ============================================================================
 * OG IMAGE FOR UK INVOICE GUIDES PAGE
 * ============================================================================
 * 
 * UK Invoice Guides index page OG image.
 * Highlights comprehensive UK compliance guidance.
 */

import { ImageResponse } from 'next/og';
import { COLORS, GRADIENTS, TYPOGRAPHY, SPACING, BRAND, ICONS, STYLE_PRESETS } from '../lib/ogImageStyles';

export const runtime = 'edge';
export const alt = 'UK Invoice Guides - VAT, CIS & HMRC Compliance';
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
          {/* Flag */}
          <div
            style={{
              display: 'flex',
              fontSize: 64,
            }}
          >
            🇬🇧
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
            UK Invoice Guides
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
            Complete guide to VAT, CIS, and HMRC compliant invoicing
          </div>
        </div>

        {/* Guide Topics */}
        <div
          style={{
            display: 'flex',
            gap: `${SPACING.lg}px`,
            width: '100%',
          }}
        >
          {/* VAT */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: `${SPACING.sm}px`,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.xl}px`,
              borderRadius: `${SPACING.md}px`,
              flex: 1,
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
                color: COLORS.white,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              VAT Invoices
            </div>
          </div>

          {/* CIS */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: `${SPACING.sm}px`,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.xl}px`,
              borderRadius: `${SPACING.md}px`,
              flex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 40,
              }}
            >
              {ICONS.building}
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
              CIS Deductions
            </div>
          </div>

          {/* HMRC */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: `${SPACING.sm}px`,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.xl}px`,
              borderRadius: `${SPACING.md}px`,
              flex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 40,
              }}
            >
              {ICONS.document}
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
              HMRC Rules
            </div>
          </div>

          {/* Templates */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: `${SPACING.sm}px`,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.xl}px`,
              borderRadius: `${SPACING.md}px`,
              flex: 1,
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
                color: COLORS.white,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              Templates
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
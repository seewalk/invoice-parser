/**
 * ============================================================================
 * DYNAMIC OG IMAGE FOR INVOICE TEMPLATES
 * ============================================================================
 * 
 * Generates OG images for individual invoice templates.
 * Shows template name, industry, and UK compliance.
 */

import { ImageResponse } from 'next/og';
import { allIndustries } from '@/app/lib/invoiceTemplateLibrary';
import { COLORS, GRADIENTS, TYPOGRAPHY, SPACING, BRAND, ICONS, STYLE_PRESETS } from '../../lib/ogImageStyles';

export const runtime = 'edge';
export const alt = 'Invoice Template';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Helper functions (same as in page.tsx)
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getTemplateBySlug(slug: string) {
  for (const [industryId, industry] of Object.entries(allIndustries)) {
    for (const category of Object.values(industry.categories)) {
      for (const subCategory of Object.values(category.subCategories)) {
        for (const template of subCategory.templates) {
          const templateSlug = slugify(template.keywords[0]);
          if (templateSlug === slug) {
            return { 
              template, 
              industryId,
              industryName: industry.name 
            };
          }
        }
      }
    }
  }
  return null;
}

export default async function Image({ params }: { params: { slug: string } }) {
  const result = getTemplateBySlug(params.slug);
  
  if (!result) {
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
            Template Not Found
          </div>
        </div>
      ),
      { ...size }
    );
  }

  const { template, industryName } = result;

  // Truncate template name if too long
  const displayName = template.name.length > 60 
    ? template.name.substring(0, 57) + '...'
    : template.name;

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
          backgroundImage: GRADIENTS.success,
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
            maxWidth: '900px',
          }}
        >
          {/* Free Badge */}
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
              {ICONS.document} Free Template
            </div>
          </div>

          {/* Template Name */}
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
            {displayName}
          </div>

          {/* Description */}
          <div
            style={{
              display: 'flex',
              fontSize: TYPOGRAPHY.lg.size,
              color: `rgba(255, 255, 255, ${STYLE_PRESETS.opacity.light})`,
              lineHeight: 1.4,
            }}
          >
            {template.description}
          </div>
        </div>

        {/* Footer with Industry and Features */}
        <div
          style={{
            display: 'flex',
            gap: `${SPACING.xl}px`,
            width: '100%',
          }}
        >
          {/* Industry Badge */}
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
              {ICONS.building} {industryName}
            </div>
          </div>

          {/* VAT Compliant Badge */}
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
              {ICONS.check} UK VAT Compliant
            </div>
          </div>

          {/* Instant PDF Badge */}
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
              {ICONS.download} Instant PDF
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
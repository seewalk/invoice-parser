/**
 * Segment Utilities
 * 
 * Centralized color and variant mapping system for competitor segments.
 * Maps competitor market segments to design system color variants.
 */

export type SegmentType = 'free-generator' | 'template-library' | 'ai-parser' | 'api-service';
export type ColorVariant = 'success' | 'primary' | 'warning' | 'error' | 'info';

export const SEGMENT_CONFIG: Record<SegmentType, {
  variant: ColorVariant;
  icon: string;
  label: string;
}> = {
  'free-generator': {
    variant: 'success',
    icon: '📝',
    label: 'Free Generator'
  },
  'template-library': {
    variant: 'primary',
    icon: '📋',
    label: 'Template Library'
  },
  'ai-parser': {
    variant: 'warning',
    icon: '🤖',
    label: 'AI Parser'
  },
  'api-service': {
    variant: 'info',
    icon: '🔌',
    label: 'API Service'
  }
};

/**
 * Get color variant for a given segment type
 * @param segment - The market segment type
 * @returns ColorVariant for design system components
 */
export function getSegmentVariant(segment: SegmentType): ColorVariant {
  return SEGMENT_CONFIG[segment]?.variant || 'primary';
}

/**
 * Get human-readable label for a segment type
 * @param segment - The market segment type
 * @returns Formatted label string
 */
export function getSegmentLabel(segment: SegmentType): string {
  return SEGMENT_CONFIG[segment]?.label || segment.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
}
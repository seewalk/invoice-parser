/**
 * ============================================================================
 * TEMPLATE CARD COMPONENT
 * ============================================================================
 * 
 * Displays a single invoice template card with mobile-first design.
 * 
 * Features:
 * - Template name, description, and metadata
 * - Premium/Free tier badges
 * - Professional/compliant status badges
 * - Top 3 keyword tags
 * - Pricing information (Premium vs Free)
 * - Mobile-responsive layout
 * - Uses centralized UI components (Card, Heading, Text, Badge)
 * - Memoized for performance optimization
 * 
 * Mobile Optimization:
 * - Touch-friendly spacing (minimum 44x44px targets)
 * - Responsive text sizing
 * - Stacked layout on mobile, grid on desktop
 * - Optimized icon sizes for smaller screens
 */

'use client';

import { memo } from 'react';
import Link from 'next/link';
import { FileText, CheckCircle, Shield, ArrowRight, Sparkles, Crown } from 'lucide-react';
import { InvoiceTemplate, getTotalTemplateCount } from '@/app/lib/invoiceTemplateLibrary';
import { PRICING_CONSTANTS } from '@/app/types/pricing';
import Card from '@/app/components/ui/Card';
import Heading from '@/app/components/ui/Heading';
import Text from '@/app/components/ui/Text';
import Badge from '@/app/components/ui/Badge';

// ============================================================================
// PROPS
// ============================================================================

interface TemplateCardProps {
  /**
   * Invoice template data object
   */
  template: InvoiceTemplate;
  
  /**
   * URL slug for template detail page
   */
  slug: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * TemplateCard Component
 * 
 * Displays a single invoice template card with:
 * - Template name and description
 * - Professional/compliant badges
 * - Top 3 keywords
 * - Pricing information
 * - Link to template detail page
 * 
 * Optimizations:
 * - Memoized to prevent unnecessary re-renders
 * - Pure presentation component
 * - Efficient hover effects with CSS transitions
 * - Mobile-first responsive design
 */
function TemplateCardComponent({ template, slug }: TemplateCardProps) {
  const isPremium = template.tier === 'premium';

  return (
    <Link 
      href={`/invoice-templates/${slug}`}
      className="block group h-full"
    >
      <Card 
        variant="hover" 
        padding="md"
        className={`h-full relative transition-all ${
          isPremium 
            ? 'border-2 border-purple-300 hover:border-purple-500' 
            : 'border-2 border-slate-200 hover:border-indigo-500'
        }`}
      >
        {/* Premium Badge (Top Right) */}
        {isPremium && (
          <div className="absolute top-4 right-4 z-10">
            <Badge 
              variant="primary"
              size="xs"
              icon={<Crown className="w-3 h-3" />}
              className="!bg-gradient-to-r !from-purple-600 !to-pink-600 !text-white !border-0 shadow-lg"
            >
              PRO
            </Badge>
          </div>
        )}
        
        {/* Header with Icon */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1 pr-12 sm:pr-16">
            {/* Template Name */}
            <Heading 
              as="h3" 
              size="md" 
              weight="bold"
              className={`group-hover:text-indigo-600 transition !text-lg sm:!text-xl mb-2 ${
                isPremium ? 'text-purple-900' : 'text-slate-900'
              }`}
            >
              {template.name}
            </Heading>
            
            {/* Template Description */}
            <Text 
              size="sm" 
              variant="muted"
              className="leading-relaxed !text-xs sm:!text-sm"
            >
              {template.description}
            </Text>
          </div>
          
          {/* Template Icon */}
          <FileText 
            className={`w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 ml-3 sm:ml-4 ${
              isPremium ? 'text-purple-600' : 'text-indigo-600'
            }`} 
            aria-hidden="true"
          />
        </div>

        {/* Professional & Compliant Badges */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
          {/* Professional Badge */}
          <div className="bg-blue-50 rounded-lg p-2 sm:p-3">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-blue-700 mb-0.5 sm:mb-1">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="font-medium">Professional</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-blue-900">
              Industry-Ready
            </div>
          </div>
          
          {/* Compliant Badge */}
          <div className="bg-green-50 rounded-lg p-2 sm:p-3">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-green-700 mb-0.5 sm:mb-1">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="font-medium">Compliant</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-green-900">
              VAT & UK Law
            </div>
          </div>
        </div>

        {/* Top 3 Keywords */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {template.keywords.slice(0, 3).map((keyword, idx) => (
            <Badge
              key={idx}
              variant="primary"
              size="xs"
              className="!bg-indigo-50 !text-indigo-700 !border-indigo-200"
            >
              {keyword}
            </Badge>
          ))}
        </div>

        {/* Pricing Information */}
        {isPremium ? (
          // Premium Template Pricing
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-2.5 sm:p-3 mb-3 sm:mb-4 border border-purple-200">
            <div className="flex items-center justify-between mb-1">
              <Text 
                size="xs" 
                weight="medium"
                className="!text-purple-900 flex items-center gap-1"
              >
                <Crown className="w-3 h-3" />
                PRO TIER EXCLUSIVE
              </Text>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" aria-hidden="true" />
            </div>
            <Text 
              size="sm" 
              weight="semibold"
              className="!text-gray-900 !text-xs sm:!text-sm"
            >
              <span className="text-purple-700">£{PRICING_CONSTANTS.PRO_MONTHLY}/mo</span> for all {getTotalTemplateCount(true)} templates
            </Text>
            <Text 
              size="xs" 
              variant="muted"
              className="mt-1"
            >
              Includes AI parser + automation
            </Text>
          </div>
        ) : (
          // Free Template Pricing
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2.5 sm:p-3 mb-3 sm:mb-4 border border-blue-200">
            <div className="flex items-center justify-between mb-1">
              <Text 
                size="xs" 
                weight="medium"
                className="!text-gray-700"
              >
                🆓 FREE with watermark
              </Text>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" aria-hidden="true" />
            </div>
            <Text 
              size="sm" 
              weight="semibold"
              className="!text-gray-900 !text-xs sm:!text-sm"
            >
              or <span className="text-blue-700">£{PRICING_CONSTANTS.PREMIUM_MONTHLY}/mo</span> for all {getTotalTemplateCount(false)} free templates watermark-free
            </Text>
            <Text 
              size="xs" 
              variant="muted"
              className="mt-1"
            >
              Premium: No watermarks + branding
            </Text>
          </div>
        )}

        {/* View Template CTA */}
        <div className="flex items-center justify-between pt-2">
          <Text 
            size="sm" 
            weight="medium"
            className="text-indigo-600 group-hover:text-indigo-700 !text-xs sm:!text-sm"
          >
            View Template
          </Text>
          <ArrowRight 
            className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:translate-x-1 transition-transform" 
            aria-hidden="true"
          />
        </div>
      </Card>
    </Link>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Memoized export to prevent unnecessary re-renders
 * Will only re-render if template or slug props change
 */
export const TemplateCard = memo(TemplateCardComponent);
export default TemplateCard;

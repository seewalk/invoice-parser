/**
 * ============================================================================
 * INDUSTRY SECTION COMPONENT
 * ============================================================================
 * 
 * Displays all templates for a specific industry with mobile-first design.
 * 
 * Features:
 * - Industry header with icon, name, and description
 * - Template count badge
 * - Responsive grid layout (1→2→3 columns)
 * - Uses centralized UI components (Heading, Text, Badge)
 * - Memoized for performance optimization
 * - Removes internal SEO metrics (search volumes, CPC data)
 * 
 * Mobile Breakpoints:
 * - Mobile: 1 column (< 640px)
 * - Tablet: 2 columns (640px - 1024px)
 * - Desktop: 3 columns (> 1024px)
 */

'use client';

import { memo, useMemo } from 'react';
import { Industry, InvoiceTemplate } from '@/app/lib/invoiceTemplateLibrary';
import { TemplateCard } from './TemplateCard';
import Heading from '@/app/components/ui/Heading';
import Text from '@/app/components/ui/Text';
import Badge from '@/app/components/ui/Badge';

// ============================================================================
// PROPS
// ============================================================================

interface IndustrySectionProps {
  /**
   * Industry unique identifier
   */
  industryId: string;
  
  /**
   * Industry data object with categories and templates
   */
  industry: Industry;
  
  /**
   * Function to generate URL slug from template
   */
  getTemplateSlug: (template: InvoiceTemplate) => string;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * IndustrySection Component
 * 
 * Renders an industry section with:
 * - Industry header (icon, name, description)
 * - Template count badge
 * - Responsive grid of template cards
 * 
 * Optimizations:
 * - Memoized to prevent re-renders when props don't change
 * - Uses useMemo for template collection
 * - Renders memoized TemplateCard components
 * - Can be lazy loaded for below-fold sections
 */
function IndustrySectionComponent({ 
  industryId, 
  industry, 
  getTemplateSlug 
}: IndustrySectionProps) {
  // Collect all templates from this industry (memoized)
  const templates = useMemo(() => {
    const collectedTemplates: InvoiceTemplate[] = [];
    
    Object.values(industry.categories).forEach(category => {
      Object.values(category.subCategories).forEach(subCategory => {
        collectedTemplates.push(...subCategory.templates);
      });
    });
    
    return collectedTemplates;
  }, [industry]);

  return (
    <section 
      id={industryId} 
      className="mb-12 sm:mb-16 lg:mb-20"
      aria-labelledby={`${industryId}-heading`}
    >
      {/* Industry Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-4 mb-6 sm:mb-8">
        {/* Industry Icon */}
        <div className="text-4xl sm:text-5xl" aria-hidden="true">
          {industry.icon}
        </div>
        
        {/* Industry Info */}
        <div className="flex-1">
          {/* Industry Name */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
            <Heading 
              as="h2" 
              size="xl" 
              weight="bold"
              id={`${industryId}-heading`}
              className="!text-2xl sm:!text-3xl"
            >
              {industry.name}
            </Heading>
            
            {/* Template Count Badge */}
            <Badge 
              variant="primary" 
              size="sm"
              aria-label={`${templates.length} templates available`}
            >
              {templates.length} templates
            </Badge>
          </div>
          
          {/* Industry Description */}
          <Text 
            size="base" 
            variant="muted"
            className="!text-base sm:!text-lg"
          >
            {industry.description}
          </Text>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {templates.map(template => (
          <TemplateCard 
            key={template.id} 
            template={template} 
            slug={getTemplateSlug(template)}
          />
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Memoized export to prevent unnecessary re-renders
 * Will only re-render if industryId, industry, or getTemplateSlug changes
 */
export const IndustrySection = memo(IndustrySectionComponent);
export default IndustrySection;

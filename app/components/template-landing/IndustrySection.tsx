'use client';

import { memo, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { Industry, InvoiceTemplate } from '@/app/lib/invoiceTemplateLibrary';
import { TemplateCard } from './TemplateCard';

interface IndustrySectionProps {
  industryId: string;
  industry: Industry;
  /**
   * Function to generate slug from template
   */
  getTemplateSlug: (template: InvoiceTemplate) => string;
}

/**
 * IndustrySection Component
 * 
 * Displays all templates for a specific industry:
 * - Industry header with icon, name, description
 * - Industry statistics (search volume, template count)
 * - Grid of template cards
 * 
 * Optimizations:
 * - Memoized to prevent re-renders
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
    <section id={industryId} className="mb-20">
      {/* Industry Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="text-5xl">{industry.icon}</div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {industry.name}
          </h2>
          <p className="text-lg text-slate-600">
            {industry.description}
          </p>
          <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {industry.totalSearchVolume.toLocaleString()} searches/month
            </span>
            <span>•</span>
            <span>{templates.length} templates available</span>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

/**
 * Memoized export to prevent unnecessary re-renders
 * Will only re-render if industryId, industry, or getTemplateSlug changes
 */
export const IndustrySection = memo(IndustrySectionComponent);

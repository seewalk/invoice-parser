'use client';

import { memo } from 'react';
import Link from 'next/link';
import { FileText, TrendingUp, Users, ArrowRight, Sparkles } from 'lucide-react';
import { InvoiceTemplate } from '@/app/lib/invoiceTemplateLibrary';
import { PRICING_CONSTANTS } from '@/app/types/pricing';

interface TemplateCardProps {
  template: InvoiceTemplate;
  slug: string;
}

/**
 * TemplateCard Component
 * 
 * Displays a single invoice template card with:
 * - Template name and description
 * - Search volume and CPC stats
 * - Top 3 keywords
 * - Link to template detail page
 * 
 * Optimizations:
 * - Memoized to prevent unnecessary re-renders
 * - Pure presentation component
 * - Efficient hover effects with CSS transitions
 * - Optimized for mobile and desktop
 */
function TemplateCardComponent({ template, slug }: TemplateCardProps) {
  return (
    <Link 
      href={`/invoice-templates/${slug}`}
      className="block group"
    >
      <div className="bg-white rounded-xl border-2 border-slate-200 hover:border-indigo-500 transition-all hover:shadow-xl p-6 h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition mb-2">
              {template.name}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {template.description}
            </p>
          </div>
          <FileText className="w-8 h-8 text-indigo-600 flex-shrink-0 ml-4" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Search Volume</span>
            </div>
            <div className="text-lg font-bold text-slate-900">
              {template.searchVolume.toLocaleString()}/mo
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm text-green-700 mb-1">
              <Users className="w-4 h-4" />
              <span>CPC Value</span>
            </div>
            <div className="text-lg font-bold text-green-700">
              £{template.cpc.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap gap-2 mb-4">
          {template.keywords.slice(0, 3).map((keyword, idx) => (
            <span 
              key={idx}
              className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded"
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* Pricing Info */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 mb-4 border border-blue-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-700">FREE with watermark</span>
            <Sparkles className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-sm font-semibold text-gray-900">
            or <span className="text-blue-700">£{PRICING_CONSTANTS.TEMPLATE_PRICE}</span> to remove watermark
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
            View Template
          </span>
          <ArrowRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

/**
 * Memoized export to prevent unnecessary re-renders
 * Will only re-render if template or slug props change
 */
export const TemplateCard = memo(TemplateCardComponent);
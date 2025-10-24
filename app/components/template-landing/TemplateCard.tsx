'use client';

import { memo } from 'react';
import Link from 'next/link';
import { FileText, CheckCircle, Shield, ArrowRight, Sparkles, Download, Crown } from 'lucide-react';
import { InvoiceTemplate, getTotalTemplateCount } from '@/app/lib/invoiceTemplateLibrary';
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
 * - User-focused statistics (usage, compliance)
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
      <div className={`bg-white rounded-xl border-2 transition-all hover:shadow-xl p-6 h-full ${
        template.tier === 'premium' ? 'border-purple-300 hover:border-purple-500' : 'border-slate-200 hover:border-indigo-500'
      }`}>
        {/* Premium Badge */}
        {template.tier === 'premium' && (
          <div className="absolute top-4 right-4">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Crown className="w-3 h-3" />
              PRO ONLY
            </div>
          </div>
        )}
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-16">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition mb-2">
              {template.name}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {template.description}
            </p>
          </div>
          <FileText className={`w-8 h-8 flex-shrink-0 ml-4 ${
            template.tier === 'premium' ? 'text-purple-600' : 'text-indigo-600'
          }`} />
        </div>

        {/* User-Focused Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm text-blue-700 mb-1">
              <CheckCircle className="w-4 h-4" />
              <span>Professional</span>
            </div>
            <div className="text-sm font-semibold text-blue-900">
              Industry-Ready
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm text-green-700 mb-1">
              <Shield className="w-4 h-4" />
              <span>Compliant</span>
            </div>
            <div className="text-sm font-semibold text-green-900">
              VAT & UK Law
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
        {template.tier === 'premium' ? (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 mb-4 border border-purple-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-purple-900 flex items-center gap-1">
                <Crown className="w-3 h-3" />
                PRO TIER EXCLUSIVE
              </span>
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              <span className="text-purple-700">£{PRICING_CONSTANTS.PRO_MONTHLY}/mo</span> for all {getTotalTemplateCount(true)} templates
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Includes AI parser + automation
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 mb-4 border border-blue-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-700">🆓 FREE with watermark</span>
              <Sparkles className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              or <span className="text-blue-700">£{PRICING_CONSTANTS.PREMIUM_MONTHLY}/mo</span> for all {getTotalTemplateCount(false)} free templates watermark-free
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Premium: No watermarks + branding
            </div>
          </div>
        )}

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
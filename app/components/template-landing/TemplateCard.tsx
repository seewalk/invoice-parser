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

        {/* Pricing Info - USP Differentiation */}
        {template.tier === 'premium' ? (
          // Pro Exclusive Card (for premium-tier templates)
          <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-purple-300 mb-4">
            {/* Pro Badge */}
            <div className="absolute top-2 right-2">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-lg">
                <Crown className="w-3 h-3" />
                PRO
              </div>
            </div>
            
            <div className="mb-3">
              <span className="text-xs font-semibold text-purple-800 uppercase">Pro Exclusive Template</span>
            </div>
            
            <div className="text-sm text-slate-700 space-y-1 mb-3">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span><strong>Advanced fields:</strong> Industry-specific</span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span><strong>AI parser:</strong> 200 invoices/month</span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span><strong>Team access:</strong> Up to 3 users</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-3 border border-purple-200">
              <div className="text-xs text-slate-600 mb-1">Unlock with Pro</div>
              <div className="text-2xl font-bold text-slate-900 mb-1">
                £{PRICING_CONSTANTS.PRO_MONTHLY}
                <span className="text-sm font-normal text-slate-600">/month</span>
              </div>
              <div className="text-xs text-slate-600">All {getTotalTemplateCount(true)} templates + AI features</div>
            </div>
          </div>
        ) : (
          // Free Template Card with two distinct presentations
          <div className="space-y-3 mb-4">
            {/* Free Tier Features - What You Get */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-600 uppercase">Free Template</span>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-sm text-slate-700 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>UK VAT compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>PDF download</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Basic invoice fields</span>
                </div>
              </div>
            </div>

            {/* Premium Upgrade Card - Value-Add Features */}
            <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border-2 border-amber-300">
              {/* Premium Badge */}
              <div className="absolute top-2 right-2">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg">
                  <Crown className="w-3 h-3" />
                  PREMIUM
                </div>
              </div>
              
              <div className="mb-3">
                <span className="text-xs font-semibold text-amber-800 uppercase">Upgrade Features</span>
              </div>
              
              <div className="text-sm text-slate-700 space-y-1 mb-3">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong>No watermark:</strong> Professional look</span>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Custom branding:</strong> Add your logo</span>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong>30-day history:</strong> Track invoices</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-amber-200">
                <div className="text-xs text-slate-600 mb-1">Unlock Premium</div>
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  £{PRICING_CONSTANTS.PREMIUM_MONTHLY}
                  <span className="text-sm font-normal text-slate-600">/month</span>
                </div>
                <div className="text-xs text-slate-600">All {getTotalTemplateCount(false)} templates watermark-free</div>
              </div>
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
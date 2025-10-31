'use client';

import { CheckCircle, Sparkles, Crown, Gift, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { PRICING_CONSTANTS } from '@/app/types/pricing';
import { getTotalTemplateCount } from '@/app/lib/invoiceTemplateLibrary';

/**
 * PricingComparisonCard Component
 * 
 * Displays 3-tier freemium pricing comparison:
 * - FREE: All 11 templates with watermark
 * - PREMIUM (£9.99/mo): All templates without watermark + basic features
 * - PRO (£29.99/mo): Premium + AI parser + advanced features
 * 
 * Used in: Pricing page, upgrade modals, template detail pages
 * 
 * Design: Clear value progression, emphasize Premium tier as best value for most users
 */

interface PricingComparisonCardProps {
  /** Which tier to emphasize (highlight) */
  emphasize?: 'free' | 'premium' | 'pro';
  /** Compact mode (less padding, smaller text) */
  compact?: boolean;
  /** Show annual pricing toggle */
  showAnnualToggle?: boolean;
  /** Callback when user clicks Free tier CTA */
  onFreeCTA?: () => void;
  /** Callback when user clicks Premium tier CTA */
  onPremiumCTA?: () => void;
  /** Callback when user clicks Pro tier CTA */
  onProCTA?: () => void;
  /** Hide specific tiers */
  hideTiers?: ('free' | 'premium' | 'pro')[];
}

export default function PricingComparisonCard({
  emphasize = 'premium',
  compact = false,
  showAnnualToggle = false,
  onFreeCTA,
  onPremiumCTA,
  onProCTA,
  hideTiers = [],
}: PricingComparisonCardProps) {
  
  const handleFreeCTA = () => {
    if (onFreeCTA) {
      onFreeCTA();
    } else {
      window.location.href = '/invoice-templates';
    }
  };

  const handlePremiumCTA = () => {
    if (onPremiumCTA) {
      onPremiumCTA();
    } else {
      alert('Payment integration coming soon! We\'ll notify you when it\'s ready.');
    }
  };

  const handleProCTA = () => {
    if (onProCTA) {
      onProCTA();
    } else {
      // Redirect to checkout page
      window.location.href = '/checkout';
    }
  };

  const visibleTiers = [
    !hideTiers.includes('free') && 'free',
    !hideTiers.includes('premium') && 'premium',
    !hideTiers.includes('pro') && 'pro',
  ].filter(Boolean);

  const gridCols = visibleTiers.length === 3 ? 'md:grid-cols-3' : visibleTiers.length === 2 ? 'md:grid-cols-2' : 'grid-cols-1';

  return (
    <div className={`grid ${gridCols} gap-6 ${compact ? 'gap-4' : 'gap-6'}`}>
      
      {/* FREE TIER */}
      {!hideTiers.includes('free') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`
            bg-white rounded-xl border-2 transition-all
            ${emphasize === 'free' 
              ? 'border-green-500 shadow-lg scale-105' 
              : 'border-gray-200 hover:border-green-300'
            }
            ${compact ? 'p-4' : 'p-6'}
          `}
        >
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-6 h-6 text-green-600" />
              <h3 className={`font-bold text-gray-900 ${compact ? 'text-lg' : 'text-xl'}`}>
                Free
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Perfect for trying out the platform
            </p>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">£0</span>
              <span className="ml-2 text-gray-600">/forever</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {PRICING_CONSTANTS.FREE_TEMPLATE_COUNT} templates with watermark
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-6">
            {[
              `All ${getTotalTemplateCount(false)} invoice templates`,
              'PDF download with watermark',
              'All required invoice fields',
              'UK VAT & CIS compliance',
              'Professional design',
              'Community support',
            ].map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            onClick={handleFreeCTA}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg"
          >
            Get Started Free
          </button>
          
          <p className="text-xs text-center text-gray-500 mt-3">
            No credit card required
          </p>
        </motion.div>
      )}

      {/* PREMIUM TIER */}
      {!hideTiers.includes('premium') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={`
            bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 transition-all relative
            ${emphasize === 'premium' 
              ? 'border-blue-500 shadow-xl scale-105' 
              : 'border-blue-200 hover:border-blue-400'
            }
            ${compact ? 'p-4' : 'p-6'}
          `}
        >
          {/* Best Value Badge */}
          {emphasize === 'premium' && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
                <Sparkles className="w-3 h-3 mr-1" />
                MOST POPULAR
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-4 mt-2">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <h3 className={`font-bold text-gray-900 ${compact ? 'text-lg' : 'text-xl'}`}>
                Premium
              </h3>
            </div>
            <p className="text-sm text-gray-700">
              All templates, watermark-free
            </p>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">
                £{PRICING_CONSTANTS.PREMIUM_MONTHLY}
              </span>
              <span className="ml-2 text-gray-600">/month</span>
            </div>
            <p className="text-xs text-blue-700 font-medium mt-1">
              or £{(PRICING_CONSTANTS.PREMIUM_ANNUAL / 12).toFixed(2)}/mo paid annually
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-6">
            {[
              `All ${getTotalTemplateCount(false)} free templates (no watermark)`,
              'Unlimited PDF downloads',
              'Basic custom branding (logo)',
              'Save invoice data (30 days)',
              'Email support (24hr response)',
              'Automatic VAT calculations',
              'Word & Excel export',
            ].map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            onClick={handlePremiumCTA}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
          >
            Upgrade to Premium
          </button>
          
          <p className="text-xs text-center text-blue-700 mt-3">
            💳 Payment integration coming soon
          </p>
        </motion.div>
      )}

      {/* PRO TIER */}
      {!hideTiers.includes('pro') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className={`
            bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 transition-all relative
            ${emphasize === 'pro' 
              ? 'border-purple-500 shadow-xl scale-105' 
              : 'border-purple-200 hover:border-purple-400'
            }
            ${compact ? 'p-4' : 'p-6'}
          `}
        >
          {/* Pro Badge */}
          {emphasize === 'pro' && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
                <Crown className="w-3 h-3 mr-1" />
                FOR POWER USERS
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-4 mt-2">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-6 h-6 text-purple-600" />
              <h3 className={`font-bold text-gray-900 ${compact ? 'text-lg' : 'text-xl'}`}>
                Pro
              </h3>
            </div>
            <p className="text-sm text-gray-700">
              Premium + AI parser + automation
            </p>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">
                £{PRICING_CONSTANTS.PRO_MONTHLY}
              </span>
              <span className="ml-2 text-gray-600">/month</span>
            </div>
            <p className="text-xs text-purple-700 font-medium mt-1">
              or £{(PRICING_CONSTANTS.PRO_ANNUAL / 12).toFixed(2)}/mo paid annually
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-6">
            {[
              'Everything in Premium, plus:',
              `${getTotalTemplateCount(true)} total templates (includes ${getTotalTemplateCount(true) - getTotalTemplateCount(false)} premium)`,
              `AI invoice parser (${PRICING_CONSTANTS.PRO_PARSER_LIMIT}/month)`,
              'Advanced branding (colors, fonts)',
              'Invoice history (1 year)',
              `Team collaboration (${PRICING_CONSTANTS.PRO_TEAM_USERS} users)`,
              'Priority support (1hr response)',
              'Recurring invoice automation',
            ].map((feature, index) => (
              <li key={index} className="flex items-start">
                {index === 0 ? (
                  <>
                    <Zap className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-900 font-semibold">{feature}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </>
                )}
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            onClick={handleProCTA}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg"
          >
            Go Pro
          </button>
          
          <p className="text-xs text-center text-purple-700 mt-3">
            ✅ Available now!
          </p>
        </motion.div>
      )}
    </div>
  );
}

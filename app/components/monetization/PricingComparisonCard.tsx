'use client';

import { CheckCircle, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { PRICING_CONSTANTS } from '@/app/types/pricing';

/**
 * PricingComparisonCard Component
 * 
 * Displays side-by-side comparison between:
 * - One-time template purchase (£9.99)
 * - Subscription plan (£29/month)
 * 
 * Used in: UpgradePrompt modal, pricing page, template pages
 * 
 * Design: Non-overwhelming, clear benefits, "Coming Soon" buttons
 */

interface PricingComparisonCardProps {
  /** Which template is being considered (for one-time purchase) */
  templateName?: string;
  /** Show one-time purchase option */
  showOneTime?: boolean;
  /** Show subscription option */
  showSubscription?: boolean;
  /** Which option to emphasize (highlight) */
  emphasize?: 'one-time' | 'subscription';
  /** Compact mode (less padding, smaller text) */
  compact?: boolean;
  /** Callback when user clicks one-time purchase */
  onOneTimePurchase?: () => void;
  /** Callback when user clicks subscription */
  onSubscriptionPurchase?: () => void;
}

export default function PricingComparisonCard({
  templateName = 'this template',
  showOneTime = true,
  showSubscription = true,
  emphasize = 'subscription',
  compact = false,
  onOneTimePurchase,
  onSubscriptionPurchase,
}: PricingComparisonCardProps) {
  
  const handleOneTimeClick = () => {
    if (onOneTimePurchase) {
      onOneTimePurchase();
    } else {
      // Default: Show "Coming Soon" toast
      alert('Payment integration coming soon! We\'ll notify you via email when it\'s ready.');
    }
  };

  const handleSubscriptionClick = () => {
    if (onSubscriptionPurchase) {
      onSubscriptionPurchase();
    } else {
      // Default: Show "Coming Soon" toast
      alert('Payment integration coming soon! We\'ll notify you via email when it\'s ready.');
    }
  };

  return (
    <div className={`grid ${showOneTime && showSubscription ? 'md:grid-cols-2' : 'grid-cols-1'} gap-6 ${compact ? 'gap-4' : 'gap-6'}`}>
      
      {/* ONE-TIME PURCHASE OPTION */}
      {showOneTime && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`
            bg-white rounded-xl border-2 p-6 transition-all
            ${emphasize === 'one-time' 
              ? 'border-blue-500 shadow-lg scale-105' 
              : 'border-gray-200 hover:border-blue-300'
            }
            ${compact ? 'p-4' : 'p-6'}
          `}
        >
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`font-bold text-gray-900 ${compact ? 'text-lg' : 'text-xl'}`}>
                Buy This Template
              </h3>
              {emphasize === 'one-time' && (
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                  Quick Option
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">
              One-time payment, lifetime access
            </p>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">
                £{PRICING_CONSTANTS.TEMPLATE_PRICE}
              </span>
              <span className="ml-2 text-gray-600">one-time</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              For {templateName}
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-6">
            {[
              'Lifetime access to this template',
              'Remove watermark forever',
              'Unlimited PDF downloads',
              'Save your invoice data',
              'Free template updates',
            ].map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            onClick={handleOneTimeClick}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
          >
            Buy Now - £{PRICING_CONSTANTS.TEMPLATE_PRICE}
          </button>
          
          <p className="text-xs text-center text-gray-500 mt-3">
            💳 Payment integration coming soon
          </p>
        </motion.div>
      )}

      {/* SUBSCRIPTION OPTION */}
      {showSubscription && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={`
            bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border-2 p-6 transition-all relative
            ${emphasize === 'subscription' 
              ? 'border-purple-500 shadow-xl scale-105' 
              : 'border-purple-200 hover:border-purple-400'
            }
            ${compact ? 'p-4' : 'p-6'}
          `}
        >
          {/* Best Value Badge */}
          {emphasize === 'subscription' && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
                <Sparkles className="w-3 h-3 mr-1" />
                BEST VALUE
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-4 mt-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`font-bold text-gray-900 ${compact ? 'text-lg' : 'text-xl'}`}>
                Professional Plan
              </h3>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-gray-700">
              All templates + AI parser
            </p>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">
                £{PRICING_CONSTANTS.PROFESSIONAL_MONTHLY}
              </span>
              <span className="ml-2 text-gray-600">/month</span>
            </div>
            <p className="text-xs text-purple-700 font-medium mt-1">
              Save £{(PRICING_CONSTANTS.PROFESSIONAL_MONTHLY * 12 - PRICING_CONSTANTS.PROFESSIONAL_ANNUAL).toFixed(0)}/year with annual billing
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-6">
            {[
              'All 11 invoice templates',
              'No watermarks on any template',
              'AI invoice parser (200/month)',
              'Unlimited PDF downloads',
              'Save unlimited invoice data',
              'Priority email support',
              'New templates added monthly',
            ].map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            onClick={handleSubscriptionClick}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg"
          >
            Start Free Trial
          </button>
          
          <p className="text-xs text-center text-purple-700 mt-3">
            💳 Payment integration coming soon
          </p>
        </motion.div>
      )}
    </div>
  );
}

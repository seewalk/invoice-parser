'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PRICING_CONSTANTS } from '@/app/types/pricing';

/**
 * IndividualTemplatePricing Component
 * 
 * "Pay-As-You-Go" section for pricing page
 * Shows one-time template purchase option (£9.99)
 * Entry-level option before subscriptions
 */

export default function IndividualTemplatePricing() {
  
  const handleBuyClick = () => {
    // Will be replaced with actual checkout flow later
    alert('Payment integration coming soon! We\'ll notify you via email when it\'s ready.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-16"
    >
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4 mr-2" />
          Pay-As-You-Go
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Individual Templates
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Perfect for one-time needs or trying out the platform without commitment
        </p>
      </div>

      {/* Pricing Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* Left: Pricing Info */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Buy Individual Templates
              </h3>
              
              {/* Price Display */}
              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-gray-900">
                    £{PRICING_CONSTANTS.TEMPLATE_PRICE}
                  </span>
                  <span className="ml-3 text-xl text-gray-600">per template</span>
                </div>
                <p className="text-sm text-gray-600">
                  One-time payment • Lifetime access
                </p>
              </div>

              {/* Value Proposition */}
              <div className="bg-white rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong className="text-blue-700">Great for:</strong> Freelancers, small businesses,
                  or anyone who needs just one specific template without recurring costs.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/invoice-templates"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl text-center flex items-center justify-center"
                >
                  Browse Templates
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <button
                  onClick={handleBuyClick}
                  className="flex-1 bg-white text-blue-700 border-2 border-blue-300 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all text-center"
                >
                  Coming Soon
                </button>
              </div>
            </div>

            {/* Right: Features List */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                What's Included:
              </h4>
              <ul className="space-y-3">
                {[
                  'Lifetime access to your template',
                  'Remove watermark forever',
                  'Unlimited PDF downloads',
                  'Save your invoice data',
                  'Free template updates',
                  'No recurring fees',
                  'No credit card required to preview',
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Comparison Note */}
              <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                <p className="text-xs text-gray-600">
                  <strong className="text-gray-900">💡 Tip:</strong> If you need more than 3 templates,
                  our Professional plan (£29/month) gives you access to all 11 templates plus the AI parser.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Helper */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-center text-sm font-semibold text-gray-900 mb-4">
            Which Option Should I Choose?
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            {/* One-Time */}
            <div className="text-center p-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">Choose One-Time If:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ You need just one template</li>
                <li>✓ You want no recurring fees</li>
                <li>✓ You prefer one-time payment</li>
              </ul>
            </div>

            {/* Subscription */}
            <div className="text-center p-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">Choose Subscription If:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ You need multiple templates</li>
                <li>✓ You want AI parser access</li>
                <li>✓ You process invoices regularly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

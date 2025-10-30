'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Rocket, ArrowRight, Sparkles, Crown, Gift } from 'lucide-react';
import Link from 'next/link';
import { getPricingPlansForContext, type PricingPlan } from '@/app/lib/pricingConfig';

/**
 * PricingSection Component
 * 
 * Homepage pricing section - shows Free, Premium, and Pro tiers
 * Now uses centralized pricing configuration for consistency
 * 
 * Data source: @/app/lib/pricingConfig.ts
 */

export default function PricingSection() {
  // Get pricing plans for homepage (Free, Premium, Pro)
  const plans = getPricingPlansForContext('homepage');
  
  return (
    <section
      id="pricing"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* SEO OPTIMIZED Heading */}
          <h2 id="pricing-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Invoice Processing Software Pricing -{' '}
            <span className="gradient-text">Simple & Transparent</span>
          </h2>
          {/* SEO OPTIMIZED Subheading */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start free with all templates. Upgrade anytime for watermark-free downloads and advanced features.
            No credit card required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* CTA to Full Pricing Page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Link href="/pricing">
            <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              <span>View Full Pricing Details</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-12 text-white"
        >
          <Rocket className="w-16 h-16 mx-auto mb-4 text-accent-400" aria-hidden="true" />
          <h3 className="text-3xl font-bold mb-4">Need Enterprise-Level Invoice Processing?</h3>
          <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
            Unlimited invoices, custom ML training, white-label options, dedicated support, and more.
          </p>
          <Link href="/pricing">
            <button
              className="bg-accent-400 text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent-500 transition-all hover:-translate-y-1 shadow-xl"
              aria-label="Contact sales for custom invoice processing pricing"
            >
              Contact Sales for Custom Pricing
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Individual Pricing Card Component
 */
interface PricingCardProps {
  plan: PricingPlan;
  index: number;
}

function PricingCard({ plan, index }: PricingCardProps) {
  // Determine card styling based on tier
  const isFree = plan.tier === 'free';
  const isPremium = plan.tier === 'premium';
  const isPro = plan.tier === 'pro';
  
  // Icon for each tier
  const Icon = isFree ? Gift : isPremium ? Sparkles : Crown;
  
  // Card styling
  const cardClasses = isPremium
    ? "rounded-2xl p-8 bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-2xl scale-105 border-4 border-primary-400 relative"
    : isPro
    ? "rounded-2xl p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200"
    : "rounded-2xl p-8 bg-white border-2 border-gray-200";
  
  const titleColor = isPremium ? "text-white" : "text-gray-900";
  const subtitleColor = isPremium ? "text-primary-100" : "text-gray-600";
  const priceColor = isPremium ? "text-white" : "text-gray-900";
  const priceCurrencyColor = isPremium ? "text-primary-100" : "text-gray-600";
  const featureColor = isPremium ? "text-primary-50" : isPro ? "text-gray-700" : "text-gray-700";
  const checkColor = isPremium ? "text-accent-300" : isPro ? "text-purple-600" : "text-green-500";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={cardClasses}
    >
      {/* Popular Badge for Premium */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-accent-400 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            MOST POPULAR
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Icon className={`w-6 h-6 ${isPremium ? 'text-white' : isPro ? 'text-purple-600' : 'text-green-600'}`} />
          <h3 className={`text-2xl font-bold ${titleColor}`}>{plan.displayName}</h3>
        </div>
        <p className={`text-sm ${subtitleColor}`}>{plan.tagline}</p>
      </div>

      {/* Price */}
      <div className="text-center mb-8">
        <div className="flex items-baseline justify-center">
          <span className={`text-xl ${priceCurrencyColor}`}>£</span>
          <span className={`text-5xl font-bold ${priceColor}`}>
            {plan.price.monthly === 0 ? '0' : plan.price.monthly.toFixed(2).replace('.00', '')}
          </span>
        </div>
        <p className={`text-sm mt-1 ${priceCurrencyColor}`}>
          {plan.price.monthly === 0 ? 'forever' : 'per month'}
        </p>
        {plan.price.annual > 0 && (
          <p className={`text-xs mt-1 ${isPremium ? 'text-primary-200' : isPro ? 'text-purple-700' : 'text-gray-500'} font-medium`}>
            or £{(plan.price.annual / 12).toFixed(2)}/mo paid annually
          </p>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8" role="list">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${checkColor}`} aria-hidden="true" />
            <span className={`text-sm ${featureColor}`}>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link href={plan.ctaUrl} className="block">
        <button 
          className={
            isPremium
              ? "w-full py-3 rounded-full font-semibold transition-all hover:-translate-y-1 bg-white text-primary-700 shadow-lg hover:shadow-xl"
              : isPro
              ? "w-full py-3 rounded-full font-semibold transition-all hover:-translate-y-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl"
              : "w-full py-3 rounded-full font-semibold transition-all hover:-translate-y-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg hover:shadow-xl"
          }
        >
          {plan.cta}
        </button>
      </Link>
      
      {/* Payment notice for paid plans */}
      {plan.price.monthly > 0 && (
        <p className={`text-xs text-center mt-3 ${isPremium ? 'text-primary-200' : isPro ? 'text-purple-600' : 'text-gray-500'}`}>
          💳 Payment integration coming soon
        </p>
      )}
    </motion.div>
  );
}

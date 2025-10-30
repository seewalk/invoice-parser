'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Sparkles, Crown, Gift } from 'lucide-react';
import Link from 'next/link';
import { getPricingPlansForContext, type PricingPlan } from '@/app/lib/pricingConfig';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { EnterpriseCTA } from '../CTASectionBlack';

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
        <div className="text-center mb-16">
          {/* SEO OPTIMIZED Heading */}
          <Heading 
            as="h2" 
            id="pricing-heading" 
            size="display-md" 
            align="center" 
            className="mb-4"
          >
            Invoice Processing Software Pricing -{' '}
            <span className="gradient-text">Simple & Transparent</span>
          </Heading>
          {/* SEO OPTIMIZED Subheading */}
          <Text 
            size="xl" 
            variant="muted" 
            align="center" 
            maxWidth="3xl" 
            centered
            animate
            className="mb-8"
          >
            Start free with all templates. Upgrade anytime for watermark-free downloads and advanced features.
            No credit card required.
          </Text>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* CTA to Full Pricing Page */}
        <div className="text-center mb-16">
          <Link href="/pricing">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight />}
              iconPosition="right"
              animate
            >
              View Full Pricing Details
            </Button>
          </Link>
        </div>

        {/* Enterprise CTA */}
        <EnterpriseCTA />
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
          <Badge 
            variant="accent" 
            size="md" 
            icon={<Sparkles />}
            className="font-bold"
          >
            MOST POPULAR
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Icon className={`w-6 h-6 ${isPremium ? 'text-white' : isPro ? 'text-purple-600' : 'text-green-600'}`} />
          <Heading as="h3" size="xl" className={titleColor}>{plan.displayName}</Heading>
        </div>
        <Text size="sm" className={subtitleColor}>{plan.tagline}</Text>
      </div>

      {/* Price */}
      <div className="text-center mb-8">
        <div className="flex items-baseline justify-center">
          <Text as="span" size="xl" className={priceCurrencyColor}>£</Text>
          <Text as="span" className={`text-5xl font-bold ${priceColor}`}>
            {plan.price.monthly === 0 ? '0' : plan.price.monthly.toFixed(2).replace('.00', '')}
          </Text>
        </div>
        <Text size="sm" className={`mt-1 ${priceCurrencyColor}`}>
          {plan.price.monthly === 0 ? 'forever' : 'per month'}
        </Text>
        {plan.price.annual > 0 && (
          <Text size="xs" weight="medium" className={`mt-1 ${isPremium ? 'text-primary-200' : isPro ? 'text-purple-700' : 'text-gray-500'}`}>
            or £{(plan.price.annual / 12).toFixed(2)}/mo paid annually
          </Text>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8" role="list">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${checkColor}`} aria-hidden="true" />
            <Text as="span" size="sm" className={featureColor}>{feature}</Text>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link href={plan.ctaUrl} className="block">
        <Button
          variant={isPremium ? "secondary" : "primary"}
          size="md"
          fullWidth
          className={
            isPremium
              ? "bg-white text-primary-700"
              : isPro
              ? "bg-gradient-to-r from-purple-600 to-pink-600"
              : ""
          }
        >
          {plan.cta}
        </Button>
      </Link>
      
      {/* Payment notice for paid plans */}
      {plan.price.monthly > 0 && (
        <Text 
          size="xs" 
          align="center" 
          className={`mt-3 ${isPremium ? 'text-primary-200' : isPro ? 'text-purple-600' : 'text-gray-500'}`}
        >
          💳 Payment integration coming soon
        </Text>
      )}
    </motion.div>
  );
}

/**
 * ============================================================================
 * CENTRALIZED PRICING CONFIGURATION
 * ============================================================================
 * 
 * SINGLE SOURCE OF TRUTH for all pricing across the application.
 * 
 * This file contains:
 * 1. Pricing tier definitions
 * 2. Feature lists for each tier
 * 3. Helper functions to get pricing data
 * 4. Context-aware pricing retrieval
 * 
 * Import this file in:
 * - React components (PricingSection, PricingComparisonCard, etc.)
 * - Schema generators (pricingSchemaConfig.ts)
 * - Pages (pricing/page.tsx, homepage, etc.)
 * 
 * DO NOT hardcode pricing anywhere else!
 */

import { PRICING_CONSTANTS, type PricingTier } from '@/app/types/pricing';

// ============================================================================
// PRICING TIER DEFINITIONS
// ============================================================================

export interface PricingPlan {
  id: string;
  tier: PricingTier;
  name: string;
  displayName: string; // For UI display
  tagline: string;
  price: {
    monthly: number;
    annual: number;
    display: string; // e.g., "£9.99/month"
  };
  limits: {
    templates: number | 'all';
    templatesWatermark: boolean;
    parserInvoices: number; // per month
    historyDays: number;
    teamUsers: number;
    apiAccess: boolean;
  };
  features: string[];
  highlighted?: boolean;
  popular?: boolean;
  cta: string;
  ctaUrl: string;
}

/**
 * MASTER PRICING PLANS
 * All pricing tiers defined in one place
 */
export const PRICING_PLANS: Record<PricingTier, PricingPlan> = {
  free: {
    id: 'free',
    tier: 'free',
    name: 'Free',
    displayName: 'Free',
    tagline: 'Perfect for trying out the platform',
    price: {
      monthly: 0,
      annual: 0,
      display: '£0',
    },
    limits: {
      templates: 'all',
      templatesWatermark: true,
      parserInvoices: 0,
      historyDays: 0,
      teamUsers: 1,
      apiAccess: false,
    },
    features: [
      'All 11 invoice templates',
      'PDF download with watermark',
      'All required invoice fields',
      'UK VAT & CIS compliance',
      'Professional design',
      'Community support',
    ],
    cta: 'Get Started Free',
    ctaUrl: '/invoice-templates',
  },

  premium: {
    id: 'premium',
    tier: 'premium',
    name: 'Premium',
    displayName: 'Premium',
    tagline: 'All templates, watermark-free',
    price: {
      monthly: PRICING_CONSTANTS.PREMIUM_MONTHLY,
      annual: PRICING_CONSTANTS.PREMIUM_ANNUAL,
      display: `£${PRICING_CONSTANTS.PREMIUM_MONTHLY}/month`,
    },
    limits: {
      templates: 'all',
      templatesWatermark: false,
      parserInvoices: 0,
      historyDays: PRICING_CONSTANTS.PREMIUM_HISTORY_DAYS,
      teamUsers: 1,
      apiAccess: false,
    },
    features: [
      'All 11 templates (no watermark)',
      'Unlimited PDF downloads',
      'Basic custom branding (logo)',
      'Save invoice data (30 days)',
      'Email support (24hr response)',
      'Automatic VAT calculations',
      'Word & Excel export',
    ],
    highlighted: true,
    popular: true,
    cta: 'Upgrade to Premium',
    ctaUrl: '/pricing',
  },

  pro: {
    id: 'pro',
    tier: 'pro',
    name: 'Pro',
    displayName: 'Pro',
    tagline: 'Premium + AI parser + automation',
    price: {
      monthly: PRICING_CONSTANTS.PRO_MONTHLY,
      annual: PRICING_CONSTANTS.PRO_ANNUAL,
      display: `£${PRICING_CONSTANTS.PRO_MONTHLY}/month`,
    },
    limits: {
      templates: 'all',
      templatesWatermark: false,
      parserInvoices: PRICING_CONSTANTS.PRO_PARSER_LIMIT,
      historyDays: PRICING_CONSTANTS.PRO_HISTORY_DAYS,
      teamUsers: PRICING_CONSTANTS.PRO_TEAM_USERS,
      apiAccess: true,
    },
    features: [
      'Everything in Premium, plus:',
      `AI invoice parser (${PRICING_CONSTANTS.PRO_PARSER_LIMIT}/month)`,
      'Advanced branding (colors, fonts)',
      'Invoice history (1 year)',
      `Team collaboration (${PRICING_CONSTANTS.PRO_TEAM_USERS} users)`,
      'Priority support (1hr response)',
      'Recurring invoice automation',
      'API access',
    ],
    cta: 'Go Pro',
    ctaUrl: '/pricing',
  },

  enterprise: {
    id: 'enterprise',
    tier: 'enterprise',
    name: 'Enterprise',
    displayName: 'Enterprise',
    tagline: 'Custom solutions for large organizations',
    price: {
      monthly: 0, // Contact for pricing
      annual: 0,
      display: 'Contact Sales',
    },
    limits: {
      templates: 'all',
      templatesWatermark: false,
      parserInvoices: 999999, // Unlimited
      historyDays: 365 * 10, // 10 years
      teamUsers: 999, // Unlimited
      apiAccess: true,
    },
    features: [
      'Unlimited everything',
      'Custom ML training',
      'White-label options',
      'Dedicated support team',
      'SLA guarantees',
      'Custom integrations',
      'On-premise deployment option',
      'Advanced security features',
    ],
    cta: 'Contact Sales',
    ctaUrl: '/contact',
  },
};

// ============================================================================
// CONTEXT-AWARE PRICING RETRIEVAL
// ============================================================================

export type PricingContext = 
  | 'full'           // Show all tiers (pricing page)
  | 'homepage'       // Show simplified tiers for homepage
  | 'templates'      // Template-focused (free, premium, pro)
  | 'parser'         // Parser-focused (free, pro)
  | 'upgrade';       // Upgrade modal (premium, pro)

/**
 * Get pricing plans for specific context
 * Different pages show different tier combinations
 */
export function getPricingPlansForContext(context: PricingContext): PricingPlan[] {
  switch (context) {
    case 'full':
      // Pricing page: show all tiers including enterprise
      return [
        PRICING_PLANS.free,
        PRICING_PLANS.premium,
        PRICING_PLANS.pro,
        PRICING_PLANS.enterprise,
      ];

    case 'homepage':
      // Homepage: show 3 main tiers, skip enterprise
      return [
        PRICING_PLANS.free,
        PRICING_PLANS.premium,
        PRICING_PLANS.pro,
      ];

    case 'templates':
      // Template pages: emphasize template access
      return [
        PRICING_PLANS.free,
        PRICING_PLANS.premium,
        PRICING_PLANS.pro,
      ];

    case 'parser':
      // Parser page: show only plans with parser access
      return [
        {
          ...PRICING_PLANS.free,
          tagline: 'Try the platform first',
          features: [
            'All 11 templates with watermark',
            'No parser access',
            'Community support',
          ],
        },
        {
          ...PRICING_PLANS.pro,
          tagline: `${PRICING_PLANS.pro.limits.parserInvoices} invoices/month`,
          highlighted: true,
          popular: true,
        },
      ];

    case 'upgrade':
      // Upgrade modals: show only paid tiers
      return [
        PRICING_PLANS.premium,
        PRICING_PLANS.pro,
      ];

    default:
      return [PRICING_PLANS.free, PRICING_PLANS.premium, PRICING_PLANS.pro];
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get a single pricing plan by tier
 */
export function getPricingPlan(tier: PricingTier): PricingPlan {
  return PRICING_PLANS[tier];
}

/**
 * Get all pricing tiers
 */
export function getAllPricingPlans(): PricingPlan[] {
  return Object.values(PRICING_PLANS);
}

/**
 * Get pricing plans excluding specific tiers
 */
export function getPricingPlansExcluding(exclude: PricingTier[]): PricingPlan[] {
  return Object.values(PRICING_PLANS).filter(
    plan => !exclude.includes(plan.tier)
  );
}

/**
 * Format price for display
 */
export function formatPrice(
  amount: number,
  frequency: 'monthly' | 'annual' | 'one-time' = 'monthly'
): string {
  if (amount === 0) return 'Free';
  
  const price = `£${amount.toFixed(2)}`;
  
  switch (frequency) {
    case 'monthly':
      return `${price}/month`;
    case 'annual':
      return `${price}/year`;
    case 'one-time':
      return price;
    default:
      return price;
  }
}

/**
 * Calculate annual savings
 */
export function calculateAnnualSavings(tier: PricingTier): number {
  const plan = PRICING_PLANS[tier];
  if (!plan || plan.price.monthly === 0) return 0;
  
  const monthlyTotal = plan.price.monthly * 12;
  const annualTotal = plan.price.annual;
  
  return monthlyTotal - annualTotal;
}

/**
 * Get price per month when paid annually
 */
export function getAnnualMonthlyPrice(tier: PricingTier): number {
  const plan = PRICING_PLANS[tier];
  if (!plan || plan.price.annual === 0) return 0;
  
  return plan.price.annual / 12;
}

// ============================================================================
// COMPARISON DATA
// ============================================================================

/**
 * Feature comparison matrix
 * Used for pricing comparison tables
 */
export interface FeatureComparison {
  feature: string;
  free: string | boolean;
  premium: string | boolean;
  pro: string | boolean;
  enterprise?: string | boolean;
}

export const FEATURE_COMPARISON: FeatureComparison[] = [
  {
    feature: 'Invoice Templates',
    free: '11 (with watermark)',
    premium: '11 (no watermark)',
    pro: '11 (no watermark)',
    enterprise: 'All + Custom',
  },
  {
    feature: 'PDF Downloads',
    free: 'Unlimited',
    premium: 'Unlimited',
    pro: 'Unlimited',
    enterprise: 'Unlimited',
  },
  {
    feature: 'AI Invoice Parser',
    free: '—',
    premium: '—',
    pro: `${PRICING_CONSTANTS.PRO_PARSER_LIMIT}/month`,
    enterprise: 'Unlimited',
  },
  {
    feature: 'Invoice History',
    free: '—',
    premium: '30 days',
    pro: '1 year',
    enterprise: '10 years',
  },
  {
    feature: 'Team Users',
    free: '1',
    premium: '1',
    pro: `${PRICING_CONSTANTS.PRO_TEAM_USERS}`,
    enterprise: 'Unlimited',
  },
  {
    feature: 'Support',
    free: 'Community',
    premium: '24hr email',
    pro: '1hr priority',
    enterprise: 'Dedicated team',
  },
  {
    feature: 'API Access',
    free: false,
    premium: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'Custom Branding',
    free: false,
    premium: 'Basic (logo)',
    pro: 'Advanced',
    enterprise: 'White-label',
  },
  {
    feature: 'Automation',
    free: false,
    premium: false,
    pro: true,
    enterprise: true,
  },
];

// ============================================================================
// EXPORT SUMMARY
// ============================================================================

/**
 * Quick reference for imports:
 * 
 * import { 
 *   PRICING_PLANS,                    // All pricing plans
 *   getPricingPlansForContext,        // Get plans for specific page
 *   getPricingPlan,                   // Get single plan
 *   formatPrice,                      // Format price display
 *   FEATURE_COMPARISON,               // Comparison table data
 * } from '@/app/lib/pricingConfig';
 */
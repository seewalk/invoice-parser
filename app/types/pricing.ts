/**
 * Type definitions for Pricing and Monetization System
 * 
 * Frontend-only types for displaying pricing information.
 * Backend integration (Stripe, payments) will be added later.
 */

/**
 * Pricing tier levels
 * Updated to freemium subscription model
 */
export type PricingTier = 'free' | 'premium' | 'pro' | 'enterprise';

/**
 * Product types available for purchase
 */
export type ProductType = 'template' | 'subscription' | 'api-access' | 'bulk-processing';

/**
 * Purchase frequency
 */
export type BillingFrequency = 'one-time' | 'monthly' | 'annual';

/**
 * Individual template purchase (one-time payment)
 */
export interface TemplatePurchase {
  templateId: string;
  templateName: string;
  price: number; // £9.99
  currency: 'GBP';
  billingFrequency: 'one-time';
  features: string[]; // e.g., ["Lifetime access", "No watermark", "Unlimited downloads"]
}

/**
 * Subscription plan (recurring payment)
 */
export interface SubscriptionPlan {
  id: string;
  name: string; // "Professional", "Business", "Enterprise"
  tier: PricingTier;
  monthlyPrice: number; // £29
  annualPrice: number; // £261 (with discount)
  currency: 'GBP';
  billingFrequency: 'monthly' | 'annual';
  features: string[];
  limitations: string[];
  popular?: boolean;
  cta: string; // "Start Free Trial", "Contact Sales"
}

/**
 * Pricing comparison between one-time and subscription
 */
export interface PricingComparison {
  oneTime: {
    price: number;
    features: string[];
    bestFor: string; // "One template, lifetime access"
  };
  subscription: {
    monthlyPrice: number;
    annualPrice: number;
    features: string[];
    bestFor: string; // "All templates + parser"
    savings?: string; // "Save £X.XX/year"
  };
}

/**
 * Upgrade prompt configuration
 */
export interface UpgradePromptConfig {
  isOpen: boolean;
  source: 'template-download' | 'invoice-generator' | 'parser';
  templateId?: string;
  templateName?: string;
  showOneTimeOption: boolean;
  showSubscriptionOption: boolean;
  defaultOption?: 'one-time' | 'subscription';
}

/**
 * Pricing display configuration
 */
export interface PricingDisplayConfig {
  showFreeOption: boolean;
  showOneTimeOption: boolean;
  showSubscriptionOption: boolean;
  emphasize?: 'one-time' | 'subscription'; // Which to highlight
  compact?: boolean; // Compact display mode
}

/**
 * Feature comparison item
 */
export interface PricingFeature {
  name: string;
  description?: string;
  included: boolean;
  highlight?: boolean; // Highlight this feature
  comingSoon?: boolean;
}

/**
 * Pricing tier comparison (for pricing page)
 */
export interface PricingTierComparison {
  tier: PricingTier;
  name: string;
  price: number | 'Contact'; // 0 for free, 'Contact' for enterprise
  billingFrequency: BillingFrequency;
  features: PricingFeature[];
  cta: string;
  ctaVariant: 'primary' | 'secondary' | 'ghost';
  popular?: boolean;
}

/**
 * Template pricing display (for template cards)
 */
export interface TemplatePricingDisplay {
  templateId: string;
  templateName: string;
  freeOption: {
    available: boolean;
    watermark: boolean;
    description: string; // "Free with watermark"
  };
  paidOption: {
    available: boolean;
    price: number;
    description: string; // "£9.99 to remove watermark"
  };
  subscriptionOption: {
    available: boolean;
    monthlyPrice: number;
    description: string; // "Included in Professional plan"
  };
}

/**
 * Usage tier limits (for parser free tier)
 */
export interface UsageTierLimits {
  tier: 'free' | 'professional' | 'business';
  invoicesPerMonth: number;
  currentUsage: number;
  resetDate: string; // ISO 8601 date when usage resets
  limitReached: boolean;
}

/**
 * Upgrade CTA configuration
 */
export interface UpgradeCTAConfig {
  variant: 'banner' | 'card' | 'inline' | 'modal';
  title: string;
  description: string;
  ctaText: string;
  ctaUrl?: string; // Optional URL (for "Coming Soon" can be undefined)
  dismissible: boolean;
  showFeatures: boolean;
  source: string; // For analytics tracking
}

/**
 * Mock checkout preview (frontend only, no real payments)
 */
export interface CheckoutPreview {
  productType: ProductType;
  productName: string;
  price: number;
  billingFrequency: BillingFrequency;
  currency: 'GBP';
  features: string[];
  comingSoon: boolean; // True for now (no backend yet)
}

/**
 * Pricing constants - Freemium Subscription Model
 * 
 * Three-tier structure:
 * - FREE: All 11 templates with watermark
 * - PREMIUM (£9.99/mo): All templates without watermark + basic features
 * - PRO (£29.99/mo): Premium + AI parser + advanced features
 */
export const PRICING_CONSTANTS = {
  // FREE TIER (no payment)
  FREE_TEMPLATE_COUNT: 11, // All templates available for free (with watermark)
  FREE_WATERMARK: true,
  FREE_PARSER_LIMIT: 0, // No parser access on free tier
  FREE_HISTORY_DAYS: 0, // No invoice history
  FREE_SUPPORT: 'community', // Community forum support only
  
  // PREMIUM TIER (£9.99/month)
  PREMIUM_MONTHLY: 9.99,
  PREMIUM_ANNUAL: 95.90, // ~20% discount (£7.99/month when paid annually)
  PREMIUM_TEMPLATE_COUNT: 11, // All templates
  PREMIUM_WATERMARK: false,
  PREMIUM_PARSER_LIMIT: 0, // No parser on Premium tier
  PREMIUM_SUPPORT: '24hr', // Email support within 24 hours
  PREMIUM_HISTORY_DAYS: 30, // 30 days invoice history
  PREMIUM_BRANDING: 'basic', // Logo upload only
  
  // PRO TIER (£29.99/month)
  PRO_MONTHLY: 29.99,
  PRO_ANNUAL: 287.90, // ~20% discount (£23.99/month when paid annually)
  PRO_TEMPLATE_COUNT: 11, // All templates (same as Premium)
  PRO_WATERMARK: false,
  PRO_PARSER_LIMIT: 200, // 200 invoices per month
  PRO_SUPPORT: '1hr', // Priority support within 1 hour
  PRO_HISTORY_DAYS: 365, // 1 year invoice history
  PRO_TEAM_USERS: 3, // Up to 3 team members
  PRO_BRANDING: 'advanced', // Custom colors, fonts, logo
  
  CURRENCY: 'GBP',
  
  // DEPRECATED - Kept for backward compatibility
  /** @deprecated Use PREMIUM_MONTHLY instead. Old one-time purchase model removed. */
  TEMPLATE_PRICE: 9.99,
  /** @deprecated Use PRO_MONTHLY instead. Renamed from Professional to Pro. */
  PROFESSIONAL_MONTHLY: 29,
  /** @deprecated Use PRO_ANNUAL instead. */
  PROFESSIONAL_ANNUAL: 261,
  /** @deprecated Business tier merged into Pro tier. */
  BUSINESS_MONTHLY: 99,
  /** @deprecated Business tier merged into Pro tier. */
  BUSINESS_ANNUAL: 891,
  /** @deprecated Use PRO_PARSER_LIMIT instead. */
  PROFESSIONAL_PARSER_LIMIT: 200,
  /** @deprecated Business tier no longer exists. */
  BUSINESS_PARSER_LIMIT: 1000,
} as const;

/**
 * Helper type for pricing display
 */
export type PriceDisplay = {
  amount: number;
  currency: string;
  frequency: 'one-time' | 'month' | 'year';
  formatted: string; // e.g., "£9.99", "£29/month"
};

/**
 * Subscription status (for future use when backend is ready)
 */
export interface SubscriptionStatus {
  active: boolean;
  tier: PricingTier;
  billingFrequency: BillingFrequency;
  nextBillingDate?: string;
  cancelAtPeriodEnd?: boolean;
}

/**
 * User's purchased templates (for future use)
 */
export interface PurchasedTemplate {
  templateId: string;
  templateName: string;
  purchasedAt: string; // ISO 8601 timestamp
  price: number;
  hasWatermark: boolean; // false if purchased
}

/**
 * User's monetization status (for future use)
 */
export interface UserMonetizationStatus {
  hasPurchasedAnyTemplate: boolean;
  purchasedTemplates: PurchasedTemplate[];
  hasActiveSubscription: boolean;
  subscriptionStatus?: SubscriptionStatus;
  parserUsage?: UsageTierLimits;
}
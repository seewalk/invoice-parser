/**
 * ============================================================================
 * ELEKTROLUMA ADVANTAGES DATA
 * ============================================================================
 * 
 * Centralized data for Elektroluma's competitive advantages.
 * Used in competitor comparison pages and marketing materials.
 */

import { 
  Zap, 
  Shield, 
  CheckCircle, 
  TrendingUp, 
  DollarSign, 
  Globe,
  type LucideIcon 
} from 'lucide-react';

export interface ElektrolumaAdvantage {
  icon: LucideIcon;
  title: string;
  description: string;
  category: 'technology' | 'compliance' | 'pricing' | 'integration' | 'support';
}

/**
 * Core Elektroluma advantages by category
 */
export const ELEKTROLUMA_ADVANTAGES: ElektrolumaAdvantage[] = [
  // Technology
  {
    icon: Zap,
    title: 'AI-Powered Automation',
    description: 'Automated invoice parsing and data extraction with 99% accuracy. No manual data entry required.',
    category: 'technology',
  },
  {
    icon: CheckCircle,
    title: '90% Faster Processing',
    description: 'Process invoices in under 5 seconds vs 5-10 minutes manual entry. Save hours every week.',
    category: 'technology',
  },
  
  // UK Compliance
  {
    icon: Shield,
    title: 'UK-First Compliance',
    description: 'Built-in VAT, CIS, and HMRC compliance. Designed specifically for UK small businesses.',
    category: 'compliance',
  },
  {
    icon: Globe,
    title: 'UK Data Residency',
    description: 'All data stored in UK data centers. GDPR compliant with UK-based support team.',
    category: 'compliance',
  },
  
  // Integrations
  {
    icon: TrendingUp,
    title: 'Native QuickBooks & Xero Integration',
    description: 'Direct sync with QuickBooks Online and Xero. No manual export/import needed.',
    category: 'integration',
  },
  
  // Pricing
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'Simple per-invoice pricing starting at £0.50/invoice. No hidden fees or setup costs.',
    category: 'pricing',
  },
];

/**
 * Get advantages by category
 */
export function getAdvantagesByCategory(category: ElektrolumaAdvantage['category']): ElektrolumaAdvantage[] {
  return ELEKTROLUMA_ADVANTAGES.filter(adv => adv.category === category);
}

/**
 * Common competitive differentiators (simplified text versions)
 */
export const CORE_DIFFERENTIATORS = {
  // vs Free Generators
  freeGenerator: [
    'AI automation vs manual entry',
    'QuickBooks/Xero integration included',
    'UK-specific compliance (VAT, CIS)',
    'Invoice parsing from emails/PDFs',
    'Unlimited storage included',
    'No ads or watermarks',
  ] as const,
  
  // vs Template Libraries  
  templateLibrary: [
    'AI-powered data extraction',
    'Automated processing (no manual input)',
    'Direct accounting software sync',
    'UK compliance built-in (VAT, CIS)',
    'Email-to-invoice automation',
    'Lower cost per invoice at scale',
  ] as const,
  
  // vs Other AI Parsers
  aiParser: [
    'UK-first compliance (VAT, CIS)',
    '60% more affordable',
    'UK data residency and support',
    'Designed for UK small businesses',
    'Simple per-invoice pricing',
    'No enterprise minimum commitments',
  ] as const,
  
  // vs API Services
  apiService: [
    'Complete UI + API (not API-only)',
    'UK compliance out-of-the-box',
    '70% more affordable for small businesses',
    'No technical integration required',
    'UK-based customer support',
    'Pay-per-invoice (no minimum volume)',
  ] as const,
};

/**
 * Get differentiators by competitor segment
 */
export function getDifferentiatorsBySegment(
  segment: 'free-generator' | 'template-library' | 'ai-parser' | 'api-service'
): readonly string[] {
  const segmentMap = {
    'free-generator': CORE_DIFFERENTIATORS.freeGenerator,
    'template-library': CORE_DIFFERENTIATORS.templateLibrary,
    'ai-parser': CORE_DIFFERENTIATORS.aiParser,
    'api-service': CORE_DIFFERENTIATORS.apiService,
  };
  
  return segmentMap[segment] || CORE_DIFFERENTIATORS.aiParser;
}

/**
 * Migration paths by competitor type
 */
export const MIGRATION_PATHS = {
  freeGenerator: 'Import existing invoices via CSV, continue using familiar interface with added automation',
  templateLibrary: 'Upload your existing templates, we\'ll extract data automatically going forward',
  aiParser: 'Simple API migration guide available. Data export supported in all major formats',
  apiService: 'REST API compatible. Comprehensive migration documentation and support included',
} as const;

/**
 * Key statistics for marketing
 */
export const ELEKTROLUMA_STATS = {
  accuracyRate: 99,
  processingSpeed: '< 5 seconds',
  timeSavings: '90%',
  startingPrice: '£0.50',
  currency: 'GBP',
  dataLocation: 'UK',
  complianceStandards: ['VAT', 'CIS', 'HMRC', 'GDPR'],
} as const;

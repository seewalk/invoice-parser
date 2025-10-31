/**
 * Digital Services Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Digital Services industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 5 (5 free, 0 premium)
 * - Categories: 3 (Web Development & IT, Digital Marketing & SEO, E-commerce & Online Services)
 * - Total Search Volume: 83,700/month
 * - Average CPC: $6.70
 * - SEO Difficulty: Medium-High (57.8)
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface DigitalServicesTemplate {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  description: string;
  tier: 'free' | 'premium';
  searchVolume: number;
  cpc: number;
  difficulty: number;
  keywords: string[];
  sourceFile: string;
  sourceTemplateId: string;
}

export interface DigitalServicesCategory {
  id: string;
  name: string;
  description: string;
  templates: DigitalServicesTemplate[];
}

// ============================================================================
// CATEGORY: WEB DEVELOPMENT & IT
// ============================================================================

export const webDevelopmentIT: DigitalServicesCategory = {
  id: 'web-development-it',
  name: 'Web Development & IT',
  description: 'Invoice templates for web developers, software engineers, and IT service providers',
  templates: [
    {
      id: 'web-development-invoice',
      categoryId: 'web-development-it',
      categoryName: 'Web Development & IT',
      name: 'Web Development Invoice',
      description: 'Comprehensive invoice template for web developers with hourly rates, project milestones, and hosting/domain fees',
      tier: 'free',
      searchVolume: 14200,
      cpc: 5.60,
      difficulty: 52,
      keywords: [
        'web development invoice',
        'website developer invoice',
        'web design invoice',
        'frontend developer invoice',
        'fullstack developer billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'web-development-invoice'
    },
    {
      id: 'it-services-invoice',
      categoryId: 'web-development-it',
      categoryName: 'Web Development & IT',
      name: 'IT Services Invoice',
      description: 'Professional invoice template for IT service providers featuring support hours, hardware costs, and maintenance fees',
      tier: 'free',
      searchVolume: 19500,
      cpc: 6.80,
      difficulty: 58,
      keywords: [
        'it services invoice',
        'it support invoice',
        'managed it services invoice',
        'tech support billing',
        'it consulting invoice'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'it-services-invoice'
    }
  ]
};

// ============================================================================
// CATEGORY: DIGITAL MARKETING & SEO
// ============================================================================

export const digitalMarketingSEO: DigitalServicesCategory = {
  id: 'digital-marketing-seo',
  name: 'Digital Marketing & SEO',
  description: 'Invoice templates for digital marketers, SEO specialists, and social media managers',
  templates: [
    {
      id: 'digital-marketing-invoice',
      categoryId: 'digital-marketing-seo',
      categoryName: 'Digital Marketing & SEO',
      name: 'Digital Marketing Invoice',
      description: 'Versatile invoice template for digital marketing agencies with campaign management, ad spend, and performance bonuses',
      tier: 'free',
      searchVolume: 22100,
      cpc: 7.20,
      difficulty: 62,
      keywords: [
        'digital marketing invoice',
        'marketing agency invoice',
        'social media marketing invoice',
        'ppc management invoice',
        'email marketing billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'digital-marketing-invoice'
    },
    {
      id: 'seo-services-invoice',
      categoryId: 'digital-marketing-seo',
      categoryName: 'Digital Marketing & SEO',
      name: 'SEO Services Invoice',
      description: 'Specialized invoice template for SEO consultants featuring keyword research, on-page optimization, and link building',
      tier: 'free',
      searchVolume: 16800,
      cpc: 8.40,
      difficulty: 65,
      keywords: [
        'seo invoice',
        'seo services invoice',
        'search engine optimization invoice',
        'seo consultant invoice',
        'seo agency billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'seo-services-invoice'
    }
  ]
};

// ============================================================================
// CATEGORY: E-COMMERCE & ONLINE SERVICES
// ============================================================================

export const ecommerceOnlineServices: DigitalServicesCategory = {
  id: 'ecommerce-online-services',
  name: 'E-commerce & Online Services',
  description: 'Invoice templates for e-commerce businesses and online service providers',
  templates: [
    {
      id: 'ecommerce-invoice',
      categoryId: 'ecommerce-online-services',
      categoryName: 'E-commerce & Online Services',
      name: 'E-commerce Invoice',
      description: 'Professional invoice template for e-commerce businesses with product listings, shipping, taxes, and payment processing fees',
      tier: 'free',
      searchVolume: 11100,
      cpc: 5.50,
      difficulty: 52,
      keywords: [
        'ecommerce invoice',
        'online store invoice',
        'shopify invoice',
        'woocommerce invoice',
        'online retail billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'ecommerce-invoice'
    }
  ]
};

// ============================================================================
// INDUSTRY METADATA
// ============================================================================

export const digitalServicesIndustryMetadata: IndustryMetadata = {
  id: 'digital-services',
  name: 'Digital Services',
  description: 'Invoice templates for digital service providers including web developers, IT professionals, digital marketers, and SEO specialists',
  icon: '💻',
  totalSearchVolume: 83700,
  templateCount: 5,
  tier: 'free',
  categories: ['web-development-it', 'digital-marketing-seo', 'ecommerce-online-services'],
  keywords: [
    'digital services invoice',
    'web development invoice',
    'it services invoice',
    'digital marketing invoice',
    'seo invoice',
    'ecommerce invoice',
    'online services billing'
  ],
  avgCPC: 6.70,
  searchDifficulty: 57.8,
  popularityRank: 3
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const digitalServicesCategories: DigitalServicesCategory[] = [
  webDevelopmentIT,
  digitalMarketingSEO,
  ecommerceOnlineServices
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all digital services templates across all categories
 */
export function getAllDigitalServicesTemplates(): DigitalServicesTemplate[] {
  return digitalServicesCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): DigitalServicesTemplate[] {
  const category = digitalServicesCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): DigitalServicesTemplate | undefined {
  return getAllDigitalServicesTemplates().find(template => template.id === templateId);
}

/**
 * Get all free digital services templates
 */
export function getFreeDigitalServicesTemplates(): DigitalServicesTemplate[] {
  return getAllDigitalServicesTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium digital services templates
 */
export function getPremiumDigitalServicesTemplates(): DigitalServicesTemplate[] {
  return getAllDigitalServicesTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchDigitalServicesTemplates(query: string): DigitalServicesTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllDigitalServicesTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get digital services industry statistics
 */
export function getDigitalServicesStats() {
  const allTemplates = getAllDigitalServicesTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreeDigitalServicesTemplates().length,
    premiumTemplates: getPremiumDigitalServicesTemplates().length,
    totalCategories: digitalServicesCategories.length,
    totalSearchVolume: allTemplates.reduce((sum, t) => sum + t.searchVolume, 0),
    averageCPC: allTemplates.reduce((sum, t) => sum + t.cpc, 0) / allTemplates.length,
    averageDifficulty: allTemplates.reduce((sum, t) => sum + t.difficulty, 0) / allTemplates.length
  };
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  metadata: digitalServicesIndustryMetadata,
  categories: digitalServicesCategories,
  templates: getAllDigitalServicesTemplates(),
  utils: {
    getAllTemplates: getAllDigitalServicesTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreeDigitalServicesTemplates,
    getPremiumTemplates: getPremiumDigitalServicesTemplates,
    search: searchDigitalServicesTemplates,
    getStats: getDigitalServicesStats
  }
};
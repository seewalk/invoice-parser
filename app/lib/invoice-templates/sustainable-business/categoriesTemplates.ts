/**
 * Sustainable Business Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Sustainable Business industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 2 (2 free, 0 premium)
 * - Categories: 2 (Green Energy & Solar, Sustainability Consulting)
 * - Total Search Volume: 27,400/month
 * - Average CPC: $6.38
 * - SEO Difficulty: Medium-High (58.5)
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface SustainableBusinessTemplate {
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

export interface SustainableBusinessCategory {
  id: string;
  name: string;
  description: string;
  templates: SustainableBusinessTemplate[];
}

// ============================================================================
// CATEGORY: GREEN ENERGY & SOLAR
// ============================================================================

export const greenEnergySolar: SustainableBusinessCategory = {
  id: 'green-energy-solar',
  name: 'Green Energy & Solar',
  description: 'Invoice templates for solar installers, renewable energy contractors, and green energy consultants',
  templates: [
    {
      id: 'solar-installation-invoice',
      categoryId: 'green-energy-solar',
      categoryName: 'Green Energy & Solar',
      name: 'Solar Installation Invoice',
      description: 'Specialized invoice template for solar installers with equipment costs, installation labor, permits, and incentive tracking',
      tier: 'free',
      searchVolume: 15700,
      cpc: 7.20,
      difficulty: 62,
      keywords: [
        'solar installation invoice',
        'solar panel invoice',
        'renewable energy invoice',
        'solar contractor invoice',
        'green energy billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'solar-installation-invoice'
    }
  ]
};

// ============================================================================
// CATEGORY: SUSTAINABILITY CONSULTING
// ============================================================================

export const sustainabilityConsulting: SustainableBusinessCategory = {
  id: 'sustainability-consulting',
  name: 'Sustainability Consulting',
  description: 'Invoice templates for sustainability consultants, environmental analysts, and ESG advisors',
  templates: [
    {
      id: 'sustainability-consulting-invoice',
      categoryId: 'sustainability-consulting',
      categoryName: 'Sustainability Consulting',
      name: 'Sustainability Consulting Invoice',
      description: 'Professional invoice template for sustainability consultants with carbon footprint analysis, ESG reporting, and audit services',
      tier: 'free',
      searchVolume: 11700,
      cpc: 5.55,
      difficulty: 55,
      keywords: [
        'sustainability consulting invoice',
        'environmental consultant invoice',
        'esg consulting invoice',
        'green business invoice',
        'carbon audit billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'sustainability-consulting-invoice'
    }
  ]
};

// ============================================================================
// INDUSTRY METADATA
// ============================================================================

export const sustainableBusinessIndustryMetadata: IndustryMetadata = {
  id: 'sustainable-business',
  name: 'Sustainable Business',
  description: 'Invoice templates for solar installers, renewable energy contractors, sustainability consultants, and green business services',
  icon: '♻️',
  totalSearchVolume: 27400,
  templateCount: 2,
  tier: 'free',
  categories: ['green-energy-solar', 'sustainability-consulting'],
  keywords: [
    'sustainable business invoice',
    'solar installation invoice',
    'sustainability consulting invoice',
    'renewable energy invoice',
    'green energy billing',
    'esg consulting invoice'
  ],
  avgCPC: 6.38,
  searchDifficulty: 58.5,
  popularityRank: 8
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const sustainableBusinessCategories: SustainableBusinessCategory[] = [
  greenEnergySolar,
  sustainabilityConsulting
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all sustainable business templates across all categories
 */
export function getAllSustainableBusinessTemplates(): SustainableBusinessTemplate[] {
  return sustainableBusinessCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): SustainableBusinessTemplate[] {
  const category = sustainableBusinessCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): SustainableBusinessTemplate | undefined {
  return getAllSustainableBusinessTemplates().find(template => template.id === templateId);
}

/**
 * Get all free sustainable business templates
 */
export function getFreeSustainableBusinessTemplates(): SustainableBusinessTemplate[] {
  return getAllSustainableBusinessTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium sustainable business templates
 */
export function getPremiumSustainableBusinessTemplates(): SustainableBusinessTemplate[] {
  return getAllSustainableBusinessTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchSustainableBusinessTemplates(query: string): SustainableBusinessTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllSustainableBusinessTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get sustainable business industry statistics
 */
export function getSustainableBusinessStats() {
  const allTemplates = getAllSustainableBusinessTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreeSustainableBusinessTemplates().length,
    premiumTemplates: getPremiumSustainableBusinessTemplates().length,
    totalCategories: sustainableBusinessCategories.length,
    totalSearchVolume: allTemplates.reduce((sum, t) => sum + t.searchVolume, 0),
    averageCPC: allTemplates.reduce((sum, t) => sum + t.cpc, 0) / allTemplates.length,
    averageDifficulty: allTemplates.reduce((sum, t) => sum + t.difficulty, 0) / allTemplates.length
  };
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  metadata: sustainableBusinessIndustryMetadata,
  categories: sustainableBusinessCategories,
  templates: getAllSustainableBusinessTemplates(),
  utils: {
    getAllTemplates: getAllSustainableBusinessTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreeSustainableBusinessTemplates,
    getPremiumTemplates: getPremiumSustainableBusinessTemplates,
    search: searchSustainableBusinessTemplates,
    getStats: getSustainableBusinessStats
  }
};
/**
 * ============================================================================
 * CONSTRUCTION & TRADES - CATEGORY TEMPLATES
 * ============================================================================
 * 
 * Industry: Construction & Trades
 * Total Templates: 5 (3 free, 2 premium)
 * Search Volume: 3,180/month
 * Average CPC: $6.51
 * 
 * Categories:
 * - General Construction (Residential & Commercial)
 * - Electrical Services
 * - Plumbing Services
 * - Cleaning Services
 * 
 * Integration: Works with invoiceTemplateIndustries.ts
 * ============================================================================
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ConstructionTemplate {
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

export interface ConstructionCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: ConstructionTemplate[];
  totalSearchVolume: number;
  templateCount: number;
}

// ============================================================================
// GENERAL CONSTRUCTION CATEGORY
// ============================================================================

export const generalConstruction: ConstructionCategory = {
  id: 'general-construction',
  name: 'General Construction',
  description: 'Invoice templates for general contractors, builders, and construction companies',
  icon: '🏗️',
  totalSearchVolume: 1550,
  templateCount: 3,
  templates: [
    {
      id: 'construct-res-001',
      categoryId: 'general-construction',
      categoryName: 'Residential Construction',
      name: 'Builder Invoice - Residential',
      description: 'Standard invoice for residential building and construction work including extensions, renovations, and new builds',
      tier: 'free',
      searchVolume: 590,
      cpc: 7.82,
      difficulty: 34,
      keywords: [
        'construction invoice',
        'builder invoice',
        'building work invoice',
        'residential construction invoice',
        'home builder invoice',
        'renovation invoice'
      ],
      sourceFile: 'invoiceTemplateLibrary.ts',
      sourceTemplateId: 'construct-res-001'
    },
    {
      id: 'construct-commercial-001',
      categoryId: 'general-construction',
      categoryName: 'Commercial Construction',
      name: 'Commercial Construction Invoice',
      description: 'Professional invoice for commercial construction projects with CIS deduction support, retention amounts, and VAT reverse charge',
      tier: 'premium',
      searchVolume: 590,
      cpc: 7.86,
      difficulty: 34,
      keywords: [
        'invoice template for construction company',
        'construction invoice template',
        'commercial construction invoice',
        'cis invoice template',
        'construction company invoice'
      ],
      sourceFile: 'premiumTemplateLibrary.ts',
      sourceTemplateId: 'construct-commercial-001'
    },
    {
      id: 'construct-residential-002',
      categoryId: 'general-construction',
      categoryName: 'Residential Construction',
      name: 'Residential Builder Invoice',
      description: 'Invoice template for home builders and renovation projects with materials/labour breakdown and deposit tracking',
      tier: 'premium',
      searchVolume: 170,
      cpc: 3.85,
      difficulty: 56,
      keywords: [
        'builders invoice template',
        'home builder invoice',
        'residential construction invoice',
        'home renovation invoice'
      ],
      sourceFile: 'premiumTemplateLibrary.ts',
      sourceTemplateId: 'construct-residential-002'
    }
  ]
};

// ============================================================================
// ELECTRICAL & PLUMBING CATEGORY
// ============================================================================

export const electricalPlumbing: ConstructionCategory = {
  id: 'electrical-plumbing',
  name: 'Electrical & Plumbing Services',
  description: 'Invoice templates for electricians, plumbers, and trade professionals',
  icon: '⚡',
  totalSearchVolume: 220,
  templateCount: 2,
  templates: [
    {
      id: 'electric-001',
      categoryId: 'electrical-plumbing',
      categoryName: 'Electrical Services',
      name: 'Electrician Invoice',
      description: 'Invoice for electrical installation, testing, and certification with NICEIC registration and Part P compliance',
      tier: 'free',
      searchVolume: 110,
      cpc: 9.94,
      difficulty: 22,
      keywords: [
        'electrical invoice',
        'electrician invoice',
        'electrical work invoice',
        'electrical installation invoice',
        'electrical testing invoice'
      ],
      sourceFile: 'invoiceTemplateLibrary.ts',
      sourceTemplateId: 'electric-001'
    },
    {
      id: 'plumb-001',
      categoryId: 'electrical-plumbing',
      categoryName: 'Plumbing Services',
      name: 'Plumber Invoice',
      description: 'Invoice for plumbing installation, repairs, and maintenance with Gas Safe registration support',
      tier: 'free',
      searchVolume: 110,
      cpc: 6.29,
      difficulty: 24,
      keywords: [
        'plumbing invoice',
        'plumber invoice',
        'plumbing work invoice',
        'plumbing repair invoice',
        'plumbing installation invoice'
      ],
      sourceFile: 'invoiceTemplateLibrary.ts',
      sourceTemplateId: 'plumb-001'
    }
  ]
};

// ============================================================================
// CLEANING SERVICES CATEGORY
// ============================================================================

export const cleaningServices: ConstructionCategory = {
  id: 'cleaning-services',
  name: 'Cleaning Services',
  description: 'Invoice templates for commercial and domestic cleaning companies',
  icon: '🧹',
  totalSearchVolume: 260,
  templateCount: 1,
  templates: [
    {
      id: 'cleaning-commercial-001',
      categoryId: 'cleaning-services',
      categoryName: 'Commercial Cleaning',
      name: 'Commercial Cleaning Invoice',
      description: 'Professional invoice for commercial cleaning contracts with service period tracking and SLA references',
      tier: 'premium',
      searchVolume: 260,
      cpc: 4.11,
      difficulty: 68,
      keywords: [
        'cleaning invoice template',
        'cleaning company invoice template',
        'commercial cleaning invoice',
        'office cleaning invoice',
        'janitorial invoice'
      ],
      sourceFile: 'premiumTemplateLibrary.ts',
      sourceTemplateId: 'cleaning-commercial-001'
    }
  ]
};

// ============================================================================
// CONSTRUCTION INDUSTRY METADATA
// ============================================================================

export const constructionIndustryMetadata: IndustryMetadata = {
  id: 'construction',
  name: 'Construction & Trades',
  description: 'Invoice templates for builders, electricians, plumbers, and all trade professionals',
  icon: '🔨',
  totalSearchVolume: 3180,
  templateCount: 5,
  tier: 'mixed',
  categories: [
    'General Construction',
    'Electrical & Plumbing',
    'Residential Construction',
    'Commercial Construction',
    'Electrical Services',
    'Plumbing Services',
    'Cleaning Services'
  ],
  keywords: [
    'construction invoice',
    'builder invoice',
    'building work invoice',
    'electrical invoice',
    'electrician invoice',
    'plumbing invoice',
    'plumber invoice',
    'cleaning invoice',
    'commercial cleaning invoice'
  ],
  avgCPC: 6.51,
  searchDifficulty: 34,
  popularityRank: 2
};

// ============================================================================
// ALL CATEGORIES EXPORT
// ============================================================================

export const constructionCategories: ConstructionCategory[] = [
  generalConstruction,
  electricalPlumbing,
  cleaningServices
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all templates for construction industry
 */
export function getAllConstructionTemplates(): ConstructionTemplate[] {
  return constructionCategories.flatMap(cat => cat.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): ConstructionTemplate[] {
  const category = constructionCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get template by ID
 */
export function getTemplateById(templateId: string): ConstructionTemplate | undefined {
  return getAllConstructionTemplates().find(t => t.id === templateId);
}

/**
 * Get free templates only
 */
export function getFreeConstructionTemplates(): ConstructionTemplate[] {
  return getAllConstructionTemplates().filter(t => t.tier === 'free');
}

/**
 * Get premium templates only
 */
export function getPremiumConstructionTemplates(): ConstructionTemplate[] {
  return getAllConstructionTemplates().filter(t => t.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchConstructionTemplates(query: string): ConstructionTemplate[] {
  const lowerQuery = query.toLowerCase();
  return getAllConstructionTemplates().filter(template => {
    return (
      template.name.toLowerCase().includes(lowerQuery) ||
      template.description.toLowerCase().includes(lowerQuery) ||
      template.keywords.some(kw => kw.toLowerCase().includes(lowerQuery)) ||
      template.categoryName.toLowerCase().includes(lowerQuery)
    );
  });
}

/**
 * Get category statistics
 */
export function getConstructionStats() {
  return {
    totalCategories: constructionCategories.length,
    totalTemplates: getAllConstructionTemplates().length,
    freeTemplates: getFreeConstructionTemplates().length,
    premiumTemplates: getPremiumConstructionTemplates().length,
    totalSearchVolume: constructionCategories.reduce((sum, cat) => sum + cat.totalSearchVolume, 0),
    avgCPC: constructionIndustryMetadata.avgCPC,
    categories: constructionCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      templateCount: cat.templates.length,
      searchVolume: cat.totalSearchVolume
    }))
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  constructionCategories,
  constructionIndustryMetadata,
  getAllConstructionTemplates,
  getTemplatesByCategory,
  getTemplateById,
  getFreeConstructionTemplates,
  getPremiumConstructionTemplates,
  searchConstructionTemplates,
  getConstructionStats
};
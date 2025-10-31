/**
 * Real Estate & Property Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Real Estate & Property industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 0 (Coming Soon)
 * - Categories: 3 (Property Management, Real Estate Services, Rental Services)
 * - Total Search Volume: 320/month
 * - Average CPC: $4.20
 * - SEO Difficulty: Medium (35.0)
 * 
 * STATUS: Placeholder - Templates to be added in future updates
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface RealEstateTemplate {
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

export interface RealEstateCategory {
  id: string;
  name: string;
  description: string;
  templates: RealEstateTemplate[];
}

// ============================================================================
// CATEGORY: PROPERTY MANAGEMENT
// ============================================================================

export const propertyManagement: RealEstateCategory = {
  id: 'property-management',
  name: 'Property Management',
  description: 'Invoice templates for property managers and management companies',
  templates: [
    // Templates to be added
  ]
};

// ============================================================================
// CATEGORY: REAL ESTATE SERVICES
// ============================================================================

export const realEstateServices: RealEstateCategory = {
  id: 'real-estate-services',
  name: 'Real Estate Services',
  description: 'Invoice templates for real estate agents, brokers, and consultants',
  templates: [
    // Templates to be added
  ]
};

// ============================================================================
// CATEGORY: RENTAL SERVICES
// ============================================================================

export const rentalServices: RealEstateCategory = {
  id: 'rental-services',
  name: 'Rental Services',
  description: 'Invoice templates for landlords, rental property owners, and lease administrators',
  templates: [
    // Templates to be added
  ]
};

// ============================================================================
// INDUSTRY METADATA
// ============================================================================

export const realEstateIndustryMetadata: IndustryMetadata = {
  id: 'real-estate',
  name: 'Real Estate & Property',
  description: 'Invoice templates for real estate agents, property managers, and landlords',
  icon: '🏠',
  totalSearchVolume: 320,
  templateCount: 0,
  tier: 'free',
  categories: ['property-management', 'real-estate-services', 'rental-services'],
  keywords: [
    'rent invoice',
    'rental invoice',
    'property management invoice',
    'landlord invoice',
    'real estate invoice'
  ],
  avgCPC: 4.20,
  searchDifficulty: 35,
  popularityRank: 15
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const realEstateCategories: RealEstateCategory[] = [
  propertyManagement,
  realEstateServices,
  rentalServices
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all real estate templates across all categories
 */
export function getAllRealEstateTemplates(): RealEstateTemplate[] {
  return realEstateCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): RealEstateTemplate[] {
  const category = realEstateCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): RealEstateTemplate | undefined {
  return getAllRealEstateTemplates().find(template => template.id === templateId);
}

/**
 * Get all free real estate templates
 */
export function getFreeRealEstateTemplates(): RealEstateTemplate[] {
  return getAllRealEstateTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium real estate templates
 */
export function getPremiumRealEstateTemplates(): RealEstateTemplate[] {
  return getAllRealEstateTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchRealEstateTemplates(query: string): RealEstateTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllRealEstateTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get real estate industry statistics
 */
export function getRealEstateStats() {
  const allTemplates = getAllRealEstateTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreeRealEstateTemplates().length,
    premiumTemplates: getPremiumRealEstateTemplates().length,
    totalCategories: realEstateCategories.length,
    totalSearchVolume: allTemplates.reduce((sum, t) => sum + t.searchVolume, 0),
    averageCPC: allTemplates.length > 0 ? allTemplates.reduce((sum, t) => sum + t.cpc, 0) / allTemplates.length : 0,
    averageDifficulty: allTemplates.length > 0 ? allTemplates.reduce((sum, t) => sum + t.difficulty, 0) / allTemplates.length : 0
  };
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  metadata: realEstateIndustryMetadata,
  categories: realEstateCategories,
  templates: getAllRealEstateTemplates(),
  utils: {
    getAllTemplates: getAllRealEstateTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreeRealEstateTemplates,
    getPremiumTemplates: getPremiumRealEstateTemplates,
    search: searchRealEstateTemplates,
    getStats: getRealEstateStats
  }
};
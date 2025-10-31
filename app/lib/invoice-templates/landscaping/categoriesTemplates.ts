/**
 * Landscaping & Outdoor Services Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Landscaping & Outdoor Services industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 0 (Coming Soon)
 * - Categories: 3 (Landscaping, Garden Maintenance, Tree Services)
 * - Total Search Volume: 0/month (Not explicitly tracked)
 * - Average CPC: $5.00
 * - SEO Difficulty: Medium (32.0)
 * 
 * STATUS: Placeholder - Templates to be added in future updates
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface LandscapingTemplate {
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

export interface LandscapingCategory {
  id: string;
  name: string;
  description: string;
  templates: LandscapingTemplate[];
}

// ============================================================================
// CATEGORY: LANDSCAPING
// ============================================================================

export const landscaping: LandscapingCategory = {
  id: 'landscaping',
  name: 'Landscaping',
  description: 'Invoice templates for landscape designers and installation services',
  templates: [
    // Templates to be added
  ]
};

// ============================================================================
// CATEGORY: GARDEN MAINTENANCE
// ============================================================================

export const gardenMaintenance: LandscapingCategory = {
  id: 'garden-maintenance',
  name: 'Garden Maintenance',
  description: 'Invoice templates for garden maintenance, lawn care, and groundskeeping services',
  templates: [
    // Templates to be added
  ]
};

// ============================================================================
// CATEGORY: TREE SERVICES
// ============================================================================

export const treeServices: LandscapingCategory = {
  id: 'tree-services',
  name: 'Tree Services',
  description: 'Invoice templates for tree surgeons, arborists, and tree removal services',
  templates: [
    // Templates to be added
  ]
};

// ============================================================================
// INDUSTRY METADATA
// ============================================================================

export const landscapingIndustryMetadata: IndustryMetadata = {
  id: 'landscaping',
  name: 'Landscaping & Outdoor Services',
  description: 'Invoice templates for landscapers, gardeners, and outdoor maintenance professionals',
  icon: '🌿',
  totalSearchVolume: 0,
  templateCount: 0,
  tier: 'free',
  categories: ['landscaping', 'garden-maintenance', 'tree-services'],
  keywords: [
    'landscaping invoice',
    'gardening invoice',
    'lawn care invoice',
    'tree service invoice'
  ],
  avgCPC: 5.00,
  searchDifficulty: 32,
  popularityRank: 16
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const landscapingCategories: LandscapingCategory[] = [
  landscaping,
  gardenMaintenance,
  treeServices
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all landscaping templates across all categories
 */
export function getAllLandscapingTemplates(): LandscapingTemplate[] {
  return landscapingCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): LandscapingTemplate[] {
  const category = landscapingCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): LandscapingTemplate | undefined {
  return getAllLandscapingTemplates().find(template => template.id === templateId);
}

/**
 * Get all free landscaping templates
 */
export function getFreeLandscapingTemplates(): LandscapingTemplate[] {
  return getAllLandscapingTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium landscaping templates
 */
export function getPremiumLandscapingTemplates(): LandscapingTemplate[] {
  return getAllLandscapingTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchLandscapingTemplates(query: string): LandscapingTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllLandscapingTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get landscaping industry statistics
 */
export function getLandscapingStats() {
  const allTemplates = getAllLandscapingTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreeLandscapingTemplates().length,
    premiumTemplates: getPremiumLandscapingTemplates().length,
    totalCategories: landscapingCategories.length,
    totalSearchVolume: allTemplates.reduce((sum, t) => sum + t.searchVolume, 0),
    averageCPC: allTemplates.length > 0 ? allTemplates.reduce((sum, t) => sum + t.cpc, 0) / allTemplates.length : 0,
    averageDifficulty: allTemplates.length > 0 ? allTemplates.reduce((sum, t) => sum + t.difficulty, 0) / allTemplates.length : 0
  };
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  metadata: landscapingIndustryMetadata,
  categories: landscapingCategories,
  templates: getAllLandscapingTemplates(),
  utils: {
    getAllTemplates: getAllLandscapingTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreeLandscapingTemplates,
    getPremiumTemplates: getPremiumLandscapingTemplates,
    search: searchLandscapingTemplates,
    getStats: getLandscapingStats
  }
};
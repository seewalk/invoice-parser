/**
 * Visual Arts & Illustration Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Visual Arts & Illustration industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 0 (Coming Soon)
 * - Categories: 3 (Fine Art, Illustration, Digital Art)
 * - Total Search Volume: 140/month
 * - Average CPC: $1.80
 * - SEO Difficulty: Low (25.0)
 * 
 * STATUS: Placeholder - Templates to be added in future updates
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface VisualArtsTemplate {
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

export interface VisualArtsCategory {
  id: string;
  name: string;
  description: string;
  templates: VisualArtsTemplate[];
}

// ============================================================================
// CATEGORY: FINE ART
// ============================================================================

export const fineArt: VisualArtsCategory = {
  id: 'fine-art',
  name: 'Fine Art',
  description: 'Invoice templates for fine artists, painters, and sculptors',
  templates: [
    // Templates to be added
  ]
};

// ============================================================================
// CATEGORY: ILLUSTRATION
// ============================================================================

export const illustration: VisualArtsCategory = {
  id: 'illustration',
  name: 'Illustration',
  description: 'Invoice templates for illustrators, book artists, and editorial illustrators',
  templates: [
    // Templates to be added
  ]
};

// ============================================================================
// CATEGORY: DIGITAL ART
// ============================================================================

export const digitalArt: VisualArtsCategory = {
  id: 'digital-art',
  name: 'Digital Art',
  description: 'Invoice templates for digital artists, 3D artists, and NFT creators',
  templates: [
    // Templates to be added
  ]
};

// ============================================================================
// INDUSTRY METADATA
// ============================================================================

export const visualArtsIndustryMetadata: IndustryMetadata = {
  id: 'visual-arts',
  name: 'Visual Arts & Illustration',
  description: 'Invoice templates for artists, illustrators, and visual creators',
  icon: '🎨',
  totalSearchVolume: 140,
  templateCount: 0,
  tier: 'free',
  categories: ['fine-art', 'illustration', 'digital-art'],
  keywords: [
    'artist invoice',
    'art invoice',
    'illustration invoice',
    'painting invoice'
  ],
  avgCPC: 1.80,
  searchDifficulty: 25,
  popularityRank: 13
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const visualArtsCategories: VisualArtsCategory[] = [
  fineArt,
  illustration,
  digitalArt
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all visual arts templates across all categories
 */
export function getAllVisualArtsTemplates(): VisualArtsTemplate[] {
  return visualArtsCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): VisualArtsTemplate[] {
  const category = visualArtsCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): VisualArtsTemplate | undefined {
  return getAllVisualArtsTemplates().find(template => template.id === templateId);
}

/**
 * Get all free visual arts templates
 */
export function getFreeVisualArtsTemplates(): VisualArtsTemplate[] {
  return getAllVisualArtsTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium visual arts templates
 */
export function getPremiumVisualArtsTemplates(): VisualArtsTemplate[] {
  return getAllVisualArtsTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchVisualArtsTemplates(query: string): VisualArtsTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllVisualArtsTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get visual arts industry statistics
 */
export function getVisualArtsStats() {
  const allTemplates = getAllVisualArtsTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreeVisualArtsTemplates().length,
    premiumTemplates: getPremiumVisualArtsTemplates().length,
    totalCategories: visualArtsCategories.length,
    totalSearchVolume: allTemplates.reduce((sum, t) => sum + t.searchVolume, 0),
    averageCPC: allTemplates.length > 0 ? allTemplates.reduce((sum, t) => sum + t.cpc, 0) / allTemplates.length : 0,
    averageDifficulty: allTemplates.length > 0 ? allTemplates.reduce((sum, t) => sum + t.difficulty, 0) / allTemplates.length : 0
  };
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  metadata: visualArtsIndustryMetadata,
  categories: visualArtsCategories,
  templates: getAllVisualArtsTemplates(),
  utils: {
    getAllTemplates: getAllVisualArtsTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreeVisualArtsTemplates,
    getPremiumTemplates: getPremiumVisualArtsTemplates,
    search: searchVisualArtsTemplates,
    getStats: getVisualArtsStats
  }
};
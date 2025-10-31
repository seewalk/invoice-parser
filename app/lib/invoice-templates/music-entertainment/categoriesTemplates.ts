/**
 * Music & Entertainment Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Music & Entertainment industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 0 (Coming Soon)
 * - Categories: 3 (Live Performance, DJ Services, Music Production)
 * - Total Search Volume: 220/month
 * - Average CPC: $2.50
 * - SEO Difficulty: Low (28.0)
 * 
 * STATUS: Placeholder - Templates to be added in future updates
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface MusicEntertainmentTemplate {
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

export interface MusicEntertainmentCategory {
  id: string;
  name: string;
  description: string;
  templates: MusicEntertainmentTemplate[];
}

// ============================================================================
// CATEGORY: LIVE PERFORMANCE
// ============================================================================

export const livePerformance: MusicEntertainmentCategory = {
  id: 'live-performance',
  name: 'Live Performance',
  description: 'Invoice templates for live musicians, bands, and performers',
  templates: [
    // Templates to be added
  ]
};

// ============================================================================
// CATEGORY: DJ SERVICES
// ============================================================================

export const djServices: MusicEntertainmentCategory = {
  id: 'dj-services',
  name: 'DJ Services',
  description: 'Invoice templates for DJs, event entertainment, and music mixing services',
  templates: [
    // Templates to be added
  ]
};

// ============================================================================
// CATEGORY: MUSIC PRODUCTION
// ============================================================================

export const musicProduction: MusicEntertainmentCategory = {
  id: 'music-production',
  name: 'Music Production',
  description: 'Invoice templates for music producers, recording studios, and audio engineers',
  templates: [
    // Templates to be added
  ]
};

// ============================================================================
// INDUSTRY METADATA
// ============================================================================

export const musicEntertainmentIndustryMetadata: IndustryMetadata = {
  id: 'music-entertainment',
  name: 'Music & Entertainment',
  description: 'Invoice templates for musicians, DJs, performers, and entertainment services',
  icon: '🎵',
  totalSearchVolume: 220,
  templateCount: 0,
  tier: 'free',
  categories: ['live-performance', 'dj-services', 'music-production'],
  keywords: [
    'music invoice',
    'musician invoice',
    'dj invoice',
    'entertainment invoice',
    'performance invoice'
  ],
  avgCPC: 2.50,
  searchDifficulty: 28,
  popularityRank: 12
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const musicEntertainmentCategories: MusicEntertainmentCategory[] = [
  livePerformance,
  djServices,
  musicProduction
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all music & entertainment templates across all categories
 */
export function getAllMusicEntertainmentTemplates(): MusicEntertainmentTemplate[] {
  return musicEntertainmentCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): MusicEntertainmentTemplate[] {
  const category = musicEntertainmentCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): MusicEntertainmentTemplate | undefined {
  return getAllMusicEntertainmentTemplates().find(template => template.id === templateId);
}

/**
 * Get all free music & entertainment templates
 */
export function getFreeMusicEntertainmentTemplates(): MusicEntertainmentTemplate[] {
  return getAllMusicEntertainmentTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium music & entertainment templates
 */
export function getPremiumMusicEntertainmentTemplates(): MusicEntertainmentTemplate[] {
  return getAllMusicEntertainmentTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchMusicEntertainmentTemplates(query: string): MusicEntertainmentTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllMusicEntertainmentTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get music & entertainment industry statistics
 */
export function getMusicEntertainmentStats() {
  const allTemplates = getAllMusicEntertainmentTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreeMusicEntertainmentTemplates().length,
    premiumTemplates: getPremiumMusicEntertainmentTemplates().length,
    totalCategories: musicEntertainmentCategories.length,
    totalSearchVolume: allTemplates.reduce((sum, t) => sum + t.searchVolume, 0),
    averageCPC: allTemplates.length > 0 ? allTemplates.reduce((sum, t) => sum + t.cpc, 0) / allTemplates.length : 0,
    averageDifficulty: allTemplates.length > 0 ? allTemplates.reduce((sum, t) => sum + t.difficulty, 0) / allTemplates.length : 0
  };
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  metadata: musicEntertainmentIndustryMetadata,
  categories: musicEntertainmentCategories,
  templates: getAllMusicEntertainmentTemplates(),
  utils: {
    getAllTemplates: getAllMusicEntertainmentTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreeMusicEntertainmentTemplates,
    getPremiumTemplates: getPremiumMusicEntertainmentTemplates,
    search: searchMusicEntertainmentTemplates,
    getStats: getMusicEntertainmentStats
  }
};
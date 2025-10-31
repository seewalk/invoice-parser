/**
 * Creative & Media Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Creative & Media industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 8 (4 free, 4 premium)
 * - Categories: 4 (Graphic Design & Branding, Photography & Videography, Content Creation, Music & Audio)
 * - Total Search Volume: 133,600/month
 * - Average CPC: $4.85
 * - SEO Difficulty: Medium (52.5)
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface CreativeMediaTemplate {
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

export interface CreativeMediaCategory {
  id: string;
  name: string;
  description: string;
  templates: CreativeMediaTemplate[];
}

// ============================================================================
// CATEGORY: GRAPHIC DESIGN & BRANDING
// ============================================================================

export const graphicDesignBranding: CreativeMediaCategory = {
  id: 'graphic-design-branding',
  name: 'Graphic Design & Branding',
  description: 'Invoice templates for graphic designers, brand strategists, and visual identity specialists',
  templates: [
    {
      id: 'graphic-design-invoice',
      categoryId: 'graphic-design-branding',
      categoryName: 'Graphic Design & Branding',
      name: 'Graphic Design Invoice',
      description: 'Professional invoice template for graphic design services including logo design, branding, and visual identity work',
      tier: 'free',
      searchVolume: 18100,
      cpc: 3.45,
      difficulty: 48,
      keywords: [
        'graphic design invoice',
        'design invoice template',
        'logo design invoice',
        'branding invoice',
        'visual design billing'
      ],
      sourceFile: 'invoiceTemplateLibrary.ts',
      sourceTemplateId: 'graphic-design-invoice'
    },
    {
      id: 'brand-strategy-invoice',
      categoryId: 'graphic-design-branding',
      categoryName: 'Graphic Design & Branding',
      name: 'Brand Strategy Invoice',
      description: 'Specialized invoice template for brand strategists and consultants, featuring project-based pricing and milestone billing',
      tier: 'premium',
      searchVolume: 8900,
      cpc: 5.20,
      difficulty: 52,
      keywords: [
        'brand strategy invoice',
        'branding consultant invoice',
        'brand development billing',
        'strategic branding invoice',
        'brand identity invoice'
      ],
      sourceFile: 'premiumTemplateLibrary.ts',
      sourceTemplateId: 'brand-strategy-invoice'
    }
  ]
};

// ============================================================================
// CATEGORY: PHOTOGRAPHY & VIDEOGRAPHY
// ============================================================================

export const photographyVideography: CreativeMediaCategory = {
  id: 'photography-videography',
  name: 'Photography & Videography',
  description: 'Invoice templates for photographers, videographers, and visual content creators',
  templates: [
    {
      id: 'photography-invoice',
      categoryId: 'photography-videography',
      categoryName: 'Photography & Videography',
      name: 'Photography Invoice',
      description: 'Comprehensive invoice template for photographers with session fees, print costs, and licensing options',
      tier: 'free',
      searchVolume: 27100,
      cpc: 3.85,
      difficulty: 45,
      keywords: [
        'photography invoice',
        'photographer invoice template',
        'photo session invoice',
        'wedding photography invoice',
        'commercial photography billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'photography-invoice'
    },
    {
      id: 'videography-invoice',
      categoryId: 'photography-videography',
      categoryName: 'Photography & Videography',
      name: 'Videography Invoice',
      description: 'Professional invoice template for videographers featuring production costs, editing fees, and licensing terms',
      tier: 'free',
      searchVolume: 14800,
      cpc: 4.25,
      difficulty: 50,
      keywords: [
        'videography invoice',
        'video production invoice',
        'filmmaker invoice',
        'wedding videography invoice',
        'commercial video invoice'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'videography-invoice'
    }
  ]
};

// ============================================================================
// CATEGORY: CONTENT CREATION
// ============================================================================

export const contentCreation: CreativeMediaCategory = {
  id: 'content-creation',
  name: 'Content Creation',
  description: 'Invoice templates for content creators, writers, copywriters, and digital media specialists',
  templates: [
    {
      id: 'content-creator-invoice',
      categoryId: 'content-creation',
      categoryName: 'Content Creation',
      name: 'Content Creator Invoice',
      description: 'Versatile invoice template for content creators across multiple platforms (YouTube, Instagram, TikTok, blogs)',
      tier: 'free',
      searchVolume: 22400,
      cpc: 5.10,
      difficulty: 55,
      keywords: [
        'content creator invoice',
        'influencer invoice',
        'social media creator billing',
        'youtube creator invoice',
        'content creation invoice'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'content-creator-invoice'
    },
    {
      id: 'copywriting-invoice',
      categoryId: 'content-creation',
      categoryName: 'Content Creation',
      name: 'Copywriting Invoice',
      description: 'Professional invoice template for copywriters with per-word or per-project pricing options',
      tier: 'premium',
      searchVolume: 12300,
      cpc: 6.40,
      difficulty: 58,
      keywords: [
        'copywriting invoice',
        'copywriter invoice template',
        'content writing invoice',
        'marketing copy invoice',
        'seo copywriting billing'
      ],
      sourceFile: 'premiumTemplateLibrary.ts',
      sourceTemplateId: 'copywriting-invoice'
    }
  ]
};

// ============================================================================
// CATEGORY: MUSIC & AUDIO
// ============================================================================

export const musicAudio: CreativeMediaCategory = {
  id: 'music-audio',
  name: 'Music & Audio',
  description: 'Invoice templates for musicians, music producers, sound engineers, and audio professionals',
  templates: [
    {
      id: 'music-production-invoice',
      categoryId: 'music-audio',
      categoryName: 'Music & Audio',
      name: 'Music Production Invoice',
      description: 'Specialized invoice template for music producers featuring studio time, mixing, mastering, and licensing',
      tier: 'premium',
      searchVolume: 16500,
      cpc: 4.80,
      difficulty: 53,
      keywords: [
        'music production invoice',
        'music producer invoice',
        'studio recording invoice',
        'mixing and mastering invoice',
        'audio production billing'
      ],
      sourceFile: 'premiumTemplateLibrary.ts',
      sourceTemplateId: 'music-production-invoice'
    },
    {
      id: 'dj-services-invoice',
      categoryId: 'music-audio',
      categoryName: 'Music & Audio',
      name: 'DJ Services Invoice',
      description: 'Professional invoice template for DJs with event-based pricing, equipment rental, and travel expenses',
      tier: 'free',
      searchVolume: 13500,
      cpc: 4.75,
      difficulty: 49,
      keywords: [
        'dj invoice',
        'dj services invoice',
        'wedding dj invoice',
        'event dj billing',
        'mobile dj invoice'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'dj-services-invoice'
    }
  ]
};

// ============================================================================
// INDUSTRY METADATA
// ============================================================================

export const creativeMediaIndustryMetadata: IndustryMetadata = {
  id: 'creative-media',
  name: 'Creative & Media',
  description: 'Invoice templates for creative professionals including graphic designers, photographers, videographers, content creators, and musicians',
  icon: '🎨',
  totalSearchVolume: 133600,
  templateCount: 8,
  tier: 'mixed',
  categories: ['graphic-design-branding', 'photography-videography', 'content-creation', 'music-audio'],
  keywords: [
    'creative invoice',
    'media invoice',
    'design invoice',
    'photography invoice',
    'content creator invoice',
    'music production invoice',
    'videography invoice',
    'graphic design billing'
  ],
  avgCPC: 4.85,
  searchDifficulty: 52.5,
  popularityRank: 1
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const creativeMediaCategories: CreativeMediaCategory[] = [
  graphicDesignBranding,
  photographyVideography,
  contentCreation,
  musicAudio
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all creative & media templates across all categories
 */
export function getAllCreativeMediaTemplates(): CreativeMediaTemplate[] {
  return creativeMediaCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): CreativeMediaTemplate[] {
  const category = creativeMediaCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): CreativeMediaTemplate | undefined {
  return getAllCreativeMediaTemplates().find(template => template.id === templateId);
}

/**
 * Get all free creative & media templates
 */
export function getFreeCreativeMediaTemplates(): CreativeMediaTemplate[] {
  return getAllCreativeMediaTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium creative & media templates
 */
export function getPremiumCreativeMediaTemplates(): CreativeMediaTemplate[] {
  return getAllCreativeMediaTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchCreativeMediaTemplates(query: string): CreativeMediaTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllCreativeMediaTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get creative & media industry statistics
 */
export function getCreativeMediaStats() {
  const allTemplates = getAllCreativeMediaTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreeCreativeMediaTemplates().length,
    premiumTemplates: getPremiumCreativeMediaTemplates().length,
    totalCategories: creativeMediaCategories.length,
    totalSearchVolume: allTemplates.reduce((sum, t) => sum + t.searchVolume, 0),
    averageCPC: allTemplates.reduce((sum, t) => sum + t.cpc, 0) / allTemplates.length,
    averageDifficulty: allTemplates.reduce((sum, t) => sum + t.difficulty, 0) / allTemplates.length
  };
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  metadata: creativeMediaIndustryMetadata,
  categories: creativeMediaCategories,
  templates: getAllCreativeMediaTemplates(),
  utils: {
    getAllTemplates: getAllCreativeMediaTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreeCreativeMediaTemplates,
    getPremiumTemplates: getPremiumCreativeMediaTemplates,
    search: searchCreativeMediaTemplates,
    getStats: getCreativeMediaStats
  }
};
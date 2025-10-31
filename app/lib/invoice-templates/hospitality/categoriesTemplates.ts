/**
 * Hospitality Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Hospitality industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 4 (2 free, 2 premium)
 * - Categories: 3 (Restaurants & Food Services, Events & Catering, Lodging Services)
 * - Total Search Volume: 109,600/month
 * - Average CPC: $4.03
 * - SEO Difficulty: Medium (49.5)
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface HospitalityTemplate {
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

export interface HospitalityCategory {
  id: string;
  name: string;
  description: string;
  templates: HospitalityTemplate[];
}

// ============================================================================
// CATEGORY: RESTAURANTS & FOOD SERVICES
// ============================================================================

export const restaurantsFoodServices: HospitalityCategory = {
  id: 'restaurants-food-services',
  name: 'Restaurants & Food Services',
  description: 'Invoice templates for restaurants, cafes, food trucks, and food service businesses',
  templates: [
    {
      id: 'restaurant-invoice',
      categoryId: 'restaurants-food-services',
      categoryName: 'Restaurants & Food Services',
      name: 'Restaurant Invoice',
      description: 'Professional invoice template for restaurants with itemized menu items, taxes, tips, and payment terms',
      tier: 'free',
      searchVolume: 33500,
      cpc: 3.85,
      difficulty: 45,
      keywords: [
        'restaurant invoice',
        'food service invoice',
        'dining invoice template',
        'restaurant bill',
        'food invoice'
      ],
      sourceFile: 'invoiceTemplateLibrary.ts',
      sourceTemplateId: 'restaurant-invoice'
    }
  ]
};

// ============================================================================
// CATEGORY: EVENTS & CATERING
// ============================================================================

export const eventsCatering: HospitalityCategory = {
  id: 'events-catering',
  name: 'Events & Catering',
  description: 'Invoice templates for catering services, event planners, and venue management',
  templates: [
    {
      id: 'catering-invoice',
      categoryId: 'events-catering',
      categoryName: 'Events & Catering',
      name: 'Catering Invoice',
      description: 'Comprehensive invoice template for catering businesses with per-person pricing, equipment rentals, and service fees',
      tier: 'free',
      searchVolume: 27100,
      cpc: 4.20,
      difficulty: 48,
      keywords: [
        'catering invoice',
        'catering invoice template',
        'event catering invoice',
        'wedding catering invoice',
        'corporate catering billing'
      ],
      sourceFile: 'invoiceTemplateLibrary.ts',
      sourceTemplateId: 'catering-invoice'
    },
    {
      id: 'event-planning-invoice',
      categoryId: 'events-catering',
      categoryName: 'Events & Catering',
      name: 'Event Planning Invoice',
      description: 'Professional invoice template for event planners featuring consultation fees, vendor coordination, and event management',
      tier: 'premium',
      searchVolume: 18900,
      cpc: 5.25,
      difficulty: 54,
      keywords: [
        'event planning invoice',
        'event planner invoice',
        'wedding planner invoice',
        'corporate event invoice',
        'party planning billing'
      ],
      sourceFile: 'premiumTemplateLibrary.ts',
      sourceTemplateId: 'event-planning-invoice'
    }
  ]
};

// ============================================================================
// CATEGORY: LODGING SERVICES
// ============================================================================

export const lodgingServices: HospitalityCategory = {
  id: 'lodging-services',
  name: 'Lodging Services',
  description: 'Invoice templates for hotels, vacation rentals, and accommodation services',
  templates: [
    {
      id: 'hotel-resort-invoice',
      categoryId: 'lodging-services',
      categoryName: 'Lodging Services',
      name: 'Hotel & Resort Invoice',
      description: 'Luxury hospitality invoice template for hotels and resorts with room charges, amenities, taxes, and incidentals',
      tier: 'premium',
      searchVolume: 30100,
      cpc: 2.80,
      difficulty: 51,
      keywords: [
        'hotel invoice',
        'resort invoice',
        'hotel billing',
        'accommodation invoice',
        'hospitality invoice',
        'room charges invoice'
      ],
      sourceFile: 'premiumTemplateLibrary.ts',
      sourceTemplateId: 'hotel-resort-invoice'
    }
  ]
};

// ============================================================================
// INDUSTRY METADATA
// ============================================================================

export const hospitalityIndustryMetadata: IndustryMetadata = {
  id: 'hospitality',
  name: 'Hospitality',
  description: 'Invoice templates for restaurants, catering services, hotels, event planners, and food service businesses',
  icon: '🍽️',
  totalSearchVolume: 109600,
  templateCount: 4,
  tier: 'mixed',
  categories: ['restaurants-food-services', 'events-catering', 'lodging-services'],
  keywords: [
    'hospitality invoice',
    'restaurant invoice',
    'catering invoice',
    'hotel invoice',
    'event planning invoice',
    'food service billing'
  ],
  avgCPC: 4.03,
  searchDifficulty: 49.5,
  popularityRank: 2
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const hospitalityCategories: HospitalityCategory[] = [
  restaurantsFoodServices,
  eventsCatering,
  lodgingServices
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all hospitality templates across all categories
 */
export function getAllHospitalityTemplates(): HospitalityTemplate[] {
  return hospitalityCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): HospitalityTemplate[] {
  const category = hospitalityCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): HospitalityTemplate | undefined {
  return getAllHospitalityTemplates().find(template => template.id === templateId);
}

/**
 * Get all free hospitality templates
 */
export function getFreeHospitalityTemplates(): HospitalityTemplate[] {
  return getAllHospitalityTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium hospitality templates
 */
export function getPremiumHospitalityTemplates(): HospitalityTemplate[] {
  return getAllHospitalityTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchHospitalityTemplates(query: string): HospitalityTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllHospitalityTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get hospitality industry statistics
 */
export function getHospitalityStats() {
  const allTemplates = getAllHospitalityTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreeHospitalityTemplates().length,
    premiumTemplates: getPremiumHospitalityTemplates().length,
    totalCategories: hospitalityCategories.length,
    totalSearchVolume: allTemplates.reduce((sum, t) => sum + t.searchVolume, 0),
    averageCPC: allTemplates.reduce((sum, t) => sum + t.cpc, 0) / allTemplates.length,
    averageDifficulty: allTemplates.reduce((sum, t) => sum + t.difficulty, 0) / allTemplates.length
  };
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  metadata: hospitalityIndustryMetadata,
  categories: hospitalityCategories,
  templates: getAllHospitalityTemplates(),
  utils: {
    getAllTemplates: getAllHospitalityTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreeHospitalityTemplates,
    getPremiumTemplates: getPremiumHospitalityTemplates,
    search: searchHospitalityTemplates,
    getStats: getHospitalityStats
  }
};
/**
 * Pet Services Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Pet Services industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 3 (3 free, 0 premium)
 * - Categories: 3 (Pet Grooming, Pet Care Services, Veterinary Services)
 * - Total Search Volume: 46,700/month
 * - Average CPC: $4.23
 * - SEO Difficulty: Medium (50.0)
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface PetServicesTemplate {
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

export interface PetServicesCategory {
  id: string;
  name: string;
  description: string;
  templates: PetServicesTemplate[];
}

// ============================================================================
// CATEGORY: PET GROOMING
// ============================================================================

export const petGrooming: PetServicesCategory = {
  id: 'pet-grooming',
  name: 'Pet Grooming',
  description: 'Invoice templates for pet groomers and grooming salons',
  templates: [
    {
      id: 'pet-grooming-invoice',
      categoryId: 'pet-grooming',
      categoryName: 'Pet Grooming',
      name: 'Pet Grooming Invoice',
      description: 'Professional invoice template for pet grooming services with service packages, breed-specific pricing, and add-ons',
      tier: 'free',
      searchVolume: 14500,
      cpc: 4.10,
      difficulty: 48,
      keywords: [
        'pet grooming invoice',
        'dog grooming invoice',
        'pet groomer invoice',
        'grooming salon invoice',
        'pet spa invoice'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'pet-grooming-invoice'
    }
  ]
};

// ============================================================================
// CATEGORY: PET CARE SERVICES
// ============================================================================

export const petCareServices: PetServicesCategory = {
  id: 'pet-care-services',
  name: 'Pet Care Services',
  description: 'Invoice templates for pet sitters, dog walkers, and pet care providers',
  templates: [
    {
      id: 'pet-sitting-invoice',
      categoryId: 'pet-care-services',
      categoryName: 'Pet Care Services',
      name: 'Pet Sitting Invoice',
      description: 'Comprehensive invoice template for pet sitting and dog walking services with daily rates and extended care options',
      tier: 'free',
      searchVolume: 16300,
      cpc: 4.50,
      difficulty: 52,
      keywords: [
        'pet sitting invoice',
        'dog walking invoice',
        'pet sitter invoice',
        'pet care invoice',
        'dog walker billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'pet-sitting-invoice'
    }
  ]
};

// ============================================================================
// CATEGORY: VETERINARY SERVICES
// ============================================================================

export const veterinaryServices: PetServicesCategory = {
  id: 'veterinary-services',
  name: 'Veterinary Services',
  description: 'Invoice templates for veterinarians and animal healthcare providers',
  templates: [
    {
      id: 'veterinary-invoice',
      categoryId: 'veterinary-services',
      categoryName: 'Veterinary Services',
      name: 'Veterinary Invoice',
      description: 'Specialized invoice template for veterinary clinics with examination fees, treatments, medications, and lab work',
      tier: 'free',
      searchVolume: 15900,
      cpc: 4.10,
      difficulty: 50,
      keywords: [
        'veterinary invoice',
        'vet invoice',
        'veterinary clinic invoice',
        'animal hospital invoice',
        'vet services billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'veterinary-invoice'
    }
  ]
};

// ============================================================================
// INDUSTRY METADATA
// ============================================================================

export const petServicesIndustryMetadata: IndustryMetadata = {
  id: 'pet-services',
  name: 'Pet Services',
  description: 'Invoice templates for pet groomers, pet sitters, dog walkers, veterinarians, and animal care professionals',
  icon: '🐾',
  totalSearchVolume: 46700,
  templateCount: 3,
  tier: 'free',
  categories: ['pet-grooming', 'pet-care-services', 'veterinary-services'],
  keywords: [
    'pet services invoice',
    'pet grooming invoice',
    'pet sitting invoice',
    'veterinary invoice',
    'dog walking invoice',
    'pet care billing'
  ],
  avgCPC: 4.23,
  searchDifficulty: 50.0,
  popularityRank: 6
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const petServicesCategories: PetServicesCategory[] = [
  petGrooming,
  petCareServices,
  veterinaryServices
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all pet services templates across all categories
 */
export function getAllPetServicesTemplates(): PetServicesTemplate[] {
  return petServicesCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): PetServicesTemplate[] {
  const category = petServicesCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): PetServicesTemplate | undefined {
  return getAllPetServicesTemplates().find(template => template.id === templateId);
}

/**
 * Get all free pet services templates
 */
export function getFreePetServicesTemplates(): PetServicesTemplate[] {
  return getAllPetServicesTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium pet services templates
 */
export function getPremiumPetServicesTemplates(): PetServicesTemplate[] {
  return getAllPetServicesTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchPetServicesTemplates(query: string): PetServicesTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllPetServicesTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get pet services industry statistics
 */
export function getPetServicesStats() {
  const allTemplates = getAllPetServicesTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreePetServicesTemplates().length,
    premiumTemplates: getPremiumPetServicesTemplates().length,
    totalCategories: petServicesCategories.length,
    totalSearchVolume: allTemplates.reduce((sum, t) => sum + t.searchVolume, 0),
    averageCPC: allTemplates.reduce((sum, t) => sum + t.cpc, 0) / allTemplates.length,
    averageDifficulty: allTemplates.reduce((sum, t) => sum + t.difficulty, 0) / allTemplates.length
  };
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  metadata: petServicesIndustryMetadata,
  categories: petServicesCategories,
  templates: getAllPetServicesTemplates(),
  utils: {
    getAllTemplates: getAllPetServicesTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreePetServicesTemplates,
    getPremiumTemplates: getPremiumPetServicesTemplates,
    search: searchPetServicesTemplates,
    getStats: getPetServicesStats
  }
};
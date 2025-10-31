/**
 * Healthcare & Medical Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Healthcare & Medical industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 1 (0 free, 1 premium)
 * - Categories: 1 (Medical Services)
 * - Total Search Volume: 24,300/month
 * - Average CPC: $8.75
 * - SEO Difficulty: High (68.0)
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface HealthcareMedicalTemplate {
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

export interface HealthcareMedicalCategory {
  id: string;
  name: string;
  description: string;
  templates: HealthcareMedicalTemplate[];
}

// ============================================================================
// CATEGORY: MEDICAL SERVICES
// ============================================================================

export const medicalServices: HealthcareMedicalCategory = {
  id: 'medical-services',
  name: 'Medical Services',
  description: 'Invoice templates for medical professionals, clinics, and healthcare service providers',
  templates: [
    {
      id: 'medical-services-invoice',
      categoryId: 'medical-services',
      categoryName: 'Medical Services',
      name: 'Medical Services Invoice',
      description: 'Comprehensive healthcare invoice template with procedure codes (CPT/ICD-10), insurance billing, patient responsibility, and HIPAA-compliant documentation',
      tier: 'premium',
      searchVolume: 24300,
      cpc: 8.75,
      difficulty: 68,
      keywords: [
        'medical invoice',
        'healthcare invoice',
        'medical billing',
        'doctor invoice',
        'clinic invoice',
        'medical services billing',
        'healthcare billing template'
      ],
      sourceFile: 'premiumTemplateLibrary.ts',
      sourceTemplateId: 'medical-services-invoice'
    }
  ]
};

// ============================================================================
// INDUSTRY METADATA
// ============================================================================

export const healthcareMedicalIndustryMetadata: IndustryMetadata = {
  id: 'healthcare-medical',
  name: 'Healthcare & Medical',
  description: 'Professional invoice templates for medical professionals, clinics, healthcare providers, and medical billing services',
  icon: '⚕️',
  totalSearchVolume: 24300,
  templateCount: 1,
  tier: 'premium',
  categories: ['medical-services'],
  keywords: [
    'healthcare invoice',
    'medical invoice',
    'medical billing',
    'healthcare billing',
    'doctor invoice',
    'clinic billing',
    'medical services invoice'
  ],
  avgCPC: 8.75,
  searchDifficulty: 68.0,
  popularityRank: 9
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const healthcareMedicalCategories: HealthcareMedicalCategory[] = [
  medicalServices
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all healthcare & medical templates across all categories
 */
export function getAllHealthcareMedicalTemplates(): HealthcareMedicalTemplate[] {
  return healthcareMedicalCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): HealthcareMedicalTemplate[] {
  const category = healthcareMedicalCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): HealthcareMedicalTemplate | undefined {
  return getAllHealthcareMedicalTemplates().find(template => template.id === templateId);
}

/**
 * Get all free healthcare & medical templates
 */
export function getFreeHealthcareMedicalTemplates(): HealthcareMedicalTemplate[] {
  return getAllHealthcareMedicalTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium healthcare & medical templates
 */
export function getPremiumHealthcareMedicalTemplates(): HealthcareMedicalTemplate[] {
  return getAllHealthcareMedicalTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchHealthcareMedicalTemplates(query: string): HealthcareMedicalTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllHealthcareMedicalTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get healthcare & medical industry statistics
 */
export function getHealthcareMedicalStats() {
  const allTemplates = getAllHealthcareMedicalTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreeHealthcareMedicalTemplates().length,
    premiumTemplates: getPremiumHealthcareMedicalTemplates().length,
    totalCategories: healthcareMedicalCategories.length,
    totalSearchVolume: allTemplates.reduce((sum, t) => sum + t.searchVolume, 0),
    averageCPC: allTemplates.reduce((sum, t) => sum + t.cpc, 0) / allTemplates.length,
    averageDifficulty: allTemplates.reduce((sum, t) => sum + t.difficulty, 0) / allTemplates.length
  };
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  metadata: healthcareMedicalIndustryMetadata,
  categories: healthcareMedicalCategories,
  templates: getAllHealthcareMedicalTemplates(),
  utils: {
    getAllTemplates: getAllHealthcareMedicalTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreeHealthcareMedicalTemplates,
    getPremiumTemplates: getPremiumHealthcareMedicalTemplates,
    search: searchHealthcareMedicalTemplates,
    getStats: getHealthcareMedicalStats
  }
};
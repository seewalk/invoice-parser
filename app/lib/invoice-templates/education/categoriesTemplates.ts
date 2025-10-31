/**
 * Education Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Education industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 2 (2 free, 0 premium)
 * - Categories: 2 (Tutoring & Private Instruction, Online Courses & E-learning)
 * - Total Search Volume: 32,900/month
 * - Average CPC: $5.33
 * - SEO Difficulty: Medium (54.5)
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface EducationTemplate {
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

export interface EducationCategory {
  id: string;
  name: string;
  description: string;
  templates: EducationTemplate[];
}

// ============================================================================
// CATEGORY: TUTORING & PRIVATE INSTRUCTION
// ============================================================================

export const tutoringPrivateInstruction: EducationCategory = {
  id: 'tutoring-private-instruction',
  name: 'Tutoring & Private Instruction',
  description: 'Invoice templates for tutors, private instructors, and academic coaches',
  templates: [
    {
      id: 'tutoring-invoice',
      categoryId: 'tutoring-private-instruction',
      categoryName: 'Tutoring & Private Instruction',
      name: 'Tutoring Invoice',
      description: 'Professional invoice template for tutors with hourly rates, session packages, and subject-based pricing',
      tier: 'free',
      searchVolume: 18600,
      cpc: 5.20,
      difficulty: 53,
      keywords: [
        'tutoring invoice',
        'tutor invoice template',
        'private tutoring invoice',
        'academic tutoring billing',
        'homework help invoice'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'tutoring-invoice'
    }
  ]
};

// ============================================================================
// CATEGORY: ONLINE COURSES & E-LEARNING
// ============================================================================

export const onlineCoursesElearning: EducationCategory = {
  id: 'online-courses-elearning',
  name: 'Online Courses & E-learning',
  description: 'Invoice templates for online course creators, e-learning platforms, and digital educators',
  templates: [
    {
      id: 'online-course-invoice',
      categoryId: 'online-courses-elearning',
      categoryName: 'Online Courses & E-learning',
      name: 'Online Course Invoice',
      description: 'Comprehensive invoice template for online course creators with course fees, certification charges, and platform access',
      tier: 'free',
      searchVolume: 14300,
      cpc: 5.45,
      difficulty: 56,
      keywords: [
        'online course invoice',
        'elearning invoice',
        'digital course invoice',
        'online education invoice',
        'course creator billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'online-course-invoice'
    }
  ]
};

// ============================================================================
// INDUSTRY METADATA
// ============================================================================

export const educationIndustryMetadata: IndustryMetadata = {
  id: 'education',
  name: 'Education',
  description: 'Invoice templates for tutors, private instructors, online course creators, and educational service providers',
  icon: '📚',
  totalSearchVolume: 32900,
  templateCount: 2,
  tier: 'free',
  categories: ['tutoring-private-instruction', 'online-courses-elearning'],
  keywords: [
    'education invoice',
    'tutoring invoice',
    'online course invoice',
    'elearning invoice',
    'teaching invoice',
    'educational services billing'
  ],
  avgCPC: 5.33,
  searchDifficulty: 54.5,
  popularityRank: 7
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const educationCategories: EducationCategory[] = [
  tutoringPrivateInstruction,
  onlineCoursesElearning
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all education templates across all categories
 */
export function getAllEducationTemplates(): EducationTemplate[] {
  return educationCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): EducationTemplate[] {
  const category = educationCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): EducationTemplate | undefined {
  return getAllEducationTemplates().find(template => template.id === templateId);
}

/**
 * Get all free education templates
 */
export function getFreeEducationTemplates(): EducationTemplate[] {
  return getAllEducationTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium education templates
 */
export function getPremiumEducationTemplates(): EducationTemplate[] {
  return getAllEducationTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchEducationTemplates(query: string): EducationTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllEducationTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get education industry statistics
 */
export function getEducationStats() {
  const allTemplates = getAllEducationTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreeEducationTemplates().length,
    premiumTemplates: getPremiumEducationTemplates().length,
    totalCategories: educationCategories.length,
    totalSearchVolume: allTemplates.reduce((sum, t) => sum + t.searchVolume, 0),
    averageCPC: allTemplates.reduce((sum, t) => sum + t.cpc, 0) / allTemplates.length,
    averageDifficulty: allTemplates.reduce((sum, t) => sum + t.difficulty, 0) / allTemplates.length
  };
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  metadata: educationIndustryMetadata,
  categories: educationCategories,
  templates: getAllEducationTemplates(),
  utils: {
    getAllTemplates: getAllEducationTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreeEducationTemplates,
    getPremiumTemplates: getPremiumEducationTemplates,
    search: searchEducationTemplates,
    getStats: getEducationStats
  }
};
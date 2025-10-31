/**
 * Health & Wellness Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Health & Wellness industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 4 (4 free, 0 premium)
 * - Categories: 3 (Fitness & Training, Wellness & Spa Services, Mental Health & Counseling)
 * - Total Search Volume: 64,800/month
 * - Average CPC: $4.65
 * - SEO Difficulty: Medium (51.5)
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface HealthWellnessTemplate {
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

export interface HealthWellnessCategory {
  id: string;
  name: string;
  description: string;
  templates: HealthWellnessTemplate[];
}

// ============================================================================
// CATEGORY: FITNESS & TRAINING
// ============================================================================

export const fitnessTraining: HealthWellnessCategory = {
  id: 'fitness-training',
  name: 'Fitness & Training',
  description: 'Invoice templates for personal trainers, fitness coaches, and gym services',
  templates: [
    {
      id: 'personal-training-invoice',
      categoryId: 'fitness-training',
      categoryName: 'Fitness & Training',
      name: 'Personal Training Invoice',
      description: 'Professional invoice template for personal trainers with session packages, hourly rates, and training plan fees',
      tier: 'free',
      searchVolume: 14800,
      cpc: 4.20,
      difficulty: 48,
      keywords: [
        'personal training invoice',
        'fitness trainer invoice',
        'gym invoice',
        'workout session invoice',
        'fitness coaching billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'personal-training-invoice'
    },
    {
      id: 'yoga-instructor-invoice',
      categoryId: 'fitness-training',
      categoryName: 'Fitness & Training',
      name: 'Yoga Instructor Invoice',
      description: 'Specialized invoice template for yoga instructors with class packages, private sessions, and retreat fees',
      tier: 'free',
      searchVolume: 12600,
      cpc: 3.80,
      difficulty: 46,
      keywords: [
        'yoga invoice',
        'yoga instructor invoice',
        'yoga class invoice',
        'yoga studio billing',
        'yoga retreat invoice'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'yoga-instructor-invoice'
    }
  ]
};

// ============================================================================
// CATEGORY: WELLNESS & SPA SERVICES
// ============================================================================

export const wellnessSpaServices: HealthWellnessCategory = {
  id: 'wellness-spa-services',
  name: 'Wellness & Spa Services',
  description: 'Invoice templates for massage therapists, spa services, and wellness practitioners',
  templates: [
    {
      id: 'massage-therapy-invoice',
      categoryId: 'wellness-spa-services',
      categoryName: 'Wellness & Spa Services',
      name: 'Massage Therapy Invoice',
      description: 'Comprehensive invoice template for massage therapists featuring service types, duration-based pricing, and packages',
      tier: 'free',
      searchVolume: 18700,
      cpc: 4.50,
      difficulty: 52,
      keywords: [
        'massage therapy invoice',
        'massage invoice',
        'spa invoice',
        'massage therapist billing',
        'wellness invoice'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'massage-therapy-invoice'
    }
  ]
};

// ============================================================================
// CATEGORY: MENTAL HEALTH & COUNSELING
// ============================================================================

export const mentalHealthCounseling: HealthWellnessCategory = {
  id: 'mental-health-counseling',
  name: 'Mental Health & Counseling',
  description: 'Invoice templates for therapists, counselors, and mental health professionals',
  templates: [
    {
      id: 'therapy-counseling-invoice',
      categoryId: 'mental-health-counseling',
      categoryName: 'Mental Health & Counseling',
      name: 'Therapy & Counseling Invoice',
      description: 'Professional invoice template for therapists and counselors with session fees, sliding scale options, and insurance billing',
      tier: 'free',
      searchVolume: 18700,
      cpc: 6.00,
      difficulty: 60,
      keywords: [
        'therapy invoice',
        'counseling invoice',
        'therapist invoice',
        'mental health invoice',
        'psychotherapy billing',
        'counselor invoice template'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'therapy-counseling-invoice'
    }
  ]
};

// ============================================================================
// INDUSTRY METADATA
// ============================================================================

export const healthWellnessIndustryMetadata: IndustryMetadata = {
  id: 'health-wellness',
  name: 'Health & Wellness',
  description: 'Invoice templates for personal trainers, yoga instructors, massage therapists, mental health professionals, and wellness practitioners',
  icon: '🧘',
  totalSearchVolume: 64800,
  templateCount: 4,
  tier: 'free',
  categories: ['fitness-training', 'wellness-spa-services', 'mental-health-counseling'],
  keywords: [
    'health wellness invoice',
    'fitness invoice',
    'personal training invoice',
    'yoga invoice',
    'massage therapy invoice',
    'therapy invoice',
    'wellness services billing'
  ],
  avgCPC: 4.65,
  searchDifficulty: 51.5,
  popularityRank: 4
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const healthWellnessCategories: HealthWellnessCategory[] = [
  fitnessTraining,
  wellnessSpaServices,
  mentalHealthCounseling
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all health & wellness templates across all categories
 */
export function getAllHealthWellnessTemplates(): HealthWellnessTemplate[] {
  return healthWellnessCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): HealthWellnessTemplate[] {
  const category = healthWellnessCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): HealthWellnessTemplate | undefined {
  return getAllHealthWellnessTemplates().find(template => template.id === templateId);
}

/**
 * Get all free health & wellness templates
 */
export function getFreeHealthWellnessTemplates(): HealthWellnessTemplate[] {
  return getAllHealthWellnessTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium health & wellness templates
 */
export function getPremiumHealthWellnessTemplates(): HealthWellnessTemplate[] {
  return getAllHealthWellnessTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchHealthWellnessTemplates(query: string): HealthWellnessTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllHealthWellnessTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get health & wellness industry statistics
 */
export function getHealthWellnessStats() {
  const allTemplates = getAllHealthWellnessTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreeHealthWellnessTemplates().length,
    premiumTemplates: getPremiumHealthWellnessTemplates().length,
    totalCategories: healthWellnessCategories.length,
    totalSearchVolume: allTemplates.reduce((sum, t) => sum + t.searchVolume, 0),
    averageCPC: allTemplates.reduce((sum, t) => sum + t.cpc, 0) / allTemplates.length,
    averageDifficulty: allTemplates.reduce((sum, t) => sum + t.difficulty, 0) / allTemplates.length
  };
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  metadata: healthWellnessIndustryMetadata,
  categories: healthWellnessCategories,
  templates: getAllHealthWellnessTemplates(),
  utils: {
    getAllTemplates: getAllHealthWellnessTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreeHealthWellnessTemplates,
    getPremiumTemplates: getPremiumHealthWellnessTemplates,
    search: searchHealthWellnessTemplates,
    getStats: getHealthWellnessStats
  }
};
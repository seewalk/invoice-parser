/**
 * ============================================================================
 * PROFESSIONAL SERVICES - CATEGORY TEMPLATES
 * ============================================================================
 * 
 * Industry: Professional Services
 * Total Templates: 2 (free)
 * Search Volume: 4,920/month
 * Average CPC: $3.38
 * 
 * Categories:
 * - Consulting Services
 * - Freelance Services
 * 
 * Integration: Works with invoiceTemplateIndustries.ts
 * ============================================================================
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ProfessionalServicesTemplate {
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

export interface ProfessionalServicesCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: ProfessionalServicesTemplate[];
  totalSearchVolume: number;
  templateCount: number;
}

// ============================================================================
// CONSULTING SERVICES CATEGORY
// ============================================================================

export const consultingServices: ProfessionalServicesCategory = {
  id: 'consulting-services',
  name: 'Consulting Services',
  description: 'Invoice templates for consultants, advisors, and business consulting',
  icon: '📊',
  totalSearchVolume: 320,
  templateCount: 1,
  templates: [
    {
      id: 'consult-biz-001',
      categoryId: 'consulting-services',
      categoryName: 'Business Consulting',
      name: 'Consulting Invoice - Project Based',
      description: 'Invoice for consulting projects and advisory services with detailed time breakdown and hourly rate tracking',
      tier: 'free',
      searchVolume: 320,
      cpc: 2.17,
      difficulty: 36,
      keywords: [
        'consulting invoice',
        'consultant invoice',
        'professional services invoice',
        'business consulting invoice',
        'advisory invoice',
        'management consulting invoice'
      ],
      sourceFile: 'invoiceTemplateLibrary.ts',
      sourceTemplateId: 'consult-biz-001'
    }
  ]
};

// ============================================================================
// FREELANCE SERVICES CATEGORY
// ============================================================================

export const freelanceServices: ProfessionalServicesCategory = {
  id: 'freelance-services',
  name: 'Freelance Services',
  description: 'Invoice templates for freelancers and independent contractors',
  icon: '💻',
  totalSearchVolume: 4600,
  templateCount: 1,
  templates: [
    {
      id: 'freelance-gen-001',
      categoryId: 'freelance-services',
      categoryName: 'General Freelance',
      name: 'Freelance Invoice - Hourly Rate',
      description: 'Standard freelance invoice for hourly or day rate work with UTR number support for self-employed individuals',
      tier: 'free',
      searchVolume: 1300,
      cpc: 4.58,
      difficulty: 39,
      keywords: [
        'freelance invoice',
        'freelancer invoice',
        'self employed invoice',
        'independent contractor invoice',
        'freelance work invoice',
        'contractor invoice',
        'self assessment invoice'
      ],
      sourceFile: 'invoiceTemplateLibrary.ts',
      sourceTemplateId: 'freelance-gen-001'
    }
  ]
};

// ============================================================================
// PROFESSIONAL SERVICES INDUSTRY METADATA
// ============================================================================

export const professionalServicesIndustryMetadata: IndustryMetadata = {
  id: 'professional-services',
  name: 'Professional Services',
  description: 'Invoice templates for consultants, freelancers, contractors, and service professionals',
  icon: '💼',
  totalSearchVolume: 4920,
  templateCount: 2,
  tier: 'free',
  categories: [
    'Consulting Services',
    'Freelance Services',
    'Business Consulting',
    'General Freelance'
  ],
  keywords: [
    'consulting invoice',
    'consultant invoice',
    'professional services invoice',
    'freelance invoice',
    'freelancer invoice',
    'self employed invoice',
    'contractor invoice'
  ],
  avgCPC: 3.38,
  searchDifficulty: 37,
  popularityRank: 1
};

// ============================================================================
// ALL CATEGORIES EXPORT
// ============================================================================

export const professionalServicesCategories: ProfessionalServicesCategory[] = [
  consultingServices,
  freelanceServices
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all templates for professional services industry
 */
export function getAllProfessionalServicesTemplates(): ProfessionalServicesTemplate[] {
  return professionalServicesCategories.flatMap(cat => cat.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): ProfessionalServicesTemplate[] {
  const category = professionalServicesCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get template by ID
 */
export function getTemplateById(templateId: string): ProfessionalServicesTemplate | undefined {
  return getAllProfessionalServicesTemplates().find(t => t.id === templateId);
}

/**
 * Get free templates only
 */
export function getFreeProfessionalServicesTemplates(): ProfessionalServicesTemplate[] {
  return getAllProfessionalServicesTemplates().filter(t => t.tier === 'free');
}

/**
 * Get premium templates only
 */
export function getPremiumProfessionalServicesTemplates(): ProfessionalServicesTemplate[] {
  return getAllProfessionalServicesTemplates().filter(t => t.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchProfessionalServicesTemplates(query: string): ProfessionalServicesTemplate[] {
  const lowerQuery = query.toLowerCase();
  return getAllProfessionalServicesTemplates().filter(template => {
    return (
      template.name.toLowerCase().includes(lowerQuery) ||
      template.description.toLowerCase().includes(lowerQuery) ||
      template.keywords.some(kw => kw.toLowerCase().includes(lowerQuery)) ||
      template.categoryName.toLowerCase().includes(lowerQuery)
    );
  });
}

/**
 * Get category statistics
 */
export function getProfessionalServicesStats() {
  return {
    totalCategories: professionalServicesCategories.length,
    totalTemplates: getAllProfessionalServicesTemplates().length,
    freeTemplates: getFreeProfessionalServicesTemplates().length,
    premiumTemplates: getPremiumProfessionalServicesTemplates().length,
    totalSearchVolume: professionalServicesCategories.reduce((sum, cat) => sum + cat.totalSearchVolume, 0),
    avgCPC: professionalServicesIndustryMetadata.avgCPC,
    categories: professionalServicesCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      templateCount: cat.templates.length,
      searchVolume: cat.totalSearchVolume
    }))
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  professionalServicesCategories,
  professionalServicesIndustryMetadata,
  getAllProfessionalServicesTemplates,
  getTemplatesByCategory,
  getTemplateById,
  getFreeProfessionalServicesTemplates,
  getPremiumProfessionalServicesTemplates,
  searchProfessionalServicesTemplates,
  getProfessionalServicesStats
};
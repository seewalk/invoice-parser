/**
 * ============================================================================
 * INVOICE TEMPLATE REGISTRY
 * ============================================================================
 * 
 * Centralized registry for loading templates from industry-specific library files.
 * This acts as a unified interface to access templates across all industries
 * without needing to manually import each industry file.
 * 
 * Usage:
 * - getTemplateBySlug(slug) - Get any template by slug
 * - getTemplateByIndustryAndSlug(industrySlug, templateSlug) - Get specific template
 * - getAllTemplates() - Get all templates across all industries
 * - getTemplatesByIndustry(industryId) - Get all templates for an industry
 * 
 * This automatically handles:
 * - Loading from industry-specific lib files
 * - Converting industry types to standard InvoiceTemplate
 * - Maintaining industry context (industryId, categoryName, etc.)
 * - Generating valid slugs for routing
 * 
 * ============================================================================
 */

import { type InvoiceTemplate, type InvoiceField, type IndustryStandard } from '../invoiceTemplateLibrary';
import { INVOICE_TEMPLATE_INDUSTRIES, type IndustryMetadata } from './invoiceTemplateIndustries';

// Import industry-specific template libraries
import { 
  automotiveCategories,
  getAllAutomotiveTemplates,
  type AutomotiveTemplate 
} from './automotive/categoriesTemplates';

import { 
  constructionCategories,
  getAllConstructionTemplates,
  type ConstructionTemplate 
} from './construction/categoriesTemplates';

import { 
  creativeMediaCategories,
  getAllCreativeMediaTemplates,
  type CreativeMediaTemplate 
} from './creative-media/categoriesTemplates';

import { 
  digitalServicesCategories,
  getAllDigitalServicesTemplates,
  type DigitalServicesTemplate 
} from './digital-services/categoriesTemplates';

import { 
  educationCategories,
  getAllEducationTemplates,
  type EducationTemplate 
} from './education/categoriesTemplates';

import { 
  healthWellnessCategories,
  getAllHealthWellnessTemplates,
  type HealthWellnessTemplate 
} from './health-wellness/categoriesTemplates';

import { 
  healthcareMedicalCategories,
  getAllHealthcareMedicalTemplates,
  type HealthcareMedicalTemplate 
} from './healthcare-medical/categoriesTemplates';

import { 
  hospitalityCategories,
  getAllHospitalityTemplates,
  type HospitalityTemplate 
} from './hospitality/categoriesTemplates';

import { 
  petServicesCategories,
  getAllPetServicesTemplates,
  type PetServicesTemplate 
} from './pet-services/categoriesTemplates';

import { 
  professionalServicesCategories,
  getAllProfessionalServicesTemplates,
  type ProfessionalServicesTemplate 
} from './professional-services/categoriesTemplates';

import { 
  sustainableBusinessCategories,
  getAllSustainableBusinessTemplates,
  type SustainableBusinessTemplate 
} from './sustainable-business/categoriesTemplates';


// TODO: Import other industries as they're migrated
// import { healthcareCategories, type HealthcareTemplate } from './healthcare/categoriesTemplates';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface TemplateRegistryEntry {
  template: InvoiceTemplate;
  industryId: string;
  industryName: string;
  industryIcon: string;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  sourceFile: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Convert industry-specific template types to standard InvoiceTemplate format
 */
function convertToInvoiceTemplate(
  industryTemplate: AutomotiveTemplate | ConstructionTemplate | CreativeMediaTemplate | DigitalServicesTemplate | EducationTemplate | HealthWellnessTemplate | HealthcareMedicalTemplate | HospitalityTemplate | PetServicesTemplate | ProfessionalServicesTemplate | SustainableBusinessTemplate,
  industryId: string
): InvoiceTemplate {

  // Base conversion that works for all industry types
  return {
    id: industryTemplate.id,
    name: industryTemplate.name,
    description: industryTemplate.description,
    keywords: industryTemplate.keywords,
    searchVolume: industryTemplate.searchVolume,
    cpc: industryTemplate.cpc,
    searchDifficulty: industryTemplate.difficulty,
    tier: industryTemplate.tier,
    requiredFields: industryTemplate.requiredFields || [],
    optionalFields: industryTemplate.optionalFields || [],
    industryStandards: industryTemplate.industryStandards || [],
    sampleData: industryTemplate.sampleData || {},
    businessBenefits: industryTemplate.businessBenefits,
    useCases: industryTemplate.useCases
  };
}

// ============================================================================
// TEMPLATE REGISTRY BUILDER
// ============================================================================

/**
 * Build the complete template registry from all industry-specific files
 * This is computed once and cached
 */
function buildTemplateRegistry(): Map<string, TemplateRegistryEntry> {
  const registry = new Map<string, TemplateRegistryEntry>();
  
  // Find industry metadata
  const getIndustryMetadata = (industryId: string): IndustryMetadata | undefined => {
    return INVOICE_TEMPLATE_INDUSTRIES.find(ind => ind.id === industryId);
  };

  // -------------------------------------------------------------------------
  // AUTOMOTIVE INDUSTRY
  // -------------------------------------------------------------------------
  const automotiveIndustry = getIndustryMetadata('automotive');
  if (automotiveIndustry) {
    for (const category of automotiveCategories) {
      for (const template of category.templates) {
        const templateSlug = slugify(template.id);
        const entry: TemplateRegistryEntry = {
          template: convertToInvoiceTemplate(template, 'automotive'),
          industryId: 'automotive',
          industryName: automotiveIndustry.name,
          industryIcon: automotiveIndustry.icon,
          categoryId: category.id,
          categoryName: category.name,
          categoryIcon: category.icon,
          sourceFile: template.sourceFile
        };
        
        // Register by template slug
        registry.set(templateSlug, entry);
        
        // Also register by full path: industry/template
        registry.set(`automotive/${templateSlug}`, entry);
      }
    }
  }

  // -------------------------------------------------------------------------
  // CONSTRUCTION INDUSTRY
  // -------------------------------------------------------------------------
  const constructionIndustry = getIndustryMetadata('construction');
  if (constructionIndustry) {
    for (const category of constructionCategories) {
      for (const template of category.templates) {
        const templateSlug = slugify(template.id);
        const entry: TemplateRegistryEntry = {
          template: convertToInvoiceTemplate(template, 'construction'),
          industryId: 'construction',
          industryName: constructionIndustry.name,
          industryIcon: constructionIndustry.icon,
          categoryId: category.id,
          categoryName: category.name,
          categoryIcon: category.icon,
          sourceFile: template.sourceFile
        };
        
        // Register by template slug
        registry.set(templateSlug, entry);
        
        // Also register by full path: industry/template
        registry.set(`construction/${templateSlug}`, entry);
      }
    }
  }

  // CREATIVE MEDIA INDUSTRY
// -------------------------------------------------------------------------
const creativeMediaIndustry = getIndustryMetadata('creative-media');
if (creativeMediaIndustry) {
  for (const category of creativeMediaCategories) {
    for (const template of category.templates) {
      const templateSlug = slugify(template.id);
      const entry: TemplateRegistryEntry = {
        template: convertToInvoiceTemplate(template, 'creative-media'),
        industryId: 'creative-media',
        industryName: creativeMediaIndustry.name,
        industryIcon: creativeMediaIndustry.icon,
        categoryId: category.id,
        categoryName: category.name,
        categoryIcon: category.icon,
        sourceFile: template.sourceFile
      };
      
      // Register by template slug
      registry.set(templateSlug, entry);
      
      // Also register by full path: industry/template
      registry.set(`creative-media/${templateSlug}`, entry);
    }
  }
}

// -------------------------------------------------------------------------
// DIGITAL SERVICES INDUSTRY
// -------------------------------------------------------------------------
const digitalServicesIndustry = getIndustryMetadata('digital-services');
if (digitalServicesIndustry) {
  for (const category of digitalServicesCategories) {
    for (const template of category.templates) {
      const templateSlug = slugify(template.id);
      const entry: TemplateRegistryEntry = {
        template: convertToInvoiceTemplate(template, 'digital-services'),
        industryId: 'digital-services',
        industryName: digitalServicesIndustry.name,
        industryIcon: digitalServicesIndustry.icon,
        categoryId: category.id,
        categoryName: category.name,
        categoryIcon: category.icon,
        sourceFile: template.sourceFile
      };
      
      // Register by template slug
      registry.set(templateSlug, entry);
      
      // Also register by full path: industry/template
      registry.set(`digital-services/${templateSlug}`, entry);
    }
  }
}

// -------------------------------------------------------------------------
// EDUCATION INDUSTRY
// -------------------------------------------------------------------------
const educationIndustry = getIndustryMetadata('education');
if (educationIndustry) {
  for (const category of educationCategories) {
    for (const template of category.templates) {
      const templateSlug = slugify(template.id);
      const entry: TemplateRegistryEntry = {
        template: convertToInvoiceTemplate(template, 'education'),
        industryId: 'education',
        industryName: educationIndustry.name,
        industryIcon: educationIndustry.icon,
        categoryId: category.id,
        categoryName: category.name,
        categoryIcon: category.icon,
        sourceFile: template.sourceFile
      };
      
      // Register by template slug
      registry.set(templateSlug, entry);
      
      // Also register by full path: industry/template
      registry.set(`education/${templateSlug}`, entry);
    }
  }
}

// Health & Wellness templates
const healthWellnessIndustry = getIndustryMetadata('health-wellness');
if (healthWellnessIndustry) {
  for (const category of healthWellnessCategories) {
    for (const template of category.templates) {
      const templateSlug = slugify(template.id);
      const entry: TemplateRegistryEntry = {
        template: convertToInvoiceTemplate(template, 'health-wellness'),
        industryId: 'health-wellness',
        industryName: healthWellnessIndustry.name,
        industryIcon: healthWellnessIndustry.icon,
        categoryId: category.id,
        categoryName: category.name,
        categoryIcon: category.icon,
        sourceFile: template.sourceFile
      };
      
      // Register by template slug
      registry.set(templateSlug, entry);
      
      // Also register by full path: industry/template
      registry.set(`health-wellness/${templateSlug}`, entry);
    }
  }
}

// Healthcare & Medical templates

const healthcareMedicalIndustry = getIndustryMetadata('healthcare-medical');
if (healthcareMedicalIndustry) {
  for (const category of healthcareMedicalCategories) {
    for (const template of category.templates) {
      const templateSlug = slugify(template.id);
      const entry: TemplateRegistryEntry = {
        template: convertToInvoiceTemplate(template, 'healthcare-medical'),
        industryId: 'healthcare-medical',
        industryName: healthcareMedicalIndustry.name,
        industryIcon: healthcareMedicalIndustry.icon,
        categoryId: category.id,
        categoryName: category.name,
        categoryIcon: category.icon,
        sourceFile: template.sourceFile
      };
      
      // Register by template slug
      registry.set(templateSlug, entry);
      
      // Also register by full path: industry/template
      registry.set(`healthcare-medical/${templateSlug}`, entry);
    }
  }
}

// Hospitality templates

const hospitalityIndustry = getIndustryMetadata('hospitality');
if (hospitalityIndustry) {
  for (const category of hospitalityCategories) {
    for (const template of category.templates) {
      const templateSlug = slugify(template.id);
      const entry: TemplateRegistryEntry = {
        template: convertToInvoiceTemplate(template, 'hospitality'),
        industryId: 'hospitality',
        industryName: hospitalityIndustry.name,
        industryIcon: hospitalityIndustry.icon,
        categoryId: category.id,
        categoryName: category.name,
        categoryIcon: category.icon,
        sourceFile: template.sourceFile
      };
      
      // Register by template slug
      registry.set(templateSlug, entry);
      
      // Also register by full path: industry/template
      registry.set(`hospitality/${templateSlug}`, entry);
    }
  }
}

// Pet Services templates

const petServicesIndustry = getIndustryMetadata('pet-services');
if (petServicesIndustry) {
  for (const category of petServicesCategories) {
    for (const template of category.templates) {
      const templateSlug = slugify(template.id);
      const entry: TemplateRegistryEntry = {
        template: convertToInvoiceTemplate(template, 'pet-services'),
        industryId: 'pet-services',
        industryName: petServicesIndustry.name,
        industryIcon: petServicesIndustry.icon,
        categoryId: category.id,
        categoryName: category.name,
        categoryIcon: category.icon,
        sourceFile: template.sourceFile
      };
      
      // Register by template slug
      registry.set(templateSlug, entry);
      
      // Also register by full path: industry/template
      registry.set(`pet-services/${templateSlug}`, entry);
    }
  }
}

// Professional Services templates

const professionalServicesIndustry = getIndustryMetadata('professional-services');
if (professionalServicesIndustry) {
  for (const category of professionalServicesCategories) {
    for (const template of category.templates) {
      const templateSlug = slugify(template.id);
      const entry: TemplateRegistryEntry = {
        template: convertToInvoiceTemplate(template, 'professional-services'),
        industryId: 'professional-services',
        industryName: professionalServicesIndustry.name,
        industryIcon: professionalServicesIndustry.icon,
        categoryId: category.id,
        categoryName: category.name,
        categoryIcon: category.icon,
        sourceFile: template.sourceFile
      };
      
      // Register by template slug
      registry.set(templateSlug, entry);
      
      // Also register by full path: industry/template
      registry.set(`professional-services/${templateSlug}`, entry);
    }
  }
}

// Sustainable Business templates

const sustainableBusinessIndustry = getIndustryMetadata('sustainable-business');
if (sustainableBusinessIndustry) {
  for (const category of sustainableBusinessCategories) {
    for (const template of category.templates) {
      const templateSlug = slugify(template.id);
      const entry: TemplateRegistryEntry = {
        template: convertToInvoiceTemplate(template, 'sustainable-business'),
        industryId: 'sustainable-business',
        industryName: sustainableBusinessIndustry.name,
        industryIcon: sustainableBusinessIndustry.icon,
        categoryId: category.id,
        categoryName: category.name,
        categoryIcon: category.icon,
        sourceFile: template.sourceFile
      };
      
      // Register by template slug
      registry.set(templateSlug, entry);
      
      // Also register by full path: industry/template
      registry.set(`sustainable-business/${templateSlug}`, entry);
    }
  }
}

  // -------------------------------------------------------------------------
  // TODO: ADD OTHER INDUSTRIES AS THEY'RE MIGRATED
  // -------------------------------------------------------------------------
  
  // Healthcare Industry Example:
  // const healthcareIndustry = getIndustryMetadata('healthcare');
  // if (healthcareIndustry) {
  //   for (const category of healthcareCategories) {
  //     for (const template of category.templates) {
  //       const templateSlug = slugify(template.id);
  //       const entry: TemplateRegistryEntry = {
  //         template: convertToInvoiceTemplate(template, 'healthcare'),
  //         industryId: 'healthcare',
  //         industryName: healthcareIndustry.name,
  //         industryIcon: healthcareIndustry.icon,
  //         categoryId: category.id,
  //         categoryName: category.name,
  //         categoryIcon: category.icon,
  //         sourceFile: template.sourceFile
  //       };
  //       registry.set(templateSlug, entry);
  //       registry.set(`healthcare/${templateSlug}`, entry);
  //     }
  //   }
  // }

  return registry;
}

// ============================================================================
// CACHED REGISTRY (Built once, reused everywhere)
// ============================================================================

let cachedRegistry: Map<string, TemplateRegistryEntry> | null = null;

function getRegistry(): Map<string, TemplateRegistryEntry> {
  if (!cachedRegistry) {
    cachedRegistry = buildTemplateRegistry();
  }
  return cachedRegistry;
}

// ============================================================================
// PUBLIC API - Template Access Functions
// ============================================================================

/**
 * Get template by slug alone (searches all industries)
 * Used for backward compatibility with old /invoice-templates/[slug] routes
 */
export function getTemplateBySlug(slug: string): TemplateRegistryEntry | null {
  const registry = getRegistry();
  return registry.get(slug) || null;
}

/**
 * Get template by industry slug and template slug
 * Used for new /invoice-templates/industry/[industrySlug]/[templateSlug] routes
 */
export function getTemplateByIndustryAndSlug(
  industrySlug: string,
  templateSlug: string
): TemplateRegistryEntry | null {
  const registry = getRegistry();
  
  // Try full path first
  const fullPath = `${industrySlug}/${templateSlug}`;
  let entry = registry.get(fullPath);
  
  if (entry) return entry;
  
  // Fallback: search by template slug and verify industry matches
  entry = registry.get(templateSlug);
  if (entry && slugify(entry.industryId) === industrySlug) {
    return entry;
  }
  
  return null;
}

/**
 * Get all templates across all industries
 */
export function getAllTemplates(): TemplateRegistryEntry[] {
  const registry = getRegistry();
  const templates: TemplateRegistryEntry[] = [];
  const seen = new Set<string>();
  
  for (const entry of registry.values()) {
    // Avoid duplicates (same template registered under multiple keys)
    if (!seen.has(entry.template.id)) {
      templates.push(entry);
      seen.add(entry.template.id);
    }
  }
  
  return templates;
}

/**
 * Get all templates for a specific industry
 */
export function getTemplatesByIndustry(industryId: string): TemplateRegistryEntry[] {
  const allTemplates = getAllTemplates();
  return allTemplates.filter(entry => entry.industryId === industryId);
}

/**
 * Get all templates for a specific industry by slug
 */
export function getTemplatesByIndustrySlug(industrySlug: string): TemplateRegistryEntry[] {
  const allTemplates = getAllTemplates();
  return allTemplates.filter(entry => slugify(entry.industryId) === industrySlug);
}

/**
 * Get all unique industry IDs that have templates
 */
export function getAvailableIndustries(): string[] {
  const allTemplates = getAllTemplates();
  const industries = new Set<string>();
  
  for (const entry of allTemplates) {
    industries.add(entry.industryId);
  }
  
  return Array.from(industries);
}

/**
 * Generate all valid template slugs for static generation
 * Returns array of slugs for /invoice-templates/[slug] route
 */
export function getAllTemplateSlugs(): string[] {
  const allTemplates = getAllTemplates();
  return allTemplates.map(entry => slugify(entry.template.id));
}

/**
 * Generate all valid industry/template slug combinations for static generation
 * Returns array of {industrySlug, templateSlug} for nested routes
 */
export function getAllTemplateParams(): Array<{ industrySlug: string; templateSlug: string }> {
  const allTemplates = getAllTemplates();
  return allTemplates.map(entry => ({
    industrySlug: slugify(entry.industryId),
    templateSlug: slugify(entry.template.id)
  }));
}

/**
 * Check if a template exists in the registry
 */
export function templateExists(slug: string): boolean {
  return getTemplateBySlug(slug) !== null;
}

/**
 * Check if an industry/template combination exists
 */
export function templateExistsInIndustry(industrySlug: string, templateSlug: string): boolean {
  return getTemplateByIndustryAndSlug(industrySlug, templateSlug) !== null;
}

/**
 * Get registry statistics
 */
export function getRegistryStats() {
  const allTemplates = getAllTemplates();
  const industries = getAvailableIndustries();
  
  return {
    totalTemplates: allTemplates.length,
    totalIndustries: industries.length,
    templatesByIndustry: industries.map(industryId => ({
      industryId,
      count: getTemplatesByIndustry(industryId).length
    })),
    totalSearchVolume: allTemplates.reduce((sum, entry) => sum + entry.template.searchVolume, 0),
    avgCPC: allTemplates.reduce((sum, entry) => sum + entry.template.cpc, 0) / allTemplates.length
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  // Primary access methods
  getTemplateBySlug,
  getTemplateByIndustryAndSlug,
  getAllTemplates,
  getTemplatesByIndustry,
  getTemplatesByIndustrySlug,
  
  // Utility methods
  getAllTemplateSlugs,
  getAllTemplateParams,
  getAvailableIndustries,
  templateExists,
  templateExistsInIndustry,
  
  // Statistics
  getRegistryStats,
  
  // Helper
  slugify
};
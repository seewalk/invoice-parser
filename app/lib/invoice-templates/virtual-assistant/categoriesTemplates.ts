/**
 * Virtual Assistant Services Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Virtual Assistant Services industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 0 (Coming Soon)
 * - Categories: 3 (Administrative Support, Virtual Assistance, Remote Services)
 * - Total Search Volume: 0/month (Not explicitly tracked)
 * - Average CPC: $3.50
 * - SEO Difficulty: Low-Medium (30.0)
 * 
 * STATUS: Placeholder - Templates to be added in future updates
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface VirtualAssistantTemplate {
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

export interface VirtualAssistantCategory {
  id: string;
  name: string;
  description: string;
  templates: VirtualAssistantTemplate[];
}

// ============================================================================
// CATEGORY: ADMINISTRATIVE SUPPORT
// ============================================================================

export const administrativeSupport: VirtualAssistantCategory = {
  id: 'administrative-support',
  name: 'Administrative Support',
  description: 'Invoice templates for administrative assistants and office support services',
  templates: [
    // Templates to be added
  ]
};

// ============================================================================
// CATEGORY: VIRTUAL ASSISTANCE
// ============================================================================

export const virtualAssistance: VirtualAssistantCategory = {
  id: 'virtual-assistance',
  name: 'Virtual Assistance',
  description: 'Invoice templates for virtual assistants providing remote business support',
  templates: [
    // Templates to be added
  ]
};

// ============================================================================
// CATEGORY: REMOTE SERVICES
// ============================================================================

export const remoteServices: VirtualAssistantCategory = {
  id: 'remote-services',
  name: 'Remote Services',
  description: 'Invoice templates for remote executive assistants and specialized VA services',
  templates: [
    // Templates to be added
  ]
};

// ============================================================================
// INDUSTRY METADATA
// ============================================================================

export const virtualAssistantIndustryMetadata: IndustryMetadata = {
  id: 'virtual-assistant',
  name: 'Virtual Assistant Services',
  description: 'Invoice templates for virtual assistants and administrative support professionals',
  icon: '👩‍💼',
  totalSearchVolume: 0,
  templateCount: 0,
  tier: 'free',
  categories: ['administrative-support', 'virtual-assistance', 'remote-services'],
  keywords: [
    'virtual assistant invoice',
    'va invoice',
    'administrative services invoice',
    'remote assistant invoice'
  ],
  avgCPC: 3.50,
  searchDifficulty: 30,
  popularityRank: 14
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const virtualAssistantCategories: VirtualAssistantCategory[] = [
  administrativeSupport,
  virtualAssistance,
  remoteServices
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all virtual assistant templates across all categories
 */
export function getAllVirtualAssistantTemplates(): VirtualAssistantTemplate[] {
  return virtualAssistantCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): VirtualAssistantTemplate[] {
  const category = virtualAssistantCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): VirtualAssistantTemplate | undefined {
  return getAllVirtualAssistantTemplates().find(template => template.id === templateId);
}

/**
 * Get all free virtual assistant templates
 */
export function getFreeVirtualAssistantTemplates(): VirtualAssistantTemplate[] {
  return getAllVirtualAssistantTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium virtual assistant templates
 */
export function getPremiumVirtualAssistantTemplates(): VirtualAssistantTemplate[] {
  return getAllVirtualAssistantTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchVirtualAssistantTemplates(query: string): VirtualAssistantTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllVirtualAssistantTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get virtual assistant industry statistics
 */
export function getVirtualAssistantStats() {
  const allTemplates = getAllVirtualAssistantTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreeVirtualAssistantTemplates().length,
    premiumTemplates: getPremiumVirtualAssistantTemplates().length,
    totalCategories: virtualAssistantCategories.length,
    totalSearchVolume: allTemplates.reduce((sum, t) => sum + t.searchVolume, 0),
    averageCPC: allTemplates.length > 0 ? allTemplates.reduce((sum, t) => sum + t.cpc, 0) / allTemplates.length : 0,
    averageDifficulty: allTemplates.length > 0 ? allTemplates.reduce((sum, t) => sum + t.difficulty, 0) / allTemplates.length : 0
  };
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  metadata: virtualAssistantIndustryMetadata,
  categories: virtualAssistantCategories,
  templates: getAllVirtualAssistantTemplates(),
  utils: {
    getAllTemplates: getAllVirtualAssistantTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreeVirtualAssistantTemplates,
    getPremiumTemplates: getPremiumVirtualAssistantTemplates,
    search: searchVirtualAssistantTemplates,
    getStats: getVirtualAssistantStats
  }
};
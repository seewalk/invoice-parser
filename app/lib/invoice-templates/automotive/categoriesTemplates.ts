/**
 * Automotive Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Automotive industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 3 (0 free, 3 premium)
 * - Categories: 3 (Vehicle Sales, Auto Repair & Maintenance, Auto Detailing)
 * - Total Search Volume: 60,490/month
 * - Average CPC: $4.13
 * - SEO Difficulty: Medium (49.0)
 * 
 * This comprehensive automotive invoice template collection positions us as the
 * definitive global resource for all automotive billing needs, covering private
 * car sales, professional garage services, and premium detailing operations.
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface AutomotiveTemplate {
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
  // Extended metadata for comprehensive SEO coverage
  industrySpecific: {
    vehicleTypes: string[];
    serviceTypes: string[];
    complianceRequired: string[];
    targetAudience: string[];
  };
  businessBenefits: string[];
  useCases: string[];
}

export interface AutomotiveCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: AutomotiveTemplate[];
  seoMetadata: {
    primaryKeywords: string[];
    secondaryKeywords: string[];
    longTailKeywords: string[];
  };
}

// ============================================================================
// CATEGORY: VEHICLE SALES
// ============================================================================

export const vehicleSales: AutomotiveCategory = {
  id: 'vehicle-sales',
  name: 'Vehicle Sales',
  description: 'Professional invoice and receipt templates for private car sales, dealership transactions, and vehicle transfer documentation',
  icon: '🚘',
  seoMetadata: {
    primaryKeywords: [
      'car sales receipt template',
      'vehicle sales invoice',
      'private car sale receipt'
    ],
    secondaryKeywords: [
      'car sale documentation',
      'vehicle transfer receipt',
      'auto sales invoice',
      'motor vehicle receipt'
    ],
    longTailKeywords: [
      'car sales receipt template uk word',
      'private car sale receipt template free',
      'vehicle sales receipt with v5c notification'
    ]
  },
  templates: [
    {
      id: 'car-sales-receipt-uk',
      categoryId: 'vehicle-sales',
      categoryName: 'Vehicle Sales',
      name: 'Car Sales Receipt (UK)',
      description: 'Official UK-compliant receipt template for private car sales with DVLA V5C notification guidance, comprehensive vehicle details, and legal protection for both buyer and seller',
      tier: 'premium',
      searchVolume: 720,
      cpc: 1.85,
      difficulty: 31,
      keywords: [
        'car sales receipt template uk',
        'car sale receipt template uk',
        'car sale receipt template uk word',
        'vehicle sales receipt',
        'private car sale receipt',
        'uk vehicle sales documentation',
        'car purchase receipt template',
        'motor vehicle receipt',
        'v5c sale receipt',
        'dvla car sale receipt'
      ],
      sourceFile: 'premiumTemplateLibrary.ts',
      sourceTemplateId: 'auto-sale-001',
      industrySpecific: {
        vehicleTypes: [
          'Cars',
          'Vans',
          'Motorcycles',
          'Light Commercial Vehicles',
          'Classic Cars',
          'Electric Vehicles',
          'Hybrid Vehicles'
        ],
        serviceTypes: [
          'Private Party Sale',
          'Used Car Sale',
          'Vehicle Transfer',
          'Part Exchange Documentation'
        ],
        complianceRequired: [
          'DVLA V5C Logbook Notification (14 days)',
          'MOT Certificate Status',
          'Accurate Vehicle Description',
          'Sale Price Declaration',
          'Buyer and Seller Identity Confirmation'
        ],
        targetAudience: [
          'Private Sellers',
          'Individual Car Buyers',
          'Independent Car Dealers',
          'Car Enthusiasts',
          'Family Vehicle Sales'
        ]
      },
      businessBenefits: [
        'Legal Protection: Creates official record of sale protecting both parties',
        'DVLA Compliance: Includes V5C notification checklist',
        'Dispute Prevention: Clear documentation prevents future claims',
        'Payment Proof: Serves as evidence of completed transaction',
        'Tax Records: Essential for capital gains and personal records',
        'Warranty Clarity: Documents "as seen" status and condition',
        'Professional Image: Demonstrates organized approach to sale'
      ],
      useCases: [
        'Selling your personal car to another individual',
        'Buying a used car from a private seller',
        'Part-exchanging vehicle with documentation',
        'Classic car sales requiring detailed provenance',
        'Family vehicle transfers between relatives',
        'Documenting vehicle gifting with nominal payment',
        'Creating records for insurance purposes',
        'Establishing sale date for warranty periods'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY: AUTO REPAIR & MAINTENANCE
// ============================================================================

export const autoRepairMaintenance: AutomotiveCategory = {
  id: 'auto-repair-maintenance',
  name: 'Auto Repair & Maintenance',
  description: 'Professional invoice templates for auto repair shops, mechanics, garages, and vehicle maintenance service providers with parts breakdown and labor tracking',
  icon: '🔧',
  seoMetadata: {
    primaryKeywords: [
      'auto repair invoice template',
      'mechanic invoice template',
      'car repair invoice'
    ],
    secondaryKeywords: [
      'garage invoice template',
      'vehicle service invoice',
      'automotive repair billing',
      'auto shop invoice'
    ],
    longTailKeywords: [
      'car repair invoice template with parts and labor',
      'mechanic invoice template with warranty',
      'garage invoice template uk vat'
    ]
  },
  templates: [
    {
      id: 'car-repair-invoice',
      categoryId: 'auto-repair-maintenance',
      categoryName: 'Auto Repair & Maintenance',
      name: 'Car Repair Invoice',
      description: 'Comprehensive professional invoice template for vehicle repair services featuring detailed parts and labor breakdown, job card tracking, warranty information, MOT status, and UK VAT compliance',
      tier: 'premium',
      searchVolume: 890,
      cpc: 6.14,
      difficulty: 70,
      keywords: [
        'car repair invoice template',
        'mechanic invoice template',
        'vehicle service invoice template',
        'garage invoice',
        'auto repair invoice',
        'automotive repair invoice template',
        'car service invoice',
        'vehicle maintenance invoice',
        'garage invoice template uk',
        'mot invoice template',
        'parts and labor invoice',
        'automotive service billing'
      ],
      sourceFile: 'premiumTemplateLibrary.ts',
      sourceTemplateId: 'auto-repair-001',
      industrySpecific: {
        vehicleTypes: [
          'Passenger Cars',
          'Light Vans',
          'Motorcycles',
          'Commercial Vehicles',
          'Electric Vehicles',
          'Hybrid Vehicles',
          'Performance Cars',
          'Classic Vehicles'
        ],
        serviceTypes: [
          'Routine Service & Maintenance',
          'Major Repairs',
          'Diagnostic Services',
          'MOT Testing',
          'Brake & Suspension Work',
          'Engine Repairs',
          'Transmission Services',
          'Electrical Systems',
          'Air Conditioning Service',
          'Bodywork & Paint'
        ],
        complianceRequired: [
          'VAT Registration Display (if applicable)',
          'Parts Warranty Terms (typically 12 months)',
          'Labor Warranty Terms (typically 6 months)',
          'Trade Association Membership (Good Garage Scheme)',
          'MOT Certificate Details (if performed)',
          'Clear Parts & Labor Breakdown',
          'Customer Authorization for Work'
        ],
        targetAudience: [
          'Independent Garages',
          'Mobile Mechanics',
          'Franchised Dealers',
          'Specialist Repair Shops',
          'MOT Test Centers',
          'Fast-Fit Services',
          'Classic Car Specialists'
        ]
      },
      businessBenefits: [
        'Professional Credibility: Polished invoicing builds customer trust',
        'Warranty Protection: Clear terms protect business from disputes',
        'Audit Trail: Complete job tracking from booking to collection',
        'Parts Markup Transparency: Itemized breakdown justifies pricing',
        'Labor Rate Documentation: Shows hourly rates and time spent',
        'Customer Retention: Professional service encourages repeat business',
        'VAT Compliance: Correct VAT calculation and display',
        'Inventory Management: Tracks parts usage for stock control',
        'Payment Tracking: Records payment method and transaction details',
        'MOT Integration: Links service work with MOT testing requirements'
      ],
      useCases: [
        'Annual vehicle service with parts replacement',
        'Emergency breakdown repairs',
        'Pre-MOT repairs and testing',
        'Brake system overhaul with parts',
        'Engine diagnostics and fault rectification',
        'Electrical system repairs',
        'Transmission repairs and fluid changes',
        'Suspension and steering work',
        'Air conditioning recharge and repairs',
        'Multi-point vehicle health checks',
        'Warranty repair work documentation',
        'Fleet vehicle maintenance services'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY: AUTO DETAILING
// ============================================================================

export const autoDetailing: AutomotiveCategory = {
  id: 'auto-detailing',
  name: 'Auto Detailing',
  description: 'Premium invoice templates for auto detailing specialists, mobile detailing services, car wash businesses, and ceramic coating professionals',
  icon: '✨',
  seoMetadata: {
    primaryKeywords: [
      'auto detailing invoice template',
      'car detailing invoice',
      'detail shop invoice'
    ],
    secondaryKeywords: [
      'mobile detailing invoice',
      'car wash invoice template',
      'ceramic coating invoice',
      'vehicle detailing billing'
    ],
    longTailKeywords: [
      'mobile auto detailing invoice template',
      'car detailing invoice with packages',
      'ceramic coating service invoice template'
    ]
  },
  templates: [
    {
      id: 'auto-detailing-invoice',
      categoryId: 'auto-detailing',
      categoryName: 'Auto Detailing',
      name: 'Auto Detailing Invoice',
      description: 'Premium professional invoice template for auto detailing services featuring package-based pricing, add-on services, ceramic coating options, paint correction, and interior detailing with before/after photo documentation',
      tier: 'premium',
      searchVolume: 19500,
      cpc: 3.75,
      difficulty: 46,
      keywords: [
        'auto detailing invoice',
        'car detailing invoice',
        'detail shop invoice',
        'mobile detailing invoice',
        'car wash billing',
        'vehicle detailing invoice template',
        'ceramic coating invoice',
        'paint correction invoice',
        'interior detailing invoice',
        'exterior detailing billing',
        'car valeting invoice',
        'professional detailing invoice'
      ],
      sourceFile: 'premiumTemplateLibrary.ts',
      sourceTemplateId: 'auto-detailing-invoice',
      industrySpecific: {
        vehicleTypes: [
          'Luxury Vehicles',
          'Sports Cars',
          'SUVs & Trucks',
          'Classic Cars',
          'Exotic Supercars',
          'Family Sedans',
          'Electric Vehicles',
          'Motorcycles',
          'RVs & Boats'
        ],
        serviceTypes: [
          'Full Detail Packages',
          'Exterior Wash & Wax',
          'Interior Deep Cleaning',
          'Ceramic Coating Application',
          'Paint Correction & Polishing',
          'Headlight Restoration',
          'Engine Bay Detailing',
          'Leather Treatment & Conditioning',
          'Odor Removal Services',
          'Scratch & Swirl Removal',
          'PPF Installation',
          'Window Tinting'
        ],
        complianceRequired: [
          'Service Package Definitions',
          'Product Warranties (Ceramic Coating)',
          'Customer Vehicle Condition Documentation',
          'Before/After Photo Agreement',
          'Payment Terms & Cancellation Policy',
          'Insurance Coverage Disclosure'
        ],
        targetAudience: [
          'Professional Detailing Studios',
          'Mobile Detailing Services',
          'Ceramic Coating Specialists',
          'Car Wash & Detail Centers',
          'Luxury Car Dealerships',
          'Paint Correction Experts',
          'Independent Detailers'
        ]
      },
      businessBenefits: [
        'Premium Positioning: Professional invoicing justifies premium pricing',
        'Package Clarity: Clear breakdown of what\'s included in each service',
        'Upsell Opportunities: Itemized add-ons encourage service upgrades',
        'Warranty Documentation: Ceramic coating warranties clearly stated',
        'Customer Education: Detailed descriptions explain value proposition',
        'Time Tracking: Shows labor hours for complex multi-stage details',
        'Product Transparency: Lists premium products used (brands matter)',
        'Repeat Business: Professional approach encourages regular maintenance',
        'Photo Documentation: Links to before/after galleries build credibility',
        'Subscription Services: Framework for monthly detail packages'
      ],
      useCases: [
        'Full exterior and interior detail packages',
        'Premium ceramic coating application (5-year warranty)',
        'Multi-stage paint correction for swirl removal',
        'Pre-sale vehicle presentation detailing',
        'Post-winter deep clean and protection',
        'New car protection packages',
        'Classic car show preparation',
        'Luxury vehicle maintenance programs',
        'Fleet vehicle bulk detailing services',
        'Mobile on-site detailing for executives',
        'Motorcycle and specialty vehicle detailing',
        'Boat and RV detailing services'
      ]
    }
  ]
};

// ============================================================================
// INDUSTRY METADATA
// ============================================================================

export const automotiveIndustryMetadata: IndustryMetadata = {
  id: 'automotive',
  name: 'Automotive Services',
  description: 'Comprehensive invoice templates for auto repair shops, mechanics, auto detailers, vehicle sales, and all automotive service providers',
  icon: '🚗',
  totalSearchVolume: 21110,
  templateCount: 3,
  tier: 'premium',
  categories: ['vehicle-sales', 'auto-repair-maintenance', 'auto-detailing'],
  keywords: [
    'automotive invoice',
    'auto repair invoice',
    'mechanic invoice',
    'auto detailing invoice',
    'car repair invoice',
    'vehicle maintenance billing',
    'car sales receipt',
    'garage invoice',
    'vehicle service invoice'
  ],
  avgCPC: 3.91,
  searchDifficulty: 49.0,
  popularityRank: 5
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const automotiveCategories: AutomotiveCategory[] = [
  vehicleSales,
  autoRepairMaintenance,
  autoDetailing
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all automotive templates across all categories
 */
export function getAllAutomotiveTemplates(): AutomotiveTemplate[] {
  return automotiveCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): AutomotiveTemplate[] {
  const category = automotiveCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): AutomotiveTemplate | undefined {
  return getAllAutomotiveTemplates().find(template => template.id === templateId);
}

/**
 * Get all free automotive templates
 */
export function getFreeAutomotiveTemplates(): AutomotiveTemplate[] {
  return getAllAutomotiveTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium automotive templates
 */
export function getPremiumAutomotiveTemplates(): AutomotiveTemplate[] {
  return getAllAutomotiveTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchAutomotiveTemplates(query: string): AutomotiveTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllAutomotiveTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)) ||
    template.useCases.some(useCase => useCase.toLowerCase().includes(lowercaseQuery)) ||
    template.businessBenefits.some(benefit => benefit.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get templates by vehicle type
 */
export function getTemplatesByVehicleType(vehicleType: string): AutomotiveTemplate[] {
  const lowercaseType = vehicleType.toLowerCase();
  return getAllAutomotiveTemplates().filter(template =>
    template.industrySpecific.vehicleTypes.some(type => 
      type.toLowerCase().includes(lowercaseType)
    )
  );
}

/**
 * Get templates by service type
 */
export function getTemplatesByServiceType(serviceType: string): AutomotiveTemplate[] {
  const lowercaseService = serviceType.toLowerCase();
  return getAllAutomotiveTemplates().filter(template =>
    template.industrySpecific.serviceTypes.some(service => 
      service.toLowerCase().includes(lowercaseService)
    )
  );
}

/**
 * Get high-value templates (by CPC)
 */
export function getHighValueTemplates(minCPC: number = 4.0): AutomotiveTemplate[] {
  return getAllAutomotiveTemplates()
    .filter(template => template.cpc >= minCPC)
    .sort((a, b) => b.cpc - a.cpc);
}

/**
 * Get templates by search volume (most popular)
 */
export function getPopularTemplates(limit: number = 10): AutomotiveTemplate[] {
  return getAllAutomotiveTemplates()
    .sort((a, b) => b.searchVolume - a.searchVolume)
    .slice(0, limit);
}

/**
 * Get automotive industry statistics
 */
export function getAutomotiveStats() {
  const allTemplates = getAllAutomotiveTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreeAutomotiveTemplates().length,
    premiumTemplates: getPremiumAutomotiveTemplates().length,
    totalCategories: automotiveCategories.length,
    totalSearchVolume: allTemplates.reduce((sum, t) => sum + t.searchVolume, 0),
    averageCPC: allTemplates.reduce((sum, t) => sum + t.cpc, 0) / allTemplates.length,
    averageDifficulty: allTemplates.reduce((sum, t) => sum + t.difficulty, 0) / allTemplates.length,
    highestSearchVolume: Math.max(...allTemplates.map(t => t.searchVolume)),
    lowestDifficulty: Math.min(...allTemplates.map(t => t.difficulty)),
    totalKeywords: allTemplates.reduce((sum, t) => sum + t.keywords.length, 0),
    totalUseCases: allTemplates.reduce((sum, t) => sum + t.useCases.length, 0),
    totalVehicleTypes: [...new Set(allTemplates.flatMap(t => t.industrySpecific.vehicleTypes))].length,
    totalServiceTypes: [...new Set(allTemplates.flatMap(t => t.industrySpecific.serviceTypes))].length
  };
}

/**
 * Get SEO-optimized template recommendations
 */
export function getSEORecommendations() {
  const templates = getAllAutomotiveTemplates();
  const sortedByVolume = templates.sort((a, b) => b.searchVolume - a.searchVolume);
  const sortedByValue = templates.sort((a, b) => (b.searchVolume * b.cpc) - (a.searchVolume * a.cpc));
  
  return {
    highestTrafficPotential: sortedByVolume[0],
    highestRevenuePotential: sortedByValue[0],
    easiestToRankFor: templates.sort((a, b) => a.difficulty - b.difficulty)[0],
    bestROI: templates.sort((a, b) => 
      (b.searchVolume / b.difficulty) - (a.searchVolume / a.difficulty)
    )[0]
  };
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  metadata: automotiveIndustryMetadata,
  categories: automotiveCategories,
  templates: getAllAutomotiveTemplates(),
  utils: {
    getAllTemplates: getAllAutomotiveTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreeAutomotiveTemplates,
    getPremiumTemplates: getPremiumAutomotiveTemplates,
    search: searchAutomotiveTemplates,
    getTemplatesByVehicleType,
    getTemplatesByServiceType,
    getHighValueTemplates,
    getPopularTemplates,
    getStats: getAutomotiveStats,
    getSEORecommendations
  }
};
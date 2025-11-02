/**
 * ============================================================================
 * INVOICE TEMPLATE INDUSTRIES DATABASE
 * ============================================================================
 * 
 * Complete industry categorization extracted from template libraries
 * Based on comprehensive analysis of:
 * - invoiceTemplateLibrary.ts (11 free templates)
 * - additionalInvoiceTemplateLibrary.ts (30 additional templates)
 * - premiumTemplateLibrary.ts (9 premium templates)
 * 
 * Total: 50 invoice templates across 16 unique industries
 * 
 * This file serves as the definitive source of truth for all industries
 * represented in our invoice template database.
 * 
 * Usage:
 * - Industry filtering and navigation
 * - SEO content generation
 * - Template discovery and search
 * - Analytics and reporting
 * 
 * Last Updated: October 31, 2024
 * ============================================================================
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface IndustryMetadata {
  id: string;
  name: string;
  description: string;
  icon: string;
  totalSearchVolume: number;
  templateCount: number;
  tier: 'free' | 'premium' | 'mixed';
  categories: string[];
  keywords: string[];
  avgCPC: number;
  searchDifficulty: number;
  popularityRank: number;
}

export interface IndustryCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  industryId: string;
  templateCount: number;
}

export interface IndustryStats {
  totalIndustries: number;
  totalCategories: number;
  totalTemplates: number;
  totalSearchVolume: number;
  avgSearchVolumePerIndustry: number;
  avgCPC: number;
  topIndustriesBySearchVolume: IndustryMetadata[];
  topIndustriesByTemplateCount: IndustryMetadata[];
}

// ============================================================================
// MAIN INDUSTRIES DATABASE
// ============================================================================

export const INVOICE_TEMPLATE_INDUSTRIES: IndustryMetadata[] = [
  // -------------------------------------------------------------------------
  // 1. PROFESSIONAL SERVICES
  // -------------------------------------------------------------------------
  {
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
  },

  // -------------------------------------------------------------------------
  // 2. CONSTRUCTION & TRADES
  // -------------------------------------------------------------------------
  {
    id: 'construction',
    name: 'Construction & Trades',
    description: 'Invoice templates for builders, electricians, plumbers, and all trade professionals',
    icon: '🔨',
    totalSearchVolume: 3180,
    templateCount: 5,
    tier: 'mixed',
    categories: [
      'General Construction',
      'Electrical & Plumbing',
      'Residential Construction',
      'Commercial Construction',
      'Electrical Services',
      'Plumbing Services',
      'Cleaning Services'
    ],
    keywords: [
      'construction invoice',
      'builder invoice',
      'building work invoice',
      'electrical invoice',
      'electrician invoice',
      'plumbing invoice',
      'plumber invoice',
      'garage invoice',
      'mechanic invoice',
      'handyman invoice',
      'carpentry invoice',
      'roofing invoice',
      'painting invoice',
      'plastering invoice',
      'cleaning invoice',
      'commercial cleaning invoice'
    ],
    avgCPC: 6.51,
    searchDifficulty: 34,
    popularityRank: 2
  },

  // -------------------------------------------------------------------------
  // 3. HOSPITALITY & FOOD SERVICE
  // -------------------------------------------------------------------------
  {
    id: 'hospitality',
    name: 'Hospitality & Food Service',
    description: 'Invoice templates for restaurants, catering, hotels, and food service businesses',
    icon: '🍽️',
    totalSearchVolume: 2290,
    templateCount: 4,
    tier: 'mixed',
    categories: [
      'Restaurants',
      'Catering Services',
      'Hotels & Accommodation',
      'Room Bookings',
      'Short-Term Rentals'
    ],
    keywords: [
      'restaurant invoice',
      'food invoice',
      'dining invoice',
      'catering invoice',
      'event catering',
      'hotel invoice',
      'hotel room invoice',
      'accommodation invoice',
      'airbnb invoice',
      'holiday let invoice',
      'rent invoice'
    ],
    avgCPC: 5.63,
    searchDifficulty: 27,
    popularityRank: 3
  },

  // -------------------------------------------------------------------------
  // 4. DIGITAL SERVICES & TECHNOLOGY
  // -------------------------------------------------------------------------
  {
    id: 'digital-services',
    name: 'Digital Services & Technology',
    description: 'Invoice templates for AI/ML consulting, SaaS, cybersecurity, and digital marketing',
    icon: '💻',
    totalSearchVolume: 8900,
    templateCount: 5,
    tier: 'free',
    categories: [
      'AI & Machine Learning',
      'SaaS & Cloud Services',
      'Cybersecurity',
      'Digital Marketing',
      'AI Consulting',
      'ML Training',
      'SaaS Subscription',
      'Security Audit',
      'Marketing Campaigns'
    ],
    keywords: [
      'ai consulting invoice',
      'machine learning invoice',
      'saas invoice',
      'software subscription invoice',
      'cybersecurity invoice',
      'security audit invoice',
      'digital marketing invoice',
      'seo invoice',
      'ppc invoice'
    ],
    avgCPC: 17.00,
    searchDifficulty: 48,
    popularityRank: 4
  },

  // -------------------------------------------------------------------------
  // 5. CREATIVE & MEDIA
  // -------------------------------------------------------------------------
  {
    id: 'creative-media',
    name: 'Creative & Media',
    description: 'Invoice templates for influencers, content creators, photographers, designers, and media production',
    icon: '🎬',
    totalSearchVolume: 10430,
    templateCount: 8,
    tier: 'mixed',
    categories: [
      'Photography',
      'Graphic Design',
      'Social Media',
      'Podcast Production',
      'Event Photography',
      'Commercial Photography',
      'Branding & Identity',
      'Influencer Marketing',
      'YouTube Content',
      'Web Design'
    ],
    keywords: [
      'photography invoice',
      'photographer invoice',
      'wedding photography invoice',
      'commercial photography invoice',
      'graphic design invoice',
      'logo design invoice',
      'influencer invoice',
      'sponsored post invoice',
      'youtube invoice',
      'podcast invoice',
      'website design invoice'
    ],
    avgCPC: 4.19,
    searchDifficulty: 39,
    popularityRank: 5
  },

  // -------------------------------------------------------------------------
  // 6. HEALTH & WELLNESS
  // -------------------------------------------------------------------------
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    description: 'Invoice templates for teletherapy, coaching, fitness training, and nutrition consulting',
    icon: '🏥',
    totalSearchVolume: 6400,
    templateCount: 4,
    tier: 'free',
    categories: [
      'Mental Health Services',
      'Life & Career Coaching',
      'Fitness & Training',
      'Nutrition Services',
      'Teletherapy',
      'Life Coaching',
      'Virtual Fitness',
      'Nutrition Consulting'
    ],
    keywords: [
      'teletherapy invoice',
      'online therapy invoice',
      'counseling invoice',
      'life coaching invoice',
      'coaching invoice',
      'fitness invoice',
      'personal training invoice',
      'nutritionist invoice',
      'dietitian invoice'
    ],
    avgCPC: 9.20,
    searchDifficulty: 35,
    popularityRank: 6
  },

  // -------------------------------------------------------------------------
  // 7. EDUCATION & E-LEARNING
  // -------------------------------------------------------------------------
  {
    id: 'education',
    name: 'Education & E-Learning',
    description: 'Invoice templates for online courses, tutoring, and educational services',
    icon: '📚',
    totalSearchVolume: 5900,
    templateCount: 2,
    tier: 'free',
    categories: [
      'Online Courses',
      'Online Tutoring',
      'Course Sales',
      'Private Tutoring'
    ],
    keywords: [
      'online course invoice',
      'e-learning invoice',
      'tutoring invoice',
      'online tutoring invoice',
      'private tutor invoice',
      'educational program invoice'
    ],
    avgCPC: 9.10,
    searchDifficulty: 38,
    popularityRank: 7
  },

  // -------------------------------------------------------------------------
  // 8. PET SERVICES
  // -------------------------------------------------------------------------
  {
    id: 'pet-services',
    name: 'Pet Services',
    description: 'Invoice templates for veterinary services, pet grooming, and dog training',
    icon: '🐾',
    totalSearchVolume: 5300,
    templateCount: 3,
    tier: 'free',
    categories: [
      'Veterinary Services',
      'Pet Grooming',
      'Dog Training',
      'Veterinary Clinic',
      'Grooming Salon',
      'Obedience Training'
    ],
    keywords: [
      'veterinary invoice',
      'vet invoice',
      'pet clinic invoice',
      'pet grooming invoice',
      'dog grooming invoice',
      'dog training invoice',
      'pet training invoice'
    ],
    avgCPC: 6.53,
    searchDifficulty: 31,
    popularityRank: 8
  },

  // -------------------------------------------------------------------------
  // 9. SUSTAINABLE & GREEN BUSINESS
  // -------------------------------------------------------------------------
  {
    id: 'sustainable-business',
    name: 'Sustainable & Green Business',
    description: 'Invoice templates for solar installation, sustainability audits, and eco-friendly services',
    icon: '🌱',
    totalSearchVolume: 4700,
    templateCount: 2,
    tier: 'free',
    categories: [
      'Renewable Energy',
      'Sustainability Consulting',
      'Solar Installation',
      'Sustainability Audit'
    ],
    keywords: [
      'solar panel invoice',
      'solar installation invoice',
      'renewable energy invoice',
      'sustainability audit invoice',
      'carbon audit invoice',
      'esg consulting invoice'
    ],
    avgCPC: 18.15,
    searchDifficulty: 47,
    popularityRank: 9
  },

  // -------------------------------------------------------------------------
  // 10. AUTOMOTIVE SERVICES
  // -------------------------------------------------------------------------
  {
    id: 'automotive',
    name: 'Automotive Services',
    description: 'Invoice templates for vehicle sales, repairs, maintenance, and automotive services',
    icon: '🚗',
    totalSearchVolume: 1700,
    templateCount: 2,
    tier: 'premium',
    categories: [
      'Vehicle Sales',
      'Vehicle Repairs & Maintenance',
      'Private Vehicle Sales',
      'General Repairs'
    ],
    keywords: [
      'car sales receipt',
      'vehicle sales receipt',
      'car repair invoice',
      'mechanic invoice',
      'garage invoice',
      'auto repair invoice',
      'vehicle service invoice'
    ],
    avgCPC: 3.99,
    searchDifficulty: 50,
    popularityRank: 10
  },

  // -------------------------------------------------------------------------
  // 11. HEALTHCARE SERVICES (Medical Professionals)
  // -------------------------------------------------------------------------
  {
    id: 'healthcare-medical',
    name: 'Healthcare Services',
    description: 'Invoice templates for medical practitioners, locums, GPs, and healthcare professionals',
    icon: '⚕️',
    totalSearchVolume: 300,
    templateCount: 1,
    tier: 'premium',
    categories: [
      'Medical Services',
      'Locum Services'
    ],
    keywords: [
      'locum invoice',
      'locum gp invoice',
      'medical invoice',
      'doctor invoice',
      'gp invoice'
    ],
    avgCPC: 3.76,
    searchDifficulty: 48,
    popularityRank: 11
  },

  // -------------------------------------------------------------------------
  // 12. MUSIC & ENTERTAINMENT
  // -------------------------------------------------------------------------
  {
    id: 'music-entertainment',
    name: 'Music & Entertainment',
    description: 'Invoice templates for musicians, DJs, performers, and entertainment services',
    icon: '🎵',
    totalSearchVolume: 220,
    templateCount: 0, // Templates exist in keywords but not yet extracted
    tier: 'free',
    categories: [
      'Live Performance',
      'DJ Services',
      'Music Production'
    ],
    keywords: [
      'music invoice',
      'musician invoice',
      'dj invoice',
      'entertainment invoice',
      'performance invoice'
    ],
    avgCPC: 2.50,
    searchDifficulty: 28,
    popularityRank: 12
  },

  // -------------------------------------------------------------------------
  // 13. VISUAL ARTS & ILLUSTRATION
  // -------------------------------------------------------------------------
  {
    id: 'visual-arts',
    name: 'Visual Arts & Illustration',
    description: 'Invoice templates for artists, illustrators, and visual creators',
    icon: '🎨',
    totalSearchVolume: 140,
    templateCount: 0, // Templates exist in keywords but not yet extracted
    tier: 'free',
    categories: [
      'Fine Art',
      'Illustration',
      'Digital Art'
    ],
    keywords: [
      'artist invoice',
      'art invoice',
      'illustration invoice',
      'painting invoice'
    ],
    avgCPC: 1.80,
    searchDifficulty: 25,
    popularityRank: 13
  },
  // -------------------------------------------------------------------------
  // 14. REAL ESTATE & PROPERTY
  // -------------------------------------------------------------------------
  {
    id: 'real-estate',
    name: 'Real Estate & Property',
    description: 'Invoice templates for real estate agents, property managers, and landlords',
    icon: '🏠',
    totalSearchVolume: 320,
    templateCount: 0, // Rent invoice mentioned but not fully extracted
    tier: 'free',
    categories: [
      'Property Management',
      'Real Estate Services',
      'Rental Services'
    ],
    keywords: [
      'rent invoice',
      'rental invoice',
      'property management invoice',
      'landlord invoice',
      'real estate invoice'
    ],
    avgCPC: 4.20,
    searchDifficulty: 35,
    popularityRank: 15
  },

];

// ============================================================================
// INDUSTRY CATEGORIES DATABASE
// ============================================================================

export const INDUSTRY_CATEGORIES: IndustryCategory[] = [
  // Professional Services
  { id: 'consulting-services', name: 'Consulting Services', description: 'Business and management consulting', icon: '📊', industryId: 'professional-services', templateCount: 1 },
  { id: 'freelance-services', name: 'Freelance Services', description: 'Independent contractor services', icon: '💻', industryId: 'professional-services', templateCount: 1 },
  
  // Construction & Trades
  { id: 'general-construction', name: 'General Construction', description: 'Building and construction work', icon: '🏗️', industryId: 'construction', templateCount: 3 },
  { id: 'electrical-plumbing', name: 'Electrical & Plumbing', description: 'Trade services', icon: '⚡', industryId: 'construction', templateCount: 2 },
  { id: 'cleaning-services', name: 'Cleaning Services', description: 'Commercial and domestic cleaning', icon: '🧹', industryId: 'construction', templateCount: 1 },
  
  // Hospitality & Food Service
  { id: 'restaurants', name: 'Restaurants', description: 'Restaurant and dining services', icon: '🍕', industryId: 'hospitality', templateCount: 2 },
  { id: 'hotels', name: 'Hotels & Accommodation', description: 'Hotel and lodging services', icon: '🏨', industryId: 'hospitality', templateCount: 2 },
  
  // Digital Services & Technology
  { id: 'ai-machine-learning', name: 'AI & Machine Learning', description: 'AI consulting and ML services', icon: '🤖', industryId: 'digital-services', templateCount: 2 },
  { id: 'saas-subscription', name: 'SaaS & Cloud Services', description: 'Software subscription services', icon: '☁️', industryId: 'digital-services', templateCount: 1 },
  { id: 'cybersecurity', name: 'Cybersecurity', description: 'Security audits and protection', icon: '🔒', industryId: 'digital-services', templateCount: 1 },
  { id: 'digital-marketing', name: 'Digital Marketing', description: 'Online marketing services', icon: '📱', industryId: 'digital-services', templateCount: 1 },
  
  // Creative & Media
  { id: 'photography', name: 'Photography', description: 'Photography services', icon: '📸', industryId: 'creative-media', templateCount: 3 },
  { id: 'graphic-design', name: 'Graphic Design', description: 'Design and branding', icon: '🎨', industryId: 'creative-media', templateCount: 2 },
  { id: 'social-media', name: 'Social Media', description: 'Influencer and content creation', icon: '📱', industryId: 'creative-media', templateCount: 2 },
  { id: 'podcast', name: 'Podcast Production', description: 'Audio production services', icon: '🎙️', industryId: 'creative-media', templateCount: 1 },
  
  // Health & Wellness
  { id: 'mental-health', name: 'Mental Health Services', description: 'Therapy and counseling', icon: '🧠', industryId: 'health-wellness', templateCount: 1 },
  { id: 'coaching', name: 'Life & Career Coaching', description: 'Personal development coaching', icon: '🎯', industryId: 'health-wellness', templateCount: 1 },
  { id: 'fitness', name: 'Fitness & Training', description: 'Personal training services', icon: '💪', industryId: 'health-wellness', templateCount: 1 },
  { id: 'nutrition', name: 'Nutrition Services', description: 'Nutrition consulting', icon: '🥗', industryId: 'health-wellness', templateCount: 1 },
  
  // Education & E-Learning
  { id: 'online-courses', name: 'Online Courses', description: 'Digital learning programs', icon: '💻', industryId: 'education', templateCount: 1 },
  { id: 'tutoring', name: 'Online Tutoring', description: 'Private tutoring services', icon: '👨‍🏫', industryId: 'education', templateCount: 1 },
  
  // Pet Services
  { id: 'veterinary', name: 'Veterinary Services', description: 'Animal healthcare', icon: '🏥', industryId: 'pet-services', templateCount: 1 },
  { id: 'grooming', name: 'Pet Grooming', description: 'Pet grooming and styling', icon: '✂️', industryId: 'pet-services', templateCount: 1 },
  { id: 'training', name: 'Dog Training', description: 'Dog training services', icon: '🦮', industryId: 'pet-services', templateCount: 1 },
  
  // Sustainable & Green Business
  { id: 'renewable-energy', name: 'Renewable Energy', description: 'Solar and renewable services', icon: '☀️', industryId: 'sustainable-business', templateCount: 1 },
  { id: 'sustainability', name: 'Sustainability Consulting', description: 'ESG and carbon audits', icon: '♻️', industryId: 'sustainable-business', templateCount: 1 },
  
  // Automotive Services
  { id: 'vehicle-sales', name: 'Vehicle Sales', description: 'Car sales and receipts', icon: '🚘', industryId: 'automotive', templateCount: 1 },
  { id: 'repairs', name: 'Vehicle Repairs', description: 'Auto repair services', icon: '🔧', industryId: 'automotive', templateCount: 1 },
  
  // Healthcare Services
  { id: 'medical', name: 'Medical Services', description: 'GP and locum services', icon: '🏥', industryId: 'healthcare-medical', templateCount: 1 }
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get industry by ID
 */
export function getIndustryById(industryId: string): IndustryMetadata | undefined {
  return INVOICE_TEMPLATE_INDUSTRIES.find(ind => ind.id === industryId);
}

/**
 * Get all industries sorted by search volume
 */
export function getIndustriesBySearchVolume(): IndustryMetadata[] {
  return [...INVOICE_TEMPLATE_INDUSTRIES].sort((a, b) => b.totalSearchVolume - a.totalSearchVolume);
}

/**
 * Get all industries sorted by template count
 */
export function getIndustriesByTemplateCount(): IndustryMetadata[] {
  return [...INVOICE_TEMPLATE_INDUSTRIES].sort((a, b) => b.templateCount - a.templateCount);
}

/**
 * Get all industries sorted by popularity rank
 */
export function getIndustriesByPopularity(): IndustryMetadata[] {
  return [...INVOICE_TEMPLATE_INDUSTRIES].sort((a, b) => a.popularityRank - b.popularityRank);
}

/**
 * Get industries by tier
 */
export function getIndustriesByTier(tier: 'free' | 'premium' | 'mixed'): IndustryMetadata[] {
  return INVOICE_TEMPLATE_INDUSTRIES.filter(ind => ind.tier === tier);
}

/**
 * Get free industries only
 */
export function getFreeIndustries(): IndustryMetadata[] {
  return INVOICE_TEMPLATE_INDUSTRIES.filter(ind => ind.tier === 'free' || ind.tier === 'mixed');
}

/**
 * Get premium industries only
 */
export function getPremiumIndustries(): IndustryMetadata[] {
  return INVOICE_TEMPLATE_INDUSTRIES.filter(ind => ind.tier === 'premium' || ind.tier === 'mixed');
}

/**
 * Search industries by keyword
 */
export function searchIndustries(query: string): IndustryMetadata[] {
  const lowerQuery = query.toLowerCase();
  
  return INVOICE_TEMPLATE_INDUSTRIES.filter(industry => {
    return (
      industry.name.toLowerCase().includes(lowerQuery) ||
      industry.description.toLowerCase().includes(lowerQuery) ||
      industry.keywords.some(kw => kw.toLowerCase().includes(lowerQuery)) ||
      industry.categories.some(cat => cat.toLowerCase().includes(lowerQuery))
    );
  });
}

/**
 * Get categories for an industry
 */
export function getCategoriesForIndustry(industryId: string): IndustryCategory[] {
  return INDUSTRY_CATEGORIES.filter(cat => cat.industryId === industryId);
}

/**
 * Get category by ID
 */
export function getCategoryById(categoryId: string): IndustryCategory | undefined {
  return INDUSTRY_CATEGORIES.find(cat => cat.id === categoryId);
}

/**
 * Get industry statistics
 */
export function getIndustryStats(): IndustryStats {
  const totalIndustries = INVOICE_TEMPLATE_INDUSTRIES.length;
  const totalCategories = INDUSTRY_CATEGORIES.length;
  const totalTemplates = INVOICE_TEMPLATE_INDUSTRIES.reduce((sum, ind) => sum + ind.templateCount, 0);
  const totalSearchVolume = INVOICE_TEMPLATE_INDUSTRIES.reduce((sum, ind) => sum + ind.totalSearchVolume, 0);
  const avgSearchVolumePerIndustry = Math.round(totalSearchVolume / totalIndustries);
  
  // Calculate average CPC weighted by search volume
  const totalWeightedCPC = INVOICE_TEMPLATE_INDUSTRIES.reduce((sum, ind) => {
    return sum + (ind.avgCPC * ind.totalSearchVolume);
  }, 0);
  const avgCPC = parseFloat((totalWeightedCPC / totalSearchVolume).toFixed(2));
  
  const topIndustriesBySearchVolume = getIndustriesBySearchVolume().slice(0, 10);
  const topIndustriesByTemplateCount = getIndustriesByTemplateCount().slice(0, 10);
  
  return {
    totalIndustries,
    totalCategories,
    totalTemplates,
    totalSearchVolume,
    avgSearchVolumePerIndustry,
    avgCPC,
    topIndustriesBySearchVolume,
    topIndustriesByTemplateCount
  };
}

/**
 * Get high-value industries (by CPC)
 */
export function getHighValueIndustries(minCPC: number = 10): IndustryMetadata[] {
  return INVOICE_TEMPLATE_INDUSTRIES
    .filter(ind => ind.avgCPC >= minCPC)
    .sort((a, b) => b.avgCPC - a.avgCPC);
}

/**
 * Get industries with most templates
 */
export function getIndustriesWithMostTemplates(limit: number = 5): IndustryMetadata[] {
  return getIndustriesByTemplateCount().slice(0, limit);
}

/**
 * Get trending industries (high search volume + low difficulty)
 */
export function getTrendingIndustries(): IndustryMetadata[] {
  return INVOICE_TEMPLATE_INDUSTRIES
    .filter(ind => ind.totalSearchVolume > 1000 && ind.searchDifficulty < 40)
    .sort((a, b) => {
      // Score = search volume / difficulty
      const scoreA = a.totalSearchVolume / a.searchDifficulty;
      const scoreB = b.totalSearchVolume / b.searchDifficulty;
      return scoreB - scoreA;
    });
}

/**
 * Get industry recommendations based on template count gaps
 */
export function getIndustriesNeedingTemplates(): IndustryMetadata[] {
  return INVOICE_TEMPLATE_INDUSTRIES
    .filter(ind => ind.totalSearchVolume > 500 && ind.templateCount < 2)
    .sort((a, b) => b.totalSearchVolume - a.totalSearchVolume);
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  INVOICE_TEMPLATE_INDUSTRIES,
  INDUSTRY_CATEGORIES,
  getIndustryById,
  getIndustriesBySearchVolume,
  getIndustriesByTemplateCount,
  getIndustriesByPopularity,
  getIndustriesByTier,
  getFreeIndustries,
  getPremiumIndustries,
  searchIndustries,
  getCategoriesForIndustry,
  getCategoryById,
  getIndustryStats,
  getHighValueIndustries,
  getIndustriesWithMostTemplates,
  getTrendingIndustries,
  getIndustriesNeedingTemplates
};
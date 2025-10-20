/**
 * Alternatives & Competitors Knowledge Base Library
 * 
 * Comprehensive competitor directory organized by:
 * Market Segment → Competitors → Features → Pricing → Reviews
 * 
 * Based on Invoice Processing Market Analysis (October 2025)
 * Target Market: UK Small Businesses
 * Research Focus: Invoice generators, templates, and AI parsers
 * 
 * Usage:
 * - Generate competitor comparison pages
 * - SEO content for "alternative to X" pages
 * - Feature comparison tables
 * - Pricing comparison widgets
 * - User review aggregation
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface Competitor {
  id: string;
  name: string;
  slug: string;
  website: string;
  description: string;
  shortDescription: string;
  
  // Company Information
  company: {
    founded: number;
    headquarters: string;
    employees?: string;
    funding?: string;
    valuation?: string;
    parentCompany?: string;
  };
  
  // Market Position
  segment: 'free-generator' | 'template-library' | 'ai-parser' | 'accounting-software' | 'api-service';
  traffic: {
    monthlyUsers?: number;
    monthlyVisits?: number;
    description: string;
  };
  
  // Features
  features: {
    aiPowered: boolean;
    ukCompliance: boolean;
    vatSupport: boolean;
    cisSupport: boolean;
    automation: boolean;
    accountingIntegration: string[];
    mobileApp: boolean;
    apiAccess: boolean;
    customTemplates: boolean;
    multiCurrency: boolean;
    batchProcessing: boolean;
    ocrAccuracy?: number;
  };
  
  // Pricing
  pricing: {
    model: 'free' | 'freemium' | 'subscription' | 'usage-based' | 'enterprise';
    currency: 'GBP' | 'USD' | 'EUR';
    tiers: PricingTier[];
    usageFees?: {
      perPage?: number;
      perInvoice?: number;
      description: string;
    };
  };
  
  // Strengths & Weaknesses
  strengths: string[];
  weaknesses: string[];
  
  // Target Market
  targetMarket: {
    description: string;
    businessSize: 'freelancer' | 'small' | 'medium' | 'enterprise' | 'all';
    industry: string[];
    geography: string[];
  };
  
  // Reviews & Ratings
  reviews?: {
    overall: number;
    trustpilot?: number;
    g2?: number;
    capterra?: number;
    userComments: string[];
  };
  
  // SEO Data
  keywords: string[];
  searchVolume: number;
  alternativeKeywords: string[];
  
  // Elektroluma Positioning
  elektrolumaDifferentiators: string[];
  migrationPath?: string;
}

export interface PricingTier {
  name: string;
  price: number;
  billingPeriod: 'month' | 'year' | 'one-time';
  features: string[];
  limits?: {
    invoices?: number;
    pages?: number;
    users?: number;
    storage?: string;
  };
}

export interface MarketSegment {
  id: string;
  name: string;
  description: string;
  icon: string;
  totalMarketSize: string;
  competitors: Competitor[];
  marketTrends: string[];
  opportunityGap: string;
}

export interface ComparisonCategory {
  id: string;
  name: string;
  description: string;
  weight: number; // For comparison scoring
}

export interface ExternalResource {
  id: string;
  name: string;
  url: string;
  description: string;
  category: 'monitoring' | 'research' | 'keywords' | 'reviews' | 'news';
  isPaid: boolean;
}

// ============================================================================
// MARKET SEGMENTS
// ============================================================================

export const marketSegments: Record<string, MarketSegment> = {
  freeGenerators: {
    id: 'free-generators',
    name: 'Free Invoice Generators',
    description: 'High-traffic, ad-supported or freemium models targeting freelancers and occasional users',
    icon: '📝',
    totalMarketSize: '10M+ monthly users',
    marketTrends: [
      'Race to bottom on pricing',
      'Mobile-first experiences gaining traction',
      'Adding premium features to monetize free users',
      'Integration with payment processors (Stripe, PayPal)'
    ],
    opportunityGap: 'No free generator offers AI automation or UK-specific compliance features',
    competitors: [] // Populated below
  },
  
  templateLibraries: {
    id: 'template-libraries',
    name: 'Invoice Template Libraries',
    description: 'SEO-driven lead generation funnels for accounting software and financial services',
    icon: '📋',
    totalMarketSize: '5M+ monthly searches',
    marketTrends: [
      'Content marketing driving organic traffic',
      'Templates as lead magnets for paid products',
      'Industry-specific customization',
      'Multi-format downloads (PDF, Excel, Word)'
    ],
    opportunityGap: 'Most templates lack automation and require manual editing every time',
    competitors: []
  },
  
  aiParsers: {
    id: 'ai-parsers',
    name: 'AI Invoice Parsers',
    description: 'Enterprise SaaS with complex pricing targeting mid-market to large businesses',
    icon: '🤖',
    totalMarketSize: '$2.3B global market (2025)',
    marketTrends: [
      'AI accuracy improving (95-99% standard)',
      'Move from template-based to layout-agnostic parsing',
      'Pricing complexity (base + usage + overages)',
      'Enterprise focus leaving SMB market underserved'
    ],
    opportunityGap: 'Massive price gap: £29/mo vs $999+/mo. No affordable option for UK SMBs',
    competitors: []
  }
};

// ============================================================================
// COMPETITORS DATABASE
// ============================================================================

export const competitors: Record<string, Competitor> = {
  invoiceGenerator: {
    id: 'invoice-generator-com',
    name: 'Invoice-Generator.com',
    slug: 'invoice-generator',
    website: 'https://invoice-generator.com',
    description: 'The original free online invoice generator with 4+ million monthly active users. Simple, fast, and requires no signup for basic invoicing.',
    shortDescription: 'Free invoice generator with 4M+ users',
    
    company: {
      founded: 2012,
      headquarters: 'United States',
      employees: '1-10',
      parentCompany: 'Independent'
    },
    
    segment: 'free-generator',
    traffic: {
      monthlyUsers: 4000000,
      description: '4+ million monthly active users, market leader in free generators'
    },
    
    features: {
      aiPowered: false,
      ukCompliance: false,
      vatSupport: true,
      cisSupport: false,
      automation: false,
      accountingIntegration: [],
      mobileApp: true,
      apiAccess: false,
      customTemplates: true,
      multiCurrency: true,
      batchProcessing: false
    },
    
    pricing: {
      model: 'freemium',
      currency: 'USD',
      tiers: [
        {
          name: 'Free',
          price: 0,
          billingPeriod: 'month',
          features: [
            'Unlimited invoice generation',
            'Instant PDF download',
            'No signup required',
            'Basic templates',
            'Tax calculations'
          ]
        },
        {
          name: 'Premium',
          price: 15,
          billingPeriod: 'month',
          features: [
            'Everything in Free',
            'Online invoice storage',
            'Accept online payments',
            'Email invoices',
            'Invoice tracking'
          ]
        }
      ]
    },
    
    strengths: [
      'Massive brand recognition (first-mover advantage)',
      'Simple, fast UX with no learning curve',
      '98% of users get full functionality free',
      'Mobile apps (iOS, Android, Windows)',
      'No account required for basic use'
    ],
    
    weaknesses: [
      'No automation - manual data entry every time',
      'No accounting software integration',
      'Limited customization options',
      'No AI or data extraction capabilities',
      'Not UK-focused (US-centric)',
      'No CIS support for UK construction'
    ],
    
    targetMarket: {
      description: 'Freelancers, very small businesses, and occasional invoice users who need a simple, free solution',
      businessSize: 'freelancer',
      industry: ['All industries'],
      geography: ['Global', 'US-focused']
    },
    
    reviews: {
      overall: 4.6,
      trustpilot: 4.5,
      userComments: [
        'Extremely easy to use, perfect for freelancers',
        'Wish it had QuickBooks integration',
        'Templates are basic but functional',
        'Great for occasional use, not for high volume'
      ]
    },
    
    keywords: [
      'free invoice generator',
      'online invoice maker',
      'invoice generator no sign up',
      'instant invoice',
      'simple invoice creator'
    ],
    searchVolume: 450000,
    alternativeKeywords: [
      'invoice-generator.com alternative',
      'better than invoice generator',
      'invoice generator with automation',
      'invoice generator UK'
    ],
    
    elektrolumaDifferentiators: [
      'AI automation vs manual entry',
      'QuickBooks/Xero integration',
      'UK-specific compliance (VAT, CIS)',
      'Invoice parsing from emails/PDFs',
      'Unlimited storage included'
    ],
    
    migrationPath: 'Import existing invoices via CSV, continue using familiar interface with added automation'
  },
  
  zohoInvoice: {
    id: 'zoho-invoice',
    name: 'Zoho Invoice',
    slug: 'zoho-invoice',
    website: 'https://www.zoho.com/invoice/',
    description: 'Free invoicing software from Zoho with professional templates, mobile apps, and integration with the Zoho ecosystem. Ideal for businesses already using Zoho products.',
    shortDescription: 'Free invoicing tool from Zoho Corporation',
    
    company: {
      founded: 1996,
      headquarters: 'Chennai, India / Austin, USA',
      employees: '1,000+',
      valuation: '$1B+',
      parentCompany: 'Zoho Corporation'
    },
    
    segment: 'accounting-software',
    traffic: {
      monthlyVisits: 500000,
      description: 'Moderate traffic as part of Zoho ecosystem'
    },
    
    features: {
      aiPowered: false,
      ukCompliance: false,
      vatSupport: true,
      cisSupport: false,
      automation: true,
      accountingIntegration: ['Zoho Books', 'Zoho CRM', 'Zoho Analytics'],
      mobileApp: true,
      apiAccess: true,
      customTemplates: true,
      multiCurrency: true,
      batchProcessing: true
    },
    
    pricing: {
      model: 'freemium',
      currency: 'USD',
      tiers: [
        {
          name: 'Free',
          price: 0,
          billingPeriod: 'month',
          features: [
            'Up to 5 customers',
            'Unlimited invoices',
            'Basic templates',
            'Mobile apps',
            'Payment gateway integration'
          ],
          limits: {
            invoices: -1,
            users: 1
          }
        },
        {
          name: 'Standard',
          price: 9,
          billingPeriod: 'month',
          features: [
            'Up to 500 customers',
            'Custom fields',
            'Multiple tax rates',
            'Recurring invoices',
            'Reports'
          ]
        },
        {
          name: 'Professional',
          price: 19,
          billingPeriod: 'month',
          features: [
            'Unlimited customers',
            'Purchase orders',
            'Vendor management',
            'Advanced reports',
            'Custom modules'
          ]
        }
      ]
    },
    
    strengths: [
      'Professional templates with 4.8/5 app ratings',
      'Integrates seamlessly with Zoho ecosystem',
      'Global brand trust and reliability',
      'Free tier is genuinely useful',
      'Strong mobile apps',
      'Multiple invoice formats (proforma, delivery, medical)'
    ],
    
    weaknesses: [
      'Requires Zoho account for advanced features',
      'Lock-in to Zoho ecosystem',
      'Limited UK-specific features (US-centric)',
      'No AI automation or parsing',
      'No CIS support',
      'Overwhelming for simple invoice needs'
    ],
    
    targetMarket: {
      description: 'Small businesses already using or considering Zoho products for CRM and accounting',
      businessSize: 'small',
      industry: ['All industries'],
      geography: ['Global']
    },
    
    reviews: {
      overall: 4.4,
      g2: 4.3,
      capterra: 4.5,
      userComments: [
        'Great if you use Zoho ecosystem',
        'Too complex for simple invoicing',
        'Lacks UK-specific tax features',
        'Good value on free tier'
      ]
    },
    
    keywords: [
      'zoho invoice',
      'zoho free invoice',
      'zoho billing',
      'zoho invoice generator'
    ],
    searchVolume: 89000,
    alternativeKeywords: [
      'zoho invoice alternative',
      'better than zoho invoice UK',
      'zoho invoice vs',
      'simple alternative to zoho'
    ],
    
    elektrolumaDifferentiators: [
      'UK-first approach vs global generic',
      'AI invoice parsing built-in',
      'No ecosystem lock-in',
      'CIS deduction support',
      'Gas Safe / NICEIC fields',
      'Simpler UI for UK SMBs'
    ],
    
    migrationPath: 'Direct API integration with Zoho - import customers, continue workflows'
  },
  
  canva: {
    id: 'canva-invoice',
    name: 'Canva Invoice Generator',
    slug: 'canva',
    website: 'https://www.canva.com/invoices/',
    description: 'Beautiful, highly customizable invoice templates from design platform Canva. Perfect for creative professionals who prioritize aesthetics over accounting features.',
    shortDescription: 'Design-first invoice templates',
    
    company: {
      founded: 2012,
      headquarters: 'Sydney, Australia',
      employees: '4,000+',
      valuation: '$40B',
      parentCompany: 'Canva'
    },
    
    segment: 'template-library',
    traffic: {
      description: 'Very high traffic as part of Canva.com ecosystem'
    },
    
    features: {
      aiPowered: false,
      ukCompliance: false,
      vatSupport: false,
      cisSupport: false,
      automation: false,
      accountingIntegration: [],
      mobileApp: true,
      apiAccess: false,
      customTemplates: true,
      multiCurrency: false,
      batchProcessing: false
    },
    
    pricing: {
      model: 'freemium',
      currency: 'USD',
      tiers: [
        {
          name: 'Free',
          price: 0,
          billingPeriod: 'month',
          features: [
            '100+ invoice templates',
            'Basic design tools',
            'PDF export',
            'Limited brand kit'
          ]
        },
        {
          name: 'Canva Pro',
          price: 55,
          billingPeriod: 'year',
          features: [
            'All templates',
            'Brand kit',
            'Unlimited storage',
            'Premium elements',
            'Background remover'
          ]
        }
      ]
    },
    
    strengths: [
      'Beautiful, highly customizable designs',
      'Brand consistency tools',
      'Massive template library (100+)',
      'Intuitive drag-and-drop interface',
      'Great for designers and creatives'
    ],
    
    weaknesses: [
      'Design-first, not accounting-first',
      'No QuickBooks/Xero integration',
      'No automation or AI features',
      'Requires Canva account',
      'Pro features paywalled',
      'Not suitable for high-volume invoicing'
    ],
    
    targetMarket: {
      description: 'Designers, creative freelancers, and small businesses who prioritize beautiful invoice design',
      businessSize: 'freelancer',
      industry: ['Creative', 'Design', 'Photography', 'Marketing'],
      geography: ['Global']
    },
    
    reviews: {
      overall: 4.7,
      trustpilot: 4.7,
      userComments: [
        'Perfect for making invoices look professional',
        'Wish it connected to my accounting software',
        'Great design tools, lacking business features',
        'Templates are stunning'
      ]
    },
    
    keywords: [
      'canva invoice',
      'canva invoice template',
      'beautiful invoice design',
      'custom invoice maker'
    ],
    searchVolume: 135000,
    alternativeKeywords: [
      'canva alternative for invoicing',
      'invoice tool with canva design',
      'accounting features canva'
    ],
    
    elektrolumaDifferentiators: [
      'Accounting integration vs design-only',
      'Automation vs manual design',
      'UK compliance built-in',
      'QuickBooks/Xero sync',
      'AI parsing from received invoices'
    ],
    
    migrationPath: 'Export Canva designs as PDF, upload to Elektroluma, continue with automation'
  },
  
  wise: {
    id: 'wise-invoice',
    name: 'Wise Invoice Templates',
    slug: 'wise',
    website: 'https://wise.com/gb/business/invoice-template',
    description: 'Free UK invoice generator and templates from Wise (formerly TransferWise). Excellent UK focus with VAT support and multi-currency capabilities for international businesses.',
    shortDescription: 'UK-focused invoice templates from Wise',
    
    company: {
      founded: 2011,
      headquarters: 'London, UK',
      employees: '5,000+',
      valuation: '$11B',
      parentCompany: 'Wise PLC (formerly TransferWise)'
    },
    
    segment: 'template-library',
    traffic: {
      description: 'High traffic benefiting from Wise.com domain authority'
    },
    
    features: {
      aiPowered: false,
      ukCompliance: true,
      vatSupport: true,
      cisSupport: false,
      automation: false,
      accountingIntegration: ['Wise Business Account'],
      mobileApp: true,
      apiAccess: true,
      customTemplates: false,
      multiCurrency: true,
      batchProcessing: false
    },
    
    pricing: {
      model: 'free',
      currency: 'GBP',
      tiers: [
        {
          name: 'Free',
          price: 0,
          billingPeriod: 'month',
          features: [
            'Free UK invoice generator',
            'VAT & no VAT options',
            'Excel & Word templates',
            'Multi-currency support',
            'Wise bank details integration'
          ]
        }
      ]
    },
    
    strengths: [
      'Excellent UK focus (VAT, HMRC, £ symbols)',
      'Clear invoice requirements explained',
      'Trusted brand (16M customers)',
      'Multi-currency for international businesses',
      'Free Wise bank details for receiving payments',
      'Strong educational content on UK compliance'
    ],
    
    weaknesses: [
      'Primary goal is selling Wise Business accounts',
      'No automation or AI',
      'Limited template variety (2-3 templates)',
      'No QuickBooks/Xero integration',
      'No CIS support',
      'Static templates require manual editing'
    ],
    
    targetMarket: {
      description: 'UK businesses with international clients or suppliers who need multi-currency invoicing',
      businessSize: 'small',
      industry: ['E-commerce', 'Exporters', 'International Services'],
      geography: ['UK', 'Europe']
    },
    
    reviews: {
      overall: 4.6,
      trustpilot: 4.6,
      userComments: [
        'Great for international invoicing',
        'Templates are good but basic',
        'Wish they had automation',
        'Best UK-focused option available'
      ]
    },
    
    keywords: [
      'wise invoice template',
      'UK invoice generator',
      'VAT invoice template UK',
      'multi-currency invoice'
    ],
    searchVolume: 67000,
    alternativeKeywords: [
      'wise invoice alternative',
      'automated wise invoicing',
      'wise with quickbooks'
    ],
    
    elektrolumaDifferentiators: [
      'AI automation vs static templates',
      'QuickBooks/Xero integration',
      'CIS deduction support',
      'Gas Safe / NICEIC fields',
      'Invoice parsing from emails',
      'Wise + Elektroluma partnership potential'
    ],
    
    migrationPath: 'Continue using Wise for banking, add Elektroluma for invoice automation'
  },
  
  nanonets: {
    id: 'nanonets',
    name: 'Nanonets',
    slug: 'nanonets',
    website: 'https://nanonets.com',
    description: 'Enterprise-grade AI invoice parser with 95-99% accuracy. Industry-leading OCR with layout-agnostic processing and complex line-item extraction. Best for mid-market to enterprise with 500+ invoices/month.',
    shortDescription: 'Enterprise AI invoice parser with 99% accuracy',
    
    company: {
      founded: 2017,
      headquarters: 'San Francisco, USA',
      funding: 'Venture-backed (Series A)',
      employees: '50-100'
    },
    
    segment: 'ai-parser',
    traffic: {
      description: 'Moderate B2B SaaS traffic, low organic (enterprise sales-driven)'
    },
    
    features: {
      aiPowered: true,
      ukCompliance: false,
      vatSupport: true,
      cisSupport: false,
      automation: true,
      accountingIntegration: ['QuickBooks', 'Xero', 'NetSuite', 'SAP', 'Oracle'],
      mobileApp: false,
      apiAccess: true,
      customTemplates: true,
      multiCurrency: true,
      batchProcessing: true,
      ocrAccuracy: 99
    },
    
    pricing: {
      model: 'usage-based',
      currency: 'USD',
      tiers: [
        {
          name: 'Starter',
          price: 0,
          billingPeriod: 'month',
          features: [
            'First 500 pages free',
            'Pay-as-you-go after',
            'Basic OCR',
            'Email support'
          ],
          limits: {
            pages: 500
          }
        },
        {
          name: 'Pro',
          price: 999,
          billingPeriod: 'month',
          features: [
            'Volume discounts',
            'Custom model training',
            'Human-in-the-loop',
            'API access',
            'Priority support',
            'ERP integrations'
          ]
        },
        {
          name: 'Enterprise',
          price: 5000,
          billingPeriod: 'month',
          features: [
            'Custom pricing',
            'Dedicated support',
            'On-premise deployment',
            'SLA guarantee',
            'Advanced security'
          ]
        }
      ],
      usageFees: {
        perPage: 0.25,
        description: '$0.10-0.50 per page depending on volume'
      }
    },
    
    strengths: [
      'Best-in-class AI accuracy (95-99%)',
      'Handles complex, varied invoice formats',
      'Strong enterprise features (compliance, security)',
      'Continuous learning AI improves over time',
      'Excellent line-item extraction',
      'Layout-agnostic processing',
      'SOC 2, GDPR, HIPAA compliant'
    ],
    
    weaknesses: [
      'Expensive ($999/mo minimum for serious usage)',
      'Complex setup requires technical knowledge',
      'Overkill for small businesses (<100 invoices/mo)',
      'No UK-specific pricing (USD only)',
      'Poor SMB support (enterprise-focused)',
      'Usage fees add up quickly',
      'Long implementation time'
    ],
    
    targetMarket: {
      description: 'Mid-market to enterprise businesses processing 500+ invoices monthly with $10M+ revenue',
      businessSize: 'enterprise',
      industry: ['Logistics', 'Manufacturing', 'Retail', 'Healthcare'],
      geography: ['Global', 'US-focused']
    },
    
    reviews: {
      overall: 4.7,
      g2: 4.7,
      capterra: 4.6,
      userComments: [
        'Accuracy is impressive but expensive',
        'Great for high-volume processing',
        'Overkill for our needs',
        'Support is excellent but complex setup'
      ]
    },
    
    keywords: [
      'nanonets',
      'AI invoice parser',
      'invoice OCR software',
      'automated invoice processing',
      'invoice data extraction'
    ],
    searchVolume: 24000,
    alternativeKeywords: [
      'nanonets alternative',
      'cheaper than nanonets',
      'nanonets for small business',
      'affordable AI invoice parser',
      'nanonets UK version'
    ],
    
    elektrolumaDifferentiators: [
      'Massive price gap: £29/mo vs $999/mo',
      'UK-specific features (VAT, CIS)',
      'Simple setup vs complex implementation',
      'SMB-focused vs enterprise-only',
      'No usage fees vs $0.25/page',
      'Same AI accuracy (GPT-4, Claude)',
      'QuickBooks/Xero integration out-of-the-box'
    ],
    
    migrationPath: 'Target Nanonets rejected customers (too expensive) - offer trial, data import via API'
  },
  
  docuClipper: {
    id: 'docuclipper',
    name: 'DocuClipper',
    slug: 'docuclipper',
    website: 'https://www.docuclipper.com',
    description: 'Invoice and bank statement OCR software for accountants and bookkeepers. Known for bank statement processing but has accuracy issues according to user reviews.',
    shortDescription: 'OCR for invoices and bank statements',
    
    company: {
      founded: 2015,
      headquarters: 'United States',
      funding: 'Bootstrapped',
      employees: '10-50'
    },
    
    segment: 'ai-parser',
    traffic: {
      description: 'Low-moderate traffic, niche player'
    },
    
    features: {
      aiPowered: true,
      ukCompliance: false,
      vatSupport: true,
      cisSupport: false,
      automation: true,
      accountingIntegration: ['QuickBooks'],
      mobileApp: false,
      apiAccess: false,
      customTemplates: false,
      multiCurrency: true,
      batchProcessing: true,
      ocrAccuracy: 97.5
    },
    
    pricing: {
      model: 'subscription',
      currency: 'USD',
      tiers: [
        {
          name: 'Starter',
          price: 39,
          billingPeriod: 'month',
          features: [
            '120 pages/month',
            'Invoice OCR',
            'Bank statement conversion',
            'Excel/CSV export',
            'Email support'
          ],
          limits: {
            pages: 120
          }
        },
        {
          name: 'Professional',
          price: 79,
          billingPeriod: 'month',
          features: [
            '300 pages/month',
            'QuickBooks integration',
            'Approval workflows',
            'Priority support'
          ],
          limits: {
            pages: 300
          }
        },
        {
          name: 'Business',
          price: 149,
          billingPeriod: 'month',
          features: [
            '750 pages/month',
            'Batch processing',
            'Advanced security',
            'Phone support'
          ],
          limits: {
            pages: 750
          }
        }
      ],
      usageFees: {
        perPage: 0.30,
        description: '$0.30 per additional page over limit'
      }
    },
    
    strengths: [
      'Bank statement focus (unique differentiator)',
      'More affordable than Nanonets ($39/mo entry)',
      'QuickBooks direct integration',
      'Simple pricing structure',
      'SOC 2 compliant, AES-256 encryption'
    ],
    
    weaknesses: [
      'Lower accuracy (97.5% vs 99%)',
      'Negative Reddit reviews ("very inaccurate", "expensive")',
      'Page limits cause overage fees ($0.30/page)',
      'Limited AI capabilities (template-based OCR)',
      'Poor line-item extraction',
      'No UK-specific features',
      'Limited integrations'
    ],
    
    targetMarket: {
      description: 'Accountants, bookkeepers, and lenders processing bank statements and invoices',
      businessSize: 'small',
      industry: ['Accounting', 'Bookkeeping', 'Lending'],
      geography: ['North America']
    },
    
    reviews: {
      overall: 3.2,
      userComments: [
        'Very inaccurate, takes less time to manually enter',
        'Also it is very expensive for what you get',
        'Bank statements work okay, invoices are hit or miss',
        'Customer support is responsive but product needs work'
      ]
    },
    
    keywords: [
      'docuclipper',
      'bank statement OCR',
      'invoice OCR software',
      'document OCR'
    ],
    searchVolume: 8900,
    alternativeKeywords: [
      'docuclipper alternative',
      'better than docuclipper',
      'accurate invoice OCR',
      'unlimited invoice parsing'
    ],
    
    elektrolumaDifferentiators: [
      'Better accuracy (99% vs 97.5%)',
      'Unlimited invoices vs 120-page limit',
      'Lower price (£29 unlimited vs $39 for 120)',
      'No overage fees vs $0.30/page',
      'UK-specific compliance',
      'Modern AI (GPT-4) vs template-based OCR',
      'Target unhappy DocuClipper customers via Reddit'
    ],
    
    migrationPath: 'Reddit outreach to dissatisfied users, offer free trial with accuracy comparison'
  },
  
  rossum: {
    id: 'rossum',
    name: 'Rossum',
    slug: 'rossum',
    website: 'https://rossum.ai',
    description: 'Enterprise-only cognitive AI for invoice processing. Extremely powerful but requires 10,000+ invoices/year minimum. Best-in-class for Fortune 500 companies.',
    shortDescription: 'Enterprise cognitive AI for invoices',
    
    company: {
      founded: 2017,
      headquarters: 'London, UK / Prague, Czech Republic',
      funding: '$37M+ (Series B)',
      employees: '100-200'
    },
    
    segment: 'ai-parser',
    traffic: {
      description: 'Low organic traffic, enterprise B2B sales-driven'
    },
    
    features: {
      aiPowered: true,
      ukCompliance: true,
      vatSupport: true,
      cisSupport: false,
      automation: true,
      accountingIntegration: ['SAP', 'Oracle', 'Workday', 'NetSuite', 'QuickBooks'],
      mobileApp: false,
      apiAccess: true,
      customTemplates: true,
      multiCurrency: true,
      batchProcessing: true,
      ocrAccuracy: 99.5
    },
    
    pricing: {
      model: 'enterprise',
      currency: 'USD',
      tiers: [
        {
          name: 'Enterprise',
          price: 5000,
          billingPeriod: 'month',
          features: [
            'Minimum 10,000 invoices/year',
            'Custom AI models',
            'Dedicated support team',
            'Implementation services',
            'SLA guarantees',
            'On-premise options'
          ]
        }
      ]
    },
    
    strengths: [
      'Extremely powerful AI (best for complex invoices)',
      'Handles multi-page, multi-supplier formats',
      'Strong enterprise support',
      'Continuous learning system',
      'Human-in-the-loop workflows',
      'Excellent for high-volume processing'
    ],
    
    weaknesses: [
      'Enterprise-only pricing (SMBs cannot afford)',
      'Long implementation time (3-6 months)',
      'Requires dedicated team to manage',
      'No self-service option',
      'Overkill for businesses <10,000 invoices/year',
      'Complex contracts and pricing'
    ],
    
    targetMarket: {
      description: 'Large enterprises (Fortune 500) processing 50,000+ invoices annually',
      businessSize: 'enterprise',
      industry: ['Manufacturing', 'Logistics', 'Retail', 'Healthcare'],
      geography: ['Global']
    },
    
    reviews: {
      overall: 4.8,
      g2: 4.8,
      userComments: [
        'Best AI but incredibly expensive',
        'Perfect for large enterprises',
        'Implementation takes forever',
        'Too complex for our needs'
      ]
    },
    
    keywords: [
      'rossum',
      'rossum AI',
      'enterprise invoice processing',
      'cognitive AI invoices'
    ],
    searchVolume: 12000,
    alternativeKeywords: [
      'rossum alternative',
      'affordable rossum',
      'rossum for small business',
      'rossum lite'
    ],
    
    elektrolumaDifferentiators: [
      'SMB vs enterprise-only',
      '£29/mo vs $5,000+/mo',
      'Self-service vs 6-month implementation',
      'UK SMB focus vs Fortune 500',
      'Same AI technology, simpler UI',
      'Target Rossum rejected leads (too small)'
    ],
    
    migrationPath: 'Not a direct competitor - mention as "Rossum for enterprises, Elektroluma for SMBs"'
  },
  
  googleDocumentAI: {
    id: 'google-document-ai',
    name: 'Google Cloud Document AI',
    slug: 'google-document-ai',
    website: 'https://cloud.google.com/document-ai',
    description: 'Google Cloud API for invoice processing. Powerful AI but requires technical expertise to implement. No UI, integrations, or business logic included.',
    shortDescription: 'Google Cloud invoice parsing API',
    
    company: {
      founded: 2020,
      headquarters: 'Mountain View, California',
      parentCompany: 'Google Cloud (Alphabet Inc.)',
      valuation: '$2T market cap'
    },
    
    segment: 'api-service',
    traffic: {
      description: 'Low organic traffic, developer-focused API documentation'
    },
    
    features: {
      aiPowered: true,
      ukCompliance: false,
      vatSupport: true,
      cisSupport: false,
      automation: false,
      accountingIntegration: [],
      mobileApp: false,
      apiAccess: true,
      customTemplates: false,
      multiCurrency: true,
      batchProcessing: true,
      ocrAccuracy: 98
    },
    
    pricing: {
      model: 'usage-based',
      currency: 'USD',
      tiers: [
        {
          name: 'Pay-as-you-go',
          price: 0,
          billingPeriod: 'month',
          features: [
            'First 1,000 pages free/month',
            '$0.10 per page after',
            'Pre-trained invoice processor',
            'JSON output',
            'Multi-language support'
          ]
        }
      ],
      usageFees: {
        perPage: 0.10,
        description: '$0.10 per page after 1,000 free pages/month'
      }
    },
    
    strengths: [
      'Powerful AI (Google research)',
      'Simple pay-per-use pricing',
      'No monthly minimum fee',
      'Scalable (Google infrastructure)',
      'Multi-language support',
      'High accuracy from Google AI'
    ],
    
    weaknesses: [
      'Technical users only (API, no UI)',
      'No QuickBooks/Xero integration (DIY)',
      'Requires coding skills',
      'No UK-specific features',
      'No approval workflows or business logic',
      'No support beyond documentation',
      'Not suitable for non-technical users'
    ],
    
    targetMarket: {
      description: 'Developers and IT teams building custom invoice processing solutions',
      businessSize: 'medium',
      industry: ['Software', 'Technology', 'IT Services'],
      geography: ['Global']
    },
    
    reviews: {
      overall: 4.3,
      userComments: [
        'Powerful but requires coding',
        'Good API documentation',
        'Accuracy is good but not perfect',
        'Wish it had a UI'
      ]
    },
    
    keywords: [
      'google document ai',
      'google invoice parser',
      'google ocr api',
      'document ai invoice'
    ],
    searchVolume: 18000,
    alternativeKeywords: [
      'google document ai with UI',
      'no-code google document ai',
      'google document ai alternative'
    ],
    
    elektrolumaDifferentiators: [
      'UI vs API-only',
      'No coding required',
      'QuickBooks/Xero integration built-in',
      'UK-specific features',
      'Approval workflows included',
      'Simple setup vs technical implementation',
      'Use Google AI as backend, add business features'
    ],
    
    migrationPath: 'Position as "Google Document AI + UI + UK features + integrations"'
  }
};

// Assign competitors to segments
marketSegments.freeGenerators.competitors = [
  competitors.invoiceGenerator,
  competitors.zohoInvoice,
  competitors.canva
];

marketSegments.templateLibraries.competitors = [
  competitors.wise,
  competitors.canva,
  competitors.zohoInvoice
];

marketSegments.aiParsers.competitors = [
  competitors.nanonets,
  competitors.docuClipper,
  competitors.rossum,
  competitors.googleDocumentAI
];

// ============================================================================
// EXTERNAL RESOURCES
// ============================================================================

export const externalResources: Record<string, ExternalResource> = {
  // Competitor Monitoring
  similarweb: {
    id: 'similarweb',
    name: 'SimilarWeb',
    url: 'https://www.similarweb.com',
    description: 'Track competitor traffic, engagement metrics, and audience insights',
    category: 'monitoring',
    isPaid: true
  },
  
  semrush: {
    id: 'semrush',
    name: 'SEMrush',
    url: 'https://www.semrush.com',
    description: 'Comprehensive SEO and competitor analysis platform',
    category: 'monitoring',
    isPaid: true
  },
  
  ahrefs: {
    id: 'ahrefs',
    name: 'Ahrefs',
    url: 'https://ahrefs.com',
    description: 'Backlink analysis and competitor keyword research',
    category: 'monitoring',
    isPaid: true
  },
  
  // Industry Reports
  gartner:{
    id: 'gartner',
    name: 'Gartner Magic Quadrant',
    url: 'https://www.gartner.com/en/research/methodologies/magic-quadrants-research',
    description: 'Industry analysis and vendor comparison for enterprise software',
    category: 'research',
    isPaid: true
  },
  
  forrester: {
    id: 'forrester',
    name: 'Forrester Wave',
    url: 'https://www.forrester.com/research/',
    description: 'Technology market research and competitive analysis',
    category: 'research',
    isPaid: true
  },
  
  // Keyword Tools
  ubersuggest: {
    id: 'ubersuggest',
    name: 'Ubersuggest',
    url: 'https://neilpatel.com/ubersuggest/',
    description: 'Keyword research and content ideas with search volume data',
    category: 'keywords',
    isPaid: false
  },
  
  keywordTool: {
    id: 'keyword-tool',
    name: 'Keyword Tool',
    url: 'https://keywordtool.io',
    description: 'Long-tail keyword suggestions for Google, YouTube, Amazon',
    category: 'keywords',
    isPaid: true
  },
  
  answerthepublic: {
    id: 'answer-the-public',
    name: 'Answer The Public',
    url: 'https://answerthepublic.com',
    description: 'Discover questions and topics people search for',
    category: 'keywords',
    isPaid: false
  },
  
  // Review Platforms
  g2: {
    id: 'g2',
    name: 'G2',
    url: 'https://www.g2.com',
    description: 'Software review platform for B2B solutions',
    category: 'reviews',
    isPaid: false
  },
  
  capterra: {
    id: 'capterra',
    name: 'Capterra',
    url: 'https://www.capterra.com',
    description: 'Software discovery and reviews for SMBs',
    category: 'reviews',
    isPaid: false
  },
  
  trustpilot: {
    id: 'trustpilot',
    name: 'Trustpilot',
    url: 'https://www.trustpilot.com',
    description: 'Customer review platform for businesses',
    category: 'reviews',
    isPaid: false
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all competitors as array
 */
export function getAllCompetitors(): Competitor[] {
  return Object.values(competitors);
}

/**
 * Get competitors by segment
 */
export function getCompetitorsBySegment(segmentId: string): Competitor[] {
  return getAllCompetitors().filter(c => c.segment === segmentId);
}

/**
 * Get competitor by slug
 */
export function getCompetitorBySlug(slug: string): Competitor | undefined {
  return Object.values(competitors).find(c => c.slug === slug);
}

/**
 * Get market segment by ID
 */
export function getMarketSegment(segmentId: string): MarketSegment | undefined {
  return marketSegments[segmentId];
}

/**
 * Search competitors by keyword
 */
export function searchCompetitors(query: string): Competitor[] {
  const lowerQuery = query.toLowerCase();
  return getAllCompetitors().filter(c =>
    c.name.toLowerCase().includes(lowerQuery) ||
    c.description.toLowerCase().includes(lowerQuery) ||
    c.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get Elektroluma advantages over specific competitor
 */
export function getElektrolumaAdvantages(competitorSlug: string): string[] {
  const competitor = getCompetitorBySlug(competitorSlug);
  return competitor?.elektrolumaDifferentiators || [];
}

/**
 * Get pricing comparison
 */
export function getPricingComparison(): Array<{
  name: string;
  lowestPrice: number;
  currency: string;
  model: string;
}> {
  return getAllCompetitors().map(c => ({
    name: c.name,
    lowestPrice: c.pricing.tiers[0]?.price || 0,
    currency: c.pricing.currency,
    model: c.pricing.model
  }));
}

/**
 * Get feature comparison matrix
 */
export function getFeatureComparison(featureKey: keyof Competitor['features']): Array<{
  name: string;
  hasFeature: boolean;
}> {
  return getAllCompetitors().map(c => ({
    name: c.name,
    hasFeature: c.features[featureKey] as boolean
  }));
}

/**
 * Get total market search volume
 */
export function getTotalSearchVolume(): number {
  return getAllCompetitors().reduce((sum, c) => sum + c.searchVolume, 0);
}

/**
 * Get external resources by category
 */
export function getResourcesByCategory(category: ExternalResource['category']): ExternalResource[] {
  return Object.values(externalResources).filter(r => r.category === category);
}

/**
 * Get statistics
 */
export function getKnowledgeBaseStats() {
  return {
    totalCompetitors: getAllCompetitors().length,
    totalSegments: Object.keys(marketSegments).length,
    totalSearchVolume: getTotalSearchVolume(),
    totalResources: Object.keys(externalResources).length,
    freeGenerators: getCompetitorsBySegment('free-generator').length,
    aiParsers: getCompetitorsBySegment('ai-parser').length,
    templateLibraries: getCompetitorsBySegment('template-library').length
  };
}
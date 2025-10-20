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
  },
  
  accountingSoftware: {
    id: 'accounting-software',
    name: 'Accounting Software with Invoicing',
    description: 'Full accounting platforms that include invoicing as one of many features',
    icon: '💼',
    totalMarketSize: '5.5M UK SMBs, 89% use QuickBooks or Xero',
    marketTrends: [
      'Xero and QuickBooks dominate UK market (89% share)',
      'Making Tax Digital driving cloud adoption',
      'Receipt capture add-ons growing (Hubdoc, Dext)',
      'Mobile apps critical for adoption'
    ],
    opportunityGap: 'Accounting platforms lack specialized invoice parsing - opportunity for deep integrations',
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
  },
  
  dextPrepare: {
    id: 'dext-prepare',
    name: 'Dext Prepare',
    slug: 'dext-prepare',
    website: 'https://dext.com',
    description: 'Cloud-based bookkeeping automation for accountants and businesses. 99% OCR accuracy for invoices, receipts, and bank statements with direct Xero/QuickBooks integration.',
    shortDescription: 'Accounting automation for UK firms - £20/client/mo',
    
    company: {
      founded: 2010,
      headquarters: 'London, UK',
      employees: '300+',
      funding: '$120M+',
      parentCompany: 'Dext (formerly Receipt Bank)'
    },
    
    segment: 'ai-parser',
    traffic: {
      monthlyVisits: 250000,
      description: 'Strong UK presence, popular among accounting firms'
    },
    
    features: {
      aiPowered: true,
      ukCompliance: true,
      vatSupport: true,
      cisSupport: true,
      automation: true,
      accountingIntegration: ['Xero', 'QuickBooks', 'Sage', 'FreeAgent'],
      mobileApp: true,
      apiAccess: true,
      customTemplates: false,
      multiCurrency: true,
      batchProcessing: true,
      ocrAccuracy: 99
    },
    
    pricing: {
      model: 'subscription',
      currency: 'GBP',
      tiers: [
        {
          name: 'Essentials',
          price: 232.86,
          billingPeriod: 'month',
          features: [
            '15 clients (minimum)',
            '£15.52 per client',
            '50 documents/client average',
            'Basic OCR',
            'Email support'
          ],
          limits: {
            users: 15
          }
        },
        {
          name: 'Advanced',
          price: 250.11,
          billingPeriod: 'month',
          features: [
            '15 clients (minimum)',
            '£16.67 per client',
            'Line item extraction',
            'Bank statement fetch',
            'Priority support'
          ],
          limits: {
            users: 15
          }
        }
      ],
      usageFees: {
        description: 'Add-ons apply for line items and bank statements beyond included amounts'
      }
    },
    
    strengths: [
      'Strong UK presence (London HQ, UK-focused)',
      '99% OCR accuracy (best in class)',
      'Full CIS support for UK construction',
      'Deep Xero/QuickBooks integration',
      'Popular among UK accounting firms'
    ],
    
    weaknesses: [
      'Expensive for SMBs (£232/mo minimum for 15 clients)',
      'Per-client pricing adds up quickly',
      'Designed for accounting firms, not direct SMBs',
      'Complex pricing with add-ons',
      'Minimum client requirements'
    ],
    
    targetMarket: {
      description: 'UK accounting firms and bookkeepers managing multiple SMB clients',
      businessSize: 'small',
      industry: ['Accounting', 'Bookkeeping'],
      geography: ['UK', 'Ireland', 'Australia']
    },
    
    reviews: {
      overall: 4.4,
      g2: 4.3,
      capterra: 4.5,
      userComments: [
        'Great for accounting firms with multiple clients',
        'Expensive for single businesses',
        'Excellent Xero integration',
        'Line item extraction is accurate'
      ]
    },
    
    keywords: [
      'dext prepare',
      'receipt bank',
      'xero invoice capture',
      'accountant software UK',
      'bookkeeping automation'
    ],
    searchVolume: 75000,
    alternativeKeywords: [
      'dext alternative',
      'cheaper than dext',
      'dext for small business',
      'receipt bank alternative'
    ],
    
    elektrolumaDifferentiators: [
      'Direct-to-SMB vs Dext\'s accountant focus',
      '£29/mo unlimited vs Dext\'s £232/mo for 15 clients',
      'No minimum client requirements',
      'Restaurant/warehouse vertical focus vs generic',
      'Simpler pricing (no add-ons)',
      'Better for businesses <100 invoices/mo'
    ],
    
    migrationPath: 'Businesses using Dext via their accountant can switch to direct Elektroluma subscription. Export existing data via Xero/QuickBooks integration.'
  },
  
  hubdoc: {
    id: 'hubdoc-xero',
    name: 'Hubdoc (by Xero)',
    slug: 'hubdoc',
    website: 'https://www.hubdoc.com',
    description: 'Document capture and data extraction software owned by Xero. Free with Xero subscription. Fetches bank statements, bills, and receipts automatically.',
    shortDescription: 'Free with Xero subscription - invoice capture',
    
    company: {
      founded: 2011,
      headquarters: 'Toronto, Canada',
      employees: '100+ (part of Xero)',
      funding: 'Acquired by Xero in 2018',
      parentCompany: 'Xero Limited (NZX/ASX listed)'
    },
    
    segment: 'ai-parser',
    traffic: {
      monthlyVisits: 150000,
      description: 'Integrated with Xero ecosystem, millions of Xero users'
    },
    
    features: {
      aiPowered: true,
      ukCompliance: true,
      vatSupport: true,
      cisSupport: false,
      automation: true,
      accountingIntegration: ['Xero', 'QuickBooks'],
      mobileApp: true,
      apiAccess: false,
      customTemplates: false,
      multiCurrency: true,
      batchProcessing: false,
      ocrAccuracy: 95
    },
    
    pricing: {
      model: 'free',
      currency: 'GBP',
      tiers: [
        {
          name: 'Free with Xero',
          price: 0,
          billingPeriod: 'month',
          features: [
            'Included with any Xero plan',
            'Bank statement fetch',
            'Invoice/receipt capture',
            'Mobile app',
            'Email support'
          ]
        },
        {
          name: 'Standalone',
          price: 12,
          billingPeriod: 'month',
          features: [
            'Without Xero subscription',
            'Basic document capture',
            'QuickBooks integration'
          ]
        }
      ]
    },
    
    strengths: [
      'Free with Xero subscription (major value)',
      'Deep Xero integration (seamless workflow)',
      'Bank statement auto-fetch',
      'Mobile app for receipt capture',
      'UK VAT support'
    ],
    
    weaknesses: [
      'Requires Xero subscription (lock-in)',
      'Lower accuracy (95% vs 99%)',
      'Recent reliability issues (user reviews)',
      'Limited features vs Dext',
      'No CIS support',
      'Slower processing than competitors'
    ],
    
    targetMarket: {
      description: 'Existing Xero users looking for document capture add-on',
      businessSize: 'small',
      industry: ['All industries'],
      geography: ['Global', 'Strong in UK/ANZ']
    },
    
    reviews: {
      overall: 4.0,
      g2: 3.9,
      capterra: 4.2,
      userComments: [
        'Great value if you use Xero',
        'Reliability issues reported in 2024',
        'Good for basic needs, not complex invoices',
        'Xero integration is seamless'
      ]
    },
    
    keywords: [
      'hubdoc xero',
      'xero invoice capture',
      'hubdoc app',
      'xero document capture',
      'xero receipt bank'
    ],
    searchVolume: 95000,
    alternativeKeywords: [
      'hubdoc alternative',
      'better than hubdoc',
      'xero invoice automation',
      'hubdoc vs dext'
    ],
    
    elektrolumaDifferentiators: [
      'Higher accuracy (99% vs Hubdoc\'s 95%)',
      'Works with Xero AND QuickBooks (not just Xero)',
      'No Xero subscription required (standalone)',
      'Better for complex invoices (line items)',
      'CIS support for UK construction',
      'Restaurant/warehouse vertical features'
    ],
    
    migrationPath: 'Xero users keep Hubdoc for receipts, add Elektroluma for complex supplier invoices. Complement each other rather than replace.'
  },
  
  freshbooks: {
    id: 'freshbooks',
    name: 'FreshBooks',
    slug: 'freshbooks',
    website: 'https://www.freshbooks.com',
    description: 'Cloud-based accounting software for service-based businesses. Strong invoicing features with time tracking, expense management, and client portal.',
    shortDescription: 'Accounting software with invoicing - £15/mo',
    
    company: {
      founded: 2003,
      headquarters: 'Toronto, Canada',
      employees: '500+',
      funding: '$90M+',
      parentCompany: 'Independent'
    },
    
    segment: 'accounting-software',
    traffic: {
      monthlyVisits: 2000000,
      description: 'Strong global presence with 4.5M+ businesses served'
    },
    
    features: {
      aiPowered: false,
      ukCompliance: false,
      vatSupport: true,
      cisSupport: false,
      automation: true,
      accountingIntegration: ['Stripe', 'PayPal', 'G Suite'],
      mobileApp: true,
      apiAccess: true,
      customTemplates: true,
      multiCurrency: true,
      batchProcessing: false
    },
    
    pricing: {
      model: 'subscription',
      currency: 'GBP',
      tiers: [
        {
          name: 'Lite',
          price: 15,
          billingPeriod: 'month',
          features: [
            '5 billable clients',
            'Unlimited invoices',
            'Expense tracking',
            'Mobile app',
            'Basic reports'
          ],
          limits: {
            users: 5
          }
        },
        {
          name: 'Plus',
          price: 28,
          billingPeriod: 'month',
          features: [
            '50 billable clients',
            'Recurring invoices',
            'Project tracking',
            'Proposal templates',
            'Advanced reports'
          ],
          limits: {
            users: 50
          }
        },
        {
          name: 'Premium',
          price: 48,
          billingPeriod: 'month',
          features: [
            'Unlimited clients',
            '2 team members',
            'Client retainers',
            'Priority support',
            'Accountant access'
          ]
        }
      ]
    },
    
    strengths: [
      'User-friendly interface (low learning curve)',
      'Strong for service-based businesses',
      'Excellent time tracking integration',
      'Mobile apps (iOS/Android)',
      'Good customer support'
    ],
    
    weaknesses: [
      'Limited UK-specific features (no CIS)',
      'Not great for product-based businesses',
      'No AI or OCR capabilities',
      'Client limits on lower tiers',
      'More expensive than UK alternatives (Xero, QuickBooks)'
    ],
    
    targetMarket: {
      description: 'Service-based freelancers and small businesses needing invoicing + time tracking',
      businessSize: 'freelancer',
      industry: ['Consulting', 'Creative Services', 'Professional Services'],
      geography: ['North America', 'Some UK presence']
    },
    
    reviews: {
      overall: 4.5,
      g2: 4.5,
      capterra: 4.5,
      trustpilot: 4.2,
      userComments: [
        'Great for freelancers and consultants',
        'Time tracking is excellent',
        'Lacking UK tax features',
        'More expensive than UK alternatives'
      ]
    },
    
    keywords: [
      'freshbooks',
      'freshbooks UK',
      'invoice software for freelancers',
      'time tracking invoicing',
      'freshbooks accounting'
    ],
    searchVolume: 450000,
    alternativeKeywords: [
      'freshbooks alternative UK',
      'better than freshbooks',
      'freshbooks vs xero',
      'freshbooks vs quickbooks'
    ],
    
    elektrolumaDifferentiators: [
      'AI invoice parsing vs FreshBooks\' manual entry',
      'UK-specific compliance (VAT, CIS) vs North American focus',
      'Process incoming supplier invoices (FreshBooks only does outgoing)',
      '£29/mo unlimited vs FreshBooks £15/mo for 5 clients',
      'Restaurant/warehouse focus vs generic services',
      'QuickBooks/Xero integration vs FreshBooks lock-in'
    ],
    
    migrationPath: 'Use FreshBooks for outgoing invoices/time tracking. Add Elektroluma for incoming supplier invoice automation. Complement rather than replace.'
  },
  
  parseur: {
    id: 'parseur',
    name: 'Parseur',
    slug: 'parseur',
    website: 'https://parseur.com',
    description: 'AI-powered data extraction from emails, PDFs, and documents. Template-based and AI parsing for invoices, orders, and receipts with 99% accuracy claims.',
    shortDescription: 'AI email/PDF parser - $99/mo starting',
    
    company: {
      founded: 2016,
      headquarters: 'Mauritius',
      employees: '10-20',
      funding: 'Bootstrapped',
      parentCompany: 'Independent'
    },
    
    segment: 'ai-parser',
    traffic: {
      monthlyVisits: 100000,
      description: 'Growing SaaS with strong developer community'
    },
    
    features: {
      aiPowered: true,
      ukCompliance: false,
      vatSupport: false,
      cisSupport: false,
      automation: true,
      accountingIntegration: ['Zapier', 'Make', 'API'],
      mobileApp: false,
      apiAccess: true,
      customTemplates: true,
      multiCurrency: false,
      batchProcessing: true,
      ocrAccuracy: 99
    },
    
    pricing: {
      model: 'subscription',
      currency: 'USD',
      tiers: [
        {
          name: 'Free',
          price: 0,
          billingPeriod: 'month',
          features: [
            '30 documents/month',
            'Template parsing',
            'Email support'
          ],
          limits: {
            pages: 30
          }
        },
        {
          name: 'Starter',
          price: 99,
          billingPeriod: 'month',
          features: [
            '500 documents/month',
            'AI parsing',
            'API access',
            'Zapier integration'
          ],
          limits: {
            pages: 500
          }
        },
        {
          name: 'Pro',
          price: 299,
          billingPeriod: 'month',
          features: [
            '2,000 documents/month',
            'Priority support',
            'Custom models',
            'Webhooks'
          ],
          limits: {
            pages: 2000
          }
        }
      ]
    },
    
    strengths: [
      'Flexible AI + template parsing',
      'Strong API and automation focus',
      'Good Zapier/Make integration',
      'Reasonable pricing for volume',
      'Active development and support'
    ],
    
    weaknesses: [
      'Not invoice-specific (general document parser)',
      'No UK compliance features',
      'No accounting software integration',
      'Requires technical knowledge for setup',
      'Accuracy decreases with many fields',
      'Best performance in English only'
    ],
    
    targetMarket: {
      description: 'Developers and technical users building custom automation workflows',
      businessSize: 'small',
      industry: ['Technology', 'E-commerce', 'Logistics'],
      geography: ['Global', 'Developer-focused']
    },
    
    reviews: {
      overall: 4.6,
      g2: 4.7,
      capterra: 4.5,
      userComments: [
        'Great for custom automation',
        'Requires technical knowledge',
        'Good value for volume',
        'Not specific enough for accounting'
      ]
    },
    
    keywords: [
      'email parser',
      'pdf data extraction',
      'parseur alternative',
      'document automation',
      'email to spreadsheet'
    ],
    searchVolume: 45000,
    alternativeKeywords: [
      'parseur alternative',
      'better than parseur',
      'invoice parser',
      'accounting document parser'
    ],
    
    elektrolumaDifferentiators: [
      'Invoice-specific vs Parseur\'s general parsing',
      'UK accounting features (VAT, CIS) vs generic',
      'Direct QuickBooks/Xero integration vs Zapier workarounds',
      'Non-technical UI vs Parseur\'s developer focus',
      '£29/mo unlimited vs Parseur $99/mo for 500 docs',
      'Restaurant/warehouse templates vs custom setup'
    ],
    
    migrationPath: 'Technical users can migrate Parseur templates to Elektroluma. API compatibility for existing workflows. Simplify setup with pre-built invoice models.'
  },
  
  squareInvoices: {
    id: 'square-invoices',
    name: 'Square Invoices',
    slug: 'square-invoices',
    website: 'https://squareup.com/invoices',
    description: 'Free invoicing software from Square payments ecosystem. Send unlimited invoices, accept card payments with 2.5% fee. Integrated with Square POS and card readers.',
    shortDescription: 'Free invoices + 2.5% payment fee',
    
    company: {
      founded: 2009,
      headquarters: 'San Francisco, USA',
      employees: '8,000+',
      funding: 'Public (NYSE: SQ)',
      valuation: '$40B+ market cap',
      parentCompany: 'Block, Inc. (formerly Square)'
    },
    
    segment: 'free-generator',
    traffic: {
      monthlyVisits: 5000000,
      description: 'Part of Square ecosystem with millions of merchants globally'
    },
    
    features: {
      aiPowered: false,
      ukCompliance: false,
      vatSupport: true,
      cisSupport: false,
      automation: true,
      accountingIntegration: ['Square POS', 'QuickBooks'],
      mobileApp: true,
      apiAccess: true,
      customTemplates: true,
      multiCurrency: true,
      batchProcessing: false
    },
    
    pricing: {
      model: 'freemium',
      currency: 'GBP',
      tiers: [
        {
          name: 'Free',
          price: 0,
          billingPeriod: 'month',
          features: [
            'Unlimited invoices',
            'Online payments (2.5% fee)',
            'Payment reminders',
            'Invoice tracking',
            'Mobile app'
          ]
        },
        {
          name: 'Plus',
          price: 20,
          billingPeriod: 'month',
          features: [
            'Everything in Free',
            'Recurring invoices',
            'Custom branding',
            'Payment plans',
            'Advanced reports'
          ]
        }
      ],
      usageFees: {
        description: '2.5% per online card payment, 1.75% for in-person payments with Square Reader'
      }
    },
    
    strengths: [
      'Completely free for sending invoices',
      'Accept card payments directly (2.5% fee)',
      'Strong brand recognition (Square)',
      'Integrates with Square POS ecosystem',
      'Mobile app for on-the-go invoicing'
    ],
    
    weaknesses: [
      'Payment processing fees add up (2.5% per transaction)',
      'US-focused (limited UK features)',
      'No CIS or advanced UK tax support',
      'No AI or invoice parsing',
      'Lock-in to Square payment ecosystem'
    ],
    
    targetMarket: {
      description: 'Small businesses and freelancers already using Square for payments',
      businessSize: 'small',
      industry: ['Retail', 'Food & Beverage', 'Services'],
      geography: ['US', 'Canada', 'UK', 'Australia']
    },
    
    reviews: {
      overall: 4.3,
      g2: 4.4,
      capterra: 4.6,
      trustpilot: 4.2,
      userComments: [
        'Great for Square POS users',
        'Payment processing fees add up',
        'Simple and easy to use',
        'Limited UK tax features'
      ]
    },
    
    keywords: [
      'square invoices',
      'square invoice app',
      'free invoice with card payment',
      'square billing',
      'square invoice UK'
    ],
    searchVolume: 320000,
    alternativeKeywords: [
      'square invoices alternative',
      'better than square',
      'free invoice no payment fees',
      'square vs stripe invoicing'
    ],
    
    elektrolumaDifferentiators: [
      'Process incoming invoices (Square only does outgoing)',
      'AI parsing vs manual entry',
      'UK compliance (CIS, Gas Safe) vs US focus',
      'QuickBooks/Xero integration vs Square lock-in',
      '£29/mo unlimited vs Square\'s 2.5% payment fees',
      'No payment processing fees for invoice data extraction'
    ],
    
    migrationPath: 'Keep Square for payment processing, add Elektroluma for supplier invoice automation. Process payments through Square, manage AP through Elektroluma.'
  },
  
  crunchAccounting: {
    id: 'crunch-accounting',
    name: 'Crunch Accounting',
    slug: 'crunch',
    website: 'https://www.crunch.co.uk',
    description: 'UK-focused online accounting software for freelancers and contractors. Combines software with accountant services. Strong invoicing and UK tax compliance.',
    shortDescription: 'UK accounting with invoicing - £27/mo',
    
    company: {
      founded: 2009,
      headquarters: 'Brighton, UK',
      employees: '100+',
      funding: 'Bootstrapped',
      parentCompany: 'Independent'
    },
    
    segment: 'accounting-software',
    traffic: {
      monthlyVisits: 180000,
      description: 'Strong UK presence, popular among contractors'
    },
    
    features: {
      aiPowered: false,
      ukCompliance: true,
      vatSupport: true,
      cisSupport: true,
      automation: true,
      accountingIntegration: ['HMRC', 'Making Tax Digital'],
      mobileApp: true,
      apiAccess: false,
      customTemplates: true,
      multiCurrency: false,
      batchProcessing: false
    },
    
    pricing: {
      model: 'subscription',
      currency: 'GBP',
      tiers: [
        {
          name: 'CrunchONE (Sole Trader)',
          price: 27,
          billingPeriod: 'month',
          features: [
            '1% of earnings + VAT (max £300/year)',
            'Invoicing',
            'Expense tracking',
            'Self Assessment',
            'HMRC filing'
          ]
        },
        {
          name: 'Limited Company',
          price: 90,
          billingPeriod: 'month',
          features: [
            'Accounting software',
            'Dedicated accountant',
            'VAT returns',
            'Corporation Tax',
            'Annual accounts'
          ]
        }
      ]
    },
    
    strengths: [
      'Excellent UK focus (HMRC, Making Tax Digital, CIS)',
      'Combines software + accountant services',
      'Strong for contractors and freelancers',
      'Good UK tax compliance',
      'CrunchONE affordable for sole traders'
    ],
    
    weaknesses: [
      'No AI or invoice parsing',
      'No international features (UK-only)',
      'Limited integrations',
      'More expensive than pure software options',
      'Accountant service adds cost'
    ],
    
    targetMarket: {
      description: 'UK freelancers, contractors, and small limited companies needing accounting + software bundle',
      businessSize: 'freelancer',
      industry: ['IT Contracting', 'Consulting', 'Construction'],
      geography: ['UK only']
    },
    
    reviews: {
      overall: 4.3,
      g2: 4.2,
      capterra: 4.4,
      trustpilot: 4.1,
      userComments: [
        'Great for UK contractors',
        'Having an accountant is helpful',
        'More expensive than software-only options',
        'Excellent HMRC integration'
      ]
    },
    
    keywords: [
      'crunch accounting',
      'uk accounting software',
      'contractor accounting',
      'making tax digital software',
      'crunch accountant'
    ],
    searchVolume: 85000,
    alternativeKeywords: [
      'crunch alternative',
      'cheaper than crunch',
      'crunch vs freeagent',
      'crunch vs xero'
    ],
    
    elektrolumaDifferentiators: [
      'AI invoice parsing (Crunch lacks this)',
      'Process supplier invoices automatically (Crunch is manual)',
      'Restaurant/warehouse focus vs generic',
      '£29/mo vs Crunch\'s £90/mo for limited companies',
      'No accountant required (optional)',
      'QuickBooks/Xero integration (work with existing Crunch data)'
    ],
    
    migrationPath: 'Keep Crunch for tax filing and accountant services. Add Elektroluma for supplier invoice automation. Export data to Crunch for year-end accounts.'
  },
  
  docsumo: {
    id: 'docsumo',
    name: 'Docsumo',
    slug: 'docsumo',
    website: 'https://www.docsumo.com',
    description: 'Docsumo is an AI-powered document processing platform that automates invoice data extraction with 99% accuracy. Built for finance teams, the platform handles unstructured documents and transforms them into structured data 10x faster than manual processing.',
    shortDescription: 'AI document extraction with 99% accuracy for finance teams',
    
    company: {
      founded: 2019,
      headquarters: 'San Jose, California, USA',
      employees: '51-200',
      funding: '$7.3M Series A',
      valuation: '~$30M estimated'
    },
    
    segment: 'ai-parser',
    traffic: {
      monthlyUsers: 10000,
      description: '10,000+ data-driven businesses use Docsumo for document processing'
    },
    
    features: {
      aiPowered: true,
      ukCompliance: false,
      vatSupport: false,
      cisSupport: false,
      automation: true,
      accountingIntegration: ['QuickBooks', 'Xero', 'NetSuite', 'Sage'],
      mobileApp: false,
      apiAccess: true,
      customTemplates: true,
      multiCurrency: true,
      batchProcessing: true,
      ocrAccuracy: 99
    },
    
    pricing: {
      model: 'subscription',
      currency: 'USD',
      tiers: [
        {
          name: 'Free Trial',
          price: 0,
          billingPeriod: 'one-time',
          features: [
            '14-day trial',
            '100 pages',
            '1 user',
            'Basic support'
          ],
          limits: {
            pages: 100,
            users: 1
          }
        },
        {
          name: 'Growth',
          price: 499,
          billingPeriod: 'month',
          features: [
            '3,000 pages/month',
            'Up to 3 users',
            'API access',
            'Webhooks',
            'AI prompting',
            'Pre-built integrations',
            '1-year data retention'
          ],
          limits: {
            pages: 3000,
            users: 3
          }
        },
        {
          name: 'Pro',
          price: 999,
          billingPeriod: 'month',
          features: [
            'Up to 10 users',
            'Custom validations',
            'Classification & splitting',
            'Email parsing',
            'Dedicated account manager',
            'Private Slack channel'
          ],
          limits: {
            users: 10
          }
        },
        {
          name: 'Enterprise',
          price: 2500,
          billingPeriod: 'month',
          features: [
            'Unlimited users',
            'Custom fine-tuned models',
            'AI workflows',
            'Document analytics',
            'Priority processing',
            'Custom data retention'
          ]
        }
      ]
    },
    
    strengths: [
      'Exceptional 99% accuracy with continuous learning',
      'Strong API-first approach for developers',
      'Excellent table extraction capabilities',
      '95%+ straight-through processing rate',
      'SOC 2, GDPR, HIPAA compliant',
      'Process documents 10x faster than manual entry'
    ],
    
    weaknesses: [
      'Expensive for SMBs (£499/month minimum)',
      'No UK-specific compliance features (VAT, CIS)',
      'No mobile app for on-the-go processing',
      'Complex pricing structure with per-page costs',
      'Steep learning curve for non-technical users',
      '14-day trial too short to test thoroughly'
    ],
    
    targetMarket: {
      description: 'Mid-market to enterprise finance teams in lending, insurance, CRE, and logistics',
      businessSize: 'medium',
      industry: ['Finance', 'Insurance', 'Lending', 'Real Estate', 'Logistics'],
      geography: ['North America', 'Global']
    },
    
    reviews: {
      overall: 4.7,
      g2: 4.7,
      capterra: 4.6,
      userComments: [
        'What took days now only takes seconds - 7 minutes down to 30 seconds',
        '95%+ STP rate means we don\'t review 95 out of 100 documents',
        'Very good for debt settlement letters with high variability',
        'Best document AI solution for CRE lenders'
      ]
    },
    
    keywords: [
      'invoice OCR software',
      'document AI',
      'invoice processing software',
      'invoice data extraction',
      'AI invoice automation'
    ],
    searchVolume: 8900,
    alternativeKeywords: [
      'Docsumo alternative',
      'invoice extraction API',
      'document processing automation'
    ],
    
    elektrolumaDifferentiators: [
      'Elektroluma is 94% cheaper (£29/mo vs $499/mo minimum)',
      'Built specifically for UK compliance (VAT, CIS, Gas Safe)',
      'Mobile-first for tradespeople on job sites',
      'No per-page costs - truly unlimited processing',
      'Simple pricing with no hidden setup fees',
      'Trade-focused vs. enterprise-focused'
    ],
    
    migrationPath: 'Docsumo users facing high costs can save £400+/month with Elektroluma while maintaining 99% accuracy. Export existing invoices and migrate UK clients to Elektroluma\'s trade-focused platform.'
  },
  
  veryfi: {
    id: 'veryfi',
    name: 'Veryfi',
    slug: 'veryfi',
    website: 'https://www.veryfi.com',
    description: 'Veryfi offers multimodal OCR APIs for invoices, receipts, and financial documents with industry-leading accuracy and fraud prevention. Their platform transforms documents into structured data with enterprise-grade security and 99.995% uptime.',
    shortDescription: 'Multi-modal OCR APIs with fraud prevention and 99.995% uptime',
    
    company: {
      founded: 2014,
      headquarters: 'San Francisco, California, USA',
      employees: '11-50',
      funding: 'Bootstrapped',
      valuation: '~$20M estimated'
    },
    
    segment: 'api-service',
    traffic: {
      monthlyUsers: 5000,
      description: '5,000+ developers and businesses using Veryfi APIs'
    },
    
    features: {
      aiPowered: true,
      ukCompliance: false,
      vatSupport: false,
      cisSupport: false,
      automation: true,
      accountingIntegration: ['QuickBooks', 'Xero', 'SAP'],
      mobileApp: true,
      apiAccess: true,
      customTemplates: true,
      multiCurrency: true,
      batchProcessing: true,
      ocrAccuracy: 98
    },
    
    pricing: {
      model: 'usage-based',
      currency: 'USD',
      tiers: [
        {
          name: 'Free',
          price: 0,
          billingPeriod: 'month',
          features: [
            'Up to 100 documents/month',
            'All document types',
            'SDKs for development',
            'Limited storage',
            'Email support'
          ],
          limits: {
            invoices: 100
          }
        },
        {
          name: 'Starter',
          price: 500,
          billingPeriod: 'month',
          features: [
            '$0.16 per invoice',
            '$0.08 per receipt',
            'All document types',
            'Limited storage',
            'Email support'
          ]
        },
        {
          name: 'Growth',
          price: 1000,
          billingPeriod: 'month',
          features: [
            'Volume discounts',
            'Fraud detection',
            'Document capture',
            'Priority support',
            'Custom SLAs'
          ]
        }
      ],
      usageFees: {
        perInvoice: 0.16,
        description: '$0.16 per invoice, $0.08 per receipt with volume discounts'
      }
    },
    
    strengths: [
      'Exceptional 99.995% uptime guarantee',
      'Support for 38 languages and 91+ currencies',
      'SOC 2 Type 2, HIPAA, GDPR, CCPA compliant',
      'Deterministic AI (no hallucinations)',
      'In-house models trained on H100/A100 GPUs',
      'Generous 100 docs/month free tier',
      'Fraud detection included'
    ],
    
    weaknesses: [
      'Expensive per-document pricing ($0.16/invoice)',
      'No UK-specific compliance features',
      '$500/month minimum for paid plans',
      '15-page limit per document (custom needed for more)',
      'Developer-focused, not user-friendly for non-technical users',
      'Limited storage on lower tiers'
    ],
    
    targetMarket: {
      description: 'Developers and tech companies building invoice processing into their applications',
      businessSize: 'small',
      industry: ['FinTech', 'SaaS', 'Technology', 'Financial Services'],
      geography: ['Global', 'North America']
    },
    
    reviews: {
      overall: 4.5,
      g2: 4.6,
      capterra: 4.4,
      userComments: [
        'Best OCR API for developers - easy to integrate',
        'Excellent fraud detection catches duplicate invoices',
        '99.995% uptime is real - never had downtime',
        'Pricing adds up quickly at scale'
      ]
    },
    
    keywords: [
      'invoice OCR API',
      'receipt scanning API',
      'document extraction API',
      'OCR API pricing',
      'fraud detection OCR'
    ],
    searchVolume: 6200,
    alternativeKeywords: [
      'Veryfi alternative',
      'invoice API',
      'receipt OCR API'
    ],
    
    elektrolumaDifferentiators: [
      'Elektroluma offers unlimited invoices at £29/mo vs $500+ minimum',
      'No per-document fees - process 1,000s without extra costs',
      'Built for UK tradespeople, not developers',
      'VAT and CIS compliance out of the box',
      'No technical skills required',
      'Mobile app designed for job sites'
    ],
    
    migrationPath: 'Veryfi API users can save thousands monthly by switching to Elektroluma\'s unlimited processing. No coding required - just upload and process.'
  },
  
  invoiceNinja: {
    id: 'invoice-ninja',
    name: 'Invoice Ninja',
    slug: 'invoice-ninja',
    website: 'https://invoiceninja.com',
    description: 'Invoice Ninja is a free, open-source invoicing platform for freelancers and small businesses. It offers unlimited invoicing with a forever-free plan supporting up to 20 clients, customizable templates, and online payment processing.',
    shortDescription: 'Free open-source invoicing with unlimited invoices for up to 20 clients',
    
    company: {
      founded: 2014,
      headquarters: 'Washington, USA',
      employees: '11-50',
      funding: 'Bootstrapped',
      parentCompany: 'Invoice Ninja LLC'
    },
    
    segment: 'free-generator',
    traffic: {
      monthlyUsers: 500000,
      description: '500,000+ freelancers and small businesses worldwide'
    },
    
    features: {
      aiPowered: false,
      ukCompliance: false,
      vatSupport: true,
      cisSupport: false,
      automation: true,
      accountingIntegration: ['Zapier', 'Make', 'n8n'],
      mobileApp: true,
      apiAccess: true,
      customTemplates: true,
      multiCurrency: true,
      batchProcessing: false,
      ocrAccuracy: 0
    },
    
    pricing: {
      model: 'freemium',
      currency: 'USD',
      tiers: [
        {
          name: 'Forever Free',
          price: 0,
          billingPeriod: 'month',
          features: [
            'Up to 20 clients',
            'Unlimited invoices',
            '4 invoice templates',
            'Auto-billing',
            'Recurring invoices',
            'Client portal',
            'Online payments'
          ],
          limits: {
            invoices: 99999,
            users: 1
          }
        },
        {
          name: 'Ninja Pro',
          price: 10,
          billingPeriod: 'month',
          features: [
            'Unlimited clients',
            '11 invoice templates',
            'Remove branding',
            'Custom domain',
            'API access',
            'Email reminders'
          ]
        },
        {
          name: 'Enterprise',
          price: 14,
          billingPeriod: 'month',
          features: [
            'All Pro features',
            'White label',
            'Priority support',
            'Custom integrations'
          ]
        }
      ]
    },
    
    strengths: [
      'Truly free forever - no forced upgrades',
      'Unlimited invoicing even on free plan',
      'Open-source with self-hosting option',
      'Strong automation features (recurring invoices, reminders)',
      'Mobile apps for iOS and Android',
      'Active community support',
      'Very affordable Pro plan ($10/month)'
    ],
    
    weaknesses: [
      'No AI-powered invoice parsing/extraction',
      'Limited templates on free plan (only 4)',
      'No UK-specific compliance (CIS, Gas Safe)',
      'Dated user interface',
      '20-client limit on free plan restrictive for growing businesses',
      'Limited accounting integrations',
      'No receipt scanning or OCR capabilities'
    ],
    
    targetMarket: {
      description: 'Freelancers, contractors, and micro-businesses needing basic invoicing without costs',
      businessSize: 'freelancer',
      industry: ['Freelancing', 'Consulting', 'Creative Services', 'IT Services'],
      geography: ['Global', 'North America', 'Europe']
    },
    
    reviews: {
      overall: 4.4,
      g2: 4.4,
      capterra: 4.3,
      trustpilot: 4.5,
      userComments: [
        'Perfect for freelancers just starting out',
        'Love that it\'s truly free with no hidden costs',
        'Open-source means I can customize everything',
        'Interface feels a bit outdated compared to competitors'
      ]
    },
    
    keywords: [
      'free invoice software',
      'Invoice Ninja',
      'open source invoicing',
      'free invoicing for freelancers',
      'unlimited invoices free'
    ],
    searchVolume: 12400,
    alternativeKeywords: [
      'Invoice Ninja alternative',
      'free invoice generator',
      'Invoice Ninja vs FreshBooks'
    ],
    
    elektrolumaDifferentiators: [
      'Elektroluma adds AI-powered invoice parsing - Invoice Ninja is manual only',
      'UK compliance built-in (VAT, CIS, Gas Safe)',
      'Receipt scanning and OCR for tradespeople',
      'Job-site focused mobile app',
      'Automated invoice capture from photos',
      'Trade-specific templates (electrical, plumbing, gas)'
    ],
    
    migrationPath: 'Invoice Ninja users can upgrade to Elektroluma for £29/mo to add AI automation, UK compliance, and receipt scanning while keeping unlimited invoicing.'
  },
  
  tipalti: {
    id: 'tipalti',
    name: 'Tipalti',
    slug: 'tipalti',
    website: 'https://tipalti.com',
    description: 'Tipalti is a global payables automation platform for mid-market and enterprise companies. It handles invoice processing, global payments, supplier onboarding, and tax compliance with AI-driven automation and supports payments to 190+ countries.',
    shortDescription: 'Enterprise AP automation with global payment capabilities to 190+ countries',
    
    company: {
      founded: 2010,
      headquarters: 'Foster City, California, USA',
      employees: '501-1000',
      funding: '$565M (Series F)',
      valuation: '$8.3B (2021)'
    },
    
    segment: 'ai-parser',
    traffic: {
      monthlyUsers: 50000,
      description: 'Powers AP for 3,000+ mid-market and enterprise customers globally'
    },
    
    features: {
      aiPowered: true,
      ukCompliance: true,
      vatSupport: true,
      cisSupport: false,
      automation: true,
      accountingIntegration: ['QuickBooks', 'Xero', 'NetSuite', 'SAP', 'Oracle'],
      mobileApp: true,
      apiAccess: true,
      customTemplates: true,
      multiCurrency: true,
      batchProcessing: true,
      ocrAccuracy: 97
    },
    
    pricing: {
      model: 'subscription',
      currency: 'USD',
      tiers: [
        {
          name: 'Select',
          price: 99,
          billingPeriod: 'month',
          features: [
            'AI-driven invoice processing',
            'VAT ID validation',
            'Basic supplier onboarding',
            'Email support'
          ]
        },
        {
          name: 'Advanced',
          price: 199,
          billingPeriod: 'month',
          features: [
            'All Select features',
            'Purchase order matching',
            'Multi-entity support',
            'Priority support'
          ]
        },
        {
          name: 'Elevate',
          price: 500,
          billingPeriod: 'month',
          features: [
            'All Advanced features',
            'Custom workflows',
            'Dedicated account manager',
            'Global payment infrastructure',
            'Tax compliance automation'
          ]
        }
      ]
    },
    
    strengths: [
      'Enterprise-grade with 8.3B valuation',
      'Supports payments to 190+ countries',
      'Excellent tax compliance automation',
      'Strong fraud detection and controls',
      'Deep ERP integrations (NetSuite, SAP, Oracle)',
      'Handles global supplier onboarding',
      '99.9% uptime guarantee'
    ],
    
    weaknesses: [
      'Expensive for SMBs (£99/month minimum)',
      'Complex implementation (typically 1-3 months)',
      'Steep learning curve due to feature complexity',
      'Overkill for businesses with <100 invoices/month',
      'Implementation fees start at £1,500+',
      'Not designed for tradespeople or field workers',
      'No CIS support for UK construction'
    ],
    
    targetMarket: {
      description: 'Mid-market to enterprise companies with high invoice volumes and global suppliers',
      businessSize: 'enterprise',
      industry: ['Technology', 'E-commerce', 'Manufacturing', 'Media & Entertainment'],
      geography: ['Global', 'North America', 'Europe', 'UK']
    },
    
    reviews: {
      overall: 4.3,
      g2: 4.2,
      capterra: 4.3,
      userComments: [
        'Great for global payments but expensive',
        'Implementation took 3 months - longer than expected',
        'Powerful but complex - needed training for team',
        'Excellent for managing 1000s of suppliers'
      ]
    },
    
    keywords: [
      'AP automation software',
      'global payables automation',
      'Tipalti pricing',
      'accounts payable software UK',
      'invoice automation enterprise'
    ],
    searchVolume: 9800,
    alternativeKeywords: [
      'Tipalti alternative',
      'Tipalti vs BILL',
      'AP automation UK'
    ],
    
    elektrolumaDifferentiators: [
      'Elektroluma is 70% cheaper (£29/mo vs £99/mo minimum)',
      'No implementation fees or onboarding costs',
      'Designed for UK tradespeople with CIS support',
      'Simple setup in minutes, not months',
      'Perfect for SMBs with 10-500 invoices/month',
      'Mobile-first for job site use'
    ],
    
    migrationPath: 'Tipalti is overkill for UK SMBs. Switch to Elektroluma to save £840/year while getting UK-specific features like CIS deductions and trade compliance.'
  },
  
  autoEntry: {
    id: 'autoentry',
    name: 'AutoEntry',
    slug: 'autoentry-sage',
    website: 'https://www.autoentry.com',
    description: 'AutoEntry is Sage\'s cloud-based OCR tool that automates data entry by capturing invoices, receipts, and statements. It integrates seamlessly with Sage, QuickBooks, and Xero to eliminate manual bookkeeping for accountants and SMEs.',
    shortDescription: 'Sage-owned OCR automation for accountants and bookkeepers',
    
    company: {
      founded: 2010,
      headquarters: 'Cork, Ireland',
      employees: '51-200',
      parentCompany: 'Sage Group plc'
    },
    
    segment: 'ai-parser',
    traffic: {
      monthlyUsers: 25000,
      description: '25,000+ accountants and SMEs using AutoEntry through Sage'
    },
    
    features: {
      aiPowered: true,
      ukCompliance: true,
      vatSupport: true,
      cisSupport: false,
      automation: true,
      accountingIntegration: ['Sage', 'QuickBooks', 'Xero'],
      mobileApp: true,
      apiAccess: false,
      customTemplates: false,
      multiCurrency: true,
      batchProcessing: true,
      ocrAccuracy: 96
    },
    
    pricing: {
      model: 'usage-based',
      currency: 'GBP',
      tiers: [
        {
          name: 'Starter',
          price: 9,
          billingPeriod: 'month',
          features: [
            '50 documents/month',
            'Unlimited users',
            'Mobile app',
            'Email support',
            'Bank statement capture'
          ],
          limits: {
            pages: 50
          }
        },
        {
          name: 'Standard',
          price: 25,
          billingPeriod: 'month',
          features: [
            '150 documents/month',
            'Line item extraction',
            'Purchase order matching',
            'Priority support'
          ],
          limits: {
            pages: 150
          }
        },
        {
          name: 'Premium',
          price: 50,
          billingPeriod: 'month',
          features: [
            '400 documents/month',
            'Advanced features',
            'Dedicated support'
          ],
          limits: {
            pages: 400
          }
        }
      ],
      usageFees: {
        description: 'Unused credits roll over for 90 days'
      }
    },
    
    strengths: [
      'Owned by Sage - seamless integration',
      'Strong UK presence and VAT support',
      'Affordable entry point (£9/month)',
      'Unused credits roll over for 90 days',
      'Unlimited users on all plans',
      'Good mobile app for receipt capture',
      'Designed for UK accountants'
    ],
    
    weaknesses: [
      'Only 96% accuracy (lower than competitors)',
      'Limited to 50 docs/month on cheapest plan',
      'No API access for custom integrations',
      'No CIS support for construction',
      'Owned by Sage - lock-in concerns',
      'Limited to 3 accounting platforms',
      'Not designed for tradespeople'
    ],
    
    targetMarket: {
      description: 'UK accountants, bookkeepers, and SMEs already using Sage ecosystem',
      businessSize: 'small',
      industry: ['Accounting', 'Bookkeeping', 'Professional Services'],
      geography: ['UK', 'Ireland', 'Europe']
    },
    
    reviews: {
      overall: 4.2,
      g2: 4.3,
      capterra: 4.1,
      userComments: [
        'Works great with Sage - seamless integration',
        'Credit rollover is helpful for variable month',
        'Accuracy could be better - still need to review',
        'Good value for accountants managing multiple clients'
      ]
    },
    
    keywords: [
      'AutoEntry Sage',
      'Sage OCR',
      'AutoEntry pricing UK',
      'receipt scanning UK',
      'Sage data entry automation'
    ],
    searchVolume: 5400,
    alternativeKeywords: [
      'AutoEntry alternative',
      'Sage AutoEntry review',
      'receipt OCR UK'
    ],
    
    elektrolumaDifferentiators: [
      'Elektroluma offers 99% accuracy vs AutoEntry\'s 96%',
      'Unlimited invoices at £29/mo vs pay-per-document',
      'CIS support for UK construction trades',
      'Trade-specific features (Gas Safe, NICEIC)',
      'Not locked into Sage ecosystem',
      'Mobile app designed for job sites, not offices'
    ],
    
    migrationPath: 'AutoEntry users processing 150+ docs/month can save money and get better accuracy with Elektroluma\'s unlimited plan. Export data and switch platforms easily.'
  },
  
  xero: {
    id: 'xero',
    name: 'Xero',
    slug: 'xero',
    website: 'https://www.xero.com/uk',
    description: 'Xero is a leading cloud accounting platform for small businesses in the UK. It offers comprehensive accounting with unlimited invoicing, bank reconciliation, VAT returns, and Making Tax Digital compliance. Dominates UK market with 89% share alongside QuickBooks.',
    shortDescription: 'UK market-leading cloud accounting with unlimited invoicing',
    
    company: {
      founded: 2006,
      headquarters: 'Wellington, New Zealand (UK office in London)',
      employees: '4,000+',
      funding: 'Public (ASX: XRO)',
      valuation: '$18B market cap'
    },
    
    segment: 'accounting-software',
    traffic: {
      monthlyUsers: 3800000,
      description: '3.8M+ subscribers globally, 1M+ in UK'
    },
    
    features: {
      aiPowered: false,
      ukCompliance: true,
      vatSupport: true,
      cisSupport: true,
      automation: true,
      accountingIntegration: ['N/A - is the accounting software'],
      mobileApp: true,
      apiAccess: true,
      customTemplates: true,
      multiCurrency: true,
      batchProcessing: true,
      ocrAccuracy: 0
    },
    
    pricing: {
      model: 'subscription',
      currency: 'GBP',
      tiers: [
        {
          name: 'Ignite',
          price: 16,
          billingPeriod: 'month',
          features: [
            'Send 10 invoices/quotes',
            'Enter 5 bills',
            'Bank reconciliation',
            'MTD ready'
          ],
          limits: {
            invoices: 10
          }
        },
        {
          name: 'Grow',
          price: 33,
          billingPeriod: 'month',
          features: [
            'Unlimited invoices',
            'Multi-currency',
            'Projects',
            'Expenses',
            'Hubdoc included (receipt capture)'
          ]
        },
        {
          name: 'Comprehensive',
          price: 47,
          billingPeriod: 'month',
          features: [
            'All Grow features',
            'Advanced reporting',
            'Multi-currency',
            'Projects & job costing'
          ]
        },
        {
          name: 'Ultimate',
          price: 59,
          billingPeriod: 'month',
          features: [
            'All Comprehensive features',
            'Payroll included',
            '24/7 support',
            'Forecasting tools'
          ]
        }
      ]
    },
    
    strengths: [
      'UK market leader with 89% market share',
      'Excellent Making Tax Digital integration',
      'Unlimited invoices on Grow plan and above',
      'Strong ecosystem with 1,000+ integrations',
      'Hubdoc included for receipt capture',
      'CIS support for construction',
      'Excellent mobile app',
      '24/7 support on higher tiers'
    ],
    
    weaknesses: [
      'Expensive (£33-59/month for most businesses)',
      'Ignite plan only allows 10 invoices (very limiting)',
      'Full accounting platform - overkill if you only need invoicing',
      'No AI-powered invoice parsing',
      'Hubdoc accuracy only ~95%',
      'Annual price increases common',
      'Complex for tradespeople who just need invoicing'
    ],
    
    targetMarket: {
      description: 'UK small businesses needing full accounting, not just invoicing',
      businessSize: 'small',
      industry: ['All industries', 'Construction', 'Professional Services', 'Retail'],
      geography: ['UK', 'Australia', 'New Zealand', 'Global']
    },
    
    reviews: {
      overall: 4.4,
      g2: 4.3,
      capterra: 4.4,
      trustpilot: 4.1,
      userComments: [
        'Best accounting software for UK businesses',
        'MTD integration is seamless',
        'Expensive but worth it for full accounting',
        'Steep learning curve for beginners'
      ]
    },
    
    keywords: [
      'Xero UK',
      'Xero pricing',
      'Xero accounting',
      'Making Tax Digital software',
      'cloud accounting UK'
    ],
    searchVolume: 45000,
    alternativeKeywords: [
      'Xero alternative UK',
      'Xero vs QuickBooks UK',
      'best accounting software UK'
    ],
    
    elektrolumaDifferentiators: [
      'Elektroluma is just invoicing - 56% cheaper than Xero Grow (£29 vs £33)',
      'AI-powered invoice extraction - Xero requires manual entry',
      'Trade-focused vs general accounting',
      'Mobile-first for job sites',
      'No accounting knowledge required',
      'Integrates WITH Xero - use both together'
    ],
    
    migrationPath: 'Don\'t migrate FROM Xero - use Elektroluma alongside it! Let Elektroluma handle invoice capture/parsing, then sync to Xero for accounting. Best of both worlds.'
  },
  
  wave: {
    id: 'wave',
    name: 'Wave Accounting',
    slug: 'wave',
    website: 'https://www.waveapps.com',
    description: 'Wave is a completely free accounting and invoicing platform for small businesses and freelancers. It offers unlimited invoicing, expense tracking, and financial reporting with no monthly fees. Revenue comes from optional paid services like payment processing and payroll.',
    shortDescription: '100% free accounting and unlimited invoicing for small businesses',
    
    company: {
      founded: 2010,
      headquarters: 'Toronto, Canada',
      employees: '201-500',
      parentCompany: 'H&R Block (acquired 2019, spun off 2021)'
    },
    
    segment: 'accounting-software',
    traffic: {
      monthlyUsers: 2000000,
      description: '2M+ small businesses use Wave globally'
    },
    
    features: {
      aiPowered: false,
      ukCompliance: false,
      vatSupport: false,
      cisSupport: false,
      automation: true,
      accountingIntegration: ['N/A - is the accounting software'],
      mobileApp: true,
      apiAccess: false,
      customTemplates: true,
      multiCurrency: true,
      batchProcessing: false,
      ocrAccuracy: 0
    },
    
    pricing: {
      model: 'free',
      currency: 'USD',
      tiers: [
        {
          name: 'Free Forever',
          price: 0,
          billingPeriod: 'month',
          features: [
            'Unlimited invoicing',
            'Unlimited expense tracking',
            'Receipt scanning',
            'Financial reporting',
            'Bank connections',
            'Double-entry accounting'
          ]
        },
        {
          name: 'Pro',
          price: 19,
          billingPeriod: 'month',
          features: [
            'All Free features',
            'Automated workflows',
            'Recurring invoices automation',
            'Email support'
          ]
        }
      ],
      usageFees: {
        description: '2.9% + $0.60 per card payment, 1% for bank payments ($1.50 min)'
      }
    },
    
    strengths: [
      'Completely free forever - no forced upgrades',
      'Unlimited invoicing and expenses',
      'Simple, clean interface',
      'Great for North American freelancers',
      'Good mobile app',
      'Receipt scanning included',
      'No monthly fees ever'
    ],
    
    weaknesses: [
      'No UK compliance (no VAT, no CIS, no MTD)',
      'US/Canada focused - poor for UK businesses',
      'No AI-powered invoice extraction',
      '2.9% payment processing fees (expensive)',
      'Very limited automation on free plan',
      'No API access',
      'Customer support only for paid customers',
      'Not suitable for UK tax requirements'
    ],
    
    targetMarket: {
      description: 'North American freelancers and micro-businesses with simple accounting needs',
      businessSize: 'freelancer',
      industry: ['Freelancing', 'Consulting', 'Creative Services'],
      geography: ['North America', 'Canada', 'USA']
    },
    
    reviews: {
      overall: 4.4,
      g2: 4.4,
      capterra: 4.5,
      trustpilot: 4.2,
      userComments: [
        'Perfect for freelancers just starting out',
        'Love that it\'s truly free',
        'Payment processing fees are high',
        'Not good for UK businesses - missing VAT features'
      ]
    },
    
    keywords: [
      'Wave accounting',
      'free accounting software',
      'Wave invoice',
      'free invoicing software',
      'Wave app'
    ],
    searchVolume: 38000,
    alternativeKeywords: [
      'Wave alternative',
      'free accounting software UK',
      'Wave vs QuickBooks'
    ],
    
    elektrolumaDifferentiators: [
      'Elektroluma built for UK market with VAT and CIS compliance',
      'AI-powered invoice extraction - Wave is manual only',
      'Trade-specific features (Gas Safe, NICEIC, CIS)',
      'Mobile app designed for UK tradespeople',
      'Lower payment processing fees',
      'UK support team'
    ],
    
    migrationPath: 'Wave doesn\'t work for UK businesses due to missing VAT/MTD features. Migrate to Elektroluma for £29/mo to get UK compliance plus AI automation.'
  },
  
  conta: {
    id: 'conta',
    name: 'Conta',
    slug: 'conta',
    website: 'https://conta.com',
    description: 'Conta is a free invoice generator and accounting software for small businesses, freelancers, and contractors. It offers unlimited invoices with no hidden fees, professional templates, and mobile apps for iOS and Android to invoice on the go.',
    shortDescription: 'Free unlimited invoicing with mobile app for freelancers',
    
    company: {
      founded: 2019,
      headquarters: 'Remote-first (European team)',
      employees: '11-50',
      funding: 'Bootstrapped'
    },
    
    segment: 'free-generator',
    traffic: {
      monthlyUsers: 200000,
      description: '200,000+ freelancers and small businesses across 10 countries'
    },
    
    features: {
      aiPowered: false,
      ukCompliance: false,
      vatSupport: true,
      cisSupport: false,
      automation: true,
      accountingIntegration: [],
      mobileApp: true,
      apiAccess: false,
      customTemplates: true,
      multiCurrency: true,
      batchProcessing: false,
      ocrAccuracy: 0
    },
    
    pricing: {
      model: 'free',
      currency: 'USD',
      tiers: [
        {
          name: 'Free Forever',
          price: 0,
          billingPeriod: 'month',
          features: [
            'Unlimited invoices',
            'Unlimited clients',
            'Unlimited products/services',
            'Upload your logo',
            'Send directly to clients',
            'Mobile app (iOS & Android)',
            'Professional templates'
          ]
        }
      ]
    },
    
    strengths: [
      'Completely free with no limits',
      'Clean, modern interface',
      'Great mobile apps for iOS and Android',
      'Fast invoice creation in seconds',
      'No sign-up required for basic use',
      'Multi-country support (10 countries)',
      'Professional templates included'
    ],
    
    weaknesses: [
      'No AI-powered features',
      'No invoice parsing or OCR',
      'Limited accounting integrations',
      'No UK-specific compliance (CIS)',
      'Manual data entry for every invoice',
      'No automation beyond basic recurring invoices',
      'Limited customer support',
      'No API access'
    ],
    
    targetMarket: {
      description: 'Freelancers and micro-businesses needing simple invoicing without costs',
      businessSize: 'freelancer',
      industry: ['Freelancing', 'Consulting', 'Creative Services', 'IT Services'],
      geography: ['Europe', 'USA', 'Global']
    },
    
    reviews: {
      overall: 4.5,
      g2: 4.6,
      trustpilot: 4.5,
      userComments: [
        'So easy to use - creates invoices in seconds',
        'Love the mobile app for invoicing clients on the go',
        'Perfect for freelancers who need simple invoicing',
        'Wish it had more automation features'
      ]
    },
    
    keywords: [
      'Conta invoice',
      'free invoice generator',
      'Conta app',
      'free invoicing software',
      'invoice generator online'
    ],
    searchVolume: 8900,
    alternativeKeywords: [
      'Conta alternative',
      'free invoice maker',
      'Conta review'
    ],
    
    elektrolumaDifferentiators: [
      'Elektroluma adds AI-powered invoice extraction - Conta is manual only',
      'Receipt scanning and OCR for expense tracking',
      'UK compliance built-in (VAT, CIS, Gas Safe)',
      'Trade-specific templates and features',
      'Invoice capture from photos',
      'Integrates with Xero/QuickBooks'
    ],
    
    migrationPath: 'Conta users can upgrade to Elektroluma for £29/mo to add AI automation, UK compliance, and receipt scanning while keeping unlimited invoicing.'
  },
  
  freeagent: {
    id: 'freeagent',
    name: 'FreeAgent',
    slug: 'freeagent',
    website: 'https://www.freeagent.com',
    description: 'FreeAgent is UK-focused accounting software designed for freelancers, micro-businesses, and contractors. It offers invoicing, expenses, projects, VAT returns, and Making Tax Digital compliance with excellent UK tax features including CIS for construction.',
    shortDescription: 'UK-focused accounting for freelancers with excellent tax features',
    
    company: {
      founded: 2007,
      headquarters: 'Edinburgh, Scotland',
      employees: '101-250',
      parentCompany: 'RBC (Royal Bank of Canada acquired 2018)'
    },
    
    segment: 'accounting-software',
    traffic: {
      monthlyUsers: 100000,
      description: '100,000+ UK freelancers and contractors'
    },
    
    features: {
      aiPowered: true,
      ukCompliance: true,
      vatSupport: true,
      cisSupport: true,
      automation: true,
      accountingIntegration: ['N/A - is the accounting software'],
      mobileApp: true,
      apiAccess: true,
      customTemplates: true,
      multiCurrency: true,
      batchProcessing: false,
      ocrAccuracy: 0
    },
    
    pricing: {
      model: 'subscription',
      currency: 'GBP',
      tiers: [
        {
          name: 'Monthly',
          price: 33,
          billingPeriod: 'month',
          features: [
            '50% off first 6 months (£16.50)',
            'Unlimited invoices',
            'Expense tracking',
            'Project management',
            'MTD VAT filing',
            'Self Assessment',
            'CIS support'
          ]
        },
        {
          name: 'Annual',
          price: 330,
          billingPeriod: 'year',
          features: [
            '50% off first year (£165)',
            'All features included',
            'Save £66/year vs monthly',
            'Priority support'
          ]
        }
      ]
    },
    
    strengths: [
      'Excellent UK tax features (VAT, CIS, Self Assessment)',
      'Direct HMRC filing for VAT and Self Assessment',
      'Great for UK contractors and freelancers',
      'CIS support for construction',
      'Time tracking and project management',
      'Smart Capture AI for receipt scanning',
      'Strong UK customer support',
      '50% discount for first 6 months'
    ],
    
    weaknesses: [
      'Expensive at £33/month after discount period',
      'Full accounting platform - overkill for just invoicing',
      'Smart Capture AI is £6/month extra',
      'Not designed for larger teams',
      'Limited integrations vs Xero',
      'Primarily UK-only features',
      'Annual price increases'
    ],
    
    targetMarket: {
      description: 'UK freelancers, contractors, and micro-businesses with 1-5 employees',
      businessSize: 'freelancer',
      industry: ['Freelancing', 'Construction', 'IT Contracting', 'Consulting'],
      geography: ['UK']
    },
    
    reviews: {
      overall: 4.5,
      g2: 4.4,
      capterra: 4.5,
      trustpilot: 4.6,
      userComments: [
        'Perfect for UK contractors - CIS support is excellent',
        'Self Assessment filing is seamless',
        'A bit expensive but worth it for UK features',
        'Great customer support team'
      ]
    },
    
    keywords: [
      'FreeAgent UK',
      'FreeAgent pricing',
      'accounting software UK freelancers',
      'CIS accounting software',
      'contractor accounting UK'
    ],
    searchVolume: 18000,
    alternativeKeywords: [
      'FreeAgent alternative',
      'FreeAgent vs Xero',
      'best accounting for UK contractors'
    ],
    
    elektrolumaDifferentiators: [
      'Elektroluma is just invoicing - 12% cheaper (£29 vs £33)',
      'AI-powered invoice extraction - FreeAgent requires manual entry',
      'Mobile-first for tradespeople on job sites',
      'Trade certifications (Gas Safe, NICEIC) built in',
      'No accounting knowledge required',
      'Can integrate WITH FreeAgent - use both together'
    ],
    
    migrationPath: 'Don\'t replace FreeAgent - use Elektroluma alongside it! Let Elektroluma handle invoice capture from photos, then sync to FreeAgent for accounting and tax. Save time and money.'
  },
  
  kofaxTungsten: {
    id: 'kofax-tungsten',
    name: 'Tungsten Automation (Kofax ReadSoft)',
    slug: 'tungsten-readsoft',
    website: 'https://www.tungstenautomation.com',
    description: 'Tungsten Automation (formerly Kofax) offers enterprise invoice automation with ReadSoft Invoices for high-volume AP processing. It\'s designed for large organizations processing 1,000+ invoices/hour with deep ERP integration and complex workflows.',
    shortDescription: 'Enterprise invoice automation for high-volume AP teams',
    
    company: {
      founded: 1985,
      headquarters: 'Irvine, California, USA',
      employees: '2,000+',
      parentCompany: 'Clearlake Capital Group (acquired 2021)',
      funding: 'Private Equity'
    },
    
    segment: 'ai-parser',
    traffic: {
      description: '3,000+ enterprise customers globally'
    },
    
    features: {
      aiPowered: true,
      ukCompliance: true,
      vatSupport: true,
      cisSupport: false,
      automation: true,
      accountingIntegration: ['SAP', 'Oracle', 'NetSuite', 'Microsoft Dynamics', 'Workday'],
      mobileApp: false,
      apiAccess: true,
      customTemplates: true,
      multiCurrency: true,
      batchProcessing: true,
      ocrAccuracy: 98
    },
    
    pricing: {
      model: 'enterprise',
      currency: 'USD',
      tiers: [
        {
          name: 'ReadSoft Online',
          price: 2000,
          billingPeriod: 'year',
          features: [
            'Cloud-based SaaS',
            'Subscription pricing',
            'Lower upfront costs',
            'Adaptive self-learning OCR',
            'ERP integration'
          ]
        },
        {
          name: 'Enterprise',
          price: 50000,
          billingPeriod: 'year',
          features: [
            'On-premise deployment',
            'Unlimited invoices',
            'Custom workflows',
            'Dedicated support',
            'Professional services',
            'Process 1,000+ invoices/hour'
          ]
        }
      ]
    },
    
    strengths: [
      'Enterprise-grade for Fortune 500 companies',
      'Process 1,000+ invoices per hour',
      'Deep SAP integration (ReadSoft Process Director)',
      'Excellent for high-volume AP departments',
      'Adaptive self-learning OCR',
      'Strong compliance and audit trails',
      'Global deployment capabilities'
    ],
    
    weaknesses: [
      'Extremely expensive (£2,000-50,000+/year)',
      'Complex implementation (6-12 months typical)',
      'Requires dedicated IT team',
      'Overkill for SMBs and mid-market',
      'Old interface and technology',
      'Poor user experience vs modern solutions',
      'Not suitable for <1,000 invoices/month',
      'No mobile capabilities'
    ],
    
    targetMarket: {
      description: 'Fortune 500 and large enterprises with 10,000+ invoices/month',
      businessSize: 'enterprise',
      industry: ['Manufacturing', 'Healthcare', 'Government', 'Large Corporates'],
      geography: ['Global', 'North America', 'Europe']
    },
    
    reviews: {
      overall: 3.9,
      g2: 4.0,
      capterra: 3.8,
      userComments: [
        'Powerful but complex - needed 6 months to implement',
        'Great for SAP integration',
        'Very expensive but handles our volume',
        'Interface feels outdated compared to modern tools'
      ]
    },
    
    keywords: [
      'Kofax invoice automation',
      'ReadSoft invoices',
      'Tungsten Automation',
      'enterprise invoice processing',
      'SAP invoice automation'
    ],
    searchVolume: 4200,
    alternativeKeywords: [
      'Kofax alternative',
      'ReadSoft alternative',
      'enterprise AP automation'
    ],
    
    elektrolumaDifferentiators: [
      'Elektroluma is 99.85% cheaper (£29/mo vs £4,000+/mo)',
      'Setup in minutes vs 6-12 months',
      'Designed for UK SMBs, not Fortune 500',
      'Modern mobile-first interface',
      'Perfect for 10-500 invoices/month',
      'No IT team required',
      'CIS support for UK construction'
    ],
    
    migrationPath: 'Tungsten is enterprise-only. UK SMBs should use Elektroluma instead - save 99% of costs while getting modern features designed for your scale.'
  }
};

// Assign competitors to segments
marketSegments.freeGenerators.competitors = [
  competitors.invoiceGenerator,
  competitors.zohoInvoice,
  competitors.canva,
  competitors.squareInvoices,
  competitors.invoiceNinja,
  competitors.conta
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
  competitors.googleDocumentAI,
  competitors.dextPrepare,
  competitors.hubdoc,
  competitors.parseur,
  competitors.docsumo,
  competitors.tipalti,
  competitors.autoEntry,
  competitors.kofaxTungsten
];

marketSegments.accountingSoftware.competitors = [
  competitors.zohoInvoice,
  competitors.freshbooks,
  competitors.crunchAccounting,
  competitors.xero,
  competitors.wave,
  competitors.freeagent
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
  gartner: {
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

/**
 * Get all competitor slugs for static generation
 */
export function getAllCompetitorSlugs(): string[] {
  return getAllCompetitors().map(c => c.slug);
}

/**
 * Get related competitors (same segment, excluding current)
 */
export function getRelatedCompetitors(competitor: Competitor, limit: number = 3): Competitor[] {
  return getAllCompetitors()
    .filter(c => c.id !== competitor.id && c.segment === competitor.segment)
    .slice(0, limit);
}

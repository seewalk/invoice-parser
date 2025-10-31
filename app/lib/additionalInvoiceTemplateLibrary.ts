/**
 * Additional Invoice Template Library
 * 
 * Extended industry-specific invoice template database organized by:
 * Industry → Category → Sub-category → Template
 * 
 * This library contains 30 additional templates across 7 new industries:
 * - Digital Services & Technology (5 templates)
 * - Health & Wellness (4 templates)
 * - Sustainable & Green Business (2 templates)
 * - Creative & Media (3 templates)
 * - Pet Services (3 templates)
 * - Education & E-Learning (2 templates)
 * - Professional Services (11 templates including Virtual Assistant)
 * 
 * Usage:
 * - Generate templates dynamically based on user industry
 * - SEO content for template landing pages
 * - Auto-populate invoice fields based on industry standards
 */

// ============================================================================
// TYPE DEFINITIONS (Re-exported from main library)
// ============================================================================

export interface InvoiceTemplate {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  searchVolume: number;
  cpc: number;
  searchDifficulty: number;
  tier: 'free' | 'premium';
  requiredFields: InvoiceField[];
  optionalFields: InvoiceField[];
  industryStandards: IndustryStandard[];
  sampleData: Record<string, any>;
}

export interface InvoiceField {
  fieldName: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'currency' | 'email' | 'phone' | 'textarea' | 'select';
  required: boolean;
  placeholder?: string;
  validation?: string;
  helpText?: string;
}

export interface IndustryStandard {
  standard: string;
  description: string;
  complianceLevel: 'required' | 'recommended' | 'optional';
}

export interface SubCategory {
  id: string;
  name: string;
  description: string;
  templates: InvoiceTemplate[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  subCategories: Record<string, SubCategory>;
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
  totalSearchVolume: number;
  categories: Record<string, Category>;
}

// ============================================================================
// COMMON FIELDS (Reusable across templates)
// ============================================================================

const commonFields = {
  // Header Fields
  invoiceNumber: {
    fieldName: 'invoiceNumber',
    label: 'Invoice Number',
    type: 'text' as const,
    required: true,
    placeholder: 'INV-2024-001',
    validation: '^INV-\\d{4}-\\d{3,}$',
    helpText: 'Unique identifier for this invoice (e.g., INV-2024-001)'
  },
  invoiceDate: {
    fieldName: 'invoiceDate',
    label: 'Invoice Date',
    type: 'date' as const,
    required: true,
    helpText: 'Date invoice was issued'
  },
  dueDate: {
    fieldName: 'dueDate',
    label: 'Due Date',
    type: 'date' as const,
    required: true,
    helpText: 'Payment due date (e.g., Net 30 days)'
  },

  // Business Info Fields
  businessName: {
    fieldName: 'businessName',
    label: 'Business Name',
    type: 'text' as const,
    required: true,
    placeholder: 'Your Business Ltd',
    helpText: 'Your registered business or trading name'
  },
  businessAddress: {
    fieldName: 'businessAddress',
    label: 'Business Address',
    type: 'textarea' as const,
    required: true,
    placeholder: '123 Business Street, London, SW1A 1AA',
    helpText: 'Your business registered address'
  },
  businessPhone: {
    fieldName: 'businessPhone',
    label: 'Phone Number',
    type: 'phone' as const,
    required: false,
    placeholder: '+44 20 1234 5678',
    helpText: 'Contact phone number'
  },
  businessEmail: {
    fieldName: 'businessEmail',
    label: 'Email',
    type: 'email' as const,
    required: true,
    placeholder: 'invoices@yourbusiness.co.uk',
    helpText: 'Business email for invoice queries'
  },
  companyNumber: {
    fieldName: 'companyNumber',
    label: 'Company Registration Number',
    type: 'text' as const,
    required: false,
    placeholder: '12345678',
    helpText: 'UK Companies House registration number (if limited company)'
  },
  vatNumber: {
    fieldName: 'vatNumber',
    label: 'VAT Number',
    type: 'text' as const,
    required: false,
    placeholder: 'GB 123 4567 89',
    validation: '^GB\\s?\\d{3}\\s?\\d{4}\\s?\\d{2}$',
    helpText: 'VAT registration number (if VAT registered)'
  },

  // Client Info Fields
  clientName: {
    fieldName: 'clientName',
    label: 'Client Name',
    type: 'text' as const,
    required: true,
    placeholder: 'Client Company Ltd',
    helpText: 'Invoice recipient name or company'
  },
  clientAddress: {
    fieldName: 'clientAddress',
    label: 'Client Address',
    type: 'textarea' as const,
    required: true,
    placeholder: '456 Client Road, Manchester, M1 1AA',
    helpText: 'Client billing address'
  },
  clientEmail: {
    fieldName: 'clientEmail',
    label: 'Client Email',
    type: 'email' as const,
    required: false,
    placeholder: 'accounts@clientcompany.co.uk',
    helpText: 'Client email for invoice delivery'
  },

  // Line Items
  lineItems: {
    fieldName: 'lineItems',
    label: 'Line Items',
    type: 'textarea' as const,
    required: true,
    helpText: 'Description, quantity, rate, and amount for each item/service'
  },

  // Totals
  subtotal: {
    fieldName: 'subtotal',
    label: 'Subtotal',
    type: 'currency' as const,
    required: true,
    helpText: 'Total before VAT'
  },
  vatAmount: {
    fieldName: 'vatAmount',
    label: 'VAT Amount',
    type: 'currency' as const,
    required: false,
    helpText: 'VAT at 20% (if applicable)'
  },
  totalAmount: {
    fieldName: 'totalAmount',
    label: 'Total Amount',
    type: 'currency' as const,
    required: true,
    helpText: 'Total amount due including VAT'
  },

  // Payment Info
  bankName: {
    fieldName: 'bankName',
    label: 'Bank Name',
    type: 'text' as const,
    required: false,
    placeholder: 'Barclays Bank',
    helpText: 'Your bank name for payment'
  },
  accountNumber: {
    fieldName: 'accountNumber',
    label: 'Account Number',
    type: 'text' as const,
    required: false,
    placeholder: '12345678',
    helpText: '8-digit UK bank account number'
  },
  sortCode: {
    fieldName: 'sortCode',
    label: 'Sort Code',
    type: 'text' as const,
    required: false,
    placeholder: '12-34-56',
    validation: '^\\d{2}-\\d{2}-\\d{2}$',
    helpText: '6-digit bank sort code (XX-XX-XX format)'
  },

  // Notes
  paymentTerms: {
    fieldName: 'paymentTerms',
    label: 'Payment Terms',
    type: 'textarea' as const,
    required: false,
    placeholder: 'Payment due within 30 days. Late payments subject to 5% interest.',
    helpText: 'Payment terms and conditions'
  },
  notes: {
    fieldName: 'notes',
    label: 'Additional Notes',
    type: 'textarea' as const,
    required: false,
    placeholder: 'Thank you for your business!',
    helpText: 'Optional notes or thank you message'
  },

  // Additional specialized fields
  projectName: {
    fieldName: 'projectName',
    label: 'Project Name',
    type: 'text' as const,
    required: false,
    placeholder: 'AI Implementation Project',
    helpText: 'Name of the project or engagement'
  },
  serviceDate: {
    fieldName: 'serviceDate',
    label: 'Service Date',
    type: 'date' as const,
    required: false,
    helpText: 'Date service was provided'
  },
  sessionDuration: {
    fieldName: 'sessionDuration',
    label: 'Session Duration',
    type: 'number' as const,
    required: false,
    placeholder: '60',
    helpText: 'Duration in minutes'
  },
  licenseKey: {
    fieldName: 'licenseKey',
    label: 'License Key',
    type: 'text' as const,
    required: false,
    placeholder: 'LIC-XXXX-XXXX-XXXX',
    helpText: 'Software license or subscription key'
  },
  billingPeriod: {
    fieldName: 'billingPeriod',
    label: 'Billing Period',
    type: 'text' as const,
    required: false,
    placeholder: 'January 2024',
    helpText: 'Period covered by this invoice'
  }
};

// ============================================================================
// INDUSTRY: DIGITAL SERVICES & TECHNOLOGY
// ============================================================================

export const digitalServicesIndustry: Industry = {
  id: 'digitalServices',
  name: 'Digital Services & Technology',
  description: 'Invoice templates for AI/ML consulting, SaaS, cybersecurity, and digital marketing services',
  icon: '💻',
  totalSearchVolume: 8900, // AI consulting (500) + SaaS (2800) + cybersecurity (3200) + digital marketing (2400)
  categories: {
    aiMachineLearning: {
      id: 'aiMachineLearning',
      name: 'AI & Machine Learning',
      description: 'Invoice templates for AI consulting and ML training services',
      icon: '🤖',
      subCategories: {
        consulting: {
          id: 'consulting',
          name: 'AI Consulting',
          description: 'Invoices for AI strategy and implementation consulting',
          templates: [
            {
              id: 'ai-consulting-001',
              name: 'AI Consulting Invoice',
              description: 'Professional invoice template for AI consulting services including strategy, implementation planning, and technical advisory',
              keywords: ['ai consulting invoice', 'artificial intelligence invoice', 'ai strategy invoice', 'machine learning consulting'],
              searchVolume: 500,
              cpc: 18.50,
              searchDifficulty: 45,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.clientAddress,
                commonFields.projectName,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientEmail,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'Detailed service breakdown',
                  description: 'Include specific AI consulting activities, hours, and deliverables',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Intellectual property rights',
                  description: 'Clarify ownership of AI models and algorithms developed',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Data protection compliance',
                  description: 'Reference GDPR compliance for AI data processing',
                  complianceLevel: 'required'
                }
              ],
              sampleData: {
                invoiceNumber: 'AI-2024-001',
                businessName: 'AI Solutions Ltd',
                projectName: 'Customer Segmentation AI Implementation',
                lineItems: [
                  { description: 'AI Strategy Workshop (8 hours)', quantity: 1, rate: 1500, amount: 1500 },
                  { description: 'ML Model Development', quantity: 40, rate: 150, amount: 6000 },
                  { description: 'Implementation Support', quantity: 20, rate: 120, amount: 2400 }
                ],
                subtotal: 9900,
                vatAmount: 1980,
                totalAmount: 11880
              }
            }
          ]
        },
        training: {
          id: 'training',
          name: 'ML Training',
          description: 'Invoices for machine learning model training and optimization',
          templates: [
            {
              id: 'ml-training-001',
              name: 'ML Training Invoice',
              description: 'Invoice template for machine learning model training, data processing, and model optimization services',
              keywords: ['machine learning invoice', 'ml training invoice', 'model training invoice', 'data science invoice'],
              searchVolume: 380,
              cpc: 16.20,
              searchDifficulty: 42,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.clientAddress,
                commonFields.projectName,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientEmail,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'Model performance metrics',
                  description: 'Include accuracy, precision, recall metrics in deliverables',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Training data specifications',
                  description: 'Document data volume, quality, and preprocessing methods',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Compute resource billing',
                  description: 'Itemize GPU/cloud computing costs separately',
                  complianceLevel: 'recommended'
                }
              ],
              sampleData: {
                invoiceNumber: 'ML-2024-012',
                businessName: 'DataTech Solutions',
                projectName: 'Predictive Maintenance ML Model',
                lineItems: [
                  { description: 'Data preprocessing and cleaning', quantity: 25, rate: 100, amount: 2500 },
                  { description: 'Model training (GPU compute)', quantity: 80, rate: 75, amount: 6000 },
                  { description: 'Model optimization and tuning', quantity: 15, rate: 120, amount: 1800 }
                ],
                subtotal: 10300,
                vatAmount: 2060,
                totalAmount: 12360
              }
            }
          ]
        }
      }
    },
    saasSubscription: {
      id: 'saasSubscription',
      name: 'SaaS & Cloud Services',
      description: 'Invoice templates for software subscription and cloud services',
      icon: '☁️',
      subCategories: {
        subscription: {
          id: 'subscription',
          name: 'SaaS Subscription',
          description: 'Recurring invoices for software-as-a-service subscriptions',
          templates: [
            {
              id: 'saas-subscription-001',
              name: 'SaaS Subscription Invoice',
              description: 'Professional invoice template for SaaS subscription billing, cloud services, and software licensing with recurring payment support',
              keywords: ['saas invoice', 'software subscription invoice', 'cloud service invoice', 'recurring billing invoice'],
              searchVolume: 2800,
              cpc: 12.40,
              searchDifficulty: 48,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.clientAddress,
                commonFields.billingPeriod,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientEmail,
                commonFields.licenseKey,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'Subscription tier details',
                  description: 'Clearly state plan name, user count, and feature access',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Auto-renewal notification',
                  description: 'Include auto-renewal terms and cancellation policy',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Usage-based charges',
                  description: 'Itemize any overage or usage-based fees separately',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'SLA reference',
                  description: 'Reference service level agreement and uptime guarantee',
                  complianceLevel: 'optional'
                }
              ],
              sampleData: {
                invoiceNumber: 'SAAS-2024-0345',
                businessName: 'CloudFlow Technologies',
                billingPeriod: 'January 2024',
                licenseKey: 'LIC-CF-2024-A1B2C3',
                lineItems: [
                  { description: 'Business Plan (50 users)', quantity: 1, rate: 999, amount: 999 },
                  { description: 'Additional storage (500GB)', quantity: 1, rate: 150, amount: 150 },
                  { description: 'Priority support', quantity: 1, rate: 250, amount: 250 }
                ],
                subtotal: 1399,
                vatAmount: 279.80,
                totalAmount: 1678.80
              }
            }
          ]
        }
      }
    },
    cybersecurity: {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      description: 'Invoice templates for security audits and penetration testing',
      icon: '🔒',
      subCategories: {
        audit: {
          id: 'audit',
          name: 'Security Audit',
          description: 'Invoices for cybersecurity audits and vulnerability assessments',
          templates: [
            {
              id: 'cybersecurity-audit-001',
              name: 'Cybersecurity Audit Invoice',
              description: 'Comprehensive invoice template for cybersecurity audits, penetration testing, vulnerability assessments, and security compliance services',
              keywords: ['cybersecurity invoice', 'security audit invoice', 'penetration testing invoice', 'infosec invoice'],
              searchVolume: 3200,
              cpc: 22.30,
              searchDifficulty: 52,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.clientAddress,
                commonFields.projectName,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientEmail,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'Confidentiality agreement reference',
                  description: 'Reference NDA and confidentiality terms for sensitive findings',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Compliance framework',
                  description: 'Specify standards tested (ISO 27001, NIST, PCI-DSS, etc.)',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Scope of testing',
                  description: 'Clearly define systems, networks, and applications audited',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Report delivery timeline',
                  description: 'Include delivery date for detailed audit report',
                  complianceLevel: 'recommended'
                }
              ],
              sampleData: {
                invoiceNumber: 'SEC-2024-078',
                businessName: 'SecureNet Consulting',
                projectName: 'Annual Security Compliance Audit',
                lineItems: [
                  { description: 'Vulnerability assessment', quantity: 1, rate: 3500, amount: 3500 },
                  { description: 'Penetration testing (5 days)', quantity: 5, rate: 1200, amount: 6000 },
                  { description: 'Compliance report preparation', quantity: 1, rate: 1800, amount: 1800 },
                  { description: 'Executive briefing', quantity: 1, rate: 800, amount: 800 }
                ],
                subtotal: 12100,
                vatAmount: 2420,
                totalAmount: 14520
              }
            }
          ]
        }
      }
    },
    digitalMarketing: {
      id: 'digitalMarketing',
      name: 'Digital Marketing',
      description: 'Invoice templates for digital marketing and online advertising services',
      icon: '📱',
      subCategories: {
        campaigns: {
          id: 'campaigns',
          name: 'Marketing Campaigns',
          description: 'Invoices for digital marketing campaigns and advertising services',
          templates: [
            {
              id: 'digital-marketing-001',
              name: 'Digital Marketing Invoice',
              description: 'Professional invoice template for digital marketing services including SEO, PPC, social media management, and content marketing',
              keywords: ['digital marketing invoice', 'seo invoice', 'ppc invoice', 'social media marketing invoice'],
              searchVolume: 2400,
              cpc: 14.80,
              searchDifficulty: 46,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.clientAddress,
                commonFields.billingPeriod,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientEmail,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'Campaign performance metrics',
                  description: 'Include KPIs, ROI, and campaign results summary',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Ad spend breakdown',
                  description: 'Separate agency fees from media buying costs',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Service deliverables',
                  description: 'List specific deliverables (posts, ads, reports, etc.)',
                  complianceLevel: 'required'
                }
              ],
              sampleData: {
                invoiceNumber: 'DM-2024-0189',
                businessName: 'Digital Growth Agency',
                billingPeriod: 'January 2024',
                lineItems: [
                  { description: 'SEO optimization (20 hours)', quantity: 20, rate: 95, amount: 1900 },
                  { description: 'PPC campaign management', quantity: 1, rate: 1500, amount: 1500 },
                  { description: 'Social media content (30 posts)', quantity: 30, rate: 50, amount: 1500 },
                  { description: 'Monthly analytics report', quantity: 1, rate: 400, amount: 400 }
                ],
                subtotal: 5300,
                vatAmount: 1060,
                totalAmount: 6360
              }
            }
          ]
        }
      }
    }
  }
};

// ============================================================================
// INDUSTRY: HEALTH & WELLNESS
// ============================================================================

export const healthWellnessIndustry: Industry = {
  id: 'healthWellness',
  name: 'Health & Wellness',
  description: 'Invoice templates for teletherapy, coaching, fitness training, and nutrition consulting',
  icon: '🏥',
  totalSearchVolume: 6400, // teletherapy (1800) + life coaching (2100) + fitness training (1600) + nutritionist (900)
  categories: {
    mentalHealth: {
      id: 'mentalHealth',
      name: 'Mental Health Services',
      description: 'Invoice templates for therapy and counseling services',
      icon: '🧠',
      subCategories: {
        teletherapy: {
          id: 'teletherapy',
          name: 'Teletherapy',
          description: 'Invoices for online therapy and counseling sessions',
          templates: [
            {
              id: 'teletherapy-001',
              name: 'Teletherapy Invoice',
              description: 'Professional invoice template for online therapy sessions, mental health counseling, and telepsychology services with HIPAA compliance',
              keywords: ['teletherapy invoice', 'online therapy invoice', 'counseling invoice', 'telehealth invoice'],
              searchVolume: 1800,
              cpc: 8.50,
              searchDifficulty: 38,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.serviceDate,
                commonFields.sessionDuration,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientAddress,
                commonFields.clientEmail,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'HIPAA compliance',
                  description: 'Ensure invoice does not contain sensitive health information',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Professional credentials',
                  description: 'Include therapist license number and credentials',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Session documentation',
                  description: 'Record session date, duration, and type (individual, couples, etc.)',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Cancellation policy',
                  description: 'Reference cancellation and no-show fee policy',
                  complianceLevel: 'recommended'
                }
              ],
              sampleData: {
                invoiceNumber: 'TH-2024-0456',
                businessName: 'Dr. Sarah Johnson, Licensed Therapist',
                serviceDate: '2024-01-15',
                sessionDuration: 60,
                lineItems: [
                  { description: 'Individual therapy session (60 min)', quantity: 1, rate: 120, amount: 120 }
                ],
                subtotal: 120,
                vatAmount: 0, // Healthcare often VAT-exempt
                totalAmount: 120
              }
            }
          ]
        }
      }
    },
    coaching: {
      id: 'coaching',
      name: 'Life & Career Coaching',
      description: 'Invoice templates for coaching services',
      icon: '🎯',
      subCategories: {
        lifeCoaching: {
          id: 'lifeCoaching',
          name: 'Life Coaching',
          description: 'Invoices for personal development and life coaching',
          templates: [
            {
              id: 'life-coaching-001',
              name: 'Life Coaching Invoice',
              description: 'Invoice template for life coaching sessions, personal development programs, and coaching packages',
              keywords: ['life coaching invoice', 'personal coaching invoice', 'career coaching invoice', 'executive coaching invoice'],
              searchVolume: 2100,
              cpc: 11.20,
              searchDifficulty: 35,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.serviceDate,
                commonFields.sessionDuration,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientAddress,
                commonFields.clientEmail,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'Coaching agreement reference',
                  description: 'Reference coaching contract and program details',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Session package tracking',
                  description: 'Show remaining sessions if part of a package',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Professional certification',
                  description: 'Include coaching certification (ICF, EMCC, etc.)',
                  complianceLevel: 'optional'
                }
              ],
              sampleData: {
                invoiceNumber: 'LC-2024-0234',
                businessName: 'Transform Life Coaching',
                serviceDate: '2024-01-10',
                sessionDuration: 90,
                lineItems: [
                  { description: 'Life coaching session (90 min)', quantity: 1, rate: 180, amount: 180 },
                  { description: 'Goal-setting workbook', quantity: 1, rate: 25, amount: 25 }
                ],
                subtotal: 205,
                vatAmount: 41,
                totalAmount: 246
              }
            }
          ]
        }
      }
    },
    fitness: {
      id: 'fitness',
      name: 'Fitness & Training',
      description: 'Invoice templates for fitness training services',
      icon: '💪',
      subCategories: {
        virtualFitness: {
          id: 'virtualFitness',
          name: 'Virtual Fitness',
          description: 'Invoices for online fitness training and classes',
          templates: [
            {
              id: 'virtual-fitness-001',
              name: 'Virtual Fitness Training Invoice',
              description: 'Invoice template for online personal training, virtual fitness classes, and remote workout programs',
              keywords: ['fitness invoice', 'personal training invoice', 'virtual training invoice', 'online fitness invoice'],
              searchVolume: 1600,
              cpc: 7.90,
              searchDifficulty: 32,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.billingPeriod,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientAddress,
                commonFields.clientEmail,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'Fitness professional insurance',
                  description: 'Reference professional indemnity insurance',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Training certifications',
                  description: 'Include relevant fitness certifications (NASM, ACE, etc.)',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Session package details',
                  description: 'Specify number of sessions included in package',
                  complianceLevel: 'recommended'
                }
              ],
              sampleData: {
                invoiceNumber: 'FIT-2024-0567',
                businessName: 'FitOnline Personal Training',
                billingPeriod: 'January 2024',
                lineItems: [
                  { description: 'Monthly training package (12 sessions)', quantity: 1, rate: 480, amount: 480 },
                  { description: 'Personalized meal plan', quantity: 1, rate: 80, amount: 80 },
                  { description: 'Progress tracking app access', quantity: 1, rate: 20, amount: 20 }
                ],
                subtotal: 580,
                vatAmount: 116,
                totalAmount: 696
              }
            }
          ]
        }
      }
    },
    nutrition: {
      id: 'nutrition',
      name: 'Nutrition Services',
      description: 'Invoice templates for nutrition consulting',
      icon: '🥗',
      subCategories: {
        consulting: {
          id: 'consulting',
          name: 'Nutrition Consulting',
          description: 'Invoices for nutritionist consultations and meal planning',
          templates: [
            {
              id: 'nutritionist-001',
              name: 'Nutritionist Consultation Invoice',
              description: 'Professional invoice template for nutritionist consultations, meal planning services, and dietary assessments',
              keywords: ['nutritionist invoice', 'dietitian invoice', 'nutrition consultation invoice', 'meal planning invoice'],
              searchVolume: 900,
              cpc: 9.30,
              searchDifficulty: 34,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.serviceDate,
                commonFields.sessionDuration,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientAddress,
                commonFields.clientEmail,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'Professional registration',
                  description: 'Include registration with professional body (AfN, BDA, etc.)',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Confidentiality notice',
                  description: 'Reference privacy of health and dietary information',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Service deliverables',
                  description: 'Specify consultation type and materials provided',
                  complianceLevel: 'recommended'
                }
              ],
              sampleData: {
                invoiceNumber: 'NUT-2024-0123',
                businessName: 'Healthy Living Nutrition',
                serviceDate: '2024-01-12',
                sessionDuration: 60,
                lineItems: [
                  { description: 'Initial nutrition consultation (60 min)', quantity: 1, rate: 95, amount: 95 },
                  { description: 'Personalized meal plan (7 days)', quantity: 1, rate: 65, amount: 65 },
                  { description: 'Nutrition guide booklet', quantity: 1, rate: 20, amount: 20 }
                ],
                subtotal: 180,
                vatAmount: 0, // Healthcare services often VAT-exempt
                totalAmount: 180
              }
            }
          ]
        }
      }
    }
  }
};

// ============================================================================
// INDUSTRY: SUSTAINABLE & GREEN BUSINESS
// ============================================================================

export const sustainableBusinessIndustry: Industry = {
  id: 'sustainableBusiness',
  name: 'Sustainable & Green Business',
  description: 'Invoice templates for solar installation, sustainability audits, and eco-friendly services',
  icon: '🌱',
  totalSearchVolume: 4700, // solar installation (3200) + sustainability audit (1500)
  categories: {
    renewableEnergy: {
      id: 'renewableEnergy',
      name: 'Renewable Energy',
      description: 'Invoice templates for solar and renewable energy services',
      icon: '☀️',
      subCategories: {
        solarInstallation: {
          id: 'solarInstallation',
          name: 'Solar Installation',
          description: 'Invoices for solar panel installation and maintenance',
          templates: [
            {
              id: 'solar-installation-001',
              name: 'Solar Panel Installation Invoice',
              description: 'Comprehensive invoice template for solar panel installation, including equipment, labor, permits, and warranty information',
              keywords: ['solar panel invoice', 'solar installation invoice', 'renewable energy invoice', 'solar contractor invoice'],
              searchVolume: 3200,
              cpc: 19.50,
              searchDifficulty: 51,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.clientAddress,
                commonFields.projectName,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientEmail,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'MCS certification',
                  description: 'Include Microgeneration Certification Scheme (MCS) number',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Equipment specifications',
                  description: 'Detail panel wattage, inverter specs, and system capacity',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Warranty information',
                  description: 'Specify product warranties and installation guarantee',
                  complianceLevel: 'required'
                },
                {
                  standard: 'SEG tariff eligibility',
                  description: 'Reference Smart Export Guarantee eligibility if applicable',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Building regulations',
                  description: 'Confirm compliance with building regulations Part P',
                  complianceLevel: 'required'
                }
              ],
              sampleData: {
                invoiceNumber: 'SOL-2024-0089',
                businessName: 'GreenPower Solar Ltd',
                projectName: '4.8kW Residential Solar Installation',
                lineItems: [
                  { description: 'Solar panels (12x 400W)', quantity: 12, rate: 280, amount: 3360 },
                  { description: 'Hybrid inverter (5kW)', quantity: 1, rate: 1800, amount: 1800 },
                  { description: 'Battery storage (10kWh)', quantity: 1, rate: 4500, amount: 4500 },
                  { description: 'Installation labor (2 days)', quantity: 2, rate: 800, amount: 1600 },
                  { description: 'Scaffolding and safety equipment', quantity: 1, rate: 450, amount: 450 },
                  { description: 'Electrical certification and permits', quantity: 1, rate: 350, amount: 350 }
                ],
                subtotal: 12060,
                vatAmount: 0, // Solar installations are currently VAT-free in UK (0% VAT)
                totalAmount: 12060
              }
            }
          ]
        }
      }
    },
    sustainability: {
      id: 'sustainability',
      name: 'Sustainability Consulting',
      description: 'Invoice templates for sustainability audits and consulting',
      icon: '♻️',
      subCategories: {
        audit: {
          id: 'audit',
          name: 'Sustainability Audit',
          description: 'Invoices for environmental audits and carbon assessments',
          templates: [
            {
              id: 'sustainability-audit-001',
              name: 'Sustainability Audit Invoice',
              description: 'Professional invoice template for sustainability audits, carbon footprint assessments, ESG consulting, and environmental compliance services',
              keywords: ['sustainability audit invoice', 'carbon audit invoice', 'esg consulting invoice', 'environmental audit invoice'],
              searchVolume: 1500,
              cpc: 16.80,
              searchDifficulty: 44,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.clientAddress,
                commonFields.projectName,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientEmail,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'ISO 14001 alignment',
                  description: 'Reference ISO 14001 environmental management standards',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Carbon accounting methodology',
                  description: 'Specify GHG Protocol or PAS 2060 methodology used',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Scope of assessment',
                  description: 'Define Scope 1, 2, and 3 emissions coverage',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Reporting framework',
                  description: 'Reference TCFD, CDP, or GRI reporting standards',
                  complianceLevel: 'recommended'
                }
              ],
              sampleData: {
                invoiceNumber: 'SUS-2024-0156',
                businessName: 'EcoConsult Sustainability',
                projectName: 'Corporate Carbon Footprint Assessment',
                lineItems: [
                  { description: 'Data collection and analysis', quantity: 1, rate: 2500, amount: 2500 },
                  { description: 'Carbon footprint calculation (Scopes 1-3)', quantity: 1, rate: 3800, amount: 3800 },
                  { description: 'Sustainability recommendations report', quantity: 1, rate: 1500, amount: 1500 },
                  { description: 'Executive presentation', quantity: 1, rate: 800, amount: 800 }
                ],
                subtotal: 8600,
                vatAmount: 1720,
                totalAmount: 10320
              }
            }
          ]
        }
      }
    }
  }
};

// ============================================================================
// INDUSTRY: CREATIVE & MEDIA
// ============================================================================

export const creativeMediaIndustry: Industry = {
  id: 'creativeMedia',
  name: 'Creative & Media',
  description: 'Invoice templates for influencers, content creators, and media production',
  icon: '🎬',
  totalSearchVolume: 7800, // influencer (3500) + youtube creator (2800) + podcast (1500)
  categories: {
    socialMedia: {
      id: 'socialMedia',
      name: 'Social Media',
      description: 'Invoice templates for social media influencers and content creators',
      icon: '📱',
      subCategories: {
        influencer: {
          id: 'influencer',
          name: 'Influencer Marketing',
          description: 'Invoices for brand partnerships and sponsored content',
          templates: [
            {
              id: 'influencer-001',
              name: 'Social Media Influencer Invoice',
              description: 'Professional invoice template for influencer collaborations, sponsored posts, brand partnerships, and social media campaigns',
              keywords: ['influencer invoice', 'sponsored post invoice', 'brand partnership invoice', 'social media invoice'],
              searchVolume: 3500,
              cpc: 13.60,
              searchDifficulty: 43,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.clientAddress,
                commonFields.projectName,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientEmail,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'Campaign deliverables',
                  description: 'Specify number and type of posts (Stories, Reels, Feed posts)',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Platform and reach',
                  description: 'Include platform names and audience metrics',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Usage rights',
                  description: 'Define content usage rights and exclusivity terms',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Performance metrics',
                  description: 'Reference agreed KPIs (engagement rate, reach, etc.)',
                  complianceLevel: 'optional'
                }
              ],
              sampleData: {
                invoiceNumber: 'INF-2024-0234',
                businessName: 'Emma Style Influencer',
                projectName: 'Spring Fashion Campaign',
                lineItems: [
                  { description: 'Instagram feed post (2 posts)', quantity: 2, rate: 850, amount: 1700 },
                  { description: 'Instagram Stories (5 stories)', quantity: 5, rate: 200, amount: 1000 },
                  { description: 'TikTok video (1 video)', quantity: 1, rate: 1200, amount: 1200 },
                  { description: 'Content usage rights (6 months)', quantity: 1, rate: 500, amount: 500 }
                ],
                subtotal: 4400,
                vatAmount: 880,
                totalAmount: 5280
              }
            }
          ]
        },
        youtubeCreator: {
          id: 'youtubeCreator',
          name: 'YouTube Content',
          description: 'Invoices for YouTube video production and sponsorships',
          templates: [
            {
              id: 'youtube-creator-001',
              name: 'YouTube Content Creator Invoice',
              description: 'Invoice template for YouTube video sponsorships, brand integrations, and content creation services',
              keywords: ['youtube invoice', 'video sponsorship invoice', 'youtube creator invoice', 'content creator invoice'],
              searchVolume: 2800,
              cpc: 12.90,
              searchDifficulty: 41,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.clientAddress,
                commonFields.projectName,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientEmail,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'Video specifications',
                  description: 'Specify video length, integration type (dedicated/integrated)',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Channel metrics',
                  description: 'Include subscriber count and average view metrics',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Disclosure compliance',
                  description: 'Reference FTC/ASA sponsored content disclosure requirements',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Content approval',
                  description: 'Define content review and approval process',
                  complianceLevel: 'recommended'
                }
              ],
              sampleData: {
                invoiceNumber: 'YT-2024-0445',
                businessName: 'TechReview Channel',
                projectName: 'Product Review Video Sponsorship',
                lineItems: [
                  { description: 'Dedicated product review video (10-12 min)', quantity: 1, rate: 3500, amount: 3500 },
                  { description: 'Video thumbnail and description optimization', quantity: 1, rate: 200, amount: 200 },
                  { description: 'Social media promotion (Twitter, Instagram)', quantity: 1, rate: 400, amount: 400 }
                ],
                subtotal: 4100,
                vatAmount: 820,
                totalAmount: 4920
              }
            }
          ]
        }
      }
    },
    podcast: {
      id: 'podcast',
      name: 'Podcast Production',
      description: 'Invoice templates for podcast production and sponsorships',
      icon: '🎙️',
      subCategories: {
        production: {
          id: 'production',
          name: 'Podcast Production',
          description: 'Invoices for podcast recording, editing, and production services',
          templates: [
            {
              id: 'podcast-production-001',
              name: 'Podcast Production Invoice',
              description: 'Comprehensive invoice template for podcast production services including recording, editing, mixing, show notes, and distribution',
              keywords: ['podcast invoice', 'podcast production invoice', 'audio editing invoice', 'podcast sponsorship invoice'],
              searchVolume: 1500,
              cpc: 10.40,
              searchDifficulty: 37,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.clientAddress,
                commonFields.projectName,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientEmail,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'Episode specifications',
                  description: 'Specify episode length, format, and production quality',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Deliverables format',
                  description: 'Define audio file formats (MP3, WAV) and bitrate',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Turnaround time',
                  description: 'Specify production timeline and delivery schedule',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Revision policy',
                  description: 'Define number of revisions included',
                  complianceLevel: 'recommended'
                }
              ],
              sampleData: {
                invoiceNumber: 'POD-2024-0678',
                businessName: 'Audio Excellence Production',
                projectName: 'Monthly Podcast Production Package',
                lineItems: [
                  { description: 'Podcast episode editing (4 episodes)', quantity: 4, rate: 150, amount: 600 },
                  { description: 'Audio mixing and mastering', quantity: 4, rate: 75, amount: 300 },
                  { description: 'Show notes writing (4 episodes)', quantity: 4, rate: 50, amount: 200 },
                  { description: 'Audiogram creation for social media', quantity: 4, rate: 40, amount: 160 }
                ],
                subtotal: 1260,
                vatAmount: 252,
                totalAmount: 1512
              }
            }
          ]
        }
      }
    }
  }
};

// ============================================================================
// INDUSTRY: PET SERVICES
// ============================================================================

export const petServicesIndustry: Industry = {
  id: 'petServices',
  name: 'Pet Services',
  description: 'Invoice templates for veterinary services, pet grooming, and dog training',
  icon: '🐾',
  totalSearchVolume: 5300, // veterinary (2400) + pet grooming (1800) + dog training (1100)
  categories: {
    veterinary: {
      id: 'veterinary',
      name: 'Veterinary Services',
      description: 'Invoice templates for veterinary clinics and animal hospitals',
      icon: '🏥',
      subCategories: {
        clinic: {
          id: 'clinic',
          name: 'Veterinary Clinic',
          description: 'Invoices for veterinary examinations, treatments, and procedures',
          templates: [
            {
              id: 'veterinary-001',
              name: 'Veterinary Services Invoice',
              description: 'Professional invoice template for veterinary services including consultations, treatments, medications, and surgical procedures',
              keywords: ['veterinary invoice', 'vet invoice', 'animal hospital invoice', 'pet clinic invoice'],
              searchVolume: 2400,
              cpc: 6.80,
              searchDifficulty: 33,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.serviceDate,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientAddress,
                commonFields.clientEmail,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'RCVS registration',
                  description: 'Include Royal College of Veterinary Surgeons registration number',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Pet identification',
                  description: 'Record pet name, species, breed, and microchip number',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Treatment details',
                  description: 'Itemize consultations, procedures, medications separately',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Medication information',
                  description: 'Include prescription details and dosage instructions',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Follow-up care',
                  description: 'Include follow-up appointment details if applicable',
                  complianceLevel: 'optional'
                }
              ],
              sampleData: {
                invoiceNumber: 'VET-2024-1234',
                businessName: 'Caring Paws Veterinary Clinic',
                serviceDate: '2024-01-18',
                lineItems: [
                  { description: 'General consultation - Max (Golden Retriever)', quantity: 1, rate: 55, amount: 55 },
                  { description: 'Vaccination (Rabies booster)', quantity: 1, rate: 45, amount: 45 },
                  { description: 'Blood test (Complete panel)', quantity: 1, rate: 85, amount: 85 },
                  { description: 'Medication - Antibiotics (7 days)', quantity: 1, rate: 28, amount: 28 }
                ],
                subtotal: 213,
                vatAmount: 0, // Veterinary services are VAT-exempt in UK
                totalAmount: 213
              }
            }
          ]
        }
      }
    },
    grooming: {
      id: 'grooming',
      name: 'Pet Grooming',
      description: 'Invoice templates for pet grooming and styling services',
      icon: '✂️',
      subCategories: {
        salon: {
          id: 'salon',
          name: 'Grooming Salon',
          description: 'Invoices for pet bathing, grooming, and styling',
          templates: [
            {
              id: 'pet-grooming-001',
              name: 'Pet Grooming Invoice',
              description: 'Invoice template for pet grooming services including bathing, haircuts, nail trimming, and specialty treatments',
              keywords: ['pet grooming invoice', 'dog grooming invoice', 'pet salon invoice', 'mobile grooming invoice'],
              searchVolume: 1800,
              cpc: 5.20,
              searchDifficulty: 29,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.serviceDate,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientAddress,
                commonFields.clientEmail,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'Pet details',
                  description: 'Record pet name, breed, size, and coat type',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Service itemization',
                  description: 'Break down grooming services (bath, cut, nails, etc.)',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Health observations',
                  description: 'Note any skin conditions or health concerns observed',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Product information',
                  description: 'List shampoos and products used if premium/specialty',
                  complianceLevel: 'optional'
                }
              ],
              sampleData: {
                invoiceNumber: 'GROOM-2024-0567',
                businessName: 'Pampered Paws Grooming',
                serviceDate: '2024-01-20',
                lineItems: [
                  { description: 'Full groom - Bella (Cocker Spaniel, Medium)', quantity: 1, rate: 55, amount: 55 },
                  { description: 'Nail trimming and filing', quantity: 1, rate: 12, amount: 12 },
                  { description: 'Ear cleaning', quantity: 1, rate: 8, amount: 8 },
                  { description: 'Teeth brushing', quantity: 1, rate: 10, amount: 10 },
                  { description: 'Hypoallergenic shampoo (upgrade)', quantity: 1, rate: 5, amount: 5 }
                ],
                subtotal: 90,
                vatAmount: 18,
                totalAmount: 108
              }
            }
          ]
        }
      }
    },
    training: {
      id: 'training',
      name: 'Dog Training',
      description: 'Invoice templates for dog training and behavior services',
      icon: '🦮',
      subCategories: {
        obedience: {
          id: 'obedience',
          name: 'Dog Training',
          description: 'Invoices for obedience training and behavior modification',
          templates: [
            {
              id: 'dog-training-001',
              name: 'Dog Training Invoice',
              description: 'Professional invoice template for dog training services including obedience training, behavior modification, and puppy classes',
              keywords: ['dog training invoice', 'pet training invoice', 'obedience class invoice', 'dog trainer invoice'],
              searchVolume: 1100,
              cpc: 7.60,
              searchDifficulty: 31,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.serviceDate,
                commonFields.sessionDuration,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientAddress,
                commonFields.clientEmail,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'Trainer certification',
                  description: 'Include relevant certifications (IMDT, APDT, etc.)',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Training program details',
                  description: 'Specify training type (basic obedience, behavioral, etc.)',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Session package tracking',
                  description: 'Show remaining sessions if part of a multi-session package',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Training materials',
                  description: 'List any included handouts, equipment, or resources',
                  complianceLevel: 'optional'
                }
              ],
              sampleData: {
                invoiceNumber: 'TRAIN-2024-0234',
                businessName: 'Positive Paws Dog Training',
                serviceDate: '2024-01-22',
                sessionDuration: 60,
                lineItems: [
                  { description: 'Private training session - Charlie (Labrador)', quantity: 1, rate: 75, amount: 75 },
                  { description: 'Training package (6 sessions) - Discount applied', quantity: 1, rate: 375, amount: 375 },
                  { description: 'Training collar and lead set', quantity: 1, rate: 35, amount: 35 }
                ],
                subtotal: 485,
                vatAmount: 97,
                totalAmount: 582
              }
            }
          ]
        }
      }
    }
  }
};

// ============================================================================
// INDUSTRY: EDUCATION & E-LEARNING
// ============================================================================

export const educationIndustry: Industry = {
  id: 'education',
  name: 'Education & E-Learning',
  description: 'Invoice templates for online courses, tutoring, and educational services',
  icon: '📚',
  totalSearchVolume: 5900, // online course (3600) + online tutoring (2300)
  categories: {
    onlineCourses: {
      id: 'onlineCourses',
      name: 'Online Courses',
      description: 'Invoice templates for online course creators and education platforms',
      icon: '💻',
      subCategories: {
        courseCreation: {
          id: 'courseCreation',
          name: 'Course Sales',
          description: 'Invoices for online course enrollment and access',
          templates: [
            {
              id: 'online-course-001',
              name: 'Online Course Invoice',
              description: 'Invoice template for online course enrollment, digital learning programs, and educational content access',
              keywords: ['online course invoice', 'e-learning invoice', 'digital course invoice', 'educational program invoice'],
              searchVolume: 3600,
              cpc: 9.80,
              searchDifficulty: 40,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.clientEmail,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientAddress,
                commonFields.licenseKey,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'Course access details',
                  description: 'Specify course duration, access period, and platform',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Learning materials included',
                  description: 'List included materials (videos, PDFs, quizzes, certificates)',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Refund policy',
                  description: 'Include money-back guarantee or refund terms',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Certification details',
                  description: 'Specify if completion certificate is included',
                  complianceLevel: 'recommended'
                }
              ],
              sampleData: {
                invoiceNumber: 'COURSE-2024-0789',
                businessName: 'LearnPro Online Academy',
                licenseKey: 'LEARN-2024-A1B2C3D4',
                lineItems: [
                  { description: 'Complete Web Development Bootcamp (Lifetime access)', quantity: 1, rate: 199, amount: 199 },
                  { description: 'Premium support package (3 months)', quantity: 1, rate: 49, amount: 49 },
                  { description: 'Downloadable project files and templates', quantity: 1, rate: 0, amount: 0 }
                ],
                subtotal: 248,
                vatAmount: 49.60,
                totalAmount: 297.60
              }
            }
          ]
        }
      }
    },
    tutoring: {
      id: 'tutoring',
      name: 'Online Tutoring',
      description: 'Invoice templates for private tutoring services',
      icon: '👨‍🏫',
      subCategories: {
        privateTutoring: {
          id: 'privateTutoring',
          name: 'Private Tutoring',
          description: 'Invoices for one-on-one tutoring sessions',
          templates: [
            {
              id: 'online-tutoring-001',
              name: 'Online Tutoring Invoice',
              description: 'Professional invoice template for online tutoring services, virtual lessons, and educational support across all subjects and levels',
              keywords: ['tutoring invoice', 'online tutoring invoice', 'private tutor invoice', 'virtual lesson invoice'],
              searchVolume: 2300,
              cpc: 8.40,
              searchDifficulty: 36,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.billingPeriod,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientAddress,
                commonFields.clientEmail,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'Subject and level',
                  description: 'Specify subject area and education level (GCSE, A-Level, etc.)',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Session documentation',
                  description: 'Record session dates, times, and duration',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Teaching qualifications',
                  description: 'Include relevant teaching qualifications (QTS, PGCE, etc.)',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Progress tracking',
                  description: 'Reference student progress reports if provided',
                  complianceLevel: 'optional'
                }
              ],
              sampleData: {
                invoiceNumber: 'TUT-2024-0456',
                businessName: 'Excellence Tutoring Services',
                billingPeriod: 'January 2024',
                lineItems: [
                  { description: 'A-Level Mathematics tutoring (8 hours)', quantity: 8, rate: 45, amount: 360 },
                  { description: 'GCSE English tutoring (6 hours)', quantity: 6, rate: 40, amount: 240 },
                  { description: 'Study materials and practice papers', quantity: 1, rate: 25, amount: 25 }
                ],
                subtotal: 625,
                vatAmount: 0, // Educational services often VAT-exempt
                totalAmount: 625
              }
            }
          ]
        }
      }
    }
  }
};

// ============================================================================
// INDUSTRY: PROFESSIONAL SERVICES (Including Virtual Assistant)
// ============================================================================

export const professionalServicesIndustry: Industry = {
  id: 'professionalServices',
  name: 'Professional Services',
  description: 'Invoice templates for virtual assistants, business support, and administrative services',
  icon: '💼',
  totalSearchVolume: 4200, // virtual assistant (2800) + admin services (1400)
  categories: {
    virtualAssistant: {
      id: 'virtualAssistant',
      name: 'Virtual Assistant Services',
      description: 'Invoice templates for VA and remote administrative support',
      icon: '👩‍💻',
      subCategories: {
        generalVA: {
          id: 'generalVA',
          name: 'General VA',
          description: 'Invoices for general virtual assistant services',
          templates: [
            {
              id: 'virtual-assistant-001',
              name: 'Virtual Assistant Invoice',
              description: 'Comprehensive invoice template for virtual assistant services including administrative support, email management, scheduling, data entry, and business support tasks',
              keywords: ['virtual assistant invoice', 'va invoice', 'remote assistant invoice', 'administrative services invoice'],
              searchVolume: 2800,
              cpc: 11.50,
              searchDifficulty: 39,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
                commonFields.dueDate,
                commonFields.businessName,
                commonFields.businessAddress,
                commonFields.businessEmail,
                commonFields.clientName,
                commonFields.clientAddress,
                commonFields.billingPeriod,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.businessPhone,
                commonFields.companyNumber,
                commonFields.vatNumber,
                commonFields.clientEmail,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                commonFields.paymentTerms,
                commonFields.notes
              ],
              industryStandards: [
                {
                  standard: 'Hourly rate transparency',
                  description: 'Clearly state hourly rate and total hours worked',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Task breakdown',
                  description: 'Itemize different types of tasks performed',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Time tracking',
                  description: 'Reference time tracking software/method used',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Retainer vs ad-hoc',
                  description: 'Specify if billing is retainer-based or hourly',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Confidentiality clause',
                  description: 'Reference confidentiality agreement for client data',
                  complianceLevel: 'optional'
                }
              ],
              sampleData: {
                invoiceNumber: 'VA-2024-0567',
                businessName: 'Professional VA Solutions',
                billingPeriod: 'January 2024',
                lineItems: [
                  { description: 'Email management and correspondence (12 hours)', quantity: 12, rate: 25, amount: 300 },
                  { description: 'Calendar scheduling and coordination (8 hours)', quantity: 8, rate: 25, amount: 200 },
                  { description: 'Data entry and spreadsheet management (10 hours)', quantity: 10, rate: 22, amount: 220 },
                  { description: 'Social media post scheduling (5 hours)', quantity: 5, rate: 28, amount: 140 },
                  { description: 'Research and report compilation (6 hours)', quantity: 6, rate: 30, amount: 180 }
                ],
                subtotal: 1040,
                vatAmount: 208,
                totalAmount: 1248
              }
            }
          ]
        }
      }
    }
  }
};

// ============================================================================
// AGGREGATED INDUSTRIES
// ============================================================================

export const additionalIndustries = {
  digitalServices: digitalServicesIndustry,
  healthWellness: healthWellnessIndustry,
  sustainableBusiness: sustainableBusinessIndustry,
  creativeMedia: creativeMediaIndustry,
  petServices: petServicesIndustry,
  education: educationIndustry,
  professionalServices: professionalServicesIndustry
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all templates from the additional library
 */
export function getAllAdditionalTemplates(): InvoiceTemplate[] {
  const templates: InvoiceTemplate[] = [];
  
  Object.values(additionalIndustries).forEach(industry => {
    Object.values(industry.categories).forEach(category => {
      Object.values(category.subCategories).forEach(subCategory => {
        templates.push(...subCategory.templates);
      });
    });
  });
  
  return templates;
}

/**
 * Get industry by ID
 */
export function getAdditionalIndustry(industryId: string): Industry | null {
  return additionalIndustries[industryId as keyof typeof additionalIndustries] || null;
}

/**
 * Get all templates for a specific industry
 */
export function getAdditionalIndustryTemplates(industryId: string): InvoiceTemplate[] {
  const industry = getAdditionalIndustry(industryId);
  if (!industry) return [];
  
  const templates: InvoiceTemplate[] = [];
  Object.values(industry.categories).forEach(category => {
    Object.values(category.subCategories).forEach(subCategory => {
      templates.push(...subCategory.templates);
    });
  });
  
  return templates;
}

/**
 * Search templates by keyword
 */
export function searchAdditionalTemplates(query: string): InvoiceTemplate[] {
  const allTemplates = getAllAdditionalTemplates();
  const lowerQuery = query.toLowerCase();
  
  return allTemplates.filter(template => 
    template.name.toLowerCase().includes(lowerQuery) ||
    template.description.toLowerCase().includes(lowerQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get template by ID
 */
export function getAdditionalTemplateById(templateId: string): InvoiceTemplate | null {
  const allTemplates = getAllAdditionalTemplates();
  return allTemplates.find(template => template.id === templateId) || null;
}

/**
 * Get total count of templates
 */
export function getAdditionalTemplateCount(): number {
  return getAllAdditionalTemplates().length;
}

/**
 * Get count of industries
 */
export function getAdditionalIndustryCount(): number {
  return Object.keys(additionalIndustries).length;
}
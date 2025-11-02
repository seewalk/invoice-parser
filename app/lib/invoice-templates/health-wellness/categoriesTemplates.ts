import { InvoiceField, IndustryStandard } from '../../invoiceTemplateLibrary';

/**
 * Health & Wellness Invoice Templates
 * 
 * Comprehensive collection of invoice templates for health and wellness services including:
 * - Mental health counseling and teletherapy
 * - Life and career coaching
 * - Virtual fitness training
 * - Nutrition consulting and meal planning
 * 
 * Each template includes:
 * - Complete field definitions (required and optional)
 * - Industry-specific standards and compliance requirements
 * - Realistic sample data for testing and preview
 * - Business benefits and use cases for SEO
 * - Service types, certifications, and deliverables
 */

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
  requiredFields: InvoiceField[];
  optionalFields: InvoiceField[];
  industryStandards: IndustryStandard[];
  sampleData: Record<string, any>;
  industrySpecific: {
    serviceTypes: string[];
    certifications: string[];
    deliverables: string[];
  };
  businessBenefits: string[];
  useCases: string[];
}

export interface HealthWellnessCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: HealthWellnessTemplate[];
}

// Health & Wellness specific field definitions
export const healthWellnessFields = {
  sessionDuration: {
    fieldName: 'sessionDuration',
    label: 'Session Duration (minutes)',
    type: 'number' as const,
    required: true,
    placeholder: '60',
    helpText: 'Duration of therapy/coaching session in minutes'
  },
  billingPeriod: {
    fieldName: 'billingPeriod',
    label: 'Billing Period',
    type: 'text' as const,
    required: true,
    placeholder: 'January 2024',
    helpText: 'Billing period for recurring services or packages'
  },
  licenseNumber: {
    fieldName: 'licenseNumber',
    label: 'Professional License Number',
    type: 'text' as const,
    required: false,
    placeholder: 'LIC-123456',
    helpText: 'Professional license or registration number'
  },
  sessionType: {
    fieldName: 'sessionType',
    label: 'Session Type',
    type: 'text' as const,
    required: false,
    placeholder: 'Individual Therapy',
    helpText: 'Type of session (individual, couples, group, etc.)'
  },
  packageDetails: {
    fieldName: 'packageDetails',
    label: 'Package Details',
    type: 'textarea' as const,
    required: false,
    placeholder: '10-session package, 3 sessions remaining',
    helpText: 'Details about session packages or remaining sessions'
  }
};

// Common fields used across health & wellness templates
const commonFields = {
  invoiceNumber: {
    fieldName: 'invoiceNumber',
    label: 'Invoice Number',
    type: 'text' as const,
    required: true,
    placeholder: 'INV-001',
    helpText: 'Unique invoice identifier'
  },
  invoiceDate: {
    fieldName: 'invoiceDate',
    label: 'Invoice Date',
    type: 'date' as const,
    required: true,
    helpText: 'Date the invoice was issued'
  },
  dueDate: {
    fieldName: 'dueDate',
    label: 'Due Date',
    type: 'date' as const,
    required: true,
    helpText: 'Payment due date'
  },
  serviceDate: {
    fieldName: 'serviceDate',
    label: 'Service Date',
    type: 'date' as const,
    required: true,
    helpText: 'Date the service was provided'
  },
  businessName: {
    fieldName: 'businessName',
    label: 'Business Name',
    type: 'text' as const,
    required: true,
    placeholder: 'Your Practice Name',
    helpText: 'Name of your health/wellness practice'
  },
  businessAddress: {
    fieldName: 'businessAddress',
    label: 'Business Address',
    type: 'textarea' as const,
    required: true,
    placeholder: '123 Main Street\nCity, State ZIP',
    helpText: 'Your business address'
  },
  businessEmail: {
    fieldName: 'businessEmail',
    label: 'Business Email',
    type: 'email' as const,
    required: true,
    placeholder: 'practice@example.com',
    helpText: 'Your business email address'
  },
  businessPhone: {
    fieldName: 'businessPhone',
    label: 'Business Phone',
    type: 'phone' as const,
    required: false,
    placeholder: '(555) 123-4567',
    helpText: 'Your business phone number'
  },
  clientName: {
    fieldName: 'clientName',
    label: 'Client Name',
    type: 'text' as const,
    required: true,
    placeholder: 'Client Name',
    helpText: 'Name of the client receiving services'
  },
  clientAddress: {
    fieldName: 'clientAddress',
    label: 'Client Address',
    type: 'textarea' as const,
    required: false,
    placeholder: '456 Oak Avenue\nCity, State ZIP',
    helpText: 'Client address'
  },
  clientEmail: {
    fieldName: 'clientEmail',
    label: 'Client Email',
    type: 'email' as const,
    required: false,
    placeholder: 'client@example.com',
    helpText: 'Client email address'
  },
  lineItems: {
    fieldName: 'lineItems',
    label: 'Line Items',
    type: 'textarea' as const,
    required: true,
    helpText: 'Services and charges'
  },
  subtotal: {
    fieldName: 'subtotal',
    label: 'Subtotal',
    type: 'number' as const,
    required: true,
    helpText: 'Total before tax'
  },
  vatAmount: {
    fieldName: 'vatAmount',
    label: 'VAT Amount',
    type: 'number' as const,
    required: false,
    helpText: 'VAT/tax amount (many healthcare services are VAT-exempt)'
  },
  totalAmount: {
    fieldName: 'totalAmount',
    label: 'Total Amount',
    type: 'number' as const,
    required: true,
    helpText: 'Final amount due'
  },
  paymentTerms: {
    fieldName: 'paymentTerms',
    label: 'Payment Terms',
    type: 'textarea' as const,
    required: false,
    placeholder: 'Payment due within 14 days',
    helpText: 'Payment terms and conditions'
  },
  notes: {
    fieldName: 'notes',
    label: 'Notes',
    type: 'textarea' as const,
    required: false,
    placeholder: 'Additional notes or information',
    helpText: 'Any additional notes or instructions'
  },
  companyNumber: {
    fieldName: 'companyNumber',
    label: 'Company Registration Number',
    type: 'text' as const,
    required: false,
    placeholder: '12345678',
    helpText: 'Company registration number'
  },
  vatNumber: {
    fieldName: 'vatNumber',
    label: 'VAT Number',
    type: 'text' as const,
    required: false,
    placeholder: 'GB123456789',
    helpText: 'VAT registration number'
  },
  bankName: {
    fieldName: 'bankName',
    label: 'Bank Name',
    type: 'text' as const,
    required: false,
    placeholder: 'Bank Name',
    helpText: 'Name of your bank'
  },
  accountNumber: {
    fieldName: 'accountNumber',
    label: 'Account Number',
    type: 'text' as const,
    required: false,
    placeholder: '12345678',
    helpText: 'Bank account number'
  },
  sortCode: {
    fieldName: 'sortCode',
    label: 'Sort Code',
    type: 'text' as const,
    required: false,
    placeholder: '12-34-56',
    helpText: 'Bank sort code'
  }
};

// ============================================================================
// CATEGORY 1: Mental Health & Counseling
// ============================================================================

const mentalHealthCounselingCategory: HealthWellnessCategory = {
  id: 'mental-health-counseling',
  name: 'Mental Health & Counseling',
  description: 'Professional invoice templates for mental health services, teletherapy, and counseling',
  icon: '🧠',
  templates: [
    {
      id: 'teletherapy-invoice',
      categoryId: 'mental-health-counseling',
      categoryName: 'Mental Health & Counseling',
      name: 'Teletherapy Invoice Template',
      description: 'Professional invoice template for online therapy sessions, mental health counseling, and telepsychology services with HIPAA compliance',
      tier: 'free',
      searchVolume: 1800,
      cpc: 8.50,
      difficulty: 38,
      keywords: [
        'teletherapy invoice',
        'online therapy invoice',
        'counseling invoice',
        'telehealth invoice',
        'mental health invoice',
        'psychotherapy invoice',
        'virtual therapy billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'teletherapy-001',
      requiredFields: [
        commonFields.invoiceNumber,
        commonFields.invoiceDate,
        commonFields.dueDate,
        commonFields.businessName,
        commonFields.businessAddress,
        commonFields.businessEmail,
        commonFields.clientName,
        commonFields.serviceDate,
        healthWellnessFields.sessionDuration,
        commonFields.lineItems,
        commonFields.subtotal,
        commonFields.totalAmount
      ],
      optionalFields: [
        commonFields.businessPhone,
        healthWellnessFields.licenseNumber,
        healthWellnessFields.sessionType,
        healthWellnessFields.packageDetails,
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
          standard: 'HIPAA Compliance',
          description: 'Ensure invoice does not contain sensitive health information or diagnosis details. Only include service dates, durations, and general service descriptions.',
          complianceLevel: 'required'
        },
        {
          standard: 'Professional Credentials',
          description: 'Include therapist license number and credentials (LCSW, LMFT, PhD, PsyD, etc.) to demonstrate professional qualifications.',
          complianceLevel: 'required'
        },
        {
          standard: 'Session Documentation',
          description: 'Record session date, duration, and type (individual, couples, family, group therapy) for proper documentation and insurance purposes.',
          complianceLevel: 'required'
        },
        {
          standard: 'Cancellation Policy',
          description: 'Reference cancellation and no-show fee policy in invoice terms to set clear expectations and protect practice revenue.',
          complianceLevel: 'recommended'
        }
      ],
      sampleData: {
        invoiceNumber: 'TH-2024-0456',
        invoiceDate: '2024-01-15',
        dueDate: '2024-01-29',
        businessName: 'Dr. Sarah Johnson, Licensed Therapist',
        businessAddress: '123 Wellness Center\nSuite 200\nAustin, TX 78701',
        businessEmail: 'dr.johnson@mentalwellness.com',
        businessPhone: '(512) 555-0123',
        licenseNumber: 'LCSW-TX-12345',
        clientName: 'John Smith',
        clientEmail: 'john.smith@email.com',
        serviceDate: '2024-01-15',
        sessionDuration: 60,
        sessionType: 'Individual Therapy',
        lineItems: [
          {
            description: 'Individual therapy session (60 minutes) - Cognitive Behavioral Therapy',
            quantity: 1,
            rate: 120.00,
            amount: 120.00
          }
        ],
        subtotal: 120.00,
        vatAmount: 0.00, // Healthcare services often VAT-exempt
        totalAmount: 120.00,
        paymentTerms: 'Payment due within 14 days. Late cancellations (less than 24 hours notice) will be charged full session fee.',
        notes: 'Session conducted via secure HIPAA-compliant video platform. For insurance reimbursement, please submit this invoice to your provider with your client ID.'
      },
      industrySpecific: {
        serviceTypes: [
          'Individual Therapy',
          'Couples Counseling',
          'Family Therapy',
          'Group Therapy',
          'Crisis Intervention',
          'Psychiatric Evaluation',
          'Cognitive Behavioral Therapy (CBT)',
          'Dialectical Behavior Therapy (DBT)',
          'EMDR Therapy',
          'Addiction Counseling'
        ],
        certifications: [
          'Licensed Clinical Social Worker (LCSW)',
          'Licensed Marriage and Family Therapist (LMFT)',
          'Licensed Professional Counselor (LPC)',
          'Psychologist (PhD/PsyD)',
          'Psychiatrist (MD/DO)',
          'Certified Addiction Counselor (CAC)',
          'EMDR Certification',
          'DBT Training',
          'Trauma-Informed Care Certification'
        ],
        deliverables: [
          'Individual therapy sessions',
          'Couples counseling sessions',
          'Crisis intervention support',
          'Treatment plans and progress notes',
          'Insurance documentation',
          'Coping strategies worksheets',
          'Homework assignments',
          'Resource referrals',
          'Between-session email support',
          'Emergency crisis protocols'
        ]
      },
      businessBenefits: [
  'Teletherapy Billing Optimization: Streamlined invoicing for video counseling and online therapy sessions with session duration tracking',
  'HIPAA Compliance Built-In: Privacy-protected invoice template safeguards client confidentiality and reduces legal liability',
  'Licensed Credentials Display: Professional format showcases therapist qualifications (LMFT, LCSW, LPC, PsyD) building client trust',
  'Insurance Reimbursement Support: Clear documentation with CPT codes facilitates out-of-network insurance claims and superbills',
  'Multi-Session Pricing: Flexible billing for individual therapy, couples counseling, family sessions, and group therapy rates',
  'Cancellation Policy Protection: Built-in late cancellation and no-show fee references protect practice revenue',
  'Therapy Modality Tracking: Supports billing for CBT, DBT, EMDR, psychodynamic therapy, and specialized treatment approaches',
  'Session Documentation Accuracy: Easy tracking of 30-min, 45-min, and 60-min sessions ensures proper billing codes',
  'Professional Practice Image: Polished invoice format reflects high-quality mental health services and attracts premium clients',
  'Administrative Time Savings: Pre-formatted template reduces therapist paperwork burden, allowing more time for client care',
  'Dual Payment Workflows: Accommodates both private pay clients and insurance billing with customizable line items',
  'Cash Flow Improvement: Clear payment terms and session package pricing reduce late payments and billing disputes',
  'Insurance Code Integration: Customizable notes section for diagnosis codes (ICD-10), CPT codes, and prior authorization references'
],
      useCases: [
        'Licensed therapist billing clients for weekly individual therapy sessions',
        'Marriage counselor invoicing couples for relationship counseling',
        'Psychiatrist billing for medication management appointments',
        'Clinical social worker invoicing for trauma-focused therapy (EMDR)',
        'Addiction counselor billing for substance abuse treatment sessions',
        'Family therapist invoicing for multi-person family counseling',
        'Group therapy facilitator billing participants for weekly group sessions',
        'Crisis counselor invoicing for emergency intervention services',
        'Telepsychology provider billing for online psychological evaluations',
        'Mental health practice billing insurance companies for therapy services',
        'Behavioral health specialist invoicing for DBT skills training groups',
        'Child psychologist billing parents for play therapy sessions',
        'Grief counselor invoicing clients for bereavement support services',
        'Career counselor billing for vocational therapy and life transitions',
        'Eating disorder specialist invoicing for specialized treatment programs'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY 2: Life & Career Coaching
// ============================================================================

const lifeCareerCoachingCategory: HealthWellnessCategory = {
  id: 'life-career-coaching',
  name: 'Life & Career Coaching',
  description: 'Invoice templates for life coaching, career coaching, and personal development services',
  icon: '🎯',
  templates: [
    {
      id: 'life-coaching-invoice',
      categoryId: 'life-career-coaching',
      categoryName: 'Life & Career Coaching',
      name: 'Life Coaching Invoice Template',
      description: 'Invoice template for life coaching sessions, personal development programs, and coaching packages',
      tier: 'free',
      searchVolume: 2100,
      cpc: 11.20,
      difficulty: 35,
      keywords: [
        'life coaching invoice',
        'personal coaching invoice',
        'career coaching invoice',
        'executive coaching invoice',
        'wellness coaching invoice',
        'business coaching invoice',
        'coaching package invoice'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'life-coaching-001',
      requiredFields: [
        commonFields.invoiceNumber,
        commonFields.invoiceDate,
        commonFields.dueDate,
        commonFields.businessName,
        commonFields.businessAddress,
        commonFields.businessEmail,
        commonFields.clientName,
        commonFields.serviceDate,
        healthWellnessFields.sessionDuration,
        commonFields.lineItems,
        commonFields.subtotal,
        commonFields.totalAmount
      ],
      optionalFields: [
        commonFields.businessPhone,
        healthWellnessFields.packageDetails,
        healthWellnessFields.sessionType,
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
          standard: 'Coaching Agreement Reference',
          description: 'Reference coaching contract and program details to clarify service scope and client commitments.',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Session Package Tracking',
          description: 'Show remaining sessions if part of a package to keep clients informed of their investment and usage.',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Professional Certification',
          description: 'Include coaching certification (ICF, EMCC, AC, BCC, etc.) to demonstrate professional credentials and training.',
          complianceLevel: 'optional'
        },
        {
          standard: 'Goal Tracking Documentation',
          description: 'Reference client goals or program objectives to connect billing with value delivered.',
          complianceLevel: 'optional'
        }
      ],
      sampleData: {
        invoiceNumber: 'LC-2024-0234',
        invoiceDate: '2024-01-10',
        dueDate: '2024-01-24',
        businessName: 'Transform Life Coaching',
        businessAddress: '456 Success Boulevard\nSuite 300\nDenver, CO 80202',
        businessEmail: 'coach@transformlife.com',
        businessPhone: '(303) 555-0187',
        clientName: 'Emily Rodriguez',
        clientEmail: 'emily.rodriguez@email.com',
        serviceDate: '2024-01-10',
        sessionDuration: 90,
        sessionType: 'Life Coaching - Career Transition',
        packageDetails: '12-session premium package, 9 sessions remaining',
        lineItems: [
          {
            description: 'Life coaching session (90 minutes) - Career transition and goal setting',
            quantity: 1,
            rate: 180.00,
            amount: 180.00
          },
          {
            description: 'Goal-setting workbook and planning templates',
            quantity: 1,
            rate: 25.00,
            amount: 25.00
          }
        ],
        subtotal: 205.00,
        vatAmount: 41.00,
        totalAmount: 246.00,
        paymentTerms: 'Payment due within 14 days. Coaching packages are non-refundable but can be rescheduled with 48 hours notice.',
        notes: 'Thank you for your commitment to personal growth! Next session scheduled for January 17th. Action items and resources have been emailed separately.'
      },
      industrySpecific: {
        serviceTypes: [
          'Life Coaching',
          'Career Coaching',
          'Executive Coaching',
          'Leadership Coaching',
          'Business Coaching',
          'Health & Wellness Coaching',
          'Relationship Coaching',
          'Spiritual Coaching',
          'Performance Coaching',
          'Transition Coaching',
          'Retirement Coaching',
          'Financial Coaching'
        ],
        certifications: [
          'International Coach Federation (ICF) Certified',
          'European Mentoring & Coaching Council (EMCC)',
          'Association for Coaching (AC)',
          'Board Certified Coach (BCC)',
          'Certified Professional Co-Active Coach (CPCC)',
          'Certified Life Coach',
          'Executive Coach Certification',
          'NLP Practitioner',
          'Emotional Intelligence Coach'
        ],
        deliverables: [
          'One-on-one coaching sessions',
          'Goal setting and action planning',
          'Accountability check-ins',
          'Progress tracking and assessments',
          'Workbooks and templates',
          'Email support between sessions',
          'Resource recommendations',
          'Personalized coaching plan',
          'Vision board materials',
          'Success metrics dashboard',
          'Monthly progress reports'
        ]
      },
      businessBenefits: [
  'Professional Coaching Invoice: Polished billing for life coaching, personal development, and transformation programs builds client confidence',
  'Package Session Tracking: Clear visibility of remaining sessions in 6-week, 12-week, or annual packages maximizes client commitment',
  'Flexible Pricing Models: Supports hourly coaching, session bundles, monthly retainers, and VIP day billing structures',
  'Transformational Brand Image: Premium invoice format reflects high-value coaching services and justifies premium pricing',
  'ICF/EMCC Certification Display: Showcases International Coach Federation and EMCC credentials, establishing professional credibility',
  'Multi-Specialty Support: Accommodates life coaching, career coaching, executive coaching, wellness coaching, and business coaching rates',
  'Coaching Agreement Protection: Built-in contract references protect coach liability and clarify client expectations',
  'Resource Billing Capability: Separate line items for coaching sessions, workbooks, assessments, and online course materials',
  'Cash Flow Optimization: Clear payment terms and upfront package pricing reduce late payments and increase revenue predictability',
  'Administrative Efficiency: Pre-formatted template frees coaches to focus on client breakthroughs instead of paperwork',
  'Executive Client Attraction: Professional appearance appeals to C-suite executives and high-net-worth individuals seeking premium coaching',
  'Group Program Invoicing: Supports mastermind groups, group coaching programs, and corporate team coaching billing',
  'Tax Deduction Documentation: Itemized services help business clients claim coaching as professional development expense'
],
      useCases: [
        'Life coach billing client for weekly personal development sessions',
        'Career coach invoicing for job transition and career planning package',
        'Executive coach billing corporation for leadership development program',
        'Health coach invoicing for wellness transformation coaching package',
        'Business coach billing entrepreneur for startup strategy sessions',
        'Relationship coach invoicing couple for communication coaching program',
        'Retirement coach billing for life transition and purpose discovery sessions',
        'Performance coach invoicing athlete for mental performance training',
        'Spiritual coach billing for mindfulness and purpose-finding coaching',
        'Financial coach invoicing for money mindset and budgeting coaching',
        'Leadership coach billing manager for management skills development',
        'Transition coach invoicing client for major life change navigation',
        'Group coaching facilitator billing participants for mastermind program',
        'Corporate wellness coach invoicing company for employee coaching services',
        'Online coaching business billing international clients for virtual sessions'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY 3: Fitness & Training
// ============================================================================

const fitnessTrainingCategory: HealthWellnessCategory = {
  id: 'fitness-training',
  name: 'Fitness & Training',
  description: 'Invoice templates for personal training, virtual fitness classes, and workout programs',
  icon: '💪',
  templates: [
    {
      id: 'virtual-fitness-invoice',
      categoryId: 'fitness-training',
      categoryName: 'Fitness & Training',
      name: 'Virtual Fitness Training Invoice Template',
      description: 'Invoice template for online personal training, virtual fitness classes, and remote workout programs',
      tier: 'free',
      searchVolume: 1600,
      cpc: 7.90,
      difficulty: 32,
      keywords: [
        'fitness invoice',
        'personal training invoice',
        'virtual training invoice',
        'online fitness invoice',
        'gym invoice',
        'workout program invoice',
        'fitness coaching invoice'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'virtual-fitness-001',
      requiredFields: [
        commonFields.invoiceNumber,
        commonFields.invoiceDate,
        commonFields.dueDate,
        commonFields.businessName,
        commonFields.businessAddress,
        commonFields.businessEmail,
        commonFields.clientName,
        healthWellnessFields.billingPeriod,
        commonFields.lineItems,
        commonFields.subtotal,
        commonFields.totalAmount
      ],
      optionalFields: [
        commonFields.businessPhone,
        healthWellnessFields.packageDetails,
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
          standard: 'Fitness Professional Insurance',
          description: 'Reference professional indemnity and liability insurance to demonstrate client safety protections and professional standards.',
          complianceLevel: 'required'
        },
        {
          standard: 'Training Certifications',
          description: 'Include relevant fitness certifications (NASM, ACE, ACSM, ISSA, etc.) to establish professional credentials and expertise.',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Session Package Details',
          description: 'Specify number of sessions included in package and any expiration dates to manage client expectations.',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Cancellation and Rescheduling Policy',
          description: 'Outline session cancellation policy and rescheduling procedures to protect trainer time and revenue.',
          complianceLevel: 'recommended'
        }
      ],
      sampleData: {
        invoiceNumber: 'FIT-2024-0567',
        invoiceDate: '2024-01-25',
        dueDate: '2024-02-08',
        businessName: 'FitOnline Personal Training',
        businessAddress: '789 Fitness Plaza\nSuite 150\nMiami, FL 33101',
        businessEmail: 'trainer@fitonlinept.com',
        businessPhone: '(305) 555-0199',
        clientName: 'Michael Chen',
        clientEmail: 'michael.chen@email.com',
        billingPeriod: 'January 2024',
        packageDetails: 'Premium monthly package - 12 virtual training sessions',
        lineItems: [
          {
            description: 'Monthly training package (12 live virtual sessions, 50 minutes each)',
            quantity: 1,
            rate: 480.00,
            amount: 480.00
          },
          {
            description: 'Personalized meal plan and nutrition guidance',
            quantity: 1,
            rate: 80.00,
            amount: 80.00
          },
          {
            description: 'Progress tracking app access with workout library',
            quantity: 1,
            rate: 20.00,
            amount: 20.00
          }
        ],
        subtotal: 580.00,
        vatAmount: 116.00,
        totalAmount: 696.00,
        paymentTerms: 'Payment due within 14 days. Packages are valid for 60 days from purchase date. Sessions must be scheduled at least 24 hours in advance.',
        notes: 'Certified Personal Trainer (NASM-CPT), Nutrition Coach. Great progress this month - you completed all 12 sessions and increased your strength by 15%! Keep up the amazing work!'
      },
      industrySpecific: {
        serviceTypes: [
          'Virtual Personal Training',
          'Online Fitness Classes',
          'Strength Training Programs',
          'HIIT Workouts',
          'Yoga & Flexibility Training',
          'Cardio Training',
          'Sports-Specific Training',
          'Weight Loss Programs',
          'Muscle Building Programs',
          'Senior Fitness',
          'Postnatal Fitness',
          'Group Fitness Classes'
        ],
        certifications: [
          'NASM Certified Personal Trainer (CPT)',
          'ACE Personal Trainer',
          'ACSM Certified Exercise Physiologist',
          'ISSA Personal Trainer',
          'Certified Strength and Conditioning Specialist (CSCS)',
          'Registered Yoga Teacher (RYT)',
          'Precision Nutrition Coach',
          'TRX Certified Trainer',
          'CrossFit Level 1 Trainer',
          'Specialized Senior Fitness',
          'Pre/Postnatal Fitness Specialist'
        ],
        deliverables: [
          'Live virtual training sessions',
          'Personalized workout programs',
          'Nutrition guidance and meal plans',
          'Progress tracking and assessments',
          'Exercise demonstration videos',
          'Workout library access',
          'Fitness app access',
          'Form checks and technique coaching',
          'Accountability check-ins',
          'Monthly progress reports',
          'Equipment recommendations',
          'Injury prevention guidance'
        ]
      },
      businessBenefits: [
  'Virtual Fitness Billing: Streamlined invoicing for online personal training, video coaching sessions, and app-based workout programs',
  'Package Sale Conversion: Clear 4-week, 8-week, and 12-week program structure increases client commitment and upfront revenue',
  'Multi-Service Billing: Separate line items for PT sessions, custom meal plans, macro coaching, and fitness app subscriptions',
  'Results-Driven Branding: Professional invoice format reflects dedication to client transformation and fitness goals',
  'Certification Credibility: Displays NASM, ACE, ISSA, ACSM qualifications, establishing expertise and justifying premium rates',
  'Training Specialty Support: Accommodates HIIT training, strength coaching, yoga instruction, cardio programs, and hybrid fitness billing',
  'Session Progress Tracking: Built-in package tracking motivates clients by showing completed sessions and remaining workouts',
  'Flexible Payment Options: Supports pay-per-session, monthly recurring packages, and quarterly fitness program billing',
  'Cash Flow Stability: Clear payment terms and upfront package pricing reduce late payments and improve revenue predictability',
  'Client Focus Time: Pre-formatted template reduces admin work, allowing trainers to spend more time coaching and programming',
  'Premium Client Attraction: Polished appearance appeals to committed fitness clients willing to invest in serious results',
  'Group Training Revenue: Supports small group training, bootcamp classes, and online group coaching program invoicing',
  'Tax Documentation: Itemized fitness income tracking simplifies self-employment taxes and quarterly estimated payments'
],
      useCases: [
        'Virtual personal trainer billing client for monthly training package',
        'Online fitness coach invoicing for customized workout program',
        'Yoga instructor billing for virtual yoga class subscription',
        'Strength coach invoicing for specialized powerlifting program',
        'HIIT instructor billing for high-intensity virtual training sessions',
        'Nutrition coach invoicing for combined fitness and meal planning services',
        'Sports performance coach billing athlete for sport-specific training',
        'Senior fitness specialist invoicing for age-appropriate exercise program',
        'Postnatal trainer billing new mother for postpartum fitness recovery',
        'Group fitness instructor invoicing participants for virtual bootcamp',
        'Marathon coach billing runner for race preparation training program',
        'Corporate wellness trainer invoicing company for employee fitness classes',
        'Rehabilitation specialist billing for post-injury fitness recovery program',
        'Weight loss coach invoicing for comprehensive transformation package',
        'CrossFit trainer billing for virtual WOD coaching and programming'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY 4: Nutrition Services
// ============================================================================

const nutritionServicesCategory: HealthWellnessCategory = {
  id: 'nutrition-services',
  name: 'Nutrition Services',
  description: 'Invoice templates for nutritionist consultations, meal planning, and dietary assessment services',
  icon: '🥗',
  templates: [
    {
      id: 'nutritionist-invoice',
      categoryId: 'nutrition-services',
      categoryName: 'Nutrition Services',
      name: 'Nutritionist Consultation Invoice Tempalate',
      description: 'Professional invoice template for nutritionist consultations, meal planning services, and dietary assessments',
      tier: 'free',
      searchVolume: 900,
      cpc: 9.30,
      difficulty: 34,
      keywords: [
        'nutritionist invoice',
        'dietitian invoice',
        'nutrition consultation invoice',
        'meal planning invoice',
        'nutrition coach invoice',
        'dietary assessment invoice'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'nutritionist-001',
      requiredFields: [
        commonFields.invoiceNumber,
        commonFields.invoiceDate,
        commonFields.dueDate,
        commonFields.businessName,
        commonFields.businessAddress,
        commonFields.businessEmail,
        commonFields.clientName,
        commonFields.serviceDate,
        healthWellnessFields.sessionDuration,
        commonFields.lineItems,
        commonFields.subtotal,
        commonFields.totalAmount
      ],
      optionalFields: [
        commonFields.businessPhone,
        healthWellnessFields.licenseNumber,
        healthWellnessFields.packageDetails,
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
          standard: 'Professional Registration',
          description: 'Include registration with professional body (AfN, BDA, AND, CDR, etc.) to demonstrate qualified nutritionist or registered dietitian status.',
          complianceLevel: 'required'
        },
        {
          standard: 'Confidentiality Notice',
          description: 'Reference privacy of health and dietary information to comply with healthcare privacy standards and build client trust.',
          complianceLevel: 'required'
        },
        {
          standard: 'Service Deliverables',
          description: 'Specify consultation type and materials provided (meal plans, food logs, supplements, etc.) for clear service documentation.',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Follow-up Protocol',
          description: 'Outline follow-up consultation schedule and ongoing support to manage client expectations and ensure continuity of care.',
          complianceLevel: 'recommended'
        }
      ],
      sampleData: {
        invoiceNumber: 'NUT-2024-0123',
        invoiceDate: '2024-01-12',
        dueDate: '2024-01-26',
        businessName: 'Healthy Living Nutrition',
        businessAddress: '321 Wellness Avenue\nSuite 400\nPortland, OR 97201',
        businessEmail: 'info@healthylivingnutrition.com',
        businessPhone: '(503) 555-0144',
        licenseNumber: 'RD-OR-98765',
        clientName: 'Jessica Williams',
        clientEmail: 'jessica.williams@email.com',
        serviceDate: '2024-01-12',
        sessionDuration: 60,
        packageDetails: 'Initial consultation + 3 follow-up sessions (package)',
        lineItems: [
          {
            description: 'Initial nutrition consultation and dietary assessment (60 minutes)',
            quantity: 1,
            rate: 95.00,
            amount: 95.00
          },
          {
            description: 'Personalized meal plan with recipes (7 days)',
            quantity: 1,
            rate: 65.00,
            amount: 65.00
          },
          {
            description: 'Nutrition guide booklet and food tracking templates',
            quantity: 1,
            rate: 20.00,
            amount: 20.00
          }
        ],
        subtotal: 180.00,
        vatAmount: 0.00, // Healthcare services often VAT-exempt
        totalAmount: 180.00,
        paymentTerms: 'Payment due within 14 days. Follow-up consultations to be scheduled monthly. Package valid for 6 months.',
        notes: 'Registered Dietitian (RD), Certified Nutrition Specialist (CNS). Your personalized meal plan has been emailed separately. Please keep your 3-day food log before our next appointment on February 9th.'
      },
      industrySpecific: {
        serviceTypes: [
          'Nutrition Consultations',
          'Dietary Assessments',
          'Meal Planning Services',
          'Weight Management Programs',
          'Sports Nutrition',
          'Medical Nutrition Therapy',
          'Pediatric Nutrition',
          'Prenatal Nutrition',
          'Diabetes Management',
          'Food Allergy Consultations',
          'Gut Health Programs',
          'Plant-Based Nutrition Coaching'
        ],
        certifications: [
          'Registered Dietitian (RD)',
          'Registered Dietitian Nutritionist (RDN)',
          'Certified Nutrition Specialist (CNS)',
          'Licensed Dietitian Nutritionist',
          'Certified Specialist in Sports Dietetics (CSSD)',
          'Certified Diabetes Care and Education Specialist (CDCES)',
          'Board Certified Specialist in Pediatric Nutrition',
          'Certified Intuitive Eating Counselor',
          'Plant-Based Nutrition Certificate'
        ],
        deliverables: [
          'Comprehensive nutrition assessments',
          'Personalized meal plans',
          'Recipe collections',
          'Food tracking templates',
          'Nutrition education materials',
          'Supplement recommendations',
          'Grocery shopping lists',
          'Restaurant dining guides',
          'Progress tracking tools',
          'Follow-up consultation reports',
          'Lifestyle modification strategies',
          'Nutrition coaching support'
        ]
      },
      businessBenefits: [
  'Professional RD/RDN Credentials: Displays registered dietitian qualifications, building immediate client trust and credibility',
  'Insurance Documentation: Clear service breakdown supports insurance claims and healthcare reimbursement processing',
  'Flexible Pricing Models: Supports hourly consultations, meal plan packages, and ongoing nutrition programs with transparent billing',
  'Evidence-Based Positioning: Professional invoice format reflects commitment to science-backed nutrition counseling',
  'Healthcare Privacy Compliance: Built-in HIPAA confidentiality references protect client health information and reduce liability',
  'Specialty Nutrition Services: Accommodates sports nutrition, medical nutrition therapy, pediatric nutrition, and weight management billing',
  'FSA/HSA Reimbursement: Detailed line items facilitate Flexible Spending Account and Health Savings Account claims',
  'Customizable Service Breakdown: Separate billing for consultations, meal plans, grocery guides, and follow-up sessions',
  'Improved Cash Flow: Clear payment terms and package pricing reduce late payments and billing confusion',
  'Time-Saving Automation: Pre-formatted template allows nutritionists to focus on client care instead of administrative tasks',
  'Premium Client Attraction: Polished appearance appeals to health-conscious clients willing to invest in nutrition services',
  'Program Package Billing: Supports 4-week, 12-week, and ongoing wellness program invoicing with milestone tracking',
  'Tax Deduction Documentation: Itemized services help clients claim medical expense deductions for qualified nutrition therapy'
],
      useCases: [
        'Registered dietitian billing client for initial nutrition consultation',
        'Nutritionist invoicing for personalized meal planning services',
        'Sports nutritionist billing athlete for performance nutrition program',
        'Diabetes educator invoicing for medical nutrition therapy sessions',
        'Pediatric nutritionist billing parents for child nutrition consultation',
        'Weight loss specialist invoicing for comprehensive weight management program',
        'Plant-based nutrition coach billing for vegan meal planning services',
        'Prenatal nutritionist invoicing expectant mother for pregnancy nutrition',
        'Gut health specialist billing for digestive wellness consultation',
        'Food allergy specialist invoicing for elimination diet planning',
        'Corporate wellness nutritionist billing company for employee consultations',
        'Eating disorder nutritionist invoicing for recovery nutrition support',
        'Holistic nutritionist billing for functional nutrition consultation',
        'Senior nutrition specialist invoicing for age-appropriate dietary guidance',
        'Online nutrition coach billing international clients for virtual consultations'
      ]
    }
  ]
};

// ============================================================================
// EXPORTS
// ============================================================================

export const healthWellnessCategories: HealthWellnessCategory[] = [
  mentalHealthCounselingCategory,
  lifeCareerCoachingCategory,
  fitnessTrainingCategory,
  nutritionServicesCategory
];

// Helper function to get all templates across categories
export function getAllHealthWellnessTemplates(): HealthWellnessTemplate[] {
  return healthWellnessCategories.flatMap(category => category.templates);
}

// Helper function to get template by ID
export function getHealthWellnessTemplateById(id: string): HealthWellnessTemplate | undefined {
  return getAllHealthWellnessTemplates().find(template => template.id === id);
}

// Helper function to get templates by category
export function getHealthWellnessTemplatesByCategory(categoryId: string): HealthWellnessTemplate[] {
  const category = healthWellnessCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

// Helper function to get category by ID
export function getHealthWellnessCategoryById(id: string): HealthWellnessCategory | undefined {
  return healthWellnessCategories.find(category => category.id === id);
}

// Helper function to search templates by keyword
export function searchHealthWellnessTemplates(keyword: string): HealthWellnessTemplate[] {
  const lowerKeyword = keyword.toLowerCase();
  return getAllHealthWellnessTemplates().filter(template =>
    template.name.toLowerCase().includes(lowerKeyword) ||
    template.description.toLowerCase().includes(lowerKeyword) ||
    template.keywords.some(k => k.toLowerCase().includes(lowerKeyword))
  );
}

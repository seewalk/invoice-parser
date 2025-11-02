import { InvoiceField, IndustryStandard } from '../../invoiceTemplateLibrary';

/**
 * Healthcare & Medical Invoice Templates
 * 
 * Comprehensive collection of invoice templates for healthcare and medical services including:
 * - Locum GP and doctor services
 * - Medical practitioners and consultants
 * - NHS and private healthcare billing
 * 
 * Each template includes:
 * - Complete field definitions (required and optional)
 * - Industry-specific standards and compliance requirements (GMC, NHS, medical indemnity)
 * - Realistic sample data for testing and preview
 * - Business benefits and use cases for SEO
 * - Service types, certifications, and deliverables
 */

export interface HealthcareMedicalTemplate {
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

export interface HealthcareMedicalCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: HealthcareMedicalTemplate[];
}

// Healthcare & Medical specific field definitions
export const healthcareMedicalFields = {
  gmcNumber: {
    fieldName: 'gmcNumber',
    label: 'GMC Registration Number',
    type: 'text' as const,
    required: true,
    placeholder: '1234567',
    helpText: 'General Medical Council registration number'
  },
  performersListNumber: {
    fieldName: 'performanceNumber',
    label: 'NHS Performers List Number',
    type: 'text' as const,
    required: false,
    placeholder: 'NHS-GP-123456',
    helpText: 'NHS Performers List reference number'
  },
  nationalInsurance: {
    fieldName: 'nationalInsurance',
    label: 'National Insurance Number',
    type: 'text' as const,
    required: false,
    placeholder: 'AB 12 34 56 C',
    helpText: 'Your NI number for payroll purposes'
  },
  indemnityProvider: {
    fieldName: 'indemnityProvider',
    label: 'Medical Indemnity Provider',
    type: 'text' as const,
    required: false,
    placeholder: 'MDU / MPS / MDDUS',
    helpText: 'Your medical indemnity insurance organization'
  },
  indemnityNumber: {
    fieldName: 'indemnityNumber',
    label: 'Indemnity Membership Number',
    type: 'text' as const,
    required: false,
    placeholder: 'MDU-123456',
    helpText: 'Medical indemnity membership reference'
  },
  sessionsWorked: {
    fieldName: 'sessionsWorked',
    label: 'Total Sessions Worked',
    type: 'number' as const,
    required: false,
    placeholder: '8',
    helpText: 'Number of clinical sessions completed'
  },
  sessionRate: {
    fieldName: 'sessionRate',
    label: 'Session Rate',
    type: 'number' as const,
    required: false,
    placeholder: '550',
    helpText: 'Rate per clinical session'
  },
  mileageAllowance: {
    fieldName: 'mileageAllowance',
    label: 'Mileage Allowance',
    type: 'number' as const,
    required: false,
    placeholder: '108.00',
    helpText: 'Travel expenses at HMRC rates'
  },
  mileage: {
    fieldName: 'mileage',
    label: 'Miles Travelled',
    type: 'number' as const,
    required: false,
    placeholder: '240',
    helpText: 'Total miles claimed for reimbursement'
  },
  periodStart: {
    fieldName: 'periodStart',
    label: 'Period Start Date',
    type: 'date' as const,
    required: false,
    helpText: 'Start date of work period'
  },
  periodEnd: {
    fieldName: 'periodEnd',
    label: 'Period End Date',
    type: 'date' as const,
    required: false,
    helpText: 'End date of work period'
  }
};

// Common fields used across healthcare & medical templates
const commonFields = {
  invoiceNumber: {
    fieldName: 'invoiceNumber',
    label: 'Invoice Number',
    type: 'text' as const,
    required: true,
    placeholder: 'LOC-2024-001',
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
  practitionerName: {
    fieldName: 'practitionerName',
    label: 'Practitioner Name (Dr.)',
    type: 'text' as const,
    required: true,
    placeholder: 'Dr. Sarah Jones',
    helpText: 'Full name with medical title'
  },
  businessAddress: {
    fieldName: 'businessAddress',
    label: 'Your Address',
    type: 'textarea' as const,
    required: true,
    placeholder: '12 Medical Gardens\nLondon, NW3 5AB',
    helpText: 'Your correspondence address'
  },
  businessEmail: {
    fieldName: 'businessEmail',
    label: 'Your Email',
    type: 'email' as const,
    required: true,
    placeholder: 'dr.jones@medicmail.com',
    helpText: 'Your contact email address'
  },
  businessPhone: {
    fieldName: 'businessPhone',
    label: 'Your Phone',
    type: 'phone' as const,
    required: true,
    placeholder: '+44 7700 123456',
    helpText: 'Your contact phone number'
  },
  clientName: {
    fieldName: 'clientName',
    label: 'Practice/Organization Name',
    type: 'text' as const,
    required: true,
    placeholder: 'Greenway Medical Practice',
    helpText: 'GP surgery, hospital, or healthcare organization name'
  },
  clientAddress: {
    fieldName: 'clientAddress',
    label: 'Practice/Organization Address',
    type: 'textarea' as const,
    required: true,
    placeholder: '45 High Street\nReading, RG1 2AB',
    helpText: 'Billing address of practice or organization'
  },
  clientEmail: {
    fieldName: 'clientEmail',
    label: 'Practice Email',
    type: 'email' as const,
    required: false,
    placeholder: 'admin@practice.nhs.uk',
    helpText: 'Practice contact email'
  },
  lineItems: {
    fieldName: 'lineItems',
    label: 'Services Provided',
    type: 'textarea' as const,
    required: true,
    helpText: 'Clinical sessions worked and dates'
  },
  subtotal: {
    fieldName: 'subtotal',
    label: 'Subtotal',
    type: 'number' as const,
    required: true,
    helpText: 'Total fees before VAT'
  },
  totalAmount: {
    fieldName: 'totalAmount',
    label: 'Total Amount',
    type: 'number' as const,
    required: true,
    helpText: 'Final amount due'
  },
  vatNumber: {
    fieldName: 'vatNumber',
    label: 'VAT Number',
    type: 'text' as const,
    required: false,
    placeholder: 'GB123456789',
    helpText: 'VAT registration (if applicable - most medical services are VAT exempt)'
  },
  bankName: {
    fieldName: 'bankName',
    label: 'Bank Name',
    type: 'text' as const,
    required: false,
    placeholder: 'HSBC Bank',
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
    placeholder: '40-12-34',
    helpText: 'Bank sort code'
  },
  paymentTerms: {
    fieldName: 'paymentTerms',
    label: 'Payment Terms',
    type: 'textarea' as const,
    required: false,
    placeholder: 'Payment due within 30 days by BACS',
    helpText: 'Payment terms and conditions'
  },
  notes: {
    fieldName: 'notes',
    label: 'Notes',
    type: 'textarea' as const,
    required: false,
    placeholder: 'Additional notes or information',
    helpText: 'Any additional notes or instructions'
  }
};

// ============================================================================
// CATEGORY 1: Medical Services
// ============================================================================

const medicalServicesCategory: HealthcareMedicalCategory = {
  id: 'medical-services',
  name: 'Medical Services',
  description: 'Professional invoice templates for doctors, GPs, locums, and medical practitioners',
  icon: '🏥',
  templates: [
    {
      id: 'locum-gp-invoice',
      categoryId: 'medical-services',
      categoryName: 'Medical Services',
      name: 'Locum GP Invoice Template',
      description: 'Professional invoice template for locum GP and medical practitioner services with GMC registration, NHS Performers List, and medical indemnity requirements',
      tier: 'free',
      searchVolume: 110,
      cpc: 3.76,
      difficulty: 48,
      keywords: [
        'locum invoice template',
        'locum gp invoice template',
        'medical invoice template',
        'doctor invoice',
        'gp invoice',
        'nhs locum invoice',
        'medical practitioner invoice'
      ],
      sourceFile: 'premiumTemplateLibrary.ts',
      sourceTemplateId: 'healthcare-locum-001',
      requiredFields: [
        commonFields.invoiceNumber,
        commonFields.invoiceDate,
        commonFields.dueDate,
        commonFields.practitionerName,
        healthcareMedicalFields.gmcNumber,
        commonFields.businessAddress,
        commonFields.businessEmail,
        commonFields.businessPhone,
        commonFields.clientName,
        commonFields.clientAddress,
        commonFields.lineItems,
        commonFields.subtotal,
        commonFields.totalAmount
      ],
      optionalFields: [
        commonFields.vatNumber,
        healthcareMedicalFields.nationalInsurance,
        healthcareMedicalFields.performersListNumber,
        healthcareMedicalFields.indemnityProvider,
        healthcareMedicalFields.indemnityNumber,
        healthcareMedicalFields.periodStart,
        healthcareMedicalFields.periodEnd,
        healthcareMedicalFields.sessionsWorked,
        healthcareMedicalFields.sessionRate,
        healthcareMedicalFields.mileageAllowance,
        healthcareMedicalFields.mileage,
        commonFields.clientEmail,
        commonFields.bankName,
        commonFields.accountNumber,
        commonFields.sortCode,
        commonFields.paymentTerms,
        commonFields.notes
      ],
      industryStandards: [
        {
          standard: 'GMC Registration',
          description: 'All practicing doctors in the UK must be registered with the General Medical Council (GMC) and hold a valid license to practice.',
          complianceLevel: 'required'
        },
        {
          standard: 'Medical Indemnity Insurance',
          description: 'Adequate medical indemnity insurance is mandatory for all doctors. Common providers include Medical Defence Union (MDU), Medical Protection Society (MPS), or Medical and Dental Defence Union of Scotland (MDDUS).',
          complianceLevel: 'required'
        },
        {
          standard: 'VAT Exemption',
          description: 'Most medical services provided by registered medical practitioners are VAT exempt under UK law. Ensure proper VAT treatment on invoices.',
          complianceLevel: 'required'
        },
        {
          standard: 'NHS Performers List',
          description: 'For NHS work, GPs and medical practitioners must be included on the NHS Performers List maintained by NHS England.',
          complianceLevel: 'required'
        }
      ],
      sampleData: {
        invoiceNumber: 'LOC-2024-0456',
        invoiceDate: '2024-10-31',
        dueDate: '2024-11-30',
        practitionerName: 'Dr. Sarah Mitchell',
        gmcNumber: '7654321',
        nationalInsurance: 'AB 12 34 56 C',
        performanceNumber: 'NHS-GP-789456',
        businessAddress: '12 Medical Gardens\nLondon, NW3 5AB',
        businessEmail: 'dr.s.mitchell@medicmail.com',
        businessPhone: '+44 7700 123456',
        indemnityProvider: 'Medical Defence Union (MDU)',
        indemnityNumber: 'MDU-123456',
        clientName: 'Riverside Medical Centre',
        clientAddress: '45 High Street\nReading, RG1 2AB',
        clientEmail: 'admin@riversidemedical.nhs.uk',
        periodStart: '2024-10-01',
        periodEnd: '2024-10-31',
        sessionsWorked: 12,
        sessionRate: 550.00,
        lineItems: [
          {
            description: 'AM Surgery Session - 01/10/2024',
            quantity: 1,
            rate: 550.00,
            amount: 550.00
          },
          {
            description: 'PM Surgery Session - 01/10/2024',
            quantity: 1,
            rate: 550.00,
            amount: 550.00
          },
          {
            description: 'AM Surgery Session - 08/10/2024',
            quantity: 1,
            rate: 550.00,
            amount: 550.00
          },
          {
            description: 'PM Surgery Session - 08/10/2024',
            quantity: 1,
            rate: 550.00,
            amount: 550.00
          },
          {
            description: 'AM Surgery Session - 15/10/2024',
            quantity: 1,
            rate: 550.00,
            amount: 550.00
          },
          {
            description: 'PM Surgery Session - 15/10/2024',
            quantity: 1,
            rate: 550.00,
            amount: 550.00
          },
          {
            description: 'AM Surgery Session - 22/10/2024',
            quantity: 1,
            rate: 550.00,
            amount: 550.00
          },
          {
            description: 'PM Surgery Session - 22/10/2024',
            quantity: 1,
            rate: 550.00,
            amount: 550.00
          },
          {
            description: 'AM Surgery Session - 29/10/2024',
            quantity: 1,
            rate: 550.00,
            amount: 550.00
          },
          {
            description: 'PM Surgery Session - 29/10/2024',
            quantity: 1,
            rate: 550.00,
            amount: 550.00
          },
          {
            description: 'Out-of-hours on-call - 12/10/2024',
            quantity: 1,
            rate: 550.00,
            amount: 550.00
          },
          {
            description: 'Out-of-hours on-call - 26/10/2024',
            quantity: 1,
            rate: 550.00,
            amount: 550.00
          },
          {
            description: 'Mileage allowance (240 miles @ £0.45/mile)',
            quantity: 240,
            rate: 0.45,
            amount: 108.00
          }
        ],
        mileage: 240,
        mileageAllowance: 108.00,
        subtotal: 6708.00,
        totalAmount: 6708.00,
        bankName: 'HSBC Bank',
        accountNumber: '12345678',
        sortCode: '40-12-34',
        paymentTerms: 'Payment due within 30 days by BACS transfer. VAT exempt - medical services.',
        notes: 'October 2024 locum sessions. GMC and indemnity insurance valid. All sessions completed as per agreement.'
      },
      industrySpecific: {
        serviceTypes: [
          'GP Surgery Sessions',
          'Locum GP Services',
          'Out-of-hours Medical Cover',
          'Emergency On-call Services',
          'Home Visits',
          'Telephone Consultations',
          'Minor Surgery Procedures',
          'Chronic Disease Management',
          'Vaccinations and Immunizations',
          'Health Assessments',
          'Travel Medicine Consultations',
          'Medical Certificates and Reports'
        ],
        certifications: [
          'GMC Registration (General Medical Council)',
          'MRCGP (Membership of Royal College of GPs)',
          'NHS Performers List',
          'Medical Indemnity Insurance (MDU/MPS/MDDUS)',
          'Advanced Life Support (ALS) Certification',
          'Safeguarding Training',
          'Infection Control Certification',
          'Medical Appraisal and Revalidation',
          'Enhanced DBS Check',
          'Professional Indemnity Insurance'
        ],
        deliverables: [
          'Clinical consultations and assessments',
          'Patient diagnosis and treatment plans',
          'Prescription services',
          'Medical procedures and interventions',
          'Patient records and documentation',
          'Referral letters to specialists',
          'Medical certificates and sick notes',
          'Vaccination and immunization services',
          'Health screening and assessments',
          'Chronic disease monitoring',
          'Emergency medical care',
          'Telephone triage and advice'
        ]
      },
      businessBenefits: [
  'Locum GP Specialization: Purpose-built invoice template for locum doctors, salaried GPs, and medical practitioners working temporary placements',
  'GMC Registration Compliance: Displays General Medical Council number and medical indemnity insurance details, meeting NHS and CQC requirements',
  'Session-Based Billing Accuracy: Precise tracking of AM surgery sessions, PM surgeries, on-call shifts, and home visits with per-session rates',
  'VAT-Exempt Medical Services: Built-in zero-rated VAT handling for NHS and private medical consultations, complying with HMRC regulations',
  'NHS Performers List Documentation: Includes Performers List number for NHS England contract work, ensuring payment processing eligibility',
  'HMRC Mileage Reimbursement: Automated 45p per mile tracking for first 10,000 miles, simplifying expense claims and tax deductions',
  'Dual Practice Standards: Professional format meets both NHS Payment Terms (30 days BACS) and private practice billing requirements',
  'Prompt Payment Protection: Clear 30-day payment terms with BACS details reduce late payments from practices and CCGs',
  'Multi-Session Support: Separate line items for routine surgeries, extended hours, Saturday clinics, minor surgery sessions, and emergency call-outs',
  'Professional Indemnity Transparency: Medical Defence Union (MDU) or Medical Protection Society (MPS) details demonstrate full cover compliance',
  'Contract Period Billing: Weekly or monthly invoicing periods with clear start/end dates align with locum agency agreements',
  'BACS Payment Efficiency: Bank details section (sort code, account number) enables fast electronic payment from NHS and private surgeries',
  'Clinical Session Confirmation: Professional notes section documents session completion, patient numbers seen, and ARRS (Additional Roles) compliance'
],
      useCases: [
        'Locum GP billing medical practice for monthly surgery sessions',
        'Medical practitioner invoicing NHS surgery for locum cover services',
        'Doctor billing private practice for clinical consultation sessions',
        'Locum GP invoicing for emergency out-of-hours on-call services',
        'Medical practitioner billing for weekend surgery cover',
        'GP invoicing practice for telephone consultation and triage services',
        'Locum doctor billing for home visit medical services',
        'Medical practitioner invoicing for vaccination clinic sessions',
        'GP billing for chronic disease management clinics',
        'Locum doctor invoicing for minor surgery procedures',
        'Medical practitioner billing practice for extended hours services',
        'GP invoicing for travel medicine and health assessment clinics',
        'Locum doctor billing for annual leave or sickness cover',
        'Medical practitioner invoicing multiple practices for sessional work',
        'GP billing for specialist services (e.g., dermatology, minor ops) at practice'
      ]
    }
  ]
};

// ============================================================================
// EXPORTS
// ============================================================================

export const healthcareMedicalCategories: HealthcareMedicalCategory[] = [
  medicalServicesCategory
];

// Helper function to get all templates across categories
export function getAllHealthcareMedicalTemplates(): HealthcareMedicalTemplate[] {
  return healthcareMedicalCategories.flatMap(category => category.templates);
}

// Helper function to get template by ID
export function getHealthcareMedicalTemplateById(id: string): HealthcareMedicalTemplate | undefined {
  return getAllHealthcareMedicalTemplates().find(template => template.id === id);
}

// Helper function to get templates by category
export function getHealthcareMedicalTemplatesByCategory(categoryId: string): HealthcareMedicalTemplate[] {
  const category = healthcareMedicalCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

// Helper function to get category by ID
export function getHealthcareMedicalCategoryById(id: string): HealthcareMedicalCategory | undefined {
  return healthcareMedicalCategories.find(category => category.id === id);
}

// Helper function to search templates by keyword
export function searchHealthcareMedicalTemplates(keyword: string): HealthcareMedicalTemplate[] {
  const lowerKeyword = keyword.toLowerCase();
  return getAllHealthcareMedicalTemplates().filter(template =>
    template.name.toLowerCase().includes(lowerKeyword) ||
    template.description.toLowerCase().includes(lowerKeyword) ||
    template.keywords.some(k => k.toLowerCase().includes(lowerKeyword))
  );
}
/**
 * Construction & Trades Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Construction industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 5 (3 free, 2 premium)
 * - Categories: 3 (General Construction, Electrical & Plumbing, Cleaning Services)
 * - Total Search Volume: 3,180/month
 * - Average CPC: $6.51
 * - SEO Difficulty: Medium (34.0)
 * 
 * This comprehensive construction invoice template collection positions us as the
 * definitive global resource for all construction and trades billing needs, covering
 * residential and commercial construction, electrical services, plumbing, and cleaning.
 * 
 * Industry-Specific Fields:
 * - CIS Rate & Deduction (Construction Industry Scheme)
 * - Materials & Labour Breakdown
 * - Retention Amount & Percentage
 * - Project Address & Description
 * - Gas Safe & NICEIC Registration Numbers
 * - Job Card Tracking
 * - VAT Reverse Charge
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';
import { InvoiceField, IndustryStandard } from '../../invoiceTemplateLibrary';

// ============================================================================
// CONSTRUCTION-SPECIFIC FIELDS
// ============================================================================

// Reusable construction field definitions for consistent field usage
export const constructionFields = {
  cisRate: {
    fieldName: 'cisRate',
    label: 'CIS Deduction Rate',
    type: 'text' as const,
    required: false,
    placeholder: '20%',
    helpText: 'Construction Industry Scheme deduction rate (0%, 20%, or 30%)'
  },
  cisDeduction: {
    fieldName: 'cisDeduction',
    label: 'CIS Deduction Amount',
    type: 'currency' as const,
    required: false,
    helpText: 'Calculated CIS deduction amount'
  },
  materialsBreakdown: {
    fieldName: 'materialsBreakdown',
    label: 'Materials Cost',
    type: 'currency' as const,
    required: false,
    helpText: 'Breakdown of materials cost (CIS applies to labour only)'
  },
  labourBreakdown: {
    fieldName: 'labourBreakdown',
    label: 'Labour Cost',
    type: 'currency' as const,
    required: false,
    helpText: 'Breakdown of labour cost (subject to CIS)'
  },
  retentionAmount: {
    fieldName: 'retentionAmount',
    label: 'Retention Amount',
    type: 'currency' as const,
    required: false,
    helpText: 'Amount held back (typically 5-10% until project completion)'
  },
  retentionPercentage: {
    fieldName: 'retentionPercentage',
    label: 'Retention Percentage',
    type: 'number' as const,
    required: false,
    placeholder: '5',
    helpText: 'Percentage of invoice held as retention'
  },
  projectAddress: {
    fieldName: 'projectAddress',
    label: 'Project Address',
    type: 'textarea' as const,
    required: false,
    placeholder: '12 Construction Site, London, SW1A 1AA',
    helpText: 'Address where construction work was performed'
  },
  projectDescription: {
    fieldName: 'projectDescription',
    label: 'Project Description',
    type: 'textarea' as const,
    required: false,
    placeholder: 'Kitchen Extension & Renovation',
    helpText: 'Brief description of construction project'
  },
  gasSafeNumber: {
    fieldName: 'gasSafeNumber',
    label: 'Gas Safe Registration Number',
    type: 'text' as const,
    required: false,
    placeholder: '123456',
    helpText: 'Required for gas work in UK'
  },
  niceicNumber: {
    fieldName: 'niceicNumber',
    label: 'NICEIC Certification Number',
    type: 'text' as const,
    required: false,
    placeholder: 'NICEIC12345',
    helpText: 'National Inspection Council for Electrical Installation Contracting'
  },
  jobCardNumber: {
    fieldName: 'jobCardNumber',
    label: 'Job Card Number',
    type: 'text' as const,
    required: false,
    placeholder: 'JOB-2024-001',
    helpText: 'Job or work order number'
  }
};

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ConstructionTemplate {
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
  // Template field definitions
  requiredFields?: InvoiceField[];
  optionalFields?: InvoiceField[];
  industryStandards?: IndustryStandard[];
  sampleData?: Record<string, any>;
  // Extended metadata for comprehensive SEO coverage
  industrySpecific: {
    serviceTypes: string[];
    complianceRequired: string[];
    targetAudience: string[];
  };
  businessBenefits: string[];
  useCases: string[];
}

export interface ConstructionCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: ConstructionTemplate[];
  seoMetadata: {
    primaryKeywords: string[];
    secondaryKeywords: string[];
    longTailKeywords: string[];
  };
}

// ============================================================================
// CATEGORY: GENERAL CONSTRUCTION
// ============================================================================

export const generalConstruction: ConstructionCategory = {
  id: 'general-construction',
  name: 'General Construction',
  description: 'Professional invoice templates for general contractors, builders, and construction companies handling residential and commercial projects',
  icon: '🏗️',
  seoMetadata: {
    primaryKeywords: [
      'construction invoice template',
      'builder invoice',
      'building work invoice'
    ],
    secondaryKeywords: [
      'residential construction invoice',
      'commercial construction invoice',
      'contractor invoice',
      'cis invoice template'
    ],
    longTailKeywords: [
      'construction invoice template with cis deduction',
      'builder invoice template uk free',
      'residential construction invoice with retention'
    ]
  },
  templates: [
    {
      id: 'construct-res-001',
      categoryId: 'general-construction',
      categoryName: 'General Construction',
      name: 'Builder Invoice - Residential Template',
      description: 'Standard invoice for residential building and construction work including extensions, renovations, new builds, and home improvements with CIS support',
      tier: 'free',
      searchVolume: 590,
      cpc: 7.82,
      difficulty: 34,
      keywords: [
        'construction invoice',
        'builder invoice',
        'building work invoice',
        'residential construction invoice',
        'home builder invoice',
        'renovation invoice',
        'extension invoice',
        'building contractor invoice'
      ],
      sourceFile: 'construction/categoriesTemplates.ts',
      sourceTemplateId: 'construct-res-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'INV-2024-001', helpText: 'Unique invoice identifier' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date invoice issued' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text' as const, required: true, placeholder: 'Quality Builders Ltd', helpText: 'Your construction company name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea' as const, required: true, helpText: 'Your business registered address' },
        { fieldName: 'businessEmail', label: 'Email', type: 'email' as const, required: true, helpText: 'Business email' },
        { fieldName: 'clientName', label: 'Client Name', type: 'text' as const, required: true, helpText: 'Homeowner or client name' },
        { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: true, helpText: 'Client billing address' },
        { fieldName: 'lineItems', label: 'Line Items', type: 'textarea' as const, required: true, helpText: 'Work items, quantities, rates' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Total before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total due' }
      ],
      optionalFields: [
        { fieldName: 'businessPhone', label: 'Phone', type: 'phone' as const, required: false, helpText: 'Contact phone' },
        { fieldName: 'companyNumber', label: 'Company Number', type: 'text' as const, required: false, helpText: 'Companies House registration' },
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration' },
        { fieldName: 'vatAmount', label: 'VAT Amount', type: 'currency' as const, required: false, helpText: 'VAT at 20%' },
        constructionFields.projectAddress,
        constructionFields.projectDescription,
        constructionFields.materialsBreakdown,
        constructionFields.labourBreakdown,
        constructionFields.retentionAmount,
        constructionFields.retentionPercentage,
        { fieldName: 'workPeriod', label: 'Work Period', type: 'text' as const, required: false, placeholder: '1 Oct 2024 - 31 Oct 2024', helpText: 'Date range when work was performed' },
        { fieldName: 'depositPaid', label: 'Deposit Paid', type: 'currency' as const, required: false, helpText: 'Deposit already received' },
        { fieldName: 'balanceDue', label: 'Balance Due', type: 'currency' as const, required: false, helpText: 'Remaining balance' },
        { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, helpText: 'Payment terms and conditions' },
        { fieldName: 'bankName', label: 'Bank Name', type: 'text' as const, required: false, helpText: 'Bank for payment' },
        { fieldName: 'accountNumber', label: 'Account Number', type: 'text' as const, required: false, helpText: '8-digit account number' },
        { fieldName: 'sortCode', label: 'Sort Code', type: 'text' as const, required: false, helpText: 'Bank sort code' }
      ],
      industryStandards: [
        {
          standard: 'CIS Compliance',
          description: 'Construction Industry Scheme (CIS) tax deductions if applicable',
          complianceLevel: 'required' as const
        },
        {
          standard: 'Itemized Materials',
          description: 'Separate labor and materials costs for transparency',
          complianceLevel: 'recommended' as const
        },
        {
          standard: 'Insurance Details',
          description: 'Include public liability insurance information',
          complianceLevel: 'recommended' as const
        },
        {
          standard: 'Building Regulations',
          description: 'Reference Building Control approval where applicable',
          complianceLevel: 'recommended' as const
        }
      ],
      sampleData: {
        invoiceNumber: 'BUILD-2024-0892',
        invoiceDate: '2024-10-30',
        dueDate: '2024-11-13',
        businessName: 'Heritage Home Builders Ltd',
        businessAddress: '45 Construction Way, Manchester, M4 2AA',
        businessEmail: 'accounts@heritagebuilders.co.uk',
        businessPhone: '+44 161 123 4567',
        companyNumber: '09876543',
        vatNumber: 'GB 444 5555 66',
        clientName: 'Mr David Williams',
        clientAddress: '78 Homeowner Street, Manchester, M20 3BB',
        clientPhone: '+44 161 234 5678',
        clientEmail: 'd.williams@email.com',
        projectAddress: '78 Homeowner Street, Manchester, M20 3BB',
        projectDescription: 'Single Storey Rear Extension - Kitchen and Dining Area',
        workPeriod: '1 September 2024 - 30 September 2024',
        lineItems: [
          { description: 'Foundation & Groundwork - Excavation and concrete base', quantity: 1, rate: 3500.00, amount: 3500.00 },
          { description: 'Brickwork & Blockwork - External and internal walls', quantity: 1, rate: 4800.00, amount: 4800.00 },
          { description: 'Roofing - Flat roof with lantern and insulation', quantity: 1, rate: 3200.00, amount: 3200.00 },
          { description: 'Windows & Bi-Fold Doors - Supply and installation', quantity: 1, rate: 5400.00, amount: 5400.00 },
          { description: 'Plastering - Walls and ceiling skim finish', quantity: 1, rate: 1800.00, amount: 1800.00 },
          { description: 'Electrical Work - First fix and second fix complete', quantity: 1, rate: 2200.00, amount: 2200.00 },
          { description: 'Plumbing - Heating and water services', quantity: 1, rate: 1900.00, amount: 1900.00 },
          { description: 'Flooring - Underfloor heating and screed', quantity: 1, rate: 2400.00, amount: 2400.00 }
        ],
        materialsBreakdown: 12200.00,
        labourBreakdown: 13000.00,
        subtotal: 25200.00,
        vatAmount: 5040.00,
        totalAmount: 30240.00,
        depositPaid: 9000.00,
        retentionPercentage: 5,
        retentionAmount: 1512.00,
        balanceDue: 19728.00,
        paymentTerms: '30% deposit paid (£9,000). Progress payments made on completion of key stages. Final payment (including 5% retention of £1,512) due on project completion and Building Control sign-off.',
        bankName: 'NatWest Bank',
        accountNumber: '87654321',
        sortCode: '60-00-01',
        notes: 'Work completed as per quotation and approved plans. All materials meet British Standards. 10-year structural guarantee provided. Building Control certificates to follow within 14 days. Retention to be released upon final inspection and snagging completion.'
      },
      industrySpecific: {
        serviceTypes: [
          'Home Extensions',
          'Loft Conversions',
          'Kitchen Renovations',
          'Bathroom Renovations',
          'New Build Residential',
          'Garage Conversions',
          'Basement Conversions',
          'Structural Alterations',
          'General Building Work',
          'Property Maintenance'
        ],
        complianceRequired: [
          'Building Regulations Approval',
          'VAT Registration Display (if applicable)',
          'CIS Registration (for subcontractors)',
          'Public Liability Insurance (minimum £5 million)',
          'Employer\'s Liability Insurance',
          'Planning Permission (where required)',
          'Party Wall Agreement (if applicable)'
        ],
        targetAudience: [
          'Residential Homeowners',
          'Property Developers',
          'Landlords',
          'Estate Agents',
          'Project Managers',
          'Architects',
          'Self-Build Clients'
        ]
      },
      businessBenefits: [
        'CIS Compliance: Clear separation of materials and labour for CIS deduction purposes',
        'Professional Image: Detailed breakdown demonstrates organized approach to billing',
        'Payment Tracking: Stage payment and deposit tracking improves cash flow',
        'Retention Management: Built-in retention percentage tracking for project completion',
        'Audit Trail: Complete documentation for HMRC and company records',
        'Dispute Prevention: Itemized work prevents disagreements about scope and cost',
        'Building Control: Space for referencing approvals and certificates',
        'Insurance Ready: Format suitable for insurance and warranty claims',
        'VAT Management: Correct VAT calculation and display for compliance',
        'Client Trust: Transparent pricing builds confidence with homeowners'
      ],
      useCases: [
        'Single storey rear or side extensions',
        'Two storey home extensions',
        'Loft conversions and dormer extensions',
        'Kitchen and bathroom complete renovations',
        'Garage conversions to living space',
        'Basement conversions and excavations',
        'Internal structural wall removal',
        'New build residential properties',
        'House refurbishment and modernization',
        'Conservatory and orangery construction',
        'Porch and entrance way additions',
        'Property maintenance and repairs'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY: ELECTRICAL & PLUMBING
// ============================================================================

export const electricalPlumbing: ConstructionCategory = {
  id: 'electrical-plumbing',
  name: 'Electrical & Plumbing Services',
  description: 'Invoice templates for electricians, plumbers, Gas Safe engineers, and NICEIC registered professionals',
  icon: '⚡',
  seoMetadata: {
    primaryKeywords: [
      'electrical invoice',
      'electrician invoice',
      'plumbing invoice'
    ],
    secondaryKeywords: [
      'electrical work invoice',
      'plumber invoice template',
      'gas safe invoice',
      'niceic invoice'
    ],
    longTailKeywords: [
      'electrician invoice template uk free',
      'plumber invoice with gas safe number',
      'electrical installation invoice with certification'
    ]
  },
  templates: [
    {
      id: 'electric-001',
      categoryId: 'electrical-plumbing',
      categoryName: 'Electrical Services',
      name: 'Electrician Invoice Template',
      description: 'Invoice for electrical installation, testing, and certification with NICEIC registration, Part P compliance, and electrical safety certificates',
      tier: 'free',
      searchVolume: 110,
      cpc: 9.94,
      difficulty: 22,
      keywords: [
        'electrical invoice',
        'electrician invoice',
        'electrical work invoice',
        'electrical installation invoice',
        'niceic invoice',
        'electrical testing invoice',
        'part p invoice'
      ],
      sourceFile: 'construction/categoriesTemplates.ts',
      sourceTemplateId: 'electric-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'INV-2024-001', helpText: 'Invoice reference' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date of invoice' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text' as const, required: true, helpText: 'Your electrical business name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
        { fieldName: 'businessEmail', label: 'Email', type: 'email' as const, required: true, helpText: 'Contact email' },
        { fieldName: 'clientName', label: 'Customer Name', type: 'text' as const, required: true, helpText: 'Customer name' },
        { fieldName: 'clientAddress', label: 'Customer Address', type: 'textarea' as const, required: true, helpText: 'Customer address' },
        { fieldName: 'lineItems', label: 'Work Completed', type: 'textarea' as const, required: true, helpText: 'Electrical work and parts' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Total before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total due' }
      ],
      optionalFields: [
        { fieldName: 'businessPhone', label: 'Phone', type: 'phone' as const, required: false, helpText: 'Contact phone' },
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration' },
        { fieldName: 'vatAmount', label: 'VAT Amount', type: 'currency' as const, required: false, helpText: 'VAT at 20%' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: false, helpText: 'Payment due date' },
        constructionFields.niceicNumber,
        constructionFields.jobCardNumber,
        { fieldName: 'certificateIssued', label: 'Certificates Issued', type: 'textarea' as const, required: false, helpText: 'List of safety certificates provided' },
        { fieldName: 'testDate', label: 'Test Date', type: 'date' as const, required: false, helpText: 'Date electrical testing performed' },
        { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, helpText: 'When payment is due' },
        { fieldName: 'warrantyInfo', label: 'Warranty Information', type: 'textarea' as const, required: false, helpText: 'Warranty terms' }
      ],
      industryStandards: [
        {
          standard: 'Part P Compliance',
          description: 'Building Regulations Part P compliance for notifiable work',
          complianceLevel: 'required' as const
        },
        {
          standard: 'Electrical Certificates',
          description: 'Issue appropriate certificates (EIC, MEIWC, EICR)',
          complianceLevel: 'required' as const
        },
        {
          standard: 'NICEIC/NAPIT',
          description: 'Display scheme provider registration number',
          complianceLevel: 'recommended' as const
        },
        {
          standard: '18th Edition Wiring Regulations',
          description: 'Compliance with BS 7671:2018',
          complianceLevel: 'required' as const
        }
      ],
      sampleData: {
        invoiceNumber: 'ELEC-2024-2341',
        invoiceDate: '2024-10-25',
        dueDate: '2024-11-01',
        businessName: 'SparkRight Electrical Services Ltd',
        businessAddress: '12 Voltage Avenue, Leeds, LS2 7AA',
        businessEmail: 'bookings@sparkright.co.uk',
        businessPhone: '+44 113 456 7890',
        vatNumber: 'GB 888 7777 66',
        clientName: 'Mrs Susan Clarke',
        clientAddress: '34 Homeowner Drive, Leeds, LS15 8TT',
        clientPhone: '+44 7700 123456',
        clientEmail: 's.clarke@email.com',
        jobCardNumber: 'JOB-2024-1234',
        niceicNumber: 'NICEIC 123456',
        testDate: '2024-10-25',
        lineItems: [
          { description: 'Consumer Unit Replacement - 18th Edition compliant unit with RCBO protection', quantity: 1, rate: 650.00, amount: 650.00 },
          { description: 'Full Electrical Installation Condition Report (EICR) - Complete property inspection', quantity: 1, rate: 250.00, amount: 250.00 },
          { description: 'Install 4x Double Sockets - Kitchen area including earthing', quantity: 4, rate: 35.00, amount: 140.00 },
          { description: 'Install LED Downlights - Living room with dimmable switches', quantity: 8, rate: 25.00, amount: 200.00 },
          { description: 'Parts & Materials - Cables, back boxes, faceplates', quantity: 1, rate: 180.00, amount: 180.00 }
        ],
        subtotal: 1420.00,
        vatAmount: 284.00,
        totalAmount: 1704.00,
        certificateIssued: 'Electrical Installation Certificate (EIC) issued for consumer unit replacement. Electrical Installation Condition Report (EICR) issued - satisfactory condition. All work complies with BS 7671:2018 (18th Edition Wiring Regulations). Minor Works Certificate for socket and lighting installations.',
        paymentTerms: 'Payment due on completion. Cash, bank transfer, or card accepted.',
        warrantyInfo: 'All workmanship guaranteed for 12 months from completion date. Parts carry manufacturer warranty.',
        notes: 'Notifiable work registered with Local Authority Building Control via NICEIC. All certificates emailed within 7 working days. Consumer unit labelled with circuit details. Emergency electrician services available 24/7.'
      },
      industrySpecific: {
        serviceTypes: [
          'Consumer Unit Replacement',
          'Full House Rewiring',
          'Electrical Installation Condition Reports (EICR)',
          'Kitchen and Bathroom Electrical Work',
          'Lighting Installation and Design',
          'Socket and Switch Installation',
          'Fault Finding and Repairs',
          'Electric Vehicle (EV) Charger Installation',
          'Smart Home System Installation',
          'Burglar Alarm Installation',
          'Periodic Inspection and Testing',
          'Emergency Electrical Repairs'
        ],
        complianceRequired: [
          'Part P Building Regulations Compliance',
          'NICEIC or NAPIT Registration',
          'Electrical Installation Certificates (EIC)',
          'Minor Electrical Installation Works Certificate (MEIWC)',
          'Electrical Installation Condition Report (EICR)',
          'BS 7671:2018 (18th Edition) Compliance',
          'Public Liability Insurance (minimum £2 million)',
          'Competent Person Scheme Membership'
        ],
        targetAudience: [
          'Homeowners',
          'Landlords (EICR requirements)',
          'Commercial Property Owners',
          'Property Managers',
          'Renovation Projects',
          'New Build Developers',
          'Estate Agents',
          'Insurance Companies'
        ]
      },
      businessBenefits: [
        'Professional Credibility: NICEIC number display builds customer confidence',
        'Compliance Documentation: Certificate tracking ensures regulatory compliance',
        'Audit Trail: Complete job records for insurance and warranty claims',
        'Legal Protection: Detailed work descriptions protect against disputes',
        'Parts Tracking: Itemized parts list helps with inventory management',
        'Warranty Management: Clear warranty terms reduce future liability',
        'Building Control: Automatic notification reference for Part P work',
        'Customer Communication: Professional invoicing improves payment speed',
        'Business Growth: Organized records support expansion and accreditation',
        'VAT Compliance: Correct VAT display for HMRC requirements'
      ],
      useCases: [
        'Complete consumer unit replacement and upgrade',
        'Full property rewiring for older homes',
        'Landlord EICR safety inspections',
        'Kitchen rewiring for new appliances',
        'Bathroom electrical installation (zones compliance)',
        'LED lighting installation and upgrades',
        'Additional socket outlets and USB sockets',
        'Electric vehicle charger installation',
        'Smart home system wiring and setup',
        'Fault diagnosis and emergency repairs',
        'Periodic testing and inspection',
        'Commercial electrical installation'
      ]
    },
    {
      id: 'plumb-001',
      categoryId: 'electrical-plumbing',
      categoryName: 'Plumbing Services',
      name: 'Plumber Invoice Template',
      description: 'Invoice for plumbing installation, repairs, and maintenance with Gas Safe registration, boiler servicing, and heating system work',
      tier: 'free',
      searchVolume: 110,
      cpc: 6.29,
      difficulty: 24,
      keywords: [
        'plumbing invoice',
        'plumber invoice',
        'plumbing work invoice',
        'plumbing repair invoice',
        'gas safe invoice',
        'boiler service invoice',
        'heating invoice'
      ],
      sourceFile: 'construction/categoriesTemplates.ts',
      sourceTemplateId: 'plumb-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'INV-2024-001', helpText: 'Invoice reference' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date of invoice' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text' as const, required: true, helpText: 'Your plumbing business name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
        { fieldName: 'businessEmail', label: 'Email', type: 'email' as const, required: true, helpText: 'Contact email' },
        { fieldName: 'clientName', label: 'Customer Name', type: 'text' as const, required: true, helpText: 'Customer name' },
        { fieldName: 'clientAddress', label: 'Customer Address', type: 'textarea' as const, required: true, helpText: 'Customer address' },
        { fieldName: 'lineItems', label: 'Work Completed', type: 'textarea' as const, required: true, helpText: 'Plumbing work and parts' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Total before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total due' }
      ],
      optionalFields: [
        { fieldName: 'businessPhone', label: 'Phone', type: 'phone' as const, required: false, helpText: 'Contact phone' },
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration' },
        { fieldName: 'vatAmount', label: 'VAT Amount', type: 'currency' as const, required: false, helpText: 'VAT at 20%' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: false, helpText: 'Payment due date' },
        constructionFields.gasSafeNumber,
        { fieldName: 'warrantyPeriod', label: 'Warranty Period', type: 'text' as const, required: false, placeholder: '12 months parts & labor', helpText: 'Warranty or guarantee period' },
        { fieldName: 'certificateIssued', label: 'Certificates Issued', type: 'textarea' as const, required: false, helpText: 'Gas safety or other certificates' },
        { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, helpText: 'When payment is due' }
      ],
      industryStandards: [
        {
          standard: 'Gas Safe Register',
          description: 'Gas Safe registration required for any gas work',
          complianceLevel: 'required' as const
        },
        {
          standard: 'Water Regulations',
          description: 'Compliance with Water Supply (Water Fittings) Regulations',
          complianceLevel: 'required' as const
        },
        {
          standard: 'Gas Safety Certificates',
          description: 'Issue Gas Safety certificates for boiler work',
          complianceLevel: 'required' as const
        },
        {
          standard: 'Public Liability Insurance',
          description: 'Minimum £2 million public liability cover',
          complianceLevel: 'required' as const
        }
      ],
      sampleData: {
        invoiceNumber: 'PLMB-2024-0678',
        invoiceDate: '2024-10-28',
        businessName: 'FlowFix Plumbing & Heating Ltd',
        businessAddress: '89 Pipeline Street, Birmingham, B1 1AA',
        businessEmail: 'service@flowfix.co.uk',
        businessPhone: '+44 121 345 6789',
        vatNumber: 'GB 555 6666 77',
        gasSafeNumber: 'Gas Safe 198765',
        clientName: 'Mr James Anderson',
        clientAddress: '56 Resident Road, Birmingham, B17 0TT',
        clientPhone: '+44 7700 234567',
        clientEmail: 'j.anderson@email.com',
        lineItems: [
          { description: 'Annual Boiler Service & Safety Check - Worcester Bosch boiler full service', quantity: 1, rate: 85.00, amount: 85.00 },
          { description: 'Replace Faulty Radiator Valve - Thermostatic radiator valve replacement x2', quantity: 2, rate: 45.00, amount: 90.00 },
          { description: 'Power Flush Heating System - Complete system clean with inhibitor', quantity: 1, rate: 350.00, amount: 350.00 },
          { description: 'Parts & Materials - Valves, inhibitor, flush chemicals', quantity: 1, rate: 120.00, amount: 120.00 }
        ],
        subtotal: 645.00,
        vatAmount: 129.00,
        totalAmount: 774.00,
        warrantyPeriod: '12 months parts and labour guarantee',
        certificateIssued: 'Gas Safety Certificate issued for boiler service (valid 12 months). Boiler serviced and passed all safety checks. All gas appliances tested for safety. Certificate reference: GS-2024-0678.',
        paymentTerms: 'Payment due on completion. Card, cash, or bank transfer accepted.',
        notes: 'Annual boiler service completed. Heating system power flushed and inhibitor added. All radiator valves checked and 2 replaced. System pressure set to 1.5 bar. Recommend annual service to maintain warranty. Next service due October 2025. Emergency callout available 24/7.'
      },
      industrySpecific: {
        serviceTypes: [
          'Boiler Installation and Replacement',
          'Boiler Servicing and Repairs',
          'Central Heating Installation',
          'Heating System Power Flushing',
          'Bathroom Installation',
          'Kitchen Plumbing',
          'Leak Detection and Repairs',
          'Radiator Installation and Replacement',
          'Tap and Valve Replacement',
          'Toilet and Cistern Repairs',
          'Drain Unblocking and Cleaning',
          'Emergency Plumbing Repairs'
        ],
        complianceRequired: [
          'Gas Safe Registration (for gas work)',
          'Water Regulations Approval',
          'Gas Safety Certificates',
          'Landlord Gas Safety Record (CP12)',
          'Public Liability Insurance (minimum £2 million)',
          'Building Regulations Compliance',
          'Part G Compliance (Sanitation)'
        ],
        targetAudience: [
          'Homeowners',
          'Landlords (Gas Safety requirements)',
          'Property Managers',
          'Commercial Property Owners',
          'New Build Developers',
          'Renovation Projects',
          'Insurance Companies',
          'Estate Agents'
        ]
      },
      businessBenefits: [
        'Gas Safe Credibility: Registration number builds customer trust and confidence',
        'Certificate Tracking: Organized records for annual services and safety checks',
        'Legal Protection: Detailed work records protect against liability claims',
        'Warranty Management: Clear warranty terms reduce disputes and callbacks',
        'Parts Documentation: Itemized parts support warranty and insurance claims',
        'Annual Service Reminder: Records support customer retention and repeat business',
        'Compliance Evidence: Complete documentation for Gas Safe inspections',
        'Professional Image: Organized invoicing improves payment speed',
        'Emergency Response: Clear pricing supports emergency callout transparency',
        'Business Growth: Professional records support expansion and accreditation'
      ],
      useCases: [
        'Annual boiler servicing and safety inspections',
        'Boiler breakdowns and emergency repairs',
        'Central heating system installation',
        'Heating system power flushing and cleaning',
        'Complete bathroom installations',
        'Kitchen plumbing for new appliances',
        'Radiator installation and replacement',
        'Leak detection and emergency repairs',
        'Toilet and cistern repairs',
        'Tap and valve replacements',
        'Drain unblocking services',
        'Landlord gas safety inspections'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY: CLEANING SERVICES
// ============================================================================

export const cleaningServices: ConstructionCategory = {
  id: 'cleaning-services',
  name: 'Cleaning Services',
  description: 'Professional invoice templates for commercial cleaning companies, office cleaning, and janitorial services',
  icon: '🧹',
  seoMetadata: {
    primaryKeywords: [
      'cleaning invoice template',
      'commercial cleaning invoice',
      'cleaning company invoice'
    ],
    secondaryKeywords: [
      'office cleaning invoice',
      'janitorial invoice',
      'cleaning service invoice',
      'contract cleaning invoice'
    ],
    longTailKeywords: [
      'commercial cleaning invoice template uk',
      'office cleaning invoice with service period',
      'cleaning company invoice template free'
    ]
  },
  templates: [
    {
      id: 'cleaning-commercial-001',
      categoryId: 'cleaning-services',
      categoryName: 'Commercial Cleaning',
      name: 'Commercial Cleaning Invoice Template',
      description: 'Free invoice for commercial cleaning contracts with service period tracking, frequency documentation, and SLA references for office and commercial properties',
      tier: 'free',
      searchVolume: 260,
      cpc: 4.11,
      difficulty: 68,
      keywords: [
        'cleaning invoice template',
        'cleaning company invoice template',
        'commercial cleaning invoice',
        'office cleaning invoice',
        'janitorial invoice',
        'contract cleaning invoice',
        'cleaning service invoice'
      ],
      sourceFile: 'construction/categoriesTemplates.ts',
      sourceTemplateId: 'cleaning-commercial-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'CLN-2024-001', helpText: 'Invoice reference' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date of invoice' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
        { fieldName: 'businessName', label: 'Cleaning Company Name', type: 'text' as const, required: true, helpText: 'Your company name' },
        { fieldName: 'businessAddress', label: 'Your Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
        { fieldName: 'businessEmail', label: 'Your Email', type: 'email' as const, required: true, helpText: 'Contact email' },
        { fieldName: 'clientName', label: 'Client Name', type: 'text' as const, required: true, helpText: 'Client company name' },
        { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: true, helpText: 'Client billing address' },
        { fieldName: 'lineItems', label: 'Services Provided', type: 'textarea' as const, required: true, helpText: 'Cleaning services and dates' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Total before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total due' }
      ],
      optionalFields: [
        { fieldName: 'businessPhone', label: 'Phone', type: 'phone' as const, required: false, helpText: 'Contact phone' },
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration' },
        { fieldName: 'vatAmount', label: 'VAT Amount', type: 'currency' as const, required: false, helpText: 'VAT at 20%' },
        { fieldName: 'periodStart', label: 'Service Period Start', type: 'date' as const, required: false, helpText: 'Start date of cleaning period' },
        { fieldName: 'periodEnd', label: 'Service Period End', type: 'date' as const, required: false, helpText: 'End date of cleaning period' },
        { fieldName: 'siteAddress', label: 'Cleaning Site Address', type: 'textarea' as const, required: false, helpText: 'Location where cleaning was performed' },
        { fieldName: 'frequency', label: 'Service Frequency', type: 'text' as const, required: false, placeholder: 'Daily/Weekly/Monthly', helpText: 'How often service is provided' },
        { fieldName: 'contractNumber', label: 'Contract Number', type: 'text' as const, required: false, helpText: 'Service contract reference' },
        { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, helpText: 'Payment terms' },
        { fieldName: 'bankName', label: 'Bank Name', type: 'text' as const, required: false, helpText: 'Bank for payment' },
        { fieldName: 'accountNumber', label: 'Account Number', type: 'text' as const, required: false, helpText: 'Account number' },
        { fieldName: 'sortCode', label: 'Sort Code', type: 'text' as const, required: false, helpText: 'Sort code' }
      ],
      industryStandards: [
        {
          standard: 'Public Liability Insurance',
          description: 'Commercial cleaning companies should have £5-10 million public liability insurance',
          complianceLevel: 'required' as const
        },
        {
          standard: 'COSHH Compliance',
          description: 'Control of Substances Hazardous to Health regulations compliance required',
          complianceLevel: 'required' as const
        },
        {
          standard: 'Service Level Agreement',
          description: 'Reference SLA terms and cleaning schedule',
          complianceLevel: 'recommended' as const
        },
        {
          standard: 'Employee Checks',
          description: 'DBS checks for staff working in sensitive environments',
          complianceLevel: 'recommended' as const
        }
      ],
      sampleData: {
        invoiceNumber: 'CLN-2024-0889',
        invoiceDate: '2024-10-31',
        dueDate: '2024-11-14',
        businessName: 'Premier Clean Solutions Ltd',
        businessAddress: '12 Industrial Estate, Birmingham, B5 7RG',
        businessEmail: 'invoices@premierclean.co.uk',
        businessPhone: '+44 121 456 7890',
        vatNumber: 'GB 456 7890 12',
        clientName: 'Midlands Office Park Management Ltd',
        clientAddress: '100 Business Quarter, Birmingham, B1 1TT',
        clientEmail: 'accounts@midlandsoffice.co.uk',
        siteAddress: 'Office Buildings A, B, C - Midlands Office Park, Birmingham B1 1TT',
        periodStart: '2024-10-01',
        periodEnd: '2024-10-31',
        frequency: 'Daily (Monday-Friday) with monthly deep clean',
        contractNumber: 'MOP-CONTRACT-2024-045',
        lineItems: [
          { description: 'Daily office cleaning - October 2024 (22 working days) - All common areas, offices, and facilities', quantity: 22, rate: 185.00, amount: 4070.00 },
          { description: 'Deep clean - Building A (monthly service) - Full floor clean, carpet shampooing, window cleaning', quantity: 1, rate: 450.00, amount: 450.00 },
          { description: 'Window cleaning - External (monthly) - All external windows ground to 3rd floor', quantity: 1, rate: 320.00, amount: 320.00 },
          { description: 'Carpet cleaning - Common areas (monthly) - Reception, corridors, meeting rooms', quantity: 1, rate: 280.00, amount: 280.00 }
        ],
        subtotal: 5120.00,
        vatAmount: 1024.00,
        totalAmount: 6144.00,
        bankName: 'Lloyds Bank',
        accountNumber: '45678901',
        sortCode: '30-12-45',
        paymentTerms: 'Payment due within 14 days by bank transfer or direct debit. Monthly invoice for October 2024 cleaning services as per contract MOP-CONTRACT-2024-045.',
        notes: 'All cleaning materials and equipment provided by Premier Clean Solutions. Services performed according to agreed SLA schedule. Monthly quality audit completed - satisfactory. Deep clean completed 25th October 2024. Next deep clean scheduled: 22nd November 2024. Emergency cleaning services available 24/7.'
      },
      industrySpecific: {
        serviceTypes: [
          'Daily Office Cleaning',
          'Commercial Property Cleaning',
          'Industrial Cleaning',
          'Retail Store Cleaning',
          'School and Education Facility Cleaning',
          'Healthcare Facility Cleaning',
          'Warehouse Cleaning',
          'Deep Cleaning Services',
          'Carpet and Upholstery Cleaning',
          'Window Cleaning (Internal & External)',
          'Floor Care and Maintenance',
          'Washroom and Hygiene Services',
          'Emergency Spill Response',
          'Post-Construction Cleaning'
        ],
        complianceRequired: [
          'Public Liability Insurance (£5-10 million)',
          'Employer\'s Liability Insurance',
          'COSHH Compliance (hazardous substances)',
          'Risk Assessment Documentation',
          'Health & Safety Policy',
          'Service Level Agreement (SLA)',
          'Quality Management Systems',
          'DBS Checks (for sensitive sites)',
          'Environmental Policy',
          'Waste Disposal Compliance'
        ],
        targetAudience: [
          'Office Buildings and Business Parks',
          'Retail Stores and Shopping Centers',
          'Schools and Universities',
          'Healthcare Facilities and Hospitals',
          'Industrial Units and Warehouses',
          'Hotels and Hospitality',
          'Leisure Centers and Gyms',
          'Property Management Companies',
          'Facilities Management Companies',
          'Government Buildings',
          'Religious Buildings',
          'Residential Apartment Buildings'
        ]
      },
      businessBenefits: [
        'Contract Management: Period tracking supports long-term contract billing',
        'SLA Documentation: Service level references ensure accountability',
        'Quality Assurance: Inspection records demonstrate compliance',
        'Client Retention: Professional invoicing supports contract renewals',
        'Audit Trail: Complete service records for quality audits',
        'Payment Predictability: Regular billing cycles improve cash flow',
        'Dispute Prevention: Detailed service logs prevent disagreements',
        'Frequency Tracking: Clear documentation of service schedule',
        'Multi-Site Billing: Easy handling of multiple locations',
        'Professional Image: Organized invoicing builds corporate credibility'
      ],
      useCases: [
        'Daily office cleaning services',
        'Monthly commercial property maintenance',
        'Retail store daily cleaning',
        'School and university cleaning contracts',
        'Healthcare facility cleaning (hospitals, clinics)',
        'Industrial warehouse cleaning',
        'Post-construction deep cleaning',
        'Emergency spill and incident response',
        'Carpet and upholstery deep cleaning',
        'Window cleaning (high-rise buildings)',
        'Washroom servicing and hygiene',
        'Floor care programs (stripping, sealing, polishing)'
      ]
    }
  ]
};

// ============================================================================
// INDUSTRY METADATA
// ============================================================================

export const constructionIndustryMetadata: IndustryMetadata = {
  id: 'construction',
  name: 'Construction & Trades',
  description: 'Comprehensive invoice templates for construction companies, builders, electricians, plumbers, and all trade professionals',
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
    'cleaning invoice',
    'commercial cleaning invoice',
    'cis invoice',
    'trade invoice'
  ],
  avgCPC: 6.51,
  searchDifficulty: 34,
  popularityRank: 2
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const constructionCategories: ConstructionCategory[] = [
  generalConstruction,
  electricalPlumbing,
  cleaningServices
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all construction templates across all categories
 */
export function getAllConstructionTemplates(): ConstructionTemplate[] {
  return constructionCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): ConstructionTemplate[] {
  const category = constructionCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): ConstructionTemplate | undefined {
  return getAllConstructionTemplates().find(template => template.id === templateId);
}

/**
 * Get all free construction templates
 */
export function getFreeConstructionTemplates(): ConstructionTemplate[] {
  return getAllConstructionTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium construction templates
 */
export function getPremiumConstructionTemplates(): ConstructionTemplate[] {
  return getAllConstructionTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchConstructionTemplates(query: string): ConstructionTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllConstructionTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)) ||
    template.useCases.some(useCase => useCase.toLowerCase().includes(lowercaseQuery)) ||
    template.businessBenefits.some(benefit => benefit.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get templates by service type
 */
export function getTemplatesByServiceType(serviceType: string): ConstructionTemplate[] {
  const lowercaseService = serviceType.toLowerCase();
  return getAllConstructionTemplates().filter(template =>
    template.industrySpecific.serviceTypes.some(service => 
      service.toLowerCase().includes(lowercaseService)
    )
  );
}

/**
 * Get high-value templates (by CPC)
 */
export function getHighValueTemplates(minCPC: number = 6.0): ConstructionTemplate[] {
  return getAllConstructionTemplates()
    .filter(template => template.cpc >= minCPC)
    .sort((a, b) => b.cpc - a.cpc);
}

/**
 * Get templates by search volume (most popular)
 */
export function getPopularTemplates(limit: number = 10): ConstructionTemplate[] {
  return getAllConstructionTemplates()
    .sort((a, b) => b.searchVolume - a.searchVolume)
    .slice(0, limit);
}

/**
 * Get construction industry statistics
 */
export function getConstructionStats() {
  const allTemplates = getAllConstructionTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreeConstructionTemplates().length,
    premiumTemplates: getPremiumConstructionTemplates().length,
    totalCategories: constructionCategories.length,
    totalSearchVolume: allTemplates.reduce((sum, t) => sum + t.searchVolume, 0),
    averageCPC: allTemplates.reduce((sum, t) => sum + t.cpc, 0) / allTemplates.length,
    averageDifficulty: allTemplates.reduce((sum, t) => sum + t.difficulty, 0) / allTemplates.length,
    highestSearchVolume: Math.max(...allTemplates.map(t => t.searchVolume)),
    lowestDifficulty: Math.min(...allTemplates.map(t => t.difficulty)),
    totalKeywords: allTemplates.reduce((sum, t) => sum + t.keywords.length, 0),
    totalUseCases: allTemplates.reduce((sum, t) => sum + t.useCases.length, 0),
    totalServiceTypes: [...new Set(allTemplates.flatMap(t => t.industrySpecific.serviceTypes))].length
  };
}

/**
 * Get SEO-optimized template recommendations
 */
export function getSEORecommendations() {
  const templates = getAllConstructionTemplates();
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
  metadata: constructionIndustryMetadata,
  categories: constructionCategories,
  templates: getAllConstructionTemplates(),
  utils: {
    getAllTemplates: getAllConstructionTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreeConstructionTemplates,
    getPremiumTemplates: getPremiumConstructionTemplates,
    search: searchConstructionTemplates,
    getTemplatesByServiceType,
    getHighValueTemplates,
    getPopularTemplates,
    getStats: getConstructionStats,
    getSEORecommendations
  }
};

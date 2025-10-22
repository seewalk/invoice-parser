/**
 * Premium Invoice Template Library
 * 
 * Extended industry-specific invoice template database for premium tier
 * Organized by: Industry → Category → Sub-category → Template
 * 
 * Based on comprehensive keyword research analysis:
 * - Construction & Trades: 1,970 monthly searches, £4.50 avg CPC
 * - Automotive Services: 1,700 monthly searches, £2.35 avg CPC
 * - Healthcare Services: 300 monthly searches, £1.98 avg CPC
 * - Creative Services: 710 monthly searches, £2.89 avg CPC
 * - Additional Hospitality: 190 monthly searches, £3.37 avg CPC
 * 
 * Total combined search volume: 4,870+ monthly searches
 * High commercial intent with competitive CPC values
 * 
 * Usage:
 * - Premium template access control (£9.99/mo tier)
 * - Industry-specific compliance and field sets
 * - SEO-optimized landing pages for premium templates
 * - Auto-populate industry-specific invoice requirements
 */

import { InvoiceTemplate, InvoiceField, IndustryStandard, SubCategory, Category, Industry } from './invoiceTemplateLibrary';

// ============================================================================
// TYPE DEFINITIONS (PREMIUM-SPECIFIC)
// ============================================================================

/**
 * Premium template with enhanced features
 */
export interface PremiumTemplate extends InvoiceTemplate {
  isPremium: true;
  tier: 'premium' | 'pro';
  premiumFeatures: PremiumFeature[];
  complianceHelpers: ComplianceHelper[];
  calculationRules: CalculationRule[];
}

/**
 * Premium feature definition
 */
export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  benefit: string;
}

/**
 * Compliance helper for industry-specific regulations
 */
export interface ComplianceHelper {
  field: string;
  title: string;
  helpText: string;
  validationRule?: string;
  autoComplete?: string[];
  externalLinks?: { text: string; url: string }[];
}

/**
 * Calculation rule for automatic field computation
 */
export interface CalculationRule {
  id: string;
  name: string;
  description: string;
  formula: string;
  appliesTo: string[];
}

/**
 * User tier for access control
 */
export type UserTier = 'free' | 'premium' | 'pro';

// ============================================================================
// COMMON PREMIUM FIELDS (Industry-specific fields for premium templates)
// ============================================================================

const premiumFields = {
  // Construction-specific fields
  cisRate: {
    fieldName: 'cisRate',
    label: 'CIS Deduction Rate',
    type: 'select' as const,
    required: false,
    placeholder: 'Select CIS rate',
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
  
  // Trade certifications
  gasSafeNumber: {
    fieldName: 'gasSafeNumber',
    label: 'Gas Safe Registration Number',
    type: 'text' as const,
    required: false,
    placeholder: '123456',
    validation: '^\\d{6}$',
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
  
  // Automotive-specific fields
  vehicleRegistration: {
    fieldName: 'vehicleRegistration',
    label: 'Vehicle Registration',
    type: 'text' as const,
    required: true,
    placeholder: 'AB12 CDE',
    validation: '^[A-Z]{2}\\d{2}\\s?[A-Z]{3}$',
    helpText: 'UK vehicle registration plate'
  },
  vehicleMake: {
    fieldName: 'vehicleMake',
    label: 'Vehicle Make',
    type: 'text' as const,
    required: true,
    placeholder: 'Ford',
    helpText: 'Vehicle manufacturer'
  },
  vehicleModel: {
    fieldName: 'vehicleModel',
    label: 'Vehicle Model',
    type: 'text' as const,
    required: true,
    placeholder: 'Focus',
    helpText: 'Vehicle model name'
  },
  vehicleYear: {
    fieldName: 'vehicleYear',
    label: 'Year',
    type: 'number' as const,
    required: false,
    placeholder: '2020',
    helpText: 'Year of manufacture'
  },
  mileage: {
    fieldName: 'mileage',
    label: 'Mileage',
    type: 'number' as const,
    required: false,
    placeholder: '45000',
    helpText: 'Current vehicle mileage'
  },
  vinNumber: {
    fieldName: 'vinNumber',
    label: 'VIN Number',
    type: 'text' as const,
    required: false,
    placeholder: '1HGBH41JXMN109186',
    helpText: 'Vehicle Identification Number (17 characters)'
  },
  motExpiry: {
    fieldName: 'motExpiry',
    label: 'MOT Expiry Date',
    type: 'date' as const,
    required: false,
    helpText: 'MOT certificate expiry date'
  },
  
  // Healthcare-specific fields
  nhsNumber: {
    fieldName: 'nhsNumber',
    label: 'NHS Number',
    type: 'text' as const,
    required: false,
    placeholder: '123 456 7890',
    helpText: 'Patient NHS number (if applicable)'
  },
  serviceDate: {
    fieldName: 'serviceDate',
    label: 'Service/Consultation Date',
    type: 'date' as const,
    required: true,
    helpText: 'Date of medical service or consultation'
  },
  practitionerName: {
    fieldName: 'practitionerName',
    label: 'Practitioner Name',
    type: 'text' as const,
    required: true,
    placeholder: 'Dr. Jane Smith',
    helpText: 'Name of medical practitioner'
  },
  gphcNumber: {
    fieldName: 'gphcNumber',
    label: 'GPhC Registration Number',
    type: 'text' as const,
    required: false,
    placeholder: '1234567',
    helpText: 'General Pharmaceutical Council registration (for pharmacists)'
  },
  gmcNumber: {
    fieldName: 'gmcNumber',
    label: 'GMC Registration Number',
    type: 'text' as const,
    required: false,
    placeholder: '1234567',
    helpText: 'General Medical Council registration (for doctors)'
  },
  
  // Creative-specific fields
  projectName: {
    fieldName: 'projectName',
    label: 'Project Name',
    type: 'text' as const,
    required: true,
    placeholder: 'Brand Identity Redesign',
    helpText: 'Name of creative project'
  },
  usageRights: {
    fieldName: 'usageRights',
    label: 'Usage Rights',
    type: 'textarea' as const,
    required: false,
    placeholder: 'Unlimited commercial use, worldwide, in perpetuity',
    helpText: 'Copyright and usage rights granted'
  },
  deliverables: {
    fieldName: 'deliverables',
    label: 'Deliverables',
    type: 'textarea' as const,
    required: false,
    placeholder: '- Logo files (AI, EPS, PNG)\n- Brand guidelines document\n- Social media templates',
    helpText: 'List of deliverables included'
  },
  revisions: {
    fieldName: 'revisions',
    label: 'Revisions Included',
    type: 'number' as const,
    required: false,
    placeholder: '3',
    helpText: 'Number of revision rounds included'
  },
  copyrightTransfer: {
    fieldName: 'copyrightTransfer',
    label: 'Copyright Transfer',
    type: 'select' as const,
    required: false,
    helpText: 'Whether copyright transfers to client upon payment'
  },
  
  // Accommodation-specific fields
  checkInDate: {
    fieldName: 'checkInDate',
    label: 'Check-in Date',
    type: 'date' as const,
    required: true,
    helpText: 'Guest check-in date'
  },
  checkOutDate: {
    fieldName: 'checkOutDate',
    label: 'Check-out Date',
    type: 'date' as const,
    required: true,
    helpText: 'Guest check-out date'
  },
  roomNumber: {
    fieldName: 'roomNumber',
    label: 'Room Number',
    type: 'text' as const,
    required: true,
    placeholder: '204',
    helpText: 'Hotel room number'
  },
  roomType: {
    fieldName: 'roomType',
    label: 'Room Type',
    type: 'text' as const,
    required: false,
    placeholder: 'Deluxe Double Room',
    helpText: 'Type of room booked'
  },
  numberOfNights: {
    fieldName: 'numberOfNights',
    label: 'Number of Nights',
    type: 'number' as const,
    required: true,
    placeholder: '3',
    helpText: 'Total nights stayed'
  },
  numberOfGuests: {
    fieldName: 'numberOfGuests',
    label: 'Number of Guests',
    type: 'number' as const,
    required: false,
    placeholder: '2',
    helpText: 'Total number of guests'
  },
  bookingReference: {
    fieldName: 'bookingReference',
    label: 'Booking Reference',
    type: 'text' as const,
    required: false,
    placeholder: 'BK-2024-1234',
    helpText: 'Booking confirmation reference'
  }
};

// ============================================================================
// INDUSTRY: CONSTRUCTION & TRADES (EXTENDED)
// ============================================================================

export const constructionIndustryPremium: Industry = {
  id: 'construction-premium',
  name: 'Construction & Trades (Premium)',
  description: 'Comprehensive invoice templates for construction, cleaning, and specialized trades',
  icon: '🏗️',
  totalSearchVolume: 1970,
  categories: {
    generalConstruction: {
      id: 'general-construction',
      name: 'General Construction',
      description: 'Invoices for construction companies and builders',
      icon: '👷',
      subCategories: {
        commercial: {
          id: 'commercial',
          name: 'Commercial Construction',
          description: 'Large-scale commercial construction projects',
          templates: [
            {
              id: 'construct-commercial-001',
              name: 'Commercial Construction Invoice',
              description: 'Professional invoice for commercial construction projects with CIS deduction support',
              keywords: [
                'invoice template for construction company',
                'construction invoice template',
                'commercial construction invoice',
                'cis invoice template'
              ],
              searchVolume: 590,
              cpc: 7.86,
              searchDifficulty: 34,
              requiredFields: [
                { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'INV-2024-001', helpText: 'Unique invoice identifier' },
                { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date invoice issued' },
                { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
                { fieldName: 'businessName', label: 'Business Name', type: 'text' as const, required: true, placeholder: 'ABC Construction Ltd', helpText: 'Your construction company name' },
                { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea' as const, required: true, placeholder: '123 Builder Street, London, SW1A 1AA', helpText: 'Registered business address' },
                { fieldName: 'companyNumber', label: 'Company Registration Number', type: 'text' as const, required: true, placeholder: '12345678', helpText: 'Companies House registration number' },
                { fieldName: 'clientName', label: 'Client Name', type: 'text' as const, required: true, placeholder: 'Main Contractor Ltd', helpText: 'Client or main contractor name' },
                { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: true, helpText: 'Client billing address' },
                { fieldName: 'lineItems', label: 'Line Items', type: 'textarea' as const, required: true, helpText: 'Work items, quantities, rates' },
                { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Total before deductions' },
                { fieldName: 'totalAmount', label: 'Total Amount Due', type: 'currency' as const, required: true, helpText: 'Final amount due after CIS' }
              ],
              optionalFields: [
                { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, placeholder: 'GB 123 4567 89', helpText: 'VAT registration number' },
                premiumFields.cisRate,
                premiumFields.cisDeduction,
                premiumFields.materialsBreakdown,
                premiumFields.labourBreakdown,
                premiumFields.retentionAmount,
                premiumFields.retentionPercentage,
                { fieldName: 'projectName', label: 'Project Name', type: 'text' as const, required: false, placeholder: 'Office Building Phase 2', helpText: 'Construction project name' },
                { fieldName: 'projectAddress', label: 'Project Address', type: 'textarea' as const, required: false, helpText: 'Site address' },
                { fieldName: 'vatAmount', label: 'VAT Amount', type: 'currency' as const, required: false, helpText: 'VAT at 20% or reverse charge' },
                { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, placeholder: 'Payment due within 30 days. CIS deduction at 20%.', helpText: 'Payment terms and conditions' },
                { fieldName: 'bankName', label: 'Bank Name', type: 'text' as const, required: false, placeholder: 'Barclays', helpText: 'Bank for payment' },
                { fieldName: 'accountNumber', label: 'Account Number', type: 'text' as const, required: false, placeholder: '12345678', helpText: '8-digit account number' },
                { fieldName: 'sortCode', label: 'Sort Code', type: 'text' as const, required: false, placeholder: '12-34-56', helpText: 'Bank sort code' }
              ],
              industryStandards: [
                {
                  standard: 'CIS Compliance',
                  description: 'Construction Industry Scheme (CIS) deductions must be clearly shown. 20% for registered subcontractors, 30% for unregistered.',
                  complianceLevel: 'required'
                },
                {
                  standard: 'VAT Reverse Charge',
                  description: 'Most construction services use domestic reverse charge VAT (customer pays VAT, not supplier)',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Retention Terms',
                  description: 'If retention applies (typically 5-10%), clearly state retention amount and release terms',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Payment Terms',
                  description: 'Standard construction payment terms are 30 days. Late Payment legislation applies.',
                  complianceLevel: 'required'
                }
              ],
              sampleData: {
                invoiceNumber: 'INV-2024-1847',
                invoiceDate: '2024-10-20',
                dueDate: '2024-11-19',
                businessName: 'Premier Builders Ltd',
                businessAddress: '78 Construction Way, Manchester, M1 4BD',
                companyNumber: '09876543',
                vatNumber: 'GB 987 6543 21',
                clientName: 'Main Contractor Solutions Ltd',
                clientAddress: '45 Development Road, Manchester, M2 5TG',
                projectName: 'City Centre Office Development - Phase 2',
                projectAddress: '100 Business Quarter, Manchester, M3 3HF',
                lineItems: [
                  { description: 'Structural steelwork installation', quantity: 1, rate: 45000.00, amount: 45000.00 },
                  { description: 'Concrete foundation works', quantity: 1, rate: 28000.00, amount: 28000.00 },
                  { description: 'Brickwork - External walls', quantity: 450, rate: 35.00, amount: 15750.00 },
                  { description: 'Scaffolding hire (4 weeks)', quantity: 4, rate: 1200.00, amount: 4800.00 }
                ],
                materialsBreakdown: 35550.00,
                labourBreakdown: 58000.00,
                subtotal: 93550.00,
                cisRate: '20%',
                cisDeduction: 11600.00, // 20% of labour (£58,000)
                retentionPercentage: 5,
                retentionAmount: 4677.50, // 5% of subtotal
                totalAmount: 77272.50, // £93,550 - £11,600 CIS - £4,677.50 retention
                paymentTerms: 'Payment due within 30 days. CIS deduction at 20% applied to labour costs. 5% retention held until practical completion.',
                notes: 'VAT reverse charge applies - customer accounts for VAT. CIS deduction certificate will be provided separately.'
              }
            }
          ]
        },
        residential: {
          id: 'residential',
          name: 'Residential Construction',
          description: 'Home building and renovation projects',
          templates: [
            {
              id: 'construct-residential-002',
              name: 'Residential Builder Invoice',
              description: 'Invoice template for home builders and renovation projects',
              keywords: [
                'builders invoice template',
                'home builder invoice',
                'residential construction invoice'
              ],
              searchVolume: 170,
              cpc: 3.85,
              searchDifficulty: 56,
              requiredFields: [
                { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'INV-2024-001', helpText: 'Unique invoice number' },
                { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date issued' },
                { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
                { fieldName: 'businessName', label: 'Your Business Name', type: 'text' as const, required: true, placeholder: 'Quality Builders', helpText: 'Your building company name' },
                { fieldName: 'businessAddress', label: 'Your Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
                { fieldName: 'clientName', label: 'Homeowner Name', type: 'text' as const, required: true, placeholder: 'Mr & Mrs Smith', helpText: 'Homeowner client name' },
                { fieldName: 'clientAddress', label: 'Property Address', type: 'textarea' as const, required: true, placeholder: '45 Oak Lane, Leeds, LS1 1AA', helpText: 'Property where work was done' },
                { fieldName: 'lineItems', label: 'Work Completed', type: 'textarea' as const, required: true, helpText: 'Description of building work' },
                { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Total before VAT' },
                { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total due' }
              ],
              optionalFields: [
                { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'Your VAT registration' },
                { fieldName: 'vatAmount', label: 'VAT (20%)', type: 'currency' as const, required: false, helpText: 'VAT amount' },
                premiumFields.materialsBreakdown,
                premiumFields.labourBreakdown,
                { fieldName: 'projectName', label: 'Project Description', type: 'text' as const, required: false, placeholder: 'Kitchen Extension', helpText: 'Type of work' },
                { fieldName: 'depositPaid', label: 'Deposit Already Paid', type: 'currency' as const, required: false, helpText: 'Deposit amount received' },
                { fieldName: 'balanceDue', label: 'Balance Due', type: 'currency' as const, required: false, helpText: 'Remaining balance' },
                { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, placeholder: 'Payment due on completion.', helpText: 'When payment is due' },
                { fieldName: 'bankName', label: 'Bank Name', type: 'text' as const, required: false, helpText: 'Your bank' },
                { fieldName: 'accountNumber', label: 'Account Number', type: 'text' as const, required: false, helpText: 'Your account number' },
                { fieldName: 'sortCode', label: 'Sort Code', type: 'text' as const, required: false, helpText: 'Your sort code' }
              ],
              industryStandards: [
                {
                  standard: 'Building Regulations Compliance',
                  description: 'Work must comply with UK Building Regulations. Certificates should be referenced.',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Insurance',
                  description: 'Public liability insurance details recommended for homeowner peace of mind',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Payment Schedule',
                  description: 'For larger projects, stage payments (deposit, progress payments, final payment) are standard',
                  complianceLevel: 'recommended'
                }
              ],
              sampleData: {
                invoiceNumber: 'INV-2024-0421',
                invoiceDate: '2024-10-15',
                dueDate: '2024-10-22',
                businessName: 'Heritage Home Builders',
                businessAddress: '23 Builder Avenue, Leeds, LS2 8JF',
                businessPhone: '+44 113 123 4567',
                businessEmail: 'info@heritagebuilders.co.uk',
                vatNumber: 'GB 345 6789 01',
                clientName: 'Mr & Mrs Johnson',
                clientAddress: '78 Maple Drive, Leeds, LS16 6QP',
                projectName: 'Single Storey Rear Extension',
                lineItems: [
                  { description: 'Foundation and groundwork', quantity: 1, rate: 3200.00, amount: 3200.00 },
                  { description: 'Brickwork and blockwork', quantity: 1, rate: 4500.00, amount: 4500.00 },
                  { description: 'Roof structure and tiles', quantity: 1, rate: 2800.00, amount: 2800.00 },
                  { description: 'Windows and external door', quantity: 1, rate: 1850.00, amount: 1850.00 },
                  { description: 'Internal plastering', quantity: 1, rate: 1200.00, amount: 1200.00 },
                  { description: 'Electrical first fix', quantity: 1, rate: 650.00, amount: 650.00 },
                  { description: 'Plumbing first fix', quantity: 1, rate: 550.00, amount: 550.00 }
                ],
                materialsBreakdown: 8250.00,
                labourBreakdown: 6500.00,
                subtotal: 14750.00,
                vatAmount: 2950.00,
                totalAmount: 17700.00,
                depositPaid: 5000.00,
                balanceDue: 12700.00,
                paymentTerms: 'Deposit of £5,000 received. Balance due on completion of extension.',
                notes: 'Building Control approval obtained. All work guaranteed for 10 years.'
              }
            }
          ]
        }
      }
    },
    cleaning: {
      id: 'cleaning',
      name: 'Cleaning Services',
      description: 'Invoice templates for commercial and domestic cleaning companies',
      icon: '🧹',
      subCategories: {
        commercial: {
          id: 'commercial-cleaning',
          name: 'Commercial Cleaning',
          description: 'Office and commercial property cleaning',
          templates: [
            {
              id: 'cleaning-commercial-001',
              name: 'Commercial Cleaning Invoice',
              description: 'Professional invoice for commercial cleaning contracts',
              keywords: [
                'cleaning invoice template',
                'cleaning company invoice template',
                'commercial cleaning invoice',
                'office cleaning invoice'
              ],
              searchVolume: 260,
              cpc: 4.11,
              searchDifficulty: 68,
              requiredFields: [
                { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'CLN-2024-001', helpText: 'Unique invoice reference' },
                { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date of invoice' },
                { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
                { fieldName: 'businessName', label: 'Your Cleaning Company', type: 'text' as const, required: true, placeholder: 'Sparkle Clean Ltd', helpText: 'Your company name' },
                { fieldName: 'businessAddress', label: 'Your Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
                { fieldName: 'businessEmail', label: 'Your Email', type: 'email' as const, required: true, helpText: 'Contact email' },
                { fieldName: 'clientName', label: 'Client Name', type: 'text' as const, required: true, placeholder: 'ABC Offices Ltd', helpText: 'Client company name' },
                { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: true, helpText: 'Client billing address' },
                { fieldName: 'lineItems', label: 'Services Provided', type: 'textarea' as const, required: true, helpText: 'Cleaning services and dates' },
                { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Total before VAT' },
                { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total due' }
              ],
              optionalFields: [
                { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration number' },
                { fieldName: 'vatAmount', label: 'VAT (20%)', type: 'currency' as const, required: false, helpText: 'VAT amount' },
                { fieldName: 'periodStart', label: 'Service Period Start', type: 'date' as const, required: false, helpText: 'Start date of cleaning period' },
                { fieldName: 'periodEnd', label: 'Service Period End', type: 'date' as const, required: false, helpText: 'End date of cleaning period' },
                { fieldName: 'siteAddress', label: 'Cleaning Site Address', type: 'textarea' as const, required: false, helpText: 'Location where cleaning was performed' },
                { fieldName: 'frequency', label: 'Service Frequency', type: 'text' as const, required: false, placeholder: 'Weekly/Bi-weekly/Monthly', helpText: 'How often service is provided' },
                { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, placeholder: 'Payment due within 14 days', helpText: 'Payment terms' },
                { fieldName: 'bankName', label: 'Bank Name', type: 'text' as const, required: false, helpText: 'Bank for payment' },
                { fieldName: 'accountNumber', label: 'Account Number', type: 'text' as const, required: false, helpText: 'Account number' },
                { fieldName: 'sortCode', label: 'Sort Code', type: 'text' as const, required: false, helpText: 'Sort code' }
              ],
              industryStandards: [
                {
                  standard: 'Public Liability Insurance',
                  description: 'Commercial cleaning companies should have £5-10 million public liability insurance',
                  complianceLevel: 'required'
                },
                {
                  standard: 'COSHH Compliance',
                  description: 'Control of Substances Hazardous to Health regulations compliance required',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Service Level Agreement',
                  description: 'Reference SLA terms and cleaning schedule',
                  complianceLevel: 'recommended'
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
                clientName: 'Midlands Office Park Management',
                clientAddress: '100 Business Quarter, Birmingham, B1 1TT',
                siteAddress: 'Office Buildings A, B, C - Midlands Office Park, Birmingham',
                periodStart: '2024-10-01',
                periodEnd: '2024-10-31',
                frequency: 'Daily (Monday-Friday)',
                lineItems: [
                  { description: 'Daily office cleaning - October 2024 (22 working days)', quantity: 22, rate: 185.00, amount: 4070.00 },
                  { description: 'Deep clean - Building A (monthly)', quantity: 1, rate: 450.00, amount: 450.00 },
                  { description: 'Window cleaning - External (monthly)', quantity: 1, rate: 320.00, amount: 320.00 },
                  { description: 'Carpet cleaning - Common areas', quantity: 1, rate: 280.00, amount: 280.00 }
                ],
                subtotal: 5120.00,
                vatAmount: 1024.00,
                totalAmount: 6144.00,
                paymentTerms: 'Payment due within 14 days by bank transfer. Monthly invoice for October 2024 cleaning services.',
                notes: 'All cleaning materials provided by Premier Clean Solutions. Service performed according to agreed SLA.'
              }
            }
          ]
        }
      }
    }
  }
};

// ============================================================================
// INDUSTRY: AUTOMOTIVE SERVICES
// ============================================================================

export const automotiveIndustryPremium: Industry = {
  id: 'automotive-premium',
  name: 'Automotive Services (Premium)',
  description: 'Comprehensive invoice templates for vehicle sales, repairs, and maintenance',
  icon: '🚗',
  totalSearchVolume: 1700,
  categories: {
    vehicleSales: {
      id: 'vehicle-sales',
      name: 'Vehicle Sales',
      description: 'Car sales receipts and invoices',
      icon: '🚘',
      subCategories: {
        privateSales: {
          id: 'private-sales',
          name: 'Private Vehicle Sales',
          description: 'Car sales between private parties',
          templates: [
            {
              id: 'auto-sale-001',
              name: 'Car Sales Receipt (UK)',
              description: 'Official receipt for private car sales in the UK',
              keywords: [
                'car sales receipt template uk',
                'car sale receipt template uk',
                'car sale receipt template uk word',
                'vehicle sales receipt'
              ],
              searchVolume: 720,
              cpc: 1.85,
              searchDifficulty: 31,
              requiredFields: [
                { fieldName: 'receiptNumber', label: 'Receipt Number', type: 'text' as const, required: true, placeholder: 'REC-2024-001', helpText: 'Unique receipt reference' },
                { fieldName: 'saleDate', label: 'Date of Sale', type: 'date' as const, required: true, helpText: 'Date vehicle was sold' },
                { fieldName: 'sellerName', label: 'Seller Name', type: 'text' as const, required: true, placeholder: 'John Smith', helpText: 'Person selling the vehicle' },
                { fieldName: 'sellerAddress', label: 'Seller Address', type: 'textarea' as const, required: true, placeholder: '123 Seller Street, London, SE1 9RT', helpText: 'Seller\'s full address' },
                { fieldName: 'buyerName', label: 'Buyer Name', type: 'text' as const, required: true, placeholder: 'Jane Doe', helpText: 'Person buying the vehicle' },
                { fieldName: 'buyerAddress', label: 'Buyer Address', type: 'textarea' as const, required: true, helpText: 'Buyer\'s full address' },
                premiumFields.vehicleRegistration,
                premiumFields.vehicleMake,
                premiumFields.vehicleModel,
                premiumFields.vehicleYear,
                premiumFields.mileage,
                { fieldName: 'salePrice', label: 'Sale Price', type: 'currency' as const, required: true, helpText: 'Agreed sale price' }
              ],
              optionalFields: [
                premiumFields.vinNumber,
                premiumFields.motExpiry,
                { fieldName: 'colour', label: 'Vehicle Colour', type: 'text' as const, required: false, placeholder: 'Blue', helpText: 'Vehicle colour' },
                { fieldName: 'engineSize', label: 'Engine Size', type: 'text' as const, required: false, placeholder: '1.6L', helpText: 'Engine capacity' },
                { fieldName: 'fuelType', label: 'Fuel Type', type: 'text' as const, required: false, placeholder: 'Petrol', helpText: 'Petrol/Diesel/Electric/Hybrid' },
                { fieldName: 'transmission', label: 'Transmission', type: 'text' as const, required: false, placeholder: 'Manual', helpText: 'Manual or Automatic' },
                { fieldName: 'serviceHistory', label: 'Service History', type: 'text' as const, required: false, placeholder: 'Full service history', helpText: 'Service history status' },
                { fieldName: 'v5Document', label: 'V5C Logbook', type: 'text' as const, required: false, placeholder: 'Present', helpText: 'V5C registration document status' },
                { fieldName: 'paymentMethod', label: 'Payment Method', type: 'text' as const, required: false, placeholder: 'Bank Transfer', helpText: 'How payment was made' },
                { fieldName: 'soldAs', label: 'Sold As', type: 'text' as const, required: false, placeholder: 'Sold as seen - no warranty', helpText: 'Condition terms' },
                { fieldName: 'sellerSignature', label: 'Seller Signature', type: 'text' as const, required: false, helpText: 'Seller signature or digital confirmation' },
                { fieldName: 'buyerSignature', label: 'Buyer Signature', type: 'text' as const, required: false, helpText: 'Buyer signature or digital confirmation' }
              ],
              industryStandards: [
                {
                  standard: 'V5C Notification',
                  description: 'Both parties must notify DVLA of ownership change within 14 days using V5C logbook',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Sold As Seen',
                  description: 'Private sales typically sold "as seen" with no warranty, but vehicle description must be accurate',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'MOT Certificate',
                  description: 'Vehicle must have valid MOT if over 3 years old (record expiry date)',
                  complianceLevel: 'required'
                }
              ],
              sampleData: {
                receiptNumber: 'REC-2024-4523',
                saleDate: '2024-10-18',
                sellerName: 'Michael Thompson',
                sellerAddress: '67 Park Road, Leeds, LS6 4HB',
                sellerPhone: '+44 113 987 6543',
                buyerName: 'Sarah Williams',
                buyerAddress: '92 Meadow Lane, Bradford, BD9 5PQ',
                buyerPhone: '+44 1274 123 456',
                vehicleRegistration: 'BD18 XYZ',
                vehicleMake: 'Ford',
                vehicleModel: 'Focus',
                vehicleYear: 2018,
                colour: 'Grey',
                mileage: 42350,
                vinNumber: 'WF0WXXGCDW8J12345',
                engineSize: '1.5L',
                fuelType: 'Petrol',
                transmission: 'Manual',
                motExpiry: '2025-08-15',
                serviceHistory: 'Full Ford service history - 5 stamps',
                v5Document: 'Present - will be sent to DVLA within 14 days',
                salePrice: 8750.00,
                paymentMethod: 'Bank Transfer',
                soldAs: 'Sold as seen with no warranty. Vehicle in good condition as described.',
                sellerSignature: 'M. Thompson',
                buyerSignature: 'S. Williams',
                notes: 'Both parties agree to notify DVLA of ownership change. Sale includes 2 keys, service book, and owner\'s manual.'
              }
            }
          ]
        }
      }
    },
    repairs: {
      id: 'repairs',
      name: 'Vehicle Repairs & Maintenance',
      description: 'Garage and mechanic invoices',
      icon: '🔧',
      subCategories: {
        general: {
          id: 'general-repairs',
          name: 'General Repairs',
          description: 'Car repair and maintenance services',
          templates: [
            {
              id: 'auto-repair-001',
              name: 'Car Repair Invoice',
              description: 'Professional invoice for vehicle repair services',
              keywords: [
                'car repair invoice template',
                'mechanic invoice template',
                'vehicle service invoice template',
                'garage invoice',
                'auto repair invoice'
              ],
              searchVolume: 170,
              cpc: 6.14,
              searchDifficulty: 70,
              requiredFields: [
                { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'INV-2024-001', helpText: 'Invoice reference number' },
                { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date of invoice' },
                { fieldName: 'businessName', label: 'Garage Name', type: 'text' as const, required: true, placeholder: 'Quality Motors', helpText: 'Your garage or repair shop name' },
                { fieldName: 'businessAddress', label: 'Garage Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
                { fieldName: 'businessEmail', label: 'Email', type: 'email' as const, required: true, helpText: 'Contact email' },
                { fieldName: 'businessPhone', label: 'Phone', type: 'phone' as const, required: true, helpText: 'Contact phone' },
                { fieldName: 'clientName', label: 'Customer Name', type: 'text' as const, required: true, placeholder: 'Mr John Smith', helpText: 'Vehicle owner name' },
                { fieldName: 'clientAddress', label: 'Customer Address', type: 'textarea' as const, required: false, helpText: 'Customer address' },
                { fieldName: 'clientPhone', label: 'Customer Phone', type: 'phone' as const, required: true, placeholder: '+44 7700 123456', helpText: 'Customer contact number' },
                premiumFields.vehicleRegistration,
                premiumFields.vehicleMake,
                premiumFields.vehicleModel,
                premiumFields.mileage,
                { fieldName: 'lineItems', label: 'Work Completed', type: 'textarea' as const, required: true, helpText: 'Parts and labour' },
                { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Total before VAT' },
                { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total due' }
              ],
              optionalFields: [
                { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'Your VAT registration' },
                { fieldName: 'vatAmount', label: 'VAT (20%)', type: 'currency' as const, required: false, helpText: 'VAT amount' },
                premiumFields.vehicleYear,
                premiumFields.vinNumber,
                premiumFields.motExpiry,
                { fieldName: 'jobCardNumber', label: 'Job Card Number', type: 'text' as const, required: false, placeholder: 'JC-2024-001', helpText: 'Internal job reference' },
                { fieldName: 'dateIn', label: 'Date Vehicle Booked In', type: 'date' as const, required: false, helpText: 'When vehicle arrived' },
                { fieldName: 'dateOut', label: 'Date Vehicle Collected', type: 'date' as const, required: false, helpText: 'When vehicle was collected' },
                { fieldName: 'faultDescription', label: 'Reported Fault', type: 'textarea' as const, required: false, placeholder: 'Customer reported: Brakes squeaking', helpText: 'Customer\'s description of problem' },
                { fieldName: 'workCarriedOut', label: 'Work Carried Out', type: 'textarea' as const, required: false, placeholder: 'Replaced front brake pads and discs. Test drove.', helpText: 'Summary of repairs' },
                { fieldName: 'partsTotal', label: 'Parts Total', type: 'currency' as const, required: false, helpText: 'Total parts cost' },
                { fieldName: 'labourTotal', label: 'Labour Total', type: 'currency' as const, required: false, helpText: 'Total labour cost' },
                { fieldName: 'labourHours', label: 'Labour Hours', type: 'number' as const, required: false, placeholder: '2.5', helpText: 'Hours worked' },
                { fieldName: 'labourRate', label: 'Labour Rate (per hour)', type: 'currency' as const, required: false, placeholder: '60', helpText: 'Hourly labour charge' },
                { fieldName: 'warrantyInfo', label: 'Warranty Information', type: 'textarea' as const, required: false, placeholder: 'Parts warranty: 12 months. Labour warranty: 6 months.', helpText: 'Warranty terms' },
                { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, placeholder: 'Payment due on collection', helpText: 'When payment is due' },
                { fieldName: 'paymentMethod', label: 'Payment Method', type: 'text' as const, required: false, placeholder: 'Card/Cash/Bank Transfer', helpText: 'How customer paid' }
              ],
              industryStandards: [
                {
                  standard: 'Trade Association Membership',
                  description: 'Consider displaying Good Garage Scheme or Motor Ombudsman membership',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Parts Warranty',
                  description: 'Typical parts warranty is 12 months, labour warranty 6 months',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Pricing Transparency',
                  description: 'Show clear breakdown of parts and labour costs',
                  complianceLevel: 'required'
                },
                {
                  standard: 'MOT Requirements',
                  description: 'If MOT test performed, record result and expiry date',
                  complianceLevel: 'required'
                }
              ],
              sampleData: {
                invoiceNumber: 'INV-2024-1673',
                invoiceDate: '2024-10-20',
                businessName: 'Advanced Auto Services',
                businessAddress: '45 Garage Road, Bristol, BS1 4QZ',
                businessEmail: 'info@advancedauto.co.uk',
                businessPhone: '+44 117 456 7890',
                vatNumber: 'GB 234 5678 90',
                clientName: 'Mrs Emma Johnson',
                clientPhone: '+44 7700 987654',
                clientEmail: 'emma.j@email.com',
                vehicleRegistration: 'BN19 ABC',
                vehicleMake: 'Volkswagen',
                vehicleModel: 'Golf',
                vehicleYear: 2019,
                mileage: 34567,
                vinNumber: 'WVWZZZAUZLW012345',
                motExpiry: '2025-03-15',
                jobCardNumber: 'JC-2024-0892',
                dateIn: '2024-10-18',
                dateOut: '2024-10-20',
                faultDescription: 'Customer reported: Brakes squeaking when braking. Dashboard warning light on.',
                workCarriedOut: 'Diagnosed: Front brake pads worn to minimum. Replaced front brake pads and machined discs. Checked rear brakes - serviceable. Reset brake warning light. Test drove vehicle - brakes functioning correctly.',
                lineItems: [
                  { description: 'Front brake pad set (genuine VW parts)', quantity: 1, rate: 89.99, amount: 89.99 },
                  { description: 'Brake disc machining', quantity: 2, rate: 25.00, amount: 50.00 },
                  { description: 'Labour - Brake replacement & test', quantity: 2, rate: 60.00, amount: 120.00 },
                  { description: 'Brake fluid top-up', quantity: 1, rate: 8.50, amount: 8.50 },
                  { description: 'Vehicle health check', quantity: 1, rate: 0, amount: 0 }
                ],
                partsTotal: 148.49,
                labourTotal: 120.00,
                labourHours: 2.0,
                labourRate: 60.00,
                subtotal: 268.49,
                vatAmount: 53.70,
                totalAmount: 322.19,
                paymentMethod: 'Card (Visa)',
                warrantyInfo: 'Parts warranty: 12 months / 12,000 miles. Labour warranty: 6 months.',
                paymentTerms: 'Payment due on collection. Card payments accepted.',
                notes: 'Vehicle ready for collection. Recommend checking brake fluid level in 3 months. Next service due at 40,000 miles.'
              }
            }
          ]
        }
      }
    }
  }
};

// ============================================================================
// INDUSTRY: HEALTHCARE SERVICES
// ============================================================================

export const healthcareIndustryPremium: Industry = {
  id: 'healthcare-premium',
  name: 'Healthcare Services (Premium)',
  description: 'Invoice templates for medical practitioners, locums, and healthcare professionals',
  icon: '⚕️',
  totalSearchVolume: 300,
  categories: {
    medical: {
      id: 'medical-services',
      name: 'Medical Services',
      description: 'Invoices for doctors and medical practitioners',
      icon: '🏥',
      subCategories: {
        locum: {
          id: 'locum',
          name: 'Locum Services',
          description: 'Locum GP and doctor invoices',
          templates: [
            {
              id: 'healthcare-locum-001',
              name: 'Locum GP Invoice',
              description: 'Professional invoice for locum GP and medical services',
              keywords: [
                'locum invoice template',
                'locum gp invoice template',
                'medical invoice template',
                'doctor invoice'
              ],
              searchVolume: 110,
              cpc: 3.76,
              searchDifficulty: 48,
              requiredFields: [
                { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'LOC-2024-001', helpText: 'Invoice reference' },
                { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date of invoice' },
                { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
                { fieldName: 'practitionerName', label: 'Your Name (Dr.)', type: 'text' as const, required: true, placeholder: 'Dr. Sarah Jones', helpText: 'Your full name with title' },
                premiumFields.gmcNumber,
                { fieldName: 'businessAddress', label: 'Your Address', type: 'textarea' as const, required: true, helpText: 'Your correspondence address' },
                { fieldName: 'businessEmail', label: 'Your Email', type: 'email' as const, required: true, helpText: 'Contact email' },
                { fieldName: 'businessPhone', label: 'Your Phone', type: 'phone' as const, required: true, helpText: 'Contact phone' },
                { fieldName: 'clientName', label: 'Practice Name', type: 'text' as const, required: true, placeholder: 'Greenway Medical Practice', helpText: 'GP surgery or practice name' },
                { fieldName: 'clientAddress', label: 'Practice Address', type: 'textarea' as const, required: true, helpText: 'Surgery address' },
                { fieldName: 'lineItems', label: 'Services Provided', type: 'textarea' as const, required: true, helpText: 'Sessions worked and dates' },
                { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Total fees' },
                { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total due' }
              ],
              optionalFields: [
                { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration (if applicable - most medical services are VAT exempt)' },
                { fieldName: 'nationalInsurance', label: 'National Insurance Number', type: 'text' as const, required: false, placeholder: 'AB 12 34 56 C', helpText: 'Your NI number for payroll' },
                { fieldName: 'performanceNumber', label: 'Performers List Number', type: 'text' as const, required: false, helpText: 'NHS Performers List reference' },
                { fieldName: 'indemnityProvider', label: 'Medical Indemnity Provider', type: 'text' as const, required: false, placeholder: 'MDU / MPS / MDDUS', helpText: 'Your medical indemnity organization' },
                { fieldName: 'indemnityNumber', label: 'Indemnity Membership Number', type: 'text' as const, required: false, helpText: 'Membership reference' },
                { fieldName: 'periodStart', label: 'Period Start', type: 'date' as const, required: false, helpText: 'Start of work period' },
                { fieldName: 'periodEnd', label: 'Period End', type: 'date' as const, required: false, helpText: 'End of work period' },
                { fieldName: 'sessionsWorked', label: 'Total Sessions', type: 'number' as const, required: false, placeholder: '8', helpText: 'Number of sessions completed' },
                { fieldName: 'sessionRate', label: 'Session Rate', type: 'currency' as const, required: false, placeholder: '550', helpText: 'Rate per session' },
                { fieldName: 'mileageAllowance', label: 'Mileage Allowance', type: 'currency' as const, required: false, helpText: 'Travel expenses at HMRC rates' },
                { fieldName: 'mileage', label: 'Miles Travelled', type: 'number' as const, required: false, placeholder: '120', helpText: 'Total miles claimed' },
                { fieldName: 'bankName', label: 'Bank Name', type: 'text' as const, required: false, helpText: 'Your bank' },
                { fieldName: 'accountNumber', label: 'Account Number', type: 'text' as const, required: false, helpText: 'Account number' },
                { fieldName: 'sortCode', label: 'Sort Code', type: 'text' as const, required: false, helpText: 'Sort code' },
                { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, placeholder: 'Payment due within 30 days by BACS', helpText: 'Payment terms' }
              ],
              industryStandards: [
                {
                  standard: 'GMC Registration',
                  description: 'All practicing doctors must be registered with the General Medical Council (GMC)',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Medical Indemnity Insurance',
                  description: 'Adequate medical indemnity insurance is mandatory (MDU, MPS, or MDDUS)',
                  complianceLevel: 'required'
                },
                {
                  standard: 'VAT Exemption',
                  description: 'Most medical services are VAT exempt under UK law',
                  complianceLevel: 'required'
                },
                {
                  standard: 'NHS Performers List',
                  description: 'For NHS work, must be on NHS Performers List',
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
                businessAddress: '12 Medical Gardens, London, NW3 5AB',
                businessEmail: 'dr.s.mitchell@medicmail.com',
                businessPhone: '+44 7700 123456',
                indemnityProvider: 'Medical Defence Union (MDU)',
                indemnityNumber: 'MDU-123456',
                clientName: 'Riverside Medical Centre',
                clientAddress: '45 High Street, Reading, RG1 2AB',
                clientEmail: 'admin@riversidemedical.nhs.uk',
                periodStart: '2024-10-01',
                periodEnd: '2024-10-31',
                sessionsWorked: 12,
                sessionRate: 550.00,
                lineItems: [
                  { description: 'AM Surgery Session - 01/10/2024', quantity: 1, rate: 550.00, amount: 550.00 },
                  { description: 'PM Surgery Session - 01/10/2024', quantity: 1, rate: 550.00, amount: 550.00 },
                  { description: 'AM Surgery Session - 08/10/2024', quantity: 1, rate: 550.00, amount: 550.00 },
                  { description: 'PM Surgery Session - 08/10/2024', quantity: 1, rate: 550.00, amount: 550.00 },
                  { description: 'AM Surgery Session - 15/10/2024', quantity: 1, rate: 550.00, amount: 550.00 },
                  { description: 'PM Surgery Session - 15/10/2024', quantity: 1, rate: 550.00, amount: 550.00 },
                  { description: 'AM Surgery Session - 22/10/2024', quantity: 1, rate: 550.00, amount: 550.00 },
                  { description: 'PM Surgery Session - 22/10/2024', quantity: 1, rate: 550.00, amount: 550.00 },
                  { description: 'AM Surgery Session - 29/10/2024', quantity: 1, rate: 550.00, amount: 550.00 },
                  { description: 'PM Surgery Session - 29/10/2024', quantity: 1, rate: 550.00, amount: 550.00 },
                  { description: 'Out-of-hours on-call - 12/10/2024', quantity: 1, rate: 550.00, amount: 550.00 },
                  { description: 'Out-of-hours on-call - 26/10/2024', quantity: 1, rate: 550.00, amount: 550.00 },
                  { description: 'Mileage allowance (240 miles @ £0.45/mile)', quantity: 240, rate: 0.45, amount: 108.00 }
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
              }
            }
          ]
        }
      }
    }
  }
};

// ============================================================================
// INDUSTRY: CREATIVE SERVICES (EXTENDED)
// ============================================================================

export const creativeIndustryPremium: Industry = {
  id: 'creative-premium',
  name: 'Creative Services (Premium)',
  description: 'Extended invoice templates for photography, design, and creative professionals',
  icon: '🎨',
  totalSearchVolume: 710,
  categories: {
    photography: {
      id: 'photography-extended',
      name: 'Photography Services',
      description: 'Professional photography invoices',
      icon: '📸',
      subCategories: {
        commercial: {
          id: 'commercial-photography',
          name: 'Commercial Photography',
          description: 'Product and commercial photography',
          templates: [
            {
              id: 'photo-commercial-002',
              name: 'Commercial Photography Invoice',
              description: 'Professional invoice for commercial photography services with usage rights',
              keywords: [
                'photography invoice template',
                'photographer invoice template',
                'commercial photography invoice',
                'product photography invoice'
              ],
              searchVolume: 390,
              cpc: 2.76,
              searchDifficulty: 54,
              requiredFields: [
                { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'PHOTO-2024-001', helpText: 'Invoice reference' },
                { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date issued' },
                { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
                { fieldName: 'businessName', label: 'Your Photography Business', type: 'text' as const, required: true, placeholder: 'Studio Vision Photography', helpText: 'Your business name' },
                { fieldName: 'businessAddress', label: 'Your Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
                { fieldName: 'businessEmail', label: 'Your Email', type: 'email' as const, required: true, helpText: 'Contact email' },
                { fieldName: 'clientName', label: 'Client Name', type: 'text' as const, required: true, placeholder: 'Acme Products Ltd', helpText: 'Client company name' },
                { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: true, helpText: 'Client billing address' },
                premiumFields.projectName,
                { fieldName: 'lineItems', label: 'Photography Services', type: 'textarea' as const, required: true, helpText: 'Services and deliverables' },
                { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Total before VAT' },
                { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total due' }
              ],
              optionalFields: [
                { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration' },
                { fieldName: 'vatAmount', label: 'VAT (20%)', type: 'currency' as const, required: false, helpText: 'VAT amount' },
                premiumFields.serviceDate,
                premiumFields.usageRights,
                premiumFields.deliverables,
                premiumFields.revisions,
                premiumFields.copyrightTransfer,
                { fieldName: 'shootDate', label: 'Photoshoot Date', type: 'date' as const, required: false, helpText: 'Date of photography session' },
                { fieldName: 'shootLocation', label: 'Shoot Location', type: 'text' as const, required: false, placeholder: 'Studio / Client Premises', helpText: 'Where photos were taken' },
                { fieldName: 'numberOfImages', label: 'Number of Final Images', type: 'number' as const, required: false, placeholder: '50', helpText: 'Edited images delivered' },
                { fieldName: 'imageFormat', label: 'Image Format', type: 'text' as const, required: false, placeholder: 'High-res JPEG, TIFF', helpText: 'File formats delivered' },
                { fieldName: 'licenseType', label: 'License Type', type: 'textarea' as const, required: false, placeholder: 'Exclusive commercial use, UK only, 2 years', helpText: 'Usage license terms' },
                { fieldName: 'depositPaid', label: 'Deposit Paid', type: 'currency' as const, required: false, helpText: 'Deposit already received' },
                { fieldName: 'balanceDue', label: 'Balance Due', type: 'currency' as const, required: false, helpText: 'Remaining balance' },
                { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, placeholder: 'Balance due before image delivery', helpText: 'Payment terms' },
                { fieldName: 'bankName', label: 'Bank Name', type: 'text' as const, required: false, helpText: 'Bank for payment' },
                { fieldName: 'accountNumber', label: 'Account Number', type: 'text' as const, required: false, helpText: 'Account number' },
                { fieldName: 'sortCode', label: 'Sort Code', type: 'text' as const, required: false, helpText: 'Sort code' }
              ],
              industryStandards: [
                {
                  standard: 'Copyright Ownership',
                  description: 'Photographer retains copyright unless explicitly transferred. License terms must be clear.',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Usage Rights',
                  description: 'Specify usage rights: commercial/editorial, geographic territory, time period, exclusivity',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Image Delivery',
                  description: 'Specify number of images, formats, resolution, and delivery method',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Model Releases',
                  description: 'If people are photographed, model release forms should be obtained',
                  complianceLevel: 'recommended'
                }
              ],
              sampleData: {
                invoiceNumber: 'PHOTO-2024-0234',
                invoiceDate: '2024-10-25',
                dueDate: '2024-11-08',
                businessName: 'Focal Point Photography Ltd',
                businessAddress: '56 Studio Lane, Manchester, M1 5QR',
                businessEmail: 'bookings@focalpointphoto.co.uk',
                businessPhone: '+44 161 789 0123',
                vatNumber: 'GB 678 9012 34',
                clientName: 'Heritage Furniture Ltd',
                clientAddress: '100 Commerce Street, Leeds, LS2 8PP',
                clientEmail: 'marketing@heritagefurniture.co.uk',
                projectName: 'Autumn 2024 Product Catalogue Photography',
                shootDate: '2024-10-15',
                shootLocation: 'Focal Point Studio, Manchester',
                numberOfImages: 75,
                imageFormat: 'High-resolution JPEG (300dpi) and TIFF',
                lineItems: [
                  { description: 'Full day product photography session', quantity: 1, rate: 1200.00, amount: 1200.00 },
                  { description: 'Photo editing and retouching (75 images)', quantity: 75, rate: 15.00, amount: 1125.00 },
                  { description: 'Professional styling and setup', quantity: 1, rate: 350.00, amount: 350.00 },
                  { description: 'Backdrop and lighting setup', quantity: 1, rate: 150.00, amount: 150.00 },
                  { description: 'Usage license - Commercial, UK, 2 years', quantity: 1, rate: 800.00, amount: 800.00 }
                ],
                usageRights: 'Commercial use license: UK territory only, 2 years from delivery date. For Heritage Furniture marketing materials (print and digital). Non-exclusive license. Copyright remains with Focal Point Photography.',
                deliverables: '- 75 fully edited high-resolution images\n- JPEG format (300dpi, RGB)\n- TIFF format (uncompressed, for print)\n- Contact sheet PDF\n- Delivered via WeTransfer within 7 days',
                licenseType: 'Non-exclusive commercial license for Heritage Furniture marketing use (print, web, social media) within UK territory for 2 years. Additional usage requires separate license.',
                copyrightTransfer: 'Copyright retained by photographer',
                revisions: 2,
                subtotal: 3625.00,
                vatAmount: 725.00,
                totalAmount: 4350.00,
                depositPaid: 1500.00,
                balanceDue: 2850.00,
                bankName: 'Lloyds Bank',
                accountNumber: '87654321',
                sortCode: '30-12-34',
                paymentTerms: '50% deposit paid (£1,500). Balance of £2,850 due within 14 days. Images delivered upon final payment.',
                notes: '2 rounds of revisions included. Additional editing charged at £20/image. Model release forms obtained for lifestyle shots. Copyright © Focal Point Photography Ltd 2024.'
              }
            }
          ]
        }
      }
    },
    design: {
      id: 'design-services',
      name: 'Graphic Design',
      description: 'Design and branding invoices',
      icon: '✏️',
      subCategories: {
        web: {
          id: 'web-design',
          name: 'Web Design',
          description: 'Website design and development',
          templates: [
            {
              id: 'design-web-001',
              name: 'Website Design Invoice',
              description: 'Professional invoice for website design projects',
              keywords: [
                'website design invoice template',
                'web design invoice',
                'web developer invoice'
              ],
              searchVolume: 70,
              cpc: 1.96,
              searchDifficulty: 14,
              requiredFields: [
                { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'WEB-2024-001', helpText: 'Invoice reference' },
                { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date issued' },
                { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
                { fieldName: 'businessName', label: 'Your Business Name', type: 'text' as const, required: true, placeholder: 'Digital Creative Studio', helpText: 'Your company name' },
                { fieldName: 'businessAddress', label: 'Your Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
                { fieldName: 'businessEmail', label: 'Your Email', type: 'email' as const, required: true, helpText: 'Contact email' },
                { fieldName: 'clientName', label: 'Client Name', type: 'text' as const, required: true, placeholder: 'ABC Company Ltd', helpText: 'Client name' },
                { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: true, helpText: 'Client billing address' },
                premiumFields.projectName,
                { fieldName: 'lineItems', label: 'Services Provided', type: 'textarea' as const, required: true, helpText: 'Design services breakdown' },
                { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Total before VAT' },
                { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total due' }
              ],
              optionalFields: [
                { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration' },
                { fieldName: 'vatAmount', label: 'VAT (20%)', type: 'currency' as const, required: false, helpText: 'VAT amount' },
                premiumFields.deliverables,
                premiumFields.revisions,
                { fieldName: 'websiteUrl', label: 'Website URL', type: 'text' as const, required: false, placeholder: 'https://example.com', helpText: 'Client website address' },
                { fieldName: 'numberOfPages', label: 'Number of Pages', type: 'number' as const, required: false, placeholder: '10', helpText: 'Total website pages' },
                { fieldName: 'hostingIncluded', label: 'Hosting Included', type: 'text' as const, required: false, placeholder: 'Yes - 12 months', helpText: 'Hosting details' },
                { fieldName: 'domainIncluded', label: 'Domain Included', type: 'text' as const, required: false, placeholder: 'Yes - 12 months', helpText: 'Domain registration' },
                { fieldName: 'maintenancePackage', label: 'Maintenance Package', type: 'textarea' as const, required: false, placeholder: '3 months free updates included', helpText: 'Post-launch support terms' },
                { fieldName: 'depositPaid', label: 'Deposit Paid', type: 'currency' as const, required: false, helpText: 'Deposit received' },
                { fieldName: 'balanceDue', label: 'Balance Due', type: 'currency' as const, required: false, helpText: 'Remaining balance' },
                { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, placeholder: 'Balance due on website launch', helpText: 'Payment terms' },
                { fieldName: 'bankName', label: 'Bank Name', type: 'text' as const, required: false, helpText: 'Bank for payment' },
                { fieldName: 'accountNumber', label: 'Account Number', type: 'text' as const, required: false, helpText: 'Account number' },
                { fieldName: 'sortCode', label: 'Sort Code', type: 'text' as const, required: false, helpText: 'Sort code' }
              ],
              industryStandards: [
                {
                  standard: 'Intellectual Property Rights',
                  description: 'Clarify ownership of design files and source code upon final payment',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Browser Compatibility',
                  description: 'Specify which browsers and devices are supported',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'GDPR Compliance',
                  description: 'Ensure website meets GDPR requirements (privacy policy, cookie consent)',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Accessibility',
                  description: 'Consider WCAG 2.1 accessibility guidelines',
                  complianceLevel: 'recommended'
                }
              ],
              sampleData: {
                invoiceNumber: 'WEB-2024-0178',
                invoiceDate: '2024-10-28',
                dueDate: '2024-11-11',
                businessName: 'Pixel Perfect Web Design',
                businessAddress: '89 Tech Park, Cambridge, CB2 1EF',
                businessEmail: 'hello@pixelperfect.co.uk',
                businessPhone: '+44 1223 456 789',
                vatNumber: 'GB 789 0123 45',
                clientName: 'Green Gardens Landscaping Ltd',
                clientAddress: '23 Garden Road, Cambridge, CB4 2QQ',
                clientEmail: 'info@greengardens.co.uk',
                projectName: 'Green Gardens Company Website Redesign',
                websiteUrl: 'https://www.greengardens.co.uk',
                numberOfPages: 12,
                hostingIncluded: 'Yes - 12 months included',
                domainIncluded: 'Existing domain transferred',
                lineItems: [
                  { description: 'Initial consultation and planning', quantity: 1, rate: 400.00, amount: 400.00 },
                  { description: 'Custom website design (12 pages)', quantity: 12, rate: 250.00, amount: 3000.00 },
                  { description: 'Mobile-responsive development', quantity: 1, rate: 1200.00, amount: 1200.00 },
                  { description: 'Content Management System (WordPress) setup', quantity: 1, rate: 600.00, amount: 600.00 },
                  { description: 'Portfolio gallery with 50+ images', quantity: 1, rate: 350.00, amount: 350.00 },
                  { description: 'Contact form with Google Maps integration', quantity: 1, rate: 200.00, amount: 200.00 },
                  { description: 'SEO optimization and Google Analytics setup', quantity: 1, rate: 300.00, amount: 300.00 },
                  { description: 'Web hosting - 12 months', quantity: 1, rate: 120.00, amount: 120.00 },
                  { description: 'SSL certificate - 12 months', quantity: 1, rate: 50.00, amount: 50.00 },
                  { description: 'Training session (2 hours)', quantity: 2, rate: 80.00, amount: 160.00 }
                ],
                deliverables: '- Fully responsive website (desktop, tablet, mobile)\n- WordPress CMS with admin training\n- Portfolio gallery with image optimization\n- Contact form with spam protection\n- Google Analytics integration\n- 12 months hosting and SSL\n- GDPR-compliant privacy policy\n- Source files and documentation',
                revisions: 3,
                maintenancePackage: '3 months free post-launch support included. Minor content updates and bug fixes covered.',
                subtotal: 6380.00,
                vatAmount: 1276.00,
                totalAmount: 7656.00,
                depositPaid: 2500.00,
                balanceDue: 5156.00,
                bankName: 'Santander',
                accountNumber: '98765432',
                sortCode: '09-01-28',
                paymentTerms: 'Deposit of £2,500 paid. Balance of £5,156 due on website launch. Ownership of design files transfers upon final payment.',
                notes: '3 rounds of revisions included. Website launched 25/10/2024. Training session completed. All source files will be provided on final payment.'
              }
            }
          ]
        }
      }
    }
  }
};

// ============================================================================
// INDUSTRY: HOSPITALITY (EXTENDED)
// ============================================================================

export const hospitalityIndustryExtended: Industry = {
  id: 'hospitality-extended',
  name: 'Hospitality Services (Extended)',
  description: 'Extended hospitality invoice templates including Airbnb',
  icon: '🏨',
  totalSearchVolume: 190,
  categories: {
    accommodation: {
      id: 'accommodation-extended',
      name: 'Accommodation Services',
      description: 'Hotels, B&Bs, and short-term rentals',
      icon: '🛏️',
      subCategories: {
        shortTerm: {
          id: 'short-term-rentals',
          name: 'Short-Term Rentals',
          description: 'Airbnb and holiday let invoices',
          templates: [
            {
              id: 'accommodation-airbnb-001',
              name: 'Airbnb/Holiday Let Invoice',
              description: 'Invoice template for Airbnb hosts and holiday let providers',
              keywords: [
                'airbnb invoice template',
                'holiday let invoice',
                'short-term rental invoice',
                'vacation rental invoice'
              ],
              searchVolume: 70,
              cpc: 1.57,
              searchDifficulty: 45,
              requiredFields: [
                { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'INV-2024-001', helpText: 'Invoice reference' },
                { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date issued' },
                { fieldName: 'propertyName', label: 'Property Name', type: 'text' as const, required: true, placeholder: 'Seaside Cottage', helpText: 'Your property name' },
                { fieldName: 'propertyAddress', label: 'Property Address', type: 'textarea' as const, required: true, placeholder: '12 Beach Road, Cornwall, TR1 2AB', helpText: 'Property location' },
                { fieldName: 'hostName', label: 'Your Name (Host)', type: 'text' as const, required: true, placeholder: 'Jane Smith', helpText: 'Property owner/host name' },
                { fieldName: 'hostAddress', label: 'Your Address', type: 'textarea' as const, required: true, helpText: 'Your billing address' },
                { fieldName: 'hostEmail', label: 'Your Email', type: 'email' as const, required: true, helpText: 'Contact email' },
                { fieldName: 'guestName', label: 'Guest Name', type: 'text' as const, required: true, placeholder: 'Mr John Doe', helpText: 'Guest name' },
                premiumFields.checkInDate,
                premiumFields.checkOutDate,
                premiumFields.numberOfNights,
                { fieldName: 'lineItems', label: 'Charges', type: 'textarea' as const, required: true, helpText: 'Accommodation charges breakdown' },
                { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total due' }
              ],
              optionalFields: [
                { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration (if applicable)' },
                premiumFields.numberOfGuests,
                premiumFields.bookingReference,
                { fieldName: 'platformBookingId', label: 'Airbnb/Platform Booking ID', type: 'text' as const, required: false, placeholder: 'AB-12345678', helpText: 'Booking platform reference' },
                { fieldName: 'nightly Rate', label: 'Nightly Rate', type: 'currency' as const, required: false, placeholder: '120', helpText: 'Rate per night' },
                { fieldName: 'cleaningFee', label: 'Cleaning Fee', type: 'currency' as const, required: false, helpText: 'One-time cleaning charge' },
                { fieldName: 'serviceFee', label: 'Platform Service Fee', type: 'currency' as const, required: false, helpText: 'Airbnb or platform fee' },
                { fieldName: 'touristTax', label: 'Tourist Tax', type: 'currency' as const, required: false, helpText: 'Local tourism tax (if applicable)' },
                { fieldName: 'securityDeposit', label: 'Security Deposit', type: 'currency' as const, required: false, helpText: 'Refundable deposit amount' },
                { fieldName: 'depositRefunded', label: 'Deposit Refunded', type: 'currency' as const, required: false, helpText: 'Security deposit returned' },
                { fieldName: 'checkInTime', label: 'Check-in Time', type: 'text' as const, required: false, placeholder: '15:00', helpText: 'Check-in time' },
                { fieldName: 'checkOutTime', label: 'Check-out Time', type: 'text' as const, required: false, placeholder: '11:00', helpText: 'Check-out time' },
                { fieldName: 'paymentMethod', label: 'Payment Method', type: 'text' as const, required: false, placeholder: 'Airbnb / Direct Bank Transfer', helpText: 'How guest paid' },
                { fieldName: 'cancellationPolicy', label: 'Cancellation Policy', type: 'textarea' as const, required: false, placeholder: 'Flexible - Free cancellation up to 24 hours before check-in', helpText: 'Cancellation terms' },
                { fieldName: 'notes', label: 'Additional Notes', type: 'textarea' as const, required: false, placeholder: 'Thank you for staying with us!', helpText: 'Guest notes' }
              ],
              industryStandards: [
                {
                  standard: 'VAT on Holiday Accommodation',
                  description: 'Holiday lets in UK are usually VAT exempt unless providing additional services (meals, entertainment)',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Tourist Tax',
                  description: 'Some UK local authorities charge tourism tax - check local regulations',
                  complianceLevel: 'optional'
                },
                {
                  standard: 'Safety Compliance',
                  description: 'Ensure gas/electrical safety certificates, smoke alarms, and carbon monoxide detectors comply with UK law',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Licensing',
                  description: 'Check if your local authority requires a holiday let license',
                  complianceLevel: 'recommended'
                }
              ],
              sampleData: {
                invoiceNumber: 'INV-2024-0734',
                invoiceDate: '2024-10-01',
                propertyName: 'Coastal Haven Cottage',
                propertyAddress: '45 Harbour View, St Ives, Cornwall, TR26 1AB',
                hostName: 'Emma Richardson',
                hostAddress: '67 London Road, Truro, Cornwall, TR1 3AA',
                hostEmail: 'emma@coastalhaven.co.uk',
                hostPhone: '+44 1736 123 456',
                guestName: 'Mr & Mrs Peterson',
                guestEmail: 'peterson@email.com',
                bookingReference: 'CH-2024-734',
                platformBookingId: 'HMABCD123456',
                checkInDate: '2024-10-15',
                checkOutDate: '2024-10-22',
                checkInTime: '16:00',
                checkOutTime: '10:00',
                numberOfNights: 7,
                numberOfGuests: 4,
                lineItems: [
                  { description: 'Accommodation (7 nights @ £150/night)', quantity: 7, rate: 150.00, amount: 1050.00 },
                  { description: 'Cleaning fee', quantity: 1, rate: 50.00, amount: 50.00 },
                  { description: 'Linen and towels', quantity: 1, rate: 25.00, amount: 25.00 }
                ],
                nightlyRate: 150.00,
                cleaningFee: 50.00,
                securityDeposit: 200.00,
                depositRefunded: 200.00,
                totalAmount: 1125.00,
                paymentMethod: 'Airbnb Platform',
                cancellationPolicy: 'Moderate: Free cancellation up to 5 days before check-in. 50% refund for cancellations within 5 days.',
                notes: 'Thank you for staying at Coastal Haven Cottage! We hope you enjoyed your Cornish holiday. Security deposit of £200 will be refunded within 7 days after check-out inspection. Please leave a review on Airbnb!'
              }
            }
          ]
        }
      }
    }
  }
};

// ============================================================================
// ACCESS CONTROL FUNCTIONS
// ============================================================================

/**
 * Determine if a template is premium (requires paid tier)
 */
export function isTemplatePremium(templateId: string): boolean {
  // Check if template ID exists in any premium industry
  const allPremiumTemplates = [
    ...getAllTemplatesFromIndustry(constructionIndustryPremium),
    ...getAllTemplatesFromIndustry(automotiveIndustryPremium),
    ...getAllTemplatesFromIndustry(healthcareIndustryPremium),
    ...getAllTemplatesFromIndustry(creativeIndustryPremium),
    ...getAllTemplatesFromIndustry(hospitalityIndustryExtended)
  ];
  
  return allPremiumTemplates.some(t => t.id === templateId);
}

/**
 * Check if user has access to a template based on their tier
 */
export function hasTemplateAccess(templateId: string, userTier: UserTier = 'free'): boolean {
  // Premium and Pro users have access to all templates
  if (userTier === 'premium' || userTier === 'pro') {
    return true;
  }
  
  // Free users cannot access premium templates
  return !isTemplatePremium(templateId);
}

/**
 * Get all templates from an industry (helper function)
 */
function getAllTemplatesFromIndustry(industry: Industry): InvoiceTemplate[] {
  const templates: InvoiceTemplate[] = [];
  
  Object.values(industry.categories).forEach(category => {
    Object.values(category.subCategories).forEach(subCategory => {
      templates.push(...subCategory.templates);
    });
  });
  
  return templates;
}

/**
 * Get all premium templates accessible to user tier
 */
export function getPremiumTemplates(userTier: UserTier = 'free'): InvoiceTemplate[] {
  const allPremiumTemplates = [
    ...getAllTemplatesFromIndustry(constructionIndustryPremium),
    ...getAllTemplatesFromIndustry(automotiveIndustryPremium),
    ...getAllTemplatesFromIndustry(healthcareIndustryPremium),
    ...getAllTemplatesFromIndustry(creativeIndustryPremium),
    ...getAllTemplatesFromIndustry(hospitalityIndustryExtended)
  ];
  
  if (userTier === 'free') {
    // Free users can't access premium templates
    return [];
  }
  
  // Premium and Pro users get all templates
  return allPremiumTemplates;
}

/**
 * Get template count by tier
 */
export function getTemplateCountByTier(userTier: UserTier = 'free'): { total: number; accessible: number; locked: number } {
  const totalPremiumTemplates = [
    ...getAllTemplatesFromIndustry(constructionIndustryPremium),
    ...getAllTemplatesFromIndustry(automotiveIndustryPremium),
    ...getAllTemplatesFromIndustry(healthcareIndustryPremium),
    ...getAllTemplatesFromIndustry(creativeIndustryPremium),
    ...getAllTemplatesFromIndustry(hospitalityIndustryExtended)
  ].length;
  
  if (userTier === 'free') {
    return {
      total: totalPremiumTemplates,
      accessible: 0,
      locked: totalPremiumTemplates
    };
  }
  
  return {
    total: totalPremiumTemplates,
    accessible: totalPremiumTemplates,
    locked: 0
  };
}

/**
 * Get upgrade message for a premium template
 */
export function getUpgradeMessage(templateId: string): string {
  const template = findTemplateById(templateId);
  if (!template) return 'Upgrade to Premium to access this template';
  
  return `Upgrade to Premium (£9.99/mo) to unlock ${template.name} with industry-specific fields, compliance helpers, and unlimited use.`;
}

/**
 * Find template by ID across all premium industries
 */
export function findTemplateById(templateId: string): InvoiceTemplate | null {
  const allTemplates = [
    ...getAllTemplatesFromIndustry(constructionIndustryPremium),
    ...getAllTemplatesFromIndustry(automotiveIndustryPremium),
    ...getAllTemplatesFromIndustry(healthcareIndustryPremium),
    ...getAllTemplatesFromIndustry(creativeIndustryPremium),
    ...getAllTemplatesFromIndustry(hospitalityIndustryExtended)
  ];
  
  return allTemplates.find(t => t.id === templateId) || null;
}

// ============================================================================
// EXPORTS
// ============================================================================

export const allPremiumIndustries = {
  constructionPremium: constructionIndustryPremium,
  automotivePremium: automotiveIndustryPremium,
  healthcarePremium: healthcareIndustryPremium,
  creativePremium: creativeIndustryPremium,
  hospitalityExtended: hospitalityIndustryExtended
};

export default {
  allPremiumIndustries,
  isTemplatePremium,
  hasTemplateAccess,
  getPremiumTemplates,
  getTemplateCountByTier,
  getUpgradeMessage,
  findTemplateById
};
/**
 * UK Invoice Knowledge Base Library
 * 
 * Comprehensive UK-specific invoice compliance data organized by:
 * Business Identifiers → VAT System → CIS → Formats → Compliance
 * 
 * Based on HMRC regulations and UK business standards
 * Optimized for SEO with high-volume keywords from UK invoice domain
 * 
 * Last Updated: 2025-10-20
 * Compliance: HMRC Making Tax Digital (MTD) Compatible
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface BusinessIdentifier {
  id: string;
  name: string;
  description: string;
  purpose: string;
  format: string;
  regulatoryBody: string;
  validationPattern: string;
  displayFormat?: string;
  required: 'required' | 'recommended' | 'optional';
  industrySpecific?: string[];
  examples: string[];
  keywords: string[];
  searchVolume: number;
  complianceNotes: string;
}

export interface VATRate {
  id: string;
  rate: number;
  name: string;
  code: string;
  description: string;
  appliesTo: string[];
  examples: string[];
  keywords: string[];
  searchVolume: number;
  displayLabel: string;
}

export interface CISRate {
  id: string;
  rate: number;
  name: string;
  status: string;
  description: string;
  appliesTo: string[];
  calculationNote: string;
  keywords: string[];
  searchVolume: number;
  displayLabel: string;
}

export interface ValidationRule {
  id: string;
  fieldName: string;
  fieldType: string;
  description: string;
  pattern: string;
  examples: string[];
  errorMessage: string;
  keywords: string[];
}

export interface ComplianceRequirement {
  id: string;
  name: string;
  category: 'MTD' | 'CIS' | 'VAT' | 'General';
  description: string;
  effectiveDate: string;
  mandatory: boolean;
  requirements: string[];
  penalties: string;
  keywords: string[];
  searchVolume: number;
}

export interface InvoiceFormat {
  id: string;
  name: string;
  description: string;
  pattern?: string;
  examples: string[];
  notes: string;
}

// ============================================================================
// UK BUSINESS IDENTIFIERS
// ============================================================================

export const ukBusinessIdentifiers: Record<string, BusinessIdentifier> = {
  vatNumber: {
    id: 'vat-number',
    name: 'VAT Registration Number',
    description: 'Identifies VAT-registered businesses in the UK',
    purpose: 'Legal requirement for VAT-registered businesses to display on invoices',
    format: 'GB followed by 9 or 12 digits, or special formats for certain entities',
    regulatoryBody: 'HM Revenue & Customs (HMRC)',
    validationPattern: '^GB([0-9]{9}|[0-9]{12}|GD[0-9]{3}|HA[0-9]{3})$',
    displayFormat: 'GB XXX XXXX XX (with spaces)',
    required: 'required',
    examples: [
      'GB123456789',
      'GB123456789012',
      'GBGD123',
      'GBHA456'
    ],
    keywords: [
      'UK VAT number validation',
      'VAT registration number format',
      'GB VAT number check',
      'HMRC VAT number',
      'VAT number on invoice UK',
      'check VAT number UK'
    ],
    searchVolume: 880,
    complianceNotes: 'Must be displayed on all VAT invoices if business is VAT-registered. Format must include GB prefix followed by valid number.'
  },
  
  companyNumber: {
    id: 'company-number',
    name: 'Company Registration Number',
    description: 'Identifies companies registered with Companies House',
    purpose: 'Provides transparency and legitimacy for limited companies',
    format: '8 digits, or 2-letter prefix + 6 digits',
    regulatoryBody: 'Companies House',
    validationPattern: '^([0-9]{8}|SC[0-9]{6}|NI[0-9]{6})$',
    required: 'recommended',
    examples: [
      '12345678',
      'SC123456',
      'NI123456'
    ],
    keywords: [
      'Companies House number',
      'UK company registration number',
      'Limited company number',
      'CRN validation',
      'company number on invoice'
    ],
    searchVolume: 720,
    complianceNotes: 'Recommended for limited companies to display on invoices. SC prefix for Scottish companies, NI prefix for Northern Ireland companies.'
  },
  
  gasSafeNumber: {
    id: 'gas-safe-number',
    name: 'Gas Safe Registration Number',
    description: 'Identifies registered gas engineers and plumbers',
    purpose: 'Legal requirement for anyone working on gas appliances',
    format: '6-7 digit number',
    regulatoryBody: 'Gas Safe Register',
    validationPattern: '^[0-9]{6,7}$',
    required: 'required',
    industrySpecific: ['Plumbing', 'Heating', 'Gas Engineering'],
    examples: [
      '123456',
      '1234567'
    ],
    keywords: [
      'Gas Safe registration number',
      'Gas engineer registration',
      'Plumber gas safe certificate',
      'UK gas safe validation',
      'gas safe number on invoice',
      'gas safe register check'
    ],
    searchVolume: 590,
    complianceNotes: 'Legal requirement to be Gas Safe registered for any work on gas appliances. Must display number on invoices for gas-related work.'
  },
  
  niceicNumber: {
    id: 'niceic-number',
    name: 'NICEIC Registration Number',
    description: 'Identifies registered electricians and electrical contractors',
    purpose: 'Demonstrates competence and compliance with electrical safety standards',
    format: '5-8 alphanumeric characters',
    regulatoryBody: 'NICEIC (National Inspection Council for Electrical Installation Contracting)',
    validationPattern: '^[A-Z0-9]{5,8}$',
    required: 'recommended',
    industrySpecific: ['Electrical Contracting', 'Electrical Installation'],
    examples: [
      'ABC12',
      'ABC1234',
      'ABCD1234'
    ],
    keywords: [
      'NICEIC registration number',
      'Electrician certification',
      'UK electrical contractor registration',
      'NICEIC validation',
      'electrical certificate number',
      'Part P compliance'
    ],
    searchVolume: 480,
    complianceNotes: 'Industry standard certification for electricians. Demonstrates compliance with BS 7671 wiring regulations and Part P building regulations.'
  }
};

// ============================================================================
// UK VAT SYSTEM (2024-2025)
// ============================================================================

export const ukVATRates: Record<string, VATRate> = {
  standard: {
    id: 'vat-standard',
    rate: 20,
    name: 'Standard Rate',
    code: '20',
    description: 'Standard VAT rate applied to most goods and services in the UK',
    displayLabel: 'VAT (Standard Rate - 20%)',
    appliesTo: [
      'Most goods and services',
      'General supplies',
      'Default rate unless exempt or reduced'
    ],
    examples: [
      'Restaurant meals',
      'Building materials',
      'Professional services',
      'Clothing and footwear',
      'Electronic goods',
      'Furniture'
    ],
    keywords: [
      'UK VAT rate 20%',
      'Standard VAT rate UK',
      'UK VAT rates 2024',
      'VAT rate 2025 UK',
      'standard rate VAT',
      'most common VAT rate UK'
    ],
    searchVolume: 2600
  },
  
  reduced: {
    id: 'vat-reduced',
    rate: 5,
    name: 'Reduced Rate',
    code: '5',
    description: 'Reduced VAT rate for certain goods and services',
    displayLabel: 'VAT (Reduced Rate - 5%)',
    appliesTo: [
      'Certain goods and services eligible for reduced rate',
      'Energy-related products',
      'Child-specific items'
    ],
    examples: [
      'Domestic fuel and power',
      "Children's car seats",
      'Mobility aids for elderly',
      'Energy-saving materials',
      'Installation of energy-saving materials',
      'Smoking cessation products'
    ],
    keywords: [
      'UK VAT reduced rate 5%',
      'Reduced VAT rate UK',
      '5% VAT items',
      'domestic fuel VAT rate',
      'energy saving materials VAT',
      'reduced rate VAT examples'
    ],
    searchVolume: 1800
  },
  
  zero: {
    id: 'vat-zero',
    rate: 0,
    name: 'Zero Rate',
    code: '0',
    description: 'Zero-rated supplies where VAT is charged at 0%',
    displayLabel: 'VAT (Zero-Rated - 0%)',
    appliesTo: [
      'Essential items',
      'Exports',
      'Certain food and drink'
    ],
    examples: [
      'Most food and drink',
      'Books and newspapers',
      "Children's clothing and footwear",
      'Public transport',
      'Prescription medicines',
      'Exports outside UK'
    ],
    keywords: [
      'Zero rated VAT UK',
      'VAT exempt vs zero rated',
      '0% VAT items UK',
      'zero rated goods list',
      'VAT free items UK',
      'zero rate VAT examples'
    ],
    searchVolume: 1400
  },
  
  exempt: {
    id: 'vat-exempt',
    rate: -1,
    name: 'VAT Exempt',
    code: 'EXEMPT',
    description: 'VAT exempt supplies where no VAT is charged',
    displayLabel: 'VAT Exempt',
    appliesTo: [
      'Financial services',
      'Insurance',
      'Education',
      'Healthcare'
    ],
    examples: [
      'Financial services',
      'Insurance policies',
      'Education and training',
      'Healthcare and medical services',
      'Postal services (by Royal Mail)',
      'Burial and cremation'
    ],
    keywords: [
      'VAT exempt UK',
      'VAT exempt services list',
      'VAT exempt vs zero rated',
      'exempt from VAT UK',
      'no VAT items UK',
      'VAT exemption categories'
    ],
    searchVolume: 1200
  },
  
  reverseCharge: {
    id: 'vat-reverse-charge',
    rate: 0,
    name: 'Reverse Charge VAT',
    code: 'RC',
    description: 'Special VAT treatment where customer accounts for VAT instead of supplier',
    displayLabel: 'VAT (Reverse Charge)',
    appliesTo: [
      'Construction services under CIS',
      'Certain cross-border services',
      'Specific high-value goods'
    ],
    examples: [
      'Construction services (CIS)',
      'Mobile phones and computer chips',
      'Certain cross-border B2B services',
      'Emissions allowances',
      'Gas and electricity to traders'
    ],
    keywords: [
      'Reverse charge VAT UK',
      'VAT reverse charge',
      'UK reverse charge',
      'CIS reverse charge',
      'domestic reverse charge',
      'reverse charge accounting'
    ],
    searchVolume: 590
  }
};

// ============================================================================
// CIS (CONSTRUCTION INDUSTRY SCHEME)
// ============================================================================

export const cisTaxRates: Record<string, CISRate> = {
  gross: {
    id: 'cis-gross',
    rate: 0,
    name: 'Gross Payment Status',
    status: 'Gross Payment Status',
    description: 'No CIS deduction for subcontractors with gross payment status',
    displayLabel: 'No CIS Deduction (Gross Payment Status)',
    appliesTo: [
      'Subcontractors with gross payment status granted by HMRC',
      'Direct employees (CIS not applicable)',
      'Non-construction work'
    ],
    calculationNote: 'No deduction applied. Full amount paid to subcontractor.',
    keywords: [
      'CIS gross payment status',
      'No CIS deduction',
      'Gross status CIS',
      'CIS 0% rate',
      'apply for gross payment status',
      'gross payment status requirements'
    ],
    searchVolume: 390
  },
  
  registered: {
    id: 'cis-registered',
    rate: 20,
    name: 'CIS Registered',
    status: 'Registered with HMRC for CIS',
    description: '20% CIS deduction for registered subcontractors',
    displayLabel: 'CIS Deduction (Registered - 20%)',
    appliesTo: [
      'Subcontractors registered with HMRC for CIS',
      'Most common rate in construction industry'
    ],
    calculationNote: 'CIS deduction applied AFTER VAT calculation. Deduct 20% from total amount including VAT.',
    keywords: [
      'CIS deduction 20%',
      'CIS registered rate',
      'Construction tax 20%',
      'CIS subcontractor rate',
      'register for CIS',
      'CIS calculation example'
    ],
    searchVolume: 720
  },
  
  unregistered: {
    id: 'cis-unregistered',
    rate: 30,
    name: 'CIS Not Registered',
    status: 'Not registered with HMRC for CIS',
    description: '30% CIS deduction for unregistered subcontractors',
    displayLabel: 'CIS Deduction (Not Registered - 30%)',
    appliesTo: [
      'Subcontractors not registered under CIS',
      'Higher deduction rate as incentive to register'
    ],
    calculationNote: 'CIS deduction applied AFTER VAT calculation. Deduct 30% from total amount including VAT.',
    keywords: [
      'CIS deduction 30%',
      'CIS unregistered rate',
      'Construction tax 30%',
      'Not registered for CIS',
      'CIS penalty rate',
      'higher CIS rate'
    ],
    searchVolume: 480
  }
};

// ============================================================================
// UK DATE AND CURRENCY FORMATS
// ============================================================================

export const ukFormats: Record<string, InvoiceFormat> = {
  dateFormat: {
    id: 'uk-date',
    name: 'UK Date Format',
    description: 'Standard UK date format for invoices',
    pattern: 'DD/MM/YYYY',
    examples: [
      '20/10/2024',
      '01/01/2025',
      '31/12/2024'
    ],
    notes: 'Display format uses DD/MM/YYYY with forward slashes. Internal storage should use ISO 8601 (YYYY-MM-DD).'
  },
  
  currencyFormat: {
    id: 'uk-currency',
    name: 'UK Currency Format (GBP)',
    description: 'Pound Sterling formatting for invoice amounts',
    pattern: '£X,XXX.XX',
    examples: [
      '£1,234.56',
      '£10.00',
      '£999,999.99',
      '£50.00'
    ],
    notes: 'Use £ symbol (Pound Sterling), comma for thousands separator, period for decimal separator. Always show 2 decimal places.'
  },
  
  postcodeFormat: {
    id: 'uk-postcode',
    name: 'UK Postcode',
    description: 'UK postcode format for addresses',
    pattern: '^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][A-Z]{2}$',
    examples: [
      'SW1A 1AA',
      'M1 1AE',
      'B33 8TH',
      'EC1A 1BB'
    ],
    notes: 'Alphanumeric format with space separator. Outward code (2-4 characters) + space + inward code (3 characters).'
  },
  
  phoneFormat: {
    id: 'uk-phone',
    name: 'UK Phone Number',
    description: 'UK telephone number formats',
    examples: [
      '+44 20 1234 5678',
      '020 1234 5678',
      '+44 7700 900000',
      '07700 900000'
    ],
    notes: 'Can be displayed with +44 country code or leading 0. Mobile numbers start with 07, landlines vary by area code.'
  },
  
  sortCodeFormat: {
    id: 'uk-sort-code',
    name: 'UK Sort Code',
    description: 'UK bank sort code format',
    pattern: '^[0-9]{2}-[0-9]{2}-[0-9]{2}$',
    examples: [
      '12-34-56',
      '40-47-84',
      '60-83-71',
      '30-96-07'
    ],
    notes: '6 digits formatted with hyphens: XX-XX-XX. Identifies UK bank branch.'
  },
  
  accountNumberFormat: {
    id: 'uk-account-number',
    name: 'UK Account Number',
    description: 'UK bank account number format',
    pattern: '^[0-9]{8}$',
    examples: [
      '12345678',
      '00123456',
      '98765432'
    ],
    notes: 'Exactly 8 digits. May have leading zeros.'
  },
  
  ibanFormat: {
    id: 'uk-iban',
    name: 'UK IBAN',
    description: 'UK International Bank Account Number format',
    pattern: '^GB[0-9]{2}[A-Z]{4}[0-9]{14}$',
    examples: [
      'GB29 NWBK 6016 1331 9268 19',
      'GB82 WEST 1234 5698 7654 32'
    ],
    notes: '22 characters total: GB + 2 check digits + 4 letter bank code + 14 digits (sort code + account number).'
  }
};

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const validationRules: Record<string, ValidationRule> = {
  vatNumber: {
    id: 'val-vat',
    fieldName: 'VAT Number',
    fieldType: 'text',
    description: 'Validates UK VAT registration number format',
    pattern: '^GB([0-9]{9}|[0-9]{12}|GD[0-9]{3}|HA[0-9]{3})$',
    examples: ['GB123456789', 'GB123456789012', 'GBGD123'],
    errorMessage: 'VAT number must start with GB followed by 9 or 12 digits',
    keywords: ['VAT validation', 'validate VAT number', 'check VAT format']
  },
  
  companyNumber: {
    id: 'val-company',
    fieldName: 'Company Number',
    fieldType: 'text',
    description: 'Validates UK Companies House registration number',
    pattern: '^([0-9]{8}|SC[0-9]{6}|NI[0-9]{6})$',
    examples: ['12345678', 'SC123456', 'NI123456'],
    errorMessage: 'Company number must be 8 digits, or SC/NI prefix + 6 digits',
    keywords: ['company number validation', 'Companies House validation', 'CRN check']
  },
  
  postcode: {
    id: 'val-postcode',
    fieldName: 'UK Postcode',
    fieldType: 'text',
    description: 'Validates UK postcode format',
    pattern: '^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][A-Z]{2}$',
    examples: ['SW1A 1AA', 'M1 1AE', 'B33 8TH'],
    errorMessage: 'Invalid UK postcode format',
    keywords: ['postcode validation', 'UK postcode check', 'validate postcode']
  },
  
  sortCode: {
    id: 'val-sort-code',
    fieldName: 'Sort Code',
    fieldType: 'text',
    description: 'Validates UK bank sort code',
    pattern: '^[0-9]{2}-[0-9]{2}-[0-9]{2}$',
    examples: ['12-34-56', '40-47-84'],
    errorMessage: 'Sort code must be in format XX-XX-XX',
    keywords: ['sort code validation', 'bank sort code check', 'validate sort code']
  },
  
  accountNumber: {
    id: 'val-account',
    fieldName: 'Account Number',
    fieldType: 'text',
    description: 'Validates UK bank account number',
    pattern: '^[0-9]{8}$',
    examples: ['12345678', '00123456'],
    errorMessage: 'Account number must be exactly 8 digits',
    keywords: ['account number validation', 'validate bank account', 'account number check']
  }
};

// ============================================================================
// HMRC COMPLIANCE REQUIREMENTS
// ============================================================================

export const complianceRequirements: Record<string, ComplianceRequirement> = {
  mtdVAT: {
    id: 'mtd-vat',
    name: 'Making Tax Digital for VAT',
    category: 'MTD',
    description: 'Digital record-keeping and VAT return submission requirements',
    effectiveDate: '2019-04-01',
    mandatory: true,
    requirements: [
      'Store invoices digitally',
      'Maintain digital accounting records',
      'Submit VAT returns via MTD-compatible software',
      'Keep records for minimum 6 years',
      'Use functional compatible software',
      'Digital links between records'
    ],
    penalties: 'Penalties for non-compliance range from £400 to higher amounts for repeated failures',
    keywords: [
      'Making Tax Digital',
      'MTD compliance',
      'MTD for VAT',
      'digital tax UK',
      'MTD requirements',
      'HMRC digital records'
    ],
    searchVolume: 1600
  },
  
  vatInvoiceRequirements: {
    id: 'vat-invoice-req',
    name: 'VAT Invoice Requirements',
    category: 'VAT',
    description: 'Mandatory information required on VAT invoices',
    effectiveDate: '1973-01-01',
    mandatory: true,
    requirements: [
      'Sequential invoice number',
      'Invoice date',
      'Tax point (if different from invoice date)',
      'Supplier name and address',
      'Supplier VAT registration number',
      'Customer name and address',
      'Description of goods/services',
      'Quantity and unit price for each item',
      'VAT rate applicable',
      'Total amount excluding VAT',
      'Total VAT amount',
      'Total amount including VAT'
    ],
    penalties: 'HMRC can assess penalties for incorrect or missing VAT invoices',
    keywords: [
      'VAT invoice requirements',
      'HMRC invoice rules',
      'what must be on VAT invoice',
      'VAT invoice format UK',
      'legal requirements invoice UK'
    ],
    searchVolume: 2100
  },
  
  cisCompliance: {
    id: 'cis-compliance',
    name: 'CIS Invoice Requirements',
    category: 'CIS',
    description: 'Construction Industry Scheme invoice requirements',
    effectiveDate: '2007-04-06',
    mandatory: true,
    requirements: [
      'Contractor UTR (Unique Taxpayer Reference)',
      'Subcontractor UTR',
      'CIS registration status',
      'Gross amount payable for materials (if applicable)',
      'Gross amount for labor',
      'CIS deduction rate and amount',
      'Net amount payable',
      'Tax month/period covered',
      'Description of work performed'
    ],
    penalties: 'Incorrect CIS deductions can result in penalties and interest charges',
    keywords: [
      'CIS invoice requirements',
      'Construction Industry Scheme invoice',
      'CIS compliance',
      'subcontractor invoice requirements',
      'CIS tax invoice format'
    ],
    searchVolume: 880
  },
  
  invoiceSequencing: {
    id: 'invoice-seq',
    name: 'Sequential Invoice Numbering',
    category: 'General',
    description: 'Requirement for unique sequential invoice numbers',
    effectiveDate: '1973-01-01',
    mandatory: true,
    requirements: [
      'Each invoice must have unique identifier',
      'Numbers must be sequential',
      'Cannot skip or duplicate numbers',
      'Can use alphanumeric format (e.g., INV-2024-001)',
      'Must be traceable and auditable'
    ],
    penalties: 'Non-sequential numbering can invalidate invoices for VAT purposes',
    keywords: [
      'invoice numbering system',
      'sequential invoice numbers',
      'invoice number format UK',
      'how to number invoices',
      'invoice ID requirements'
    ],
    searchVolume: 590
  },
  
  recordKeeping: {
    id: 'record-keeping',
    name: 'Invoice Record Keeping',
    category: 'General',
    description: 'Legal requirements for storing invoice records',
    effectiveDate: '1973-01-01',
    mandatory: true,
    requirements: [
      'Keep all invoices for minimum 6 years',
      'Records must be readily accessible',
      'Digital or paper format acceptable',
      'Must be legible and complete',
      'Include both issued and received invoices',
      'Keep supporting documents'
    ],
    penalties: 'Failure to keep adequate records can result in estimated tax assessments and penalties up to £3,000',
    keywords: [
      'how long keep invoices UK',
      'invoice retention period',
      'record keeping requirements',
      'invoice storage legal',
      'HMRC record keeping'
    ],
    searchVolume: 1400
  }
};

// ============================================================================
// PAYMENT TERMS
// ============================================================================

export const paymentTerms = {
  standard: [
    { code: 'NET7', label: 'Net 7', description: 'Payment due within 7 days' },
    { code: 'NET14', label: 'Net 14', description: 'Payment due within 14 days' },
    { code: 'NET30', label: 'Net 30', description: 'Payment due within 30 days (most common)' },
    { code: 'NET60', label: 'Net 60', description: 'Payment due within 60 days' },
    { code: 'NET90', label: 'Net 90', description: 'Payment due within 90 days' },
    { code: 'DUE_ON_RECEIPT', label: 'Due on Receipt', description: 'Payment due immediately' },
    { code: 'CUSTOM', label: 'Custom', description: 'Custom payment terms' }
  ],
  keywords: [
    'UK payment terms',
    'invoice payment terms UK',
    'Net 30 meaning',
    'standard payment terms',
    'payment due date invoice'
  ],
  searchVolume: 1200,
  notes: 'Net 30 is the most common payment term in UK business. Late Payment of Commercial Debts Act allows interest charges on overdue invoices.'
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all business identifiers as array
 */
export function getAllBusinessIdentifiers(): BusinessIdentifier[] {
  return Object.values(ukBusinessIdentifiers);
}

/**
 * Get business identifier by ID
 */
export function getBusinessIdentifier(id: string): BusinessIdentifier | undefined {
  return ukBusinessIdentifiers[id];
}

/**
 * Get all VAT rates as array
 */
export function getAllVATRates(): VATRate[] {
  return Object.values(ukVATRates);
}

/**
 * Get VAT rate by ID
 */
export function getVATRate(id: string): VATRate | undefined {
  return ukVATRates[id];
}

/**
 * Get all CIS rates as array
 */
export function getAllCISRates(): CISRate[] {
  return Object.values(cisTaxRates);
}

/**
 * Get CIS rate by ID
 */
export function getCISRate(id: string): CISRate | undefined {
  return cisTaxRates[id];
}

/**
 * Get all formats as array
 */
export function getAllFormats(): InvoiceFormat[] {
  return Object.values(ukFormats);
}

/**
 * Get all compliance requirements as array
 */
export function getAllComplianceRequirements(): ComplianceRequirement[] {
  return Object.values(complianceRequirements);
}

/**
 * Get compliance requirements by category
 */
export function getComplianceByCategory(category: 'MTD' | 'CIS' | 'VAT' | 'General'): ComplianceRequirement[] {
  return Object.values(complianceRequirements).filter(req => req.category === category);
}

/**
 * Get total search volume for UK invoice keywords
 */
export function getTotalSearchVolume(): number {
  let total = 0;
  
  // Business identifiers
  Object.values(ukBusinessIdentifiers).forEach(id => {
    total += id.searchVolume;
  });
  
  // VAT rates
  Object.values(ukVATRates).forEach(rate => {
    total += rate.searchVolume;
  });
  
  // CIS rates
  Object.values(cisTaxRates).forEach(rate => {
    total += rate.searchVolume;
  });
  
  // Compliance
  Object.values(complianceRequirements).forEach(req => {
    total += req.searchVolume;
  });
  
  // Payment terms
  total += paymentTerms.searchVolume;
  
  return total;
}

/**
 * Get all keywords for SEO
 */
export function getAllKeywords(): string[] {
  const keywords: string[] = [];
  
  Object.values(ukBusinessIdentifiers).forEach(id => {
    keywords.push(...id.keywords);
  });
  
  Object.values(ukVATRates).forEach(rate => {
    keywords.push(...rate.keywords);
  });
  
  Object.values(cisTaxRates).forEach(rate => {
    keywords.push(...rate.keywords);
  });
  
  Object.values(complianceRequirements).forEach(req => {
    keywords.push(...req.keywords);
  });
  
  keywords.push(...paymentTerms.keywords);
  
  return [...new Set(keywords)]; // Remove duplicates
}

/**
 * Search knowledge base by keyword
 */
export function searchKnowledgeBase(query: string): {
  identifiers: BusinessIdentifier[];
  vatRates: VATRate[];
  cisRates: CISRate[];
  compliance: ComplianceRequirement[];
} {
  const lowerQuery = query.toLowerCase();
  
  return {
    identifiers: Object.values(ukBusinessIdentifiers).filter(id =>
      id.name.toLowerCase().includes(lowerQuery) ||
      id.description.toLowerCase().includes(lowerQuery) ||
      id.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))
    ),
    vatRates: Object.values(ukVATRates).filter(rate =>
      rate.name.toLowerCase().includes(lowerQuery) ||
      rate.description.toLowerCase().includes(lowerQuery) ||
      rate.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))
    ),
    cisRates: Object.values(cisTaxRates).filter(rate =>
      rate.name.toLowerCase().includes(lowerQuery) ||
      rate.description.toLowerCase().includes(lowerQuery) ||
      rate.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))
    ),
    compliance: Object.values(complianceRequirements).filter(req =>
      req.name.toLowerCase().includes(lowerQuery) ||
      req.description.toLowerCase().includes(lowerQuery) ||
      req.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))
    )
  };
}

/**
 * Get statistics about the knowledge base
 */
export function getKnowledgeBaseStats() {
  return {
    totalIdentifiers: Object.keys(ukBusinessIdentifiers).length,
    totalVATRates: Object.keys(ukVATRates).length,
    totalCISRates: Object.keys(cisTaxRates).length,
    totalFormats: Object.keys(ukFormats).length,
    totalComplianceReqs: Object.keys(complianceRequirements).length,
    totalValidationRules: Object.keys(validationRules).length,
    totalSearchVolume: getTotalSearchVolume(),
    totalKeywords: getAllKeywords().length
  };
}
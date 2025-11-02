/**
 * Automotive Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Automotive industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 3 (3 free, 0 premium)
 * - Categories: 3 (Vehicle Sales, Auto Repair & Maintenance, Auto Detailing)
 * - Total Search Volume: 21,110/month
 * - Average CPC: $3.91
 * - SEO Difficulty: Medium (49.0)
 * 
 * This comprehensive automotive invoice template collection positions us as the
 * definitive global resource for all automotive billing needs, covering private
 * car sales, professional garage services, and premium detailing operations.
 * 
 * Industry-Specific Fields:
 * - Vehicle Registration (UK format with validation)
 * - Vehicle Make & Model
 * - Vehicle Year & Mileage
 * - VIN Number
 * - MOT Expiry Date
 * - Job Card Tracking
 * - Parts & Labour Breakdown
 * - Warranty Information
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';
import { InvoiceField, IndustryStandard } from '../../invoiceTemplateLibrary';

// ============================================================================
// AUTOMOTIVE-SPECIFIC FIELDS
// ============================================================================

// Reusable automotive field definitions for consistent field usage
export const automotiveFields = {
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
  }
};

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
  // Template field definitions (from InvoiceTemplate)
  requiredFields?: InvoiceField[];      // ← This line should be here
  optionalFields?: InvoiceField[];      // ← This line should be here
  industryStandards?: IndustryStandard[]; // ← This line should be here
  sampleData?: Record<string, any>;     // ← This line should be here
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
      name: 'Car Sales Receipt (UK) Template',
      description: 'Official UK-compliant receipt template for private car sales with DVLA V5C notification guidance, comprehensive vehicle details, and legal protection for both buyer and seller',
      tier: 'free',
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
      sourceFile: 'automotive/categoriesTemplates.ts',
      sourceTemplateId: 'car-sales-receipt-uk',
      // Template fields from premium library
      requiredFields: [
        { fieldName: 'receiptNumber', label: 'Receipt Number', type: 'text' as const, required: true, placeholder: 'REC-2024-001', helpText: 'Unique receipt reference' },
        { fieldName: 'saleDate', label: 'Date of Sale', type: 'date' as const, required: true, helpText: 'Date vehicle was sold' },
        { fieldName: 'sellerName', label: 'Seller Name', type: 'text' as const, required: true, placeholder: 'John Smith', helpText: 'Person selling the vehicle' },
        { fieldName: 'sellerAddress', label: 'Seller Address', type: 'textarea' as const, required: true, placeholder: '123 Seller Street, London, SE1 9RT', helpText: 'Seller\'s full address' },
        { fieldName: 'buyerName', label: 'Buyer Name', type: 'text' as const, required: true, placeholder: 'Jane Doe', helpText: 'Person buying the vehicle' },
        { fieldName: 'buyerAddress', label: 'Buyer Address', type: 'textarea' as const, required: true, helpText: 'Buyer\'s full address' },
        automotiveFields.vehicleRegistration,
        automotiveFields.vehicleMake,
        automotiveFields.vehicleModel,
        automotiveFields.vehicleYear,
        automotiveFields.mileage,
        { fieldName: 'salePrice', label: 'Sale Price', type: 'currency' as const, required: true, helpText: 'Agreed sale price' }
      ],
      optionalFields: [
        automotiveFields.vinNumber,
        automotiveFields.motExpiry,
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
          complianceLevel: 'required' as const
        },
        {
          standard: 'Sold As Seen',
          description: 'Private sales typically sold "as seen" with no warranty, but vehicle description must be accurate',
          complianceLevel: 'recommended' as const
        },
        {
          standard: 'MOT Certificate',
          description: 'Vehicle must have valid MOT if over 3 years old (record expiry date)',
          complianceLevel: 'required' as const
        }
      ],
      sampleData: {
        // Standard invoice fields for preview compatibility
        invoiceNumber: 'REC-2024-4523',
        invoiceDate: '2024-10-18',
        businessName: 'Michael Thompson (Private Seller)',
        businessAddress: '67 Park Road, Leeds, West Yorkshire, LS6 4HB',
        businessPhone: '+44 113 987 6543',
        businessEmail: 'm.thompson@email.com',
        clientName: 'Sarah Williams',
        clientAddress: '92 Meadow Lane, Bradford, West Yorkshire, BD9 5PQ',
        clientPhone: '+44 1274 123 456',
        clientEmail: 'sarah.williams@email.com',
        lineItems: [
          {
            description: '2018 Ford Focus Zetec 1.5L EcoBoost - Moondust Silver - 42,350 miles - VIN: WF0WXXGCDW8J12345',
            quantity: 1,
            rate: 8750.00,
            amount: 8750.00
          }
        ],
        subtotal: 8750.00,
        totalAmount: 8750.00,

        // Car sales specific fields
        receiptNumber: 'REC-2024-4523',
        saleDate: '2024-10-18',
        sellerName: 'Michael Thompson',
        sellerAddress: '67 Park Road, Leeds, West Yorkshire, LS6 4HB',
        sellerPhone: '+44 113 987 6543',
        sellerEmail: 'm.thompson@email.com',
        buyerName: 'Sarah Williams',
        buyerAddress: '92 Meadow Lane, Bradford, West Yorkshire, BD9 5PQ',
        buyerPhone: '+44 1274 123 456',
        buyerEmail: 'sarah.williams@email.com',
        vehicleRegistration: 'BD18 XYZ',
        vehicleMake: 'Ford',
        vehicleModel: 'Focus Zetec',
        vehicleYear: 2018,
        colour: 'Moondust Silver',
        mileage: 42350,
        vinNumber: 'WF0WXXGCDW8J12345',
        engineSize: '1.5L EcoBoost',
        fuelType: 'Petrol',
        transmission: 'Manual 6-speed',
        motExpiry: '2025-08-15',
        serviceHistory: 'Full Ford service history - 5 stamps. Last serviced at 40,000 miles on 2024-06-15 at Ford Dealership Leeds.',
        v5Document: 'Present and correct. Seller will complete V5C/2 and send to DVLA within 14 days. Buyer given V5C/3 (new keeper supplement).',
        salePrice: 8750.00,
        paymentMethod: 'Bank Transfer (cleared funds received 2024-10-17)',
        soldAs: 'Sold as seen with no warranty given or implied. Vehicle described accurately to the best of seller\'s knowledge. No known faults. In good working order.',
        extras: 'Sale includes: 2 remote keys, full service history book, owner\'s manual, Ford warranty book, original purchase invoice, recent MOT certificate (2024-08-12), V5C registration document.',
        sellerSignature: 'M. Thompson (signed)',
        buyerSignature: 'S. Williams (signed)',
        paymentTerms: 'Payment due on sale date. Full payment required before vehicle release.',
        notes: 'Both parties confirm: Vehicle viewed and test driven by buyer. Payment cleared in seller\'s account. V5C new keeper details completed. Both parties agree to notify DVLA of ownership change within 14 days. Seller confirms no outstanding finance on vehicle. Vehicle tax responsibility transfers to buyer from sale date.'
      },
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
      name: 'Car Repair Invoice Template',
      description: 'Comprehensive professional invoice template for vehicle repair services featuring detailed parts and labor breakdown, job card tracking, warranty information, MOT status, and UK VAT compliance',
      tier: 'free',
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
      sourceFile: 'automotive/categoriesTemplates.ts',
      sourceTemplateId: 'car-repair-invoice',
      // Template fields from premium library
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
        automotiveFields.vehicleRegistration,
        automotiveFields.vehicleMake,
        automotiveFields.vehicleModel,
        automotiveFields.mileage,
        { fieldName: 'lineItems', label: 'Work Completed', type: 'textarea' as const, required: true, helpText: 'Parts and labour' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Total before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total due' }
      ],
      optionalFields: [
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'Your VAT registration' },
        { fieldName: 'vatAmount', label: 'VAT (20%)', type: 'currency' as const, required: false, helpText: 'VAT amount' },
        automotiveFields.vehicleYear,
        automotiveFields.vinNumber,
        automotiveFields.motExpiry,
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
          complianceLevel: 'recommended' as const
        },
        {
          standard: 'Parts Warranty',
          description: 'Typical parts warranty is 12 months, labour warranty 6 months',
          complianceLevel: 'recommended' as const
        },
        {
          standard: 'Pricing Transparency',
          description: 'Show clear breakdown of parts and labour costs',
          complianceLevel: 'required' as const
        },
        {
          standard: 'MOT Requirements',
          description: 'If MOT test performed, record result and expiry date',
          complianceLevel: 'required' as const
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
      },
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
      name: 'Auto Detailing Invoice Template',
      description: 'Free professional invoice template for auto detailing services featuring package-based pricing, add-on services, ceramic coating options, paint correction, and interior detailing with before/after photo documentation',
      tier: 'free',
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
      sourceFile: 'automotive/categoriesTemplates.ts',
      sourceTemplateId: 'auto-detailing-invoice',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'DET-2024-001', helpText: 'Detailing invoice reference' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date of invoice' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text' as const, required: true, placeholder: 'Elite Auto Detailing', helpText: 'Your detailing business name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
        { fieldName: 'businessEmail', label: 'Email', type: 'email' as const, required: true, helpText: 'Contact email' },
        { fieldName: 'businessPhone', label: 'Phone', type: 'phone' as const, required: true, helpText: 'Contact phone' },
        { fieldName: 'clientName', label: 'Customer Name', type: 'text' as const, required: true, placeholder: 'Mr James Anderson', helpText: 'Customer name' },
        { fieldName: 'clientPhone', label: 'Customer Phone', type: 'phone' as const, required: true, helpText: 'Customer contact' },
        automotiveFields.vehicleRegistration,
        automotiveFields.vehicleMake,
        automotiveFields.vehicleModel,
        { fieldName: 'lineItems', label: 'Services Provided', type: 'textarea' as const, required: true, helpText: 'Detailing services and products' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Total before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total due' }
      ],
      optionalFields: [
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'Your VAT registration' },
        { fieldName: 'vatAmount', label: 'VAT (20%)', type: 'currency' as const, required: false, helpText: 'VAT amount' },
        automotiveFields.vehicleYear,
        { fieldName: 'colour', label: 'Vehicle Colour', type: 'text' as const, required: false, placeholder: 'Black', helpText: 'Vehicle colour' },
        { fieldName: 'packageName', label: 'Service Package', type: 'text' as const, required: false, placeholder: 'Premium Full Detail', helpText: 'Package selected' },
        { fieldName: 'serviceDate', label: 'Service Date', type: 'date' as const, required: false, helpText: 'Date service completed' },
        { fieldName: 'duration', label: 'Service Duration', type: 'text' as const, required: false, placeholder: '6 hours', helpText: 'Time taken' },
        { fieldName: 'productsUsed', label: 'Products Used', type: 'textarea' as const, required: false, placeholder: 'Gtechniq Crystal Serum Ultra, CarPro Reset Shampoo', helpText: 'Premium products applied' },
        { fieldName: 'warrantyInfo', label: 'Warranty Information', type: 'textarea' as const, required: false, placeholder: 'Ceramic coating: 5 years / 50,000 miles', helpText: 'Product warranties' },
        { fieldName: 'beforePhotos', label: 'Before Photos URL', type: 'text' as const, required: false, placeholder: 'https://photos.example.com/before', helpText: 'Link to before photos' },
        { fieldName: 'afterPhotos', label: 'After Photos URL', type: 'text' as const, required: false, placeholder: 'https://photos.example.com/after', helpText: 'Link to after photos' },
        { fieldName: 'paymentMethod', label: 'Payment Method', type: 'text' as const, required: false, placeholder: 'Card', helpText: 'Payment type' },
        { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, helpText: 'Payment conditions' }
      ],
      industryStandards: [
        {
          standard: 'Service Package Documentation',
          description: 'Clearly define what is included in each detailing package',
          complianceLevel: 'recommended' as const
        },
        {
          standard: 'Product Warranties',
          description: 'Ceramic coatings typically come with 2-7 year warranties',
          complianceLevel: 'recommended' as const
        },
        {
          standard: 'Before/After Documentation',
          description: 'Photo documentation protects both parties and showcases quality',
          complianceLevel: 'recommended' as const
        },
        {
          standard: 'Product Disclosure',
          description: 'List premium products used to justify pricing',
          complianceLevel: 'recommended' as const
        }
      ],
      sampleData: {
        invoiceNumber: 'DET-2024-0876',
        invoiceDate: '2024-10-22',
        businessName: 'Pristine Auto Detailing Studio',
        businessAddress: '89 Detail Park, Manchester, M15 6JK',
        businessEmail: 'bookings@pristineauto.co.uk',
        businessPhone: '+44 161 789 4321',
        vatNumber: 'GB 345 6789 01',
        clientName: 'Mr James Anderson',
        clientPhone: '+44 7700 123987',
        clientEmail: 'j.anderson@email.com',
        vehicleRegistration: 'MN21 RST',
        vehicleMake: 'BMW',
        vehicleModel: 'M3 Competition',
        vehicleYear: 2021,
        colour: 'Isle of Man Green Metallic',
        packageName: 'Elite Ceramic Coating Package',
        serviceDate: '2024-10-21',
        duration: '2 days (16 hours total)',
        lineItems: [
          { description: 'Stage 1: Decontamination Wash - Snow foam pre-wash, pH-neutral hand wash, clay bar treatment', quantity: 1, rate: 150.00, amount: 150.00 },
          { description: 'Stage 2: Paint Correction - 2-stage machine polishing to remove swirl marks and minor scratches', quantity: 1, rate: 450.00, amount: 450.00 },
          { description: 'Stage 3: Gtechniq Crystal Serum Ultra Ceramic Coating - Professional grade 9H hardness coating', quantity: 1, rate: 850.00, amount: 850.00 },
          { description: 'Stage 4: Gtechniq EXO v4 Top Coat - Hydrophobic top layer for enhanced gloss', quantity: 1, rate: 180.00, amount: 180.00 },
          { description: 'Wheel Coating - Gtechniq C5 wheel armor on all 4 wheels', quantity: 4, rate: 35.00, amount: 140.00 },
          { description: 'Glass Treatment - Gtechniq G1 ClearVision Smart Glass coating', quantity: 1, rate: 120.00, amount: 120.00 },
          { description: 'Interior Deep Clean - Vacuum, leather conditioning, trim dressing', quantity: 1, rate: 180.00, amount: 180.00 },
          { description: 'Engine Bay Detail - Degreased and dressed', quantity: 1, rate: 80.00, amount: 80.00 }
        ],
        productsUsed: 'Gtechniq Crystal Serum Ultra (9H ceramic coating), Gtechniq EXO v4 (top coat), Gtechniq C5 Wheel Armour, Gtechniq G1 ClearVision Smart Glass, CarPro Reset pH-neutral shampoo, Rupes LHR15 Mark III polisher, Meguiar\'s Ultimate Compound, Scholl Concepts S3 Gold finishing polish',
        subtotal: 2150.00,
        vatAmount: 430.00,
        totalAmount: 2580.00,
        paymentMethod: 'Card (Mastercard)',
        warrantyInfo: 'Gtechniq Crystal Serum Ultra: 5 years warranty. Wheel coating: 2 years. Glass coating: 3 years. All warranties subject to proper maintenance using pH-neutral wash products.',
        paymentTerms: '50% deposit paid on booking (£1,290). Balance due on completion.',
        beforePhotos: 'https://pristineauto.co.uk/gallery/bmw-m3-before',
        afterPhotos: 'https://pristineauto.co.uk/gallery/bmw-m3-after',
        notes: 'Vehicle protection complete. Recommend pH-neutral wash products only. Avoid automatic car washes. First wash should be no sooner than 7 days to allow coating to cure fully. Maintenance guide provided. Annual coating inspection included free for first year.'
      },
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
  tier: 'free',
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
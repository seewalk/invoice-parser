/**
 * Creative & Media Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Creative & Media industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 8 (5 free, 3 premium)
 * - Categories: 4 (Photography & Videography, Graphic Design & Branding, Content Creation & Social Media, Music & Audio Production)
 * - Total Search Volume: 133,600+/month
 * - Average CPC: $4.85
 * - SEO Difficulty: Medium (52.5)
 * 
 * This comprehensive creative & media invoice template collection positions us as the
 * definitive global resource for all creative professional billing needs, covering
 * photographers, designers, influencers, content creators, musicians, and more.
 * 
 * Industry-Specific Fields:
 * - Event Date & Location
 * - Photography Package Details
 * - Usage Rights & Licensing
 * - Project Name & Deliverables
 * - Shoot Details & Image Count
 * - Social Media Platform Metrics
 * - Content Usage Rights & Exclusivity
 * - Performance Metrics & KPIs
 * - Campaign Deliverables
 * - Copyright & IP Transfer
 * - Revision Rounds Included
 * - File Formats & Source Files
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';
import { InvoiceField, IndustryStandard } from '../../invoiceTemplateLibrary';

// ============================================================================
// CREATIVE MEDIA-SPECIFIC FIELDS
// ============================================================================

// Reusable creative media field definitions for consistent field usage
export const creativeMediaFields = {
  eventDate: {
    fieldName: 'eventDate',
    label: 'Event Date',
    type: 'date' as const,
    required: true,
    helpText: 'Wedding, event, or shoot date'
  },
  eventLocation: {
    fieldName: 'eventLocation',
    label: 'Event Location',
    type: 'text' as const,
    required: true,
    placeholder: 'St. Mary\'s Church & The Manor House',
    helpText: 'Venue(s) where photography/event took place'
  },
  packageName: {
    fieldName: 'packageName',
    label: 'Photography Package',
    type: 'text' as const,
    required: false,
    placeholder: 'Full Day Wedding Package',
    helpText: 'Name of photography package booked'
  },
  hoursBooked: {
    fieldName: 'hoursBooked',
    label: 'Hours Booked',
    type: 'number' as const,
    required: false,
    placeholder: '8',
    helpText: 'Total hours of photography coverage'
  },
  depositPaid: {
    fieldName: 'depositPaid',
    label: 'Deposit Paid',
    type: 'currency' as const,
    required: false,
    helpText: 'Deposit amount already received'
  },
  balanceDue: {
    fieldName: 'balanceDue',
    label: 'Balance Due',
    type: 'currency' as const,
    required: false,
    helpText: 'Remaining balance after deposit'
  },
  deliverables: {
    fieldName: 'deliverables',
    label: 'Deliverables',
    type: 'textarea' as const,
    required: false,
    placeholder: '400+ edited photos in high-resolution digital format, online gallery, USB drive',
    helpText: 'What the client will receive'
  },
  projectName: {
    fieldName: 'projectName',
    label: 'Project Name',
    type: 'text' as const,
    required: false,
    placeholder: 'Autumn Collection 2024',
    helpText: 'Name or reference for this project'
  },
  shootDate: {
    fieldName: 'shootDate',
    label: 'Shoot Date',
    type: 'date' as const,
    required: false,
    helpText: 'Date photography/video session took place'
  },
  numberOfProducts: {
    fieldName: 'numberOfProducts',
    label: 'Number of Products',
    type: 'number' as const,
    required: false,
    placeholder: '25',
    helpText: 'Total products photographed'
  },
  numberOfImages: {
    fieldName: 'numberOfImages',
    label: 'Number of Images',
    type: 'number' as const,
    required: false,
    placeholder: '75',
    helpText: 'Total edited images delivered'
  },
  usageRights: {
    fieldName: 'usageRights',
    label: 'Image Usage Rights',
    type: 'textarea' as const,
    required: false,
    placeholder: 'Full commercial usage rights for web, print, and social media',
    helpText: 'Specify how client can use the images'
  },
  licenseType: {
    fieldName: 'licenseType',
    label: 'License Type',
    type: 'textarea' as const,
    required: false,
    placeholder: 'Exclusive commercial use, UK only, 2 years',
    helpText: 'Usage license terms'
  },
  copyrightTransfer: {
    fieldName: 'copyrightTransfer',
    label: 'Copyright Transfer',
    type: 'textarea' as const,
    required: false,
    placeholder: 'Copyright transfers to client upon full payment',
    helpText: 'Copyright ownership terms'
  },
  revisions: {
    fieldName: 'revisions',
    label: 'Revisions Included',
    type: 'number' as const,
    required: false,
    placeholder: '3',
    helpText: 'Number of revision rounds included'
  },
  imageFormat: {
    fieldName: 'imageFormat',
    label: 'Image Format',
    type: 'text' as const,
    required: false,
    placeholder: 'High-res JPEG, TIFF',
    helpText: 'File formats delivered'
  },
  shootLocation: {
    fieldName: 'shootLocation',
    label: 'Shoot Location',
    type: 'text' as const,
    required: false,
    placeholder: 'Studio / Client Premises',
    helpText: 'Where photos/videos were taken'
  }
};

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface CreativeMediaTemplate {
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
  requiredFields?: InvoiceField[];
  optionalFields?: InvoiceField[];
  industryStandards?: IndustryStandard[];
  sampleData?: Record<string, any>;
  industrySpecific: {
    serviceTypes: string[];
    contentTypes: string[];
    platforms: string[];
  };
  businessBenefits: string[];
  useCases: string[];
}

export interface CreativeMediaCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: CreativeMediaTemplate[];
}

// ============================================================================
// CATEGORY 1: PHOTOGRAPHY & VIDEOGRAPHY
// ============================================================================

const photographyVideographyCategory: CreativeMediaCategory = {
  id: 'photography-videography',
  name: 'Photography & Videography',
  description: 'Invoice templates for photographers, videographers, and visual content creators',
  icon: '📸',
  templates: [
    {
      id: 'wedding-photography-invoice',
      categoryId: 'photography-videography',
      categoryName: 'Photography & Videography',
      name: 'Wedding Photography Invoice Template',
      description: 'Professional invoice template for wedding photography services including packages, deposits, and deliverables',
      tier: 'free',
      searchVolume: 27100,
      cpc: 4.21,
      difficulty: 45,
      keywords: [
        'photography invoice',
        'wedding photography invoice',
        'photographer invoice template',
        'photo session invoice',
        'wedding photographer billing'
      ],
      sourceFile: 'invoiceTemplateLibrary.ts',
      sourceTemplateId: 'photo-event-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'PHOTO-2024-001', helpText: 'Unique invoice identifier' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date invoice is issued' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text' as const, required: true, placeholder: 'Emma Rose Photography', helpText: 'Your photography business name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
        { fieldName: 'businessEmail', label: 'Business Email', type: 'email' as const, required: true, helpText: 'Your business email' },
        { fieldName: 'clientName', label: 'Client Name', type: 'text' as const, required: true, placeholder: 'Emily & Michael Thompson', helpText: 'Client names' },
        { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: true, helpText: 'Client address' },
        { fieldName: 'clientEmail', label: 'Client Email', type: 'email' as const, required: true, helpText: 'Client email' },
        { fieldName: 'lineItems', label: 'Line Items', type: 'textarea' as const, required: true, helpText: 'Services and pricing' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Subtotal before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total amount due' },
        { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: true, helpText: 'Payment terms and conditions' }
      ],
      optionalFields: [
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration number' },
        { fieldName: 'vatAmount', label: 'VAT Amount', type: 'currency' as const, required: false, helpText: 'VAT amount (if applicable)' },
        { fieldName: 'bankName', label: 'Bank Name', type: 'text' as const, required: false, helpText: 'Bank name' },
        { fieldName: 'accountNumber', label: 'Account Number', type: 'text' as const, required: false, helpText: 'Bank account number' },
        { fieldName: 'sortCode', label: 'Sort Code', type: 'text' as const, required: false, helpText: 'Bank sort code' },
        creativeMediaFields.eventDate,
        creativeMediaFields.eventLocation,
        creativeMediaFields.packageName,
        creativeMediaFields.hoursBooked,
        creativeMediaFields.depositPaid,
        creativeMediaFields.balanceDue,
        creativeMediaFields.deliverables
      ],
      industryStandards: [
        {
          standard: 'Copyright Terms',
          description: 'Clearly state image usage rights and copyright ownership',
          complianceLevel: 'required'
        },
        {
          standard: 'Delivery Timeline',
          description: 'Specify when edited photos will be delivered',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Image Usage Rights',
          description: 'Define personal vs commercial usage rights',
          complianceLevel: 'required'
        },
        {
          standard: 'Deposit & Payment Schedule',
          description: 'Clear deposit and balance payment schedule',
          complianceLevel: 'required'
        }
      ],
      sampleData: {
        invoiceNumber: 'PHOTO-2024-0234',
        invoiceDate: '2024-10-18',
        dueDate: '2024-11-01',
        businessName: 'Emma Rose Photography',
        businessAddress: '78 Studio Lane, Bristol, BS1 2AA',
        businessEmail: 'bookings@emmarosephoto.co.uk',
        businessPhone: '+44 117 123 4567',
        clientName: 'Emily & Michael Thompson',
        clientAddress: '42 Bride Street, Bristol, BS8 1TT',
        clientEmail: 'emily.thompson@email.co.uk',
        eventDate: '2024-09-21',
        eventLocation: 'St. Mary\'s Church & The Manor House, Cotswolds',
        packageName: 'Premium Full Day Wedding Package',
        hoursBooked: 10,
        lineItems: [
          { description: 'Premium Full Day Wedding Package (10 hours coverage)', quantity: 1, rate: 1800.00, amount: 1800.00 },
          { description: 'Pre-wedding Engagement Shoot', quantity: 1, rate: 300.00, amount: 300.00 },
          { description: 'Second Photographer (Full Day)', quantity: 1, rate: 600.00, amount: 600.00 },
          { description: 'Premium Photo Album (30x30cm, 40 pages)', quantity: 1, rate: 450.00, amount: 450.00 },
          { description: 'Travel Expenses (150 miles return)', quantity: 1, rate: 75.00, amount: 75.00 }
        ],
        subtotal: 3225.00,
        vatAmount: 0,
        totalAmount: 3225.00,
        depositPaid: 1000.00,
        balanceDue: 2225.00,
        deliverables: '500+ edited high-resolution photos, online gallery (12 months access), USB drive with all images, premium photo album (40 pages)',
        paymentTerms: 'Deposit of £1,000 received on booking. Balance due 14 days before wedding date. Final payment received via bank transfer.',
        bankName: 'Lloyds Bank',
        accountNumber: '12345678',
        sortCode: '30-96-07',
        notes: 'Thank you for choosing Emma Rose Photography! Your online gallery will be ready within 6 weeks. All images include personal usage rights.'
      },
      industrySpecific: {
        serviceTypes: [
          'Wedding Photography',
          'Event Photography',
          'Portrait Photography',
          'Engagement Shoots',
          'Pre-wedding Sessions',
          'Full Day Coverage',
          'Multi-photographer Packages'
        ],
        contentTypes: [
          'High-resolution Digital Images',
          'Edited Photos',
          'Online Galleries',
          'Print Albums',
          'USB/Digital Delivery',
          'Photo Books',
          'Canvas Prints'
        ],
        platforms: [
          'Online Gallery',
          'WeTransfer',
          'Dropbox',
          'Google Drive',
          'Physical USB/DVD'
        ]
      },
      businessBenefits: [
        'Professional Wedding Photography Billing: Create polished invoices that reflect your premium photography brand and professionalism',
        'Deposit & Balance Tracking: Clear separation of deposit payments and remaining balance for easy payment management',
        'Package Breakdown: Itemize photography packages, additional services, albums, and travel expenses transparently',
        'Copyright Protection: Built-in usage rights and copyright clauses to protect your creative work and intellectual property',
        'Deliverables Documentation: Clearly list what clients will receive (photo count, formats, albums, online access)',
        'Payment Timeline Management: Specify deposit due dates and balance payment schedules aligned with wedding dates',
        'Usage Rights Clarity: Define personal usage rights vs commercial licensing to avoid future disputes',
        'Professional Presentation: Impress couples with detailed, organized invoices that match your photography quality',
        'Album & Print Add-ons: Easy itemization of premium albums, prints, and additional products',
        'Multi-photographer Invoicing: Track costs for second shooters and assistant photographers clearly'
      ],
      useCases: [
        'Full day wedding photography packages with ceremony and reception coverage',
        'Pre-wedding engagement and couple shoot sessions',
        'Wedding photography with second shooter or assistant photographer',
        'Premium photo album and print product invoicing',
        'Destination wedding photography with travel expenses',
        'Multi-day wedding event coverage (rehearsal dinner, ceremony, day-after shoot)',
        'Wedding photography with videography bundled services',
        'Elopement and intimate wedding packages',
        'Cultural or religious wedding ceremonies requiring extended coverage',
        'Corporate event and party photography bookings',
        'Family portrait sessions and milestone photography',
        'Graduation, christening, and celebration photography services'
      ]
    },
    {
      id: 'product-photography-invoice',
      categoryId: 'photography-videography',
      categoryName: 'Photography & Videography',
      name: 'Product Photography Invoice Template',
      description: 'Comprehensive invoice template for commercial product photography with usage rights and licensing',
      tier: 'free',
      searchVolume: 14800,
      cpc: 3.30,
      difficulty: 50,
      keywords: [
        'commercial photography invoice',
        'product photography invoice',
        'business photography invoice',
        'e-commerce photography billing',
        'catalog photography invoice'
      ],
      sourceFile: 'invoiceTemplateLibrary.ts',
      sourceTemplateId: 'photo-commercial-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'CP-2024-001', helpText: 'Unique invoice identifier' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date invoice is issued' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text' as const, required: true, placeholder: 'ProShot Commercial Photography', helpText: 'Your business name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
        { fieldName: 'businessEmail', label: 'Business Email', type: 'email' as const, required: true, helpText: 'Your business email' },
        { fieldName: 'clientName', label: 'Client Name', type: 'text' as const, required: true, placeholder: 'Boutique Fashion Ltd', helpText: 'Client company name' },
        { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: true, helpText: 'Client billing address' },
        { fieldName: 'lineItems', label: 'Line Items', type: 'textarea' as const, required: true, helpText: 'Services and pricing' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Subtotal before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total amount due' }
      ],
      optionalFields: [
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration number' },
        { fieldName: 'vatAmount', label: 'VAT Amount', type: 'currency' as const, required: false, helpText: 'VAT amount' },
        { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, helpText: 'Payment terms' },
        creativeMediaFields.projectName,
        creativeMediaFields.shootDate,
        creativeMediaFields.numberOfProducts,
        creativeMediaFields.numberOfImages,
        creativeMediaFields.usageRights
      ],
      industryStandards: [
        {
          standard: 'Commercial License',
          description: 'Define commercial usage rights clearly (web, print, duration)',
          complianceLevel: 'required'
        },
        {
          standard: 'Image Specifications',
          description: 'Specify file formats, resolution, and color profiles',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Usage Territory',
          description: 'Define geographic territory for image usage rights',
          complianceLevel: 'required'
        },
        {
          standard: 'License Duration',
          description: 'Specify time period for usage rights (1 year, 2 years, perpetual)',
          complianceLevel: 'required'
        }
      ],
      sampleData: {
        invoiceNumber: 'CP-2024-0912',
        invoiceDate: '2024-10-18',
        dueDate: '2024-11-01',
        businessName: 'ProShot Commercial Photography',
        businessAddress: '15 Studio Park, Manchester, M1 3AA',
        businessEmail: 'hello@proshotphoto.co.uk',
        vatNumber: 'GB 222 3333 44',
        clientName: 'Boutique Fashion Ltd',
        clientAddress: '89 Fashion Street, Manchester, M2 5BB',
        projectName: 'Autumn Collection 2024 - Product Shoot',
        shootDate: '2024-10-10',
        numberOfProducts: 35,
        numberOfImages: 105,
        lineItems: [
          { description: 'Product Photography - Up to 50 products', quantity: 35, rate: 15.00, amount: 525.00 },
          { description: 'Image Editing & Retouching', quantity: 105, rate: 8.00, amount: 840.00 },
          { description: 'Studio Rental (Full Day)', quantity: 1, rate: 200.00, amount: 200.00 },
          { description: 'Styling & Props', quantity: 1, rate: 150.00, amount: 150.00 }
        ],
        subtotal: 1715.00,
        vatAmount: 343.00,
        totalAmount: 2058.00,
        usageRights: 'Full commercial usage rights granted for 2 years. Images can be used on website, social media, print marketing, and e-commerce platforms.',
        paymentTerms: 'Payment due within 14 days. Net 14 terms.',
        notes: 'All 105 high-resolution images delivered via online gallery. Files include JPEG (sRGB for web) and TIFF (Adobe RGB for print).'
      },
      industrySpecific: {
        serviceTypes: [
          'Product Photography',
          'E-commerce Photography',
          'Catalog Photography',
          'Lifestyle Product Photography',
          'White Background Photography',
          'Studio Photography',
          'On-location Shoots'
        ],
        contentTypes: [
          'High-resolution Images',
          'Edited & Retouched Photos',
          'Multiple File Formats',
          'Web-optimized Images',
          'Print-ready Files',
          'RAW Files (optional)',
          'Contact Sheets'
        ],
        platforms: [
          'E-commerce Websites',
          'Amazon Listings',
          'Social Media',
          'Print Catalogs',
          'Marketing Materials',
          'Email Campaigns'
        ]
      },
      businessBenefits: [
        'Commercial Licensing Documentation: Clearly define usage rights, territory, and duration to protect your work and ensure proper compensation',
        'Per-product Pricing Transparency: Break down costs per product photographed for clear client understanding',
        'Image Count Tracking: Document exactly how many products photographed and images delivered',
        'Multi-format Delivery: Specify which file formats included (JPEG, TIFF, PNG, RAW) for different usage',
        'Usage Rights Protection: Define commercial vs editorial use, geographic territory, and time period clearly',
        'Studio & Equipment Costs: Separately itemize studio rental, equipment, styling, and props costs',
        'Editing & Retouching: Track post-production work per image for accurate billing',
        'Batch Photography Efficiency: Invoice for high-volume product shoots with per-item rates',
        'Repeat Business Framework: Establish clear pricing structure for ongoing e-commerce clients',
        'Professional Brand Image: Impress corporate clients with detailed, business-focused invoicing'
      ],
      useCases: [
        'E-commerce product photography for online stores and Amazon listings',
        'Fashion and apparel photography for clothing brands and boutiques',
        'Jewelry and accessory photography with detailed macro shots',
        'Food and beverage product photography for restaurants and brands',
        'Electronics and tech product photography for marketing materials',
        'Cosmetics and beauty product photography for catalogs and websites',
        'Furniture and home decor photography for retailers',
        'Seasonal product catalog shoots (spring, summer, autumn, winter collections)',
        'White background product photography for consistent brand imagery',
        'Lifestyle product photography showing items in use or context',
        'Flat lay and styled product photography for social media content',
        'Industrial and manufacturing product photography for B2B marketing'
      ]
    },
    {
      id: 'commercial-photography-premium-invoice',
      categoryId: 'photography-videography',
      categoryName: 'Photography & Videography',
      name: 'Commercial Photography Invoice Template',
      description: 'Advanced invoice template for commercial photography with detailed licensing, usage rights, and multi-format deliverables',
      tier: 'free',
      searchVolume: 18100,
      cpc: 2.76,
      difficulty: 54,
      keywords: [
        'commercial photography invoice template',
        'photographer invoice template',
        'product photography invoice',
        'corporate photography billing',
        'professional photography invoice'
      ],
      sourceFile: 'premiumTemplateLibrary.ts',
      sourceTemplateId: 'photo-commercial-002',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'PHOTO-2024-001', helpText: 'Invoice reference' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date issued' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text' as const, required: true, placeholder: 'Focal Point Photography Ltd', helpText: 'Your business name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
        { fieldName: 'businessEmail', label: 'Business Email', type: 'email' as const, required: true, helpText: 'Contact email' },
        { fieldName: 'clientName', label: 'Client Name', type: 'text' as const, required: true, placeholder: 'Heritage Furniture Ltd', helpText: 'Client company name' },
        { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: true, helpText: 'Client billing address' },
        creativeMediaFields.projectName,
        { fieldName: 'lineItems', label: 'Line Items', type: 'textarea' as const, required: true, helpText: 'Services and deliverables' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Total before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total due' }
      ],
      optionalFields: [
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration' },
        { fieldName: 'vatAmount', label: 'VAT Amount', type: 'currency' as const, required: false, helpText: 'VAT amount' },
        creativeMediaFields.shootDate,
        creativeMediaFields.shootLocation,
        creativeMediaFields.numberOfImages,
        creativeMediaFields.imageFormat,
        creativeMediaFields.licenseType,
        creativeMediaFields.depositPaid,
        creativeMediaFields.balanceDue,
        creativeMediaFields.usageRights,
        creativeMediaFields.deliverables,
        creativeMediaFields.revisions,
        creativeMediaFields.copyrightTransfer,
        { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, helpText: 'Payment terms' },
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
      },
      industrySpecific: {
        serviceTypes: [
          'Commercial Photography',
          'Corporate Photography',
          'Advertising Photography',
          'Product Catalogue Shoots',
          'Brand Photography',
          'Marketing Campaign Photography',
          'Professional Studio Photography'
        ],
        contentTypes: [
          'High-resolution Digital Files',
          'Multiple File Formats (JPEG, TIFF, RAW)',
          'Web-optimized Images',
          'Print-ready Files',
          'Edited & Retouched Images',
          'Contact Sheets',
          'Usage License Documentation'
        ],
        platforms: [
          'Corporate Websites',
          'Marketing Campaigns',
          'Print Advertising',
          'Social Media Marketing',
          'E-commerce Platforms',
          'Trade Show Materials',
          'Brand Guidelines'
        ]
      },
      businessBenefits: [
        'Premium Licensing Structure: Itemize usage license fees separately for transparency and proper valuation of commercial rights',
        'Copyright Protection: Built-in copyright retention clauses protecting your creative work while licensing specific usage',
        'Multi-format Delivery: Document delivery of multiple file formats (JPEG, TIFF, RAW) for different client needs',
        'Territory & Duration Clarity: Clearly specify geographic territory and time period for usage rights to prevent unauthorized use',
        'Revision Tracking: Document included revision rounds and charge appropriately for additional editing',
        'Deposit & Balance System: Professional two-stage payment structure protecting both photographer and client',
        'Model Release Documentation: Track and reference model release forms for shoots with people',
        'Exclusivity Options: Offer exclusive vs non-exclusive licensing with different pricing tiers',
        'Professional Corporate Image: Impress large corporate clients with comprehensive, legally-sound invoicing',
        'Scalable Licensing: Easy to add additional usage rights or extend license duration with supplemental invoices'
      ],
      useCases: [
        'High-end corporate product photography campaigns for major brands',
        'Advertising photography for print and digital marketing campaigns',
        'Annual report and corporate communications photography',
        'Brand photography for company rebranding or refresh projects',
        'Lifestyle product photography for premium brand marketing',
        'Catalog photography for seasonal product launches',
        'Commercial real estate and architectural photography',
        'Food and beverage photography for restaurant chains and food brands',
        'Fashion photography for clothing brand campaigns',
        'Corporate headshots and team photography for businesses',
        'Event photography for corporate conferences and product launches',
        'Interior design and hospitality photography for hotels and restaurants'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY 2: GRAPHIC DESIGN & BRANDING
// ============================================================================

const graphicDesignBrandingCategory: CreativeMediaCategory = {
  id: 'graphic-design-branding',
  name: 'Graphic Design & Branding',
  description: 'Invoice templates for graphic designers, brand strategists, and web designers',
  icon: '🎨',
  templates: [
    {
      id: 'logo-design-invoice',
      categoryId: 'graphic-design-branding',
      categoryName: 'Graphic Design & Branding',
      name: 'Logo Design Invoice Template',
      description: 'Professional invoice template for logo design and brand identity services with deliverables and revision tracking',
      tier: 'free',
      searchVolume: 18100,
      cpc: 1.82,
      difficulty: 48,
      keywords: [
        'graphic design invoice',
        'logo design invoice',
        'design invoice template',
        'branding invoice',
        'visual design billing'
      ],
      sourceFile: 'invoiceTemplateLibrary.ts',
      sourceTemplateId: 'design-branding-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'DES-2024-001', helpText: 'Unique invoice identifier' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date invoice is issued' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text' as const, required: true, placeholder: 'Creative Studio Design', helpText: 'Your design business name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
        { fieldName: 'businessEmail', label: 'Business Email', type: 'email' as const, required: true, helpText: 'Your business email' },
        { fieldName: 'clientName', label: 'Client Name', type: 'text' as const, required: true, placeholder: 'New Startup Ltd', helpText: 'Client company name' },
        { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: true, helpText: 'Client billing address' },
        { fieldName: 'lineItems', label: 'Line Items', type: 'textarea' as const, required: true, helpText: 'Services and pricing' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Subtotal before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total amount due' }
      ],
      optionalFields: [
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration number' },
        { fieldName: 'vatAmount', label: 'VAT Amount', type: 'currency' as const, required: false, helpText: 'VAT amount' },
        { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, helpText: 'Payment terms' },
        creativeMediaFields.projectName,
        creativeMediaFields.revisions,
        creativeMediaFields.deliverables
      ],
      industryStandards: [
        {
          standard: 'Copyright Transfer',
          description: 'Clarify if copyright transfers to client or remains with designer',
          complianceLevel: 'required'
        },
        {
          standard: 'File Formats',
          description: 'Specify source files and export formats included',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Revision Policy',
          description: 'Define number of revision rounds included in pricing',
          complianceLevel: 'required'
        },
        {
          standard: 'Brand Guidelines',
          description: 'Include brand guidelines document with logo delivery',
          complianceLevel: 'recommended'
        }
      ],
      sampleData: {
        invoiceNumber: 'DES-2024-0567',
        invoiceDate: '2024-10-18',
        dueDate: '2024-10-25',
        businessName: 'Creative Studio Design',
        businessAddress: '22 Design Quarter, Leeds, LS1 4AA',
        businessEmail: 'projects@creativestudio.co.uk',
        clientName: 'New Startup Ltd',
        clientAddress: '99 Business Park, Leeds, LS11 5AA',
        projectName: 'Complete Brand Identity Package',
        revisions: 3,
        lineItems: [
          { description: 'Logo Design (3 concepts, 3 revision rounds)', quantity: 1, rate: 950.00, amount: 950.00 },
          { description: 'Brand Guidelines Document (20 pages)', quantity: 1, rate: 400.00, amount: 400.00 },
          { description: 'Business Card Design', quantity: 1, rate: 150.00, amount: 150.00 },
          { description: 'Letterhead & Email Signature Design', quantity: 1, rate: 200.00, amount: 200.00 }
        ],
        subtotal: 1700.00,
        vatAmount: 340.00,
        totalAmount: 2040.00,
        deliverables: 'Final logo files (AI, EPS, PNG, SVG, PDF), brand guidelines PDF, business card print-ready files, letterhead template (Word & PDF)',
        paymentTerms: '50% deposit paid on project commencement. Final 50% due on delivery of assets.',
        notes: 'Copyright transfers to client upon full payment. Source files included.'
      },
      industrySpecific: {
        serviceTypes: [
          'Logo Design',
          'Brand Identity Design',
          'Visual Identity Systems',
          'Brand Guidelines Development',
          'Business Card Design',
          'Letterhead Design',
          'Brand Refresh Projects'
        ],
        contentTypes: [
          'Vector Logo Files',
          'Multiple File Formats',
          'Brand Guidelines PDF',
          'Print-ready Files',
          'Web-optimized Assets',
          'Social Media Formats',
          'Source Files (AI, EPS)'
        ],
        platforms: [
          'Adobe Illustrator',
          'Adobe Photoshop',
          'Figma',
          'Print Production',
          'Web & Digital',
          'Social Media'
        ]
      },
      businessBenefits: [
        'Project-based Pricing: Invoice complete brand identity packages with itemized deliverables for transparency',
        'Revision Tracking: Document included revision rounds (typically 2-3) to manage scope and prevent scope creep',
        'Copyright Clarity: Specify when copyright transfers to client (typically upon full payment) to protect your work',
        'Multi-format Deliverables: List all file formats provided (AI, EPS, PNG, SVG, PDF) so client knows what they\'re getting',
        'Brand Package Bundling: Combine logo design, brand guidelines, business cards, and stationery for higher value',
        'Source File Protection: Clarify whether source files (AI, EPS) are included or require additional fee',
        'Deposit Payment Structure: Secure 50% deposit upfront to protect against project cancellation',
        'Guidelines Documentation: Charge separately for comprehensive brand guidelines documents (logo usage, colors, typography)',
        'Professional Service Image: Present yourself as a professional brand strategist, not just a logo maker',
        'Scalable Design Services: Easy to add additional design elements (packaging, signage, merchandise) in future'
      ],
      useCases: [
        'Startup logo design and complete brand identity creation',
        'Small business rebranding projects with logo refresh',
        'Corporate logo redesign and modernization',
        'Brand identity packages including logo, colors, typography, and guidelines',
        'Business stationery design (business cards, letterhead, envelopes)',
        'Logo design for events, conferences, or campaigns',
        'Sub-brand or product line logo design for existing companies',
        'Nonprofit and charity branding projects',
        'Restaurant and hospitality brand identity design',
        'E-commerce brand design for online stores',
        'Personal branding for freelancers, consultants, and professionals',
        'Logo design with social media branding kit (profile images, cover photos, templates)'
      ]
    },
    {
      id: 'website-design-invoice',
      categoryId: 'graphic-design-branding',
      categoryName: 'Graphic Design & Branding',
      name: 'Website Design Invoice Template',
      description: 'Comprehensive invoice template for website design projects with hosting, maintenance, and multi-page pricing',
      tier: 'free',
      searchVolume: 8900,
      cpc: 1.96,
      difficulty: 52,
      keywords: [
        'website design invoice template',
        'web design invoice',
        'web developer invoice',
        'web design billing',
        'website development invoice'
      ],
      sourceFile: 'premiumTemplateLibrary.ts',
      sourceTemplateId: 'design-web-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'WEB-2024-001', helpText: 'Invoice reference' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date issued' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text' as const, required: true, placeholder: 'Pixel Perfect Web Design', helpText: 'Your company name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
        { fieldName: 'businessEmail', label: 'Business Email', type: 'email' as const, required: true, helpText: 'Contact email' },
        { fieldName: 'clientName', label: 'Client Name', type: 'text' as const, required: true, placeholder: 'Green Gardens Landscaping Ltd', helpText: 'Client name' },
        { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: true, helpText: 'Client billing address' },
        creativeMediaFields.projectName,
        { fieldName: 'lineItems', label: 'Line Items', type: 'textarea' as const, required: true, helpText: 'Design services breakdown' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Total before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total due' }
      ],
      optionalFields: [
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration' },
        { fieldName: 'vatAmount', label: 'VAT Amount', type: 'currency' as const, required: false, helpText: 'VAT amount' },
        creativeMediaFields.deliverables,
        creativeMediaFields.revisions,
        { fieldName: 'websiteUrl', label: 'Website URL', type: 'text' as const, required: false, placeholder: 'https://example.com', helpText: 'Client website address' },
        { fieldName: 'numberOfPages', label: 'Number of Pages', type: 'number' as const, required: false, placeholder: '10', helpText: 'Total website pages' },
        { fieldName: 'hostingIncluded', label: 'Hosting Included', type: 'text' as const, required: false, placeholder: 'Yes - 12 months', helpText: 'Hosting details' },
        { fieldName: 'domainIncluded', label: 'Domain Included', type: 'text' as const, required: false, placeholder: 'Yes - 12 months', helpText: 'Domain registration' },
        { fieldName: 'maintenancePackage', label: 'Maintenance Package', type: 'textarea' as const, required: false, placeholder: '3 months free updates included', helpText: 'Post-launch support terms' },
        creativeMediaFields.depositPaid,
        creativeMediaFields.balanceDue,
        { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, helpText: 'Payment terms' },
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
      },
      industrySpecific: {
        serviceTypes: [
          'Custom Website Design',
          'WordPress Development',
          'E-commerce Website Design',
          'Mobile-responsive Development',
          'CMS Setup & Training',
          'SEO Optimization',
          'Website Redesign Projects'
        ],
        contentTypes: [
          'Responsive Website Design',
          'CMS Templates',
          'Design Mockups',
          'Source Code',
          'Documentation',
          'Training Materials',
          'SEO Configuration'
        ],
        platforms: [
          'WordPress',
          'Wix',
          'Squarespace',
          'Shopify',
          'Custom HTML/CSS',
          'React/Next.js',
          'Web Hosting Platforms'
        ]
      },
      businessBenefits: [
        'Per-page Pricing Transparency: Break down design costs per page so clients understand website complexity and value',
        'Bundled Services: Include hosting, domain, SSL, and maintenance in one comprehensive package for higher value',
        'Milestone Payment Structure: Secure deposit (typically 30-50%) and final payment on launch to protect cash flow',
        'CMS Training Inclusion: Charge for WordPress or CMS training sessions (2-4 hours) to ensure client can manage content',
        'SEO & Analytics Value-add: Separately itemize SEO optimization and Google Analytics setup to show additional value',
        'Post-launch Support: Define maintenance package (3-12 months) for ongoing updates and support revenue',
        'IP Rights Protection: Clarify that design files and source code transfer only upon final payment',
        'Revision Management: Specify number of design revisions included (typically 2-3) to prevent scope creep',
        'Responsive Design Premium: Highlight mobile-responsive development as separate line item showing modern web standards',
        'Scalable Web Projects: Easy framework to quote additional pages, features, or e-commerce functionality in future'
      ],
      useCases: [
        'Small business website design and development (5-15 pages)',
        'Restaurant and hospitality website design with menus and booking',
        'E-commerce website design for online stores and shops',
        'Portfolio websites for creative professionals and agencies',
        'Corporate website redesign projects for established businesses',
        'Landing page design for marketing campaigns and product launches',
        'Blog and content-based website design with CMS',
        'Professional service websites (lawyers, consultants, accountants)',
        'Real estate website design with property listings',
        'Nonprofit and charity website design',
        'Educational website design for schools and training providers',
        'Membership and community website design with user accounts'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY 3: CONTENT CREATION & SOCIAL MEDIA
// ============================================================================

const contentCreationCategory: CreativeMediaCategory = {
  id: 'content-creation-social-media',
  name: 'Content Creation & Social Media',
  description: 'Invoice templates for influencers, content creators, YouTubers, and social media professionals',
  icon: '📱',
  templates: [
    {
      id: 'social-media-influencer-invoice',
      categoryId: 'content-creation-social-media',
      categoryName: 'Content Creation & Social Media',
      name: 'Social Media Influencer Invoice Template',
      description: 'Professional invoice template for influencer collaborations, sponsored posts, brand partnerships, and social media campaigns',
      tier: 'free',
      searchVolume: 22400,
      cpc: 13.60,
      difficulty: 55,
      keywords: [
        'influencer invoice',
        'sponsored post invoice',
        'brand partnership invoice',
        'social media invoice',
        'content creator invoice'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'influencer-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'INF-2024-001', helpText: 'Unique invoice identifier' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date invoice is issued' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
        { fieldName: 'businessName', label: 'Your Name/Brand', type: 'text' as const, required: true, placeholder: 'Emma Style Influencer', helpText: 'Your influencer name or brand' },
        { fieldName: 'businessAddress', label: 'Your Address', type: 'textarea' as const, required: true, helpText: 'Your address' },
        { fieldName: 'businessEmail', label: 'Your Email', type: 'email' as const, required: true, helpText: 'Your contact email' },
        { fieldName: 'clientName', label: 'Brand/Client Name', type: 'text' as const, required: true, placeholder: 'Fashion Brand Ltd', helpText: 'Brand or client name' },
        { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: true, helpText: 'Client billing address' },
        creativeMediaFields.projectName,
        { fieldName: 'lineItems', label: 'Line Items', type: 'textarea' as const, required: true, helpText: 'Campaign deliverables and pricing' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Subtotal before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total amount due' }
      ],
      optionalFields: [
        { fieldName: 'businessPhone', label: 'Your Phone', type: 'phone' as const, required: false, helpText: 'Your phone number' },
        { fieldName: 'companyNumber', label: 'Company Number', type: 'text' as const, required: false, helpText: 'Company registration number' },
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration number' },
        { fieldName: 'clientEmail', label: 'Client Email', type: 'email' as const, required: false, helpText: 'Client email' },
        { fieldName: 'vatAmount', label: 'VAT Amount', type: 'currency' as const, required: false, helpText: 'VAT amount' },
        { fieldName: 'bankName', label: 'Bank Name', type: 'text' as const, required: false, helpText: 'Bank name' },
        { fieldName: 'accountNumber', label: 'Account Number', type: 'text' as const, required: false, helpText: 'Bank account number' },
        { fieldName: 'sortCode', label: 'Sort Code', type: 'text' as const, required: false, helpText: 'Bank sort code' },
        { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, helpText: 'Payment terms' },
        { fieldName: 'notes', label: 'Notes', type: 'textarea' as const, required: false, helpText: 'Additional notes' }
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
        invoiceDate: '2024-10-20',
        dueDate: '2024-11-03',
        businessName: 'Emma Style Influencer',
        businessAddress: '45 Creator Street, London, SW1A 1AA',
        businessEmail: 'emma@emmastyle.com',
        businessPhone: '+44 20 7123 4567',
        clientName: 'Fashion Forward Ltd',
        clientAddress: '100 Brand Avenue, London, W1F 8AB',
        clientEmail: 'partnerships@fashionforward.com',
        projectName: 'Spring Fashion Campaign',
        lineItems: [
          { description: 'Instagram feed post (2 posts)', quantity: 2, rate: 850.00, amount: 1700.00 },
          { description: 'Instagram Stories (5 stories)', quantity: 5, rate: 200.00, amount: 1000.00 },
          { description: 'TikTok video (1 video)', quantity: 1, rate: 1200.00, amount: 1200.00 },
          { description: 'Content usage rights (6 months)', quantity: 1, rate: 500.00, amount: 500.00 }
        ],
        subtotal: 4400.00,
        vatAmount: 880.00,
        totalAmount: 5280.00,
        paymentTerms: 'Payment due within 14 days of invoice date. Net 14 terms.',
        notes: 'Thank you for this collaboration! Content will go live between March 1-15, 2024. Usage rights grant Fashion Forward Ltd permission to repost content on brand channels for 6 months.'
      },
      industrySpecific: {
        serviceTypes: [
          'Sponsored Instagram Posts',
          'Instagram Stories',
          'TikTok Videos',
          'YouTube Sponsorships',
          'Brand Partnerships',
          'Influencer Campaigns',
          'Content Creation Services'
        ],
        contentTypes: [
          'Social Media Posts',
          'Instagram Reels',
          'TikTok Videos',
          'Instagram Stories',
          'YouTube Videos',
          'Blog Posts',
          'Product Reviews'
        ],
        platforms: [
          'Instagram',
          'TikTok',
          'YouTube',
          'Facebook',
          'Twitter/X',
          'Pinterest',
          'LinkedIn'
        ]
      },
      businessBenefits: [
        'Per-deliverable Pricing: Break down costs per post type (feed post, Story, Reel, video) for transparent pricing',
        'Multi-platform Campaigns: Invoice for campaigns across Instagram, TikTok, YouTube simultaneously',
        'Usage Rights Monetization: Charge separately for content usage rights (typically 3-12 months) to maximize earnings',
        'Content Exclusivity: Offer exclusive vs non-exclusive partnerships at different price points',
        'Audience Metrics Documentation: Reference your follower count, engagement rate, and reach to justify pricing',
        'Campaign Timeline Clarity: Specify post dates and campaign duration to manage client expectations',
        'Deliverable Specifications: Detail what each post includes (swipe-ups, links, product tags, hashtags)',
        'Performance KPI Agreement: Reference agreed metrics (engagement rate, impressions, clicks) in advance',
        'Brand Compliance: Professional invoicing demonstrates business legitimacy for brand partnerships',
        'Scalable Influencer Business: Framework for growth from micro-influencer to full-time creator business'
      ],
      useCases: [
        'Instagram sponsored feed posts and carousel posts for fashion and beauty brands',
        'Instagram Stories campaigns with swipe-up links and product tags',
        'TikTok video sponsorships and brand partnership campaigns',
        'Multi-platform campaigns across Instagram, TikTok, and YouTube',
        'Product launch campaigns with unboxing and review content',
        'Brand ambassador programs with monthly retainer and deliverables',
        'Seasonal campaign collaborations (spring, summer, holiday collections)',
        'Event coverage and product launch attendance',
        'User-generated content creation for brand channels',
        'Affiliate marketing campaigns with tracked links and discount codes',
        'Long-term brand partnerships with quarterly deliverables',
        'Sponsored blog posts and website content creation'
      ]
    },
    {
      id: 'youtube-content-creator-invoice',
      categoryId: 'content-creation-social-media',
      categoryName: 'Content Creation & Social Media',
      name: 'YouTube Content Creator Invoice Template',
      description: 'Invoice template for YouTube video sponsorships, brand integrations, and content creation services',
      tier: 'free',
      searchVolume: 12300,
      cpc: 12.90,
      difficulty: 58,
      keywords: [
        'youtube invoice',
        'video sponsorship invoice',
        'youtube creator invoice',
        'content creator invoice',
        'youtube partnership invoice'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'youtube-creator-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'YT-2024-001', helpText: 'Unique invoice identifier' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date invoice is issued' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
        { fieldName: 'businessName', label: 'Channel Name', type: 'text' as const, required: true, placeholder: 'TechReview Channel', helpText: 'Your YouTube channel name' },
        { fieldName: 'businessAddress', label: 'Your Address', type: 'textarea' as const, required: true, helpText: 'Your address' },
        { fieldName: 'businessEmail', label: 'Your Email', type: 'email' as const, required: true, helpText: 'Your contact email' },
        { fieldName: 'clientName', label: 'Sponsor/Brand Name', type: 'text' as const, required: true, placeholder: 'Tech Company Ltd', helpText: 'Sponsor or brand name' },
        { fieldName: 'clientAddress', label: 'Sponsor Address', type: 'textarea' as const, required: true, helpText: 'Sponsor billing address' },
        creativeMediaFields.projectName,
        { fieldName: 'lineItems', label: 'Line Items', type: 'textarea' as const, required: true, helpText: 'Video deliverables and pricing' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Subtotal before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total amount due' }
      ],
      optionalFields: [
        { fieldName: 'businessPhone', label: 'Your Phone', type: 'phone' as const, required: false, helpText: 'Your phone number' },
        { fieldName: 'companyNumber', label: 'Company Number', type: 'text' as const, required: false, helpText: 'Company registration number' },
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration number' },
        { fieldName: 'clientEmail', label: 'Sponsor Email', type: 'email' as const, required: false, helpText: 'Sponsor email' },
        { fieldName: 'vatAmount', label: 'VAT Amount', type: 'currency' as const, required: false, helpText: 'VAT amount' },
        { fieldName: 'bankName', label: 'Bank Name', type: 'text' as const, required: false, helpText: 'Bank name' },
        { fieldName: 'accountNumber', label: 'Account Number', type: 'text' as const, required: false, helpText: 'Bank account number' },
        { fieldName: 'sortCode', label: 'Sort Code', type: 'text' as const, required: false, helpText: 'Bank sort code' },
        { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, helpText: 'Payment terms' },
        { fieldName: 'notes', label: 'Notes', type: 'textarea' as const, required: false, helpText: 'Additional notes' }
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
        invoiceDate: '2024-10-22',
        dueDate: '2024-11-05',
        businessName: 'TechReview Channel',
        businessAddress: '78 YouTuber Lane, Manchester, M1 2BB',
        businessEmail: 'business@techreviewchannel.com',
        businessPhone: '+44 161 789 4567',
        clientName: 'Gadget Tech Ltd',
        clientAddress: '200 Innovation Drive, Reading, RG1 1AA',
        clientEmail: 'marketing@gadgettech.com',
        projectName: 'Product Review Video Sponsorship',
        lineItems: [
          { description: 'Dedicated product review video (10-12 min)', quantity: 1, rate: 3500.00, amount: 3500.00 },
          { description: 'Video thumbnail and description optimization', quantity: 1, rate: 200.00, amount: 200.00 },
          { description: 'Social media promotion (Twitter, Instagram)', quantity: 1, rate: 400.00, amount: 400.00 }
        ],
        subtotal: 4100.00,
        vatAmount: 820.00,
        totalAmount: 4920.00,
        paymentTerms: 'Payment due within 14 days of video publication. Net 14 terms.',
        notes: 'Video to be published by November 15, 2024. Sponsor disclosure will be included as per FTC guidelines. Product review will be honest and unbiased. Approximate views: 50,000-75,000 based on channel average.'
      },
      industrySpecific: {
        serviceTypes: [
          'Dedicated Sponsorship Videos',
          'Integrated Sponsorships',
          'Product Review Videos',
          'Unboxing Videos',
          'Tutorial/How-to Videos',
          'Brand Partnership Videos',
          'Channel Takeovers'
        ],
        contentTypes: [
          'YouTube Videos',
          'Video Thumbnails',
          'Video Descriptions',
          'Pinned Comments',
          'Community Posts',
          'YouTube Shorts',
          'End Screen Promotions'
        ],
        platforms: [
          'YouTube',
          'YouTube Shorts',
          'YouTube Community',
          'Twitter/X',
          'Instagram',
          'TikTok'
        ]
      },
      businessBenefits: [
        'Video Sponsorship Pricing: Command premium rates for dedicated product review videos (typically £2,000-£10,000+ depending on channel size)',
        'Integration Type Options: Offer dedicated videos vs integrated sponsorships (30-60 second segments) at different prices',
        'Multi-video Campaigns: Invoice for series of videos or ongoing brand partnerships with volume discounts',
        'Channel Metrics Documentation: Reference subscriber count and average views to justify premium pricing',
        'Cross-promotion Value: Charge extra for promotion across Twitter, Instagram, and other social platforms',
        'Content Approval Process: Define how many revisions included and video approval timeline',
        'FTC Compliance: Professional disclosure of sponsored content demonstrates business legitimacy',
        'Performance Estimates: Provide expected view count and engagement based on channel analytics',
        'Exclusivity Agreements: Charge premium for category exclusivity (no competitor sponsorships for X months)',
        'Professional Creator Business: Establish yourself as legitimate business partner for major brand deals'
      ],
      useCases: [
        'Dedicated product review videos for tech, gadgets, and consumer electronics',
        'Integrated video sponsorships with 60-second brand mentions',
        'Software and app sponsorship videos with tutorial demonstrations',
        'Unboxing and first impressions videos for product launches',
        'Gaming sponsorships for games, hardware, and gaming accessories',
        'Beauty and cosmetics product review and tutorial videos',
        'Fashion haul and try-on videos with clothing brand partnerships',
        'Food and cooking sponsored recipe videos and ingredient features',
        'Fitness equipment and supplement review videos',
        'Travel vlog sponsorships with destination and hotel partners',
        'Educational content sponsorships (online courses, software tools)',
        'Multi-video campaign series with recurring monthly sponsorships'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY 4: MUSIC & AUDIO PRODUCTION
// ============================================================================

const musicAudioCategory: CreativeMediaCategory = {
  id: 'music-audio-production',
  name: 'Music & Audio Production',
  description: 'Invoice templates for podcasters, music producers, sound engineers, and audio professionals',
  icon: '🎙️',
  templates: [
    {
      id: 'podcast-production-invoice',
      categoryId: 'music-audio-production',
      categoryName: 'Music & Audio Production',
      name: 'Podcast Production Invoice Template ',
      description: 'Comprehensive invoice template for podcast production services including recording, editing, mixing, show notes, and distribution',
      tier: 'free',
      searchVolume: 16500,
      cpc: 10.40,
      difficulty: 53,
      keywords: [
        'podcast invoice',
        'podcast production invoice',
        'audio editing invoice',
        'podcast sponsorship invoice',
        'podcast services billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'podcast-production-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'POD-2024-001', helpText: 'Unique invoice identifier' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date invoice is issued' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text' as const, required: true, placeholder: 'Audio Excellence Production', helpText: 'Your production company name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
        { fieldName: 'businessEmail', label: 'Business Email', type: 'email' as const, required: true, helpText: 'Your business email' },
        { fieldName: 'clientName', label: 'Client/Podcast Name', type: 'text' as const, required: true, placeholder: 'The Business Show Podcast', helpText: 'Client or podcast name' },
        { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: true, helpText: 'Client billing address' },
        creativeMediaFields.projectName,
        { fieldName: 'lineItems', label: 'Line Items', type: 'textarea' as const, required: true, helpText: 'Production services and pricing' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Subtotal before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total amount due' }
      ],
      optionalFields: [
        { fieldName: 'businessPhone', label: 'Business Phone', type: 'phone' as const, required: false, helpText: 'Your phone number' },
        { fieldName: 'companyNumber', label: 'Company Number', type: 'text' as const, required: false, helpText: 'Company registration number' },
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration number' },
        { fieldName: 'clientEmail', label: 'Client Email', type: 'email' as const, required: false, helpText: 'Client email' },
        { fieldName: 'vatAmount', label: 'VAT Amount', type: 'currency' as const, required: false, helpText: 'VAT amount' },
        { fieldName: 'bankName', label: 'Bank Name', type: 'text' as const, required: false, helpText: 'Bank name' },
        { fieldName: 'accountNumber', label: 'Account Number', type: 'text' as const, required: false, helpText: 'Bank account number' },
        { fieldName: 'sortCode', label: 'Sort Code', type: 'text' as const, required: false, helpText: 'Bank sort code' },
        { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, helpText: 'Payment terms' },
        { fieldName: 'notes', label: 'Notes', type: 'textarea' as const, required: false, helpText: 'Additional notes' }
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
        invoiceDate: '2024-10-25',
        dueDate: '2024-11-08',
        businessName: 'Audio Excellence Production',
        businessAddress: '56 Sound Studio Way, Bristol, BS1 3CC',
        businessEmail: 'hello@audioexcellence.co.uk',
        businessPhone: '+44 117 456 7890',
        clientName: 'The Business Show Podcast',
        clientAddress: '90 Podcaster Street, Bristol, BS8 2DD',
        clientEmail: 'host@thebusinessshow.com',
        projectName: 'Monthly Podcast Production Package',
        lineItems: [
          { description: 'Podcast episode editing (4 episodes)', quantity: 4, rate: 150.00, amount: 600.00 },
          { description: 'Audio mixing and mastering', quantity: 4, rate: 75.00, amount: 300.00 },
          { description: 'Show notes writing (4 episodes)', quantity: 4, rate: 50.00, amount: 200.00 },
          { description: 'Audiogram creation for social media', quantity: 4, rate: 40.00, amount: 160.00 }
        ],
        subtotal: 1260.00,
        vatAmount: 252.00,
        totalAmount: 1512.00,
        paymentTerms: 'Payment due on the 1st of each month for previous month\'s production. Monthly retainer.',
        notes: 'Episodes delivered in MP3 (192kbps) and WAV formats. Turnaround time: 5 business days from raw audio receipt. Show notes include timestamps and key topics. Monthly package covers 4 episodes.'
      },
      industrySpecific: {
        serviceTypes: [
          'Podcast Editing',
          'Audio Mixing & Mastering',
          'Show Notes Writing',
          'Podcast Production',
          'Audio Engineering',
          'Podcast Consulting',
          'Distribution Setup'
        ],
        contentTypes: [
          'Edited Audio Episodes',
          'Multiple Audio Formats',
          'Show Notes',
          'Audiograms',
          'Episode Transcripts',
          'Intro/Outro Music',
          'Social Media Assets'
        ],
        platforms: [
          'Apple Podcasts',
          'Spotify',
          'Google Podcasts',
          'YouTube',
          'Podcast Hosting Platforms',
          'RSS Feeds',
          'Social Media'
        ]
      },
      businessBenefits: [
        'Monthly Package Pricing: Offer recurring monthly packages (e.g., 4 episodes/month) for predictable revenue',
        'Per-episode Pricing: Transparent per-episode rates for editing, mixing, and mastering services',
        'Add-on Services: Easily add show notes, transcription, audiograms, and social media assets as upsells',
        'Multi-format Delivery: Deliver MP3 for distribution and WAV for archival/quality backup',
        'Turnaround Time Clarity: Set clear expectations for delivery (e.g., 5-7 business days from raw audio)',
        'Revision Policy: Specify number of revision rounds included (typically 1-2) to manage scope',
        'Scalable Production Business: Framework for growth from freelance editor to full production agency',
        'Retainer Relationships: Monthly packages create stable recurring income vs one-off projects',
        'Value-added Services: Show notes and audiograms justify premium pricing beyond basic editing',
        'Professional Audio Brand: Impress podcast hosts with detailed, organized production invoicing'
      ],
      useCases: [
        'Monthly podcast production packages for ongoing podcast series (4-8 episodes/month)',
        'One-off podcast episode editing for special projects or guest appearances',
        'Podcast launch services including intro/outro creation and RSS setup',
        'Audio editing for interview podcasts with multi-track recording',
        'Narrative podcast production with sound design and music integration',
        'Corporate podcast production for businesses and brands',
        'Audiobook narration editing and mastering',
        'Show notes and SEO-optimized episode descriptions for all episodes',
        'Audiogram creation for social media promotion (Instagram, Twitter, LinkedIn)',
        'Podcast transcript services for accessibility and SEO',
        'Podcast consulting and strategy services for new podcasters',
        'Multi-show production for podcast networks or agencies'
      ]
    }
  ]
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const creativeMediaCategories: CreativeMediaCategory[] = [
  photographyVideographyCategory,
  graphicDesignBrandingCategory,
  contentCreationCategory,
  musicAudioCategory
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all creative & media templates across all categories
 */
export function getAllCreativeMediaTemplates(): CreativeMediaTemplate[] {
  return creativeMediaCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): CreativeMediaTemplate[] {
  const category = creativeMediaCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): CreativeMediaTemplate | undefined {
  return getAllCreativeMediaTemplates().find(template => template.id === templateId);
}

/**
 * Get all free creative & media templates
 */
export function getFreeCreativeMediaTemplates(): CreativeMediaTemplate[] {
  return getAllCreativeMediaTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium creative & media templates
 */
export function getPremiumCreativeMediaTemplates(): CreativeMediaTemplate[] {
  return getAllCreativeMediaTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchCreativeMediaTemplates(query: string): CreativeMediaTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllCreativeMediaTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get high-value templates (high search volume, high CPC)
 */
export function getHighValueTemplates(): CreativeMediaTemplate[] {
  return getAllCreativeMediaTemplates()
    .filter(template => template.searchVolume >= 10000 || template.cpc >= 10.0)
    .sort((a, b) => (b.searchVolume * b.cpc) - (a.searchVolume * a.cpc));
}

/**
 * Get creative & media industry statistics
 */
export function getCreativeMediaStats() {
  const allTemplates = getAllCreativeMediaTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreeCreativeMediaTemplates().length,
    premiumTemplates: getPremiumCreativeMediaTemplates().length,
    totalCategories: creativeMediaCategories.length,
    totalSearchVolume: allTemplates.reduce((sum, t) => sum + t.searchVolume, 0),
    averageCPC: allTemplates.reduce((sum, t) => sum + t.cpc, 0) / allTemplates.length,
    averageDifficulty: allTemplates.reduce((sum, t) => sum + t.difficulty, 0) / allTemplates.length,
    highValueTemplates: getHighValueTemplates().length
  };
}

/**
 * Get SEO recommendations based on template metrics
 */
export function getSEORecommendations() {
  const templates = getAllCreativeMediaTemplates();
  const highSearch = templates.filter(t => t.searchVolume >= 15000);
  const highCPC = templates.filter(t => t.cpc >= 10.0);
  const lowDifficulty = templates.filter(t => t.difficulty <= 45);

  return {
    highSearchVolume: highSearch.map(t => ({ id: t.id, name: t.name, searchVolume: t.searchVolume })),
    highCommercialValue: highCPC.map(t => ({ id: t.id, name: t.name, cpc: t.cpc })),
    easiestToRankFor: lowDifficulty.map(t => ({ id: t.id, name: t.name, difficulty: t.difficulty }))
  };
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  categories: creativeMediaCategories,
  templates: getAllCreativeMediaTemplates(),
  utils: {
    getAllTemplates: getAllCreativeMediaTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreeCreativeMediaTemplates,
    getPremiumTemplates: getPremiumCreativeMediaTemplates,
    search: searchCreativeMediaTemplates,
    getHighValueTemplates,
    getStats: getCreativeMediaStats,
    getSEORecommendations
  }
};
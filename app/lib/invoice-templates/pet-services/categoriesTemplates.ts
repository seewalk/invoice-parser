import { InvoiceField, IndustryStandard } from '../../invoiceTemplateLibrary';

/**
 * Pet Services Industry Invoice Templates
 * 
 * Comprehensive collection of invoice templates for pet services including:
 * - Veterinary clinics and animal hospitals
 * - Pet grooming salons and mobile groomers
 * - Dog training and obedience classes
 * 
 * Each template includes:
 * - Complete field definitions (required and optional)
 * - Industry-specific standards and compliance requirements
 * - Realistic sample data for testing and preview
 * - Business benefits and use cases for SEO
 * - Service types, certifications, and deliverables
 */

export interface PetServicesTemplate {
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

export interface PetServicesCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: PetServicesTemplate[];
}

// Pet Services specific field definitions
export const petServicesFields = {
  petName: {
    fieldName: 'petName',
    label: 'Pet Name',
    type: 'text' as const,
    required: true,
    placeholder: 'Max',
    helpText: 'Name of the pet'
  },
  petSpecies: {
    fieldName: 'petSpecies',
    label: 'Pet Species',
    type: 'text' as const,
    required: true,
    placeholder: 'Dog / Cat / Rabbit',
    helpText: 'Type of animal'
  },
  petBreed: {
    fieldName: 'petBreed',
    label: 'Breed',
    type: 'text' as const,
    required: false,
    placeholder: 'Golden Retriever',
    helpText: 'Breed of the pet'
  },
  microchipNumber: {
    fieldName: 'microchipNumber',
    label: 'Microchip Number',
    type: 'text' as const,
    required: false,
    placeholder: '985112345678901',
    helpText: 'Pet microchip identification number'
  },
  sessionDuration: {
    fieldName: 'sessionDuration',
    label: 'Session Duration (minutes)',
    type: 'number' as const,
    required: false,
    placeholder: '60',
    helpText: 'Duration of training session'
  },
  sessionsRemaining: {
    fieldName: 'sessionsRemaining',
    label: 'Sessions Remaining',
    type: 'number' as const,
    required: false,
    placeholder: '5',
    helpText: 'Remaining sessions in package'
  }
};

// Common fields used across pet services templates
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
    placeholder: 'Your Business Name',
    helpText: 'Name of your pet services business'
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
    placeholder: 'info@business.com',
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
    helpText: 'Name of the pet owner'
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
    helpText: 'VAT/tax amount (veterinary services often VAT-exempt)'
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
  vatNumber: {
    fieldName: 'vatNumber',
    label: 'VAT Number',
    type: 'text' as const,
    required: false,
    placeholder: 'GB123456789',
    helpText: 'VAT registration number'
  },
  companyNumber: {
    fieldName: 'companyNumber',
    label: 'Company Registration Number',
    type: 'text' as const,
    required: false,
    placeholder: '12345678',
    helpText: 'Company registration number'
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
// CATEGORY 1: Veterinary Services
// ============================================================================

const veterinaryServicesCategory: PetServicesCategory = {
  id: 'veterinary-services',
  name: 'Veterinary Services',
  description: 'Professional invoice templates for veterinarians, animal hospitals, and veterinary clinics',
  icon: '🏥',
  templates: [
    {
      id: 'veterinary-services-invoice',
      categoryId: 'veterinary-services',
      categoryName: 'Veterinary Services',
      name: 'Veterinary Services Invoice Template',
      description: 'Professional invoice template for veterinary services including consultations, treatments, medications, and surgical procedures with RCVS compliance',
      tier: 'free',
      searchVolume: 2400,
      cpc: 6.80,
      difficulty: 33,
      keywords: [
        'veterinary invoice',
        'vet invoice',
        'animal hospital invoice',
        'pet clinic invoice',
        'veterinary billing',
        'vet clinic invoice'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'veterinary-001',
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
        petServicesFields.petName,
        petServicesFields.petSpecies,
        petServicesFields.petBreed,
        petServicesFields.microchipNumber,
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
          standard: 'RCVS Registration',
          description: 'Include Royal College of Veterinary Surgeons (RCVS) registration number to demonstrate professional veterinary qualification.',
          complianceLevel: 'required'
        },
        {
          standard: 'Pet Identification',
          description: 'Record pet name, species, breed, and microchip number for accurate medical records and client identification.',
          complianceLevel: 'required'
        },
        {
          standard: 'Treatment Details',
          description: 'Itemize consultations, procedures, medications separately for transparency and insurance claims.',
          complianceLevel: 'required'
        },
        {
          standard: 'Medication Information',
          description: 'Include prescription details and dosage instructions for medications dispensed.',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Follow-up Care',
          description: 'Include follow-up appointment details if applicable for continuity of care.',
          complianceLevel: 'optional'
        }
      ],
      sampleData: {
        invoiceNumber: 'VET-2024-1234',
        invoiceDate: '2024-01-18',
        dueDate: '2024-02-01',
        businessName: 'Caring Paws Veterinary Clinic',
        businessAddress: '123 Animal Care Lane\nLondon, SW1 1AA',
        businessEmail: 'admin@caringpawsvet.co.uk',
        businessPhone: '+44 20 1234 5678',
        clientName: 'Sarah Thompson',
        clientEmail: 'sarah.thompson@email.com',
        clientAddress: '456 Pet Lover Street\nLondon, SW2 2BB',
        serviceDate: '2024-01-18',
        petName: 'Max',
        petSpecies: 'Dog',
        petBreed: 'Golden Retriever',
        microchipNumber: '985112345678901',
        lineItems: [
          { description: 'General consultation - Max (Golden Retriever)', quantity: 1, rate: 55.00, amount: 55.00 },
          { description: 'Vaccination (Rabies booster)', quantity: 1, rate: 45.00, amount: 45.00 },
          { description: 'Blood test (Complete panel)', quantity: 1, rate: 85.00, amount: 85.00 },
          { description: 'Medication - Antibiotics (7 days)', quantity: 1, rate: 28.00, amount: 28.00 }
        ],
        subtotal: 213.00,
        vatAmount: 0.00, // Veterinary services are VAT-exempt in UK
        totalAmount: 213.00,
        paymentTerms: 'Payment due within 14 days. We accept cash, card, and bank transfer.',
        notes: 'Follow-up appointment scheduled for 2 weeks. Administer antibiotics twice daily with food. Please contact us if any concerns arise.'
      },
      industrySpecific: {
        serviceTypes: [
          'General Consultations',
          'Vaccinations and Immunizations',
          'Surgery and Procedures',
          'Dental Care',
          'Emergency Care',
          'Laboratory Tests',
          'X-Rays and Imaging',
          'Microchipping',
          'Health Check-ups',
          'Prescription Medications',
          'Wound Care and Bandaging',
          'Euthanasia Services',
          'Pet Passport Services'
        ],
        certifications: [
          'Royal College of Veterinary Surgeons (RCVS) Registration',
          'Veterinary Surgeon Degree (BVSc, BVMS, BVetMed)',
          'Certificate in Advanced Veterinary Practice',
          'RCVS Advanced Practitioner Status',
          'Specialist Certifications (Surgery, Medicine, etc.)',
          'Professional Indemnity Insurance',
          'Veterinary Practice Standards Scheme (VPSS)',
          'Fear Free Certification',
          'CPD (Continuing Professional Development) Compliance'
        ],
        deliverables: [
          'Veterinary consultations and examinations',
          'Diagnosis and treatment plans',
          'Surgical procedures',
          'Prescription medications',
          'Vaccination records',
          'Laboratory test results',
          'X-ray and imaging reports',
          'Medical certificates',
          'Post-treatment care instructions',
          'Follow-up appointment scheduling',
          'Pet health records',
          'Insurance claim documentation'
        ]
      },
      businessBenefits: [
  'Veterinary Practice Invoicing: Professional billing for consultations, surgical procedures, diagnostic tests, and emergency veterinary care',
  'RCVS Compliance Display: Royal College of Veterinary Surgeons registration number inclusion ensures regulatory compliance and professional credibility',
  'Patient Record Integration: Pet name, species, breed, age, weight, and microchip number tracking supports accurate clinical records and GDPR compliance',
  'Transparent Medical Billing: Itemized breakdown for initial consultation, diagnostic imaging (X-rays, ultrasound), blood tests, and surgical procedures',
  'VAT-Exempt Veterinary Services: Proper zero-rated VAT handling for medical treatment of animals meets HMRC veterinary services exemption rules',
  'Prescription Documentation: Medication name, dosage, quantity, and dispensing fees support pharmacy compliance and Veterinary Medicines Regulations',
  'Continuity of Care: Follow-up appointment scheduling and post-operative care instructions improve treatment outcomes and client satisfaction',
  'Pet Insurance Optimization: Insurance-friendly format with procedure codes and detailed itemization speeds up claim processing with Petplan, Animal Friends, and Agria',
  'Client Trust Building: Professional invoice format reflects high veterinary standards and reassures pet owners during stressful treatment decisions',
  'Payment Terms Clarity: Deposit requirements for procedures and payment-on-collection terms improve veterinary practice cash flow management',
  'Emergency & Routine Support: Flexible billing for out-of-hours emergency visits, routine vaccinations, dental procedures, and wellness check-ups',
  'Practice Efficiency: Pre-formatted template reduces reception administration during busy clinic hours and multi-vet practices with high patient volume',
  'Multi-Species Capability: Easy customization for dogs, cats, rabbits, exotic pets, equine veterinary care, and farm animal treatments'
],
      useCases: [
        'Veterinary clinic billing pet owner for routine health check-up',
        'Animal hospital invoicing emergency surgical procedure',
        'Vet practice billing for vaccination and immunization services',
        'Mobile vet invoicing home visit consultation',
        'Veterinary surgery billing for dental cleaning procedure',
        'Animal hospital invoicing overnight hospitalization and monitoring',
        'Vet clinic billing for diagnostic imaging (X-rays, ultrasound)',
        'Veterinary practice invoicing laboratory blood tests',
        'Animal hospital billing for spay/neuter surgery',
        'Vet clinic invoicing prescription medications and pharmaceuticals',
        'Veterinary practice billing for microchipping service',
        'Animal hospital invoicing chemotherapy or cancer treatment',
        'Vet clinic billing for behavioral consultation',
        'Veterinary practice invoicing pet passport and travel certification',
        'Animal hospital billing for orthopedic surgery and follow-up care'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY 2: Pet Grooming
// ============================================================================

const petGroomingCategory: PetServicesCategory = {
  id: 'pet-grooming',
  name: 'Pet Grooming',
  description: 'Invoice templates for pet grooming salons, mobile groomers, and pet styling services',
  icon: '✂️',
  templates: [
    {
      id: 'pet-grooming-invoice',
      categoryId: 'pet-grooming',
      categoryName: 'Pet Grooming',
      name: 'Pet Grooming Invoice Template',
      description: 'Invoice template for pet grooming services including bathing, haircuts, nail trimming, and specialty treatments',
      tier: 'free',
      searchVolume: 1800,
      cpc: 5.20,
      difficulty: 29,
      keywords: [
        'pet grooming invoice',
        'dog grooming invoice',
        'pet salon invoice',
        'mobile grooming invoice',
        'cat grooming invoice',
        'pet spa invoice'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'pet-grooming-001',
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
        petServicesFields.petName,
        petServicesFields.petSpecies,
        petServicesFields.petBreed,
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
          standard: 'Pet Details',
          description: 'Record pet name, breed, size, and coat type for appropriate grooming service selection.',
          complianceLevel: 'required'
        },
        {
          standard: 'Service Itemization',
          description: 'Break down grooming services (bath, cut, nails, ears, teeth, etc.) for pricing transparency.',
          complianceLevel: 'required'
        },
        {
          standard: 'Health Observations',
          description: 'Note any skin conditions, lumps, or health concerns observed during grooming.',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Product Information',
          description: 'List shampoos and products used if premium, specialty, or hypoallergenic.',
          complianceLevel: 'optional'
        }
      ],
      sampleData: {
        invoiceNumber: 'GROOM-2024-0567',
        invoiceDate: '2024-01-20',
        dueDate: '2024-01-20',
        businessName: 'Pampered Paws Grooming',
        businessAddress: '789 Pet Care Avenue\nBirmingham, B1 1AA',
        businessEmail: 'bookings@pamperedpawsgrooming.co.uk',
        businessPhone: '+44 121 555 0123',
        clientName: 'Michael Davies',
        clientEmail: 'michael.davies@email.com',
        serviceDate: '2024-01-20',
        petName: 'Bella',
        petSpecies: 'Dog',
        petBreed: 'Cocker Spaniel (Medium)',
        lineItems: [
          { description: 'Full groom - Bella (Cocker Spaniel, Medium)', quantity: 1, rate: 55.00, amount: 55.00 },
          { description: 'Nail trimming and filing', quantity: 1, rate: 12.00, amount: 12.00 },
          { description: 'Ear cleaning', quantity: 1, rate: 8.00, amount: 8.00 },
          { description: 'Teeth brushing', quantity: 1, rate: 10.00, amount: 10.00 },
          { description: 'Hypoallergenic shampoo (upgrade)', quantity: 1, rate: 5.00, amount: 5.00 }
        ],
        subtotal: 90.00,
        vatAmount: 18.00,
        totalAmount: 108.00,
        paymentTerms: 'Payment due on collection. We accept cash and card.',
        notes: 'Bella was very well-behaved today! Next grooming appointment recommended in 6-8 weeks. Small mat noted behind right ear - recommend daily brushing.'
      },
      industrySpecific: {
        serviceTypes: [
          'Full Grooming Service',
          'Bath and Brush',
          'Haircut and Styling',
          'Nail Trimming',
          'Ear Cleaning',
          'Teeth Brushing',
          'De-shedding Treatment',
          'Flea and Tick Treatment',
          'Puppy Introduction Groom',
          'Senior Pet Grooming',
          'Hand Stripping',
          'Cat Grooming',
          'Mobile Grooming Service'
        ],
        certifications: [
          'City & Guilds Level 2 Dog Grooming',
          'City & Guilds Level 3 Dog Grooming',
          'International Professional Groomers (IPG) Certification',
          'British Dog Groomers Association (BDGA) Member',
          'Cat Grooming Specialist Certification',
          'Pet First Aid Certification',
          'Animal Handling and Behavior Training',
          'Health & Safety Certification',
          'Public Liability Insurance',
          'Canine Beautician Certification'
        ],
        deliverables: [
          'Complete bath and blow-dry',
          'Breed-specific haircut and styling',
          'Nail clipping and filing',
          'Ear cleaning and plucking',
          'Teeth brushing',
          'Anal gland expression (if needed)',
          'Coat de-matting',
          'Flea and tick treatment application',
          'Perfume or cologne spritz',
          'Bandana or bow accessory',
          'Health and coat condition report',
          'Next grooming appointment reminder'
        ]
      },
      businessBenefits: [
  'Pet Grooming Invoice: Professional billing for dog grooming salons, mobile groomers, cat grooming specialists, and boutique pet spas',
  'Breed-Specific Documentation: Pet name, breed, weight, coat type, and temperament tracking ensures personalized grooming service records',
  'Transparent Service Pricing: Itemized breakdown for full groom, bath and blow-dry, hand stripping, de-shedding, and styling cuts',
  'Multi-Service Support: Separate billing for nail clipping, teeth brushing, ear cleaning, anal gland expression, and flea treatments',
  'Premium Product Upsell: Line items for hypoallergenic shampoos, medicated treatments, cologne sprays, and conditioning products maximize revenue',
  'Pet Welfare Documentation: Health observation notes section (skin issues, matting, parasites) demonstrates duty of care and liability protection',
  'Professional Brand Image: Premium invoice format reflects high-quality grooming standards and appeals to devoted pet owners',
  'Size-Based Pricing Clarity: Transparent rates for small breeds (£30-£40), medium (£40-£60), large (£60-£90), and giant breeds (£90-£150)',
  'UK VAT Compliance: Proper 20% VAT calculation on pet grooming services meets HMRC requirements for grooming businesses',
  'Payment Collection Efficiency: Pay-on-collection terms reduce no-shows and improve cash flow for mobile groomers and salon owners',
  'Dual Operation Support: Flexible format for salon bookings with reception desk and mobile van operations with on-site appointments',
  'High-Volume Efficiency: Pre-formatted template speeds up checkout during peak grooming seasons (spring, pre-Christmas)',
  'Multi-Species Adaptability: Easy customization for dog breeds (Poodles, Cockapoos, Terriers), Persian cats, rabbits, and guinea pig grooming'
],
      useCases: [
        'Pet grooming salon billing full groom service for medium dog',
        'Mobile groomer invoicing home visit grooming appointment',
        'Dog groomer billing breed-specific haircut (Poodle, Bichon, Terrier)',
        'Pet spa invoicing luxury grooming package with bath, cut, and spa treatment',
        'Cat groomer billing feline grooming and nail trim service',
        'Grooming salon invoicing de-shedding treatment for long-haired dog',
        'Mobile groomer billing senior pet gentle grooming service',
        'Pet groomer invoicing puppy introduction groom and training',
        'Grooming business billing express grooming for busy pet owners',
        'Dog groomer invoicing hand-stripping for wire-haired breeds',
        'Pet salon billing hypoallergenic grooming for sensitive skin',
        'Mobile groomer invoicing multi-pet household grooming service',
        'Grooming salon billing flea and tick treatment grooming',
        'Pet groomer invoicing show dog preparation and styling',
        'Salon billing mat removal and extensive grooming recovery service'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY 3: Dog Training
// ============================================================================

const dogTrainingCategory: PetServicesCategory = {
  id: 'dog-training',
  name: 'Dog Training',
  description: 'Invoice templates for dog trainers, obedience classes, and behavior modification services',
  icon: '🦮',
  templates: [
    {
      id: 'dog-training-invoice',
      categoryId: 'dog-training',
      categoryName: 'Dog Training',
      name: 'Dog Training Invoice Template',
      description: 'Professional invoice template for dog training services including obedience training, behavior modification, and puppy classes',
      tier: 'free',
      searchVolume: 1100,
      cpc: 7.60,
      difficulty: 31,
      keywords: [
        'dog training invoice',
        'pet training invoice',
        'obedience class invoice',
        'dog trainer invoice',
        'puppy training invoice',
        'behavior training invoice'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'dog-training-001',
      requiredFields: [
        commonFields.invoiceNumber,
        commonFields.invoiceDate,
        commonFields.dueDate,
        commonFields.businessName,
        commonFields.businessAddress,
        commonFields.businessEmail,
        commonFields.clientName,
        commonFields.serviceDate,
        petServicesFields.sessionDuration,
        commonFields.lineItems,
        commonFields.subtotal,
        commonFields.totalAmount
      ],
      optionalFields: [
        commonFields.businessPhone,
        commonFields.companyNumber,
        commonFields.vatNumber,
        petServicesFields.petName,
        petServicesFields.petSpecies,
        petServicesFields.petBreed,
        petServicesFields.sessionsRemaining,
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
          standard: 'Trainer Certification',
          description: 'Include relevant certifications (IMDT, APDT, COAPE, etc.) to demonstrate professional training qualifications.',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Training Program Details',
          description: 'Specify training type (basic obedience, behavioral modification, puppy socialization, etc.).',
          complianceLevel: 'required'
        },
        {
          standard: 'Session Package Tracking',
          description: 'Show remaining sessions if part of a multi-session package for client transparency.',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Training Materials',
          description: 'List any included handouts, equipment, or resources provided during training.',
          complianceLevel: 'optional'
        }
      ],
      sampleData: {
        invoiceNumber: 'TRAIN-2024-0234',
        invoiceDate: '2024-01-22',
        dueDate: '2024-02-05',
        businessName: 'Positive Paws Dog Training',
        businessAddress: '321 Training Lane\nManchester, M1 1AA',
        businessEmail: 'info@positivepawstraining.co.uk',
        businessPhone: '+44 161 555 0199',
        clientName: 'Emma Wilson',
        clientEmail: 'emma.wilson@email.com',
        serviceDate: '2024-01-22',
        sessionDuration: 60,
        petName: 'Charlie',
        petSpecies: 'Dog',
        petBreed: 'Labrador',
        sessionsRemaining: 5,
        lineItems: [
          { description: 'Private training session - Charlie (Labrador)', quantity: 1, rate: 75.00, amount: 75.00 },
          { description: 'Training package (6 sessions) - Discount applied', quantity: 1, rate: 375.00, amount: 375.00 },
          { description: 'Training collar and lead set', quantity: 1, rate: 35.00, amount: 35.00 }
        ],
        subtotal: 485.00,
        vatAmount: 97.00,
        totalAmount: 582.00,
        paymentTerms: 'Package payment due in full before first session. Individual sessions payable on the day.',
        notes: 'Charlie is making excellent progress with basic commands (sit, stay, come). 5 sessions remaining in package. Homework: Practice "stay" command for 10 minutes daily. Next session scheduled for January 29th.'
      },
      industrySpecific: {
        serviceTypes: [
          'Basic Obedience Training',
          'Puppy Training Classes',
          'Advanced Obedience',
          'Behavior Modification',
          'Aggression Management',
          'Separation Anxiety Training',
          'Leash Training',
          'Recall Training',
          'Socialization Classes',
          'Clicker Training',
          'Agility Training',
          'Service Dog Training',
          'Therapy Dog Preparation',
          'One-on-One Private Training'
        ],
        certifications: [
          'Institute of Modern Dog Trainers (IMDT) Certification',
          'Association of Pet Dog Trainers (APDT) Member',
          'COAPE Diploma in Canine Behaviour',
          'Kennel Club Accredited Instructor (KCAI)',
          'Certified Professional Dog Trainer (CPDT)',
          'Karen Pryor Academy Certified Training Partner',
          'Pet Professional Guild Member',
          'Animal Behaviour and Training Council (ABTC) Registration',
          'Canine First Aid Certification',
          'Pet Insurance and Public Liability Insurance'
        ],
        deliverables: [
          'One-on-one training sessions',
          'Group training classes',
          'Customized training programs',
          'Behavior assessment and analysis',
          'Training progress reports',
          'Homework exercises and practice plans',
          'Training handouts and resources',
          'Video demonstrations',
          'Email and phone support between sessions',
          'Equipment recommendations',
          'Training collar and lead (if included)',
          'Lifetime alumni support group access'
        ]
      },
      businessBenefits: [
  'Dog Training Invoicing: Professional billing for private lessons, group classes, puppy training, and behavioral modification programs',
  'Hourly Session Tracking: Accurate time-based billing for 30-min, 60-min, and 90-min sessions with per-hour or per-session rates',
  'Package Session Management: Clear display of 6-session, 10-session, or 12-week packages with remaining sessions motivating client completion',
  'Canine Client Records: Dog name, breed, age, and behavioral notes tracking supports personalized training plans and progress documentation',
  'APDT/IMDT Certification: Displays Association of Pet Dog Trainers or Institute of Modern Dog Trainers credentials, establishing professional expertise',
  'Multi-Service Billing: Separate line items for training sessions, puppy socialization classes, reactive dog courses, and training equipment sales',
  'Training Specialty Support: Flexible billing for obedience training, aggression rehabilitation, separation anxiety therapy, and CGC (Canine Good Citizen) prep',
  'Equipment Revenue Stream: Itemized billing for training collars, clickers, treat pouches, long lines, and recommended books or toys',
  'Client Trust Building: Professional invoice format reflects science-based training methods and attracts committed dog owners willing to invest',
  'Package Pricing Clarity: Upfront payment options for 6-week puppy courses or 8-week reactive dog programs improve cash flow predictability',
  'Dual Training Models: Supports one-on-one private sessions, small group classes (4-6 dogs), and walk-and-train service billing',
  'Administrative Time Savings: Pre-formatted template reduces paperwork for mobile trainers managing multiple clients and locations daily',
  'Methodology Flexibility: Easy customization for positive reinforcement (R+), clicker training, force-free methods, and relationship-based training approaches'
],
      useCases: [
        'Dog trainer billing client for private obedience training session',
        'Training business invoicing 6-session puppy training package',
        'Behaviorist billing for aggression modification program',
        'Dog trainer invoicing group obedience class (6-week course)',
        'Training business billing for separation anxiety behavior program',
        'Dog trainer invoicing private session for leash reactivity training',
        'Puppy school invoicing for 8-week puppy socialization course',
        'Trainer billing for advanced off-leash recall training program',
        'Dog training business invoicing agility training course',
        'Behaviorist billing for anxiety and fear behavior consultation',
        'Trainer invoicing service dog foundation training program',
        'Dog school billing for reactive dog rehabilitation classes',
        'Trainer invoicing therapy dog certification preparation course',
        'Training business billing for in-home private training sessions',
        'Dog trainer invoicing corporate team-building dog training workshop'
      ]
    }
  ]
};

// ============================================================================
// EXPORTS
// ============================================================================

export const petServicesCategories: PetServicesCategory[] = [
  veterinaryServicesCategory,
  petGroomingCategory,
  dogTrainingCategory
];

// Helper function to get all templates across categories
export function getAllPetServicesTemplates(): PetServicesTemplate[] {
  return petServicesCategories.flatMap(category => category.templates);
}

// Helper function to get template by ID
export function getPetServicesTemplateById(id: string): PetServicesTemplate | undefined {
  return getAllPetServicesTemplates().find(template => template.id === id);
}

// Helper function to get templates by category
export function getPetServicesTemplatesByCategory(categoryId: string): PetServicesTemplate[] {
  const category = petServicesCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

// Helper function to get category by ID
export function getPetServicesCategoryById(id: string): PetServicesCategory | undefined {
  return petServicesCategories.find(category => category.id === id);
}

// Helper function to search templates by keyword
export function searchPetServicesTemplates(keyword: string): PetServicesTemplate[] {
  const lowerKeyword = keyword.toLowerCase();
  return getAllPetServicesTemplates().filter(template =>
    template.name.toLowerCase().includes(lowerKeyword) ||
    template.description.toLowerCase().includes(lowerKeyword) ||
    template.keywords.some(k => k.toLowerCase().includes(lowerKeyword))
  );
}
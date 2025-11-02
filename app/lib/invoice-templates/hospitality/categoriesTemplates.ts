import { InvoiceField, IndustryStandard } from '../../invoiceTemplateLibrary';

/**
 * Hospitality Industry Invoice Templates
 * 
 * Comprehensive collection of invoice templates for hospitality services including:
 * - Restaurants and food service establishments
 * - Catering services for events and functions
 * - Hotels and accommodation providers
 * - Short-term rentals and holiday lets (Airbnb, vacation rentals)
 * 
 * Each template includes:
 * - Complete field definitions (required and optional)
 * - Industry-specific standards and compliance requirements
 * - Realistic sample data for testing and preview
 * - Business benefits and use cases for SEO
 * - Service types, certifications, and deliverables
 */

export interface HospitalityTemplate {
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

export interface HospitalityCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: HospitalityTemplate[];
}

// Hospitality specific field definitions
export const hospitalityFields = {
  tableNumber: {
    fieldName: 'tableNumber',
    label: 'Table Number',
    type: 'text' as const,
    required: false,
    placeholder: 'Table 12',
    helpText: 'Table number for this order'
  },
  serverName: {
    fieldName: 'serverName',
    label: 'Server Name',
    type: 'text' as const,
    required: false,
    placeholder: 'Sarah',
    helpText: 'Name of server who took the order'
  },
  serviceCharge: {
    fieldName: 'serviceCharge',
    label: 'Service Charge',
    type: 'number' as const,
    required: false,
    placeholder: '12.50',
    helpText: 'Optional service charge (typically 10-12.5%)'
  },
  eventDate: {
    fieldName: 'eventDate',
    label: 'Event Date',
    type: 'date' as const,
    required: true,
    helpText: 'Date of catered event'
  },
  eventLocation: {
    fieldName: 'eventLocation',
    label: 'Event Location',
    type: 'text' as const,
    required: true,
    placeholder: 'The Grand Ballroom, Royal Hotel',
    helpText: 'Venue where catering service was provided'
  },
  guestCount: {
    fieldName: 'guestCount',
    label: 'Number of Guests',
    type: 'number' as const,
    required: true,
    placeholder: '120',
    helpText: 'Total number of guests served'
  },
  menuType: {
    fieldName: 'menuType',
    label: 'Menu Type',
    type: 'text' as const,
    required: false,
    placeholder: 'Wedding Breakfast - 3 Course',
    helpText: 'Type of menu served'
  },
  depositPaid: {
    fieldName: 'depositPaid',
    label: 'Deposit Paid',
    type: 'number' as const,
    required: false,
    placeholder: '2000.00',
    helpText: 'Deposit amount already paid'
  },
  balanceDue: {
    fieldName: 'balanceDue',
    label: 'Balance Due',
    type: 'number' as const,
    required: false,
    placeholder: '5164.00',
    helpText: 'Remaining balance after deposit'
  },
  bookingReference: {
    fieldName: 'bookingReference',
    label: 'Booking Reference',
    type: 'text' as const,
    required: true,
    placeholder: 'BK-24-10847',
    helpText: 'Unique booking reference number'
  },
  checkInDate: {
    fieldName: 'checkInDate',
    label: 'Check-In Date',
    type: 'date' as const,
    required: true,
    helpText: 'Guest check-in date'
  },
  checkOutDate: {
    fieldName: 'checkOutDate',
    label: 'Check-Out Date',
    type: 'date' as const,
    required: true,
    helpText: 'Guest check-out date'
  },
  roomNumber: {
    fieldName: 'roomNumber',
    label: 'Room Number',
    type: 'text' as const,
    required: false,
    placeholder: '305',
    helpText: 'Room number occupied'
  },
  roomType: {
    fieldName: 'roomType',
    label: 'Room Type',
    type: 'text' as const,
    required: false,
    placeholder: 'Deluxe Double',
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
    placeholder: '4',
    helpText: 'Total number of guests'
  },
  cleaningFee: {
    fieldName: 'cleaningFee',
    label: 'Cleaning Fee',
    type: 'number' as const,
    required: false,
    placeholder: '50.00',
    helpText: 'One-time cleaning charge'
  },
  securityDeposit: {
    fieldName: 'securityDeposit',
    label: 'Security Deposit',
    type: 'number' as const,
    required: false,
    placeholder: '200.00',
    helpText: 'Refundable deposit amount'
  }
};

// Common fields used across hospitality templates
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
  businessName: {
    fieldName: 'businessName',
    label: 'Business Name',
    type: 'text' as const,
    required: true,
    placeholder: 'Your Business Name',
    helpText: 'Name of your hospitality business'
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
    helpText: 'Name of the client or guest'
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
    helpText: 'VAT/tax amount'
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
  }
};

// ============================================================================
// CATEGORY 1: Restaurants & Food Services
// ============================================================================

const restaurantsFoodServicesCategory: HospitalityCategory = {
  id: 'restaurants-food-services',
  name: 'Restaurants & Food Services',
  description: 'Professional invoice templates for restaurants, cafes, and food service establishments',
  icon: '🍕',
  templates: [
    {
      id: 'restaurant-dine-in-invoice',
      categoryId: 'restaurants-food-services',
      categoryName: 'Restaurants & Food Services',
      name: 'Restaurant Dine-In Invoice Template',
      description: 'Standard invoice template for restaurant table service with itemized menu items, service charges, and VAT',
      tier: 'free',
      searchVolume: 480,
      cpc: 4.20,
      difficulty: 35,
      keywords: [
        'restaurant invoice',
        'food invoice',
        'dining invoice',
        'restaurant bill template',
        'food service invoice'
      ],
      sourceFile: 'invoiceTemplateLibrary.ts',
      sourceTemplateId: 'restaurant-foh-001',
      requiredFields: [
        commonFields.invoiceNumber,
        commonFields.invoiceDate,
        commonFields.businessName,
        commonFields.businessAddress,
        commonFields.lineItems,
        commonFields.subtotal,
        commonFields.totalAmount
      ],
      optionalFields: [
        commonFields.businessPhone,
        commonFields.businessEmail,
        commonFields.vatNumber,
        commonFields.vatAmount,
        hospitalityFields.tableNumber,
        hospitalityFields.serverName,
        hospitalityFields.serviceCharge,
        commonFields.notes
      ],
      industryStandards: [
        {
          standard: 'VAT Registration',
          description: 'VAT applies to restaurant food at the standard rate (20% in UK). Some items like cold takeaway food may be zero-rated.',
          complianceLevel: 'required'
        },
        {
          standard: 'Food Allergen Information',
          description: 'Include allergen information for menu items in compliance with food labeling regulations (14 major allergens).',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Service Charge Transparency',
          description: 'Clearly indicate if service charge is optional and goes to staff. Must comply with consumer protection regulations.',
          complianceLevel: 'recommended'
        }
      ],
      sampleData: {
        invoiceNumber: 'INV-2024-1247',
        invoiceDate: '2024-10-18',
        businessName: 'The Garden Kitchen',
        businessAddress: '45 High Street, London, SW1A 1AA',
        businessPhone: '+44 20 1234 5678',
        businessEmail: 'info@gardenkitchen.co.uk',
        vatNumber: 'GB 123 4567 89',
        tableNumber: 'Table 8',
        serverName: 'Emma',
        lineItems: [
          { description: 'Starter - Soup of the Day', quantity: 2, rate: 6.95, amount: 13.90 },
          { description: 'Main - Grilled Salmon', quantity: 1, rate: 18.95, amount: 18.95 },
          { description: 'Main - Beef Wellington', quantity: 1, rate: 24.95, amount: 24.95 },
          { description: 'Dessert - Chocolate Brownie', quantity: 2, rate: 7.50, amount: 15.00 },
          { description: 'Drinks - House Wine (Bottle)', quantity: 1, rate: 22.00, amount: 22.00 }
        ],
        subtotal: 94.80,
        serviceCharge: 9.48,
        vatAmount: 20.86,
        totalAmount: 125.14,
        notes: 'Thank you for dining with us! 10% service charge is optional and goes directly to staff.'
      },
      industrySpecific: {
        serviceTypes: [
          'Dine-In Service',
          'Table Service',
          'Fine Dining',
          'Casual Dining',
          'Takeaway Service',
          'Delivery Service',
          'Private Dining',
          'Banquet Service',
          'Buffet Service',
          'Counter Service',
          'Bar Service',
          'Afternoon Tea Service'
        ],
        certifications: [
          'Food Hygiene Rating (FHRS)',
          'Food Safety Level 2 Certificate',
          'Alcohol License',
          'VAT Registration',
          'Public Liability Insurance',
          'Employers Liability Insurance',
          'Food Business Registration',
          'Environmental Health Certificate',
          'Allergen Training Certificate'
        ],
        deliverables: [
          'Food and beverage service',
          'Menu items preparation',
          'Table service and hospitality',
          'Allergen information',
          'Itemized billing',
          'Payment processing',
          'Takeaway packaging',
          'Customer service',
          'Food safety compliance',
          'Dietary accommodation'
        ]
      },
      businessBenefits: [
        'Restaurant POS Integration: Professional invoicing for table service, fine dining, casual dining, and quick-service restaurants with itemized billing',
        'Menu Item Breakdown: Clear line items for starters, mains, desserts, sides, drinks, and daily specials with portion sizes and prices',
        'UK VAT Compliance: Automatic 20% VAT on restaurant meals and 0% VAT on takeaway cold food per HMRC Catering Guidelines',
        'Service Charge Transparency: Optional 10-12.5% discretionary service charge field meets UK tipping regulations and customer expectations',
        'Table Service Tracking: Table number and server name documentation improves tip distribution and service quality monitoring',
        'Multi-Course Support: Flexible billing for tasting menus, prix fixe, à la carte, set lunch menus, and Sunday roast offerings',
        'Premium Dining Brand: Professional invoice format reflects restaurant quality standards and enhances customer dining experience',
        'Cuisine Adaptability: Easy customization for Italian, Indian, Chinese, British pub food, steakhouse, and vegetarian restaurant menus',
        'Allergen Law Compliance: Notes section for Natasha\'s Law allergen information and dietary requirement documentation (vegan, gluten-free, halal)',
        'Front-of-House Efficiency: Pre-formatted template speeds up bill preparation during peak service times and table turnaround',
        'Guest Payment Experience: Clear itemized format reduces bill queries and improves customer satisfaction and online review ratings',
        'Dual Service Model: Supports eat-in table service, takeaway orders, delivery billing, and click-and-collect payment processing',
        'Split Bill Capability: Easy customization for group dining, separate checks, and business meal expense documentation'
      ],
      useCases: [
        'Fine dining restaurant billing guests for multi-course meals',
        'Casual dining restaurant invoicing table service customers',
        'Bistro or cafe billing for lunch and dinner service',
        'Hotel restaurant invoicing room service charges',
        'Gastropub billing customers for food and drinks',
        'Steakhouse invoicing premium cuts and wine pairings',
        'Italian restaurant billing for pasta, pizza, and Italian cuisine',
        'Asian restaurant invoicing for dim sum or multi-dish orders',
        'Seafood restaurant billing for fresh fish and shellfish meals',
        'Vegetarian/vegan restaurant invoicing plant-based menu items',
        'Brunch restaurant billing for breakfast and brunch service',
        'Wine bar billing for small plates and wine selections',
        'Restaurant invoicing private dining or group bookings',
        'Takeaway restaurant billing for collection orders',
        'Pop-up restaurant invoicing for temporary dining events'
      ]
    },
    {
      id: 'catering-event-invoice',
      categoryId: 'restaurants-food-services',
      categoryName: 'Restaurants & Food Services',
      name: 'Catering Event Invoice Template',
      description: 'Comprehensive invoice template for catering services at events and functions with per-guest pricing, equipment rentals, and deposit tracking',
      tier: 'free',
      searchVolume: 90,
      cpc: 3.93,
      difficulty: 21,
      keywords: [
        'catering invoice',
        'event catering',
        'function invoice',
        'wedding catering invoice',
        'corporate catering invoice'
      ],
      sourceFile: 'invoiceTemplateLibrary.ts',
      sourceTemplateId: 'restaurant-catering-001',
      requiredFields: [
        commonFields.invoiceNumber,
        commonFields.invoiceDate,
        commonFields.dueDate,
        commonFields.businessName,
        commonFields.businessAddress,
        commonFields.businessEmail,
        commonFields.clientName,
        commonFields.clientAddress,
        commonFields.lineItems,
        commonFields.subtotal,
        commonFields.totalAmount
      ],
      optionalFields: [
        commonFields.businessPhone,
        commonFields.vatNumber,
        commonFields.vatAmount,
        commonFields.clientEmail,
        hospitalityFields.eventDate,
        hospitalityFields.eventLocation,
        hospitalityFields.guestCount,
        hospitalityFields.menuType,
        hospitalityFields.depositPaid,
        hospitalityFields.balanceDue,
        commonFields.paymentTerms,
        commonFields.notes
      ],
      industryStandards: [
        {
          standard: 'Food Safety Certificate',
          description: 'Display Food Hygiene Rating (FHRS) and maintain proper food safety procedures for off-site catering.',
          complianceLevel: 'required'
        },
        {
          standard: 'Deposit Terms',
          description: 'Clearly state deposit amount (typically 25-50%) and payment schedule to protect business cash flow.',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Event Liability Insurance',
          description: 'Maintain public and product liability insurance for catering events at external venues.',
          complianceLevel: 'required'
        },
        {
          standard: 'Final Guest Count Deadline',
          description: 'Specify deadline for final guest count confirmation (typically 7-14 days before event).',
          complianceLevel: 'recommended'
        }
      ],
      sampleData: {
        invoiceNumber: 'CAT-2024-0089',
        invoiceDate: '2024-10-20',
        dueDate: '2024-11-03',
        businessName: 'Gourmet Catering Services',
        businessAddress: '12 Catering Court, Birmingham, B1 1AA',
        businessEmail: 'bookings@gourmetcatering.co.uk',
        businessPhone: '+44 121 555 0123',
        vatNumber: 'GB 987 6543 21',
        clientName: 'Sarah & James Wedding',
        clientAddress: '89 Bride Lane, Birmingham, B15 2TT',
        clientEmail: 'sarah.james@email.co.uk',
        eventDate: '2024-10-15',
        eventLocation: 'The Grand Ballroom, Royal Hotel, Birmingham',
        guestCount: 120,
        menuType: 'Wedding Breakfast - Premium 3 Course',
        lineItems: [
          { description: 'Canapés on Arrival (120 guests)', quantity: 1, rate: 480.00, amount: 480.00 },
          { description: 'Starter - Smoked Salmon Terrine', quantity: 120, rate: 8.50, amount: 1020.00 },
          { description: 'Main - Slow Roast Beef Fillet', quantity: 120, rate: 24.00, amount: 2880.00 },
          { description: 'Dessert - Lemon Posset', quantity: 120, rate: 6.50, amount: 780.00 },
          { description: 'Service Staff (4 servers x 6 hours)', quantity: 24, rate: 15.00, amount: 360.00 },
          { description: 'Equipment Hire (Tables, Chairs, Linen)', quantity: 1, rate: 450.00, amount: 450.00 }
        ],
        subtotal: 5970.00,
        vatAmount: 1194.00,
        totalAmount: 7164.00,
        depositPaid: 2000.00,
        balanceDue: 5164.00,
        paymentTerms: 'Deposit of £2,000 received. Balance due 14 days before event date.',
        notes: 'Final guest count confirmed at 120. Menu adjustments accommodated vegetarian guests. All dietary requirements noted.'
      },
      industrySpecific: {
        serviceTypes: [
          'Wedding Catering',
          'Corporate Event Catering',
          'Private Party Catering',
          'Birthday Party Catering',
          'Conference Catering',
          'Gala Dinner Catering',
          'Cocktail Reception Catering',
          'Funeral Wake Catering',
          'Holiday Party Catering',
          'Festival Catering',
          'Outdoor Event Catering',
          'Buffet Catering'
        ],
        certifications: [
          'Food Hygiene Rating (FHRS)',
          'Food Safety Level 3 Certificate',
          'Catering Business Insurance',
          'Public Liability Insurance (£5-10M)',
          'Product Liability Insurance',
          'Food Business Registration',
          'Allergen Awareness Training',
          'Health & Safety Certification',
          'First Aid Training',
          'Alcohol Licensing (if applicable)'
        ],
        deliverables: [
          'Food preparation and cooking',
          'Event menu planning',
          'Ingredient sourcing',
          'Food delivery and setup',
          'Service staff provision',
          'Equipment rental and setup',
          'Table service or buffet service',
          'Allergen management',
          'Cleanup and waste disposal',
          'Dietary accommodation',
          'Event coordination',
          'Final guest count management'
        ]
      },
      businessBenefits: [
        'Event Catering Specialization: Professional invoicing for wedding catering, corporate events, gala dinners, and private function catering services',
        'Per-Head Pricing Clarity: Transparent cost-per-guest breakdown for 3-course meals, buffets, and canape receptions simplifies event budgeting',
        'Deposit Protection: 25-50% deposit tracking with balance due calculation secures bookings and manages catering business cash flow',
        'Comprehensive Service Billing: Separate line items for food packages, waiting staff, bartenders, equipment hire, and event coordination fees',
        'Venue Documentation: Event date, time, venue location, and setup requirements for clear delivery logistics and timeline planning',
        'Final Guest Count: PAX (person) tracking with guaranteed minimum numbers supports accurate food prep and last-minute menu adjustments',
        'Menu Package Reference: Detailed menu type (Silver, Gold, Platinum packages) specification for client records and repeat booking quotes',
        'Payment Milestone Management: Multi-stage payment schedule (deposit, interim payment, final balance) improves working capital for caterers',
        'High-Value Contract Format: Premium invoice appearance suitable for £5,000-£50,000+ wedding and corporate hospitality contracts',
        'Multi-Event Support: Flexible billing for wedding breakfasts, evening receptions, business conferences, product launches, and Christmas parties',
        'Final Numbers Protection: Built-in 7-14 day final guest count deadline references protect against last-minute cancellations and food waste',
        'Complex Order Efficiency: Pre-formatted template handles multi-course menus, dietary requirements, drinks packages, and rental equipment billing',
        'Client Trust Building: Transparent itemized pricing with no hidden fees increases booking conversion and reduces contract disputes'
      ],
      useCases: [
        'Wedding caterer invoicing bride and groom for reception catering',
        'Corporate caterer billing company for conference lunch and breaks',
        'Private party caterer invoicing birthday or anniversary celebration',
        'Funeral caterer billing for wake reception catering',
        'Holiday party caterer invoicing office Christmas party',
        'Gala dinner caterer billing charity or awards event',
        'Festival caterer invoicing for outdoor food service',
        'Cocktail reception caterer billing for networking event',
        'Buffet caterer invoicing for large-scale self-service event',
        'Mobile caterer billing for outdoor wedding or garden party',
        'Hotel caterer invoicing banquet service for corporate event',
        'Restaurant caterer billing off-site catering service',
        'BBQ caterer invoicing summer party or company picnic',
        'Kosher/Halal caterer billing for religious event catering',
        'Vegan caterer invoicing for plant-based event service'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY 2: Accommodation Services
// ============================================================================

const accommodationServicesCategory: HospitalityCategory = {
  id: 'accommodation-services',
  name: 'Accommodation Services',
  description: 'Invoice templates for hotels, vacation rentals, and lodging services',
  icon: '🏨',
  templates: [
    {
      id: 'hotel-room-invoice',
      categoryId: 'accommodation-services',
      categoryName: 'Accommodation Services',
      name: 'Hotel Room Invoice Template',
      description: 'Standard invoice template for hotel accommodation with room charges, amenities, and incidental expenses',
      tier: 'free',
      searchVolume: 90,
      cpc: 9.67,
      difficulty: 27,
      keywords: [
        'hotel invoice',
        'hotel room invoice',
        'accommodation invoice',
        'hotel bill template',
        'lodging invoice'
      ],
      sourceFile: 'invoiceTemplateLibrary.ts',
      sourceTemplateId: 'hotel-room-001',
      requiredFields: [
        commonFields.invoiceNumber,
        commonFields.invoiceDate,
        commonFields.businessName,
        commonFields.businessAddress,
        commonFields.businessEmail,
        commonFields.clientName,
        commonFields.lineItems,
        commonFields.subtotal,
        commonFields.totalAmount
      ],
      optionalFields: [
        commonFields.businessPhone,
        commonFields.vatNumber,
        commonFields.vatAmount,
        hospitalityFields.bookingReference,
        hospitalityFields.checkInDate,
        hospitalityFields.checkOutDate,
        hospitalityFields.roomNumber,
        hospitalityFields.roomType,
        hospitalityFields.numberOfNights,
        commonFields.paymentTerms,
        commonFields.notes
      ],
      industryStandards: [
        {
          standard: 'Tourism VAT',
          description: 'Hotel accommodation is standard rated at 20% VAT in the UK. Clearly show VAT breakdown on invoices.',
          complianceLevel: 'required'
        },
        {
          standard: 'Itemized Billing',
          description: 'Separate room charges from extras (meals, parking, mini bar, etc.) for transparency and guest clarity.',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Payment Card Industry (PCI) Compliance',
          description: 'Ensure secure handling of payment card data and compliance with PCI DSS standards.',
          complianceLevel: 'required'
        },
        {
          standard: 'Data Protection',
          description: 'Comply with GDPR for storing and processing guest personal information and booking details.',
          complianceLevel: 'required'
        }
      ],
      sampleData: {
        invoiceNumber: 'HTL-2024-3421',
        invoiceDate: '2024-10-18',
        businessName: 'The Grand Hotel London',
        businessAddress: '123 Park Lane, London, W1K 1AA',
        businessEmail: 'reservations@grandhotel.co.uk',
        businessPhone: '+44 20 7123 4567',
        vatNumber: 'GB 555 4444 33',
        clientName: 'Mr. John Smith',
        bookingReference: 'BK-24-10847',
        checkInDate: '2024-10-15',
        checkOutDate: '2024-10-18',
        roomNumber: '305',
        roomType: 'Deluxe Double Room',
        numberOfNights: 3,
        lineItems: [
          { description: 'Deluxe Double Room - Night 1 (15 Oct)', quantity: 1, rate: 180.00, amount: 180.00 },
          { description: 'Deluxe Double Room - Night 2 (16 Oct)', quantity: 1, rate: 180.00, amount: 180.00 },
          { description: 'Deluxe Double Room - Night 3 (17 Oct)', quantity: 1, rate: 180.00, amount: 180.00 },
          { description: 'Breakfast (2 guests x 3 days)', quantity: 6, rate: 15.00, amount: 90.00 },
          { description: 'Parking (3 days)', quantity: 3, rate: 20.00, amount: 60.00 },
          { description: 'Mini Bar Charges', quantity: 1, rate: 35.00, amount: 35.00 }
        ],
        subtotal: 725.00,
        vatAmount: 145.00,
        totalAmount: 870.00,
        paymentTerms: 'Payment made via credit card on check-out.',
        notes: 'Thank you for staying with us! We hope to welcome you back soon. Please rate your stay on TripAdvisor.'
      },
      industrySpecific: {
        serviceTypes: [
          'Hotel Room Accommodation',
          'Suite Accommodation',
          'Bed & Breakfast Service',
          'Resort Accommodation',
          'Extended Stay Hotels',
          'Business Hotel Service',
          'Boutique Hotel Service',
          'Serviced Apartments',
          'Room Service',
          'Concierge Services',
          'Spa and Wellness Services',
          'Conference Facilities'
        ],
        certifications: [
          'Hotel Star Rating',
          'Tourism Business License',
          'Fire Safety Certificate',
          'Food Hygiene Rating (if serving food)',
          'Public Liability Insurance',
          'PCI DSS Compliance',
          'Accessibility Standards Compliance',
          'Environmental Certification (Green Key, etc.)',
          'Health & Safety Certification',
          'Data Protection (GDPR) Compliance'
        ],
        deliverables: [
          'Clean and prepared guest rooms',
          'Daily housekeeping service',
          'Linen and towel service',
          'Room amenities (toiletries, etc.)',
          'Check-in and check-out service',
          'Concierge assistance',
          'Breakfast service (if included)',
          'Wi-Fi access',
          'Parking facilities',
          'Security services',
          'Luggage storage',
          'Guest services and information'
        ]
      },
      businessBenefits: [
        'Hotel Revenue Management: Professional invoicing for room bookings, suite upgrades, and extended guest stays with dynamic pricing support',
        'Itemized Guest Folio: Clear breakdown of room charges, breakfast, room service, mini bar, and ancillary services for transparency',
        'Booking Reference Integration: PMS booking number tracking connects reservations to billing, reducing front desk reconciliation errors',
        'Stay Period Documentation: Check-in and check-out dates with number of nights calculation ensures accurate room rate billing',
        'Room Inventory Tracking: Room number and type (Standard, Deluxe, Executive, Suite) specification for housekeeping and revenue reporting',
        'Dynamic Nightly Rate Billing: Automatic calculation of total room charges based on nights stayed and seasonal rack rates',
        'UK VAT Compliance: Proper 20% VAT on accommodation services and 0% VAT on certain long-stay arrangements per HMRC hospitality rules',
        'Ancillary Revenue Capture: Separate billing for parking, spa treatments, conference rooms, laundry, and in-room dining maximizes RevPAR',
        'Luxury Brand Standards: Premium invoice format reflects 4-star and 5-star hospitality excellence, enhancing guest experience',
        'Guest Retention Messaging: Built-in thank you notes and loyalty program references encourage repeat bookings and positive reviews',
        'Payment Method Flexibility: Supports credit card pre-authorization, direct billing, corporate accounts, and OTA commission tracking',
        'Front Desk Efficiency: Pre-formatted template speeds up check-out process during peak morning departure times',
        'PMS Integration Ready: Compatible format with Opera, Mews, Cloudbeds, and other property management systems for seamless data export'
      ],
      useCases: [
        'Luxury hotel invoicing business traveler for multi-night stay',
        'Boutique hotel billing weekend leisure guest',
        'Resort hotel invoicing vacation package with meals and amenities',
        'Business hotel billing corporate client for conference accommodation',
        'Bed & Breakfast invoicing couple for romantic getaway',
        'Airport hotel billing overnight traveler for stopover',
        'Extended stay hotel invoicing long-term business guest',
        'Hotel invoicing wedding party for room block booking',
        'Serviced apartment billing monthly corporate rental',
        'Hotel billing guest for room service and mini bar charges',
        'Spa hotel invoicing wellness retreat package',
        'Conference hotel billing event attendee for accommodation',
        'Hotel invoicing travel agency for group booking',
        'Hostel invoicing budget traveler for dormitory or private room',
        'Inn or guesthouse billing tourist for countryside stay'
      ]
    },
    {
      id: 'airbnb-holiday-let-invoice',
      categoryId: 'accommodation-services',
      categoryName: 'Accommodation Services',
      name: 'Airbnb/Holiday Let Invoice Template',
      description: 'Professional invoice template for Airbnb hosts and holiday let providers with nightly rates, cleaning fees, and deposit tracking',
      tier: 'premium',
      searchVolume: 70,
      cpc: 1.57,
      difficulty: 45,
      keywords: [
        'airbnb invoice template',
        'holiday let invoice',
        'short-term rental invoice',
        'vacation rental invoice',
        'airbnb host invoice'
      ],
      sourceFile: 'premiumTemplateLibrary.ts',
      sourceTemplateId: 'accommodation-airbnb-001',
      requiredFields: [
        commonFields.invoiceNumber,
        commonFields.invoiceDate,
        {
          fieldName: 'propertyName',
          label: 'Property Name',
          type: 'text' as const,
          required: true,
          placeholder: 'Seaside Cottage',
          helpText: 'Your property name or listing title'
        },
        {
          fieldName: 'propertyAddress',
          label: 'Property Address',
          type: 'textarea' as const,
          required: true,
          placeholder: '12 Beach Road, Cornwall, TR1 2AB',
          helpText: 'Property location'
        },
        {
          fieldName: 'hostName',
          label: 'Your Name (Host)',
          type: 'text' as const,
          required: true,
          placeholder: 'Jane Smith',
          helpText: 'Property owner/host name'
        },
        {
          fieldName: 'hostAddress',
          label: 'Your Address',
          type: 'textarea' as const,
          required: true,
          helpText: 'Your billing address'
        },
        {
          fieldName: 'hostEmail',
          label: 'Your Email',
          type: 'email' as const,
          required: true,
          helpText: 'Contact email'
        },
        {
          fieldName: 'guestName',
          label: 'Guest Name',
          type: 'text' as const,
          required: true,
          placeholder: 'Mr John Doe',
          helpText: 'Guest name'
        },
        hospitalityFields.checkInDate,
        hospitalityFields.checkOutDate,
        hospitalityFields.numberOfNights,
        commonFields.lineItems,
        commonFields.totalAmount
      ],
      optionalFields: [
        commonFields.vatNumber,
        hospitalityFields.numberOfGuests,
        hospitalityFields.bookingReference,
        {
          fieldName: 'platformBookingId',
          label: 'Airbnb/Platform Booking ID',
          type: 'text' as const,
          required: false,
          placeholder: 'AB-12345678',
          helpText: 'Booking platform reference'
        },
        {
          fieldName: 'nightlyRate',
          label: 'Nightly Rate',
          type: 'number' as const,
          required: false,
          placeholder: '120',
          helpText: 'Rate per night'
        },
        hospitalityFields.cleaningFee,
        {
          fieldName: 'serviceFee',
          label: 'Platform Service Fee',
          type: 'number' as const,
          required: false,
          helpText: 'Airbnb or platform fee'
        },
        {
          fieldName: 'touristTax',
          label: 'Tourist Tax',
          type: 'number' as const,
          required: false,
          helpText: 'Local tourism tax (if applicable)'
        },
        hospitalityFields.securityDeposit,
        {
          fieldName: 'depositRefunded',
          label: 'Deposit Refunded',
          type: 'number' as const,
          required: false,
          helpText: 'Security deposit returned'
        },
        {
          fieldName: 'checkInTime',
          label: 'Check-in Time',
          type: 'text' as const,
          required: false,
          placeholder: '15:00',
          helpText: 'Check-in time'
        },
        {
          fieldName: 'checkOutTime',
          label: 'Check-out Time',
          type: 'text' as const,
          required: false,
          placeholder: '11:00',
          helpText: 'Check-out time'
        },
        {
          fieldName: 'paymentMethod',
          label: 'Payment Method',
          type: 'text' as const,
          required: false,
          placeholder: 'Airbnb / Direct Bank Transfer',
          helpText: 'How guest paid'
        },
        {
          fieldName: 'cancellationPolicy',
          label: 'Cancellation Policy',
          type: 'textarea' as const,
          required: false,
          placeholder: 'Flexible - Free cancellation up to 24 hours before check-in',
          helpText: 'Cancellation terms'
        },
        commonFields.notes
      ],
      industryStandards: [
        {
          standard: 'VAT on Holiday Accommodation',
          description: 'Holiday lets in UK are usually VAT exempt unless providing additional services (meals, entertainment, etc.).',
          complianceLevel: 'required'
        },
        {
          standard: 'Tourist Tax',
          description: 'Some UK local authorities charge tourism tax. Check local regulations and collect where required.',
          complianceLevel: 'optional'
        },
        {
          standard: 'Safety Compliance',
          description: 'Ensure gas/electrical safety certificates, smoke alarms, carbon monoxide detectors, and fire safety equipment comply with UK law.',
          complianceLevel: 'required'
        },
        {
          standard: 'Licensing',
          description: 'Check if your local authority requires a holiday let license or planning permission for short-term rentals.',
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
      },
      industrySpecific: {
        serviceTypes: [
          'Airbnb Short-Term Rentals',
          'Vacation Rental Properties',
          'Holiday Cottages',
          'Seaside Holiday Lets',
          'City Center Apartments',
          'Countryside Retreats',
          'Mountain Chalets',
          'Beach Houses',
          'Farmhouse Stays',
          'Glamping Accommodations',
          'Self-Catering Apartments',
          'Boutique Holiday Homes'
        ],
        certifications: [
          'Gas Safety Certificate (annual)',
          'Electrical Installation Condition Report (EICR)',
          'Energy Performance Certificate (EPC)',
          'Smoke Alarm Compliance',
          'Carbon Monoxide Detector Compliance',
          'Fire Safety Equipment',
          'Public Liability Insurance',
          'Holiday Let License (where required)',
          'Planning Permission (if needed)',
          'PAT Testing for Electrical Appliances'
        ],
        deliverables: [
          'Clean and prepared property',
          'Linen and towel service',
          'Welcome pack or information',
          'Property access (keys/codes)',
          'Wi-Fi access',
          'Parking facilities',
          'Kitchen equipment and utensils',
          'Bathroom toiletries',
          'Check-in and check-out coordination',
          'Property maintenance during stay',
          'Local area information',
          'Emergency contact details'
        ]
      },
      businessBenefits: [
        'Airbnb Host Optimization: Professional invoicing for short-term rentals, holiday lets, and vacation rental property owners on multiple platforms',
        'Transparent Pricing Breakdown: Clear itemization of nightly rates, cleaning fees, service charges, linen costs, and damage waiver fees',
        'Multi-Platform Integration: Airbnb booking code, Vrbo confirmation, Booking.com reference tracking for seamless reservation management',
        'Security Deposit Management: Automated deposit tracking with refund documentation protects hosts and provides guest transparency',
        'Guest Records Compliance: Property address, guest details, and occupancy tracking meets UK Tourism Alliance and local authority requirements',
        'House Rules Clarity: Check-in time (3pm), check-out time (11am) specification reduces guest confusion and property turnaround delays',
        'Cancellation Policy Protection: Built-in flexible, moderate, or strict cancellation terms safeguard host revenue during booking changes',
        'Payment Reconciliation: Separate tracking for Airbnb payout, direct booking bank transfer, and instant book payments simplifies accounting',
        'VAT-Exempt Holiday Lets: Proper zero-rated VAT handling for UK holiday accommodation under HMRC Short-Term Letting rules',
        'Occupancy Documentation: Number of guests tracking for insurance compliance, local council licensing, and dynamic pricing strategies',
        'Tourist Tax Collection: Automated visitor levy, tourism tax, and bed tax calculation for Edinburgh, Manchester, and Wales compliance',
        'Super Host Credibility: Premium invoice format enhances professional image, supporting 5-star reviews and Airbnb Plus applications',
        'Multi-Property Scalability: Easy customization for cottages, apartments, glamping pods, and entire home rentals with variable pricing models'
      ],
      useCases: [
        'Airbnb host invoicing guest for coastal cottage rental',
        'Holiday let owner billing vacation rental for seaside property',
        'Short-term rental host invoicing city center apartment stay',
        'Vacation rental owner billing family for countryside retreat',
        'Holiday cottage owner invoicing couple for romantic getaway',
        'Beachfront property host billing summer holiday rental',
        'Mountain chalet owner invoicing ski vacation rental',
        'Glamping site owner billing unique accommodation stay',
        'Farmhouse host invoicing rural holiday experience',
        'Historic property owner billing heritage accommodation',
        'Luxury villa owner invoicing premium vacation rental',
        'Serviced apartment host billing extended business stay',
        'Pet-friendly property owner invoicing dog-friendly holiday',
        'Group accommodation host billing large family gathering',
        'Festival accommodation host invoicing event weekend rental'
      ]
    }
  ]
};

// ============================================================================
// EXPORTS
// ============================================================================

export const hospitalityCategories: HospitalityCategory[] = [
  restaurantsFoodServicesCategory,
  accommodationServicesCategory
];

// Helper function to get all templates across categories
export function getAllHospitalityTemplates(): HospitalityTemplate[] {
  return hospitalityCategories.flatMap(category => category.templates);
}

// Helper function to get template by ID
export function getHospitalityTemplateById(id: string): HospitalityTemplate | undefined {
  return getAllHospitalityTemplates().find(template => template.id === id);
}

// Helper function to get templates by category
export function getHospitalityTemplatesByCategory(categoryId: string): HospitalityTemplate[] {
  const category = hospitalityCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

// Helper function to get category by ID
export function getHospitalityCategoryById(id: string): HospitalityCategory | undefined {
  return hospitalityCategories.find(category => category.id === id);
}

// Helper function to search templates by keyword
export function searchHospitalityTemplates(keyword: string): HospitalityTemplate[] {
  const lowerKeyword = keyword.toLowerCase();
  return getAllHospitalityTemplates().filter(template =>
    template.name.toLowerCase().includes(lowerKeyword) ||
    template.description.toLowerCase().includes(lowerKeyword) ||
    template.keywords.some(k => k.toLowerCase().includes(lowerKeyword))
  );
}
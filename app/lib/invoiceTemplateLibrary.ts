/**
 * Invoice Template Knowledge Base Library
 * 
 * Industry-specific invoice template database organized by:
 * Industry → Category → Sub-category → Template
 * 
 * Based on Ubersuggest keyword research (497 keywords analyzed)
 * Total combined search volume: 150,000+ monthly searches
 * 
 * Usage:
 * - Generate templates dynamically based on user industry
 * - SEO content for template landing pages
 * - Auto-populate invoice fields based on industry standards
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface InvoiceTemplate {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  searchVolume: number;
  cpc: number;
  searchDifficulty: number;
  tier: 'free' | 'premium'; // All templates available on free tier (with watermark)
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
  }
};

// ============================================================================
// INDUSTRY: HOSPITALITY & FOOD SERVICE
// ============================================================================

export const hospitalityIndustry: Industry = {
  id: 'hospitality',
  name: 'Hospitality & Food Service',
  description: 'Invoice templates for restaurants, catering, hotels, and food service businesses',
  icon: '🍽️',
  totalSearchVolume: 2100, // hotel (90) + catering (90) + rent (320) + related
  categories: {
    restaurants: {
      id: 'restaurants',
      name: 'Restaurants',
      description: 'Invoice templates for restaurants and food establishments',
      icon: '🍕',
      subCategories: {
        foh: {
          id: 'foh',
          name: 'Front of House',
          description: 'Customer-facing invoices for dine-in and takeaway',
          templates: [
            {
              id: 'restaurant-foh-001',
              name: 'Restaurant Dine-In Invoice',
              description: 'Standard invoice for restaurant table service',
              keywords: ['restaurant invoice', 'food invoice', 'dining invoice'],
              searchVolume: 480,
              cpc: 4.20,
              searchDifficulty: 35,
              tier: 'free',
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
                commonFields.vatNumber,
                commonFields.vatAmount,
                {
                  ...commonFields.notes,
                  placeholder: 'Thank you for dining with us! We hope to see you again soon.'
                },
                {
                  fieldName: 'tableNumber',
                  label: 'Table Number',
                  type: 'text' as const,
                  required: false,
                  placeholder: 'Table 12',
                  helpText: 'Table number for this order'
                },
                {
                  fieldName: 'serverName',
                  label: 'Server Name',
                  type: 'text' as const,
                  required: false,
                  placeholder: 'Sarah',
                  helpText: 'Name of server who took the order'
                },
                {
                  fieldName: 'serviceCharge',
                  label: 'Service Charge',
                  type: 'currency' as const,
                  required: false,
                  helpText: 'Optional service charge (10-12.5%)'
                }
              ],
              industryStandards: [
                {
                  standard: 'VAT Registration',
                  description: 'VAT applies to restaurant food (standard rate 20%, some exceptions)',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Food Allergen Info',
                  description: 'Include allergen information for menu items',
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
                serviceCharge: 9.48, // 10%
                vatAmount: 20.86, // 20% on £104.28
                totalAmount: 125.14,
                notes: 'Thank you for dining with us! 10% service charge is optional.'
              }
            }
          ]
        },
        catering: {
          id: 'catering',
          name: 'Catering Services',
          description: 'Invoices for event catering and external food service',
          templates: [
            {
              id: 'restaurant-catering-001',
              name: 'Catering Event Invoice',
              description: 'Invoice for catering services at events and functions',
              keywords: ['catering invoice', 'event catering', 'function invoice'],
              searchVolume: 90,
              cpc: 3.93,
              searchDifficulty: 21,
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
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.vatNumber,
                commonFields.vatAmount,
                commonFields.paymentTerms,
                {
                  fieldName: 'eventDate',
                  label: 'Event Date',
                  type: 'date' as const,
                  required: true,
                  helpText: 'Date of catered event'
                },
                {
                  fieldName: 'eventLocation',
                  label: 'Event Location',
                  type: 'text' as const,
                  required: true,
                  placeholder: 'The Grand Ballroom, Royal Hotel',
                  helpText: 'Venue where catering service was provided'
                },
                {
                  fieldName: 'guestCount',
                  label: 'Number of Guests',
                  type: 'number' as const,
                  required: true,
                  placeholder: '120',
                  helpText: 'Total number of guests served'
                },
                {
                  fieldName: 'menuType',
                  label: 'Menu Type',
                  type: 'text' as const,
                  required: false,
                  placeholder: 'Wedding Breakfast - 3 Course',
                  helpText: 'Type of menu served'
                },
                {
                  fieldName: 'depositPaid',
                  label: 'Deposit Paid',
                  type: 'currency' as const,
                  required: false,
                  helpText: 'Deposit amount already paid'
                },
                {
                  fieldName: 'balanceDue',
                  label: 'Balance Due',
                  type: 'currency' as const,
                  required: false,
                  helpText: 'Remaining balance after deposit'
                }
              ],
              industryStandards: [
                {
                  standard: 'Food Safety Certificate',
                  description: 'Display Food Hygiene Rating (FHRS)',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Deposit Terms',
                  description: 'Clearly state deposit amount and payment schedule',
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
                notes: 'Final guest count confirmed at 120. Menu adjustments accommodated vegetarian guests.'
              }
            }
          ]
        }
      }
    },
    hotels: {
      id: 'hotels',
      name: 'Hotels & Accommodation',
      description: 'Invoice templates for hotels, B&Bs, and accommodation providers',
      icon: '🏨',
      subCategories: {
        rooms: {
          id: 'rooms',
          name: 'Room Bookings',
          description: 'Invoices for hotel room stays and accommodation',
          templates: [
            {
              id: 'hotel-room-001',
              name: 'Hotel Room Invoice',
              description: 'Standard invoice for hotel accommodation',
              keywords: ['hotel invoice', 'hotel room invoice', 'accommodation invoice'],
              searchVolume: 90,
              cpc: 9.67,
              searchDifficulty: 27,
              tier: 'free',
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
                commonFields.vatNumber,
                commonFields.vatAmount,
                commonFields.paymentTerms,
                {
                  fieldName: 'bookingReference',
                  label: 'Booking Reference',
                  type: 'text' as const,
                  required: true,
                  placeholder: 'BK-24-10847',
                  helpText: 'Unique booking reference number'
                },
                {
                  fieldName: 'checkInDate',
                  label: 'Check-In Date',
                  type: 'date' as const,
                  required: true,
                  helpText: 'Guest check-in date'
                },
                {
                  fieldName: 'checkOutDate',
                  label: 'Check-Out Date',
                  type: 'date' as const,
                  required: true,
                  helpText: 'Guest check-out date'
                },
                {
                  fieldName: 'roomNumber',
                  label: 'Room Number',
                  type: 'text' as const,
                  required: false,
                  placeholder: '305',
                  helpText: 'Room number occupied'
                },
                {
                  fieldName: 'roomType',
                  label: 'Room Type',
                  type: 'text' as const,
                  required: false,
                  placeholder: 'Deluxe Double',
                  helpText: 'Type of room booked'
                },
                {
                  fieldName: 'numberOfNights',
                  label: 'Number of Nights',
                  type: 'number' as const,
                  required: true,
                  placeholder: '3',
                  helpText: 'Total nights stayed'
                }
              ],
              industryStandards: [
                {
                  standard: 'Tourism VAT',
                  description: 'Hotel accommodation is standard rated (20% VAT)',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Itemized Billing',
                  description: 'Separate room charges from extras (meals, parking, etc.)',
                  complianceLevel: 'recommended'
                }
              ],
              sampleData: {
                invoiceNumber: 'HTL-2024-3421',
                invoiceDate: '2024-10-18',
                businessName: 'The Grand Hotel London',
                businessAddress: '123 Park Lane, London, W1K 1AA',
                businessEmail: 'reservations@grandhotel.co.uk',
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
                notes: 'Thank you for staying with us! We hope to welcome you back soon.'
              }
            }
          ]
        }
      }
    }
  }
};

// ============================================================================
// INDUSTRY: CREATIVE SERVICES
// ============================================================================

export const creativeIndustry: Industry = {
  id: 'creative',
  name: 'Creative Services',
  description: 'Invoice templates for photographers, designers, artists, and creative professionals',
  icon: '🎨',
  totalSearchVolume: 1920, // photography (390+320+260) + graphic design (140) + music (110) + dj (110) + artist (90+90) + illustration (50)
  categories: {
    photography: {
      id: 'photography',
      name: 'Photography',
      description: 'Invoice templates for photographers and photography services',
      icon: '📸',
      subCategories: {
        events: {
          id: 'events',
          name: 'Event Photography',
          description: 'Invoices for wedding, corporate, and event photography',
          templates: [
            {
              id: 'photo-event-001',
              name: 'Wedding Photography Invoice',
              description: 'Invoice for wedding photography services and packages',
              keywords: ['photography invoice', 'wedding photography invoice', 'photographer invoice'],
              searchVolume: 390,
              cpc: 4.21,
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
                commonFields.clientEmail,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount,
                commonFields.paymentTerms
              ],
              optionalFields: [
                commonFields.vatNumber,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                {
                  fieldName: 'eventDate',
                  label: 'Event Date',
                  type: 'date' as const,
                  required: true,
                  helpText: 'Wedding or event date'
                },
                {
                  fieldName: 'eventLocation',
                  label: 'Event Location',
                  type: 'text' as const,
                  required: true,
                  placeholder: 'St. Mary\'s Church & The Manor House',
                  helpText: 'Venue(s) where photography took place'
                },
                {
                  fieldName: 'packageName',
                  label: 'Photography Package',
                  type: 'text' as const,
                  required: false,
                  placeholder: 'Full Day Wedding Package',
                  helpText: 'Name of photography package booked'
                },
                {
                  fieldName: 'hoursBooked',
                  label: 'Hours Booked',
                  type: 'number' as const,
                  required: false,
                  placeholder: '8',
                  helpText: 'Total hours of photography coverage'
                },
                {
                  fieldName: 'depositPaid',
                  label: 'Deposit Paid',
                  type: 'currency' as const,
                  required: false,
                  helpText: 'Deposit amount already received'
                },
                {
                  fieldName: 'balanceDue',
                  label: 'Balance Due',
                  type: 'currency' as const,
                  required: false,
                  helpText: 'Remaining balance after deposit'
                },
                {
                  fieldName: 'deliverables',
                  label: 'Deliverables',
                  type: 'textarea' as const,
                  required: false,
                  placeholder: '400+ edited photos in high-resolution digital format, online gallery, USB drive',
                  helpText: 'What the client will receive'
                }
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
                vatAmount: 0, // Many sole trader photographers not VAT registered
                totalAmount: 3225.00,
                depositPaid: 1000.00,
                balanceDue: 2225.00,
                deliverables: '500+ edited high-resolution photos, online gallery (12 months access), USB drive with all images, premium photo album (40 pages)',
                paymentTerms: 'Deposit of £1,000 received on booking. Balance due 14 days before wedding date. Final payment received via bank transfer.',
                bankName: 'Lloyds Bank',
                accountNumber: '12345678',
                sortCode: '30-96-07',
                notes: 'Thank you for choosing Emma Rose Photography! Your online gallery will be ready within 6 weeks. All images include personal usage rights.'
              }
            }
          ]
        },
        commercial: {
          id: 'commercial',
          name: 'Commercial Photography',
          description: 'Invoices for product, corporate, and commercial photography',
          templates: [
            {
              id: 'photo-commercial-001',
              name: 'Product Photography Invoice',
              description: 'Invoice for commercial product photography services',
              keywords: ['commercial photography invoice', 'product photography invoice', 'business photography'],
              searchVolume: 260,
              cpc: 3.30,
              searchDifficulty: 10,
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
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.vatNumber,
                commonFields.vatAmount,
                commonFields.paymentTerms,
                {
                  fieldName: 'projectName',
                  label: 'Project Name',
                  type: 'text' as const,
                  required: false,
                  placeholder: 'Autumn Collection 2024',
                  helpText: 'Name or reference for this photography project'
                },
                {
                  fieldName: 'shootDate',
                  label: 'Shoot Date',
                  type: 'date' as const,
                  required: false,
                  helpText: 'Date photography session took place'
                },
                {
                  fieldName: 'numberOfProducts',
                  label: 'Number of Products',
                  type: 'number' as const,
                  required: false,
                  placeholder: '25',
                  helpText: 'Total products photographed'
                },
                {
                  fieldName: 'numberOfImages',
                  label: 'Number of Images',
                  type: 'number' as const,
                  required: false,
                  placeholder: '75',
                  helpText: 'Total edited images delivered'
                },
                {
                  fieldName: 'usageRights',
                  label: 'Image Usage Rights',
                  type: 'textarea' as const,
                  required: false,
                  placeholder: 'Full commercial usage rights for web, print, and social media',
                  helpText: 'Specify how client can use the images'
                }
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
              }
            }
          ]
        }
      }
    },
    graphicDesign: {
      id: 'graphic-design',
      name: 'Graphic Design',
      description: 'Invoice templates for graphic designers and design agencies',
      icon: '🎨',
      subCategories: {
        branding: {
          id: 'branding',
          name: 'Branding & Identity',
          description: 'Invoices for logo design, branding, and identity work',
          templates: [
            {
              id: 'design-branding-001',
              name: 'Logo Design Invoice',
              description: 'Invoice for logo design and brand identity services',
              keywords: ['graphic design invoice', 'logo design invoice', 'design invoice'],
              searchVolume: 140,
              cpc: 1.82,
              searchDifficulty: 49,
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
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.vatNumber,
                commonFields.vatAmount,
                commonFields.paymentTerms,
                {
                  fieldName: 'projectName',
                  label: 'Project Name',
                  type: 'text' as const,
                  required: false,
                  placeholder: 'Brand Identity Refresh',
                  helpText: 'Name or description of design project'
                },
                {
                  fieldName: 'revisions',
                  label: 'Revisions Included',
                  type: 'number' as const,
                  required: false,
                  placeholder: '3',
                  helpText: 'Number of revision rounds included'
                },
                {
                  fieldName: 'deliverables',
                  label: 'Deliverables',
                  type: 'textarea' as const,
                  required: false,
                  placeholder: 'Final logo files (AI, EPS, PNG, SVG), brand guidelines PDF',
                  helpText: 'What files/assets will be delivered'
                }
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
              }
            }
          ]
        }
      }
    }
  }
};

// ============================================================================
// INDUSTRY: CONSTRUCTION & TRADES
// ============================================================================

export const constructionIndustry: Industry = {
  id: 'construction',
  name: 'Construction & Trades',
  description: 'Invoice templates for builders, tradespeople, and construction professionals',
  icon: '🔨',
  totalSearchVolume: 3180, // construction (590+480+210) + builder (210+170) + plumbing (110+70) + electrical (110+110) + garage (210) + mechanic (140+110) + handyman (90) + carpentry (50) + roofing (50+10) + painting (50+40) + plastering (40)
  categories: {
    generalConstruction: {
      id: 'general-construction',
      name: 'General Construction',
      description: 'Invoice templates for general contractors and builders',
      icon: '🏗️',
      subCategories: {
        residential: {
          id: 'residential',
          name: 'Residential Construction',
          description: 'Invoices for home building, renovations, and extensions',
          templates: [
            {
              id: 'construct-res-001',
              name: 'Builder Invoice - Residential',
              description: 'Standard invoice for residential building and construction work',
              keywords: ['construction invoice', 'builder invoice', 'building work invoice'],
              searchVolume: 590,
              cpc: 7.82,
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
                commonFields.clientAddress,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount,
                commonFields.paymentTerms
              ],
              optionalFields: [
                commonFields.vatNumber,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                {
                  fieldName: 'projectAddress',
                  label: 'Project Address',
                  type: 'textarea' as const,
                  required: true,
                  placeholder: '12 Renovation Road, Manchester, M20 1AA',
                  helpText: 'Address where construction work was performed'
                },
                {
                  fieldName: 'projectDescription',
                  label: 'Project Description',
                  type: 'textarea' as const,
                  required: false,
                  placeholder: 'Kitchen Extension & Renovation',
                  helpText: 'Brief description of construction project'
                },
                {
                  fieldName: 'workPeriod',
                  label: 'Work Period',
                  type: 'text' as const,
                  required: false,
                  placeholder: '1 Sep 2024 - 30 Sep 2024',
                  helpText: 'Date range when work was performed'
                },
                {
                  fieldName: 'materialsIncluded',
                  label: 'Materials Included',
                  type: 'select' as const,
                  required: false,
                  helpText: 'Are materials included in the price?'
                },
                {
                  fieldName: 'retentionAmount',
                  label: 'Retention Amount',
                  type: 'currency' as const,
                  required: false,
                  helpText: 'Amount retained until work completion (typically 5-10%)'
                }
              ],
              industryStandards: [
                {
                  standard: 'CIS Compliance',
                  description: 'Construction Industry Scheme (CIS) tax deductions if applicable',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Itemized Materials',
                  description: 'Separate labor and materials costs for transparency',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Insurance Details',
                  description: 'Include public liability insurance information',
                  complianceLevel: 'recommended'
                }
              ],
              sampleData: {
                invoiceNumber: 'BUILD-2024-0892',
                invoiceDate: '2024-10-18',
                dueDate: '2024-11-01',
                businessName: 'Premier Builders Ltd',
                businessAddress: '45 Construction Way, Manchester, M4 2AA',
                businessEmail: 'accounts@premierbuilders.co.uk',
                businessPhone: '+44 161 123 4567',
                vatNumber: 'GB 444 5555 66',
                clientName: 'Mr. David Williams',
                clientAddress: '78 Homeowner Street, Manchester, M20 3BB',
                projectAddress: '78 Homeowner Street, Manchester, M20 3BB',
                projectDescription: 'Single Storey Rear Extension - Kitchen',
                workPeriod: '1 September 2024 - 30 September 2024',
                lineItems: [
                  { description: 'Foundation & Groundwork', quantity: 1, rate: 3500.00, amount: 3500.00 },
                  { description: 'Brickwork & Blockwork', quantity: 1, rate: 4800.00, amount: 4800.00 },
                  { description: 'Roofing (Flat Roof with Lantern)', quantity: 1, rate: 3200.00, amount: 3200.00 },
                  { description: 'Windows & Bi-Fold Doors (Supply & Fit)', quantity: 1, rate: 5400.00, amount: 5400.00 },
                  { description: 'Plastering (Walls & Ceiling)', quantity: 1, rate: 1800.00, amount: 1800.00 },
                  { description: 'Electrical Work (First Fix & Second Fix)', quantity: 1, rate: 2200.00, amount: 2200.00 },
                  { description: 'Plumbing (Heating & Water)', quantity: 1, rate: 1900.00, amount: 1900.00 },
                  { description: 'Flooring (Underfloor Heating & Screed)', quantity: 1, rate: 2400.00, amount: 2400.00 }
                ],
                subtotal: 25200.00,
                vatAmount: 5040.00,
                totalAmount: 30240.00,
                retentionAmount: 1512.00, // 5% retention
                paymentTerms: '30% deposit paid. Progress payments made on completion of key stages. Final payment (including 5% retention) due on project completion and sign-off.',
                bankName: 'NatWest',
                accountNumber: '87654321',
                sortCode: '60-00-01',
                notes: 'Work completed as per quotation. All materials to British Standards. 10-year structural guarantee provided. Building Control certificates to follow.'
              }
            }
          ]
        }
      }
    },
    electricalPlumbing: {
      id: 'electrical-plumbing',
      name: 'Electrical & Plumbing',
      description: 'Invoice templates for electricians and plumbers',
      icon: '⚡',
      subCategories: {
        electrical: {
          id: 'electrical',
          name: 'Electrical Services',
          description: 'Invoices for electrical installation and repair work',
          templates: [
            {
              id: 'electric-001',
              name: 'Electrician Invoice',
              description: 'Invoice for electrical installation, testing, and certification',
              keywords: ['electrical invoice', 'electrician invoice', 'electrical work invoice'],
              searchVolume: 110,
              cpc: 9.94,
              searchDifficulty: 22,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
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
                commonFields.vatNumber,
                commonFields.vatAmount,
                commonFields.dueDate,
                commonFields.paymentTerms,
                {
                  fieldName: 'jobReference',
                  label: 'Job Reference',
                  type: 'text' as const,
                  required: false,
                  placeholder: 'JOB-2024-1234',
                  helpText: 'Job or work order number'
                },
                {
                  fieldName: 'nicEicNumber',
                  label: 'NICEIC Registration',
                  type: 'text' as const,
                  required: false,
                  placeholder: 'NICEIC 123456',
                  helpText: 'Your NICEIC registration number (if applicable)'
                },
                {
                  fieldName: 'certificateIssued',
                  label: 'Certificates Issued',
                  type: 'textarea' as const,
                  required: false,
                  placeholder: 'Electrical Installation Certificate, Minor Works Certificate',
                  helpText: 'List of safety certificates provided'
                }
              ],
              industryStandards: [
                {
                  standard: 'Part P Compliance',
                  description: 'Building Regulations Part P compliance for notifiable work',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Electrical Certificates',
                  description: 'Issue appropriate certificates (EIC, MEIWC, EICR)',
                  complianceLevel: 'required'
                },
                {
                  standard: 'NICEIC/NAPIT',
                  description: 'Display scheme provider registration number',
                  complianceLevel: 'recommended'
                }
              ],
              sampleData: {
                invoiceNumber: 'ELEC-2024-2341',
                invoiceDate: '2024-10-18',
                dueDate: '2024-10-25',
                businessName: 'SparkRight Electrical Services',
                businessAddress: '12 Voltage Avenue, Leeds, LS2 7AA',
                businessEmail: 'bookings@sparkright.co.uk',
                businessPhone: '+44 113 456 7890',
                vatNumber: 'GB 888 7777 66',
                clientName: 'Mrs. Susan Clarke',
                clientAddress: '34 Homeowner Drive, Leeds, LS15 8TT',
                jobReference: 'JOB-2024-1234',
                nicEicNumber: 'NICEIC 123456',
                lineItems: [
                  { description: 'Consumer Unit Replacement (18th Edition)', quantity: 1, rate: 650.00, amount: 650.00 },
                  { description: 'Full Electrical Installation Condition Report (EICR)', quantity: 1, rate: 250.00, amount: 250.00 },
                  { description: 'Install 4x Double Sockets (Kitchen)', quantity: 4, rate: 35.00, amount: 140.00 },
                  { description: 'Install LED Downlights (Living Room)', quantity: 8, rate: 25.00, amount: 200.00 },
                  { description: 'Parts & Materials', quantity: 1, rate: 180.00, amount: 180.00 }
                ],
                subtotal: 1420.00,
                vatAmount: 284.00,
                totalAmount: 1704.00,
                certificateIssued: 'Electrical Installation Certificate (EIC) issued. EICR certificate issued (satisfactory condition). All work complies with BS 7671:2018 (18th Edition).',
                paymentTerms: 'Payment due on completion. Cash, bank transfer, or card accepted.',
                notes: 'All work guaranteed for 12 months. Notifiable work registered with Building Control. Certificates emailed within 7 days.'
              }
            }
          ]
        },
        plumbing: {
          id: 'plumbing',
          name: 'Plumbing Services',
          description: 'Invoices for plumbing installation and repair work',
          templates: [
            {
              id: 'plumb-001',
              name: 'Plumber Invoice',
              description: 'Invoice for plumbing installation, repairs, and maintenance',
              keywords: ['plumbing invoice', 'plumber invoice', 'plumbing work invoice'],
              searchVolume: 110,
              cpc: 6.29,
              searchDifficulty: 24,
              tier: 'free',
              requiredFields: [
                commonFields.invoiceNumber,
                commonFields.invoiceDate,
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
                commonFields.vatNumber,
                commonFields.vatAmount,
                commonFields.dueDate,
                commonFields.paymentTerms,
                {
                  fieldName: 'gasRegistration',
                  label: 'Gas Safe Registration',
                  type: 'text' as const,
                  required: false,
                  placeholder: 'Gas Safe 123456',
                  helpText: 'Gas Safe Register number (for gas work)'
                },
                {
                  fieldName: 'warrantyPeriod',
                  label: 'Warranty Period',
                  type: 'text' as const,
                  required: false,
                  placeholder: '12 months parts & labor',
                  helpText: 'Warranty or guarantee period'
                }
              ],
              industryStandards: [
                {
                  standard: 'Gas Safe Register',
                  description: 'Gas Safe registration required for any gas work',
                  complianceLevel: 'required'
                },
                {
                  standard: 'Water Regulations',
                  description: 'Compliance with Water Supply (Water Fittings) Regulations',
                  complianceLevel: 'required'
                }
              ],
              sampleData: {
                invoiceNumber: 'PLMB-2024-0678',
                invoiceDate: '2024-10-18',
                businessName: 'FlowFix Plumbing & Heating',
                businessAddress: '89 Pipeline Street, Birmingham, B1 1AA',
                businessEmail: 'service@flowfix.co.uk',
                businessPhone: '+44 121 345 6789',
                vatNumber: 'GB 555 6666 77',
                gasRegistration: 'Gas Safe 198765',
                clientName: 'Mr. James Anderson',
                clientAddress: '56 Resident Road, Birmingham, B17 0TT',
                lineItems: [
                  { description: 'Boiler Service & Safety Check', quantity: 1, rate: 85.00, amount: 85.00 },
                  { description: 'Replace Faulty Radiator Valve', quantity: 2, rate: 45.00, amount: 90.00 },
                  { description: 'Power Flush Heating System', quantity: 1, rate: 350.00, amount: 350.00 },
                  { description: 'Parts & Materials', quantity: 1, rate: 120.00, amount: 120.00 }
                ],
                subtotal: 645.00,
                vatAmount: 129.00,
                totalAmount: 774.00,
                warrantyPeriod: '12 months parts and labor',
                paymentTerms: 'Payment due on completion.',
                notes: 'Boiler serviced and passed safety checks. Gas Safe certificate issued. System power flushed and inhibitor added. All work guaranteed for 12 months.'
              }
            }
          ]
        }
      }
    }
  }
};

// ============================================================================
// INDUSTRY: PROFESSIONAL SERVICES
// ============================================================================

export const professionalServicesIndustry: Industry = {
  id: 'professional-services',
  name: 'Professional Services',
  description: 'Invoice templates for consultants, freelancers, and service professionals',
  icon: '💼',
  totalSearchVolume: 4920, // freelance (1300+1000+720+260+210+170+140+110+70+50+50) + consulting (320+320+140+110+70) + self employed (1600+1600+1300+880+720+390+390) + contractor (480+390+390+320)
  categories: {
    consulting: {
      id: 'consulting',
      name: 'Consulting Services',
      description: 'Invoice templates for consultants and advisory services',
      icon: '📊',
      subCategories: {
        business: {
          id: 'business',
          name: 'Business Consulting',
          description: 'Invoices for management and business consulting',
          templates: [
            {
              id: 'consult-biz-001',
              name: 'Consulting Invoice - Project Based',
              description: 'Invoice for consulting projects and advisory services',
              keywords: ['consulting invoice', 'consultant invoice', 'professional services invoice'],
              searchVolume: 320,
              cpc: 2.17,
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
                commonFields.clientAddress,
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount,
                commonFields.paymentTerms
              ],
              optionalFields: [
                commonFields.vatNumber,
                commonFields.vatAmount,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                {
                  fieldName: 'projectName',
                  label: 'Project Name',
                  type: 'text' as const,
                  required: false,
                  placeholder: 'Digital Transformation Strategy',
                  helpText: 'Name of consulting project or engagement'
                },
                {
                  fieldName: 'consultingPeriod',
                  label: 'Consulting Period',
                  type: 'text' as const,
                  required: false,
                  placeholder: 'September 2024',
                  helpText: 'Time period for services rendered'
                },
                {
                  fieldName: 'hourlyRate',
                  label: 'Hourly Rate',
                  type: 'currency' as const,
                  required: false,
                  placeholder: '150.00',
                  helpText: 'Your standard hourly consulting rate'
                },
                {
                  fieldName: 'totalHours',
                  label: 'Total Hours',
                  type: 'number' as const,
                  required: false,
                  placeholder: '40',
                  helpText: 'Total consulting hours for this period'
                }
              ],
              industryStandards: [
                {
                  standard: 'Detailed Time Breakdown',
                  description: 'Itemize hours by task or deliverable for transparency',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Retainer Terms',
                  description: 'Clarify if invoice is for retainer or project work',
                  complianceLevel: 'recommended'
                }
              ],
              sampleData: {
                invoiceNumber: 'CONS-2024-0445',
                invoiceDate: '2024-10-18',
                dueDate: '2024-11-01',
                businessName: 'Strategic Insights Consulting',
                businessAddress: '22 Advisory Lane, London, EC1A 1BB',
                businessEmail: 'billing@strategicinsights.co.uk',
                businessPhone: '+44 20 7123 4567',
                vatNumber: 'GB 111 2222 33',
                clientName: 'Growth Tech Ltd',
                clientAddress: '45 Startup Boulevard, London, EC2A 3NN',
                clientEmail: 'finance@growthtech.co.uk',
                projectName: 'Digital Transformation Strategy - Phase 1',
                consultingPeriod: 'September 2024',
                hourlyRate: 175.00,
                totalHours: 32,
                lineItems: [
                  { description: 'Strategy Development (16 hours @ £175/hr)', quantity: 16, rate: 175.00, amount: 2800.00 },
                  { description: 'Stakeholder Workshops (8 hours @ £175/hr)', quantity: 8, rate: 175.00, amount: 1400.00 },
                  { description: 'Report Writing & Presentation (8 hours @ £175/hr)', quantity: 8, rate: 175.00, amount: 1400.00 },
                  { description: 'Travel Expenses (Client Site Visits)', quantity: 1, rate: 120.00, amount: 120.00 }
                ],
                subtotal: 5720.00,
                vatAmount: 1144.00,
                totalAmount: 6864.00,
                paymentTerms: 'Payment due within 14 days of invoice date. Net 14 terms.',
                bankName: 'HSBC',
                accountNumber: '98765432',
                sortCode: '40-47-84',
                notes: 'Detailed strategy report delivered on 30 September 2024. Phase 2 to commence on approval.'
              }
            }
          ]
        }
      }
    },
    freelance: {
      id: 'freelance',
      name: 'Freelance Services',
      description: 'Invoice templates for freelancers and independent contractors',
      icon: '💻',
      subCategories: {
        general: {
          id: 'general',
          name: 'General Freelance',
          description: 'Standard freelance invoices for various services',
          templates: [
            {
              id: 'freelance-gen-001',
              name: 'Freelance Invoice - Hourly Rate',
              description: 'Standard freelance invoice for hourly or day rate work',
              keywords: ['freelance invoice', 'freelancer invoice', 'self employed invoice'],
              searchVolume: 1300,
              cpc: 4.58,
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
                commonFields.lineItems,
                commonFields.subtotal,
                commonFields.totalAmount
              ],
              optionalFields: [
                commonFields.vatNumber,
                commonFields.vatAmount,
                commonFields.paymentTerms,
                commonFields.bankName,
                commonFields.accountNumber,
                commonFields.sortCode,
                {
                  fieldName: 'utrNumber',
                  label: 'UTR Number',
                  type: 'text' as const,
                  required: false,
                  placeholder: '1234567890',
                  helpText: 'Your Unique Taxpayer Reference (self-assessment)'
                }
              ],
              industryStandards: [
                {
                  standard: 'UTR Display',
                  description: 'Include UTR number for self-employed individuals',
                  complianceLevel: 'recommended'
                },
                {
                  standard: 'Payment Terms',
                  description: 'Clearly state payment deadline (e.g., Net 30)',
                  complianceLevel: 'recommended'
                }
              ],
              sampleData: {
                invoiceNumber: 'FL-2024-0890',
                invoiceDate: '2024-10-18',
                dueDate: '2024-11-01',
                businessName: 'Alex Thompson - Freelance Developer',
                businessAddress: '78 Home Office Way, Bristol, BS1 3AA',
                businessEmail: 'alex@alexthompson.dev',
                businessPhone: '+44 117 987 6543',
                utrNumber: '1234567890',
                clientName: 'Digital Agency Co',
                clientAddress: '12 Creative Quarter, Bristol, BS2 9TT',
                clientEmail: 'projects@digitalagency.co.uk',
                lineItems: [
                  { description: 'Website Development (Week 1)', quantity: 40, rate: 50.00, amount: 2000.00 },
                  { description: 'Website Development (Week 2)', quantity: 38, rate: 50.00, amount: 1900.00 },
                  { description: 'Bug Fixes & Testing', quantity: 8, rate: 50.00, amount: 400.00 }
                ],
                subtotal: 4300.00,
                vatAmount: 0, // Not VAT registered
                totalAmount: 4300.00,
                paymentTerms: 'Payment due within 14 days of invoice date.',
                bankName: 'Monzo',
                accountNumber: '12345678',
                sortCode: '04-00-04',
                notes: 'Thank you for your business! Invoice paid to Alex Thompson (sole trader).'
              }
            }
          ]
        }
      }
    }
  }
};

// ============================================================================
// ALL INDUSTRIES EXPORT
// ============================================================================

export const allIndustries: Record<string, Industry> = {
  hospitality: hospitalityIndustry,
  creative: creativeIndustry,
  construction: constructionIndustry,
  professionalServices: professionalServicesIndustry
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get industry by ID
 */
export function getIndustry(industryId: string): Industry | undefined {
  return allIndustries[industryId];
}

/**
 * Get all templates for an industry
 */
export function getIndustryTemplates(industryId: string): InvoiceTemplate[] {
  const industry = allIndustries[industryId];
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
export function searchTemplates(query: string): InvoiceTemplate[] {
  const lowerQuery = query.toLowerCase();
  const templates: InvoiceTemplate[] = [];

  Object.values(allIndustries).forEach(industry => {
    Object.values(industry.categories).forEach(category => {
      Object.values(category.subCategories).forEach(subCategory => {
        subCategory.templates.forEach(template => {
          if (
            template.name.toLowerCase().includes(lowerQuery) ||
            template.description.toLowerCase().includes(lowerQuery) ||
            template.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))
          ) {
            templates.push(template);
          }
        });
      });
    });
  });

  return templates;
}

/**
 * Get template by ID
 */
export function getTemplateById(templateId: string): InvoiceTemplate | undefined {
  for (const industry of Object.values(allIndustries)) {
    for (const category of Object.values(industry.categories)) {
      for (const subCategory of Object.values(category.subCategories)) {
        const template = subCategory.templates.find(t => t.id === templateId);
        if (template) return template;
      }
    }
  }
  return undefined;
}

/**
 * Get industry statistics
 */
export function getIndustryStats() {
  const stats: Record<string, any> = {};
  
  Object.entries(allIndustries).forEach(([key, industry]) => {
    const templates = getIndustryTemplates(key);
    stats[key] = {
      name: industry.name,
      totalSearchVolume: industry.totalSearchVolume,
      totalTemplates: templates.length,
      categories: Object.keys(industry.categories).length
    };
  });

  return stats;
}

/**
 * Get all industries including premium templates (for Pro tier users)
 * Combines free templates (11) + premium templates (9) = 20 total
 */
export function getAllIndustriesWithPremium() {
  // Import premium templates dynamically
  let premiumIndustries: Record<string, Industry> = {};
  
  try {
    const premiumModule = require('./premiumTemplateLibrary');
    premiumIndustries = premiumModule.allPremiumIndustries || {};
  } catch (error) {
    console.warn('Premium templates not available:', error);
  }
  
  return {
    ...allIndustries,
    ...premiumIndustries
  };
}

/**
 * Get total template count (free + premium)
 */
export function getTotalTemplateCount(includePremium: boolean = false): number {
  const freeCount = Object.values(allIndustries).reduce((sum, industry) => {
    return sum + getIndustryTemplates(industry.id).length;
  }, 0);
  
  if (!includePremium) return freeCount;
  
  // Add premium template count
  try {
    const premiumModule = require('./premiumTemplateLibrary');
    const premiumIndustries = premiumModule.allPremiumIndustries || {};
    const premiumCount = Object.values(premiumIndustries).reduce((sum: number, industry: any) => {
      const templates: any[] = [];
      Object.values(industry.categories || {}).forEach((category: any) => {
        Object.values(category.subCategories || {}).forEach((subCategory: any) => {
          templates.push(...(subCategory.templates || []));
        });
      });
      return sum + templates.length;
    }, 0);
    return freeCount + premiumCount;
  } catch (error) {
    return freeCount;
  }
}
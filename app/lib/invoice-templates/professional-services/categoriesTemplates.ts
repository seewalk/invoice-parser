import { InvoiceField, IndustryStandard } from '../../invoiceTemplateLibrary';

/**
 * Professional Services Industry Invoice Templates
 * 
 * Comprehensive collection of invoice templates for professional services including:
 * - Business consulting and advisory services
 * - Freelance contractors and independent professionals
 * - Virtual assistants and remote administrative support
 * 
 * Each template includes:
 * - Complete field definitions (required and optional)
 * - Industry-specific standards and compliance requirements
 * - Realistic sample data for testing and preview
 * - Business benefits and use cases for SEO
 * - Service types, certifications, and deliverables
 */

export interface ProfessionalServicesTemplate {
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

export interface ProfessionalServicesCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: ProfessionalServicesTemplate[];
}

// Professional Services specific field definitions
export const professionalServicesFields = {
  projectName: {
    fieldName: 'projectName',
    label: 'Project Name',
    type: 'text' as const,
    required: false,
    placeholder: 'Digital Transformation Strategy',
    helpText: 'Name of consulting project or engagement'
  },
  consultingPeriod: {
    fieldName: 'consultingPeriod',
    label: 'Consulting Period',
    type: 'text' as const,
    required: false,
    placeholder: 'September 2024',
    helpText: 'Time period for services rendered'
  },
  hourlyRate: {
    fieldName: 'hourlyRate',
    label: 'Hourly Rate',
    type: 'number' as const,
    required: false,
    placeholder: '150.00',
    helpText: 'Your standard hourly consulting rate'
  },
  totalHours: {
    fieldName: 'totalHours',
    label: 'Total Hours',
    type: 'number' as const,
    required: false,
    placeholder: '40',
    helpText: 'Total consulting hours for this period'
  },
  utrNumber: {
    fieldName: 'utrNumber',
    label: 'UTR Number',
    type: 'text' as const,
    required: false,
    placeholder: '1234567890',
    helpText: 'Your Unique Taxpayer Reference (self-assessment)'
  },
  billingPeriod: {
    fieldName: 'billingPeriod',
    label: 'Billing Period',
    type: 'text' as const,
    required: false,
    placeholder: 'January 2024',
    helpText: 'Billing period for recurring services'
  }
};

// Common fields used across professional services templates
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
    helpText: 'Name of your professional services business'
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
    helpText: 'Name of the client'
  },
  clientAddress: {
    fieldName: 'clientAddress',
    label: 'Client Address',
    type: 'textarea' as const,
    required: true,
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
// CATEGORY 1: Consulting Services
// ============================================================================

const consultingServicesCategory: ProfessionalServicesCategory = {
  id: 'consulting-services',
  name: 'Consulting Services',
  description: 'Professional invoice templates for business consultants, advisors, and consulting firms',
  icon: '📊',
  templates: [
    {
      id: 'consulting-invoice-project',
      categoryId: 'consulting-services',
      categoryName: 'Consulting Services',
      name: 'Consulting Invoice Template',
      description: 'Invoice template for consulting projects and advisory services with detailed time breakdown and hourly rate tracking',
      tier: 'free',
      searchVolume: 320,
      cpc: 2.17,
      difficulty: 36,
      keywords: [
        'consulting invoice',
        'consultant invoice',
        'professional services invoice',
        'business consulting invoice',
        'advisory invoice',
        'management consulting invoice'
      ],
      sourceFile: 'invoiceTemplateLibrary.ts',
      sourceTemplateId: 'consult-biz-001',
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
        commonFields.businessPhone,
        commonFields.vatNumber,
        commonFields.vatAmount,
        professionalServicesFields.projectName,
        professionalServicesFields.consultingPeriod,
        professionalServicesFields.hourlyRate,
        professionalServicesFields.totalHours,
        commonFields.clientEmail,
        commonFields.bankName,
        commonFields.accountNumber,
        commonFields.sortCode,
        commonFields.notes
      ],
      industryStandards: [
        {
          standard: 'Detailed Time Breakdown',
          description: 'Itemize hours by task or deliverable for client transparency and value demonstration.',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Retainer Terms',
          description: 'Clarify if invoice is for retainer work or project-based engagement to manage expectations.',
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
      },
      industrySpecific: {
        serviceTypes: [
          'Management Consulting',
          'Strategy Consulting',
          'Business Transformation',
          'Change Management',
          'Process Improvement',
          'Financial Advisory',
          'HR Consulting',
          'IT Consulting',
          'Marketing Strategy',
          'Operations Consulting',
          'Risk Management',
          'Interim Management'
        ],
        certifications: [
          'MBA (Master of Business Administration)',
          'Management Consultant Certification (CMC)',
          'PMP (Project Management Professional)',
          'Six Sigma Black Belt',
          'Chartered Management Consultant',
          'PRINCE2 Practitioner',
          'Agile/Scrum Certification',
          'Change Management Certification (Prosci)',
          'CPA (Certified Public Accountant)',
          'Professional Indemnity Insurance'
        ],
        deliverables: [
          'Strategic plans and roadmaps',
          'Business analysis reports',
          'Market research findings',
          'Process documentation',
          'Change management plans',
          'Workshop facilitation',
          'Stakeholder presentations',
          'Implementation recommendations',
          'Performance metrics and KPIs',
          'Risk assessment reports',
          'Financial models',
          'Executive summaries'
        ]
      },
      businessBenefits: [
  'Management Consulting Invoicing: Professional billing for strategy consulting, business transformation, change management, and advisory services',
  'Value-Based Transparency: Itemized time breakdown (research: 12 hours, analysis: 8 hours, presentation: 4 hours) demonstrates ROI and justifies consultant fees',
  'Multi-Phase Project Tracking: Project name, engagement period, and phase documentation for long-term transformations and phased delivery programs',
  'Premium Rate Justification: Transparent hourly rates (£150-£500/hr) with experience-based pricing supports partner, senior, and associate consultant billing',
  'Comprehensive Service Billing: Separate line items for strategic planning, executive workshops, stakeholder interviews, deliverable reports, and implementation support',
  'Cash Flow Optimization: Clear payment terms (Net 14, Net 30, Net 45) with milestone billing and retainer arrangements protect consultant working capital',
  'C-Suite Credibility: Premium invoice format reflects Big 4, boutique consultancy, and independent consultant professionalism for corporate clients',
  'Dual Pricing Models: Supports time-and-materials (T&M) hourly billing and fixed-fee project engagements (£10K-£500K+ transformation programs)',
  'Expense Reimbursement: Detailed travel costs (train, accommodation, mileage at 45p/mile) and disbursements for client site visits and workshops',
  'UK VAT Compliance: Proper 20% VAT calculation for consulting services meets HMRC requirements for registered consultancy businesses',
  'Corporate Payment Integration: Bank details (BACS, SWIFT) enable fast electronic payment from corporate finance systems and accounts payable',
  'Engagement Documentation: Notes section confirms deliverable handover (strategic plan, operational model), outlines next phase scope, and secures follow-on work',
  'Specialization Support: Easy customization for IT consulting, HR consulting, financial advisory, marketing strategy, and digital transformation billing'
],
      useCases: [
        'Management consultant billing strategy development project',
        'Business advisor invoicing digital transformation consulting',
        'Strategy consultant billing market entry analysis',
        'Change management consultant invoicing organizational restructuring',
        'Operations consultant billing process improvement engagement',
        'Financial advisor invoicing business valuation and due diligence',
        'HR consultant billing talent strategy and recruitment planning',
        'IT consultant invoicing technology roadmap development',
        'Marketing consultant billing brand strategy and positioning',
        'Risk consultant invoicing compliance and risk assessment',
        'Interim executive billing temporary management services',
        'Business consultant invoicing workshops and training sessions',
        'Strategy firm billing multi-phase transformation program',
        'Advisory firm invoicing board advisory and governance services',
        'Consultant billing retainer-based monthly advisory services'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY 2: Freelance Services
// ============================================================================

const freelanceServicesCategory: ProfessionalServicesCategory = {
  id: 'freelance-services',
  name: 'Freelance Services',
  description: 'Invoice templates for freelancers, independent contractors, and self-employed professionals',
  icon: '💻',
  templates: [
    {
      id: 'freelance-invoice-hourly',
      categoryId: 'freelance-services',
      categoryName: 'Freelance Services',
      name: 'Freelance Invoice Template',
      description: 'Standard freelance invoice for hourly or day rate work with UTR number support for self-employed individuals',
      tier: 'free',
      searchVolume: 1300,
      cpc: 4.58,
      difficulty: 39,
      keywords: [
        'freelance invoice',
        'freelancer invoice',
        'self employed invoice',
        'independent contractor invoice',
        'freelance work invoice',
        'contractor invoice',
        'self assessment invoice'
      ],
      sourceFile: 'invoiceTemplateLibrary.ts',
      sourceTemplateId: 'freelance-gen-001',
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
        professionalServicesFields.utrNumber,
        commonFields.clientEmail,
        commonFields.paymentTerms,
        commonFields.bankName,
        commonFields.accountNumber,
        commonFields.sortCode,
        commonFields.notes
      ],
      industryStandards: [
        {
          standard: 'UTR Display',
          description: 'Include Unique Taxpayer Reference (UTR) number for self-employed individuals for HMRC self-assessment compliance.',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Payment Terms',
          description: 'Clearly state payment deadline (e.g., Net 14, Net 30) to manage cash flow and set expectations.',
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
        vatAmount: 0.00,
        totalAmount: 4300.00,
        paymentTerms: 'Payment due within 14 days of invoice date.',
        bankName: 'Monzo',
        accountNumber: '12345678',
        sortCode: '04-00-04',
        notes: 'Thank you for your business! Invoice paid to Alex Thompson (sole trader).'
      },
      industrySpecific: {
        serviceTypes: [
          'Freelance Development',
          'Freelance Design',
          'Freelance Writing',
          'Freelance Marketing',
          'Freelance Consulting',
          'Contract Work',
          'Project-Based Services',
          'Hourly Services',
          'Day Rate Services',
          'Remote Work',
          'Part-Time Contracting',
          'Gig Economy Services'
        ],
        certifications: [
          'Professional Liability Insurance',
          'Self-Employment Tax Registration',
          'UTR (Unique Taxpayer Reference)',
          'VAT Registration (if applicable)',
          'Industry-Specific Certifications',
          'Professional Memberships',
          'Portfolio and References',
          'Background Checks (DBS)',
          'Contractual Agreements',
          'Data Protection Compliance (GDPR)'
        ],
        deliverables: [
          'Completed work deliverables',
          'Project milestones',
          'Time tracking reports',
          'Work samples and proofs',
          'Source files and assets',
          'Documentation and guides',
          'Client presentations',
          'Progress updates',
          'Revision rounds',
          'Final project handover',
          'Support and maintenance',
          'Knowledge transfer'
        ]
      },
      businessBenefits: [
  'Freelance Professional Invoicing: Universal template for freelance developers, graphic designers, copywriters, digital marketers, and independent consultants',
  'HMRC Self-Assessment Compliance: UTR (Unique Taxpayer Reference) number display ensures self-employed tax documentation and HMRC reporting requirements',
  'Transparent Hourly Billing: Clear hourly rate (£40-£150/hr) and hours worked breakdown builds client trust and justifies project costs',
  'Non-VAT Registered Support: Proper formatting for sole traders under £90,000 turnover threshold without VAT registration requirements',
  'Multi-Service Flexibility: Itemized billing for web development, logo design, content writing, SEO audits, and social media campaigns in one invoice',
  'Freelance Cash Flow: Simple net-15 or net-30 payment terms with upfront deposit options (25-50%) protect against late payments',
  'Corporate Client Ready: Professional format meets expectations of agencies, startups, SMEs, and enterprise clients for contractor invoicing',
  'BACS Payment Efficiency: Bank details section (sort code, account number, account name) enables fast electronic payment and reduces PayPal fees',
  'Project Closure Documentation: Notes section confirms deliverable completion, includes thank you message, and encourages repeat business referrals',
  'Specialist Rate Justification: Supports premium day rates (£350-£650) for senior freelancers, specialists, and interim contractors with proven expertise',
  'Milestone Payment Support: Easy customization for fixed-price projects with phase-based billing (deposit, mid-project, final delivery payments)',
  'Rapid Payment Processing: Professional itemized format reduces client approval delays and accelerates invoice processing through corporate systems',
  'IR35 Off-Payroll Ready: Clean invoice format suitable for both inside and outside IR35 contracts with clear trading name and business structure'
],
      useCases: [
        'Freelance developer billing website development project',
        'Freelance designer invoicing logo and branding work',
        'Freelance writer billing content writing services',
        'Freelance marketer invoicing social media management',
        'Independent contractor billing consulting services',
        'Freelance photographer invoicing commercial photography',
        'Freelance video editor billing video production work',
        'Freelance copywriter invoicing ad copy and marketing materials',
        'Freelance SEO specialist billing search optimization services',
        'Freelance accountant invoicing bookkeeping and tax services',
        'Freelance translator billing translation and localization',
        'Freelance project manager invoicing project coordination',
        'Freelance data analyst billing analytics and reporting',
        'Freelance virtual assistant invoicing administrative support',
        'Freelance coach or trainer invoicing coaching sessions'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY 3: Virtual Assistant Services
// ============================================================================

const virtualAssistantServicesCategory: ProfessionalServicesCategory = {
  id: 'virtual-assistant-services',
  name: 'Virtual Assistant Services',
  description: 'Invoice templates for virtual assistants, remote admin support, and business support services',
  icon: '👩‍💻',
  templates: [
    {
      id: 'virtual-assistant-invoice',
      categoryId: 'virtual-assistant-services',
      categoryName: 'Virtual Assistant Services',
      name: 'Virtual Assistant Invoice Template',
      description: 'Comprehensive invoice template for virtual assistant services including administrative support, email management, scheduling, data entry, and business support tasks',
      tier: 'free',
      searchVolume: 2800,
      cpc: 11.50,
      difficulty: 39,
      keywords: [
        'virtual assistant invoice',
        'va invoice',
        'remote assistant invoice',
        'administrative services invoice',
        'business support invoice',
        'virtual admin invoice'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'virtual-assistant-001',
      requiredFields: [
        commonFields.invoiceNumber,
        commonFields.invoiceDate,
        commonFields.dueDate,
        commonFields.businessName,
        commonFields.businessAddress,
        commonFields.businessEmail,
        commonFields.clientName,
        commonFields.clientAddress,
        professionalServicesFields.billingPeriod,
        commonFields.lineItems,
        commonFields.subtotal,
        commonFields.totalAmount
      ],
      optionalFields: [
        commonFields.businessPhone,
        commonFields.companyNumber,
        commonFields.vatNumber,
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
          standard: 'Hourly Rate Transparency',
          description: 'Clearly state hourly rate and total hours worked for each task category.',
          complianceLevel: 'required'
        },
        {
          standard: 'Task Breakdown',
          description: 'Itemize different types of tasks performed (email, scheduling, data entry, etc.) for clarity.',
          complianceLevel: 'required'
        },
        {
          standard: 'Time Tracking',
          description: 'Reference time tracking software or method used for accurate billing.',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Retainer vs Ad-hoc',
          description: 'Specify if billing is retainer-based monthly or hourly ad-hoc work.',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Confidentiality Clause',
          description: 'Reference confidentiality agreement for handling sensitive client data.',
          complianceLevel: 'optional'
        }
      ],
      sampleData: {
        invoiceNumber: 'VA-2024-0567',
        invoiceDate: '2024-01-31',
        dueDate: '2024-02-14',
        businessName: 'Professional VA Solutions',
        businessAddress: '123 Remote Work Lane\nLondon, EC1 1AA',
        businessEmail: 'billing@provasolutions.co.uk',
        businessPhone: '+44 20 1234 5678',
        clientName: 'Small Business Ltd',
        clientAddress: '456 Entrepreneur Street\nLondon, EC2 2BB',
        clientEmail: 'admin@smallbusiness.co.uk',
        billingPeriod: 'January 2024',
        lineItems: [
          { description: 'Email management and correspondence (12 hours)', quantity: 12, rate: 25.00, amount: 300.00 },
          { description: 'Calendar scheduling and coordination (8 hours)', quantity: 8, rate: 25.00, amount: 200.00 },
          { description: 'Data entry and spreadsheet management (10 hours)', quantity: 10, rate: 22.00, amount: 220.00 },
          { description: 'Social media post scheduling (5 hours)', quantity: 5, rate: 28.00, amount: 140.00 },
          { description: 'Research and report compilation (6 hours)', quantity: 6, rate: 30.00, amount: 180.00 }
        ],
        subtotal: 1040.00,
        vatAmount: 208.00,
        totalAmount: 1248.00,
        paymentTerms: 'Payment due within 14 days. Monthly retainer available for ongoing support.',
        notes: 'Total hours: 41 hours. Time tracked using Toggl. Next month retainer discount available for 40+ hours.'
      },
      industrySpecific: {
        serviceTypes: [
          'Email Management',
          'Calendar Scheduling',
          'Data Entry',
          'Administrative Support',
          'Customer Service',
          'Social Media Management',
          'Travel Arrangements',
          'Document Preparation',
          'Research Services',
          'Bookkeeping Support',
          'Project Coordination',
          'Client Communication'
        ],
        certifications: [
          'Virtual Assistant Certification (VAC)',
          'Administrative Professional Certification',
          'Project Management Tools Proficiency',
          'Microsoft Office Specialist (MOS)',
          'Google Workspace Certification',
          'Social Media Management Certification',
          'Data Entry Certification',
          'Customer Service Training',
          'Time Management Training',
          'Confidentiality and Data Protection Training'
        ],
        deliverables: [
          'Email inbox management',
          'Meeting scheduling and coordination',
          'Data entry and organization',
          'Document formatting and preparation',
          'Travel bookings and itineraries',
          'Expense tracking and reports',
          'Social media content scheduling',
          'Research summaries and reports',
          'Customer inquiry responses',
          'Presentation preparation',
          'Database maintenance',
          'File organization and management'
        ]
      },
      businessBenefits: [
  'Virtual Assistant Billing: Professional invoicing for remote admin, executive assistance, social media management, and online business support',
  'Retainer Period Tracking: Monthly billing cycle documentation (January 2024, Q1 2024) for ongoing VA packages and recurring service agreements',
  'Value Demonstration: Itemized task breakdown (12 hours email, 8 hours scheduling) proves ROI and justifies monthly retainer investment',
  'Tiered Hourly Rates: Separate pricing for general admin (£20-£25/hr), social media (£25-£30/hr), and specialist tasks like bookkeeping (£30-£40/hr)',
  'Time Tracking Transparency: Detailed hour logging per task category builds client confidence and reduces billing disputes for hourly VA work',
  'Flexible Pricing Models: Supports pay-as-you-go hourly billing and discounted monthly retainer packages (20 hours, 40 hours, 80 hours)',
  'Multi-Client Positioning: Premium invoice format appeals to solopreneurs, SMEs, busy executives, and corporate clients outsourcing admin',
  'UK VAT Registration: Proper 20% VAT calculation for VAs registered over £90,000 turnover threshold meets HMRC self-employment requirements',
  'Payment Incentives: Clear net-30 terms with optional early payment discounts (5% off) or retainer prepayment bonuses improve cash flow',
  'Monthly Summary Documentation: Notes section totals hours worked, highlights completed projects, and outlines upcoming month priorities',
  'VA Specialty Adaptation: Easy customization for email management, calendar coordination, data entry, customer service, travel booking, and CRM updates',
  'Client Payment Speed: Professional itemized format reduces invoice queries and accelerates payment processing from busy business owners',
  'Package Upsell Opportunity: Clear display of ad-hoc hourly rates vs. discounted retainer pricing encourages clients to commit to monthly packages'
],
      useCases: [
        'Virtual assistant billing monthly retainer services for small business',
        'Remote admin support invoicing email and calendar management',
        'VA billing data entry and spreadsheet services',
        'Virtual assistant invoicing social media management and scheduling',
        'Remote support billing customer service and inquiry management',
        'VA invoicing travel arrangements and itinerary planning',
        'Virtual assistant billing research and report compilation',
        'Remote admin invoicing document preparation and formatting',
        'VA billing bookkeeping support and expense tracking',
        'Virtual assistant invoicing project coordination services',
        'Remote support billing executive assistant services',
        'VA invoicing e-commerce order processing and support',
        'Virtual assistant billing real estate admin and listing support',
        'Remote admin invoicing podcast editing and show notes',
        'VA billing multi-client monthly retainer packages'
      ]
    }
  ]
};

// ============================================================================
// EXPORTS
// ============================================================================

export const professionalServicesCategories: ProfessionalServicesCategory[] = [
  consultingServicesCategory,
  freelanceServicesCategory,
  virtualAssistantServicesCategory
];

// Helper functions
export function getAllProfessionalServicesTemplates(): ProfessionalServicesTemplate[] {
  return professionalServicesCategories.flatMap(category => category.templates);
}

export function getProfessionalServicesTemplateById(id: string): ProfessionalServicesTemplate | undefined {
  return getAllProfessionalServicesTemplates().find(template => template.id === id);
}

export function getProfessionalServicesTemplatesByCategory(categoryId: string): ProfessionalServicesTemplate[] {
  const category = professionalServicesCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

export function getProfessionalServicesCategoryById(id: string): ProfessionalServicesCategory | undefined {
  return professionalServicesCategories.find(category => category.id === id);
}

export function searchProfessionalServicesTemplates(keyword: string): ProfessionalServicesTemplate[] {
  const lowerKeyword = keyword.toLowerCase();
  return getAllProfessionalServicesTemplates().filter(template =>
    template.name.toLowerCase().includes(lowerKeyword) ||
    template.description.toLowerCase().includes(lowerKeyword) ||
    template.keywords.some(k => k.toLowerCase().includes(lowerKeyword))
  );
}
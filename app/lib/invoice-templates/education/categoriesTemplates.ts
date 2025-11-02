/**
 * Education Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Education industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 2 (2 free, 0 premium)
 * - Categories: 2 (Online Courses & E-learning, Tutoring & Private Instruction)
 * - Total Search Volume: 5,900+/month
 * - Average CPC: $9.10
 * - SEO Difficulty: Medium-Low (38.0)
 * 
 * This comprehensive education invoice template collection positions us as the
 * definitive global resource for all educational service billing needs, covering
 * online course creators, e-learning platforms, private tutors, and academic support services.
 * 
 * Industry-Specific Fields:
 * - Course Access & Duration
 * - License Keys & Platform Access
 * - Subject & Education Level
 * - Session Documentation
 * - Teaching Qualifications
 * - Learning Materials
 * - Certification Details
 * - Refund Policies
 * - Study Materials
 * - Progress Tracking
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';
import { InvoiceField, IndustryStandard } from '../../invoiceTemplateLibrary';

// ============================================================================
// EDUCATION-SPECIFIC FIELDS
// ============================================================================

// Reusable education field definitions for consistent field usage
export const educationFields = {
  billingPeriod: {
    fieldName: 'billingPeriod',
    label: 'Billing Period',
    type: 'text' as const,
    required: true,
    placeholder: 'January 2024',
    helpText: 'Billing period for tutoring or subscription services'
  },
  licenseKey: {
    fieldName: 'licenseKey',
    label: 'License Key / Access Code',
    type: 'text' as const,
    required: false,
    placeholder: 'LEARN-2024-A1B2C3D4',
    helpText: 'Course access code or license key'
  },
  courseAccess: {
    fieldName: 'courseAccess',
    label: 'Course Access Period',
    type: 'text' as const,
    required: false,
    placeholder: 'Lifetime access',
    helpText: 'Duration of course access (lifetime, 1 year, etc.)'
  },
  subject: {
    fieldName: 'subject',
    label: 'Subject / Course Topic',
    type: 'text' as const,
    required: false,
    placeholder: 'A-Level Mathematics',
    helpText: 'Subject area or course topic'
  },
  educationLevel: {
    fieldName: 'educationLevel',
    label: 'Education Level',
    type: 'text' as const,
    required: false,
    placeholder: 'GCSE, A-Level, Undergraduate',
    helpText: 'Education level of student or course'
  }
};

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface EducationTemplate {
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
    platforms: string[];
    deliverables: string[];
  };
  businessBenefits: string[];
  useCases: string[];
}

export interface EducationCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: EducationTemplate[];
}

// ============================================================================
// CATEGORY 1: ONLINE COURSES & E-LEARNING
// ============================================================================

const onlineCoursesElearningCategory: EducationCategory = {
  id: 'online-courses-elearning',
  name: 'Online Courses & E-learning',
  description: 'Invoice templates for online course creators, e-learning platforms, and digital educators',
  icon: '💻',
  templates: [
    {
      id: 'online-course-invoice',
      categoryId: 'online-courses-elearning',
      categoryName: 'Online Courses & E-learning',
      name: 'Online Course Invoice Template',
      description: 'Invoice template for online course enrollment, digital learning programs, and educational content access',
      tier: 'free',
      searchVolume: 3600,
      cpc: 9.80,
      difficulty: 40,
      keywords: [
        'online course invoice',
        'e-learning invoice',
        'digital course invoice',
        'educational program invoice',
        'course creator billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'online-course-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'COURSE-2024-001', helpText: 'Unique invoice identifier' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date invoice is issued' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date (often immediate for courses)' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text' as const, required: true, placeholder: 'LearnPro Online Academy', helpText: 'Your course platform or business name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
        { fieldName: 'businessEmail', label: 'Business Email', type: 'email' as const, required: true, helpText: 'Your business email' },
        { fieldName: 'clientName', label: 'Student Name', type: 'text' as const, required: true, placeholder: 'John Smith', helpText: 'Student or client name' },
        { fieldName: 'clientEmail', label: 'Student Email', type: 'email' as const, required: true, helpText: 'Student email for course access' },
        { fieldName: 'lineItems', label: 'Line Items', type: 'textarea' as const, required: true, helpText: 'Course details and pricing' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Subtotal before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total amount due' }
      ],
      optionalFields: [
        { fieldName: 'businessPhone', label: 'Business Phone', type: 'phone' as const, required: false, helpText: 'Your phone number' },
        { fieldName: 'companyNumber', label: 'Company Number', type: 'text' as const, required: false, helpText: 'Company registration number' },
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration number' },
        { fieldName: 'clientAddress', label: 'Student Address', type: 'textarea' as const, required: false, helpText: 'Student billing address' },
        educationFields.licenseKey,
        { fieldName: 'vatAmount', label: 'VAT Amount', type: 'currency' as const, required: false, helpText: 'VAT amount' },
        { fieldName: 'bankName', label: 'Bank Name', type: 'text' as const, required: false, helpText: 'Bank name' },
        { fieldName: 'accountNumber', label: 'Account Number', type: 'text' as const, required: false, helpText: 'Bank account number' },
        { fieldName: 'sortCode', label: 'Sort Code', type: 'text' as const, required: false, helpText: 'Bank sort code' },
        { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, helpText: 'Payment and refund terms' },
        { fieldName: 'notes', label: 'Notes', type: 'textarea' as const, required: false, helpText: 'Course access instructions and additional information' }
      ],
      industryStandards: [
        {
          standard: 'Course access details',
          description: 'Specify course duration, access period, and platform',
          complianceLevel: 'required'
        },
        {
          standard: 'Learning materials included',
          description: 'List included materials (videos, PDFs, quizzes, certificates)',
          complianceLevel: 'required'
        },
        {
          standard: 'Refund policy',
          description: 'Include money-back guarantee or refund terms',
          complianceLevel: 'required'
        },
        {
          standard: 'Certification details',
          description: 'Specify if completion certificate is included',
          complianceLevel: 'recommended'
        }
      ],
      sampleData: {
        invoiceNumber: 'COURSE-2024-0789',
        invoiceDate: '2024-11-01',
        dueDate: '2024-11-01',
        businessName: 'LearnPro Online Academy',
        businessAddress: '100 Education Street, London, EC1A 1AA',
        businessEmail: 'support@learnpro-academy.com',
        businessPhone: '+44 20 7890 1234',
        vatNumber: 'GB 111 2222 33',
        clientName: 'Sarah Johnson',
        clientEmail: 'sarah.johnson@email.com',
        clientAddress: '45 Student Road, Manchester, M1 1AA',
        licenseKey: 'LEARN-2024-A1B2C3D4',
        lineItems: [
          { description: 'Complete Web Development Bootcamp (Lifetime access)', quantity: 1, rate: 199.00, amount: 199.00 },
          { description: 'Premium support package (3 months)', quantity: 1, rate: 49.00, amount: 49.00 },
          { description: 'Downloadable project files and templates', quantity: 1, rate: 0.00, amount: 0.00 }
        ],
        subtotal: 248.00,
        vatAmount: 49.60,
        totalAmount: 297.60,
        paymentTerms: 'Full payment due immediately. 30-day money-back guarantee. No refunds after 30 days of enrollment.',
        notes: 'Your course access credentials have been sent to sarah.johnson@email.com. Lifetime access includes all future course updates. Certificate of completion available upon finishing all modules and final project.'
      },
      industrySpecific: {
        serviceTypes: [
          'Online Course Enrollment',
          'E-learning Programs',
          'Digital Bootcamps',
          'Video Course Access',
          'Self-paced Learning',
          'Live Online Training',
          'Course Bundles'
        ],
        platforms: [
          'Teachable',
          'Udemy',
          'Thinkific',
          'Kajabi',
          'Custom LMS',
          'WordPress/LearnDash',
          'Moodle'
        ],
        deliverables: [
          'Video Lessons',
          'Downloadable PDFs',
          'Practice Exercises',
          'Quizzes & Assessments',
          'Completion Certificates',
          'Project Files',
          'Community Access',
          'Support Forums'
        ]
      },
      businessBenefits: [
        'Digital Product Scalability: Sell courses to unlimited students without additional production costs after creation',
        'Lifetime Access Pricing: Charge premium prices (£100-£500+) for lifetime access creating high-value one-time sales',
        'Tiered Pricing Strategy: Offer course bundles, premium support, and certification at different price points',
        'License Key Management: Track course access with unique license keys for each student enrollment',
        'Refund Policy Clarity: 30-day money-back guarantee builds trust while limiting refund exposure',
        'Upsell Opportunities: Bundle related courses, premium support, 1-on-1 coaching as add-ons',
        'Passive Income Model: Automated course delivery creates passive income after initial course creation',
        'Course Updates Value: Lifetime access includes future updates adding ongoing value without extra cost',
        'Certification Revenue: Charge separately for certificates of completion or professional accreditation',
        'Global Market Reach: Digital courses accessible worldwide with automated payment and delivery'
      ],
      useCases: [
        'Web development and programming bootcamps with project-based learning',
        'Digital marketing and SEO courses with certification',
        'Graphic design and creative software training (Photoshop, Illustrator, Figma)',
        'Business and entrepreneurship courses with templates and resources',
        'Language learning courses with video lessons and practice exercises',
        'Photography and videography masterclasses with editing tutorials',
        'Personal development and productivity courses with workbooks',
        'Finance and investing education with stock market training',
        'Fitness and nutrition certification programs',
        'Music production and audio engineering courses with software training',
        'Writing and content creation courses with portfolio building',
        'Professional certification prep courses (PMP, CPA, AWS, etc.)'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY 2: TUTORING & PRIVATE INSTRUCTION
// ============================================================================

const tutoringPrivateInstructionCategory: EducationCategory = {
  id: 'tutoring-private-instruction',
  name: 'Tutoring & Private Instruction',
  description: 'Invoice templates for tutors, private instructors, and academic coaching services',
  icon: '👨‍🏫',
  templates: [
    {
      id: 'tutoring-invoice',
      categoryId: 'tutoring-private-instruction',
      categoryName: 'Tutoring & Private Instruction',
      name: 'Tutoring Invoice Template',
      description: 'Professional invoice template for online tutoring services, virtual lessons, and educational support across all subjects and levels',
      tier: 'free',
      searchVolume: 2300,
      cpc: 8.40,
      difficulty: 36,
      keywords: [
        'tutoring invoice',
        'online tutoring invoice',
        'private tutor invoice',
        'virtual lesson invoice',
        'academic tutoring billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'online-tutoring-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'TUT-2024-001', helpText: 'Unique invoice identifier' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date invoice is issued' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text' as const, required: true, placeholder: 'Excellence Tutoring Services', helpText: 'Your tutoring business or personal name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
        { fieldName: 'businessEmail', label: 'Business Email', type: 'email' as const, required: true, helpText: 'Your business email' },
        { fieldName: 'clientName', label: 'Student/Parent Name', type: 'text' as const, required: true, placeholder: 'Mrs. Emma Smith (Parent)', helpText: 'Student or parent name' },
        educationFields.billingPeriod,
        { fieldName: 'lineItems', label: 'Line Items', type: 'textarea' as const, required: true, helpText: 'Tutoring sessions and services' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Subtotal before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total amount due' }
      ],
      optionalFields: [
        { fieldName: 'businessPhone', label: 'Business Phone', type: 'phone' as const, required: false, helpText: 'Your phone number' },
        { fieldName: 'companyNumber', label: 'Company Number', type: 'text' as const, required: false, helpText: 'Company registration number' },
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration number (tutoring often VAT-exempt)' },
        { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: false, helpText: 'Client billing address' },
        { fieldName: 'clientEmail', label: 'Client Email', type: 'email' as const, required: false, helpText: 'Client email' },
        { fieldName: 'vatAmount', label: 'VAT Amount', type: 'currency' as const, required: false, helpText: 'VAT amount (often £0 for educational services)' },
        { fieldName: 'bankName', label: 'Bank Name', type: 'text' as const, required: false, helpText: 'Bank name' },
        { fieldName: 'accountNumber', label: 'Account Number', type: 'text' as const, required: false, helpText: 'Bank account number' },
        { fieldName: 'sortCode', label: 'Sort Code', type: 'text' as const, required: false, helpText: 'Bank sort code' },
        { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, helpText: 'Payment terms and cancellation policy' },
        { fieldName: 'notes', label: 'Notes', type: 'textarea' as const, required: false, helpText: 'Session notes and student progress' }
      ],
      industryStandards: [
        {
          standard: 'Subject and level',
          description: 'Specify subject area and education level (GCSE, A-Level, etc.)',
          complianceLevel: 'required'
        },
        {
          standard: 'Session documentation',
          description: 'Record session dates, times, and duration',
          complianceLevel: 'required'
        },
        {
          standard: 'Teaching qualifications',
          description: 'Include relevant teaching qualifications (QTS, PGCE, etc.)',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Progress tracking',
          description: 'Reference student progress reports if provided',
          complianceLevel: 'optional'
        }
      ],
      sampleData: {
        invoiceNumber: 'TUT-2024-0456',
        invoiceDate: '2024-11-01',
        dueDate: '2024-11-08',
        businessName: 'Excellence Tutoring Services',
        businessAddress: '67 Academic Road, Oxford, OX1 1AA',
        businessEmail: 'bookings@excellence-tutoring.co.uk',
        businessPhone: '+44 1865 123 456',
        clientName: 'Mrs. Emma Thompson (Parent of James)',
        clientAddress: '89 Family Street, Oxford, OX2 2BB',
        clientEmail: 'emma.thompson@email.com',
        billingPeriod: 'October 2024',
        lineItems: [
          { description: 'A-Level Mathematics tutoring (8 hours @ £45/hour)', quantity: 8, rate: 45.00, amount: 360.00 },
          { description: 'GCSE English tutoring (6 hours @ £40/hour)', quantity: 6, rate: 40.00, amount: 240.00 },
          { description: 'Study materials and practice papers', quantity: 1, rate: 25.00, amount: 25.00 }
        ],
        subtotal: 625.00,
        vatAmount: 0.00,
        totalAmount: 625.00,
        paymentTerms: 'Payment due within 7 days. 24-hour cancellation notice required or full session fee applies.',
        notes: 'James is making excellent progress in both A-Level Maths and GCSE English. October sessions focused on: Calculus differentiation (Maths), Shakespeare analysis and essay structure (English). Mock exam practice scheduled for November. Next month recommendation: Continue twice-weekly sessions for exam preparation.'
      },
      industrySpecific: {
        serviceTypes: [
          'Private Tutoring',
          'Online Tutoring',
          'Group Tutoring',
          'Exam Preparation',
          'Homework Help',
          'Academic Coaching',
          'Test Prep (SAT, ACT, 11+)'
        ],
        platforms: [
          'Zoom',
          'Google Meet',
          'Microsoft Teams',
          'Skype',
          'In-person',
          'Hybrid Sessions',
          'TutorCruncher'
        ],
        deliverables: [
          'Tutoring Sessions',
          'Study Materials',
          'Practice Papers',
          'Progress Reports',
          'Homework Assignments',
          'Exam Strategies',
          'Session Recordings'
        ]
      },
      businessBenefits: [
        'Hourly Rate Model: Charge premium hourly rates (£30-£80+/hour) based on subject complexity and education level',
        'Subject-Based Pricing: Higher rates for specialized subjects (A-Level Maths, Sciences) vs. primary level tutoring',
        'Package Discounts: Offer 10-hour or monthly packages with slight discounts to encourage commitment',
        'VAT Exemption Benefit: Educational services often VAT-exempt in UK, making pricing more competitive',
        'Session Documentation: Track individual session dates/times building trust and accountability',
        'Progress Tracking Value: Include progress notes demonstrating value and justifying continued investment',
        'Cancellation Policy Revenue: 24-hour cancellation policy protects against last-minute cancellations',
        'Study Materials Add-ons: Charge separately for practice papers, workbooks, and supplementary materials',
        'Flexible Scheduling: Online tutoring allows flexible scheduling and eliminates travel time',
        'Long-term Client Relationships: Tutoring relationships often span months or years (exam season, school year)'
      ],
      useCases: [
        'GCSE exam preparation across all subjects (Maths, English, Sciences)',
        'A-Level tutoring for university entrance preparation',
        '11+ exam preparation for grammar school entrance',
        'SAT and ACT test prep for university admissions',
        'Primary school tutoring for foundational skills (reading, writing, arithmetic)',
        'Language tutoring for GCSE and A-Level foreign languages',
        'University-level tutoring for undergraduate subjects',
        'Adult learners returning to education or changing careers',
        'Special educational needs (SEN) tutoring with adapted approaches',
        'Homeschool support and curriculum guidance for parents',
        'Professional exam preparation (CFA, CPA, medical licensing)',
        'Summer intensive courses for exam revision and catch-up'
      ]
    }
  ]
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const educationCategories: EducationCategory[] = [
  onlineCoursesElearningCategory,
  tutoringPrivateInstructionCategory
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all education templates across all categories
 */
export function getAllEducationTemplates(): EducationTemplate[] {
  return educationCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): EducationTemplate[] {
  const category = educationCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): EducationTemplate | undefined {
  return getAllEducationTemplates().find(template => template.id === templateId);
}

/**
 * Get all free education templates
 */
export function getFreeEducationTemplates(): EducationTemplate[] {
  return getAllEducationTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium education templates
 */
export function getPremiumEducationTemplates(): EducationTemplate[] {
  return getAllEducationTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchEducationTemplates(query: string): EducationTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllEducationTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get high-value templates (high search volume, high CPC)
 */
export function getHighValueTemplates(): EducationTemplate[] {
  return getAllEducationTemplates()
    .filter(template => template.searchVolume >= 2000 || template.cpc >= 8.0)
    .sort((a, b) => (b.searchVolume * b.cpc) - (a.searchVolume * a.cpc));
}

/**
 * Get education industry statistics
 */
export function getEducationStats() {
  const allTemplates = getAllEducationTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreeEducationTemplates().length,
    premiumTemplates: getPremiumEducationTemplates().length,
    totalCategories: educationCategories.length,
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
  const templates = getAllEducationTemplates();
  const highSearch = templates.filter(t => t.searchVolume >= 2500);
  const highCPC = templates.filter(t => t.cpc >= 8.5);
  const lowDifficulty = templates.filter(t => t.difficulty <= 38);

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
  categories: educationCategories,
  templates: getAllEducationTemplates(),
  utils: {
    getAllTemplates: getAllEducationTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreeEducationTemplates,
    getPremiumTemplates: getPremiumEducationTemplates,
    search: searchEducationTemplates,
    getHighValueTemplates,
    getStats: getEducationStats,
    getSEORecommendations
  }
};
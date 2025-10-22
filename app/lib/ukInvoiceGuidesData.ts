/**
 * UK Invoice Guides Content Library
 * 
 * Comprehensive guide content for UK invoice compliance topics
 * Organized by guide slug with full article-style content
 * 
 * Integrated with ukInvoiceKnowledgeBase.ts for data
 * Follows same structure as blogData.ts for consistency
 */

import {
  ukBusinessIdentifiers,
  ukVATRates,
  cisTaxRates,
  complianceRequirements,
  getAllBusinessIdentifiers,
  getAllVATRates,
  getAllCISRates
} from './ukInvoiceKnowledgeBase';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  metaDescription: string;
  keywords: string[];
  category: 'Compliance' | 'Tax' | 'Registration' | 'Standards';
  categoryIcon: string;
  icon: string;
  publishedDate: string;
  updatedDate: string;
  author: string;
  readTime: number;
  searchVolume: number;
  featured: boolean;
  relatedGuides: string[];
  content: GuideSection[];
  faq: FAQItem[];
  callToAction: CallToAction;
}

export interface GuideSection {
  id: string;
  heading: string;
  content: string;
  subsections?: {
    heading: string;
    content: string;
  }[];
  codeExample?: {
    language: string;
    code: string;
    description: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  list?: {
    type: 'ordered' | 'unordered' | 'checklist';
    items: string[];
  };
  callout?: {
    type: 'info' | 'warning' | 'success' | 'danger';
    title: string;
    content: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CallToAction {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
}

// ============================================================================
// GUIDE ARTICLES DATABASE
// ============================================================================

export const guideArticles: Record<string, GuideArticle> = {
  'vat-compliant': {
    slug: 'vat-compliant',
    title: 'VAT-Compliant UK Invoices: Complete Guide for 2025',
    description: 'Learn how to create HMRC-compliant VAT invoices with correct rates (20%, 5%, 0%), formatting, and Making Tax Digital requirements.',
    excerpt: 'Master VAT invoice compliance with our comprehensive guide covering all UK VAT rates, HMRC requirements, and Making Tax Digital regulations for 2025.',
    metaDescription: 'Complete guide to VAT-compliant UK invoices. Learn VAT rates (20%, 5%, 0%), HMRC requirements, MTD compliance, and how to create legally compliant VAT invoices in 2025.',
    keywords: [
      'VAT compliant invoice UK',
      'UK VAT rates 2025',
      'HMRC VAT invoice requirements',
      'Making Tax Digital VAT',
      'VAT invoice format UK',
      'standard VAT rate UK',
      'reduced VAT rate',
      'zero rated VAT',
      'VAT exempt vs zero rated',
      'VAT number on invoice'
    ],
    category: 'Tax',
    categoryIcon: '💷',
    icon: '📊',
    publishedDate: '2024-10-20',
    updatedDate: '2024-10-20',
    author: 'Elektroluma Tax Team',
    readTime: 12,
    searchVolume: 7600, // Sum of VAT-related searches
    featured: true,
    relatedGuides: ['cis-deduction', 'mtd-compliance', 'invoice-requirements'],
    content: [
      {
        id: 'intro',
        heading: 'Introduction to VAT-Compliant Invoices',
        content: `Value Added Tax (VAT) is a consumption tax charged on most goods and services in the UK. If your business is VAT-registered (annual turnover over £90,000), you must charge VAT on your invoices and submit regular VAT returns to HMRC.

Creating VAT-compliant invoices isn't just a legal requirement—it's essential for your business operations, tax compliance, and customer relationships. Non-compliant invoices can result in HMRC penalties, rejected VAT claims, and damaged business reputation.

This comprehensive guide covers everything you need to know about creating VAT-compliant invoices in 2025, including all UK VAT rates, HMRC requirements, Making Tax Digital (MTD) compliance, and practical examples.`,
        callout: {
          type: 'info',
          title: 'VAT Registration Threshold 2025',
          content: 'You must register for VAT if your VAT taxable turnover exceeds £90,000 in any 12-month period. Voluntary registration is available for businesses below this threshold.'
        }
      },
      {
        id: 'vat-rates',
        heading: 'UK VAT Rates 2025: Complete Breakdown',
        content: `The UK operates a multi-rate VAT system with four distinct rates. Understanding which rate applies to your goods or services is crucial for invoice compliance.`,
        subsections: [
          {
            heading: '1. Standard Rate (20%) - Most Common',
            content: `The standard VAT rate of 20% applies to most goods and services sold in the UK. This is the default rate unless your product or service falls into one of the special categories.

**Common examples:**
• Restaurant meals (hot takeaway food)
• Building materials and construction services
• Professional services (consultancy, design, legal)
• Clothing and footwear (adult sizes)
• Electronic goods and appliances
• Furniture and home goods
• Hotel accommodation
• Car rentals and parking

**How to apply:** Add 20% to your net price. For example, a £100 service becomes £120 (£100 + £20 VAT).`
          },
          {
            heading: '2. Reduced Rate (5%) - Special Categories',
            content: `The reduced VAT rate of 5% applies to certain goods and services that are considered essential or beneficial to society.

**Common examples:**
• Domestic fuel and power (gas, electricity for homes)
• Children's car seats and booster seats
• Mobility aids for elderly people
• Energy-saving materials (insulation, solar panels)
• Installation of energy-saving materials
• Smoking cessation products (nicotine patches, gum)

**Important:** Installation of energy-saving materials qualifies for 5% VAT, but general building work does not.`
          },
          {
            heading: '3. Zero Rate (0%) - Taxable but Free',
            content: `Zero-rated supplies are technically taxable for VAT, but charged at 0%. This means you can still reclaim VAT on related business expenses, unlike exempt supplies.

**Common examples:**
• Most food and drink (excluding hot takeaways, alcoholic drinks, confectionery)
• Books, newspapers, and magazines
• Children's clothing and footwear (up to age 13-14)
• Public transport (buses, trains, domestic flights)
• Prescription medicines and medical equipment
• Exports outside the UK

**Key difference:** Zero-rated (0% VAT charged, can reclaim VAT on costs) vs Exempt (no VAT charged, cannot reclaim VAT on costs).`
          },
          {
            heading: '4. Exempt - No VAT',
            content: `VAT-exempt supplies have no VAT charged at all. Businesses making only exempt supplies cannot register for VAT or reclaim VAT on costs.

**Common examples:**
• Financial services (banking, insurance, lending)
• Insurance policies
• Education and training (by registered providers)
• Healthcare and medical services (by registered professionals)
• Postal services provided by Royal Mail
• Burial and cremation services
• Selling or renting residential property

**Important consideration:** If you make only exempt supplies, you cannot reclaim VAT on your business expenses. This is why zero-rated is more beneficial than exempt.`
          }
        ],
        table: {
          headers: ['VAT Rate', 'Percentage', 'Common Uses', 'Can Reclaim VAT on Costs?'],
          rows: [
            ['Standard', '20%', 'Most goods and services', 'Yes'],
            ['Reduced', '5%', 'Domestic fuel, energy-saving materials', 'Yes'],
            ['Zero', '0%', 'Food, books, childrens clothing', 'Yes'],
            ['Exempt', 'N/A', 'Financial services, insurance, education', 'No']
          ]
        }
      },
      {
        id: 'reverse-charge',
        heading: 'Reverse Charge VAT for Construction Services',
        content: `The domestic reverse charge is a special VAT accounting method introduced in 2021 for construction services under the Construction Industry Scheme (CIS).

**How it works:**
Instead of the supplier charging VAT on the invoice, the customer (contractor) accounts for the VAT directly to HMRC. This combats VAT fraud in the construction industry.

**When it applies:**
• Construction services provided by CIS-registered subcontractors to CIS-registered contractors
• Specified construction services (building, altering, repairing, extending, demolishing)
• Both parties must be VAT-registered
• Does not apply to end-users (homeowners)

**Invoice requirements:**
Your invoice must include:
• "Reverse charge: Customer to pay the VAT to HMRC"
• Net amount only (no VAT charged)
• VAT rate would normally apply (e.g., "VAT at 20% would be £X if reverse charge didn't apply")

**Example:**
Subcontractor invoices contractor for £10,000 of building work:
• Net amount: £10,000
• VAT: £0 (reverse charge applies)
• Total invoice: £10,000
• Contractor accounts for £2,000 VAT separately to HMRC`,
        callout: {
          type: 'warning',
          title: 'Reverse Charge Verification',
          content: 'Always verify that reverse charge applies before issuing an invoice without VAT. Both parties must be CIS-registered and VAT-registered for reverse charge to be valid.'
        }
      },
      {
        id: 'invoice-requirements',
        heading: 'HMRC VAT Invoice Requirements: Complete Checklist',
        content: `A VAT invoice must contain specific information to be HMRC-compliant. Missing or incorrect information can invalidate your invoice for VAT purposes.`,
        list: {
          type: 'checklist',
          items: [
            '**Sequential invoice number** - Must be unique and not repeat (e.g., INV-2024-001)',
            '**Invoice date** - Date the invoice was issued',
            '**Tax point date** - If different from invoice date (usually the date of supply)',
            '**Your business name and address** - Registered business name and address',
            '**Your VAT registration number** - Must include GB prefix (e.g., GB 123 4567 89)',
            '**Customer name and address** - Full name and registered address',
            '**Description of goods/services** - Clear description of what was supplied',
            '**Quantity and unit price** - For each line item',
            '**VAT rate applicable** - State the rate (20%, 5%, 0%, or exempt)',
            '**Total amount excluding VAT** - Subtotal before VAT',
            '**Total VAT amount** - Total VAT charged (can be broken down by rate)',
            '**Total amount including VAT** - Grand total payable'
          ]
        }
      },
      {
        id: 'simplified-invoices',
        heading: 'Simplified VAT Invoices (Under £250)',
        content: `For retail transactions under £250 (including VAT), you can issue a simplified VAT invoice with reduced requirements.

**Minimum requirements:**
• Business name, address, and VAT number
• Invoice date
• Description of goods or services
• Total amount including VAT
• VAT rate (can state "includes VAT at 20%")

**You do NOT need:**
• Sequential invoice number (recommended anyway)
• Customer name and address
• Separate VAT amount (can be included in total)

**Common use cases:**
• Retail shops
• Restaurants and cafes
• Taxi services
• Small trade services

**Example:**
**ABC Plumbing Ltd**
123 High Street, London, SW1A 1AA
VAT No: GB 123 4567 89

Emergency callout - blocked drain
20/10/2024
Total (inc. VAT at 20%): £180.00`,
        callout: {
          type: 'info',
          title: 'Best Practice',
          content: 'Even for simplified invoices under £250, we recommend including full VAT invoice details. It makes accounting easier and provides better record-keeping.'
        }
      },
      {
        id: 'mtd-compliance',
        heading: 'Making Tax Digital (MTD) for VAT',
        content: `Making Tax Digital (MTD) is HMRC's initiative to make tax administration more effective, efficient, and easier for taxpayers. For VAT, MTD has been mandatory since April 2019.

**MTD Requirements:**
• **Digital record-keeping:** Keep VAT records digitally (spreadsheet or accounting software)
• **VAT return submission:** Submit VAT returns using MTD-compatible software
• **Digital links:** Maintain digital links between records (no manual data entry between systems)
• **6-year retention:** Keep digital records for minimum 6 years

**Who must comply:**
All VAT-registered businesses, regardless of turnover, must use MTD for VAT.

**MTD-compatible software:**
• Accounting software (Xero, QuickBooks, Sage, FreeAgent)
• Spreadsheet bridging software
• Invoice parsing tools with MTD integration
• HMRC-approved VAT apps

**Penalties for non-compliance:**
• Initial: £400 fine for first failure to file via MTD
• Ongoing: Additional penalties for repeated failures
• Assessment: HMRC can estimate your VAT liability if records inadequate`,
        callout: {
          type: 'success',
          title: 'Elektroluma is MTD-Ready',
          content: 'Our invoice generator creates MTD-compliant digital invoices that integrate seamlessly with MTD-compatible accounting software. All invoices are automatically stored digitally with audit trails.'
        }
      },
      {
        id: 'common-mistakes',
        heading: 'Common VAT Invoice Mistakes to Avoid',
        content: `Learn from common errors that businesses make when creating VAT invoices.`,
        subsections: [
          {
            heading: '1. Incorrect VAT Number Format',
            content: `**Mistake:** Writing VAT number without GB prefix (e.g., "123456789" instead of "GB 123 4567 89")
**Impact:** Invoice may be rejected by customer's accounting system
**Solution:** Always include GB prefix and use spaces for readability (GB XXX XXXX XX)`
          },
          {
            heading: '2. Wrong VAT Rate Applied',
            content: `**Mistake:** Charging standard rate (20%) on zero-rated items like children's clothing
**Impact:** Overcharging customers and potential HMRC penalties
**Solution:** Check HMRC guidance for correct rate before invoicing`
          },
          {
            heading: '3. Missing Sequential Invoice Numbers',
            content: `**Mistake:** Using random or duplicate invoice numbers
**Impact:** Invalidates invoice for VAT purposes, audit trail issues
**Solution:** Implement sequential numbering system (INV-2024-001, INV-2024-002, etc.)`
          },
          {
            heading: '4. Not Stating VAT Rate on Line Items',
            content: `**Mistake:** Only showing total VAT without indicating rate for each item
**Impact:** Unclear for customers with mixed VAT rate purchases
**Solution:** State VAT rate for each line item, especially when mixing rates`
          },
          {
            heading: '5. Confusing Exempt vs Zero-Rated',
            content: `**Mistake:** Marking zero-rated items as "exempt" or vice versa
**Impact:** Incorrect VAT accounting and potential reclaim issues
**Solution:** Zero-rated = 0% VAT charged (can reclaim), Exempt = no VAT (cannot reclaim)`
          }
        ]
      },
      {
        id: 'examples',
        heading: 'VAT Invoice Examples',
        content: `See real-world examples of VAT invoices for different scenarios.`,
        subsections: [
          {
            heading: 'Example 1: Standard Rate Invoice',
            content: `**Professional Services Invoice**

Your Business Ltd
123 Business Street
London, SW1A 1AA
VAT No: GB 123 4567 89

**Invoice To:**
Client Company Ltd
456 Client Road
Manchester, M1 1AA

Invoice Number: INV-2024-0042
Invoice Date: 20/10/2024
Due Date: 03/11/2024 (Net 14)

| Description | Qty | Rate | Amount |
|-------------|-----|------|--------|
| Management Consultancy (Oct 2024) | 40 hrs | £150.00 | £6,000.00 |
| Travel Expenses | 1 | £120.00 | £120.00 |

**Subtotal:** £6,120.00
**VAT (20%):** £1,224.00
**Total Due:** £7,344.00`
          },
          {
            heading: 'Example 2: Mixed VAT Rates Invoice',
            content: `**Catering Service Invoice**

Gourmet Caterers Ltd
89 Kitchen Street
Birmingham, B1 1AA
VAT No: GB 987 6543 21

Invoice Number: CAT-2024-0156
Invoice Date: 20/10/2024

| Description | Qty | Rate | VAT Rate | Amount |
|-------------|-----|------|----------|--------|
| Cold buffet food (zero-rated) | 50 people | £12.00 | 0% | £600.00 |
| Hot meal service (standard) | 50 people | £25.00 | 20% | £1,250.00 |
| Alcoholic drinks (standard) | 1 | £200.00 | 20% | £200.00 |
| Staff service (standard) | 4 staff | £100.00 | 20% | £400.00 |

**Subtotal (0% VAT):** £600.00
**VAT @ 0%:** £0.00

**Subtotal (20% VAT):** £1,850.00
**VAT @ 20%:** £370.00

**Total VAT:** £370.00
**Total Due:** £2,820.00`
          },
          {
            heading: 'Example 3: Reverse Charge Invoice',
            content: `**Construction Subcontractor Invoice**

Builder Subcontractors Ltd
45 Construction Way
Leeds, LS1 1AA
VAT No: GB 555 4444 33

Invoice To:
Main Contractor Ltd
VAT No: GB 666 7777 88

Invoice Number: BUILD-2024-0089
Invoice Date: 20/10/2024

| Description | Qty | Rate | Amount |
|-------------|-----|------|--------|
| Brickwork - Extension | 1 | £8,500.00 | £8,500.00 |
| Materials | 1 | £1,200.00 | £1,200.00 |

**Subtotal:** £9,700.00
**VAT:** £0.00 (Reverse charge applies)
**Total Due:** £9,700.00

**REVERSE CHARGE NOTICE:**
This invoice is subject to the domestic reverse charge for construction services. Customer must account for VAT to HMRC. VAT at 20% would be £1,940.00 if reverse charge did not apply.`
          }
        ]
      },
      {
        id: 'summary',
        heading: 'Key Takeaways',
        content: `Creating VAT-compliant invoices is essential for UK businesses. Here are the most important points to remember:`,
        list: {
          type: 'ordered',
          items: [
            'Know your VAT rate: 20% standard, 5% reduced, 0% zero-rated, or exempt',
            'Include all mandatory information: VAT number, sequential invoice number, dates, amounts',
            'Use reverse charge for construction services when applicable',
            'Keep records digitally for MTD compliance (minimum 6 years)',
            'Issue invoices within 30 days of tax point',
            'Use MTD-compatible software for record-keeping and returns',
            'Double-check VAT calculations before sending invoices',
            'Understand the difference between zero-rated and exempt supplies'
          ]
        }
      }
    ],
    faq: [
      {
        question: 'What is the current VAT rate in the UK?',
        answer: 'The standard VAT rate in the UK is 20%, which applies to most goods and services. There are also reduced rates of 5% and 0% for specific items, and some items are VAT exempt.'
      },
      {
        question: 'When must I register for VAT?',
        answer: 'You must register for VAT if your VAT taxable turnover exceeds £90,000 in any 12-month period. You can also voluntarily register below this threshold if you want to reclaim VAT on business expenses.'
      },
      {
        question: 'What is the difference between zero-rated and exempt VAT?',
        answer: 'Zero-rated supplies are charged at 0% VAT, meaning you can still reclaim VAT on related costs. Exempt supplies have no VAT charged and you cannot reclaim VAT on costs. Zero-rated is generally more beneficial for businesses.'
      },
      {
        question: 'Do I need to include my VAT number on every invoice?',
        answer: 'Yes, if you are VAT-registered, you must include your VAT registration number on all VAT invoices. The format must start with GB followed by 9 or 12 digits (e.g., GB 123 4567 89).'
      },
      {
        question: 'What is Making Tax Digital (MTD) for VAT?',
        answer: 'MTD for VAT is HMRC\'s digital tax initiative requiring all VAT-registered businesses to keep digital records, maintain digital links between systems, and submit VAT returns using MTD-compatible software. It has been mandatory since April 2019.'
      },
      {
        question: 'Can I use simplified invoices for small transactions?',
        answer: 'Yes, for retail transactions under £250 (including VAT), you can issue simplified VAT invoices with reduced requirements. However, full VAT invoices are recommended for better record-keeping.'
      },
      {
        question: 'What is reverse charge VAT in construction?',
        answer: 'The domestic reverse charge for construction services means the customer (contractor) accounts for VAT directly to HMRC instead of the supplier charging it. It applies to CIS-registered construction services between VAT-registered businesses.'
      },
      {
        question: 'How long must I keep VAT invoice records?',
        answer: 'You must keep VAT records for at least 6 years from the end of the accounting period they relate to. Records can be kept digitally or on paper, but digital is required for MTD compliance.'
      }
    ],
    callToAction: {
      title: 'Create VAT-Compliant Invoices in Minutes',
      description: 'Use our free UK invoice generator with automatic VAT calculations, HMRC compliance, and Making Tax Digital integration.',
      primaryButton: {
        text: 'Generate VAT Invoice',
        href: '/invoice-generator'
      },
      secondaryButton: {
        text: 'View All Guide',
        href: '/uk-invoice-guides'
      }
    }
  },

  'cis-deduction': {
    slug: 'cis-deduction',
    title: 'CIS Deduction Guide: Construction Industry Scheme Invoices UK',
    description: 'Complete guide to CIS tax deductions for construction invoices. Learn CIS rates (20%, 30%), how to calculate deductions, and invoice requirements.',
    excerpt: 'Master the Construction Industry Scheme (CIS) with our comprehensive guide covering CIS rates, deduction calculations, invoice requirements, and HMRC compliance.',
    metaDescription: 'Complete CIS deduction guide for UK construction invoices. Learn CIS rates (20% registered, 30% unregistered), calculation methods, invoice requirements, and HMRC compliance for 2025.',
    keywords: [
      'CIS deduction',
      'Construction Industry Scheme',
      'CIS tax rates UK',
      'CIS invoice requirements',
      'CIS registered rate 20%',
      'CIS unregistered 30%',
      'gross payment status',
      'CIS calculation example',
      'subcontractor tax',
      'construction invoice UK'
    ],
    category: 'Tax',
    categoryIcon: '🏗️',
    icon: '🔨',
    publishedDate: '2024-10-20',
    updatedDate: '2024-10-20',
    author: 'Elektroluma Tax Team',
    readTime: 10,
    searchVolume: 1590, // CIS-related searches
    featured: true,
    relatedGuides: ['vat-compliant', 'reverse-charge-vat', 'subcontractor-invoicing'],
    content: [
      {
        id: 'intro',
        heading: 'What is the Construction Industry Scheme (CIS)?',
        content: `The Construction Industry Scheme (CIS) is a tax deduction scheme that applies to payments made by contractors to subcontractors for construction work in the UK. Under CIS, contractors must deduct tax from subcontractors' payments and pay it directly to HMRC.

**Why CIS exists:**
CIS ensures that construction workers and businesses pay the right amount of income tax and National Insurance. It combats tax evasion in the construction industry by collecting tax at source, similar to PAYE for employees.

**Who must operate CIS:**
• Contractors (businesses paying for construction work)
• Subcontractors (individuals or companies doing the work)
• Only applies to construction work in the UK

**This guide covers:**
• CIS tax deduction rates and when they apply
• How to calculate CIS deductions correctly
• Invoice requirements for CIS compliance
• Registration process and gross payment status
• Common mistakes and how to avoid them
• Real invoice examples with calculations`,
        callout: {
          type: 'info',
          title: 'CIS in Simple Terms',
          content: 'Think of CIS as "pay-as-you-earn" for construction workers. Instead of subcontractors paying all their tax at the end of the year, contractors deduct tax from each payment and send it to HMRC on their behalf.'
        }
      },
      {
        id: 'cis-rates',
        heading: 'CIS Tax Deduction Rates: Complete Breakdown',
        content: `There are three CIS deduction rates depending on the subcontractor's registration status with HMRC.`,
        subsections: [
          {
            heading: '1. CIS Registered (20%) - Most Common',
            content: `**Rate:** 20% deduction from gross payment (including VAT)

**Who it applies to:**
Subcontractors who are registered with HMRC for CIS. This is the most common rate in the construction industry.

**How to register:**
• Apply online at gov.uk/register-for-cis
• Provide UTR (Unique Taxpayer Reference)
• Business registration details
• Bank account information

**Calculation example:**
• Net invoice amount: £2,500
• VAT (20%): £500
• Total including VAT: £3,000
• CIS deduction (20%): £600
• **Amount paid to subcontractor: £2,400**

**Benefits of being registered:**
• Lower deduction rate (20% vs 30%)
• Easier to claim tax refunds
• Professional appearance
• Compliance with HMRC requirements`
          },
          {
            heading: '2. CIS Not Registered (30%) - Higher Rate',
            content: `**Rate:** 30% deduction from gross payment (including VAT)

**Who it applies to:**
Subcontractors who are NOT registered with HMRC for CIS. This higher rate incentivizes registration.

**Calculation example:**
• Net invoice amount: £2,500
• VAT (20%): £500
• Total including VAT: £3,000
• CIS deduction (30%): £900
• **Amount paid to subcontractor: £2,100**

**Why the higher rate:**
• Incentive to register for CIS
• Covers potential tax liability
• Protects HMRC from tax evasion

**Important:** Even at 30% rate, subcontractors can reclaim overpaid tax through Self Assessment returns.`
          },
          {
            heading: '3. Gross Payment Status (0%) - No Deduction',
            content: `**Rate:** 0% - No CIS deduction applied

**Who it applies to:**
Subcontractors who have been granted "gross payment status" by HMRC. This is rare and requires meeting strict criteria.

**Eligibility requirements:**
• Been in business for at least 12 months under CIS
• Annual turnover of at least £30,000 (£100,000 for companies)
• Compliance test passed (tax returns up to date)
• Skills test passed (relevant qualifications)

**Benefits:**
• Receive full payment without deductions
• Better cash flow
• Trust from HMRC

**Calculation example:**
• Net invoice amount: £2,500
• VAT (20%): £500
• Total including VAT: £3,000
• CIS deduction (0%): £0
• **Amount paid to subcontractor: £3,000**

**Maintaining gross payment status:**
• Submit tax returns on time
• Pay tax when due
• Maintain compliance records
• Status reviewed annually by HMRC`
          }
        ],
        table: {
          headers: ['CIS Status', 'Deduction Rate', 'Who It Applies To', 'Amount Received (on £3,000)'],
          rows: [
            ['Gross Payment', '0%', 'HMRC-approved subcontractors', '£3,000 (100%)'],
            ['CIS Registered', '20%', 'HMRC CIS registered', '£2,400 (80%)'],
            ['Not Registered', '30%', 'Unregistered subcontractors', '£2,100 (70%)']
          ]
        }
      },
      {
        id: 'calculation',
        heading: 'How to Calculate CIS Deductions: Step-by-Step',
        content: `CIS deductions are calculated AFTER VAT is added. This is crucial for correct calculations.`,
        subsections: [
          {
            heading: 'Step 1: Calculate Net Amount',
            content: `Start with your labour and materials costs:
• Labour: £2,000
• Materials: £500
• **Net amount: £2,500**`
          },
          {
            heading: 'Step 2: Add VAT (If Applicable)',
            content: `If you're VAT-registered, add VAT to net amount:
• Net amount: £2,500
• VAT (20%): £500
• **Total including VAT: £3,000**

Note: VAT is usually 20% unless reverse charge applies (see Reverse Charge VAT guide).`
          },
          {
            heading: 'Step 3: Calculate CIS Deduction',
            content: `Apply CIS rate to TOTAL including VAT:

**For 20% rate (CIS registered):**
• Total including VAT: £3,000
• CIS deduction (20%): £600
• **Amount to receive: £2,400**

**For 30% rate (not registered):**
• Total including VAT: £3,000
• CIS deduction (30%): £900
• **Amount to receive: £2,100**`
          },
          {
            heading: 'Step 4: Calculate Amount Due',
            content: `Final amount payable to subcontractor:
• Total including VAT: £3,000
• Less CIS deduction: -£600
• **Net payment: £2,400**

The contractor pays £2,400 to the subcontractor and £600 directly to HMRC on their behalf.`
          }
        ],
        callout: {
          type: 'warning',
          title: 'Critical: VAT Before CIS',
          content: 'ALWAYS calculate CIS deduction on the total AFTER adding VAT. A common mistake is calculating CIS on the net amount before VAT, which results in incorrect deductions.'
        }
      },
      {
        id: 'invoice-requirements',
        heading: 'CIS Invoice Requirements: What You Must Include',
        content: `CIS invoices must include specific information beyond standard invoices.`,
        list: {
          type: 'checklist',
          items: [
            '**Sequential invoice number** - Unique identifier (e.g., BUILD-2024-001)',
            '**Invoice date** - Date invoice was issued',
            '**Your business name and address** - Full registered details',
            '**Your UTR (Unique Taxpayer Reference)** - 10-digit HMRC tax reference',
            '**Contractor name and address** - Who is paying you',
            '**Contractor UTR** - Their Unique Taxpayer Reference',
            '**Description of work** - What construction work was done',
            '**Work period covered** - Dates work was performed',
            '**Net amount for materials** - Cost of materials (if applicable)',
            '**Net amount for labour** - Cost of labour',
            '**VAT amount** - Total VAT charged (if VAT-registered)',
            '**Total amount including VAT** - Gross amount before CIS',
            '**CIS deduction rate and amount** - State rate (20% or 30%) and £ amount',
            '**Net amount payable** - Final amount after CIS deduction'
          ]
        }
      },
      {
        id: 'materials-vs-labour',
        heading: 'Materials vs Labour: The CIS Split',
        content: `CIS deductions apply to labour costs, but the treatment of materials is complex.

**Key rule:** CIS deductions apply to the TOTAL payment including materials, unless specific exemptions apply.

**Common scenarios:**`,
        subsections: [
          {
            heading: 'Scenario 1: Materials Supplied by Contractor',
            content: `If the contractor provides materials, you only invoice for labour:
• Your invoice: Labour only
• CIS applied: To labour amount + VAT
• Materials: Not on your invoice`
          },
          {
            heading: 'Scenario 2: Materials Supplied by Subcontractor (Most Common)',
            content: `If you supply materials as part of the job:
• Your invoice: Labour + materials
• CIS applied: To TOTAL (labour + materials + VAT)
• No materials exemption for small amounts

**Example:**
• Labour: £2,000
• Materials: £500
• Net total: £2,500
• VAT (20%): £500
• Total inc VAT: £3,000
• CIS (20%): £600 (applied to full £3,000)
• Amount paid: £2,400`
          },
          {
            heading: 'Scenario 3: Large Materials Purchases (Exemption)',
            content: `Materials CAN be excluded from CIS if:
• You buy materials directly from merchant
• Merchant invoices contractor directly
• Materials are delivered to site
• Materials are clearly identifiable as separate

**How to handle:**
• Materials: Separate invoice from merchant to contractor
• Labour: Your invoice with CIS deduction
• Benefit: CIS only on labour, not materials`
          }
        ],
        callout: {
          type: 'info',
          title: 'Best Practice: Separate Materials',
          content: 'For large projects, ask contractors to pay merchants directly for materials. This means CIS deductions only apply to your labour, improving your cash flow.'
        }
      },
      {
        id: 'reverse-charge',
        heading: 'CIS and Reverse Charge VAT',
        content: `Construction services under CIS are also subject to the domestic reverse charge for VAT (introduced March 2021).

**How they work together:**
1. **Subcontractor issues invoice:** No VAT charged (reverse charge)
2. **Contractor accounts for VAT:** Pays VAT to HMRC directly
3. **CIS deduction calculated:** On the amount that WOULD have included VAT

**Example calculation with reverse charge:**
• Net amount: £2,500
• VAT: £0 (reverse charge - contractor accounts for £500)
• Notional total inc VAT: £3,000
• CIS deduction (20%): £600 (calculated on £3,000)
• **Amount paid to subcontractor: £1,900**

**Invoice wording:**
"Reverse charge VAT applies. Customer must account for £500 VAT to HMRC.
CIS deduction of £600 (20%) calculated on notional total of £3,000 including VAT."`,
        callout: {
          type: 'warning',
          title: 'Complex Interaction',
          content: 'Reverse charge and CIS together can be confusing. The key is that CIS is calculated on what the total WOULD have been with VAT, even though no VAT is actually charged on the invoice.'
        }
      },
      {
        id: 'examples',
        heading: 'CIS Invoice Examples',
        content: `See real-world CIS invoice examples with detailed calculations.`,
        subsections: [
          {
            heading: 'Example 1: CIS Registered (20%) - Standard Invoice',
            content: `**Builder Subcontractors Ltd**
45 Construction Way, Leeds, LS1 1AA
UTR: 1234567890

**Invoice To:**
Main Contractor Ltd
89 Site Road, Leeds, LS2 2BB
UTR: 0987654321

Invoice Number: BUILD-2024-0089
Invoice Date: 20/10/2024
Work Period: 13/10/2024 - 18/10/2024

**Description of Work:**
Brickwork for single-storey extension

| Item | Quantity | Rate | Amount |
|------|----------|------|--------|
| Labour - Bricklaying | 40 hours | £40.00 | £1,600.00 |
| Labour - Labourer | 20 hours | £20.00 | £400.00 |
| Materials - Bricks | 1,000 | £0.50 | £500.00 |

**Net Amount:** £2,500.00
**VAT (20%):** £500.00
**Total Including VAT:** £3,000.00

**CIS Deduction (20%):** £600.00
**Amount Payable to Subcontractor:** £2,400.00

Note: Contractor will pay £2,400.00 to subcontractor and £600.00 to HMRC on their behalf.`
          },
          {
            heading: 'Example 2: CIS Not Registered (30%)',
            content: `**Joe Builder (Sole Trader)**
12 Trade Street, Manchester, M1 1AA
UTR: 5555666677

**Invoice To:**
Construction Co Ltd
UTR: 888899990

Invoice Number: JB-2024-045
Invoice Date: 20/10/2024

**Description:** Plastering works - living room and hallway

| Item | Amount |
|------|--------|
| Labour | £800.00 |
| Materials (plaster, beads) | £150.00 |

**Net Amount:** £950.00
**VAT (20%):** £190.00
**Total Including VAT:** £1,140.00

**CIS Deduction (30% - Not CIS Registered):** £342.00
**Amount Payable:** £798.00

Note: As I am not CIS registered, a 30% deduction applies. I can reclaim any overpaid tax through my Self Assessment return.`
          },
          {
            heading: 'Example 3: Gross Payment Status (0%)',
            content: `**Premier Construction Services Ltd**
78 Builder's Row, Birmingham, B1 1AA
UTR: 7777888899
**Gross Payment Status Verified**

**Invoice To:**
Development Co Ltd
UTR: 111122223

Invoice Number: PCS-2024-0234
Invoice Date: 20/10/2024

**Construction Work:** Full electrical rewire - 3-bed house

| Item | Amount |
|------|--------|
| Labour and testing | £3,500.00 |
| Materials | £1,200.00 |

**Net Amount:** £4,700.00
**VAT (20%):** £940.00
**Total Amount Payable:** £5,640.00

**CIS Deduction:** £0.00 (Gross Payment Status)

**Full Payment Due:** £5,640.00

Note: This company has HMRC-verified gross payment status. No CIS deduction applies.`
          },
          {
            heading: 'Example 4: CIS with Reverse Charge VAT',
            content: `**Advanced Builders Ltd**
34 Construction Ave, London, EC1A 1BB
VAT No: GB 123 4567 89
UTR: 9999888877

**Invoice To:**
Main Contractors PLC
VAT No: GB 987 6543 21
UTR: 777766665

Invoice Number: AB-2024-0167
Invoice Date: 20/10/2024

**Construction Work:** Groundwork and foundations

| Item | Amount |
|------|--------|
| Labour | £6,000.00 |
| Materials | £2,000.00 |

**Net Amount:** £8,000.00
**VAT:** £0.00 (REVERSE CHARGE APPLIES - See note below)
**Notional Total (inc VAT):** £9,600.00

**CIS Deduction (20%):** £1,920.00
**Amount Payable to Subcontractor:** £6,080.00

**REVERSE CHARGE NOTICE:**
This invoice is subject to the domestic reverse charge for construction services. Customer must account for £1,600.00 VAT directly to HMRC. CIS deduction of £1,920.00 (20%) is calculated on the notional total of £9,600.00 (including VAT)}`
          }
        ]
      },
      {
        id: 'contractor-duties',
        heading: 'Contractor Responsibilities Under CIS',
        content: `If you're a contractor (paying subcontractors), you have specific duties under CIS.`,
        list: {
          type: 'ordered',
          items: [
            '**Verify subcontractors with HMRC** - Check their CIS status before first payment',
            '**Deduct correct tax rate** - Apply 20%, 30%, or 0% based on verification',
            '**Pay deducted tax to HMRC** - Submit monthly CIS returns and pay deductions',
            '**Provide payment statements** - Give subcontractors detailed deduction statements',
            '**Keep accurate records** - Maintain records of all CIS verifications and payments',
            '**File monthly CIS returns** - Submit returns to HMRC by 19th of following month',
            '**Issue annual statements** - Provide subcontractors with year-end tax summaries'
          ]
        },
        callout: {
          type: 'danger',
          title: 'Penalties for Non-Compliance',
          content: 'Contractors face penalties for: Not verifying subcontractors (£3,000+ per failure), Late CIS returns (£100-£400), Late CIS payments (interest and penalties), Incorrect deductions (HMRC assessment and penalties).'
        }
      },
      {
        id: 'reclaiming-tax',
        heading: 'How Subcontractors Reclaim CIS Deductions',
        content: `CIS deductions are advance payments of your income tax. You can reclaim overpayments through Self Assessment.

**Step 1: Track Your Deductions**
Keep all:
• CIS payment and deduction statements from contractors
• Monthly CIS statements
• Year-end CIS tax summaries

**Step 2: File Self Assessment Tax Return**
Report all:
• Total payments received
• Total CIS deductions made
• Other income and expenses
• Allowances and reliefs

**Step 3: HMRC Calculates Your Tax Bill**
They'll work out:
• Your actual tax liability for the year
• Total CIS already paid
• Any refund due or additional tax owed

**Step 4: Receive Refund (If Applicable)**
• If CIS deductions exceed actual tax: HMRC refunds you
• If more tax owed: You pay the difference
• Usually processed within 4-6 weeks

**Example:**
• Total payments received: £30,000
• CIS deductions paid (20%): £6,000
• Actual income tax due: £4,000
• **Refund due: £2,000**`,
        callout: {
          type: 'success',
          title: 'Maximize Your Refund',
          content: 'Claim all allowable business expenses (tools, van, fuel, insurance, training) to reduce your tax bill and increase your CIS refund. Keep detailed records of all expenses.'
        }
      },
      {
        id: 'common-mistakes',
        heading: 'Common CIS Mistakes and How to Avoid Them',
        content: `Learn from common errors in CIS invoicing and compliance.`,
        subsections: [
          {
            heading: '1. Calculating CIS on Net Amount (Before VAT)',
            content: `**Mistake:** CIS deduction = £2,500 × 20% = £500 (wrong!)
**Correct:** CIS deduction = £3,000 (inc VAT) × 20% = £600
**Impact:** Undercharging contractor, losing £100
**Solution:** ALWAYS add VAT first, then calculate CIS`
          },
          {
            heading: '2. Not Including UTR Numbers',
            content: `**Mistake:** Missing your UTR or contractor's UTR on invoice
**Impact:** Non-compliant invoice, rejected by contractor's accounts
**Solution:** Always include both UTRs on every CIS invoice`
          },
          {
            heading: '3. Confusing Materials Exemption Rules',
            content: `**Mistake:** Assuming materials are always CIS-exempt
**Impact:** Dispute with contractor over deductions
**Solution:** CIS applies to total unless materials are separately invoiced by merchant`
          },
          {
            heading: '4. Not Verifying CIS Status with HMRC',
            content: `**Mistake (Contractors):** Assuming subcontractor is registered without checking
**Impact:** Wrong deduction rate applied, HMRC penalties
**Solution:** ALWAYS verify with HMRC before first payment using CIS verification service`
          },
          {
            heading: '5. Missing Monthly CIS Deadlines',
            content: `**Mistake (Contractors):** Late submission of monthly CIS returns
**Impact:** £100-£400 penalties per late return
**Solution:** Set up calendar reminders for 19th of each month deadline`
          }
        ]
      },
      {
        id: 'summary',
        heading: 'CIS Deduction Summary: Key Points',
        content: `Understanding CIS is crucial for construction industry compliance. Here are the essential takeaways:`,
        list: {
          type: 'ordered',
          items: [
            'CIS has three rates: 0% (gross payment), 20% (registered), 30% (not registered)',
            'ALWAYS calculate CIS on the total AFTER adding VAT',
            'Include both your UTR and contractor UTR on every invoice',
            'CIS deductions are advance payments of income tax - you can reclaim overpayments',
            'Materials are usually included in CIS calculation unless separately invoiced',
            'Reverse charge VAT and CIS can apply together (complex but manageable)',
            'Contractors must verify subcontractors with HMRC before paying',
            'Keep detailed records of all CIS statements and deductions',
            'File Self Assessment to reclaim any overpaid CIS deductions',
            'Gross payment status requires meeting strict HMRC criteria'
          ]
        }
      }
    ],
    faq: [
      {
        question: 'What is the CIS deduction rate in the UK?',
        answer: 'CIS deduction rates are: 20% for CIS-registered subcontractors (most common), 30% for unregistered subcontractors, and 0% for those with gross payment status.'
      },
      {
        question: 'Is CIS deduction calculated before or after VAT?',
        answer: 'CIS deduction is calculated AFTER VAT is added. You must add 20% VAT to the net amount first, then apply the CIS deduction rate to the total including VAT.'
      },
      {
        question: 'Can I reclaim CIS deductions?',
        answer: 'Yes. CIS deductions are advance payments of your income tax. If the total CIS deducted exceeds your actual tax liability, you can reclaim the overpayment through your Self Assessment tax return.'
      },
      {
        question: 'Do I need to be CIS registered?',
        answer: 'While not legally required, CIS registration is highly recommended for subcontractors. It reduces your deduction rate from 30% to 20%, saving you significant money and improving cash flow.'
      },
      {
        question: 'What is gross payment status?',
        answer: 'Gross payment status allows subcontractors to receive payments without CIS deductions. It requires meeting strict HMRC criteria including 12+ months trading, £30k+ turnover, and passing compliance tests.'
      },
      {
        question: 'Does CIS apply to materials?',
        answer: 'Usually yes. CIS deductions apply to the total payment including materials, unless the materials are supplied separately by a merchant who invoices the contractor directly.'
      },
      {
        question: 'What happens if I do not register for CIS?',
        answer: 'If you are not CIS registered, contractors must deduct 30% from your payments instead of 20%. This significantly reduces your take-home pay, though you can reclaim overpayments via Self Assessment.'
      },
      {
        question: 'How do CIS and reverse charge VAT work together?',
        answer: 'When both apply, the invoice shows no VAT (reverse charge), but CIS deduction is calculated on the amount that would have included VAT. The contractor accounts for VAT separately to HMRC.'
      }
    ],
    callToAction: {
      title: 'Create CIS-Compliant Construction Invoices',
      description: 'Generate professional construction invoices with automatic CIS calculations, VAT handling, and HMRC compliance built in.',
      primaryButton: {
        text: 'Generate CIS Invoice',
        href: '/invoice-generator/construction-invoice'
      },
      secondaryButton: {
        text: 'View All Guides',
        href: '/uk-invoice-guides'
      }
    }
  }

  // MORE GUIDES TO BE ADDED: gas-safe-registered, niceic-registered, mtd-compliance, etc.
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all guide articles
 */
export function getAllGuides(): GuideArticle[] {
  return Object.values(guideArticles);
}

/**
 * Get guide by slug
 */
export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return guideArticles[slug];
}

/**
 * Get all guide slugs for static generation
 */
export function getAllGuideSlugs(): string[] {
  return Object.keys(guideArticles);
}

/**
 * Get featured guides
 */
export function getFeaturedGuides(limit: number = 3): GuideArticle[] {
  return Object.values(guideArticles)
    .filter(guide => guide.featured)
    .slice(0, limit);
}

/**
 * Get guides by category
 */
export function getGuidesByCategory(category: string): GuideArticle[] {
  return Object.values(guideArticles).filter(guide => guide.category === category);
}

/**
 * Get related guides based on categories and keywords
 */
export function getRelatedGuides(guide: GuideArticle, limit: number = 3): GuideArticle[] {
  const related = Object.values(guideArticles)
    .filter(g => g.slug !== guide.slug)
    .map(g => {
      let score = 0;
      
      // Same category = +10 points
      if (g.category === guide.category) score += 10;
      
      // Shared keywords = +1 point each
      const sharedKeywords = g.keywords.filter(k => guide.keywords.includes(k));
      score += sharedKeywords.length;
      
      // Explicitly related = +20 points
      if (guide.relatedGuides.includes(g.slug)) score += 20;
      
      return { guide: g, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.guide);
  
  return related;
}

/**
 * Get guide categories with counts
 */
export function getGuideCategories(): Array<{ name: string; count: number; icon: string }> {
  const categories: Record<string, { count: number; icon: string }> = {};
  
  Object.values(guideArticles).forEach(guide => {
    if (!categories[guide.category]) {
      categories[guide.category] = { count: 0, icon: guide.categoryIcon };
    }
    categories[guide.category].count++;
  });
  
  return Object.entries(categories).map(([name, data]) => ({
    name,
    count: data.count,
    icon: data.icon
  }));
}

/**
 * Get guide statistics
 */
export function getGuideStats() {
  const guides = Object.values(guideArticles);
  
  return {
    totalGuides: guides.length,
    totalSearchVolume: guides.reduce((sum, g) => sum + g.searchVolume, 0),
    totalKeywords: [...new Set(guides.flatMap(g => g.keywords))].length,
    categories: Object.keys([...new Set(guides.map(g => g.category))]).length,
    averageReadTime: Math.round(guides.reduce((sum, g) => sum + g.readTime, 0) / guides.length)
  };
}

/**
 * Search guides by keyword
 */
export function searchGuides(query: string): GuideArticle[] {
  const lowerQuery = query.toLowerCase();
  
  return Object.values(guideArticles).filter(guide =>
    guide.title.toLowerCase().includes(lowerQuery) ||
    guide.description.toLowerCase().includes(lowerQuery) ||
    guide.keywords.some(kw => kw.toLowerCase().includes(lowerQuery)) ||
    guide.content.some(section => 
      section.heading.toLowerCase().includes(lowerQuery) ||
      section.content.toLowerCase().includes(lowerQuery)
    )
  );
}

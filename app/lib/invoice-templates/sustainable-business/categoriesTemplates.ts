/**
 * Sustainable Business Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Sustainable Business industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 2 (2 free, 0 premium)
 * - Categories: 2 (Green Energy & Solar, Sustainability Consulting)
 * - Total Search Volume: 27,400/month
 * - Average CPC: $6.38
 * - SEO Difficulty: Medium-High (58.5)
 */

import { InvoiceField, IndustryStandard } from '../../invoiceTemplateLibrary';
import { IndustryMetadata } from '../invoiceTemplateIndustries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface SustainableBusinessTemplate {
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

export interface SustainableBusinessCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: SustainableBusinessTemplate[];
}

// ============================================================================
// SUSTAINABLE BUSINESS SPECIFIC FIELDS
// ============================================================================

export const sustainableBusinessFields = {
  systemCapacity: {
    fieldName: 'systemCapacity',
    label: 'System Capacity',
    type: 'text' as const,
    required: false,
    placeholder: '4.8kW',
    helpText: 'Total solar system capacity'
  },
  mcsNumber: {
    fieldName: 'mcsNumber',
    label: 'MCS Certification Number',
    type: 'text' as const,
    required: false,
    placeholder: 'MCS-NAP-12345',
    helpText: 'Microgeneration Certification Scheme number'
  },
  warrantyPeriod: {
    fieldName: 'warrantyPeriod',
    label: 'Warranty Period',
    type: 'text' as const,
    required: false,
    placeholder: '25 years (panels) / 10 years (inverter)',
    helpText: 'Equipment warranty details'
  },
  segEligible: {
    fieldName: 'segEligible',
    label: 'SEG Eligible',
    type: 'text' as const,
    required: false,
    placeholder: 'Yes - Smart Export Guarantee eligible',
    helpText: 'Smart Export Guarantee eligibility'
  },
  carbonReduction: {
    fieldName: 'carbonReduction',
    label: 'Carbon Reduction',
    type: 'text' as const,
    required: false,
    placeholder: '2.5 tonnes CO2e per year',
    helpText: 'Estimated annual carbon savings'
  },
  assessmentScope: {
    fieldName: 'assessmentScope',
    label: 'Assessment Scope',
    type: 'text' as const,
    required: false,
    placeholder: 'Scope 1, 2, and 3 emissions',
    helpText: 'GHG Protocol scope coverage'
  },
  methodology: {
    fieldName: 'methodology',
    label: 'Methodology',
    type: 'text' as const,
    required: false,
    placeholder: 'GHG Protocol Corporate Standard',
    helpText: 'Carbon accounting methodology used'
  },
  reportingFramework: {
    fieldName: 'reportingFramework',
    label: 'Reporting Framework',
    type: 'text' as const,
    required: false,
    placeholder: 'TCFD, CDP, GRI Standards',
    helpText: 'Sustainability reporting framework'
  }
};

// ============================================================================
// CATEGORY: GREEN ENERGY & SOLAR
// ============================================================================

export const greenEnergySolar: SustainableBusinessCategory = {
  id: 'green-energy-solar',
  name: 'Green Energy & Solar',
  description: 'Invoice templates for solar installers, renewable energy contractors, and green energy consultants',
  icon: '☀️',
  templates: [
    {
      id: 'solar-installation-invoice',
      categoryId: 'green-energy-solar',
      categoryName: 'Green Energy & Solar',
      name: 'Solar Installation Invoice Template',
      description: 'Specialized invoice template for solar installers with equipment costs, installation labor, permits, and incentive tracking',
      tier: 'free',
      searchVolume: 15700,
      cpc: 7.20,
      difficulty: 62,
      keywords: [
        'solar installation invoice',
        'solar panel invoice',
        'renewable energy invoice',
        'solar contractor invoice',
        'green energy billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'solar-installation-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text', required: true, placeholder: 'SOL-2024-001', helpText: 'Unique invoice identifier' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date', required: true, helpText: 'Date invoice issued' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date', required: true, helpText: 'Payment due date' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text', required: true, placeholder: 'GreenPower Solar Ltd', helpText: 'Your solar company name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea', required: true, placeholder: '123 Green Street, London, UK', helpText: 'Your company address' },
        { fieldName: 'businessEmail', label: 'Business Email', type: 'email', required: true, placeholder: 'info@greenpower.co.uk', helpText: 'Contact email' },
        { fieldName: 'clientName', label: 'Client Name', type: 'text', required: true, placeholder: 'Mr John Smith', helpText: 'Customer name' },
        { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea', required: true, placeholder: '45 Residential Road, Manchester, UK', helpText: 'Installation address' },
        { fieldName: 'projectName', label: 'Project Name', type: 'text', required: true, placeholder: '4.8kW Residential Solar Installation', helpText: 'Project description' },
        sustainableBusinessFields.systemCapacity,
        { fieldName: 'lineItems', label: 'Line Items', type: 'textarea', required: true, helpText: 'Equipment and labor breakdown' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency', required: true, helpText: 'Total before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency', required: true, helpText: 'Final amount due' }
      ],
      optionalFields: [
        { fieldName: 'businessPhone', label: 'Business Phone', type: 'phone', required: false, placeholder: '+44 20 1234 5678', helpText: 'Contact phone' },
        { fieldName: 'companyNumber', label: 'Company Registration Number', type: 'text', required: false, placeholder: '12345678', helpText: 'Companies House number' },
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text', required: false, placeholder: 'GB123456789', helpText: 'VAT registration' },
        sustainableBusinessFields.mcsNumber,
        sustainableBusinessFields.warrantyPeriod,
        sustainableBusinessFields.segEligible,
        sustainableBusinessFields.carbonReduction,
        { fieldName: 'clientEmail', label: 'Client Email', type: 'email', required: false, helpText: 'Customer email' },
        { fieldName: 'vatAmount', label: 'VAT Amount', type: 'currency', required: false, helpText: 'VAT charge (currently 0% for solar)' },
        { fieldName: 'bankName', label: 'Bank Name', type: 'text', required: false, placeholder: 'Barclays Bank', helpText: 'Your bank' },
        { fieldName: 'accountNumber', label: 'Account Number', type: 'text', required: false, placeholder: '12345678', helpText: 'Bank account number' },
        { fieldName: 'sortCode', label: 'Sort Code', type: 'text', required: false, placeholder: '12-34-56', helpText: 'Bank sort code' },
        { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea', required: false, placeholder: '50% deposit, 50% on completion', helpText: 'Payment schedule' },
        { fieldName: 'notes', label: 'Notes', type: 'textarea', required: false, placeholder: 'Installation includes 25-year warranty', helpText: 'Additional information' }
      ],
      industryStandards: [
        {
          standard: 'MCS Certification',
          description: 'Microgeneration Certification Scheme (MCS) certification is required for installations to be eligible for Smart Export Guarantee (SEG) payments. Include MCS certificate number on invoice.',
          complianceLevel: 'required'
        },
        {
          standard: 'Equipment Specifications',
          description: 'Detail solar panel wattage, inverter specifications, battery capacity (if applicable), and total system capacity in kW. Include manufacturer model numbers and warranties.',
          complianceLevel: 'required'
        },
        {
          standard: 'VAT Zero Rating',
          description: 'Solar panel installations for residential properties are currently VAT-exempt (0% VAT rate) in the UK as of 2024. Clearly state "VAT rate: 0% - renewable energy installation".',
          complianceLevel: 'required'
        },
        {
          standard: 'Building Regulations Compliance',
          description: 'Confirm electrical work complies with Building Regulations Part P. Include electrical installation certificate reference and installer registration details (e.g., NICEIC, NAPIT).',
          complianceLevel: 'required'
        },
        {
          standard: 'Smart Export Guarantee Eligibility',
          description: 'Reference SEG eligibility if system is MCS certified. Customer can earn payments for surplus electricity exported to grid. Provide guidance on SEG tariff registration.',
          complianceLevel: 'recommended'
        }
      ],
      sampleData: {
        invoiceNumber: 'SOL-2024-0089',
        invoiceDate: '2024-09-15',
        dueDate: '2024-10-15',
        businessName: 'GreenPower Solar Ltd',
        businessAddress: '45 Innovation Park, Milton Keynes, MK9 3AB',
        businessEmail: 'invoices@greenpower-solar.co.uk',
        businessPhone: '+44 1908 765 432',
        companyNumber: '09876543',
        vatNumber: 'GB987654321',
        mcsNumber: 'MCS-NAP-12345',
        clientName: 'Mr David Thompson',
        clientAddress: '78 Oakwood Drive, Cambridge, CB4 1XY',
        clientEmail: 'david.thompson@email.com',
        projectName: '4.8kW Residential Solar Installation with Battery Storage',
        systemCapacity: '4.8kW',
        warrantyPeriod: '25 years (panels) / 10 years (inverter) / 10 years (battery)',
        segEligible: 'Yes - System is MCS certified and eligible for Smart Export Guarantee payments',
        carbonReduction: 'Estimated 2.5 tonnes CO2e reduction per year',
        lineItems: [
          { description: 'Solar panels (12x 400W monocrystalline panels)', quantity: 12, rate: 280.00, amount: 3360.00 },
          { description: 'Hybrid inverter (5kW Growatt SPH5000)', quantity: 1, rate: 1800.00, amount: 1800.00 },
          { description: 'Battery storage system (10kWh Pylontech US3000C)', quantity: 1, rate: 4500.00, amount: 4500.00 },
          { description: 'Mounting system and rails (roof-mounted)', quantity: 1, rate: 420.00, amount: 420.00 },
          { description: 'Installation labor (2-day installation)', quantity: 2, rate: 800.00, amount: 1600.00 },
          { description: 'Scaffolding and safety equipment hire', quantity: 1, rate: 450.00, amount: 450.00 },
          { description: 'Electrical certification and DNO notification', quantity: 1, rate: 350.00, amount: 350.00 },
          { description: 'MCS certification processing', quantity: 1, rate: 180.00, amount: 180.00 }
        ],
        subtotal: 12660.00,
        vatAmount: 0.00,
        vatRate: '0% - Renewable energy installation (VAT zero-rated)',
        totalAmount: 12660.00,
        bankName: 'Barclays Bank',
        accountNumber: '12345678',
        sortCode: '20-12-34',
        paymentTerms: '50% deposit (£6,330) due on contract signing. Remaining 50% due within 14 days of installation completion and MCS certification issue.',
        notes: 'Installation includes:\n• 25-year performance warranty on solar panels\n• 10-year manufacturer warranty on inverter and battery\n• 2-year workmanship guarantee\n• MCS certification for Smart Export Guarantee eligibility\n• Building Regulations compliance certificate\n• DNO (Distribution Network Operator) approval\n\nEstimated annual generation: 4,200kWh\nEstimated annual savings: £1,050 (based on current electricity rates)\nEstimated payback period: 10-12 years\n\nThank you for choosing GreenPower Solar. Please contact us with any questions about your new solar system.'
      },
      industrySpecific: {
        serviceTypes: [
          'Residential Solar Installation',
          'Commercial Solar Systems',
          'Battery Storage Integration',
          'Solar Panel Maintenance',
          'System Upgrades',
          'Off-Grid Solutions',
          'Solar Carports',
          'Ground-Mounted Arrays',
          'Hybrid Solar Systems',
          'Solar Water Heating',
          'EV Charger Integration',
          'Energy Management Systems'
        ],
        certifications: [
          'MCS (Microgeneration Certification Scheme)',
          'NICEIC Approved Contractor',
          'NAPIT Registered',
          'RECC (Renewable Energy Consumer Code) Member',
          'TrustMark Government Endorsed',
          'Part P Building Regulations',
          'ECS (Electrotechnical Certification Scheme)',
          'BPEC Solar Photovoltaic',
          'City & Guilds 2399',
          'ISO 9001 Quality Management'
        ],
        deliverables: [
          'Solar panel installation',
          'Inverter configuration',
          'Battery storage setup',
          'Electrical certifications',
          'MCS certification',
          'DNO G98/G99 notification',
          'System commissioning',
          'Performance testing',
          'User training',
          'Warranty documentation',
          'SEG registration guidance',
          'Maintenance schedule'
        ]
      },
      businessBenefits: [
        'Zero VAT Rate: Makes solar installations 20% more affordable for residential customers, driving higher sales conversions',
        'MCS Certification Tracking: Ensures Smart Export Guarantee eligibility, adding compelling value proposition for customers',
        'Detailed Equipment Specs: Builds customer confidence and justifies premium pricing for quality components',
        'Clear Warranty Information: Reduces post-installation support queries and demonstrates professional service standards',
        'Carbon Reduction Metrics: Helps customers understand environmental impact and achieve corporate sustainability goals',
        'Professional Invoice Format: Establishes credibility with commercial clients and property developers, winning larger contracts',
        'Flexible Payment Terms: Manages cash flow with deposit + completion structure while protecting both parties',
        'SEG Eligibility Details: Provides additional revenue stream for customers, strengthening value proposition and sales pitch',
        'Compliance Documentation: Demonstrates Building Regulations and DNO adherence, reducing liability risk and legal concerns',
        'Itemized Cost Breakdown: Justifies pricing and reduces objections from informed customers researching solar investments',
        'Energy Savings Estimates: Helps customers calculate ROI and payback period, facilitating confident purchasing decisions',
        'Government Scheme Integration: Positions business as knowledgeable industry leader familiar with MCS and SEG programs'
      ],
      useCases: [
        'Residential rooftop solar panel installation for homeowners seeking energy independence',
        'Commercial solar system for small businesses reducing operational costs',
        'Solar panel installation with battery storage for off-grid capability during power cuts',
        'Retrofit solar system upgrade adding battery storage to existing panels',
        'New build property solar installation meeting building regulation renewable energy requirements',
        'Agricultural solar installation for farms powering equipment and irrigation systems',
        'Solar carport installation providing covered parking with energy generation',
        'Ground-mounted solar array for properties with unsuitable roof space',
        'Community building solar installation (schools, churches, community centers)',
        'Holiday let property solar system improving EPC rating and reducing running costs',
        'Hybrid solar system with grid connection and battery backup for critical loads',
        'EV charger integration with solar panels for sustainable electric vehicle charging',
        'Solar water heating system combined with photovoltaic panels',
        'Solar panel maintenance and cleaning service for existing installations',
        'Solar system expansion adding panels and storage to increase capacity'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY: SUSTAINABILITY CONSULTING
// ============================================================================

export const sustainabilityConsulting: SustainableBusinessCategory = {
  id: 'sustainability-consulting',
  name: 'Sustainability Consulting',
  description: 'Invoice templates for sustainability consultants, environmental analysts, and ESG advisors',
  icon: '♻️',
  templates: [
    {
      id: 'sustainability-consulting-invoice',
      categoryId: 'sustainability-consulting',
      categoryName: 'Sustainability Consulting',
      name: 'Free Sustainability Consulting Invoice Template',
      description: 'Invoice template tailored for sustainability consultants offering environmental assessments, ESG strategy development, and carbon footprint analysis',
      tier: 'free',
      searchVolume: 11700,
      cpc: 5.55,
      difficulty: 55,
      keywords: [
        'sustainability consulting invoice',
        'environmental consultant invoice',
        'esg consulting invoice',
        'green business invoice',
        'carbon audit billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'sustainability-audit-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text', required: true, placeholder: 'SUS-2024-001', helpText: 'Unique invoice identifier' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date', required: true, helpText: 'Date invoice issued' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date', required: true, helpText: 'Payment due date' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text', required: true, placeholder: 'EcoConsult Sustainability', helpText: 'Your consultancy name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea', required: true, placeholder: '123 Green Lane, London, UK', helpText: 'Your business address' },
        { fieldName: 'businessEmail', label: 'Business Email', type: 'email', required: true, placeholder: 'info@ecoconsult.co.uk', helpText: 'Contact email' },
        { fieldName: 'clientName', label: 'Client Name', type: 'text', required: true, placeholder: 'ABC Manufacturing Ltd', helpText: 'Client company name' },
        { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea', required: true, placeholder: '45 Industrial Estate, Birmingham, UK', helpText: 'Client address' },
        { fieldName: 'projectName', label: 'Project Name', type: 'text', required: true, placeholder: 'Corporate Carbon Footprint Assessment', helpText: 'Consulting engagement title' },
        sustainableBusinessFields.assessmentScope,
        { fieldName: 'lineItems', label: 'Line Items', type: 'textarea', required: true, helpText: 'Consulting services breakdown' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency', required: true, helpText: 'Total before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency', required: true, helpText: 'Final amount due' }
      ],
      optionalFields: [
        { fieldName: 'businessPhone', label: 'Business Phone', type: 'phone', required: false, placeholder: '+44 20 1234 5678', helpText: 'Contact phone' },
        { fieldName: 'companyNumber', label: 'Company Registration Number', type: 'text', required: false, placeholder: '12345678', helpText: 'Companies House number' },
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text', required: false, placeholder: 'GB123456789', helpText: 'VAT registration' },
        sustainableBusinessFields.methodology,
        sustainableBusinessFields.reportingFramework,
        { fieldName: 'clientEmail', label: 'Client Email', type: 'email', required: false, helpText: 'Client contact email' },
        { fieldName: 'vatAmount', label: 'VAT Amount', type: 'currency', required: false, helpText: 'VAT at 20%' },
        { fieldName: 'bankName', label: 'Bank Name', type: 'text', required: false, placeholder: 'Barclays Bank', helpText: 'Your bank' },
        { fieldName: 'accountNumber', label: 'Account Number', type: 'text', required: false, placeholder: '12345678', helpText: 'Bank account number' },
        { fieldName: 'sortCode', label: 'Sort Code', type: 'text', required: false, placeholder: '12-34-56', helpText: 'Bank sort code' },
        { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea', required: false, placeholder: 'Net 30 days', helpText: 'Payment terms' },
        { fieldName: 'notes', label: 'Notes', type: 'textarea', required: false, placeholder: 'Report includes TCFD recommendations', helpText: 'Additional information' }
      ],
      industryStandards: [
        {
          standard: 'GHG Protocol Methodology',
          description: 'Use Greenhouse Gas Protocol Corporate Accounting and Reporting Standard for carbon footprint calculations. Clearly define boundary (organizational vs operational) and scope coverage (1, 2, and 3).',
          complianceLevel: 'required'
        },
        {
          standard: 'Scope Definition',
          description: 'Define assessment coverage: Scope 1 (direct emissions), Scope 2 (purchased energy), Scope 3 (value chain). Specify which Scope 3 categories are included (upstream and downstream).',
          complianceLevel: 'required'
        },
        {
          standard: 'Reporting Framework Alignment',
          description: 'Reference sustainability reporting standards used: TCFD (climate risk), CDP (Carbon Disclosure Project), GRI (Global Reporting Initiative), or SASB (industry-specific metrics).',
          complianceLevel: 'recommended'
        },
        {
          standard: 'ISO 14001 Alignment',
          description: 'Align recommendations with ISO 14001 Environmental Management System standards. Identify gaps and opportunities for certification if client seeks formal EMS implementation.',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Science-Based Targets',
          description: 'Reference Science Based Targets initiative (SBTi) methodology for emissions reduction pathways. Help clients set targets aligned with 1.5°C or well-below 2°C scenarios.',
          complianceLevel: 'optional'
        }
      ],
      sampleData: {
        invoiceNumber: 'SUS-2024-0156',
        invoiceDate: '2024-09-20',
        dueDate: '2024-10-20',
        businessName: 'EcoConsult Sustainability Limited',
        businessAddress: '12 Sustainability House, Green Park, Reading, RG2 6GP',
        businessEmail: 'billing@ecoconsult-uk.com',
        businessPhone: '+44 118 987 6543',
        companyNumber: '08765432',
        vatNumber: 'GB876543210',
        clientName: 'TechCorp Manufacturing Ltd',
        clientAddress: 'Innovation Centre, 45 Tech Park, Birmingham, B7 4BB',
        clientEmail: 'sustainability@techcorp.co.uk',
        projectName: 'Corporate Carbon Footprint Assessment & Net Zero Roadmap',
        assessmentScope: 'Scope 1, 2, and 3 emissions (Categories 1-15)',
        methodology: 'GHG Protocol Corporate Standard & ISO 14064-1:2018',
        reportingFramework: 'TCFD, CDP Climate Change, GRI Standards',
        lineItems: [
          { description: 'Data collection and stakeholder interviews (5 sites)', quantity: 5, rate: 500.00, amount: 2500.00 },
          { description: 'Carbon footprint calculation - Scopes 1 & 2', quantity: 1, rate: 2200.00, amount: 2200.00 },
          { description: 'Carbon footprint calculation - Scope 3 (all 15 categories)', quantity: 1, rate: 3800.00, amount: 3800.00 },
          { description: 'Benchmarking analysis against sector peers', quantity: 1, rate: 1200.00, amount: 1200.00 },
          { description: 'Net Zero roadmap development (SBTi-aligned)', quantity: 1, rate: 2800.00, amount: 2800.00 },
          { description: 'TCFD-aligned climate risk assessment', quantity: 1, rate: 1800.00, amount: 1800.00 },
          { description: 'Sustainability recommendations report (80 pages)', quantity: 1, rate: 1500.00, amount: 1500.00 },
          { description: 'Executive presentation and board workshop', quantity: 1, rate: 1200.00, amount: 1200.00 }
        ],
        subtotal: 17000.00,
        vatAmount: 3400.00,
        totalAmount: 20400.00,
        bankName: 'HSBC UK',
        accountNumber: '87654321',
        sortCode: '40-12-34',
        paymentTerms: 'Net 30 days from invoice date. Late payments subject to 8% interest per annum under Late Payment of Commercial Debts (Interest) Act 1998.',
        notes: 'Project deliverables:\n• Comprehensive carbon footprint report (Scopes 1, 2, 3)\n• Data quality assessment and uncertainty analysis\n• Emissions hotspot identification\n• Sector benchmarking against 50 peer companies\n• Science-based target recommendations (1.5°C pathway)\n• Net Zero roadmap with 15 reduction initiatives\n• TCFD climate risk disclosure recommendations\n• CDP questionnaire preparation guidance\n• Executive summary and board presentation\n\nMethodology: GHG Protocol Corporate Standard, ISO 14064-1:2018\nReporting alignment: TCFD, CDP, GRI Standards, SBTi\n\nAll data handled in accordance with ISO 27001 and client confidentiality agreements.\n\nThank you for choosing EcoConsult Sustainability. We look forward to supporting your Net Zero journey.'
      },
      industrySpecific: {
        serviceTypes: [
          'Carbon Footprint Assessment',
          'Net Zero Strategy Development',
          'ESG Reporting & Compliance',
          'Life Cycle Assessment (LCA)',
          'Sustainability Audits',
          'TCFD Climate Risk Analysis',
          'Science-Based Targets Setting',
          'Circular Economy Strategy',
          'Supply Chain Sustainability',
          'Environmental Management Systems',
          'Green Certification Support',
          'Sustainability Training'
        ],
        certifications: [
          'GHG Protocol Certification',
          'ISO 14001 Lead Auditor',
          'CDP Accredited Provider',
          'SBTi Expert',
          'IEMA Certified Environmental Practitioner',
          'CEM (Certified Energy Manager)',
          'LEED AP (Leadership in Energy and Environmental Design)',
          'B Corp Certification',
          'LCA Practitioner Certification',
          'ESOS Lead Assessor'
        ],
        deliverables: [
          'Carbon footprint report',
          'Net zero roadmap',
          'ESG disclosure reports',
          'Sustainability strategy',
          'Climate risk assessment',
          'Reduction initiative analysis',
          'Stakeholder engagement plan',
          'Policy recommendations',
          'Training materials',
          'Board presentations',
          'Certification documentation',
          'Performance dashboards'
        ]
      },
      businessBenefits: [
        'GHG Protocol Compliance: Ensures carbon calculations meet international standards and are credible for regulatory compliance, avoiding costly audit failures',
        'Scope 3 Expertise: Addresses value chain emissions (often 70%+ of total footprint) that most companies struggle to quantify accurately',
        'TCFD Framework Alignment: Prepares clients for mandatory climate risk disclosure requirements, staying ahead of regulatory deadlines',
        'Science-Based Targets: Helps clients set ambitious yet achievable emissions reduction goals aligned with climate science and investor expectations',
        'CDP Score Improvement: Improves client scores and positioning in sustainability indices, attracting ESG-focused investors and customers',
        'Premium Service Positioning: Professional invoice format demonstrates expertise and positions consultancy as premium sustainability advisor',
        'Clear Project Boundaries: Detailed scope definition prevents scope creep and client disputes, protecting consultancy margins',
        'Third-Party Verification: Methodology transparency builds trust and allows independent verification of carbon calculations',
        'Fee Justification: Comprehensive deliverables list justifies consulting fees and sets clear client expectations from day one',
        'Competitive Intelligence: Benchmarking analysis adds strategic value beyond basic carbon accounting, informing business decisions',
        'C-Suite Communication: Board-level presentation demonstrates understanding of corporate decision-making and executive stakeholder management',
        'Actionable Net Zero Roadmap: Provides implementation pathway, not just measurement, increasing client success and repeat business opportunities'
      ],
      useCases: [
        'Manufacturing company measuring corporate carbon footprint for first time to meet customer sustainability requirements',
        'SME preparing CDP Climate Change questionnaire response to maintain contracts with large corporate clients',
        'Tech company developing Net Zero strategy and science-based emissions reduction targets',
        'Retail business calculating Scope 3 supply chain emissions for ESG disclosure to investors',
        'Financial services firm conducting TCFD-aligned climate risk assessment for regulatory compliance',
        'Food & beverage company performing life cycle assessment (LCA) of product portfolio',
        'Construction firm seeking ISO 14001 Environmental Management System certification',
        'Professional services company benchmarking sustainability performance against sector peers',
        'Healthcare organization developing circular economy strategy for medical waste reduction',
        'Logistics company calculating fleet emissions and identifying electric vehicle transition pathway',
        'Real estate developer measuring embodied carbon in building materials for LEED certification',
        'Hospitality business implementing sustainability program to achieve B Corp certification',
        'University conducting campus-wide carbon audit and developing carbon neutrality roadmap',
        'Startup company establishing ESG framework and reporting processes for investor due diligence',
        'Industrial manufacturer preparing for ESOS (Energy Savings Opportunity Scheme) compliance audit'
      ]
    }
  ]
};

// ============================================================================
// INDUSTRY METADATA
// ============================================================================

export const sustainableBusinessIndustryMetadata: IndustryMetadata = {
  id: 'sustainable-business',
  name: 'Sustainable Business',
  description: 'Invoice templates for solar installers, renewable energy contractors, sustainability consultants, and green business services',
  icon: '♻️',
  totalSearchVolume: 27400,
  templateCount: 2,
  tier: 'free',
  categories: ['green-energy-solar', 'sustainability-consulting'],
  keywords: [
    'sustainable business invoice',
    'solar installation invoice',
    'sustainability consulting invoice',
    'renewable energy invoice',
    'green energy billing',
    'esg consulting invoice'
  ],
  avgCPC: 6.38,
  searchDifficulty: 58.5,
  popularityRank: 8
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const sustainableBusinessCategories: SustainableBusinessCategory[] = [
  greenEnergySolar,
  sustainabilityConsulting
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all sustainable business templates across all categories
 */
export function getAllSustainableBusinessTemplates(): SustainableBusinessTemplate[] {
  return sustainableBusinessCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): SustainableBusinessTemplate[] {
  const category = sustainableBusinessCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): SustainableBusinessTemplate | undefined {
  return getAllSustainableBusinessTemplates().find(template => template.id === templateId);
}

/**
 * Get all free sustainable business templates
 */
export function getFreeSustainableBusinessTemplates(): SustainableBusinessTemplate[] {
  return getAllSustainableBusinessTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium sustainable business templates
 */
export function getPremiumSustainableBusinessTemplates(): SustainableBusinessTemplate[] {
  return getAllSustainableBusinessTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchSustainableBusinessTemplates(query: string): SustainableBusinessTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllSustainableBusinessTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get sustainable business industry statistics
 */
export function getSustainableBusinessStats() {
  const allTemplates = getAllSustainableBusinessTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreeSustainableBusinessTemplates().length,
    premiumTemplates: getPremiumSustainableBusinessTemplates().length,
    totalCategories: sustainableBusinessCategories.length,
    totalSearchVolume: allTemplates.reduce((sum, t) => sum + t.searchVolume, 0),
    averageCPC: allTemplates.length > 0 ? allTemplates.reduce((sum, t) => sum + t.cpc, 0) / allTemplates.length : 0,
    averageDifficulty: allTemplates.length > 0 ? allTemplates.reduce((sum, t) => sum + t.difficulty, 0) / allTemplates.length : 0
  };
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  metadata: sustainableBusinessIndustryMetadata,
  categories: sustainableBusinessCategories,
  templates: getAllSustainableBusinessTemplates(),
  utils: {
    getAllTemplates: getAllSustainableBusinessTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreeSustainableBusinessTemplates,
    getPremiumTemplates: getPremiumSustainableBusinessTemplates,
    search: searchSustainableBusinessTemplates,
    getStats: getSustainableBusinessStats
  }
};
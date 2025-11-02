/**
 * Digital Services Industry Invoice Templates
 * 
 * This file contains categorized invoice templates for the Digital Services industry,
 * integrating with the main invoiceTemplateIndustries.ts database.
 * 
 * Industry Overview:
 * - Total Templates: 5 (5 free, 0 premium)
 * - Categories: 4 (AI & Machine Learning, SaaS & Cloud Services, Cybersecurity, Digital Marketing)
 * - Total Search Volume: 8,900+/month
 * - Average CPC: $16.84
 * - SEO Difficulty: Medium (45.6)
 * 
 * This comprehensive digital services invoice template collection positions us as the
 * definitive global resource for all tech service billing needs, covering AI consulting,
 * SaaS subscriptions, cybersecurity audits, and digital marketing services.
 * 
 * Industry-Specific Fields:
 * - Project Name & Scope
 * - Billing Period (for subscriptions)
 * - License Keys & User Counts
 * - Hourly Rates & Service Breakdown
 * - Compliance Framework References
 * - Data Protection & GDPR
 * - Intellectual Property Rights
 * - Performance Metrics & KPIs
 * - Campaign Results & ROI
 */

import { IndustryMetadata } from '../invoiceTemplateIndustries';
import { InvoiceField, IndustryStandard } from '../../invoiceTemplateLibrary';

// ============================================================================
// DIGITAL SERVICES-SPECIFIC FIELDS
// ============================================================================

// Reusable digital services field definitions for consistent field usage
export const digitalServicesFields = {
  projectName: {
    fieldName: 'projectName',
    label: 'Project Name',
    type: 'text' as const,
    required: true,
    placeholder: 'Customer Segmentation AI Implementation',
    helpText: 'Name or description of the project'
  },
  billingPeriod: {
    fieldName: 'billingPeriod',
    label: 'Billing Period',
    type: 'text' as const,
    required: true,
    placeholder: 'January 2024',
    helpText: 'Subscription billing period (month/year)'
  },
  licenseKey: {
    fieldName: 'licenseKey',
    label: 'License Key',
    type: 'text' as const,
    required: false,
    placeholder: 'LIC-CF-2024-A1B2C3',
    helpText: 'Software license key or subscription ID'
  },
  sessionDuration: {
    fieldName: 'sessionDuration',
    label: 'Session Duration',
    type: 'number' as const,
    required: false,
    placeholder: '60',
    helpText: 'Duration in minutes'
  },
  serviceDate: {
    fieldName: 'serviceDate',
    label: 'Service Date',
    type: 'date' as const,
    required: false,
    helpText: 'Date service was provided'
  }
};

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface DigitalServicesTemplate {
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
    technologies: string[];
    deliverables: string[];
  };
  businessBenefits: string[];
  useCases: string[];
}

export interface DigitalServicesCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: DigitalServicesTemplate[];
}

// ============================================================================
// CATEGORY 1: AI & MACHINE LEARNING
// ============================================================================

const aiMachineLearningCategory: DigitalServicesCategory = {
  id: 'ai-machine-learning',
  name: 'AI & Machine Learning',
  description: 'Invoice templates for AI consulting, ML model training, and data science services',
  icon: '🤖',
  templates: [
    {
      id: 'ai-consulting-invoice',
      categoryId: 'ai-machine-learning',
      categoryName: 'AI & Machine Learning',
      name: 'AI Consulting Invoice Template',
      description: 'Professional invoice template for AI consulting services including strategy, implementation planning, and technical advisory',
      tier: 'free',
      searchVolume: 500,
      cpc: 18.50,
      difficulty: 45,
      keywords: [
        'ai consulting invoice',
        'artificial intelligence invoice',
        'ai strategy invoice',
        'machine learning consulting',
        'ai implementation billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'ai-consulting-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'AI-2024-001', helpText: 'Unique invoice identifier' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date invoice is issued' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text' as const, required: true, placeholder: 'AI Solutions Ltd', helpText: 'Your consulting company name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
        { fieldName: 'businessEmail', label: 'Business Email', type: 'email' as const, required: true, helpText: 'Your business email' },
        { fieldName: 'clientName', label: 'Client Name', type: 'text' as const, required: true, placeholder: 'Tech Company Ltd', helpText: 'Client company name' },
        { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: true, helpText: 'Client billing address' },
        digitalServicesFields.projectName,
        { fieldName: 'lineItems', label: 'Line Items', type: 'textarea' as const, required: true, helpText: 'Services and pricing' },
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
          standard: 'Detailed service breakdown',
          description: 'Include specific AI consulting activities, hours, and deliverables',
          complianceLevel: 'required'
        },
        {
          standard: 'Intellectual property rights',
          description: 'Clarify ownership of AI models and algorithms developed',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Data protection compliance',
          description: 'Reference GDPR compliance for AI data processing',
          complianceLevel: 'required'
        }
      ],
      sampleData: {
        invoiceNumber: 'AI-2024-001',
        invoiceDate: '2024-10-25',
        dueDate: '2024-11-08',
        businessName: 'AI Solutions Ltd',
        businessAddress: '45 Tech Park, London, EC1A 1AA',
        businessEmail: 'billing@aisolutions.co.uk',
        businessPhone: '+44 20 7123 4567',
        clientName: 'RetailCorp Ltd',
        clientAddress: '100 Commerce Street, Manchester, M1 2BB',
        clientEmail: 'finance@retailcorp.com',
        projectName: 'Customer Segmentation AI Implementation',
        lineItems: [
          { description: 'AI Strategy Workshop (8 hours)', quantity: 1, rate: 1500.00, amount: 1500.00 },
          { description: 'ML Model Development', quantity: 40, rate: 150.00, amount: 6000.00 },
          { description: 'Implementation Support', quantity: 20, rate: 120.00, amount: 2400.00 }
        ],
        subtotal: 9900.00,
        vatAmount: 1980.00,
        totalAmount: 11880.00,
        paymentTerms: 'Payment due within 14 days. Net 14 terms.',
        notes: 'All AI models and algorithms remain property of RetailCorp Ltd upon final payment. GDPR-compliant data processing throughout project.'
      },
      industrySpecific: {
        serviceTypes: [
          'AI Strategy Consulting',
          'Machine Learning Implementation',
          'AI Model Development',
          'Algorithm Design',
          'Data Science Consulting',
          'AI Integration Services',
          'Technical Advisory'
        ],
        technologies: [
          'TensorFlow',
          'PyTorch',
          'Scikit-learn',
          'Python',
          'R',
          'Azure AI',
          'AWS SageMaker',
          'Google Cloud AI'
        ],
        deliverables: [
          'AI Strategy Document',
          'ML Models',
          'Algorithm Implementations',
          'Technical Documentation',
          'Training Data Sets',
          'Model Performance Reports',
          'Implementation Guidelines'
        ]
      },
      businessBenefits: [
        'High-Value Consulting Rates: AI consulting commands premium hourly rates (£120-£200+/hour) reflecting specialized expertise',
        'Project-Based Pricing: Large-scale AI projects often worth £10,000-£100,000+ providing substantial revenue opportunities',
        'IP Rights Clarity: Clearly define ownership of AI models and algorithms to protect both parties and avoid disputes',
        'GDPR Compliance Documentation: Reference data protection compliance for AI projects handling personal data',
        'Phased Payment Structure: Break large AI projects into milestones (strategy, development, implementation, support) for cash flow',
        'Ongoing Support Revenue: AI implementations often require ongoing optimization and support creating recurring income',
        'Technology Stack Transparency: Document technologies used (TensorFlow, PyTorch, etc.) showing technical sophistication',
        'Performance Metrics: Include model accuracy, performance benchmarks in deliverables to demonstrate value',
        'Scalable Service Model: Framework for expanding from small consulting projects to enterprise AI implementations',
        'Specialized Market Position: Professional AI invoicing establishes credibility in high-value enterprise market'
      ],
      useCases: [
        'AI strategy consulting for businesses starting their AI transformation journey',
        'Machine learning model development for predictive analytics and forecasting',
        'Customer segmentation and personalization AI implementations',
        'Natural language processing (NLP) solutions for chatbots and content analysis',
        'Computer vision implementations for image recognition and quality control',
        'Recommendation engine development for e-commerce and content platforms',
        'Fraud detection AI systems for financial services and e-commerce',
        'Demand forecasting models for supply chain optimization',
        'AI-powered automation solutions for business process optimization',
        'Sentiment analysis tools for social media monitoring and brand management',
        'AI integration consulting for existing software systems and platforms',
        'Enterprise AI workshops and training for technical teams'
      ]
    },
    {
      id: 'ml-training-invoice',
      categoryId: 'ai-machine-learning',
      categoryName: 'AI & Machine Learning',
      name: 'ML Training Invoice Template',
      description: 'Invoice template for machine learning model training, data processing, and model optimization services',
      tier: 'free',
      searchVolume: 380,
      cpc: 16.20,
      difficulty: 42,
      keywords: [
        'machine learning invoice',
        'ml training invoice',
        'model training invoice',
        'data science invoice',
        'ml optimization billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'ml-training-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'ML-2024-001', helpText: 'Unique invoice identifier' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date invoice is issued' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text' as const, required: true, placeholder: 'DataTech Solutions', helpText: 'Your company name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
        { fieldName: 'businessEmail', label: 'Business Email', type: 'email' as const, required: true, helpText: 'Your business email' },
        { fieldName: 'clientName', label: 'Client Name', type: 'text' as const, required: true, placeholder: 'Manufacturing Ltd', helpText: 'Client company name' },
        { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: true, helpText: 'Client billing address' },
        digitalServicesFields.projectName,
        { fieldName: 'lineItems', label: 'Line Items', type: 'textarea' as const, required: true, helpText: 'Services and pricing' },
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
          standard: 'Model performance metrics',
          description: 'Include accuracy, precision, recall metrics in deliverables',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Training data specifications',
          description: 'Document data volume, quality, and preprocessing methods',
          complianceLevel: 'required'
        },
        {
          standard: 'Compute resource billing',
          description: 'Itemize GPU/cloud computing costs separately',
          complianceLevel: 'recommended'
        }
      ],
      sampleData: {
        invoiceNumber: 'ML-2024-012',
        invoiceDate: '2024-10-28',
        dueDate: '2024-11-11',
        businessName: 'DataTech Solutions',
        businessAddress: '78 Data Street, Cambridge, CB2 1AA',
        businessEmail: 'invoices@datatech.co.uk',
        businessPhone: '+44 1223 456 789',
        clientName: 'Industrial Manufacturing Ltd',
        clientAddress: '50 Factory Road, Birmingham, B1 1AA',
        clientEmail: 'procurement@industrial-mfg.com',
        projectName: 'Predictive Maintenance ML Model',
        lineItems: [
          { description: 'Data preprocessing and cleaning', quantity: 25, rate: 100.00, amount: 2500.00 },
          { description: 'Model training (GPU compute)', quantity: 80, rate: 75.00, amount: 6000.00 },
          { description: 'Model optimization and tuning', quantity: 15, rate: 120.00, amount: 1800.00 }
        ],
        subtotal: 10300.00,
        vatAmount: 2060.00,
        totalAmount: 12360.00,
        paymentTerms: 'Payment due within 14 days of invoice date.',
        notes: 'Model achieved 94.2% accuracy on test data. All training data and models delivered via secure cloud storage. Documentation includes performance metrics and optimization recommendations.'
      },
      industrySpecific: {
        serviceTypes: [
          'ML Model Training',
          'Data Preprocessing',
          'Model Optimization',
          'Feature Engineering',
          'Hyperparameter Tuning',
          'Model Validation',
          'Performance Testing'
        ],
        technologies: [
          'TensorFlow',
          'PyTorch',
          'Keras',
          'Scikit-learn',
          'XGBoost',
          'GPU Computing',
          'AWS/Azure/GCP',
          'Jupyter Notebooks'
        ],
        deliverables: [
          'Trained ML Models',
          'Performance Metrics Reports',
          'Training Data Sets',
          'Model Documentation',
          'Optimization Recommendations',
          'Deployment Guidelines',
          'Source Code'
        ]
      },
      businessBenefits: [
        'GPU Compute Billing: Separately itemize expensive GPU/cloud computing costs (£50-£100+/hour) for transparency',
        'Hourly Rate Model: Charge for data preprocessing, training, and optimization hours at specialized rates (£75-£150/hour)',
        'Performance Metrics Deliverables: Include accuracy, precision, recall metrics demonstrating model quality and value',
        'Data Volume Pricing: Scale pricing based on dataset size (millions of records) processed and cleaned',
        'Iterative Optimization: Multiple training rounds and hyperparameter tuning sessions generate additional billable hours',
        'Cloud Resource Pass-through: Pass cloud computing costs (AWS, Azure, GCP) to client with transparent markup',
        'Model Documentation Value: Charge separately for comprehensive documentation and deployment guides',
        'Ongoing Refinement Revenue: ML models require periodic retraining creating recurring project opportunities',
        'Specialized Technical Expertise: Premium rates justified by specialized GPU programming and ML optimization skills',
        'Enterprise Scale Projects: Large datasets and complex models can generate £10,000-£50,000+ projects'
      ],
      useCases: [
        'Predictive maintenance models for manufacturing and industrial equipment',
        'Demand forecasting ML models for retail and supply chain optimization',
        'Churn prediction models for SaaS and subscription businesses',
        'Fraud detection models for financial services and e-commerce platforms',
        'Image classification models for quality control and visual inspection',
        'Natural language processing models for sentiment analysis and text classification',
        'Recommendation system training for e-commerce and content platforms',
        'Time series forecasting models for financial markets and business planning',
        'Anomaly detection systems for cybersecurity and network monitoring',
        'Price optimization models for dynamic pricing strategies',
        'Customer lifetime value prediction for marketing and sales teams',
        'Medical diagnosis support systems for healthcare providers'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY 2: SAAS & CLOUD SERVICES
// ============================================================================

const saasCloudServicesCategory: DigitalServicesCategory = {
  id: 'saas-cloud-services',
  name: 'SaaS & Cloud Services',
  description: 'Invoice templates for software subscriptions, cloud services, and recurring billing',
  icon: '☁️',
  templates: [
    {
      id: 'saas-subscription-invoice',
      categoryId: 'saas-cloud-services',
      categoryName: 'SaaS & Cloud Services',
      name: 'SaaS Subscription Invoice Template',
      description: 'Professional invoice template for SaaS subscription billing, cloud services, and software licensing with recurring payment support',
      tier: 'free',
      searchVolume: 2800,
      cpc: 12.40,
      difficulty: 48,
      keywords: [
        'saas invoice',
        'software subscription invoice',
        'cloud service invoice',
        'recurring billing invoice',
        'software licensing invoice'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'saas-subscription-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'SAAS-2024-001', helpText: 'Unique invoice identifier' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date invoice is issued' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text' as const, required: true, placeholder: 'CloudFlow Technologies', helpText: 'Your SaaS company name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
        { fieldName: 'businessEmail', label: 'Business Email', type: 'email' as const, required: true, helpText: 'Your business email' },
        { fieldName: 'clientName', label: 'Client Name', type: 'text' as const, required: true, placeholder: 'Tech Startup Ltd', helpText: 'Client company name' },
        { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: true, helpText: 'Client billing address' },
        digitalServicesFields.billingPeriod,
        { fieldName: 'lineItems', label: 'Line Items', type: 'textarea' as const, required: true, helpText: 'Subscription details and pricing' },
        { fieldName: 'subtotal', label: 'Subtotal', type: 'currency' as const, required: true, helpText: 'Subtotal before VAT' },
        { fieldName: 'totalAmount', label: 'Total Amount', type: 'currency' as const, required: true, helpText: 'Total amount due' }
      ],
      optionalFields: [
        { fieldName: 'businessPhone', label: 'Business Phone', type: 'phone' as const, required: false, helpText: 'Your phone number' },
        { fieldName: 'companyNumber', label: 'Company Number', type: 'text' as const, required: false, helpText: 'Company registration number' },
        { fieldName: 'vatNumber', label: 'VAT Number', type: 'text' as const, required: false, helpText: 'VAT registration number' },
        { fieldName: 'clientEmail', label: 'Client Email', type: 'email' as const, required: false, helpText: 'Client email' },
        digitalServicesFields.licenseKey,
        { fieldName: 'vatAmount', label: 'VAT Amount', type: 'currency' as const, required: false, helpText: 'VAT amount' },
        { fieldName: 'bankName', label: 'Bank Name', type: 'text' as const, required: false, helpText: 'Bank name' },
        { fieldName: 'accountNumber', label: 'Account Number', type: 'text' as const, required: false, helpText: 'Bank account number' },
        { fieldName: 'sortCode', label: 'Sort Code', type: 'text' as const, required: false, helpText: 'Bank sort code' },
        { fieldName: 'paymentTerms', label: 'Payment Terms', type: 'textarea' as const, required: false, helpText: 'Payment terms and auto-renewal info' },
        { fieldName: 'notes', label: 'Notes', type: 'textarea' as const, required: false, helpText: 'Additional notes' }
      ],
      industryStandards: [
        {
          standard: 'Subscription tier details',
          description: 'Clearly state plan name, user count, and feature access',
          complianceLevel: 'required'
        },
        {
          standard: 'Auto-renewal notification',
          description: 'Include auto-renewal terms and cancellation policy',
          complianceLevel: 'required'
        },
        {
          standard: 'Usage-based charges',
          description: 'Itemize any overage or usage-based fees separately',
          complianceLevel: 'recommended'
        },
        {
          standard: 'SLA reference',
          description: 'Reference service level agreement and uptime guarantee',
          complianceLevel: 'optional'
        }
      ],
      sampleData: {
        invoiceNumber: 'SAAS-2024-0345',
        invoiceDate: '2024-11-01',
        dueDate: '2024-11-01',
        businessName: 'CloudFlow Technologies',
        businessAddress: '100 Cloud Street, London, EC2A 1AA',
        businessEmail: 'billing@cloudflow.io',
        businessPhone: '+44 20 8765 4321',
        vatNumber: 'GB 123 4567 89',
        clientName: 'Digital Agency Ltd',
        clientAddress: '45 Marketing Road, Bristol, BS1 2BB',
        clientEmail: 'accounts@digitalagency.com',
        billingPeriod: 'November 2024',
        licenseKey: 'LIC-CF-2024-A1B2C3',
        lineItems: [
          { description: 'Business Plan (50 users)', quantity: 1, rate: 999.00, amount: 999.00 },
          { description: 'Additional storage (500GB)', quantity: 1, rate: 150.00, amount: 150.00 },
          { description: 'Priority support', quantity: 1, rate: 250.00, amount: 250.00 }
        ],
        subtotal: 1399.00,
        vatAmount: 279.80,
        totalAmount: 1678.80,
        paymentTerms: 'Subscription auto-renews monthly. Payment due on 1st of each month. Cancel anytime with 30 days notice.',
        notes: 'Thank you for your continued subscription! Your plan includes 50 user seats, 1TB storage, and priority email support. Next billing date: December 1, 2024.'
      },
      industrySpecific: {
        serviceTypes: [
          'SaaS Subscriptions',
          'Cloud Hosting',
          'Software Licensing',
          'Platform Access',
          'API Usage',
          'Priority Support',
          'Additional Features'
        ],
        technologies: [
          'Cloud Infrastructure',
          'Web Applications',
          'Mobile Apps',
          'API Services',
          'Database Hosting',
          'CDN Services',
          'Load Balancing'
        ],
        deliverables: [
          'Software Access',
          'License Keys',
          'User Accounts',
          'API Keys',
          'Support Services',
          'Documentation',
          'Service Level Agreement'
        ]
      },
      businessBenefits: [
        'Recurring Revenue Model: Monthly/annual subscriptions create predictable, recurring income stream (MRR/ARR)',
        'Tiered Pricing Strategy: Offer multiple plans (Starter, Business, Enterprise) to capture different market segments',
        'Usage-Based Upsells: Charge for additional users, storage, bandwidth, or API calls beyond plan limits',
        'Annual Discounts: Incentivize annual pre-payment (typically 10-20% discount) for improved cash flow',
        'Add-on Revenue: Separately charge for priority support, training, custom integrations, and premium features',
        'Auto-Renewal Income: Automatic subscription renewals minimize churn and ensure consistent revenue',
        'Transparent Billing: Clear itemization of plan costs, overages, and add-ons reduces payment disputes',
        'Scalable Business Model: Easy to scale from 10 customers to 10,000 with same invoicing infrastructure',
        'Customer Retention Tracking: Monthly invoicing provides regular touchpoints and retention opportunities',
        'Professional SaaS Operations: Detailed invoicing demonstrates operational maturity to investors and customers'
      ],
      useCases: [
        'Monthly SaaS subscription billing for project management software',
        'Annual software license renewals with discounted pre-payment',
        'Cloud hosting and infrastructure-as-a-service (IaaS) billing',
        'Platform-as-a-service (PaaS) subscriptions with tiered pricing',
        'API usage billing with per-request or volume-based pricing',
        'E-commerce platform subscriptions with transaction fee models',
        'CRM and sales software monthly billing with per-user pricing',
        'Marketing automation tools with contact-based pricing tiers',
        'Team collaboration software with workspace and user limits',
        'Analytics and business intelligence platform subscriptions',
        'Security and monitoring tools with monthly recurring fees',
        'Video conferencing and communication platform subscriptions'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY 3: CYBERSECURITY
// ============================================================================

const cybersecurityCategory: DigitalServicesCategory = {
  id: 'cybersecurity',
  name: 'Cybersecurity',
  description: 'Invoice templates for security audits, penetration testing, and compliance services',
  icon: '🔒',
  templates: [
    {
      id: 'cybersecurity-audit-invoice',
      categoryId: 'cybersecurity',
      categoryName: 'Cybersecurity',
      name: 'Cybersecurity Audit Invoice Template',
      description: 'Comprehensive invoice template for cybersecurity audits, penetration testing, vulnerability assessments, and security compliance services',
      tier: 'free',
      searchVolume: 3200,
      cpc: 22.30,
      difficulty: 52,
      keywords: [
        'cybersecurity invoice',
        'security audit invoice',
        'penetration testing invoice',
        'infosec invoice',
        'security assessment billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'cybersecurity-audit-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'SEC-2024-001', helpText: 'Unique invoice identifier' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date invoice is issued' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text' as const, required: true, placeholder: 'SecureNet Consulting', helpText: 'Your security company name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
        { fieldName: 'businessEmail', label: 'Business Email', type: 'email' as const, required: true, helpText: 'Your business email' },
        { fieldName: 'clientName', label: 'Client Name', type: 'text' as const, required: true, placeholder: 'Financial Services Ltd', helpText: 'Client company name' },
        { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: true, helpText: 'Client billing address' },
        digitalServicesFields.projectName,
        { fieldName: 'lineItems', label: 'Line Items', type: 'textarea' as const, required: true, helpText: 'Security services and pricing' },
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
        { fieldName: 'notes', label: 'Notes', type: 'textarea' as const, required: false, helpText: 'Additional notes and NDA references' }
      ],
      industryStandards: [
        {
          standard: 'Confidentiality agreement reference',
          description: 'Reference NDA and confidentiality terms for sensitive findings',
          complianceLevel: 'required'
        },
        {
          standard: 'Compliance framework',
          description: 'Specify standards tested (ISO 27001, NIST, PCI-DSS, etc.)',
          complianceLevel: 'required'
        },
        {
          standard: 'Scope of testing',
          description: 'Clearly define systems, networks, and applications audited',
          complianceLevel: 'required'
        },
        {
          standard: 'Report delivery timeline',
          description: 'Include delivery date for detailed audit report',
          complianceLevel: 'recommended'
        }
      ],
      sampleData: {
        invoiceNumber: 'SEC-2024-078',
        invoiceDate: '2024-10-30',
        dueDate: '2024-11-13',
        businessName: 'SecureNet Consulting',
        businessAddress: '200 Security Plaza, Edinburgh, EH1 2AA',
        businessEmail: 'billing@securenet.co.uk',
        businessPhone: '+44 131 456 7890',
        vatNumber: 'GB 987 6543 21',
        clientName: 'FinTech Solutions Ltd',
        clientAddress: '89 Banking Street, London, EC3A 1AA',
        clientEmail: 'compliance@fintech-solutions.com',
        projectName: 'Annual Security Compliance Audit',
        lineItems: [
          { description: 'Vulnerability assessment', quantity: 1, rate: 3500.00, amount: 3500.00 },
          { description: 'Penetration testing (5 days)', quantity: 5, rate: 1200.00, amount: 6000.00 },
          { description: 'Compliance report preparation', quantity: 1, rate: 1800.00, amount: 1800.00 },
          { description: 'Executive briefing', quantity: 1, rate: 800.00, amount: 800.00 }
        ],
        subtotal: 12100.00,
        vatAmount: 2420.00,
        totalAmount: 14520.00,
        paymentTerms: 'Payment due within 14 days. Detailed security report delivered within 10 business days.',
        notes: 'All findings covered under NDA signed 15/10/2024. Audit conducted against ISO 27001:2022 and NIST Cybersecurity Framework. Detailed technical report and executive summary will be delivered separately via secure portal.'
      },
      industrySpecific: {
        serviceTypes: [
          'Security Audits',
          'Penetration Testing',
          'Vulnerability Assessments',
          'Compliance Testing',
          'Risk Assessments',
          'Security Consulting',
          'Incident Response'
        ],
        technologies: [
          'Vulnerability Scanners',
          'Penetration Testing Tools',
          'Network Monitoring',
          'SIEM Systems',
          'Security Frameworks',
          'Compliance Tools',
          'Ethical Hacking Tools'
        ],
        deliverables: [
          'Security Audit Report',
          'Vulnerability Assessment',
          'Penetration Test Results',
          'Compliance Documentation',
          'Risk Analysis Report',
          'Remediation Recommendations',
          'Executive Summary'
        ]
      },
      businessBenefits: [
        'Premium Security Rates: Cybersecurity services command premium daily rates (£1,000-£2,000+/day) reflecting specialized expertise',
        'High-Value Engagements: Comprehensive security audits often worth £10,000-£50,000+ for enterprise clients',
        'Recurring Annual Audits: Compliance requirements (PCI-DSS, ISO 27001, SOC 2) create recurring annual revenue',
        'NDA Protection: Confidentiality agreements protect both parties when handling sensitive security findings',
        'Compliance Framework Value: Reference specific standards (ISO 27001, NIST, PCI-DSS) demonstrating regulatory expertise',
        'Scope Documentation: Clearly define systems tested to manage expectations and prevent scope creep',
        'Multi-Phase Billing: Break into assessment, testing, reporting, and briefing phases for milestone payments',
        'Remediation Revenue: Security findings often lead to remediation consulting projects and ongoing monitoring',
        'Executive Briefing Add-ons: Charge separately for executive presentations and stakeholder briefings',
        'Enterprise Market Access: Professional security invoicing establishes credibility with large financial and healthcare clients'
      ],
      useCases: [
        'Annual compliance audits for PCI-DSS, ISO 27001, SOC 2 certifications',
        'Penetration testing for web applications and mobile apps pre-launch',
        'Network security assessments for corporate infrastructure',
        'Vulnerability assessments for cloud infrastructure (AWS, Azure, GCP)',
        'Security audits for financial services and payment processing systems',
        'Healthcare HIPAA compliance security assessments',
        'Red team exercises for enterprise security testing',
        'Social engineering and phishing simulation campaigns',
        'Wireless network security audits for corporate offices',
        'API security testing for SaaS platforms and integrations',
        'Third-party vendor security assessments for supply chain risk',
        'Incident response retainer services for ongoing security monitoring'
      ]
    }
  ]
};

// ============================================================================
// CATEGORY 4: DIGITAL MARKETING
// ============================================================================

const digitalMarketingCategory: DigitalServicesCategory = {
  id: 'digital-marketing',
  name: 'Digital Marketing',
  description: 'Invoice templates for SEO, PPC, social media management, and digital marketing campaigns',
  icon: '📱',
  templates: [
    {
      id: 'digital-marketing-invoice',
      categoryId: 'digital-marketing',
      categoryName: 'Digital Marketing',
      name: 'Digital Marketing Invoice Template',
      description: 'Professional invoice template for digital marketing services including SEO, PPC, social media management, and content marketing',
      tier: 'free',
      searchVolume: 2400,
      cpc: 14.80,
      difficulty: 46,
      keywords: [
        'digital marketing invoice',
        'seo invoice',
        'ppc invoice',
        'social media marketing invoice',
        'marketing agency billing'
      ],
      sourceFile: 'additionalInvoiceTemplateLibrary.ts',
      sourceTemplateId: 'digital-marketing-001',
      requiredFields: [
        { fieldName: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true, placeholder: 'DM-2024-001', helpText: 'Unique invoice identifier' },
        { fieldName: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true, helpText: 'Date invoice is issued' },
        { fieldName: 'dueDate', label: 'Due Date', type: 'date' as const, required: true, helpText: 'Payment due date' },
        { fieldName: 'businessName', label: 'Business Name', type: 'text' as const, required: true, placeholder: 'Digital Growth Agency', helpText: 'Your agency name' },
        { fieldName: 'businessAddress', label: 'Business Address', type: 'textarea' as const, required: true, helpText: 'Your business address' },
        { fieldName: 'businessEmail', label: 'Business Email', type: 'email' as const, required: true, helpText: 'Your business email' },
        { fieldName: 'clientName', label: 'Client Name', type: 'text' as const, required: true, placeholder: 'E-commerce Brand Ltd', helpText: 'Client company name' },
        { fieldName: 'clientAddress', label: 'Client Address', type: 'textarea' as const, required: true, helpText: 'Client billing address' },
        digitalServicesFields.billingPeriod,
        { fieldName: 'lineItems', label: 'Line Items', type: 'textarea' as const, required: true, helpText: 'Marketing services and pricing' },
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
        { fieldName: 'notes', label: 'Notes', type: 'textarea' as const, required: false, helpText: 'Campaign performance notes' }
      ],
      industryStandards: [
        {
          standard: 'Campaign performance metrics',
          description: 'Include KPIs, ROI, and campaign results summary',
          complianceLevel: 'recommended'
        },
        {
          standard: 'Ad spend breakdown',
          description: 'Separate agency fees from media buying costs',
          complianceLevel: 'required'
        },
        {
          standard: 'Service deliverables',
          description: 'List specific deliverables (posts, ads, reports, etc.)',
          complianceLevel: 'required'
        }
      ],
      sampleData: {
        invoiceNumber: 'DM-2024-0189',
        invoiceDate: '2024-11-01',
        dueDate: '2024-11-15',
        businessName: 'Digital Growth Agency',
        businessAddress: '150 Marketing Street, Manchester, M1 1AA',
        businessEmail: 'accounts@digitalgrowth.co.uk',
        businessPhone: '+44 161 234 5678',
        vatNumber: 'GB 555 6666 77',
        clientName: 'Fashion E-commerce Ltd',
        clientAddress: '67 Retail Park, Leeds, LS1 2BB',
        clientEmail: 'marketing@fashionecom.com',
        billingPeriod: 'November 2024',
        lineItems: [
          { description: 'SEO optimization (20 hours)', quantity: 20, rate: 95.00, amount: 1900.00 },
          { description: 'PPC campaign management', quantity: 1, rate: 1500.00, amount: 1500.00 },
          { description: 'Social media content (30 posts)', quantity: 30, rate: 50.00, amount: 1500.00 },
          { description: 'Monthly analytics report', quantity: 1, rate: 400.00, amount: 400.00 }
        ],
        subtotal: 5300.00,
        vatAmount: 1060.00,
        totalAmount: 6360.00,
        paymentTerms: 'Payment due on the 15th of each month. Monthly retainer agreement.',
        notes: 'November campaign delivered: 45,000 impressions, 3,200 clicks, 2.8% CTR. ROI: 340%. Next month focus: Holiday campaign preparation and Black Friday promotions.'
      },
      industrySpecific: {
        serviceTypes: [
          'SEO Services',
          'PPC Campaign Management',
          'Social Media Marketing',
          'Content Marketing',
          'Email Marketing',
          'Marketing Analytics',
          'Conversion Optimization'
        ],
        technologies: [
          'Google Ads',
          'Facebook Ads',
          'Google Analytics',
          'SEO Tools',
          'Social Media Platforms',
          'Email Automation',
          'Marketing Automation'
        ],
        deliverables: [
          'Campaign Reports',
          'Social Media Posts',
          'Ad Creatives',
          'SEO Optimization',
          'Analytics Dashboards',
          'Content Calendar',
          'Performance Metrics'
        ]
      },
      businessBenefits: [
        'Monthly Retainer Model: Recurring monthly marketing services create predictable revenue (£2,000-£20,000+/month)',
        'Multi-Service Bundling: Combine SEO, PPC, social media, and content into comprehensive packages for higher value',
        'Hourly Rate Flexibility: Charge for SEO and optimization work at hourly rates (£75-£150/hour) for scope flexibility',
        'Performance-Based Bonuses: Add performance bonuses tied to KPIs (leads, conversions, ROI) for premium pricing',
        'Ad Spend Markup: Charge management fee (typically 15-20%) on top of client ad spend for PPC campaigns',
        'Deliverable Transparency: List specific outputs (30 posts, 5 blog articles, etc.) showing tangible value',
        'Campaign Results Documentation: Include performance metrics (impressions, clicks, conversions) demonstrating ROI',
        'Separate Reporting Fees: Charge for monthly analytics reports and performance dashboards as distinct line item',
        'Scalable Agency Model: Easy to scale from freelancer rates to agency pricing as team and client base grows',
        'Long-term Client Relationships: Monthly retainers create stable recurring revenue and long-term partnerships'
      ],
      useCases: [
        'Monthly SEO retainer services for local businesses and e-commerce sites',
        'PPC campaign management for Google Ads, Facebook Ads, and LinkedIn Ads',
        'Social media management with content creation and community engagement',
        'E-commerce marketing packages with product listings and shopping ads',
        'Content marketing services including blog writing and content strategy',
        'Email marketing campaigns with automation and list management',
        'Conversion rate optimization (CRO) for landing pages and funnels',
        'Local SEO services for multi-location businesses and franchises',
        'Influencer marketing coordination and campaign management',
        'Marketing analytics and dashboard setup with custom reporting',
        'Seasonal campaign management for holiday shopping and promotional events',
        'Brand awareness campaigns with display advertising and retargeting'
      ]
    }
  ]
};

// ============================================================================
// ALL CATEGORIES
// ============================================================================

export const digitalServicesCategories: DigitalServicesCategory[] = [
  aiMachineLearningCategory,
  saasCloudServicesCategory,
  cybersecurityCategory,
  digitalMarketingCategory
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all digital services templates across all categories
 */
export function getAllDigitalServicesTemplates(): DigitalServicesTemplate[] {
  return digitalServicesCategories.flatMap(category => category.templates);
}

/**
 * Get templates by category ID
 */
export function getTemplatesByCategory(categoryId: string): DigitalServicesTemplate[] {
  const category = digitalServicesCategories.find(cat => cat.id === categoryId);
  return category ? category.templates : [];
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(templateId: string): DigitalServicesTemplate | undefined {
  return getAllDigitalServicesTemplates().find(template => template.id === templateId);
}

/**
 * Get all free digital services templates
 */
export function getFreeDigitalServicesTemplates(): DigitalServicesTemplate[] {
  return getAllDigitalServicesTemplates().filter(template => template.tier === 'free');
}

/**
 * Get all premium digital services templates
 */
export function getPremiumDigitalServicesTemplates(): DigitalServicesTemplate[] {
  return getAllDigitalServicesTemplates().filter(template => template.tier === 'premium');
}

/**
 * Search templates by keyword
 */
export function searchDigitalServicesTemplates(query: string): DigitalServicesTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllDigitalServicesTemplates().filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get high-value templates (high search volume, high CPC)
 */
export function getHighValueTemplates(): DigitalServicesTemplate[] {
  return getAllDigitalServicesTemplates()
    .filter(template => template.searchVolume >= 1000 || template.cpc >= 15.0)
    .sort((a, b) => (b.searchVolume * b.cpc) - (a.searchVolume * a.cpc));
}

/**
 * Get digital services industry statistics
 */
export function getDigitalServicesStats() {
  const allTemplates = getAllDigitalServicesTemplates();
  return {
    totalTemplates: allTemplates.length,
    freeTemplates: getFreeDigitalServicesTemplates().length,
    premiumTemplates: getPremiumDigitalServicesTemplates().length,
    totalCategories: digitalServicesCategories.length,
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
  const templates = getAllDigitalServicesTemplates();
  const highSearch = templates.filter(t => t.searchVolume >= 2000);
  const highCPC = templates.filter(t => t.cpc >= 15.0);
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
  categories: digitalServicesCategories,
  templates: getAllDigitalServicesTemplates(),
  utils: {
    getAllTemplates: getAllDigitalServicesTemplates,
    getTemplatesByCategory,
    getTemplateById,
    getFreeTemplates: getFreeDigitalServicesTemplates,
    getPremiumTemplates: getPremiumDigitalServicesTemplates,
    search: searchDigitalServicesTemplates,
    getHighValueTemplates,
    getStats: getDigitalServicesStats,
    getSEORecommendations
  }
};
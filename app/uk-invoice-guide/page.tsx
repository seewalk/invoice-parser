import { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '../components/PageHero';
import {
  ShieldCheck,
  Calculator,
  Building,
  CheckCircle,
  Info,
  AlertTriangle,
  ArrowRight,
  Wrench,
  Zap,
  HardHat,
  FileText,
  Sparkles,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateServiceSchema,
} from '../lib/schemaConfig';
import { getFAQsByCategory } from '../lib/faqData';
import FAQSection from '../components/FAQSection';
import {
  getAllBusinessIdentifiers,
  getAllVATRates,
  getAllCISRates,
  getKnowledgeBaseStats,
} from '../lib/ukInvoiceKnowledgeBase';

export const metadata: Metadata = {
  title: 'UK Invoice Guide | VAT, CIS & HMRC Compliance | Invoice Generator',
  description:
    'Complete guide to creating HMRC-compliant UK invoices. Learn about VAT rates, CIS deductions, Gas Safe, NICEIC registrations, and Making Tax Digital requirements.',
  keywords: [
    'UK invoice guide',
    'HMRC compliant invoice',
    'VAT invoice UK',
    'CIS deduction',
    'Making Tax Digital',
    'Gas Safe invoice',
    'NICEIC invoice',
    'construction invoice UK',
    'UK VAT rates',
    'invoice compliance UK',
  ],
  openGraph: {
    title: 'UK Invoice Guide | VAT, CIS & HMRC Compliance',
    description:
      'Complete guide to creating HMRC-compliant UK invoices with VAT, CIS deductions, and industry-specific requirements.',
    type: 'website',
    url: `${BUSINESS_INFO.url}/uk-invoice-guide`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK Invoice Guide | VAT, CIS & HMRC Compliance',
    description:
      'Complete guide to creating HMRC-compliant UK invoices with VAT, CIS deductions, and industry-specific requirements.',
  },
};

export default function UKInvoiceGuidePage() {
  // Get UK Invoice FAQs from centralized library
  const ukInvoiceFAQs = getFAQsByCategory('UK Invoice Guide');

  // Get UK invoice knowledge base data
  const businessIdentifiers = getAllBusinessIdentifiers();
  const vatRates = getAllVATRates();
  const cisRates = getAllCISRates();
  const kbStats = getKnowledgeBaseStats();

  // HowTo Steps
  const howToSteps = [
    {
      name: 'Fill in Your Business Information',
      text: 'Enter your business name, address, contact details, and UK compliance fields including VAT registration number (GB format), Companies House number, Gas Safe registration (for plumbers), or NICEIC registration (for electricians).',
    },
    {
      name: 'Add Client Details',
      text: "Enter your client's information including their VAT registration number if they're VAT-registered. This is required for B2B invoices and ensures HMRC compliance.",
    },
    {
      name: 'Add Line Items',
      text: 'Describe the goods or services provided with quantities, rates, and amounts. You can assign different VAT rates to individual line items if needed.',
    },
    {
      name: 'Select VAT Rate',
      text: 'Choose the appropriate UK VAT rate: 20% (Standard Rate), 5% (Reduced Rate), 0% (Zero-Rated), or Exempt. Enable reverse charge VAT if applicable for construction services.',
    },
    {
      name: 'Apply CIS Deduction',
      text: 'For construction invoices, select the Construction Industry Scheme deduction rate: 0% (gross payment status), 20% (CIS registered), or 30% (not registered). CIS deductions are calculated after VAT.',
    },
    {
      name: 'Add Payment Information',
      text: 'Include UK bank details with sort code (XX-XX-XX format), 8-digit account number, and optionally IBAN for international payments. Set payment terms (Net 30 is standard).',
    },
    {
      name: 'Review & Download',
      text: 'Use print preview to verify all information is correct, then download your HMRC-compliant PDF invoice with automatic VAT calculations and UK date format (DD/MM/YYYY).',
    },
  ];

  // Generate schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'UK Invoice Guide', url: '/uk-invoice-guide' },
  ]);

  const faqSchema = generateFAQSchema(ukInvoiceFAQs);

  const howToSchema = generateHowToSchema(
    'How to Create a HMRC Compliant UK Invoice',
    'Step-by-step guide to creating professional, legally compliant UK invoices with VAT calculations and CIS deductions',
    howToSteps
  );

  const serviceSchema = generateServiceSchema(
    'UK Invoice Generation Service',
    'Professional UK invoice generator with HMRC compliance, VAT calculations, CIS deductions, and industry-specific registrations for Gas Safe and NICEIC professionals.',
    'Business Invoice Generation',
    '/uk-invoice-guide'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Structured Data Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      {/* Hero Section */}
      <PageHero
        badge="HMRC Compliant"
        title="UK Invoice Compliance Guide"
        description="Create professional, HMRC-compliant invoices with VAT calculations, CIS deductions, and industry-specific registrations for UK businesses."
        buttons={[
          {
            label: 'Create UK Invoice',
            href: '/invoice-generator',
            variant: 'primary',
          },
          {
            label: 'View Templates',
            href: '/invoice-templates',
            variant: 'secondary',
          },
        ]}
        size="large"
      >
        {/* Stats as children instead of props */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="flex items-center justify-center space-x-2 bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 border border-slate-200 shadow-sm">
            <Calculator className="w-5 h-5 text-green-600" />
            <span className="text-base font-semibold text-gray-700">4 VAT Rates</span>
          </div>
          <div className="flex items-center justify-center space-x-2 bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 border border-slate-200 shadow-sm">
            <HardHat className="w-5 h-5 text-orange-600" />
            <span className="text-base font-semibold text-gray-700">CIS Support</span>
          </div>
          <div className="flex items-center justify-center space-x-2 bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 border border-slate-200 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span className="text-base font-semibold text-gray-700">100% MTD Compliant</span>
          </div>
        </div>
      </PageHero>

      {/* Quick Stats Section */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
              <div className="text-sm text-slate-600">VAT Rates Supported</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">3</div>
              <div className="text-sm text-slate-600">CIS Deduction Options</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-sm text-slate-600">HMRC MTD Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">5+</div>
              <div className="text-sm text-slate-600">Industry Registrations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* UK Business Identifiers */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Building className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-slate-900">
                UK Business Identifiers
              </h2>
            </div>
            <p className="text-lg text-slate-600 mb-8">
              Add professional credentials to your invoices with automatic validation
              and formatting.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {businessIdentifiers.map((identifier, index) => {
                // Icon mapping
                const iconMap: Record<string, { icon: any; bgColor: string; iconColor: string }> = {
                  'vat-number': { icon: ShieldCheck, bgColor: 'bg-green-100', iconColor: 'text-green-600' },
                  'company-number': { icon: Building, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
                  'gas-safe-number': { icon: Wrench, bgColor: 'bg-orange-100', iconColor: 'text-orange-600' },
                  'niceic-number': { icon: Zap, bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
                };
                
                const { icon: Icon, bgColor, iconColor } = iconMap[identifier.id] || { icon: Building, bgColor: 'bg-gray-100', iconColor: 'text-gray-600' };
                const isRequired = identifier.required === 'required';
                const InfoIcon = isRequired ? AlertTriangle : Info;
                const infoIconColor = isRequired ? 'text-orange-600' : '';
                
                return (
                  <div key={identifier.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className={`${bgColor} rounded-lg p-3`}>
                        <Icon className={`w-6 h-6 ${iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                          {identifier.name}
                        </h3>
                        <p className="text-slate-600 mb-3">
                          {identifier.description}
                        </p>
                        <div className="bg-slate-50 rounded p-3 mb-3">
                          <code className="text-sm text-slate-800">
                            {identifier.examples.slice(0, 2).join(', ')}
                          </code>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-slate-600">
                          <InfoIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${infoIconColor}`} />
                          <span>
                            {identifier.complianceNotes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* VAT System */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-bold text-slate-900">
                UK VAT System (2024-2025)
              </h2>
            </div>
            <p className="text-lg text-slate-600 mb-8">
              Automatic VAT calculation with support for all UK VAT rates. Select the
              appropriate rate and we'll handle the calculations.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {vatRates.filter(rate => rate.id !== 'vat-reverse-charge').map((rate) => {
                // Color scheme mapping
                const colorMap: Record<string, { from: string; to: string; border: string; text: string }> = {
                  'vat-standard': { from: 'from-green-50', to: 'to-green-100', border: 'border-green-200', text: 'text-green-700' },
                  'vat-reduced': { from: 'from-blue-50', to: 'to-blue-100', border: 'border-blue-200', text: 'text-blue-700' },
                  'vat-zero': { from: 'from-purple-50', to: 'to-purple-100', border: 'border-purple-200', text: 'text-purple-700' },
                  'vat-exempt': { from: 'from-slate-50', to: 'to-slate-100', border: 'border-slate-200', text: 'text-slate-700' },
                };
                
                const colors = colorMap[rate.id] || { from: 'from-gray-50', to: 'to-gray-100', border: 'border-gray-200', text: 'text-gray-700' };
                
                return (
                  <div key={rate.id} className={`bg-gradient-to-br ${colors.from} ${colors.to} rounded-lg p-6 border ${colors.border} hover:shadow-lg transition-shadow`}>
                    <div className={`text-3xl font-bold ${colors.text} mb-2`}>
                      {rate.rate >= 0 ? `${rate.rate}%` : 'Exempt'}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {rate.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                      {rate.description.split('.')[0]}
                    </p>
                    <ul className="text-sm text-slate-700 space-y-1">
                      {rate.examples.slice(0, 3).map((example, idx) => (
                        <li key={idx}>• {example}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Reverse Charge */}
            {(() => {
              const reverseCharge = vatRates.find(rate => rate.id === 'vat-reverse-charge');
              if (!reverseCharge) return null;
              
              return (
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {reverseCharge.name}
                      </h3>
                      <p className="text-slate-700 mb-2">
                        {reverseCharge.description}
                      </p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        {reverseCharge.examples.slice(0, 3).map((example, idx) => (
                          <li key={idx}>• {example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* CIS System */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <HardHat className="w-8 h-8 text-orange-600" />
              <h2 className="text-3xl font-bold text-slate-900">
                CIS (Construction Industry Scheme)
              </h2>
            </div>
            <p className="text-lg text-slate-600 mb-8">
              Automatic CIS deduction calculation for construction invoices. Deductions
              are applied after VAT and clearly displayed.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {cisRates.map((cisRate) => {
                // Styling based on rate
                const styleMap: Record<string, { bg: string; border: string; textColor: string; icon: any; iconColor: string; isHighlighted: boolean }> = {
                  'cis-gross': { 
                    bg: 'bg-white', 
                    border: 'border-slate-200', 
                    textColor: 'text-slate-700', 
                    icon: CheckCircle, 
                    iconColor: 'text-green-600',
                    isHighlighted: false
                  },
                  'cis-registered': { 
                    bg: 'bg-gradient-to-br from-green-50 to-green-100', 
                    border: 'border-2 border-green-300', 
                    textColor: 'text-green-700', 
                    icon: CheckCircle, 
                    iconColor: 'text-green-600',
                    isHighlighted: true
                  },
                  'cis-unregistered': { 
                    bg: 'bg-gradient-to-br from-red-50 to-red-100', 
                    border: 'border-2 border-red-300', 
                    textColor: 'text-red-700', 
                    icon: AlertTriangle, 
                    iconColor: 'text-red-600',
                    isHighlighted: true
                  },
                };
                
                const style = styleMap[cisRate.id] || styleMap['cis-gross'];
                const Icon = style.icon;
                const shadowClass = style.isHighlighted ? 'hover:shadow-lg' : 'hover:shadow-md';
                
                return (
                  <div key={cisRate.id} className={`${style.bg} rounded-lg p-6 ${style.border} ${shadowClass} transition-shadow`}>
                    <div className={`text-2xl font-bold ${style.textColor} mb-2`}>{cisRate.rate}%</div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {cisRate.name}
                    </h3>
                    <p className="text-slate-600 mb-3">{cisRate.status}</p>
                    <ul className="text-sm text-slate-700 space-y-2">
                      {cisRate.appliesTo.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Icon className={`w-4 h-4 mt-0.5 ${style.iconColor} flex-shrink-0`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* CIS Example */}
            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                CIS Calculation Example
              </h3>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal:</span>
                  <span className="font-semibold">£2,500.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">VAT (20%):</span>
                  <span className="font-semibold">£500.00</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-300">
                  <span className="text-slate-700 font-semibold">
                    Total (inc. VAT):
                  </span>
                  <span className="font-bold">£3,000.00</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>CIS Deduction (20%):</span>
                  <span className="font-semibold">-£600.00</span>
                </div>
                <div className="flex justify-between pt-2 border-t-2 border-green-300 text-green-700">
                  <span className="font-bold">Amount Due:</span>
                  <span className="font-bold text-lg">£2,400.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* How to Use */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              How to Create a UK Compliant Invoice
            </h2>

            <div className="space-y-6">
              {howToSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4 bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {step.name}
                    </h3>
                    <p className="text-slate-600">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-center text-white shadow-2xl mb-16">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-blue-200" />
            <h2 className="text-3xl font-bold mb-4">
              Ready to Create Your UK Invoice?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Generate professional, HMRC-compliant invoices with automatic VAT
              calculations, CIS deductions, and industry-specific registrations in
              minutes.
            </p>
            <Link
              href="/invoice-generator"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all hover:scale-105 text-lg shadow-xl"
            >
              Start Creating Invoices <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={ukInvoiceFAQs}
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about UK invoice compliance and HMRC requirements"
      />

      {/* Resources Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Official UK Resources
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="https://www.gov.uk/vat-rates"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <FileText className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                HMRC VAT Rates
              </h3>
              <p className="text-slate-600 text-sm mb-3">
                Official UK VAT rates and guidance from HMRC
              </p>
              <span className="text-blue-600 text-sm font-medium inline-flex items-center gap-1">
                Visit gov.uk <ArrowRight className="w-4 h-4" />
              </span>
            </a>

            <a
              href="https://www.gov.uk/what-is-the-construction-industry-scheme"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <HardHat className="w-8 h-8 text-orange-600 mb-3" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                CIS Information
              </h3>
              <p className="text-slate-600 text-sm mb-3">
                Construction Industry Scheme guidance and requirements
              </p>
              <span className="text-blue-600 text-sm font-medium inline-flex items-center gap-1">
                Visit gov.uk <ArrowRight className="w-4 h-4" />
              </span>
            </a>

            <a
              href="https://www.gov.uk/making-tax-digital"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <ShieldCheck className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Making Tax Digital
              </h3>
              <p className="text-slate-600 text-sm mb-3">
                Digital record-keeping requirements from HMRC
              </p>
              <span className="text-blue-600 text-sm font-medium inline-flex items-center gap-1">
                Visit gov.uk <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

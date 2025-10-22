import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, XCircle, BookOpen, ArrowRight } from 'lucide-react';
import { InvoiceComparisonExample } from '@/app/components/guides/InvoiceComparisonExample';
import PageHero from '@/app/components/PageHero';
import { BUSINESS_INFO, generateBreadcrumbSchema } from '@/app/lib/schemaConfig';

export const metadata: Metadata = {
  title: 'VAT Invoice Examples: Correct vs Incorrect | UK Compliance Guide',
  description: 'See side-by-side comparisons of correct and incorrect VAT invoices. Learn what makes an invoice HMRC-compliant with detailed examples and explanations.',
  keywords: [
    'VAT invoice example UK',
    'correct VAT invoice',
    'VAT invoice template',
    'HMRC compliant invoice example',
    'VAT invoice format',
    'VAT invoice mistakes',
    'UK invoice example',
    'VAT compliance examples'
  ],
  openGraph: {
    title: 'VAT Invoice Examples: Correct vs Incorrect',
    description: 'Visual comparison of correct and incorrect VAT invoices with detailed explanations.',
    type: 'article',
    url: `${BUSINESS_INFO.url}/uk-invoice-guides/vat-compliant/examples`,
  },
};

export default function VATInvoiceExamplesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'UK Invoice Guides', url: '/uk-invoice-guides' },
    { name: 'VAT-Compliant Guide', url: '/uk-invoice-guides/vat-compliant' },
    { name: 'Examples', url: '/uk-invoice-guides/vat-compliant/examples' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <PageHero
          title="VAT Invoice Examples: Correct vs Incorrect"
          description="Learn from side-by-side comparisons showing the difference between HMRC-compliant VAT invoices and common mistakes."
        >
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-slate-700">Do's Highlighted</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="font-medium text-slate-700">Don'ts Explained</span>
            </div>
          </div>
        </PageHero>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            {/* Back to Guide Link */}
            <Link
              href="/uk-invoice-guides/vat-compliant"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to VAT-Compliant Guide
            </Link>

            {/* Introduction */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to Use This Page
              </h2>
              <div className="prose prose-lg max-w-none text-slate-700">
                <p className="mb-4">
                  This page shows <strong>real invoice examples</strong> comparing correct HMRC-compliant 
                  VAT invoices with common mistakes. Each example includes:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>Correct Example:</strong> Shows proper formatting and required information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <span><strong>Incorrect Example:</strong> Demonstrates common mistakes to avoid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span><strong>Detailed Explanation:</strong> Why each difference matters for HMRC compliance</span>
                  </li>
                </ul>
                <p className="text-sm text-slate-600">
                  Study these examples before creating your own VAT invoices to ensure full compliance.
                </p>
              </div>
            </div>

            {/* Example 1: Standard Rate VAT Invoice */}
            <InvoiceComparisonExample
              title="Example 1: Standard Rate VAT Invoice (20%)"
              description="The most common VAT invoice type for professional services, showing proper formatting of all HMRC-required fields."
              correctExample={{
                invoiceNumber: 'INV-2024-0042',
                invoiceDate: '20/10/2024',
                dueDate: '03/11/2024',
                businessName: 'Professional Services Ltd',
                businessAddress: '123 Business Street\nLondon\nSW1A 1AA',
                businessPhone: '+44 20 1234 5678',
                businessEmail: 'invoices@proservices.co.uk',
                vatNumber: 'GB 123 4567 89',
                companyNumber: '12345678',
                clientName: 'Client Company Ltd',
                clientAddress: '456 Client Road\nManchester\nM1 1AA',
                clientVatNumber: 'GB 987 6543 21',
                lineItems: [
                  {
                    description: 'Management Consultancy Services - October 2024',
                    quantity: 40,
                    rate: 150.00,
                    amount: 6000.00,
                    vatRate: 'Standard 20%'
                  },
                  {
                    description: 'Travel Expenses (London-Manchester)',
                    quantity: 1,
                    rate: 120.00,
                    amount: 120.00,
                    vatRate: 'Standard 20%'
                  }
                ],
                subtotal: 6120.00,
                vatAmount: 1224.00,
                vatRate: '20%',
                totalAmount: 7344.00,
                bankName: 'Barclays Bank',
                accountNumber: '12345678',
                sortCode: '20-00-00',
                paymentTerms: 'Net 14 days'
              }}
              incorrectExample={{
                invoiceNumber: '42',
                invoiceDate: '10/20/2024',
                businessName: 'Professional Services Ltd',
                businessAddress: '123 Business Street, London',
                businessEmail: 'invoices@proservices.co.uk',
                vatNumber: '123456789',
                clientName: 'Client Company Ltd',
                lineItems: [
                  {
                    description: 'Services',
                    quantity: 1,
                    rate: 6120.00,
                    amount: 6120.00
                  }
                ],
                subtotal: 6120.00,
                vatAmount: 1224.00,
                totalAmount: 7344.00,
                paymentTerms: '2 weeks'
              }}
              comparisonPoints={[
                {
                  aspect: 'Invoice Number Format',
                  correct: 'Sequential alphanumeric format: INV-2024-0042',
                  incorrect: 'Simple number without prefix: 42',
                  explanation: 'HMRC requires unique, sequential invoice numbers that cannot be duplicated. A prefix (like "INV-") combined with year and sequence number ensures uniqueness across years. Simple numbers like "42" can easily be duplicated in different years, violating HMRC requirements and making tracking difficult.'
                },
                {
                  aspect: 'VAT Registration Number',
                  correct: 'GB prefix with proper formatting: GB 123 4567 89',
                  incorrect: 'Numbers only without country prefix: 123456789',
                  explanation: 'UK VAT numbers MUST include the "GB" country code prefix. The official HMRC format uses spaces (GB XXX XXXX XX) for readability and validation. Missing the GB prefix makes the invoice non-compliant and can cause issues with customer VAT reclaim processes.'
                },
                {
                  aspect: 'Date Format',
                  correct: 'UK date format DD/MM/YYYY: 20/10/2024',
                  incorrect: 'US date format MM/DD/YYYY: 10/20/2024',
                  explanation: 'UK invoices must use the British date format (day/month/year). Using the American format (month/day/year) causes confusion and may lead to incorrect VAT period reporting. For example, 10/20/2024 could be misread as 10th August instead of 20th October.'
                },
                {
                  aspect: 'Line Item Description Detail',
                  correct: 'Specific description with context: "Management Consultancy Services - October 2024"',
                  incorrect: 'Vague generic description: "Services"',
                  explanation: 'HMRC requires clear, detailed descriptions of goods or services supplied. Vague terms like "Services" are not acceptable for VAT invoices. Detailed descriptions help with VAT inspections, disputes, and ensure the correct VAT rate is applied. They also help customers understand what they\'re paying for.'
                },
                {
                  aspect: 'VAT Rate Display',
                  correct: 'VAT rate clearly shown for each line item: "Standard 20%"',
                  incorrect: 'No VAT rate information displayed on line items',
                  explanation: 'Each line item must show which VAT rate applies. This is crucial when invoices mix different VAT rates (20%, 5%, 0%, exempt). Displaying rates prevents confusion, helps with VAT returns, and is required for HMRC compliance. The total section must also clearly show the VAT percentage.'
                },
                {
                  aspect: 'Business Address',
                  correct: 'Complete address with postcode on separate lines: "123 Business Street\nLondon\nSW1A 1AA"',
                  incorrect: 'Incomplete single-line address: "123 Business Street, London"',
                  explanation: 'HMRC requires your complete registered business address including full postcode. Multi-line formatting improves readability and meets postal standards. Missing postcode or incomplete address can invalidate the invoice. The address must match your VAT registration details.'
                },
                {
                  aspect: 'Company Registration Number',
                  correct: 'Companies House number displayed: "12345678"',
                  incorrect: 'Company number missing from invoice',
                  explanation: 'While not mandatory for VAT compliance, displaying your Companies House registration number (if you\'re a limited company) adds legitimacy and helps customers verify your business. It\'s considered best practice and is legally required on company letterheads and certain documents.'
                },
                {
                  aspect: 'Customer Information',
                  correct: 'Full customer details including address and VAT number if applicable',
                  incorrect: 'Minimal customer information (name only)',
                  explanation: 'VAT invoices must include the customer\'s full name and address. For B2B transactions, including the customer\'s VAT number helps them reclaim VAT and is required for certain supplies. Complete customer details are essential for HMRC compliance and audit purposes.'
                },
                {
                  aspect: 'Payment Terms Clarity',
                  correct: 'Specific payment terms: "Net 14 days"',
                  incorrect: 'Vague payment terms: "2 weeks"',
                  explanation: 'Clear, professional payment terms prevent disputes. "Net 14 days" is industry-standard terminology that specifies exactly when payment is due from the invoice date. Vague terms like "2 weeks" can cause confusion about whether it means calendar days or business days.'
                },
                {
                  aspect: 'Bank Details Format',
                  correct: 'Proper UK bank format: Sort Code "20-00-00", Account "12345678"',
                  incorrect: 'Missing or improperly formatted bank details',
                  explanation: 'UK bank details should follow standard format: 6-digit sort code (XX-XX-XX) and 8-digit account number. Proper formatting helps customers make accurate payments and reduces errors. Including bank name provides additional verification and confidence.'
                }
              ]}
            />

            {/* Example 2: Invoice with Mixed VAT Rates */}
            <InvoiceComparisonExample
              title="Example 2: Mixed VAT Rates Invoice"
              description="Demonstrates how to handle invoices with different VAT rates (20%, 5%, 0%) on the same document."
              correctExample={{
                invoiceNumber: 'INV-2024-0156',
                invoiceDate: '20/10/2024',
                businessName: 'UK Construction Services Ltd',
                businessAddress: '89 Builder Street\nBirmingham\nB1 1AA',
                businessEmail: 'accounts@ukconst.co.uk',
                vatNumber: 'GB 987 6543 21',
                clientName: 'Homeowner Properties Ltd',
                clientAddress: '12 Residential Avenue\nLeeds\nLS1 5XX',
                lineItems: [
                  {
                    description: 'Standard Building Work - Extension',
                    quantity: 1,
                    rate: 5000.00,
                    amount: 5000.00,
                    vatRate: 'Standard 20%'
                  },
                  {
                    description: 'Energy-Saving Insulation Installation',
                    quantity: 1,
                    rate: 2000.00,
                    amount: 2000.00,
                    vatRate: 'Reduced 5%'
                  },
                  {
                    description: 'Solar Panel Installation (Materials)',
                    quantity: 1,
                    rate: 3000.00,
                    amount: 3000.00,
                    vatRate: 'Zero 0%'
                  }
                ],
                subtotal: 10000.00,
                vatAmount: 1100.00,
                vatRate: 'Mixed rates (see breakdown)',
                totalAmount: 11100.00,
                notes: 'VAT Breakdown: £5,000 @ 20% = £1,000 | £2,000 @ 5% = £100 | £3,000 @ 0% = £0',
                paymentTerms: 'Net 30 days'
              }}
              incorrectExample={{
                invoiceNumber: 'INV-156',
                invoiceDate: '20/10/2024',
                businessName: 'UK Construction Services Ltd',
                businessAddress: '89 Builder Street, Birmingham',
                vatNumber: 'GB 987 6543 21',
                clientName: 'Homeowner Properties Ltd',
                lineItems: [
                  {
                    description: 'Building Work',
                    quantity: 1,
                    rate: 10000.00,
                    amount: 10000.00,
                    vatRate: '20%'
                  }
                ],
                subtotal: 10000.00,
                vatAmount: 2000.00,
                vatRate: '20%',
                totalAmount: 12000.00,
                paymentTerms: '30 days'
              }}
              comparisonPoints={[
                {
                  aspect: 'VAT Rate per Line Item',
                  correct: 'Each line item shows its specific VAT rate: Standard 20%, Reduced 5%, Zero 0%',
                  incorrect: 'All items lumped together with single 20% VAT rate',
                  explanation: 'When an invoice contains items with different VAT rates, you MUST show the rate for each item separately. Applying a single VAT rate to items that qualify for different rates (like energy-saving materials at 5% or 0%) means overcharging the customer and incorrectly reporting VAT to HMRC.'
                },
                {
                  aspect: 'VAT Breakdown in Totals',
                  correct: 'Detailed breakdown showing VAT calculation for each rate: "£5,000 @ 20% = £1,000 | £2,000 @ 5% = £100 | £3,000 @ 0% = £0"',
                  incorrect: 'Single total VAT amount with no rate breakdown',
                  explanation: 'For mixed VAT rate invoices, HMRC requires a breakdown showing the subtotal and VAT amount for each rate. This must be clearly displayed in the totals section or notes. Without this breakdown, it\'s impossible to verify correct VAT treatment and the invoice may be rejected.'
                },
                {
                  aspect: 'Item Description Specificity',
                  correct: 'Specific descriptions that justify the VAT rate: "Energy-Saving Insulation Installation" (clearly qualifies for 5%)',
                  incorrect: 'Generic description: "Building Work" (doesn\'t indicate special VAT treatment)',
                  explanation: 'When using reduced or zero VAT rates, the item description must clearly show why that rate applies. "Energy-Saving Insulation Installation" justifies the 5% rate, while "Building Work" is too vague. Descriptions must be specific enough for HMRC to verify the correct rate was applied during an inspection.'
                },
                {
                  aspect: 'Total VAT Calculation',
                  correct: 'Correct total: £1,000 (20%) + £100 (5%) + £0 (0%) = £1,100',
                  incorrect: 'Incorrect: £10,000 × 20% = £2,000 (overcharging by £900)',
                  explanation: 'Calculating VAT incorrectly by applying a single rate to all items when they qualify for different rates results in overcharging customers and reporting too much VAT. In this example, using 20% on everything charges £2,000 instead of £1,100 - a £900 error that must be corrected and could trigger HMRC penalties.'
                },
                {
                  aspect: 'Compliance Documentation',
                  correct: 'Notes section includes VAT breakdown for audit trail',
                  incorrect: 'No supporting information about VAT calculation',
                  explanation: 'Including a clear VAT breakdown in notes or footer provides an audit trail for both the customer and HMRC. This documentation is especially important for mixed-rate invoices and helps prevent disputes. It shows professional accounting practices and makes VAT return preparation easier.'
                }
              ]}
            />

            {/* Cross-Promotion: CIS Examples */}
            <div className="mt-16 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 rounded-xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <BookOpen className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    🏗️ Construction Industry? Learn CIS Invoice Requirements
                  </h3>
                  <p className="text-slate-700 mb-4">
                    If you work in construction, you also need to understand CIS (Construction Industry Scheme) 
                    deductions. Our CIS examples guide shows the <strong>#1 mistake that costs contractors money</strong> 
                    - calculating deductions before VAT instead of after.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <div className="font-semibold text-slate-900 mb-2">⚠️ Critical CIS Topics:</div>
                      <ul className="space-y-1 text-slate-600">
                        <li>• Correct CIS calculation method (AFTER VAT)</li>
                        <li>• UTR number requirements (mandatory)</li>
                        <li>• Amount due calculations</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <div className="font-semibold text-slate-900 mb-2">📊 Advanced Scenarios:</div>
                      <ul className="space-y-1 text-slate-600">
                        <li>• CIS with Reverse Charge VAT</li>
                        <li>• 20% vs 30% deduction rates</li>
                        <li>• Notional VAT calculations</li>
                      </ul>
                    </div>
                  </div>
                  <Link
                    href="/uk-invoice-guides/cis-deduction/examples"
                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                  >
                    View CIS Invoice Examples & Avoid Costly Mistakes
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <Link
                href="/uk-invoice-guides/vat-compliant"
                className="group bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <ArrowLeft className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      Back to VAT-Compliant Guide
                    </h3>
                    <p className="text-sm text-slate-600">
                      Learn the theory and requirements behind VAT-compliant invoices
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/invoice-generator"
                className="group bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                      Create Your VAT Invoice
                    </h3>
                    <p className="text-sm text-slate-600">
                      Use our free generator to create HMRC-compliant VAT invoices automatically
                    </p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, XCircle, BookOpen, ArrowRight, AlertTriangle } from 'lucide-react';
import { InvoiceComparisonExample } from '@/app/components/guides/InvoiceComparisonExample';
import PageHero from '@/app/components/PageHero';
import { BUSINESS_INFO, generateBreadcrumbSchema } from '@/app/lib/schemaConfig';

export const metadata: Metadata = {
  title: 'CIS Invoice Examples: Correct vs Incorrect | Construction Tax Guide',
  description: 'Master CIS deduction calculations with side-by-side invoice examples. Learn the #1 mistake contractors make and how to avoid it.',
  keywords: [
    'CIS invoice example UK',
    'CIS deduction calculation',
    'construction invoice template',
    'CIS registered invoice',
    'CIS 20% deduction example',
    'CIS tax invoice format',
    'subcontractor invoice example',
    'CIS compliance examples'
  ],
  openGraph: {
    title: 'CIS Invoice Examples: Correct vs Incorrect Calculations',
    description: 'Visual guide to CIS deduction calculations with common mistakes explained.',
    type: 'article',
    url: `${BUSINESS_INFO.url}/uk-invoice-guides/cis-deduction/examples`,
  },
};

export default function CISInvoiceExamplesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'UK Invoice Guides', url: '/uk-invoice-guides' },
    { name: 'CIS Deduction Guide', url: '/uk-invoice-guides/cis-deduction' },
    { name: 'Examples', url: '/uk-invoice-guides/cis-deduction/examples' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
        <PageHero
          title="CIS Invoice Examples: Correct vs Incorrect"
          description="Master Construction Industry Scheme calculations with real invoice examples showing the difference between correct and incorrect CIS deductions."
        >
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-slate-700">#1 CIS Mistake Highlighted</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-slate-700">Correct Calculations</span>
            </div>
          </div>
        </PageHero>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            {/* Back to Guide Link */}
            <Link
              href="/uk-invoice-guides/cis-deduction"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to CIS Deduction Guide
            </Link>

            {/* Critical Warning */}
            <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-8 mb-12">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    ⚠️ The #1 CIS Mistake (Costs You Money!)
                  </h2>
                  <div className="prose prose-lg max-w-none text-slate-700">
                    <p className="mb-4 text-lg font-semibold">
                      Most common error: Calculating CIS deduction on the net amount BEFORE adding VAT
                    </p>
                    <div className="bg-white rounded-lg p-6 mb-4 border-2 border-orange-200">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="text-red-600 font-bold mb-2 flex items-center gap-2">
                            <XCircle className="w-5 h-5" />
                            WRONG:
                          </div>
                          <div className="space-y-1 text-sm font-mono">
                            <div>Net: £2,500</div>
                            <div>VAT: £500</div>
                            <div className="text-red-600 font-bold">❌ CIS 20% of £2,500 = £500</div>
                            <div>Amount Due: £2,500</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-green-600 font-bold mb-2 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            CORRECT:
                          </div>
                          <div className="space-y-1 text-sm font-mono">
                            <div>Net: £2,500</div>
                            <div>VAT: £500</div>
                            <div>Total inc VAT: £3,000</div>
                            <div className="text-green-600 font-bold">✓ CIS 20% of £3,000 = £600</div>
                            <div>Amount Due: £2,400</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm">
                      <strong>Impact:</strong> Using the wrong method means you receive £100 more than you should 
                      (£2,500 vs £2,400), causing tax shortfalls that HMRC will eventually catch and correct, 
                      potentially with penalties.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 1: CIS Registered Subcontractor (20%) */}
            <InvoiceComparisonExample
              title="Example 1: CIS Registered Subcontractor (20% Deduction)"
              description="Standard CIS invoice for a registered subcontractor showing the correct method for calculating the 20% CIS deduction AFTER VAT."
              correctExample={{
                invoiceNumber: 'BUILD-2024-0089',
                invoiceDate: '20/10/2024',
                businessName: 'Builder Subcontractors Ltd',
                businessAddress: '45 Construction Way\nLeeds\nLS1 1AA',
                businessEmail: 'accounts@buildsub.co.uk',
                vatNumber: 'GB 555 4444 33',
                utr: '1234567890',
                clientName: 'Main Contractor Ltd',
                clientAddress: '89 Site Road\nLeeds\nLS2 2BB',
                clientUtr: '0987654321',
                lineItems: [
                  {
                    description: 'Brickwork - Single Storey Extension',
                    quantity: 40,
                    rate: 50.00,
                    amount: 2000.00
                  },
                  {
                    description: 'Materials (Bricks, Cement, Sand)',
                    quantity: 1,
                    rate: 500.00,
                    amount: 500.00
                  }
                ],
                subtotal: 2500.00,
                vatAmount: 500.00,
                vatRate: '20%',
                totalAmount: 3000.00,
                cisDeduction: 600.00,
                cisRate: '20%',
                amountDue: 2400.00,
                cisNotice: 'CIS deduction of £600.00 (20%) has been calculated on the total amount including VAT (£3,000.00). Contractor will pay £600.00 to HMRC on behalf of subcontractor.',
                paymentTerms: 'Net 30 days'
              }}
              incorrectExample={{
                invoiceNumber: 'BUILD-89',
                invoiceDate: '20/10/2024',
                businessName: 'Builder Subcontractors Ltd',
                businessAddress: '45 Construction Way, Leeds',
                vatNumber: 'GB 555 4444 33',
                clientName: 'Main Contractor Ltd',
                lineItems: [
                  {
                    description: 'Building Work',
                    quantity: 1,
                    rate: 2500.00,
                    amount: 2500.00
                  }
                ],
                subtotal: 2500.00,
                vatAmount: 500.00,
                vatRate: '20%',
                totalAmount: 3000.00,
                cisDeduction: 500.00,
                cisRate: '20%',
                amountDue: 2500.00,
                paymentTerms: '30 days'
              }}
              comparisonPoints={[
                {
                  aspect: 'CIS Calculation Method (CRITICAL)',
                  correct: 'CIS calculated on total INCLUDING VAT: 20% × £3,000 = £600',
                  incorrect: 'CIS calculated on net BEFORE VAT: 20% × £2,500 = £500',
                  explanation: 'This is THE most common CIS mistake and it costs subcontractors money. HMRC rules state CIS deductions must be calculated on the TOTAL amount including VAT. The correct calculation is: Net (£2,500) + VAT (£500) = £3,000, then CIS 20% of £3,000 = £600. Calculating on the net amount (£2,500) gives £500, which is £100 short of the required tax payment.'
                },
                {
                  aspect: 'UTR (Unique Taxpayer Reference) Requirements',
                  correct: 'Both subcontractor UTR (1234567890) and contractor UTR (0987654321) displayed',
                  incorrect: 'UTR numbers completely missing from invoice',
                  explanation: 'Including UTR numbers for BOTH parties is MANDATORY for CIS compliance. This is not optional - without UTRs, the invoice is invalid for CIS purposes. HMRC uses these numbers to track tax deductions and credits. Contractors cannot claim CIS payments without valid UTR documentation.'
                },
                {
                  aspect: 'Work Description Detail',
                  correct: 'Specific description with hours/rates: "Brickwork - Single Storey Extension" (40 hrs @ £50)',
                  incorrect: 'Vague generic description: "Building Work" with single lump sum',
                  explanation: 'CIS invoices require detailed descriptions of the construction work performed. HMRC needs to verify that the work qualifies under CIS. Specific descriptions like "Brickwork - Single Storey Extension" with quantity and rate breakdowns provide audit trails and prevent disputes. Generic terms like "Building Work" are non-compliant.'
                },
                {
                  aspect: 'Materials Itemization',
                  correct: 'Materials listed separately: "Materials (Bricks, Cement, Sand) - £500"',
                  incorrect: 'Materials included in generic line with no breakdown',
                  explanation: 'While CIS typically applies to the total (labour + materials), itemizing materials separately provides transparency and helps with record-keeping. It\'s particularly important when materials need to be excluded from CIS (rare cases where merchant invoices contractor directly). Clear itemization prevents future disputes.'
                },
                {
                  aspect: 'CIS Notice/Explanation',
                  correct: 'Clear notice explaining CIS calculation basis and contractor obligations',
                  incorrect: 'No explanation of how CIS deduction was calculated',
                  explanation: 'Including a CIS notice that explains the calculation method (on total inc VAT) and confirms the contractor will remit to HMRC is best practice. It prevents disputes, educates contractors who may not understand CIS, and provides documentation for both parties\' records. This transparency builds trust and ensures compliance.'
                },
                {
                  aspect: 'Amount Due Display',
                  correct: 'Clear breakdown: Total (£3,000) - CIS (£600) = Amount Due (£2,400)',
                  incorrect: 'Confusing calculation showing wrong amount due (£2,500)',
                  explanation: 'The "Amount Due" must be clearly calculated as: Total including VAT minus CIS deduction. In this example: £3,000 - £600 = £2,400. Showing £2,500 (from incorrect calculation) means the subcontractor is overcharging by £100, which creates tax discrepancies that HMRC will eventually identify and correct.'
                },
                {
                  aspect: 'Invoice Number Format',
                  correct: 'Professional format with prefix: BUILD-2024-0089',
                  incorrect: 'Simple format: BUILD-89',
                  explanation: 'Sequential invoice numbers with year prefix (BUILD-2024-XXXX) prevent duplication across years and provide better organization. While BUILD-89 may seem adequate, using year-based numbering (BUILD-2024-0089) ensures uniqueness and makes tracking invoices across tax years much easier for both parties.'
                },
                {
                  aspect: 'Full Address with Postcode',
                  correct: 'Multi-line address with postcode: "45 Construction Way\nLeeds\nLS1 1AA"',
                  incorrect: 'Incomplete address: "45 Construction Way, Leeds"',
                  explanation: 'CIS invoices require complete addresses with postcodes for both parties. This ensures HMRC can verify business registrations and locations. Missing postcodes or incomplete addresses can cause compliance issues. Multi-line formatting improves readability and follows UK addressing standards.'
                },
                {
                  aspect: 'Payment Terms Specificity',
                  correct: 'Industry-standard terms: "Net 30 days"',
                  incorrect: 'Vague terms: "30 days" (without Net prefix)',
                  explanation: 'Professional invoices use "Net X days" terminology. "Net 30" means payment is due 30 days from invoice date with no deductions. Simply stating "30 days" is less professional and can cause confusion. Clear payment terms are important for cash flow and reduce payment disputes.'
                }
              ]}
            />

            {/* Example 2: CIS with Reverse Charge VAT */}
            <InvoiceComparisonExample
              title="Example 2: CIS with Reverse Charge VAT (Complex Scenario)"
              description="Advanced example showing how CIS and Reverse Charge VAT work together - the most confusing scenario in construction invoicing."
              correctExample={{
                invoiceNumber: 'BUILD-2024-0167',
                invoiceDate: '20/10/2024',
                businessName: 'Advanced Builders Ltd',
                businessAddress: '34 Construction Avenue\nLondon\nEC1A 1BB',
                vatNumber: 'GB 123 4567 89',
                utr: '9999888877',
                clientName: 'Main Contractors PLC',
                clientAddress: '78 Contractor Street\nLondon\nE14 5RP',
                clientVatNumber: 'GB 987 6543 21',
                clientUtr: '777766665',
                lineItems: [
                  {
                    description: 'Groundwork and Foundations - New Build',
                    quantity: 1,
                    rate: 6000.00,
                    amount: 6000.00
                  },
                  {
                    description: 'Materials (Concrete, Steel Reinforcement)',
                    quantity: 1,
                    rate: 2000.00,
                    amount: 2000.00
                  }
                ],
                subtotal: 8000.00,
                vatAmount: 0,
                totalAmount: 8000.00,
                cisDeduction: 1920.00,
                cisRate: '20%',
                amountDue: 6080.00,
                reverseChargeNotice: 'REVERSE CHARGE: Customer must account for £1,600 VAT to HMRC directly. No VAT charged on this invoice.',
                cisNotice: 'CIS deduction of £1,920 (20%) calculated on notional total of £9,600 (including VAT that would have been charged). Customer pays £6,080 to subcontractor and £1,920 to HMRC.',
                notes: 'Calculation: Net £8,000 + Notional VAT £1,600 (20%) = £9,600. CIS 20% of £9,600 = £1,920. Amount Due: £8,000 - £1,920 = £6,080.',
                paymentTerms: 'Net 30 days'
              }}
              incorrectExample={{
                invoiceNumber: 'BUILD-167',
                invoiceDate: '20/10/2024',
                businessName: 'Advanced Builders Ltd',
                businessAddress: '34 Construction Avenue, London',
                vatNumber: 'GB 123 4567 89',
                clientName: 'Main Contractors PLC',
                lineItems: [
                  {
                    description: 'Construction Work',
                    quantity: 1,
                    rate: 8000.00,
                    amount: 8000.00
                  }
                ],
                subtotal: 8000.00,
                vatAmount: 0,
                totalAmount: 8000.00,
                cisDeduction: 1600.00,
                cisRate: '20%',
                amountDue: 6400.00,
                notes: 'Reverse charge applies'
              }}
              comparisonPoints={[
                {
                  aspect: 'CIS Calculation with Reverse Charge',
                  correct: 'CIS calculated on NOTIONAL total including VAT: 20% of £9,600 (£8,000 + £1,600 VAT) = £1,920',
                  incorrect: 'CIS calculated on net amount only: 20% of £8,000 = £1,600',
                  explanation: 'When reverse charge VAT applies, no VAT is charged on the invoice, BUT CIS must still be calculated as if VAT were charged. The correct method: Calculate what VAT would be (£8,000 × 20% = £1,600), add to net (£8,000 + £1,600 = £9,600), then apply CIS 20% to get £1,920. Calculating on just £8,000 gives £1,600 - short by £320!'
                },
                {
                  aspect: 'Reverse Charge Notice',
                  correct: 'Clear notice stating customer must account for VAT: "Customer must account for £1,600 VAT to HMRC directly"',
                  incorrect: 'Vague note: "Reverse charge applies" with no detail',
                  explanation: 'Reverse charge notices must be explicit and include the VAT amount the customer must account for. Simply stating "reverse charge applies" is insufficient - the customer needs to know exactly how much VAT to report. The notice should state: which party accounts for VAT, the amount, and that it\'s paid directly to HMRC.'
                },
                {
                  aspect: 'CIS Calculation Explanation',
                  correct: 'Detailed explanation: "CIS 20% calculated on notional total of £9,600 (including VAT that would have been charged)"',
                  incorrect: 'No explanation of calculation method',
                  explanation: 'With reverse charge VAT, the CIS calculation becomes very confusing. You MUST explain that CIS is calculated on the notional total (what it would be with VAT). Without this explanation, contractors will dispute the deduction, thinking £1,600 (20% of £8,000) is correct when it\'s actually £1,920.'
                },
                {
                  aspect: 'Amount Due Calculation',
                  correct: 'Net amount minus CIS: £8,000 - £1,920 = £6,080',
                  incorrect: 'Wrong calculation: £8,000 - £1,600 = £6,400 (overpaid by £320)',
                  explanation: 'The amount due is net minus CIS deduction. With correct CIS of £1,920, the amount due is £6,080. Using incorrect CIS of £1,600 results in £6,400 - meaning the subcontractor receives £320 more than they should. This creates a tax shortfall that HMRC will eventually identify and correct.'
                },
                {
                  aspect: 'Both UTR Numbers',
                  correct: 'Both parties\' UTR numbers displayed: Subcontractor (9999888877) and Contractor (777766665)',
                  incorrect: 'UTR numbers missing from invoice',
                  explanation: 'UTR numbers are ALWAYS mandatory for CIS invoices, whether reverse charge applies or not. Both the subcontractor\'s and contractor\'s UTR must be shown. Without these, the invoice is invalid for CIS purposes and HMRC cannot track the deduction and credit properly.'
                },
                {
                  aspect: 'Work Description Detail',
                  correct: 'Specific work type: "Groundwork and Foundations - New Build" with materials itemized',
                  incorrect: 'Generic: "Construction Work"',
                  explanation: 'Detailed work descriptions are crucial for CIS compliance. "Groundwork and Foundations - New Build" clearly indicates CIS-qualifying construction work. Generic terms like "Construction Work" don\'t provide enough detail for HMRC verification and can lead to disputes about whether CIS should apply.'
                },
                {
                  aspect: 'Calculation Notes',
                  correct: 'Step-by-step calculation: "Net £8,000 + Notional VAT £1,600 = £9,600. CIS 20% of £9,600 = £1,920"',
                  incorrect: 'No calculation breakdown provided',
                  explanation: 'For complex scenarios involving reverse charge and CIS, providing a step-by-step calculation in the notes section is essential. It helps both parties understand how amounts were calculated, prevents disputes, and provides an audit trail for HMRC inspections. This transparency is professional and protects both parties.'
                }
              ]}
            />

            {/* Cross-Promotion: VAT Examples */}
            <div className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <BookOpen className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    📘 Also Learn: VAT-Compliant Invoice Examples
                  </h3>
                  <p className="text-slate-700 mb-4">
                    Beyond CIS, ensure your invoices meet HMRC VAT compliance standards. Our VAT examples 
                    guide covers proper VAT number formatting, date formats, line item descriptions, and more.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="font-semibold text-slate-900 mb-2">✓ What You'll Learn:</div>
                      <ul className="space-y-1 text-slate-600">
                        <li>• Correct VAT number format (GB prefix)</li>
                        <li>• UK vs US date format differences</li>
                        <li>• Invoice numbering best practices</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="font-semibold text-slate-900 mb-2">✓ Special Scenarios:</div>
                      <ul className="space-y-1 text-slate-600">
                        <li>• Mixed VAT rates (20%, 5%, 0%)</li>
                        <li>• Proper line item descriptions</li>
                        <li>• Complete address formatting</li>
                      </ul>
                    </div>
                  </div>
                  <Link
                    href="/uk-invoice-guides/vat-compliant/examples"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                  >
                    View VAT Invoice Examples
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <Link
                href="/uk-invoice-guides/cis-deduction"
                className="group bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <ArrowLeft className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                      Back to CIS Deduction Guide
                    </h3>
                    <p className="text-sm text-slate-600">
                      Learn the complete CIS system, rates, and compliance requirements
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/invoice-generator/construction-invoice"
                className="group bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                      Create CIS Invoice
                    </h3>
                    <p className="text-sm text-slate-600">
                      Generate construction invoices with automatic CIS calculations
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

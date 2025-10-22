import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  getGuideBySlug, 
  getAllGuideSlugs, 
  getRelatedGuides,
  GuideArticle,
  GuideSection
} from '../../lib/ukInvoiceGuidesData';
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '../../lib/schemaConfig';
import PageHero from '../../components/PageHero';
import { InvoiceComparisonExample } from '../../components/guides/InvoiceComparisonExample';
import { 
  Clock, 
  Calendar, 
  User,
  Tag,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Info,
  AlertTriangle,
  AlertCircle,
  ChevronRight,
  FileText,
  Download,
  BookOpen
} from 'lucide-react';

// Generate static params for all guide articles at build time
export async function generateStaticParams() {
  const slugs = getAllGuideSlugs();
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {
      title: 'Guide Not Found',
    };
  }

  return {
    title: `${guide.title} | Elektroluma`,
    description: guide.metaDescription,
    keywords: guide.keywords,
    authors: [{ name: guide.author }],
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      type: 'article',
      publishedTime: guide.publishedDate,
      modifiedTime: guide.updatedDate,
      authors: [guide.author],
      tags: guide.keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.metaDescription,
    },
  };
}

// Render callout boxes
function Callout({ type, title, content }: { type: string; title: string; content: string }) {
  const styles = {
    info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: Info, iconColor: 'text-blue-600' },
    warning: { bg: 'bg-amber-50', border: 'border-amber-200', icon: AlertTriangle, iconColor: 'text-amber-600' },
    success: { bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle, iconColor: 'text-green-600' },
    danger: { bg: 'bg-red-50', border: 'border-red-200', icon: AlertCircle, iconColor: 'text-red-600' }
  };

  const style = styles[type as keyof typeof styles] || styles.info;
  const Icon = style.icon;

  return (
    <div className={`${style.bg} border-2 ${style.border} rounded-xl p-6 my-6`}>
      <div className="flex items-start gap-4">
        <Icon className={`w-6 h-6 ${style.iconColor} flex-shrink-0 mt-1`} />
        <div>
          <h4 className="font-bold text-slate-900 text-lg mb-2">{title}</h4>
          <p className="text-slate-700 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}

// Render section content
function renderSection(section: GuideSection) {
  return (
    <div key={section.id} className="mb-12 scroll-mt-20" id={section.id}>
      <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-primary-600">#</span>
        {section.heading}
      </h2>

      {/* Main content */}
      <div className="prose prose-lg max-w-none text-slate-700 mb-6 leading-relaxed">
        {section.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="mb-4">{paragraph}</p>
        ))}
      </div>

      {/* Callout */}
      {section.callout && (
        <Callout
          type={section.callout.type}
          title={section.callout.title}
          content={section.callout.content}
        />
      )}

      {/* Subsections */}
      {section.subsections && section.subsections.length > 0 && (
        <div className="space-y-8 mt-8">
          {section.subsections.map((subsection, idx) => (
            <div key={idx} className="pl-6 border-l-4 border-primary-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {subsection.heading}
              </h3>
              <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
                {subsection.content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="mb-3">{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      {section.table && (
        <div className="my-8 overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-primary-600 to-accent-500">
                {section.table.headers.map((header, idx) => (
                  <th key={idx} className="px-6 py-4 text-left text-white font-bold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="px-6 py-4 text-slate-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* List */}
      {section.list && (
        <div className="my-8">
          {section.list.type === 'ordered' && (
            <ol className="space-y-4">
              {section.list.items.map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 text-white font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700 pt-1 leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
          )}
          {section.list.type === 'unordered' && (
            <ul className="space-y-3">
              {section.list.items.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <ChevronRight className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}
          {section.list.type === 'checklist' && (
            <ul className="space-y-3">
              {section.list.items.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Code Example */}
      {section.codeExample && (
        <div className="my-8">
          <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-sm font-mono">
                {section.codeExample.language}
              </span>
              <button className="text-slate-400 hover:text-white text-sm flex items-center gap-2">
                <Download className="w-4 h-4" />
                Copy
              </button>
            </div>
            <pre className="text-slate-100 font-mono text-sm leading-relaxed">
              <code>{section.codeExample.code}</code>
            </pre>
          </div>
          {section.codeExample.description && (
            <p className="text-sm text-slate-600 mt-2">{section.codeExample.description}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default async function GuideArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  // Show 404 if guide not found
  if (!guide) {
    notFound();
  }

  // Get related guides
  const relatedGuides = getRelatedGuides(guide, 3);

  // Generate schemas
  const articleSchema = generateArticleSchema({
    headline: guide.title,
    description: guide.metaDescription,
    author: guide.author,
    datePublished: guide.publishedDate,
    dateModified: guide.updatedDate,
    keywords: guide.keywords,
    category: guide.category,
    url: `/uk-invoice-guides/${slug}`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'UK Invoice Guides', url: '/uk-invoice-guides' },
    { name: guide.title, url: `/uk-invoice-guides/${slug}` },
  ]);

  const faqSchema = generateFAQSchema(guide.faq);

  return (
    <>
      {/* Schema.org Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <PageHero
          title={guide.title}
          description={guide.excerpt}
        >
          {/* Guide Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-slate-600">
            {/* Category Badge */}
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
              <span className="text-2xl">{guide.categoryIcon}</span>
              <span className="font-medium text-slate-700">{guide.category}</span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-slate-500" />
              <span>{guide.author}</span>
            </div>

            {/* Published Date */}
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-500" />
              <time dateTime={guide.publishedDate}>
                {new Date(guide.publishedDate).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>

            {/* Read Time */}
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-500" />
              <span>{guide.readTime} min read</span>
            </div>

            {/* Search Volume */}
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-slate-500" />
              <span>{guide.searchVolume.toLocaleString()} searches/mo</span>
            </div>
          </div>
        </PageHero>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-sm text-slate-600 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/uk-invoice-guides" className="hover:text-primary-600 transition-colors">
                UK Invoice Guides
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium">{guide.title.split(':')[0]}</span>
            </nav>

            {/* Back Button */}
            <Link
              href="/uk-invoice-guides"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to All Guides
            </Link>

            {/* Article Content */}
            <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
              {/* Table of Contents */}
              <div className="bg-slate-50 rounded-xl p-6 mb-12 border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary-600" />
                  Table of Contents
                </h2>
                <ul className="space-y-2">
                  {guide.content.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-primary-600 hover:text-primary-700 hover:underline transition-colors flex items-center gap-2"
                      >
                        <ChevronRight className="w-4 h-4" />
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Render Content Sections */}
              {guide.content.map(section => renderSection(section))}

              {/* Link to Detailed Examples Section - VAT-Compliant */}
              {guide.slug === 'vat-compliant' && (
                <div className="my-12 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-8 shadow-lg">
                  <div className="flex items-start gap-4">
                    <BookOpen className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        📚 See Real Invoice Examples with Do's & Don'ts
                      </h3>
                      <p className="text-slate-700 text-lg mb-4 leading-relaxed">
                        Master VAT-compliant invoicing with our detailed side-by-side comparisons. Learn from 
                        <strong> correct examples</strong> and avoid <strong>common mistakes</strong> that cause HMRC compliance issues.
                      </p>
                      <ul className="space-y-2 mb-6 text-slate-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Visual invoice comparisons showing correct vs incorrect formatting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Detailed explanations of why each difference matters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Multiple scenarios including standard VAT and mixed-rate invoices</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Learn the exact format HMRC expects for VAT numbers, dates, and descriptions</span>
                        </li>
                      </ul>
                      <Link
                        href="/uk-invoice-guides/vat-compliant/examples"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                      >
                        View VAT Invoice Examples & Explanations
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Invoice Comparison Example - VAT-Compliant */}
              {guide.slug === 'vat-compliant' && (
                <InvoiceComparisonExample
                  title="VAT Invoice: Correct vs Incorrect Example"
                  description="Compare a correctly formatted VAT invoice with a common mistake to understand what makes an invoice HMRC-compliant."
                  correctExample={{
                    invoiceNumber: 'INV-2024-0042',
                    invoiceDate: '20/10/2024',
                    dueDate: '03/11/2024',
                    businessName: 'Professional Services Ltd',
                    businessAddress: '123 Business Street\nLondon\nSW1A 1AA',
                    businessEmail: 'invoices@proservices.co.uk',
                    vatNumber: 'GB 123 4567 89',
                    companyNumber: '12345678',
                    clientName: 'Client Company Ltd',
                    clientAddress: '456 Client Road\nManchester\nM1 1AA',
                    lineItems: [
                      {
                        description: 'Management Consultancy Services',
                        quantity: 40,
                        rate: 150.00,
                        amount: 6000.00,
                        vatRate: 'Standard 20%'
                      },
                      {
                        description: 'Travel Expenses',
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
                      correct: 'Sequential, alphanumeric format: INV-2024-0042',
                      incorrect: 'Simple number: 42',
                      explanation: 'HMRC requires unique, sequential invoice numbers. Using a prefix (INV-) with year and sequence number prevents duplication and makes tracking easier. Simple numbers like "42" can be easily duplicated across different years.'
                    },
                    {
                      aspect: 'VAT Number Format',
                      correct: 'GB prefix with spaces: GB 123 4567 89',
                      incorrect: 'Numbers only: 123456789',
                      explanation: 'UK VAT numbers must include the "GB" country prefix. The formatted version (with spaces) is the official HMRC display format and helps with validation and readability.'
                    },
                    {
                      aspect: 'Date Format',
                      correct: 'UK format DD/MM/YYYY: 20/10/2024',
                      incorrect: 'US format MM/DD/YYYY: 10/20/2024',
                      explanation: 'UK invoices should use the British date format (day/month/year). Using US format (month/day/year) can cause confusion and compliance issues with HMRC systems.'
                    },
                    {
                      aspect: 'Line Item Detail',
                      correct: 'Detailed description with quantity and rate breakdown',
                      incorrect: 'Generic "Services" with single amount',
                      explanation: 'HMRC requires clear descriptions of goods/services supplied. Vague descriptions like "Services" are not compliant. Each line item should specify what was provided, with quantities and rates shown separately.'
                    },
                    {
                      aspect: 'VAT Rate Display',
                      correct: 'VAT rate clearly stated for each item and in totals',
                      incorrect: 'No VAT rate information shown',
                      explanation: 'You must show which VAT rate applies to each item. This is especially important when mixing different VAT rates (20%, 5%, 0%, exempt) on the same invoice. The total VAT section should show the rate used.'
                    },
                    {
                      aspect: 'Business Address',
                      correct: 'Full address with postcode on separate lines',
                      incorrect: 'Single line address without postcode',
                      explanation: 'HMRC requires your full registered business address including postcode. Using separate lines for street, city, and postcode improves readability and ensures compliance with postal addressing standards.'
                    }
                  ]}
                />
              )}

              {/* Link to Detailed Examples Section - CIS */}
              {guide.slug === 'cis-deduction' && (
                <div className="my-12 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 rounded-xl p-8 shadow-lg">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        ⚠️ Critical: See the #1 CIS Mistake (Costs You Money!)
                      </h3>
                      <p className="text-slate-700 text-lg mb-4 leading-relaxed">
                        The most expensive CIS error is calculating deductions <strong>BEFORE VAT instead of AFTER</strong>. 
                        Our detailed examples show you exactly how to avoid this £100+ mistake per invoice.
                      </p>
                      <ul className="space-y-2 mb-6 text-slate-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Step-by-step CIS deduction calculations with visual examples</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Side-by-side comparison of correct vs incorrect invoices</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Advanced example showing CIS with Reverse Charge VAT</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Learn why UTR numbers are mandatory and how to format them correctly</span>
                        </li>
                      </ul>
                      <Link
                        href="/uk-invoice-guides/cis-deduction/examples"
                        className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                      >
                        View CIS Invoice Examples & Avoid Costly Mistakes
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Invoice Comparison Example - CIS */}
              {guide.slug === 'cis-deduction' && (
                <InvoiceComparisonExample
                  title="CIS Invoice: Correct vs Incorrect Example"
                  description="See how to properly calculate and display CIS deductions on construction invoices."
                  correctExample={{
                    invoiceNumber: 'BUILD-2024-0089',
                    invoiceDate: '20/10/2024',
                    businessName: 'Builder Subcontractors Ltd',
                    businessAddress: '45 Construction Way\nLeeds\nLS1 1AA',
                    vatNumber: 'GB 555 4444 33',
                    utr: '1234567890',
                    clientName: 'Main Contractor Ltd',
                    clientUtr: '0987654321',
                    lineItems: [
                      {
                        description: 'Brickwork - Single Storey Extension',
                        quantity: 1,
                        rate: 2000.00,
                        amount: 2000.00
                      },
                      {
                        description: 'Materials (Bricks and Cement)',
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
                    totalAmount: 3000.00,
                    cisDeduction: 500.00,
                    cisRate: '20%',
                    amountDue: 2500.00,
                    paymentTerms: '30 days'
                  }}
                  comparisonPoints={[
                    {
                      aspect: 'UTR (Unique Taxpayer Reference)',
                      correct: 'Both subcontractor and contractor UTR numbers displayed',
                      incorrect: 'UTR numbers missing from invoice',
                      explanation: 'CIS invoices MUST include both parties\' UTR numbers. This is a mandatory HMRC requirement for CIS compliance. Without UTRs, the invoice is not valid for CIS purposes and HMRC may reject deduction claims.'
                    },
                    {
                      aspect: 'CIS Calculation Timing',
                      correct: 'CIS deduction calculated AFTER VAT is added (20% of £3,000 = £600)',
                      incorrect: 'CIS deduction calculated on net amount before VAT (20% of £2,500 = £500)',
                      explanation: 'This is the most common CIS mistake! CIS deductions must be calculated on the TOTAL including VAT, not the net amount. In this example, the correct deduction is £600 (20% of £3,000), not £500 (20% of £2,500). Getting this wrong means underpaying tax.'
                    },
                    {
                      aspect: 'Work Description Detail',
                      correct: 'Specific description: "Brickwork - Single Storey Extension" with materials itemized',
                      incorrect: 'Vague description: "Building Work"',
                      explanation: 'CIS invoices must clearly describe the construction work performed. HMRC requires detailed descriptions to verify the work qualifies for CIS. Separating labour and materials also helps with accurate record-keeping.'
                    },
                    {
                      aspect: 'CIS Notice',
                      correct: 'Clear notice explaining CIS deduction calculation and payment to HMRC',
                      incorrect: 'No explanation of CIS deduction',
                      explanation: 'Best practice is to include a CIS notice explaining the deduction calculation method. This helps the contractor understand their obligations and prevents disputes. It should state the calculation basis (total inc. VAT) and confirm the contractor will remit to HMRC.'
                    },
                    {
                      aspect: 'Amount Due Calculation',
                      correct: '£3,000 (total inc VAT) - £600 (CIS 20%) = £2,400 amount due',
                      incorrect: '£3,000 (total inc VAT) - £500 (incorrect CIS) = £2,500 amount due',
                      explanation: 'The "Amount Due" must be calculated as: Total (inc VAT) minus CIS deduction. Using the incorrect CIS calculation results in the subcontractor receiving more than they should, causing tax shortfalls that must be corrected later.'
                    }
                  ]}
                />
              )}

              {/* FAQ Section */}
              {guide.faq && guide.faq.length > 0 && (
                <div className="mt-16 pt-16 border-t border-slate-200">
                  <h2 className="text-3xl font-bold text-slate-900 mb-8">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {guide.faq.map((faq, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-3">
                          {faq.question}
                        </h3>
                        <p className="text-slate-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex flex-wrap gap-2">
                  {guide.keywords.slice(0, 10).map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {guide.callToAction.title}
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                {guide.callToAction.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={guide.callToAction.primaryButton.href}
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all hover:scale-105 shadow-xl"
                >
                  {guide.callToAction.primaryButton.text}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                {guide.callToAction.secondaryButton && (
                  <Link
                    href={guide.callToAction.secondaryButton.href}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all"
                  >
                    {guide.callToAction.secondaryButton.text}
                  </Link>
                )}
              </div>
            </div>

            {/* Related Guides */}
            {relatedGuides.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-8">
                  Related Guides
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedGuides.map((relatedGuide) => (
                    <Link
                      key={relatedGuide.slug}
                      href={`/uk-invoice-guides/${relatedGuide.slug}`}
                      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-primary-300"
                    >
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">{relatedGuide.categoryIcon}</span>
                          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                            {relatedGuide.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {relatedGuide.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                          {relatedGuide.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {relatedGuide.readTime} min
                          </span>
                          <span className="flex items-center gap-1 text-primary-600 font-semibold group-hover:gap-2 transition-all">
                            Read
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Navigation Footer - Links to Other Resources */}
                <div className="mt-12 grid md:grid-cols-2 gap-6">
                  {/* Link to Invoice Generator */}
                  <Link
                    href="/invoice-generator"
                    className="group bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                          Create Compliant Invoice
                        </h3>
                        <p className="text-sm text-slate-600 mb-3">
                          Generate HMRC-compliant invoices with automatic VAT and CIS calculations
                        </p>
                        <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                          Start Generating
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Link to All Guides */}
                  <Link
                    href="/uk-invoice-guides"
                    className="group bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                          Browse All Guides
                        </h3>
                        <p className="text-sm text-slate-600 mb-3">
                          Explore our complete library of UK invoice compliance guides
                        </p>
                        <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
                          View All Guides
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  allIndustries,
  type InvoiceTemplate,
  type InvoiceField 
} from '@/app/lib/invoiceTemplateLibrary';
import { 
  Download, 
  FileText, 
  CheckCircle,
  TrendingUp,
  Users,
  ArrowLeft,
  ArrowRight,
  Eye,
  Edit,
  Printer,
  Mail,
  Info,
  AlertCircle
} from 'lucide-react';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getTemplateBySlug(slug: string): { template: InvoiceTemplate; industryId: string; industryName: string } | null {
  for (const [industryId, industry] of Object.entries(allIndustries)) {
    for (const category of Object.values(industry.categories)) {
      for (const subCategory of Object.values(category.subCategories)) {
        for (const template of subCategory.templates) {
          const templateSlug = slugify(template.keywords[0]);
          if (templateSlug === slug) {
            return { 
              template, 
              industryId,
              industryName: industry.name 
            };
          }
        }
      }
    }
  }
  return null;
}

function getAllTemplateSlugs(): string[] {
  const slugs: string[] = [];
  
  for (const industry of Object.values(allIndustries)) {
    for (const category of Object.values(industry.categories)) {
      for (const subCategory of Object.values(category.subCategories)) {
        for (const template of subCategory.templates) {
          slugs.push(slugify(template.keywords[0]));
        }
      }
    }
  }
  
  return slugs;
}

// ============================================================================
// GENERATE STATIC PARAMS (Build Time)
// ============================================================================

export async function generateStaticParams() {
  const slugs = getAllTemplateSlugs();
  
  return slugs.map(slug => ({
    slug: slug,
  }));
}

// ============================================================================
// GENERATE METADATA (SEO)
// ============================================================================

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const result = getTemplateBySlug(params.slug);
  
  if (!result) {
    return {
      title: 'Template Not Found',
    };
  }

  const { template, industryName } = result;
  
  return {
    title: `${template.name} | Free UK Invoice Template Download`,
    description: `${template.description} Download free ${template.name.toLowerCase()} for UK businesses. ${template.searchVolume} monthly searches. Word, Excel, PDF formats available.`,
    keywords: template.keywords.join(', '),
    openGraph: {
      title: `${template.name} - Free Download`,
      description: template.description,
      type: 'website',
      url: `https://yourdomain.com/invoice-templates/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: template.name,
      description: template.description,
    },
    alternates: {
      canonical: `https://yourdomain.com/invoice-templates/${params.slug}`,
    },
  };
}

// ============================================================================
// FIELD DISPLAY COMPONENT
// ============================================================================

interface FieldListProps {
  fields: InvoiceField[];
  title: string;
  description: string;
}

function FieldList({ fields, title, description }: FieldListProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 mb-4">{description}</p>
      <div className="grid md:grid-cols-2 gap-4">
        {fields.map((field, idx) => (
          <div 
            key={idx}
            className="bg-slate-50 rounded-lg p-4 border border-slate-200"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="font-semibold text-slate-900">{field.label}</div>
              <span className="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded">
                {field.type}
              </span>
            </div>
            {field.helpText && (
              <p className="text-sm text-slate-600 mb-2">{field.helpText}</p>
            )}
            {field.placeholder && (
              <div className="text-xs text-slate-500 italic">
                Example: {field.placeholder}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// INVOICE PREVIEW COMPONENT
// ============================================================================

interface InvoicePreviewProps {
  template: InvoiceTemplate;
}

function InvoicePreview({ template }: InvoicePreviewProps) {
  const sample = template.sampleData;
  
  return (
    <div className="bg-white rounded-xl shadow-2xl border-2 border-slate-200 p-8 md:p-12">
      {/* Invoice Header */}
      <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b-2 border-slate-200">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {sample.businessName}
          </h2>
          <div className="text-sm text-slate-600 whitespace-pre-line">
            {sample.businessAddress}
          </div>
          {sample.businessPhone && (
            <div className="text-sm text-slate-600 mt-2">
              Tel: {sample.businessPhone}
            </div>
          )}
          {sample.businessEmail && (
            <div className="text-sm text-slate-600">
              Email: {sample.businessEmail}
            </div>
          )}
          {sample.vatNumber && (
            <div className="text-sm text-slate-600 mt-2">
              VAT: {sample.vatNumber}
            </div>
          )}
        </div>
        
        <div className="text-right">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">INVOICE</h1>
          <div className="space-y-2 text-sm">
            <div className="flex justify-end gap-4">
              <span className="font-semibold text-slate-700">Invoice #:</span>
              <span className="text-slate-900">{sample.invoiceNumber}</span>
            </div>
            <div className="flex justify-end gap-4">
              <span className="font-semibold text-slate-700">Date:</span>
              <span className="text-slate-900">{sample.invoiceDate}</span>
            </div>
            {sample.dueDate && (
              <div className="flex justify-end gap-4">
                <span className="font-semibold text-slate-700">Due Date:</span>
                <span className="text-slate-900">{sample.dueDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-slate-700 uppercase mb-2">Bill To:</h3>
        <div className="text-slate-900 font-semibold">{sample.clientName}</div>
        {sample.clientAddress && (
          <div className="text-sm text-slate-600 whitespace-pre-line mt-1">
            {sample.clientAddress}
          </div>
        )}
      </div>

      {/* Line Items Table */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th className="text-left py-3 px-2 text-sm font-bold text-slate-700">Description</th>
              <th className="text-right py-3 px-2 text-sm font-bold text-slate-700">Qty</th>
              <th className="text-right py-3 px-2 text-sm font-bold text-slate-700">Rate</th>
              <th className="text-right py-3 px-2 text-sm font-bold text-slate-700">Amount</th>
            </tr>
          </thead>
          <tbody>
            {sample.lineItems?.map((item: any, idx: number) => (
              <tr key={idx} className="border-b border-slate-200">
                <td className="py-3 px-2 text-sm text-slate-900">{item.description}</td>
                <td className="text-right py-3 px-2 text-sm text-slate-900">{item.quantity}</td>
                <td className="text-right py-3 px-2 text-sm text-slate-900">
                  £{typeof item.rate === 'number' ? item.rate.toFixed(2) : item.rate}
                </td>
                <td className="text-right py-3 px-2 text-sm text-slate-900 font-semibold">
                  £{typeof item.amount === 'number' ? item.amount.toFixed(2) : item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-full md:w-1/2 space-y-2">
          <div className="flex justify-between py-2 text-sm">
            <span className="text-slate-700">Subtotal:</span>
            <span className="text-slate-900 font-semibold">
              £{typeof sample.subtotal === 'number' ? sample.subtotal.toFixed(2) : sample.subtotal}
            </span>
          </div>
          
          {sample.serviceCharge && (
            <div className="flex justify-between py-2 text-sm">
              <span className="text-slate-700">Service Charge:</span>
              <span className="text-slate-900 font-semibold">
                £{typeof sample.serviceCharge === 'number' ? sample.serviceCharge.toFixed(2) : sample.serviceCharge}
              </span>
            </div>
          )}
          
          {sample.vatAmount && sample.vatAmount > 0 && (
            <div className="flex justify-between py-2 text-sm">
              <span className="text-slate-700">VAT (20%):</span>
              <span className="text-slate-900 font-semibold">
                £{typeof sample.vatAmount === 'number' ? sample.vatAmount.toFixed(2) : sample.vatAmount}
              </span>
            </div>
          )}
          
          <div className="flex justify-between py-3 border-t-2 border-slate-300 text-lg">
            <span className="font-bold text-slate-900">Total:</span>
            <span className="font-bold text-indigo-600">
              £{typeof sample.totalAmount === 'number' ? sample.totalAmount.toFixed(2) : sample.totalAmount}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      {(sample.bankName || sample.paymentTerms) && (
        <div className="bg-slate-50 rounded-lg p-6 mb-8">
          <h3 className="text-sm font-bold text-slate-700 uppercase mb-3">Payment Information</h3>
          {sample.bankName && (
            <div className="space-y-1 text-sm mb-4">
              <div className="flex gap-4">
                <span className="font-semibold text-slate-700 min-w-[120px]">Bank:</span>
                <span className="text-slate-900">{sample.bankName}</span>
              </div>
              {sample.accountNumber && (
                <div className="flex gap-4">
                  <span className="font-semibold text-slate-700 min-w-[120px]">Account Number:</span>
                  <span className="text-slate-900">{sample.accountNumber}</span>
                </div>
              )}
              {sample.sortCode && (
                <div className="flex gap-4">
                  <span className="font-semibold text-slate-700 min-w-[120px]">Sort Code:</span>
                  <span className="text-slate-900">{sample.sortCode}</span>
                </div>
              )}
            </div>
          )}
          {sample.paymentTerms && (
            <div className="text-sm text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-700">Payment Terms:</span> {sample.paymentTerms}
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      {sample.notes && (
        <div className="text-sm text-slate-600 italic leading-relaxed">
          {sample.notes}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function TemplateDetailPage({ params }: { params: { slug: string } }) {
  const result = getTemplateBySlug(params.slug);
  
  if (!result) {
    notFound();
  }

  const { template, industryId, industryName } = result;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-600 mb-6">
            <Link href="/" className="hover:text-indigo-600 transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/invoice-templates" className="hover:text-indigo-600 transition">
              Invoice Templates
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{template.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                <FileText className="w-4 h-4" />
                {industryName}
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                {template.name}
              </h1>
              
              <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                {template.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Search Volume</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    {template.searchVolume.toLocaleString()}/mo
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                    <Users className="w-4 h-4" />
                    <span>CPC Value</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    £{template.cpc.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Keywords */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-700 uppercase mb-2">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {template.keywords.map((keyword, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl">
                  <Download className="w-5 h-5" />
                  Download Template
                </button>
                <button className="flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-50 transition border-2 border-slate-200">
                  <Edit className="w-5 h-5" />
                  Customize Online
                </button>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700">100% Free - No sign-up required</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700">UK-compliant & HMRC-approved</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700">Available in Word, Excel, PDF</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700">Easy to customize & edit</span>
                </div>
              </div>
            </div>

            {/* Right Column - Preview Thumbnail */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">Live Preview</h3>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                      <Eye className="w-5 h-5 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                      <Printer className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>
                </div>
                <div className="aspect-[8.5/11] bg-slate-100 rounded-lg border-2 border-slate-200 overflow-hidden">
                  {/* Miniature preview */}
                  <div className="scale-[0.35] origin-top-left w-[285%] h-[285%]">
                    <InvoicePreview template={template} />
                  </div>
                </div>
                <button className="w-full mt-4 flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition">
                  <Eye className="w-5 h-5" />
                  View Full Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Details */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Full Preview */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Template Preview
                </h2>
                <InvoicePreview template={template} />
              </div>

              {/* Fields */}
              <FieldList 
                fields={template.requiredFields}
                title="Required Fields"
                description="These fields must be filled in for a complete invoice"
              />

              {template.optionalFields.length > 0 && (
                <FieldList 
                  fields={template.optionalFields}
                  title="Optional Fields"
                  description="Additional fields you can include based on your needs"
                />
              )}

              {/* Industry Standards */}
              {template.industryStandards && template.industryStandards.length > 0 && (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-8">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        Industry Compliance Standards
                      </h3>
                      <p className="text-sm text-slate-600">
                        Important compliance requirements for {industryName.toLowerCase()}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {template.industryStandards.map((standard, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4 border border-amber-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            standard.complianceLevel === 'required' 
                              ? 'bg-red-100 text-red-700'
                              : standard.complianceLevel === 'recommended'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {standard.complianceLevel.toUpperCase()}
                          </span>
                          <span className="font-semibold text-slate-900">
                            {standard.standard}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">
                          {standard.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-8 space-y-6">
                {/* Download Options */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Download Options
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 bg-indigo-50 border-2 border-indigo-200 rounded-lg hover:bg-indigo-100 transition group">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-indigo-600" />
                        <span className="font-semibold text-slate-900">Word (.docx)</span>
                      </div>
                      <Download className="w-5 h-5 text-indigo-600 group-hover:translate-y-1 transition-transform" />
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-4 bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 transition group">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-slate-900">Excel (.xlsx)</span>
                      </div>
                      <Download className="w-5 h-5 text-green-600 group-hover:translate-y-1 transition-transform" />
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-4 bg-red-50 border-2 border-red-200 rounded-lg hover:bg-red-100 transition group">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-slate-900">PDF (.pdf)</span>
                      </div>
                      <Download className="w-5 h-5 text-red-600 group-hover:translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition text-left">
                      <Edit className="w-5 h-5 text-slate-600" />
                      <span className="text-slate-900">Customize Online</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition text-left">
                      <Mail className="w-5 h-5 text-slate-600" />
                      <span className="text-slate-900">Email Template</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition text-left">
                      <Printer className="w-5 h-5 text-slate-600" />
                      <span className="text-slate-900">Print Preview</span>
                    </button>
                  </div>
                </div>

                {/* Related Templates */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    More {industryName} Templates
                  </h3>
                  <Link 
                    href="/invoice-templates"
                    className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-2"
                  >
                    View All Templates
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DigitalDocument",
            "name": template.name,
            "description": template.description,
            "keywords": template.keywords.join(', '),
            "genre": "Invoice Template",
            "inLanguage": "en-GB",
            "isAccessibleForFree": true,
            "audience": {
              "@type": "BusinessAudience",
              "audienceType": industryName
            }
          })
        }} 
      />
    </div>
  );
}
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { 
  allIndustries,
  type InvoiceTemplate,
} from '@/app/lib/invoiceTemplateLibrary';
import { 
  Download, 
  FileText, 
  TrendingUp,
  Users,
  Eye,
  Edit,
  Printer,
  AlertCircle
} from 'lucide-react';

// Dynamic imports with SSR for components (maintains SEO while enabling code splitting)
const TemplatePreview = dynamic(() => 
  import('@/app/components/templates').then(mod => ({ default: mod.TemplatePreview })),
  { ssr: true }
);

const TemplateFeaturesList = dynamic(() => 
  import('@/app/components/templates').then(mod => ({ default: mod.TemplateFeaturesList })),
  { ssr: true }
);

const TemplateDownloadSection = dynamic(() => 
  import('@/app/components/templates').then(mod => ({ default: mod.TemplateDownloadSection })),
  { ssr: true }
);

const RelatedTemplates = dynamic(() => 
  import('@/app/components/templates').then(mod => ({ default: mod.RelatedTemplates })),
  { ssr: true }
);

const FieldList = dynamic(() => 
  import('@/app/components/templates').then(mod => ({ default: mod.FieldList })),
  { ssr: true }
);

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const result = getTemplateBySlug(slug);
  
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
      url: `https://yourdomain.com/invoice-templates/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: template.name,
      description: template.description,
    },
    alternates: {
      canonical: `https://yourdomain.com/invoice-templates/${slug}`,
    },
  };
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default async function TemplateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = getTemplateBySlug(slug);
  
  if (!result) {
    notFound();
  }

  const { template, industryId, industryName } = result;
  
  // Generate slug for invoice generator link
  const templateSlug = slugify(template.keywords[0]);

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
                <Link 
                  href={`/invoice-generator/${templateSlug}`}
                  className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
                >
                  <Edit className="w-5 h-5" />
                  Create Invoice Now
                </Link>
                <a 
                  href="#download"
                  className="flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-50 transition border-2 border-slate-200"
                >
                  <Download className="w-5 h-5" />
                  Download Template
                </a>
              </div>

              {/* Features - Using extracted component */}
              <TemplateFeaturesList />
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
                  {/* Miniature preview - Using extracted component with scale */}
                  <TemplatePreview template={template} scale={0.35} />
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
              {/* Full Preview - Using extracted component */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Template Preview
                </h2>
                <TemplatePreview template={template} />
              </div>

              {/* Fields - Using extracted component */}
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

            {/* Sidebar - Using extracted components */}
            <div>
              <div className="sticky top-8 space-y-6">
                {/* Download Options + Quick Actions */}
                <TemplateDownloadSection 
                  template={template}
                  templateSlug={templateSlug}
                />

                {/* Related Templates */}
                <RelatedTemplates industryName={industryName} />
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
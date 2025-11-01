import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { 
  getTemplateByIndustryAndSlug,
  getAllTemplateParams,
  type TemplateRegistryEntry
} from '@/app/lib/invoice-templates/templateRegistry';
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

// Dynamic imports with SSR for components
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
// All template loading logic is now handled by templateRegistry.ts
// No need for industry-specific imports or manual converters!

// ============================================================================
// GENERATE STATIC PARAMS (Build Time)
// ============================================================================

export async function generateStaticParams() {
  return getAllTemplateParams();
}

// ============================================================================
// GENERATE METADATA (SEO)
// ============================================================================

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ industrySlug: string; templateSlug: string }> 
}): Promise<Metadata> {
  const { industrySlug, templateSlug } = await params;
  const result = getTemplateByIndustryAndSlug(industrySlug, templateSlug);
  
  if (!result) {
    return {
      title: 'Template Not Found',
    };
  }

  const { template, industryName } = result;
  
  return {
    title: `${template.name} | ${industryName} Invoice Template - Free UK Download`,
    description: `${template.description} Professional ${industryName.toLowerCase()} invoice template for UK businesses. Free download in Word, Excel, and PDF formats.`,
    keywords: [
      ...template.keywords,
      `${industryName} invoice template`,
      `${template.name}`,
      'UK invoice template',
      'free invoice template'
    ].join(', '),
    openGraph: {
      title: `${template.name} - Free ${industryName} Invoice Template`,
      description: template.description,
      type: 'website',
      url: `https://yourdomain.com/invoice-templates/industry/${industrySlug}/${templateSlug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: template.name,
      description: template.description,
    },
    alternates: {
      canonical: `https://yourdomain.com/invoice-templates/industry/${industrySlug}/${templateSlug}`,
    },
  };
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default async function IndustryTemplateDetailPage({ 
  params 
}: { 
  params: Promise<{ industrySlug: string; templateSlug: string }> 
}) {
  const { industrySlug, templateSlug } = await params;
  
  // Load template from centralized registry
  const entry = getTemplateByIndustryAndSlug(industrySlug, templateSlug);
  
  if (!entry) {
    notFound();
  }

  const { template, industryId, industryName, categoryName } = entry;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-600 mb-6 flex-wrap">
            <Link href="/" className="hover:text-indigo-600 transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/invoice-templates" className="hover:text-indigo-600 transition">
              Invoice Templates
            </Link>
            <span>/</span>
            <Link href="/invoice-templates/industry" className="hover:text-indigo-600 transition">
              Industries
            </Link>
            <span>/</span>
            <Link href={`/invoice-templates/industry/${industrySlug}`} className="hover:text-indigo-600 transition">
              {industryName}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{template.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Info */}
            <div>
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  <FileText className="w-4 h-4" />
                  {industryName}
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {categoryName}
                </div>
                {template.tier === 'premium' && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-bold">
                    PREMIUM
                  </div>
                )}
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                {template.name}
              </h1>
              
              <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                {template.description}
              </p>

              {/* Template Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Monthly Searches</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    {template.searchVolume.toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600 mb-1">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Total Fields</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    {template.requiredFields.length + template.optionalFields.length}
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link 
                  href={`/invoice-generator/${industrySlug}/${templateSlug}`}
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

              {/* Features */}
              <TemplateFeaturesList />
            </div>

            {/* Right Column - Preview Thumbnail */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-bold text-slate-900">Live Preview</div>
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
              {/* Full Preview */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  What's Included in This Template
                </h2>
                <TemplatePreview template={template} />
              </div>

              {/* Required Fields */}
              <FieldList 
                fields={template.requiredFields}
                title="Required Fields"
                description="These fields must be filled in for a complete invoice"
              />

              {/* Optional Fields */}
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
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
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
            "isAccessibleForFree": template.tier === 'free',
            "audience": {
              "@type": "BusinessAudience",
              "audienceType": industryName
            },
            "category": categoryName,
            "provider": {
              "@type": "Organization",
              "name": "Invoice Parser"
            }
          })
        }} 
      />
    </div>
  );
}

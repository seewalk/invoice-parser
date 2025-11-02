import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  INVOICE_TEMPLATE_INDUSTRIES,
  type IndustryMetadata,
} from '../../../lib/invoice-templates/invoiceTemplateIndustries';
import { allIndustries, type InvoiceTemplate } from '../../../lib/invoiceTemplateLibrary';
import { 
  FileText, 
  TrendingUp,
  Users,
  Download,
  Edit,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Star
} from 'lucide-react';

// Import automotive-specific data
import { 
  automotiveCategories,
  automotiveIndustryMetadata,
  type AutomotiveTemplate 
} from '../../../lib/invoice-templates/automotive/categoriesTemplates';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getIndustryBySlug(slug: string): IndustryMetadata | null {
  return INVOICE_TEMPLATE_INDUSTRIES.find(
    industry => slugify(industry.name) === slug || slugify(industry.id) === slug
  ) || null;
}

function getTemplatesForIndustry(industryId: string): InvoiceTemplate[] {
  const templates: InvoiceTemplate[] = [];
  
  // Handle automotive industry specifically
  if (industryId === 'automotive') {
    // Get templates from automotive categories
    for (const category of automotiveCategories) {
      for (const template of category.templates) {
        // Convert AutomotiveTemplate to InvoiceTemplate format
        if (template.requiredFields && template.optionalFields) {
          templates.push({
            id: template.id,
            name: template.name,
            description: template.description,
            keywords: template.keywords,
            searchVolume: template.searchVolume,
            cpc: template.cpc,
            searchDifficulty: template.difficulty,
            tier: template.tier,
            requiredFields: template.requiredFields,
            optionalFields: template.optionalFields,
            industryStandards: template.industryStandards || [],
            sampleData: template.sampleData || {}
          });
        }
      }
    }
    return templates;
  }
  
  // Get templates from main library for other industries
  const industry = allIndustries[industryId];
  if (!industry) return templates;
  
  for (const category of Object.values(industry.categories)) {
    for (const subCategory of Object.values(category.subCategories)) {
      templates.push(...subCategory.templates);
    }
  }
  
  return templates;
}

function getAllIndustrySlugs(): string[] {
  return INVOICE_TEMPLATE_INDUSTRIES.map(industry => 
    slugify(industry.id)
  );
}

// ============================================================================
// GENERATE STATIC PARAMS (Build Time)
// ============================================================================

export async function generateStaticParams() {
  const slugs = getAllIndustrySlugs();
  
  return slugs.map(slug => ({
    slug: slug,
  }));
}

// ============================================================================
// GENERATE METADATA (SEO)
// ============================================================================

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  
  if (!industry) {
    return {
      title: 'Industry Not Found',
    };
  }
  
  const templates = getTemplatesForIndustry(industry.id);
  const templateCount = templates.length;
  
  return {
    title: `${industry.name} Invoice Templates (${templateCount}) | Free UK Downloads`,
    description: `${industry.description} Download ${templateCount} free ${industry.name.toLowerCase()} invoice templates. Professional, compliant, and ready to use. Word, Excel, PDF formats available.`,
    keywords: [...industry.keywords, `${industry.name} invoice template`, `${industry.name} invoice`, `${industry.name} billing`].join(', '),
    openGraph: {
      title: `${industry.name} Invoice Templates - Free Download`,
      description: industry.description,
      type: 'website',
      url: `https://yourdomain.com/invoice-templates/industry/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${industry.name} Invoice Templates`,
      description: industry.description,
    },
    alternates: {
      canonical: `https://yourdomain.com/invoice-templates/industry/${slug}`,
    },
  };
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  
  if (!industry) {
    notFound();
  }

  const templates = getTemplatesForIndustry(industry.id);
  const featuredTemplates = templates.slice(0, 6);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-600 mb-8">
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
            <span className="text-slate-900 font-medium">{industry.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
                <span className="text-2xl">{industry.icon}</span>
                <span>{industry.templateCount} Templates Available</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                {industry.name}
                <span className="block text-indigo-600 mt-2">Invoice Templates</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                {industry.description}
              </p>

              {/* Industry Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600 mb-1">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Templates</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    {industry.templateCount}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Popularity</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    #{industry.popularityRank}
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#templates"
                  className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
                >
                  <FileText className="w-5 h-5" />
                  View Templates
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link 
                  href="/invoice-templates"
                  className="flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-50 transition border-2 border-slate-200"
                >
                  Browse All Industries
                </Link>
              </div>
            </div>

            {/* Right Column - Features */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-200 p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Why Choose Our Templates?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Industry-Specific</h4>
                    <p className="text-sm text-slate-600">
                      Tailored fields and compliance requirements for {industry.name.toLowerCase()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">UK Compliant</h4>
                    <p className="text-sm text-slate-600">
                      Meets HMRC and UK legal requirements for invoicing
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Instant Download</h4>
                    <p className="text-sm text-slate-600">
                      Available in Word, Excel, and PDF formats
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Professional Design</h4>
                    <p className="text-sm text-slate-600">
                      Clean, modern layouts that make a great impression
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Available Templates
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose from our collection of {templates.length} professional {industry.name.toLowerCase()} invoice templates
            </p>
          </div>

          {templates.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-12 text-center">
              <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Templates Coming Soon
              </h3>
              <p className="text-slate-600 mb-6">
                We're working on adding templates for this industry. Check back soon!
              </p>
              <Link 
                href="/invoice-templates"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Browse Other Templates
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((template) => {
                const templateSlug = slugify(template.id);
                const industrySlug = slugify(industry.id);
                
                return (
                  <div 
                    key={template.id}
                    className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 group"
                  >
                    {/* Template Preview Thumbnail */}
                    <div className="aspect-[8.5/11] bg-gradient-to-br from-slate-50 to-slate-100 border-b-2 border-slate-200 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 group-hover:opacity-75 transition-opacity" />
                      <FileText className="w-24 h-24 text-slate-300 group-hover:text-indigo-400 transition-colors relative z-10" />
                      
                      {/* Tier Badge */}
                      {template.tier === 'premium' && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-20">
                          PREMIUM
                        </div>
                      )}
                    </div>

                    {/* Template Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {template.name}
                      </h3>
                      
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                        {template.description}
                      </p>

                      {/* Template Stats */}
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{template.searchVolume.toLocaleString()}/mo</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          <span>{template.requiredFields.length} fields</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Link 
                          href={`/invoice-templates/industry/${industrySlug}/${templateSlug}`}
                          className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition text-sm"
                        >
                          <FileText className="w-4 h-4" />
                          View Details
                        </Link>
                        <Link 
                          href={`/invoice-generator/${industrySlug}/${templateSlug}`}
                          className="flex items-center justify-center gap-2 bg-slate-100 text-slate-900 px-4 py-3 rounded-lg font-semibold hover:bg-slate-200 transition text-sm"
                          title="Create Invoice"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Industry Categories */}
      {industry.categories.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Template Categories
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industry.categories.map((category, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg hover:border-indigo-300 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{category}</h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    Specialized templates for {category.toLowerCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Keywords */}
      {industry.keywords.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Popular Searches
            </h2>
            
            <div className="flex flex-wrap justify-center gap-3">
              {industry.keywords.map((keyword, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-700 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Create Your Invoice?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Start with our professional {industry.name.toLowerCase()} templates today
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#templates"
              className="flex items-center justify-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download Template
            </Link>
            <Link 
              href="/invoice-generator"
              className="flex items-center justify-center gap-2 bg-indigo-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-400 transition shadow-lg border-2 border-white/20"
            >
              <Edit className="w-5 h-5" />
              Create Online
            </Link>
          </div>
        </div>
      </section>

      {/* Schema.org Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `${industry.name} Invoice Templates`,
            "description": industry.description,
            "keywords": industry.keywords.join(', '),
            "numberOfItems": industry.templateCount,
            "audience": {
              "@type": "BusinessAudience",
              "audienceType": industry.name
            },
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

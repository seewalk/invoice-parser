import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { INVOICE_TEMPLATE_INDUSTRIES } from '@/app/lib/invoice-templates/invoiceTemplateIndustries';
import { 
  getTemplatesByIndustry,
  slugify
} from '@/app/lib/invoice-templates/templateRegistry';
import { 
  FileText, 
  TrendingUp,
  ArrowRight,
  Search,
  Filter,
  Users,
  Edit
} from 'lucide-react';

// ============================================================================
// METADATA
// ============================================================================

export const metadata: Metadata = {
  title: 'Invoice Templates by Industry | Free UK Business Templates',
  description: 'Browse invoice templates organized by industry. Find specialized templates for your business sector with industry-specific fields and compliance requirements.',
  keywords: 'invoice templates by industry, business invoice templates, industry-specific invoices, professional invoice templates',
  openGraph: {
    title: 'Invoice Templates by Industry',
    description: 'Browse invoice templates organized by industry sector',
    type: 'website',
  },
  alternates: {
    canonical: 'https://yourdomain.com/invoice-templates/industry',
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
// slugify is now imported from templateRegistry

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function IndustriesPage() {
  // Sort industries by popularity rank
  const sortedIndustries = [...INVOICE_TEMPLATE_INDUSTRIES].sort(
    (a, b) => a.popularityRank - b.popularityRank
  );

  // Get top industries
  const topIndustries = sortedIndustries.slice(0, 3);
  const otherIndustries = sortedIndustries.slice(3);

  // Calculate total stats
  const totalTemplates = INVOICE_TEMPLATE_INDUSTRIES.reduce(
    (sum, industry) => sum + industry.templateCount, 
    0
  );
  const totalSearchVolume = INVOICE_TEMPLATE_INDUSTRIES.reduce(
    (sum, industry) => sum + industry.totalSearchVolume, 
    0
  );

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
            <span className="text-slate-900 font-medium">Industries</span>
          </nav>

          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Invoice Templates by
              <span className="block text-indigo-600 mt-2">Industry</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Find industry-specific invoice templates tailored to your business needs. 
              Each template includes specialized fields and compliance requirements for your sector.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
                <div className="text-3xl font-bold text-indigo-600 mb-1">
                  {INVOICE_TEMPLATE_INDUSTRIES.length}
                </div>
                <div className="text-sm text-slate-600">Industries</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
                <div className="text-3xl font-bold text-indigo-600 mb-1">
                  {totalTemplates}
                </div>
                <div className="text-sm text-slate-600">Templates</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-indigo-600 mb-1">
                  {(totalSearchVolume / 1000).toFixed(0)}k+
                </div>
                <div className="text-sm text-slate-600">Monthly Searches</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Industries */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Most Popular Industries
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Explore our most searched and comprehensive industry template collections
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {topIndustries.map((industry) => {
              const industrySlug = slugify(industry.id);
              const actualTemplates = getTemplatesByIndustry(industry.id);
              const hasTemplates = actualTemplates.length > 0;
              
              return (
                <div 
                  key={industry.id}
                  className="group relative bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden hover:shadow-2xl hover:border-indigo-300 transition-all duration-300"
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all" />
                  
                  {/* Content */}
                  <div className="relative p-8">
                    {/* Icon & Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl">{industry.icon}</div>
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        #{industry.popularityRank}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {industry.name}
                    </h3>
                    
                    <p className="text-slate-600 mb-6 line-clamp-2">
                      {industry.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm text-slate-500 mb-6">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span className="font-semibold">{actualTemplates.length}</span>
                        <span>templates</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-semibold">{(industry.totalSearchVolume / 1000).toFixed(1)}k</span>
                        <span>searches</span>
                      </div>
                    </div>

                    {/* Template Links or Coming Soon */}
                    {hasTemplates ? (
                      <div className="space-y-2">
                        {actualTemplates.slice(0, 3).map((entry) => (
                          <Link 
                            key={entry.template.id}
                            href={`/invoice-templates/industry/${industrySlug}/${slugify(entry.template.id)}`}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-indigo-50 transition-colors group/item"
                          >
                            <span className="text-sm text-slate-700 group-hover/item:text-indigo-600 truncate">
                              {entry.template.name}
                            </span>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover/item:text-indigo-600 group-hover/item:translate-x-1 transition-all flex-shrink-0" />
                          </Link>
                        ))}
                        {actualTemplates.length > 3 && (
                          <div className="text-xs text-slate-500 pt-2">
                            + {actualTemplates.length - 3} more templates
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500 italic">
                        Templates coming soon...
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Industries Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              All Industries
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Browse our complete collection of industry-specific invoice templates
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedIndustries.map((industry) => {
              const industrySlug = slugify(industry.id);
              const actualTemplates = getTemplatesByIndustry(industry.id);
              const hasTemplates = actualTemplates.length > 0;
              const firstTemplate = actualTemplates[0];
              
              return (
                <div 
                  key={industry.id}
                  className="group bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg hover:border-indigo-300 transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl flex-shrink-0">{industry.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors truncate">
                        {industry.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <FileText className="w-3 h-3" />
                        <span>{actualTemplates.length} {actualTemplates.length === 1 ? 'template' : 'templates'}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                    {industry.description}
                  </p>

                  {hasTemplates && firstTemplate ? (
                    <Link 
                      href={`/invoice-templates/industry/${industrySlug}/${slugify(firstTemplate.template.id)}`}
                      className="flex items-center justify-between text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      <span>View {firstTemplate.template.name}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <div className="text-xs text-slate-400 italic">
                      Coming soon
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Industry-Specific Templates?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Specialized Fields
              </h3>
              <p className="text-slate-600">
                Each template includes industry-specific fields and terminology relevant to your business sector
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Compliance Ready
              </h3>
              <p className="text-slate-600">
                Templates include industry-specific compliance requirements and legal standards
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Professional Standards
              </h3>
              <p className="text-slate-600">
                Follow industry best practices and standard formatting for your sector
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Can't Find Your Industry?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Browse all our invoice templates or use our general business templates
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/invoice-templates"
              className="flex items-center justify-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition shadow-lg"
            >
              <Search className="w-5 h-5" />
              Browse All Templates
            </Link>
            <Link 
              href="/contact"
              className="flex items-center justify-center gap-2 bg-indigo-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-400 transition shadow-lg border-2 border-white/20"
            >
              Request Custom Template
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
            "name": "Invoice Templates by Industry",
            "description": "Browse invoice templates organized by industry sector",
            "numberOfItems": INVOICE_TEMPLATE_INDUSTRIES.length,
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

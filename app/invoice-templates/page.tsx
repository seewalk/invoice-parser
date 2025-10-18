import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  allIndustries, 
  getIndustryStats,
  type Industry,
  type Category,
  type SubCategory,
  type InvoiceTemplate 
} from '@/app/lib/invoiceTemplateLibrary';
import { 
  Search, 
  Download, 
  FileText, 
  TrendingUp, 
  Users,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import PageHero from '@/app/components/PageHero';

// ============================================================================
// SEO METADATA
// ============================================================================

export const metadata: Metadata = {
  title: 'Free Invoice Templates UK | 10+ Professional Invoice Templates by Industry',
  description: 'Download free, professional invoice templates for UK businesses. Choose from 10+ industry-specific templates: restaurants, photography, construction, freelance, and more. Word, Excel, PDF formats.',
  keywords: 'invoice template, free invoice template, invoice template uk, professional invoice template, business invoice template, freelance invoice, construction invoice, photography invoice',
  openGraph: {
    title: 'Free UK Invoice Templates - Professional & Industry-Specific',
    description: 'Download 10+ free invoice templates for UK businesses. Industry-specific templates for restaurants, photographers, builders, freelancers, and more.',
    type: 'website',
    url: 'https://yourdomain.com/invoice-templates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free UK Invoice Templates',
    description: '10+ professional invoice templates for UK businesses',
  },
  alternates: {
    canonical: 'https://yourdomain.com/invoice-templates',
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getTemplateSlug(template: InvoiceTemplate): string {
  return slugify(template.keywords[0]);
}

// ============================================================================
// TEMPLATE CARD COMPONENT
// ============================================================================

interface TemplateCardProps {
  template: InvoiceTemplate;
  industryId: string;
}

function TemplateCard({ template, industryId }: TemplateCardProps) {
  const slug = getTemplateSlug(template);
  
  return (
    <Link 
      href={`/invoice-templates/${slug}`}
      className="block group"
    >
      <div className="bg-white rounded-xl border-2 border-slate-200 hover:border-indigo-500 transition-all hover:shadow-xl p-6 h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition mb-2">
              {template.name}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {template.description}
            </p>
          </div>
          <FileText className="w-8 h-8 text-indigo-600 flex-shrink-0 ml-4" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Search Volume</span>
            </div>
            <div className="text-lg font-bold text-slate-900">
              {template.searchVolume.toLocaleString()}/mo
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm text-green-700 mb-1">
              <Users className="w-4 h-4" />
              <span>CPC Value</span>
            </div>
            <div className="text-lg font-bold text-green-700">
              £{template.cpc.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap gap-2 mb-4">
          {template.keywords.slice(0, 3).map((keyword, idx) => (
            <span 
              key={idx}
              className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded"
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
            View Template
          </span>
          <ArrowRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

// ============================================================================
// INDUSTRY SECTION COMPONENT
// ============================================================================

interface IndustrySectionProps {
  industryId: string;
  industry: Industry;
}

function IndustrySection({ industryId, industry }: IndustrySectionProps) {
  // Collect all templates from this industry
  const templates: InvoiceTemplate[] = [];
  
  Object.values(industry.categories).forEach(category => {
    Object.values(category.subCategories).forEach(subCategory => {
      templates.push(...subCategory.templates);
    });
  });

  return (
    <section id={industryId} className="mb-20">
      {/* Industry Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="text-5xl">{industry.icon}</div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {industry.name}
          </h2>
          <p className="text-lg text-slate-600">
            {industry.description}
          </p>
          <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {industry.totalSearchVolume.toLocaleString()} searches/month
            </span>
            <span>•</span>
            <span>{templates.length} templates available</span>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <TemplateCard 
            key={template.id} 
            template={template} 
            industryId={industryId}
          />
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function InvoiceTemplatesPage() {
  const stats = getIndustryStats();
  const totalTemplates = Object.values(stats).reduce((sum, stat) => sum + stat.totalTemplates, 0);
  const totalSearchVolume = Object.values(stats).reduce((sum, stat) => sum + stat.totalSearchVolume, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {/* Breadcrumb */}
            <nav className="flex justify-center items-center gap-2 text-sm text-slate-600 mb-6">
              <Link href="/" className="hover:text-indigo-600 transition">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-900 font-medium">Invoice Templates</span>
            </nav>

            {/* Main Heading - SEO Optimized */}
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6">
              Free UK Invoice Templates
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                By Industry
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Download professional, industry-specific invoice templates for UK businesses. 
              Choose from {totalTemplates}+ free templates for restaurants, photographers, 
              builders, freelancers, consultants, and more. Available in Word, Excel, and PDF formats.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-slate-900">
                    {totalTemplates}+
                  </div>
                  <div className="text-sm text-slate-600">Free Templates</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-slate-900">
                    {totalSearchVolume.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-600">Monthly Searches</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-slate-900">
                    {Object.keys(allIndustries).length}
                  </div>
                  <div className="text-sm text-slate-600">Industries Covered</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-3 text-left">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    100% Free Forever
                  </h3>
                  <p className="text-sm text-slate-600">
                    No sign-up, no credit card, no hidden fees
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    UK-Compliant
                  </h3>
                  <p className="text-sm text-slate-600">
                    VAT-ready, HMRC-approved formats
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    Easy Customization
                  </h3>
                  <p className="text-sm text-slate-600">
                    Editable Word, Excel, PDF templates
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Industry Navigation */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Browse by Industry
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(allIndustries).map(([key, industry]) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition group"
                >
                  <span className="text-3xl">{industry.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition">
                      {industry.name}
                    </div>
                    <div className="text-xs text-slate-600">
                      {stats[key]?.totalTemplates || 0} templates
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Templates by Industry */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {Object.entries(allIndustries).map(([key, industry]) => (
            <IndustrySection 
              key={key} 
              industryId={key} 
              industry={industry} 
            />
          ))}
        </div>
      </section>

      {/* Why Use Our Templates Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why Use Our Invoice Templates?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Professional, compliant, and easy to customize for UK businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Industry-Specific
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Templates designed for your specific industry with pre-filled fields 
                and industry standards (CIS, Gas Safe, NICEIC, VAT compliance)
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                HMRC Compliant
              </h3>
              <p className="text-slate-600 leading-relaxed">
                All templates meet HMRC requirements for invoicing, including VAT 
                registration, UTR numbers, and proper business details
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Multiple Formats
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Download in Word (.docx), Excel (.xlsx), or PDF formats. 
                Easily edit, customize, and send to clients
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Professional Design
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Clean, modern layouts that make your business look professional. 
                Impress clients with well-designed invoices
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Get Paid Faster
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Clear payment terms, bank details, and professional presentation 
                help you get paid 2x faster
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Used by Thousands
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Join 10,000+ UK freelancers, contractors, and small businesses 
                using our templates every month
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Need More Than Just Templates?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
            Try our AI-powered invoice processing automation. Extract data from 
            supplier invoices automatically with 99.2% accuracy. Save 15+ hours weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/invoice-automation"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition shadow-xl"
            >
              Try Invoice Automation
            </Link>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition">
              View All Features
            </button>
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
            "name": "Free UK Invoice Templates by Industry",
            "description": "Download professional, industry-specific invoice templates for UK businesses. Free templates for restaurants, photographers, builders, freelancers, and more.",
            "url": "https://yourdomain.com/invoice-templates",
            "numberOfItems": totalTemplates,
            "about": {
              "@type": "Thing",
              "name": "Invoice Templates",
              "description": "Professional invoice templates for UK businesses"
            }
          })
        }} 
      />
    </div>
  );
}
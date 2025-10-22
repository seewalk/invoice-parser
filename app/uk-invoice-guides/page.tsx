import { Metadata } from 'next';
import { 
  getAllGuides, 
  getFeaturedGuides, 
  getGuideCategories, 
  getGuideStats 
} from '../lib/ukInvoiceGuidesData';
import PageHero from '../components/PageHero';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  TrendingUp,
  Tag,
  ArrowRight,
  Search
} from 'lucide-react';
import { BUSINESS_INFO, generateBreadcrumbSchema } from '../lib/schemaConfig';

export const metadata: Metadata = {
  title: 'UK Invoice Compliance Guides | VAT, CIS, Gas Safe, NICEIC | Elektroluma',
  description: 'Expert guides on UK invoice compliance, VAT rates, CIS deductions, Gas Safe registration, NICEIC certification, and HMRC requirements. Free comprehensive resources.',
  keywords: [
    'UK invoice guides',
    'VAT compliance UK',
    'CIS deduction guide',
    'Gas Safe invoice',
    'NICEIC invoice',
    'HMRC compliance',
    'Making Tax Digital',
    'UK invoice requirements',
    'construction invoice UK',
    'VAT rates UK 2025'
  ],
  openGraph: {
    title: 'UK Invoice Compliance Guides | Expert Resources',
    description: 'Comprehensive guides on VAT, CIS, Gas Safe, NICEIC, and UK invoice compliance requirements.',
    type: 'website',
    url: `${BUSINESS_INFO.url}/uk-invoice-guides`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK Invoice Compliance Guides | Expert Resources',
    description: 'Comprehensive guides on VAT, CIS, Gas Safe, NICEIC, and UK invoice compliance.',
  },
};

export default function UKInvoiceGuidesPage() {
  // Fetch all data
  const allGuides = getAllGuides();
  const featuredGuides = getFeaturedGuides(3);
  const categories = getGuideCategories();
  const stats = getGuideStats();

  // Separate featured from regular guides
  const featuredSlugs = new Set(featuredGuides.map(g => g.slug));
  const regularGuides = allGuides.filter(g => !featuredSlugs.has(g.slug));

  // Generate guide index schemas
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'UK Invoice Compliance Guides',
    description: 'Expert guides on VAT, CIS, Gas Safe, NICEIC, and UK invoice compliance requirements',
    itemListElement: allGuides.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Article',
        '@id': `${BUSINESS_INFO.url}/uk-invoice-guides/${guide.slug}`,
        headline: guide.title,
        datePublished: guide.publishedDate,
        author: {
          '@type': 'Organization',
          '@id': `${BUSINESS_INFO.url}/#organization`,
          name: BUSINESS_INFO.legalName
        }
      }
    }))
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'UK Invoice Guides', url: '/uk-invoice-guides' }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Server-Rendered Guide Index Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      
      {/* Hero Section with Stats */}
      <PageHero
        title="UK Invoice Compliance Guides"
        description="Expert guides on VAT rates, CIS deductions, Gas Safe registration, NICEIC certification, and HMRC compliance requirements. Free comprehensive resources for UK businesses."
      >
        {/* Guide Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 border border-slate-200 shadow-sm">
            <BookOpen className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-2xl font-bold text-gray-800">{stats.totalGuides}</span>
            <span className="text-sm text-gray-600">Guides</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 border border-slate-200 shadow-sm">
            <Clock className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-2xl font-bold text-gray-800">{stats.averageReadTime}min</span>
            <span className="text-sm text-gray-600">Avg Read</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 border border-slate-200 shadow-sm">
            <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
            <span className="text-2xl font-bold text-gray-800">{stats.totalSearchVolume.toLocaleString()}</span>
            <span className="text-sm text-gray-600">Searches/mo</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 border border-slate-200 shadow-sm">
            <Tag className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-2xl font-bold text-gray-800">{stats.categories}</span>
            <span className="text-sm text-gray-600">Categories</span>
          </div>
        </div>
      </PageHero>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Featured Guides */}
          {featuredGuides.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Featured Guides
                  </h2>
                  <p className="text-lg text-slate-600">
                    Most popular compliance resources
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/uk-invoice-guides/${guide.slug}`}
                    className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-primary-100 hover:border-primary-400"
                  >
                    {/* Featured Badge */}
                    <div className="bg-gradient-to-r from-primary-600 to-accent-500 px-4 py-2">
                      <span className="text-white text-sm font-bold flex items-center gap-2">
                        <span className="text-xl">{guide.icon}</span>
                        FEATURED
                      </span>
                    </div>

                    <div className="p-6">
                      {/* Category Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">{guide.categoryIcon}</span>
                        <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                          {guide.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {guide.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-600 mb-4 line-clamp-3">
                        {guide.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {guide.readTime} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Search className="w-4 h-4" />
                            {guide.searchVolume.toLocaleString()}/mo
                          </span>
                        </div>
                      </div>

                      {/* Read Button */}
                      <div className="flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-3 transition-all">
                        Read Guide
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Categories Filter */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Browse by Category</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className="flex items-center gap-2 px-6 py-3 bg-white rounded-full border-2 border-slate-200 hover:border-primary-500 hover:bg-primary-50 transition-all shadow-sm hover:shadow-md"
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-semibold text-slate-700">{category.name}</span>
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* All Guides Grid */}
          {regularGuides.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    All Compliance Guides
                  </h2>
                  <p className="text-lg text-slate-600">
                    Comprehensive resources for UK invoice compliance
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/uk-invoice-guides/${guide.slug}`}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-primary-300"
                  >
                    <div className="p-6">
                      {/* Category Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">{guide.categoryIcon}</span>
                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                          {guide.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {guide.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                        {guide.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {guide.readTime} min read
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
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Need Help with UK Invoice Compliance?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Use our free invoice generator with automatic VAT calculations, CIS deductions, 
              and HMRC compliance built in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/invoice-generator"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all hover:scale-105 text-lg shadow-xl"
              >
                Generate Invoice <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/uk-invoice-guide"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all text-lg"
              >
                View Main Guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
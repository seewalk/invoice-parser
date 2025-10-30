import { Metadata } from 'next';
import { 
  getAllCompetitors, 
  getKnowledgeBaseStats,
  marketSegments 
} from '../lib/alternativesKnowledgeBase';
import PageHero from '../components/PageHero';
import { AlternativesStats } from '../components/alternatives/AlternativesStats';
import Link from 'next/link';
import { 
  Building2,
  TrendingUp,
  Users,
  Search,
  ArrowRight,
  Zap,
  FileText,
  Bot,
  CheckCircle
} from 'lucide-react';
import { BUSINESS_INFO, generateBreadcrumbSchema } from '../lib/schemaConfig';

export const metadata: Metadata = {
  title: 'Invoice Parser Alternatives & Competitors | Compare Best Solutions',
  description: 'Comprehensive comparison of invoice parsing solutions. Compare Elektroluma with Invoice-Generator.com, Nanonets, Zoho, Wise, and other alternatives. Find the perfect fit for UK small businesses.',
  keywords: [
    'invoice parser alternatives',
    'invoice generator comparison',
    'AI invoice parser competitors',
    'invoice software alternatives',
    'invoice-generator.com alternative',
    'nanonets alternative',
    'zoho invoice alternative',
    'best invoice parser UK',
    'invoice automation comparison',
    'invoice OCR alternatives'
  ],
  openGraph: {
    title: 'Invoice Parser Alternatives & Competitors | Compare Solutions',
    description: 'Compare top invoice parsing solutions. Find the best alternative for UK small businesses with AI automation, accounting integration, and UK compliance.',
    type: 'website',
    url: `${BUSINESS_INFO.url}/alternatives`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invoice Parser Alternatives & Competitors',
    description: 'Compare top invoice parsing solutions for UK small businesses.',
  },
};

export default function AlternativesPage() {
  // Fetch all data
  const allCompetitors = getAllCompetitors();
  const stats = getKnowledgeBaseStats();

  // Group competitors by segment
  const freeGenerators = allCompetitors.filter(c => c.segment === 'free-generator');
  const templateLibraries = allCompetitors.filter(c => c.segment === 'template-library');
  const aiParsers = allCompetitors.filter(c => c.segment === 'ai-parser');
  const apiServices = allCompetitors.filter(c => c.segment === 'api-service');

  // Generate schemas
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Invoice Parser Alternatives & Competitors',
    description: 'Comprehensive comparison of invoice parsing and automation solutions',
    itemListElement: allCompetitors.slice(0, 50).map((competitor, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        '@id': `${BUSINESS_INFO.url}/alternatives/${competitor.slug}`,
        name: competitor.name,
        description: competitor.shortDescription,
        url: competitor.website,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web'
      }
    }))
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Alternatives', url: '/alternatives' }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Server-Rendered Schemas */}
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
        title="Invoice Parser Alternatives"
        description="Comprehensive comparison of invoice parsing and automation solutions. Find the best alternative for your business with detailed feature comparisons, pricing analysis, and UK compliance reviews."
      >
        {/* Stats */}
        <AlternativesStats stats={stats} />
      </PageHero>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Market Overview */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Invoice Processing Market Landscape
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The invoice processing market is segmented into three main categories, each serving different business needs and budgets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Generators Segment */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Free Generators</h3>
              </div>
              <p className="text-slate-600 mb-4">{marketSegments.freeGenerators.description}</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Market Size: {marketSegments.freeGenerators.totalMarketSize}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>{stats.freeGenerators} major players</span>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-blue-900 mb-2">💡 Opportunity Gap:</p>
                <p className="text-sm text-blue-800">{marketSegments.freeGenerators.opportunityGap}</p>
              </div>
              <Link
                href="#free-generators"
                className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
              >
                View competitors
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Template Libraries Segment */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Template Libraries</h3>
              </div>
              <p className="text-slate-600 mb-4">{marketSegments.templateLibraries.description}</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Market Size: {marketSegments.templateLibraries.totalMarketSize}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>{stats.templateLibraries} major players</span>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-blue-900 mb-2">💡 Opportunity Gap:</p>
                <p className="text-sm text-blue-800">{marketSegments.templateLibraries.opportunityGap}</p>
              </div>
              <Link
                href="#template-libraries"
                className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
              >
                View competitors
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* AI Parsers Segment */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Bot className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">AI Parsers</h3>
              </div>
              <p className="text-slate-600 mb-4">{marketSegments.aiParsers.description}</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span>Market Size: {marketSegments.aiParsers.totalMarketSize}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span>{stats.aiParsers} major players</span>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-blue-900 mb-2">💡 Opportunity Gap:</p>
                <p className="text-sm text-blue-800">{marketSegments.aiParsers.opportunityGap}</p>
              </div>
              <Link
                href="#ai-parsers"
                className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
              >
                View competitors
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Free Generators Section */}
        <section id="free-generators" className="mb-16 scroll-mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-green-100 rounded-xl">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Free Invoice Generators</h2>
              <p className="text-slate-600">Simple tools for creating invoices manually</p>
            </div>
          </div>

          {freeGenerators.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freeGenerators.map((competitor) => (
                <Link
                  key={competitor.id}
                  href={`/alternatives/${competitor.slug}`}
                  className="group bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-300 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {competitor.name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">{competitor.company.headquarters}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {competitor.shortDescription}
                  </p>

                  {/* Quick Stats */}
                  <div className="space-y-2 mb-4">
                    {competitor.traffic.monthlyUsers && (
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Users className="w-4 h-4 text-green-600" />
                        <span>{(competitor.traffic.monthlyUsers / 1000000).toFixed(1)}M monthly users</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{competitor.pricing.model === 'free' ? 'Free' : 'Freemium'} model</span>
                    </div>
                  </div>

                  {/* Pricing Badge */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">Starting at:</span>
                      <span className="text-lg font-bold text-green-600">
                        {competitor.pricing.tiers[0]?.price === 0 ? 'Free' : `${competitor.pricing.currency} ${competitor.pricing.tiers[0]?.price}`}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">No competitors found in this category</p>
            </div>
          )}
        </section>

        {/* Template Libraries Section */}
        <section id="template-libraries" className="mb-16 scroll-mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Invoice Template Libraries</h2>
              <p className="text-slate-600">Pre-designed templates for various industries</p>
            </div>
          </div>

          {templateLibraries.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templateLibraries.map((competitor) => (
                <Link
                  key={competitor.id}
                  href={`/alternatives/${competitor.slug}`}
                  className="group bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-300 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {competitor.name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">{competitor.company.headquarters}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {competitor.shortDescription}
                  </p>

                  {/* Quick Stats */}
                  <div className="space-y-2 mb-4">
                    {competitor.features.ukCompliance && (
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span>UK Compliance</span>
                      </div>
                    )}
                    {competitor.features.multiCurrency && (
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span>Multi-currency</span>
                      </div>
                    )}
                  </div>

                  {/* Pricing Badge */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">Starting at:</span>
                      <span className="text-lg font-bold text-blue-600">
                        {competitor.pricing.tiers[0]?.price === 0 ? 'Free' : `${competitor.pricing.currency} ${competitor.pricing.tiers[0]?.price}`}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <Zap className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">No competitors found in this category</p>
            </div>
          )}
        </section>

        {/* AI Parsers Section */}
        <section id="ai-parsers" className="mb-16 scroll-mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Bot className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">AI-Powered Invoice Parsers</h2>
              <p className="text-slate-600">Advanced OCR and automation solutions</p>
            </div>
          </div>

          {aiParsers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiParsers.map((competitor) => (
                <Link
                  key={competitor.id}
                  href={`/alternatives/${competitor.slug}`}
                  className="group bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-300 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {competitor.name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">{competitor.company.headquarters}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {competitor.shortDescription}
                  </p>

                  {/* Quick Stats */}
                  <div className="space-y-2 mb-4">
                    {competitor.features.ocrAccuracy && (
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                        <span>{competitor.features.ocrAccuracy}% OCR accuracy</span>
                      </div>
                    )}
                    {competitor.features.automation && (
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                        <span>Full automation</span>
                      </div>
                    )}
                  </div>

                  {/* Pricing Badge */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">Starting at:</span>
                      <span className="text-lg font-bold text-purple-600">
                        {competitor.pricing.tiers[0]?.price === 0 ? 'Free Tier' : `${competitor.pricing.currency} ${competitor.pricing.tiers[0]?.price}/mo`}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <Bot className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">No competitors found in this category</p>
            </div>
          )}
        </section>

        {/* API Services Section */}
        {apiServices.length > 0 && (
          <section id="api-services" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Building2 className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">API Services</h2>
                <p className="text-slate-600">Developer-focused invoice processing APIs</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apiServices.map((competitor) => (
                <Link
                  key={competitor.id}
                  href={`/alternatives/${competitor.slug}`}
                  className="group bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-300 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {competitor.name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">{competitor.company.headquarters}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {competitor.shortDescription}
                  </p>

                  {/* Quick Stats */}
                  <div className="space-y-2 mb-4">
                    {competitor.features.apiAccess && (
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle className="w-4 h-4 text-orange-600" />
                        <span>Full API access</span>
                      </div>
                    )}
                    {competitor.features.batchProcessing && (
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle className="w-4 h-4 text-orange-600" />
                        <span>Batch processing</span>
                      </div>
                    )}
                  </div>

                  {/* Pricing Badge */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">Pricing:</span>
                      <span className="text-lg font-bold text-orange-600">
                        {competitor.pricing.model === 'usage-based' ? 'Pay-as-you-go' : `${competitor.pricing.currency} ${competitor.pricing.tiers[0]?.price}/mo`}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="mt-16 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-8 py-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose Elektroluma?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              AI-powered automation + UK compliance + affordable pricing. The perfect alternative for UK small businesses.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/parser"
                className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-all hover:scale-105 shadow-xl"
              >
                Try Invoice Parser
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/uk-invoice-guide"
                className="inline-flex items-center px-8 py-4 bg-indigo-500 text-white rounded-xl font-semibold text-lg hover:bg-indigo-600 transition-all hover:scale-105 shadow-xl"
              >
                UK Compliance Guide
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
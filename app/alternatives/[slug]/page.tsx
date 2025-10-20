import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  getCompetitorBySlug, 
  getAllCompetitorSlugs, 
  getRelatedCompetitors,
  getElektrolumaAdvantages,
  getResourcesByCategory,
  Competitor 
} from '../../lib/alternativesKnowledgeBase';
import { generateBreadcrumbSchema, BUSINESS_INFO } from '../../lib/schemaConfig';
import PageHero from '../../components/PageHero';
import { CompetitorCard } from '../../components/competitors/CompetitorCard';
import { 
  ArrowLeft,
  Building2,
  MapPin,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  Zap,
  DollarSign,
  Star,
  ExternalLink,
  Shield,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';

// Generate static params for all competitors at build time
export async function generateStaticParams() {
  const slugs = getAllCompetitorSlugs();
  
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
  const competitor = getCompetitorBySlug(slug);

  if (!competitor) {
    return {
      title: 'Competitor Not Found',
    };
  }

  return {
    title: `${competitor.name} Alternative | Elektroluma Comparison`,
    description: `Comprehensive comparison of ${competitor.name} vs Elektroluma. Features, pricing, UK compliance, and why UK small businesses choose Elektroluma. ${competitor.shortDescription}`,
    keywords: [
      ...competitor.keywords,
      ...competitor.alternativeKeywords,
      `${competitor.name} alternative`,
      `${competitor.name} vs Elektroluma`,
      `${competitor.name} comparison`,
      'UK invoice parser',
      'affordable invoice automation'
    ],
    openGraph: {
      title: `${competitor.name} Alternative | Elektroluma`,
      description: competitor.shortDescription,
      type: 'website',
      url: `${BUSINESS_INFO.url}/alternatives/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${competitor.name} Alternative | Elektroluma`,
      description: competitor.shortDescription,
    },
  };
}

export default async function CompetitorPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const competitor = getCompetitorBySlug(slug);

  // Show 404 if competitor not found
  if (!competitor) {
    notFound();
  }

  // Get related competitors
  const relatedCompetitors = getRelatedCompetitors(competitor, 3);
  
  // Get Elektroluma advantages
  const advantages = getElektrolumaAdvantages(competitor.slug);

  // Get external resources
  const monitoringTools = getResourcesByCategory('monitoring');
  const researchReports = getResourcesByCategory('research');

  // Generate schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Alternatives', url: '/alternatives' },
    { name: competitor.name, url: `/alternatives/${slug}` },
  ]);

  // Segment color mapping
  const segmentColors: Record<string, { bg: string; text: string; border: string }> = {
    'free-generator': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    'template-library': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    'ai-parser': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    'api-service': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  };

  const segmentColor = segmentColors[competitor.segment] || { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <PageHero
          title={`${competitor.name} Alternative`}
          description={competitor.description}
        >
          {/* Competitor Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            {/* Segment Badge */}
            <div className={`flex items-center gap-2 ${segmentColor.bg} backdrop-blur-sm px-4 py-2 rounded-full border ${segmentColor.border}`}>
              <span className={`font-semibold ${segmentColor.text}`}>
                {competitor.segment.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>

            {/* Headquarters */}
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-700">{competitor.company.headquarters}</span>
            </div>

            {/* Founded */}
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-700">Founded {competitor.company.founded}</span>
            </div>

            {/* Traffic */}
            {competitor.traffic.monthlyUsers && (
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
                <Users className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-700">{(competitor.traffic.monthlyUsers / 1000000).toFixed(1)}M users</span>
              </div>
            )}

            {/* Website Link */}
            <a
              href={competitor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-full border border-indigo-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">Visit Website</span>
            </a>
          </div>
        </PageHero>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back to Alternatives Link */}
          <Link 
            href="/alternatives"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Alternatives
          </Link>

          {/* Company Information */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Company Overview</h2>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">About {competitor.name}</h3>
                  <p className="text-slate-700 leading-relaxed mb-4">{competitor.description}</p>
                  
                  {competitor.company.valuation && (
                    <div className="flex items-center gap-2 text-slate-600 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Valuation:</span>
                      <span>{competitor.company.valuation}</span>
                    </div>
                  )}
                  
                  {competitor.company.employees && (
                    <div className="flex items-center gap-2 text-slate-600 mb-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Team Size:</span>
                      <span>{competitor.company.employees}</span>
                    </div>
                  )}
                  
                  {competitor.company.funding && (
                    <div className="flex items-center gap-2 text-slate-600 mb-2">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">Funding:</span>
                      <span>{competitor.company.funding}</span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Target Market</h3>
                  <p className="text-slate-700 mb-4">{competitor.targetMarket.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-semibold text-slate-600">Business Size:</span>
                      <span className={`ml-2 inline-block text-sm px-3 py-1 rounded-full ${segmentColor.bg} ${segmentColor.text}`}>
                        {competitor.targetMarket.businessSize.charAt(0).toUpperCase() + competitor.targetMarket.businessSize.slice(1)}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-sm font-semibold text-slate-600">Industries:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {competitor.targetMarket.industry.slice(0, 5).map((industry, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                          >
                            {industry}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm font-semibold text-slate-600">Geography:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {competitor.targetMarket.geography.map((geo, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                          >
                            {geo}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Comparison */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Features Overview</h2>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries({
                  'AI-Powered': competitor.features.aiPowered,
                  'UK Compliance': competitor.features.ukCompliance,
                  'VAT Support': competitor.features.vatSupport,
                  'CIS Support': competitor.features.cisSupport,
                  'Automation': competitor.features.automation,
                  'Mobile App': competitor.features.mobileApp,
                  'API Access': competitor.features.apiAccess,
                  'Custom Templates': competitor.features.customTemplates,
                  'Multi-Currency': competitor.features.multiCurrency,
                  'Batch Processing': competitor.features.batchProcessing,
                }).map(([feature, hasFeature]) => (
                  <div 
                    key={feature}
                    className={`flex items-center gap-3 p-4 rounded-lg ${
                      hasFeature ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    {hasFeature ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                    <span className={`text-sm font-medium ${
                      hasFeature ? 'text-green-900' : 'text-red-900'
                    }`}>
                      {feature}
                    </span>
                  </div>
                ))}
                
                {competitor.features.ocrAccuracy && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-purple-50 border border-purple-200 col-span-full">
                    <Zap className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-purple-900">
                      OCR Accuracy: {competitor.features.ocrAccuracy}%
                    </span>
                  </div>
                )}
              </div>

              {/* Accounting Integrations */}
              {competitor.features.accountingIntegration.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Accounting Integrations</h3>
                  <div className="flex flex-wrap gap-2">
                    {competitor.features.accountingIntegration.map((integration, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center gap-2 text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {integration}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Pricing */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Pricing Structure</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competitor.pricing.tiers.map((tier, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg border-2 p-8 ${
                    index === 1 ? 'border-indigo-500 ring-4 ring-indigo-100' : 'border-slate-200'
                  }`}
                >
                  {index === 1 && (
                    <div className="inline-block bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                      POPULAR
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                  
                  <div className="mb-6">
                    {tier.price === 0 ? (
                      <div className="text-4xl font-bold text-green-600">Free</div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl text-slate-600">{competitor.pricing.currency}</span>
                        <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                        {tier.billingPeriod && (
                          <span className="text-slate-600">/{tier.billingPeriod}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.limits && (
                    <div className="pt-4 border-t border-slate-200 space-y-2">
                      {tier.limits.users && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Users:</span>
                          <span className="font-semibold text-slate-900">{tier.limits.users}</span>
                        </div>
                      )}
                      {tier.limits.invoices && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Invoices:</span>
                          <span className="font-semibold text-slate-900">{tier.limits.invoices}/month</span>
                        </div>
                      )}
                      {tier.limits.pages && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Pages:</span>
                          <span className="font-semibold text-slate-900">{tier.limits.pages}/month</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {competitor.pricing.usageFees && (
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-1">Additional Usage Fees</h4>
                    <p className="text-sm text-amber-800">{competitor.pricing.usageFees.description}</p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Strengths & Weaknesses */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Pros & Cons</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Strengths</h3>
                </div>
                <ul className="space-y-3">
                  {competitor.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Weaknesses</h3>
                </div>
                <ul className="space-y-3">
                  {competitor.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Customer Reviews */}
          {competitor.reviews && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Customer Reviews</h2>
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                      <span className="text-3xl font-bold text-slate-900">{competitor.reviews.overall}</span>
                    </div>
                    <p className="text-sm text-slate-600">Overall Rating</p>
                  </div>

                  {competitor.reviews.trustpilot && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        <span className="text-3xl font-bold text-slate-900">{competitor.reviews.trustpilot}</span>
                      </div>
                      <p className="text-sm text-slate-600">Trustpilot</p>
                    </div>
                  )}

                  {competitor.reviews.g2 && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        <span className="text-3xl font-bold text-slate-900">{competitor.reviews.g2}</span>
                      </div>
                      <p className="text-sm text-slate-600">G2</p>
                    </div>
                  )}

                  {competitor.reviews.capterra && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        <span className="text-3xl font-bold text-slate-900">{competitor.reviews.capterra}</span>
                      </div>
                      <p className="text-sm text-slate-600">Capterra</p>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-4">Common User Feedback</h4>
                  <div className="space-y-3">
                    {competitor.reviews.userComments.map((comment, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                        <div className="p-1.5 bg-white rounded-full shadow-sm">
                          <Users className="w-4 h-4 text-slate-600" />
                        </div>
                        <p className="text-slate-700 text-sm italic">"{comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Why Choose Elektroluma Instead */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Why Choose Elektroluma Over {competitor.name}?
            </h2>
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl shadow-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Elektroluma Advantages</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                    <span className="text-white">{advantage}</span>
                  </div>
                ))}
              </div>

              {competitor.migrationPath && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Migration Path
                  </h4>
                  <p className="text-indigo-100">{competitor.migrationPath}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/parser"
                  className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-all hover:scale-105 shadow-xl"
                >
                  Try Elektroluma Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center px-8 py-4 bg-indigo-500 text-white rounded-xl font-semibold text-lg hover:bg-indigo-600 transition-all hover:scale-105 shadow-xl border-2 border-white/20"
                >
                  View Pricing
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>

          {/* External Resources */}
          {(monitoringTools.length > 0 || researchReports.length > 0) && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Research & Comparison Resources</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {monitoringTools.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Competitor Monitoring Tools</h3>
                    <div className="space-y-3">
                      {monitoringTools.map((tool) => (
                        <a
                          key={tool.id}
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                        >
                          <div>
                            <div className="font-medium text-slate-900">{tool.name}</div>
                            <div className="text-sm text-slate-600">{tool.description}</div>
                          </div>
                          <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {researchReports.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Industry Research</h3>
                    <div className="space-y-3">
                      {researchReports.map((report) => (
                        <a
                          key={report.id}
                          href={report.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                        >
                          <div>
                            <div className="font-medium text-slate-900">{report.name}</div>
                            <div className="text-sm text-slate-600">{report.description}</div>
                          </div>
                          <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Related Competitors */}
          {relatedCompetitors.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Other {competitor.segment.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Alternatives
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedCompetitors.map((relatedCompetitor) => (
                  <CompetitorCard 
                    key={relatedCompetitor.id} 
                    competitor={relatedCompetitor}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Bottom Navigation */}
          <div className="pt-8 border-t border-slate-200">
            <Link 
              href="/alternatives"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              View All Alternatives
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
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
import { CompetitorCard } from '../../components/alternatives/CompetitorCard';
import { getSegmentLabel } from '../../utils/segmentUtils';
import { CompetitorMetaBadges } from '../../components/alternatives/competitor-detail/CompetitorMetaBadges';
import { CompanyOverviewSection } from '../../components/alternatives/competitor-detail/CompanyOverviewSection';
import { FeaturesComparisonSection } from '../../components/alternatives/competitor-detail/FeaturesComparisonSection';
import { PricingStructureSection } from '../../components/alternatives/competitor-detail/PricingStructureSection';
import { ProsConsSection } from '../../components/alternatives/competitor-detail/ProsConsSection';
import { CustomerReviewsSection } from '../../components/alternatives/competitor-detail/CustomerReviewsSection';
import { ElektrolumaAdvantagesSection } from '../../components/alternatives/competitor-detail/ElektrolumaAdvantagesSection';
import { ExternalResourcesSection } from '../../components/alternatives/competitor-detail/ExternalResourcesSection';
import { ArrowLeft } from 'lucide-react';

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
          <CompetitorMetaBadges competitor={competitor} />
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
          <CompanyOverviewSection competitor={competitor} />

          {/* Features Comparison */}
          <FeaturesComparisonSection features={competitor.features} />

          {/* Pricing */}
          <PricingStructureSection pricing={competitor.pricing} />

          {/* Strengths & Weaknesses */}
          <ProsConsSection strengths={competitor.strengths} weaknesses={competitor.weaknesses} />

          {/* Customer Reviews */}
          <CustomerReviewsSection reviews={competitor.reviews} />

          {/* Why Choose Elektroluma Instead */}
          <ElektrolumaAdvantagesSection 
            competitorName={competitor.name}
            advantages={advantages}
            migrationPath={competitor.migrationPath}
          />

          {/* External Resources */}
          <ExternalResourcesSection 
            monitoringTools={monitoringTools}
            researchReports={researchReports}
          />

          {/* Related Competitors */}
          {relatedCompetitors.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Other {getSegmentLabel(competitor.segment as any)} Alternatives
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
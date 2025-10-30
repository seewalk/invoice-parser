import { Metadata } from 'next';
import { 
  getAllCompetitors, 
  getKnowledgeBaseStats,
  marketSegments 
} from '../lib/alternativesKnowledgeBase';
import PageHero from '../components/PageHero';
import { AlternativesStats } from '../components/alternatives/AlternativesStats';
import { MarketOverviewSection, MarketSegmentData } from '../components/alternatives/MarketOverviewSection';
import { CompetitorGridSection } from '../components/alternatives/CompetitorGridSection';
import { CTASection } from '../components/CTASectionBlack';
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

  // Prepare market segments data for MarketOverviewSection
  const marketSegmentsData: MarketSegmentData[] = [
    {
      title: 'Free Generators',
      description: marketSegments.freeGenerators.description,
      icon: FileText,
      iconVariant: 'success',
      totalMarketSize: marketSegments.freeGenerators.totalMarketSize,
      competitorCount: stats.freeGenerators,
      opportunityGap: marketSegments.freeGenerators.opportunityGap,
      linkTo: '#free-generators'
    },
    {
      title: 'Template Libraries',
      description: marketSegments.templateLibraries.description,
      icon: Zap,
      iconVariant: 'primary',
      totalMarketSize: marketSegments.templateLibraries.totalMarketSize,
      competitorCount: stats.templateLibraries,
      opportunityGap: marketSegments.templateLibraries.opportunityGap,
      linkTo: '#template-libraries'
    },
    {
      title: 'AI Parsers',
      description: marketSegments.aiParsers.description,
      icon: Bot,
      iconVariant: 'warning',
      totalMarketSize: marketSegments.aiParsers.totalMarketSize,
      competitorCount: stats.aiParsers,
      opportunityGap: marketSegments.aiParsers.opportunityGap,
      linkTo: '#ai-parsers'
    }
  ];

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
        <MarketOverviewSection segments={marketSegmentsData} />

        {/* Free Generators Section */}
        <CompetitorGridSection
          id="free-generators"
          title="Free Invoice Generators"
          description="Simple tools for creating invoices manually"
          icon={FileText}
          iconVariant="success"
          competitors={freeGenerators}
        />

        {/* Template Libraries Section */}
        <CompetitorGridSection
          id="template-libraries"
          title="Invoice Template Libraries"
          description="Pre-designed templates for various industries"
          icon={Zap}
          iconVariant="primary"
          competitors={templateLibraries}
        />

        {/* AI Parsers Section */}
        <CompetitorGridSection
          id="ai-parsers"
          title="AI-Powered Invoice Parsers"
          description="Advanced OCR and automation solutions"
          icon={Bot}
          iconVariant="warning"
          competitors={aiParsers}
        />

        {/* API Services Section */}
        {apiServices.length > 0 && (
          <CompetitorGridSection
            id="api-services"
            title="API Services"
            description="Developer-focused invoice processing APIs"
            icon={Building2}
            iconVariant="info"
            competitors={apiServices}
          />
        )}

        {/* Bottom CTA */}
        <CTASection
          title="Why Choose Elektroluma?"
          description="AI-powered automation + UK compliance + affordable pricing. The perfect alternative for UK small businesses."
          buttonText="Try Invoice Parser"
          buttonHref="/parser"
          variant="gradient"
          buttonVariant="accent"
          className="mt-16"
        />
      </div>
    </div>
  );
}
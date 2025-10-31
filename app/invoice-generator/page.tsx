import { Metadata } from 'next';
import Link from 'next/link';
import { allIndustries } from '@/app/lib/invoiceTemplateLibrary';
import PageHero from '@/app/components/PageHero';
import { Heading } from '@/app/components/ui/Heading';
import InvoiceGeneratorHeroStats from '@/app/components/invoice-generator/InvoiceGeneratorHeroStats';
import InvoiceGeneratorHowItWorks from '@/app/components/invoice-generator/InvoiceGeneratorHowItWorks';
import InvoiceGeneratorTemplateCard from '@/app/components/invoice-generator/InvoiceGeneratorTemplateCard';
import InvoiceGeneratorFeatures from '@/app/components/invoice-generator/InvoiceGeneratorFeatures';
import InvoiceGeneratorPageSchema from '@/app/components/invoice-generator/InvoiceGeneratorTemplateSchemaOptimized.tsx';
import InvoiceGeneratorExpandingLibrary from '@/app/components/invoice-generator/InvoiceGeneratorExpandingLibrary';
import InvoiceGeneratorExpandingLibrarySchema from '@/app/components/invoice-generator/InvoiceGeneratorExpandingLibrary';

export const metadata: Metadata = {
  title: 'Invoice Generator | 162+ Professional Invoice Templates Free',
  description: 'Generate professional invoices online with our free invoice generator. Choose from 162+ industry-specific templates including AI consulting, teletherapy, solar installation, pet services, and more. Instant download, free forever.',
  keywords: 'invoice generator, create invoice online, custom invoice, free invoice maker, professional invoice templates, industry invoice templates',
  alternates: {
    canonical: 'https://elektroluma.co.uk/invoice-generator',
  },
  openGraph: {
    title: 'Free Invoice Generator | 162+ Professional Templates',
    description: 'Generate professional invoices online with our free invoice generator. 162+ industry-specific templates, instant download, free forever.',
    url: 'https://elektroluma.co.uk/invoice-generator',
    images: ['/opengraph-image.jpg'],
  },
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function InvoiceGeneratorPage() {
  // Collect all templates from all industries
  const allTemplates: Array<{
    id: string;
    name: string;
    description: string;
    searchVolume: number;
    industryName: string;
    slug: string;
  }> = [];

  for (const [industryId, industry] of Object.entries(allIndustries)) {
    for (const category of Object.values(industry.categories)) {
      for (const subCategory of Object.values(category.subCategories)) {
        for (const template of subCategory.templates) {
          allTemplates.push({
            id: template.id,
            name: template.name,
            description: template.description,
            searchVolume: template.searchVolume,
            industryName: industry.name,
            slug: slugify(template.keywords[0]),
          });
        }
      }
    }
  }

  // Sort by search volume (popularity)
  allTemplates.sort((a, b) => b.searchVolume - a.searchVolume);

  return (
    <>
      {/* Enhanced Server-Side Schema Markup */}
      <InvoiceGeneratorPageSchema
        template={allTemplates}
        industriesCount={Object.keys(allIndustries).length}
      />
      

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        
        {/* Hero Section */}
      <PageHero
        badge="Free Invoice Generator"
        title="Generate Your Invoice Online For Free"
        description="Choose from our library of professional invoice templates and generate invoice for free. Customize with your business details, and download your invoice instantly."
        size="compact"
        className="border-b border-slate-200 bg-white/50 backdrop-blur-sm"
        backgroundElements={false}
      >
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 text-sm text-slate-600 mb-8">
          <Link href="/" className="hover:text-indigo-600 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Invoice Generator</span>
        </nav>

        {/* Quick Stats */}
        <InvoiceGeneratorHeroStats
          templatesCount={allTemplates.length}
          industriesCount={Object.keys(allIndustries).length}
        />
      </PageHero>

      {/* How It Works */}
      <InvoiceGeneratorHowItWorks />

      {/* Template Selection */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Heading as="h2" size="display-sm" className="mb-8">
            Select Your Free Invoice Template
          </Heading>

          {/* Template Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allTemplates.map((template) => (
              <InvoiceGeneratorTemplateCard
                key={template.id}
                id={template.id}
                name={template.name}
                description={template.description}
                searchVolume={template.searchVolume}
                industryName={template.industryName}
                slug={template.slug}
              />
            ))}
          </div>
        </div>
      </section>

        {/* Features */}
        <InvoiceGeneratorFeatures />

        {/* Expanding Library Section - New Templates */}
        <InvoiceGeneratorExpandingLibrary />

      </div>
    </>
  );
}

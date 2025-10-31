import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { 
  allIndustries,
  type InvoiceTemplate,
} from '@/app/lib/invoiceTemplateLibrary';
import InvoiceGeneratorClient from '../../components/InvoiceGeneratorClient';
import InvoiceGeneratorTemplateSchemaOptimized from '../../components/invoice-generator/InvoiceGeneratorTemplateSchemaOptimized.tsx';



// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getTemplateBySlug(slug: string): { template: InvoiceTemplate; industryId: string; industryName: string } | null {
  for (const [industryId, industry] of Object.entries(allIndustries)) {
    for (const category of Object.values(industry.categories)) {
      for (const subCategory of Object.values(category.subCategories)) {
        for (const template of subCategory.templates) {
          const templateSlug = slugify(template.keywords[0]);
          if (templateSlug === slug) {
            return { 
              template, 
              industryId,
              industryName: industry.name 
            };
          }
        }
      }
    }
  }
  return null;
}

function getAllTemplateSlugs(): string[] {
  const slugs: string[] = [];
  
  for (const industry of Object.values(allIndustries)) {
    for (const category of Object.values(industry.categories)) {
      for (const subCategory of Object.values(category.subCategories)) {
        for (const template of subCategory.templates) {
          slugs.push(slugify(template.keywords[0]));
        }
      }
    }
  }
  
  return slugs;
}

// ============================================================================
// GENERATE STATIC PARAMS (Build Time)
// ============================================================================

export async function generateStaticParams() {
  const slugs = getAllTemplateSlugs();
  
  return slugs.map(slug => ({
    slug: slug,
  }));
}

// ============================================================================
// GENERATE METADATA (SEO)
// ============================================================================

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const result = getTemplateBySlug(slug);
  
  if (!result) {
    return {
      title: 'Template Not Found',
    };
  }

  const { template, industryName } = result;
  const canonicalUrl = `https://elektroluma.co.uk/invoice-generator/${slug}`;
  
  return {
    title: `${template.name} | Free Invoice Generator`,
    description: `Generate free ${template.name.toLowerCase()} online. ${template.description} and ${industryName}. Create an invoice today.`,
    keywords: [...template.keywords, 'invoice generator', 'create invoice', 'invoice maker', industryName.toLowerCase()].join(', '),
    alternates: {
      canonical: canonicalUrl,
    },
   
  };
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default async function InvoiceGeneratorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = getTemplateBySlug(slug);
  
  if (!result) {
    notFound();
  }

  const { template, industryId, industryName } = result;

  return (
    <>
      {/* Optimized Server-Side Schema Markup (4 Schemas) */}
      <InvoiceGeneratorTemplateSchemaOptimized
        template={template}
        industryName={industryName}
        slug={slug}
      />
      
      {/* Client Component */}
      <InvoiceGeneratorClient template={template} industryName={industryName} />
    </>
  );
}

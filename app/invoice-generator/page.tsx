import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileText, Search, TrendingUp } from 'lucide-react';
import { allIndustries } from '@/app/lib/invoiceTemplateLibrary';

export const metadata: Metadata = {
  title: 'Invoice Generator | Create Custom Invoices Online',
  description: 'Generate professional invoices online with our free invoice generator. Choose from industry-specific templates and customize for your business needs.',
  keywords: 'invoice generator, create invoice online, custom invoice, free invoice maker',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-600 mb-6">
            <Link href="/" className="hover:text-indigo-600 transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Invoice Generator</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Create Your Invoice Online
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Choose from our library of professional invoice templates, customize with your business details, and download your invoice instantly.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                <div className="text-2xl font-bold text-indigo-600 mb-1">
                  {allTemplates.length}
                </div>
                <div className="text-sm text-slate-600">Templates</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                <div className="text-2xl font-bold text-indigo-600 mb-1">
                  {Object.keys(allIndustries).length}
                </div>
                <div className="text-sm text-slate-600">Industries</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                <div className="text-2xl font-bold text-indigo-600 mb-1">
                  100%
                </div>
                <div className="text-sm text-slate-600">Free</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Choose Template
              </h3>
              <p className="text-slate-600">
                Select from our library of industry-specific invoice templates
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Fill Details
              </h3>
              <p className="text-slate-600">
                Enter your business and client information with live preview
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Download PDF
              </h3>
              <p className="text-slate-600">
                Generate and download your professional invoice instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Selection */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Select Your Template
          </h2>

          {/* Template Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allTemplates.map((template) => (
              <Link
                key={template.id}
                href={`/invoice-generator/${template.slug}`}
                className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-300 transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition">
                    <FileText className="w-6 h-6 text-indigo-600 group-hover:text-white transition" />
                  </div>
                  <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">
                    {template.industryName}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition">
                  {template.name}
                </h3>

                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {template.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <TrendingUp className="w-4 h-4" />
                    <span>{template.searchVolume.toLocaleString()} searches/mo</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Why Use Our Invoice Generator?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                ✓
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                100% Free
              </h3>
              <p className="text-slate-600 text-sm">
                No hidden fees or subscriptions required
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Instant Download
              </h3>
              <p className="text-slate-600 text-sm">
                Generate and download PDFs in seconds
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                👁️
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Live Preview
              </h3>
              <p className="text-slate-600 text-sm">
                See changes in real-time as you type
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                🎨
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Professional
              </h3>
              <p className="text-slate-600 text-sm">
                Industry-standard invoice formats
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  getGuideBySlug, 
  getAllGuideSlugs, 
  getRelatedGuides,
  GuideArticle,
  GuideSection
} from '../../lib/ukInvoiceGuidesData';
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '../../lib/schemaConfig';
import PageHero from '../../components/PageHero';
import { 
  Clock, 
  Calendar, 
  User,
  Tag,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Info,
  AlertTriangle,
  AlertCircle,
  ChevronRight,
  FileText,
  Download
} from 'lucide-react';

// Generate static params for all guide articles at build time
export async function generateStaticParams() {
  const slugs = getAllGuideSlugs();
  
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
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {
      title: 'Guide Not Found',
    };
  }

  return {
    title: `${guide.title} | Elektroluma`,
    description: guide.metaDescription,
    keywords: guide.keywords,
    authors: [{ name: guide.author }],
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      type: 'article',
      publishedTime: guide.publishedDate,
      modifiedTime: guide.updatedDate,
      authors: [guide.author],
      tags: guide.keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.metaDescription,
    },
  };
}

// Render callout boxes
function Callout({ type, title, content }: { type: string; title: string; content: string }) {
  const styles = {
    info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: Info, iconColor: 'text-blue-600' },
    warning: { bg: 'bg-amber-50', border: 'border-amber-200', icon: AlertTriangle, iconColor: 'text-amber-600' },
    success: { bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle, iconColor: 'text-green-600' },
    danger: { bg: 'bg-red-50', border: 'border-red-200', icon: AlertCircle, iconColor: 'text-red-600' }
  };

  const style = styles[type as keyof typeof styles] || styles.info;
  const Icon = style.icon;

  return (
    <div className={`${style.bg} border-2 ${style.border} rounded-xl p-6 my-6`}>
      <div className="flex items-start gap-4">
        <Icon className={`w-6 h-6 ${style.iconColor} flex-shrink-0 mt-1`} />
        <div>
          <h4 className="font-bold text-slate-900 text-lg mb-2">{title}</h4>
          <p className="text-slate-700 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}

// Render section content
function renderSection(section: GuideSection) {
  return (
    <div key={section.id} className="mb-12 scroll-mt-20" id={section.id}>
      <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-primary-600">#</span>
        {section.heading}
      </h2>

      {/* Main content */}
      <div className="prose prose-lg max-w-none text-slate-700 mb-6 leading-relaxed">
        {section.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="mb-4">{paragraph}</p>
        ))}
      </div>

      {/* Callout */}
      {section.callout && (
        <Callout
          type={section.callout.type}
          title={section.callout.title}
          content={section.callout.content}
        />
      )}

      {/* Subsections */}
      {section.subsections && section.subsections.length > 0 && (
        <div className="space-y-8 mt-8">
          {section.subsections.map((subsection, idx) => (
            <div key={idx} className="pl-6 border-l-4 border-primary-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {subsection.heading}
              </h3>
              <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
                {subsection.content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="mb-3">{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      {section.table && (
        <div className="my-8 overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-primary-600 to-accent-500">
                {section.table.headers.map((header, idx) => (
                  <th key={idx} className="px-6 py-4 text-left text-white font-bold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="px-6 py-4 text-slate-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* List */}
      {section.list && (
        <div className="my-8">
          {section.list.type === 'ordered' && (
            <ol className="space-y-4">
              {section.list.items.map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 text-white font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700 pt-1 leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
          )}
          {section.list.type === 'unordered' && (
            <ul className="space-y-3">
              {section.list.items.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <ChevronRight className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}
          {section.list.type === 'checklist' && (
            <ul className="space-y-3">
              {section.list.items.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Code Example */}
      {section.codeExample && (
        <div className="my-8">
          <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-sm font-mono">
                {section.codeExample.language}
              </span>
              <button className="text-slate-400 hover:text-white text-sm flex items-center gap-2">
                <Download className="w-4 h-4" />
                Copy
              </button>
            </div>
            <pre className="text-slate-100 font-mono text-sm leading-relaxed">
              <code>{section.codeExample.code}</code>
            </pre>
          </div>
          {section.codeExample.description && (
            <p className="text-sm text-slate-600 mt-2">{section.codeExample.description}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default async function GuideArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  // Show 404 if guide not found
  if (!guide) {
    notFound();
  }

  // Get related guides
  const relatedGuides = getRelatedGuides(guide, 3);

  // Generate schemas
  const articleSchema = generateArticleSchema({
    headline: guide.title,
    description: guide.metaDescription,
    author: guide.author,
    datePublished: guide.publishedDate,
    dateModified: guide.updatedDate,
    keywords: guide.keywords,
    category: guide.category,
    url: `/uk-invoice-guides/${slug}`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'UK Invoice Guides', url: '/uk-invoice-guides' },
    { name: guide.title, url: `/uk-invoice-guides/${slug}` },
  ]);

  const faqSchema = generateFAQSchema(guide.faq);

  return (
    <>
      {/* Schema.org Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <PageHero
          title={guide.title}
          description={guide.excerpt}
        >
          {/* Guide Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-slate-600">
            {/* Category Badge */}
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
              <span className="text-2xl">{guide.categoryIcon}</span>
              <span className="font-medium text-slate-700">{guide.category}</span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-slate-500" />
              <span>{guide.author}</span>
            </div>

            {/* Published Date */}
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-500" />
              <time dateTime={guide.publishedDate}>
                {new Date(guide.publishedDate).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>

            {/* Read Time */}
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-500" />
              <span>{guide.readTime} min read</span>
            </div>

            {/* Search Volume */}
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-slate-500" />
              <span>{guide.searchVolume.toLocaleString()} searches/mo</span>
            </div>
          </div>
        </PageHero>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            {/* Back Button */}
            <Link
              href="/uk-invoice-guides"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to All Guides
            </Link>

            {/* Article Content */}
            <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
              {/* Table of Contents */}
              <div className="bg-slate-50 rounded-xl p-6 mb-12 border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary-600" />
                  Table of Contents
                </h2>
                <ul className="space-y-2">
                  {guide.content.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-primary-600 hover:text-primary-700 hover:underline transition-colors flex items-center gap-2"
                      >
                        <ChevronRight className="w-4 h-4" />
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Render Content Sections */}
              {guide.content.map(section => renderSection(section))}

              {/* FAQ Section */}
              {guide.faq && guide.faq.length > 0 && (
                <div className="mt-16 pt-16 border-t border-slate-200">
                  <h2 className="text-3xl font-bold text-slate-900 mb-8">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {guide.faq.map((faq, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-3">
                          {faq.question}
                        </h3>
                        <p className="text-slate-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex flex-wrap gap-2">
                  {guide.keywords.slice(0, 10).map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {guide.callToAction.title}
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                {guide.callToAction.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={guide.callToAction.primaryButton.href}
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all hover:scale-105 shadow-xl"
                >
                  {guide.callToAction.primaryButton.text}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                {guide.callToAction.secondaryButton && (
                  <Link
                    href={guide.callToAction.secondaryButton.href}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all"
                  >
                    {guide.callToAction.secondaryButton.text}
                  </Link>
                )}
              </div>
            </div>

            {/* Related Guides */}
            {relatedGuides.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-8">
                  Related Guides
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedGuides.map((relatedGuide) => (
                    <Link
                      key={relatedGuide.slug}
                      href={`/uk-invoice-guides/${relatedGuide.slug}`}
                      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-primary-300"
                    >
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">{relatedGuide.categoryIcon}</span>
                          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                            {relatedGuide.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {relatedGuide.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                          {relatedGuide.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {relatedGuide.readTime} min
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
          </div>
        </section>
      </div>
    </>
  );
}
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  getBlogArticleBySlug, 
  getAllArticleSlugs, 
  getRelatedArticles,
  BlogArticle 
} from '../../lib/blogData';
import { generateArticleSchema, generateBreadcrumbSchema } from '../../lib/schemaConfig';
import PageHero from '../../components/PageHero';
import { BlogCard } from '../../components/blog';
import { 
  Clock, 
  Calendar, 
  User,
  Tag,
  ArrowLeft 
} from 'lucide-react';

// Generate static params for all blog articles at build time
export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  
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
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | InvoiceParse.ai Blog`,
    description: article.metaDescription,
    keywords: article.keywords,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate,
      authors: [article.author],
      tags: article.keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.metaDescription,
    },
  };
}

export default async function BlogArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  // Show 404 if article not found
  if (!article) {
    notFound();
  }

  // Get related articles
  const relatedArticles = getRelatedArticles(article, 3);

  // Generate schemas
  const articleSchema = generateArticleSchema({
    headline: article.title,
    description: article.metaDescription,
    author: article.author,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate,
    keywords: article.keywords,
    category: article.category,
    url: `/blog/${slug}`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: article.title, url: `/blog/${slug}` },
  ]);

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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <PageHero
          title={article.title}
          description={article.excerpt}
        >
          {/* Article Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-slate-600">
            {/* Category Badge */}
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
              <span className="text-2xl">{article.categoryIcon}</span>
              <span className="font-medium text-slate-700">{article.category}</span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-slate-500" />
              <span>{article.author}</span>
            </div>

            {/* Published Date */}
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-500" />
              <time dateTime={article.publishedDate}>
                {new Date(article.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>

            {/* Reading Time */}
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-500" />
              <span>{article.readingTime} min read</span>
            </div>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mt-4">
            {article.keywords.slice(0, 5).map((keyword, index) => (
              <span 
                key={index}
                className="inline-flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full"
              >
                <Tag className="w-3 h-3" />
                {keyword}
              </span>
            ))}
          </div>
        </PageHero>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back to Blog Link */}
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Article Content */}
          <article className="prose prose-lg prose-slate max-w-none">
            <div 
              className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>

          {/* Article Footer with CTA */}
          <div className="mt-12 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl shadow-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to Automate Your Invoice Processing?
            </h3>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Try our advanced invoice parser and see how automation can transform your accounts payable workflow
            </p>
            <Link
              href="/parser"
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-all hover:scale-105 shadow-xl"
            >
              Try Invoice Parser Free
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-16" aria-labelledby="related-articles-heading">
              <h2 
                id="related-articles-heading"
                className="text-3xl font-bold text-slate-900 mb-8"
              >
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <BlogCard 
                    key={relatedArticle.slug} 
                    article={relatedArticle}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Bottom Navigation */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              View All Articles
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

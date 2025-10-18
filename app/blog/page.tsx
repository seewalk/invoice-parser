import { Metadata } from 'next';
import { getAllBlogArticles, getFeaturedArticles, getBlogCategories, getBlogStats } from '../lib/blogData';
import PageHero from '../components/PageHero';
import { BlogCard, FeaturedArticles, BlogSidebar } from '../components/blog';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  Users,
  Tag 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Invoice Parsing & Automation Blog | Expert Insights & Best Practices',
  description: 'Discover expert insights on invoice parsing, OCR technology, AP automation, and financial process optimization. Learn from real-world case studies and implementation guides.',
  keywords: [
    'invoice parsing blog',
    'OCR technology insights',
    'AP automation articles',
    'invoice processing tips',
    'financial automation guides',
    'accounts payable best practices',
    'invoice OCR tutorials',
    'document processing blog'
  ],
  openGraph: {
    title: 'Invoice Parsing & Automation Blog | Expert Insights',
    description: 'Expert insights on invoice parsing, OCR technology, and AP automation. Real-world case studies and implementation guides.',
    type: 'website',
    url: 'https://yourdomain.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invoice Parsing & Automation Blog | Expert Insights',
    description: 'Expert insights on invoice parsing, OCR technology, and AP automation.',
  },
};

export default function BlogPage() {
  // Fetch all data
  const allArticles = getAllBlogArticles();
  const featuredArticles = getFeaturedArticles(3);
  const categories = getBlogCategories();
  const stats = getBlogStats();

  // Separate featured from regular articles
  const featuredSlugs = new Set(featuredArticles.map(a => a.slug));
  const regularArticles = allArticles.filter(a => !featuredSlugs.has(a.slug));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section with Stats */}
      <PageHero
        title="Knowledge Base"
        description="Expert insights, guides, and best practices for invoice parsing, OCR technology, and accounts payable automation. Stay informed with the latest trends and solutions."
      >
        {/* Blog Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{stats.totalArticles}</div>
                <div className="text-sm text-slate-600">Articles</div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Tag className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{stats.totalCategories}</div>
                <div className="text-sm text-slate-600">Categories</div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{stats.averageReadingTime}</div>
                <div className="text-sm text-slate-600">Min Read</div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{stats.totalCategories}</div>
                <div className="text-sm text-slate-600">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </PageHero>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Articles Section */}
        <FeaturedArticles articles={featuredArticles} />

        {/* Main Grid: Sidebar + Articles */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar 
              categories={categories}
              currentCategory="all"
            />
          </div>

          {/* Regular Articles Grid */}
          <div className="lg:col-span-3">
            <section aria-labelledby="all-articles-heading">
              <h2 id="all-articles-heading" className="text-3xl font-bold text-slate-900 mb-8">
                All Articles
              </h2>
              
              {regularArticles.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {regularArticles.map((article) => (
                    <BlogCard 
                      key={article.slug} 
                      article={article}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                  <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600 text-lg">No articles found</p>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Bottom CTA */}
        <section className="mt-16 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-8 py-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Invoice Processing?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Try our advanced invoice parser and see how automation can save your team hours every week
            </p>
            <Link
              href="/parser"
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-all hover:scale-105 shadow-xl"
            >
              Try Invoice Parser
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

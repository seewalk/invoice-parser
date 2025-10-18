'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Tag } from 'lucide-react';
import { BlogCategory } from '@/app/lib/blogData';

interface BlogSidebarProps {
  categories: BlogCategory[];
  currentCategory?: string;
  popularTopics?: string[];
}

function BlogSidebarComponent({ 
  categories, 
  currentCategory = 'all',
  popularTopics = [
    'invoice automation',
    'OCR technology', 
    'AP optimization',
    '3-way matching',
    'ROI calculation',
    'e-invoicing'
  ]
}: BlogSidebarProps) {
  const totalArticles = categories.reduce((sum, cat) => sum + cat.articleCount, 0);
  
  return (
    <aside className="space-y-6" aria-label="Blog sidebar">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5 text-indigo-600" aria-hidden="true" />
          Browse by Category
        </h3>
        
        <nav aria-label="Blog categories">
          <ul className="space-y-2">
            <li>
              <Link 
                href="/blog"
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  currentCategory === 'all'
                    ? 'bg-indigo-100 text-indigo-700 font-semibold'
                    : 'hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 font-medium'
                }`}
                aria-current={currentCategory === 'all' ? 'page' : undefined}
              >
                All Articles ({totalArticles})
              </Link>
            </li>
            
            {categories.map(category => (
              <li key={category.slug}>
                <Link 
                  href={`/blog?category=${category.slug}`}
                  className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                    currentCategory === category.slug
                      ? 'bg-indigo-100 text-indigo-700 font-semibold'
                      : 'hover:bg-indigo-50 text-slate-700 hover:text-indigo-600'
                  }`}
                  aria-current={currentCategory === category.slug ? 'page' : undefined}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xl" aria-hidden="true">{category.icon}</span>
                    <span className="text-sm">{category.name}</span>
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {category.articleCount}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Popular Topics
        </h3>
        
        <div className="flex flex-wrap gap-2" role="list">
          {popularTopics.map(topic => (
            <span 
              key={topic}
              className="text-xs px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full hover:bg-indigo-100 transition-colors cursor-pointer"
              role="listitem"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl p-6 text-white shadow-lg">
        <h3 className="text-lg font-bold mb-2">
          Try Invoice Automation
        </h3>
        <p className="text-sm text-indigo-100 mb-4">
          Process invoices 10x faster with AI-powered automation
        </p>
        <Link
          href="/parser"
          className="block w-full bg-white text-indigo-600 text-center px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
        >
          Start Free Trial
        </Link>
      </div>
    </aside>
  );
}

export const BlogSidebar = memo(BlogSidebarComponent);
BlogSidebar.displayName = 'BlogSidebar';
export default BlogSidebar;
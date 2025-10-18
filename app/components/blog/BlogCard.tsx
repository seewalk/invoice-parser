'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Clock, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { BlogArticle } from '@/app/lib/blogData';

interface BlogCardProps {
  article: BlogArticle;
  featured?: boolean;
  priority?: boolean;
}

function BlogCardComponent({ article, featured = false, priority = false }: BlogCardProps) {
  const cardClasses = featured
    ? 'lg:col-span-2 bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200'
    : 'bg-white border border-slate-200';
  
  return (
    <Link 
      href={`/blog/${article.slug}`}
      className={`block group ${cardClasses} rounded-xl hover:shadow-xl transition-all duration-300 overflow-hidden h-full`}
      aria-label={`Read article: ${article.title}`}
    >
      <article className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl" aria-hidden="true">{article.categoryIcon}</span>
          <span className="text-sm font-medium text-indigo-600">
            {article.category}
          </span>
          {featured && (
            <span className="ml-auto bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
              FEATURED
            </span>
          )}
        </div>

        <h3 className={`font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors ${
          featured ? 'text-2xl sm:text-3xl' : 'text-xl'
        }`}>
          {article.title}
        </h3>

        <p className={`text-slate-600 mb-4 leading-relaxed flex-grow ${
          featured ? 'text-base' : 'text-sm'
        }`}>
          {article.excerpt}
        </p>

        <div className="flex items-center flex-wrap gap-3 text-sm text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>{article.readingTime} min read</span>
          </div>
          {article.searchVolume > 0 && (
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span>{article.searchVolume.toLocaleString()}/mo</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <time dateTime={article.publishedDate}>
              {new Date(article.publishedDate).toLocaleDateString('en-GB', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </time>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {article.keywords.slice(0, featured ? 4 : 3).map((keyword) => (
            <span 
              key={keyword}
              className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors"
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="flex items-center text-indigo-600 font-semibold group-hover:gap-3 transition-all duration-300 mt-auto">
          <span>Read Full Article</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true" />
        </div>
      </article>
    </Link>
  );
}

export const BlogCard = memo(BlogCardComponent);
BlogCard.displayName = 'BlogCard';
export default BlogCard;
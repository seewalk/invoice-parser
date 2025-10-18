'use client';

import { memo } from 'react';
import { BlogArticle } from '@/app/lib/blogData';
import BlogCard from './BlogCard';

interface FeaturedArticlesProps {
  articles: BlogArticle[];
}

function FeaturedArticlesComponent({ articles }: FeaturedArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="mb-16" aria-labelledby="featured-articles-heading">
      <h2 
        id="featured-articles-heading" 
        className="text-3xl font-bold text-slate-900 mb-8"
      >
        Featured Articles
      </h2>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <BlogCard 
            key={article.slug} 
            article={article} 
            featured 
            priority={index === 0}
          />
        ))}
      </div>
    </section>
  );
}

export const FeaturedArticles = memo(FeaturedArticlesComponent);
FeaturedArticles.displayName = 'FeaturedArticles';
export default FeaturedArticles;
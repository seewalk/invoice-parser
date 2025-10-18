/**
 * Blog Data Library - Transforms FAQ knowledge base into SEO-optimized blog articles
 */

import { comprehensiveFAQs, faqCategories, type FAQ, type FAQCategory } from './faqData';

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categoryIcon: string;
  keywords: string[];
  searchVolume: number;
  author: string;
  publishedDate: string;
  updatedDate: string;
  readingTime: number;
  metaDescription: string;
  featured: boolean;
}

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
  icon: string;
  articleCount: number;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function calculateReadingTime(text: string): number {
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / 200);
}

function generateBlogTitle(question: string): string {
  let title = question.replace(/^(What is|What are|How does|How do|How to|Can|What's|How)/i, '').trim();
  title = title.charAt(0).toUpperCase() + title.slice(1);
  
  if (question.toLowerCase().includes('what is')) {
    return `Understanding ${title}`;
  } else if (question.toLowerCase().includes('how does') || question.toLowerCase().includes('how do')) {
    return `How ${title}`;
  } else if (question.toLowerCase().includes('how to')) {
    return title;
  } else {
    return title;
  }
}

function generateExcerpt(answer: string): string {
  const excerpt = answer.slice(0, 160);
  const lastSpace = excerpt.lastIndexOf(' ');
  return excerpt.slice(0, lastSpace) + '...';
}

function generateMetaDescription(answer: string, keywords: string[]): string {
  const firstSentence = answer.split(/[.!?]/)[0];
  const primaryKeyword = keywords[0];
  
  if (firstSentence.length <= 155 && firstSentence.toLowerCase().includes(primaryKeyword.toLowerCase())) {
    return firstSentence + '.';
  }
  
  const desc = answer.slice(0, 155);
  const lastSpace = desc.lastIndexOf(' ');
  return desc.slice(0, lastSpace) + '...';
}

function enhanceContent(answer: string, question: string, keywords: string[]): string {
  let enhanced = `# ${question}\n\n${answer}\n\n`;
  
  if (answer.length > 500) {
    enhanced += `## Key Takeaways\n\n`;
    const sentences = answer.split(/(?<=[.!?])\s+/);
    const keyPoints = sentences.slice(0, 3).map(s => `- ${s}`).join('\n');
    enhanced += `${keyPoints}\n\n`;
  }
  
  enhanced += `## Related Topics\n\n`;
  enhanced += keywords.slice(0, 4).map(k => `- ${k}`).join('\n');
  
  return enhanced;
}

function faqToBlogArticle(faq: FAQ, featured: boolean = false): BlogArticle {
  const title = generateBlogTitle(faq.question);
  const slug = slugify(faq.question);
  const excerpt = generateExcerpt(faq.answer);
  const content = enhanceContent(faq.answer, faq.question, faq.keywords);
  const metaDescription = generateMetaDescription(faq.answer, faq.keywords);
  const readingTime = calculateReadingTime(faq.answer);
  
  const categoryData = faqCategories.find(cat => cat.name === faq.category);
  const categoryIcon = categoryData?.icon || '📄';
  
  const baseDate = new Date('2024-01-15');
  const publishedDate = new Date(baseDate.getTime() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const updatedDate = new Date(publishedDate).toISOString().split('T')[0];
  
  return {
    slug,
    title,
    excerpt,
    content,
    category: faq.category,
    categoryIcon,
    keywords: faq.keywords,
    searchVolume: faq.searchVolume || 0,
    author: 'InvoiceParse Team',
    publishedDate,
    updatedDate,
    readingTime,
    metaDescription,
    featured,
  };
}

export function getAllBlogArticles(): BlogArticle[] {
  const articles = comprehensiveFAQs.map((faq, index) => 
    faqToBlogArticle(faq, !!(faq.searchVolume && faq.searchVolume > 1000))
  );
  
  return articles.sort((a, b) => b.searchVolume - a.searchVolume);
}

export function getBlogArticleBySlug(slug: string): BlogArticle | null {
  const articles = getAllBlogArticles();
  return articles.find(article => article.slug === slug) || null;
}

export function getBlogArticlesByCategory(category: string): BlogArticle[] {
  const articles = getAllBlogArticles();
  return articles.filter(article => article.category === category);
}

export function getFeaturedArticles(limit: number = 6): BlogArticle[] {
  const articles = getAllBlogArticles();
  return articles.filter(article => article.featured).slice(0, limit);
}

export function getRecentArticles(limit: number = 10): BlogArticle[] {
  const articles = getAllBlogArticles();
  return articles.slice(0, limit);
}

export function getRelatedArticles(article: BlogArticle, limit: number = 3): BlogArticle[] {
  const articles = getAllBlogArticles();
  
  const related = articles
    .filter(a => a.slug !== article.slug)
    .map(a => ({
      article: a,
      relevance: a.keywords.filter(k => article.keywords.includes(k)).length,
    }))
    .filter(r => r.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)
    .map(r => r.article);
  
  if (related.length < limit) {
    const sameCategory = articles
      .filter(a => a.slug !== article.slug && a.category === article.category && !related.includes(a))
      .slice(0, limit - related.length);
    related.push(...sameCategory);
  }
  
  return related;
}

export function getBlogCategories(): BlogCategory[] {
  const articles = getAllBlogArticles();
  
  return faqCategories.map(cat => {
    const articleCount = articles.filter(a => a.category === cat.name).length;
    return {
      slug: slugify(cat.name),
      name: cat.name,
      description: cat.description,
      icon: cat.icon || '📄',
      articleCount,
    };
  });
}

export function getBlogCategoryBySlug(slug: string): BlogCategory | null {
  const categories = getBlogCategories();
  return categories.find(cat => cat.slug === slug) || null;
}

export function searchBlogArticles(query: string): BlogArticle[] {
  const articles = getAllBlogArticles();
  const lowerQuery = query.toLowerCase();
  
  return articles.filter(article => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.excerpt.toLowerCase().includes(lowerQuery) ||
    article.content.toLowerCase().includes(lowerQuery) ||
    article.keywords.some(k => k.toLowerCase().includes(lowerQuery))
  );
}

export function getBlogStats() {
  const articles = getAllBlogArticles();
  const categories = getBlogCategories();
  
  return {
    totalArticles: articles.length,
    totalCategories: categories.length,
    featuredArticles: articles.filter(a => a.featured).length,
    totalSearchVolume: articles.reduce((sum, a) => sum + a.searchVolume, 0),
    avgReadingTime: Math.round(articles.reduce((sum, a) => sum + a.readingTime, 0) / articles.length),
    totalAuthors: 1, // Currently single author
  };
}

export function getAllArticleSlugs(): string[] {
  const articles = getAllBlogArticles();
  return articles.map(article => article.slug);
}

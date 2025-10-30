'use client';

import { useState, useCallback, useMemo } from 'react';
import Script from 'next/script';
import comprehensiveFAQs, {
  faqCategories,
  getFAQsByCategory,
  searchFAQs,
  getCategoriesWithCounts,
} from '../lib/faqData';
import PageHero from '../components/PageHero';
import {
  FAQSearchBar,
  FAQCategoryFilter,
  FAQAccordion
} from '../components/faq';
import {
  generateFAQSchema,
  generateBreadcrumbSchema
} from '../lib/schemaConfig';
import { Stat } from '../components/ui/Stat';
import { CTASection } from '../components/CTASectionBlack';

/**
 * FAQ Page
 * 
 * Complete knowledge base for invoice processing questions.
 * 
 * Architecture:
 * - Client component for interactive search/filter
 * - Memoized child components for performance
 * - Debounced search (300ms) reduces operations
 * - Efficient re-render prevention
 * 
 * Optimizations:
 * - useMemo for filtered FAQs computation
 * - useCallback for stable function references
 * - Extracted memoized components
 * - Debounced search input
 */
export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Get filtered FAQs based on category and search (memoized)
  const filteredFAQs = useMemo(() => {
    let faqs = selectedCategory === 'All'
      ? comprehensiveFAQs
      : getFAQsByCategory(selectedCategory);

    if (searchQuery.trim()) {
      faqs = searchFAQs(searchQuery);
      // Further filter by category if not "All"
      if (selectedCategory !== 'All') {
        faqs = faqs.filter((faq) => faq.category === selectedCategory);
      }
    }

    return faqs;
  }, [selectedCategory, searchQuery]);

  // Get category counts (memoized)
  const categoriesWithCounts = useMemo(() => getCategoriesWithCounts(), []);

  // Stable callback for search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Stable callback for category change
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  // Stable callback for reset filters
  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('All');
  }, []);

  // Generate FAQ page schemas (server-side)
  const faqSchema = generateFAQSchema(
    comprehensiveFAQs.map(faq => ({
      question: faq.question,
      answer: faq.answer
    }))
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'FAQ', url: '/faq' }
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Server-Rendered FAQ Page Schemas */}
      <Script
        id="faq-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
        strategy="beforeInteractive"
      />
      <Script
        id="faq-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
        strategy="beforeInteractive"
      />

      {/* Hero Section */}
      <PageHero
        badge="Complete Invoice Processing Knowledge Base"
        title={
          <>
            Invoice Processing
            <br />
            <span className="gradient-text"> Knowledge Center</span>
          </>
        }
        description="Everything you need to know about invoice automation, processing, formats, integration, security, and ROI. Your complete guide to modern accounts payable."
        size="default"
      >
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <Stat
            value={comprehensiveFAQs.length}
            label="Expert Answers"
            variant="primary"
            size="lg"
            layout="card"
            animate={true}
            animationDelay={0}
            className="shadow-lg"
          />
          <Stat
            value={faqCategories.length}
            label="Categories"
            variant="primary"
            size="lg"
            layout="card"
            animate={true}
            animationDelay={0.1}
            className="shadow-lg"
          />
          <Stat
            value="200+"
            label="Keywords Covered"
            variant="primary"
            size="lg"
            layout="card"
            animate={true}
            animationDelay={0.2}
            className="shadow-lg"
          />
        </div>

        {/* Search Bar - Extracted Component with Debouncing */}
        <FAQSearchBar onSearch={handleSearch} />
      </PageHero>

      {/* Category Filter - Extracted Component */}
      <FAQCategoryFilter
        categories={faqCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categoryCounts={categoriesWithCounts}
        totalCount={comprehensiveFAQs.length}
        filteredCount={filteredFAQs.length}
      />

      {/* FAQ Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        {/* FAQ Accordion - Extracted Component */}
        <FAQAccordion
          faqs={filteredFAQs}
          selectedCategory={selectedCategory}
          onResetFilters={handleResetFilters}
        />

        {/* Bottom CTA */}
        <CTASection
          title="Why Choose Elektroluma?"
          description="AI-powered automation + UK compliance + affordable pricing. The perfect alternative for UK small businesses."
          buttonText="Try Invoice Parser"
          buttonHref="/parser"
          variant="gradient"
          buttonVariant="accent"
          className="mt-16"
        />
      </section>
    </main>
  );
}
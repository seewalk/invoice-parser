'use client';

import { useState, useCallback, useMemo } from 'react';
import comprehensiveFAQs, {
    faqCategories,
    getFAQsByCategory,
    searchFAQs,
    getCategoriesWithCounts,
} from '../lib/faqData';
import FinalCTASection from '../components/FinalCTASection';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import { 
  FAQSearchBar, 
  FAQCategoryFilter, 
  FAQAccordion 
} from '../components/faq';

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

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
         
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
                    <div className="bg-white rounded-xl px-6 py-3 shadow-lg">
                        <div className="text-3xl font-bold text-primary-600 mb-1">
                          {comprehensiveFAQs.length}
                        </div>
                        <div className="text-sm text-gray-600">Expert Answers</div>
                    </div>
                    <div className="bg-white rounded-xl px-6 py-3 shadow-lg">
                        <div className="text-3xl font-bold text-primary-600 mb-1">
                          {faqCategories.length}
                        </div>
                        <div className="text-sm text-gray-600">Categories</div>
                    </div>
                    <div className="bg-white rounded-xl px-6 py-3 shadow-lg">
                        <div className="text-3xl font-bold text-primary-600 mb-1">200+</div>
                        <div className="text-sm text-gray-600">Keywords Covered</div>
                    </div>
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
            </section>

            <FinalCTASection variant="faq" />

            <Footer />
        </main>
    );
}

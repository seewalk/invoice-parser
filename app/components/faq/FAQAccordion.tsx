'use client';

import { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { FAQ, FAQCategory, faqCategories } from '@/app/lib/faqData';
import { FAQItem } from './FAQItem';

interface FAQAccordionProps {
  /**
   * Array of FAQs to display
   */
  faqs: FAQ[];
  /**
   * Selected category name (for header display)
   */
  selectedCategory?: string;
  /**
   * Callback to reset filters
   */
  onResetFilters?: () => void;
}

/**
 * FAQAccordion Component
 * 
 * Displays a list of FAQ items with accordion functionality.
 * Manages which item is currently open.
 * 
 * Features:
 * - Single item open at a time (accordion behavior)
 * - Category header for non-"All" selections
 * - Empty state with reset button
 * - Smooth animations
 * 
 * Optimizations:
 * - Memoized to prevent re-renders
 * - useCallback for stable toggle handler
 * - Renders memoized FAQItem components
 */
function FAQAccordionComponent({ 
  faqs, 
  selectedCategory,
  onResetFilters 
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(current => current === index ? null : index);
  }, []);

  // Find category info for header
  const categoryInfo = selectedCategory && selectedCategory !== 'All'
    ? faqCategories.find((c) => c.name === selectedCategory)
    : null;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Category Info Header */}
      {categoryInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 border border-primary-200"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {categoryInfo.icon} {categoryInfo.name}
          </h2>
          <p className="text-lg text-gray-700">
            {categoryInfo.description}
          </p>
        </motion.div>
      )}

      {/* FAQs List */}
      {faqs.length > 0 ? (
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={`${faq.question}-${index}`}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      ) : (
        // Empty State
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No results found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or browse all categories
          </p>
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              className="bg-primary-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}

/**
 * Memoized export to prevent unnecessary re-renders
 * Will only re-render if faqs, selectedCategory, or onResetFilters change
 */
export const FAQAccordion = memo(FAQAccordionComponent);

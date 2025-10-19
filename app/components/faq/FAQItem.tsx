'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, TrendingUp } from 'lucide-react';
import { FAQ } from '@/app/lib/faqData';

interface FAQItemProps {
  /**
   * FAQ data
   */
  faq: FAQ;
  /**
   * Index for animation delay
   */
  index: number;
  /**
   * Whether this item is open
   */
  isOpen: boolean;
  /**
   * Callback when item is clicked
   */
  onToggle: () => void;
}

/**
 * FAQItem Component
 * 
 * Individual FAQ accordion item with smooth animations.
 * 
 * Features:
 * - Smooth expand/collapse animation
 * - Category badge
 * - Keywords display
 * - Search volume indicator for high-demand topics
 * - Responsive layout
 * 
 * Optimizations:
 * - Memoized to prevent unnecessary re-renders
 * - Only re-renders when isOpen changes
 * - Efficient animation with Framer Motion
 */
function FAQItemComponent({ faq, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Question Button */}
      <button
        onClick={onToggle}
        className="w-full text-left p-6 flex justify-between items-start hover:bg-gray-50 transition-colors"
      >
        <div className="flex-1 pr-4">
          <h3 className="font-semibold text-gray-900 text-lg mb-2">
            {faq.question}
          </h3>
          {/* Category badge */}
          <span className="inline-block text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            {faq.category}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-primary-600 flex-shrink-0 transition-transform mt-1 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Answer (Expanded) */}
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-6 pb-6 border-t border-gray-100"
        >
          <div className="pt-6">
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              {faq.answer}
            </p>

            {/* Keywords */}
            {faq.keywords && faq.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Related Topics:
                </span>
                {faq.keywords.map((keyword, i) => (
                  <span
                    key={i}
                    className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}

            {/* Search volume indicator */}
            {faq.searchVolume && faq.searchVolume > 100 && (
              <div className="mt-4 flex items-center text-xs text-gray-500">
                <TrendingUp className="w-3 h-3 mr-1" />
                High-demand topic ({faq.searchVolume}+ monthly searches)
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/**
 * Memoized export to prevent unnecessary re-renders
 * Will only re-render if faq, index, isOpen, or onToggle changes
 */
export const FAQItem = memo(FAQItemComponent);

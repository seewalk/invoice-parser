'use client';

import { memo } from 'react';
import { Filter } from 'lucide-react';
import { FAQCategory } from '@/app/lib/faqData';

interface FAQCategoryFilterProps {
  /**
   * Array of categories to display
   */
  categories: FAQCategory[];
  /**
   * Currently selected category
   */
  selectedCategory: string;
  /**
   * Callback when category changes
   */
  onCategoryChange: (category: string) => void;
  /**
   * Category counts { category: count }
   */
  categoryCounts: { category: string; count: number }[];
  /**
   * Total FAQs count (for "All" category)
   */
  totalCount: number;
  /**
   * Number of filtered results
   */
  filteredCount: number;
}

/**
 * FAQCategoryFilter Component
 * 
 * Displays category filter pills with counts.
 * 
 * Features:
 * - All categories with counts
 * - Active category highlight
 * - Responsive flex wrap layout
 * - Shows filtered results count
 * 
 * Optimizations:
 * - Memoized to prevent re-renders
 * - Efficient pill rendering
 * - Smooth transitions
 */
function FAQCategoryFilterComponent({
  categories,
  selectedCategory,
  onCategoryChange,
  categoryCounts,
  totalCount,
  filteredCount
}: FAQCategoryFilterProps) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Filter className="w-6 h-6 mr-2 text-primary-600" />
            Browse by Category
          </h2>
          <div className="text-sm text-gray-600">
            {filteredCount} {filteredCount === 1 ? 'result' : 'results'}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3">
          {/* All Topics Button */}
          <button
            onClick={() => onCategoryChange('All')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              selectedCategory === 'All'
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Topics ({totalCount})
          </button>

          {/* Category Buttons */}
          {categories.map((category) => {
            const count = categoryCounts.find((c) => c.category === category.name)?.count || 0;
            return (
              <button
                key={category.name}
                onClick={() => onCategoryChange(category.name)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category.name
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon} {category.name} ({count})
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Memoized export to prevent unnecessary re-renders
 * Will only re-render if props change
 */
export const FAQCategoryFilter = memo(FAQCategoryFilterComponent);
'use client';

import { memo } from 'react';
import { Filter } from 'lucide-react';
import { FAQCategory } from '@/app/lib/faqData';
import { Button } from '../ui/Button';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { IconBox } from '../ui/IconBox';

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
          <div className="flex items-center gap-3">
            <IconBox 
              icon={<Filter />} 
              variant="primary" 
              styleVariant="solid"
              size="sm"
              rounded="lg"
            />
            <Heading 
              as="h2" 
              size="xl" 
              variant="default"
              animate={false}
            >
              Browse by Category
            </Heading>
          </div>
          <Text 
            as="span" 
            size="sm" 
            variant="muted"
          >
            {filteredCount} {filteredCount === 1 ? 'result' : 'results'}
          </Text>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3">
          {/* All Topics Button */}
          <Button
            onClick={() => onCategoryChange('All')}
            variant={selectedCategory === 'All' ? 'primary' : 'ghost'}
            size="md"
            rounded={true}
            animate={false}
            className={selectedCategory === 'All' ? '' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
          >
            All Topics ({totalCount})
          </Button>

          {/* Category Buttons */}
          {categories.map((category) => {
            const count = categoryCounts.find((c) => c.category === category.name)?.count || 0;
            const isSelected = selectedCategory === category.name;
            
            return (
              <Button
                key={category.name}
                onClick={() => onCategoryChange(category.name)}
                variant={isSelected ? 'primary' : 'ghost'}
                size="md"
                rounded={true}
                icon={category.icon}
                iconPosition="left"
                animate={false}
                className={isSelected ? '' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
              >
                {category.name} ({count})
              </Button>
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
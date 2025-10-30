'use client';

import { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { FAQ, FAQCategory, faqCategories } from '@/app/lib/faqData';
import { FAQItem } from './FAQItem';
import { Button } from '../ui/Button';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { IconBox } from '../ui/IconBox';
import { Card } from '../ui/Card';

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
        <Card 
          variant="default" 
          padding="lg"
          className="mb-12 bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <IconBox
                icon={categoryInfo.icon}
                variant="primary"
                styleVariant="solid"
                size="md"
                rounded="lg"
                animate={false}
              />
              <Heading 
                as="h2" 
                size="display-sm" 
                variant="default"
                animate={false}
              >
                {categoryInfo.name}
              </Heading>
            </div>
            <Text 
              size="lg" 
              variant="secondary"
              animate={false}
            >
              {categoryInfo.description}
            </Text>
          </motion.div>
        </Card>
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
          <div className="flex justify-center mb-6">
            <IconBox
              icon={<Search />}
              variant="default"
              styleVariant="solid"
              size="2xl"
              rounded="full"
              animate={false}
            />
          </div>
          <Heading 
            as="h3" 
            size="xl" 
            variant="default" 
            align="center"
            className="mb-3"
            animate={false}
          >
            No results found
          </Heading>
          <Text 
            size="base" 
            variant="muted" 
            align="center"
            className="mb-6"
            animate={false}
          >
            Try adjusting your search or browse all categories
          </Text>
          {onResetFilters && (
            <Button
              onClick={onResetFilters}
              variant="primary"
              size="lg"
              rounded={true}
              animate={false}
            >
              Reset Filters
            </Button>
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
'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, TrendingUp, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { FAQ } from '@/app/lib/faqData';
import { Button } from '../ui/Button';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

/**
 * Generate blog post slug from FAQ question
 * This matches the slugify function in blogData.ts
 */
function generateBlogSlug(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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
 * Individual FAQ accordion item with smooth animations and blog interlinking.
 * 
 * Features:
 * - Smooth expand/collapse animation
 * - Category badge
 * - Clickable keywords that link to blog posts
 * - "Read Full Article" button for deep-dive content
 * - Search volume indicator for high-demand topics
 * - Responsive layout
 * 
 * SEO Benefits:
 * - Internal linking between FAQ and blog pages
 * - Improved crawlability and page authority
 * - Enhanced user engagement with related content
 * 
 * Optimizations:
 * - Memoized to prevent unnecessary re-renders
 * - Only re-renders when isOpen changes
 * - Efficient animation with Framer Motion
 */
function FAQItemComponent({ faq, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <Card
      variant="default"
      padding="none"
      elevation="sm"
      className="overflow-hidden hover:shadow-md transition-shadow"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03 }}
      >
        {/* Question Button */}
        <button
          onClick={onToggle}
          className="w-full text-left p-6 flex justify-between items-start hover:bg-gray-50 transition-colors"
        >
          <div className="flex-1 pr-4">
            <Heading
              as="h3"
              size="md"
              variant="default"
              weight="semibold"
              className="mb-2"
              animate={false}
            >
              {faq.question}
            </Heading>
            {/* Category badge */}
            <Badge
              variant="primary"
              size="sm"
              shape="pill"
            >
              {faq.category}
            </Badge>
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
            <Text
              size="lg"
              variant="secondary"
              leading="relaxed"
              className="mb-4"
            >
              {faq.answer}
            </Text>

            {/* Keywords - Clickable links to blog posts */}
            {faq.keywords && faq.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                <Text
                  as="span"
                  size="xs"
                  weight="semibold"
                  variant="muted"
                  className="uppercase tracking-wide"
                >
                  Related Topics:
                </Text>
                {faq.keywords.map((keyword, i) => {
                  const blogSlug = generateBlogSlug(faq.question);
                  return (
                    <Link
                      key={i}
                      href={`/blog/${blogSlug}`}
                      title={`Read full article about ${keyword}`}
                    >
                      <Badge
                        variant="default"
                        size="sm"
                        shape="pill"
                        className="group hover:bg-primary-100 hover:text-primary-700 cursor-pointer transition-colors"
                      >
                        {keyword}
                        <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity inline" />
                      </Badge>
                    </Link>
                  );
                })}
              </div>
            )}

           

            {/* Read Full Article Button */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <Link href={`/blog/${generateBlogSlug(faq.question)}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<ExternalLink className="w-4 h-4" />}
                  iconPosition="right"
                  animate={false}
                  className="text-primary-600 hover:text-primary-700 p-0"
                >
                  Read Full Article
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
      </motion.div>
    </Card>
  );
}

/**
 * Memoized export to prevent unnecessary re-renders
 * Will only re-render if faq, index, isOpen, or onToggle changes
 */
export const FAQItem = memo(FAQItemComponent);

'use client';

import { memo } from 'react';
import { TemplateCardSkeleton } from './TemplateCardSkeleton';

interface IndustrySectionSkeletonProps {
  /**
   * Number of template card skeletons to show
   * Default: 3 (matches typical grid)
   */
  cardCount?: number;
}

/**
 * IndustrySectionSkeleton Component
 * 
 * Loading placeholder for IndustrySection.
 * Shows skeleton header + grid of template card skeletons.
 * 
 * Optimizations:
 * - Memoized for performance
 * - Matches real section layout exactly
 * - Prevents layout shift during loading
 */
function IndustrySectionSkeletonComponent({ cardCount = 3 }: IndustrySectionSkeletonProps) {
  return (
    <section className="mb-20">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-slate-200 rounded-lg animate-pulse" />
        <div className="flex-1">
          <div className="h-9 bg-slate-200 rounded w-1/3 mb-2 animate-pulse" />
          <div className="h-6 bg-slate-200 rounded w-2/3 mb-3 animate-pulse" />
          <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
        </div>
      </div>

      {/* Template Grid Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: cardCount }).map((_, idx) => (
          <TemplateCardSkeleton key={idx} />
        ))}
      </div>
    </section>
  );
}

/**
 * Memoized export
 */
export const IndustrySectionSkeleton = memo(IndustrySectionSkeletonComponent);

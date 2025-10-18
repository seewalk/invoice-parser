'use client';

import { memo } from 'react';

/**
 * TemplateCardSkeleton Component
 * 
 * Loading placeholder that matches TemplateCard layout.
 * Prevents layout shift while components load.
 * 
 * Optimizations:
 * - Memoized (static content, never changes)
 * - Matches exact dimensions of real card
 * - Smooth animation
 */
function TemplateCardSkeletonComponent() {
  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6 h-full">
      {/* Header Skeleton */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="h-7 bg-slate-200 rounded w-3/4 mb-2 animate-pulse" />
          <div className="h-4 bg-slate-200 rounded w-full mb-1 animate-pulse" />
          <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse" />
        </div>
        <div className="w-8 h-8 bg-slate-200 rounded flex-shrink-0 ml-4 animate-pulse" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-50 rounded-lg p-3">
          <div className="h-3 bg-slate-200 rounded w-3/4 mb-2 animate-pulse" />
          <div className="h-6 bg-slate-200 rounded w-1/2 animate-pulse" />
        </div>
        <div className="bg-slate-50 rounded-lg p-3">
          <div className="h-3 bg-slate-200 rounded w-3/4 mb-2 animate-pulse" />
          <div className="h-6 bg-slate-200 rounded w-1/2 animate-pulse" />
        </div>
      </div>

      {/* Keywords Skeleton */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-6 w-20 bg-slate-200 rounded animate-pulse" />
        <div className="h-6 w-24 bg-slate-200 rounded animate-pulse" />
        <div className="h-6 w-16 bg-slate-200 rounded animate-pulse" />
      </div>

      {/* CTA Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-5 bg-slate-200 rounded w-28 animate-pulse" />
        <div className="w-5 h-5 bg-slate-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

/**
 * Memoized export
 * Since this is static content, it will never re-render
 */
export const TemplateCardSkeleton = memo(TemplateCardSkeletonComponent);

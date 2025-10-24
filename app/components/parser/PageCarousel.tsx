'use client';

import { memo, useRef } from 'react';
import { PageState } from '@/app/types/invoice';
import { PageCard } from './PageCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PageCarouselProps {
  pages: PageState[];
  currentPageIndex: number;
  onPageSelect: (index: number) => void;
  onParsePage: (index: number) => void;
  disabled?: boolean;
}

/**
 * PageCarousel Component
 * 
 * Displays horizontal scrollable carousel of page thumbnails
 * 
 * Features:
 * - Responsive grid (2 cols mobile, 3 tablet, 5 desktop)
 * - Status indicators per page
 * - Active page highlight
 * - Parse action per page
 * - Horizontal scroll with arrow navigation
 * 
 * Performance:
 * - Lazy-loaded thumbnails
 * - Memoized to prevent re-renders
 */
export const PageCarousel = memo(function PageCarousel({
  pages,
  currentPageIndex,
  onPageSelect,
  onParsePage,
  disabled = false
}: PageCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 300;
    const newScrollLeft = scrollContainerRef.current.scrollLeft + (
      direction === 'left' ? -scrollAmount : scrollAmount
    );

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const parsedCount = pages.filter(p => p.status === 'complete').length;
  const parsingCount = pages.filter(p => p.status === 'parsing' || p.status === 'uploading').length;
  const errorCount = pages.filter(p => p.status === 'error').length;

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            📄 {pages.length} {pages.length === 1 ? 'Page' : 'Pages'} Detected
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {parsedCount > 0 && (
              <span className="text-green-600 font-medium">{parsedCount} parsed</span>
            )}
            {parsingCount > 0 && (
              <span className="text-amber-600 font-medium ml-2">{parsingCount} processing</span>
            )}
            {errorCount > 0 && (
              <span className="text-red-600 font-medium ml-2">{errorCount} failed</span>
            )}
            {parsedCount === 0 && parsingCount === 0 && errorCount === 0 && (
              <span className="text-gray-500">Click "Parse Page" to start</span>
            )}
          </p>
        </div>

        {/* Scroll Controls */}
        {pages.length > 3 && (
          <div className="flex gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}
      </div>

      {/* Page Grid */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        <div className="grid grid-flow-col auto-cols-[minmax(150px,1fr)] gap-4 pb-2"
             style={{
               gridTemplateColumns: `repeat(${Math.min(pages.length, 5)}, minmax(150px, 1fr))`
             }}>
          {pages.map((page, index) => (
            <PageCard
              key={`page-${page.pageNumber}`}
              page={page}
              isActive={index === currentPageIndex}
              onSelect={() => onPageSelect(index)}
              onParse={() => onParsePage(index)}
              disabled={disabled}
            />
          ))}
        </div>
      </div>

      {/* Help Text */}
      {parsedCount === 0 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Parse page 1 first to see the invoice header. 
            Our AI will suggest if you need to parse additional pages.
          </p>
        </div>
      )}
    </div>
  );
});
'use client';

import { memo } from 'react';
import { PageState } from '@/app/types/invoice';
import { Sparkles, Loader } from 'lucide-react';

interface CombineResultsButtonProps {
  pages: PageState[];
  onCombine: () => void;
  isCombining: boolean;
  disabled?: boolean;
}

/**
 * CombineResultsButton Component
 * 
 * Action button to aggregate multi-page results
 * 
 * Features:
 * - Shows count of parsed pages
 * - Disabled until at least 1 page parsed
 * - Loading state during combination
 * - Prominent call-to-action design
 */
export const CombineResultsButton = memo(function CombineResultsButton({
  pages,
  onCombine,
  isCombining,
  disabled = false
}: CombineResultsButtonProps) {
  const parsedPages = pages.filter(p => p.status === 'complete');
  const parsedCount = parsedPages.length;
  const totalPages = pages.length;

  const isDisabled = disabled || parsedCount === 0 || isCombining;

  // Calculate total line items
  const totalLineItems = parsedPages.reduce((sum, page) => {
    return sum + (page.result?.lineItems.length || 0);
  }, 0);

  // If only one page is parsed, no need to combine
  if (parsedCount === 1) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200 shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            <h3 className="text-lg font-bold text-gray-900">
              Combine Parsed Pages
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-1">
            Merge data from <span className="font-semibold text-indigo-700">{parsedCount}</span> {parsedCount === 1 ? 'page' : 'pages'} into final invoice
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>📄 Pages: {parsedPages.map(p => p.pageNumber).join(', ')}</span>
            <span>📋 {totalLineItems} total line items</span>
          </div>
        </div>

        <button
          onClick={onCombine}
          disabled={isDisabled}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition-all ${
            isDisabled
              ? 'bg-gray-400 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
          }`}
          aria-label={`Combine ${parsedCount} parsed pages`}
        >
          {isCombining ? (
            <span className="flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              Combining...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Combine {parsedCount} Pages →
            </span>
          )}
        </button>
      </div>

      {/* Help Text */}
      {parsedCount === 0 && (
        <p className="text-xs text-gray-500 mt-4">
          Parse at least one page to enable combining
        </p>
      )}
    </div>
  );
});
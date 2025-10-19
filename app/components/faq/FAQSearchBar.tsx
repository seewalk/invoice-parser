'use client';

import { memo, useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';

interface FAQSearchBarProps {
  /**
   * Callback when search query changes (debounced)
   */
  onSearch: (query: string) => void;
  /**
   * Debounce delay in milliseconds
   * Default: 300ms
   */
  debounceMs?: number;
  /**
   * Placeholder text
   */
  placeholder?: string;
}

/**
 * FAQSearchBar Component
 * 
 * Search input with debouncing to prevent excessive filtering.
 * 
 * Features:
 * - Debounced search (default 300ms)
 * - Accessible with aria-label
 * - Clean, modern design
 * - Responsive layout
 * 
 * Optimizations:
 * - Memoized to prevent unnecessary re-renders
 * - useCallback for stable onSearch reference
 * - Debouncing reduces expensive search operations
 */
function FAQSearchBarComponent({ 
  onSearch, 
  debounceMs = 300,
  placeholder = 'Search invoice processing questions...'
}: FAQSearchBarProps) {
  const [localQuery, setLocalQuery] = useState('');

  // Debounce the search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(localQuery);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localQuery, debounceMs, onSearch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={localQuery}
          onChange={handleChange}
          className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-lg transition-colors"
          aria-label="Search FAQs"
        />
      </div>
    </div>
  );
}

/**
 * Memoized export to prevent unnecessary re-renders
 * Will only re-render if onSearch, debounceMs, or placeholder props change
 */
export const FAQSearchBar = memo(FAQSearchBarComponent);
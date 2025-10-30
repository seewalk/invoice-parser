/**
 * ============================================================================
 * UTILITY FUNCTIONS
 * ============================================================================
 * 
 * Shared utility functions used across the application.
 */

/**
 * Merge class names properly
 * Combines multiple class names and handles conditional classes
 * 
 * @param classes - Array of class names (can include undefined/null/false)
 * @returns Merged class name string
 * 
 * @example
 * cn('base-class', isActive && 'active-class', 'another-class')
 * // Returns: 'base-class active-class another-class' (if isActive is true)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format currency value
 * 
 * @param amount - Numeric amount
 * @param currency - Currency code (default: 'GBP')
 * @returns Formatted currency string
 * 
 * @example
 * formatCurrency(29.99) // Returns: '£29.99'
 */
export function formatCurrency(amount: number, currency: 'GBP' | 'USD' | 'EUR' = 'GBP'): string {
  const symbols = {
    GBP: '£',
    USD: '$',
    EUR: '€',
  };
  
  return `${symbols[currency]}${amount.toFixed(2)}`;
}

/**
 * Delay function for async operations
 * 
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after delay
 * 
 * @example
 * await delay(1000); // Wait 1 second
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Truncate text with ellipsis
 * 
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis
 * 
 * @example
 * truncate('Long text here', 10) // Returns: 'Long te...'
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Capitalize first letter
 * 
 * @param text - Text to capitalize
 * @returns Text with first letter capitalized
 * 
 * @example
 * capitalize('hello') // Returns: 'Hello'
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Format date to readable string
 * 
 * @param date - Date object or ISO string
 * @param format - Format type
 * @returns Formatted date string
 * 
 * @example
 * formatDate(new Date(), 'short') // Returns: '01/15/2024'
 */
export function formatDate(
  date: Date | string,
  format: 'short' | 'long' | 'relative' = 'short'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'short') {
    return d.toLocaleDateString('en-GB');
  }
  
  if (format === 'long') {
    return d.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  // Relative format (e.g., "2 days ago")
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 7) return d.toLocaleDateString('en-GB');
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}

/**
 * Generate random ID
 * 
 * @param prefix - Optional prefix for ID
 * @returns Random ID string
 * 
 * @example
 * generateId('btn') // Returns: 'btn-x7k2m9'
 */
export function generateId(prefix?: string): string {
  const id = Math.random().toString(36).substring(2, 9);
  return prefix ? `${prefix}-${id}` : id;
}

/**
 * Check if value is empty
 * 
 * @param value - Value to check
 * @returns True if empty
 * 
 * @example
 * isEmpty('') // Returns: true
 * isEmpty([]) // Returns: true
 * isEmpty({}) // Returns: true
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Debounce function
 * Delays execution until after wait time has elapsed since last call
 * 
 * @param func - Function to debounce
 * @param wait - Milliseconds to wait
 * @returns Debounced function
 * 
 * @example
 * const debouncedSearch = debounce(search, 300);
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 * Ensures function is called at most once per specified time period
 * 
 * @param func - Function to throttle
 * @param limit - Milliseconds limit
 * @returns Throttled function
 * 
 * @example
 * const throttledScroll = throttle(handleScroll, 100);
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
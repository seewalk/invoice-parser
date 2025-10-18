'use client';

import { memo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface RelatedTemplatesProps {
  industryName: string;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
}

/**
 * RelatedTemplates Component
 * 
 * Displays a call-to-action to view more templates from the same industry.
 * Currently shows a simple link - can be expanded to show actual related templates.
 * 
 * Optimizations:
 * - Memoized to prevent unnecessary re-renders
 * - Lightweight component with minimal logic
 * - Can be enhanced later with actual template suggestions
 */
function RelatedTemplatesComponent({ industryName, className = '' }: RelatedTemplatesProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-slate-200 p-6 ${className}`}>
      <h3 className="text-xl font-bold text-slate-900 mb-4">
        More {industryName} Templates
      </h3>
      <Link 
        href="/invoice-templates"
        className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-2"
      >
        View All Templates
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

/**
 * Memoized export to prevent unnecessary re-renders
 * Will only re-render if industryName changes
 */
export const RelatedTemplates = memo(RelatedTemplatesComponent);
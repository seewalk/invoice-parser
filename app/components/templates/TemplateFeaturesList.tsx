'use client';

import { memo } from 'react';
import { CheckCircle } from 'lucide-react';

interface TemplateFeaturesListProps {
  /**
   * Additional CSS classes for the container
   */
  className?: string;
}

/**
 * TemplateFeaturesList Component
 * 
 * Displays the standard feature checklist for invoice templates.
 * Shows benefits like "100% Free", "UK-compliant", etc.
 * 
 * Optimizations:
 * - Memoized static content (doesn't change per template)
 * - Pure presentation with no props needed (features are standard)
 * - Lightweight rendering
 */
function TemplateFeaturesListComponent({ className = '' }: TemplateFeaturesListProps) {
  const features = [
    '100% Free - No sign-up required',
    'UK-compliant & HMRC-approved',
    'Available in Word, Excel, PDF',
    'Easy to customize & edit'
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span className="text-slate-700">{feature}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Memoized export
 * Since this component has static content, it will almost never re-render
 */
export const TemplateFeaturesList = memo(TemplateFeaturesListComponent);
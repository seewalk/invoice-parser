'use client';

import { memo } from 'react';
import { InvoiceField } from '@/app/lib/invoiceTemplateLibrary';

interface FieldListProps {
  fields: InvoiceField[];
  title: string;
  description: string;
}

/**
 * FieldList Component
 * 
 * Displays a list of invoice fields (required or optional) with their details.
 * Shows field label, type, help text, and placeholder examples.
 * 
 * Optimizations:
 * - Memoized to prevent re-renders when parent updates
 * - Pure presentation component
 * - Efficient grid layout
 */
function FieldListComponent({ fields, title, description }: FieldListProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 mb-4">{description}</p>
      <div className="grid md:grid-cols-2 gap-4">
        {fields.map((field, idx) => (
          <div 
            key={idx}
            className="bg-slate-50 rounded-lg p-4 border border-slate-200"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="font-semibold text-slate-900">{field.label}</div>
              <span className="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded">
                {field.type}
              </span>
            </div>
            {field.helpText && (
              <p className="text-sm text-slate-600 mb-2">{field.helpText}</p>
            )}
            {field.placeholder && (
              <div className="text-xs text-slate-500 italic">
                Example: {field.placeholder}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Memoized export to prevent unnecessary re-renders
 * Will only re-render if fields, title, or description props change
 */
export const FieldList = memo(FieldListComponent);
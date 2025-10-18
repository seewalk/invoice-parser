'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Edit, Mail, Printer } from 'lucide-react';
import { InvoiceTemplate } from '@/app/lib/invoiceTemplateLibrary';
import InvoiceDownloadButtons from '@/app/components/InvoiceDownloadButtons';

interface TemplateDownloadSectionProps {
  template: InvoiceTemplate;
  templateSlug: string;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
}

/**
 * TemplateDownloadSection Component
 * 
 * Sidebar section containing:
 * - Download Options (PDF, Word, Excel)
 * - Quick Actions (Customize Online, Email, Print)
 * 
 * Optimizations:
 * - Memoized to prevent re-renders when parent updates
 * - Groups related download/action functionality
 * - Keeps download logic centralized
 */
function TemplateDownloadSectionComponent({ 
  template, 
  templateSlug,
  className = '' 
}: TemplateDownloadSectionProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Download Options */}
      <InvoiceDownloadButtons template={template} />

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4">
          Quick Actions
        </h3>
        <div className="space-y-3">
          <Link 
            href={`/invoice-generator/${templateSlug}`}
            className="w-full flex items-center gap-3 p-3 hover:bg-indigo-50 rounded-lg transition text-left border-2 border-indigo-200 bg-indigo-50"
          >
            <Edit className="w-5 h-5 text-indigo-600" />
            <div>
              <span className="text-slate-900 font-semibold block">Customize Online</span>
              <span className="text-xs text-slate-600">Fill in your details and download</span>
            </div>
          </Link>
          <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition text-left">
            <Mail className="w-5 h-5 text-slate-600" />
            <span className="text-slate-900">Email Template</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition text-left">
            <Printer className="w-5 h-5 text-slate-600" />
            <span className="text-slate-900">Print Preview</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Memoized export to prevent unnecessary re-renders
 * Will only re-render if template or templateSlug changes
 */
export const TemplateDownloadSection = memo(TemplateDownloadSectionComponent);

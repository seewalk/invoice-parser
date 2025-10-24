'use client';

import { memo } from 'react';
import { PageState } from '@/app/types/invoice';
import { CheckCircle, Loader, AlertCircle, Clock, Eye } from 'lucide-react';

interface PageCardProps {
  page: PageState;
  isActive: boolean;
  onSelect: () => void;
  onParse: () => void;
  disabled?: boolean;
}

/**
 * PageCard Component
 * 
 * Individual page thumbnail card for multi-page PDF parsing
 * 
 * Features:
 * - Thumbnail preview image
 * - Status badge (pending/parsing/complete/error)
 * - Page number label
 * - Parse/Retry/View button based on status
 * - Active state highlight
 * 
 * Status States:
 * - pending: Gray border, "Parse" button
 * - uploading: Blue border, spinner, "Uploading..."
 * - parsing: Amber border, spinner, "Parsing..."
 * - complete: Green border, checkmark, "View"
 * - error: Red border, error icon, "Retry"
 */
export const PageCard = memo(function PageCard({
  page,
  isActive,
  onSelect,
  onParse,
  disabled = false
}: PageCardProps) {
  const statusConfig = {
    pending: {
      icon: Clock,
      color: 'text-gray-400',
      iconColor: 'text-gray-400',
      border: 'border-gray-300',
      bg: 'bg-gray-50',
      label: 'Not Parsed',
      buttonText: 'Parse Page',
      buttonBg: 'bg-indigo-600 hover:bg-indigo-700',
      buttonDisabled: false
    },
    uploading: {
      icon: Loader,
      color: 'text-blue-500',
      iconColor: 'text-blue-500',
      border: 'border-blue-400',
      bg: 'bg-blue-50',
      label: 'Uploading...',
      buttonText: 'Uploading...',
      buttonBg: 'bg-blue-500',
      buttonDisabled: true
    },
    parsing: {
      icon: Loader,
      color: 'text-amber-500',
      iconColor: 'text-amber-500',
      border: 'border-amber-400',
      bg: 'bg-amber-50',
      label: 'Parsing...',
      buttonText: 'Parsing...',
      buttonBg: 'bg-amber-500',
      buttonDisabled: true
    },
    complete: {
      icon: CheckCircle,
      color: 'text-green-500',
      iconColor: 'text-green-500',
      border: 'border-green-400',
      bg: 'bg-green-50',
      label: 'Parsed',
      buttonText: 'View Results',
      buttonBg: 'bg-green-600 hover:bg-green-700',
      buttonDisabled: false
    },
    error: {
      icon: AlertCircle,
      color: 'text-red-500',
      iconColor: 'text-red-500',
      border: 'border-red-400',
      bg: 'bg-red-50',
      label: 'Error',
      buttonText: 'Retry',
      buttonBg: 'bg-red-600 hover:bg-red-700',
      buttonDisabled: false
    }
  };

  const config = statusConfig[page.status];
  const Icon = config.icon;
  const isProcessing = page.status === 'uploading' || page.status === 'parsing';

  return (
    <div
      className={`relative bg-white rounded-lg border-2 transition-all ${
        isActive ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
      } ${config.border} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'
      }`}
      onClick={() => !disabled && onSelect()}
    >
      {/* Thumbnail Preview */}
      <div className={`relative aspect-[3/4] overflow-hidden rounded-t-md ${config.bg}`}>
        <img
          src={page.previewUrl}
          alt={`Page ${page.pageNumber} preview`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Status Badge Overlay */}
        <div className={`absolute top-2 right-2 ${config.bg} rounded-full p-1.5 shadow-lg border ${config.border}`}>
          <Icon 
            className={`w-4 h-4 ${config.iconColor} ${isProcessing ? 'animate-spin' : ''}`}
          />
        </div>
      </div>

      {/* Page Info */}
      <div className="p-3 space-y-2">
        {/* Page Number */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">
            Page {page.pageNumber}
          </span>
          <span className={`text-xs font-medium ${config.color}`}>
            {config.label}
          </span>
        </div>

        {/* Error Message */}
        {page.error && (
          <p className="text-xs text-red-600 line-clamp-2" title={page.error}>
            {page.error}
          </p>
        )}

        {/* Parse Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!config.buttonDisabled && !disabled) {
              onParse();
            }
          }}
          disabled={config.buttonDisabled || disabled}
          className={`w-full text-white text-xs font-medium py-2 px-3 rounded-md transition-colors ${config.buttonBg} ${
            (config.buttonDisabled || disabled) ? 'cursor-not-allowed opacity-75' : ''
          }`}
          aria-label={`${config.buttonText} for page ${page.pageNumber}`}
        >
          {page.status === 'complete' && (
            <Eye className="w-3 h-3 inline mr-1" />
          )}
          {config.buttonText}
        </button>

        {/* Parsed Timestamp */}
        {page.parsedAt && (
          <p className="text-xs text-gray-500 text-center">
            {new Date(page.parsedAt).toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
});

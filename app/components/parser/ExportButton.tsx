'use client';

import { memo } from 'react';
import { LucideIcon } from 'lucide-react';

interface ExportButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

function ExportButtonComponent({ 
  icon: Icon, 
  label,
  onClick 
}: ExportButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="bg-white border-2 border-gray-200 rounded-lg p-3 hover:border-primary-500 hover:bg-primary-50 transition-all group"
    >
      <Icon className="w-5 h-5 text-gray-400 group-hover:text-primary-600 mx-auto mb-1" />
      <span className="text-xs font-medium text-gray-700 group-hover:text-primary-700">
        {label}
      </span>
    </button>
  );
}

export const ExportButton = memo(ExportButtonComponent);

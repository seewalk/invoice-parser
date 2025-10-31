'use client';

import React from 'react';
import Link from 'next/link';
import { FileCheck, Download, Zap } from 'lucide-react';

/**
 * QuickActionsCard Component
 * 
 * Displays quick action links to main features.
 * 
 * Features:
 * - 3 action links (Parse, Download, Generate)
 * - Color-coded borders and hover states
 * - Icon + title + description layout
 * - Responsive grid (1 column on mobile, 3 on desktop)
 * 
 * Design System:
 * - Tailwind: rounded-xl, shadow-lg, border
 * - Grid layout with gap-4
 * - Hover transitions
 * - Lucide icons
 */
export default function QuickActionsCard() {
  const actions = [
    {
      href: '/parser',
      icon: FileCheck,
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      hoverBg: 'hover:bg-blue-50',
      title: 'Parse Invoice',
      description: 'Extract data from PDFs',
    },
    {
      href: '/invoice-templates',
      icon: Download,
      iconColor: 'text-green-600',
      borderColor: 'border-green-200',
      hoverBg: 'hover:bg-green-50',
      title: 'Download Template',
      description: 'Professional templates',
    },
    {
      href: '/invoice-generator',
      icon: Zap,
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      hoverBg: 'hover:bg-purple-50',
      title: 'Generate Invoice',
      description: 'Create custom invoices',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className={`flex items-center gap-3 p-4 border-2 ${action.borderColor} rounded-lg ${action.hoverBg} transition`}
            >
              <Icon className={`w-6 h-6 ${action.iconColor}`} />
              <div>
                <p className="font-semibold text-slate-900">{action.title}</p>
                <p className="text-xs text-slate-600">{action.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
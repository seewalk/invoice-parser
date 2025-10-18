'use client';

import { memo } from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function FeatureCardComponent({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
      <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export const FeatureCard = memo(FeatureCardComponent);
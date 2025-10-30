// ============================================================================
// FEATURES DATA (Single Source of Truth)
// ============================================================================
// This data is used for both the UI component and schema markup

import { 
  Zap, 
  Shield, 
  BarChart3, 
  CheckCheck, 
  TrendingUp, 
  Users,
  type LucideIcon 
} from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Main features data
export const FEATURES: Feature[] = [
  {
    icon: Zap,
    title: 'Lightning Fast Processing',
    description: 'Process invoices in under 5 seconds. 90% faster than manual entry.',
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: 'SOC 2 Type II compliant. Your data is encrypted and protected 24/7.',
  },
  {
    icon: BarChart3,
    title: 'Smart Analytics',
    description: 'Track spending trends, supplier performance, and cost savings automatically.',
  },
  {
    icon: CheckCheck,
    title: '99% Accuracy Guaranteed',
    description: 'AI learns from corrections. Gets smarter with every invoice processed.',
  },
  {
    icon: TrendingUp,
    title: 'Auto-Integration',
    description: 'Syncs with QuickBooks, Xero, POS systems, and inventory management.',
  },
  {
    icon: Users,
    title: 'Multi-User Collaboration',
    description: 'Team approval workflows, role permissions, and activity tracking.',
  },
];

// Schema-specific metadata
export const FEATURES_SCHEMA_META = {
  name: 'Invoice Processing Software Features',
  description: 'Comprehensive features for automated invoice processing, data extraction, and integration with accounting software for UK businesses.',
} as const;

// Helper function to convert features to schema format
export function getFeaturesForSchema() {
  return FEATURES.map(feature => ({
    name: feature.title,
    description: feature.description,
  }));
}
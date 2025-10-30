// ============================================================================
// HOW IT WORKS DATA (Single Source of Truth)
// ============================================================================
// This data is used for both the UI component and schema markup

import { 
  Upload, 
  Sparkles, 
  CheckCheck, 
  Zap,
  type LucideIcon 
} from 'lucide-react';

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

// Main How It Works steps data
export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: '01',
    title: 'Upload Your Invoice',
    description:
      'Drag & drop PDFs, images, or email invoices directly to our platform. Works with any supplier format.',
    icon: Upload,
  },
  {
    number: '02',
    title: 'AI Extracts Everything',
    description:
      'Our AI reads line items, prices, quantities, dates, and categorizes products automatically in seconds.',
    icon: Sparkles,
  },
  {
    number: '03',
    title: 'Review & Approve',
    description:
      'Quick visual review with 99% accuracy. Edit anything if needed, or approve with one click.',
    icon: CheckCheck,
  },
  {
    number: '04',
    title: 'Auto-Integrate',
    description:
      'Data flows directly to QuickBooks, Xero, your POS, or inventory system. Zero manual entry.',
    icon: Zap,
  },
];

// Schema-specific metadata
export const HOW_IT_WORKS_SCHEMA_META = {
  name: 'How to Automate Invoice Processing with AI',
  description: 'Learn how to automate your invoice processing workflow in 4 simple steps. From upload to automated data export, no technical skills required.',
  totalTime: 'PT5M', // 5 minutes in ISO 8601 duration format
} as const;

// Helper function to convert steps to schema format
export function getHowItWorksSchemaSteps() {
  return HOW_IT_WORKS_STEPS.map(step => ({
    name: step.title,
    text: step.description,
  }));
}

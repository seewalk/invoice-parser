'use client';

import { useState, useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Upload,
  CheckCheck,
  Download,
} from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { IconBox } from './ui/IconBox';

export default function DemoVisualization() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4" role="presentation" aria-label="Invoice processing workflow demonstration">
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center space-x-3 ${
            step >= 0 ? 'opacity-100' : 'opacity-30'
          } transition-opacity`}
        >
          <IconBox
            icon={<Upload />}
            variant="primary"
            style="solid"
            size="sm"
            rounded="full"
            animate={false}
            className={step >= 0 ? 'bg-primary-600 text-white' : 'bg-gray-300 text-white'}
            aria-label={step >= 0 ? 'Active: Upload invoice' : 'Inactive: Upload invoice'}
          />
          <span className="font-semibold">Upload Invoice</span>
        </div>
        <ArrowRight className="w-6 h-6 text-gray-400" aria-hidden="true" />
        <div
          className={`flex items-center space-x-3 ${
            step >= 1 ? 'opacity-100' : 'opacity-30'
          } transition-opacity`}
        >
          <IconBox
            icon={<Sparkles />}
            variant="primary"
            style="solid"
            size="sm"
            rounded="full"
            animate={false}
            className={step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-300 text-white'}
            aria-label={step >= 1 ? 'Active: AI processing' : 'Inactive: AI processing'}
          />
          <span className="font-semibold">AI Processing</span>
        </div>
        <ArrowRight className="w-6 h-6 text-gray-400" aria-hidden="true" />
        <div
          className={`flex items-center space-x-3 ${
            step >= 2 ? 'opacity-100' : 'opacity-30'
          } transition-opacity`}
        >
          <IconBox
            icon={<CheckCheck />}
            variant="primary"
            style="solid"
            size="sm"
            rounded="full"
            animate={false}
            className={step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-300 text-white'}
            aria-label={step >= 2 ? 'Active: Verified data' : 'Inactive: Verified data'}
          />
          <span className="font-semibold">Verified Data</span>
        </div>
        <ArrowRight className="w-6 h-6 text-gray-400" aria-hidden="true" />
        <div
          className={`flex items-center space-x-3 ${
            step >= 3 ? 'opacity-100' : 'opacity-30'
          } transition-opacity`}
        >
          <IconBox
            icon={<Download />}
            variant="success"
            style="solid"
            size="sm"
            rounded="full"
            animate={false}
            className={step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-300 text-white'}
            aria-label={step >= 3 ? 'Active: Auto-export' : 'Inactive: Auto-export'}
          />
          <span className="font-semibold">Auto-Export</span>
        </div>
      </div>
      <Card 
        variant="default" 
        padding="md" 
        className="bg-gradient-to-r from-primary-100 to-accent-100 text-left border-0"
        animate={false}
      >
        <CardContent padding="none">
          <p className="text-sm text-gray-600 mb-2">Sample Invoice Data:</p>
          <div className="space-y-1 text-sm font-mono">
            <div>
              Supplier: <span className="text-primary-700 font-semibold">Sysco Foods Ltd</span>
            </div>
            <div>
              Invoice #: <span className="text-primary-700 font-semibold">INV-2024-10847</span>
            </div>
            <div>
              Items: <span className="text-primary-700 font-semibold">47 line items extracted</span>
            </div>
            <div>
              Total: <span className="text-primary-700 font-semibold">£2,847.39</span>
            </div>
            <div className="pt-2 text-green-600 font-semibold flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" aria-hidden="true" />
              <span>Processed in 4.2 seconds ⚡</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

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
import { Card, CardContent } from '../ui/Card';
import { IconBox } from '../ui/IconBox';
import { Text } from '../ui/Text';

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
      
      <Card 
        variant="default" 
        padding="md" 
        className="bg-gradient-to-r from-primary-100 to-accent-100 text-left border-0"
        animate={false}
      >
        <CardContent padding="none">
          <Text size="sm" variant="muted" className="mb-2">Sample Invoice Data:</Text>
          <div className="space-y-1 text-sm font-mono">
            <div>
              <Text as="span" size="sm">Supplier: </Text>
              <Text as="span" size="sm" weight="semibold" className="text-primary-700">Sysco Foods Ltd</Text>
            </div>
            <div>
              <Text as="span" size="sm">Invoice #: </Text>
              <Text as="span" size="sm" weight="semibold" className="text-primary-700">INV-2024-10847</Text>
            </div>
            <div>
              <Text as="span" size="sm">Items: </Text>
              <Text as="span" size="sm" weight="semibold" className="text-primary-700">47 line items extracted</Text>
            </div>
            <div>
              <Text as="span" size="sm">Total: </Text>
              <Text as="span" size="sm" weight="semibold" className="text-primary-700">£2,847.39</Text>
            </div>
            <div className="pt-2 flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" aria-hidden="true" />
              <Text as="span" size="sm" weight="semibold" className="text-green-600">Processed in 4.2 seconds ⚡</Text>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

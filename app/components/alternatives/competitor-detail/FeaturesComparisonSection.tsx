/**
 * FeaturesComparisonSection Component
 * 
 * Displays feature comparison grid with checkmarks/X marks.
 * Shows OCR accuracy and accounting integrations.
 * Auto-styles features based on availability (green = has, red = missing).
 * 
 * Refactored to use:
 * - Badge component for feature items
 * - Card for feature containers
 * - IconBox for feature icons
 * - Consistent color variants from design system
 */

import { Competitor } from '@/app/lib/alternativesKnowledgeBase';
import { Card, CardContent } from '@/app/components/ui/Card';
import { Heading } from '@/app/components/ui/Heading';
import { Text } from '@/app/components/ui/Text';
import { Badge } from '@/app/components/ui/Badge';
import { IconBox } from '@/app/components/ui/IconBox';
import { CheckCircle, XCircle, Zap } from 'lucide-react';

interface FeaturesComparisonSectionProps {
  features: Competitor['features'];
}

/**
 * Feature mapping for display
 */
const FEATURES_TO_DISPLAY = [
  { key: 'aiPowered', label: 'AI-Powered' },
  { key: 'ukCompliance', label: 'UK Compliance' },
  { key: 'vatSupport', label: 'VAT Support' },
  { key: 'cisSupport', label: 'CIS Support' },
  { key: 'automation', label: 'Automation' },
  { key: 'mobileApp', label: 'Mobile App' },
  { key: 'apiAccess', label: 'API Access' },
  { key: 'customTemplates', label: 'Custom Templates' },
  { key: 'multiCurrency', label: 'Multi-Currency' },
  { key: 'batchProcessing', label: 'Batch Processing' },
] as const;

export function FeaturesComparisonSection({ features }: FeaturesComparisonSectionProps) {
  return (
    <section className="mb-12" aria-labelledby="features-overview-heading">
      <Heading as="h2" id="features-overview-heading" size="display-sm" className="mb-6">
        Features Overview
      </Heading>
      
      <Card variant="default" elevation="lg" padding="lg">
        <CardContent>
          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="Product features">
            {FEATURES_TO_DISPLAY.map(({ key, label }) => {
              const hasFeature = features[key as keyof typeof features] as boolean;
              
              return (
                <Card
                  key={key}
                  variant="default"
                  padding="md"
                  elevation="sm"
                  className={hasFeature 
                    ? 'bg-success-50 border-success-200' 
                    : 'bg-error-50 border-error-200'
                  }
                  animate={false}
                  role="listitem"
                  aria-label={`${label}: ${hasFeature ? 'Available' : 'Not available'}`}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3">
                      <IconBox
                        icon={hasFeature ? <CheckCircle /> : <XCircle />}
                        variant={hasFeature ? 'success' : 'error'}
                        styleVariant="solid"
                        size="sm"
                        rounded="md"
                        className={hasFeature ? 'bg-success-100' : 'bg-error-100'}
                        animate={false}
                      />
                      <Text 
                        size="sm" 
                        weight="semibold"
                        className={hasFeature ? 'text-success-900' : 'text-error-900'}
                      >
                        {label}
                      </Text>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {/* OCR Accuracy (conditional) */}
            {features.ocrAccuracy && (
              <Card
                variant="default"
                padding="md"
                elevation="sm"
                className="bg-warning-50 border-warning-200 col-span-full"
                animate={false}
                aria-label={`OCR Accuracy: ${features.ocrAccuracy}%`}
              >
                <CardContent className="p-0">
                  <div className="flex items-center gap-3">
                    <IconBox
                      icon={<Zap />}
                      variant="warning"
                      styleVariant="solid"
                      size="sm"
                      rounded="md"
                      className="bg-warning-100"
                      animate={false}
                    />
                    <Text size="sm" weight="semibold" className="text-warning-900">
                      OCR Accuracy: {features.ocrAccuracy}%
                    </Text>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Accounting Integrations */}
          {features.accountingIntegration.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <Heading as="h3" size="lg" className="mb-4">
                Accounting Integrations
              </Heading>
              <div className="flex flex-wrap gap-2" role="list" aria-label="Accounting integrations">
                {features.accountingIntegration.map((integration, index) => (
                  <Badge
                    key={index}
                    variant="primary"
                    size="md"
                    shape="pill"
                    icon={<CheckCircle className="w-4 h-4" />}
                    iconPosition="left"
                    className="bg-primary-100"
                    role="listitem"
                  >
                    {integration}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
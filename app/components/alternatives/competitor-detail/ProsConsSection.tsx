/**
 * ProsConsSection Component
 * 
 * Displays strengths and weaknesses in a two-column layout.
 * Green checkmarks for strengths, red X marks for weaknesses.
 * 
 * Refactored to use:
 * - Card components for main containers
 * - IconBox for all icons (header + list items)
 * - Badge for count indicators
 * - Consistent color variants from design system
 * - Enhanced visual hierarchy
 */

import { Competitor } from '@/app/lib/alternativesKnowledgeBase';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Heading } from '@/app/components/ui/Heading';
import { Text } from '@/app/components/ui/Text';
import { IconBox } from '@/app/components/ui/IconBox';
import { Badge } from '@/app/components/ui/Badge';
import { CheckCircle, XCircle, TrendingUp, TrendingDown } from 'lucide-react';

interface ProsConsSectionProps {
  strengths: Competitor['strengths'];
  weaknesses: Competitor['weaknesses'];
}

export function ProsConsSection({ strengths, weaknesses }: ProsConsSectionProps) {
  return (
    <section className="mb-12" aria-labelledby="pros-cons-heading">
      <Heading as="h2" id="pros-cons-heading" size="display-sm" className="mb-6">
        Pros & Cons
      </Heading>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths Column */}
        <Card variant="default" elevation="lg" padding="none">
          <CardHeader className="border-b border-success-100 bg-success-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <IconBox 
                  icon={<TrendingUp />} 
                  variant="success" 
                  styleVariant="solid"
                  size="lg"
                  rounded="lg"
                  className="bg-success-100"
                />
                <CardTitle >
                  <Heading as="h3" size="xl" className="text-success-900">
                    Strengths
                  </Heading>
                </CardTitle>
              </div>
              <Badge 
                variant="success" 
                size="md"
                className="font-semibold"
              >
                {strengths.length}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Strengths List */}
            <ul className="space-y-4" role="list" aria-label="Product strengths">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <IconBox
                    icon={<CheckCircle />}
                    variant="success"
                    styleVariant="solid"
                    size="sm"
                    rounded="md"
                    className="bg-success-100 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                    animate={false}
                  />
                  <Text size="sm" className="text-slate-700 leading-relaxed">
                    {strength}
                  </Text>
                </li>
              ))}
            </ul>
            
            {/* Empty State */}
            {strengths.length === 0 && (
              <div className="text-center py-8">
                <Text variant="muted" size="sm">
                  No strengths listed
                </Text>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weaknesses Column */}
        <Card variant="default" elevation="lg" padding="none">
          <CardHeader className="border-b border-error-100 bg-error-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <IconBox 
                  icon={<TrendingDown />} 
                  variant="error" 
                  styleVariant="solid"
                  size="lg"
                  rounded="lg"
                  className="bg-error-100"
                />
                <CardTitle >
                  <Heading as="h3" size="xl" className="text-error-900">
                    Weaknesses
                  </Heading>
                </CardTitle>
              </div>
              <Badge 
                variant="error" 
                size="md"
                className="font-semibold"
              >
                {weaknesses.length}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Weaknesses List */}
            <ul className="space-y-4" role="list" aria-label="Product weaknesses">
              {weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <IconBox
                    icon={<XCircle />}
                    variant="error"
                    styleVariant="solid"
                    size="sm"
                    rounded="md"
                    className="bg-error-100 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                    animate={false}
                  />
                  <Text size="sm" className="text-slate-700 leading-relaxed">
                    {weakness}
                  </Text>
                </li>
              ))}
            </ul>
            
            {/* Empty State */}
            {weaknesses.length === 0 && (
              <div className="text-center py-8">
                <Text variant="muted" size="sm">
                  No weaknesses listed
                </Text>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
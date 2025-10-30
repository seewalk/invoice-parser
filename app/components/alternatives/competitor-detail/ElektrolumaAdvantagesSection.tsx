/**
 * ElektrolumaAdvantagesSection Component
 * 
 * Displays why users should choose Elektroluma over a competitor.
 * Features gradient background, advantage cards with icons, migration path info,
 * and dual CTA buttons.
 * 
 * Refactored to use:
 * - Card UI component for advantage cards
 * - Badge for category indicators
 * - IconBox for advantage icons
 * - Centralized elektrolumaAdvantages data
 */

'use client';

import Link from 'next/link';
import { Competitor } from '@/app/lib/alternativesKnowledgeBase';
import { getDifferentiatorsBySegment, ELEKTROLUMA_ADVANTAGES } from '@/app/lib/elektrolumaAdvantages';
import { Card, CardContent } from '@/app/components/ui/Card';
import { Heading } from '@/app/components/ui/Heading';
import { Text } from '@/app/components/ui/Text';
import { Button } from '@/app/components/ui/Button';
import { IconBox } from '@/app/components/ui/IconBox';
import { Badge } from '@/app/components/ui/Badge';
import { Shield, CheckCircle, Zap, ArrowRight } from 'lucide-react';

interface ElektrolumaAdvantagesSectionProps {
  competitorName: string;
  competitorSegment?: string;
  advantages?: string[];
  migrationPath?: string;
}

export function ElektrolumaAdvantagesSection({ 
  competitorName, 
  competitorSegment,
  advantages, 
  migrationPath 
}: ElektrolumaAdvantagesSectionProps) {
  // Use provided advantages or get by segment
  const displayAdvantages = advantages || (
    competitorSegment 
      ? getDifferentiatorsBySegment(competitorSegment as any)
      : getDifferentiatorsBySegment('ai-parser')
  );
  
  // Get featured advantages with icons (first 4)
  const featuredAdvantages = ELEKTROLUMA_ADVANTAGES.slice(0, 4);

  return (
    <section className="mb-12" aria-labelledby="elektroluma-advantages-heading">
      <Heading as="h2" id="elektroluma-advantages-heading" size="display-sm" className="mb-6">
        Why Choose Elektroluma Over {competitorName}?
      </Heading>
      
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl shadow-2xl p-8 text-white">
        {/* Section Header with Icon */}
        <div className="flex items-center gap-3 mb-6">
          <IconBox 
            icon={<Shield />} 
            variant="primary"
            styleVariant="solid"
            size="xl"
            rounded="xl"
            className="bg-white/20 text-white"
          />
          <Heading as="h3" size="display-sm" className="text-white">
            Elektroluma Advantages
          </Heading>
        </div>

        {/* Featured Advantages with Icons - Grid Layout */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {featuredAdvantages.map((advantage, index) => (
            <Card 
              key={index}
              variant="default"
              padding="md"
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all"
              animate={false}
            >
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <IconBox 
                    icon={<advantage.icon />}
                    variant="success"
                    styleVariant="solid"
                    size="md"
                    rounded="lg"
                    className="bg-white/20 text-green-300 flex-shrink-0"
                    animate={false}
                  />
                  <div className="flex-1">
                    <Heading as="h4" size="sm" className="text-white mb-1">
                      {advantage.title}
                    </Heading>
                    <Text size="sm" className="text-indigo-100">
                      {advantage.description}
                    </Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Text Differentiators */}
        {displayAdvantages.length > 0 && (
          <div className="mb-8">
            <Heading as="h4" size="md" className="text-white mb-4">
              Key Differentiators
            </Heading>
            <div className="grid md:grid-cols-2 gap-3" role="list" aria-label="Key differentiators">
              {displayAdvantages.map((advantage, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-2 bg-white/5 backdrop-blur-sm rounded-lg p-3"
                  role="listitem"
                >
                  <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <Text size="sm" className="text-white">
                    {advantage}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Migration Path (conditional) */}
        {migrationPath && (
          <Card 
            variant="default"
            padding="md"
            className="bg-white/10 backdrop-blur-sm border-white/20 mb-6"
            animate={false}
          >
            <CardContent>
              <div className="flex items-start gap-3">
                <IconBox 
                  icon={<Zap />}
                  variant="warning"
                  styleVariant="solid"
                  size="md"
                  rounded="lg"
                  className="bg-white/20 text-yellow-300"
                  animate={false}
                />
                <div>
                  <Heading as="h4" size="sm" className="text-white mb-2">
                    Easy Migration Path
                  </Heading>
                  <Text size="sm" className="text-indigo-100">
                    {migrationPath}
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link href="/parser">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight />}
              iconPosition="right"
              className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-xl font-semibold"
            >
              Try Elektroluma Free
            </Button>
          </Link>
          <Link href="/pricing">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight />}
              iconPosition="right"
              className="bg-indigo-500 hover:bg-indigo-600 text-white shadow-xl border-2 border-white/20 font-semibold"
            >
              View Pricing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
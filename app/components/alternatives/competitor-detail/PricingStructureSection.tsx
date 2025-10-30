/**
 * PricingStructureSection Component
 * 
 * Displays pricing tiers in a responsive grid with features and limits.
 * Highlights the popular tier with special styling.
 * Shows usage fees warning if applicable.
 */

import { Competitor } from '@/app/lib/alternativesKnowledgeBase';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Heading } from '@/app/components/ui/Heading';
import { Text } from '@/app/components/ui/Text';
import { Badge } from '@/app/components/ui/Badge';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface PricingStructureSectionProps {
  pricing: Competitor['pricing'];
}

export function PricingStructureSection({ pricing }: PricingStructureSectionProps) {
  return (
    <section className="mb-12" aria-labelledby="pricing-structure-heading">
      <Heading as="h2" id="pricing-structure-heading" size="display-sm" className="mb-6">
        Pricing Structure
      </Heading>
      
      {/* Pricing Tiers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricing.tiers.map((tier, index) => {
          const isPopular = index === 1; // Middle tier is popular
          
          return (
            <div 
              key={index}
              className={`bg-white rounded-2xl shadow-lg border-2 p-8 ${
                isPopular ? 'border-indigo-500 ring-4 ring-indigo-100' : 'border-slate-200'
              }`}
              role="article"
              aria-label={`${tier.name} pricing tier`}
            >
              {/* Popular Badge */}
              {isPopular && (
                <Badge variant="primary" size="sm" className="mb-4 bg-indigo-500 text-white">
                  POPULAR
                </Badge>
              )}
              
              {/* Tier Name */}
              <Heading as="h3" size="display-sm" className="mb-2">
                {tier.name}
              </Heading>
              
              {/* Price Display */}
              <div className="mb-6">
                {tier.price === 0 ? (
                  <div className="text-4xl font-bold text-green-600">Free</div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl text-slate-600">{pricing.currency}</span>
                    <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                    {tier.billingPeriod && (
                      <span className="text-slate-600">/{tier.billingPeriod}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-6" role="list" aria-label="Tier features">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <Text size="sm" variant="muted">{feature}</Text>
                  </li>
                ))}
              </ul>

              {/* Usage Limits (conditional) */}
              {tier.limits && (
                <div className="pt-4 border-t border-slate-200 space-y-2">
                  {tier.limits.users && (
                    <div className="flex items-center justify-between text-sm">
                      <Text size="sm" variant="secondary">Users:</Text>
                      <Text size="sm" weight="semibold">{tier.limits.users}</Text>
                    </div>
                  )}
                  {tier.limits.invoices && (
                    <div className="flex items-center justify-between text-sm">
                      <Text size="sm" variant="secondary">Invoices:</Text>
                      <Text size="sm" weight="semibold">{tier.limits.invoices}/month</Text>
                    </div>
                  )}
                  {tier.limits.pages && (
                    <div className="flex items-center justify-between text-sm">
                      <Text size="sm" variant="secondary">Pages:</Text>
                      <Text size="sm" weight="semibold">{tier.limits.pages}/month</Text>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Usage Fees Warning (conditional) */}
      {pricing.usageFees && (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <Heading as="h4" size="md" className="text-amber-900 mb-1">
                Additional Usage Fees
              </Heading>
              <Text size="sm" className="text-amber-800">
                {pricing.usageFees.description}
              </Text>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
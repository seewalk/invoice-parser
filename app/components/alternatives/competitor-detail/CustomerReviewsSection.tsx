/**
 * CustomerReviewsSection Component
 * 
 * Displays customer review ratings and user comments.
 * Shows ratings from multiple platforms (Trustpilot, G2, Capterra).
 * Includes user feedback quotes in styled cards.
 */

import { Competitor } from '@/app/lib/alternativesKnowledgeBase';
import { Card, CardContent } from '@/app/components/ui/Card';
import { Heading } from '@/app/components/ui/Heading';
import { Text } from '@/app/components/ui/Text';
import { Stat } from '@/app/components/ui/Stat';
import { Star, Users } from 'lucide-react';

interface CustomerReviewsSectionProps {
  reviews: Competitor['reviews'];
}

export function CustomerReviewsSection({ reviews }: CustomerReviewsSectionProps) {
  // Don't render if no reviews available
  if (!reviews) {
    return null;
  }

  return (
    <section className="mb-12" aria-labelledby="customer-reviews-heading">
      <Heading as="h2" id="customer-reviews-heading" size="display-sm" className="mb-6">
        Customer Reviews
      </Heading>
      
      <Card variant="default" elevation="lg" padding="lg">
        <CardContent>
          {/* Rating Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" aria-hidden="true" />
                <span className="text-3xl font-bold text-slate-900">{reviews.overall}</span>
              </div>
              <Text size="sm" variant="secondary">Overall Rating</Text>
            </div>

            {/* Trustpilot Rating (conditional) */}
            {reviews.trustpilot && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" aria-hidden="true" />
                  <span className="text-3xl font-bold text-slate-900">{reviews.trustpilot}</span>
                </div>
                <Text size="sm" variant="secondary">Trustpilot</Text>
              </div>
            )}

            {/* G2 Rating (conditional) */}
            {reviews.g2 && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" aria-hidden="true" />
                  <span className="text-3xl font-bold text-slate-900">{reviews.g2}</span>
                </div>
                <Text size="sm" variant="secondary">G2</Text>
              </div>
            )}

            {/* Capterra Rating (conditional) */}
            {reviews.capterra && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" aria-hidden="true" />
                  <span className="text-3xl font-bold text-slate-900">{reviews.capterra}</span>
                </div>
                <Text size="sm" variant="secondary">Capterra</Text>
              </div>
            )}
          </div>

          {/* User Comments */}
          <div>
            <Heading as="h4" size="md" className="mb-4">
              Common User Feedback
            </Heading>
            <div className="space-y-3" role="list" aria-label="User comments">
              {reviews.userComments.map((comment, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg"
                  role="listitem"
                >
                  <div className="p-1.5 bg-white rounded-full shadow-sm">
                    <Users className="w-4 h-4 text-slate-600" aria-hidden="true" />
                  </div>
                  <Text size="sm" variant="muted" className="italic">
                    "{comment}"
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
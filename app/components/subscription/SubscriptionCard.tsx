/**
 * ============================================================================
 * SUBSCRIPTION CARD COMPONENT
 * ============================================================================
 * 
 * Displays current subscription details with management options
 * - Current plan and status
 * - Billing cycle and next payment
 * - Cancellation status
 * - Upgrade/downgrade options
 */

'use client';

import { useState } from 'react';
import { Crown, CheckCircle, AlertCircle, Calendar, CreditCard, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import CancelSubscriptionModal from './CancelSubscriptionModal';

interface SubscriptionCardProps {
  userId: string;
  subscription: {
    subscriptionId: string;
    status: 'active' | 'canceled' | 'past_due' | 'unpaid';
    currentPeriodEnd?: number;
    cancelAtPeriodEnd?: boolean;
    priceId?: string;
  } | null;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  onUpgrade?: () => void;
}

export default function SubscriptionCard({
  userId,
  subscription,
  plan,
  onUpgrade,
}: SubscriptionCardProps) {
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Plan details
  const planConfig = {
    free: {
      name: 'Free Plan',
      price: '£0',
      color: 'text-slate-600',
      bg: 'bg-slate-100',
      borderColor: 'border-slate-300',
    },
    starter: {
      name: 'Starter Plan',
      price: '£9.99',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      borderColor: 'border-blue-300',
    },
    pro: {
      name: 'Pro Plan',
      price: '$29.00',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      borderColor: 'border-purple-300',
    },
    enterprise: {
      name: 'Enterprise Plan',
      price: 'Custom',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      borderColor: 'border-amber-300',
    },
  };

  const currentPlan = planConfig[plan];
  const hasActiveSubscription = subscription && subscription.status === 'active';
  const isCanceled = subscription?.cancelAtPeriodEnd;

  // Format next billing date
  const nextBillingDate = subscription?.currentPeriodEnd
    ? new Date(subscription.currentPeriodEnd * 1000).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  // Status badge
  const getStatusBadge = () => {
    if (!subscription) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
          <CheckCircle className="w-4 h-4" />
          Free Plan
        </span>
      );
    }

    if (isCanceled) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
          <AlertCircle className="w-4 h-4" />
          Canceling
        </span>
      );
    }

    switch (subscription.status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-success-100 text-success-700 text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Active
          </span>
        );
      case 'past_due':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-error-100 text-error-700 text-sm font-medium">
            <AlertCircle className="w-4 h-4" />
            Past Due
          </span>
        );
      case 'canceled':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
            <XCircle className="w-4 h-4" />
            Canceled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
            {subscription.status}
          </span>
        );
    }
  };

  return (
    <>
      <div className={`bg-white rounded-2xl shadow-lg border-2 ${currentPlan.borderColor} p-6 transition-all hover:shadow-xl`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${currentPlan.bg}`}>
              <Crown className={`w-6 h-6 ${currentPlan.color}`} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{currentPlan.name}</h3>
              <p className="text-sm text-gray-600">
                {currentPlan.price}
                {plan !== 'free' && plan !== 'enterprise' && '/month'}
              </p>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        {/* Subscription Details */}
        {hasActiveSubscription && (
          <div className="space-y-4 mb-6">
            {/* Next Billing Date */}
            {nextBillingDate && !isCanceled && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Calendar className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Next Billing Date</p>
                  <p className="text-base font-semibold text-gray-900">{nextBillingDate}</p>
                </div>
              </div>
            )}

            {/* Cancellation Notice */}
            {isCanceled && nextBillingDate && (
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-900">Subscription Ending</p>
                  <p className="text-sm text-amber-700 mt-1">
                    Your subscription will end on <strong>{nextBillingDate}</strong>. You'll still have access to Pro features until then.
                  </p>
                </div>
              </div>
            )}

            {/* Features List */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-3">Included Features</p>
              <ul className="space-y-2">
                {plan === 'pro' && (
                  <>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-success-500" />
                      <span>Unlimited AI invoice parsing</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-success-500" />
                      <span>API access for automation</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-success-500" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-success-500" />
                      <span>All Premium features</span>
                    </li>
                  </>
                )}
                {plan === 'free' && (
                  <>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-success-500" />
                      <span>10 invoice parses</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-success-500" />
                      <span>3 template downloads</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-success-500" />
                      <span>Community support</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {plan === 'free' && (
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={onUpgrade || (() => (window.location.href = '/pricing'))}
              icon={<Crown className="w-5 h-5" />}
            >
              Upgrade to Pro
            </Button>
          )}

          {hasActiveSubscription && !isCanceled && (
            <Button
              variant="ghost"
              size="md"
              fullWidth
              onClick={() => setShowCancelModal(true)}
              className="text-error-600 hover:bg-error-50"
            >
              Cancel Subscription
            </Button>
          )}

          {isCanceled && (
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={() => alert('Reactivate subscription (coming soon)')}
            >
              Reactivate Subscription
            </Button>
          )}
        </div>

        {/* Subscription ID (for debugging/support) */}
        {subscription && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Subscription ID: <code className="font-mono">{subscription.subscriptionId}</code>
            </p>
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {hasActiveSubscription && (
        <CancelSubscriptionModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          userId={userId}
          subscriptionId={subscription.subscriptionId}
          nextBillingDate={nextBillingDate || ''}
        />
      )}
    </>
  );
}

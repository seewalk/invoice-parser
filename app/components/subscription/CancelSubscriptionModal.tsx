/**
 * ============================================================================
 * CANCEL SUBSCRIPTION MODAL
 * ============================================================================
 * 
 * Confirmation modal for subscription cancellation
 * - Warning message
 * - Cancellation reasons dropdown
 * - Explanation of what happens
 * - Confirm/Cancel buttons
 * 
 * NOTE: API call placeholder - will be implemented when integrating backend
 */

'use client';

import { useState } from 'react';
import { X, AlertTriangle, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptionId: string;
  nextBillingDate: string;
}

export default function CancelSubscriptionModal({
  isOpen,
  onClose,
  subscriptionId,
  nextBillingDate,
}: CancelSubscriptionModalProps) {
  const [reason, setReason] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleCancel = async () => {
    setLoading(true);
    
    // TODO: Implement API call when ready
    // await cancelSubscription(subscriptionId);
    // await cancelSubscriptionInFirestore(userId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setConfirmed(true);
    
    // Close modal after showing confirmation
    setTimeout(() => {
      onClose();
      setConfirmed(false);
      setReason('');
      setFeedback('');
    }, 2000);
  };

  // Success state
  if (confirmed) {
    return (
      <div className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-success-100 rounded-full p-4">
              <CheckCircle className="w-12 h-12 text-success-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Subscription Canceled
          </h3>
          <p className="text-gray-600">
            Your subscription has been canceled. You'll still have access until {nextBillingDate}.
          </p>
        </div>
      </div>
    );
  }

  // Cancellation form
  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900">Cancel Subscription</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Warning Banner */}
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-900 mb-1">
                Are you sure you want to cancel?
              </p>
              <p className="text-sm text-amber-700">
                You'll lose access to all Pro features after {nextBillingDate}.
              </p>
            </div>
          </div>

          {/* What You'll Lose */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              What you'll lose:
            </h3>
            <ul className="space-y-2">
              {[
                'Unlimited AI invoice parsing',
                'API access for automation',
                'Priority support',
                'All Premium features',
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                  <X className="w-4 h-4 text-error-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cancellation Details */}
          <div className="p-4 bg-gray-50 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary-600" />
              <span className="text-gray-700">
                Access until: <strong className="text-gray-900">{nextBillingDate}</strong>
              </span>
            </div>
            <p className="text-xs text-gray-600">
              You won't be charged again. Your subscription will remain active until the end of your billing period.
            </p>
          </div>

          {/* Reason (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Why are you canceling? (Optional)
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition"
            >
              <option value="">Select a reason</option>
              <option value="too_expensive">Too expensive</option>
              <option value="not_using">Not using enough</option>
              <option value="missing_features">Missing features I need</option>
              <option value="found_alternative">Found a better alternative</option>
              <option value="technical_issues">Technical issues</option>
              <option value="temporary">Temporary cancellation</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Additional Feedback */}
          {reason && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Any additional feedback?
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Help us improve..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition resize-none"
              />
            </div>
          )}

          {/* Alternative: Pause instead */}
          <div className="p-4 bg-primary-50 border border-primary-200 rounded-xl">
            <p className="text-sm text-primary-900 mb-2">
              <strong>Want to take a break instead?</strong>
            </p>
            <p className="text-xs text-primary-700 mb-3">
              Consider pausing your subscription for up to 3 months instead of canceling permanently.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => alert('Pause subscription (coming soon)')}
              className="text-primary-600 border-primary-600"
            >
              Pause Subscription
            </Button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center gap-3 rounded-b-2xl">
          <Button
            variant="ghost"
            size="lg"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            Keep Subscription
          </Button>
          <Button
            variant="danger"
            size="lg"
            onClick={handleCancel}
            className="flex-1"
            loading={loading}
          >
            {loading ? 'Canceling...' : 'Cancel Subscription'}
          </Button>
        </div>
      </div>
    </div>
  );
}

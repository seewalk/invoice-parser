'use client';

import React, { useState } from 'react';
import { CreditCard, Edit3, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface PaymentMethod {
  last4: string;
  brand: 'visa' | 'mastercard' | 'amex' | 'discover' | 'other';
  expMonth: number;
  expYear: number;
}

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod | null;
  isLoading?: boolean;
}

/**
 * PaymentMethodCard Component
 * 
 * Displays current payment method and allows users to update it.
 * 
 * Features:
 * - Display current card (brand, last 4 digits, expiry)
 * - Empty state for no payment method
 * - Update payment method button
 * - Responsive design with Tailwind
 * 
 * Phase 4: FRONTEND ONLY - API calls will be implemented later
 */
export default function PaymentMethodCard({ 
  paymentMethod,
  isLoading = false 
}: PaymentMethodCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  // Get card brand icon and name
  const getCardBrandInfo = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return { name: 'Visa', color: 'text-blue-600' };
      case 'mastercard':
        return { name: 'Mastercard', color: 'text-orange-600' };
      case 'amex':
        return { name: 'American Express', color: 'text-blue-500' };
      case 'discover':
        return { name: 'Discover', color: 'text-orange-500' };
      default:
        return { name: 'Card', color: 'text-gray-600' };
    }
  };

  // Check if card is expiring soon (within 2 months)
  const isExpiringSoon = (expMonth: number, expYear: number) => {
    const now = new Date();
    const expiry = new Date(expYear, expMonth - 1);
    const monthsUntilExpiry = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30);
    return monthsUntilExpiry < 2 && monthsUntilExpiry > 0;
  };

  // Check if card is expired
  const isExpired = (expMonth: number, expYear: number) => {
    const now = new Date();
    const expiry = new Date(expYear, expMonth - 1);
    return expiry < now;
  };

  const handleUpdatePaymentMethod = async () => {
    setIsUpdating(true);
    
    try {
      // TODO: Implement Stripe Elements payment method update flow
      // This will require:
      // 1. Opening a modal with Stripe CardElement
      // 2. Collecting new payment method
      // 3. Calling updatePaymentMethod API endpoint
      // 4. Updating Firestore with new payment method details
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('TODO: Implement payment method update');
      // For now, just show alert
      alert('Payment method update coming soon! This will open a secure Stripe form.');
      
    } catch (error) {
      console.error('Error updating payment method:', error);
      alert('Failed to update payment method. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-bold text-gray-900">Payment Method</h3>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-20 bg-gray-100 rounded-lg"></div>
          <div className="h-10 bg-gray-100 rounded-lg w-1/3"></div>
        </div>
      </div>
    );
  }

  // Empty state - no payment method
  if (!paymentMethod) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-bold text-gray-900">Payment Method</h3>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 mb-4">
            No payment method on file
          </p>
          <Button
            variant="primary"
            onClick={handleUpdatePaymentMethod}
            disabled={isUpdating}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      </div>
    );
  }

  const brandInfo = getCardBrandInfo(paymentMethod.brand);
  const expiring = isExpiringSoon(paymentMethod.expMonth, paymentMethod.expYear);
  const expired = isExpired(paymentMethod.expMonth, paymentMethod.expYear);

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <CreditCard className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-bold text-gray-900">Payment Method</h3>
        </div>
      </div>

      {/* Card Display */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 mb-4 border-2 border-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className={`w-6 h-6 ${brandInfo.color}`} />
              <span className={`font-bold ${brandInfo.color}`}>
                {brandInfo.name}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 tracking-wider mb-2">
              •••• •••• •••• {paymentMethod.last4}
            </div>
            <div className="text-sm text-gray-600">
              Expires {String(paymentMethod.expMonth).padStart(2, '0')}/{paymentMethod.expYear}
            </div>
          </div>

          {/* Status Badge */}
          {expired ? (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 border border-red-300">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-xs font-semibold text-red-600">Expired</span>
            </div>
          ) : expiring ? (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 border border-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-semibold text-amber-600">Expiring Soon</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 border border-green-300">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-xs font-semibold text-green-600">Active</span>
            </div>
          )}
        </div>
      </div>

      {/* Warning Banner for Expiring/Expired Cards */}
      {(expiring || expired) && (
        <div className={`rounded-lg p-4 mb-4 ${
          expired 
            ? 'bg-red-50 border-2 border-red-200' 
            : 'bg-amber-50 border-2 border-amber-200'
        }`}>
          <div className="flex gap-3">
            <AlertCircle className={`w-5 h-5 flex-shrink-0 ${
              expired ? 'text-red-600' : 'text-amber-600'
            }`} />
            <div>
              <p className={`text-sm font-semibold mb-1 ${
                expired ? 'text-red-900' : 'text-amber-900'
              }`}>
                {expired ? 'Payment Method Expired' : 'Payment Method Expiring Soon'}
              </p>
              <p className={`text-xs ${
                expired ? 'text-red-700' : 'text-amber-700'
              }`}>
                {expired 
                  ? 'Your card has expired. Please update your payment method to continue your subscription.'
                  : 'Your card expires soon. Update it now to avoid any service interruption.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Update Button */}
      <Button
        variant="ghost"
        onClick={handleUpdatePaymentMethod}
        disabled={isUpdating}
        className="w-full"
      >
        <Edit3 className="w-4 h-4 mr-2" />
        {isUpdating ? 'Updating...' : 'Update Payment Method'}
      </Button>

      {/* Help Text */}
      <p className="text-xs text-gray-500 text-center mt-3">
        Secured by Stripe • Your payment information is encrypted
      </p>
    </div>
  );
}
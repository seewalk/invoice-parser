'use client';

import React, { useState } from 'react';
import { Receipt, Download, CheckCircle, XCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface BillingItem {
  id: string;
  date: Date;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
  invoiceUrl?: string;
}

interface BillingHistoryCardProps {
  billingHistory: BillingItem[];
  isLoading?: boolean;
}

/**
 * BillingHistoryCard Component
 * 
 * Displays past billing history with invoice downloads.
 * 
 * Features:
 * - Table of past payments
 * - Status indicators (paid, pending, failed)
 * - Download receipt buttons
 * - Pagination controls
 * - Empty state with illustration
 * 
 * Phase 4: FRONTEND ONLY - Using mock data, API calls will be implemented later
 */
export default function BillingHistoryCard({ 
  billingHistory = [],
  isLoading = false 
}: BillingHistoryCardProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data for demonstration (TODO: Replace with actual API data)
  const mockBillingHistory: BillingItem[] = billingHistory.length > 0 ? billingHistory : [
    {
      id: 'inv_001',
      date: new Date('2024-10-01'),
      amount: 29.00,
      status: 'paid',
      description: 'Pro Monthly Subscription',
      invoiceUrl: 'https://example.com/invoice/001'
    },
    {
      id: 'inv_002',
      date: new Date('2024-09-01'),
      amount: 29.00,
      status: 'paid',
      description: 'Pro Monthly Subscription',
      invoiceUrl: 'https://example.com/invoice/002'
    },
    {
      id: 'inv_003',
      date: new Date('2024-08-01'),
      amount: 29.00,
      status: 'paid',
      description: 'Pro Monthly Subscription',
      invoiceUrl: 'https://example.com/invoice/003'
    },
  ];

  // Pagination calculations
  const totalPages = Math.ceil(mockBillingHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = mockBillingHistory.slice(startIndex, endIndex);

  // Format currency
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Get status badge
  const getStatusBadge = (status: BillingItem['status']) => {
    switch (status) {
      case 'paid':
        return (
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 border border-green-300">
            <CheckCircle className="w-3 h-3 text-green-600" />
            <span className="text-xs font-semibold text-green-600">Paid</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 border border-amber-300">
            <Clock className="w-3 h-3 text-amber-600" />
            <span className="text-xs font-semibold text-amber-600">Pending</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 border border-red-300">
            <XCircle className="w-3 h-3 text-red-600" />
            <span className="text-xs font-semibold text-red-600">Failed</span>
          </div>
        );
    }
  };

  // Handle invoice download
  const handleDownloadInvoice = async (invoiceId: string, invoiceUrl?: string) => {
    try {
      // TODO: Implement actual invoice download from Stripe
      // This will require:
      // 1. Calling Lambda API to get invoice PDF URL
      // 2. Downloading the PDF file
      // 3. Opening it in a new tab or triggering download
      
      console.log('TODO: Download invoice', invoiceId);
      
      // For now, just show alert
      alert(`Invoice download coming soon! Invoice ID: ${invoiceId}`);
      
      // In production, this would look like:
      // const response = await fetch(`/api/stripe/invoice/${invoiceId}`);
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // window.open(url, '_blank');
      
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Failed to download invoice. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Receipt className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-bold text-gray-900">Billing History</h3>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-12 bg-gray-100 rounded-lg"></div>
          <div className="h-12 bg-gray-100 rounded-lg"></div>
          <div className="h-12 bg-gray-100 rounded-lg"></div>
        </div>
      </div>
    );
  }

  // Empty state
  if (mockBillingHistory.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Receipt className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-bold text-gray-900">Billing History</h3>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-2 font-semibold">No billing history yet</p>
          <p className="text-sm text-gray-500">
            Your payment history will appear here once you subscribe
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Receipt className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-bold text-gray-900">Billing History</h3>
        </div>
        <span className="text-sm text-gray-500">
          {mockBillingHistory.length} invoice{mockBillingHistory.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Description</th>
              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Amount</th>
              <th className="text-center py-3 px-4 text-sm font-bold text-gray-700">Status</th>
              <th className="text-right py-3 px-4 text-sm font-bold text-gray-700">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 text-sm text-gray-900">
                  {formatDate(item.date)}
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  {item.description}
                </td>
                <td className="py-4 px-4 text-sm font-semibold text-gray-900">
                  {formatAmount(item.amount)}
                </td>
                <td className="py-4 px-4 text-center">
                  {getStatusBadge(item.status)}
                </td>
                <td className="py-4 px-4 text-right">
                  {item.status === 'paid' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadInvoice(item.id, item.invoiceUrl)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {currentItems.map((item) => (
          <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-1">
                  {item.description}
                </div>
                <div className="text-xs text-gray-500">
                  {formatDate(item.date)}
                </div>
              </div>
              {getStatusBadge(item.status)}
            </div>
            <div className="flex justify-between items-center">
              <div className="text-lg font-bold text-gray-900">
                {formatAmount(item.amount)}
              </div>
              {item.status === 'paid' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownloadInvoice(item.id, item.invoiceUrl)}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Footer Note */}
      <p className="text-xs text-gray-500 text-center mt-4">
        Need help with a payment? Contact support with the invoice ID
      </p>
    </div>
  );
}
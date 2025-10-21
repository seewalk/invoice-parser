'use client';

/**
 * Account Dashboard Page
 * 
 * Comprehensive user account management:
 * - Overview: Plan, quotas, quick stats
 * - Usage Analytics: Full history with filters
 * - Invoice History: Generated invoices
 * - Parser History: Parsed invoices
 * - Profile Settings: Update account info
 * - Billing: Plan management
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/firebase/AuthContext';
import { useQuota } from '@/app/hooks/useQuota';
import { useUsageHistory } from '@/app/hooks/useUsageHistory';
import Link from 'next/link';
import {
  User,
  CreditCard,
  Activity,
  FileText,
  Download,
  Settings,
  BarChart3,
  ArrowLeft,
  Sparkles,
  FileCheck,
  Zap,
  Crown,
  TrendingUp,
  Calendar,
  Filter,
  RefreshCw
} from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, loading: authLoading, userQuotas, logout } = useAuth();
  const { getRemaining, hasUnlimitedAccess } = useQuota();
  const { history, loading: historyLoading, filteredHistory, filterByType, filterByDateRange, refresh } = useUsageHistory();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'usage' | 'invoices' | 'parsed' | 'profile' | 'billing'>('overview');
  const [typeFilter, setTypeFilter] = useState<'all' | 'invoiceParses' | 'templateDownloads' | 'generatorUses'>('all');

  // Redirect if not authenticated
  if (!authLoading && !user) {
    router.push('/sign-in?redirect=/account');
    return null;
  }

  if (authLoading || !user || !userQuotas) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-slate-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  // Calculate usage statistics
  const parserHistory = filteredHistory.filter(r => r.type === 'invoiceParses');
  const templateHistory = filteredHistory.filter(r => r.type === 'templateDownloads');
  const generatorHistory = filteredHistory.filter(r => r.type === 'generatorUses');

  const totalUsage = history.length;
  const thisMonthUsage = history.filter(r => {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    return r.timestamp >= monthAgo;
  }).length;

  // Get plan details
  const planDetails = {
    free: { name: 'Free Plan', color: 'text-slate-600', bg: 'bg-slate-100', icon: User },
    starter: { name: 'Starter Plan', color: 'text-blue-600', bg: 'bg-blue-100', icon: Sparkles },
    pro: { name: 'Pro Plan', color: 'text-purple-600', bg: 'bg-purple-100', icon: Crown },
    enterprise: { name: 'Enterprise Plan', color: 'text-amber-600', bg: 'bg-amber-100', icon: TrendingUp }
  };

  const currentPlan = planDetails[userQuotas.plan];
  const PlanIcon = currentPlan.icon;

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Date', 'Type', 'Details', 'Plan', 'Quota Remaining'];
    const rows = filteredHistory.map(record => [
      record.timestamp.toLocaleString(),
      record.type,
      JSON.stringify(record.metadata || {}),
      record.plan || userQuotas.plan,
      record.quotaRemaining?.toString() || 'N/A'
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elektroluma-usage-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-slate-300" />
              <div>
                <h1 className="text-lg font-bold text-slate-900">My Account</h1>
                <p className="text-xs text-slate-600">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full ${currentPlan.bg} ${currentPlan.color} text-sm font-semibold flex items-center gap-2`}>
                <PlanIcon className="w-4 h-4" />
                {currentPlan.name}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'usage', label: 'Usage History', icon: Activity },
              { id: 'invoices', label: 'Invoices', icon: FileText },
              { id: 'parsed', label: 'Parsed Data', icon: FileCheck },
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'billing', label: 'Billing', icon: CreditCard }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Account Overview</h2>
              <p className="text-slate-600">Welcome back, {userQuotas.name || 'there'}!</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Parser Quota */}
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <FileCheck className="w-8 h-8 text-blue-600" />
                  {hasUnlimitedAccess && <Sparkles className="w-5 h-5 text-primary-600" />}
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">Invoice Parser</h3>
                <p className="text-3xl font-bold text-slate-900">
                  {hasUnlimitedAccess ? '∞' : getRemaining('invoiceParses')}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {hasUnlimitedAccess ? 'Unlimited parses' : `of 5 parses remaining`}
                </p>
              </div>

              {/* Template Downloads */}
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Download className="w-8 h-8 text-green-600" />
                  {hasUnlimitedAccess && <Sparkles className="w-5 h-5 text-primary-600" />}
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">Templates</h3>
                <p className="text-3xl font-bold text-slate-900">
                  {hasUnlimitedAccess ? '∞' : getRemaining('templateDownloads')}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {hasUnlimitedAccess ? 'Unlimited downloads' : `of 3 downloads remaining`}
                </p>
              </div>

              {/* Generator Uses */}
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                  {hasUnlimitedAccess && <Sparkles className="w-5 h-5 text-primary-600" />}
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">Generator</h3>
                <p className="text-3xl font-bold text-slate-900">
                  {hasUnlimitedAccess ? '∞' : getRemaining('generatorUses')}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {hasUnlimitedAccess ? 'Unlimited uses' : `of 5 uses remaining`}
                </p>
              </div>

              {/* Total Usage */}
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">Total Usage</h3>
                <p className="text-3xl font-bold text-slate-900">{totalUsage}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {thisMonthUsage} this month
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/parser"
                  className="flex items-center gap-3 p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition"
                >
                  <FileCheck className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Parse Invoice</p>
                    <p className="text-xs text-slate-600">Extract data from PDFs</p>
                  </div>
                </Link>
                <Link
                  href="/invoice-templates"
                  className="flex items-center gap-3 p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition"
                >
                  <Download className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Download Template</p>
                    <p className="text-xs text-slate-600">Professional templates</p>
                  </div>
                </Link>
                <Link
                  href="/invoice-generator"
                  className="flex items-center gap-3 p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition"
                >
                  <Zap className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Generate Invoice</p>
                    <p className="text-xs text-slate-600">Create custom invoices</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Upgrade CTA (if free plan) */}
            {userQuotas.plan === 'free' && (
              <div className="bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl shadow-lg border border-primary-200 p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Upgrade to Unlimited</h3>
                    <p className="text-primary-100 mb-4">
                      Get unlimited access to all features. No more quotas, no limits.
                    </p>
                    <Link
                      href="/pricing"
                      className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
                    >
                      <Crown className="w-5 h-5" />
                      View Pricing Plans
                    </Link>
                  </div>
                  <Crown className="w-24 h-24 text-white opacity-20" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* USAGE HISTORY TAB */}
        {activeTab === 'usage' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Usage History</h2>
                <p className="text-slate-600">Track your activity across all features</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={refresh}
                  className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Filter:</span>
                </div>
                {(['all', 'invoiceParses', 'templateDownloads', 'generatorUses'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setTypeFilter(type);
                      filterByType(type);
                    }}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      typeFilter === type
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {type === 'all' ? 'All' : type === 'invoiceParses' ? 'Parser' : type === 'templateDownloads' ? 'Templates' : 'Generator'}
                  </button>
                ))}
              </div>
            </div>

            {/* Usage Table */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              {historyLoading ? (
                <div className="p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
                  <p className="text-slate-600">Loading usage history...</p>
                </div>
              ) : filteredHistory.length === 0 ? (
                <div className="p-8 text-center">
                  <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">No usage history yet</p>
                  <p className="text-sm text-slate-500 mt-1">Start using the platform to see your activity here</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Feature
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Quota
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredHistory.map((record) => (
                        <tr key={record.id} className="hover:bg-slate-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            {record.timestamp.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              record.type === 'invoiceParses' ? 'bg-blue-100 text-blue-700' :
                              record.type === 'templateDownloads' ? 'bg-green-100 text-green-700' :
                              'bg-purple-100 text-purple-700'
                            }`}>
                              {record.type === 'invoiceParses' ? 'Parser' :
                               record.type === 'templateDownloads' ? 'Template' :
                               'Generator'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {record.type === 'invoiceParses' && record.metadata?.invoiceNumber && (
                              <span>Invoice #{record.metadata.invoiceNumber} • {record.metadata.supplier}</span>
                            )}
                            {record.type === 'templateDownloads' && record.metadata?.templateName && (
                              <span>{record.metadata.templateName}</span>
                            )}
                            {record.type === 'generatorUses' && record.metadata?.invoiceNumber && (
                              <span>Invoice #{record.metadata.invoiceNumber} • {record.metadata.clientName}</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                            {record.plan === 'free' && record.quotaRemaining !== undefined 
                              ? `${record.quotaRemaining} left`
                              : record.plan || 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* INVOICES TAB */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Generated Invoices</h2>
              <p className="text-slate-600">Invoices you've created with the generator</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              {generatorHistory.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">No invoices generated yet</p>
                  <Link
                    href="/invoice-generator"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    <Zap className="w-4 h-4" />
                    Create Your First Invoice
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {generatorHistory.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-indigo-300 transition">
                      <div>
                        <p className="font-semibold text-slate-900">
                          Invoice #{record.metadata?.invoiceNumber || 'N/A'}
                        </p>
                        <p className="text-sm text-slate-600">
                          Client: {record.metadata?.clientName || 'Unknown'}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {record.timestamp.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">
                          £{record.metadata?.totalAmount?.toFixed(2) || '0.00'}
                        </p>
                        <Link
                          href={`/invoice-generator/${record.metadata?.templateId || ''}`}
                          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Recreate →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PARSED DATA TAB */}
        {activeTab === 'parsed' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Parsed Invoices</h2>
              <p className="text-slate-600">Invoices you've processed with the parser</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              {parserHistory.length === 0 ? (
                <div className="text-center py-8">
                  <FileCheck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">No invoices parsed yet</p>
                  <Link
                    href="/parser"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    <FileCheck className="w-4 h-4" />
                    Parse Your First Invoice
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {parserHistory.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition">
                      <div>
                        <p className="font-semibold text-slate-900">
                          Invoice #{record.metadata?.invoiceNumber || 'N/A'}
                        </p>
                        <p className="text-sm text-slate-600">
                          Supplier: {record.metadata?.supplier || 'Unknown'}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {record.timestamp.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">
                          £{record.metadata?.totalAmount?.toFixed(2) || '0.00'}
                        </p>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                          View Data →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Profile Settings</h2>
              <p className="text-slate-600">Manage your account information</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={userQuotas.name || ''}
                    disabled
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                  />
                  <p className="text-xs text-slate-500 mt-1">Contact support to change your name</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={user.email || ''}
                    disabled
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                  />
                  <p className="text-xs text-slate-500 mt-1">Contact support to change your email</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Member Since</label>
                  <input
                    type="text"
                    value={userQuotas.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}
                    disabled
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                  />
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    onClick={() => logout()}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BILLING TAB */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Billing & Subscription</h2>
              <p className="text-slate-600">Manage your plan and payment method</p>
            </div>

            {/* Current Plan */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Current Plan</h3>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <PlanIcon className={`w-8 h-8 ${currentPlan.color}`} />
                  <div>
                    <p className="font-semibold text-slate-900">{currentPlan.name}</p>
                    <p className="text-sm text-slate-600">
                      {userQuotas.plan === 'free' ? 'Limited features' : 'Unlimited access to all features'}
                    </p>
                  </div>
                </div>
                {userQuotas.plan === 'free' && (
                  <Link
                    href="/pricing"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                  >
                    Upgrade Now
                  </Link>
                )}
              </div>
            </div>

            {/* Upgrade Options */}
            {userQuotas.plan === 'free' && (
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg border border-indigo-200 p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Upgrade to Premium</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-bold text-lg text-slate-900 mb-2">Starter</h4>
                    <p className="text-3xl font-bold text-indigo-600 mb-4">£9.99<span className="text-sm text-slate-600">/mo</span></p>
                    <ul className="space-y-2 text-sm text-slate-600 mb-4">
                      <li>✓ 50 parses/month</li>
                      <li>✓ 20 downloads/month</li>
                      <li>✓ 50 invoices/month</li>
                    </ul>
                    <Link href="/pricing" className="block text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                      Choose Plan
                    </Link>
                  </div>
                  <div className="bg-white rounded-lg p-6 border-2 border-indigo-600">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg text-slate-900">Pro</h4>
                      <span className="text-xs font-semibold px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">Popular</span>
                    </div>
                    <p className="text-3xl font-bold text-indigo-600 mb-4">£29.99<span className="text-sm text-slate-600">/mo</span></p>
                    <ul className="space-y-2 text-sm text-slate-600 mb-4">
                      <li>✓ Unlimited parses</li>
                      <li>✓ Unlimited downloads</li>
                      <li>✓ Unlimited invoices</li>
                    </ul>
                    <Link href="/pricing" className="block text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                      Choose Plan
                    </Link>
                  </div>
                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-bold text-lg text-slate-900 mb-2">Enterprise</h4>
                    <p className="text-3xl font-bold text-indigo-600 mb-4">Custom</p>
                    <ul className="space-y-2 text-sm text-slate-600 mb-4">
                      <li>✓ Everything in Pro</li>
                      <li>✓ Priority support</li>
                      <li>✓ Custom integrations</li>
                    </ul>
                    <Link href="/pricing" className="block text-center px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition">
                      Contact Sales
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method Placeholder */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Payment Method</h3>
              <div className="p-6 bg-slate-50 rounded-lg text-center">
                <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">No payment method on file</p>
                <p className="text-sm text-slate-500">Upgrade to a premium plan to add payment details</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
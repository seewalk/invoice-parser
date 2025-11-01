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
import { useSubscription } from '@/app/hooks/useSubscription';
import Link from 'next/link';
import SubscriptionCard from '@/app/components/subscription/SubscriptionCard';
import PaymentMethodCard from '@/app/components/subscription/PaymentMethodCard';
import BillingHistoryCard from '@/app/components/subscription/BillingHistoryCard';
import QuotaStatsGrid from '@/app/components/account/QuotaStatsGrid';
import QuickActionsCard from '@/app/components/account/QuickActionsCard';
import UpgradeCTACard from '@/app/components/account/UpgradeCTACard';
import AccountHero from '@/app/components/account/AccountHero';
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
  const subscriptionData = useSubscription();
  
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

  // Define navigation tabs
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'usage', label: 'Usage History', icon: Activity },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'parsed', label: 'Parsed Data', icon: FileCheck },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header with AccountHero Component */}
      <AccountHero
        userEmail={user.email || ''}
        planInfo={currentPlan}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId as any)}
      />

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
            <QuotaStatsGrid
              parserRemaining={getRemaining('invoiceParses')}
              templateRemaining={getRemaining('templateDownloads')}
              generatorRemaining={getRemaining('generatorUses')}
              totalUsage={totalUsage}
              thisMonthUsage={thisMonthUsage}
              isUnlimited={hasUnlimitedAccess}
            />

            {/* Quick Actions */}
            <QuickActionsCard />

            {/* Upgrade CTA (if free plan) */}
            {userQuotas.plan === 'free' && <UpgradeCTACard />}
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

            {/* Subscription Management Card */}
            <SubscriptionCard
              subscription={subscriptionData.subscriptionId && subscriptionData.status !== 'none' ? {
                subscriptionId: subscriptionData.subscriptionId,
                status: subscriptionData.status as 'active' | 'canceled' | 'past_due' | 'unpaid',
                currentPeriodEnd: subscriptionData.currentPeriodEnd,
                cancelAtPeriodEnd: subscriptionData.cancelAtPeriodEnd,
              } : null}
              plan={subscriptionData.plan}
            />

            {/* Payment Method Card */}
            <PaymentMethodCard
              paymentMethod={subscriptionData.paymentMethod}
              isLoading={subscriptionData.isLoading}
            />

            {/* Billing History Card */}
            <BillingHistoryCard
              billingHistory={subscriptionData.billingHistory}
              isLoading={subscriptionData.isLoading}
            />

            {/* Upgrade Options - Only show for free users */}
            {userQuotas.plan === 'free' && (
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg border border-indigo-200 p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Upgrade to Premium</h3>
                <p className="text-slate-600 mb-6">
                  Choose a plan that works for you and unlock unlimited features
                </p>
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
                    <p className="text-3xl font-bold text-indigo-600 mb-4">$29.00<span className="text-sm text-slate-600">/mo</span></p>
                    <ul className="space-y-2 text-sm text-slate-600 mb-4">
                      <li>✓ Unlimited parses</li>
                      <li>✓ Unlimited downloads</li>
                      <li>✓ Unlimited invoices</li>
                      <li>✓ Priority support</li>
                    </ul>
                    <Link href="/checkout" className="block text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                      Upgrade to Pro
                    </Link>
                  </div>
                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-bold text-lg text-slate-900 mb-2">Enterprise</h4>
                    <p className="text-3xl font-bold text-indigo-600 mb-4">Custom</p>
                    <ul className="space-y-2 text-sm text-slate-600 mb-4">
                      <li>✓ Everything in Pro</li>
                      <li>✓ Priority support</li>
                      <li>✓ Custom integrations</li>
                      <li>✓ Dedicated account manager</li>
                    </ul>
                    <Link href="/pricing" className="block text-center px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition">
                      Contact Sales
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
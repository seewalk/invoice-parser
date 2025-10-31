/**
 * ============================================================================
 * ACCOUNT HERO/NAVIGATION COMPONENT
 * ============================================================================
 * 
 * Sticky hero section for account page with:
 * - User info display (email, plan badge)
 * - Back to home navigation
 * - Tabbed navigation for account sections
 * - Mobile-responsive design
 * - Uses UI design system components
 * 
 * Design Strategy:
 * - Fixed position below main header (top-16 to account for main nav)
 * - Better visibility with gradient background
 * - Tab navigation with icons
 * - Plan badge with consistent styling
 */

'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';
import type { LucideIcon } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

export interface AccountTab {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface PlanInfo {
  name: string;
  color: string;
  bg: string;
  icon: LucideIcon;
}

export interface AccountHeroProps {
  /**
   * User email to display
   */
  userEmail: string;
  
  /**
   * Current plan information
   */
  planInfo: PlanInfo;
  
  /**
   * Available tabs for navigation
   */
  tabs: AccountTab[];
  
  /**
   * Currently active tab ID
   */
  activeTab: string;
  
  /**
   * Callback when tab is clicked
   */
  onTabChange: (tabId: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function AccountHero({
  userEmail,
  planInfo,
  tabs,
  activeTab,
  onTabChange,
}: AccountHeroProps) {
  const PlanIcon = planInfo.icon;

  return (
    <div className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
          {/* Left: Back button + Title */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              <Text 
                size="sm" 
                weight="medium"
                className="hidden sm:inline"
                animate={false}
              >
                Back to Home
              </Text>
            </Link>
            
            <div className="hidden sm:block h-6 w-px bg-slate-300" />
            
            <div>
              <Heading 
                as="h1" 
                size="lg" 
                weight="bold"
                className="!text-lg sm:!text-xl"
                animate={false}
              >
                My Account
              </Heading>
              <Text 
                size="xs" 
                variant="muted"
                className="!text-xs mt-0.5"
                animate={false}
              >
                {userEmail}
              </Text>
            </div>
          </div>

          {/* Right: Plan Badge */}
          <div className="flex items-center">
            <Badge
              variant="primary"
              size="md"
              icon={<PlanIcon className="w-4 h-4" />}
              className={`${planInfo.bg} ${planInfo.color} border-0`}
            >
              {planInfo.name}
            </Badge>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide pb-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center gap-1.5 sm:gap-2 
                  px-3 sm:px-4 py-2 sm:py-2.5 
                  rounded-lg text-sm font-medium 
                  transition-all whitespace-nowrap
                  ${isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
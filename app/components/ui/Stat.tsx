/**
 * ============================================================================
 * STAT/METRIC COMPONENT
 * ============================================================================
 * 
 * Production-ready stat/metric component for displaying key metrics and statistics.
 * 
 * Features:
 * - Multiple layout variants (horizontal, vertical, card)
 * - Icon support with customizable position
 * - 6 color variants (default, primary, success, warning, error, info)
 * - 4 sizes (sm, md, lg, xl)
 * - Optional trend indicators (up, down, neutral)
 * - Optional description/label
 * - Animated (optional Framer Motion)
 * - Accessible (ARIA labels)
 * 
 * Usage:
 * ```tsx
 * <Stat value="90%" label="Faster" icon={<Zap />} variant="success" />
 * <Stat value="$2,847" label="Total Revenue" trend="up" trendValue="+12%" />
 * <Stat value="500+" label="Active Users" layout="vertical" size="lg" />
 * ```
 */

'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/app/lib/utils';

// ============================================================================
// STAT VARIANTS
// ============================================================================

const statVariants = cva(
  // Base styles (applied to all stats)
  'inline-flex items-center transition-all duration-200',
  {
    variants: {
      // Layout variants
      layout: {
        horizontal: 'flex-row gap-2',
        vertical: 'flex-col gap-1',
        card: 'flex-col gap-2 p-6 rounded-xl border',
      },
      
      // Color variants
      variant: {
        default: '',
        primary: '',
        success: '',
        warning: '',
        error: '',
        info: '',
      },
      
      // Size variants
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
    },
    
    // Default variants
    defaultVariants: {
      layout: 'horizontal',
      variant: 'default',
      size: 'md',
    },
  }
);

// Icon container variants
const iconVariants = cva(
  'inline-flex items-center justify-center rounded-full',
  {
    variants: {
      variant: {
        default: 'text-gray-600 bg-gray-100',
        primary: 'text-primary-600 bg-primary-100',
        success: 'text-success-600 bg-success-100',
        warning: 'text-warning-600 bg-warning-100',
        error: 'text-error-600 bg-error-100',
        info: 'text-info-600 bg-info-100',
      },
      size: {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Value text variants
const valueVariants = cva(
  'font-bold tracking-tight',
  {
    variants: {
      variant: {
        default: 'text-gray-900',
        primary: 'text-primary-600',
        success: 'text-success-600',
        warning: 'text-warning-600',
        error: 'text-error-600',
        info: 'text-info-600',
      },
      size: {
        sm: 'text-lg',
        md: 'text-2xl',
        lg: 'text-3xl',
        xl: 'text-4xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Label text variants
const labelVariants = cva(
  'font-medium',
  {
    variants: {
      variant: {
        default: 'text-gray-600',
        primary: 'text-primary-700',
        success: 'text-success-700',
        warning: 'text-warning-700',
        error: 'text-error-700',
        info: 'text-info-700',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Trend indicator variants
const trendVariants = cva(
  'inline-flex items-center gap-1 font-semibold',
  {
    variants: {
      trend: {
        up: 'text-success-600',
        down: 'text-error-600',
        neutral: 'text-gray-600',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
      },
    },
    defaultVariants: {
      trend: 'neutral',
      size: 'md',
    },
  }
);

// ============================================================================
// STAT PROPS
// ============================================================================

export interface StatProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof statVariants> {
  /**
   * The main value/metric to display
   */
  value: string | number;
  
  /**
   * Label/description for the stat
   */
  label?: string;
  
  /**
   * Optional icon
   */
  icon?: ReactNode;
  
  /**
   * Icon position (only for horizontal layout)
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';
  
  /**
   * Show icon with background container
   * @default true
   */
  iconWithBackground?: boolean;
  
  /**
   * Trend direction
   */
  trend?: 'up' | 'down' | 'neutral';
  
  /**
   * Trend value (e.g., "+12%", "-5%")
   */
  trendValue?: string;
  
  /**
   * Additional description text
   */
  description?: string;
  
  /**
   * Enable Framer Motion animations
   * @default true
   */
  animate?: boolean;
  
  /**
   * Animation delay in seconds
   * @default 0
   */
  animationDelay?: number;
  
  /**
   * Custom className to extend styles
   */
  className?: string;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

// ============================================================================
// STAT COMPONENT
// ============================================================================

const Stat = forwardRef<HTMLDivElement, StatProps>(
  (
    {
      value,
      label,
      icon,
      iconPosition = 'left',
      iconWithBackground = true,
      trend,
      trendValue,
      description,
      layout = 'horizontal',
      variant = 'default',
      size = 'md',
      animate = true,
      animationDelay = 0,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // Get icon size based on stat size
    const getIconSize = () => {
      switch (size) {
        case 'sm': return 16;
        case 'md': return 20;
        case 'lg': return 24;
        case 'xl': return 32;
        default: return 20;
      }
    };
    
    // Render icon
    const renderIcon = () => {
      if (!icon) return null;
      
      if (iconWithBackground) {
        return (
          <div className={cn(iconVariants({ variant, size }))}>
            <span style={{ fontSize: getIconSize() }}>
              {icon}
            </span>
          </div>
        );
      }
      
      return (
        <span 
          className={cn(
            'inline-flex items-center',
            variant === 'primary' && 'text-primary-600',
            variant === 'success' && 'text-success-600',
            variant === 'warning' && 'text-warning-600',
            variant === 'error' && 'text-error-600',
            variant === 'info' && 'text-info-600',
            variant === 'default' && 'text-gray-600'
          )}
          style={{ fontSize: getIconSize() }}
        >
          {icon}
        </span>
      );
    };
    
    // Render trend indicator
    const renderTrend = () => {
      if (!trend || !trendValue) return null;
      
      const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
      const iconSize = size === 'sm' ? 12 : size === 'xl' ? 20 : 16;
      
      return (
        <span className={cn(trendVariants({ trend, size }))}>
          <TrendIcon size={iconSize} aria-hidden="true" />
          {trendValue}
        </span>
      );
    };
    
    // Build className
    const statClassName = cn(
      statVariants({ layout, variant, size }),
      layout === 'card' && variant === 'default' && 'bg-white border-gray-200',
      layout === 'card' && variant === 'primary' && 'bg-primary-50 border-primary-200',
      layout === 'card' && variant === 'success' && 'bg-success-50 border-success-200',
      layout === 'card' && variant === 'warning' && 'bg-warning-50 border-warning-200',
      layout === 'card' && variant === 'error' && 'bg-error-50 border-error-200',
      layout === 'card' && variant === 'info' && 'bg-info-50 border-info-200',
      className
    );
    
    // Stat content
    const statContent = (
      <>
        {/* Icon (left position for horizontal layout) */}
        {icon && layout === 'horizontal' && iconPosition === 'left' && renderIcon()}
        
        {/* Icon (top for vertical/card layouts) */}
        {icon && (layout === 'vertical' || layout === 'card') && renderIcon()}
        
        {/* Content container */}
        <div className={cn(
          'flex flex-col',
          layout === 'horizontal' && 'gap-0.5',
          layout === 'vertical' && 'gap-1',
          layout === 'card' && 'gap-1 w-full'
        )}>
          {/* Value */}
          <div className="flex items-baseline gap-2">
            <span className={cn(valueVariants({ variant, size }))}>
              {value}
            </span>
            {renderTrend()}
          </div>
          
          {/* Label */}
          {label && (
            <span className={cn(labelVariants({ variant, size }))}>
              {label}
            </span>
          )}
          
          {/* Description (only for card layout) */}
          {description && layout === 'card' && (
            <p className={cn(
              'text-gray-600 mt-1',
              size === 'sm' && 'text-xs',
              size === 'md' && 'text-sm',
              size === 'lg' && 'text-base',
              size === 'xl' && 'text-lg'
            )}>
              {description}
            </p>
          )}
        </div>
        
        {/* Icon (right position for horizontal layout) */}
        {icon && layout === 'horizontal' && iconPosition === 'right' && renderIcon()}
      </>
    );
    
    // Animation variants
    const animationVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.4,
          delay: animationDelay,
          ease: [0.4, 0, 0.2, 1] as any
        }
      },
    };
    
    // Choose component type (animated or static)
    if (animate) {
      return (
        <motion.div
          ref={ref}
          className={statClassName}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={animationVariants}
          aria-label={ariaLabel || `${label}: ${value}`}
          {...(props as HTMLMotionProps<'div'>)}
        >
          {statContent}
        </motion.div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={statClassName}
        aria-label={ariaLabel || `${label}: ${value}`}
        {...props}
      >
        {statContent}
      </div>
    );
  }
);

Stat.displayName = 'Stat';

// ============================================================================
// EXPORTS
// ============================================================================

export { Stat, statVariants };
export default Stat;

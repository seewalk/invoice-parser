/**
 * ============================================================================
 * BADGE COMPONENT
 * ============================================================================
 * 
 * Production-ready badge component with multiple variants, sizes, and states.
 * 
 * Features:
 * - 8 variants (default, primary, secondary, accent, success, warning, error, info)
 * - 4 sizes (xs, sm, md, lg)
 * - Optional icon support (left/right)
 * - Optional dot indicator
 * - Optional close/remove button
 * - Pill and square shapes
 * - Outlined style option
 * - Clickable badge support
 * - Animated (optional)
 * 
 * Usage:
 * ```tsx
 * <Badge variant="primary">New</Badge>
 * <Badge variant="success" size="lg" dot>Active</Badge>
 * <Badge variant="warning" icon={<AlertTriangle />}>Warning</Badge>
 * <Badge variant="error" onRemove={() => {}}>Removable</Badge>
 * ```
 */

'use client';

import { forwardRef, HTMLAttributes, ReactNode, MouseEvent } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/app/lib/utils';

// ============================================================================
// BADGE VARIANTS
// ============================================================================

const badgeVariants = cva(
  // Base styles (applied to all badges)
  'inline-flex items-center font-medium transition-all duration-200 select-none',
  {
    variants: {
      // Badge style variants
      variant: {
        default: cn(
          'bg-gray-100 text-gray-700',
          'border border-gray-200',
          'hover:bg-gray-200'
        ),
        primary: cn(
          'bg-primary-50 text-primary-700',
          'border border-primary-200',
          'hover:bg-primary-100'
        ),
        secondary: cn(
          'bg-slate-100 text-slate-700',
          'border border-slate-200',
          'hover:bg-slate-200'
        ),
        accent: cn(
          'bg-accent-50 text-accent-700',
          'border border-accent-200',
          'hover:bg-accent-100'
        ),
        success: cn(
          'bg-success-50 text-success-700',
          'border border-success-200',
          'hover:bg-success-100'
        ),
        warning: cn(
          'bg-warning-50 text-warning-700',
          'border border-warning-200',
          'hover:bg-warning-100'
        ),
        error: cn(
          'bg-error-50 text-error-700',
          'border border-error-200',
          'hover:bg-error-100'
        ),
        info: cn(
          'bg-info-50 text-info-700',
          'border border-info-200',
          'hover:bg-info-100'
        ),
      },
      
      // Badge size variants
      size: {
        xs: 'px-2 py-0.5 text-xs gap-1',
        sm: 'px-2.5 py-0.5 text-sm gap-1',
        md: 'px-3 py-1 text-sm gap-1.5',
        lg: 'px-4 py-1.5 text-base gap-2',
      },
      
      // Badge shape
      shape: {
        pill: 'rounded-full',
        square: 'rounded-md',
      },
      
      // Outlined style
      outlined: {
        true: 'bg-transparent',
        false: '',
      },
      
      // Clickable
      clickable: {
        true: 'cursor-pointer hover:scale-105 active:scale-95',
        false: '',
      },
    },
    
    // Default variants
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'pill',
      outlined: false,
      clickable: false,
    },
  }
);

// Dot indicator variants
const dotVariants = cva(
  'rounded-full',
  {
    variants: {
      variant: {
        default: 'bg-gray-500',
        primary: 'bg-primary-600',
        secondary: 'bg-slate-600',
        accent: 'bg-accent-500',
        success: 'bg-success-600',
        warning: 'bg-warning-600',
        error: 'bg-error-600',
        info: 'bg-info-600',
      },
      size: {
        xs: 'w-1 h-1',
        sm: 'w-1.5 h-1.5',
        md: 'w-2 h-2',
        lg: 'w-2.5 h-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// ============================================================================
// BADGE PROPS
// ============================================================================

export interface BadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'onClick'>,
    VariantProps<typeof badgeVariants> {
  /**
   * Badge content
   */
  children?: ReactNode;
  
  /**
   * Icon to display (left or right side)
   */
  icon?: ReactNode;
  
  /**
   * Position of the icon
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';
  
  /**
   * Show dot indicator
   */
  dot?: boolean;
  
  /**
   * Position of the dot
   * @default 'left'
   */
  dotPosition?: 'left' | 'right';
  
  /**
   * Enable remove/close button
   */
  onRemove?: (e: MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * Click handler - makes badge clickable
   */
  onClick?: () => void;
  
  /**
   * Enable Framer Motion animations
   * @default true
   */
  animate?: boolean;
  
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
// BADGE COMPONENT
// ============================================================================

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      shape,
      outlined,
      clickable,
      icon,
      iconPosition = 'left',
      dot = false,
      dotPosition = 'left',
      onRemove,
      onClick,
      animate = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Determine if badge is clickable
    const isClickable = clickable || !!onClick;
    
    // Build className
    const badgeClassName = cn(
      badgeVariants({ variant, size, shape, outlined, clickable: isClickable }),
      className
    );
    
    // Icon size based on badge size
    const getIconSize = () => {
      switch (size) {
        case 'xs': return 10;
        case 'sm': return 12;
        case 'md': return 14;
        case 'lg': return 16;
        default: return 14;
      }
    };
    
    // Render icon
    const renderIcon = () => {
      if (!icon) return null;
      return (
        <span className="inline-flex items-center" style={{ fontSize: getIconSize() }}>
          {icon}
        </span>
      );
    };
    
    // Render dot indicator
    const renderDot = () => {
      if (!dot) return null;
      return (
        <span 
          className={cn(dotVariants({ variant, size }))} 
          aria-hidden="true"
        />
      );
    };
    
    // Render remove button
    const renderRemoveButton = () => {
      if (!onRemove) return null;
      return (
        <button
          type="button"
          onClick={onRemove}
          className={cn(
            'inline-flex items-center justify-center rounded-full',
            'hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-current',
            'transition-colors',
            size === 'xs' && 'w-3 h-3',
            size === 'sm' && 'w-3.5 h-3.5',
            size === 'md' && 'w-4 h-4',
            size === 'lg' && 'w-5 h-5'
          )}
          aria-label="Remove badge"
        >
          <X size={getIconSize()} />
        </button>
      );
    };
    
    // Badge content
    const badgeContent = (
      <>
        {dot && dotPosition === 'left' && renderDot()}
        {icon && iconPosition === 'left' && renderIcon()}
        {children && <span>{children}</span>}
        {icon && iconPosition === 'right' && renderIcon()}
        {dot && dotPosition === 'right' && renderDot()}
        {renderRemoveButton()}
      </>
    );
    
    // Handle click
    const handleClick = onClick ? () => onClick() : undefined;
    
    // Choose component type (animated or static)
    if (animate) {
      return (
        <motion.span
          ref={ref}
          className={badgeClassName}
          onClick={handleClick}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          whileHover={isClickable ? { scale: 1.05 } : undefined}
          whileTap={isClickable ? { scale: 0.95 } : undefined}
          {...(props as HTMLMotionProps<'span'>)}
        >
          {badgeContent}
        </motion.span>
      );
    }
    
    return (
      <span
        ref={ref}
        className={badgeClassName}
        onClick={handleClick}
        {...props}
      >
        {badgeContent}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// ============================================================================
// EXPORTS
// ============================================================================

export { Badge, badgeVariants };
export default Badge;
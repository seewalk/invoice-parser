/**
 * ============================================================================
 * BUTTON COMPONENT
 * ============================================================================
 * 
 * Production-ready button component with multiple variants, sizes, and states.
 * 
 * Features:
 * - 5 variants (primary, secondary, accent, ghost, danger)
 * - 4 sizes (sm, md, lg, xl)
 * - Loading state
 * - Disabled state
 * - Icon support (left/right)
 * - Full width option
 * - Accessible (ARIA labels, keyboard navigation)
 * - Animated (optional Framer Motion)
 * 
 * Usage:
 * ```tsx
 * <Button variant="primary" size="lg">Click Me</Button>
 * <Button variant="secondary" loading>Processing...</Button>
 * <Button variant="accent" icon={<Star />} iconPosition="left">Featured</Button>
 * ```
 */

'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Utility to merge classNames properly
 */
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ============================================================================
// BUTTON VARIANTS
// ============================================================================

const buttonVariants = cva(
  // Base styles (applied to all buttons)
  'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none',
  {
    variants: {
      // Button style variants
      variant: {
        primary: cn(
          'bg-gradient-to-r from-primary-600 to-primary-700',
          'text-white',
          'shadow-lg hover:shadow-xl',
          'hover:-translate-y-0.5',
          'focus:ring-primary-500',
          'active:scale-95'
        ),
        secondary: cn(
          'border-2 border-primary-600',
          'text-primary-600 bg-white',
          'hover:bg-primary-50',
          'focus:ring-primary-500',
          'active:bg-primary-100'
        ),
        accent: cn(
          'bg-gradient-to-r from-accent-400 to-accent-500',
          'text-slate-900',
          'shadow-lg hover:shadow-xl',
          'hover:-translate-y-0.5',
          'focus:ring-accent-400',
          'active:scale-95'
        ),
        ghost: cn(
          'text-primary-600 bg-transparent',
          'hover:bg-primary-50',
          'focus:ring-primary-500',
          'active:bg-primary-100'
        ),
        danger: cn(
          'bg-gradient-to-r from-error-500 to-error-600',
          'text-white',
          'shadow-lg hover:shadow-xl',
          'hover:-translate-y-0.5',
          'focus:ring-error-500',
          'active:scale-95'
        ),
      },
      
      // Button size variants
      size: {
        sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
        md: 'px-6 py-3 text-base rounded-xl gap-2',
        lg: 'px-8 py-4 text-lg rounded-xl gap-2',
        xl: 'px-10 py-5 text-xl rounded-2xl gap-3',
      },
      
      // Full width option
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      
      // Rounded button (pill shape)
      rounded: {
        true: 'rounded-button',
        false: '',
      },
    },
    
    // Default variants
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      rounded: true,
    },
  }
);

// ============================================================================
// BUTTON PROPS
// ============================================================================

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof buttonVariants> {
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
   * Loading state - shows spinner
   */
  loading?: boolean;
  
  /**
   * Disabled state
   */
  disabled?: boolean;
  
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
   * Button content
   */
  children?: ReactNode;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      fullWidth,
      rounded,
      icon,
      iconPosition = 'left',
      loading = false,
      disabled = false,
      animate = true,
      className,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Determine if button should be disabled
    const isDisabled = disabled || loading;
    
    // Build className
    const buttonClassName = cn(
      buttonVariants({ variant, size, fullWidth, rounded }),
      className
    );
    
    // Render icon or loading spinner
    const renderIcon = () => {
      if (loading) {
        return <Loader2 className="animate-spin" size={size === 'sm' ? 16 : size === 'xl' ? 24 : 20} />;
      }
      if (icon) {
        return icon;
      }
      return null;
    };
    
    // Button content
    const buttonContent = (
      <>
        {(icon || loading) && iconPosition === 'left' && renderIcon()}
        {children && <span>{children}</span>}
        {icon && !loading && iconPosition === 'right' && renderIcon()}
      </>
    );
    
    // Choose component type (animated or static)
    if (animate) {
      return (
        <motion.button
          ref={ref}
          type={type}
          className={buttonClassName}
          disabled={isDisabled}
          whileHover={!isDisabled ? { scale: 1.02 } : undefined}
          whileTap={!isDisabled ? { scale: 0.98 } : undefined}
          {...(props as HTMLMotionProps<'button'>)}
        >
          {buttonContent}
        </motion.button>
      );
    }
    
    return (
      <button
        ref={ref}
        type={type}
        className={buttonClassName}
        disabled={isDisabled}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ============================================================================
// EXPORTS
// ============================================================================

export { Button, buttonVariants };
export default Button;
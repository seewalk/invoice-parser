/**
 * ============================================================================
 * ICONBOX COMPONENT
 * ============================================================================
 * 
 * Production-ready icon container component for consistent icon presentation.
 * 
 * Features:
 * - 8 color variants (default, primary, secondary, accent, success, warning, error, info)
 * - 5 sizes (xs, sm, md, lg, xl)
 * - Multiple style variants (solid, gradient, outline, ghost)
 * - Border radius options (square, rounded, full)
 * - Shadow/elevation support
 * - Hover effects (lift, glow, scale)
 * - Animated (optional Framer Motion)
 * - Clickable support
 * - Full accessibility
 * 
 * Usage:
 * ```tsx
 * <IconBox icon={<Zap />} variant="primary" size="lg" style="gradient" />
 * <IconBox icon={<Shield />} variant="success" hover="glow" />
 * <IconBox icon={<Star />} variant="accent" rounded="full" />
 * ```
 */

'use client';

import { forwardRef, HTMLAttributes, ReactNode, MouseEvent } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/app/lib/utils';

// ============================================================================
// ICONBOX VARIANTS
// ============================================================================

const iconBoxVariants = cva(
  // Base styles (applied to all icon boxes)
  'inline-flex items-center justify-center transition-all duration-300',
  {
    variants: {
      // Color variants
      variant: {
        default: '',
        primary: '',
        secondary: '',
        accent: '',
        success: '',
        warning: '',
        error: '',
        info: '',
      },
      
      // Style variants
      style: {
        solid: '',
        gradient: '',
        outline: 'border-2',
        ghost: '',
      },
      
      // Size variants
      size: {
        xs: 'w-8 h-8',
        sm: 'w-10 h-10',
        md: 'w-12 h-12',
        lg: 'w-14 h-14',
        xl: 'w-16 h-16',
        '2xl': 'w-20 h-20',
      },
      
      // Border radius
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        full: 'rounded-full',
      },
      
      // Shadow elevation
      shadow: {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
      },
      
      // Hover effects
      hover: {
        none: '',
        lift: 'hover:-translate-y-1',
        glow: '',
        scale: 'hover:scale-110',
      },
      
      // Clickable
      clickable: {
        true: 'cursor-pointer',
        false: '',
      },
    },
    
    // Compound variants (combining style + variant)
    compoundVariants: [
      // Solid variants
      {
        style: 'solid',
        variant: 'default',
        className: 'bg-gray-100 text-gray-600',
      },
      {
        style: 'solid',
        variant: 'primary',
        className: 'bg-primary-100 text-primary-600',
      },
      {
        style: 'solid',
        variant: 'secondary',
        className: 'bg-slate-100 text-slate-600',
      },
      {
        style: 'solid',
        variant: 'accent',
        className: 'bg-accent-100 text-accent-600',
      },
      {
        style: 'solid',
        variant: 'success',
        className: 'bg-success-100 text-success-600',
      },
      {
        style: 'solid',
        variant: 'warning',
        className: 'bg-warning-100 text-warning-600',
      },
      {
        style: 'solid',
        variant: 'error',
        className: 'bg-error-100 text-error-600',
      },
      {
        style: 'solid',
        variant: 'info',
        className: 'bg-info-100 text-info-600',
      },
      
      // Gradient variants
      {
        style: 'gradient',
        variant: 'default',
        className: 'bg-gradient-to-br from-gray-500 to-gray-600 text-white',
      },
      {
        style: 'gradient',
        variant: 'primary',
        className: 'bg-gradient-to-br from-primary-600 to-primary-700 text-white',
      },
      {
        style: 'gradient',
        variant: 'secondary',
        className: 'bg-gradient-to-br from-slate-600 to-slate-700 text-white',
      },
      {
        style: 'gradient',
        variant: 'accent',
        className: 'bg-gradient-to-br from-accent-400 to-accent-500 text-slate-900',
      },
      {
        style: 'gradient',
        variant: 'success',
        className: 'bg-gradient-to-br from-success-500 to-success-600 text-white',
      },
      {
        style: 'gradient',
        variant: 'warning',
        className: 'bg-gradient-to-br from-warning-500 to-warning-600 text-white',
      },
      {
        style: 'gradient',
        variant: 'error',
        className: 'bg-gradient-to-br from-error-500 to-error-600 text-white',
      },
      {
        style: 'gradient',
        variant: 'info',
        className: 'bg-gradient-to-br from-info-500 to-info-600 text-white',
      },
      
      // Outline variants
      {
        style: 'outline',
        variant: 'default',
        className: 'border-gray-300 text-gray-600 bg-transparent',
      },
      {
        style: 'outline',
        variant: 'primary',
        className: 'border-primary-300 text-primary-600 bg-transparent',
      },
      {
        style: 'outline',
        variant: 'secondary',
        className: 'border-slate-300 text-slate-600 bg-transparent',
      },
      {
        style: 'outline',
        variant: 'accent',
        className: 'border-accent-300 text-accent-600 bg-transparent',
      },
      {
        style: 'outline',
        variant: 'success',
        className: 'border-success-300 text-success-600 bg-transparent',
      },
      {
        style: 'outline',
        variant: 'warning',
        className: 'border-warning-300 text-warning-600 bg-transparent',
      },
      {
        style: 'outline',
        variant: 'error',
        className: 'border-error-300 text-error-600 bg-transparent',
      },
      {
        style: 'outline',
        variant: 'info',
        className: 'border-info-300 text-info-600 bg-transparent',
      },
      
      // Ghost variants
      {
        style: 'ghost',
        variant: 'default',
        className: 'text-gray-600 bg-transparent hover:bg-gray-100',
      },
      {
        style: 'ghost',
        variant: 'primary',
        className: 'text-primary-600 bg-transparent hover:bg-primary-50',
      },
      {
        style: 'ghost',
        variant: 'secondary',
        className: 'text-slate-600 bg-transparent hover:bg-slate-50',
      },
      {
        style: 'ghost',
        variant: 'accent',
        className: 'text-accent-600 bg-transparent hover:bg-accent-50',
      },
      {
        style: 'ghost',
        variant: 'success',
        className: 'text-success-600 bg-transparent hover:bg-success-50',
      },
      {
        style: 'ghost',
        variant: 'warning',
        className: 'text-warning-600 bg-transparent hover:bg-warning-50',
      },
      {
        style: 'ghost',
        variant: 'error',
        className: 'text-error-600 bg-transparent hover:bg-error-50',
      },
      {
        style: 'ghost',
        variant: 'info',
        className: 'text-info-600 bg-transparent hover:bg-info-50',
      },
    ],
    
    // Default variants
    defaultVariants: {
      variant: 'primary',
      style: 'solid',
      size: 'md',
      rounded: 'xl',
      shadow: 'none',
      hover: 'none',
      clickable: false,
    },
  }
);

// ============================================================================
// ICONBOX PROPS
// ============================================================================

export interface IconBoxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onClick'>,
    VariantProps<typeof iconBoxVariants> {
  /**
   * Icon to display (Lucide icon component)
   */
  icon: ReactNode;
  
  /**
   * Click handler - makes icon box clickable
   */
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  
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
// ICONBOX COMPONENT
// ============================================================================

const IconBox = forwardRef<HTMLDivElement, IconBoxProps>(
  (
    {
      icon,
      variant = 'primary',
      style = 'solid',
      size = 'md',
      rounded = 'xl',
      shadow = 'none',
      hover = 'none',
      clickable,
      onClick,
      animate = true,
      animationDelay = 0,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // Determine if icon box is clickable
    const isClickable = clickable || !!onClick;
    
    // Get icon size based on box size
    const getIconSize = () => {
      switch (size) {
        case 'xs': return 16;
        case 'sm': return 20;
        case 'md': return 24;
        case 'lg': return 28;
        case 'xl': return 32;
        case '2xl': return 40;
        default: return 24;
      }
    };
    
    // Build className
    const iconBoxClassName = cn(
      iconBoxVariants({ variant, style, size, rounded, shadow, hover, clickable: isClickable }),
      hover === 'glow' && variant === 'primary' && 'hover:shadow-glow',
      hover === 'glow' && variant === 'accent' && 'hover:shadow-glow-accent',
      hover === 'glow' && variant === 'success' && 'hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]',
      hover === 'glow' && variant === 'error' && 'hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]',
      className
    );
    
    // Icon content
    const iconContent = (
      <span style={{ fontSize: getIconSize(), lineHeight: 1 }}>
        {icon}
      </span>
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
          ease: 'easeOut'
        }
      },
    };
    
    // Handle click
    const handleClick = onClick ? (e: MouseEvent<HTMLDivElement>) => onClick(e) : undefined;
    
    // Choose component type (animated or static)
    if (animate) {
      return (
        <motion.div
          ref={ref}
          className={iconBoxClassName}
          onClick={handleClick}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={animationVariants}
          whileHover={isClickable ? { scale: 1.05 } : undefined}
          whileTap={isClickable ? { scale: 0.95 } : undefined}
          aria-label={ariaLabel}
          role={isClickable ? 'button' : undefined}
          tabIndex={isClickable ? 0 : undefined}
          {...(props as HTMLMotionProps<'div'>)}
        >
          {iconContent}
        </motion.div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={iconBoxClassName}
        onClick={handleClick}
        aria-label={ariaLabel}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        {...props}
      >
        {iconContent}
      </div>
    );
  }
);

IconBox.displayName = 'IconBox';

// ============================================================================
// EXPORTS
// ============================================================================

export { IconBox, iconBoxVariants };
export default IconBox;
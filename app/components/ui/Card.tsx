/**
 * ============================================================================
 * CARD COMPONENT
 * ============================================================================
 * 
 * Production-ready card component with multiple variants, sizes, and states.
 * 
 * Features:
 * - 5 variants (default, hover, gradient, glass, bordered)
 * - 4 padding sizes (sm, md, lg, xl)
 * - Optional header and footer sections
 * - Loading state with skeleton
 * - Clickable card support
 * - Shadow elevation levels
 * - Animated (optional Framer Motion)
 * - Responsive design
 * 
 * Usage:
 * ```tsx
 * <Card variant="hover">
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description text</CardDescription>
 *   </CardHeader>
 *   <CardContent>Main content goes here</CardContent>
 *   <CardFooter>Footer actions</CardFooter>
 * </Card>
 * ```
 */

'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/app/lib/utils';

// ============================================================================
// CARD VARIANTS
// ============================================================================

const cardVariants = cva(
  // Base styles (applied to all cards)
  'rounded-xl transition-all duration-300',
  {
    variants: {
      // Card style variants
      variant: {
        default: cn(
          'bg-white',
          'border border-gray-100',
          'shadow-md'
        ),
        hover: cn(
          'bg-white',
          'border border-gray-100',
          'shadow-md hover:shadow-xl',
          'hover:-translate-y-1',
          'cursor-pointer'
        ),
        gradient: cn(
          'bg-gradient-to-br from-primary-600 to-primary-700',
          'text-white',
          'shadow-lg',
          'border-0'
        ),
        glass: cn(
          'bg-white/80',
          'backdrop-blur-lg',
          'border border-white/20',
          'shadow-lg'
        ),
        bordered: cn(
          'bg-white',
          'border-2 border-primary-200',
          'shadow-sm',
          'hover:border-primary-400',
          'hover:shadow-md'
        ),
        outline: cn(
          'bg-transparent',
          'border-2 border-gray-200',
          'hover:border-primary-400',
          'hover:bg-gray-50'
        ),
      },
      
      // Card padding variants
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      
      // Shadow elevation
      elevation: {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
        '2xl': 'shadow-2xl',
        primary: 'shadow-primary',
        glow: 'shadow-glow',
      },
    },
    
    // Default variants
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      elevation: 'md',
    },
  }
);

// ============================================================================
// CARD SUB-COMPONENT VARIANTS
// ============================================================================

const cardHeaderVariants = cva(
  'flex flex-col space-y-1.5',
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-4 pb-3',
        md: 'p-6 pb-4',
        lg: 'p-8 pb-6',
        xl: 'p-10 pb-8',
      },
    },
    defaultVariants: {
      padding: 'md',
    },
  }
);

const cardContentVariants = cva(
  '',
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-4 pt-0',
        md: 'p-6 pt-0',
        lg: 'p-8 pt-0',
        xl: 'p-10 pt-0',
      },
    },
    defaultVariants: {
      padding: 'md',
    },
  }
);

const cardFooterVariants = cva(
  'flex items-center',
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-4 pt-3',
        md: 'p-6 pt-4',
        lg: 'p-8 pt-6',
        xl: 'p-10 pt-8',
      },
    },
    defaultVariants: {
      padding: 'md',
    },
  }
);

// ============================================================================
// CARD PROPS
// ============================================================================

export interface CardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>,
    VariantProps<typeof cardVariants> {
  /**
   * Card content
   */
  children?: ReactNode;
  
  /**
   * Enable Framer Motion animations
   * @default true
   */
  animate?: boolean;
  
  /**
   * Click handler - makes card clickable
   */
  onClick?: () => void;
  
  /**
   * Loading state - shows skeleton
   */
  loading?: boolean;
  
  /**
   * Custom className to extend styles
   */
  className?: string;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: ReactNode;
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: ReactNode;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: ReactNode;
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  children?: ReactNode;
}

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children?: ReactNode;
}

// ============================================================================
// CARD COMPONENT
// ============================================================================

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant,
      padding,
      elevation,
      animate = true,
      onClick,
      loading = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Build className
    const cardClassName = cn(
      cardVariants({ variant, padding, elevation }),
      onClick && 'cursor-pointer',
      loading && 'relative overflow-hidden',
      className
    );
    
    // Loading overlay
    const loadingOverlay = loading && (
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
        <div className="spinner w-8 h-8" />
      </div>
    );
    
    // Choose component type (animated or static)
    if (animate && !loading) {
      return (
        <motion.div
          ref={ref}
          className={cardClassName}
          onClick={onClick}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={onClick ? { scale: 1.02 } : undefined}
          {...(props as HTMLMotionProps<'div'>)}
        >
          {children}
        </motion.div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cardClassName}
        onClick={onClick}
        {...props}
      >
        {loadingOverlay}
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// ============================================================================
// CARD HEADER
// ============================================================================

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ padding = 'md', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardHeaderVariants({ padding }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// ============================================================================
// CARD TITLE
// ============================================================================

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('text-2xl font-bold tracking-tight', className)}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = 'CardTitle';

// ============================================================================
// CARD DESCRIPTION
// ============================================================================

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-gray-600 text-sm leading-relaxed', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

// ============================================================================
// CARD CONTENT
// ============================================================================

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ padding = 'md', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardContentVariants({ padding }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

// ============================================================================
// CARD FOOTER
// ============================================================================

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ padding = 'md', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardFooterVariants({ padding }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

// ============================================================================
// EXPORTS
// ============================================================================

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};

export default Card;
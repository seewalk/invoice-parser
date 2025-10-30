/**
 * ============================================================================
 * HEADING COMPONENT
 * ============================================================================
 * 
 * Production-ready heading component with semantic HTML and design system integration.
 * 
 * Features:
 * - 6 semantic levels (h1, h2, h3, h4, h5, h6)
 * - 8 visual styles (display-2xl to xs)
 * - Optional gradient text effect
 * - Optional underline decoration
 * - Text alignment options
 * - Color variants
 * - Weight variants
 * - Animated (optional Framer Motion)
 * - Full accessibility support
 * 
 * Usage:
 * ```tsx
 * <Heading as="h1" size="display-2xl">Hero Title</Heading>
 * <Heading as="h2" size="display-lg" gradient>Section Title</Heading>
 * <Heading as="h3" underline>Subsection</Heading>
 * ```
 */

'use client';

import { forwardRef, HTMLAttributes, ReactNode, ElementType } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/app/lib/utils';

// ============================================================================
// HEADING VARIANTS
// ============================================================================

const headingVariants = cva(
  // Base styles (applied to all headings)
  'font-bold tracking-tight',
  {
    variants: {
      // Visual size variants (independent of semantic level)
      size: {
        'display-2xl': 'text-5xl sm:text-6xl lg:text-7xl leading-tight',
        'display-xl': 'text-4xl sm:text-5xl lg:text-6xl leading-tight',
        'display-lg': 'text-3xl sm:text-4xl lg:text-5xl leading-tight',
        'display-md': 'text-2xl sm:text-3xl lg:text-4xl leading-tight',
        'display-sm': 'text-xl sm:text-2xl lg:text-3xl leading-tight',
        'xl': 'text-3xl leading-tight',
        'lg': 'text-2xl leading-tight',
        'md': 'text-xl leading-snug',
        'sm': 'text-lg leading-snug',
        'xs': 'text-base leading-normal',
      },
      
      // Font weight variants
      weight: {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
        black: 'font-black',
      },
      
      // Text alignment
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      
      // Color variants
      variant: {
        default: 'text-gray-900',
        primary: 'text-primary-600',
        secondary: 'text-gray-700',
        accent: 'text-accent-600',
        muted: 'text-gray-600',
        white: 'text-white',
      },
      
      // Gradient text effect
      gradient: {
        true: 'bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500',
        false: '',
      },
      
      // Underline decoration
      underline: {
        true: 'relative pb-3 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-20 after:h-1 after:bg-primary-600 after:rounded-full',
        false: '',
      },
      
      // Center underline variant
      underlineCenter: {
        true: 'relative pb-3 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary-600 after:rounded-full',
        false: '',
      },
    },
    
    // Default variants
    defaultVariants: {
      size: 'lg',
      weight: 'bold',
      align: 'left',
      variant: 'default',
      gradient: false,
      underline: false,
      underlineCenter: false,
    },
  }
);

// ============================================================================
// HEADING PROPS
// ============================================================================

export interface HeadingProps
  extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof headingVariants> {
  /**
   * Semantic heading level (HTML element)
   * @default 'h2'
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  /**
   * Heading content
   */
  children: ReactNode;
  
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
   * ID for anchor links
   */
  id?: string;
}

// ============================================================================
// HEADING COMPONENT
// ============================================================================

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as = 'h2',
      size,
      weight,
      align,
      variant,
      gradient = false,
      underline = false,
      underlineCenter = false,
      animate = true,
      animationDelay = 0,
      className,
      children,
      id,
      ...props
    },
    ref
  ) => {
    // Build className
    const headingClassName = cn(
      headingVariants({ 
        size, 
        weight, 
        align, 
        variant: gradient ? undefined : variant, // Don't apply color if gradient
        gradient, 
        underline, 
        underlineCenter 
      }),
      className
    );
    
    // Choose the HTML element
    const Component = as;
    
    // Animation variants
    const animationVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          delay: animationDelay,
          ease: 'easeOut'
        }
      },
    };
    
    // Choose component type (animated or static)
    if (animate) {
      const MotionComponent = motion[as] as any;
      
      return (
        <MotionComponent
          ref={ref}
          id={id}
          className={headingClassName}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={animationVariants}
          {...props}
        >
          {children}
        </MotionComponent>
      );
    }
    
    return (
      <Component
        ref={ref as any}
        id={id}
        className={headingClassName}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

// ============================================================================
// CONVENIENCE COMPONENTS
// ============================================================================

/**
 * H1 - Main page title
 */
export const H1 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading ref={ref} as="h1" size="display-xl" {...props} />
);
H1.displayName = 'H1';

/**
 * H2 - Section headings
 */
export const H2 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading ref={ref} as="h2" size="display-md" {...props} />
);
H2.displayName = 'H2';

/**
 * H3 - Subsection headings
 */
export const H3 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading ref={ref} as="h3" size="xl" {...props} />
);
H3.displayName = 'H3';

/**
 * H4 - Minor headings
 */
export const H4 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading ref={ref} as="h4" size="lg" {...props} />
);
H4.displayName = 'H4';

/**
 * H5 - Small headings
 */
export const H5 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading ref={ref} as="h5" size="md" {...props} />
);
H5.displayName = 'H5';

/**
 * H6 - Smallest headings
 */
export const H6 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading ref={ref} as="h6" size="sm" {...props} />
);
H6.displayName = 'H6';

// ============================================================================
// EXPORTS
// ============================================================================

export { Heading, headingVariants };
export default Heading;

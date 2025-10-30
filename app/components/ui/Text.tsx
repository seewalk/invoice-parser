/**
 * ============================================================================
 * TEXT/PARAGRAPH COMPONENT
 * ============================================================================
 * 
 * Production-ready text component for consistent typography across the app.
 * 
 * Features:
 * - Multiple semantic elements (p, span, div, label, blockquote)
 * - 7 size variants (xs to 3xl)
 * - 8 color variants (default, muted, primary, success, warning, error, info, white)
 * - 7 weight variants (light to black)
 * - Text alignment options
 * - Max width constraints
 * - Line height variants
 * - Text decoration (underline, line-through)
 * - Truncation options (1, 2, 3 lines)
 * - Animated (optional Framer Motion)
 * - Full accessibility support
 * 
 * Usage:
 * ```tsx
 * <Text size="xl" variant="muted" align="center" maxWidth="3xl">
 *   Large centered paragraph with muted color
 * </Text>
 * 
 * <Text as="span" size="sm" weight="semibold">Inline text</Text>
 * 
 * <Text as="blockquote" italic>
 *   "A powerful quote"
 * </Text>
 * ```
 */

'use client';

import { forwardRef, HTMLAttributes, ReactNode, ElementType } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/app/lib/utils';

// ============================================================================
// TEXT VARIANTS
// ============================================================================

const textVariants = cva(
  // Base styles (applied to all text)
  'transition-colors duration-200',
  {
    variants: {
      // Size variants
      size: {
        xs: 'text-xs leading-normal',
        sm: 'text-sm leading-relaxed',
        base: 'text-base leading-relaxed',
        lg: 'text-lg leading-relaxed',
        xl: 'text-xl leading-relaxed',
        '2xl': 'text-2xl leading-relaxed',
        '3xl': 'text-3xl leading-relaxed',
      },
      
      // Color variants
      variant: {
        default: 'text-gray-900',
        muted: 'text-gray-600',
        primary: 'text-primary-600',
        secondary: 'text-gray-700',
        accent: 'text-accent-600',
        success: 'text-success-600',
        warning: 'text-warning-600',
        error: 'text-error-600',
        info: 'text-info-600',
        white: 'text-white',
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
        justify: 'text-justify',
      },
      
      // Line height
      leading: {
        none: 'leading-none',
        tight: 'leading-tight',
        snug: 'leading-snug',
        normal: 'leading-normal',
        relaxed: 'leading-relaxed',
        loose: 'leading-loose',
      },
      
      // Max width constraints
      maxWidth: {
        none: 'max-w-none',
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
        prose: 'max-w-prose',
      },
      
      // Text decoration
      decoration: {
        none: 'no-underline',
        underline: 'underline',
        'line-through': 'line-through',
      },
      
      // Italic style
      italic: {
        true: 'italic',
        false: 'not-italic',
      },
      
      // Truncate options
      truncate: {
        none: '',
        single: 'truncate',
        '2-lines': 'line-clamp-2',
        '3-lines': 'line-clamp-3',
      },
    },
    
    // Default variants
    defaultVariants: {
      size: 'base',
      variant: 'default',
      weight: 'normal',
      align: 'left',
      leading: 'relaxed',
      maxWidth: 'none',
      decoration: 'none',
      italic: false,
      truncate: 'none',
    },
  }
);

// ============================================================================
// TEXT PROPS
// ============================================================================

export interface TextProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof textVariants> {
  /**
   * Semantic HTML element to render
   * @default 'p'
   */
  as?: 'p' | 'span' | 'div' | 'label' | 'blockquote' | 'strong' | 'em' | 'small';
  
  /**
   * Text content
   */
  children: ReactNode;
  
  /**
   * Enable Framer Motion animations
   * @default false
   */
  animate?: boolean;
  
  /**
   * Animation delay in seconds
   * @default 0
   */
  animationDelay?: number;
  
  /**
   * Center the text horizontally (adds mx-auto)
   */
  centered?: boolean;
  
  /**
   * Custom className to extend styles
   */
  className?: string;
  
  /**
   * HTML for attribute (for label elements)
   */
  htmlFor?: string;
}

// ============================================================================
// TEXT COMPONENT
// ============================================================================

const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as = 'p',
      size,
      variant,
      weight,
      align,
      leading,
      maxWidth,
      decoration,
      italic = false,
      truncate = 'none',
      animate = false,
      animationDelay = 0,
      centered = false,
      className,
      children,
      htmlFor,
      ...props
    },
    ref
  ) => {
    // Build className
    const textClassName = cn(
      textVariants({ 
        size, 
        variant, 
        weight, 
        align, 
        leading, 
        maxWidth, 
        decoration, 
        italic, 
        truncate 
      }),
      centered && 'mx-auto',
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
          className={textClassName}
          htmlFor={htmlFor}
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
        className={textClassName}
        htmlFor={htmlFor}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

// ============================================================================
// CONVENIENCE COMPONENTS
// ============================================================================

/**
 * Lead - Large paragraph for introductions
 */
export const Lead = forwardRef<HTMLElement, Omit<TextProps, 'size' | 'as'>>(
  (props, ref) => (
    <Text 
      ref={ref} 
      as="p" 
      size="xl" 
      variant="muted"
      leading="relaxed"
      {...props} 
    />
  )
);
Lead.displayName = 'Lead';

/**
 * Small - Small text (disclaimers, captions)
 */
export const Small = forwardRef<HTMLElement, Omit<TextProps, 'size' | 'as'>>(
  (props, ref) => (
    <Text 
      ref={ref} 
      as="small" 
      size="sm" 
      variant="muted"
      {...props} 
    />
  )
);
Small.displayName = 'Small';

/**
 * Strong - Bold emphasis text
 */
export const Strong = forwardRef<HTMLElement, Omit<TextProps, 'weight' | 'as'>>(
  (props, ref) => (
    <Text 
      ref={ref} 
      as="strong" 
      weight="semibold"
      {...props} 
    />
  )
);
Strong.displayName = 'Strong';

/**
 * Muted - Muted secondary text
 */
export const Muted = forwardRef<HTMLElement, Omit<TextProps, 'variant'>>(
  (props, ref) => (
    <Text 
      ref={ref} 
      variant="muted"
      {...props} 
    />
  )
);
Muted.displayName = 'Muted';

/**
 * Quote - Blockquote text
 */
export const Quote = forwardRef<HTMLElement, Omit<TextProps, 'as'>>(
  (props, ref) => (
    <Text 
      ref={ref} 
      as="blockquote"
      italic
      className={cn(
        'border-l-4 border-primary-600 pl-4 py-2',
        props.className
      )}
      {...props} 
    />
  )
);
Quote.displayName = 'Quote';

/**
 * Label - Form label text
 */
export const Label = forwardRef<HTMLElement, Omit<TextProps, 'as'>>(
  (props, ref) => (
    <Text 
      ref={ref} 
      as="label"
      size="sm"
      weight="medium"
      {...props} 
    />
  )
);
Label.displayName = 'Label';

// ============================================================================
// EXPORTS
// ============================================================================

export { Text, textVariants };
export default Text;
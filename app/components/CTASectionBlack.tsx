/**
 * ============================================================================
 * CTA SECTION COMPONENT
 * ============================================================================
 * 
 * Reusable CTA (Call-to-Action) section component with multiple variants.
 * 
 * Features:
 * - Multiple visual variants (gradient, outline, solid)
 * - Optional icon support
 * - Customizable button text and link
 * - Framer Motion animations
 * - Fully accessible
 * 
 * Usage:
 * ```tsx
 * <CTASection
 *   title="Need Enterprise Solutions?"
 *   description="Custom features for large organizations"
 *   buttonText="Contact Sales"
 *   buttonHref="/contact"
 *   icon={<Rocket />}
 *   variant="gradient"
 * />
 * ```
 */

'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { Card } from './ui/Card';
import { Heading } from './ui/Heading';
import { Text } from './ui/Text';
import { Button } from './ui/Button';

export interface CTASectionProps {
  /**
   * CTA heading text
   */
  title: string;
  
  /**
   * CTA description text
   */
  description: string;
  
  /**
   * Button text
   */
  buttonText: string;
  
  /**
   * Button link destination
   */
  buttonHref: string;
  
  /**
   * Optional icon to display above title
   */
  icon?: ReactNode;
  
  /**
   * Visual variant
   * @default 'gradient'
   */
  variant?: 'gradient' | 'outline' | 'solid' | 'glass';
  
  /**
   * Button variant
   * @default 'accent'
   */
  buttonVariant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
  
  /**
   * Button size
   * @default 'lg'
   */
  buttonSize?: 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Aria label for button
   */
  buttonAriaLabel?: string;
  
  /**
   * Enable animations
   * @default true
   */
  animate?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function CTASection({
  title,
  description,
  buttonText,
  buttonHref,
  icon,
  variant = 'gradient',
  buttonVariant = 'accent',
  buttonSize = 'lg',
  buttonAriaLabel,
  animate = true,
  className = '',
}: CTASectionProps) {
  // Determine styling based on variant
  const variantStyles = {
    gradient: {
      card: 'bg-gradient-to-r from-slate-800 to-slate-900 text-white',
      icon: 'text-accent-400',
      title: 'text-white',
      description: 'text-slate-300',
    },
    outline: {
      card: 'bg-white border-2 border-primary-200',
      icon: 'text-primary-600',
      title: 'text-gray-900',
      description: 'text-gray-600',
    },
    solid: {
      card: 'bg-primary-600 text-white',
      icon: 'text-white',
      title: 'text-white',
      description: 'text-primary-100',
    },
    glass: {
      card: 'bg-white/80 backdrop-blur-lg border border-white/20',
      icon: 'text-primary-600',
      title: 'text-gray-900',
      description: 'text-gray-600',
    },
  };

  const styles = variantStyles[variant];

  return (
    <Card
      variant={variant === 'gradient' || variant === 'solid' ? 'gradient' : variant === 'glass' ? 'glass' : 'default'}
      padding="xl"
      className={`text-center rounded-2xl ${styles.card} ${className}`}
      animate={animate}
    >
      {icon && (
        <div className={`w-16 h-16 mx-auto mb-4 ${styles.icon}`} aria-hidden="true">
          {icon}
        </div>
      )}
      
      <Heading 
        as="h3" 
        size="display-sm" 
        align="center" 
        className={`mb-4 ${styles.title}`}
      >
        {title}
      </Heading>
      
      <Text 
        size="lg" 
        align="center" 
        maxWidth="2xl" 
        centered
        className={`mb-6 ${styles.description}`}
      >
        {description}
      </Text>
      
      <Link href={buttonHref}>
        <Button
          variant={buttonVariant}
          size={buttonSize}
          aria-label={buttonAriaLabel || buttonText}
        >
          {buttonText}
        </Button>
      </Link>
    </Card>
  );
}

/**
 * Preset CTA Variants for common use cases
 */

export function EnterpriseCTA({
  className = '',
}: {
  className?: string;
}) {
  return (
    <CTASection
      title="Need Enterprise-Level Invoice Processing?"
      description="Unlimited invoices, custom ML training, white-label options, dedicated support, and more."
      buttonText="Contact Sales for Custom Pricing"
      buttonHref="/pricing"
      icon={
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      }
      variant="gradient"
      buttonVariant="accent"
      buttonAriaLabel="Contact sales for custom invoice processing pricing"
      className={className}
    />
  );
}

export function FreeTierCTA({
  className = '',
}: {
  className?: string;
}) {
  return (
    <CTASection
      title="Start Processing Invoices for Free"
      description="No credit card required. Get started in seconds with our free tier."
      buttonText="Try It Free Now"
      buttonHref="/parser"
      variant="outline"
      buttonVariant="primary"
      className={className}
    />
  );
}

export function DemoCTA({
  className = '',
}: {
  className?: string;
}) {
  return (
    <CTASection
      title="See It In Action"
      description="Watch how our AI processes invoices in real-time. Upload a sample invoice and see the magic happen."
      buttonText="Try Live Demo"
      buttonHref="/parser"
      variant="glass"
      buttonVariant="primary"
      className={className}
    />
  );
}
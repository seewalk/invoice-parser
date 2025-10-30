/**
 * ============================================================================
 * PAGE HERO COMPONENT
 * ============================================================================
 * 
 * Reusable hero section for pages with badge, title, description, stats, and CTAs.
 * Now using centralized UI components for consistency.
 * 
 * Features:
 * - Multiple size variants (compact, default, large)
 * - Optional badge with icon
 * - Stats/features display
 * - CTA buttons (primary/secondary)
 * - Parallax scrolling effect
 * - Background elements
 * - Scroll indicator
 */

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ChevronDown, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import Link from 'next/link';
import { Heading } from './ui/Heading';
import { Text } from './ui/Text';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export interface HeroButton {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
  ariaLabel?: string;
}

export interface HeroStat {
  icon: LucideIcon;
  label: string;
  color?: string;
}

export interface PageHeroProps {
  // Badge
  badge?: string;
  badgeIcon?: LucideIcon;
  
  // Headline
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  
  // Description
  description?: string;
  
  // Stats/Features
  stats?: HeroStat[];
  
  // CTA Buttons
  buttons?: HeroButton[];
  
  // Content
  children?: ReactNode;
  
  // Styling
  className?: string;
  backgroundElements?: boolean;
  showScrollIndicator?: boolean;
  
  // Animations
  enableParallax?: boolean;
  
  // Size
  size?: 'default' | 'compact' | 'large';
}

export default function PageHero({
  badge,
  badgeIcon: BadgeIcon = Sparkles,
  title,
  subtitle,
  description,
  stats,
  buttons,
  children,
  className = '',
  backgroundElements = true,
  showScrollIndicator = false,
  enableParallax = true,
  size = 'default',
}: PageHeroProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  // Size-based padding classes
  const sizeClasses = {
    compact: 'pt-24 pb-12',
    default: 'pt-32 pb-20',
    large: 'pt-40 pb-28',
  };

  const titleSizes = {
    compact: 'display-md' as const,
    default: 'display-lg' as const,
    large: 'display-xl' as const,
  };

  const subtitleSizes = {
    compact: 'xl' as const,
    default: '2xl' as const,
    large: '3xl' as const,
  };

  return (
    <section
      className={`${sizeClasses[size]} px-4 sm:px-6 lg:px-8 relative overflow-hidden ${className}`}
      aria-labelledby="page-hero-heading"
    >
      {/* Background Elements */}
      {backgroundElements && (
        <>
          <div 
            className="absolute top-20 right-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-20 animate-pulse-slow" 
            aria-hidden="true" 
          />
          <div 
            className="absolute bottom-20 left-10 w-96 h-96 bg-accent-200 rounded-full blur-3xl opacity-20 animate-pulse-slow" 
            aria-hidden="true" 
          />
        </>
      )}

      <motion.div
        style={enableParallax ? { opacity, scale } : {}}
        className="max-w-7xl mx-auto text-center relative z-10"
      >
        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-8"
          >
            <Badge 
              variant="primary" 
              size="md"
              icon={<BadgeIcon className="w-4 h-4" aria-hidden="true" />}
            >
              {badge}
            </Badge>
          </motion.div>
        )}

        {/* Headline */}
        <Heading
          as="h1"
          id="page-hero-heading"
          size={titleSizes[size]}
          weight="extrabold"
          align="center"
          className="mb-6"
          animate
          animationDelay={0.2}
        >
          {title}
        </Heading>

        {/* Subtitle */}
        {subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <Text 
              size={subtitleSizes[size]} 
              variant="secondary" 
              align="center"
            >
              {subtitle}
            </Text>
          </motion.div>
        )}

        {/* Description */}
        {description && (
          <Text
            size="xl"
            variant="muted"
            align="center"
            maxWidth="3xl"
            centered
            className="mb-8"
            animate
            animationDelay={0.4}
          >
            {description}
          </Text>
        )}

        {/* Stats/Features */}
        {stats && stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mb-10"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex items-center space-x-2">
                  <Icon 
                    className={`w-5 h-5 ${stat.color || 'text-green-500'}`} 
                    aria-hidden="true" 
                  />
                  <Text as="span" size="lg" weight="semibold" variant="secondary">
                    {stat.label}
                  </Text>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* CTA Buttons */}
        {buttons && buttons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
          >
            {buttons.map((button, index) => {
              const Icon = button.icon;
              const isPrimary = button.variant !== 'secondary';
              
              const buttonElement = (
                <Button
                  key={index}
                  variant={isPrimary ? 'primary' : 'secondary'}
                  size="lg"
                  icon={Icon ? <Icon className="w-5 h-5" /> : undefined}
                  iconPosition="right"
                  className="rounded-full"
                  aria-label={button.ariaLabel || button.label}
                  onClick={button.onClick}
                >
                  {button.label}
                </Button>
              );

              return button.href ? (
                <Link key={index} href={button.href}>
                  {buttonElement}
                </Link>
              ) : (
                buttonElement
              );
            })}
          </motion.div>
        )}

        {/* Custom Content */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {children}
          </motion.div>
        )}

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16"
          >
            <ChevronDown 
              className="w-8 h-8 text-gray-400 mx-auto animate-bounce" 
              aria-hidden="true" 
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
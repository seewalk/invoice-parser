'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ChevronDown, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import Link from 'next/link';

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

  const titleSizeClasses = {
    compact: 'text-3xl sm:text-4xl lg:text-5xl',
    default: 'text-4xl sm:text-5xl lg:text-6xl',
    large: 'text-5xl sm:text-6xl lg:text-7xl',
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
            className="inline-flex items-center space-x-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-2 mb-8"
          >
            <BadgeIcon className="w-4 h-4 text-primary-600" aria-hidden="true" />
            <span className="text-sm font-medium text-primary-700">
              {badge}
            </span>
          </motion.div>
        )}

        {/* Headline */}
        <motion.h1
          id="page-hero-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`${titleSizeClasses[size]} font-extrabold text-gray-900 mb-6 leading-tight`}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 mb-6"
          >
            {subtitle}
          </motion.div>
        )}

        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            {description}
          </motion.p>
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
                  <span className="text-base sm:text-lg font-semibold text-gray-700">
                    {stat.label}
                  </span>
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
              
              const buttonClasses = isPrimary
                ? 'group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1'
                : 'bg-white text-primary-700 border-2 border-primary-200 px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-50 transition-all hover:-translate-y-1';

              const content = (
                <>
                  <span>{button.label}</span>
                  {Icon && (
                    <Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </>
              );

              const commonProps = {
                className: `${buttonClasses} flex items-center justify-center space-x-2`,
                'aria-label': button.ariaLabel || button.label,
              };

              return button.href ? (
                <Link key={index} href={button.href} {...commonProps}>
                  {content}
                </Link>
              ) : (
                <button key={index} onClick={button.onClick} {...commonProps}>
                  {content}
                </button>
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

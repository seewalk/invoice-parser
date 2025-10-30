/**
 * ============================================================================
 * NAV LINKS COMPONENT
 * ============================================================================
 * 
 * Navigation links array and rendering components.
 */

'use client';

import Link from 'next/link';
import { Text } from '../ui/Text';

export const navLinks = [
  { href: '/parser', label: 'Try Demo', primary: true, ariaLabel: 'Try invoice processing demo' },
  { href: '/invoice-generator', label: 'Invoice Generator', ariaLabel: 'Create custom invoices online' },
  { href: '/invoice-templates', label: 'Templates', ariaLabel: 'Browse invoice templates' },
  { href: '/#features', label: 'Features', isAnchor: true, ariaLabel: 'View invoice automation features' },
  { href: '/pricing', label: 'Pricing', ariaLabel: 'View invoice processing software pricing' },
  { href: '/faq', label: 'FAQ', ariaLabel: 'Invoice processing FAQ' },
];

interface NavLinksProps {
  mobile?: boolean;
  onLinkClick?: () => void;
}

export function NavLinks({ mobile = false, onLinkClick }: NavLinksProps) {
  if (mobile) {
    return (
      <div className="space-y-1">
        {navLinks.map((link) => {
          const Component = link.isAnchor ? 'a' : Link;
          const textVariant = link.primary ? 'primary' : 'secondary';
          const className = link.primary
            ? "block px-4 py-2 text-primary-700 font-semibold hover:bg-primary-50 rounded-lg mx-2"
            : "block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg mx-2";

          return (
            <Component
              key={link.href}
              href={link.href}
              className={className}
              onClick={onLinkClick}
              aria-label={link.ariaLabel}
            >
              <Text 
                as="span" 
                size="base" 
                weight={link.primary ? 'semibold' : 'normal'}
                variant={textVariant}
              >
                {link.label}
              </Text>
            </Component>
          );
        })}
      </div>
    );
  }

  // Desktop layout
  return (
    <>
      {navLinks.map((link) => {
        const Component = link.isAnchor ? 'a' : Link;
        const textClasses = link.primary
          ? "text-primary-700 hover:text-primary-800"
          : "text-gray-700 hover:text-primary-600";

        return (
          <Component
            key={link.href}
            href={link.href}
            className={`${textClasses} transition`}
            aria-label={link.ariaLabel}
          >
            <Text 
              as="span" 
              size="base" 
              weight={link.primary ? 'semibold' : 'normal'}
              variant={link.primary ? 'primary' : 'secondary'}
              className={link.primary ? '' : 'hover:text-primary-600 transition-colors'}
            >
              {link.label}
            </Text>
          </Component>
        );
      })}
    </>
  );
}
import { redirect } from 'next/navigation';

/**
 * Redirect /invoice-templates/industry to /invoice-templates
 * 
 * This page redirects to the main invoice templates page to avoid duplicate content.
 * All industry browsing functionality is available at /invoice-templates
 */
export default function IndustryRedirectPage() {
  redirect('/invoice-templates');
}

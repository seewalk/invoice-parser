/**
 * Type definitions for Lead Capture System
 */

export interface Lead {
  email: string;
  name: string;
  source: 'template-download' | 'invoice-generator' | 'parser';
  capturedAt: string; // ISO 8601 timestamp
  metadata?: LeadMetadata;
  userAgent?: string;
}

export interface LeadMetadata {
  templateName?: string;
  templateId?: string;
  pagePath?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface LeadQueue {
  leads: Lead[];
  lastSyncedAt?: string;
}

export interface LeadCaptureConfig {
  enabled: boolean;
  sources: Array<'template-download' | 'invoice-generator' | 'parser'>;
  validityHours: number; // How long lead capture is valid before asking again
  requireName: boolean;
  requireConsent: boolean;
}

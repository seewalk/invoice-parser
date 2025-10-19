'use client';

import { useState, useCallback, useEffect } from 'react';
import { LeadCaptureData } from '@/app/components/LeadCaptureModal';

interface UseLeadCaptureOptions {
  source: 'template-download' | 'invoice-generator' | 'parser';
  metadata?: {
    templateName?: string;
    templateId?: string;
  };
  onLeadCaptured?: (data: LeadCaptureData) => void;
}

interface UseLeadCaptureReturn {
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleLeadSubmit: (data: LeadCaptureData) => Promise<void>;
  hasSubmittedLead: boolean;
  isLeadCaptureRequired: boolean;
}

/**
 * Custom hook to manage lead capture modal state and logic
 * 
 * Features:
 * - Checks if user has already submitted email in this session
 * - Manages modal open/close state
 * - Handles lead data submission
 * - Stores lead capture state in localStorage
 * - Provides clean API for components
 * 
 * Usage:
 * ```tsx
 * const { showModal, openModal, closeModal, handleLeadSubmit, hasSubmittedLead } = useLeadCapture({
 *   source: 'template-download',
 *   metadata: { templateName: 'Restaurant Invoice' }
 * });
 * 
 * // Before generating PDF, check if lead capture is needed
 * if (!hasSubmittedLead) {
 *   openModal();
 *   return;
 * }
 * // Generate PDF...
 * ```
 */
export function useLeadCapture({
  source,
  metadata,
  onLeadCaptured,
}: UseLeadCaptureOptions): UseLeadCaptureReturn {
  const [showModal, setShowModal] = useState(false);
  const [hasSubmittedLead, setHasSubmittedLead] = useState(false);

  // Storage keys
  const LEAD_CAPTURED_KEY = 'lead_captured';
  const LEAD_EMAIL_KEY = 'lead_email';
  const LEAD_NAME_KEY = 'lead_name';
  const LEAD_TIMESTAMP_KEY = 'lead_captured_at';

  /**
   * Check if user has already submitted their email
   * Checks localStorage for existing lead capture
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const captured = localStorage.getItem(LEAD_CAPTURED_KEY);
      const timestamp = localStorage.getItem(LEAD_TIMESTAMP_KEY);

      if (captured === 'true' && timestamp) {
        const capturedAt = parseInt(timestamp, 10);
        const now = Date.now();
        const hoursSinceCaptured = (now - capturedAt) / (1000 * 60 * 60);

        // Lead capture is valid for 24 hours
        if (hoursSinceCaptured < 24) {
          setHasSubmittedLead(true);
          console.log('[Lead Capture] User has already submitted lead (valid for 24h)');
        } else {
          // Expired, clear the data
          console.log('[Lead Capture] Lead capture expired, clearing data');
          clearLeadCapture();
        }
      }
    } catch (error) {
      console.error('[Lead Capture] Error checking lead status:', error);
    }
  }, []);

  /**
   * Clear lead capture data from localStorage
   */
  const clearLeadCapture = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(LEAD_CAPTURED_KEY);
      localStorage.removeItem(LEAD_EMAIL_KEY);
      localStorage.removeItem(LEAD_NAME_KEY);
      localStorage.removeItem(LEAD_TIMESTAMP_KEY);
    } catch (error) {
      console.error('[Lead Capture] Error clearing lead data:', error);
    }
  }, []);

  /**
   * Open the lead capture modal
   */
  const openModal = useCallback(() => {
    console.log('[Lead Capture] Opening modal for source:', source);
    setShowModal(true);
  }, [source]);

  /**
   * Close the lead capture modal
   */
  const closeModal = useCallback(() => {
    console.log('[Lead Capture] Closing modal');
    setShowModal(false);
  }, []);

  /**
   * Handle lead submission
   * Stores lead data in localStorage (will be synced to Firebase later)
   */
  const handleLeadSubmit = useCallback(
    async (data: LeadCaptureData) => {
      console.log('[Lead Capture] Submitting lead:', {
        email: data.email,
        name: data.name,
        source: data.source,
      });

      try {
        // Store in localStorage for now (Firebase integration will come later)
        if (typeof window !== 'undefined') {
          localStorage.setItem(LEAD_CAPTURED_KEY, 'true');
          localStorage.setItem(LEAD_EMAIL_KEY, data.email);
          localStorage.setItem(LEAD_NAME_KEY, data.name);
          localStorage.setItem(LEAD_TIMESTAMP_KEY, Date.now().toString());

          // Store full lead data for Firebase sync later
          const leadData = {
            ...data,
            capturedAt: new Date().toISOString(),
            userAgent: navigator.userAgent,
          };

          // Store in a queue for later Firebase sync
          const existingLeads = localStorage.getItem('lead_queue');
          const leadQueue = existingLeads ? JSON.parse(existingLeads) : [];
          leadQueue.push(leadData);
          localStorage.setItem('lead_queue', JSON.stringify(leadQueue));

          console.log('[Lead Capture] Lead stored successfully, queue size:', leadQueue.length);
        }

        // Update state
        setHasSubmittedLead(true);
        setShowModal(false);

        // Call optional callback
        if (onLeadCaptured) {
          onLeadCaptured(data);
        }

        // TODO: Later, call Firebase server action here
        // await captureLeadToFirebase(data);
      } catch (error) {
        console.error('[Lead Capture] Error storing lead:', error);
        throw new Error('Failed to save your information. Please try again.');
      }
    },
    [onLeadCaptured]
  );

  /**
   * Determine if lead capture is required before action
   */
  const isLeadCaptureRequired = !hasSubmittedLead;

  return {
    showModal,
    openModal,
    closeModal,
    handleLeadSubmit,
    hasSubmittedLead,
    isLeadCaptureRequired,
  };
}

/**
 * Helper function to get stored lead data
 * Useful for pre-filling forms or displaying user info
 */
export function getStoredLeadData(): { email: string; name: string } | null {
  if (typeof window === 'undefined') return null;

  try {
    const email = localStorage.getItem('lead_email');
    const name = localStorage.getItem('lead_name');
    const captured = localStorage.getItem('lead_captured');

    if (captured === 'true' && email && name) {
      return { email, name };
    }
  } catch (error) {
    console.error('[Lead Capture] Error getting stored lead data:', error);
  }

  return null;
}

/**
 * Helper function to check if user has captured lead
 * Useful for conditional rendering in components
 */
export function hasUserSubmittedLead(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const captured = localStorage.getItem('lead_captured');
    const timestamp = localStorage.getItem('lead_captured_at');

    if (captured === 'true' && timestamp) {
      const capturedAt = parseInt(timestamp, 10);
      const now = Date.now();
      const hoursSinceCaptured = (now - capturedAt) / (1000 * 60 * 60);

      // Valid for 24 hours
      return hoursSinceCaptured < 24;
    }
  } catch (error) {
    console.error('[Lead Capture] Error checking lead status:', error);
  }

  return false;
}
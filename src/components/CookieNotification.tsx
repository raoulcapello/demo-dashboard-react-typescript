
import React, { useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

const STORAGE_KEY = 'cookie-notification-dismissed';

/**
 * One-time notification toast that informs users about cookie usage
 * Uses localStorage to ensure it only shows once per user
 */
const CookieNotification = () => {
  useEffect(() => {
    // Check if user has already dismissed the notification
    const hasBeenDismissed = localStorage.getItem(STORAGE_KEY) === 'true';
    
    if (!hasBeenDismissed) {
      // Add a 2-second delay to avoid multiple toasts appearing simultaneously
      const timeoutId = setTimeout(() => {
        toast.info('We gebruiken cookies alleen voor noodzakelijke functionaliteit.', {
          duration: Infinity, // Keep toast visible until user dismisses it
          action: {
            label: 'Begrepen',
            onClick: () => {
              // Mark notification as dismissed in localStorage
              localStorage.setItem(STORAGE_KEY, 'true');
            },
          },
        });
      }, 2000);

      // Cleanup timeout if component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, []);

  // Component doesn't render anything - toast is handled by Sonner
  return null;
};

export default CookieNotification;


import React, { useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

const STORAGE_KEY = 'demo-notification-dismissed';

/**
 * One-time notification toast that informs users this is a demo with fake data
 * Uses localStorage to ensure it only shows once per user
 */
const DemoNotification = () => {
  useEffect(() => {
    // Check if user has already dismissed the notification
    const hasBeenDismissed = localStorage.getItem(STORAGE_KEY) === 'true';
    
    if (!hasBeenDismissed) {
      // Show toast with action button to dismiss
      toast.info('Dit is een demo gebaseerd op nep-data', {
        duration: Infinity, // Keep toast visible until user dismisses it
        action: {
          label: 'Ik begrijp het',
          onClick: () => {
            // Mark notification as dismissed in localStorage
            localStorage.setItem(STORAGE_KEY, 'true');
          },
        },
      });
    }
  }, []);

  // Component doesn't render anything - toast is handled by Sonner
  return null;
};

export default DemoNotification;

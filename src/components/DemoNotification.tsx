
import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const STORAGE_KEY = 'demo-notification-dismissed';

/**
 * One-time notification popup that informs users this is a demo with fake data
 * Uses localStorage to ensure it only shows once per user
 */
const DemoNotification = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the notification
    const hasBeenDismissed = localStorage.getItem(STORAGE_KEY) === 'true';
    
    if (!hasBeenDismissed) {
      setIsOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    // Mark notification as dismissed in localStorage
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Demo Applicatie</AlertDialogTitle>
          <AlertDialogDescription>
            Dit is een demo gebaseerd op nep-data
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction onClick={handleDismiss}>
          Ik begrijp het
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DemoNotification;

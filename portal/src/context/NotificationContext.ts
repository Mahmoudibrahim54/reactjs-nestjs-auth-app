import { createContext, useContext } from 'react';

export const NotificationContext = createContext<{
  contextHolder: React.ReactElement;
  alertSuccess: (description: string) => void;
  alertWarning: (description: string) => void;
  alertError: (description: string) => void;
  alertInfo: (description: string) => void;
} | null>(null);

// Custom hook for using the context
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotificationContext must be used within a NotificationProvider',
    );
  }
  return context;
};

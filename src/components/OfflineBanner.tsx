import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OfflineBannerProps {
  message?: string;
  onClose?: () => void;
}

const OfflineBanner: React.FC<OfflineBannerProps> = ({ 
  message = 'Note: Using offline mode due to API connectivity issues. This is simulated content for demonstration purposes.',
  onClose
}) => {
  const handleExitOfflineMode = () => {
    // Remove offline mode from localStorage
    localStorage.removeItem('offlineMode');
    // Call the onClose prop if provided
    if (onClose) {
      onClose();
    } else {
      // Refresh the page if no onClose handler is provided
      window.location.reload();
    }
  };

  return (
    <div className="w-full bg-destructive/90 text-destructive-foreground py-2 px-4 flex items-center justify-center">
      <div className="max-w-7xl w-full flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{message}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleExitOfflineMode}
          className="ml-4 text-destructive-foreground hover:bg-destructive/80 p-1 h-auto"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OfflineBanner;
import { AlertCircle, CheckCircle } from 'lucide-react';
import React from 'react'

// Notification Component
const Notification = ({ notification }) => {
  if (!notification) return null;
  
  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
      notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
    }`}>
      <div className="flex items-center">
        {notification.type === 'error' ? 
          <AlertCircle className="h-5 w-5 mr-2" /> : 
          <CheckCircle className="h-5 w-5 mr-2" />
        }
        {notification.message}
      </div>
    </div>
  );
};

export default Notification
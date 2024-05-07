import React, { useState, useEffect } from 'react';

function ErrorNotification({ error }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className={`p-4 flex justify-center fixed top-0 left-0 right-0 ${isVisible ? '' : 'hidden'}`}>
      <div className="w-1/2 relative rounded-lg border bg-blue-200 p-4 transition-opacity opacity-100">
        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" x2="20" y1="19" y2="19"></line></svg>
        <h5 className="mb-1 font-medium leading-none tracking-tight">Error</h5>
        <div className="text-sm opacity-70">{error}</div>
      </div>
    </div>
  );
}

export default ErrorNotification;

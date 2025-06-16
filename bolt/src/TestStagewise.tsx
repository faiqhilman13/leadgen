import React, { useEffect, useState } from 'react';
import { StagewiseToolbar } from '@stagewise/toolbar-react';
import { ReactPlugin } from '@stagewise-plugins/react';

const TestStagewise: React.FC = () => {
  const [isStagewiseEnabled, setIsStagewiseEnabled] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Log environment variables to console for debugging
    console.log('Environment variables:', {
      isDev: import.meta.env.DEV,
      stagewiseEnabled: import.meta.env.VITE_STAGEWISE_ENABLED,
    });
    
    const enabled = import.meta.env.DEV && 
      (import.meta.env.VITE_STAGEWISE_ENABLED === 'true' || 
       import.meta.env.VITE_STAGEWISE_ENABLED === true);
       
    setIsStagewiseEnabled(enabled);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8">
      <h1 className="text-3xl font-bold mb-4">Testing Stagewise Toolbar</h1>
      <p className="mb-4">This is a simple test component</p>
      
      <div className="p-4 bg-white rounded shadow mb-4">
        <h2 className="text-xl font-bold mb-2">Environment Status</h2>
        <p>Stagewise Enabled: {isStagewiseEnabled === null ? 'Loading...' : isStagewiseEnabled ? 'Yes' : 'No'}</p>
        <p>DEV Mode: {import.meta.env.DEV ? 'Yes' : 'No'}</p>
        <p>VITE_STAGEWISE_ENABLED: {String(import.meta.env.VITE_STAGEWISE_ENABLED)}</p>
      </div>
      
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => console.log('Button clicked!')}
      >
        Test Button
      </button>
      
      {/* Stagewise toolbar should appear if enabled */}
      <StagewiseToolbar 
        config={{
          plugins: [ReactPlugin]
        }}
      />
    </div>
  );
};

export default TestStagewise; 
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import LeadOverview from './components/LeadOverview';
import PipelineOverview from './components/PipelineOverview';
import LeadTable from './components/LeadTable';
import OutreachStatus from './components/OutreachStatus';
import Insights from './components/Insights';
import LoadingSpinner from './components/LoadingSpinner';
import { useGoogleSheetsData } from './hooks/useGoogleSheetsData';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { data, loading, error, refreshAll, updateLeadStatus } = useGoogleSheetsData();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      {/* Main Dashboard Content */}
      <main className="flex-1 flex flex-col min-h-0 h-full bg-gray-50 min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0">
          <h1 className="text-xl font-semibold text-gray-900">Lead Generation Dashboard</h1>
          <div className="flex items-center gap-4">
            {(loading.leads || loading.stats || loading.outreachData || loading.insights) && (
              <LoadingSpinner size="small" text="" />
            )}
            <button 
              onClick={refreshAll}
              className="px-3 py-1 text-xs font-medium rounded transition-colors"
              style={{backgroundColor: '#BFD741', color: 'white'}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#A5C332'} 
              onMouseLeave={(e) => e.target.style.backgroundColor = '#BFD741'}
            >
              Refresh Data
            </button>
          </div>
        </header>
        
        {/* Dashboard Body */}
        <section className="flex-1 p-8 overflow-y-auto min-w-0">
          <div className="max-w-none w-full">
            {error.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-800 text-sm">Error loading data: {error.general}</span>
                </div>
              </div>
            )}
            
            <LeadOverview data={data.stats} loading={loading.stats} error={error.stats} />
            <PipelineOverview data={data.stats} loading={loading.stats} error={error.stats} />
            <LeadTable data={data.leads} loading={loading.leads} error={error.leads} onStatusUpdate={updateLeadStatus} />
            <OutreachStatus data={data.outreachData} loading={loading.outreachData} error={error.outreachData} />
            <Insights data={data.insights} loading={loading.insights} error={error.insights} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App; 
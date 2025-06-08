import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const PipelineOverview = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Pipeline Health</h3>
        </div>
        <div className="p-6">
          <LoadingSpinner text="Loading pipeline data..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Pipeline Health</h3>
        </div>
        <div className="p-6">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <span className="text-red-800 text-sm">Error loading pipeline data: {error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const stats = data;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      {/* Lead Sources */}
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Lead Sources</h3>
          <div className="space-y-3">
            {stats.sources.map((source, index) => (
              <div key={source.name} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                                 <div className={`w-4 h-4 rounded-full ${
                   index === 0 ? 'bg-blue-500' : 
                   index === 1 ? '' : 'bg-green-500'
                 } flex items-center justify-center`} 
                 style={index === 1 ? {backgroundColor: '#BFD741'} : {}}>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium">{source.name}</p>
                  <p className="text-xs text-gray-400">{source.count} leads</p>
                </div>
                <div className="text-sm font-semibold text-gray-900">{source.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Activity this week</h3>
          <div className="flex items-end justify-between h-24 gap-1">
            <div className="bg-gray-200 w-6 rounded-sm" style={{height: '20%'}}></div>
            <div className="bg-gray-200 w-6 rounded-sm" style={{height: '40%'}}></div>
            <div className="w-6 rounded-sm" style={{height: '85%', backgroundColor: '#BFD741'}}></div>
            <div className="w-6 rounded-sm" style={{height: '100%', backgroundColor: '#BFD741'}}></div>
            <div className="w-6 rounded-sm" style={{height: '60%', backgroundColor: '#BFD741'}}></div>
            <div className="bg-gray-200 w-6 rounded-sm" style={{height: '30%'}}></div>
            <div className="bg-gray-200 w-6 rounded-sm" style={{height: '15%'}}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </div>

      {/* Conversion Funnel Donut */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Conversion Rate</h3>
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="absolute top-0 left-0" width="100%" height="100%" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="12" fill="none"></circle>
            <circle cx="50" cy="50" r="40" stroke="#BFD741" strokeWidth="12" fill="none" strokeLinecap="round"
              strokeDasharray="251.2" strokeDashoffset="175"></circle>
          </svg>
          <span className="text-3xl font-bold" style={{color: '#BFD741'}}>30%</span>
        </div>
        <div className="mt-3 text-xs text-gray-500">Leads to qualified</div>
      </div>

      {/* Lead Status Pipeline */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Pipeline Status</h3>
        <div className="space-y-3">
          {stats.status.map((status, index) => (
            <div key={status.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                                 <div className={`w-3 h-3 rounded-full ${
                   index === 0 ? 'bg-gray-400' :
                   index === 1 ? 'bg-blue-500' :
                   index === 2 ? 'bg-yellow-500' :
                   index === 3 ? 'bg-green-500' : ''
                 }`} style={index === 4 ? {backgroundColor: '#BFD741'} : {}}></div>
                <span className="text-sm text-gray-700">{status.label}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{status.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PipelineOverview; 
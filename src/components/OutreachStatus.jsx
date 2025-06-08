import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const OutreachStatus = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Outreach Automation Status</h3>
        </div>
        <div className="p-6">
          <LoadingSpinner text="Loading outreach data..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Outreach Automation Status</h3>
        </div>
        <div className="p-6">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <span className="text-red-800 text-sm">Error loading outreach data: {error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const outreachData = data;
  const responseRate = Math.round((outreachData.replies / outreachData.sent) * 100);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {/* Email Campaign Stats */}
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Email Campaign Performance</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 font-medium">Emails Sent</p>
                <p className="text-xs text-gray-400">Total outreach</p>
              </div>
              <div className="text-sm font-semibold text-gray-900">{outreachData.sent.toLocaleString()}</div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 font-medium">Replies Received</p>
                <p className="text-xs text-gray-400">{responseRate}% response rate</p>
              </div>
              <div className="text-sm font-semibold text-gray-900">{outreachData.replies}</div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 font-medium">Bounced Emails</p>
                <p className="text-xs text-gray-400">Invalid addresses</p>
              </div>
              <div className="text-sm font-semibold text-gray-900">{outreachData.bounces}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Status */}
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Active Workflows</h3>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2" style={{color: '#BFD741'}}>{outreachData.workflowsRunning}</div>
            <div className="text-xs text-gray-500">Currently running</div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Next batch:</span>
              <span className="font-medium">{outreachData.nextBatch}</span>
            </div>
          </div>
        </div>

        {outreachData.warning && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Workflow Alert</h3>
                <div className="mt-1 text-sm text-red-700">
                  Some workflows paused due to high bounce rate or low open rate.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutreachStatus; 
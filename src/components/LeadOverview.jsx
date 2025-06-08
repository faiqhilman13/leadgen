import React from 'react';
import { CardLoadingSkeleton } from './LoadingSpinner';

const LeadOverview = ({ data, loading, error }) => {
  if (loading) {
    return (
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Lead Intelligence Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <CardLoadingSkeleton key={i} />)}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Lead Intelligence Overview</h2>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <span className="text-red-800 text-sm">Error loading overview data: {error}</span>
        </div>
      </section>
    );
  }

  if (!data) return null;

  const stats = data;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Leads Cards */}
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-xs text-gray-500 uppercase tracking-wide">This Week</span>
        </div>
        <div className="text-2xl font-semibold text-gray-900">{stats.leads.week}</div>
        <div className="text-xs text-gray-500">leads generated</div>
      </div>

              <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#BFD741'}}></div>
            <span className="text-xs text-gray-500 uppercase tracking-wide">This Month</span>
          </div>
        <div className="text-2xl font-semibold text-gray-900">{stats.leads.month}</div>
        <div className="text-xs text-gray-500">total leads</div>
      </div>

      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-500 uppercase tracking-wide">Conversion</span>
        </div>
        <div className="text-2xl font-semibold text-gray-900">14.2%</div>
        <div className="text-xs text-gray-500">lead to customer</div>
      </div>

      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
          <span className="text-xs text-gray-500 uppercase tracking-wide">All Time</span>
        </div>
        <div className="text-2xl font-semibold text-gray-900">{stats.leads.allTime.toLocaleString()}</div>
        <div className="text-xs text-gray-500">total generated</div>
      </div>
    </div>
  );
};

export default LeadOverview; 
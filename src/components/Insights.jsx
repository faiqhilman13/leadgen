import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const Insights = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Insights & Optimization</h3>
        </div>
        <div className="p-6">
          <LoadingSpinner text="Loading insights..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Insights & Optimization</h3>
        </div>
        <div className="p-6">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <span className="text-red-800 text-sm">Error loading insights: {error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const insights = data;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Performance Insights */}
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">🏆 Top Performing Industry</h3>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2" style={{color: '#BFD741'}}>{insights.topIndustry}</div>
            <div className="text-xs text-gray-500">Highest conversion rate</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">🎯 Most Responsive Titles</h3>
          <div className="space-y-2">
            {insights.responsiveTitles.map((title, index) => (
              <div key={title} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white ${
                  index === 0 ? '' : 'bg-blue-500'
                }`} style={index === 0 ? {backgroundColor: '#BFD741'} : {}}>
                  {index + 1}
                </div>
                <span className="text-sm text-gray-900">{title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">⏱️ Response Time</h3>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">{insights.avgResponseTime}</div>
            <div className="text-xs text-gray-500">Average first response</div>
            <div className="mt-2 text-xs text-green-600">
              Faster than industry average
            </div>
          </div>
        </div>
      </div>

      {/* Template Performance */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">📈 Template Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Open</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Reply</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Booked</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {insights.templates.map(template => (
                <tr key={template.name}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{template.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {template.open}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {template.reply}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                          style={{backgroundColor: 'rgba(191, 215, 65, 0.2)', color: '#6B7B28'}}>
                      {template.booked}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            Performance metrics updated in real-time
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights; 
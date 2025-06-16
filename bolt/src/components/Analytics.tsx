import React from 'react';
import { Lead } from '../types';

interface AnalyticsProps {
  leads: Lead[];
}

export const Analytics: React.FC<AnalyticsProps> = ({ leads }) => {
  // Calculate conversion funnel data
  const totalLeads = leads.length;
  const emailsSent = leads.filter(lead => lead.sent).length;
  const followUpsNeeded = leads.filter(lead => lead.follow_up).length;
  const conversions = emailsSent - followUpsNeeded; // Assuming non-follow-up sent emails are conversions

  const funnelData = [
    { stage: 'Total Leads', count: totalLeads, percentage: 100, color: 'bg-blue-500' },
    { stage: 'Emails Sent', count: emailsSent, percentage: Math.round((emailsSent / totalLeads) * 100), color: 'bg-green-500' },
    { stage: 'Responses', count: conversions, percentage: Math.round((conversions / totalLeads) * 100), color: 'bg-purple-500' },
  ];

  // Calculate daily activity (mock data for demo)
  const dailyActivity = [
    { day: 'Mon', leads: 12, emails: 8 },
    { day: 'Tue', leads: 15, emails: 12 },
    { day: 'Wed', leads: 10, emails: 9 },
    { day: 'Thu', leads: 18, emails: 14 },
    { day: 'Fri', leads: 8, emails: 6 },
    { day: 'Sat', leads: 5, emails: 3 },
    { day: 'Sun', leads: 3, emails: 2 },
  ];

  const maxActivity = Math.max(...dailyActivity.map(d => Math.max(d.leads, d.emails)));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Conversion Funnel */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Conversion Funnel</h3>
        <div className="space-y-4">
          {funnelData.map((item, index) => (
            <div key={item.stage} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{item.stage}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-gray-900">{item.count}</span>
                  <span className="text-xs text-gray-500">({item.percentage}%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-300 ${item.color}`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Activity</h3>
        <div className="space-y-4">
          {dailyActivity.map((day) => (
            <div key={day.day} className="flex items-center space-x-4">
              <div className="w-10 text-xs font-medium text-gray-600">{day.day}</div>
              <div className="flex-1 flex items-center space-x-2">
                <div className="flex-1 bg-gray-100 rounded-full h-4 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${(day.leads / maxActivity) * 100}%` }}
                  ></div>
                </div>
                <div className="w-8 text-xs text-gray-600">{day.leads}</div>
              </div>
              <div className="flex-1 flex items-center space-x-2">
                <div className="flex-1 bg-gray-100 rounded-full h-4 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${(day.emails / maxActivity) * 100}%` }}
                  ></div>
                </div>
                <div className="w-8 text-xs text-gray-600">{day.emails}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Leads</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Emails</span>
          </div>
        </div>
      </div>
    </div>
  );
};
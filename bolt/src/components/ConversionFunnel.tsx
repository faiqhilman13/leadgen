import React, { useMemo } from 'react';
import { Lead } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface ConversionFunnelProps {
  leads: Lead[];
}

export const ConversionFunnel: React.FC<ConversionFunnelProps> = React.memo(({ leads }) => {
  const { isDark } = useTheme();
  
  const funnelData = useMemo(() => {
    const totalLeads = leads.length;
    const emailsSent = leads.filter(lead => lead.sent).length;
    const followUpsNeeded = leads.filter(lead => lead.follow_up).length;
    const conversions = emailsSent - followUpsNeeded;

    return [
      { 
        stage: 'Total Leads', 
        count: totalLeads, 
        percentage: 100, 
        color: isDark ? 'bg-blue-500' : 'bg-blue-500' 
      },
      { 
        stage: 'Emails Sent', 
        count: emailsSent, 
        percentage: Math.round((emailsSent / totalLeads) * 100) || 0, 
        color: isDark ? 'bg-green-500' : 'bg-green-500' 
      },
      { 
        stage: 'Responses', 
        count: conversions, 
        percentage: Math.round((conversions / totalLeads) * 100) || 0, 
        color: isDark ? 'bg-purple-500' : 'bg-purple-500' 
      },
    ];
  }, [leads, isDark]);

  return (
    <div className="space-y-4">
      {funnelData.map((item, index) => (
        <div key={item.stage} className="relative">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
              {item.stage}
            </span>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {item.count}
              </span>
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                ({item.percentage}%)
              </span>
            </div>
          </div>
          <div className={`w-full rounded-full h-2 ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <div
              className={`h-2 rounded-full ${item.color}`}
              style={{ width: `${item.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
});

ConversionFunnel.displayName = 'ConversionFunnel';
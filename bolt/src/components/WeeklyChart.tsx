import React, { useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const WeeklyChart: React.FC = React.memo(() => {
  const { isDark } = useTheme();
  
  const dailyActivity = useMemo(() => [
    { day: 'Mon', leads: 12, emails: 8 },
    { day: 'Tue', leads: 15, emails: 12 },
    { day: 'Wed', leads: 10, emails: 9 },
    { day: 'Thu', leads: 18, emails: 14 },
    { day: 'Fri', leads: 8, emails: 6 },
    { day: 'Sat', leads: 5, emails: 3 },
    { day: 'Sun', leads: 3, emails: 2 },
  ], []);

  const maxValue = useMemo(() => 
    Math.max(...dailyActivity.map(d => Math.max(d.leads, d.emails))),
  [dailyActivity]);

  return (
    <div className="space-y-4">
      {dailyActivity.map((day) => (
        <div key={day.day} className="flex items-center space-x-4">
          <div className={`w-8 text-xs font-medium ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            {day.day}
          </div>
          <div className="flex-1 flex items-center space-x-3">
            <div className="flex-1 flex items-center space-x-2">
              <div className={`flex-1 rounded-full h-2 ${isDark ? 'bg-slate-700' : 'bg-gray-200'} relative overflow-hidden`}>
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                  style={{ width: `${(day.leads / maxValue) * 100}%` }}
                ></div>
              </div>
              <div className={`w-6 text-xs ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                {day.leads}
              </div>
            </div>
            <div className="flex-1 flex items-center space-x-2">
              <div className={`flex-1 rounded-full h-2 ${isDark ? 'bg-slate-700' : 'bg-gray-200'} relative overflow-hidden`}>
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                  style={{ width: `${(day.emails / maxValue) * 100}%` }}
                ></div>
              </div>
              <div className={`w-6 text-xs ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                {day.emails}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-200 dark:border-slate-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Leads</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Emails</span>
        </div>
      </div>
    </div>
  );
});

WeeklyChart.displayName = 'WeeklyChart';
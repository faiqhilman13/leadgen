import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: typeof LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  bgColor: string;
  iconColor: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'neutral',
  bgColor,
  iconColor
}) => {
  const changeColors = {
    positive: 'text-green-600 bg-green-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50'
  };

  return (
    <div className={`${bgColor} rounded-2xl p-6 shadow-sm border border-white/20 hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`${iconColor} p-3 rounded-xl`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${changeColors[changeType]}`}>
            {change}
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};
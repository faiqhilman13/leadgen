import React from 'react';
import { Users, Mail, Clock, TrendingUp, Target } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { DashboardStats } from '../types';

interface DashboardProps {
  stats: DashboardStats;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Track your lead generation performance and key metrics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard
          title="Total Leads"
          value={stats.totalLeads}
          icon={Users}
          change="+12%"
          changeType="positive"
          bgColor="bg-gradient-to-br from-blue-50 to-indigo-50"
          iconColor="bg-gradient-to-br from-blue-500 to-indigo-500"
        />
        
        <StatsCard
          title="Emails Sent"
          value={stats.emailsSent}
          icon={Mail}
          change="+8%"
          changeType="positive"
          bgColor="bg-gradient-to-br from-green-50 to-emerald-50"
          iconColor="bg-gradient-to-br from-green-500 to-emerald-500"
        />
        
        <StatsCard
          title="Follow-ups Needed"
          value={stats.followUpsNeeded}
          icon={Clock}
          change="-5%"
          changeType="positive"
          bgColor="bg-gradient-to-br from-amber-50 to-orange-50"
          iconColor="bg-gradient-to-br from-amber-500 to-orange-500"
        />
        
        <StatsCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={Target}
          change="+3%"
          changeType="positive"
          bgColor="bg-gradient-to-br from-purple-50 to-pink-50"
          iconColor="bg-gradient-to-br from-purple-500 to-pink-500"
        />
        
        <StatsCard
          title="Response Rate"
          value={`${stats.responseRate}%`}
          icon={TrendingUp}
          change="+15%"
          changeType="positive"
          bgColor="bg-gradient-to-br from-teal-50 to-cyan-50"
          iconColor="bg-gradient-to-br from-teal-500 to-cyan-500"
        />
      </div>
    </div>
  );
};
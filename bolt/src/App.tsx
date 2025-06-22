import React, { useState, useMemo, useCallback } from 'react';
import { Users, Mail, Clock, TrendingUp, Target } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LeadDataProvider, useLeadData } from './contexts/LeadDataContext';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { MetricCard } from './components/MetricCard';
import { ChartCard } from './components/ChartCard';
import { ConversionFunnel } from './components/ConversionFunnel';
import { WeeklyChart } from './components/WeeklyChart';
import { ModernLeadTable } from './components/ModernLeadTable';
import { LoginForm } from './components/LoginForm';
import { StagewiseToolbar } from '@stagewise/toolbar-react';
import { ReactPlugin } from '@stagewise-plugins/react';
import Particles from './components/Particles';

const DashboardSection = React.memo(() => {
  const { leads, stats, loading, error } = useLeadData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600 dark:text-white/60">
            Loading lead data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-500 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 dark:text-white/60">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:bg-clip-initial dark:text-white">
          Lead Analytics
        </h1>
        <p className="text-gray-600 dark:text-white/60">
          {leads.length} active leads • Dashboard
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Leads"
          value={stats.totalLeads}
          icon={Users}
          change="+12.5%"
          changeType="positive"
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        
        <MetricCard
          title="Storage Used"
          value={`${stats.emailsSent}GB`}
          icon={Mail}
          change="+8.2%"
          changeType="positive"
          color="bg-gradient-to-br from-cyan-500 to-cyan-600"
        />
        
        <MetricCard
          title="Active Sessions"
          value={stats.followUpsNeeded}
          icon={Clock}
          change="+15.3%"
          changeType="positive"
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        
        <MetricCard
          title="Revenue"
          value={`$${stats.conversionRate}.4K`}
          icon={Target}
          change="+23.1%"
          changeType="positive"
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard 
          title="Monthly Revenue Trends"
          subtitle="+12.5% • 2024"
          action={
            <select className="text-sm border-0 bg-transparent text-gray-900 dark:text-white px-3 py-1 rounded-lg focus:outline-none">
              <option>2024</option>
              <option>2023</option>
            </select>
          }
        >
          <ConversionFunnel leads={leads} />
        </ChartCard>

        <ChartCard title="Genre Distribution">
          <WeeklyChart />
        </ChartCard>
      </div>

      {/* Lead Table */}
      <ModernLeadTable leads={leads} />
    </div>
  );
});

const LeadsSection = React.memo(() => {
  const { leads, loading, error } = useLeadData();
  
  if (loading) {
    return <div className="p-6">Loading lead data...</div>;
  }
  
  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text dark:text-transparent">
          Lead Management
        </h1>
        <p className="text-gray-600 dark:text-white/60">
          Manage and track all your leads
        </p>
      </div>
      <ModernLeadTable leads={leads} />
    </div>
  );
});

const AnalyticsSection = React.memo(() => {
  const { leads, loading, error } = useLeadData();
  
  if (loading) {
    return <div className="p-6">Loading lead data...</div>;
  }
  
  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text dark:text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-white/60">
          Deep insights into your lead generation performance
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Conversion Funnel">
          <ConversionFunnel leads={leads} />
        </ChartCard>
        <ChartCard title="Weekly Activity">
          <WeeklyChart />
        </ChartCard>
      </div>
    </div>
  );
});

const PlaceholderSection = React.memo(({ section }: { section: string }) => (
  <div className="flex items-center justify-center h-64">
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {section.charAt(0).toUpperCase() + section.slice(1)}
      </h2>
      <p className="text-gray-600 dark:text-white/60">
        This section is coming soon
      </p>
    </div>
  </div>
));

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderActiveSection = useCallback(() => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection />;
      case 'leads':
        return <LeadsSection />;
      case 'analytics':
        return <AnalyticsSection />;
      default:
        return <PlaceholderSection section={activeSection} />;
    }
  }, [activeSection]);

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-yellow-100 to-pink-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Show main dashboard if authenticated
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-yellow-100 to-pink-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-900 dark:to-slate-800 relative">
      {/* Particles Background */}
      <Particles
        particleColors={['#ffffff', '#ffffff']}
        particleCount={1000}
        particleSpread={30}
        speed={1.2}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles={false}
        disableRotation={true}
        className="fixed inset-0 z-0"
      />
      
      <div className="flex h-screen relative z-10">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <div className="flex-1 ml-64">
          <TopBar />
          
          <main className="p-6 overflow-y-auto h-[calc(100vh-4rem)] max-w-full">
            <div className="max-w-7xl mx-auto">
              {renderActiveSection()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

const App = React.memo(() => {
  // Force enable Stagewise toolbar in development mode
  const isStagewiseEnabled = import.meta.env.DEV;
  
  // SECURITY: Only log environment variables in development
  React.useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('App.tsx - Environment variables:', {
        isDev: import.meta.env.DEV,
        stagewiseEnabled: import.meta.env.VITE_STAGEWISE_ENABLED,
        isStagewiseEnabled
      });
    }
  }, [isStagewiseEnabled]);
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <LeadDataProvider>
          <AppContent />
          {isStagewiseEnabled && (
            <StagewiseToolbar 
              config={{
                plugins: [ReactPlugin]
              }}
            />
          )}
        </LeadDataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
});

// Add display names for React DevTools
DashboardSection.displayName = 'DashboardSection';
LeadsSection.displayName = 'LeadsSection';
AnalyticsSection.displayName = 'AnalyticsSection';
PlaceholderSection.displayName = 'PlaceholderSection';
App.displayName = 'App';

export default App;
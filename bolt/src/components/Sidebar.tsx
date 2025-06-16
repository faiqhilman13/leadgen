import React from 'react';
import { BarChart3, Users, Mail, TrendingUp, Settings, Target, Clock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const { isDark } = useTheme();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'campaigns', label: 'Campaigns', icon: Mail },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'follow-ups', label: 'Follow-ups', icon: Clock },
    { id: 'targets', label: 'Targets', icon: Target },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`
      w-64 h-screen fixed left-0 top-0 transition-all duration-300
      ${isDark 
        ? 'bg-slate-900/80 backdrop-blur-xl border-slate-700/60' 
        : 'bg-white/30 backdrop-blur-xl border-white/20'
      }
      border-r shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
    `}>
      {/* Logo */}
      <div className={`p-6 border-b ${isDark ? 'border-slate-700/60' : 'border-white/20'}`}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 pastel-violet-gradient rounded-lg flex items-center justify-center gradient-shadow">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              LeadFlow
            </h1>
            <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              Analytics Suite
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium 
                  transition-all duration-200 group relative overflow-hidden
                  ${isActive
                    ? isDark
                      ? 'bg-white/20 text-white border border-white/30 shadow-lg backdrop-blur-sm'
                      : 'bg-white/60 text-purple-700 border border-white/40 shadow-lg backdrop-blur-sm'
                    : isDark
                      ? 'text-white/70 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/40 hover:backdrop-blur-sm'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute inset-0 pastel-purple-gradient opacity-20" />
                )}
                <Icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Upgrade Card */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className={`
          relative p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer
          ${isDark 
            ? 'bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30 hover:border-white/40' 
            : 'bg-white/40 backdrop-blur-xl border border-white/30 hover:bg-white/60 hover:border-white/40'
          }
          shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
          before:absolute before:inset-0 before:rounded-xl before:p-[1px]
          before:bg-gradient-to-br before:from-white/30 before:to-transparent
          before:mask-composite:exclude before:mask:linear-gradient(#fff_0_0)
        `}>
          <div className="relative z-10">
            <h3 className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Upgrade to Pro
            </h3>
            <p className={`text-xs mb-3 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
              Get unlimited leads and advanced analytics
            </p>
            <button className="w-full pastel-purple-gradient text-white text-xs font-medium py-2 px-3 rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg backdrop-blur-sm">
              Upgrade Now
            </button>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pastel-purple-gradient opacity-20" />
        </div>
      </div>
    </div>
  );
};
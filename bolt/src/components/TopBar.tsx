import React from 'react';
import { Search, Bell, Sun, Moon, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const TopBar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`
      h-16 flex items-center justify-between px-6 transition-all duration-300
      ${isDark 
        ? 'bg-slate-900/80 backdrop-blur-xl border-slate-700/60' 
        : 'bg-white/30 backdrop-blur-xl border-white/20'
      }
      border-b shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
    `}>
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            isDark ? 'text-white/40' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Search leads, campaigns..."
            className={`
              w-full pl-10 pr-4 py-2 rounded-lg text-sm
              ${isDark 
                ? 'bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-purple-400/50' 
                : 'bg-white/50 border border-white/30 text-gray-900 placeholder-gray-500 focus:border-purple-400/50'
              }
              focus:outline-none focus:ring-1 focus:ring-purple-500/20
            `}
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`
            p-2 rounded-lg transition-colors duration-200
            ${isDark 
              ? 'text-white/60 hover:text-white hover:bg-white/10' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/40'
            }
          `}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <button className={`
          p-2 rounded-lg transition-colors duration-200
          ${isDark 
            ? 'text-white/60 hover:text-white hover:bg-white/10' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-white/40'
          }
        `}>
          <Bell className="w-5 h-5" />
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 pastel-violet-gradient rounded-lg flex items-center justify-center gradient-shadow">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              John Doe
            </p>
            <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              Admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, children, action }) => {
  const { isDark } = useTheme();

  return (
    <div className={`
      relative p-6 rounded-2xl transition-all duration-300 hover:scale-[1.01] group
      ${isDark 
        ? 'bg-slate-800/70 backdrop-blur-xl border border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-600/70' 
        : 'bg-white/40 backdrop-blur-xl border border-white/20 hover:bg-white/60 hover:border-white/30'
      }
      shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
      before:absolute before:inset-0 before:rounded-2xl before:p-[1px]
      before:bg-gradient-to-br before:from-white/20 before:to-transparent
      before:mask-composite:exclude before:mask:linear-gradient(#fff_0_0)
    `}>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h3>
            {subtitle && (
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                {subtitle}
              </p>
            )}
          </div>
          {action && (
            <div className={`
              ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/50 border-white/30'}
              backdrop-blur-sm rounded-lg border
            `}>
              {action}
            </div>
          )}
        </div>
        {children}
      </div>
      
      {/* Subtle glow effect */}
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
        ${isDark 
          ? 'bg-gradient-to-br from-cyan-500/30 to-pink-500/30' 
          : 'bg-gradient-to-br from-cyan-500/5 to-pink-500/5'
        }
      `} />
    </div>
  );
};
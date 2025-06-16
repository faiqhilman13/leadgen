import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: typeof LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  color: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'neutral',
  color
}) => {
  const { isDark } = useTheme();

  const changeColors = {
    positive: isDark ? 'text-green-400' : 'text-green-600',
    negative: isDark ? 'text-red-400' : 'text-red-600',
    neutral: isDark ? 'text-slate-400' : 'text-gray-600'
  };

  // Map color names to our custom CSS classes
  const gradientMap: Record<string, string> = {
    'bg-gradient-to-br from-blue-500 to-blue-600': 'pastel-blue-gradient',
    'bg-gradient-to-br from-blue-300 to-indigo-400': 'pastel-blue-gradient',
    'bg-gradient-to-br from-cyan-500 to-cyan-600': 'pastel-cyan-gradient',
    'bg-gradient-to-br from-cyan-300 to-sky-400': 'pastel-cyan-gradient',
    'bg-gradient-to-br from-green-500 to-green-600': 'pastel-green-gradient',
    'bg-gradient-to-br from-emerald-300 to-teal-400': 'pastel-green-gradient',
    'bg-gradient-to-br from-purple-500 to-purple-600': 'pastel-purple-gradient',
    'bg-gradient-to-br from-violet-300 to-purple-400': 'pastel-purple-gradient',
    'bg-gradient-to-br from-red-500 to-red-600': 'pastel-purple-gradient',
    'bg-gradient-to-br from-yellow-500 to-yellow-600': 'pastel-cyan-gradient',
    'bg-gradient-to-br from-pink-500 to-pink-600': 'pastel-purple-gradient',
  };

  // Use the gradient map or fallback to a default pastel gradient
  const gradientClass = gradientMap[color] || 'pastel-violet-gradient';

  return (
    <div className={`
      relative p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer
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
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${gradientClass} gradient-shadow`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          {change && (
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              isDark ? 'bg-white/10' : 'bg-black/5'
            } ${changeColors[changeType]}`}>
              {change}
            </span>
          )}
        </div>
        <div>
          <p className={`text-sm font-medium mb-1 ${
            isDark ? 'text-white/70' : 'text-gray-600'
          }`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {value}
          </p>
        </div>
      </div>
      
      {/* Subtle glow effect */}
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
        ${isDark 
          ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30' 
          : 'bg-gradient-to-br from-blue-500/5 to-purple-500/5'
        }
      `} />
    </div>
  );
};
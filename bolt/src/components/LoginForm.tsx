import React, { useState } from 'react';
import { Mail, Lock, LogIn, Eye, EyeOff, BarChart3 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import Particles from './Particles';

export const LoginForm: React.FC = () => {
  const { isDark } = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (!result.success) {
      setError(result.error || 'Login failed');
    }
    
    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
      isDark ? 'bg-slate-900' : 'bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50'
    }`}>
      {/* Background Particles */}
      <Particles />
      
      {/* Login Container */}
      <div className={`
        relative z-10 w-full max-w-md p-8 rounded-3xl transition-all duration-300
        ${isDark 
          ? 'bg-slate-800/70 backdrop-blur-xl border border-slate-700/60' 
          : 'bg-white/40 backdrop-blur-xl border border-white/20'
        }
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        before:absolute before:inset-0 before:rounded-3xl before:p-[1px]
        before:bg-gradient-to-br before:from-white/20 before:to-transparent
        before:mask-composite:exclude before:mask:linear-gradient(#fff_0_0)
      `}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 pastel-violet-gradient rounded-2xl gradient-shadow">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className={`text-2xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome Back
          </h1>
          <p className={`text-sm ${
            isDark ? 'text-white/60' : 'text-gray-600'
          }`}>
            Sign in to your LeadFlow Analytics account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className={`
            mb-6 p-4 rounded-xl text-sm font-medium
            ${isDark 
              ? 'bg-red-500/20 border border-red-500/30 text-red-300' 
              : 'bg-red-50 border border-red-200 text-red-600'
            }
          `}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-white/70' : 'text-gray-700'
            }`}>
              Email Address
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-white/40' : 'text-gray-400'
              }`} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@leadgen.com"
                className={`
                  w-full pl-12 pr-4 py-3 rounded-xl text-sm transition-all duration-200
                  ${isDark 
                    ? 'bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-purple-400/50 focus:bg-white/15' 
                    : 'bg-white/50 border border-white/30 text-gray-900 placeholder-gray-500 focus:border-purple-400/50 focus:bg-white/70'
                  }
                  focus:outline-none focus:ring-2 focus:ring-purple-500/20
                `}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-white/70' : 'text-gray-700'
            }`}>
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-white/40' : 'text-gray-400'
              }`} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className={`
                  w-full pl-12 pr-12 py-3 rounded-xl text-sm transition-all duration-200
                  ${isDark 
                    ? 'bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-purple-400/50 focus:bg-white/15' 
                    : 'bg-white/50 border border-white/30 text-gray-900 placeholder-gray-500 focus:border-purple-400/50 focus:bg-white/70'
                  }
                  focus:outline-none focus:ring-2 focus:ring-purple-500/20
                `}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  isDark ? 'text-white/40 hover:text-white/60' : 'text-gray-400 hover:text-gray-600'
                } transition-colors duration-200`}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              relative z-20 w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-200
              pastel-violet-gradient gradient-shadow
              hover:scale-[1.02] hover:shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              flex items-center justify-center space-x-2
            `}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className={`
          mt-6 p-4 rounded-xl text-sm
          ${isDark 
            ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300' 
            : 'bg-blue-50 border border-blue-200 text-blue-600'
          }
        `}>
          <p className="font-medium mb-1">Demo Credentials:</p>
          <p>Email: admin@leadgen.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
}; 
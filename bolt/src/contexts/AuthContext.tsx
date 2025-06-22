import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Try session-based auth first
      const response = await fetch('http://localhost:3001/api/status', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          setUser(data.user);
          setLoading(false);
          return;
        }
      }

      // If session fails, try token-based auth
      const token = localStorage.getItem('auth_token');
      if (token) {
        const tokenResponse = await fetch(`http://localhost:3001/api/status?token=${token}`, {
          credentials: 'include'
        });

        if (tokenResponse.ok) {
          const tokenData = await tokenResponse.json();
          if (tokenData.authenticated) {
            setIsAuthenticated(true);
            setUser(tokenData.user);
            setLoading(false);
            return;
          }
        }
      }

      // No valid authentication found
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('auth_token');
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        setUser(data.user);
        
        // Store token for fallback authentication
        if (data.token) {
          localStorage.setItem('auth_token', data.token);
        }
        
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      // Call logout endpoint
      await fetch('http://localhost:3001/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state regardless of API call success
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('auth_token');
    }
  }, []);

  const authContextValue = React.useMemo(() => ({
    isAuthenticated,
    user,
    login,
    logout,
    loading
  }), [isAuthenticated, user, login, logout, loading]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}; 
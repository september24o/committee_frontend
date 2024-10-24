import React, { createContext, useContext, useState, useCallback } from 'react';
import { loginApi } from '../services/auth';
import { AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    error: null,
  });

  const login = useCallback(async (username: string, password: string) => {
    try {
      const response = await loginApi(username, password);
      
      switch (response.status) {
        case 1:
          setAuth({
            isAuthenticated: true,
            token: response.token!,
            error: null,
          });
          break;
        case 2:
          setAuth(prev => ({
            ...prev,
            error: '用户名或密码错误',
          }));
          break;
        case 3:
          setAuth(prev => ({
            ...prev,
            error: response.message || '认证系统暂时无法访问',
          }));
          break;
      }
    } catch (error) {
      setAuth(prev => ({
        ...prev,
        error: '登录过程中发生错误',
      }));
    }
  }, []);

  const logout = useCallback(() => {
    setAuth({
      isAuthenticated: false,
      token: null,
      error: null,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
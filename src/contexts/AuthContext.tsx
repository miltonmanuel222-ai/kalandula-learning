import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    return null;
  });

  useEffect(() => {
    // We already loaded the user synchronously, but we can keep this for any other side effects if needed.
    // Or we can just leave it empty. Let's just remove the logic from useEffect since it's in useState now.
  }, []);

  const login = (name: string, email: string) => {
    const currentUser = authService.registerUser(name, email);
    setUser(currentUser);
    try {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } catch (e) {
      console.error('Error saving current user:', e);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

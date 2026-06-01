'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  requestSmsCode,
  verifySmsCode,
  getCredits,
  getToken,
  removeToken,
  type Credits,
} from '@/lib/api';

interface User {
  id: string;
  phoneNumber?: string;
  creditsCents: number;
  trialUsed: boolean;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  credits: Credits | null;
  isLoading: boolean;
  requestSms: (phone: string) => Promise<void>;
  verifySms: (phone: string, code: string) => Promise<void>;
  logout: () => void;
  refreshCredits: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AppAuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshCredits = useCallback(async () => {
    if (!getToken()) return;
    try {
      const c = await getCredits();
      setCredits(c);
    } catch {
      setCredits(null);
    }
  }, []);

  // Bootstrap — check if token exists
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    // Try loading credits as auth check
    getCredits()
      .then((c) => {
        setIsLoggedIn(true);
        setCredits(c);
        setUser({ id: 'current', creditsCents: c.creditsCents, trialUsed: false });
      })
      .catch(() => {
        removeToken();
        setIsLoggedIn(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const requestSms = async (phone: string) => {
    await requestSmsCode(phone);
  };

  const verifySms = async (phone: string, code: string) => {
    const data = await verifySmsCode(phone, code);
    setIsLoggedIn(true);
    setUser({
      id: data.user.id,
      phoneNumber: data.user.phoneNumber,
      creditsCents: data.user.creditsCents,
      trialUsed: data.user.trialUsed,
    });
    const c = await getCredits().catch(() => null);
    setCredits(c);
  };

  const logout = () => {
    removeToken();
    setIsLoggedIn(false);
    setUser(null);
    setCredits(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, credits, isLoading, requestSms, verifySms, logout, refreshCredits }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAppAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAppAuth must be inside AppAuthProvider');
  return ctx;
}

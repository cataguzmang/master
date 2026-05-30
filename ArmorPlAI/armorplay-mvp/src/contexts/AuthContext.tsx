// ─── ArmorPlay AI · AuthContext ──────────────────────────────────────
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Lang } from '../lib/i18n';
import type { MockUser } from '../lib/mockData';

export type Role = 'director' | 'preparador' | 'jugador';

interface AuthState {
  isAuthenticated: boolean;
  user: MockUser | null;
  role: Role | null;
  language: Lang;
}

interface AuthContextValue extends AuthState {
  login: (user: MockUser) => void;
  logout: () => void;
  setLanguage: (lang: Lang) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'armorplay_auth';

function loadFromStorage(): AuthState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthState;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const saved = loadFromStorage();
    return saved ?? { isAuthenticated: false, user: null, role: null, language: 'es' };
  });

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const login = (user: MockUser) => {
    setState(prev => ({
      ...prev,
      isAuthenticated: true,
      user,
      role: user.rol,
    }));
  };

  const logout = () => {
    setState(prev => ({
      isAuthenticated: false,
      user: null,
      role: null,
      language: prev.language,
    }));
  };

  const setLanguage = (language: Lang) => {
    setState(prev => ({ ...prev, language }));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, setLanguage }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

/** Hook shortcut for the translation function */
export function useLang() {
  const { language } = useAuth();
  return language;
}

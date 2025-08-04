import { useState, useEffect } from 'react';
import authService, { Session } from '../services/authService';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<Session | null>(null);

  useEffect(() => {
    // Initialize auth state on mount
    const initAuth = async () => {
      const session = await authService.getSession();
      setUser(session);
      setIsLoading(false);
    };

    initAuth();

    // Listen for auth state changes
    const unsubscribe = authService.onAuthStateChange((session) => {
      setUser(session);
    });

    return unsubscribe;
  }, []);

  const signIn = async (provider: string = 'google') => {
    setIsLoading(true);
    const result = await authService.signIn(provider);
    setIsLoading(false);
    return result;
  };

  const signOut = async () => {
    setIsLoading(true);
    const result = await authService.signOut();
    setIsLoading(false);
    return result;
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signOut,
  };
};

// Simple provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
}; 
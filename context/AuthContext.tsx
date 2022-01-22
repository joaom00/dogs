import React from 'react';
import type { User } from '@supabase/supabase-js';

import { supabase } from '@/lib/supabase';
import { api } from '@/lib/api';

type AuthSession = {
  user: User | null;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = React.createContext<AuthSession | undefined>(undefined);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = React.useState<User | null>(supabase.auth.user());

  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    async function sendCookie() {
      await api.post('/auth', {
        event: supabase.auth.user() ? 'SIGNED_IN' : 'SIGNED_OUT',
        session: supabase.auth.session(),
      });
    }
    sendCookie();
  }, [user]);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useUser() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useUser must be used within a AuthContextProvider.`);
  }

  return context;
}

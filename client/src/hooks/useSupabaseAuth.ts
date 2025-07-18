import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase';

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const supabase = await getSupabase();
        if (!supabase) {
          setLoading(false);
          return;
        }
        
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      } catch (error) {
        console.error('Error getting initial session:', error);
        setLoading(false);
      }
    };

    getInitialSession();

    // Set up auth listener
    const setupAuthListener = async () => {
      try {
        const supabase = await getSupabase();
        if (!supabase) return;
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);

            if (event === 'SIGNED_IN') {
              localStorage.setItem('supabase_session', JSON.stringify(session));
            } else if (event === 'SIGNED_OUT') {
              localStorage.removeItem('supabase_session');
              localStorage.removeItem('auth_token');
            }
          }
        );

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Error setting up auth listener:', error);
      }
    };

    setupAuthListener();
  }, []);

  const signOut = async () => {
    try {
      const supabase = await getSupabase();
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    user,
    session,
    loading,
    signOut,
    isAuthenticated: !!user,
  };
}

import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser } from '@/types';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const authUser: AuthUser = {
          id: session.user.id,
          email: session.user.email,
          created_at: session.user.created_at,
        };
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // THEN check for existing session
    const getUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const authUser: AuthUser = {
            id: session.user.id,
            email: session.user.email,
            created_at: session.user.created_at,
          };
          setUser(authUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error getting session:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
};

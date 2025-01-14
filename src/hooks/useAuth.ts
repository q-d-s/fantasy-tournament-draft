import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser } from '@/types/database';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const authUser: AuthUser = {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
        };
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
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

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
};
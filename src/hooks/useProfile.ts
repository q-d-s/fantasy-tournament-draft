import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Profile, ProfileUpdate } from '@/types/database';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './useAuth';

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchProfile = async () => {
    try {
      if (!user) {
        setError(new Error('No user found'));
        return;
      }

      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      
      if (data) {
        setProfile(data as Profile);
      }
    } catch (err) {
      setError(err as Error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load profile data.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const updateProfile = async (updates: ProfileUpdate) => {
    try {
      if (!user) throw new Error('No user found');

      const { error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (updateError) throw updateError;
      
      setProfile(prev => prev ? { ...prev, ...updates } as Profile : null);
      
      toast({
        title: "Success",
        description: "Profile updated successfully.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile.",
      });
      throw err;
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    refreshProfile: fetchProfile,
  };
};
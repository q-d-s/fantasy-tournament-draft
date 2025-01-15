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
        setProfile(null);
        return;
      }

      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      
      if (data) {
        setProfile(data as Profile);
      } else {
        // If no profile found, we'll create one
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{ 
            id: user.id,
            username: user.email?.split('@')[0],
            email_notifications: false,
            phone_notifications: false
          }])
          .select()
          .single();

        if (createError) throw createError;
        if (newProfile) setProfile(newProfile as Profile);
      }
    } catch (err) {
      setError(err as Error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load profile data. Please try refreshing the page.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
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

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Profile, ProfileUpdate } from '@/types/database/profile.types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './useAuth';

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchProfile = async () => {
    try {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, created_at')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        // If profile doesn't exist, create it
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([
            {
              id: user.id,
              username: user.email?.split('@')[0] || `user_${user.id.slice(0, 8)}`,
            }
          ])
          .select()
          .single();

        if (createError) throw createError;
        setProfile(newProfile as Profile);
      } else {
        setProfile(data as Profile);
      }
      
    } catch (err) {
      console.error('Error fetching/creating profile:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load profile data",
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

      const { error: updateError, data } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (updateError) throw updateError;
      
      setProfile(data as Profile);
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (err) {
      console.error('Error updating profile:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile",
      });
      throw err;
    }
  };

  return {
    profile,
    loading,
    updateProfile,
    refreshProfile: fetchProfile,
  };
};

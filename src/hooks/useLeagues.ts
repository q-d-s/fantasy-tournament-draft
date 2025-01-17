import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { League } from "@/types/leagues.types";

export const usePublicLeagues = () => {
  return useQuery({
    queryKey: ["public-leagues"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leagues")
        .select(`
          *,
          tournament:tournaments(name, start_date, end_date),
          owner_id,
          member_count:league_members(count)
        `)
        .eq("is_public", true)
        .order("created_at", { ascending: true });

      if (error) throw error;

      // Fetch usernames separately since we can't directly join auth.users
      const ownerIds = (data || []).map(league => league.owner_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, username")
        .in("id", ownerIds);

      // Create a map of owner_id to username
      const usernameMap = new Map(
        (profiles || []).map(profile => [profile.id, profile.username])
      );
      
      // Transform the data to match our League type
      const leagues = (data || []).map(league => ({
        ...league,
        tournament: league.tournament?.[0] || null,
        owner: { username: usernameMap.get(league.owner_id) || null },
        member_count: league.member_count || []
      }));

      return leagues as League[];
    },
  });
};

export const useUpcomingTournaments = () => {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
      
      const { data, error } = await supabase
        .from("tournaments")
        .select("*")
        .gte("start_date", today)
        .order("start_date", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
};

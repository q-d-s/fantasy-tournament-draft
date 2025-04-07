
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { League } from "@/types";

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
      
      if (ownerIds.length === 0) return [];
      
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
        member_count: league.member_count || [],
        settings: league.settings as Record<string, any> || {}
      }));

      return leagues as League[];
    },
  });
};

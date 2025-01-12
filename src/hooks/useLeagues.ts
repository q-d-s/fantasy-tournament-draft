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
          owner:profiles(username),
          member_count:league_members(count)
        `)
        .eq("is_public", true)
        .order("created_at", { ascending: true });

      if (error) throw error;
      
      // Transform the data to match our League type
      const leagues = (data || []).map(league => ({
        ...league,
        tournament: league.tournament?.[0] || null,
        owner: league.owner?.[0] || null,
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
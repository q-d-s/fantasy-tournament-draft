import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { League } from "@/types/leagues.types";

export const usePublicLeagues = () => {
  return useQuery({
    queryKey: ["public-leagues"],
    queryFn: async (): Promise<League[]> => {
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
      return data || [];
    },
  });
};

export const useUpcomingTournaments = () => {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tournaments")
        .select("*")
        .gte("start_date", new Date().toISOString())
        .order("start_date", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
};
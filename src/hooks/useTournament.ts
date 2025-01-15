import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tournament, TournamentWithTeams } from "@/types/database/tournament.types";

export const useTournament = (tournamentId: string | undefined) => {
  return useQuery({
    queryKey: ['tournament', tournamentId],
    queryFn: async (): Promise<TournamentWithTeams | null> => {
      if (!tournamentId) return null;

      // Fetch tournament with its teams
      const { data: tournament, error: tournamentError } = await supabase
        .from('tournaments')
        .select(`
          *,
          teams (
            id,
            name,
            group_name
          )
        `)
        .eq('id', tournamentId)
        .single();

      if (tournamentError) throw tournamentError;
      if (!tournament) return null;

      return tournament as TournamentWithTeams;
    },
    enabled: !!tournamentId,
  });
};

export const useUpcomingTournaments = () => {
  return useQuery({
    queryKey: ['upcoming-tournaments'],
    queryFn: async (): Promise<Tournament[]> => {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('tournaments')
        .select(`
          *,
          teams (
            id,
            name,
            group_name
          )
        `)
        .gte('start_date', today)
        .order('start_date', { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
};
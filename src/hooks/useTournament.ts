
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tournament } from "@/types";

export const useTournament = (tournamentId: string | undefined) => {
  return useQuery({
    queryKey: ['tournament', tournamentId],
    queryFn: async (): Promise<Tournament | null> => {
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

      // Transform database tournament to app Tournament type
      return {
        id: tournament.id,
        name: tournament.name,
        start_date: tournament.start_date,
        end_date: tournament.end_date,
        type: tournament.type as any,
        metadata: tournament.metadata || {},
        teams: tournament.teams || []
      } as unknown as Tournament;
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
      
      // Transform database tournaments to app Tournament type
      return (data || []).map(tournament => ({
        id: tournament.id,
        name: tournament.name,
        start_date: tournament.start_date,
        end_date: tournament.end_date,
        type: tournament.type as any,
        metadata: tournament.metadata || {},
        teams: tournament.teams || []
      })) as unknown as Tournament[];
    },
  });
};

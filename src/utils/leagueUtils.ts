/**
 * Utility functions for league-related operations
 */

import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

/**
 * Creates a new league in the database
 * @param {string} name - The name of the league
 * @param {string} tournamentId - The ID of the tournament
 * @param {number} maxPlayers - Maximum number of players allowed
 * @param {boolean} isPublic - Whether the league is public or private
 * @returns {Promise<{ data: any, error: Error | null }>} The created league or error
 */
export const createLeague = async (
  name: string,
  tournamentId: string,
  maxPlayers: number,
  isPublic: boolean
): Promise<{ data: any; error: Error | null }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No user found");

    const { data: league, error: leagueError } = await supabase
      .from("leagues")
      .insert({
        name,
        tournament_id: tournamentId,
        owner_id: user.id,
        max_players: maxPlayers,
        is_public: isPublic,
      })
      .select()
      .single();

    if (leagueError) throw leagueError;

    // Add creator as league member
    const { error: memberError } = await supabase
      .from("league_members")
      .insert({
        league_id: league.id,
        user_id: user.id,
      });

    if (memberError) throw memberError;

    return { data: league, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

/**
 * Fetches upcoming tournaments from the database
 * @returns {Promise<{ data: any[], error: Error | null }>} List of tournaments or error
 */
export const fetchUpcomingTournaments = async () => {
  const { data, error } = await supabase
    .from('tournaments')
    .select('*')
    .gte('start_date', new Date().toISOString())
    .order('start_date', { ascending: true });
  
  return { data, error };
};
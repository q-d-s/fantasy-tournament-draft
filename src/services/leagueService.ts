/**
 * Service for handling league-related operations
 */
import { supabase } from "@/integrations/supabase/client";
import type { CreateLeagueResponse, LeagueFormData } from "@/types/league.types";

/**
 * Creates a new league in the database
 * @param {LeagueFormData} leagueData - The data for creating a new league
 * @returns {Promise<CreateLeagueResponse>} The created league or error
 */
export const createLeague = async (
  leagueData: LeagueFormData
): Promise<CreateLeagueResponse> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Authentication required");

    const { data: league, error: leagueError } = await supabase
      .from("leagues")
      .insert({
        name: leagueData.name,
        tournament_id: leagueData.tournamentId,
        owner_id: user.id,
        max_players: leagueData.maxPlayers,
        is_public: leagueData.isPublic,
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
    console.error("Error creating league:", error);
    return { data: null, error };
  }
};

/**
 * Fetches upcoming tournaments from the database
 * @returns {Promise<{ data: Tournament[] | null, error: Error | null }>}
 */
export const fetchUpcomingTournaments = async () => {
  try {
    const { data, error } = await supabase
      .from('tournaments')
      .select('*')
      .gte('start_date', new Date().toISOString())
      .order('start_date', { ascending: true });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error("Error fetching tournaments:", error);
    return { data: null, error };
  }
};
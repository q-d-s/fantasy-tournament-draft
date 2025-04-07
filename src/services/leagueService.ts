
import { supabase } from "@/integrations/supabase/client";
import { League, LeagueFormInputs, ServiceResponse } from "@/types";
import { Tournament } from "@/types/database/tournament.types";

/**
 * Creates a new league and adds the creator as the first member
 */
export const createLeague = async (leagueData: LeagueFormInputs): Promise<ServiceResponse<League>> => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("Authentication required");

    // Format draft date if draftTime is provided
    const draftDate = leagueData.draftTime 
      ? `${leagueData.draftDate}T${leagueData.draftTime}` 
      : leagueData.draftDate;

    // Create the league
    const { data: league, error: leagueError } = await supabase
      .from("leagues")
      .insert({
        name: leagueData.name,
        tournament_id: leagueData.tournamentId,
        owner_id: user.id,
        max_players: leagueData.maxPlayers,
        is_public: leagueData.isPublic,
        draft_date: draftDate,
      })
      .select()
      .single();

    if (leagueError) throw leagueError;
    if (!league) throw new Error("Failed to create league");

    // Add the creator as a league member
    const { error: memberError } = await supabase
      .from("league_members")
      .insert({
        league_id: league.id,
        user_id: user.id,
      });

    if (memberError) throw memberError;

    // Convert Json type to Record<string, any>
    const typedLeague: League = {
      ...league,
      settings: league.settings as Record<string, any> || {}
    };

    return { data: typedLeague, error: null };
  } catch (error: any) {
    console.error('League creation error:', error);
    return { data: null, error: error instanceof Error ? error : new Error(error.message || 'Unknown error') };
  }
};

/**
 * Fetches upcoming tournaments from the database
 */
export const fetchUpcomingTournaments = async (): Promise<ServiceResponse<Tournament[]>> => {
  try {
    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
      .gte("start_date", new Date().toISOString())
      .order("start_date", { ascending: true });

    if (error) throw error;
    
    // Ensure the data is properly typed
    const typedTournaments = data as Tournament[];
    
    return { data: typedTournaments, error: null };
  } catch (error: any) {
    console.error('Tournament fetch error:', error);
    return { data: null, error: error instanceof Error ? error : new Error(error.message || 'Unknown error') };
  }
};

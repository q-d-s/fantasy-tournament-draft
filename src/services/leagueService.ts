import { supabase } from "@/integrations/supabase/client";
import type { LeagueFormInputs } from "@/types/leagues.types";

export const createLeague = async (leagueData: LeagueFormInputs) => {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("Authentication required");

  // Create the league
  const { data: league, error: leagueError } = await supabase
    .from("leagues")
    .insert({
      name: leagueData.name,
      tournament_id: leagueData.tournamentId,
      owner_id: user.id,
      max_players: leagueData.maxPlayers,
      is_public: leagueData.isPublic,
      draft_date: leagueData.draftDate,
    })
    .select()
    .single();

  if (leagueError) {
    console.error('League creation error:', leagueError);
    throw new Error(leagueError.message);
  }

  // Add the creator as a league member
  const { error: memberError } = await supabase
    .from("league_members")
    .insert({
      league_id: league.id,
      user_id: user.id,
    });

  if (memberError) {
    console.error('League member creation error:', memberError);
    throw memberError;
  }

  return { data: league, error: null };
};

export const fetchUpcomingTournaments = async () => {
  const { data, error } = await supabase
    .from("tournaments")
    .select("*")
    .gte("start_date", new Date().toISOString())
    .order("start_date", { ascending: true });

  if (error) {
    console.error('Tournament fetch error:', error);
    throw error;
  }

  return { data, error };
};
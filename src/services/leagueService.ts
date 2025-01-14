import { supabase } from "@/integrations/supabase/client";
import type { LeagueFormInputs } from "@/types/leagues.types";

export const createLeague = async (leagueData: LeagueFormInputs) => {
  const { data: { user } } = await supabase.auth.getUser();
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

  if (leagueError) throw leagueError;

  // Add the creator as a league member
  const { error: memberError } = await supabase
    .from("league_members")
    .insert({
      league_id: league.id,
      user_id: user.id,
    });

  if (memberError) throw memberError;

  return { data: league, error: null };
};

export const fetchUpcomingTournaments = async () => {
  const { data, error } = await supabase
    .from("tournaments")
    .select("*")
    .gte("start_date", new Date().toISOString())
    .order("start_date", { ascending: true });

  return { data, error };
};
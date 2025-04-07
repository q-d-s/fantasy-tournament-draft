
/**
 * Type definitions for league-related data
 */

export interface League {
  id: string;
  name: string;
  tournament_id: string;
  owner_id: string;
  max_players: number;
  is_public: boolean;
  created_at: string;
  draft_date?: string | null;
  invite_code?: string;
  logo_url?: string | null;
  settings?: Record<string, any>;
  tournament?: {
    name: string;
    start_date: string;
    end_date: string;
  } | null;
  owner?: {
    username: string | null;
  } | null;
  member_count?: Array<{ count: number }>;
}

export interface LeagueFormData {
  name: string;
  tournamentId: string;
  maxPlayers: number;
  isPublic: boolean;
}

export interface LeagueMember {
  league_id: string;
  user_id: string;
  joined_at: string;
}

/**
 * Type definitions for league-related data and operations
 */

export interface LeagueFormData {
  name: string;
  tournamentId: string;
  maxPlayers: number;
  isPublic: boolean;
}

export interface Tournament {
  id: string;
  name: string;
  start_date: string;
  type: 'FIFA_CLUB' | 'FIFA_WORLD_CUP' | 'EUROS' | 'MARCH_MADNESS';
}

export interface CreateLeagueResponse {
  data: {
    id: string;
    name: string;
    tournament_id: string;
    owner_id: string;
    max_players: number;
    is_public: boolean;
    created_at: string;
  } | null;
  error: Error | null;
}
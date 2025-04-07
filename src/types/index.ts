
// Core database types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Auth types
export interface AuthUser {
  id: string;
  email?: string | undefined;
  created_at: string;
}

// Tournament types
export type TournamentType = 'FIFA_CLUB' | 'FIFA_WORLD_CUP' | 'EUROS' | 'MARCH_MADNESS';

export interface Tournament {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  type: TournamentType;
  metadata?: {
    teams_count?: number;
    has_group_stage?: boolean;
    has_third_place?: boolean;
    max_rounds?: number;
  };
  teams?: Array<{
    id: string;
    name: string;
    group_name?: string | null;
  }>;
}

// League types
export interface League {
  id: string;
  name: string;
  tournament_id: string;
  owner_id: string;
  max_players: number;
  is_public: boolean;
  created_at: string;
  draft_date?: string | null;
  invite_code?: string | null;
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

export interface LeagueFormInputs {
  name: string;
  tournamentId: string;
  maxPlayers: number;
  isPublic: boolean;
  draftDate: string;
  draftTime?: string;
}

export interface LeagueMember {
  league_id: string;
  user_id: string;
  joined_at: string;
}

export interface LeagueInvite {
  id: string;
  league_id: string | null;
  email: string | null;
  phone: string | null;
  invite_code: string | null;
  status: string | null;
  created_at: string;
  expires_at: string;
}

// Team and standings
export interface Team {
  id: string;
  tournament_id: string | null;
  name: string;
  group_name: string | null;
  wins: number;
  draws: number;
  losses: number;
  group_points: number;
  knockout_points: number;
  total_points: number;
  created_at: string;
}

export interface Standing {
  teamName: string;
  wins: number;
  draws: number;
  losses: number;
  groupPoints: number;
  knockoutPoints: number;
  totalPoints: number;
}

// Profile types
export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
  notification_preferences?: Json;
  phone?: string | null;
  email_notifications?: boolean;
  phone_notifications?: boolean;
  default_avatar_icon?: string | null;
}

export interface ProfileUpdate {
  username?: string;
  avatar_url?: string;
  notification_preferences?: Json;
  phone?: string;
  email_notifications?: boolean;
  phone_notifications?: boolean;
  default_avatar_icon?: string;
}

// Service response types
export interface ServiceResponse<T> {
  data: T | null;
  error: Error | null;
}

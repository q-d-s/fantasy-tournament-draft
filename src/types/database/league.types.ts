import { Json } from "./auth.types";

export interface League {
  id: string;
  name: string;
  tournament_id: string;
  owner_id: string;
  draft_date: string | null;
  max_players: number;
  invite_code: string | null;
  created_at: string;
  is_public: boolean;
  logo_url: string | null;
  settings: Json;
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

export interface LeagueMember {
  league_id: string;
  user_id: string;
  joined_at: string;
}

export interface LeagueMessage {
  id: string;
  league_id: string;
  user_id: string;
  message: string;
  created_at: string;
}
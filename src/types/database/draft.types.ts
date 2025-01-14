import { Json } from "./auth.types";

export interface DraftPick {
  id: string;
  league_id: string;
  user_id: string;
  team_id: string;
  pick_number: number;
  created_at: string;
}

export interface FavoriteTeam {
  id: string;
  user_id: string;
  team_id: string;
  created_at: string;
}
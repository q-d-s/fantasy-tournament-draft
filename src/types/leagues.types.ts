import { Database } from "@/integrations/supabase/types";

export type League = Database["public"]["Tables"]["leagues"]["Row"] & {
  tournament?: {
    name: string;
    start_date: string;
    end_date: string;
  } | null;
  owner?: {
    username: string | null;
  } | null;
  member_count?: { count: number }[];
};

export type LeagueFormInputs = {
  name: string;
  tournamentId: string;
  maxPlayers: number;
  isPublic: boolean;
};

export type Tournament = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  type: string;
};

import { Database } from "@/integrations/supabase/types";

export type TournamentMetadata = {
  teams_count?: number;
  has_group_stage?: boolean;
  has_third_place?: boolean;
  max_rounds?: number;
};

export type Tournament = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  type: string;
  created_at?: string;
  metadata?: TournamentMetadata;
  teams?: Array<{
    id: string;
    name: string;
    group_name?: string | null;
  }>;
};

export type TournamentWithTeams = Tournament & {
  teams: Array<{
    id: string;
    name: string;
    group_name?: string | null;
  }>;
};

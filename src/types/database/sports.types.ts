export interface SportsNews {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  source: string | null;
  published_at: string;
  created_at: string;
}

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

export interface Tournament {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  type: string;
  created_at: string;
}
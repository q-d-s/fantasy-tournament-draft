export type Tournament = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  type: "FIFA_CLUB" | "FIFA_WORLD_CUP" | "EUROS" | "MARCH_MADNESS";
};

export type League = {
  id: string;
  name: string;
  tournament: Tournament;
  members: string[];
  draft: {
    date: string;
    status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED";
  };
};

export type Standing = {
  teamName: string;
  wins: number;
  draws: number;
  losses: number;
  groupPoints: number;
  knockoutPoints: number;
  totalPoints: number;
};
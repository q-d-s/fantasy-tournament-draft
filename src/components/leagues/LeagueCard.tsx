import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import type { League } from "@/types/leagues.types";

interface LeagueCardProps {
  league: League;
  onJoinClick: (leagueId: string) => void;
  isLoading?: boolean;
}

export const LeagueCard = ({ league, onJoinClick, isLoading }: LeagueCardProps) => {
  const memberCount = league.member_count?.[0]?.count || 0;
  const maxPlayers = league.max_players || 10;
  const ownerName = league.owner?.username || "Unknown";
  const tournamentName = league.tournament?.name || "Unknown Tournament";
  const startDate = league.tournament?.start_date
    ? new Date(league.tournament.start_date).toLocaleDateString()
    : "TBD";

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-khand text-[#153624]">
          {league.name}
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          Created by {ownerName}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-semibold">Tournament:</span> {tournamentName}
          </div>
          <div className="text-sm">
            <span className="font-semibold">Start Date:</span> {startDate}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            <span>
              {memberCount} / {maxPlayers} members
            </span>
          </div>
          <Button
            onClick={() => onJoinClick(league.id)}
            disabled={isLoading || memberCount >= maxPlayers}
            className="w-full bg-[#153624] hover:bg-[#153624]/90"
          >
            {memberCount >= maxPlayers ? "League Full" : "Join League"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
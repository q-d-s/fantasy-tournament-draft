import { useState } from "react";
import Navigation from "../components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type Team = {
  id: string;
  name: string;
  rank: number;
  stats: {
    recentForm: string;
    worldRanking: number;
  };
};

const mockTeams: Team[] = [
  {
    id: "1",
    name: "Brazil",
    rank: 1,
    stats: {
      recentForm: "WWWDW",
      worldRanking: 1,
    },
  },
  {
    id: "2",
    name: "Argentina",
    rank: 2,
    stats: {
      recentForm: "WWWWW",
      worldRanking: 2,
    },
  },
  // Add more teams as needed
];

const Draft = () => {
  const [availableTeams, setAvailableTeams] = useState(mockTeams);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const { toast } = useToast();

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
    toast({
      title: "Team Selected",
      description: `You've selected ${team.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-khand text-primary mb-8">Draft Room</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-khand text-primary mb-4">Available Teams</h2>
            <div className="grid gap-4">
              {availableTeams.map((team) => (
                <Card key={team.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-khand">{team.name}</h3>
                      <p className="text-sm text-gray-600">Rank: {team.rank}</p>
                      <p className="text-sm text-gray-600">Form: {team.stats.recentForm}</p>
                    </div>
                    <Button
                      onClick={() => handleTeamSelect(team)}
                      variant="secondary"
                      className="font-khand"
                    >
                      Select
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-khand text-primary mb-4">Draft Status</h2>
            <Card className="p-6">
              <h3 className="text-xl font-khand mb-4">Current Pick</h3>
              <p className="text-gray-600 mb-2">Round: 1</p>
              <p className="text-gray-600 mb-2">Pick: 1</p>
              <p className="text-gray-600">Time Remaining: 2:00</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Draft;
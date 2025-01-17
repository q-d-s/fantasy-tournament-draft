import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navigation from "../components/Navigation";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Team = Database['public']['Tables']['teams']['Row'];

const Points = () => {
  const { data: worldCup2022Data = [], isLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const { data: tournament } = await supabase
        .from('tournaments')
        .select('*')
        .eq('type', 'FIFA_WORLD_CUP')
        .order('start_date', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!tournament) return [];

      const { data: teams } = await supabase
        .from('teams')
        .select('*')
        .eq('tournament_id', tournament.id)
        .order('total_points', { ascending: false });

      return teams || [];
    },
  });

  const topTeams = worldCup2022Data.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto py-8 space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-4xl font-khand text-primary mb-8">Points System</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-khand text-primary mb-4">Group Stage</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-24 font-semibold">Win</span>
                  <span className="text-primary">3 points</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-24 font-semibold">Draw</span>
                  <span className="text-primary">1 point</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-24 font-semibold">Loss</span>
                  <span className="text-primary">0 points</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-24 font-semibold">Advance</span>
                  <span className="text-primary">3 bonus points</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-khand text-primary mb-4">Knockout Stage</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-24 font-semibold">Round of 32</span>
                  <span className="text-primary">3 points</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-24 font-semibold">Round of 16</span>
                  <span className="text-primary">5 points</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-24 font-semibold">Quarter-final</span>
                  <span className="text-primary">7 points</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-24 font-semibold">Semi-final</span>
                  <span className="text-primary">10 points</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-24 font-semibold">Final Win</span>
                  <span className="text-primary">15 points</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-24 font-semibold">Champion</span>
                  <span className="text-primary">5 bonus points</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-24 font-semibold">Third Place</span>
                  <span className="text-primary">3 points</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-khand text-primary mb-6">2022 World Cup Results</h2>
          
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <>
              <div className="mb-8">
                <ChartContainer
                  className="h-[300px]"
                  config={{
                    group: { color: "#c2b067" },
                    knockout: { color: "#153624" },
                  }}
                >
                  <BarChart data={topTeams}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="group_points" name="Group Points" stackId="points" fill="var(--color-group)" />
                    <Bar dataKey="knockout_points" name="Knockout Points" stackId="points" fill="var(--color-knockout)" />
                  </BarChart>
                </ChartContainer>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team</TableHead>
                      <TableHead>Group</TableHead>
                      <TableHead className="text-center">Wins</TableHead>
                      <TableHead className="text-center">Draws</TableHead>
                      <TableHead className="text-center">Losses</TableHead>
                      <TableHead className="text-center">Group Points</TableHead>
                      <TableHead className="text-center">Knockout Points</TableHead>
                      <TableHead className="text-center">Total Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {worldCup2022Data.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell className="font-medium">{team.name}</TableCell>
                        <TableCell>{team.group_name}</TableCell>
                        <TableCell className="text-center">{team.wins}</TableCell>
                        <TableCell className="text-center">{team.draws}</TableCell>
                        <TableCell className="text-center">{team.losses}</TableCell>
                        <TableCell className="text-center">{team.group_points}</TableCell>
                        <TableCell className="text-center">{team.knockout_points}</TableCell>
                        <TableCell className="text-center font-semibold">{team.total_points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Points;
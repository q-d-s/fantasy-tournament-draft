import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navigation from "../components/Navigation";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

const worldCup2022Data = [
  {
    teamName: "Argentina",
    group: "C",
    wins: 2,
    draws: 0,
    losses: 1,
    groupPoints: 6,
    knockoutPoints: 35,
    totalPoints: 46,
  },
  {
    teamName: "France",
    group: "D",
    wins: 2,
    draws: 0,
    losses: 1,
    groupPoints: 6,
    knockoutPoints: 25,
    totalPoints: 31,
  },
  // Add more teams as needed
];

const Points = () => {
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
          
          <div className="mb-8">
            <ChartContainer
              className="h-[300px]"
              config={{
                group: { color: "#c2b067" },
                knockout: { color: "#153624" },
              }}
            >
              <BarChart data={topTeams}>
                <XAxis dataKey="teamName" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="groupPoints" name="Group Points" stackId="points" fill="var(--color-group)" />
                <Bar dataKey="knockoutPoints" name="Knockout Points" stackId="points" fill="var(--color-knockout)" />
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
                  <TableRow key={team.teamName}>
                    <TableCell className="font-medium">{team.teamName}</TableCell>
                    <TableCell>{team.group}</TableCell>
                    <TableCell className="text-center">{team.wins}</TableCell>
                    <TableCell className="text-center">{team.draws}</TableCell>
                    <TableCell className="text-center">{team.losses}</TableCell>
                    <TableCell className="text-center">{team.groupPoints}</TableCell>
                    <TableCell className="text-center">{team.knockoutPoints}</TableCell>
                    <TableCell className="text-center font-semibold">{team.totalPoints}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Points;
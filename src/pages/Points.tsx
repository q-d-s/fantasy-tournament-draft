import Navigation from "../components/Navigation";

const worldCup2022Data = [
  {
    teamName: "Argentina",
    wins: 6,
    draws: 1,
    losses: 1,
    groupPoints: 6,
    knockoutPoints: 42,
    totalPoints: 48,
  },
  {
    teamName: "France",
    wins: 5,
    draws: 1,
    losses: 1,
    groupPoints: 6,
    knockoutPoints: 27,
    totalPoints: 33,
  },
  {
    teamName: "Croatia",
    wins: 2,
    draws: 3,
    losses: 2,
    groupPoints: 5,
    knockoutPoints: 26,
    totalPoints: 31,
  },
  // Add more teams as needed
];

const Points = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Points System</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">How Points Work</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Win: 3 points</li>
            <li>• Draw: 1 point</li>
            <li>• Loss: 0 points</li>
            <li>• Advancing from group stage: 5 points</li>
            <li>• Round of 16 win: 7 points</li>
            <li>• Quarter-final win: 9 points</li>
            <li>• Semi-final win: 11 points</li>
            <li>• Final win: 15 points</li>
            <li>• Third place game win: -1 point</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">2022 World Cup Example</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Team</th>
                  <th className="px-4 py-2 text-center">Wins</th>
                  <th className="px-4 py-2 text-center">Draws</th>
                  <th className="px-4 py-2 text-center">Losses</th>
                  <th className="px-4 py-2 text-center">Group Points</th>
                  <th className="px-4 py-2 text-center">Knockout Points</th>
                  <th className="px-4 py-2 text-center">Total Points</th>
                </tr>
              </thead>
              <tbody>
                {worldCup2022Data.map((team) => (
                  <tr key={team.teamName} className="border-t">
                    <td className="px-4 py-2 font-medium">{team.teamName}</td>
                    <td className="px-4 py-2 text-center">{team.wins}</td>
                    <td className="px-4 py-2 text-center">{team.draws}</td>
                    <td className="px-4 py-2 text-center">{team.losses}</td>
                    <td className="px-4 py-2 text-center">{team.groupPoints}</td>
                    <td className="px-4 py-2 text-center">{team.knockoutPoints}</td>
                    <td className="px-4 py-2 text-center font-semibold">{team.totalPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Points;
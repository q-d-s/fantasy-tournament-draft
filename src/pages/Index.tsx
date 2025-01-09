import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

const tournaments = [
  {
    id: "fifa-club-2023",
    name: "FIFA Club World Cup 2023",
    type: "FIFA_CLUB",
    startDate: "2023-12-12",
    endDate: "2023-12-22",
  },
  {
    id: "world-cup-2026",
    name: "FIFA World Cup 2026",
    type: "FIFA_WORLD_CUP",
    startDate: "2026-06-11",
    endDate: "2026-07-11",
  },
  {
    id: "euros-2024",
    name: "UEFA Euro 2024",
    type: "EUROS",
    startDate: "2024-06-14",
    endDate: "2024-07-14",
  },
  {
    id: "march-madness-2024",
    name: "March Madness 2024",
    type: "MARCH_MADNESS",
    startDate: "2024-03-19",
    endDate: "2024-04-08",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Tournament Fantasy Draft</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tournaments.map((tournament) => (
            <Link
              key={tournament.id}
              to={`/leagues/create?tournament=${tournament.id}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-primary mb-2">{tournament.name}</h2>
              <p className="text-gray-600 mb-4">
                {new Date(tournament.startDate).toLocaleDateString()} -{" "}
                {new Date(tournament.endDate).toLocaleDateString()}
              </p>
              <button className="w-full bg-secondary text-primary font-semibold py-2 rounded hover:bg-opacity-90 transition-colors">
                Create League
              </button>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
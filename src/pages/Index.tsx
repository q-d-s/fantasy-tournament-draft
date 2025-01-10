import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

const tournaments = [
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
  const currentDate = new Date();
  const futureTournaments = tournaments.filter(
    (tournament) => new Date(tournament.startDate) > currentDate
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto py-8 px-4 mt-16">
        <div className="flex flex-col items-center mb-12">
          <img
            src="/lovable-uploads/92bd31db-561d-4a64-8e0a-8fbd69724992.png"
            alt="TDL Rounded Logo"
            className="w-24 h-24 mb-6"
          />
          <h1 className="text-5xl font-khand text-primary mb-4">Tournament Draft League</h1>
          <p className="text-xl text-gray-600 font-khand">Pioneers of Fantasy Drafts</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {futureTournaments.map((tournament) => (
            <Link
              key={tournament.id}
              to={`/leagues/create?tournament=${tournament.id}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-secondary/20 hover:border-secondary group"
            >
              <h2 className="text-2xl font-khand text-primary mb-2 group-hover:text-secondary transition-colors">
                {tournament.name}
              </h2>
              <p className="text-gray-600 mb-4 font-khand">
                {new Date(tournament.startDate).toLocaleDateString()} -{" "}
                {new Date(tournament.endDate).toLocaleDateString()}
              </p>
              <button className="w-full bg-secondary text-primary font-khand py-2 rounded hover:bg-opacity-90 transition-colors">
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
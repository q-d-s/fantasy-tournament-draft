import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-khand text-secondary">
          TDL
        </Link>
        <div className="flex gap-6">
          <Link to="/leagues" className="font-khand hover:text-secondary transition-colors">
            Leagues
          </Link>
          <Link to="/draft" className="font-khand hover:text-secondary transition-colors">
            Draft
          </Link>
          <Link to="/standings" className="font-khand hover:text-secondary transition-colors">
            Standings
          </Link>
          <Link to="/points" className="font-khand hover:text-secondary transition-colors">
            Points
          </Link>
          <Link to="/instructions" className="font-khand hover:text-secondary transition-colors">
            Instructions
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
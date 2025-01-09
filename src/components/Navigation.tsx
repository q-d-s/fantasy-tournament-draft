import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/lovable-uploads/b7adc0ee-e461-4fa5-9c1d-83fe268dad5d.png"
            alt="TDL Logo"
            className="h-10"
          />
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
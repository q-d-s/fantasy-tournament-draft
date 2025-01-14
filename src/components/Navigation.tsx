import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BookOpen, PlusCircle, Search, User } from "lucide-react";

const Navigation = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="bg-primary text-white p-4 shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/lovable-uploads/b7adc0ee-e461-4fa5-9c1d-83fe268dad5d.png"
            alt="TDL Logo"
            className="h-10"
          />
        </Link>
        <div className="flex gap-6 items-center">
          <Link 
            to="/leagues/create" 
            className="font-khand hover:text-secondary transition-colors relative group flex items-center gap-2"
          >
            <PlusCircle className="h-5 w-5" />
            Create League
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
          </Link>
          
          <Link 
            to="/leagues" 
            className="font-khand hover:text-secondary transition-colors relative group flex items-center gap-2"
          >
            <Search className="h-5 w-5" />
            Find Leagues
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
          </Link>
          
          <Link 
            to="/instructions" 
            className="font-khand hover:text-secondary transition-colors relative group flex items-center gap-2"
          >
            <BookOpen className="h-5 w-5" />
            How to Play
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
          </Link>

          {user ? (
            <Link 
              to="/account" 
              className="font-khand hover:text-secondary transition-colors relative group flex items-center gap-2"
            >
              <User className="h-5 w-5" />
              My Account
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
          ) : (
            <Button asChild variant="secondary">
              <Link to="/auth" className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
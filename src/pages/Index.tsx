import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Trophy, Users } from "lucide-react";

const Index = () => {
  const { data: tournaments, isLoading: tournamentsLoading } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .gte('start_date', new Date().toISOString())
        .order('start_date', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: news, isLoading: newsLoading } = useQuery({
    queryKey: ['sports_news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sports_news')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    }
  });

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
          <p className="text-xl text-gray-600 font-khand mb-8">Pioneers of Fantasy Drafts</p>
          
          {/* Welcome Message */}
          <div className="max-w-3xl text-center mb-12">
            <p className="text-lg text-gray-700 mb-4">
              Welcome to Tournament Draft League, where the thrill of fantasy sports meets the excitement of real-world tournaments! 
              Our cutting-edge app lets you draft teams for popular tournaments, challenging your sports knowledge and strategic thinking.
            </p>
            <Button asChild className="bg-secondary text-primary hover:bg-secondary/90">
              <Link to="/instructions">Learn How to Play</Link>
            </Button>
          </div>
        </div>

        {/* Upcoming Tournaments Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-khand text-primary mb-6 text-center">Upcoming Tournaments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournamentsLoading ? (
              <p className="text-center col-span-3">Loading tournaments...</p>
            ) : tournaments?.map((tournament) => (
              <Card key={tournament.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-khand text-2xl flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-secondary" />
                    {tournament.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <CalendarDays className="h-5 w-5" />
                      <span>
                        {new Date(tournament.start_date).toLocaleDateString()} - {new Date(tournament.end_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-5 w-5" />
                      <span>Create or join a league now!</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button asChild variant="secondary" className="flex-1">
                        <Link to={`/leagues/create?tournament=${tournament.id}`}>Create League</Link>
                      </Button>
                      <Button asChild variant="outline" className="flex-1">
                        <Link to="/leagues">Find Leagues</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Latest News Section */}
        <section>
          <h2 className="text-3xl font-khand text-primary mb-6 text-center">Latest News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsLoading ? (
              <p className="text-center col-span-3">Loading news...</p>
            ) : news?.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                {item.image_url && (
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <CardHeader>
                  <CardTitle className="font-khand text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">{item.content}</p>
                  {item.source && (
                    <p className="text-sm text-gray-500 mt-2">Source: {item.source}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Trophy, Users } from "lucide-react";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateLeague = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create a league",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    navigate("/leagues/create");
  };

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="container mx-auto py-8 px-4 mt-16 flex-grow">
        <div className="flex flex-col items-center mb-12">
          <img
            src="/lovable-uploads/92bd31db-561d-4a64-8e0a-8fbd69724992.png"
            alt="TDL Rounded Logo"
            className="w-24 h-24 mb-6"
          />
          <h1 className="text-5xl font-khand text-[#153624] mb-4">Tournament Draft League</h1>
          <p className="text-xl text-gray-600 font-khand mb-8">Pioneers of Fantasy Drafts</p>
          
          <div className="max-w-3xl text-center mb-12">
            <p className="text-lg text-gray-700 mb-4">
              Welcome to Tournament Draft League, where the thrill of fantasy sports meets the excitement of real-world tournaments! 
              Our cutting-edge app lets you draft teams for popular tournaments, challenging your sports knowledge and strategic thinking.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild className="bg-[#153624] text-white hover:bg-[#153624]/90">
                <Link to="/instructions">Learn How to Play</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-[#153624] text-[#153624] hover:bg-[#153624]/10"
                onClick={handleCreateLeague}
              >
                Create a League
              </Button>
            </div>
          </div>
        </div>

        {/* Upcoming Tournaments Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-khand text-[#153624] mb-6 text-center">Upcoming Tournaments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournamentsLoading ? (
              <p className="text-center col-span-3">Loading tournaments...</p>
            ) : tournaments?.map((tournament) => (
              <Card key={tournament.id} className="hover:shadow-lg transition-shadow border-[#c2b067]/20">
                <CardHeader>
                  <CardTitle className="font-khand text-2xl flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-[#c2b067]" />
                    {tournament.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
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
                      <Button 
                        variant="default" 
                        className="flex-1 bg-[#153624] hover:bg-[#153624]/90"
                        onClick={() => {
                          if (!user) {
                            toast({
                              title: "Authentication Required",
                              description: "Please log in to create a league",
                              variant: "destructive",
                            });
                            navigate("/auth");
                            return;
                          }
                          navigate(`/leagues/create?tournament=${tournament.id}`);
                        }}
                      >
                        Create League
                      </Button>
                      <Button asChild variant="outline" className="flex-1 border-[#153624] text-[#153624] hover:bg-[#153624]/10">
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
          <h2 className="text-3xl font-khand text-[#153624] mb-6 text-center">Latest News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsLoading ? (
              <p className="text-center col-span-3">Loading news...</p>
            ) : news?.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow border-[#c2b067]/20">
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
      <Footer />
    </div>
  );
};

export default Index;
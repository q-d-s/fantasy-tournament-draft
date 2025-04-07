
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { LeagueCard } from "@/components/leagues/LeagueCard";
import { useToast } from "@/hooks/use-toast";
import { usePublicLeagues } from "@/hooks/useLeagues";
import { supabase } from "@/integrations/supabase/client";

const FindLeagues = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [joiningLeague, setJoiningLeague] = useState<string | null>(null);
  const { data: leagues, isLoading, error } = usePublicLeagues();

  const handleJoinLeague = async (leagueId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth", { state: { returnTo: `/leagues` } });
        return;
      }

      setJoiningLeague(leagueId);
      const { error: joinError } = await supabase
        .from("league_members")
        .insert({ league_id: leagueId, user_id: user.id });

      if (joinError) throw joinError;

      toast({
        title: "Successfully joined league!",
        description: "You can now view the league details and participate in the draft.",
      });
      navigate(`/leagues/${leagueId}`);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error joining league",
        description: error.message,
      });
    } finally {
      setJoiningLeague(null);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto py-8 px-4 mt-16">
          <div className="text-center text-red-500">
            Error loading leagues: {error.message}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-8 px-4 mt-16">
        <h1 className="text-4xl font-khand font-bold text-[#153624] mb-8">
          Find Leagues
        </h1>
        {isLoading ? (
          <div className="text-center">Loading leagues...</div>
        ) : leagues?.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No public leagues available. Why not create one?
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {leagues?.map((league) => (
              <LeagueCard
                key={league.id}
                league={league}
                onJoinClick={handleJoinLeague}
                isLoading={joiningLeague === league.id}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default FindLeagues;

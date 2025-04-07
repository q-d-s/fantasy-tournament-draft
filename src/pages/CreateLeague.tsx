
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LeagueForm } from "@/components/leagues/LeagueForm";
import { useAuth } from "@/hooks/useAuth";

const CreateLeague = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  // Don't render anything while checking authentication
  if (loading) {
    return null;
  }

  // Don't render the page content if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-8 px-4 mt-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-khand text-[#153624]">
              Create a League
            </CardTitle>
            <CardDescription>
              Set up your league and invite players to join. You can make it public
              for anyone to find or keep it private for invited members only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeagueForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateLeague;

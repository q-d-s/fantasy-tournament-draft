import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LeagueForm } from "@/components/leagues/LeagueForm";

const CreateLeague = () => {
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
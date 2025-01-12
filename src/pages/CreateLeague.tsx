import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CreateLeague = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [selectedTournamentId, setSelectedTournamentId] = useState<string>("");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTournamentId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a tournament.",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Create the league
      const { data: league, error: leagueError } = await supabase
        .from("leagues")
        .insert({
          name,
          tournament_id: selectedTournamentId,
          owner_id: user.id,
          max_players: maxPlayers,
          is_public: isPublic,
        })
        .select()
        .single();

      if (leagueError) throw leagueError;

      // Add the creator as a league member
      const { error: memberError } = await supabase
        .from("league_members")
        .insert({
          league_id: league.id,
          user_id: user.id,
        });

      if (memberError) throw memberError;

      toast({
        title: "League created successfully!",
        description: isPublic 
          ? "Your league is now visible in the public leagues list."
          : "Share your league's invite link to add members.",
      });
      
      navigate(`/leagues/${league.id}`);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error creating league",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-8 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-khand text-primary">Create a League</CardTitle>
            <CardDescription>
              Set up your league and invite players to join. You can make it public for anyone to find or keep it private for invited members only.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">League Name</Label>
                <Input
                  id="name"
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your league name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tournament">Tournament</Label>
                <Select
                  value={selectedTournamentId}
                  onValueChange={setSelectedTournamentId}
                >
                  <SelectTrigger id="tournament">
                    <SelectValue placeholder="Select a tournament" />
                  </SelectTrigger>
                  <SelectContent>
                    {tournamentsLoading ? (
                      <SelectItem value="loading" disabled>Loading tournaments...</SelectItem>
                    ) : tournaments?.map((tournament) => (
                      <SelectItem key={tournament.id} value={tournament.id}>
                        {tournament.name} ({new Date(tournament.start_date).toLocaleDateString()})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxPlayers">Maximum Players</Label>
                <Input
                  id="maxPlayers"
                  required
                  type="number"
                  min="2"
                  max="20"
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
                />
                <p className="text-sm text-muted-foreground">
                  Set the total number of players that can join your league.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="public-league"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
                <Label htmlFor="public-league">Make this league public</Label>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {isPublic 
                  ? "Public leagues can be found by anyone in the Find Leagues page."
                  : "Private leagues can only be joined through an invite link."}
              </p>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create League"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateLeague;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Tournament } from "@/types/tournament";

const CreateLeague = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [draftDate, setDraftDate] = useState("");
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTournament) {
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

      const { data: league, error } = await supabase
        .from("leagues")
        .insert({
          name,
          tournament_id: selectedTournament.id,
          owner_id: user.id,
          max_players: maxPlayers,
          draft_date: draftDate,
        })
        .select()
        .single();

      if (error) throw error;

      // Add the creator as a league member
      await supabase
        .from("league_members")
        .insert({
          league_id: league.id,
          user_id: user.id,
        });

      toast({
        title: "League created",
        description: "Your league has been created successfully.",
      });
      navigate(`/leagues/${league.id}`);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-khand text-primary mb-6">Create a League</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                League Name
              </label>
              <Input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter league name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Players
              </label>
              <Input
                required
                type="number"
                min="2"
                max="20"
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Draft Date
              </label>
              <Input
                required
                type="datetime-local"
                value={draftDate}
                onChange={(e) => setDraftDate(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create League"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateLeague;
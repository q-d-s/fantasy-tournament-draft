import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useUpcomingTournaments } from "@/hooks/useTournament";
import { supabase } from "@/integrations/supabase/client";

export const LeagueForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { data: tournaments, isLoading: tournamentsLoading } = useUpcomingTournaments();

  const [formData, setFormData] = useState({
    name: "",
    tournamentId: "",
    draftDate: "",
    draftTime: "",
    isPublic: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to create a league.",
      });
      return;
    }

    setLoading(true);
    try {
      // Create the league
      const { data: league, error: leagueError } = await supabase
        .from("leagues")
        .insert({
          name: formData.name,
          tournament_id: formData.tournamentId,
          owner_id: user.id,
          draft_date: `${formData.draftDate}T${formData.draftTime}`,
          is_public: formData.isPublic,
        })
        .select()
        .single();

      if (leagueError) throw leagueError;

      // Add creator as first member
      const { error: memberError } = await supabase
        .from("league_members")
        .insert({
          league_id: league.id,
          user_id: user.id,
        });

      if (memberError) throw memberError;

      toast({
        title: "League created successfully!",
        description: formData.isPublic
          ? "Your league is now visible in the public leagues list."
          : "Share your league's invite link to add members.",
      });

      navigate(`/leagues/${league.id}`);
    } catch (error: any) {
      console.error("League creation error:", error);
      toast({
        variant: "destructive",
        title: "Error creating league",
        description: error.message || "Failed to create league. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">League Name</Label>
        <Input
          id="name"
          required
          type="text"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Enter your league name"
          className="border-[#153624] focus-visible:ring-[#c2b067]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tournament">Tournament</Label>
        <Select 
          value={formData.tournamentId} 
          onValueChange={(value) => setFormData((prev) => ({ ...prev, tournamentId: value }))}
        >
          <SelectTrigger
            id="tournament"
            className="border-[#153624] focus:ring-[#c2b067]"
          >
            <SelectValue placeholder="Select a tournament" />
          </SelectTrigger>
          <SelectContent>
            {tournamentsLoading ? (
              <SelectItem value="loading" disabled>
                Loading tournaments...
              </SelectItem>
            ) : (
              tournaments?.map((tournament) => (
                <SelectItem key={tournament.id} value={tournament.id}>
                  {tournament.name} ({new Date(tournament.start_date).toLocaleDateString()})
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="draftDate">Draft Date</Label>
        <Input
          id="draftDate"
          required
          type="date"
          value={formData.draftDate}
          onChange={(e) => setFormData((prev) => ({ ...prev, draftDate: e.target.value }))}
          className="border-[#153624] focus-visible:ring-[#c2b067]"
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="draftTime">Draft Time</Label>
        <Input
          id="draftTime"
          required
          type="time"
          value={formData.draftTime}
          onChange={(e) => setFormData((prev) => ({ ...prev, draftTime: e.target.value }))}
          className="border-[#153624] focus-visible:ring-[#c2b067]"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="public-league"
            checked={formData.isPublic}
            onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPublic: checked }))}
            className="data-[state=checked]:bg-[#153624]"
          />
          <Label htmlFor="public-league">Make this league public</Label>
        </div>
        <p className="text-sm text-muted-foreground">
          {formData.isPublic
            ? "Public leagues can be found by anyone in the Find Leagues page."
            : "Private leagues can only be joined through an invite link."}
        </p>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#153624] hover:bg-[#153624]/90 text-white"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create League"}
      </Button>
    </form>
  );
};
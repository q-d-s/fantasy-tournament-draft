/**
 * League creation form component with validation and error handling
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { createLeague, fetchUpcomingTournaments } from "@/services/leagueService";
import type { LeagueFormData } from "@/types/league.types";

interface LeagueFormProps {
  /** Optional callback function to be called after successful league creation */
  onSuccess?: (leagueId: string) => void;
}

/**
 * Form component for creating a new league
 */
export const LeagueForm = ({ onSuccess }: LeagueFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<LeagueFormData>({
    name: "",
    tournamentId: "",
    maxPlayers: 10,
    isPublic: false,
  });
  const [loading, setLoading] = useState(false);

  // Fetch tournaments using React Query for caching and automatic retries
  const { data: tournaments, isLoading: tournamentsLoading } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => {
      const { data, error } = await fetchUpcomingTournaments();
      if (error) {
        toast({
          variant: "destructive",
          title: "Error loading tournaments",
          description: error.message,
        });
        throw error;
      }
      return data;
    }
  });

  /**
   * Handles form submission and league creation
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tournamentId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a tournament.",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: league, error } = await createLeague(formData);
      if (error) throw error;

      toast({
        title: "League created successfully!",
        description: formData.isPublic 
          ? "Your league is now visible in the public leagues list."
          : "Share your league's invite link to add members.",
      });
      
      if (onSuccess && league) {
        onSuccess(league.id);
      } else if (league) {
        navigate(`/leagues/${league.id}`);
      }
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">League Name</Label>
        <Input
          id="name"
          required
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter your league name"
          className="border-[#153624] focus-visible:ring-[#c2b067]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tournament">Tournament</Label>
        <Select
          value={formData.tournamentId}
          onValueChange={(value) => setFormData(prev => ({ ...prev, tournamentId: value }))}
        >
          <SelectTrigger id="tournament" className="border-[#153624] focus:ring-[#c2b067]">
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
          value={formData.maxPlayers}
          onChange={(e) => setFormData(prev => ({ ...prev, maxPlayers: parseInt(e.target.value) }))}
          className="border-[#153624] focus-visible:ring-[#c2b067]"
        />
        <p className="text-sm text-muted-foreground">
          Set the total number of players that can join your league.
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="public-league"
          checked={formData.isPublic}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked }))}
          className="data-[state=checked]:bg-[#153624]"
        />
        <Label htmlFor="public-league">Make this league public</Label>
      </div>
      
      <p className="text-sm text-muted-foreground">
        {formData.isPublic 
          ? "Public leagues can be found by anyone in the Find Leagues page."
          : "Private leagues can only be joined through an invite link."}
      </p>

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
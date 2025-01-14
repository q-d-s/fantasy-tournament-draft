import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createLeague } from "@/services/leagueService";
import { LeagueFormFields } from "./LeagueFormFields";
import { useUpcomingTournaments } from "@/hooks/useLeagues";
import type { LeagueFormInputs } from "@/types/leagues.types";

interface LeagueFormProps {
  onSuccess?: (leagueId: string) => void;
}

export const LeagueForm = ({ onSuccess }: LeagueFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LeagueFormInputs>({
    name: "",
    tournamentId: "",
    maxPlayers: 10,
    isPublic: false,
    draftDate: new Date().toISOString().split('T')[0],
  });

  const { data: tournaments, isLoading: tournamentsLoading } = useUpcomingTournaments();

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

    if (!formData.draftDate) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a draft date.",
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
      <LeagueFormFields
        name={formData.name}
        setName={(name) => setFormData((prev) => ({ ...prev, name }))}
        tournamentId={formData.tournamentId}
        setTournamentId={(id) => setFormData((prev) => ({ ...prev, tournamentId: id }))}
        maxPlayers={formData.maxPlayers}
        setMaxPlayers={(players) =>
          setFormData((prev) => ({ ...prev, maxPlayers: players }))
        }
        isPublic={formData.isPublic}
        setIsPublic={(isPublic) =>
          setFormData((prev) => ({ ...prev, isPublic }))
        }
        draftDate={formData.draftDate}
        setDraftDate={(date) =>
          setFormData((prev) => ({ ...prev, draftDate: date }))
        }
        tournaments={tournaments}
        isLoading={tournamentsLoading}
      />

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
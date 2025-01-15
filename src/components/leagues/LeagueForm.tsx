import { Button } from "@/components/ui/button";
import { LeagueFormFields } from "./LeagueFormFields";
import { useUpcomingTournaments } from "@/hooks/useTournament";
import { useLeagueForm } from "@/hooks/useLeagueForm";

interface LeagueFormProps {
  onSuccess?: (leagueId: string) => void;
}

export const LeagueForm = ({ onSuccess }: LeagueFormProps) => {
  const { formData, setFormData, loading, handleSubmit } = useLeagueForm({ onSuccess });
  const { data: tournaments, isLoading: tournamentsLoading } = useUpcomingTournaments();

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
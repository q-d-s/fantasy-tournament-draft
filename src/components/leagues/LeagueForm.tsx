
import { Button } from "@/components/ui/button";
import { useUpcomingTournaments } from "@/hooks/useTournament";
import { useLeagueForm } from "@/hooks/useLeagueForm";
import { LeagueFormFields } from "./LeagueFormFields";
import { Tournament } from "@/types/database/tournament.types";

export const LeagueForm = () => {
  const { data: tournaments, isLoading: tournamentsLoading } = useUpcomingTournaments();
  const { 
    formData, 
    handleInputChange, 
    loading, 
    handleSubmit 
  } = useLeagueForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <LeagueFormFields 
        formData={formData}
        handleInputChange={handleInputChange}
        tournaments={tournaments as Tournament[]}
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

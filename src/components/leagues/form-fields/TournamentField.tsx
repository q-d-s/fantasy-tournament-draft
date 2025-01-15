import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Tournament } from "@/types/leagues.types";

interface TournamentFieldProps {
  tournamentId: string;
  setTournamentId: (id: string) => void;
  tournaments?: Tournament[];
  isLoading?: boolean;
}

export const TournamentField = ({
  tournamentId,
  setTournamentId,
  tournaments,
  isLoading,
}: TournamentFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="tournament">Tournament</Label>
      <Select value={tournamentId} onValueChange={setTournamentId}>
        <SelectTrigger
          id="tournament"
          className="border-[#153624] focus:ring-[#c2b067]"
        >
          <SelectValue placeholder="Select a tournament" />
        </SelectTrigger>
        <SelectContent>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              Loading tournaments...
            </SelectItem>
          ) : (
            tournaments?.map((tournament) => (
              <SelectItem key={tournament.id} value={tournament.id}>
                {tournament.name} (
                {new Date(tournament.start_date).toLocaleDateString()})
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
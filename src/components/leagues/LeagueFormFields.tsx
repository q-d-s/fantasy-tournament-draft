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
import type { Tournament } from "@/types/leagues.types";

interface LeagueFormFieldsProps {
  name: string;
  setName: (name: string) => void;
  tournamentId: string;
  setTournamentId: (id: string) => void;
  maxPlayers: number;
  setMaxPlayers: (players: number) => void;
  isPublic: boolean;
  setIsPublic: (isPublic: boolean) => void;
  draftDate: string;
  setDraftDate: (date: string) => void;
  tournaments?: Tournament[];
  isLoading?: boolean;
}

export const LeagueFormFields = ({
  name,
  setName,
  tournamentId,
  setTournamentId,
  maxPlayers,
  setMaxPlayers,
  isPublic,
  setIsPublic,
  draftDate,
  setDraftDate,
  tournaments,
  isLoading,
}: LeagueFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">League Name</Label>
        <Input
          id="name"
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your league name"
          className="border-[#153624] focus-visible:ring-[#c2b067]"
        />
      </div>

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

      <div className="space-y-2">
        <Label htmlFor="draftDate">Draft Date</Label>
        <Input
          id="draftDate"
          required
          type="date"
          value={draftDate}
          onChange={(e) => setDraftDate(e.target.value)}
          className="border-[#153624] focus-visible:ring-[#c2b067]"
          min={new Date().toISOString().split('T')[0]}
        />
        <p className="text-sm text-muted-foreground">
          Select when you want to hold the draft for your league.
        </p>
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
          className="border-[#153624] focus-visible:ring-[#c2b067]"
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
          className="data-[state=checked]:bg-[#153624]"
        />
        <Label htmlFor="public-league">Make this league public</Label>
      </div>

      <p className="text-sm text-muted-foreground">
        {isPublic
          ? "Public leagues can be found by anyone in the Find Leagues page."
          : "Private leagues can only be joined through an invite link."}
      </p>
    </div>
  );
};
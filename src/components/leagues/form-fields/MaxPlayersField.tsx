import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface MaxPlayersFieldProps {
  maxPlayers: number;
  setMaxPlayers: (players: number) => void;
}

export const MaxPlayersField = ({
  maxPlayers,
  setMaxPlayers,
}: MaxPlayersFieldProps) => {
  return (
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
  );
};
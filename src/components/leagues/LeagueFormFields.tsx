import type { Tournament } from "@/types/leagues.types";
import { NameField } from "./form-fields/NameField";
import { TournamentField } from "./form-fields/TournamentField";
import { DraftDateField } from "./form-fields/DraftDateField";
import { MaxPlayersField } from "./form-fields/MaxPlayersField";
import { VisibilityField } from "./form-fields/VisibilityField";

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
      <NameField name={name} setName={setName} />
      <TournamentField
        tournamentId={tournamentId}
        setTournamentId={setTournamentId}
        tournaments={tournaments}
        isLoading={isLoading}
      />
      <DraftDateField draftDate={draftDate} setDraftDate={setDraftDate} />
      <MaxPlayersField maxPlayers={maxPlayers} setMaxPlayers={setMaxPlayers} />
      <VisibilityField isPublic={isPublic} setIsPublic={setIsPublic} />
    </div>
  );
};
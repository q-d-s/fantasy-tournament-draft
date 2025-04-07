
import { Tournament, LeagueFormInputs } from "@/types";
import { NameField } from "./form-fields/NameField";
import { TournamentField } from "./form-fields/TournamentField";
import { DraftDateField } from "./form-fields/DraftDateField";
import { DraftTimeField } from "./form-fields/DraftTimeField";
import { MaxPlayersField } from "./form-fields/MaxPlayersField";
import { VisibilityField } from "./form-fields/VisibilityField";

interface LeagueFormFieldsProps {
  formData: LeagueFormInputs;
  handleInputChange: (field: keyof LeagueFormInputs, value: string | number | boolean) => void;
  tournaments?: Tournament[];
  isLoading?: boolean;
}

export const LeagueFormFields = ({
  formData,
  handleInputChange,
  tournaments,
  isLoading,
}: LeagueFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <NameField 
        name={formData.name} 
        setName={(value) => handleInputChange('name', value)} 
      />
      
      <TournamentField
        tournamentId={formData.tournamentId}
        setTournamentId={(value) => handleInputChange('tournamentId', value)}
        tournaments={tournaments}
        isLoading={isLoading}
      />
      
      <DraftDateField 
        draftDate={formData.draftDate} 
        setDraftDate={(value) => handleInputChange('draftDate', value)} 
      />
      
      <DraftTimeField 
        draftTime={formData.draftTime || ""} 
        setDraftTime={(value) => handleInputChange('draftTime', value)} 
      />
      
      <MaxPlayersField 
        maxPlayers={formData.maxPlayers} 
        setMaxPlayers={(value) => handleInputChange('maxPlayers', value)} 
      />
      
      <VisibilityField 
        isPublic={formData.isPublic} 
        setIsPublic={(value) => handleInputChange('isPublic', value)} 
      />
    </div>
  );
};

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DraftDateFieldProps {
  draftDate: string;
  setDraftDate: (date: string) => void;
}

export const DraftDateField = ({ draftDate, setDraftDate }: DraftDateFieldProps) => {
  return (
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
  );
};
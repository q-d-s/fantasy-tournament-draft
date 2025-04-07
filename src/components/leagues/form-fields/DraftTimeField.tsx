
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DraftTimeFieldProps {
  draftTime: string;
  setDraftTime: (time: string) => void;
}

export const DraftTimeField = ({ draftTime, setDraftTime }: DraftTimeFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="draftTime">Draft Time</Label>
      <Input
        id="draftTime"
        required
        type="time"
        value={draftTime}
        onChange={(e) => setDraftTime(e.target.value)}
        className="border-[#153624] focus-visible:ring-[#c2b067]"
      />
      <p className="text-sm text-muted-foreground">
        Select the time when you want to hold the draft.
      </p>
    </div>
  );
};

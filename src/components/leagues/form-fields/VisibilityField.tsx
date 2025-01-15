import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface VisibilityFieldProps {
  isPublic: boolean;
  setIsPublic: (isPublic: boolean) => void;
}

export const VisibilityField = ({
  isPublic,
  setIsPublic,
}: VisibilityFieldProps) => {
  return (
    <div className="space-y-2">
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
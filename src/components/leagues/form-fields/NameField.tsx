import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface NameFieldProps {
  name: string;
  setName: (name: string) => void;
}

export const NameField = ({ name, setName }: NameFieldProps) => {
  return (
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
  );
};
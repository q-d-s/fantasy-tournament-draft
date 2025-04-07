
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { createLeague } from "@/services/leagueService";
import { LeagueFormInputs } from "@/types";
import { useAuth } from "@/hooks/useAuth";

interface UseLeagueFormProps {
  onSuccess?: (leagueId: string) => void;
}

export const useLeagueForm = ({ onSuccess }: UseLeagueFormProps = {}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LeagueFormInputs>({
    name: "",
    tournamentId: "",
    maxPlayers: 10,
    isPublic: false,
    draftDate: new Date().toISOString().split('T')[0],
    draftTime: "",
  });

  const handleInputChange = (field: keyof LeagueFormInputs, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "You must be logged in to create a league.",
      });
      return false;
    }

    if (!formData.name.trim()) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter a league name.",
      });
      return false;
    }

    if (!formData.tournamentId) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select a tournament.",
      });
      return false;
    }

    if (!formData.draftDate) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select a draft date.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { data: league, error } = await createLeague(formData);
      if (error) throw error;
      if (!league) throw new Error("Failed to create league");

      toast({
        title: "League created successfully!",
        description: formData.isPublic
          ? "Your league is now visible in the public leagues list."
          : "Share your league's invite link to add members.",
      });

      if (onSuccess) {
        onSuccess(league.id);
      } else {
        navigate(`/leagues/${league.id}`);
      }
    } catch (error: any) {
      console.error('League creation error:', error);
      toast({
        variant: "destructive",
        title: "Error creating league",
        description: error.message || "Failed to create league. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleInputChange,
    loading,
    handleSubmit,
  };
};

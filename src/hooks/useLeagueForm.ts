import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { createLeague } from "@/services/leagueService";
import type { LeagueFormInputs } from "@/types/leagues.types";

interface UseLeagueFormProps {
  onSuccess?: (leagueId: string) => void;
}

export const useLeagueForm = ({ onSuccess }: UseLeagueFormProps = {}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LeagueFormInputs>({
    name: "",
    tournamentId: "",
    maxPlayers: 10,
    isPublic: false,
    draftDate: new Date().toISOString().split('T')[0],
  });

  const validateForm = () => {
    if (!formData.tournamentId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a tournament.",
      });
      return false;
    }

    if (!formData.draftDate) {
      toast({
        variant: "destructive",
        title: "Error",
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

      toast({
        title: "League created successfully!",
        description: formData.isPublic
          ? "Your league is now visible in the public leagues list."
          : "Share your league's invite link to add members.",
      });

      if (onSuccess && league) {
        onSuccess(league.id);
      } else if (league) {
        navigate(`/leagues/${league.id}`);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error creating league",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    handleSubmit,
  };
};
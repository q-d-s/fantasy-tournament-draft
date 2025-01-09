import { Standing } from "@/types/tournament";

type MatchResult = "win" | "draw" | "loss";
type KnockoutResult = "R32" | "R16" | "QF" | "SF" | "F" | "Third";

interface TeamResults {
  groupResults: MatchResult[];
  advancedFromGroup: boolean;
  knockoutWins: KnockoutResult[];
  wonFinal?: boolean;
  wonThirdPlace?: boolean;
}

export const calculateGroupPoints = (results: MatchResult[]): number => {
  return results.reduce((total, result) => {
    switch (result) {
      case "win":
        return total + 3;
      case "draw":
        return total + 1;
      default:
        return total;
    }
  }, 0);
};

export const calculateKnockoutPoints = (wins: KnockoutResult[]): number => {
  return wins.reduce((total, round) => {
    switch (round) {
      case "R32":
        return total + 3;
      case "R16":
        return total + 5;
      case "QF":
        return total + 7;
      case "SF":
        return total + 10;
      case "F":
        return total + 15;
      case "Third":
        return total + 3;
      default:
        return total;
    }
  }, 0);
};

export const calculateTotalPoints = (results: TeamResults): number => {
  const groupPoints = calculateGroupPoints(results.groupResults);
  const advancementBonus = results.advancedFromGroup ? 3 : 0;
  const knockoutPoints = calculateKnockoutPoints(results.knockoutWins);
  const championBonus = results.wonFinal ? 5 : 0;

  return groupPoints + advancementBonus + knockoutPoints + championBonus;
};
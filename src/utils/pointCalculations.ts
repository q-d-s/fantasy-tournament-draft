
// Match result types
export type MatchResult = "win" | "draw" | "loss";
export type KnockoutRound = "R32" | "R16" | "QF" | "SF" | "F";
export type SpecialResult = "Champion" | "Third";

// Points configuration
export const POINTS_CONFIG = {
  group: {
    win: 3,
    draw: 1,
    loss: 0,
  },
  advancement: 3,
  knockout: {
    R32: 3,
    R16: 5,
    QF: 7,
    SF: 10,
    F: 15,
    Third: 3,
  },
  champion: 5,
};

export interface TeamResults {
  groupResults: MatchResult[];
  advancedFromGroup: boolean;
  knockoutWins: Array<KnockoutRound | "Third">;
  wonFinal?: boolean;
  wonThirdPlace?: boolean;
}

/**
 * Calculates points earned in the group stage
 */
export const calculateGroupPoints = (results: MatchResult[]): number => {
  return results.reduce((total, result) => {
    switch (result) {
      case "win":
        return total + POINTS_CONFIG.group.win;
      case "draw":
        return total + POINTS_CONFIG.group.draw;
      default:
        return total;
    }
  }, 0);
};

/**
 * Calculates points earned in knockout stages
 */
export const calculateKnockoutPoints = (rounds: Array<KnockoutRound | "Third">): number => {
  return rounds.reduce((total, round) => {
    return total + POINTS_CONFIG.knockout[round];
  }, 0);
};

/**
 * Calculates total points for a team based on all results
 */
export const calculateTotalPoints = (results: TeamResults): number => {
  const groupPoints = calculateGroupPoints(results.groupResults);
  const advancementBonus = results.advancedFromGroup ? POINTS_CONFIG.advancement : 0;
  const knockoutPoints = calculateKnockoutPoints(results.knockoutWins);
  const championBonus = results.wonFinal ? POINTS_CONFIG.champion : 0;

  return groupPoints + advancementBonus + knockoutPoints + championBonus;
};

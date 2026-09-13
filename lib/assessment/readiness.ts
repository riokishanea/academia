import { ReadinessTier, SkillComparison } from "@/types/assessment";

/**
 * Calculates weighted overall score and deterministic Readiness Tier.
 * Formula: sum(skillPercentage * weight) / sum(weight)
 */
export function calculateOverallReadiness(comparisons: SkillComparison[]): {
  overallScore: number;
  readinessLevel: ReadinessTier;
  isReady: boolean;
} {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const item of comparisons) {
    const weight = item.weight || 20;
    weightedSum += item.assessmentPercentage * weight;
    totalWeight += weight;
  }

  const overallScore = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;

  let readinessLevel: ReadinessTier = "Needs Significant Improvement";
  if (overallScore >= 85) {
    readinessLevel = "Highly Ready";
  } else if (overallScore >= 70) {
    readinessLevel = "Ready with Minor Gaps";
  } else if (overallScore >= 50) {
    readinessLevel = "Developing";
  } else {
    readinessLevel = "Needs Significant Improvement";
  }

  const isReady = overallScore >= 70;

  return {
    overallScore,
    readinessLevel,
    isReady
  };
}

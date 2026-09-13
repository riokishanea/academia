import { CareerSkill, StudentSkill, AssessmentSkillScore, SkillComparison } from "@/types/assessment";

/**
 * Calculates skill percentages, compares against Career Role requirements,
 * and determines precise gap amounts.
 */
export function calculateSkillGaps(
  skillScoresMap: Record<string, { earned: number; max: number }>,
  careerSkills: CareerSkill[],
  studentSkills: StudentSkill[] = []
): {
  assessmentSkillScores: Omit<AssessmentSkillScore, "id" | "assessment_id" | "created_at">[];
  comparisons: SkillComparison[];
} {
  const assessmentSkillScores: Omit<AssessmentSkillScore, "id" | "assessment_id" | "created_at">[] = [];
  const comparisons: SkillComparison[] = [];

  // Map student baseline skills by name
  const studentSkillMap = new Map<string, number>();
  for (const sk of studentSkills) {
    studentSkillMap.set(sk.skill_name.toLowerCase().trim(), sk.proficiency_level);
  }

  for (const cSkill of careerSkills) {
    const rawSkillName = cSkill.skill_name;
    const scoreData = skillScoresMap[rawSkillName] || { earned: 0, max: 0 };
    
    const earned = scoreData.earned;
    const max = scoreData.max > 0 ? scoreData.max : 1;
    const percentage = Math.round((earned / max) * 100);
    const requiredPercentage = Number(cSkill.required_percentage) || 75;
    const gapPercentage = Math.max(requiredPercentage - percentage, 0);

    assessmentSkillScores.push({
      skill_name: rawSkillName,
      score: earned,
      max_score: max,
      percentage,
      required_percentage: requiredPercentage,
      gap_percentage: gapPercentage
    });

    const profileLevel = studentSkillMap.get(rawSkillName.toLowerCase().trim()) || 3;
    
    comparisons.push({
      skill: rawSkillName,
      profileLevel,
      assessmentPercentage: percentage,
      requiredPercentage,
      gapPercentage,
      weight: Number(cSkill.weight) || 20,
      status: percentage >= requiredPercentage ? "meets_requirement" : "skill_gap"
    });
  }

  return {
    assessmentSkillScores,
    comparisons
  };
}

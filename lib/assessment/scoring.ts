import { AssessmentQuestion, QuestionOption } from "@/types/assessment";

export interface QuestionWithAnswerKey extends AssessmentQuestion {
  options: QuestionOption[];
}

export interface EvaluatedAnswer {
  questionId: string;
  skillTag: string;
  weight: number;
  scoreAwarded: number;
  isCorrect: boolean;
}

export interface SkillScoreSummary {
  skillName: string;
  score: number;
  maxScore: number;
  percentage: number;
}

/**
 * Deterministic Server-Side Scoring Engine
 * Evaluates student answers against authoritative database answer keys.
 * Client has ZERO influence over correctness or scoring.
 */
export function evaluateStudentAnswers(
  questions: QuestionWithAnswerKey[],
  answers: Record<string, { selectedOptionIds: string[]; ratingValue: number | null }>
): {
  evaluatedAnswers: EvaluatedAnswer[];
  skillScores: Record<string, { earned: number; max: number }>;
  totalEarned: number;
  totalMax: number;
} {
  const evaluatedAnswers: EvaluatedAnswer[] = [];
  const skillScores: Record<string, { earned: number; max: number }> = {};
  let totalEarned = 0;
  let totalMax = 0;

  for (const question of questions) {
    const qId = question.id;
    const skillTag = question.skill_tag || "General";
    const weight = question.weight || 1;
    const answer = answers[qId] || { selectedOptionIds: [], ratingValue: null };

    if (!skillScores[skillTag]) {
      skillScores[skillTag] = { earned: 0, max: 0 };
    }
    skillScores[skillTag].max += weight;
    totalMax += weight;

    let scoreAwarded = 0;
    let isCorrect = false;

    if (question.question_type === "rating") {
      const val = answer.ratingValue || 0;
      scoreAwarded = (Math.min(Math.max(val, 0), 5) / 5) * weight;
      isCorrect = val >= 4;
    } else if (question.question_type === "multiple_select") {
      const correctOptionIds = (question.options || [])
        .filter((opt) => opt.is_correct)
        .map((opt) => opt.id);

      const selected = new Set(answer.selectedOptionIds || []);
      const allCorrectMatch =
        correctOptionIds.length === selected.size &&
        correctOptionIds.every((id) => selected.has(id));

      if (allCorrectMatch) {
        scoreAwarded = weight;
        isCorrect = true;
      } else {
        scoreAwarded = 0;
        isCorrect = false;
      }
    } else {
      // Normal MCQ / Scenario MCQ
      const correctOption = (question.options || []).find((opt) => opt.is_correct);
      const chosenOptionId = (answer.selectedOptionIds || [])[0];

      if (correctOption && chosenOptionId === correctOption.id) {
        scoreAwarded = weight;
        isCorrect = true;
      } else {
        scoreAwarded = 0;
        isCorrect = false;
      }
    }

    skillScores[skillTag].earned += scoreAwarded;
    totalEarned += scoreAwarded;

    evaluatedAnswers.push({
      questionId: qId,
      skillTag,
      weight,
      scoreAwarded,
      isCorrect
    });
  }

  return {
    evaluatedAnswers,
    skillScores,
    totalEarned,
    totalMax
  };
}

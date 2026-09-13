import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase, isServerSupabaseConfigured } from "@/lib/supabase/server";
import { mockDb, DEFAULT_STUDENT } from "@/lib/dummy-data";
import { evaluateStudentAnswers, QuestionWithAnswerKey } from "@/lib/assessment/scoring";
import { calculateSkillGaps } from "@/lib/assessment/skillGap";
import { calculateOverallReadiness } from "@/lib/assessment/readiness";
import { analyzeAssessmentWithAI, AIAnalysisInput } from "@/lib/ai/analyzeAssessment";
import { assessmentRateLimiter } from "@/lib/rate-limit/assessmentRateLimit";
import { AssessmentSubmissionResult, CareerSkill, StudentSkill, AssessmentSkillScore, QuestionOption } from "@/types/assessment";

interface RawDBQuestion {
  id: string;
  career_role_id: string;
  competency_id?: string | null;
  question_text: string;
  question_type: "mcq" | "multiple_select" | "scenario" | "rating";
  difficulty: "easy" | "medium" | "hard";
  skill_tag: string;
  explanation?: string;
  weight: number;
  active: boolean;
  source_type: "official" | "institution_defined" | "industry_defined" | "prototype_generated";
  question_options?: QuestionOption[];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { assessmentId, studentId = DEFAULT_STUDENT.id } = body;

    if (!assessmentId) {
      return NextResponse.json({ error: "assessmentId is required" }, { status: 400 });
    }

    // Rate Limiting / Concurrent Submission Lock
    const acquiredLock = assessmentRateLimiter.tryAcquireLock(assessmentId);
    if (!acquiredLock) {
      return NextResponse.json(
        { error: "Assessment submission is already being processed. Please wait." },
        { status: 429 }
      );
    }

    try {
      const supabase = createServerSupabase();

      if (supabase && isServerSupabaseConfigured()) {
        // 1. Fetch Assessment record
        const { data: assessment, error: aError } = await supabase
          .from("assessments")
          .select("*, career_roles(*)")
          .eq("id", assessmentId)
          .single();

        if (aError || !assessment) {
          return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
        }

        const role = assessment.career_roles;

        // If already analyzed, return existing stored result without re-calling Gemini
        if (assessment.status === "analyzed" && assessment.ai_analysis) {
          const { data: storedSkillScores } = await supabase
            .from("assessment_skill_scores")
            .select("*")
            .eq("assessment_id", assessmentId);

          const { data: careerSkillsData } = await supabase
            .from("career_skills")
            .select("*")
            .eq("career_role_id", role.id);

          const { data: studentSkillsData } = await supabase
            .from("student_skills")
            .select("*")
            .eq("student_id", studentId);

          const skillScoresMap: Record<string, { earned: number; max: number }> = {};
          ((storedSkillScores || []) as AssessmentSkillScore[]).forEach((s) => {
            skillScoresMap[s.skill_name] = { earned: Number(s.score), max: Number(s.max_score) };
          });

          const { comparisons } = calculateSkillGaps(
            skillScoresMap,
            (careerSkillsData || []) as CareerSkill[],
            (studentSkillsData || []) as StudentSkill[]
          );

          const result: AssessmentSubmissionResult = {
            assessmentId,
            careerTitle: role.title,
            overallScore: Number(assessment.total_score) || 0,
            readinessLevel: assessment.readiness_level,
            thresholdScore: Number(role.required_score) || 70,
            isReady: (Number(assessment.total_score) || 0) >= (Number(role.required_score) || 70),
            skillScores: (storedSkillScores || []) as AssessmentSkillScore[],
            comparisons,
            aiAnalysis: assessment.ai_analysis,
            submittedAt: assessment.submitted_at || new Date().toISOString()
          };

          return NextResponse.json(result);
        }

        // 2. Fetch all questions with full server answer keys
        const { data: fullQuestionsData, error: qError } = await supabase
          .from("assessment_questions")
          .select(`
            id,
            career_role_id,
            competency_id,
            question_text,
            question_type,
            difficulty,
            skill_tag,
            explanation,
            weight,
            active,
            source_type,
            question_options (
              id,
              question_id,
              option_text,
              is_correct,
              score,
              display_order
            )
          `)
          .eq("career_role_id", role.id)
          .eq("active", true);

        if (qError || !fullQuestionsData) {
          throw new Error("Failed to load question key from server");
        }

        // 3. Fetch student submitted answers
        const { data: answersData } = await supabase
          .from("assessment_answers")
          .select("*")
          .eq("assessment_id", assessmentId);

        const answersMap: Record<string, { selectedOptionIds: string[]; ratingValue: number | null }> = {};
        (answersData || []).forEach((ans: { question_id: string; selected_option_ids?: string[]; rating_value?: number | null }) => {
          answersMap[ans.question_id] = {
            selectedOptionIds: ans.selected_option_ids || [],
            ratingValue: ans.rating_value ?? null
          };
        });

        // 4. Deterministic Server-Side Scoring
        const rawList = fullQuestionsData as unknown as RawDBQuestion[];
        const formattedQuestions: QuestionWithAnswerKey[] = rawList.map((q) => ({
          ...q,
          options: q.question_options || []
        }));

        const { evaluatedAnswers, skillScores } = evaluateStudentAnswers(formattedQuestions, answersMap);

        // 5. Fetch Career Skills & Student Baseline Skills
        const { data: careerSkills } = await supabase
          .from("career_skills")
          .select("*")
          .eq("career_role_id", role.id);

        const { data: studentSkills } = await supabase
          .from("student_skills")
          .select("*")
          .eq("student_id", studentId);

        // 6. Calculate Skill Gaps & Comparisons
        const { assessmentSkillScores, comparisons } = calculateSkillGaps(
          skillScores,
          (careerSkills || []) as CareerSkill[],
          (studentSkills || []) as StudentSkill[]
        );

        // 7. Calculate Overall Score & Readiness
        const { overallScore, readinessLevel, isReady } = calculateOverallReadiness(comparisons);

        // 8. Call Gemini AI strictly once for qualitative analysis (with deterministic fallback)
        const typedStudentSkills = (studentSkills || []) as StudentSkill[];
        const typedCareerSkills = (careerSkills || []) as CareerSkill[];

        const aiInput: AIAnalysisInput = {
          career: role.title,
          overallScore,
          readiness: readinessLevel,
          studentSkills: typedStudentSkills,
          assessmentSkills: comparisons.map((c) => ({
            skill: c.skill,
            score: c.assessmentPercentage,
            required: c.requiredPercentage,
            gap: c.gapPercentage
          })),
          careerRequirements: typedCareerSkills.map((cs) => ({
            skill: cs.skill_name,
            requiredPercentage: Number(cs.required_percentage),
            weight: Number(cs.weight)
          })),
          skillGaps: comparisons.filter((c) => c.gapPercentage > 0).map((c) => ({
            skill: c.skill,
            gap: c.gapPercentage
          }))
        };

        const aiAnalysis = await analyzeAssessmentWithAI(aiInput);

        // 9. Update individual answer score awards in database
        for (const ev of evaluatedAnswers) {
          await supabase
            .from("assessment_answers")
            .update({ score_awarded: ev.scoreAwarded })
            .eq("assessment_id", assessmentId)
            .eq("question_id", ev.questionId);
        }

        // 10. Upsert Assessment Skill Scores in database
        for (const sc of assessmentSkillScores) {
          await supabase.from("assessment_skill_scores").upsert(
            {
              assessment_id: assessmentId,
              skill_name: sc.skill_name,
              score: sc.score,
              max_score: sc.max_score,
              percentage: sc.percentage,
              required_percentage: sc.required_percentage,
              gap_percentage: sc.gap_percentage
            },
            { onConflict: "assessment_id, skill_name" }
          );
        }

        // 11. Update Assessment status to 'analyzed'
        const submittedAt = new Date().toISOString();
        await supabase
          .from("assessments")
          .update({
            status: "analyzed",
            submitted_at: submittedAt,
            total_score: overallScore,
            percentage: overallScore,
            readiness_level: readinessLevel,
            ai_analysis: aiAnalysis
          })
          .eq("id", assessmentId);

        const result: AssessmentSubmissionResult = {
          assessmentId,
          careerTitle: role.title,
          overallScore,
          readinessLevel,
          thresholdScore: Number(role.required_score) || 70,
          isReady,
          skillScores: assessmentSkillScores.map((s) => ({ ...s, assessment_id: assessmentId })),
          comparisons,
          aiAnalysis,
          submittedAt
        };

        return NextResponse.json(result);
      } else {
        // Fallback in-memory database
        const assessment = mockDb.getAssessment(assessmentId);
        const role = mockDb.getCareerRoleBySlug("ayurveda-clinical-assistant");

        if (assessment && assessment.status === "analyzed" && assessment.ai_analysis) {
          const storedScores = mockDb.getSkillScores(assessmentId);
          const careerSkills = mockDb.getCareerSkills(role.id);
          const studentSkills = mockDb.getStudentSkills(studentId);

          const skillScoresMap: Record<string, { earned: number; max: number }> = {};
          storedScores.forEach((s) => {
            skillScoresMap[s.skill_name] = { earned: s.score, max: s.max_score };
          });

          const { comparisons } = calculateSkillGaps(skillScoresMap, careerSkills, studentSkills);

          const result: AssessmentSubmissionResult = {
            assessmentId,
            careerTitle: role.title,
            overallScore: assessment.total_score || 0,
            readinessLevel: assessment.readiness_level || "Developing",
            thresholdScore: role.required_score,
            isReady: (assessment.total_score || 0) >= role.required_score,
            skillScores: storedScores,
            comparisons,
            aiAnalysis: assessment.ai_analysis,
            submittedAt: assessment.submitted_at || new Date().toISOString()
          };
          return NextResponse.json(result);
        }

        const allQuestions = mockDb.getQuestions(role.id);
        const savedAnswers = mockDb.getSavedAnswers(assessmentId);
        const careerSkills = mockDb.getCareerSkills(role.id);
        const studentSkills = mockDb.getStudentSkills(studentId);

        const { skillScores } = evaluateStudentAnswers(allQuestions, savedAnswers);
        const { assessmentSkillScores, comparisons } = calculateSkillGaps(skillScores, careerSkills, studentSkills);
        const { overallScore, readinessLevel, isReady } = calculateOverallReadiness(comparisons);

        const aiInput: AIAnalysisInput = {
          career: role.title,
          overallScore,
          readiness: readinessLevel,
          studentSkills,
          assessmentSkills: comparisons.map((c) => ({
            skill: c.skill,
            score: c.assessmentPercentage,
            required: c.requiredPercentage,
            gap: c.gapPercentage
          })),
          careerRequirements: careerSkills.map((cs) => ({
            skill: cs.skill_name,
            requiredPercentage: cs.required_percentage,
            weight: cs.weight
          })),
          skillGaps: comparisons.filter((c) => c.gapPercentage > 0).map((c) => ({
            skill: c.skill,
            gap: c.gapPercentage
          }))
        };

        const aiAnalysis = await analyzeAssessmentWithAI(aiInput);

        mockDb.saveSubmissionResult(
          assessmentId,
          overallScore,
          overallScore,
          readinessLevel,
          aiAnalysis,
          assessmentSkillScores.map((s) => ({ ...s, assessment_id: assessmentId }))
        );

        const result: AssessmentSubmissionResult = {
          assessmentId,
          careerTitle: role.title,
          overallScore,
          readinessLevel,
          thresholdScore: role.required_score,
          isReady,
          skillScores: assessmentSkillScores.map((s) => ({ ...s, assessment_id: assessmentId })),
          comparisons,
          aiAnalysis,
          submittedAt: new Date().toISOString()
        };

        return NextResponse.json(result);
      }
    } finally {
      assessmentRateLimiter.releaseLock(assessmentId);
    }
  } catch (error: unknown) {
    console.error("Error in POST /api/assessment/submit:", error);
    const message = error instanceof Error ? error.message : "Failed to submit and evaluate assessment";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

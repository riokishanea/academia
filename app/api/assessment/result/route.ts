import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase, isServerSupabaseConfigured } from "@/lib/supabase/server";
import { mockDb, DEFAULT_STUDENT } from "@/lib/dummy-data";
import { calculateSkillGaps } from "@/lib/assessment/skillGap";
import { AssessmentSubmissionResult, AssessmentSkillScore, CareerSkill, StudentSkill } from "@/types/assessment";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const assessmentId = searchParams.get("assessmentId");
    const studentId = searchParams.get("studentId") || DEFAULT_STUDENT.id;

    if (!assessmentId) {
      return NextResponse.json({ error: "assessmentId is required" }, { status: 400 });
    }

    const supabase = createServerSupabase();

    if (supabase && isServerSupabaseConfigured()) {
      try {
        const { data: assessment, error: aError } = await supabase
          .from("assessments")
          .select("*, career_roles(*)")
          .eq("id", assessmentId)
          .single();

        if (aError || !assessment) {
          throw new Error("Assessment not found in Supabase");
        }

        if (assessment.status !== "analyzed" && assessment.status !== "submitted") {
          return NextResponse.json(
            { error: "Assessment has not been analyzed yet" },
            { status: 400 }
          );
        }

        const role = assessment.career_roles;

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
          submittedAt: assessment.submitted_at || assessment.created_at || new Date().toISOString()
        };

        return NextResponse.json(result);
      } catch (sbErr) {
        console.warn("Supabase result query failed, falling back to mockDb:", sbErr);
      }
    }

    const assessment = mockDb.getAssessment(assessmentId);
    const role = (assessment && mockDb.getCareerRoles().find((r) => r.id === assessment.career_role_id))
      || mockDb.getCareerRoleBySlug("ayurveda-clinical-assistant");

    if (!assessment || (assessment.status !== "analyzed" && assessment.status !== "submitted")) {
      return NextResponse.json(
        { error: "Assessment not found or not yet analyzed" },
        { status: 404 }
      );
    }

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
        aiAnalysis: assessment.ai_analysis!,
        submittedAt: assessment.submitted_at || assessment.created_at || new Date().toISOString()
      };

      return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Error in GET /api/assessment/result:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch assessment result";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

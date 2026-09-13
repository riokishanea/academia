import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase, isServerSupabaseConfigured } from "@/lib/supabase/server";
import { mockDb, DEFAULT_STUDENT } from "@/lib/dummy-data";
import { ActiveAssessmentPayload, SafeAssessmentQuestion } from "@/types/assessment";

interface RawQuestionOption {
  id: string;
  option_text: string;
  display_order: number;
}

interface RawQuestionRow {
  id: string;
  question_text: string;
  question_type: SafeAssessmentQuestion["question_type"];
  difficulty: SafeAssessmentQuestion["difficulty"];
  skill_tag: string;
  weight: number;
  question_options?: RawQuestionOption[];
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const roleSlug = searchParams.get("role") || "ayurveda-clinical-assistant";
    const studentId = searchParams.get("studentId") || DEFAULT_STUDENT.id;

    const supabase = createServerSupabase();

    if (supabase && isServerSupabaseConfigured()) {
      try {
        // 1. Fetch Career Role from Supabase
        const { data: role, error: roleError } = await supabase
          .from("career_roles")
          .select("*")
          .eq("slug", roleSlug)
          .eq("active", true)
          .single();

        if (roleError || !role) {
          throw new Error(roleError?.message || "Career role not found in Supabase");
        }

      // 2. Fetch or Create In-Progress Assessment
      let assessmentId: string;
      const { data: existingAssessments } = await supabase
        .from("assessments")
        .select("*")
        .eq("student_id", studentId)
        .eq("career_role_id", role.id)
        .eq("status", "in_progress")
        .order("created_at", { ascending: false })
        .limit(1);

      if (existingAssessments && existingAssessments.length > 0) {
        assessmentId = existingAssessments[0].id;
      } else {
        const { data: newAssessment, error: createError } = await supabase
          .from("assessments")
          .insert({
            student_id: studentId,
            career_role_id: role.id,
            status: "in_progress",
            started_at: new Date().toISOString()
          })
          .select("id")
          .single();

        if (createError || !newAssessment) {
          throw new Error("Failed to create assessment record");
        }
        assessmentId = newAssessment.id;
      }

      // 3. Fetch Active Questions & Options
      const { data: rawQuestions, error: qError } = await supabase
        .from("assessment_questions")
        .select(`
          id,
          question_text,
          question_type,
          difficulty,
          skill_tag,
          weight,
          question_options (
            id,
            option_text,
            display_order
          )
        `)
        .eq("career_role_id", role.id)
        .eq("active", true);

      if (qError || !rawQuestions) {
        throw new Error("Failed to fetch questions");
      }

      // Sanitize questions: strip is_correct, score, explanation
      const typedQuestions = rawQuestions as unknown as RawQuestionRow[];
      const safeQuestions: SafeAssessmentQuestion[] = typedQuestions.map((q) => ({
        id: q.id,
        question_text: q.question_text,
        question_type: q.question_type,
        difficulty: q.difficulty,
        skill_tag: q.skill_tag,
        weight: Number(q.weight) || 1,
        options: (q.question_options || [])
          .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
          .map((opt) => ({
            id: opt.id,
            option_text: opt.option_text,
            display_order: opt.display_order
          }))
      }));

      // 4. Fetch already saved answers
      const { data: savedAnswersList } = await supabase
        .from("assessment_answers")
        .select("question_id, selected_option_ids, rating_value")
        .eq("assessment_id", assessmentId);

      const savedAnswers: Record<string, { selectedOptionIds: string[]; ratingValue: number | null }> = {};
      if (savedAnswersList) {
        for (const ans of savedAnswersList) {
          savedAnswers[ans.question_id] = {
            selectedOptionIds: ans.selected_option_ids || [],
            ratingValue: ans.rating_value
          };
        }
      }

      const payload: ActiveAssessmentPayload = {
        assessmentId,
        careerRole: {
          id: role.id,
          title: role.title,
          slug: role.slug,
          description: role.description,
          sector: role.sector,
          requiredScore: Number(role.required_score) || 70
        },
        questions: safeQuestions,
        savedAnswers,
        status: "in_progress"
      };

        return NextResponse.json(payload);
      } catch (sbErr) {
        console.warn("Supabase start assessment query failed, falling back to mockDb:", sbErr);
      }
    }

    // Fallback in-memory database
    const role = mockDb.getCareerRoleBySlug(roleSlug);
      const assessment = mockDb.getOrCreateActiveAssessment(studentId, role.id);
      const allQuestions = mockDb.getQuestions(role.id);

      const safeQuestions: SafeAssessmentQuestion[] = allQuestions.map((q) => ({
        id: q.id,
        question_text: q.question_text,
        question_type: q.question_type,
        difficulty: q.difficulty,
        skill_tag: q.skill_tag,
        weight: q.weight,
        options: q.options.map((opt) => ({
          id: opt.id,
          option_text: opt.option_text,
          display_order: opt.display_order
        }))
      }));

      const savedAnswers = mockDb.getSavedAnswers(assessment.id);

      const payload: ActiveAssessmentPayload = {
        assessmentId: assessment.id,
        careerRole: {
          id: role.id,
          title: role.title,
          slug: role.slug,
          description: role.description,
          sector: role.sector,
          requiredScore: role.required_score
        },
        questions: safeQuestions,
        savedAnswers,
        status: assessment.status
      };

      return NextResponse.json(payload);
  } catch (error: unknown) {
    console.error("Error in GET /api/assessment/start:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

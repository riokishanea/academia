import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase, isServerSupabaseConfigured } from "@/lib/supabase/server";
import { mockDb, DEFAULT_STUDENT } from "@/lib/dummy-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { assessmentId, questionId, selectedOptionIds, ratingValue, studentId = DEFAULT_STUDENT.id } = body;

    if (!assessmentId || !questionId) {
      return NextResponse.json(
        { error: "assessmentId and questionId are required" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabase();

    if (supabase && isServerSupabaseConfigured()) {
      // 1. Verify assessment exists, is owned by student, and is in_progress
      const { data: assessment, error: aError } = await supabase
        .from("assessments")
        .select("id, status, student_id")
        .eq("id", assessmentId)
        .single();

      if (aError || !assessment) {
        return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
      }

      if (assessment.status !== "in_progress") {
        return NextResponse.json(
          { error: "Cannot modify answers for a submitted assessment" },
          { status: 403 }
        );
      }

      if (assessment.student_id && studentId && assessment.student_id !== studentId) {
        return NextResponse.json(
          { error: "Unauthorized: assessment belongs to another student" },
          { status: 403 }
        );
      }

      // 2. Upsert answer in assessment_answers
      const { error: upsertError } = await supabase
        .from("assessment_answers")
        .upsert(
          {
            assessment_id: assessmentId,
            question_id: questionId,
            selected_option_ids: selectedOptionIds || [],
            rating_value: ratingValue !== undefined ? ratingValue : null
          },
          { onConflict: "assessment_id, question_id" }
        );

      if (upsertError) {
        console.error("Error saving answer in Supabase:", upsertError);
        throw new Error(upsertError.message);
      }

      return NextResponse.json({ success: true, savedAt: new Date().toISOString() });
    } else {
      // Fallback in-memory database
      const assessment = mockDb.getAssessment(assessmentId);
      if (assessment && assessment.status !== "in_progress") {
        return NextResponse.json(
          { error: "Cannot modify answers for a submitted assessment" },
          { status: 403 }
        );
      }

      if (assessment && assessment.student_id && studentId && assessment.student_id !== studentId) {
        return NextResponse.json(
          { error: "Unauthorized: assessment belongs to another student" },
          { status: 403 }
        );
      }

      mockDb.saveAnswer(assessmentId, questionId, selectedOptionIds || [], ratingValue !== undefined ? ratingValue : null);
      return NextResponse.json({ success: true, savedAt: new Date().toISOString() });
    }
  } catch (error: unknown) {
    console.error("Error in POST /api/assessment/answer:", error);
    const message = error instanceof Error ? error.message : "Failed to save answer";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

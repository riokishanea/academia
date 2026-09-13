"use client";

import React, { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ActiveAssessmentPayload } from "@/types/assessment";
import { AssessmentHeader } from "@/components/assessment/AssessmentHeader";
import { AssessmentProgress } from "@/components/assessment/AssessmentProgress";
import { AssessmentQuestionCard } from "@/components/assessment/AssessmentQuestion";
import { AssessmentNavigation } from "@/components/assessment/AssessmentNavigation";
import { AlertCircle, RefreshCw, ArrowLeft, ShieldAlert } from "lucide-react";
import { DEFAULT_STUDENT } from "@/lib/dummy-data";

function AssessmentRunnerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleSlug = searchParams.get("role") || "ayurveda-clinical-assistant";

  const [assessmentData, setAssessmentData] = useState<ActiveAssessmentPayload | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { selectedOptionIds: string[]; ratingValue: number | null }>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Auto-save debounce timer ref
  const [reloadToken, setReloadToken] = useState(0);

  // Auto-save debounce timer ref
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch assessment payload from /api/assessment/start
  useEffect(() => {
    let isCancelled = false;

    let studentId = DEFAULT_STUDENT.id;
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("ayush_student_session");
      if (session) {
        try {
          const parsed = JSON.parse(session);
          studentId = parsed.id || studentId;
        } catch {
          // ignore
        }
      }
    }

    fetch(`/api/assessment/start?role=${encodeURIComponent(roleSlug)}&studentId=${studentId}`)
      .then(async (res) => {
        if (isCancelled) return;
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Failed to load assessment (${res.status})`);
        }
        const data: ActiveAssessmentPayload = await res.json();
        if (!isCancelled) {
          setAssessmentData(data);
          setAnswers(data.savedAnswers || {});
          setIsLoading(false);
          if (data.status === "analyzed" || data.status === "submitted") {
            router.push(`/dashboard/assessment/result?id=${data.assessmentId}`);
          }
        }
      })
      .catch((err: unknown) => {
        if (!isCancelled) {
          console.error("Error loading assessment:", err);
          const msg = err instanceof Error ? err.message : "Failed to load questions. Please check your connection.";
          setError(msg);
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [roleSlug, router, reloadToken]);

  // Real-time Autosave handler
  const saveAnswerToServer = useCallback(async (
    questionId: string, 
    selectedOptionIds: string[], 
    ratingValue: number | null
  ) => {
    if (!assessmentData) return;
    setIsSaving(true);

    try {
      let studentId = DEFAULT_STUDENT.id;
      if (typeof window !== "undefined") {
        const session = localStorage.getItem("ayush_student_session");
        if (session) {
          try {
            const parsed = JSON.parse(session);
            studentId = parsed.id || studentId;
          } catch {
            // ignore
          }
        }
      }

      await fetch("/api/assessment/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId: assessmentData.assessmentId,
          questionId,
          selectedOptionIds,
          ratingValue,
          studentId
        })
      });

      setLastSavedAt(new Date().toLocaleTimeString());
    } catch (err) {
      console.warn("Autosave failed in background:", err);
    } finally {
      setIsSaving(false);
    }
  }, [assessmentData]);

  // Handle Option Toggle
  const handleOptionToggle = (optionId: string) => {
    if (!assessmentData) return;
    const currentQuestion = assessmentData.questions[currentIndex];
    if (!currentQuestion) return;

    const qId = currentQuestion.id;
    const isMulti = currentQuestion.question_type === "multiple_select";
    const currentAns = answers[qId] || { selectedOptionIds: [], ratingValue: null };

    let nextSelected: string[];
    if (isMulti) {
      if (currentAns.selectedOptionIds.includes(optionId)) {
        nextSelected = currentAns.selectedOptionIds.filter((id) => id !== optionId);
      } else {
        nextSelected = [...currentAns.selectedOptionIds, optionId];
      }
    } else {
      nextSelected = [optionId];
    }

    const updated = {
      ...answers,
      [qId]: {
        selectedOptionIds: nextSelected,
        ratingValue: null
      }
    };
    setAnswers(updated);

    // Debounce save to server
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveAnswerToServer(qId, nextSelected, null);
    }, 400);
  };

  // Handle Rating Change
  const handleRatingChange = (rating: number) => {
    if (!assessmentData) return;
    const currentQuestion = assessmentData.questions[currentIndex];
    if (!currentQuestion) return;

    const qId = currentQuestion.id;
    const updated = {
      ...answers,
      [qId]: {
        selectedOptionIds: [],
        ratingValue: rating
      }
    };
    setAnswers(updated);

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveAnswerToServer(qId, [], rating);
    }, 400);
  };

  // Final Submit Assessment
  const handleSubmitAssessment = async () => {
    if (!assessmentData || isSubmitting) return;
    setIsSubmitting(true);
    setShowConfirmModal(false);

    try {
      let studentId = DEFAULT_STUDENT.id;
      if (typeof window !== "undefined") {
        const session = localStorage.getItem("ayush_student_session");
        if (session) {
          try {
            const parsed = JSON.parse(session);
            studentId = parsed.id || studentId;
          } catch {
            // ignore
          }
        }
      }

      const res = await fetch("/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId: assessmentData.assessmentId,
          studentId
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Submission failed (${res.status})`);
      }

      const submissionResult = await res.json();
      router.push(`/dashboard/assessment/result?id=${submissionResult.assessmentId}`);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      const msg = err instanceof Error ? err.message : String(err);
      alert(`Submission error: ${msg}`);
      setIsSubmitting(false);
    }
  };

  // Safe navigation warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (Object.keys(answers).length > 0 && !isSubmitting) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [answers, isSubmitting]);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
          Loading Ayurveda Clinical Assessment...
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          Fetching validated question bank and student profile.
        </p>
      </div>
    );
  }

  // Error State
  if (error || !assessmentData || assessmentData.questions.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 max-w-md">
          <AlertCircle className="w-10 h-10 text-rose-600 dark:text-rose-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-rose-900 dark:text-rose-200 mb-1">
            Unable to Load Assessment
          </h2>
          <p className="text-xs sm:text-sm text-rose-700 dark:text-rose-300 mb-4">
            {error || "No active questions found for this career role."}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setIsLoading(true);
                setError(null);
                setReloadToken((prev) => prev + 1);
              }}
              className="py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry
            </button>
            <Link
              href="/dashboard"
              className="py-2 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const questions = assessmentData.questions;
  const currentQuestion = questions[currentIndex];
  const questionIds = questions.map((q) => q.id);

  // Set of answered question IDs
  const answeredSet = new Set<string>();
  for (const [qId, ans] of Object.entries(answers)) {
    if (ans.selectedOptionIds.length > 0 || (ans.ratingValue !== null && ans.ratingValue > 0)) {
      answeredSet.add(qId);
    }
  }

  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      {/* 1. Assessment Header */}
      <AssessmentHeader
        title={assessmentData.careerRole.title}
        description={assessmentData.careerRole.description}
        sector={assessmentData.careerRole.sector}
        thresholdScore={assessmentData.careerRole.requiredScore}
        totalQuestions={questions.length}
        currentQuestionIndex={currentIndex}
        isSaving={isSaving}
        lastSavedAt={lastSavedAt}
      />

      {/* Main Runner Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </Link>
          <span className="text-xs text-zinc-400">
            Progress is automatically saved to your student account
          </span>
        </div>

        {/* 2. Progress Component */}
        <AssessmentProgress
          totalQuestions={questions.length}
          currentQuestionIndex={currentIndex}
          answeredQuestions={answeredSet}
          questionIds={questionIds}
          onSelectQuestion={(idx) => setCurrentIndex(idx)}
        />

        {/* 3. Question Card */}
        {currentQuestion && (
          <AssessmentQuestionCard
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            selectedOptionIds={currentAnswer?.selectedOptionIds || []}
            ratingValue={currentAnswer?.ratingValue ?? null}
            onOptionToggle={handleOptionToggle}
            onRatingChange={handleRatingChange}
          />
        )}

        {/* 4. Navigation Controls */}
        <AssessmentNavigation
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          isSubmitting={isSubmitting}
          onPrevious={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          onNext={() => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))}
          onSubmit={() => setShowConfirmModal(true)}
          answeredCount={answeredSet.size}
        />
      </main>

      {/* Confirmation Modal before Final Submission */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Submit Assessment for AI Evaluation?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
              You have answered <strong className="text-zinc-900 dark:text-zinc-100">{answeredSet.size} of {questions.length}</strong> questions.
              {answeredSet.size < questions.length && (
                <span className="block mt-1 text-amber-600 dark:text-amber-400 font-medium">
                  Warning: You still have {questions.length - answeredSet.size} unanswered questions.
                </span>
              )}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                Review Answers
              </button>
              <button
                type="button"
                onClick={handleSubmitAssessment}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm cursor-pointer"
              >
                {isSubmitting ? "Scoring & Analyzing..." : "Confirm & Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AssessmentRunnerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
          <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
            Initializing Assessment Environment...
          </h2>
        </div>
      }
    >
      <AssessmentRunnerContent />
    </Suspense>
  );
}


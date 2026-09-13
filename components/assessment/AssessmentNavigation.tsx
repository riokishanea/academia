import React from "react";
import { ChevronLeft, ChevronRight, Send, AlertCircle } from "lucide-react";

interface AssessmentNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  answeredCount: number;
}

export const AssessmentNavigation: React.FC<AssessmentNavigationProps> = ({
  currentIndex,
  totalQuestions,
  isSubmitting,
  onPrevious,
  onNext,
  onSubmit,
  answeredCount
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Left / Unanswered warning note */}
      <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
        {unansweredCount > 0 ? (
          <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {unansweredCount} question{unansweredCount > 1 ? "s" : ""} remaining
          </span>
        ) : (
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            All {totalQuestions} questions answered
          </span>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirst || isSubmitting}
          className={`px-4 py-2.5 rounded-xl text-sm font-medium border flex items-center gap-1.5 transition-all ${
            isFirst || isSubmitting
              ? "opacity-50 cursor-not-allowed border-zinc-200 dark:border-zinc-800 text-zinc-400"
              : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 cursor-pointer"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {!isLast ? (
          <button
            type="button"
            onClick={onNext}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
              isSubmitting
                ? "bg-zinc-400 cursor-not-allowed"
                : "bg-emerald-700 hover:bg-emerald-800 ring-2 ring-emerald-600/30"
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Evaluating Assessment...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Assessment
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

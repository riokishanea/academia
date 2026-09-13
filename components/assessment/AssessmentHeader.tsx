import React from "react";
import { Clock, ShieldCheck } from "lucide-react";

interface AssessmentHeaderProps {
  title: string;
  description: string;
  sector: string;
  thresholdScore: number;
  totalQuestions: number;
  currentQuestionIndex: number;
  isSaving: boolean;
  lastSavedAt: string | null;
}

export const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({
  title,
  description,
  sector,
  thresholdScore,
  totalQuestions,
  currentQuestionIndex,
  isSaving,
  lastSavedAt
}) => {
  return (
    <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-20 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Role Info */}
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                Category: {sector}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                Benchmark: {thresholdScore}% Pass Threshold
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl line-clamp-1 mt-0.5">
              {description}
            </p>
          </div>

          {/* Status & Auto-save */}
          <div className="flex items-center justify-between md:justify-end gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>
                Question <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">{currentQuestionIndex + 1}</strong> of {totalQuestions}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {isSaving ? (
                <span className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  Saving...
                </span>
              ) : lastSavedAt ? (
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Autosaved
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

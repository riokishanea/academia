import React from "react";
import { CheckCircle2 } from "lucide-react";

interface AssessmentProgressProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  answeredQuestions: Set<string>;
  questionIds: string[];
  onSelectQuestion: (index: number) => void;
}

export const AssessmentProgress: React.FC<AssessmentProgressProps> = ({
  totalQuestions,
  currentQuestionIndex,
  answeredQuestions,
  questionIds,
  onSelectQuestion
}) => {
  const answeredCount = answeredQuestions.size;
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs">
      <div className="flex items-center justify-between text-xs sm:text-sm font-medium mb-2">
        <span className="text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Assessment Progress
        </span>
        <span className="text-emerald-700 dark:text-emerald-300 font-bold">
          {answeredCount} / {totalQuestions} answered ({progressPercent}%)
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden mb-3">
        <div
          className="bg-emerald-600 dark:bg-emerald-500 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Interactive Question Dots */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {questionIds.map((qId, index) => {
          const isCurrent = index === currentQuestionIndex;
          const isAnswered = answeredQuestions.has(qId);

          return (
            <button
              key={qId}
              type="button"
              onClick={() => onSelectQuestion(index)}
              title={`Question ${index + 1}: ${isAnswered ? "Answered" : "Unanswered"}`}
              className={`w-7 h-7 text-xs font-semibold rounded-md transition-all flex items-center justify-center cursor-pointer ${
                isCurrent
                  ? "ring-2 ring-emerald-600 bg-emerald-600 text-white font-bold"
                  : isAnswered
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-200 hover:bg-emerald-200"
                  : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

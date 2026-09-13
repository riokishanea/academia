import React from "react";
import { SafeAssessmentQuestion } from "@/types/assessment";
import { Stethoscope, CheckSquare, Star, BookOpen } from "lucide-react";

interface AssessmentQuestionProps {
  question: SafeAssessmentQuestion;
  questionNumber: number;
  selectedOptionIds: string[];
  ratingValue: number | null;
  onOptionToggle: (optionId: string) => void;
  onRatingChange: (rating: number) => void;
}

export const AssessmentQuestionCard: React.FC<AssessmentQuestionProps> = ({
  question,
  questionNumber,
  selectedOptionIds,
  ratingValue,
  onOptionToggle,
  onRatingChange
}) => {
  const isMultiSelect = question.question_type === "multiple_select";
  const isRating = question.question_type === "rating";
  const isScenario = question.question_type === "scenario";

  const getSkillBadgeColor = (skill: string) => {
    switch (skill) {
      case "Ayurvedic Fundamentals":
        return "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800";
      case "Clinical Reasoning":
        return "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800";
      case "Patient Communication":
        return "bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800";
      case "Clinical Documentation":
        return "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800";
      case "Professional Ethics":
        return "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800";
      default:
        return "bg-zinc-100 text-zinc-800 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700";
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xs">
      {/* Top Metadata Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${getSkillBadgeColor(question.skill_tag)} flex items-center gap-1`}>
            <BookOpen className="w-3 h-3" />
            {question.skill_tag}
          </span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 capitalize">
            {question.difficulty}
          </span>
          {isScenario && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1">
              <Stethoscope className="w-3 h-3" />
              Clinical Scenario
            </span>
          )}
          {isMultiSelect && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 flex items-center gap-1">
              <CheckSquare className="w-3 h-3" />
              Multiple Select
            </span>
          )}
        </div>

        <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-1 rounded-md">
          Q{questionNumber}
        </span>
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-relaxed">
          {question.question_text}
        </h2>
      </div>

      {/* Interactive Options or Rating */}
      {isRating ? (
        <div className="py-4">
          <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3">
            Rate your confidence / competence level from 1 (Novice / Unconfident) to 5 (Expert / Confident):
          </p>
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5].map((lvl) => {
              const isSelected = ratingValue === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => onRatingChange(lvl)}
                  className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-bold ring-2 ring-emerald-500"
                      : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  <Star className={`w-5 h-5 mb-1 ${isSelected ? "text-amber-500 fill-amber-500" : "text-zinc-400"}`} />
                  <span className="text-base font-bold">{lvl}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {question.options.map((option, optIdx) => {
            const isSelected = selectedOptionIds.includes(option.id);
            const letter = String.fromCharCode(65 + optIdx);

            return (
              <label
                key={option.id}
                onClick={() => onOptionToggle(option.id)}
                className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all cursor-pointer select-none ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500 shadow-xs"
                    : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100/50"
                }`}
              >
                {/* Radio or Checkbox icon / Letter */}
                <div
                  className={`w-6 h-6 rounded-${isMultiSelect ? "md" : "full"} flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {letter}
                </div>

                {/* Option Text */}
                <span className="text-sm sm:text-base font-normal leading-relaxed pt-0.5">
                  {option.option_text}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

import React from "react";
import { SkillComparison } from "@/types/assessment";
import { CheckCircle, AlertTriangle, Scale } from "lucide-react";

interface SkillScoreCardProps {
  comparison: SkillComparison;
}

export const SkillScoreCard: React.FC<SkillScoreCardProps> = ({ comparison }) => {
  const isMet = comparison.status === "meets_requirement";

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 shadow-xs transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            {comparison.skill}
          </h3>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            <span className="flex items-center gap-1">
              <Scale className="w-3 h-3" />
              Weight: {comparison.weight}%
            </span>
            <span>•</span>
            <span>Profile Baseline: Level {comparison.profileLevel}/5</span>
          </div>
        </div>

        <div>
          {isMet ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle className="w-3.5 h-3.5" />
              Requirement Met
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              <AlertTriangle className="w-3.5 h-3.5" />
              Gap: {comparison.gapPercentage}%
            </span>
          )}
        </div>
      </div>

      {/* Numerical Stats */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-medium mb-1.5">
        <span className="text-zinc-700 dark:text-zinc-300">
          Your Score: <strong className={isMet ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-amber-600 dark:text-amber-400 font-bold"}>{comparison.assessmentPercentage}%</strong>
        </span>
        <span className="text-zinc-500 dark:text-zinc-400 text-xs">
          Required: <strong className="text-zinc-800 dark:text-zinc-200">{comparison.requiredPercentage}%</strong>
        </span>
      </div>

      {/* Visual Progress Bar with Threshold Marker */}
      <div className="relative w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${
            isMet ? "bg-emerald-600 dark:bg-emerald-500" : "bg-amber-500"
          }`}
          style={{ width: `${Math.min(comparison.assessmentPercentage, 100)}%` }}
        />
        {/* Benchmark Marker Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-zinc-900 dark:bg-white z-10 opacity-70"
          style={{ left: `${comparison.requiredPercentage}%` }}
          title={`Required: ${comparison.requiredPercentage}%`}
        />
      </div>
    </div>
  );
};

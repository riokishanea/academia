import React from "react";
import { AIAnalysisResult } from "@/types/assessment";
import { Sparkles, CheckCircle2, ArrowRightCircle, Compass, Award } from "lucide-react";

interface AiGuidanceCardProps {
  analysis: AIAnalysisResult;
}

export const AiGuidanceCard: React.FC<AiGuidanceCardProps> = ({ analysis }) => {
  return (
    <div className="space-y-6">
      {/* 1. Holistic AI Summary */}
      <div className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-7 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-emerald-300 text-xs sm:text-sm font-semibold mb-2">
            <Sparkles className="w-4 h-4" />
            AI Clinical Readiness Evaluation
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-3 text-emerald-50">
            Executive Summary
          </h3>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            {analysis.summary}
          </p>

          {/* Priority Focus Tags */}
          {analysis.prioritySkills && analysis.prioritySkills.length > 0 && (
            <div className="mt-4 pt-4 border-t border-emerald-800 flex flex-wrap items-center gap-2">
              <span className="text-xs text-emerald-300 font-medium">Priority Focus Areas:</span>
              {analysis.prioritySkills.map((ps) => (
                <span
                  key={ps}
                  className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-800/80 text-emerald-200 border border-emerald-700/60"
                >
                  {ps}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Key Strengths & Recommended Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Strengths */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs">
          <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-4 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Demonstrated Strengths
          </h4>
          <ul className="space-y-2.5">
            {analysis.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Actions */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs">
          <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-4 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <ArrowRightCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Actionable Next Steps
          </h4>
          <ul className="space-y-2.5">
            {analysis.recommendedActions.map((act, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. Career Roadmap & Mentorship Guidance */}
      <div className="bg-linear-to-r from-teal-50 to-emerald-50 dark:from-zinc-900 dark:to-zinc-850 border border-teal-200/80 dark:border-zinc-800 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 text-xs font-semibold mb-2">
          <Compass className="w-4 h-4" />
          Senior Vaidya Career Mentorship
        </div>
        <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Long-Term Professional Pathway
        </h4>
        <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {analysis.careerGuidance}
        </p>
      </div>
    </div>
  );
};

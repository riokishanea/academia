import React from "react";
import { Lightbulb, Target } from "lucide-react";

interface SkillGapCardProps {
  skill: string;
  reason: string;
  recommendation: string;
  gapPercentage?: number;
}

export const SkillGapCard: React.FC<SkillGapCardProps> = ({
  skill,
  reason,
  recommendation,
  gapPercentage
}) => {
  return (
    <div className="bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-5 shadow-xs transition-all">
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-amber-100 dark:border-amber-900/40">
        <h4 className="text-sm sm:text-base font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
          <Target className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          {skill}
        </h4>
        {gapPercentage !== undefined && gapPercentage > 0 && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-100">
            {gapPercentage}% Gap
          </span>
        )}
      </div>

      <div className="space-y-3 text-xs sm:text-sm">
        {/* Why this gap occurred */}
        <div>
          <span className="font-semibold text-zinc-900 dark:text-zinc-200 block mb-0.5">
            Clinical Root Cause & Analysis:
          </span>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {reason}
          </p>
        </div>

        {/* Actionable remedy */}
        <div className="bg-white/80 dark:bg-zinc-900/80 rounded-lg p-3 border border-amber-200/60 dark:border-amber-800/40">
          <span className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-1">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Recommended Action & Clinical Bridging:
          </span>
          <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed">
            {recommendation}
          </p>
        </div>
      </div>
    </div>
  );
};

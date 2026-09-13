"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  AssessmentSubmissionResult, 
  ReadinessTier,
  JobOpportunity,
  StudentProfile 
} from "@/types/assessment";
import { SkillScoreCard } from "@/components/assessment/SkillScoreCard";
import { SkillGapCard } from "@/components/assessment/SkillGapCard";
import { AiGuidanceCard } from "@/components/assessment/AiGuidanceCard";
import { 
  AlertTriangle, 
  ArrowLeft, 
  RotateCcw, 
  Printer, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck,
  Briefcase,
  Building2,
  MapPin,
  CheckCircle2,
  Clock,
  Send,
  Check
} from "lucide-react";
import { DEFAULT_STUDENT, INITIAL_JOB_OPPORTUNITIES, ALL_CAREER_ROLES } from "@/lib/dummy-data";

function ResultContent() {
  const searchParams = useSearchParams();
  const assessmentId = searchParams.get("id");

  const [result, setResult] = useState<AssessmentSubmissionResult | null>(null);
  const [student, setStudent] = useState<StudentProfile>(DEFAULT_STUDENT);
  const [jobs, setJobs] = useState<JobOpportunity[]>(INITIAL_JOB_OPPORTUNITIES);
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [applySuccessMsg, setApplySuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(assessmentId));
  const [error, setError] = useState<string | null>(
    !assessmentId ? "No assessment ID provided. Please complete an assessment first." : null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("ayush_student_session");
      if (session) {
        try {
          const parsed = JSON.parse(session);
          if (parsed && parsed.id) {
            queueMicrotask(() => {
              setStudent(parsed);
            });
          }
        } catch {}
      }
      const savedApplied = localStorage.getItem("ayush_applied_job_ids");
      if (savedApplied) {
        try {
          const parsedIds = JSON.parse(savedApplied);
          queueMicrotask(() => {
            setAppliedJobIds(new Set(parsedIds));
          });
        } catch {}
      }
    }

    // Fetch live industry opportunities
    fetch("/api/industry/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (data.jobs && Array.isArray(data.jobs) && data.jobs.length > 0) {
          setJobs(data.jobs);
        }
      })
      .catch(() => {
        // use INITIAL_JOB_OPPORTUNITIES fallback
      });
  }, []);

  useEffect(() => {
    if (!assessmentId) return;

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

    fetch(`/api/assessment/result?assessmentId=${assessmentId}&studentId=${studentId}`)
      .then(async (res) => {
        if (isCancelled) return;
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Failed to fetch report (${res.status})`);
        }
        const data: AssessmentSubmissionResult = await res.json();
        if (!isCancelled) {
          setResult(data);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!isCancelled) {
          console.error("Error fetching assessment result:", err);
          const msg = err instanceof Error ? err.message : "Failed to load report.";
          setError(msg);
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [assessmentId]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
          Generating Clinical Readiness Report...
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          Evaluating competency benchmarks and AI skill-gap insights.
        </p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 max-w-md">
          <AlertTriangle className="w-10 h-10 text-rose-600 dark:text-rose-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-rose-900 dark:text-rose-200 mb-1">
            Unable to Load Report
          </h2>
          <p className="text-xs sm:text-sm text-rose-700 dark:text-rose-300 mb-4">
            {error || "Assessment report not found."}
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="py-2 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/dashboard/assessment"
              className="py-2 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Take Assessment
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getReadinessBadgeClass = (tier: ReadinessTier) => {
    switch (tier) {
      case "Highly Ready":
        return "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800";
      case "Ready with Minor Gaps":
        return "bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950 dark:text-teal-200 dark:border-teal-800";
      case "Developing":
        return "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800";
      case "Needs Significant Improvement":
        return "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800";
      default:
        return "bg-zinc-100 text-zinc-800 border-zinc-300";
    }
  };

  const gapComparisons = result.comparisons.filter((c) => c.status === "skill_gap");

  // Skill-based Opportunity Recommendations Matching Engine
  const calculateJobMatch = (job: JobOpportunity) => {
    if (!result || !job.required_skills || job.required_skills.length === 0) {
      return { matchPercentage: 70, matchedSkills: [], metSkillsCount: 0 };
    }

    let scoreSum = 0;
    let metCount = 0;
    const skillDetails: Array<{ name: string; score: number; isMet: boolean }> = [];

    job.required_skills.forEach((reqSkill) => {
      const normalizedReq = reqSkill.toLowerCase().trim();
      const comp = result.comparisons.find(
        (c) =>
          c.skill.toLowerCase().trim() === normalizedReq ||
          c.skill.toLowerCase().includes(normalizedReq) ||
          normalizedReq.includes(c.skill.toLowerCase())
      );

      if (comp) {
        scoreSum += comp.assessmentPercentage;
        const isMet = comp.status === "meets_requirement" || comp.assessmentPercentage >= comp.requiredPercentage;
        if (isMet) metCount++;
        skillDetails.push({
          name: reqSkill,
          score: comp.assessmentPercentage,
          isMet
        });
      } else {
        // Fallback: estimate from student's evaluated overall score
        const baselineScore = Math.max(55, Math.min(88, result.overallScore - 5));
        scoreSum += baselineScore;
        const isMet = baselineScore >= 70;
        if (isMet) metCount++;
        skillDetails.push({
          name: reqSkill,
          score: baselineScore,
          isMet
        });
      }
    });

    const avgScore = Math.round(scoreSum / job.required_skills.length);
    const matchedRole = ALL_CAREER_ROLES.find(
      (r) => r.title.toLowerCase() === (result.careerTitle || "").toLowerCase()
    );
    const sectorKeyword = (matchedRole?.sector || "").toLowerCase().split(" ")[0];
    const roleKeyword = (result.careerTitle || "").toLowerCase().split(" ")[0];
    const sectorMatch =
      (Boolean(sectorKeyword) && (job.title.toLowerCase().includes(sectorKeyword) || job.description.toLowerCase().includes(sectorKeyword))) ||
      (Boolean(roleKeyword) && (job.title.toLowerCase().includes(roleKeyword) || job.description.toLowerCase().includes(roleKeyword)));
    const sectorBonus = sectorMatch ? 6 : 0;

    const matchPercentage = Math.min(98, Math.max(48, avgScore + sectorBonus));

    return {
      matchPercentage,
      matchedSkills: skillDetails,
      metSkillsCount: metCount
    };
  };

  const recommendedJobs = jobs
    .filter((j) => j.status === "active")
    .map((job) => ({
      job,
      ...calculateJobMatch(job)
    }))
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  const handleApply = async (job: JobOpportunity) => {
    setApplyingJobId(job.id);
    try {
      const res = await fetch("/api/industry/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job.id,
          jobTitle: job.title,
          orgId: job.org_id,
          studentId: student.id,
          studentName: student.full_name,
          studentEmail: student.email,
          college: student.college,
          course: student.course,
          semester: student.semester,
          readinessScore: result.overallScore,
          readinessLevel: result.readinessLevel,
          skillsSummary: result.comparisons.map((c) => ({
            skill: c.skill,
            percentage: c.assessmentPercentage
          }))
        })
      });

      if (res.ok) {
        const nextSet = new Set(appliedJobIds);
        nextSet.add(job.id);
        setAppliedJobIds(nextSet);
        if (typeof window !== "undefined") {
          localStorage.setItem("ayush_applied_job_ids", JSON.stringify(Array.from(nextSet)));
        }
        setApplySuccessMsg(`Application successfully submitted to ${job.org_name} for "${job.title}"!`);
        setTimeout(() => setApplySuccessMsg(null), 6000);
      }
    } catch (e) {
      console.error("Apply error:", e);
    } finally {
      setApplyingJobId(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col print:bg-white print:text-black">
      {/* Top Bar (Hidden on Print) */}
      <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-20 print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-xs sm:text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="py-1.5 px-3 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-medium flex items-center gap-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Report</span>
            </button>
            <Link
              href="/dashboard/assessment"
              className="py-1.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Assessment</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Report Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* 1. Header Hero Card */}
        <div className="bg-linear-to-br from-emerald-900 via-teal-900 to-zinc-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                AYUSH Career Readiness Report
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {result.careerTitle}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/80">
                Submitted on {new Date(result.submittedAt).toLocaleDateString(undefined, { dateStyle: "long" })}
              </p>
            </div>

            {/* Score Pill / Badge */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 shrink-0">
              <div className="text-center">
                <span className="text-[11px] uppercase tracking-wider text-emerald-200 font-semibold block">
                  Weighted Score
                </span>
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {result.overallScore}%
                </span>
                <span className="text-[10px] text-emerald-200/80 block mt-0.5">
                  Threshold: {result.thresholdScore}%
                </span>
              </div>

              <div className="h-10 w-px bg-white/20" />

              <div>
                <span className="text-[11px] uppercase tracking-wider text-emerald-200 font-semibold block mb-1">
                  Readiness Status
                </span>
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${getReadinessBadgeClass(result.readinessLevel)}`}>
                  {result.readinessLevel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Skill Scores vs Career Benchmarks */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Skill Performance vs Industry Benchmarks
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Deterministic evaluation of your scores compared to career requirement thresholds.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.comparisons.map((comp) => (
              <SkillScoreCard key={comp.skill} comparison={comp} />
            ))}
          </div>
        </section>

        {/* 3. Skill-Gap Deep Dive */}
        {gapComparisons.length > 0 && (
          <section className="space-y-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Identified Skill Gaps & Targeted Bridging
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Specific clinical domains requiring further reinforcement before starting clinical duties.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.aiAnalysis?.skillGaps && result.aiAnalysis.skillGaps.length > 0 ? (
                result.aiAnalysis.skillGaps.map((sg, idx) => {
                  const compMatch = gapComparisons.find((c) => c.skill.toLowerCase() === sg.skill.toLowerCase());
                  return (
                    <SkillGapCard
                      key={idx}
                      skill={sg.skill}
                      reason={sg.reason}
                      recommendation={sg.recommendation}
                      gapPercentage={compMatch?.gapPercentage}
                    />
                  );
                })
              ) : (
                gapComparisons.map((gc) => (
                  <SkillGapCard
                    key={gc.skill}
                    skill={gc.skill}
                    reason={`Assessment percentage of ${gc.assessmentPercentage}% is below the required ${gc.requiredPercentage}%.`}
                    recommendation="Revisit clinical case records and consult senior faculty."
                    gapPercentage={gc.gapPercentage}
                  />
                ))
              )}
            </div>
          </section>
        )}

        {/* 4. AI Holistic Mentorship & Guidance */}
        {result.aiAnalysis && (
          <section className="space-y-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                AI Career Guidance & Mentorship
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Contextual feedback synthesized from your clinical scores and curriculum standards.
              </p>
            </div>

            <AiGuidanceCard analysis={result.aiAnalysis} />
          </section>
        )}

        {/* 5. Recommended Industry Opportunities Based On Assessed Skills */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  Recommended Industry Opportunities Matching Your Skill Set
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Curated opportunities aligned with your verified competencies in <strong className="text-zinc-800 dark:text-zinc-200">{result.careerTitle}</strong>.
              </p>
            </div>
            <div className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0 self-start sm:self-auto">
              {recommendedJobs.length} Matched Roles Available
            </div>
          </div>

          {applySuccessMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{applySuccessMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedJobs.map(({ job, matchPercentage, matchedSkills, metSkillsCount }) => {
              const hasApplied = appliedJobIds.has(job.id);
              const isApplying = applyingJobId === job.id;

              return (
                <div
                  key={job.id}
                  className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="space-y-3">
                    {/* Card Top: Org & Match Score */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                        <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{job.org_name}</span>
                      </div>

                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                          matchPercentage >= 80
                            ? "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800"
                            : matchPercentage >= 70
                            ? "bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950 dark:text-teal-200 dark:border-teal-800"
                            : "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800"
                        }`}
                      >
                        <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>{matchPercentage}% Skill Match</span>
                      </span>
                    </div>

                    {/* Title & Type */}
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                        <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                          {job.role_type}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-zinc-400" />
                          {job.location} ({job.location_type})
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                          <Clock className="w-3 h-3" />
                          {job.stipend_or_salary} • {job.duration}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Required Skills Fit Breakdown */}
                    <div className="pt-1 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                        <span>Required Skill Alignment:</span>
                        <span className="text-emerald-700 dark:text-emerald-400">
                          {metSkillsCount}/{job.required_skills.length} Competencies Met
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {matchedSkills.map((sk) => (
                          <span
                            key={sk.name}
                            className={`text-[11px] px-2 py-0.5 rounded-lg border flex items-center gap-1 ${
                              sk.isMet
                                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                                : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
                            }`}
                          >
                            {sk.isMet ? (
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
                            )}
                            <span>{sk.name}</span>
                            <span className="text-[10px] font-bold opacity-80">({sk.score}%)</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Apply / Express Interest Action */}
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Certified AYUSH Profile Attached
                    </span>

                    {hasApplied ? (
                      <button
                        disabled
                        className="py-2 px-3.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold flex items-center gap-1.5 cursor-default"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Application Submitted</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApply(job)}
                        disabled={isApplying}
                        className="py-2 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
                      >
                        {isApplying ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Express Interest / Apply</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. Bottom Navigation & Export */}
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <Link
            href="/dashboard"
            className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          >
            ← Return to Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="py-2.5 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              Print / Save PDF
            </button>
            <Link
              href="/dashboard/assessment"
              className="py-2.5 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Assessment
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AssessmentResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}

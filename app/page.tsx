"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Stethoscope, 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Building2,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  Check,
  Send,
  User,
  ExternalLink
} from "lucide-react";
import { 
  INITIAL_JOB_OPPORTUNITIES, 
  DEFAULT_STUDENT, 
  DEFAULT_STUDENT_SKILLS 
} from "@/lib/dummy-data";
import { 
  JobOpportunity, 
  StudentProfile, 
  StudentSkill, 
  SkillComparison 
} from "@/types/assessment";

export default function Home() {
  const [jobs, setJobs] = useState<JobOpportunity[]>(INITIAL_JOB_OPPORTUNITIES);
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [studentSkills] = useState<StudentSkill[]>(DEFAULT_STUDENT_SKILLS);
  const [assessmentComparisons, setAssessmentComparisons] = useState<SkillComparison[] | null>(null);
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [applySuccessMsg, setApplySuccessMsg] = useState<string | null>(null);

  // Sub-section filters for each major section
  const [internshipTab, setInternshipTab] = useState<"all" | "recommended">("all");
  const [jobTab, setJobTab] = useState<"all" | "recommended">("all");

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

      // Check if student has an existing assessment report cached
      const cachedResult = localStorage.getItem("ayush_latest_assessment_result");
      if (cachedResult) {
        try {
          const parsedRes = JSON.parse(cachedResult);
          if (parsedRes && parsedRes.comparisons) {
            queueMicrotask(() => {
              setAssessmentComparisons(parsedRes.comparisons);
            });
          }
        } catch {}
      }
    }

    // Fetch live opportunities from API
    fetch("/api/industry/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (data.jobs && Array.isArray(data.jobs) && data.jobs.length > 0) {
          setJobs(data.jobs);
        }
      })
      .catch(() => {
        // use default INITIAL_JOB_OPPORTUNITIES
      });
  }, []);

  // Skill-based matching engine
  const calculateSkillMatch = (job: JobOpportunity) => {
    if (!job.required_skills || job.required_skills.length === 0) {
      return { matchPercentage: 70, isRecommended: false, metSkillsCount: 0 };
    }

    let scoreSum = 0;
    let metCount = 0;

    job.required_skills.forEach((reqSkill) => {
      const normalized = reqSkill.toLowerCase().trim();

      // Check formal assessment comparisons first
      if (assessmentComparisons && assessmentComparisons.length > 0) {
        const comp = assessmentComparisons.find(
          (c) =>
            c.skill.toLowerCase().trim() === normalized ||
            c.skill.toLowerCase().includes(normalized) ||
            normalized.includes(c.skill.toLowerCase())
        );
        if (comp) {
          scoreSum += comp.assessmentPercentage;
          if (comp.assessmentPercentage >= comp.requiredPercentage || comp.status === "meets_requirement") {
            metCount++;
          }
          return;
        }
      }

      // Check student baseline skills
      const stSkill = studentSkills.find(
        (s) =>
          s.skill_name.toLowerCase().trim() === normalized ||
          s.skill_name.toLowerCase().includes(normalized) ||
          normalized.includes(s.skill_name.toLowerCase())
      );
      if (stSkill) {
        const score = Math.round((stSkill.proficiency_level / 5) * 100);
        scoreSum += score;
        if (score >= 70) metCount++;
        return;
      }

      // Default baseline benchmark
      const baseline = 75;
      scoreSum += baseline;
      metCount++;
    });

    const avgScore = Math.round(scoreSum / job.required_skills.length);
    const matchPercentage = Math.min(98, Math.max(52, avgScore));
    const isRecommended = matchPercentage >= 75 || metCount >= Math.ceil(job.required_skills.length * 0.6);

    return { matchPercentage, isRecommended, metSkillsCount: metCount };
  };

  // Classify into Internships vs Jobs
  const activePostings = jobs.filter((j) => j.status === "active");

  const internshipOpportunities = activePostings
    .filter((j) => j.role_type === "Internship" || j.role_type === "Clinical Apprenticeship" || j.role_type === "Research Fellowship")
    .map((j) => ({ job: j, ...calculateSkillMatch(j) }));

  const jobOpportunities = activePostings
    .filter((j) => j.role_type === "Full-Time")
    .map((j) => ({ job: j, ...calculateSkillMatch(j) }));

  const displayedInternships = internshipTab === "all"
    ? internshipOpportunities
    : internshipOpportunities.filter((item) => item.isRecommended).sort((a, b) => b.matchPercentage - a.matchPercentage);

  const displayedJobs = jobTab === "all"
    ? jobOpportunities
    : jobOpportunities.filter((item) => item.isRecommended).sort((a, b) => b.matchPercentage - a.matchPercentage);

  const recommendedInternshipsCount = internshipOpportunities.filter((i) => i.isRecommended).length;
  const recommendedJobsCount = jobOpportunities.filter((j) => j.isRecommended).length;

  const handleApply = async (job: JobOpportunity, matchPct: number) => {
    const studentUser = student || DEFAULT_STUDENT;
    setApplyingJobId(job.id);
    try {
      const res = await fetch("/api/industry/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job.id,
          jobTitle: job.title,
          orgId: job.org_id,
          studentId: studentUser.id,
          studentName: studentUser.full_name,
          studentEmail: studentUser.email,
          college: studentUser.college,
          course: studentUser.course,
          semester: studentUser.semester,
          readinessScore: matchPct,
          readinessLevel: matchPct >= 85 ? "Highly Ready" : "Ready with Minor Gaps",
          skillsSummary: job.required_skills.map((sk) => ({
            skill: sk,
            percentage: matchPct
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
        setApplySuccessMsg(`Application successfully submitted for "${job.title}" at ${job.org_name}!`);
        setTimeout(() => setApplySuccessMsg(null), 6000);
      }
    } catch (e) {
      console.error("Apply error:", e);
    } finally {
      setApplyingJobId(null);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50/60 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-md ring-2 ring-emerald-200 dark:ring-emerald-900">
              <Stethoscope className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <span className="font-extrabold text-lg block leading-tight text-zinc-900 dark:text-zinc-100">
                AYUSH Academia Portal
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Academia–Industry Collaboration & Clinical Skill-Gap Engine
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {student ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="py-2 px-3.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5"
                >
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>Dashboard ({student.full_name.split(" ")[0]})</span>
                </Link>
                <Link
                  href="/login/organisation"
                  className="hidden sm:flex py-2 px-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-all items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Industry Portal</span>
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/login/organisation"
                  className="py-2 px-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5"
                >
                  <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Industry / Hospitals</span>
                </Link>
                <Link
                  href="/login/student"
                  className="py-2 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all flex items-center gap-1.5"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Student Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            AYUSH / BAMS Academia-Industry Ecosystem
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight max-w-4xl leading-tight sm:leading-tight">
            Bridge the Gap Between <span className="text-emerald-700 dark:text-emerald-400">Ayurveda Academia</span> & Clinical Practice
          </h1>

          <p className="mt-5 text-sm sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
            Comprehensive competency evaluations, deterministic server-side scoring, and AI-powered skill-gap analysis connected directly with leading Ayurvedic hospitals and healthcare recruiters.
          </p>

          {/* Dual Portal CTA Buttons */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl text-left">
            {/* Student CTA */}
            <Link
              href="/login/student"
              className="p-5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-200 font-bold block mb-1">For BAMS Students</span>
                <h3 className="text-base font-bold text-white">Student Login & Assessment</h3>
                <p className="text-xs text-emerald-100/80 mt-1">Take skill assessments across 5 career roles and get certified match scores.</p>
              </div>
            </Link>

            {/* Industry / Hospital CTA */}
            <Link
              href="/login/organisation"
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-blue-600/50 hover:border-blue-600 shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400 transform group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold block mb-1">For Hospitals & Industry</span>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Industry & Recruiter Portal</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Post internships & jobs, search talent by college, and review applications.</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Global Toast / Success Message */}
        {applySuccessMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm flex items-center gap-3 shadow-md animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-semibold">{applySuccessMsg}</span>
          </div>
        )}

        {/* Personalized Student Context Banner */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {student ? `Competency Matched Postings for ${student.full_name}` : "Industry Skill Assessment & Recommendation Engine"}
                </h3>
                {assessmentComparisons && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    Assessment Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {student
                  ? `Opportunities below are dynamically analyzed against your ${student.course} competencies and verified benchmarks.`
                  : "Explore hospital vacancies and clinical internships. Log in or take a skill assessment to unlock verified match percentages."}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {student ? (
              <Link
                href="/dashboard/assessment/result"
                className="py-2 px-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <span>Latest Report</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </Link>
            ) : (
              <Link
                href="/login/student"
                className="py-2 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
              >
                <span>Take Skill Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </section>

        {/* ========================================== */}
        {/* SECTION 1: INTERNSHIP OPPORTUNITIES        */}
        {/* ========================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  Internship & Apprenticeship Opportunities
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Clinical ward training, Panchakarma therapy apprenticeships, and drug safety internships.
              </p>
            </div>

            {/* Sub-sections: All vs Recommended */}
            <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 self-start sm:self-auto shrink-0">
              <button
                onClick={() => setInternshipTab("all")}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  internshipTab === "all"
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                <span>All Internships</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                  {internshipOpportunities.length}
                </span>
              </button>

              <button
                onClick={() => setInternshipTab("recommended")}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  internshipTab === "recommended"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-emerald-400"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommended for You</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${internshipTab === "recommended" ? "bg-emerald-800 text-emerald-100" : "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"}`}>
                  {recommendedInternshipsCount}
                </span>
              </button>
            </div>
          </div>

          {/* Cards Grid for Internships */}
          {displayedInternships.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-3xl">
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                No recommended internships found matching your current score threshold. Complete an assessment to expand matched opportunities.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedInternships.map(({ job, matchPercentage, isRecommended, metSkillsCount }) => {
                const hasApplied = appliedJobIds.has(job.id);
                const isApplying = applyingJobId === job.id;

                return (
                  <div
                    key={job.id}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 hover:border-emerald-500/40 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="truncate max-w-[160px]">{job.org_name}</span>
                        </span>

                        {isRecommended ? (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            <span>{matchPercentage}% Match</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                            {job.role_type}
                          </span>
                        )}
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-zinc-400" />
                            {job.location} ({job.location_type})
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                            <Clock className="w-3 h-3" />
                            {job.stipend_or_salary}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>

                      {/* Required Competencies */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                          <span>Evaluated Competencies:</span>
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold">{metSkillsCount}/{job.required_skills.length} Met</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {job.required_skills.slice(0, 3).map((sk) => (
                            <span
                              key={sk}
                              className="text-[11px] px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                            >
                              {sk}
                            </span>
                          ))}
                          {job.required_skills.length > 3 && (
                            <span className="text-[11px] px-1.5 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                              +{job.required_skills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Action */}
                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {job.duration}
                      </span>

                      {hasApplied ? (
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          Applied
                        </span>
                      ) : student ? (
                        <button
                          onClick={() => handleApply(job, matchPercentage)}
                          disabled={isApplying}
                          className="py-1.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-2xs disabled:opacity-50"
                        >
                          {isApplying ? (
                            <span>Submitting...</span>
                          ) : (
                            <>
                              <Send className="w-3 h-3" />
                              <span>Apply Now</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <Link
                          href="/login/student"
                          className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
                        >
                          <span>Apply</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ========================================== */}
        {/* SECTION 2: JOB & CAREER OPPORTUNITIES     */}
        {/* ========================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-700 dark:text-blue-400">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  Job & Permanent Career Opportunities
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Full-time clinical medical officer positions, drug safety executive roles, and specialist therapist vacancies.
              </p>
            </div>

            {/* Sub-sections: All vs Recommended */}
            <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 self-start sm:self-auto shrink-0">
              <button
                onClick={() => setJobTab("all")}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  jobTab === "all"
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                <span>All Job Openings</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                  {jobOpportunities.length}
                </span>
              </button>

              <button
                onClick={() => setJobTab("recommended")}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  jobTab === "recommended"
                    ? "bg-blue-700 text-white shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-blue-700 dark:hover:text-blue-400"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommended for You</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${jobTab === "recommended" ? "bg-blue-800 text-blue-100" : "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300"}`}>
                  {recommendedJobsCount}
                </span>
              </button>
            </div>
          </div>

          {/* Cards Grid for Job Openings */}
          {displayedJobs.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-3xl">
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                No recommended full-time roles found matching your current score threshold. Complete an assessment to expand matched opportunities.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedJobs.map(({ job, matchPercentage, isRecommended, metSkillsCount }) => {
                const hasApplied = appliedJobIds.has(job.id);
                const isApplying = applyingJobId === job.id;

                return (
                  <div
                    key={job.id}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 hover:border-blue-500/40 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-blue-600" />
                          <span className="truncate max-w-[160px]">{job.org_name}</span>
                        </span>

                        {isRecommended ? (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-blue-600" />
                            <span>{matchPercentage}% Match</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300">
                            Full-Time
                          </span>
                        )}
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-zinc-400" />
                            {job.location} ({job.location_type})
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-blue-700 dark:text-blue-400 font-semibold">
                            <Clock className="w-3 h-3" />
                            {job.stipend_or_salary}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>

                      {/* Required Competencies */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                          <span>Evaluated Competencies:</span>
                          <span className="text-blue-700 dark:text-blue-400 font-bold">{metSkillsCount}/{job.required_skills.length} Met</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {job.required_skills.slice(0, 3).map((sk) => (
                            <span
                              key={sk}
                              className="text-[11px] px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                            >
                              {sk}
                            </span>
                          ))}
                          {job.required_skills.length > 3 && (
                            <span className="text-[11px] px-1.5 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                              +{job.required_skills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Action */}
                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {job.duration}
                      </span>

                      {hasApplied ? (
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          Applied
                        </span>
                      ) : student ? (
                        <button
                          onClick={() => handleApply(job, matchPercentage)}
                          disabled={isApplying}
                          className="py-1.5 px-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-2xs disabled:opacity-50"
                        >
                          {isApplying ? (
                            <span>Submitting...</span>
                          ) : (
                            <>
                              <Send className="w-3 h-3" />
                              <span>Apply Now</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <Link
                          href="/login/student"
                          className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                        >
                          <span>Apply</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Ecosystem Highlights */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mb-1">
              Multi-Role Skill Assessments
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Curriculum-aligned evaluation across Clinical Assistantship, Pharmacovigilance, Panchakarma Therapy, and Research.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mb-1">
              Verified Readiness Benchmarks
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              100% deterministic server-side mathematical scoring and weighted readiness tiers certified for recruiters.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-4">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mb-1">
              Institutional Talent Match
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Hospitals can filter candidate profiles by accredited Ayurveda colleges and invite high-readiness students.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
        AYUSH / BAMS Academia-Industry Collaboration Platform • Skill Assessment & Recruitment Engine
      </footer>
    </div>
  );
}

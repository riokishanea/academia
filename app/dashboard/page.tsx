"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Stethoscope, 
  BookOpen, 
  GraduationCap, 
  Award, 
  ArrowRight, 
  Sparkles,
  BarChart3,
  User,
  LogOut,
  Briefcase,
  Layers,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { 
  DEFAULT_STUDENT, 
  DEFAULT_STUDENT_SKILLS, 
  ALL_CAREER_ROLES, 
  DEFAULT_CAREER_ROLE, 
  DEFAULT_CAREER_SKILLS, 
  ROLE_SKILLS_MAP 
} from "@/lib/dummy-data";
import { StudentProfile } from "@/types/assessment";

const INDUSTRY_CATEGORIES = [
  { 
    name: "Clinical Practice", 
    icon: <Stethoscope className="w-4 h-4 text-blue-600 dark:text-blue-400" />, 
    desc: "Hospital OPD/IPD diagnostics & clinical care" 
  },
  { 
    name: "Pharmacovigilance & Safety", 
    icon: <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />, 
    desc: "Adverse event monitoring & herbal pharmacovigilance" 
  },
  { 
    name: "Panchakarma & Therapeutics", 
    icon: <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />, 
    desc: "Shodhana detox, Snehana & therapeutic procedures" 
  },
  { 
    name: "Research & Academia", 
    icon: <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />, 
    desc: "Clinical trials, biostatistics & GCP documentation" 
  },
  { 
    name: "Preventive Wellness", 
    icon: <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />, 
    desc: "Prakriti assessment & lifestyle consultation" 
  }
] as const;

const ROLE_CATEGORY_META: Record<string, { category: string; icon: React.ReactNode; badgeClass: string; estTime: string }> = {
  "ayurveda-clinical-assistant": {
    category: "Clinical Practice",
    icon: <Stethoscope className="w-3.5 h-3.5" />,
    badgeClass: "bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    estTime: "20 Questions • ~15 mins"
  },
  "ayurvedic-pharmacovigilance-associate": {
    category: "Pharmacovigilance & Safety",
    icon: <ShieldCheck className="w-3.5 h-3.5" />,
    badgeClass: "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    estTime: "10 Questions • ~10 mins"
  },
  "panchakarma-clinical-therapist": {
    category: "Panchakarma & Therapeutics",
    icon: <Sparkles className="w-3.5 h-3.5" />,
    badgeClass: "bg-purple-50 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    estTime: "10 Questions • ~10 mins"
  },
  "ayurvedic-clinical-research-assistant": {
    category: "Research & Academia",
    icon: <BookOpen className="w-3.5 h-3.5" />,
    badgeClass: "bg-indigo-50 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    estTime: "10 Questions • ~10 mins"
  },
  "ayush-wellness-lifestyle-consultant": {
    category: "Preventive Wellness",
    icon: <Award className="w-3.5 h-3.5" />,
    badgeClass: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    estTime: "10 Questions • ~10 mins"
  }
};

export default function StudentDashboardPage() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentProfile>(DEFAULT_STUDENT);
  const [selectedRoleSlug, setSelectedRoleSlug] = useState<string>("ayurveda-clinical-assistant");

  useEffect(() => {
    try {
      const session = typeof window !== "undefined" ? localStorage.getItem("ayush_student_session") : null;
      if (session) {
        const parsed = JSON.parse(session);
        if (parsed && parsed.id) {
          queueMicrotask(() => {
            setStudent(parsed);
          });
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ayush_student_session");
    }
    router.push("/login/student");
  };

  const currentRole = ALL_CAREER_ROLES.find((r) => r.slug === selectedRoleSlug) || DEFAULT_CAREER_ROLE;
  const currentSkills = ROLE_SKILLS_MAP[selectedRoleSlug] || DEFAULT_CAREER_SKILLS;
  const currentMeta = ROLE_CATEGORY_META[selectedRoleSlug] || ROLE_CATEGORY_META["ayurveda-clinical-assistant"];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
              <Stethoscope className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg block leading-tight text-zinc-900 dark:text-zinc-100">
                AYUSH Portal
              </span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Academia–Industry Collaboration
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs bg-zinc-100 dark:bg-zinc-800 py-1.5 px-3 rounded-full text-zinc-700 dark:text-zinc-300">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>{student.full_name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Student Welcome Banner */}
        <div className="bg-linear-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-700/70 border border-emerald-500/40 text-emerald-200 mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              {student.course || "BAMS"} • Semester {student.semester || 6}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {student.full_name}!
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {student.college || "National Institute of Ayurveda, Jaipur"} • Connect your academic competencies with real-world Ayurvedic industry & clinical career benchmarks.
            </p>
          </div>
        </div>

        {/* Career Role Selection & Category Listing Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                  <Award className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  Industry Career Readiness Roles
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Explore standardized AYUSH industry pathways, review core competencies, and take the skill assessment to generate your certified readiness report.
              </p>
            </div>

            {/* Quick Select Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <label htmlFor="role-select" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 shrink-0 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                Role:
              </label>
              <select
                id="role-select"
                value={selectedRoleSlug}
                onChange={(e) => setSelectedRoleSlug(e.target.value)}
                className="text-xs sm:text-sm font-medium py-2 px-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-xs cursor-pointer"
              >
                {ALL_CAREER_ROLES.map((role) => (
                  <option key={role.id} value={role.slug}>
                    {role.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Industry Categories Listing (No Filtering / No Counts) */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Standardized AYUSH Industry Sectors & Categories:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {INDUSTRY_CATEGORIES.map((cat) => (
                <div
                  key={cat.name}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 flex flex-col justify-between shadow-2xs hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0">
                      {cat.icon}
                    </div>
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                      {cat.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                    {cat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Career Role Cards Catalog */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_CAREER_ROLES.map((role) => {
              const isSelected = role.slug === selectedRoleSlug;
              const meta = ROLE_CATEGORY_META[role.slug] || ROLE_CATEGORY_META["ayurveda-clinical-assistant"];
              const skills = ROLE_SKILLS_MAP[role.slug] || DEFAULT_CAREER_SKILLS;

              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRoleSlug(role.slug)}
                  className={`bg-white dark:bg-zinc-900 rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between space-y-4 hover:shadow-md ${
                    isSelected
                      ? "border-2 border-emerald-600 dark:border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${meta.badgeClass}`}>
                        {meta.icon}
                        <span>{meta.category}</span>
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                        Target: {role.required_score}%
                      </span>
                    </div>

                    {/* Role Title & Description */}
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                        {role.title}
                      </h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                        {role.description}
                      </p>
                    </div>

                    {/* Benchmark Skills Preview */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 block">
                        Core Competencies:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.slice(0, 3).map((sk) => (
                          <span
                            key={sk.id}
                            className="text-[11px] px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                          >
                            {sk.skill_name}
                          </span>
                        ))}
                        {skills.length > 3 && (
                          <span className="text-[11px] px-1.5 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                            +{skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {meta.estTime}
                    </span>
                    <div className="flex items-center gap-1">
                      {isSelected ? (
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Selected
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 flex items-center gap-0.5">
                          Select
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Role Detailed Blueprint & Assessment Launcher */}
          <div className="bg-white dark:bg-zinc-900 border-2 border-emerald-600/70 dark:border-emerald-500/70 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="space-y-4 flex-1">
                {/* Header Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${currentMeta.badgeClass}`}>
                    {currentMeta.icon}
                    <span>Category: {currentMeta.category}</span>
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                    Target Readiness: {currentRole.required_score}%
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                    {currentMeta.estTime}
                  </span>
                </div>

                {/* Role Title & Description */}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      Active Assessment Selection
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                      Category: {currentMeta.category}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-1">
                    {currentRole.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed max-w-3xl">
                    {currentRole.description}
                  </p>
                </div>

                {/* Required Skills Grid */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Evaluated Skill Areas & Readiness Benchmarks:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {currentSkills.map((cs) => (
                      <div
                        key={cs.id}
                        className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800 text-xs"
                      >
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100 block mb-0.5">
                          {cs.skill_name}
                        </span>
                        <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-[11px]">
                          <span>Weight: {cs.weight}%</span>
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold">Req: {cs.required_percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Side Box */}
              <div className="lg:w-72 shrink-0 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/40 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                    <Sparkles className="w-4 h-4" />
                    Adaptive Skill Assessment
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Test clinical knowledge, reasoning, and ethics. Generate a certified AYUSH industry readiness badge for recruiters.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <Link
                    href={`/dashboard/assessment?role=${encodeURIComponent(selectedRoleSlug)}`}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <span>Start Skill Assessment</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/dashboard/assessment/result"
                    className="w-full py-2 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>View Latest Report</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Student Baseline Profile Skills */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Your Self-Reported Academic Skills Baseline
            </h3>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Proficiency Scale: 1 (Novice) to 5 (Expert)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {DEFAULT_STUDENT_SKILLS.map((sk) => (
              <div
                key={sk.id}
                className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-850/50 flex flex-col justify-between"
              >
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
                  {sk.skill_name}
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className={`w-2 h-2 rounded-full ${
                          star <= sk.proficiency_level
                            ? "bg-emerald-600"
                            : "bg-zinc-300 dark:bg-zinc-700"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    Level {sk.proficiency_level}/5
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}


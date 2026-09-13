"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowRight, UserCheck, Stethoscope } from "lucide-react";
import { DEFAULT_STUDENT } from "@/lib/dummy-data";

export default function StudentLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(DEFAULT_STUDENT.email);
  const [fullName, setFullName] = useState(DEFAULT_STUDENT.full_name);
  const [college, setCollege] = useState(DEFAULT_STUDENT.college || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const studentProfile = {
      id: DEFAULT_STUDENT.id,
      full_name: fullName || DEFAULT_STUDENT.full_name,
      email: email || DEFAULT_STUDENT.email,
      college: college || DEFAULT_STUDENT.college,
      course: "BAMS",
      semester: 6
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("ayush_student_session", JSON.stringify(studentProfile));
    }

    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("ayush_student_session", JSON.stringify(DEFAULT_STUDENT));
    }
    setTimeout(() => {
      router.push("/dashboard");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-zinc-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        {/* AYUSH Emblem / Logo */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-md mb-4 ring-4 ring-emerald-100 dark:ring-emerald-950">
          <Stethoscope className="w-8 h-8 text-emerald-200" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          AYUSH Student Portal
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          Academia–Industry Collaboration & Skill Assessment for BAMS
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-zinc-900 py-8 px-6 sm:px-10 shadow-lg rounded-2xl border border-zinc-200 dark:border-zinc-800">
          {/* Quick Demo Login Option */}
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Hackathon 1-Click Demo Login
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 dark:bg-emerald-800 dark:text-emerald-100">
                Default Student
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 mb-3">
              Login immediately as <strong className="text-zinc-900 dark:text-zinc-100">Aarav Sharma</strong> (BAMS 3rd Year / Sem 6, National Institute of Ayurveda).
            </p>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              Quick 1-Click Student Login
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-zinc-900 px-3 text-zinc-400 font-medium">
                Or Sign In With Custom Details
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Student Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Institutional Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Ayurveda College / Institute
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Continue to Student Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center">
            <Link
              href="/"
              className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              ← Back to Portal Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

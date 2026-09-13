"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Sparkles, ArrowRight } from "lucide-react";
import { organizations } from "@/lib/dummy-data";

export default function OrganisationLoginPage() {
  const router = useRouter();
  const [selectedOrgIndex] = useState(0);
  const [email, setEmail] = useState(organizations[0].email);
  const [password, setPassword] = useState(organizations[0].password);
  const [orgName, setOrgName] = useState(organizations[0].name);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const orgSession = {
      id: organizations[selectedOrgIndex]?.id || "ORG001",
      name: orgName || organizations[selectedOrgIndex]?.name || "AyurCare Wellness Hospitals",
      email: email,
      type: organizations[selectedOrgIndex]?.type || "Ayurvedic Hospital Network",
      location: organizations[selectedOrgIndex]?.location || "Bengaluru, Karnataka"
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("ayush_org_session", JSON.stringify(orgSession));
    }

    setTimeout(() => {
      router.push("/dashboard/organisation");
    }, 400);
  };

  const handleQuickLogin = (idx: number) => {
    setIsLoading(true);
    const org = organizations[idx];
    const orgSession = {
      id: org.id,
      name: org.name,
      email: org.email,
      type: org.type,
      location: org.location
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("ayush_org_session", JSON.stringify(orgSession));
    }

    setTimeout(() => {
      router.push("/dashboard/organisation");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-zinc-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        {/* Emblem / Logo */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-700 text-white flex items-center justify-center shadow-md mb-4 ring-4 ring-blue-100 dark:ring-blue-950">
          <Building2 className="w-8 h-8 text-blue-200" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          AYUSH Industry & Hospital Portal
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          Recruitment, Internship Management & Institutional Talent Search
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4 sm:px-0">
        <div className="bg-white dark:bg-zinc-900 py-8 px-6 sm:px-10 shadow-lg rounded-2xl border border-zinc-200 dark:border-zinc-800">
          {/* Quick Demo Login Choices */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                1-Click Demo Recruiter Login
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100">
                Choose Organization
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {organizations.map((org, idx) => {
                const isSelected = selectedOrgIndex === idx;
                return (
                  <button
                    key={org.id}
                    type="button"
                    onClick={() => handleQuickLogin(idx)}
                    disabled={isLoading}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/70 dark:bg-blue-950/50 ring-1 ring-blue-500"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-blue-300 bg-zinc-50/50 dark:bg-zinc-800/40"
                    }`}
                  >
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block truncate">
                      {org.name}
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block truncate mt-0.5">
                      {org.location}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 dark:text-blue-300">
                      Login as this org →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-zinc-900 px-3 text-zinc-400 font-medium">
                Or Sign In With Custom Recruiter Account
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Organization / Hospital Name
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Recruiter Work Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>{isLoading ? "Signing in..." : "Access Industry Dashboard"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
            <Link
              href="/login/student"
              className="text-emerald-700 hover:text-emerald-800 font-semibold"
            >
              ← Switch to Student Login
            </Link>
            <Link
              href="/"
              className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              Portal Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

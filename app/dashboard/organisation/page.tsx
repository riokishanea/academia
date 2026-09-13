"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  Briefcase, 
  GraduationCap, 
  Users, 
  PlusCircle, 
  Search, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  DollarSign, 
  Send, 
  LogOut, 
  Sparkles, 
  ShieldCheck, 
  BookOpen
} from "lucide-react";
import { organizations, ACCREDITED_INSTITUTIONS } from "@/lib/dummy-data";
import { JobOpportunity, JobApplication, InstitutionStudentProfile, ApplicationStatus, ReadinessTier } from "@/types/assessment";

const AVAILABLE_SKILLS = [
  "Ayurvedic Fundamentals",
  "Clinical Reasoning",
  "Patient Communication",
  "Clinical Documentation",
  "Professional Ethics",
  "Panchakarma Procedure Monitoring",
  "Snehana & Svedana Protocols",
  "Pharmacovigilance Protocols",
  "Dravyaguna & Herb Identification",
  "Clinical Trial Documentation",
  "Prakriti Assessment"
];

export default function OrganisationDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"jobs" | "students" | "applications">("jobs");
  const [org, setOrg] = useState(organizations[0]);
  
  // State for Job Opportunities
  const [jobs, setJobs] = useState<JobOpportunity[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newRoleType, setNewRoleType] = useState<JobOpportunity["role_type"]>("Internship");
  const [newLocation, setNewLocation] = useState("Bengaluru, Karnataka");
  const [newLocationType, setNewLocationType] = useState<JobOpportunity["location_type"]>("Onsite");
  const [newStipend, setNewStipend] = useState("₹20,000 / month");
  const [newDuration, setNewDuration] = useState("6 Months");
  const [newDescription, setNewDescription] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["Ayurvedic Fundamentals", "Clinical Reasoning"]);
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);

  // State for Talent Directory
  const [studentsList, setStudentsList] = useState<InstitutionStudentProfile[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState<string>("All Institutions");
  const [skillSearchQuery, setSkillSearchQuery] = useState("");
  const [isLoadingStudents, setIsLoadingStudents] = useState(true);
  const [invitedStudents, setInvitedStudents] = useState<Set<string>>(new Set());

  // State for Applications
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoadingApps, setIsLoadingApps] = useState(true);

  // Load Org Session
  useEffect(() => {
    try {
      const session = typeof window !== "undefined" ? localStorage.getItem("ayush_org_session") : null;
      if (session) {
        const parsed = JSON.parse(session);
        if (parsed && parsed.id) {
          queueMicrotask(() => {
            setOrg(parsed);
          });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Fetch Jobs, Students & Applications on parameter change
  useEffect(() => {
    let ignore = false;

    fetch(`/api/industry/jobs?orgId=${org.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (!ignore && data.jobs) setJobs(data.jobs);
      })
      .catch((err) => console.error("Error fetching jobs:", err))
      .finally(() => {
        if (!ignore) setIsLoadingJobs(false);
      });

    const instParam = selectedInstitution !== "All Institutions" ? `&institution=${encodeURIComponent(selectedInstitution)}` : "";
    const skillParam = skillSearchQuery.trim() !== "" ? `&skill=${encodeURIComponent(skillSearchQuery)}` : "";
    fetch(`/api/industry/students?${instParam}${skillParam}`)
      .then((r) => r.json())
      .then((data) => {
        if (!ignore && data.students) setStudentsList(data.students);
      })
      .catch((err) => console.error("Error fetching students:", err))
      .finally(() => {
        if (!ignore) setIsLoadingStudents(false);
      });

    fetch(`/api/industry/applications?orgId=${org.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (!ignore && data.applications) setApplications(data.applications);
      })
      .catch((err) => console.error("Error fetching applications:", err))
      .finally(() => {
        if (!ignore) setIsLoadingApps(false);
      });

    return () => {
      ignore = true;
    };
  }, [org.id, selectedInstitution, skillSearchQuery]);

  // Handle Post New Job
  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim() || selectedSkills.length === 0) {
      alert("Please enter title, description, and select at least one required skill.");
      return;
    }

    setIsSubmittingJob(true);
    try {
      const res = await fetch("/api/industry/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orgId: org.id,
          orgName: org.name,
          title: newTitle,
          roleType: newRoleType,
          location: newLocation,
          locationType: newLocationType,
          stipendOrSalary: newStipend,
          duration: newDuration,
          description: newDescription,
          requiredSkills: selectedSkills
        })
      });

      if (!res.ok) throw new Error("Failed to post opportunity");

      // Reset form
      setNewTitle("");
      setNewDescription("");
      setShowJobForm(false);
      fetch(`/api/industry/jobs?orgId=${org.id}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.jobs) setJobs(data.jobs);
        });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      alert(`Error posting job: ${msg}`);
    } finally {
      setIsSubmittingJob(false);
    }
  };

  // Toggle Job Status
  const handleToggleJob = async (jobId: string) => {
    try {
      setJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, status: j.status === "active" ? "closed" : "active" } : j))
      );
      await fetch("/api/industry/jobs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId })
      });
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  // Update Application Status
  const handleUpdateAppStatus = async (applicationId: string, status: ApplicationStatus) => {
    try {
      setApplications((prev) =>
        prev.map((a) => (a.id === applicationId ? { ...a, status } : a))
      );
      await fetch("/api/industry/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, status })
      });
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  // Invite Student
  const handleInviteStudent = (studentId: string, studentName: string) => {
    setInvitedStudents((prev) => new Set(prev).add(studentId));
    alert(`Internship Interview Invitation sent directly to ${studentName}!`);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ayush_org_session");
    }
    router.push("/login/organisation");
  };

  const getReadinessBadgeClass = (tier: ReadinessTier) => {
    switch (tier) {
      case "Highly Ready":
        return "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800";
      case "Ready with Minor Gaps":
        return "bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950 dark:text-teal-200 dark:border-teal-800";
      case "Developing":
        return "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800";
      default:
        return "bg-zinc-100 text-zinc-800 border-zinc-300";
    }
  };

  const toggleSkillSelection = (sk: string) => {
    setSelectedSkills((prev) =>
      prev.includes(sk) ? prev.filter((item) => item !== sk) : [...prev, sk]
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold shadow-xs">
              <Building2 className="w-5 h-5 text-blue-100" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg block leading-tight text-zinc-900 dark:text-zinc-100">
                {org.name}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {org.location || "Ayurvedic Healthcare Network"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs text-zinc-500 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium hidden sm:inline"
            >
              View Student Portal
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Welcome Banner */}
      <div className="bg-linear-to-r from-blue-900 via-indigo-900 to-zinc-900 text-white py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-blue-800/80 border border-blue-600/40 text-blue-200 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Industry Partner
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Clinical Internship & Talent Recruitment Center
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/80 mt-1 max-w-2xl">
              Post verified opportunities with skill benchmarks, search accredited BAMS students by college, and review assessed candidates.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 shrink-0">
            <div className="text-center px-2">
              <span className="text-xl sm:text-2xl font-black block">{jobs.length}</span>
              <span className="text-[10px] text-blue-200 uppercase font-semibold">Active Jobs</span>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-center px-2">
              <span className="text-xl sm:text-2xl font-black block">{applications.length}</span>
              <span className="text-[10px] text-blue-200 uppercase font-semibold">Applications</span>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-center px-2">
              <span className="text-xl sm:text-2xl font-black block">{studentsList.length}</span>
              <span className="text-[10px] text-blue-200 uppercase font-semibold">Verified Students</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 sm:gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "jobs"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Post & Manage Opportunities ({jobs.length})
          </button>

          <button
            onClick={() => setActiveTab("students")}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "students"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Student Talent Directory (By College)
          </button>

          <button
            onClick={() => setActiveTab("applications")}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "applications"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <Users className="w-4 h-4" />
            Applications & Requests ({applications.length})
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* ==========================================
            TAB 1: POST & MANAGE OPPORTUNITIES
            ========================================== */}
        {activeTab === "jobs" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Your Posted Clinical Opportunities
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  Attach specific competency and skill requirements to automatically filter candidate readiness.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowJobForm(!showJobForm)}
                className="py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs cursor-pointer transition-all self-start"
              >
                <PlusCircle className="w-4 h-4" />
                {showJobForm ? "Close Form" : "Post New Opportunity"}
              </button>
            </div>

            {/* Opportunity Creation Form Modal/Card */}
            {showJobForm && (
              <form onSubmit={handleCreateJob} className="bg-white dark:bg-zinc-900 border-2 border-blue-600/60 rounded-3xl p-6 sm:p-8 shadow-md space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    Create New Clinical Job or Internship
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Students whose assessed skills meet your benchmarks will be prioritized for this role.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Opportunity Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Clinical Ayurveda Intern (OPD & Panchakarma)"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Role Type
                    </label>
                    <select
                      value={newRoleType}
                      onChange={(e) => setNewRoleType(e.target.value as JobOpportunity["role_type"])}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Internship">Internship</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Clinical Apprenticeship">Clinical Apprenticeship</option>
                      <option value="Research Fellowship">Research Fellowship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Work Arrangement
                    </label>
                    <select
                      value={newLocationType}
                      onChange={(e) => setNewLocationType(e.target.value as JobOpportunity["location_type"])}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Onsite">Onsite Hospital</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Stipend / Salary
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹20,000 / month"
                      value={newStipend}
                      onChange={(e) => setNewStipend(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 6 Months"
                      value={newDuration}
                      onChange={(e) => setNewDuration(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Job Description & Clinical Responsibilities *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe clinical responsibilities, patient interactions, OPD duties, and learning outcomes..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Multi-Select Required Skills */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                    Attach Required Ayurvedic Skills & Competencies (Click to toggle):
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_SKILLS.map((sk) => {
                      const isSelected = selectedSkills.includes(sk);
                      return (
                        <button
                          key={sk}
                          type="button"
                          onClick={() => toggleSkillSelection(sk)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-blue-100 text-blue-900 border-blue-400 dark:bg-blue-950 dark:text-blue-200 font-bold ring-1 ring-blue-500"
                              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200"
                          }`}
                        >
                          {isSelected ? "✓ " : "+ "}
                          {sk}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowJobForm(false)}
                    className="py-2.5 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingJob}
                    className="py-2.5 px-6 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow-xs"
                  >
                    {isSubmittingJob ? "Posting..." : "Publish Opportunity"}
                  </button>
                </div>
              </form>
            )}

            {/* List of Posted Opportunities */}
            {isLoadingJobs ? (
              <div className="p-8 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <div className="w-7 h-7 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-xs text-zinc-500">Loading opportunities...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">No active opportunities posted yet.</p>
                <p className="text-xs text-zinc-500 mt-1">Click &quot;Post New Opportunity&quot; above to create your first listing.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.map((job) => {
                  const isActive = job.status === "active";
                  return (
                    <div
                      key={job.id}
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-300 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            {job.role_type}
                          </span>
                          <button
                            onClick={() => handleToggleJob(job.id)}
                            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border cursor-pointer ${
                              isActive
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300"
                                : "bg-zinc-100 text-zinc-600 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-400"
                            }`}
                          >
                            {isActive ? "● Active Listing" : "○ Closed"}
                          </button>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                          {job.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-blue-600" />
                            {job.location} ({job.location_type})
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                            {job.stipend_or_salary}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            {job.duration}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-3 line-clamp-2 leading-relaxed">
                          {job.description}
                        </p>

                        {/* Required Skills Badges */}
                        <div className="pt-2">
                          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                            Required Skills:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {job.required_skills.map((sk) => (
                              <span
                                key={sk}
                                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                              >
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs border-t border-zinc-100 dark:border-zinc-800">
                        <span className="text-blue-700 dark:text-blue-400 font-bold flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {job.applications_count || 0} candidate applications
                        </span>
                        <button
                          onClick={() => setActiveTab("applications")}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-semibold cursor-pointer"
                        >
                          View applicants →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            TAB 2: STUDENT TALENT DIRECTORY (BY COLLEGE)
            ========================================== */}
        {activeTab === "students" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Student Talent Directory (By Institution & Skills)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Filter accredited BAMS candidates by their registered university and verified skill assessment benchmarks.
              </p>
            </div>

            {/* Filter Controls */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-center gap-4">
              {/* Institution Dropdown */}
              <div className="w-full md:w-1/2">
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                  Filter By Institution / College:
                </label>
                <select
                  value={selectedInstitution}
                  onChange={(e) => setSelectedInstitution(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                >
                  <option value="All Institutions">All Institutions (All Registered Colleges)</option>
                  {ACCREDITED_INSTITUTIONS.map((inst) => (
                    <option key={inst} value={inst}>
                      {inst}
                    </option>
                  ))}
                </select>
              </div>

              {/* Skill Search Input */}
              <div className="w-full md:w-1/2">
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                  Search By Skill or Role Keyword:
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Panchakarma, Pharmacovigilance, Clinical Reasoning..."
                    value={skillSearchQuery}
                    onChange={(e) => setSkillSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Student Directory Grid */}
            {isLoadingStudents ? (
              <div className="p-8 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <div className="w-7 h-7 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-xs text-zinc-500">Searching student talent...</p>
              </div>
            ) : studentsList.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">No students match your criteria.</p>
                <p className="text-xs text-zinc-500 mt-1">Try selecting a different institution or clearing the skill filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {studentsList.map((st) => {
                  const isInvited = invitedStudents.has(st.id);
                  return (
                    <div
                      key={st.id}
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-400 transition-all"
                    >
                      <div>
                        {/* Top Header & College */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                              {st.full_name}
                            </h3>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-0.5">
                              {st.course} • Semester {st.semester}
                            </span>
                          </div>
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getReadinessBadgeClass(st.readiness_level)}`}>
                            {st.overall_readiness_score}% Score
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200 mb-3">
                          <span className="font-semibold block truncate">🏛️ {st.college}</span>
                          <span className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5 block">
                            Assessed for: <strong>{st.target_role}</strong>
                          </span>
                        </div>

                        {/* Verified Skills Breakdown */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                            Assessed Skill Performance:
                          </span>
                          <div className="space-y-1">
                            {st.skills.slice(0, 3).map((sk) => (
                              <div key={sk.skill_name} className="flex items-center justify-between text-xs">
                                <span className="text-zinc-700 dark:text-zinc-300 truncate max-w-[170px]">
                                  {sk.skill_name}
                                </span>
                                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                                  {sk.score}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Invite Button */}
                      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
                        <button
                          onClick={() => handleInviteStudent(st.id, st.full_name)}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            isInvited
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                              : "bg-blue-700 hover:bg-blue-800 text-white shadow-xs"
                          }`}
                        >
                          {isInvited ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Invitation Sent
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              Invite for Clinical Interview
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            TAB 3: APPLICATIONS & CANDIDATE REQUESTS
            ========================================== */}
        {activeTab === "applications" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Received Student Applications & Internship Requests
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Review candidates, verified skill assessments, and manage application statuses in real-time.
              </p>
            </div>

            {isLoadingApps ? (
              <div className="p-8 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <div className="w-7 h-7 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-xs text-zinc-500">Loading received applications...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">No applications received yet.</p>
                <p className="text-xs text-zinc-500 mt-1">Applications submitted by students will appear here for review.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => {
                  return (
                    <div
                      key={app.id}
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:border-zinc-300 transition-all"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300">
                            Applied: {app.job_title}
                          </span>
                          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getReadinessBadgeClass(app.readiness_level)}`}>
                            Readiness: {app.readiness_score}% ({app.readiness_level})
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                          {app.student_name}
                        </h3>

                        <div className="text-xs text-zinc-600 dark:text-zinc-400 flex flex-wrap items-center gap-3">
                          <span>🏛️ {app.college}</span>
                          <span>•</span>
                          <span>{app.course} (Sem {app.semester})</span>
                          <span>•</span>
                          <span>📧 {app.student_email}</span>
                        </div>

                        {/* Assessed Skills Highlights */}
                        <div className="pt-2 flex flex-wrap gap-2">
                          {app.skills_summary.map((sk) => (
                            <span
                              key={sk.skill}
                              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                            >
                              {sk.skill}: <strong className="text-emerald-600">{sk.percentage}%</strong>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Status Management Box */}
                      <div className="lg:w-64 shrink-0 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-zinc-600 dark:text-zinc-300">Current Status:</span>
                          <span className={`font-bold ${
                            app.status === "Accepted" ? "text-emerald-600" :
                            app.status === "Shortlisted" ? "text-blue-600" :
                            app.status === "Rejected" ? "text-rose-600" : "text-amber-600"
                          }`}>
                            {app.status}
                          </span>
                        </div>

                        <select
                          value={app.status}
                          onChange={(e) => handleUpdateAppStatus(app.id, e.target.value as ApplicationStatus)}
                          className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                        >
                          <option value="Pending Review">Pending Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Accepted">Accepted / Offer Extended</option>
                          <option value="Rejected">Rejected</option>
                        </select>

                        <Link
                          href={`/dashboard/assessment/result?id=mock-asm-1`}
                          className="w-full py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 text-zinc-800 dark:text-zinc-200 text-xs font-medium flex items-center justify-center gap-1 transition-all"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          View Skill Report
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

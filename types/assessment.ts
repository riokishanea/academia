import { z } from "zod";

// ==========================================
// 1. Core Database & Model Interfaces
// ==========================================

export type SourceType = "official" | "institution_defined" | "industry_defined" | "prototype_generated";

export type QuestionType = "mcq" | "multiple_select" | "scenario" | "rating";

export type DifficultyLevel = "easy" | "medium" | "hard";

export type AssessmentStatus = "in_progress" | "submitted" | "analyzed";

export type ReadinessTier = "Highly Ready" | "Ready with Minor Gaps" | "Developing" | "Needs Significant Improvement";

export interface StudentProfile {
  id: string;
  full_name: string;
  email: string;
  college?: string;
  course?: string;
  semester?: number;
  created_at?: string;
}

export interface StudentSkill {
  id: string;
  student_id: string;
  skill_name: string;
  proficiency_level: number; // 1 - 5
  source?: string;
  created_at?: string;
}

export interface CareerRole {
  id: string;
  title: string;
  slug: string;
  description: string;
  sector: string;
  required_score: number;
  active: boolean;
  created_at?: string;
}

export interface CareerSkill {
  id: string;
  career_role_id: string;
  skill_name: string;
  description?: string;
  required_percentage: number;
  required_level?: number | null;
  weight: number;
  source_type: SourceType;
  source_reference?: string | null;
  created_at?: string;
}

export interface Competency {
  id: string;
  competency_code: string | null;
  title: string;
  description: string;
  domain: string;
  required_level: number | null;
  curriculum_source: string | null;
  regulation_reference: string | null;
  source_type: SourceType;
  created_at?: string;
}

export interface QuestionOption {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
  score: number;
  display_order: number;
}

export interface AssessmentQuestion {
  id: string;
  career_role_id: string;
  competency_id?: string | null;
  question_text: string;
  question_type: QuestionType;
  difficulty: DifficultyLevel;
  skill_tag: string;
  competency_code?: string | null;
  curriculum_reference?: string | null;
  regulation_reference?: string | null;
  source_type: SourceType;
  explanation?: string;
  weight: number;
  active: boolean;
  created_at?: string;
  options?: QuestionOption[];
}

// ==========================================
// 2. Safe Frontend Models (Security Rule)
// Never expose is_correct, score, or explanation during active assessment
// ==========================================

export interface SafeQuestionOption {
  id: string;
  option_text: string;
  display_order: number;
}

export interface SafeAssessmentQuestion {
  id: string;
  question_text: string;
  question_type: QuestionType;
  difficulty: DifficultyLevel;
  skill_tag: string;
  weight: number;
  options: SafeQuestionOption[];
}

export interface ActiveAssessmentPayload {
  assessmentId: string;
  careerRole: {
    id: string;
    title: string;
    slug: string;
    description: string;
    sector: string;
    requiredScore: number;
  };
  questions: SafeAssessmentQuestion[];
  savedAnswers: Record<string, {
    selectedOptionIds: string[];
    ratingValue: number | null;
  }>;
  status: AssessmentStatus;
}

// ==========================================
// 3. Assessment State & Answers
// ==========================================

export interface AssessmentAnswerRecord {
  id?: string;
  assessment_id: string;
  question_id: string;
  selected_option_ids: string[];
  rating_value: number | null;
  score_awarded?: number | null;
  created_at?: string;
}

export interface AssessmentSkillScore {
  id?: string;
  assessment_id: string;
  skill_name: string;
  score: number;
  max_score: number;
  percentage: number;
  required_percentage: number;
  gap_percentage: number;
  created_at?: string;
}

export interface AssessmentRecord {
  id: string;
  student_id: string;
  career_role_id: string;
  started_at: string;
  submitted_at: string | null;
  status: AssessmentStatus;
  total_score: number | null;
  percentage: number | null;
  readiness_level: ReadinessTier | null;
  ai_analysis: AIAnalysisResult | null;
  created_at?: string;
}

// ==========================================
// 4. Comparison & Report Models
// ==========================================

export interface SkillComparison {
  skill: string;
  profileLevel: number;
  assessmentPercentage: number;
  requiredPercentage: number;
  gapPercentage: number;
  weight: number;
  status: "meets_requirement" | "skill_gap";
}

// ==========================================
// 5. Zod Schema & Types for Gemini Output
// ==========================================

export const AISkillGapSchema = z.object({
  skill: z.string().describe("Name of the skill area with a gap"),
  reason: z.string().describe("Root cause or conceptual explanation for the skill gap in clinical Ayurveda context"),
  recommendation: z.string().describe("Actionable learning suggestion or clinical practice advice to bridge the gap")
});

export const AIAnalysisSchema = z.object({
  summary: z.string().describe("Holistic evaluation summary of student readiness for the clinical role"),
  strengths: z.array(z.string()).describe("Key Ayurvedic and clinical proficiencies demonstrated by student"),
  skillGaps: z.array(AISkillGapSchema).describe("Specific skill deficiencies and targeted remedies"),
  recommendedActions: z.array(z.string()).describe("Immediate next steps, courses, or clinical rotations recommended"),
  careerGuidance: z.string().describe("Strategic mentorship guidance for pursuing this role and future BAMS career paths"),
  prioritySkills: z.array(z.string()).describe("Top 2-3 skills that should be prioritized immediately")
});

export type AIAnalysisResult = z.infer<typeof AIAnalysisSchema>;

export interface AssessmentSubmissionResult {
  assessmentId: string;
  careerTitle: string;
  overallScore: number;
  readinessLevel: ReadinessTier;
  thresholdScore: number;
  isReady: boolean;
  skillScores: AssessmentSkillScore[];
  comparisons: SkillComparison[];
  aiAnalysis: AIAnalysisResult;
  submittedAt: string;
}

// ==========================================
// 6. Industry, Opportunities & Student Directory Models
// ==========================================

export interface OrganizationProfile {
  id: string;
  name: string;
  email: string;
  type: string;
  location?: string;
  description?: string;
}

export interface JobOpportunity {
  id: string;
  org_id: string;
  org_name: string;
  title: string;
  role_type: "Internship" | "Full-Time" | "Clinical Apprenticeship" | "Research Fellowship";
  location: string;
  location_type: "Onsite" | "Hybrid" | "Remote";
  stipend_or_salary: string;
  duration: string;
  description: string;
  required_skills: string[];
  status: "active" | "closed";
  created_at: string;
  applications_count?: number;
}

export type ApplicationStatus = "Pending Review" | "Shortlisted" | "Accepted" | "Rejected";

export interface JobApplication {
  id: string;
  job_id: string;
  job_title: string;
  org_id: string;
  student_id: string;
  student_name: string;
  student_email: string;
  college: string;
  course: string;
  semester: number;
  readiness_score: number;
  readiness_level: ReadinessTier;
  applied_at: string;
  status: ApplicationStatus;
  notes?: string;
  skills_summary: Array<{ skill: string; percentage: number }>;
}

export interface InstitutionStudentProfile {
  id: string;
  full_name: string;
  email: string;
  college: string;
  course: string;
  semester: number;
  overall_readiness_score: number;
  readiness_level: ReadinessTier;
  target_role: string;
  skills: Array<{ skill_name: string; score: number; level: number }>;
  avatar?: string;
}

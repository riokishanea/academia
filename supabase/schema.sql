-- =========================================================
-- AYUSH / BAMS Academia-Industry Collaboration Portal
-- Skill Assessment & Skill-Gap Analysis Module Schema
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Student Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    college TEXT,
    course TEXT DEFAULT 'BAMS',
    semester INTEGER DEFAULT 6,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Student Baseline Skills Table
CREATE TABLE IF NOT EXISTS student_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    proficiency_level INTEGER NOT NULL CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
    source TEXT DEFAULT 'self_reported',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(student_id, skill_name)
);

-- 3. Career Roles Table
CREATE TABLE IF NOT EXISTS career_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    sector TEXT NOT NULL,
    required_score NUMERIC NOT NULL DEFAULT 70,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Career Skill Requirements Table
CREATE TABLE IF NOT EXISTS career_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    career_role_id UUID NOT NULL REFERENCES career_roles(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    description TEXT,
    required_percentage NUMERIC NOT NULL,
    required_level INTEGER CHECK (required_level >= 1 AND required_level <= 5),
    weight NUMERIC NOT NULL DEFAULT 20,
    source_type TEXT NOT NULL CHECK (source_type IN ('official', 'institution_defined', 'industry_defined', 'prototype_generated')),
    source_reference TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(career_role_id, skill_name)
);

-- 5. Competencies Table
CREATE TABLE IF NOT EXISTS competencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competency_code TEXT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    domain TEXT NOT NULL,
    required_level INTEGER CHECK (required_level >= 1 AND required_level <= 5),
    curriculum_source TEXT,
    regulation_reference TEXT,
    source_type TEXT NOT NULL CHECK (source_type IN ('official', 'institution_defined', 'industry_defined', 'prototype_generated')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Assessment Questions Table
CREATE TABLE IF NOT EXISTS assessment_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    career_role_id UUID NOT NULL REFERENCES career_roles(id) ON DELETE CASCADE,
    competency_id UUID REFERENCES competencies(id) ON DELETE SET NULL,
    question_text TEXT NOT NULL,
    question_type TEXT NOT NULL CHECK (question_type IN ('mcq', 'multiple_select', 'scenario', 'rating')),
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    skill_tag TEXT NOT NULL,
    competency_code TEXT,
    curriculum_reference TEXT,
    regulation_reference TEXT,
    source_type TEXT NOT NULL CHECK (source_type IN ('official', 'institution_defined', 'industry_defined', 'prototype_generated')),
    explanation TEXT,
    weight NUMERIC NOT NULL DEFAULT 1,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Question Options Table
CREATE TABLE IF NOT EXISTS question_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES assessment_questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT false,
    score NUMERIC NOT NULL DEFAULT 0,
    display_order INTEGER NOT NULL DEFAULT 0
);

-- 8. Assessments Table
CREATE TABLE IF NOT EXISTS assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    career_role_id UUID NOT NULL REFERENCES career_roles(id) ON DELETE RESTRICT,
    started_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    submitted_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'submitted', 'analyzed')),
    total_score NUMERIC,
    percentage NUMERIC,
    readiness_level TEXT,
    ai_analysis JSONB,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Assessment Answers Table
CREATE TABLE IF NOT EXISTS assessment_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES assessment_questions(id) ON DELETE CASCADE,
    selected_option_ids UUID[] DEFAULT '{}',
    rating_value INTEGER,
    score_awarded NUMERIC,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(assessment_id, question_id)
);

-- 10. Assessment Skill Scores Table
CREATE TABLE IF NOT EXISTS assessment_skill_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    score NUMERIC NOT NULL,
    max_score NUMERIC NOT NULL,
    percentage NUMERIC NOT NULL,
    required_percentage NUMERIC NOT NULL,
    gap_percentage NUMERIC NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(assessment_id, skill_name)
);

-- =========================================================
-- Performance Indexes
-- =========================================================
CREATE INDEX IF NOT EXISTS idx_career_skills_role ON career_skills(career_role_id);
CREATE INDEX IF NOT EXISTS idx_assessment_questions_role ON assessment_questions(career_role_id);
CREATE INDEX IF NOT EXISTS idx_assessment_questions_skill ON assessment_questions(skill_tag);
CREATE INDEX IF NOT EXISTS idx_question_options_qid ON question_options(question_id);
CREATE INDEX IF NOT EXISTS idx_assessments_student ON assessments(student_id);
CREATE INDEX IF NOT EXISTS idx_assessments_status ON assessments(status);
CREATE INDEX IF NOT EXISTS idx_assessment_answers_assessment ON assessment_answers(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_skill_scores_assessment ON assessment_skill_scores(assessment_id);

-- =========================================================
-- Row Level Security (RLS) Policies
-- =========================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_skill_scores ENABLE ROW LEVEL SECURITY;

-- Public/Student read access for catalog items
CREATE POLICY "Public read active career roles" ON career_roles FOR SELECT USING (active = true);
CREATE POLICY "Public read career skills" ON career_skills FOR SELECT USING (true);
CREATE POLICY "Public read competencies" ON competencies FOR SELECT USING (true);
CREATE POLICY "Public read active questions" ON assessment_questions FOR SELECT USING (active = true);

-- Profiles & Skills policies
CREATE POLICY "Students can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Students can manage own profile" ON profiles FOR ALL USING (true);
CREATE POLICY "Students can view own skills" ON student_skills FOR SELECT USING (true);
CREATE POLICY "Students can manage own skills" ON student_skills FOR ALL USING (true);

-- Assessments & Answers policies
CREATE POLICY "Students can view own assessments" ON assessments FOR SELECT USING (true);
CREATE POLICY "Students can insert own assessments" ON assessments FOR INSERT WITH CHECK (true);
CREATE POLICY "Students can update own assessments" ON assessments FOR UPDATE USING (true);

CREATE POLICY "Students can view own answers" ON assessment_answers FOR SELECT USING (true);
CREATE POLICY "Students can upsert own answers" ON assessment_answers FOR ALL USING (true);

CREATE POLICY "Students can view own skill scores" ON assessment_skill_scores FOR SELECT USING (true);
CREATE POLICY "Students can insert own skill scores" ON assessment_skill_scores FOR INSERT WITH CHECK (true);

-- Security Note: is_correct and score in question_options are guarded on server-side queries.

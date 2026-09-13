-- =========================================================
-- AYUSH / BAMS Academia-Industry Collaboration Portal
-- Seed Data: Career Role, Skills, Competencies & 20 Questions
-- =========================================================

-- 1. Seed Sample Student Profile
INSERT INTO profiles (id, full_name, email, college, course, semester)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'Aarav Sharma',
    'aarav.sharma@ayush.edu.in',
    'National Institute of Ayurveda, Jaipur',
    'BAMS',
    6
)
ON CONFLICT (email) DO UPDATE 
SET full_name = EXCLUDED.full_name,
    college = EXCLUDED.college,
    course = EXCLUDED.course,
    semester = EXCLUDED.semester;

-- 2. Seed Baseline Student Skills
INSERT INTO student_skills (student_id, skill_name, proficiency_level, source)
VALUES
    ('a0000000-0000-0000-0000-000000000001', 'Ayurvedic Fundamentals', 4, 'self_reported'),
    ('a0000000-0000-0000-0000-000000000001', 'Clinical Reasoning', 3, 'self_reported'),
    ('a0000000-0000-0000-0000-000000000001', 'Patient Communication', 4, 'self_reported'),
    ('a0000000-0000-0000-0000-000000000001', 'Clinical Documentation', 3, 'self_reported'),
    ('a0000000-0000-0000-0000-000000000001', 'Professional Ethics', 4, 'self_reported')
ON CONFLICT (student_id, skill_name) DO UPDATE
SET proficiency_level = EXCLUDED.proficiency_level;

-- 3. Seed Career Role: Ayurveda Clinical Assistant
INSERT INTO career_roles (id, title, slug, description, sector, required_score, active)
VALUES (
    'c0000000-0000-0000-0000-000000000001',
    'Ayurveda Clinical Assistant',
    'ayurveda-clinical-assistant',
    'A beginner-level clinical support role for BAMS students involving patient interaction, basic clinical observation, documentation, Ayurvedic fundamentals, professional conduct, and assisting qualified practitioners.',
    'AYUSH / Ayurveda Healthcare',
    70,
    true
)
ON CONFLICT (slug) DO UPDATE
SET title = EXCLUDED.title,
    description = EXCLUDED.description,
    sector = EXCLUDED.sector,
    required_score = EXCLUDED.required_score,
    active = EXCLUDED.active;

-- 4. Seed Career Skill Requirements
INSERT INTO career_skills (career_role_id, skill_name, description, required_percentage, required_level, weight, source_type, source_reference)
VALUES
    ('c0000000-0000-0000-0000-000000000001', 'Ayurvedic Fundamentals', 'Core understanding of Tridosha, Sapta Dhatu, Mala, Agni, and basic Ayurvedic physiology.', 80, 4, 25, 'prototype_generated', NULL),
    ('c0000000-0000-0000-0000-000000000001', 'Clinical Reasoning', 'Ability to interpret symptoms, recognize Ama/Agni states, and support diagnosis.', 75, 4, 25, 'prototype_generated', NULL),
    ('c0000000-0000-0000-0000-000000000001', 'Patient Communication', 'Effective patient rapport, empathetic history taking, and clear Pathya-Apathya explanation.', 75, 4, 20, 'prototype_generated', NULL),
    ('c0000000-0000-0000-0000-000000000001', 'Clinical Documentation', 'Accurate maintenance of Rogi Patrika, vital signs, Dosha charts, and treatment logs.', 70, 3, 15, 'prototype_generated', NULL),
    ('c0000000-0000-0000-0000-000000000001', 'Professional Ethics', 'Patient confidentiality, recognizing clinical red flags, and adherence to Vaidya supervision.', 80, 4, 15, 'prototype_generated', NULL)
ON CONFLICT (career_role_id, skill_name) DO UPDATE
SET required_percentage = EXCLUDED.required_percentage,
    weight = EXCLUDED.weight,
    description = EXCLUDED.description;

-- 5. Seed Competencies
INSERT INTO competencies (id, competency_code, title, description, domain, required_level, curriculum_source, regulation_reference, source_type)
VALUES
    ('d0000000-0000-0000-0000-000000000001', NULL, 'Tridosha & Dhatu Physiology Assessment', 'Identify normal and vitiated states of Vata, Pitta, and Kapha along with Dhatu Poshana principles.', 'Kriya Sharira & Siddhanta', 4, NULL, NULL, 'prototype_generated'),
    ('d0000000-0000-0000-0000-000000000002', NULL, 'Rogi Pariksha & Clinical Appraisal', 'Conduct basic Roga and Rogi Pariksha under senior supervision.', 'Roga Nidana', 4, NULL, NULL, 'prototype_generated'),
    ('d0000000-0000-0000-0000-000000000003', NULL, 'Satvavajaya & Patient Counseling', 'Deliver patient education, Ahara-Vihara advice, and reassuring dialogue.', 'Swasthavritta & Clinical Practice', 4, NULL, NULL, 'prototype_generated'),
    ('d0000000-0000-0000-0000-000000000004', NULL, 'Ayurvedic Medical Record Keeping', 'Structured record keeping of Prakriti, Vikriti, Nadi, and Panchakarma sessions.', 'Clinical Documentation', 3, NULL, NULL, 'prototype_generated'),
    ('d0000000-0000-0000-0000-000000000005', NULL, 'Medical Ethics & Red Flag Triage', 'Maintain clinical integrity, patient privacy, and swift emergency triage referral.', 'Professional Ethics', 4, NULL, NULL, 'prototype_generated')
ON CONFLICT (id) DO NOTHING;

-- 6. Seed 20 Realistic Prototype Assessment Questions & Options

-- Question 1: Ayurvedic Fundamentals (Easy MCQ)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000001',
    'Which Dosha is predominantly characterized by the inherent Gunas (qualities) of Ruksha (dry), Sheeta (cold), Laghu (light), and Chala (mobile)?',
    'mcq',
    'easy',
    'Ayurvedic Fundamentals',
    NULL, NULL, NULL,
    'prototype_generated',
    'According to classical Ashtanga Hridaya (Sutra 1/11), "Tatra ruksho laghu sheetah khara sukshmoshchalo anilah" describes the attributes of Vata Dosha.',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000001', 'Pitta Dosha', false, 0, 1),
('e0000000-0000-0000-0000-000000000001', 'Vata Dosha', true, 1, 2),
('e0000000-0000-0000-0000-000000000001', 'Kapha Dosha', false, 0, 3),
('e0000000-0000-0000-0000-000000000001', 'Rakta Dhatu', false, 0, 4);

-- Question 2: Ayurvedic Fundamentals (Medium MCQ)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000002',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000001',
    'In Ayurvedic physiological transformation (Dhatu Poshana), what is the primary function of Pachaka Pitta?',
    'mcq',
    'medium',
    'Ayurvedic Fundamentals',
    NULL, NULL, NULL,
    'prototype_generated',
    'Pachaka Pitta resides in the Amashaya-Pakvashaya Madhyastha (gastrointestinal tract) responsible for Ahara Pachana (digestion) and Sara-Kitta Vibhajana (separation of nutrients and waste).',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000002', 'Digestion of food and separation of Sara (nutrients) and Kitta (waste)', true, 1, 1),
('e0000000-0000-0000-0000-000000000002', 'Vision and visual perception (Alochaka)', false, 0, 2),
('e0000000-0000-0000-0000-000000000002', 'Complexion and skin luster (Bhrajaka)', false, 0, 3),
('e0000000-0000-0000-0000-000000000002', 'Emotional processing and mental courage (Sadhaka)', false, 0, 4);

-- Question 3: Ayurvedic Fundamentals (Scenario MCQ)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000003',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000001',
    'Scenario: A 32-year-old patient presents with symptoms of Vidaha (sour belching), Trishna (excessive thirst), Ushnata (elevated body heat sensation), and loose stools during Sharad Ritu. Which Dosha imbalance is most prominently indicated?',
    'scenario',
    'medium',
    'Ayurvedic Fundamentals',
    NULL, NULL, NULL,
    'prototype_generated',
    'Sharad Ritu is the natural Prakopa (aggravation) period of Pitta Dosha, characterized by burning sensation, excessive thirst, and sour belching.',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000003', 'Pitta Prakopa (Aggravated Pitta)', true, 1, 1),
('e0000000-0000-0000-0000-000000000003', 'Vata Sanchaya (Accumulated Vata)', false, 0, 2),
('e0000000-0000-0000-0000-000000000003', 'Kapha Prakopa (Aggravated Kapha)', false, 0, 3),
('e0000000-0000-0000-0000-000000000003', 'Pure Majja Kshaya', false, 0, 4);

-- Question 4: Ayurvedic Fundamentals (MCQ / Sequence)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000004',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000001',
    'What is the correct sequential order of the Sapta Dhatus (seven bodily tissues) as described in classical Ayurvedic Dhatu Utpatti Krama?',
    'mcq',
    'easy',
    'Ayurvedic Fundamentals',
    NULL, NULL, NULL,
    'prototype_generated',
    'The classical sequence of Dhatu nourishment is: Rasa -> Rakta -> Mamsa -> Meda -> Asthi -> Majja -> Shukra.',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000004', 'Rasa -> Rakta -> Mamsa -> Meda -> Asthi -> Majja -> Shukra', true, 1, 1),
('e0000000-0000-0000-0000-000000000004', 'Rakta -> Rasa -> Meda -> Mamsa -> Majja -> Asthi -> Shukra', false, 0, 2),
('e0000000-0000-0000-0000-000000000004', 'Rasa -> Mamsa -> Rakta -> Asthi -> Meda -> Shukra -> Majja', false, 0, 3),
('e0000000-0000-0000-0000-000000000004', 'Meda -> Rasa -> Rakta -> Mamsa -> Asthi -> Majja -> Ojas', false, 0, 4);

-- Question 5: Clinical Reasoning (Easy MCQ)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000005',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000002',
    'In Yogaratnakara Ashtavidha Pariksha (eightfold clinical examination), which examination is traditionally placed first as a key vital appraisal?',
    'mcq',
    'easy',
    'Clinical Reasoning',
    NULL, NULL, NULL,
    'prototype_generated',
    'Ashtavidha Pariksha begins with Nadi (Pulse) examination ("Nadi Mutram Malam Jihva Shabda Sparsha Drik Akritih").',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000005', 'Nadi Pariksha (Pulse examination)', true, 1, 1),
('e0000000-0000-0000-0000-000000000005', 'Mala Pariksha (Stool examination)', false, 0, 2),
('e0000000-0000-0000-0000-000000000005', 'Akriti Pariksha (General appearance)', false, 0, 3),
('e0000000-0000-0000-0000-000000000005', 'Shabda Pariksha (Voice/Sound examination)', false, 0, 4);

-- Question 6: Clinical Reasoning (Scenario MCQ)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000006',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000002',
    'Scenario: A patient in the outpatient ward complains of profound heaviness (Gaurava), thick white coating on the tongue, lack of appetite (Aruchi), and sluggish digestion. As a clinical assistant, what should you recognize as the underlying pathophysiology?',
    'scenario',
    'medium',
    'Clinical Reasoning',
    NULL, NULL, NULL,
    'prototype_generated',
    'The triad of heaviness, coated tongue (Liptyata), and loss of taste/appetite indicates Sama Avastha (presence of toxic undigested metabolic byproduct - Ama with Mandagni).',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000006', 'Sama Avastha (Presence of Ama due to Mandagni)', true, 1, 1),
('e0000000-0000-0000-0000-000000000006', 'Nirama Vataja Kshaya requiring heavy Rasayana', false, 0, 2),
('e0000000-0000-0000-0000-000000000006', 'Teekshnagni with accelerated hyper-metabolism', false, 0, 3),
('e0000000-0000-0000-0000-000000000006', 'Immediate need for high-calorie Ghrita intake', false, 0, 4);

-- Question 7: Clinical Reasoning (Medium MCQ)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000007',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000002',
    'Which clinical distinction best differentiates a Vataja Shirashoola (headache) from a Pittaja Shirashoola?',
    'mcq',
    'medium',
    'Clinical Reasoning',
    NULL, NULL, NULL,
    'prototype_generated',
    'Vataja Shirashoola typically manifests with throbbing/splitting pain relieved by warmth (Ushnopashaya) and pressure, whereas Pittaja Shirashoola manifests with burning sensation, red eyes, and relief from cooling applications (Sheetopashaya).',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000007', 'Vataja is throbbing & relieved by warmth; Pittaja has burning sensation & is relieved by cold', true, 1, 1),
('e0000000-0000-0000-0000-000000000007', 'Vataja has intense burning; Pittaja produces cold numbness', false, 0, 2),
('e0000000-0000-0000-0000-000000000007', 'Vataja occurs solely at noon; Pittaja occurs only in midnight cold', false, 0, 3),
('e0000000-0000-0000-0000-000000000007', 'There is no clinical difference between the two', false, 0, 4);

-- Question 8: Clinical Reasoning (Hard Scenario)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000008',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000002',
    'Scenario: A patient with acute high fever (Taruna Jwara of 2 days duration) and severe indigestion requests an immediate full-body oil massage (Abhyanga) and medicated ghee. Why must a clinical assistant recognize this as contraindicated?',
    'scenario',
    'hard',
    'Clinical Reasoning',
    NULL, NULL, NULL,
    'prototype_generated',
    'In Taruna Jwara (acute fever with Ama), Snehana (oiling/ghee) is strictly contraindicated as it blocks Srotas further and intensifies Ama Jwara ("Navajware snehapanam vishavat"). Langhana and Pachana are indicated first.',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000008', 'Snehana in Taruna Jwara acts like poison by aggravating Ama and blocking micro-channels (Srotas)', true, 1, 1),
('e0000000-0000-0000-0000-000000000008', 'Abhyanga immediately cures acute fever within 1 hour', false, 0, 2),
('e0000000-0000-0000-0000-000000000008', 'Medicated ghee should only be given with cold ice water', false, 0, 3),
('e0000000-0000-0000-0000-000000000008', 'It is not contraindicated and should always be administered immediately', false, 0, 4);

-- Question 9: Patient Communication (Easy Scenario)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000009',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000003',
    'Scenario: A newly diagnosed patient with Vata imbalance is overwhelmed by a lengthy dietary prescription (Pathya-Apathya). What is the most effective communication approach for the clinical assistant?',
    'scenario',
    'easy',
    'Patient Communication',
    NULL, NULL, NULL,
    'prototype_generated',
    'Effective patient-centric communication involves breaking complex dietary guidelines into 2-3 prioritized daily steps with warm, empathetic validation and clear written takeaways.',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000009', 'Highlight 2-3 key practical dietary shifts first, provide a clear simple handout, and encourage questions', true, 1, 1),
('e0000000-0000-0000-0000-000000000009', 'Insist the patient memorize all 30 Sanskrit dietary terms on the spot', false, 0, 2),
('e0000000-0000-0000-0000-000000000009', 'Tell the patient diet is unimportant if they take classical tablets', false, 0, 3),
('e0000000-0000-0000-0000-000000000009', 'Scold the patient for showing anxiety about their lifestyle habits', false, 0, 4);

-- Question 10: Patient Communication (Medium Scenario)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000010',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000003',
    'Scenario: A geriatric patient finds the taste of an essential decoction (Tikta Kashaya) intolerable and stops drinking it. How should you counsel the patient while upholding clinical protocol?',
    'scenario',
    'medium',
    'Patient Communication',
    NULL, NULL, NULL,
    'prototype_generated',
    'Empathetic counseling explores suitable approved Anupana (e.g. luke-warm water, honey if permitted by Vaidya) or drinking techniques, while consulting the supervising Vaidya if dosage form modification is required.',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000010', 'Acknowledge the difficulty, explain the therapeutic rationale, and consult the senior Vaidya for approved Anupana adjustments', true, 1, 1),
('e0000000-0000-0000-0000-000000000010', 'Secretly replace the decoction with sugary syrup without doctor knowledge', false, 0, 2),
('e0000000-0000-0000-0000-000000000010', 'Dismiss the patient concerns and threaten discharge for non-compliance', false, 0, 3),
('e0000000-0000-0000-0000-000000000010', 'Advise them to completely discontinue all Ayurvedic treatment', false, 0, 4);

-- Question 11: Patient Communication (Multiple Select / Scenario)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000011',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000003',
    'When explaining Dinacharya (daily health routine) to a working professional, which communication principles foster sustainable behavioral compliance?',
    'mcq',
    'medium',
    'Patient Communication',
    NULL, NULL, NULL,
    'prototype_generated',
    'Sustainable compliance is achieved through empathetic goal setting, gradual implementation (Padamshika Krama), and linking habits to their specific daily work schedule.',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000011', 'Gradual incremental adaptation (Padamshika Krama) tailored to their daily work schedule', true, 1, 1),
('e0000000-0000-0000-0000-000000000011', 'Demanding instant 100% lifestyle upheaval on day one', false, 0, 2),
('e0000000-0000-0000-0000-000000000011', 'Refusing to listen to their work-hour constraints', false, 0, 3),
('e0000000-0000-0000-0000-000000000011', 'Using obscure terminology without practical examples', false, 0, 4);

-- Question 12: Patient Communication (Medium Scenario)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000012',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000003',
    'Scenario: A patient asks whether they should immediately stop their prescribed modern antihypertensive pills upon starting Ayurvedic Guggulu formulations. What is your correct communication response?',
    'scenario',
    'medium',
    'Patient Communication',
    NULL, NULL, NULL,
    'prototype_generated',
    'A clinical assistant must never advise abrupt cessation of essential allopathic medications; they must clearly instruct continued adherence while facilitating a comprehensive joint consultation with the senior physician.',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000012', 'Never stop prescribed medication abruptly; instruct continued use and arrange physician consultation for integrative monitoring', true, 1, 1),
('e0000000-0000-0000-0000-000000000012', 'Tell them to discard all modern medications immediately without doctor consent', false, 0, 2),
('e0000000-0000-0000-0000-000000000012', 'Double both the allopathic and Ayurvedic dosages without telling the physician', false, 0, 3),
('e0000000-0000-0000-0000-000000000012', 'Dismiss the question as irrelevant to clinical practice', false, 0, 4);

-- Question 13: Clinical Documentation (Easy MCQ)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000013',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000004',
    'What are the three fundamental pillars of classical Ayurvedic examination required in every standard Rogi Pariksha case record?',
    'mcq',
    'easy',
    'Clinical Documentation',
    NULL, NULL, NULL,
    'prototype_generated',
    'Trividha Pariksha (Charaka) consists of Darshana (Inspection/Observation), Sparshana (Palpation/Touch), and Prashna (Interrogation/History taking).',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000013', 'Darshana (Observation), Sparshana (Palpation), and Prashna (Questioning)', true, 1, 1),
('e0000000-0000-0000-0000-000000000013', 'Asthi, Sandhi, and Majja analysis only', false, 0, 2),
('e0000000-0000-0000-0000-000000000013', 'Only recording laboratory blood tests', false, 0, 3),
('e0000000-0000-0000-0000-000000000013', 'Billing amount, insurance code, and pharmacy receipt', false, 0, 4);

-- Question 14: Clinical Documentation (Medium Scenario)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000014',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000004',
    'Scenario: While recording Panchakarma observations during Snehapana (internal oleation), what clinical endpoints (Samyak Snigdha Lakshana) must be documented in the patient chart?',
    'scenario',
    'medium',
    'Clinical Documentation',
    NULL, NULL, NULL,
    'prototype_generated',
    'Samyak Snigdha Lakshanas include Vatanulomana (flatus/bowel ease), Deeptagni (robust digestive power), Snigdha Asamhata Pureesha (unctuous loose stool), and Snehodvega (aversion to ghee).',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000014', 'Vatanulomana, Deeptagni, unctuous loose stools (Snigdha Pureesha), and aversion to fats', true, 1, 1),
('e0000000-0000-0000-0000-000000000014', 'High fever, intense dry skin, and extreme thirst only', false, 0, 2),
('e0000000-0000-0000-0000-000000000014', 'Only the time of entry without physical symptoms', false, 0, 3),
('e0000000-0000-0000-0000-000000000014', 'Documenting that no observation is necessary', false, 0, 4);

-- Question 15: Clinical Documentation (Medium MCQ)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000015',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000004',
    'Why is accurate documentation of Kala (time of drug administration, e.g. Abhakta, Pragbhakta, Samabhakta) essential in Ayurvedic prescription records?',
    'mcq',
    'medium',
    'Clinical Documentation',
    NULL, NULL, NULL,
    'prototype_generated',
    'The 10 Aushadha Sevana Kala directly modulate target Doshas and organs (e.g. Pragbhakta strengthens Apana Vata; Samabhakta targets Samana Vata).',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000015', 'Different administration timings target specific Dosha subtypes and bio-energetic channels', true, 1, 1),
('e0000000-0000-0000-0000-000000000015', 'Time of day has no impact on Ayurvedic pharmacokinetics', false, 0, 2),
('e0000000-0000-0000-0000-000000000015', 'It is solely recorded for administrative billing timestamps', false, 0, 3),
('e0000000-0000-0000-0000-000000000015', 'To force patients to take medicine exclusively at 12:00 AM', false, 0, 4);

-- Question 16: Clinical Documentation (Scenario MCQ)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000016',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000004',
    'Scenario: A patient reports an unexpected mild skin rash after starting a proprietary Ayurvedic herbal compound. What is your primary documentation responsibility under the AYUSH Pharmacovigilance framework?',
    'scenario',
    'medium',
    'Clinical Documentation',
    NULL, NULL, NULL,
    'prototype_generated',
    'Under the National Pharmacovigilance Program for AYUSH Drugs, suspected adverse reactions must be recorded with batch number, formulation details, onset timeline, and reported immediately to the supervising clinician.',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000016', 'Document the exact formulation, batch number, symptom timeline, and file a Pharmacovigilance alert with the Vaidya', true, 1, 1),
('e0000000-0000-0000-0000-000000000016', 'Ignore the rash and tell the patient that Ayurvedic medicines never have adverse effects', false, 0, 2),
('e0000000-0000-0000-0000-000000000016', 'Tear up the patient history sheet to conceal the reaction', false, 0, 3),
('e0000000-0000-0000-0000-000000000016', 'Advise the patient to post about it on social media without notifying the clinic', false, 0, 4);

-- Question 17: Professional Ethics (Easy MCQ)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000017',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000005',
    'What is the fundamental ethical mandate regarding patient health records, Prakriti findings, and personal disclosures obtained during clinical consultation?',
    'mcq',
    'easy',
    'Professional Ethics',
    NULL, NULL, NULL,
    'prototype_generated',
    'Strict patient confidentiality (Gopaniyata) is an essential legal and ethical pillar in medical practice and classical Ayurvedic ethics (Charaka Samhita Sutra 9).',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000017', 'Strict confidentiality must be maintained and shared only with authorized clinical team members', true, 1, 1),
('e0000000-0000-0000-0000-000000000017', 'Clinical details may be casually shared in public waiting rooms', false, 0, 2),
('e0000000-0000-0000-0000-000000000017', 'Records can be given to third-party commercial marketers freely', false, 0, 3),
('e0000000-0000-0000-0000-000000000017', 'Confidentiality applies only if the patient pays extra consultation fees', false, 0, 4);

-- Question 18: Professional Ethics (Medium Scenario)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000018',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000005',
    'Scenario: A patient approaches you in the pharmacy area offering extra payment if you dispense a classical Rasaushadhi (herbomineral Bhasma) formulation without a valid prescription from the registered Vaidya. What must you do?',
    'scenario',
    'medium',
    'Professional Ethics',
    NULL, NULL, NULL,
    'prototype_generated',
    'Dispensing potent Rasaushadhis without a licensed physician prescription violates professional ethics, clinical safety, and drug regulatory standards (Drugs & Cosmetics Act Schedule E1).',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000018', 'Politely and firmly refuse, explain drug safety protocols, and direct the patient to the consulting Vaidya for prescription', true, 1, 1),
('e0000000-0000-0000-0000-000000000018', 'Accept the payment and dispense the mineral formulation quietly', false, 0, 2),
('e0000000-0000-0000-0000-000000000018', 'Give double the dosage to impress the patient', false, 0, 3),
('e0000000-0000-0000-0000-000000000018', 'Suggest an unverified home recipe instead', false, 0, 4);

-- Question 19: Professional Ethics (Scenario Red Flag)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000019',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000005',
    'Scenario: While measuring vital signs of a patient awaiting Ayurvedic consultation, you observe sudden crushing substernal chest pain radiating to the left arm, diaphoresis (sweating), and severe dyspnea. What is your mandatory ethical action?',
    'scenario',
    'hard',
    'Professional Ethics',
    NULL, NULL, NULL,
    'prototype_generated',
    'Acute cardiovascular emergency (Hridroga / Acute Coronary Syndrome) requires immediate life-support escalation, emergency medical alert, and rapid hospital transfer, never delayed for routine assessment.',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000019', 'Instantly initiate emergency cardiac triage protocol, alert the senior physician, and arrange urgent emergency hospital transfer', true, 1, 1),
('e0000000-0000-0000-0000-000000000019', 'Have the patient wait for 3 hours to take routine herbal churnas', false, 0, 2),
('e0000000-0000-0000-0000-000000000019', 'Tell the patient to go for a brisk 5-kilometer walk', false, 0, 3),
('e0000000-0000-0000-0000-000000000019', 'Assume it is simple gastric gas and offer soda water', false, 0, 4);

-- Question 20: Professional Ethics (Medium MCQ)
INSERT INTO assessment_questions (id, career_role_id, competency_id, question_text, question_type, difficulty, skill_tag, competency_code, curriculum_reference, regulation_reference, source_type, explanation, weight, active)
VALUES (
    'e0000000-0000-0000-0000-000000000020',
    'c0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000005',
    'What role should an Ayurveda Clinical Assistant maintain regarding the boundaries of their clinical scope of practice?',
    'mcq',
    'medium',
    'Professional Ethics',
    NULL, NULL, NULL,
    'prototype_generated',
    'A clinical assistant provides supportive clinical care, patient education, and documentation under the direct supervision of registered Ayurvedic doctors (Vaidyas), never independently prescribing or diagnosing.',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, option_text, is_correct, score, display_order) VALUES
('e0000000-0000-0000-0000-000000000020', 'Work strictly within supportive clinical scope under registered Vaidya supervision without unauthorized independent prescribing', true, 1, 1),
('e0000000-0000-0000-0000-000000000020', 'Perform major surgical procedures independently without senior supervision', false, 0, 2),
('e0000000-0000-0000-0000-000000000020', 'Change doctor prescriptions according to personal preference', false, 0, 3),
('e0000000-0000-0000-0000-000000000020', 'Claim to be a chief surgeon when interacting with patients', false, 0, 4);

import { 
  CareerRole, 
  CareerSkill, 
  StudentProfile, 
  StudentSkill, 
  AssessmentQuestion,
  QuestionOption,
  AssessmentRecord,
  AssessmentAnswerRecord,
  AssessmentSkillScore,
  JobOpportunity,
  JobApplication,
  InstitutionStudentProfile,
  ApplicationStatus
} from "@/types/assessment";

// ==========================================
// 1. Accredited AYUSH Institutions List
// ==========================================
export const ACCREDITED_INSTITUTIONS = [
  "National Institute of Ayurveda, Jaipur",
  "All India Institute of Ayurveda, New Delhi",
  "Faculty of Ayurveda, IMS BHU, Varanasi",
  "Government Ayurveda College, Thiruvananthapuram",
  "IPGTRA, Gujarat Ayurved University, Jamnagar"
];

// ==========================================
// 2. Existing Demo Users & Organisations
// ==========================================
export const students = [
  {
    id: "STU001",
    name: "Arjun Kumar",
    email: "student@demo.com",
    password: "student123",
    course: "BAMS",
    semester: 5,
    college: "National Institute of Ayurveda, Jaipur"
  },
  {
    id: "STU002",
    name: "Ananya Nair",
    email: "ananya@demo.com",
    password: "ananya123",
    course: "BAMS",
    semester: 7,
    college: "Government Ayurveda College, Thiruvananthapuram"
  },
];

export const organizations = [
  {
    id: "ORG001",
    name: "AyurCare Wellness Hospitals",
    email: "industry@demo.com",
    password: "industry123",
    type: "Ayurvedic Hospital & Research Center",
    location: "Bengaluru, Karnataka",
    description: "Leading NABH-accredited integrated Ayurvedic healthcare and clinical trial hospital network."
  },
  {
    id: "ORG002",
    name: "Ayush Global Formulations",
    email: "ayush@demo.com",
    password: "ayush123",
    type: "Pharma & Clinical Research Organization",
    location: "New Delhi",
    description: "GMP-certified Ayurvedic pharmaceutical manufacturer with active Pharmacovigilance centers."
  },
];

// ==========================================
// 3. Multi-Role Catalog (5 Predefined Roles)
// ==========================================
export const ALL_CAREER_ROLES: CareerRole[] = [
  {
    id: "c0000000-0000-0000-0000-000000000001",
    title: "Ayurveda Clinical Assistant",
    slug: "ayurveda-clinical-assistant",
    description: "A beginner-level clinical support role for BAMS students involving patient interaction, basic clinical observation, documentation, Ayurvedic fundamentals, professional conduct, and assisting qualified practitioners.",
    sector: "AYUSH / Ayurveda Clinical Healthcare",
    required_score: 70,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "c0000000-0000-0000-0000-000000000002",
    title: "Ayurvedic Pharmacovigilance Associate",
    slug: "ayurvedic-pharmacovigilance-associate",
    description: "Specialized clinical safety role monitoring adverse drug reactions (ADRs), classical Rasaushadhi drug purity, patient safety reporting under the National Pharmacovigilance Program for AYUSH.",
    sector: "AYUSH / Pharmacovigilance & Drug Safety",
    required_score: 75,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "c0000000-0000-0000-0000-000000000003",
    title: "Panchakarma Clinical Therapist",
    slug: "panchakarma-clinical-therapist",
    description: "Hands-on specialized role managing Purva Karma (Snehana, Svedana), Pradhana Karma procedure monitoring (Vamana, Virechana, Basti), and Paschat Karma dietetics in NABH Ayurvedic centers.",
    sector: "AYUSH / Panchakarma & Therapeutics",
    required_score: 80,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "c0000000-0000-0000-0000-000000000004",
    title: "Ayurvedic Clinical Research Assistant",
    slug: "ayurvedic-clinical-research-assistant",
    description: "Research-driven role supporting clinical trial documentation, GCP-AYUSH guidelines adherence, case reporting, Rogi Pariksha standardized data logging, and scientific literature appraisal.",
    sector: "AYUSH / Clinical Research & Academia",
    required_score: 75,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "c0000000-0000-0000-0000-000000000005",
    title: "AYUSH Wellness & Lifestyle Consultant",
    slug: "ayush-wellness-lifestyle-consultant",
    description: "Preventive and promotive healthcare role guiding individuals on Prakriti assessment, Dinacharya, Ritucharya, Ahara-Vihara (diet & lifestyle) counseling, and holistic wellness protocols.",
    sector: "AYUSH / Preventive Healthcare & Wellness",
    required_score: 70,
    active: true,
    created_at: new Date().toISOString()
  }
];

export const DEFAULT_CAREER_ROLE = ALL_CAREER_ROLES[0];

// Career Skills defined for roles
export const DEFAULT_CAREER_SKILLS: CareerSkill[] = [
  {
    id: "cs-1",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    skill_name: "Ayurvedic Fundamentals",
    description: "Core understanding of Tridosha, Sapta Dhatu, Mala, Agni, and basic Ayurvedic physiology.",
    required_percentage: 80,
    required_level: 4,
    weight: 25,
    source_type: "prototype_generated"
  },
  {
    id: "cs-2",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    skill_name: "Clinical Reasoning",
    description: "Ability to interpret symptoms, recognize Ama/Agni states, and support diagnosis.",
    required_percentage: 75,
    required_level: 4,
    weight: 25,
    source_type: "prototype_generated"
  },
  {
    id: "cs-3",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    skill_name: "Patient Communication",
    description: "Effective patient rapport, empathetic history taking, and clear Pathya-Apathya explanation.",
    required_percentage: 75,
    required_level: 4,
    weight: 20,
    source_type: "prototype_generated"
  },
  {
    id: "cs-4",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    skill_name: "Clinical Documentation",
    description: "Accurate maintenance of Rogi Patrika, vital signs, Dosha charts, and treatment logs.",
    required_percentage: 70,
    required_level: 3,
    weight: 15,
    source_type: "prototype_generated"
  },
  {
    id: "cs-5",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    skill_name: "Professional Ethics",
    description: "Patient confidentiality, recognizing clinical red flags, and adherence to Vaidya supervision.",
    required_percentage: 80,
    required_level: 4,
    weight: 15,
    source_type: "prototype_generated"
  }
];

// Skills catalog for other roles
export const ROLE_SKILLS_MAP: Record<string, CareerSkill[]> = {
  "ayurveda-clinical-assistant": DEFAULT_CAREER_SKILLS,
  "ayurvedic-pharmacovigilance-associate": [
    { id: "pva-1", career_role_id: "c2", skill_name: "Pharmacovigilance Protocols", required_percentage: 85, weight: 30, source_type: "prototype_generated" },
    { id: "pva-2", career_role_id: "c2", skill_name: "Dravyaguna & Herb Identification", required_percentage: 80, weight: 25, source_type: "prototype_generated" },
    { id: "pva-3", career_role_id: "c2", skill_name: "Rasa Shastra Quality Standards", required_percentage: 75, weight: 20, source_type: "prototype_generated" },
    { id: "pva-4", career_role_id: "c2", skill_name: "Clinical Documentation", required_percentage: 80, weight: 15, source_type: "prototype_generated" },
    { id: "pva-5", career_role_id: "c2", skill_name: "Regulatory Ethics", required_percentage: 80, weight: 10, source_type: "prototype_generated" }
  ],
  "panchakarma-clinical-therapist": [
    { id: "pkt-1", career_role_id: "c3", skill_name: "Panchakarma Procedure Monitoring", required_percentage: 85, weight: 35, source_type: "prototype_generated" },
    { id: "pkt-2", career_role_id: "c3", skill_name: "Snehana & Svedana Protocols", required_percentage: 80, weight: 25, source_type: "prototype_generated" },
    { id: "pkt-3", career_role_id: "c3", skill_name: "Clinical Reasoning", required_percentage: 75, weight: 20, source_type: "prototype_generated" },
    { id: "pkt-4", career_role_id: "c3", skill_name: "Patient Communication", required_percentage: 75, weight: 10, source_type: "prototype_generated" },
    { id: "pkt-5", career_role_id: "c3", skill_name: "Clinical Documentation", required_percentage: 70, weight: 10, source_type: "prototype_generated" }
  ],
  "ayurvedic-clinical-research-assistant": [
    { id: "cra-1", career_role_id: "c4", skill_name: "Clinical Trial Documentation", required_percentage: 80, weight: 30, source_type: "prototype_generated" },
    { id: "cra-2", career_role_id: "c4", skill_name: "Roga Nidana & Diagnostics", required_percentage: 75, weight: 25, source_type: "prototype_generated" },
    { id: "cra-3", career_role_id: "c4", skill_name: "Research Methodology & Biostatistics", required_percentage: 70, weight: 20, source_type: "prototype_generated" },
    { id: "cra-4", career_role_id: "c4", skill_name: "Ayurvedic Fundamentals", required_percentage: 80, weight: 15, source_type: "prototype_generated" },
    { id: "cra-5", career_role_id: "c4", skill_name: "Professional Ethics", required_percentage: 85, weight: 10, source_type: "prototype_generated" }
  ],
  "ayush-wellness-lifestyle-consultant": [
    { id: "wlc-1", career_role_id: "c5", skill_name: "Prakriti Assessment", required_percentage: 80, weight: 30, source_type: "prototype_generated" },
    { id: "wlc-2", career_role_id: "c5", skill_name: "Dietetics & Ahara-Vihara", required_percentage: 75, weight: 25, source_type: "prototype_generated" },
    { id: "wlc-3", career_role_id: "c5", skill_name: "Patient Communication", required_percentage: 85, weight: 25, source_type: "prototype_generated" },
    { id: "wlc-4", career_role_id: "c5", skill_name: "Ayurvedic Fundamentals", required_percentage: 75, weight: 10, source_type: "prototype_generated" },
    { id: "wlc-5", career_role_id: "c5", skill_name: "Professional Ethics", required_percentage: 75, weight: 10, source_type: "prototype_generated" }
  ]
};

// Default Student Profile
export const DEFAULT_STUDENT: StudentProfile = {
  id: "a0000000-0000-0000-0000-000000000001",
  full_name: "Aarav Sharma",
  email: "aarav.sharma@ayush.edu.in",
  college: "National Institute of Ayurveda, Jaipur",
  course: "BAMS",
  semester: 6,
  created_at: new Date().toISOString()
};

// Default Student Baseline Skills
export const DEFAULT_STUDENT_SKILLS: StudentSkill[] = [
  {
    id: "ss-1",
    student_id: DEFAULT_STUDENT.id,
    skill_name: "Ayurvedic Fundamentals",
    proficiency_level: 4,
    source: "self_reported"
  },
  {
    id: "ss-2",
    student_id: DEFAULT_STUDENT.id,
    skill_name: "Clinical Reasoning",
    proficiency_level: 3,
    source: "self_reported"
  },
  {
    id: "ss-3",
    student_id: DEFAULT_STUDENT.id,
    skill_name: "Patient Communication",
    proficiency_level: 4,
    source: "self_reported"
  },
  {
    id: "ss-4",
    student_id: DEFAULT_STUDENT.id,
    skill_name: "Clinical Documentation",
    proficiency_level: 3,
    source: "self_reported"
  },
  {
    id: "ss-5",
    student_id: DEFAULT_STUDENT.id,
    skill_name: "Professional Ethics",
    proficiency_level: 4,
    source: "self_reported"
  }
];

// ==========================================
// 4. Questions with Options and Server Answer Keys
// ==========================================
export const DEFAULT_QUESTIONS: (AssessmentQuestion & { options: QuestionOption[] })[] = [
  {
    id: "e0000000-0000-0000-0000-000000000001",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "Which Dosha is predominantly characterized by the inherent Gunas (qualities) of Ruksha (dry), Sheeta (cold), Laghu (light), and Chala (mobile)?",
    question_type: "mcq",
    difficulty: "easy",
    skill_tag: "Ayurvedic Fundamentals",
    source_type: "prototype_generated",
    explanation: "According to classical Ashtanga Hridaya (Sutra 1/11), 'Tatra ruksho laghu sheetah khara sukshmoshchalo anilah' describes the attributes of Vata Dosha.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-1-1", question_id: "e0000000-0000-0000-0000-000000000001", option_text: "Pitta Dosha", is_correct: false, score: 0, display_order: 1 },
      { id: "opt-1-2", question_id: "e0000000-0000-0000-0000-000000000001", option_text: "Vata Dosha", is_correct: true, score: 1, display_order: 2 },
      { id: "opt-1-3", question_id: "e0000000-0000-0000-0000-000000000001", option_text: "Kapha Dosha", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-1-4", question_id: "e0000000-0000-0000-0000-000000000001", option_text: "Rakta Dhatu", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000002",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "In Ayurvedic physiological transformation (Dhatu Poshana), what is the primary function of Pachaka Pitta?",
    question_type: "mcq",
    difficulty: "medium",
    skill_tag: "Ayurvedic Fundamentals",
    source_type: "prototype_generated",
    explanation: "Pachaka Pitta resides in the Amashaya-Pakvashaya Madhyastha responsible for Ahara Pachana (digestion) and Sara-Kitta Vibhajana (nutrient-waste separation).",
    weight: 1,
    active: true,
    options: [
      { id: "opt-2-1", question_id: "e0000000-0000-0000-0000-000000000002", option_text: "Digestion of food and separation of Sara (nutrients) and Kitta (waste)", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-2-2", question_id: "e0000000-0000-0000-0000-000000000002", option_text: "Vision and visual perception (Alochaka)", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-2-3", question_id: "e0000000-0000-0000-0000-000000000002", option_text: "Complexion and skin luster (Bhrajaka)", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-2-4", question_id: "e0000000-0000-0000-0000-000000000002", option_text: "Emotional processing and mental courage (Sadhaka)", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000003",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "Scenario: A 32-year-old patient presents with symptoms of Vidaha (sour belching), Trishna (excessive thirst), Ushnata (elevated body heat sensation), and loose stools during Sharad Ritu. Which Dosha imbalance is most prominently indicated?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Ayurvedic Fundamentals",
    source_type: "prototype_generated",
    explanation: "Sharad Ritu is the natural Prakopa (aggravation) period of Pitta Dosha, characterized by burning sensation, excessive thirst, and sour belching.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-3-1", question_id: "e0000000-0000-0000-0000-000000000003", option_text: "Pitta Prakopa (Aggravated Pitta)", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-3-2", question_id: "e0000000-0000-0000-0000-000000000003", option_text: "Vata Sanchaya (Accumulated Vata)", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-3-3", question_id: "e0000000-0000-0000-0000-000000000003", option_text: "Kapha Prakopa (Aggravated Kapha)", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-3-4", question_id: "e0000000-0000-0000-0000-000000000003", option_text: "Pure Majja Kshaya", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000004",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "What is the correct sequential order of the Sapta Dhatus (seven bodily tissues) as described in classical Ayurvedic Dhatu Utpatti Krama?",
    question_type: "mcq",
    difficulty: "easy",
    skill_tag: "Ayurvedic Fundamentals",
    source_type: "prototype_generated",
    explanation: "The classical sequence of Dhatu nourishment is: Rasa -> Rakta -> Mamsa -> Meda -> Asthi -> Majja -> Shukra.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-4-1", question_id: "e0000000-0000-0000-0000-000000000004", option_text: "Rasa -> Rakta -> Mamsa -> Meda -> Asthi -> Majja -> Shukra", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-4-2", question_id: "e0000000-0000-0000-0000-000000000004", option_text: "Rakta -> Rasa -> Meda -> Mamsa -> Majja -> Asthi -> Shukra", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-4-3", question_id: "e0000000-0000-0000-0000-000000000004", option_text: "Rasa -> Mamsa -> Rakta -> Asthi -> Meda -> Shukra -> Majja", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-4-4", question_id: "e0000000-0000-0000-0000-000000000004", option_text: "Meda -> Rasa -> Rakta -> Mamsa -> Asthi -> Majja -> Ojas", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000005",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "In Yogaratnakara Ashtavidha Pariksha (eightfold clinical examination), which examination is traditionally placed first as a key vital appraisal?",
    question_type: "mcq",
    difficulty: "easy",
    skill_tag: "Clinical Reasoning",
    source_type: "prototype_generated",
    explanation: "Ashtavidha Pariksha begins with Nadi (Pulse) examination ('Nadi Mutram Malam Jihva Shabda Sparsha Drik Akritih').",
    weight: 1,
    active: true,
    options: [
      { id: "opt-5-1", question_id: "e0000000-0000-0000-0000-000000000005", option_text: "Nadi Pariksha (Pulse examination)", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-5-2", question_id: "e0000000-0000-0000-0000-000000000005", option_text: "Mala Pariksha (Stool examination)", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-5-3", question_id: "e0000000-0000-0000-0000-000000000005", option_text: "Akriti Pariksha (General appearance)", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-5-4", question_id: "e0000000-0000-0000-0000-000000000005", option_text: "Shabda Pariksha (Voice/Sound examination)", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000006",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "Scenario: A patient in the outpatient ward complains of profound heaviness (Gaurava), thick white coating on the tongue, lack of appetite (Aruchi), and sluggish digestion. As a clinical assistant, what should you recognize as the underlying pathophysiology?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Clinical Reasoning",
    source_type: "prototype_generated",
    explanation: "The triad of heaviness, coated tongue (Liptyata), and loss of taste/appetite indicates Sama Avastha (presence of toxic undigested metabolic byproduct - Ama with Mandagni).",
    weight: 1,
    active: true,
    options: [
      { id: "opt-6-1", question_id: "e0000000-0000-0000-0000-000000000006", option_text: "Sama Avastha (Presence of Ama due to Mandagni)", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-6-2", question_id: "e0000000-0000-0000-0000-000000000006", option_text: "Nirama Vataja Kshaya requiring heavy Rasayana", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-6-3", question_id: "e0000000-0000-0000-0000-000000000006", option_text: "Teekshnagni with accelerated hyper-metabolism", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-6-4", question_id: "e0000000-0000-0000-0000-000000000006", option_text: "Immediate need for high-calorie Ghrita intake", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000007",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "Which clinical distinction best differentiates a Vataja Shirashoola (headache) from a Pittaja Shirashoola?",
    question_type: "mcq",
    difficulty: "medium",
    skill_tag: "Clinical Reasoning",
    source_type: "prototype_generated",
    explanation: "Vataja Shirashoola manifests with throbbing/splitting pain relieved by warmth (Ushnopashaya) and pressure, whereas Pittaja Shirashoola manifests with burning sensation, red eyes, and relief from cooling applications (Sheetopashaya).",
    weight: 1,
    active: true,
    options: [
      { id: "opt-7-1", question_id: "e0000000-0000-0000-0000-000000000007", option_text: "Vataja is throbbing & relieved by warmth; Pittaja has burning sensation & is relieved by cold", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-7-2", question_id: "e0000000-0000-0000-0000-000000000007", option_text: "Vataja has intense burning; Pittaja produces cold numbness", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-7-3", question_id: "e0000000-0000-0000-0000-000000000007", option_text: "Vataja occurs solely at noon; Pittaja occurs only in midnight cold", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-7-4", question_id: "e0000000-0000-0000-0000-000000000007", option_text: "There is no clinical difference between the two", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000008",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "Scenario: A patient with acute high fever (Taruna Jwara of 2 days duration) and severe indigestion requests an immediate full-body oil massage (Abhyanga) and medicated ghee. Why must a clinical assistant recognize this as contraindicated?",
    question_type: "scenario",
    difficulty: "hard",
    skill_tag: "Clinical Reasoning",
    source_type: "prototype_generated",
    explanation: "In Taruna Jwara (acute fever with Ama), Snehana is strictly contraindicated as it blocks Srotas further and intensifies Ama Jwara ('Navajware snehapanam vishavat'). Langhana and Pachana are indicated first.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-8-1", question_id: "e0000000-0000-0000-0000-000000000008", option_text: "Snehana in Taruna Jwara acts like poison by aggravating Ama and blocking micro-channels (Srotas)", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-8-2", question_id: "e0000000-0000-0000-0000-000000000008", option_text: "Abhyanga immediately cures acute fever within 1 hour", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-8-3", question_id: "e0000000-0000-0000-0000-000000000008", option_text: "Medicated ghee should only be given with cold ice water", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-8-4", question_id: "e0000000-0000-0000-0000-000000000008", option_text: "It is not contraindicated and should always be administered immediately", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000009",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "Scenario: A newly diagnosed patient with Vata imbalance is overwhelmed by a lengthy dietary prescription (Pathya-Apathya). What is the most effective communication approach for the clinical assistant?",
    question_type: "scenario",
    difficulty: "easy",
    skill_tag: "Patient Communication",
    source_type: "prototype_generated",
    explanation: "Effective patient-centric communication involves breaking complex dietary guidelines into 2-3 prioritized daily steps with warm, empathetic validation and clear written takeaways.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-9-1", question_id: "e0000000-0000-0000-0000-000000000009", option_text: "Highlight 2-3 key practical dietary shifts first, provide a clear simple handout, and encourage questions", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-9-2", question_id: "e0000000-0000-0000-0000-000000000009", option_text: "Insist the patient memorize all 30 Sanskrit dietary terms on the spot", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-9-3", question_id: "e0000000-0000-0000-0000-000000000009", option_text: "Tell the patient diet is unimportant if they take classical tablets", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-9-4", question_id: "e0000000-0000-0000-0000-000000000009", option_text: "Scold the patient for showing anxiety about their lifestyle habits", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000010",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "Scenario: A geriatric patient finds the taste of an essential decoction (Tikta Kashaya) intolerable and stops drinking it. How should you counsel the patient while upholding clinical protocol?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Patient Communication",
    source_type: "prototype_generated",
    explanation: "Empathetic counseling explores suitable approved Anupana or drinking techniques, while consulting the supervising Vaidya if dosage form modification is required.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-10-1", question_id: "e0000000-0000-0000-0000-000000000010", option_text: "Acknowledge the difficulty, explain the therapeutic rationale, and consult the senior Vaidya for approved Anupana adjustments", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-10-2", question_id: "e0000000-0000-0000-0000-000000000010", option_text: "Secretly replace the decoction with sugary syrup without doctor knowledge", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-10-3", question_id: "e0000000-0000-0000-0000-000000000010", option_text: "Dismiss the patient concerns and threaten discharge for non-compliance", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-10-4", question_id: "e0000000-0000-0000-0000-000000000010", option_text: "Advise them to completely discontinue all Ayurvedic treatment", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000011",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "When explaining Dinacharya (daily health routine) to a working professional, which communication principles foster sustainable behavioral compliance?",
    question_type: "mcq",
    difficulty: "medium",
    skill_tag: "Patient Communication",
    source_type: "prototype_generated",
    explanation: "Sustainable compliance is achieved through empathetic goal setting, gradual implementation (Padamshika Krama), and linking habits to their specific daily work schedule.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-11-1", question_id: "e0000000-0000-0000-0000-000000000011", option_text: "Gradual incremental adaptation (Padamshika Krama) tailored to their daily work schedule", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-11-2", question_id: "e0000000-0000-0000-0000-000000000011", option_text: "Demanding instant 100% lifestyle upheaval on day one", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-11-3", question_id: "e0000000-0000-0000-0000-000000000011", option_text: "Refusing to listen to their work-hour constraints", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-11-4", question_id: "e0000000-0000-0000-0000-000000000011", option_text: "Using obscure terminology without practical examples", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000012",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "Scenario: A patient asks whether they should immediately stop their prescribed modern antihypertensive pills upon starting Ayurvedic Guggulu formulations. What is your correct communication response?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Patient Communication",
    source_type: "prototype_generated",
    explanation: "A clinical assistant must never advise abrupt cessation of essential allopathic medications; they must clearly instruct continued adherence while facilitating a comprehensive joint consultation with the senior physician.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-12-1", question_id: "e0000000-0000-0000-0000-000000000012", option_text: "Never stop prescribed medication abruptly; instruct continued use and arrange physician consultation for integrative monitoring", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-12-2", question_id: "e0000000-0000-0000-0000-000000000012", option_text: "Tell them to discard all modern medications immediately without doctor consent", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-12-3", question_id: "e0000000-0000-0000-0000-000000000012", option_text: "Double both the allopathic and Ayurvedic dosages without telling the physician", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-12-4", question_id: "e0000000-0000-0000-0000-000000000012", option_text: "Dismiss the question as irrelevant to clinical practice", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000013",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "What are the three fundamental pillars of classical Ayurvedic examination required in every standard Rogi Pariksha case record?",
    question_type: "mcq",
    difficulty: "easy",
    skill_tag: "Clinical Documentation",
    source_type: "prototype_generated",
    explanation: "Trividha Pariksha (Charaka) consists of Darshana (Inspection/Observation), Sparshana (Palpation/Touch), and Prashna (Interrogation/History taking).",
    weight: 1,
    active: true,
    options: [
      { id: "opt-13-1", question_id: "e0000000-0000-0000-0000-000000000013", option_text: "Darshana (Observation), Sparshana (Palpation), and Prashna (Questioning)", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-13-2", question_id: "e0000000-0000-0000-0000-000000000013", option_text: "Asthi, Sandhi, and Majja analysis only", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-13-3", question_id: "e0000000-0000-0000-0000-000000000013", option_text: "Only recording laboratory blood tests", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-13-4", question_id: "e0000000-0000-0000-0000-000000000013", option_text: "Billing amount, insurance code, and pharmacy receipt", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000014",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "Scenario: While recording Panchakarma observations during Snehapana (internal oleation), what clinical endpoints (Samyak Snigdha Lakshana) must be documented in the patient chart?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Clinical Documentation",
    source_type: "prototype_generated",
    explanation: "Samyak Snigdha Lakshanas include Vatanulomana (flatus/bowel ease), Deeptagni (robust digestive power), Snigdha Asamhata Pureesha (unctuous loose stool), and Snehodvega (aversion to ghee).",
    weight: 1,
    active: true,
    options: [
      { id: "opt-14-1", question_id: "e0000000-0000-0000-0000-000000000014", option_text: "Vatanulomana, Deeptagni, unctuous loose stools (Snigdha Pureesha), and aversion to fats", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-14-2", question_id: "e0000000-0000-0000-0000-000000000014", option_text: "High fever, intense dry skin, and extreme thirst only", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-14-3", question_id: "e0000000-0000-0000-0000-000000000014", option_text: "Only the time of entry without physical symptoms", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-14-4", question_id: "e0000000-0000-0000-0000-000000000014", option_text: "Documenting that no observation is necessary", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000015",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "Why is accurate documentation of Kala (time of drug administration, e.g. Abhakta, Pragbhakta, Samabhakta) essential in Ayurvedic prescription records?",
    question_type: "mcq",
    difficulty: "medium",
    skill_tag: "Clinical Documentation",
    source_type: "prototype_generated",
    explanation: "The 10 Aushadha Sevana Kala directly modulate target Doshas and organs (e.g. Pragbhakta strengthens Apana Vata; Samabhakta targets Samana Vata).",
    weight: 1,
    active: true,
    options: [
      { id: "opt-15-1", question_id: "e0000000-0000-0000-0000-000000000015", option_text: "Different administration timings target specific Dosha subtypes and bio-energetic channels", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-15-2", question_id: "e0000000-0000-0000-0000-000000000015", option_text: "Time of day has no impact on Ayurvedic pharmacokinetics", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-15-3", question_id: "e0000000-0000-0000-0000-000000000015", option_text: "It is solely recorded for administrative billing timestamps", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-15-4", question_id: "e0000000-0000-0000-0000-000000000015", option_text: "To force patients to take medicine exclusively at 12:00 AM", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000016",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "Scenario: A patient reports an unexpected mild skin rash after starting a proprietary Ayurvedic herbal compound. What is your primary documentation responsibility under the AYUSH Pharmacovigilance framework?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Clinical Documentation",
    source_type: "prototype_generated",
    explanation: "Under the National Pharmacovigilance Program for AYUSH Drugs, suspected adverse reactions must be recorded with batch number, formulation details, onset timeline, and reported immediately to the supervising clinician.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-16-1", question_id: "e0000000-0000-0000-0000-000000000016", option_text: "Document the exact formulation, batch number, symptom timeline, and file a Pharmacovigilance alert with the Vaidya", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-16-2", question_id: "e0000000-0000-0000-0000-000000000016", option_text: "Ignore the rash and tell the patient that Ayurvedic medicines never have adverse effects", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-16-3", question_id: "e0000000-0000-0000-0000-000000000016", option_text: "Tear up the patient history sheet to conceal the reaction", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-16-4", question_id: "e0000000-0000-0000-0000-000000000016", option_text: "Advise the patient to post about it on social media without notifying the clinic", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000017",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "What is the fundamental ethical mandate regarding patient health records, Prakriti findings, and personal disclosures obtained during clinical consultation?",
    question_type: "mcq",
    difficulty: "easy",
    skill_tag: "Professional Ethics",
    source_type: "prototype_generated",
    explanation: "Strict patient confidentiality (Gopaniyata) is an essential legal and ethical pillar in medical practice and classical Ayurvedic ethics (Charaka Samhita Sutra 9).",
    weight: 1,
    active: true,
    options: [
      { id: "opt-17-1", question_id: "e0000000-0000-0000-0000-000000000017", option_text: "Strict confidentiality must be maintained and shared only with authorized clinical team members", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-17-2", question_id: "e0000000-0000-0000-0000-000000000017", option_text: "Clinical details may be casually shared in public waiting rooms", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-17-3", question_id: "e0000000-0000-0000-0000-000000000017", option_text: "Records can be given to third-party commercial marketers freely", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-17-4", question_id: "e0000000-0000-0000-0000-000000000017", option_text: "Confidentiality applies only if the patient pays extra consultation fees", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000018",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "Scenario: A patient approaches you in the pharmacy area offering extra payment if you dispense a classical Rasaushadhi (herbomineral Bhasma) formulation without a valid prescription from the registered Vaidya. What must you do?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Professional Ethics",
    source_type: "prototype_generated",
    explanation: "Dispensing potent Rasaushadhis without a licensed physician prescription violates professional ethics, clinical safety, and drug regulatory standards (Drugs & Cosmetics Act Schedule E1).",
    weight: 1,
    active: true,
    options: [
      { id: "opt-18-1", question_id: "e0000000-0000-0000-0000-000000000018", option_text: "Politely and firmly refuse, explain drug safety protocols, and direct the patient to the consulting Vaidya for prescription", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-18-2", question_id: "e0000000-0000-0000-0000-000000000018", option_text: "Accept the payment and dispense the mineral formulation quietly", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-18-3", question_id: "e0000000-0000-0000-0000-000000000018", option_text: "Give double the dosage to impress the patient", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-18-4", question_id: "e0000000-0000-0000-0000-000000000018", option_text: "Suggest an unverified home recipe instead", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000019",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "Scenario: While measuring vital signs of a patient awaiting Ayurvedic consultation, you observe sudden crushing substernal chest pain radiating to the left arm, diaphoresis (sweating), and severe dyspnea. What is your mandatory ethical action?",
    question_type: "scenario",
    difficulty: "hard",
    skill_tag: "Professional Ethics",
    source_type: "prototype_generated",
    explanation: "Acute cardiovascular emergency (Hridroga / Acute Coronary Syndrome) requires immediate life-support escalation, emergency medical alert, and rapid hospital transfer, never delayed for routine assessment.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-19-1", question_id: "e0000000-0000-0000-0000-000000000019", option_text: "Instantly initiate emergency cardiac triage protocol, alert the senior physician, and arrange urgent emergency hospital transfer", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-19-2", question_id: "e0000000-0000-0000-0000-000000000019", option_text: "Have the patient wait for 3 hours to take routine herbal churnas", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-19-3", question_id: "e0000000-0000-0000-0000-000000000019", option_text: "Tell the patient to go for a brisk 5-kilometer walk", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-19-4", question_id: "e0000000-0000-0000-0000-000000000019", option_text: "Assume it is simple gastric gas and offer soda water", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000020",
    career_role_id: DEFAULT_CAREER_ROLE.id,
    question_text: "What role should an Ayurveda Clinical Assistant maintain regarding the boundaries of their clinical scope of practice?",
    question_type: "mcq",
    difficulty: "medium",
    skill_tag: "Professional Ethics",
    source_type: "prototype_generated",
    explanation: "A clinical assistant provides supportive clinical care, patient education, and documentation under the direct supervision of registered Ayurvedic doctors (Vaidyas), never independently prescribing or diagnosing.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-20-1", question_id: "e0000000-0000-0000-0000-000000000020", option_text: "Work strictly within supportive clinical scope under registered Vaidya supervision without unauthorized independent prescribing", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-20-2", question_id: "e0000000-0000-0000-0000-000000000020", option_text: "Perform major surgical procedures independently without senior supervision", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-20-3", question_id: "e0000000-0000-0000-0000-000000000020", option_text: "Change doctor prescriptions according to personal preference", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-20-4", question_id: "e0000000-0000-0000-0000-000000000020", option_text: "Claim to be a chief surgeon when interacting with patients", is_correct: false, score: 0, display_order: 4 }
    ]
  }
];

// ==========================================
// 4b. Role-Specific Questions: Pharmacovigilance Associate
// ==========================================
export const QUESTIONS_PHARMACOVIGILANCE: (AssessmentQuestion & { options: QuestionOption[] })[] = [
  {
    id: "e0000000-0000-0000-0000-000000000101",
    career_role_id: "c0000000-0000-0000-0000-000000000002",
    question_text: "Under the National Pharmacovigilance Program for AYUSH (NPvA), which criteria classifies a reported event as a 'Serious Adverse Event' (SAE)?",
    question_type: "mcq",
    difficulty: "medium",
    skill_tag: "Pharmacovigilance Protocols",
    source_type: "prototype_generated",
    explanation: "According to WHO-UMC and NPvA standards, an SAE includes events resulting in patient death, life-threatening conditions, inpatient hospitalization, persistent disability, or birth defect.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pva-1-1", question_id: "e0000000-0000-0000-0000-000000000101", option_text: "Death, life-threatening event, inpatient hospitalization, or persistent disability", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pva-1-2", question_id: "e0000000-0000-0000-0000-000000000101", option_text: "Mild transient bitter aftertaste after consuming Kwatha", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pva-1-3", question_id: "e0000000-0000-0000-0000-000000000101", option_text: "Patient preference for tablet form over herbal syrup", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pva-1-4", question_id: "e0000000-0000-0000-0000-000000000101", option_text: "Late delivery of medicines by courier services", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000102",
    career_role_id: "c0000000-0000-0000-0000-000000000002",
    question_text: "Scenario: A 45-year-old patient taking an Ayurvedic Rasa formulation for 3 weeks develops unexplained jaundice with elevated hepatic transaminases. Under WHO-UMC causality assessment, what is the mandatory immediate step for the ADR associate?",
    question_type: "scenario",
    difficulty: "hard",
    skill_tag: "Pharmacovigilance Protocols",
    source_type: "prototype_generated",
    explanation: "Causality assessment requires establishing temporal relationship, assessing de-challenge (cessation of drug), recording exact batch numbers, and verifying hepatic biomarkers.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pva-2-1", question_id: "e0000000-0000-0000-0000-000000000102", option_text: "Verify de-challenge response upon drug cessation, record batch details, and check temporal relationship with symptom onset", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pva-2-2", question_id: "e0000000-0000-0000-0000-000000000102", option_text: "Ignore the liver enzymes because classical Ayurvedic preparations can never cause adverse reactions", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pva-2-3", question_id: "e0000000-0000-0000-0000-000000000102", option_text: "Advise doubling the daily dosage to overwhelm the reaction", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pva-2-4", question_id: "e0000000-0000-0000-0000-000000000102", option_text: "Discard the patient's record without notifying the supervising pharmacologist", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000103",
    career_role_id: "c0000000-0000-0000-0000-000000000002",
    question_text: "Under Schedule E(1) of the Drugs & Cosmetics Rules 1945, which of the following is classified as a poisonous botanical requiring mandatory warning labeling and verified Shodhana (purification)?",
    question_type: "mcq",
    difficulty: "medium",
    skill_tag: "Dravyaguna & Herb Identification",
    source_type: "prototype_generated",
    explanation: "Vatsanabha (Aconitum ferox) contains toxic aconitine alkaloids and is legally listed under Schedule E(1), requiring specific Shodhana (e.g. processing in Gomutra/Godugdha) before clinical use.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pva-3-1", question_id: "e0000000-0000-0000-0000-000000000103", option_text: "Vatsanabha (Aconitum ferox)", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pva-3-2", question_id: "e0000000-0000-0000-0000-000000000103", option_text: "Amalaki (Phyllanthus emblica)", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pva-3-3", question_id: "e0000000-0000-0000-0000-000000000103", option_text: "Shatavari (Asparagus racemosus)", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pva-3-4", question_id: "e0000000-0000-0000-0000-000000000103", option_text: "Haritaki (Terminalia chebula)", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000104",
    career_role_id: "c0000000-0000-0000-0000-000000000002",
    question_text: "Which botanical bark is commonly substituted or adulterated for genuine Ashoka bark (Saraca asoca) in commercial marketplaces?",
    question_type: "mcq",
    difficulty: "medium",
    skill_tag: "Dravyaguna & Herb Identification",
    source_type: "prototype_generated",
    explanation: "Polyalthia longifolia (False Ashoka / Mast Tree) is the most frequent commercial adulterant for genuine Saraca asoca and lacks genuine oxytocic and astringent therapeutic fractions.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pva-4-1", question_id: "e0000000-0000-0000-0000-000000000104", option_text: "Polyalthia longifolia (False Ashoka)", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pva-4-2", question_id: "e0000000-0000-0000-0000-000000000104", option_text: "Terminalia arjuna", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pva-4-3", question_id: "e0000000-0000-0000-0000-000000000104", option_text: "Glycyrrhiza glabra", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pva-4-4", question_id: "e0000000-0000-0000-0000-000000000104", option_text: "Cinnamomum tamala", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000105",
    career_role_id: "c0000000-0000-0000-0000-000000000002",
    question_text: "In classical Bhasma quality testing (Bhasma Pariksha), what physical characteristic does the 'Varitara' test demonstrate?",
    question_type: "mcq",
    difficulty: "easy",
    skill_tag: "Rasa Shastra Quality Standards",
    source_type: "prototype_generated",
    explanation: "Varitara confirms sub-micron micro-fineness (Laghu Guna) where the Bhasma floats steadily on the surface tension of water, confirming thorough Marana incineration.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pva-5-1", question_id: "e0000000-0000-0000-0000-000000000105", option_text: "Extreme particle fineness and lightness, allowing the Bhasma to float on the surface of calm water", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pva-5-2", question_id: "e0000000-0000-0000-0000-000000000105", option_text: "Instant dissolution with sparkling light in warm milk", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pva-5-3", question_id: "e0000000-0000-0000-0000-000000000105", option_text: "Ability of the mineral to reform into a solid metallic pellet upon heating", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pva-5-4", question_id: "e0000000-0000-0000-0000-000000000105", option_text: "Change of color from red to fluorescent yellow in sunlight", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000106",
    career_role_id: "c0000000-0000-0000-0000-000000000002",
    question_text: "What does the classical 'Rekhapurnatva' test verify when assessing a mineral or metallic Bhasma preparation?",
    question_type: "mcq",
    difficulty: "medium",
    skill_tag: "Rasa Shastra Quality Standards",
    source_type: "prototype_generated",
    explanation: "Rekhapurnatva verifies that particles are small enough to enter and fill the micro-ridges of epidermal fingerprint furrows without tactile grittiness.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pva-6-1", question_id: "e0000000-0000-0000-0000-000000000106", option_text: "Particles are fine enough to seamlessly enter and fill the micro-ridges of finger creases without grittiness", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pva-6-2", question_id: "e0000000-0000-0000-0000-000000000106", option_text: "The preparation creates an indelible black line on glazed porcelain", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pva-6-3", question_id: "e0000000-0000-0000-0000-000000000106", option_text: "The compound is completely insoluble in any organic acid", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pva-6-4", question_id: "e0000000-0000-0000-0000-000000000106", option_text: "Total absence of any chemical ash upon complete combustion", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000107",
    career_role_id: "c0000000-0000-0000-0000-000000000002",
    question_text: "Scenario: A Peripheral Pharmacovigilance Centre (PPvCC) documents an acute allergic reaction to an ASU formulation. Which dataset is mandatory on the standard ASU Adverse Drug Reaction form?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Clinical Documentation",
    source_type: "prototype_generated",
    explanation: "Product traceability (trade and generic name, batch number, manufacturer, expiry), timeline of administration, and objective clinical presentation are mandatory on the standard reporting form.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pva-7-1", question_id: "e0000000-0000-0000-0000-000000000107", option_text: "Patient demographics, product name, batch/lot number, manufacturer, date of onset, and concomitant therapies", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pva-7-2", question_id: "e0000000-0000-0000-0000-000000000107", option_text: "Retail sales invoice and store manager's home address only", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pva-7-3", question_id: "e0000000-0000-0000-0000-000000000107", option_text: "Subjective horoscope compatibility between doctor and patient", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pva-7-4", question_id: "e0000000-0000-0000-0000-000000000107", option_text: "The patient's social media follower count", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000108",
    career_role_id: "c0000000-0000-0000-0000-000000000002",
    question_text: "What is the mandatory expedited reporting timeline to the National Pharmacovigilance Centre for serious, unexpected, or fatal ADRs?",
    question_type: "mcq",
    difficulty: "hard",
    skill_tag: "Clinical Documentation",
    source_type: "prototype_generated",
    explanation: "National Pharmacovigilance regulatory standards mandate expedited reporting of serious unexpected adverse events within 15 calendar days (with immediate notification within 7 days for fatal/life-threatening cases).",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pva-8-1", question_id: "e0000000-0000-0000-0000-000000000108", option_text: "Within 15 calendar days of receipt of initial report (with immediate alert for fatal cases)", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pva-8-2", question_id: "e0000000-0000-0000-0000-000000000108", option_text: "Once every 3 years during factory licensing renewal", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pva-8-3", question_id: "e0000000-0000-0000-0000-000000000108", option_text: "Only after 100 identical reports are received from the same city", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pva-8-4", question_id: "e0000000-0000-0000-0000-000000000108", option_text: "Reporting is entirely optional and has no mandated timeline", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000109",
    career_role_id: "c0000000-0000-0000-0000-000000000002",
    question_text: "Under Schedule T of the Drugs and Cosmetics Act, which statutory requirement is legally mandated for licensed Ayurvedic drug manufacturing units?",
    question_type: "mcq",
    difficulty: "medium",
    skill_tag: "Regulatory Ethics",
    source_type: "prototype_generated",
    explanation: "Schedule T establishes mandatory Good Manufacturing Practices (GMP) for ASU drugs, governing raw material testing, reference standards, sanitary infrastructure, and quality control batch records.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pva-9-1", question_id: "e0000000-0000-0000-0000-000000000109", option_text: "Compliance with Good Manufacturing Practices (GMP) including raw material testing, reference standards, and batch records", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pva-9-2", question_id: "e0000000-0000-0000-0000-000000000109", option_text: "Exemption from heavy metal testing if the formulation is older than 500 years", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pva-9-3", question_id: "e0000000-0000-0000-0000-000000000109", option_text: "Authority to alter herbal composition without updating package labels", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pva-9-4", question_id: "e0000000-0000-0000-0000-000000000109", option_text: "Free distribution of samples without keeping manufacturing records", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000110",
    career_role_id: "c0000000-0000-0000-0000-000000000002",
    question_text: "Scenario: A commercial ASU drug manufacturer offers research sponsorship to your Pharmacovigilance unit with an informal agreement to suppress adverse reaction reports concerning their branded formulation. What is your ethical obligation?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Regulatory Ethics",
    source_type: "prototype_generated",
    explanation: "Regulatory and professional ethics mandate uncompromising scientific neutrality, rejecting compromised sponsorship, and transparently submitting all validated ADR reports.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pva-10-1", question_id: "e0000000-0000-0000-0000-000000000110", option_text: "Firmly reject the conditional sponsorship, maintain regulatory independence, and report all verified ADRs objectively", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pva-10-2", question_id: "e0000000-0000-0000-0000-000000000110", option_text: "Accept the sponsorship and destroy incoming adverse event forms", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pva-10-3", question_id: "e0000000-0000-0000-0000-000000000110", option_text: "Alter clinical charts to blame patient diet rather than investigate formulation quality", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pva-10-4", question_id: "e0000000-0000-0000-0000-000000000110", option_text: "Forward the reports only to the marketing department of the company", is_correct: false, score: 0, display_order: 4 }
    ]
  }
];

// ==========================================
// 4c. Role-Specific Questions: Panchakarma Clinical Therapist
// ==========================================
export const QUESTIONS_PANCHAKARMA: (AssessmentQuestion & { options: QuestionOption[] })[] = [
  {
    id: "e0000000-0000-0000-0000-000000000201",
    career_role_id: "c0000000-0000-0000-0000-000000000003",
    question_text: "Which clinical marker classically signifies the optimal endpoint (Antiki Shuddhi) of therapeutic Vamana Karma?",
    question_type: "mcq",
    difficulty: "medium",
    skill_tag: "Panchakarma Procedure Monitoring",
    source_type: "prototype_generated",
    explanation: "According to Charaka Siddhi 1/14, 'Pitta-ante vamane' signifies that Vamana reaches its natural endpoint upon expulsion of Pitta (bile) following Kapha evacuation.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pkt-1-1", question_id: "e0000000-0000-0000-0000-000000000201", option_text: "Pittanta (vomiting concludes with expulsion of Pitta/bile following Kapha)", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pkt-1-2", question_id: "e0000000-0000-0000-0000-000000000201", option_text: "Pureeshanta (expulsion concludes with fecal matter)", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pkt-1-3", question_id: "e0000000-0000-0000-0000-000000000201", option_text: "Raktanta (expulsion of fresh blood)", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pkt-1-4", question_id: "e0000000-0000-0000-0000-000000000201", option_text: "Complete lack of any gastric expulsion after 2 hours", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000202",
    career_role_id: "c0000000-0000-0000-0000-000000000003",
    question_text: "Scenario: During Virechana Karma monitoring, a patient completes 18 bouts of purgation, reports lightness in chest and abdomen, and exhibits clear belching and normal downward flatus. How is this cleansing classified by classical Vega count?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Panchakarma Procedure Monitoring",
    source_type: "prototype_generated",
    explanation: "Classical criteria for Virechana Vegas: Avara (approx 10 Vegas), Madhyama (approx 20 Vegas), Pravara (approx 30 Vegas). 18 Vegas with lightness indicates Samyak Madhyama Shuddhi.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pkt-2-1", question_id: "e0000000-0000-0000-0000-000000000202", option_text: "Madhyama Shuddhi with optimal Samyak Lakshana (intermediate healthy cleansing)", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pkt-2-2", question_id: "e0000000-0000-0000-0000-000000000202", option_text: "Atiyoga (severe life-threatening excessive purgation requiring emergency Pichha Basti)", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pkt-2-3", question_id: "e0000000-0000-0000-0000-000000000202", option_text: "Ayoga (failed purgation requiring repeated doses of purgative medicine immediately)", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pkt-2-4", question_id: "e0000000-0000-0000-0000-000000000202", option_text: "Immediate surgical emergency", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000203",
    career_role_id: "c0000000-0000-0000-0000-000000000003",
    question_text: "What cardinal signs indicate that internal Snehapana (oleation therapy) has achieved Samyak Snigdha (optimal saturation) and must be stopped?",
    question_type: "mcq",
    difficulty: "easy",
    skill_tag: "Snehana & Svedana Protocols",
    source_type: "prototype_generated",
    explanation: "Charaka Sutra 22/38 lists 'Vatanulomyam Deeptognih Snigdho Asamhatam Varcha' — downward movement of flatus, sharp appetite, and unctuous unformed stool.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pkt-3-1", question_id: "e0000000-0000-0000-0000-000000000203", option_text: "Vatanulomana (downward flatus), Deeptagni (sharp digestive fire), and unctuous unformed stool (Snigdha-Asamhata Varcha)", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pkt-3-2", question_id: "e0000000-0000-0000-0000-000000000203", option_text: "Severe constipation, dry skin, and inability to digest water", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pkt-3-3", question_id: "e0000000-0000-0000-0000-000000000203", option_text: "Complete loss of consciousness and sudden drop in body temperature", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pkt-3-4", question_id: "e0000000-0000-0000-0000-000000000203", option_text: "Total aversion to all fluids accompanied by persistent dry cough", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000204",
    career_role_id: "c0000000-0000-0000-0000-000000000003",
    question_text: "Scenario: A 62-year-old patient with severe Osteoarthritis presents for Patra Pinda Svedana. Baseline vitals show blood pressure of 190/115 mmHg and acute high fever. What is the therapist's immediate clinical action?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Snehana & Svedana Protocols",
    source_type: "prototype_generated",
    explanation: "Severe uncontrolled hypertension and active high fever (Taruna Jvara) are absolute classical contraindications for intensive thermal Svedana; the procedure must be deferred and reported to the Vaidya.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pkt-4-1", question_id: "e0000000-0000-0000-0000-000000000204", option_text: "Defer the thermal procedure immediately, seat the patient safely, and alert the supervising Vaidya due to hypertensive crisis and acute fever", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pkt-4-2", question_id: "e0000000-0000-0000-0000-000000000204", option_text: "Apply boiling hot fomentation boluses directly to the spine to force sweating", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pkt-4-3", question_id: "e0000000-0000-0000-0000-000000000204", option_text: "Send the patient for a cold outdoor walk without recording blood pressure", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pkt-4-4", question_id: "e0000000-0000-0000-0000-000000000204", option_text: "Administer the thermal boluses twice as long to burn the fever away", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000205",
    career_role_id: "c0000000-0000-0000-0000-000000000003",
    question_text: "What is the primary therapeutic distinction between Niruha (Kashaya) Basti and Anuvasana (Sneha) Basti?",
    question_type: "mcq",
    difficulty: "easy",
    skill_tag: "Clinical Reasoning",
    source_type: "prototype_generated",
    explanation: "Niruha Basti (decoction-based) actively evacuates and cleanses morbid Doshas from the colon, whereas Anuvasana Basti (lipid-based) oleates, nourishes, and pacifies Vata.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pkt-5-1", question_id: "e0000000-0000-0000-0000-000000000205", option_text: "Niruha evacuates and cleanses morbid Doshas using decoction, while Anuvasana nourishes and pacifies Vata using medicated lipid", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pkt-5-2", question_id: "e0000000-0000-0000-0000-000000000205", option_text: "Niruha is instilled into the ears, while Anuvasana is applied over the chest", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pkt-5-3", question_id: "e0000000-0000-0000-0000-000000000205", option_text: "Anuvasana is taken orally, while Niruha is an eye drop preparation", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pkt-5-4", question_id: "e0000000-0000-0000-0000-000000000205", option_text: "Both Basti types use identical cold plain water solutions without herbs", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000206",
    career_role_id: "c0000000-0000-0000-0000-000000000003",
    question_text: "What is the expected physiological retention interval (Pratyagamana Kala) for a standard Anuvasana or Matra Basti?",
    question_type: "mcq",
    difficulty: "medium",
    skill_tag: "Clinical Reasoning",
    source_type: "prototype_generated",
    explanation: "Anuvasana Basti is designed to be retained for 1 to 3 Yamas (3 to 9 hours) or overnight, allowing intestinal absorption and therapeutic Vata pacification without causing distress.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pkt-6-1", question_id: "e0000000-0000-0000-0000-000000000206", option_text: "Usually 1 to 3 Yamas (approx 3 to 9 hours) or retained overnight without distress", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pkt-6-2", question_id: "e0000000-0000-0000-0000-000000000206", option_text: "Must be expelled within 48 seconds immediately", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pkt-6-3", question_id: "e0000000-0000-0000-0000-000000000206", option_text: "Must remain in the bowel for at least 14 days without bowel movements", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pkt-6-4", question_id: "e0000000-0000-0000-0000-000000000206", option_text: "Retention time has zero clinical significance in Panchakarma", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000207",
    career_role_id: "c0000000-0000-0000-0000-000000000003",
    question_text: "Scenario: A first-time patient receiving Shirodhara reports sudden anxiety and feeling claustrophobic when the warm oil stream starts flowing onto the Ajna Marma area. How should the Panchakarma therapist respond?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Patient Communication",
    source_type: "prototype_generated",
    explanation: "Therapeutic presence, gentle verbal reassurance, testing oil temperature on the patient's hand, ensuring eyes are comfortably shielded, and pacing slow rhythmic breathing relieves sympathetic arousal.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pkt-7-1", question_id: "e0000000-0000-0000-0000-000000000207", option_text: "Pause the stream, provide gentle verbal reassurance, verify comfort of eye shields, test oil warmth on wrist, and guide rhythmic nasal breathing", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pkt-7-2", question_id: "e0000000-0000-0000-0000-000000000207", option_text: "Tell the patient to be quiet and increase oil temperature rapidly", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pkt-7-3", question_id: "e0000000-0000-0000-0000-000000000207", option_text: "Restrain the patient forcefully to prevent them from moving", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pkt-7-4", question_id: "e0000000-0000-0000-0000-000000000207", option_text: "Walk out of the therapy room and leave the machine running unattended", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000208",
    career_role_id: "c0000000-0000-0000-0000-000000000003",
    question_text: "What rationale must the therapist communicate to a post-cleansing patient regarding the strict adherence to Samsarjana Krama (graduated dietary regimen)?",
    question_type: "mcq",
    difficulty: "easy",
    skill_tag: "Patient Communication",
    source_type: "prototype_generated",
    explanation: "Post-cleansing Agni is compared to a fragile ember; heavy foods extinguish it, while progressive liquid-to-solid gruels (Peya, Vilepi, Yusha) rekindle metabolic power systematically.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pkt-8-1", question_id: "e0000000-0000-0000-0000-000000000208", option_text: "Agni is delicate like a small flame; light liquid gruels (Peya/Vilepi) gradually rekindle metabolic fire before solid food can be digested", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pkt-8-2", question_id: "e0000000-0000-0000-0000-000000000208", option_text: "Heavy fried meals must be consumed immediately to recover the body's lost weight", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pkt-8-3", question_id: "e0000000-0000-0000-0000-000000000208", option_text: "The patient should fast completely without any water for the next 10 days", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pkt-8-4", question_id: "e0000000-0000-0000-0000-000000000208", option_text: "Dietary restrictions are arbitrary and have no impact on clinical outcome", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000209",
    career_role_id: "c0000000-0000-0000-0000-000000000003",
    question_text: "Scenario: A patient completes Pravara Shuddhi (superior cleansing) following Vamana Karma. How many Anna Kalas (meal times) must be planned and documented in the Samsarjana Krama schedule?",
    question_type: "scenario",
    difficulty: "hard",
    skill_tag: "Clinical Documentation",
    source_type: "prototype_generated",
    explanation: "According to classical guidelines: Pravara Shuddhi requires 12 Anna Kalas (spanning 7 days) of graduated Peya, Vilepi, Akrita Yusha, and Krita Yusha.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pkt-9-1", question_id: "e0000000-0000-0000-0000-000000000209", option_text: "12 Anna Kalas (spanning 7 days of structured Peya, Vilepi, Akrita and Krita Yusha)", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pkt-9-2", question_id: "e0000000-0000-0000-0000-000000000209", option_text: "1 single meal followed by unrestricted buffet food", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pkt-9-3", question_id: "e0000000-0000-0000-0000-000000000209", option_text: "Exactly 48 days of raw fruit juice", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pkt-9-4", question_id: "e0000000-0000-0000-0000-000000000209", option_text: "No documentation is required as long as the patient feels energetic", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000210",
    career_role_id: "c0000000-0000-0000-0000-000000000003",
    question_text: "Which parameters must be routinely recorded in the NABH Panchakarma Theatre Daily Procedure Log Sheet?",
    question_type: "mcq",
    difficulty: "medium",
    skill_tag: "Clinical Documentation",
    source_type: "prototype_generated",
    explanation: "NABH quality standards for Panchakarma theatre require documentation of baseline and post vitals, formulation batch number and volume, temperature, duration, Vega count, and observed adverse symptoms.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-pkt-10-1", question_id: "e0000000-0000-0000-0000-000000000210", option_text: "Pre/post vitals, medicine batch & temperature, volume infused/applied, Vega count, duration, and post-procedure response", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-pkt-10-2", question_id: "e0000000-0000-0000-0000-000000000210", option_text: "Only the patient's billing invoice and payment method", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-pkt-10-3", question_id: "e0000000-0000-0000-0000-000000000210", option_text: "The therapist's personal signatures without any clinical details", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-pkt-10-4", question_id: "e0000000-0000-0000-0000-000000000210", option_text: "Only the ambient room humidity and temperature", is_correct: false, score: 0, display_order: 4 }
    ]
  }
];

// ==========================================
// 4d. Role-Specific Questions: Clinical Research Assistant
// ==========================================
export const QUESTIONS_RESEARCH_ASSISTANT: (AssessmentQuestion & { options: QuestionOption[] })[] = [
  {
    id: "e0000000-0000-0000-0000-000000000301",
    career_role_id: "c0000000-0000-0000-0000-000000000004",
    question_text: "Under GCP-AYUSH guidelines, what is the primary regulatory purpose of an Investigator Site File (ISF)?",
    question_type: "mcq",
    difficulty: "medium",
    skill_tag: "Clinical Trial Documentation",
    source_type: "prototype_generated",
    explanation: "The ISF contains all essential regulatory trial documentation (Ethics approvals, investigator CVs, delegation logs, study protocol, and drug accountability) required for GCP inspection.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-cra-1-1", question_id: "e0000000-0000-0000-0000-000000000301", option_text: "Systematically archive all essential regulatory and trial documents (IEC approvals, protocol, drug logs, monitoring reports)", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-cra-1-2", question_id: "e0000000-0000-0000-0000-000000000301", option_text: "Produce promotional advertising leaflets for retail pharmacies", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-cra-1-3", question_id: "e0000000-0000-0000-0000-000000000301", option_text: "Store outpatient appointment register and daily OPD cash receipts", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-cra-1-4", question_id: "e0000000-0000-0000-0000-000000000301", option_text: "Maintain confidential student grades from the affiliated medical university", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000302",
    career_role_id: "c0000000-0000-0000-0000-000000000004",
    question_text: "Scenario: While reviewing paper Case Report Forms (CRFs) during an Ayurvedic clinical study, you find that an incorrect lab value was painted over with white correction fluid. How does ALCOA+ data integrity address this?",
    question_type: "scenario",
    difficulty: "hard",
    skill_tag: "Clinical Trial Documentation",
    source_type: "prototype_generated",
    explanation: "Good Clinical Data Management strictly forbids obliterating source entries; corrections require a single legible strike-through, corrected entry, initial, date, and reason.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-cra-2-1", question_id: "e0000000-0000-0000-0000-000000000302", option_text: "Correction fluid is a severe audit violation; corrections must be a single legible strike-through with new value, date, initials, and reason", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-cra-2-2", question_id: "e0000000-0000-0000-0000-000000000302", option_text: "Correction fluid is recommended because it keeps the document looking tidy", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-cra-2-3", question_id: "e0000000-0000-0000-0000-000000000302", option_text: "Errors on CRFs should be erased with sandpaper", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-cra-2-4", question_id: "e0000000-0000-0000-0000-000000000302", option_text: "Any clinical entry can be discarded without explanation if the principal investigator agrees", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000303",
    career_role_id: "c0000000-0000-0000-0000-000000000004",
    question_text: "When conducting clinical research on Amavata (Rheumatoid Arthritis), how are classical Ayurvedic diagnostic parameters integrated with validated modern research metrics?",
    question_type: "mcq",
    difficulty: "medium",
    skill_tag: "Roga Nidana & Diagnostics",
    source_type: "prototype_generated",
    explanation: "Integrative research protocols cross-validate classical markers (Sandhi Shula, Shotha, Gaurava, Angamarda) with validated disease score scales (DAS28) and biological markers (hs-CRP, ESR).",
    weight: 1,
    active: true,
    options: [
      { id: "opt-cra-3-1", question_id: "e0000000-0000-0000-0000-000000000303", option_text: "Classical Roga-Lakshana scores are evaluated alongside validated clinical indices like DAS28, visual analog pain scores, and serum hs-CRP / ESR", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-cra-3-2", question_id: "e0000000-0000-0000-0000-000000000303", option_text: "Researchers must avoid any laboratory blood tests because modern biology is incompatible with Ayurveda", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-cra-3-3", question_id: "e0000000-0000-0000-0000-000000000303", option_text: "Only pulse feeling without recording any physical symptoms is allowed in clinical trials", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-cra-3-4", question_id: "e0000000-0000-0000-0000-000000000303", option_text: "Disease activity is judged solely by the patient's mood on the final trial day", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000304",
    career_role_id: "c0000000-0000-0000-0000-000000000004",
    question_text: "Scenario: A subject in a clinical study for Madhumeha (Type 2 Diabetes) exhibits symptoms of Avila Mutrata (turbid urine) and fasting blood sugar of 210 mg/dL. How should this baseline finding be documented?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Roga Nidana & Diagnostics",
    source_type: "prototype_generated",
    explanation: "Protocolized research requires multi-modal recording: standardized symptom severity gradings coupled with accredited laboratory analytical results and timestamped certifications.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-cra-4-1", question_id: "e0000000-0000-0000-0000-000000000304", option_text: "Record standardized Ayurvedic symptom severity gradings alongside exact accredited lab values with timestamps and reference ranges", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-cra-4-2", question_id: "e0000000-0000-0000-0000-000000000304", option_text: "Delete the laboratory report to avoid recording elevated blood glucose", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-cra-4-3", question_id: "e0000000-0000-0000-0000-000000000304", option_text: "Record that the patient is completely cured at baseline before taking medicine", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-cra-4-4", question_id: "e0000000-0000-0000-0000-000000000304", option_text: "Ask the participant to guess their blood sugar without testing", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000305",
    career_role_id: "c0000000-0000-0000-0000-000000000004",
    question_text: "Why is double-blinding particularly challenging in randomized controlled trials evaluating classical Ayurvedic formulations (e.g. Kwathas, Asavas), and how is it addressed?",
    question_type: "mcq",
    difficulty: "hard",
    skill_tag: "Research Methodology & Biostatistics",
    source_type: "prototype_generated",
    explanation: "Distinct organoleptic traits (pungent odor, bitterness, color) make matching placebos difficult; modern trials utilize standardized extract encapsulation or organoleptically matched vehicle placebos.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-cra-5-1", question_id: "e0000000-0000-0000-0000-000000000305", option_text: "Strong distinct taste (Rasa) and aroma (Gandha) make matching difficult; researchers utilize taste-masked capsules or matched organoleptic dummy placebos", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-cra-5-2", question_id: "e0000000-0000-0000-0000-000000000305", option_text: "Placebo controls are banned in all modern scientific research globally", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-cra-5-3", question_id: "e0000000-0000-0000-0000-000000000305", option_text: "Statistical software cannot process herbal trial data", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-cra-5-4", question_id: "e0000000-0000-0000-0000-000000000305", option_text: "Herbal medicines only work if patients know the exact brand name", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000306",
    career_role_id: "c0000000-0000-0000-0000-000000000004",
    question_text: "Scenario: In a 120-patient randomized clinical trial comparing an Ayurvedic botanical extract against standard therapy for Osteoarthritis, the primary joint pain reduction outcome yields p = 0.02. How should this result be interpreted?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Research Methodology & Biostatistics",
    source_type: "prototype_generated",
    explanation: "In biostatistical hypothesis testing, p < 0.05 indicates statistical significance, concluding that the observed therapeutic difference is unlikely attributable to random chance.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-cra-6-1", question_id: "e0000000-0000-0000-0000-000000000306", option_text: "The outcome is statistically significant (p < 0.05), indicating that the observed difference is unlikely due to random chance alone", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-cra-6-2", question_id: "e0000000-0000-0000-0000-000000000306", option_text: "The study was an absolute failure because p must equal exactly zero", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-cra-6-3", question_id: "e0000000-0000-0000-0000-000000000306", option_text: "98% of patients dropped out of the study due to toxic side effects", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-cra-6-4", question_id: "e0000000-0000-0000-0000-000000000306", option_text: "The trial proves that no other medications can ever be used in medicine", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000307",
    career_role_id: "c0000000-0000-0000-0000-000000000004",
    question_text: "In defining standardized research outcome variables for an Ayurvedic Shamana study, what objective clinical markers indicate enhancement of 'Agnideepti' (metabolic digestive fire)?",
    question_type: "mcq",
    difficulty: "medium",
    skill_tag: "Ayurvedic Fundamentals",
    source_type: "prototype_generated",
    explanation: "Classical Agni evaluation utilizes Jarana Shakti (digestive capacity), regular appetite at meal times, clear physiological belching, and absence of post-prandial distension or Ama signs.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-cra-7-1", question_id: "e0000000-0000-0000-0000-000000000307", option_text: "Return of physiological meal-timed hunger, clear belching, light abdomen post-meals, and regular non-sticky bowel evacuation", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-cra-7-2", question_id: "e0000000-0000-0000-0000-000000000307", option_text: "Continuous burning stomach acidity requiring antacids every hour", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-cra-7-3", question_id: "e0000000-0000-0000-0000-000000000307", option_text: "Excessive weight gain of 15 kg within 7 days", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-cra-7-4", question_id: "e0000000-0000-0000-0000-000000000307", option_text: "Total loss of appetite accompanied by severe nausea", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000308",
    career_role_id: "c0000000-0000-0000-0000-000000000004",
    question_text: "Scenario: A multi-center AYUSH research study seeks to investigate phenotypic and genomic correlations with Deha Prakriti. Which protocol ensures inter-rater reliability across clinical sites?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Ayurvedic Fundamentals",
    source_type: "prototype_generated",
    explanation: "Multi-center standardization requires psychometrically validated, standardized instruments (such as CCRAS Prakriti assessment tools) with pre-calibrated scoring criteria.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-cra-8-1", question_id: "e0000000-0000-0000-0000-000000000308", option_text: "Utilize a standardized, psychometrically validated questionnaire tool (such as CCRAS / Ayurgenomics standardized assessment software) with trained assessors", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-cra-8-2", question_id: "e0000000-0000-0000-0000-000000000308", option_text: "Allow every junior intern to formulate their own personal 3-question survey", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-cra-8-3", question_id: "e0000000-0000-0000-0000-000000000308", option_text: "Determine Prakriti purely by looking at patient skin tone in photographs", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-cra-8-4", question_id: "e0000000-0000-0000-0000-000000000308", option_text: "Classify all trial participants automatically into the same single Prakriti group", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000309",
    career_role_id: "c0000000-0000-0000-0000-000000000004",
    question_text: "Under GCP-AYUSH and ICMR ethical guidelines, at what stage must voluntary informed consent be obtained from a prospective research subject?",
    question_type: "mcq",
    difficulty: "easy",
    skill_tag: "Professional Ethics",
    source_type: "prototype_generated",
    explanation: "Free, informed, written consent using an Ethics Committee-approved Patient Information Sheet must be obtained prior to initiating any screening, procedure, or trial intervention.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-cra-9-1", question_id: "e0000000-0000-0000-0000-000000000309", option_text: "Prior to performing any trial-related procedure, lab screening, or clinical intervention, using an approved Patient Information Sheet", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-cra-9-2", question_id: "e0000000-0000-0000-0000-000000000309", option_text: "After the patient finishes the entire 6-month trial and takes all medication", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-cra-9-3", question_id: "e0000000-0000-0000-0000-000000000309", option_text: "Only if the trial result is published in an international medical journal", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-cra-9-4", question_id: "e0000000-0000-0000-0000-000000000309", option_text: "Informed consent is entirely optional for clinical trials involving herbs", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000310",
    career_role_id: "c0000000-0000-0000-0000-000000000004",
    question_text: "Scenario: An enrolled clinical trial participant notifies the research coordinator of their decision to withdraw from the trial immediately. How must the research team handle this request?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Professional Ethics",
    source_type: "prototype_generated",
    explanation: "The ethical principle of autonomy guarantees that research participants can withdraw at any time without prejudice or loss of entitled standard medical care.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-cra-10-1", question_id: "e0000000-0000-0000-0000-000000000310", option_text: "Respect the participant's absolute right to withdraw without penalty or loss of healthcare benefits, document the withdrawal, and conduct safety follow-up", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-cra-10-2", question_id: "e0000000-0000-0000-0000-000000000310", option_text: "Confiscate the participant's hospital card to compel them to complete the study", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-cra-10-3", question_id: "e0000000-0000-0000-0000-000000000310", option_text: "Refuse permission to leave the clinic unless a penalty fine is paid", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-cra-10-4", question_id: "e0000000-0000-0000-0000-000000000310", option_text: "Threaten to cancel the patient's ongoing routine medical treatments", is_correct: false, score: 0, display_order: 4 }
    ]
  }
];

// ==========================================
// 4e. Role-Specific Questions: Wellness & Lifestyle Consultant
// ==========================================
export const QUESTIONS_WELLNESS_CONSULTANT: (AssessmentQuestion & { options: QuestionOption[] })[] = [
  {
    id: "e0000000-0000-0000-0000-000000000401",
    career_role_id: "c0000000-0000-0000-0000-000000000005",
    question_text: "Which anatomical and physiological characteristics classically denote an individual with Vata-predominant Deha Prakriti?",
    question_type: "mcq",
    difficulty: "easy",
    skill_tag: "Prakriti Assessment",
    source_type: "prototype_generated",
    explanation: "Charaka Vimana 8/98 specifies Vata Prakriti features: Krisha (lean body frame), Ruksha (dry skin/joints), Chapala (variable swift movements), and Vishamagni (erratic digestion).",
    weight: 1,
    active: true,
    options: [
      { id: "opt-wlc-1-1", question_id: "e0000000-0000-0000-0000-000000000401", option_text: "Slender lean frame, prominent dry joints, dry rough skin, fluctuating appetite (Vishamagni), and variable sleep", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-wlc-1-2", question_id: "e0000000-0000-0000-0000-000000000401", option_text: "Broad muscular build, oily lustrous skin, slow graceful gait, and deep uninterrupted sleep", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-wlc-1-3", question_id: "e0000000-0000-0000-0000-000000000401", option_text: "Medium athletic build, coppery skin tone, sharp excessive hunger (Tikshnagni), and intolerance to heat", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-wlc-1-4", question_id: "e0000000-0000-0000-0000-000000000401", option_text: "Dense heavy bones with lifelong total absence of any skin pores", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000402",
    career_role_id: "c0000000-0000-0000-0000-000000000005",
    question_text: "Scenario: A client with constitutional Pitta Prakriti presents with acute onset of dry skin, bloating, constipation, and insomnia after several weeks of late-night international flights. How should the consultant evaluate this state?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Prakriti Assessment",
    source_type: "prototype_generated",
    explanation: "Prakriti is the lifelong constitutional baseline; Vikriti is the dynamic acquired Doshic imbalance. The client has an underlying Pitta Prakriti with an acute Vata Vikriti requiring Vata-pacifying lifestyle therapy.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-wlc-2-1", question_id: "e0000000-0000-0000-0000-000000000402", option_text: "Constitutional baseline (Prakriti) remains Pitta; the current acute imbalance (Vikriti) is Vata Prakopa requiring Vata-pacifying routine and warm unctuous diet", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-wlc-2-2", question_id: "e0000000-0000-0000-0000-000000000402", option_text: "The patient's permanent genetic Prakriti has converted into 100% Kapha", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-wlc-2-3", question_id: "e0000000-0000-0000-0000-000000000402", option_text: "The patient has zero Doshas left in their physiology", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-wlc-2-4", question_id: "e0000000-0000-0000-0000-000000000402", option_text: "Prescribe ice baths and raw cold salads because the baseline is Pitta", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000403",
    career_role_id: "c0000000-0000-0000-0000-000000000005",
    question_text: "According to classical Ayurvedic dietetics (Ahara Vidhi), which dietary combination exemplifies harmful 'Viruddha Ahara' (incompatible food combination)?",
    question_type: "mcq",
    difficulty: "easy",
    skill_tag: "Dietetics & Ahara-Vihara",
    source_type: "prototype_generated",
    explanation: "Charaka Sutra 26/84 lists honey (Madhu) and cow's ghee (Ghrita) taken in equal proportions by weight (Sama Matra) as toxic incompatibility due to antagonistic enzymatic interactions.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-wlc-3-1", question_id: "e0000000-0000-0000-0000-000000000403", option_text: "Mixing pure honey and cow's ghee in equal quantities by weight (Madhu-Ghrita Sama Matra)", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-wlc-3-2", question_id: "e0000000-0000-0000-0000-000000000403", option_text: "Steamed mung dal with basmati rice and a teaspoon of cow's ghee", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-wlc-3-3", question_id: "e0000000-0000-0000-0000-000000000403", option_text: "Fresh buttermilk with roasted cumin powder and rock salt", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-wlc-3-4", question_id: "e0000000-0000-0000-0000-000000000403", option_text: "Warm water sipped during a light khichdi meal", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000404",
    career_role_id: "c0000000-0000-0000-0000-000000000005",
    question_text: "Scenario: A client reports heavy abdominal fullness, sluggishness after meals, and white tongue coating (Ama). Assessment reveals they drink 1 liter of iced refrigerated water immediately after lunch. What dietary rule (Ahara Vidhi) should be emphasized?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Dietetics & Ahara-Vihara",
    source_type: "prototype_generated",
    explanation: "Drinking cold water immediately after meals extinguishes Jatharagni, impairs enzymatic breakdown of Ahara Rasa, and produces toxic undigested metabolic waste (Ama).",
    weight: 1,
    active: true,
    options: [
      { id: "opt-wlc-4-1", question_id: "e0000000-0000-0000-0000-000000000404", option_text: "Large volumes of ice water immediately after meals extinguish Jatharagni and create Ama; warm water in small sips during meals is recommended", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-wlc-4-2", question_id: "e0000000-0000-0000-0000-000000000404", option_text: "Advise drinking 3 liters of ice water to rinse the stomach clean", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-wlc-4-3", question_id: "e0000000-0000-0000-0000-000000000404", option_text: "Recommend eating heavy deep-fried foods to soak up the water", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-wlc-4-4", question_id: "e0000000-0000-0000-0000-000000000404", option_text: "Water temperature has zero biological effect on digestion in Ayurveda", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000405",
    career_role_id: "c0000000-0000-0000-0000-000000000005",
    question_text: "Scenario: A client dealing with obesity and low energy feels overwhelmed by rigid dietary regimens and demoralized by past failures. How should the lifestyle consultant structure behavioral change?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Patient Communication",
    source_type: "prototype_generated",
    explanation: "Classical Padamshika Krama (graded step-by-step habit transformation) and empathetic motivational interviewing yield sustainable behavioral adoption without causing overwhelm.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-wlc-5-1", question_id: "e0000000-0000-0000-0000-000000000405", option_text: "Adopt Padamshika Krama (gradual micro-steps), celebrate small habits (e.g. 15-minute morning walk, early light dinner), and provide positive reinforcement", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-wlc-5-2", question_id: "e0000000-0000-0000-0000-000000000405", option_text: "Berate the client for lack of discipline and demand an overnight 100% lifestyle overhaul", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-wlc-5-3", question_id: "e0000000-0000-0000-0000-000000000405", option_text: "Hand them a 100-page medical manual and cancel sessions until it is memorized", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-wlc-5-4", question_id: "e0000000-0000-0000-0000-000000000405", option_text: "Tell the client that Kapha individuals can never achieve fitness and abandon coaching", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000406",
    career_role_id: "c0000000-0000-0000-0000-000000000005",
    question_text: "In classical Dinacharya (daily health routine), which sequence represents the recommended morning regimen upon waking up during Brahma Muhurta?",
    question_type: "mcq",
    difficulty: "easy",
    skill_tag: "Patient Communication",
    source_type: "prototype_generated",
    explanation: "Classical Dinacharya begins with Ushapana (warm water), natural elimination, oral cleansing (Dantadhavana, Jihva Nirlekhana), Anjana, Pratimarsha Nasya, and Abhyanga.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-wlc-6-1", question_id: "e0000000-0000-0000-0000-000000000406", option_text: "Ushapana (warm water), urge evacuation, Dantadhavana, Jihva Nirlekhana (tongue scraping), Pratimarsha Nasya, and Abhyanga", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-wlc-6-2", question_id: "e0000000-0000-0000-0000-000000000406", option_text: "Heavy weightlifting followed by sleeping for 5 hours until noon", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-wlc-6-3", question_id: "e0000000-0000-0000-0000-000000000406", option_text: "Drinking iced soda followed by consuming high-sugar pastries", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-wlc-6-4", question_id: "e0000000-0000-0000-0000-000000000406", option_text: "Staying in bed looking at digital screen notifications with lights off until 11 AM", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000407",
    career_role_id: "c0000000-0000-0000-0000-000000000005",
    question_text: "In Ritucharya (seasonal regimen), during which season is Jatharagni naturally at its strongest physiological capacity, allowing the digestion of heavier, nourishing meals?",
    question_type: "mcq",
    difficulty: "medium",
    skill_tag: "Ayurvedic Fundamentals",
    source_type: "prototype_generated",
    explanation: "During Hemanta and Shishira (winter), external cold constricts body pores and prevents heat dissipation, concentrating and igniting the internal digestive fire (Balavanta Agni).",
    weight: 1,
    active: true,
    options: [
      { id: "opt-wlc-7-1", question_id: "e0000000-0000-0000-0000-000000000407", option_text: "Hemanta and Shishira Ritu (early and late winter seasons)", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-wlc-7-2", question_id: "e0000000-0000-0000-0000-000000000407", option_text: "Grishma Ritu (intense peak summer)", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-wlc-7-3", question_id: "e0000000-0000-0000-0000-000000000407", option_text: "Varsha Ritu (monsoon rainy season)", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-wlc-7-4", question_id: "e0000000-0000-0000-0000-000000000407", option_text: "Sharad Ritu (autumn)", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000408",
    career_role_id: "c0000000-0000-0000-0000-000000000005",
    question_text: "Scenario: During Varsha Ritu (monsoon rainy season), a client asks why they frequently suffer from sluggish digestion, bloating, and joint heaviness. How should the consultant explain the seasonal Doshic state?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Ayurvedic Fundamentals",
    source_type: "prototype_generated",
    explanation: "Monsoon humidity, cold winds, and sour rain runoff provoke Vata (Vata Prakopa) and weaken Agni (Agni Mandya), requiring light, warm, sour-salted, digestive-stimulating foods.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-wlc-8-1", question_id: "e0000000-0000-0000-0000-000000000408", option_text: "Rainy dampness and water acidity provoke Vata Prakopa and cause Agni Mandya (sluggish digestion), requiring warm, digestive-stimulating, lightly seasoned foods", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-wlc-8-2", question_id: "e0000000-0000-0000-0000-000000000408", option_text: "Monsoon seasons produce zero physiological changes in human health", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-wlc-8-3", question_id: "e0000000-0000-0000-0000-000000000408", option_text: "Advise eating cold unwashed salads and drinking muddy river water", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-wlc-8-4", question_id: "e0000000-0000-0000-0000-000000000408", option_text: "The patient is imagining their symptoms; season has no relation to digestive power", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000409",
    career_role_id: "c0000000-0000-0000-0000-000000000005",
    question_text: "What is the primary ethical and legal scope of practice boundary for an AYUSH Wellness & Lifestyle Consultant?",
    question_type: "mcq",
    difficulty: "easy",
    skill_tag: "Professional Ethics",
    source_type: "prototype_generated",
    explanation: "Wellness consultants educate on dietetics, daily lifestyle habits, and preventive health, and must never diagnose pathology, manage medical emergencies, or prescribe regulated drugs.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-wlc-9-1", question_id: "e0000000-0000-0000-0000-000000000409", option_text: "Educate on preventive wellness, Dinacharya, Ritucharya, and dietetics without diagnosing acute diseases or prescribing pharmaceutical medicines", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-wlc-9-2", question_id: "e0000000-0000-0000-0000-000000000409", option_text: "Perform invasive surgical operations in a home setting", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-wlc-9-3", question_id: "e0000000-0000-0000-0000-000000000409", option_text: "Prescribe Schedule E1 toxic herbal extracts without medical licensure", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-wlc-9-4", question_id: "e0000000-0000-0000-0000-000000000409", option_text: "Advise cancer patients to avoid all hospital treatments and rely solely on chanting", is_correct: false, score: 0, display_order: 4 }
    ]
  },
  {
    id: "e0000000-0000-0000-0000-000000000410",
    career_role_id: "c0000000-0000-0000-0000-000000000005",
    question_text: "Scenario: During a routine wellness assessment, a client discloses persistent night sweats, unexplained weight loss of 10 kg, and coughing up blood (hemoptysis) for 6 weeks, requesting a herbal tea. What must the consultant do?",
    question_type: "scenario",
    difficulty: "medium",
    skill_tag: "Professional Ethics",
    source_type: "prototype_generated",
    explanation: "Recognizing red flag signs of serious organic pathology (e.g. tuberculosis or malignancy) demands immediate, urgent referral to a specialized medical hospital.",
    weight: 1,
    active: true,
    options: [
      { id: "opt-wlc-10-1", question_id: "e0000000-0000-0000-0000-000000000410", option_text: "Identify alarming red flag symptoms (suspected tuberculosis/malignancy) and immediately urge and coordinate urgent referral to a medical hospital", is_correct: true, score: 1, display_order: 1 },
      { id: "opt-wlc-10-2", question_id: "e0000000-0000-0000-0000-000000000410", option_text: "Assure the client that coughing blood is simply natural Pitta detox and sell them ginger powder", is_correct: false, score: 0, display_order: 2 },
      { id: "opt-wlc-10-3", question_id: "e0000000-0000-0000-0000-000000000410", option_text: "Instruct the patient to avoid all medical doctors and drink raw cabbage juice", is_correct: false, score: 0, display_order: 3 },
      { id: "opt-wlc-10-4", question_id: "e0000000-0000-0000-0000-000000000410", option_text: "Tell the client to ignore the symptom and double their morning exercise", is_correct: false, score: 0, display_order: 4 }
    ]
  }
];

// Master Map linking each Career Role ID / Slug to its distinct Question Dataset
export const ROLE_QUESTIONS_MAP: Record<string, (AssessmentQuestion & { options: QuestionOption[] })[]> = {
  // Role 1
  "ayurveda-clinical-assistant": DEFAULT_QUESTIONS,
  "c0000000-0000-0000-0000-000000000001": DEFAULT_QUESTIONS,

  // Role 2
  "ayurvedic-pharmacovigilance-associate": QUESTIONS_PHARMACOVIGILANCE,
  "c0000000-0000-0000-0000-000000000002": QUESTIONS_PHARMACOVIGILANCE,

  // Role 3
  "panchakarma-clinical-therapist": QUESTIONS_PANCHAKARMA,
  "c0000000-0000-0000-0000-000000000003": QUESTIONS_PANCHAKARMA,

  // Role 4
  "ayurvedic-clinical-research-assistant": QUESTIONS_RESEARCH_ASSISTANT,
  "c0000000-0000-0000-0000-000000000004": QUESTIONS_RESEARCH_ASSISTANT,

  // Role 5
  "ayush-wellness-lifestyle-consultant": QUESTIONS_WELLNESS_CONSULTANT,
  "c0000000-0000-0000-0000-000000000005": QUESTIONS_WELLNESS_CONSULTANT
};

// ==========================================
// 5. Student Talent Pool Across Institutions
// ==========================================
export const TALENT_STUDENT_DIRECTORY: InstitutionStudentProfile[] = [
  {
    id: "STU001",
    full_name: "Aarav Sharma",
    email: "aarav.sharma@ayush.edu.in",
    college: "National Institute of Ayurveda, Jaipur",
    course: "BAMS",
    semester: 6,
    overall_readiness_score: 82,
    readiness_level: "Ready with Minor Gaps",
    target_role: "Ayurveda Clinical Assistant",
    skills: [
      { skill_name: "Ayurvedic Fundamentals", score: 85, level: 4 },
      { skill_name: "Clinical Reasoning", score: 78, level: 4 },
      { skill_name: "Patient Communication", score: 82, level: 4 },
      { skill_name: "Clinical Documentation", score: 70, level: 3 },
      { skill_name: "Professional Ethics", score: 90, level: 5 }
    ]
  },
  {
    id: "STU002",
    full_name: "Ananya Nair",
    email: "ananya.nair@ayush.edu.in",
    college: "Government Ayurveda College, Thiruvananthapuram",
    course: "BAMS",
    semester: 7,
    overall_readiness_score: 91,
    readiness_level: "Highly Ready",
    target_role: "Panchakarma Clinical Therapist",
    skills: [
      { skill_name: "Panchakarma Procedure Monitoring", score: 94, level: 5 },
      { skill_name: "Snehana & Svedana Protocols", score: 90, level: 5 },
      { skill_name: "Clinical Reasoning", score: 88, level: 4 },
      { skill_name: "Patient Communication", score: 86, level: 4 },
      { skill_name: "Clinical Documentation", score: 85, level: 4 }
    ]
  },
  {
    id: "STU003",
    full_name: "Rohan Varma",
    email: "rohan.varma@aiia.gov.in",
    college: "All India Institute of Ayurveda, New Delhi",
    course: "BAMS",
    semester: 6,
    overall_readiness_score: 86,
    readiness_level: "Highly Ready",
    target_role: "Ayurvedic Pharmacovigilance Associate",
    skills: [
      { skill_name: "Pharmacovigilance Protocols", score: 88, level: 5 },
      { skill_name: "Dravyaguna & Herb Identification", score: 85, level: 4 },
      { skill_name: "Rasa Shastra Quality Standards", score: 80, level: 4 },
      { skill_name: "Clinical Documentation", score: 84, level: 4 },
      { skill_name: "Regulatory Ethics", score: 92, level: 5 }
    ]
  },
  {
    id: "STU004",
    full_name: "Pooja Deshmukh",
    email: "pooja.d@bhu.ac.in",
    college: "Faculty of Ayurveda, IMS BHU, Varanasi",
    course: "BAMS",
    semester: 8,
    overall_readiness_score: 79,
    readiness_level: "Ready with Minor Gaps",
    target_role: "Ayurvedic Clinical Research Assistant",
    skills: [
      { skill_name: "Clinical Trial Documentation", score: 82, level: 4 },
      { skill_name: "Roga Nidana & Diagnostics", score: 80, level: 4 },
      { skill_name: "Research Methodology & Biostatistics", score: 75, level: 3 },
      { skill_name: "Ayurvedic Fundamentals", score: 85, level: 4 },
      { skill_name: "Professional Ethics", score: 88, level: 4 }
    ]
  },
  {
    id: "STU005",
    full_name: "Karan Patel",
    email: "karan.patel@gau.ac.in",
    college: "IPGTRA, Gujarat Ayurved University, Jamnagar",
    course: "BAMS",
    semester: 6,
    overall_readiness_score: 74,
    readiness_level: "Ready with Minor Gaps",
    target_role: "AYUSH Wellness & Lifestyle Consultant",
    skills: [
      { skill_name: "Prakriti Assessment", score: 82, level: 4 },
      { skill_name: "Dietetics & Ahara-Vihara", score: 76, level: 4 },
      { skill_name: "Patient Communication", score: 85, level: 4 },
      { skill_name: "Ayurvedic Fundamentals", score: 78, level: 4 },
      { skill_name: "Professional Ethics", score: 80, level: 4 }
    ]
  }
];

// ==========================================
// 6. Initial Job / Internship Opportunities
// ==========================================
export const INITIAL_JOB_OPPORTUNITIES: JobOpportunity[] = [
  {
    id: "JOB001",
    org_id: "ORG001",
    org_name: "AyurCare Wellness Hospitals",
    title: "Clinical Ayurveda Intern (OPD & IPD Ward Rounds)",
    role_type: "Internship",
    location: "Bengaluru, Karnataka",
    location_type: "Onsite",
    stipend_or_salary: "₹18,000 / month",
    duration: "6 Months",
    description: "Hands-on clinical internship assisting senior Vaidyas with Rogi Pariksha, Nadi examination, patient dietetics counseling, and computerized health record documentation.",
    required_skills: ["Ayurvedic Fundamentals", "Clinical Reasoning", "Patient Communication", "Clinical Documentation"],
    status: "active",
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    applications_count: 8
  },
  {
    id: "JOB002",
    org_id: "ORG001",
    org_name: "AyurCare Wellness Hospitals",
    title: "Panchakarma Clinical Support Associate",
    role_type: "Clinical Apprenticeship",
    location: "Mysuru, Karnataka",
    location_type: "Onsite",
    stipend_or_salary: "₹22,000 / month",
    duration: "12 Months",
    description: "Supervised role managing clinical monitoring during Snehapana (Samyak Snigdha Lakshana tracking) and assisting chief doctors during classical Shodhana therapies.",
    required_skills: ["Panchakarma Procedure Monitoring", "Snehana & Svedana Protocols", "Clinical Reasoning", "Patient Communication"],
    status: "active",
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    applications_count: 5
  },
  {
    id: "JOB003",
    org_id: "ORG002",
    org_name: "Ayush Global Formulations",
    title: "Junior Pharmacovigilance & Drug Safety Trainee",
    role_type: "Internship",
    location: "New Delhi (HQ)",
    location_type: "Hybrid",
    stipend_or_salary: "₹20,000 / month",
    duration: "6 Months",
    description: "Assist with logging and evaluating suspected adverse reactions of classical and proprietary herbal formulations under the National Pharmacovigilance framework for AYUSH.",
    required_skills: ["Pharmacovigilance Protocols", "Dravyaguna & Herb Identification", "Clinical Documentation", "Regulatory Ethics"],
    status: "active",
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    applications_count: 6
  },
  {
    id: "JOB004",
    org_id: "ORG002",
    org_name: "Ayush Global Formulations",
    title: "AYUSH Clinical Research Coordinator Trainee",
    role_type: "Research Fellowship",
    location: "New Delhi / Jaipur",
    location_type: "Hybrid",
    stipend_or_salary: "₹25,000 / month",
    duration: "12 Months",
    description: "Support trial protocol adherence, Case Report Form (CRF) data verification, and GCP-AYUSH ethical documentation for multicenter clinical evaluations.",
    required_skills: ["Clinical Trial Documentation", "Roga Nidana & Diagnostics", "Research Methodology & Biostatistics", "Professional Ethics"],
    status: "active",
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    applications_count: 4
  },
  {
    id: "JOB005",
    org_id: "ORG001",
    org_name: "AyurCare Wellness Hospitals",
    title: "Preventive Ahara & Lifestyle Consultant Intern",
    role_type: "Internship",
    location: "Bengaluru, Karnataka",
    location_type: "Onsite",
    stipend_or_salary: "₹19,000 / month",
    duration: "6 Months",
    description: "Guide outpatient wellness clients through Prakriti analysis, Dinacharya habits, and personalized Ahara-Vihara (dietary & seasonal regimen) counseling.",
    required_skills: ["Prakriti Assessment", "Dietetics & Ahara-Vihara", "Patient Communication", "Ayurvedic Fundamentals"],
    status: "active",
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    applications_count: 7
  },
  {
    id: "JOB006",
    org_id: "ORG001",
    org_name: "AyurCare Wellness Hospitals",
    title: "Junior Ayurvedic Medical Officer (Inpatient & OPD Care)",
    role_type: "Full-Time",
    location: "Bengaluru, Karnataka",
    location_type: "Onsite",
    stipend_or_salary: "₹55,000 / month",
    duration: "Full-Time Permanent",
    description: "Conduct clinical evaluations, supervise Panchakarma therapies, lead inpatient case rounds, and prescribe standardized classical formulations.",
    required_skills: ["Ayurvedic Fundamentals", "Clinical Reasoning", "Patient Communication", "Clinical Documentation"],
    status: "active",
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    applications_count: 12
  },
  {
    id: "JOB007",
    org_id: "ORG002",
    org_name: "Ayush Global Formulations",
    title: "Ayurvedic Drug Safety & Pharmacovigilance Executive",
    role_type: "Full-Time",
    location: "New Delhi (HQ)",
    location_type: "Hybrid",
    stipend_or_salary: "₹48,000 / month",
    duration: "Full-Time Permanent",
    description: "Manage pharmacovigilance surveillance, WHO-UMC causality assessments, Adverse Event (AE) documentation, and regulatory compliance under AYUSH guidelines.",
    required_skills: ["Pharmacovigilance Protocols", "Regulatory Ethics", "Dravyaguna & Herb Identification", "Clinical Documentation"],
    status: "active",
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    applications_count: 9
  },
  {
    id: "JOB008",
    org_id: "ORG001",
    org_name: "AyurCare Wellness Hospitals",
    title: "Chief Panchakarma Clinical Specialist",
    role_type: "Full-Time",
    location: "Mysuru, Karnataka",
    location_type: "Onsite",
    stipend_or_salary: "₹60,000 / month",
    duration: "Full-Time Permanent",
    description: "Supervise specialized classical Shodhana procedures, administer complex Basti and Vamana protocols, and manage clinical therapist staff.",
    required_skills: ["Panchakarma Procedure Monitoring", "Snehana & Svedana Protocols", "Clinical Reasoning", "Patient Communication"],
    status: "active",
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    applications_count: 8
  }
];

// ==========================================
// 7. Initial Student Applications Received
// ==========================================
export const INITIAL_JOB_APPLICATIONS: JobApplication[] = [
  {
    id: "APP001",
    job_id: "JOB001",
    job_title: "Clinical Ayurveda Intern (OPD & IPD Ward Rounds)",
    org_id: "ORG001",
    student_id: "STU001",
    student_name: "Aarav Sharma",
    student_email: "aarav.sharma@ayush.edu.in",
    college: "National Institute of Ayurveda, Jaipur",
    course: "BAMS",
    semester: 6,
    readiness_score: 82,
    readiness_level: "Ready with Minor Gaps",
    applied_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    status: "Shortlisted",
    skills_summary: [
      { skill: "Ayurvedic Fundamentals", percentage: 85 },
      { skill: "Clinical Reasoning", percentage: 78 },
      { skill: "Patient Communication", percentage: 82 },
      { skill: "Clinical Documentation", percentage: 70 }
    ]
  },
  {
    id: "APP002",
    job_id: "JOB002",
    job_title: "Panchakarma Clinical Support Associate",
    org_id: "ORG001",
    student_id: "STU002",
    student_name: "Ananya Nair",
    student_email: "ananya.nair@ayush.edu.in",
    college: "Government Ayurveda College, Thiruvananthapuram",
    course: "BAMS",
    semester: 7,
    readiness_score: 91,
    readiness_level: "Highly Ready",
    applied_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    status: "Pending Review",
    skills_summary: [
      { skill: "Panchakarma Procedure Monitoring", percentage: 94 },
      { skill: "Snehana & Svedana Protocols", percentage: 90 },
      { skill: "Clinical Reasoning", percentage: 88 }
    ]
  },
  {
    id: "APP003",
    job_id: "JOB003",
    job_title: "Junior Pharmacovigilance & Drug Safety Trainee",
    org_id: "ORG002",
    student_id: "STU003",
    student_name: "Rohan Varma",
    student_email: "rohan.varma@aiia.gov.in",
    college: "All India Institute of Ayurveda, New Delhi",
    course: "BAMS",
    semester: 6,
    readiness_score: 86,
    readiness_level: "Highly Ready",
    applied_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    status: "Accepted",
    skills_summary: [
      { skill: "Pharmacovigilance Protocols", percentage: 88 },
      { skill: "Dravyaguna & Herb Identification", percentage: 85 },
      { skill: "Regulatory Ethics", percentage: 92 }
    ]
  }
];

// ==========================================
// 8. In-Memory Store & Helpers
// ==========================================
const inMemoryAssessments = new Map<string, AssessmentRecord>();
const inMemoryAnswers = new Map<string, Map<string, AssessmentAnswerRecord>>();
const inMemorySkillScores = new Map<string, AssessmentSkillScore[]>();
const inMemoryOpportunities = [...INITIAL_JOB_OPPORTUNITIES];
const inMemoryApplications = [...INITIAL_JOB_APPLICATIONS];

export const mockDb = {
  getProfile: (studentId?: string): StudentProfile => {
    void studentId;
    return DEFAULT_STUDENT;
  },
  getStudentSkills: (studentId?: string): StudentSkill[] => {
    void studentId;
    return DEFAULT_STUDENT_SKILLS;
  },
  getCareerRoles: (): CareerRole[] => {
    return ALL_CAREER_ROLES;
  },
  getCareerRoleBySlug: (slug: string = "ayurveda-clinical-assistant"): CareerRole => {
    const found = ALL_CAREER_ROLES.find((r) => r.slug === slug);
    return found || DEFAULT_CAREER_ROLE;
  },
  getCareerSkills: (roleIdOrSlug?: string): CareerSkill[] => {
    if (!roleIdOrSlug) return DEFAULT_CAREER_SKILLS;
    const bySlug = ROLE_SKILLS_MAP[roleIdOrSlug];
    if (bySlug) return bySlug;
    const role = ALL_CAREER_ROLES.find((r) => r.id === roleIdOrSlug || r.slug === roleIdOrSlug);
    if (role && ROLE_SKILLS_MAP[role.slug]) {
      return ROLE_SKILLS_MAP[role.slug];
    }
    return DEFAULT_CAREER_SKILLS;
  },
  getQuestions: (roleIdOrSlug?: string): (AssessmentQuestion & { options: QuestionOption[] })[] => {
    if (!roleIdOrSlug) return DEFAULT_QUESTIONS;
    if (ROLE_QUESTIONS_MAP[roleIdOrSlug]) {
      return ROLE_QUESTIONS_MAP[roleIdOrSlug];
    }
    const role = ALL_CAREER_ROLES.find((r) => r.id === roleIdOrSlug || r.slug === roleIdOrSlug);
    if (role && ROLE_QUESTIONS_MAP[role.slug]) {
      return ROLE_QUESTIONS_MAP[role.slug];
    }
    return DEFAULT_QUESTIONS;
  },
  getAssessment: (assessmentId: string): AssessmentRecord | null => {
    return inMemoryAssessments.get(assessmentId) || null;
  },
  getOrCreateActiveAssessment: (studentId: string, roleId: string): AssessmentRecord => {
    for (const record of inMemoryAssessments.values()) {
      if (record.student_id === studentId && record.career_role_id === roleId && record.status === "in_progress") {
        return record;
      }
    }
    const newRecord: AssessmentRecord = {
      id: `mock-asm-${Date.now()}`,
      student_id: studentId,
      career_role_id: roleId,
      started_at: new Date().toISOString(),
      submitted_at: null,
      status: "in_progress",
      total_score: null,
      percentage: null,
      readiness_level: null,
      ai_analysis: null,
      created_at: new Date().toISOString()
    };
    inMemoryAssessments.set(newRecord.id, newRecord);
    inMemoryAnswers.set(newRecord.id, new Map());
    return newRecord;
  },
  saveAnswer: (assessmentId: string, questionId: string, selectedOptionIds: string[], ratingValue: number | null) => {
    let answersMap = inMemoryAnswers.get(assessmentId);
    if (!answersMap) {
      answersMap = new Map();
      inMemoryAnswers.set(assessmentId, answersMap);
    }
    answersMap.set(questionId, {
      assessment_id: assessmentId,
      question_id: questionId,
      selected_option_ids: selectedOptionIds,
      rating_value: ratingValue,
      created_at: new Date().toISOString()
    });
  },
  getSavedAnswers: (assessmentId: string): Record<string, { selectedOptionIds: string[]; ratingValue: number | null }> => {
    const answersMap = inMemoryAnswers.get(assessmentId);
    if (!answersMap) return {};
    const result: Record<string, { selectedOptionIds: string[]; ratingValue: number | null }> = {};
    for (const [qId, ans] of answersMap.entries()) {
      result[qId] = {
        selectedOptionIds: ans.selected_option_ids,
        ratingValue: ans.rating_value
      };
    }
    return result;
  },
  saveSubmissionResult: (
    assessmentId: string,
    totalScore: number,
    percentage: number,
    readinessLevel: AssessmentRecord["readiness_level"],
    aiAnalysis: AssessmentRecord["ai_analysis"],
    skillScores: AssessmentSkillScore[]
  ) => {
    const record = inMemoryAssessments.get(assessmentId);
    if (record) {
      record.status = "analyzed";
      record.submitted_at = new Date().toISOString();
      record.total_score = totalScore;
      record.percentage = percentage;
      record.readiness_level = readinessLevel;
      record.ai_analysis = aiAnalysis;
    }
    inMemorySkillScores.set(assessmentId, skillScores);
  },
  getSkillScores: (assessmentId: string): AssessmentSkillScore[] => {
    return inMemorySkillScores.get(assessmentId) || [];
  },

  // Industry Methods
  getJobOpportunities: (orgId?: string): JobOpportunity[] => {
    if (orgId) {
      return inMemoryOpportunities.filter((j) => j.org_id === orgId);
    }
    return inMemoryOpportunities;
  },
  createJobOpportunity: (job: Omit<JobOpportunity, "id" | "created_at" | "applications_count" | "status">): JobOpportunity => {
    const newJob: JobOpportunity = {
      ...job,
      id: `JOB${String(inMemoryOpportunities.length + 1).padStart(3, "0")}`,
      status: "active",
      applications_count: 0,
      created_at: new Date().toISOString()
    };
    inMemoryOpportunities.unshift(newJob);
    return newJob;
  },
  toggleJobStatus: (jobId: string): JobOpportunity | null => {
    const job = inMemoryOpportunities.find((j) => j.id === jobId);
    if (job) {
      job.status = job.status === "active" ? "closed" : "active";
      return job;
    }
    return null;
  },
  getApplications: (orgId?: string): JobApplication[] => {
    if (orgId) {
      return inMemoryApplications.filter((a) => a.org_id === orgId);
    }
    return inMemoryApplications;
  },
  createApplication: (appData: Omit<JobApplication, "id" | "applied_at">): JobApplication => {
    const newApp: JobApplication = {
      ...appData,
      id: `APP${String(inMemoryApplications.length + 1).padStart(3, "0")}`,
      applied_at: new Date().toISOString()
    };
    inMemoryApplications.unshift(newApp);
    const job = inMemoryOpportunities.find((j) => j.id === appData.job_id);
    if (job) {
      job.applications_count = (job.applications_count || 0) + 1;
    }
    return newApp;
  },
  updateApplicationStatus: (appId: string, status: ApplicationStatus): boolean => {
    const app = inMemoryApplications.find((a) => a.id === appId);
    if (app) {
      app.status = status;
      return true;
    }
    return false;
  },
  getTalentDirectory: (filters?: { institution?: string; skillQuery?: string }): InstitutionStudentProfile[] => {
    let result = [...TALENT_STUDENT_DIRECTORY];
    if (filters?.institution && filters.institution !== "All Institutions") {
      result = result.filter((s) => s.college === filters.institution);
    }
    if (filters?.skillQuery && filters.skillQuery.trim() !== "") {
      const q = filters.skillQuery.toLowerCase().trim();
      result = result.filter((s) =>
        s.skills.some((sk) => sk.skill_name.toLowerCase().includes(q)) ||
        s.target_role.toLowerCase().includes(q) ||
        s.full_name.toLowerCase().includes(q)
      );
    }
    return result;
  }
};
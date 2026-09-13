import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIAnalysisResult, AIAnalysisSchema, StudentSkill } from "@/types/assessment";

export interface AIAnalysisInput {
  career: string;
  overallScore: number;
  readiness: string;
  studentSkills: StudentSkill[];
  assessmentSkills: Array<{
    skill: string;
    score: number;
    required: number;
    gap: number;
  }>;
  careerRequirements: Array<{
    skill: string;
    requiredPercentage: number;
    weight: number;
  }>;
  skillGaps: Array<{
    skill: string;
    gap: number;
  }>;
}

/**
 * Deterministic fallback generator when Gemini API is offline,
 * rate-limited (429), or unavailable during demo.
 */
export function generateFallbackAnalysis(input: AIAnalysisInput): AIAnalysisResult {
  const meetingSkills = input.assessmentSkills.filter((s) => s.gap === 0).map((s) => s.skill);
  const gapSkills = input.assessmentSkills.filter((s) => s.gap > 0);

  const fallbackGaps = gapSkills.map((g) => {
    let reason = `Performance score in ${g.skill} is below the career threshold by ${g.gap}%.`;
    let recommendation = `Review core ${g.skill} principles and practical clinical case studies.`;

    if (g.skill === "Ayurvedic Fundamentals") {
      reason = "Needs deeper grounding in classical Tridosha-Dhatu physiology and Dosha vitiation timelines (Sanchaya-Prakopa-Prashama).";
      recommendation = "Revisit Ashtanga Hridaya Sutrasthana chapters 1-12 and create comparative Dosha lakshana flashcards.";
    } else if (g.skill === "Clinical Reasoning") {
      reason = "Difficulty identifying acute Ama states and contraindications such as Snehana in Taruna Jwara.";
      recommendation = "Focus on Rogi Pariksha case simulations and differential diagnosis between Sama and Nirama presentations.";
    } else if (g.skill === "Patient Communication") {
      reason = "Requires improvement in translating Sanskrit dietary instructions into simple patient-friendly lifestyle advice.";
      recommendation = "Practice structured role-play for Pathya-Apathya counseling and gradual habit adoption (Padamshika Krama).";
    } else if (g.skill === "Clinical Documentation") {
      reason = "Gaps in documenting standardized Panchakarma observations (Samyak Snigdha Lakshana) and Pharmacovigilance reports.";
      recommendation = "Practice drafting clinical case sheets and standard Trividha Pariksha records under senior Vaidya guidance.";
    } else if (g.skill === "Professional Ethics") {
      reason = "Needs heightened awareness of emergency red-flag triage and strict adherence to clinical scope of practice.";
      recommendation = "Study AYUSH Code of Ethics and institutional protocols for rapid hospital escalation and drug safety.";
    }

    return {
      skill: g.skill,
      reason,
      recommendation
    };
  });

  const strengths = meetingSkills.length > 0
    ? meetingSkills.map((s) => `Strong competency in ${s} meeting standard AYUSH benchmarks.`)
    : ["Demonstrates foundational baseline knowledge in Ayurvedic principles."];

  const prioritySkills = gapSkills.sort((a, b) => b.gap - a.gap).slice(0, 3).map((s) => s.skill);

  return {
    summary: `Student has achieved an overall score of ${input.overallScore}% (${input.readiness}) for the ${input.career} role. ${
      gapSkills.length === 0
        ? "Excellent overall readiness across all assessed Ayurvedic clinical domains."
        : `Targeted bridging is recommended for ${prioritySkills.join(", ")} before entering full clinical assistance duties.`
    }`,
    strengths,
    skillGaps: fallbackGaps,
    recommendedActions: [
      "Complete supervised clinical case history taking in the outpatient department.",
      "Participate in weekly Rogi Pariksha and clinical discussion rounds.",
      "Review NCISM/AYUSH clinical safety and documentation guidelines."
    ],
    careerGuidance: `With continued clinical observation and strengthening of ${
      prioritySkills[0] || "clinical documentation"
    }, the student is well-positioned for clinical assistantship and advancing towards independent BAMS practice.`,
    prioritySkills: prioritySkills.length > 0 ? prioritySkills : ["Clinical Reasoning"]
  };
}

/**
 * Server-side Gemini AI caller
 * Strictly calls Gemini once per completed assessment, validates strict JSON schema,
 * and handles timeouts, retries, and fallbacks.
 */
export async function analyzeAssessmentWithAI(input: AIAnalysisInput): Promise<AIAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "" || apiKey === "your-gemini-api-key") {
    console.warn("GEMINI_API_KEY not configured. Using deterministic fallback report.");
    return generateFallbackAnalysis(input);
  }

  const prompt = `You are a Senior Ayurvedic Medical Educator and Clinical Mentor evaluating a BAMS (Bachelor of Ayurvedic Medicine & Surgery) student for the role of "${input.career}".

Here is the student's authoritative assessment results:
Overall Weighted Score: ${input.overallScore}%
Readiness Tier: ${input.readiness}

Assessment Performance by Skill:
${input.assessmentSkills.map((s) => `- ${s.skill}: ${s.score}% (Required: ${s.required}%, Gap: ${s.gap}%)`).join("\n")}

Baseline Profile Skills:
${input.studentSkills.map((s) => `- ${s.skill_name}: Level ${s.proficiency_level}/5`).join("\n")}

Skill Gaps Identified:
${input.skillGaps.length > 0 ? input.skillGaps.map((g) => `- ${g.skill} (Gap: ${g.gap}%)`).join("\n") : "None (All requirements met)"}

Instructions:
1. Provide an insightful, encouraging, and clinically accurate mentoring evaluation for an AYUSH / BAMS student.
2. Return ONLY a valid JSON object matching this exact schema:
{
  "summary": "Concise 2-3 sentence evaluation of their readiness for Ayurveda Clinical Assistant",
  "strengths": ["List 2-4 specific strengths based on their highest scoring Ayurvedic domains"],
  "skillGaps": [
    {
      "skill": "Name of the skill with a gap",
      "reason": "Clear explanation of why this gap matters in clinical Ayurveda",
      "recommendation": "Specific Ayurvedic reference, classical text, or practical clinical exercise to overcome this gap"
    }
  ],
  "recommendedActions": ["List 3 actionable steps (e.g. ward rounds, texts to review, documentation drills)"],
  "careerGuidance": "Inspiring professional roadmap for transitioning from student to clinical assistant to practicing Vaidya",
  "prioritySkills": ["Top 2-3 skills to focus on immediately"]
}
Do NOT wrap in markdown fences other than raw JSON or \`\`\`json.`;

  const genAI = new GoogleGenerativeAI(apiKey);

  const attemptCall = async (modelName: string): Promise<AIAnalysisResult> => {
    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2
      }
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    const text = result.response.text();
    const cleanJson = text.replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();
    const parsed = JSON.parse(cleanJson);
    return AIAnalysisSchema.parse(parsed);
  };

  try {
    return await attemptCall("gemini-1.5-flash");
  } catch (err: unknown) {
    console.warn("Gemini 1.5 Flash attempt failed, retrying with fallback model or retry: ", err);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      return await attemptCall("gemini-2.0-flash");
    } catch (retryErr: unknown) {
      console.error("Gemini AI analysis error, falling back to deterministic report: ", retryErr);
      return generateFallbackAnalysis(input);
    }
  }
}

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

/**
 * Curriculum / Competency JSON Importer
 * Usage: npx ts-node scripts/import-curriculum.ts path/to/curriculum.json
 */

interface CurriculumInput {
  careerRoles?: Array<{
    title: string;
    slug: string;
    description: string;
    sector: string;
    requiredScore?: number;
  }>;
  competencies?: Array<{
    competencyCode?: string | null;
    title: string;
    description: string;
    domain: string;
    requiredLevel?: number | null;
    curriculumSource?: string | null;
    regulationReference?: string | null;
    sourceType?: "official" | "institution_defined" | "industry_defined" | "prototype_generated";
  }>;
  skills?: Array<{
    careerRoleSlug: string;
    skillName: string;
    description?: string;
    requiredPercentage: number;
    requiredLevel?: number | null;
    weight: number;
    sourceType?: "official" | "institution_defined" | "industry_defined" | "prototype_generated";
    sourceReference?: string | null;
  }>;
  assessmentTopics?: Array<{
    careerRoleSlug: string;
    questionText: string;
    questionType: "mcq" | "multiple_select" | "scenario" | "rating";
    difficulty: "easy" | "medium" | "hard";
    skillTag: string;
    competencyCode?: string | null;
    explanation?: string;
    weight?: number;
    sourceType?: "official" | "institution_defined" | "industry_defined" | "prototype_generated";
    options: Array<{
      optionText: string;
      isCorrect: boolean;
      score?: number;
      displayOrder?: number;
    }>;
  }>;
}

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.log("Usage: npx tsx scripts/import-curriculum.ts <path-to-json-file>");
    process.exit(1);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in environment variables.");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const resolvedPath = path.resolve(process.cwd(), filePath);
  
  if (!fs.existsSync(resolvedPath)) {
    console.error(`File not found: ${resolvedPath}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(resolvedPath, "utf-8");
  const data: CurriculumInput = JSON.parse(fileContent);

  console.log(`Starting import of curriculum data from ${resolvedPath}...`);

  // 1. Import Career Roles
  const roleIdMap = new Map<string, string>();
  if (data.careerRoles && data.careerRoles.length > 0) {
    for (const role of data.careerRoles) {
      const { data: upserted, error } = await supabase
        .from("career_roles")
        .upsert(
          {
            title: role.title,
            slug: role.slug,
            description: role.description,
            sector: role.sector,
            required_score: role.requiredScore ?? 70,
            active: true
          },
          { onConflict: "slug" }
        )
        .select("id, slug")
        .single();

      if (error) {
        console.error(`Error inserting role ${role.slug}:`, error.message);
      } else if (upserted) {
        roleIdMap.set(upserted.slug, upserted.id);
        console.log(`✓ Career role saved: ${role.title} (${upserted.id})`);
      }
    }
  }

  // 2. Import Competencies
  if (data.competencies && data.competencies.length > 0) {
    for (const comp of data.competencies) {
      const { error } = await supabase.from("competencies").insert({
        competency_code: comp.competencyCode || null,
        title: comp.title,
        description: comp.description,
        domain: comp.domain,
        required_level: comp.requiredLevel || null,
        curriculum_source: comp.curriculumSource || null,
        regulation_reference: comp.regulationReference || null,
        source_type: comp.sourceType || "prototype_generated"
      });

      if (error) {
        console.error(`Error inserting competency ${comp.title}:`, error.message);
      } else {
        console.log(`✓ Competency saved: ${comp.title}`);
      }
    }
  }

  // 3. Import Skills
  if (data.skills && data.skills.length > 0) {
    for (const sk of data.skills) {
      let roleId = roleIdMap.get(sk.careerRoleSlug);
      if (!roleId) {
        const { data: found } = await supabase
          .from("career_roles")
          .select("id")
          .eq("slug", sk.careerRoleSlug)
          .single();
        if (found) roleId = found.id;
      }

      if (!roleId) {
        console.warn(`Skipping skill ${sk.skillName}: career role ${sk.careerRoleSlug} not found.`);
        continue;
      }

      const { error } = await supabase.from("career_skills").upsert(
        {
          career_role_id: roleId,
          skill_name: sk.skillName,
          description: sk.description || null,
          required_percentage: sk.requiredPercentage,
          required_level: sk.requiredLevel || null,
          weight: sk.weight,
          source_type: sk.sourceType || "prototype_generated",
          source_reference: sk.sourceReference || null
        },
        { onConflict: "career_role_id, skill_name" }
      );

      if (error) {
        console.error(`Error inserting skill ${sk.skillName}:`, error.message);
      } else {
        console.log(`✓ Skill saved: ${sk.skillName}`);
      }
    }
  }

  console.log("Curriculum import completed successfully!");
}

main().catch((err) => {
  console.error("Import error:", err);
  process.exit(1);
});

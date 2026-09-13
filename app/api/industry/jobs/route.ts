import { NextRequest, NextResponse } from "next/server";
import { mockDb, organizations } from "@/lib/dummy-data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get("orgId") || undefined;
    const jobs = mockDb.getJobOpportunities(orgId);
    return NextResponse.json({ jobs });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to fetch jobs";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orgId = organizations[0].id, orgName = organizations[0].name, title, roleType, location, locationType, stipendOrSalary, duration, description, requiredSkills } = body;

    if (!title || !description || !requiredSkills || requiredSkills.length === 0) {
      return NextResponse.json({ error: "Title, description, and required skills are required." }, { status: 400 });
    }

    const newJob = mockDb.createJobOpportunity({
      org_id: orgId,
      org_name: orgName,
      title,
      role_type: roleType || "Internship",
      location: location || "Bengaluru, Karnataka",
      location_type: locationType || "Onsite",
      stipend_or_salary: stipendOrSalary || "Competitive Stipend",
      duration: duration || "6 Months",
      description,
      required_skills: requiredSkills
    });

    return NextResponse.json({ success: true, job: newJob });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to post job";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobId } = body;

    if (!jobId) {
      return NextResponse.json({ error: "jobId is required." }, { status: 400 });
    }

    const updatedJob = mockDb.toggleJobStatus(jobId);
    if (!updatedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, job: updatedJob });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update job";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

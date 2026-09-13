import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/lib/dummy-data";
import { ApplicationStatus } from "@/types/assessment";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get("orgId") || undefined;
    const applications = mockDb.getApplications(orgId);
    return NextResponse.json({ applications });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to fetch applications";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { applicationId, status } = body;

    if (!applicationId || !status) {
      return NextResponse.json({ error: "applicationId and status are required." }, { status: 400 });
    }

    const success = mockDb.updateApplicationStatus(applicationId, status as ApplicationStatus);
    if (!success) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, status });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update application status";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      jobId, 
      jobTitle, 
      orgId, 
      studentId, 
      studentName, 
      studentEmail, 
      college, 
      course, 
      semester, 
      readinessScore, 
      readinessLevel,
      skillsSummary 
    } = body;

    if (!jobId || !studentId || !studentName) {
      return NextResponse.json({ error: "jobId, studentId, and studentName are required." }, { status: 400 });
    }

    const application = mockDb.createApplication({
      job_id: jobId,
      job_title: jobTitle || "Ayurvedic Clinical Opportunity",
      org_id: orgId || "ORG001",
      student_id: studentId,
      student_name: studentName,
      student_email: studentEmail || "student@ayush.edu.in",
      college: college || "National Institute of Ayurveda, Jaipur",
      course: course || "BAMS",
      semester: semester || 6,
      readiness_score: readinessScore || 0,
      readiness_level: readinessLevel || "Developing",
      status: "Pending Review",
      skills_summary: skillsSummary || []
    });

    return NextResponse.json({ success: true, application });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to submit application";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}


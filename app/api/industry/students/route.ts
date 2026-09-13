import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/lib/dummy-data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const institution = searchParams.get("institution") || undefined;
    const skillQuery = searchParams.get("skill") || undefined;

    const students = mockDb.getTalentDirectory({ institution, skillQuery });
    return NextResponse.json({ students });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to search students";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

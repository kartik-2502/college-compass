import { NextRequest, NextResponse } from "next/server";
import { getCollegeBySlug } from "@/lib/colleges";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const college = await getCollegeBySlug(slug);

    if (!college) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    return NextResponse.json(college);
  } catch (error) {
    console.error("GET /api/colleges/[slug] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

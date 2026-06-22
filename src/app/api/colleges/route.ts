import { NextRequest, NextResponse } from "next/server";
import { collegeSearchSchema } from "@/lib/validations";
import { searchColleges } from "@/lib/colleges";

export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams.entries());
    const parsed = collegeSearchSchema.safeParse(params);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const result = await searchColleges(parsed.data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/colleges error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

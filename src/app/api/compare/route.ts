import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCollegesByIds } from "@/lib/colleges";

const compareQuerySchema = z.object({
  ids: z.string().transform((val) => val.split(",").filter(Boolean)),
});

export async function GET(request: NextRequest) {
  try {
    const idsParam = request.nextUrl.searchParams.get("ids");
    if (!idsParam) {
      return NextResponse.json({ error: "ids query parameter is required" }, { status: 400 });
    }

    const parsed = compareQuerySchema.safeParse({ ids: idsParam });
    if (!parsed.success || parsed.data.ids.length < 2 || parsed.data.ids.length > 3) {
      return NextResponse.json(
        { error: "Provide 2-3 college IDs separated by commas" },
        { status: 400 },
      );
    }

    const colleges = await getCollegesByIds(parsed.data.ids);

    if (colleges.length < 2) {
      return NextResponse.json({ error: "Could not find enough colleges to compare" }, { status: 404 });
    }

    return NextResponse.json({ colleges });
  } catch (error) {
    console.error("GET /api/compare error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

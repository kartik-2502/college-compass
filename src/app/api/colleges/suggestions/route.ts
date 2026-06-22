import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCollegeSuggestions } from "@/lib/colleges";

const schema = z.object({
  q: z.string().min(1),
  limit: z.coerce.number().int().min(1).max(10).optional().default(6),
});

export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams.entries());
    const parsed = schema.safeParse(params);

    if (!parsed.success) {
      return NextResponse.json({ suggestions: [] });
    }

    const suggestions = await getCollegeSuggestions(parsed.data.q, parsed.data.limit);
    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("GET /api/colleges/suggestions error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

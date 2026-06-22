import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/api-auth";
import { savedComparisonSchema } from "@/lib/validations";
import { getSavedComparisons } from "@/lib/colleges";

export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;

  const comparisons = await getSavedComparisons(session!.user!.id);
  return NextResponse.json({ comparisons });
}

export async function POST(request: NextRequest) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const body = await request.json();
    const parsed = savedComparisonSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid comparison data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const colleges = await prisma.college.findMany({
      where: { id: { in: parsed.data.collegeIds } },
      select: { id: true },
    });

    if (colleges.length !== parsed.data.collegeIds.length) {
      return NextResponse.json({ error: "One or more colleges not found" }, { status: 404 });
    }

    const comparison = await prisma.savedComparison.create({
      data: {
        userId: session!.user!.id,
        name: parsed.data.name ?? "My Comparison",
        collegeIds: JSON.stringify(parsed.data.collegeIds),
      },
    });

    return NextResponse.json({ comparison }, { status: 201 });
  } catch (err) {
    console.error("POST /api/saved/comparisons error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await prisma.savedComparison.deleteMany({
      where: { id, userId: session!.user!.id },
    });

    return NextResponse.json({ deleted: true });
  } catch (err) {
    console.error("DELETE /api/saved/comparisons error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

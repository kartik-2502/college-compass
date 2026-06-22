import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/api-auth";

export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;

  const saved = await prisma.savedCollege.findMany({
    where: { userId: session!.user!.id },
    select: { collegeId: true },
  });

  return NextResponse.json({ collegeIds: saved.map((s) => s.collegeId) });
}

export async function POST(request: NextRequest) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const { collegeId } = await request.json();
    if (!collegeId || typeof collegeId !== "string") {
      return NextResponse.json({ error: "collegeId is required" }, { status: 400 });
    }

    const college = await prisma.college.findUnique({ where: { id: collegeId } });
    if (!college) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    await prisma.savedCollege.upsert({
      where: {
        userId_collegeId: {
          userId: session!.user!.id,
          collegeId,
        },
      },
      create: {
        userId: session!.user!.id,
        collegeId,
      },
      update: {},
    });

    return NextResponse.json({ saved: true });
  } catch (err) {
    console.error("POST /api/saved/colleges error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const collegeId = request.nextUrl.searchParams.get("collegeId");
    if (!collegeId) {
      return NextResponse.json({ error: "collegeId is required" }, { status: 400 });
    }

    await prisma.savedCollege.deleteMany({
      where: {
        userId: session!.user!.id,
        collegeId,
      },
    });

    return NextResponse.json({ saved: false });
  } catch (err) {
    console.error("DELETE /api/saved/colleges error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

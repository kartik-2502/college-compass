import { Suspense } from "react";
import { CompareEmptyState, CompareTable } from "@/components/compare/compare-table";
import { CompareStarter } from "@/components/compare/compare-starter";
import { getCollegesByIds } from "@/lib/colleges";
import { prisma } from "@/lib/db";

type PageProps = {
  searchParams: Promise<{ ids?: string }>;
};

export const metadata = {
  title: "Compare Colleges",
};

export const dynamic = "force-dynamic";

async function CompareContent({ ids }: { ids?: string }) {
  const idList = ids?.split(",").filter(Boolean) ?? [];

  if (idList.length === 0) {
    return <CompareEmptyState />;
  }

  if (idList.length === 1) {
    const college = await prisma.college.findUnique({
      where: { id: idList[0] },
      select: {
        id: true,
        slug: true,
        name: true,
        city: true,
        state: true,
        feesPerYear: true,
        rating: true,
      },
    });

    if (!college) return <CompareEmptyState />;
    return <CompareStarter college={college} />;
  }

  const colleges = await getCollegesByIds(idList);

  if (colleges.length < 2) {
    return <CompareEmptyState />;
  }

  return <CompareTable colleges={colleges} />;
}

export default async function ComparePage({ searchParams }: PageProps) {
  const { ids } = await searchParams;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Compare colleges</h1>
        <p className="mt-2 text-slate-600">
          Side-by-side comparison of fees, placements, ratings, and location.
        </p>
      </div>

      <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-slate-200" />}>
        <CompareContent ids={ids} />
      </Suspense>
    </div>
  );
}

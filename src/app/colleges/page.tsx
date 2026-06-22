import { Suspense } from "react";
import { CollegeCard } from "@/components/colleges/college-card";
import { CollegeFilters } from "@/components/colleges/college-filters";
import { Pagination } from "@/components/colleges/pagination";
import { collegeSearchSchema } from "@/lib/validations";
import { searchColleges } from "@/lib/colleges";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata = {
  title: "Explore Colleges",
};

export const dynamic = "force-dynamic";

export default async function CollegesPage({ searchParams }: PageProps) {
  const rawParams = await searchParams;
  const flatParams = Object.fromEntries(
    Object.entries(rawParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]),
  );

  const parsed = collegeSearchSchema.parse(flatParams);
  const { colleges, pagination, filters } = await searchColleges(parsed);

  const paginationParams = {
    q: parsed.q,
    state: parsed.state,
    type: parsed.type,
    minFees: parsed.minFees?.toString(),
    maxFees: parsed.maxFees?.toString(),
    minRating: parsed.minRating?.toString(),
    sort: parsed.sort,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Explore colleges</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {pagination.total} colleges found · Page {pagination.page} of {pagination.totalPages}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />}>
          <CollegeFilters filters={filters} />
        </Suspense>

        <div>
          {colleges.length === 0 ? (
            <div className="surface p-10 text-center">
              <p className="text-lg font-medium text-slate-900 dark:text-slate-100">No colleges match your filters</p>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Try adjusting search criteria or clearing filters.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
              {colleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          )}

          <div className="mt-8">
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              params={paginationParams}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

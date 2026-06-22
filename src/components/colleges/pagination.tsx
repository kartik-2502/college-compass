import Link from "next/link";
import { buildPageUrl } from "@/lib/utils";

type PaginationProps = {
  page: number;
  totalPages: number;
  params: Record<string, string | undefined>;
};

export function Pagination({ page, totalPages, params }: PaginationProps) {
  if (totalPages <= 1) return null;

  const prevUrl = page > 1 ? buildPageUrl("/colleges", { ...params, page: page - 1 }) : null;
  const nextUrl = page < totalPages ? buildPageUrl("/colleges", { ...params, page: page + 1 }) : null;

  return (
    <nav className="flex items-center justify-between border-t border-slate-200 pt-6" aria-label="Pagination">
      <p className="text-sm text-slate-600">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        {prevUrl ? (
          <Link
            href={prevUrl}
            className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Previous
          </Link>
        ) : (
          <span className="rounded-md border border-slate-100 px-4 py-2 text-sm text-slate-400">
            Previous
          </span>
        )}
        {nextUrl ? (
          <Link
            href={nextUrl}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Next
          </Link>
        ) : (
          <span className="rounded-md border border-slate-100 px-4 py-2 text-sm text-slate-400">Next</span>
        )}
      </div>
    </nav>
  );
}

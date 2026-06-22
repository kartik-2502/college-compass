import { formatCurrency, formatRating } from "@/lib/utils";
import Link from "next/link";
import { SaveCollegeButton } from "./save-college-button";

type CollegeListItem = {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  type: string;
  feesPerYear: number;
  rating: number;
  placements?: { avgPackage: number; placementRate: number }[];
};

export function CollegeCard({
  college,
  showCompareLink = true,
}: {
  college: CollegeListItem;
  showCompareLink?: boolean;
}) {
  const latestPlacement = college.placements?.[0];

  return (
    <article className="surface flex flex-col p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <span className="inline-block rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            {college.type}
          </span>
          <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100">
            <Link href={`/colleges/${college.slug}`} className="hover:text-indigo-700 dark:hover:text-indigo-400">
              {college.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {college.city}, {college.state}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-sm font-semibold text-amber-800">
          <span aria-hidden>★</span>
          {formatRating(college.rating)}
        </div>
      </div>

      <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-sm">
        <div>
          <dt className="text-slate-500">Annual Fees</dt>
          <dd className="font-medium text-slate-900">{formatCurrency(college.feesPerYear)}</dd>
        </div>
        {latestPlacement && (
          <div>
            <dt className="text-slate-500">Avg Package</dt>
            <dd className="font-medium text-slate-900">₹{latestPlacement.avgPackage} LPA</dd>
          </div>
        )}
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/colleges/${college.slug}`}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          View details
        </Link>
        {showCompareLink && (
          <Link
            href={`/compare?ids=${college.id}`}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Add to compare
          </Link>
        )}
        <SaveCollegeButton collegeId={college.id} />
      </div>
    </article>
  );
}

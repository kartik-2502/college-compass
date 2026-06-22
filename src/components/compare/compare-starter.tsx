"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CollegeSearchAutocomplete } from "@/components/colleges/college-search-autocomplete";
import { formatCurrency, formatRating } from "@/lib/utils";

type CollegePreview = {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  feesPerYear: number;
  rating: number;
};

export function CompareStarter({ college }: { college: CollegePreview }) {
  const router = useRouter();

  function compareWith(id: string) {
    router.push(`/compare?ids=${college.id},${id}`);
  }

  return (
    <div className="space-y-6">
      <div className="surface p-6 shadow-sm">
        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Selected college</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
          {college.name}
        </h2>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          {college.city}, {college.state} · ★ {formatRating(college.rating)} ·{" "}
          {formatCurrency(college.feesPerYear)}
        </p>
        <Link
          href={`/colleges/${college.slug}`}
          className="mt-3 inline-block text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
        >
          View profile →
        </Link>
      </div>

      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 dark:border-slate-600 dark:bg-slate-900/50">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
          Add a college to compare
        </h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Start typing — suggestions will appear as you type
        </p>
        <div className="mt-4">
          <CollegeSearchAutocomplete
            id="compare-search"
            name="compare-search"
            placeholder="Search by name, city, or state..."
            onSelectCollege={(selected) => {
              if (selected.id !== college.id) compareWith(selected.id);
            }}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { CollegeSearchAutocomplete } from "@/components/colleges/college-search-autocomplete";
import { SORT_OPTIONS } from "@/lib/utils";

type FilterOptions = {
  states: string[];
  types: string[];
};

export function CollegeFilters({ filters }: { filters: FilterOptions }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      params.delete("page");
      startTransition(() => {
        router.push(`/colleges?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const current = {
    q: searchParams.get("q") ?? "",
    state: searchParams.get("state") ?? "",
    type: searchParams.get("type") ?? "",
    minFees: searchParams.get("minFees") ?? "",
    maxFees: searchParams.get("maxFees") ?? "",
    minRating: searchParams.get("minRating") ?? "",
    sort: searchParams.get("sort") ?? "rating",
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateParams({
      q: (formData.get("q") as string) || undefined,
      state: (formData.get("state") as string) || undefined,
      type: (formData.get("type") as string) || undefined,
      minFees: (formData.get("minFees") as string) || undefined,
      maxFees: (formData.get("maxFees") as string) || undefined,
      minRating: (formData.get("minRating") as string) || undefined,
      sort: (formData.get("sort") as string) || "rating",
    });
  }

  function clearFilters() {
    startTransition(() => router.push("/colleges"));
  }

  return (
    <aside className="surface p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Filters</h2>
        {isPending && (
          <span className="text-xs text-indigo-600 dark:text-indigo-400">Updating...</span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="q" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Search
          </label>
          <CollegeSearchAutocomplete
            id="q"
            name="q"
            defaultValue={current.q}
            placeholder="College, city, state..."
            onApply={(q) =>
              updateParams({
                q,
                state: current.state || undefined,
                type: current.type || undefined,
                minFees: current.minFees || undefined,
                maxFees: current.maxFees || undefined,
                minRating: current.minRating || undefined,
                sort: current.sort,
              })
            }
          />
        </div>

        <div>
          <label htmlFor="state" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            State
          </label>
          <select
            id="state"
            name="state"
            defaultValue={current.state}
            className="input-field"
          >
            <option value="">All states</option>
            {filters.states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="type" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Institution type
          </label>
          <select id="type" name="type" defaultValue={current.type} className="input-field">
            <option value="">All types</option>
            {filters.types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="minFees" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Min fees
            </label>
            <input
              id="minFees"
              name="minFees"
              type="number"
              min={0}
              step={10000}
              defaultValue={current.minFees}
              placeholder="0"
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="maxFees" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Max fees
            </label>
            <input
              id="maxFees"
              name="maxFees"
              type="number"
              min={0}
              step={10000}
              defaultValue={current.maxFees}
              placeholder="500000"
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label htmlFor="minRating" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Minimum rating
          </label>
          <input
            id="minRating"
            name="minRating"
            type="number"
            min={0}
            max={5}
            step={0.1}
            defaultValue={current.minRating}
            placeholder="4.0"
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="sort" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Sort by
          </label>
          <select id="sort" name="sort" defaultValue={current.sort} className="input-field">
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Apply
          </button>
          <button type="button" onClick={clearFilters} className="btn-secondary">
            Clear
          </button>
        </div>
      </form>
    </aside>
  );
}

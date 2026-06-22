"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type SavedComparison = {
  id: string;
  name: string | null;
  collegeIds: string;
  colleges: ({ id: string; slug: string; name: string } | undefined)[];
};

export function SavedPageClient({ comparisons }: { comparisons: SavedComparison[] }) {
  const router = useRouter();

  async function deleteComparison(id: string) {
    await fetch(`/api/saved/comparisons?id=${id}`, { method: "DELETE" });
    router.refresh();
  }

  if (comparisons.length === 0) {
    return (
      <p className="mt-4 text-slate-600">
        No saved comparisons yet.{" "}
        <Link href="/compare" className="text-indigo-600 hover:text-indigo-800">
          Start comparing
        </Link>
      </p>
    );
  }

  return (
    <ul className="mt-4 space-y-3">
      {comparisons.map((comparison) => {
        const ids = JSON.parse(comparison.collegeIds) as string[];
        return (
          <li
            key={comparison.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4"
          >
            <div>
              <p className="font-medium text-slate-900">{comparison.name ?? "Comparison"}</p>
              <p className="mt-1 text-sm text-slate-600">
                {comparison.colleges.filter(Boolean).map((c) => c!.name).join(" vs ")}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/compare?ids=${ids.join(",")}`}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Open
              </Link>
              <button
                onClick={() => deleteComparison(comparison.id)}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

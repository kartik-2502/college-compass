"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { formatCurrency, formatPackage, formatRating, parseRecruiters } from "@/lib/utils";

type CompareCollege = {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  type: string;
  feesPerYear: number;
  rating: number;
  overview: string;
  established: number | null;
  accreditation: string | null;
  placements: {
    year: number;
    avgPackage: number;
    highestPackage: number;
    placementRate: number;
    topRecruiters: string;
  }[];
  courses: { name: string; degree: string; duration: string }[];
  reviews: { rating: number }[];
};

export function CompareTable({ colleges }: { colleges: CompareCollege[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function removeCollege(id: string) {
    const ids = colleges.filter((c) => c.id !== id).map((c) => c.id);
    if (ids.length < 2) {
      router.push("/compare");
    } else {
      router.push(`/compare?ids=${ids.join(",")}`);
    }
  }

  function addCollegeId(id: string) {
    const current = searchParams.get("ids")?.split(",").filter(Boolean) ?? [];
    if (current.includes(id) || current.length >= 3) return;
    router.push(`/compare?ids=${[...current, id].join(",")}`);
  }

  async function saveComparison() {
    if (!session) {
      router.push("/login?callbackUrl=/compare");
      return;
    }

    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/saved/comparisons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${colleges[0]?.name.split(" ")[0]} vs ${colleges[1]?.name.split(" ")[0]}`,
          collegeIds: colleges.map((c) => c.id),
        }),
      });

      if (res.ok) {
        setMessage("Comparison saved to your account.");
      } else {
        const data = await res.json();
        setMessage(data.error ?? "Failed to save comparison.");
      }
    } finally {
      setSaving(false);
    }
  }

  const rows = [
    {
      label: "Location",
      render: (c: CompareCollege) => `${c.city}, ${c.state}`,
    },
    {
      label: "Type",
      render: (c: CompareCollege) => c.type,
    },
    {
      label: "Rating",
      render: (c: CompareCollege) => `${formatRating(c.rating)} / 5`,
    },
    {
      label: "Annual Fees",
      render: (c: CompareCollege) => formatCurrency(c.feesPerYear),
    },
    {
      label: "Established",
      render: (c: CompareCollege) => (c.established ? String(c.established) : "—"),
    },
    {
      label: "Accreditation",
      render: (c: CompareCollege) => c.accreditation ?? "—",
    },
    {
      label: "Avg Package",
      render: (c: CompareCollege) =>
        c.placements[0] ? formatPackage(c.placements[0].avgPackage) : "—",
    },
    {
      label: "Highest Package",
      render: (c: CompareCollege) =>
        c.placements[0] ? formatPackage(c.placements[0].highestPackage) : "—",
    },
    {
      label: "Placement Rate",
      render: (c: CompareCollege) =>
        c.placements[0] ? `${c.placements[0].placementRate}%` : "—",
    },
    {
      label: "Top Recruiters",
      render: (c: CompareCollege) =>
        c.placements[0] ? parseRecruiters(c.placements[0].topRecruiters).join(", ") : "—",
    },
    {
      label: "Popular Courses",
      render: (c: CompareCollege) =>
        c.courses.slice(0, 3).map((course) => `${course.degree} ${course.name}`).join("; ") || "—",
    },
    {
      label: "Review Count",
      render: (c: CompareCollege) => String(c.reviews.length),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          Comparing {colleges.length} of 3 colleges
        </p>
        <div className="flex gap-2">
          <button
            onClick={saveComparison}
            disabled={saving}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save comparison"}
          </button>
          <Link
            href="/colleges"
            className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Add more colleges
          </Link>
        </div>
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-2 text-sm text-emerald-800">{message}</p>
      )}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="sticky left-0 z-10 bg-slate-50 px-4 py-3 font-semibold text-slate-900">
                Attribute
              </th>
              {colleges.map((college) => (
                <th key={college.id} className="min-w-[220px] px-4 py-3 align-top">
                  <div className="space-y-2">
                    <Link
                      href={`/colleges/${college.slug}`}
                      className="block font-semibold text-indigo-700 hover:underline"
                    >
                      {college.name}
                    </Link>
                    <button
                      onClick={() => removeCollege(college.id)}
                      className="text-xs text-slate-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-slate-100">
                <th className="sticky left-0 z-10 bg-white px-4 py-3 font-medium text-slate-700">
                  {row.label}
                </th>
                {colleges.map((college) => (
                  <td key={college.id} className="px-4 py-3 text-slate-900">
                    {row.render(college)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ComparePicker onSelect={addCollegeId} disabled={colleges.length >= 3} />
    </div>
  );
}

function ComparePicker({
  onSelect,
  disabled,
}: {
  onSelect: (id: string) => void;
  disabled: boolean;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: string; name: string; city: string; state: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    if (disabled || !query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/colleges?q=${encodeURIComponent(query)}&limit=5`);
      const data = await res.json();
      setResults(data.colleges ?? []);
    } finally {
      setLoading(false);
    }
  }

  if (disabled) return null;

  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
      <h3 className="text-sm font-semibold text-slate-900">Add a third college</h3>
      <form onSubmit={search} className="mt-3 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search college name..."
          className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
        >
          Search
        </button>
      </form>
      {results.length > 0 && (
        <ul className="mt-3 space-y-2">
          {results.map((college) => (
            <li key={college.id} className="flex items-center justify-between rounded-md bg-white px-3 py-2 ring-1 ring-slate-200">
              <span className="text-sm">
                {college.name} — {college.city}, {college.state}
              </span>
              <button
                onClick={() => onSelect(college.id)}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function CompareEmptyState() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Compare colleges side by side</h2>
      <p className="mx-auto mt-2 max-w-lg text-slate-600">
        Select 2–3 colleges to compare fees, placements, ratings, and location. Start from a college
        listing or search below.
      </p>
      <Link
        href="/colleges"
        className="mt-6 inline-block rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Browse colleges
      </Link>
    </div>
  );
}

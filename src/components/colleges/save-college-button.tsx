"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function SaveCollegeButton({ collegeId }: { collegeId: string }) {
  const { data: session, status } = useSession();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session) return;

    fetch("/api/saved/colleges")
      .then((res) => res.json())
      .then((data) => {
        if (data.collegeIds?.includes(collegeId)) {
          setSaved(true);
        }
      })
      .catch(() => undefined);
  }, [session, collegeId]);

  if (status !== "authenticated") return null;

  async function toggleSave() {
    setLoading(true);
    try {
      const res = await fetch(
        saved ? `/api/saved/colleges?collegeId=${collegeId}` : "/api/saved/colleges",
        {
          method: saved ? "DELETE" : "POST",
          headers: { "Content-Type": "application/json" },
          body: saved ? undefined : JSON.stringify({ collegeId }),
        },
      );

      if (res.ok) {
        setSaved(!saved);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggleSave}
      disabled={loading}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        saved
          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          : "border border-slate-200 text-slate-700 hover:bg-slate-50"
      }`}
    >
      {loading ? "..." : saved ? "Saved" : "Save"}
    </button>
  );
}

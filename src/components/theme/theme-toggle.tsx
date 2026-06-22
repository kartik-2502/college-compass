"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-[72px] animate-pulse rounded-md bg-slate-100 dark:bg-slate-800" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="btn-secondary flex items-center gap-1.5 px-2.5 py-2"
      aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
      title={isDark ? "Day mode" : "Night mode"}
    >
      <span aria-hidden>{isDark ? "☀️" : "🌙"}</span>
      <span className="hidden text-xs sm:inline">{isDark ? "Day" : "Night"}</span>
    </button>
  );
}

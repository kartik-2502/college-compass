"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { formatRating } from "@/lib/utils";

export type CollegeSuggestion = {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  type: string;
  rating: number;
};

type CollegeSearchAutocompleteProps = {
  id?: string;
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  /** When true, selecting a suggestion applies the search query to the listing */
  applyOnSelect?: boolean;
  onApply?: (query: string) => void;
  onSelectCollege?: (college: CollegeSuggestion) => void;
};

export function CollegeSearchAutocomplete({
  id = "q",
  name = "q",
  defaultValue = "",
  placeholder = "Search colleges, cities, states...",
  className = "",
  applyOnSelect = false,
  onApply,
  onSelectCollege,
}: CollegeSearchAutocompleteProps) {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<CollegeSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  const fetchSuggestions = useCallback(async (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `/api/colleges/suggestions?q=${encodeURIComponent(trimmed)}&limit=6`,
      );
      const data = await res.json();
      setSuggestions(data.suggestions ?? []);
      setOpen(true);
      setActiveIndex(-1);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(query);
    }, 250);
    return () => clearTimeout(timer);
  }, [query, fetchSuggestions]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectSuggestion(college: CollegeSuggestion) {
    setQuery(college.name);
    setOpen(false);

    if (onSelectCollege) {
      onSelectCollege(college);
      return;
    }

    if (applyOnSelect && onApply) {
      onApply(college.name);
      return;
    }

    router.push(`/colleges/${college.slug}`);
  }

  function applySearch() {
    const trimmed = query.trim();
    if (!trimmed) return;
    setOpen(false);
    if (onApply) {
      onApply(trimmed);
    } else {
      router.push(`/colleges?q=${encodeURIComponent(trimmed)}`);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) {
      if (e.key === "Enter") {
        e.preventDefault();
        applySearch();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) {
        selectSuggestion(suggestions[activeIndex]);
      } else {
        applySearch();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          id={id}
          name={name}
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && suggestions.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="input-field pr-9"
        />
        {loading && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
            …
          </span>
        )}
      </div>

      {open && (suggestions.length > 0 || query.trim().length >= 2) && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-600 dark:bg-slate-800"
        >
          {suggestions.length === 0 && !loading && (
            <li className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
              No colleges found — press Enter to search
            </li>
          )}

          {suggestions.map((college, index) => (
            <li key={college.id} role="option" aria-selected={index === activeIndex}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectSuggestion(college)}
                className={`flex w-full items-start justify-between gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-950/50 ${
                  index === activeIndex ? "bg-indigo-50 dark:bg-indigo-950/50" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-900 dark:text-slate-100">
                    {college.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {college.city}, {college.state} · {college.type}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-semibold text-amber-700 dark:text-amber-400">
                  ★ {formatRating(college.rating)}
                </span>
              </button>
            </li>
          ))}

          {query.trim().length >= 2 && (
            <li className="border-t border-slate-100 dark:border-slate-700">
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={applySearch}
                className="w-full px-3 py-2 text-left text-sm font-medium text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/50"
              >
                Search all results for &ldquo;{query.trim()}&rdquo;
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

/** Compact hero search — navigates on select or Enter */
export function HeroCollegeSearch() {
  const router = useRouter();

  return (
    <div className="mt-8 max-w-xl">
      <CollegeSearchAutocomplete
        id="hero-search"
        name="hero-search"
        placeholder="Start typing a college name..."
        onApply={(q) => router.push(`/colleges?q=${encodeURIComponent(q)}`)}
      />
      <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
        Suggestions appear as you type — pick one or press Enter to search
      </p>
    </div>
  );
}

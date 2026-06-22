import Link from "next/link";
import { searchColleges } from "@/lib/colleges";
import { HeroCollegeSearch } from "@/components/colleges/college-search-autocomplete";

export default async function HomePage() {
  const { colleges, pagination } = await searchColleges({
    sort: "rating",
    page: 1,
    limit: 6,
  });

  return (
    <div>
      <section className="relative min-h-[480px] overflow-hidden border-b border-slate-200 dark:border-slate-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-iit.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/60 to-white/30 dark:from-slate-950/90 dark:via-slate-950/80 dark:to-slate-950/60"
          aria-hidden
        />
        <div className="absolute inset-0 bg-indigo-900/5 dark:bg-indigo-950/20" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
              College discovery platform
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Find the right college with data you can trust
            </h1>
            <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
              Search 30+ institutes, filter by fees and ratings, compare side-by-side, and save
              your shortlist — all powered by a real database and REST APIs.
            </p>
            <HeroCollegeSearch />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/colleges"
                className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Explore colleges
              </Link>
              <Link
                href="/compare"
                className="rounded-md border border-slate-200/80 bg-white/90 px-5 py-2.5 text-sm font-medium text-slate-700 backdrop-blur-sm hover:bg-white dark:border-slate-600 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                Compare colleges
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Top rated colleges</h2>
            <p className="mt-1 text-slate-600 dark:text-slate-400">Curated from our seeded dataset of Indian institutes</p>
          </div>
          <Link href="/colleges" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
            View all {pagination.total} →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {colleges.map((college) => (
            <article key={college.id} className="surface p-5 shadow-sm">
              <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">{college.type}</span>
              <h3 className="mt-2 font-semibold text-slate-900 dark:text-slate-100">
                <Link href={`/colleges/${college.slug}`} className="hover:text-indigo-700 dark:hover:text-indigo-400">
                  {college.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {college.city}, {college.state}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="font-medium dark:text-slate-200">★ {college.rating.toFixed(1)}</span>
                <span className="text-slate-600 dark:text-slate-400">
                  ₹{(college.feesPerYear / 100000).toFixed(1)}L/yr
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            {
              title: "Smart search & filters",
              body: "Filter by state, type, fees range, and minimum rating with server-side pagination.",
            },
            {
              title: "Rich college profiles",
              body: "Overview, courses, placement stats, and student reviews on every detail page.",
            },
            {
              title: "Compare & save",
              body: "Side-by-side comparison for up to 3 colleges with authenticated saved lists.",
            },
          ].map((feature) => (
            <div key={feature.title}>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

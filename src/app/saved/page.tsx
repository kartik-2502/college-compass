import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getSavedColleges, getSavedComparisons } from "@/lib/colleges";
import Link from "next/link";
import { formatCurrency, formatRating } from "@/lib/utils";
import { SavedPageClient } from "@/components/saved/saved-page-client";

export const metadata = {
  title: "Saved Items",
};

export const dynamic = "force-dynamic";

export default async function SavedPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/saved");
  }

  const [savedColleges, savedComparisons] = await Promise.all([
    getSavedColleges(session.user.id),
    getSavedComparisons(session.user.id),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Saved items</h1>
        <p className="mt-2 text-slate-600">Your shortlisted colleges and saved comparisons.</p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-slate-900">Saved colleges</h2>
        {savedColleges.length === 0 ? (
          <p className="mt-4 text-slate-600">
            No saved colleges yet.{" "}
            <Link href="/colleges" className="text-indigo-600 hover:text-indigo-800">
              Browse colleges
            </Link>
          </p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {savedColleges.map(({ college }) => (
              <article
                key={college.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="text-xs font-medium text-indigo-700">{college.type}</span>
                <h3 className="mt-2 font-semibold">
                  <Link href={`/colleges/${college.slug}`} className="hover:text-indigo-700">
                    {college.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {college.city}, {college.state}
                </p>
                <div className="mt-3 flex justify-between text-sm">
                  <span>★ {formatRating(college.rating)}</span>
                  <span>{formatCurrency(college.feesPerYear)}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Saved comparisons</h2>
        <SavedPageClient comparisons={savedComparisons} />
      </section>
    </div>
  );
}

import Link from "next/link";
import { formatCurrency, formatPackage, formatRating, parseRecruiters } from "@/lib/utils";
import { SaveCollegeButton } from "@/components/colleges/save-college-button";

type CollegeDetail = {
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
  website: string | null;
  courses: {
    id: string;
    name: string;
    degree: string;
    duration: string;
    feesPerYear: number | null;
    seats: number | null;
  }[];
  placements: {
    id: string;
    year: number;
    avgPackage: number;
    highestPackage: number;
    placementRate: number;
    topRecruiters: string;
  }[];
  reviews: {
    id: string;
    authorName: string;
    rating: number;
    title: string;
    content: string;
    createdAt: string | Date;
  }[];
};

export function CollegeDetailView({ college }: { college: CollegeDetail }) {
  const latestPlacement = college.placements[0];

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              {college.type}
            </span>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">{college.name}</h1>
            <p className="mt-2 text-slate-600">
              {college.city}, {college.state}
              {college.established ? ` · Est. ${college.established}` : ""}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="rounded-lg bg-amber-50 px-4 py-2 text-center">
              <p className="text-2xl font-bold text-amber-800">{formatRating(college.rating)}</p>
              <p className="text-xs text-amber-700">Overall rating</p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/compare?ids=${college.id}`}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Compare
              </Link>
              <SaveCollegeButton collegeId={college.id} />
            </div>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-slate-50 p-4">
            <dt className="text-sm text-slate-500">Annual fees</dt>
            <dd className="mt-1 text-lg font-semibold text-slate-900">
              {formatCurrency(college.feesPerYear)}
            </dd>
          </div>
          {latestPlacement && (
            <>
              <div className="rounded-lg bg-slate-50 p-4">
                <dt className="text-sm text-slate-500">Avg package ({latestPlacement.year})</dt>
                <dd className="mt-1 text-lg font-semibold text-slate-900">
                  {formatPackage(latestPlacement.avgPackage)}
                </dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <dt className="text-sm text-slate-500">Placement rate</dt>
                <dd className="mt-1 text-lg font-semibold text-slate-900">
                  {latestPlacement.placementRate}%
                </dd>
              </div>
            </>
          )}
          <div className="rounded-lg bg-slate-50 p-4">
            <dt className="text-sm text-slate-500">Accreditation</dt>
            <dd className="mt-1 text-lg font-semibold text-slate-900">
              {college.accreditation ?? "—"}
            </dd>
          </div>
        </dl>

        {college.website && (
          <a
            href={college.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            Visit official website →
          </a>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
        <p className="mt-3 leading-relaxed text-slate-700">{college.overview}</p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Courses</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-3 py-2 font-medium">Program</th>
                <th className="px-3 py-2 font-medium">Degree</th>
                <th className="px-3 py-2 font-medium">Duration</th>
                <th className="px-3 py-2 font-medium">Fees/yr</th>
                <th className="px-3 py-2 font-medium">Seats</th>
              </tr>
            </thead>
            <tbody>
              {college.courses.map((course) => (
                <tr key={course.id} className="border-b border-slate-100">
                  <td className="px-3 py-3 font-medium text-slate-900">{course.name}</td>
                  <td className="px-3 py-3">{course.degree}</td>
                  <td className="px-3 py-3">{course.duration}</td>
                  <td className="px-3 py-3">
                    {course.feesPerYear ? formatCurrency(course.feesPerYear) : "—"}
                  </td>
                  <td className="px-3 py-3">{course.seats ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Placements</h2>
        {college.placements.length === 0 ? (
          <p className="mt-3 text-slate-600">No placement data available.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {college.placements.map((placement) => (
              <div key={placement.id} className="rounded-lg border border-slate-100 p-4">
                <h3 className="font-medium text-slate-900">{placement.year} batch</h3>
                <dl className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div>
                    <dt className="text-sm text-slate-500">Average package</dt>
                    <dd className="font-semibold">{formatPackage(placement.avgPackage)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-slate-500">Highest package</dt>
                    <dd className="font-semibold">{formatPackage(placement.highestPackage)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-slate-500">Placement rate</dt>
                    <dd className="font-semibold">{placement.placementRate}%</dd>
                  </div>
                </dl>
                <p className="mt-3 text-sm text-slate-600">
                  <span className="font-medium text-slate-700">Top recruiters:</span>{" "}
                  {parseRecruiters(placement.topRecruiters).join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Reviews</h2>
        {college.reviews.length === 0 ? (
          <p className="mt-3 text-slate-600">No reviews yet.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {college.reviews.map((review) => (
              <li key={review.id} className="rounded-lg border border-slate-100 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-slate-900">{review.title}</p>
                  <span className="rounded bg-amber-50 px-2 py-0.5 text-sm font-semibold text-amber-800">
                    {formatRating(review.rating)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">by {review.authorName}</p>
                <p className="mt-2 text-slate-700">{review.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

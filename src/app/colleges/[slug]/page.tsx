import Link from "next/link";
import { notFound } from "next/navigation";
import { CollegeDetailView } from "@/components/colleges/college-detail";
import { getCollegeBySlug } from "@/lib/colleges";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const college = await getCollegeBySlug(slug);
  if (!college) return { title: "College not found" };
  return {
    title: college.name,
    description: college.overview.slice(0, 160),
  };
}

export default async function CollegeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const college = await getCollegeBySlug(slug);

  if (!college) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/colleges"
        className="mb-6 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-800"
      >
        ← Back to listings
      </Link>
      <CollegeDetailView college={college} />
    </div>
  );
}

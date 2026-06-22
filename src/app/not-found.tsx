import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-slate-900">404</h1>
      <p className="mt-4 text-slate-600">The page or college you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/colleges"
        className="mt-6 inline-block rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Browse colleges
      </Link>
    </div>
  );
}

import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

type PageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export const metadata = {
  title: "Sign In",
};

export default async function LoginPage({ searchParams }: PageProps) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900">Sign in</h1>
      <p className="mt-2 text-slate-600">Access saved colleges and comparisons.</p>
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Suspense fallback={null}>
          <LoginForm callbackUrl={callbackUrl ?? "/colleges"} />
        </Suspense>
      </div>
    </div>
  );
}

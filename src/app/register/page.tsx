import { RegisterForm } from "@/components/auth/register-form";

export const metadata = {
  title: "Create Account",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900">Create account</h1>
      <p className="mt-2 text-slate-600">Save colleges and comparisons to your profile.</p>
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <RegisterForm />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = { title: "Admin sign in" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_20%,#3a2954_0%,#1f1830_58%,#0c0815_100%)] px-6 text-cream">
      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2">
        <FlowerOfLife size={380} stroke="#c4978a" opacity={0.15} />
      </div>
      <div className="relative w-full max-w-sm rounded-card border border-cream/15 bg-cream/[0.06] p-9">
        <Logo dark />
        <h1 className="mt-8 font-display text-3xl">Admin sign in</h1>
        <p className="mt-2 font-serif italic text-cream/60">The master dashboard for the Collective.</p>

        <form action="/api/admin/login" method="POST" className="mt-7 flex flex-col gap-4">
          <label className="block">
            <span className="font-sans text-[11px] uppercase tracking-widest text-cream/55">Email</span>
            <input
              type="email"
              name="email"
              required
              className="mt-2 w-full rounded-xl border border-cream/25 bg-transparent px-4 py-3 font-serif text-lg text-cream outline-none focus:border-cream"
            />
          </label>
          <label className="block">
            <span className="font-sans text-[11px] uppercase tracking-widest text-cream/55">Password</span>
            <input
              type="password"
              name="password"
              required
              className="mt-2 w-full rounded-xl border border-cream/25 bg-transparent px-4 py-3 font-serif text-lg text-cream outline-none focus:border-cream"
            />
          </label>
          {sp.error === "1" && (
            <p className="font-sans text-xs text-rose">Incorrect email or password.</p>
          )}
          <button
            type="submit"
            className="mt-2 rounded-pill bg-rose py-3.5 font-sans text-xs font-semibold uppercase tracking-widest text-deep"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

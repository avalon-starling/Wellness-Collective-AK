import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/ui";
import { getSession } from "@/lib/member-auth";
import { MemberLoginForm } from "./form";

export const metadata: Metadata = {
  title: "Member Login",
  description: "Log in to your Wellness Collective member account",
};

export default async function MemberLoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/member/dashboard");
  }

  return (
    <div>
      <Nav />
      <section className="bg-paper px-6 py-16 md:px-14">
        <div className="mx-auto max-w-md">
          <Eyebrow>Member Area</Eyebrow>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">
            Welcome back
          </h1>
          <p className="mt-4 font-serif text-inkSoft">
            Log in to manage your profile, view statistics, and submit marketing materials.
          </p>

          <MemberLoginForm />

          <p className="mt-6 text-center font-serif text-sm text-inkSoft">
            New to the Collective?{" "}
            <a href="/apply" className="text-plum hover:underline">
              Apply for a free profile →
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

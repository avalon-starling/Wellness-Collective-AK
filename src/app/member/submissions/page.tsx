import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/ui";
import { getSession } from "@/lib/member-auth";
import { db } from "@/lib/db";
import { SubmissionForm } from "./form";

export const metadata: Metadata = {
  title: "Submit Marketing Materials",
  description: "Submit content for the newsletter or blog",
};

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/member/login");
  }

  const practitioner = await db.practitioner.findUnique({
    where: { id: session.practitionerId },
    include: {
      marketingSubmissions: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!practitioner) {
    redirect("/member/login");
  }

  return (
    <div>
      <Nav />
      <section className="bg-paper px-6 py-16 md:px-14">
        <div className="mx-auto max-w-2xl">
          <Eyebrow>Marketing</Eyebrow>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">
            Submit Marketing Materials
          </h1>
          <p className="mt-4 font-serif text-inkSoft">
            Submit content for our weekly newsletter, blog, or promotional highlights. All submissions are reviewed by our admin team before publication.
          </p>

          <SubmissionForm />

          {/* Previous submissions */}
          {practitioner.marketingSubmissions.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl text-ink">Your Submissions</h2>
              <div className="mt-6 space-y-4">
                {practitioner.marketingSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="rounded-lg border border-rule bg-cream p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif font-semibold text-ink">
                          {sub.title}
                        </h3>
                        <p className="mt-1 text-xs text-inkSoft capitalize">
                          {sub.submittedFor} · Submitted{" "}
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </p>
                        {sub.reviewNotes && (
                          <p className="mt-2 font-serif text-sm text-inkSoft italic">
                            Admin notes: {sub.reviewNotes}
                          </p>
                        )}
                      </div>
                      <span
                        className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                          sub.status === "APPROVED"
                            ? "bg-sage/20 text-sage"
                            : sub.status === "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

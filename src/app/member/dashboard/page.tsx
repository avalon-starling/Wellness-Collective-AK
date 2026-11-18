import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow, ButtonLink } from "@/components/ui";
import { getSession } from "@/lib/member-auth";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Member Dashboard",
  description: "Manage your Wellness Collective profile",
};

export const dynamic = "force-dynamic";

export default async function MemberDashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/member/login");
  }

  const practitioner = await db.practitioner.findUnique({
    where: { id: session.practitionerId },
    include: {
      marketingSubmissions: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      profileViews: {
        orderBy: { viewedAt: "desc" },
        take: 10,
      },
    },
  });

  if (!practitioner) {
    redirect("/member/login");
  }

  const viewCount = await db.profileView.count({
    where: { practitionerId: practitioner.id },
  });

  const viewsByReferrer = await db.profileView.groupBy({
    by: ["referrer"],
    where: { practitionerId: practitioner.id },
    _count: true,
  });

  return (
    <div>
      <Nav />
      <section className="bg-paper px-6 py-16 md:px-14">
        <div className="mx-auto max-w-4xl">
          <Eyebrow>Member Dashboard</Eyebrow>
          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl text-ink md:text-5xl">
                {practitioner.name}
              </h1>
              <p className="mt-2 font-serif text-inkSoft">
                {practitioner.primaryModality}
              </p>
            </div>
            <form action="/api/member/logout" method="POST">
              <button
                type="submit"
                className="rounded-lg border border-rule bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-cream"
              >
                Log out
              </button>
            </form>
          </div>

          {/* Quick Stats */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-card border border-rule bg-cream p-6">
              <div className="font-sans text-xs uppercase tracking-widest text-sage">
                Profile Views
              </div>
              <div className="mt-2 font-display text-3xl text-ink">
                {viewCount}
              </div>
            </div>

            <div className="rounded-card border border-rule bg-cream p-6">
              <div className="font-sans text-xs uppercase tracking-widest text-sage">
                Membership Status
              </div>
              <div className="mt-2 font-display text-lg text-ink">
                {practitioner.membershipTier === "FOUNDING" ? (
                  <span className="text-plum">
                    Founding Member
                    {practitioner.membershipExpiresAt && (
                      <div className="mt-1 font-serif text-xs font-normal text-inkSoft">
                        Expires{" "}
                        {new Date(
                          practitioner.membershipExpiresAt
                        ).toLocaleDateString()}
                      </div>
                    )}
                  </span>
                ) : (
                  "Free Profile"
                )}
              </div>
            </div>

            <div className="rounded-card border border-rule bg-cream p-6">
              <div className="font-sans text-xs uppercase tracking-widest text-sage">
                Profile Status
              </div>
              <div className="mt-2 font-display text-lg text-ink">
                {practitioner.published ? (
                  <span className="text-sage">Published</span>
                ) : (
                  <span className="text-amber-700">Draft</span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-10">
            <h2 className="font-display text-2xl text-ink">Quick Actions</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Link
                href={`/member/profile/edit`}
                className="rounded-lg border border-rule bg-white px-6 py-4 font-serif text-ink hover:bg-cream"
              >
                📝 Edit Your Profile
              </Link>
              <Link
                href={`/member/submissions`}
                className="rounded-lg border border-rule bg-white px-6 py-4 font-serif text-ink hover:bg-cream"
              >
                📤 Submit Marketing Materials
              </Link>
              <Link
                href={`/member/blog-submit`}
                className="rounded-lg border border-rule bg-white px-6 py-4 font-serif text-ink hover:bg-cream"
              >
                ✍️ Write for the Blog
              </Link>
              <Link
                href={`/directory/${practitioner.slug}`}
                className="rounded-lg border border-rule bg-white px-6 py-4 font-serif text-ink hover:bg-cream"
              >
                👁️ View Your Profile
              </Link>
            </div>
          </div>

          {/* Profile Views Breakdown */}
          {viewsByReferrer.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-2xl text-ink">Views by Source</h2>
              <div className="mt-4 space-y-2">
                {viewsByReferrer.map((item) => (
                  <div
                    key={item.referrer}
                    className="flex items-center justify-between rounded-lg border border-rule bg-cream p-4"
                  >
                    <span className="font-serif capitalize text-ink">
                      {item.referrer || "Direct"}
                    </span>
                    <span className="font-display text-lg text-plum">
                      {item._count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Submissions */}
          {practitioner.marketingSubmissions.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-2xl text-ink">
                Recent Submissions
              </h2>
              <div className="mt-4 space-y-3">
                {practitioner.marketingSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="rounded-lg border border-rule bg-cream p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif font-semibold text-ink">
                          {sub.title}
                        </h3>
                        <p className="mt-1 text-xs text-inkSoft capitalize">
                          {sub.submittedFor}
                        </p>
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

          {/* Help & Support */}
          <div className="mt-10 rounded-lg border border-dashed border-rule bg-cream/50 p-6">
            <h3 className="font-serif font-semibold text-ink">Need Help?</h3>
            <p className="mt-2 font-serif text-sm text-inkSoft">
              Check out our community forum or contact us at{" "}
              <a href="mailto:avalon@thesoundspace.us" className="text-plum">
                avalon@thesoundspace.us
              </a>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

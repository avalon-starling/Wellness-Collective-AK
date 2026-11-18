import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/ui";
import { getSession } from "@/lib/member-auth";
import { db } from "@/lib/db";
import { BlogSubmitForm } from "./form";

export const metadata: Metadata = {
  title: "Submit Blog Article",
  description: "Write and submit an article for the Wellness Collective blog",
};

export const dynamic = "force-dynamic";

export default async function BlogSubmitPage() {
  const session = await getSession();

  if (!session) {
    redirect("/member/login");
  }

  const practitioner = await db.practitioner.findUnique({
    where: { id: session.practitionerId },
    include: {
      blogPosts: {
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
          <Eyebrow>Wellness Education</Eyebrow>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">
            Write for Our Blog
          </h1>
          <p className="mt-4 font-serif text-inkSoft">
            Share your expertise with our community. Write educational content about wellness topics, and our admin team will review before publication.
          </p>

          <BlogSubmitForm />

          {/* Previous posts */}
          {practitioner.blogPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl text-ink">Your Articles</h2>
              <div className="mt-6 space-y-4">
                {practitioner.blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="rounded-lg border border-rule bg-cream p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-serif font-semibold text-ink">
                          {post.title}
                        </h3>
                        <p className="mt-1 text-xs text-inkSoft">
                          Submitted{" "}
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                        {post.isMonthlySpotlight && (
                          <span className="mt-2 inline-block rounded-full bg-rose/20 px-3 py-1 text-xs font-medium text-rose">
                            ✦ Monthly Spotlight
                          </span>
                        )}
                      </div>
                      <span
                        className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                          post.status === "APPROVED"
                            ? "bg-sage/20 text-sage"
                            : post.status === "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {post.status}
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

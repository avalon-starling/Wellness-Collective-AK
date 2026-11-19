import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blog Posts",
  description: "Review and approve blog articles",
};

export const dynamic = "force-dynamic";

export default async function BlogPostsPage() {
  const posts = await db.blogPost.findMany({
    include: { author: { select: { id: true, name: true, slug: true } } },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });

  const stats = {
    pending: posts.filter((p) => p.status === "PENDING").length,
    approved: posts.filter((p) => p.status === "APPROVED").length,
    rejected: posts.filter((p) => p.status === "REJECTED").length,
  };

  const grouped = {
    pending: posts.filter((p) => p.status === "PENDING"),
    approved: posts.filter((p) => p.status === "APPROVED"),
    rejected: posts.filter((p) => p.status === "REJECTED"),
  };

  return (
    <div className="space-y-8">
      <div>
        <Eyebrow>Content</Eyebrow>
        <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">
          Blog Posts
        </h1>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-rule bg-cream p-6">
          <div className="font-sans text-xs uppercase tracking-widest text-sage">
            Pending Review
          </div>
          <div className="mt-2 font-display text-3xl text-amber-700">
            {stats.pending}
          </div>
        </div>
        <div className="rounded-lg border border-rule bg-cream p-6">
          <div className="font-sans text-xs uppercase tracking-widest text-sage">
            Published
          </div>
          <div className="mt-2 font-display text-3xl text-sage">
            {stats.approved}
          </div>
        </div>
        <div className="rounded-lg border border-rule bg-cream p-6">
          <div className="font-sans text-xs uppercase tracking-widest text-sage">
            Rejected
          </div>
          <div className="mt-2 font-display text-3xl text-red-700">
            {stats.rejected}
          </div>
        </div>
      </div>

      {/* Pending Posts */}
      {grouped.pending.length > 0 && (
        <div>
          <h2 className="mb-4 font-display text-2xl text-ink">
            Pending Review ({grouped.pending.length})
          </h2>
          <div className="space-y-4">
            {grouped.pending.map((post) => (
              <Link
                key={post.id}
                href={`/admin/blog-posts/${post.id}`}
                className="block rounded-lg border border-rule bg-white p-6 hover:bg-cream"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-semibold text-ink">
                      {post.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-4 text-sm text-inkSoft">
                      <span>By {post.author.name}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="mt-2 line-clamp-2 font-serif text-inkSoft">
                      {post.excerpt}
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                    Pending
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Published Posts */}
      {grouped.approved.length > 0 && (
        <div>
          <h2 className="mb-4 font-display text-2xl text-ink">
            Published ({grouped.approved.length})
          </h2>
          <div className="space-y-3">
            {grouped.approved.map((post) => (
              <Link
                key={post.id}
                href={`/admin/blog-posts/${post.id}`}
                className="block rounded-lg border border-rule bg-white p-4 hover:bg-cream"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-serif font-semibold text-ink">
                      {post.title}
                    </h3>
                    <p className="text-sm text-inkSoft">
                      By {post.author.name} ·{" "}
                      {post.publishedAt?.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {post.isMonthlySpotlight && (
                      <span className="rounded-full bg-rose/20 px-3 py-1 text-xs font-medium text-rose">
                        ✦ Spotlight
                      </span>
                    )}
                    <span className="rounded-full bg-sage/20 px-3 py-1 text-xs font-medium text-sage">
                      Published
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Rejected Posts */}
      {grouped.rejected.length > 0 && (
        <div>
          <h2 className="mb-4 font-display text-2xl text-ink">
            Rejected ({grouped.rejected.length})
          </h2>
          <div className="space-y-3">
            {grouped.rejected.map((post) => (
              <Link
                key={post.id}
                href={`/admin/blog-posts/${post.id}`}
                className="block rounded-lg border border-rule bg-white p-4 hover:bg-cream"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif font-semibold text-ink">
                      {post.title}
                    </h3>
                    <p className="text-sm text-inkSoft">By {post.author.name}</p>
                  </div>
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    Rejected
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {posts.length === 0 && (
        <div className="rounded-lg border border-dashed border-rule bg-cream/50 px-8 py-16 text-center">
          <p className="font-serif text-inkSoft">No blog posts yet.</p>
        </div>
      )}
    </div>
  );
}

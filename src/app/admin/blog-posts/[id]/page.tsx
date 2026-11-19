import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Eyebrow, ButtonLink } from "@/components/ui";
import { BlogApprovalForm } from "./form";

export const metadata: Metadata = {
  title: "Review Blog Post",
};

export const dynamic = "force-dynamic";

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await db.blogPost.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, slug: true, email: true } },
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Eyebrow>Blog Article</Eyebrow>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">
            {post.title}
          </h1>
        </div>
        <ButtonLink href="/admin/blog-posts">← Back</ButtonLink>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_320px]">
        <div>
          {/* Post Details */}
          <div className="rounded-lg border border-rule bg-cream p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-sage">
                  Author
                </p>
                <p className="mt-1 font-serif text-lg text-ink">{post.author.name}</p>
                <p className="font-serif text-sm text-inkSoft">
                  {post.author.email}
                </p>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-sage">
                  Submitted
                </p>
                <p className="mt-1 font-serif text-lg text-ink">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-sage">
                  Slug
                </p>
                <p className="mt-1 font-mono text-sm text-ink">{post.slug}</p>
              </div>
            </div>

            {/* Cover Image */}
            {post.coverImageUrl && (
              <div className="mb-6 overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="max-h-80 w-full object-cover"
                />
              </div>
            )}

            {/* Excerpt */}
            <div className="mb-6 border-t border-rule pt-6">
              <p className="font-sans text-xs uppercase tracking-widest text-sage">
                Excerpt
              </p>
              <p className="mt-2 font-serif text-lg leading-relaxed text-ink">
                {post.excerpt}
              </p>
            </div>

            {/* Content Preview */}
            <div className="border-t border-rule pt-6">
              <p className="font-sans text-xs uppercase tracking-widest text-sage">
                Content
              </p>
              <div className="mt-4 max-h-96 overflow-y-auto rounded-lg bg-white/50 p-4 font-serif leading-relaxed text-ink">
                {post.content}
              </div>
              <p className="mt-2 text-xs text-inkSoft">
                (Markdown will be rendered as HTML when published)
              </p>
            </div>
          </div>
        </div>

        {/* Approval Sidebar */}
        {post.status === "PENDING" && (
          <BlogApprovalForm postId={id} />
        )}

        {post.status !== "PENDING" && (
          <div className="sticky top-6 space-y-4 rounded-lg border border-rule bg-cream p-6">
            <h2 className="font-display text-xl text-ink">Status</h2>
            <div className="space-y-3">
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-sage">
                  Status
                </p>
                <p
                  className={`mt-1 font-serif text-lg font-semibold ${
                    post.status === "APPROVED"
                      ? "text-sage"
                      : post.status === "REJECTED"
                        ? "text-red-700"
                        : "text-amber-700"
                  }`}
                >
                  {post.status}
                </p>
              </div>
              {post.publishedAt && (
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-sage">
                    Published
                  </p>
                  <p className="mt-1 font-serif text-sm text-ink">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
              {post.isMonthlySpotlight && (
                <div className="rounded-lg bg-rose/10 p-3">
                  <p className="font-serif text-sm text-rose">
                    ✦ Monthly Spotlight
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

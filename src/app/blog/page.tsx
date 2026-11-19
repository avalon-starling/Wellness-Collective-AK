import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blog",
  description: "Educational articles and wellness guides from Collective practitioners",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    where: {
      status: "APPROVED",
      publishedAt: { not: null },
    },
    include: {
      author: { select: { name: true, slug: true, primaryModality: true } },
    },
    orderBy: [{ isMonthlySpotlight: "desc" }, { publishedAt: "desc" }],
  });

  const spotlightPost = posts.find((p) => p.isMonthlySpotlight);
  const regularPosts = posts.filter((p) => !p.isMonthlySpotlight);

  return (
    <div>
      <Nav />
      <section className="bg-paper px-6 py-16 md:px-14">
        <div className="mx-auto max-w-4xl">
          <Eyebrow>Wellness Education</Eyebrow>
          <h1 className="mt-4 font-display text-6xl leading-tight text-ink md:text-7xl">
            Blog & Articles
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-xl leading-relaxed text-inkSoft">
            Educational content from Alaska's wellness practitioners. Learn about
            different modalities, practices, and approaches to holistic health.
          </p>
        </div>
      </section>

      {/* Monthly Spotlight */}
      {spotlightPost && (
        <section className="bg-deep px-6 py-16 text-cream md:px-14">
          <div className="mx-auto max-w-4xl">
            <Eyebrow tone="rose">Featured Article</Eyebrow>
            <h2 className="mt-4 font-display text-5xl leading-tight tracking-tight">
              {spotlightPost.title}
            </h2>

            <div className="mt-6 flex items-center gap-6">
              {spotlightPost.coverImageUrl && (
                <div className="relative h-48 w-48 flex-shrink-0 overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={spotlightPost.coverImageUrl}
                    alt={spotlightPost.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-serif text-xl leading-relaxed text-cream/90">
                  {spotlightPost.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="font-serif text-sm text-cream/70">
                    By {spotlightPost.author.name} ·{" "}
                    {spotlightPost.author.primaryModality}
                  </div>
                  <Link
                    href={`/blog/${spotlightPost.slug}`}
                    className="rounded-pill bg-rose px-6 py-2 font-sans text-xs font-semibold uppercase tracking-widest text-deep transition hover:bg-rose/90"
                  >
                    Read Article →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="bg-paper px-6 py-16 md:px-14">
        <div className="mx-auto max-w-4xl">
          {regularPosts.length > 0 ? (
            <>
              <Eyebrow tone="sage">All Articles</Eyebrow>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                {regularPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group rounded-lg border border-rule bg-white p-6 transition hover:border-plum hover:bg-cream"
                  >
                    {post.coverImageUrl && (
                      <div className="relative mb-4 h-40 overflow-hidden rounded-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.coverImageUrl}
                          alt={post.title}
                          className="h-full w-full object-cover transition group-hover:scale-105"
                        />
                      </div>
                    )}
                    <h3 className="font-display text-xl text-ink group-hover:text-plum">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 font-serif text-sm text-inkSoft">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between pt-4 font-serif text-xs text-inkSoft">
                      <span>{post.author.name}</span>
                      <span>{post.publishedAt?.toLocaleDateString()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-rule bg-cream/50 px-8 py-16 text-center">
              <p className="font-serif text-lg text-inkSoft">
                Check back soon for educational articles from our community.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

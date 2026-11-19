import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow, ButtonLink } from "@/components/ui";
import { MarkdownContent } from "@/components/MarkdownContent";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug } });

  if (!post || post.status !== "APPROVED")
    return {
      title: "Article",
    };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImageUrl
        ? [
            {
              url: post.coverImageUrl,
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          slug: true,
          primaryModality: true,
          photoUrl: true,
          bio: true,
        },
      },
    },
  });

  if (!post || post.status !== "APPROVED") {
    notFound();
  }

  return (
    <div>
      <Nav />

      {/* Hero Section */}
      {post.coverImageUrl && (
        <section className="relative h-96 overflow-hidden bg-black">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </section>
      )}

      {/* Article */}
      <section className="bg-paper px-6 py-16 md:px-14">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            className="font-sans text-xs uppercase tracking-widest text-plum hover:underline"
          >
            ← Back to blog
          </Link>

          <Eyebrow className="mt-6">Article</Eyebrow>
          <h1 className="mt-4 font-display text-5xl leading-tight text-ink md:text-6xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="mt-8 flex items-center justify-between gap-4 border-b border-rule pb-6 font-serif text-sm text-inkSoft">
            <div>
              By <strong className="text-ink">{post.author.name}</strong> ·{" "}
              {post.author.primaryModality}
            </div>
            <span>{post.publishedAt?.toLocaleDateString()}</span>
          </div>

          {/* Content */}
          <div className="prose prose-lg mt-12 max-w-none">
            <MarkdownContent content={post.content} />
          </div>

          {/* Author Bio */}
          <div className="mt-16 rounded-lg border border-rule bg-cream p-8">
            <div className="flex items-start gap-6">
              {post.author.photoUrl && (
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={post.author.photoUrl}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-display text-xl text-ink">
                  {post.author.name}
                </h3>
                <p className="mt-1 font-serif text-sm text-sage">
                  {post.author.primaryModality}
                </p>
                <p className="mt-3 font-serif leading-relaxed text-inkSoft">
                  {post.author.bio}
                </p>
                <ButtonLink
                  href={`/directory/${post.author.slug}`}
                  className="mt-4"
                >
                  View Profile →
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

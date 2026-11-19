import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow, ButtonLink } from "@/components/ui";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = await db.forumTopic.findUnique({ where: { slug } });

  if (!topic)
    return {
      title: "Topic",
    };

  return {
    title: topic.title,
    description: topic.description || `Join the discussion on ${topic.title}`,
  };
}

export default async function ForumTopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const topic = await db.forumTopic.findUnique({
    where: { slug },
    include: {
      posts: {
        where: { parentPostId: null, published: true },
        include: {
          author: { select: { id: true, name: true, slug: true } },
          replies: {
            where: { published: true },
            include: {
              author: { select: { id: true, name: true, slug: true } },
            },
            orderBy: { createdAt: "asc" },
            take: 5,
          },
          _count: {
            select: { replies: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!topic) {
    notFound();
  }

  return (
    <div>
      <Nav />

      <section className="bg-paper px-6 py-16 md:px-14">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/community"
            className="font-sans text-xs uppercase tracking-widest text-plum hover:underline"
          >
            ← Back to community
          </Link>

          <Eyebrow className="mt-6">Forum</Eyebrow>
          <h1 className="mt-4 font-display text-5xl text-ink md:text-6xl">
            {topic.title}
          </h1>
          {topic.description && (
            <p className="mt-4 font-serif text-lg text-inkSoft">
              {topic.description}
            </p>
          )}

          {/* Discussion Posts */}
          <div className="mt-12 space-y-6">
            {topic.posts.length > 0 ? (
              topic.posts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-lg border border-rule bg-white p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {post.title && (
                        <h3 className="font-serif text-lg font-semibold text-ink">
                          {post.title}
                        </h3>
                      )}
                      <p className="mt-3 font-serif leading-relaxed text-ink">
                        {post.content}
                      </p>
                      <div className="mt-4 text-sm text-inkSoft">
                        {post.author && (
                          <>
                            <Link
                              href={`/directory/${post.author.slug}`}
                              className="font-semibold text-plum hover:underline"
                            >
                              {post.author.name}
                            </Link>{" "}
                            ·{" "}
                          </>
                        )}
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    {post._count.replies > 0 && (
                      <div className="rounded-lg bg-cream px-4 py-2 text-center">
                        <div className="font-display text-lg text-ink">
                          {post._count.replies}
                        </div>
                        <div className="font-sans text-xs uppercase tracking-widest text-sage">
                          Replies
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Replies Preview */}
                  {post.replies.length > 0 && (
                    <div className="mt-4 border-t border-rule pt-4">
                      <div className="space-y-3">
                        {post.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="rounded bg-cream/30 p-3 text-sm"
                          >
                            <p className="font-serif text-ink">{reply.content}</p>
                            <p className="mt-2 text-xs text-inkSoft">
                              {reply.author && (
                                <Link
                                  href={`/directory/${reply.author.slug}`}
                                  className="text-plum hover:underline"
                                >
                                  {reply.author.name}
                                </Link>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-rule bg-cream/50 px-8 py-12 text-center">
                <p className="font-serif text-lg text-inkSoft">
                  No discussions yet. Be the first to start one!
                </p>
              </div>
            )}
          </div>

          {/* Join CTA */}
          <div className="mt-12 rounded-lg border border-rule bg-cream p-8">
            <h3 className="font-display text-2xl text-ink">Join the Conversation</h3>
            <p className="mt-3 font-serif text-inkSoft">
              Log in to your member account to start a discussion or reply to
              existing posts.
            </p>
            <div className="mt-6 flex gap-4">
              <ButtonLink href="/member/login">Log In to Post</ButtonLink>
              <ButtonLink href="/apply" variant="outline">
                Not a member? Apply free →
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

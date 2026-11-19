import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Community",
  description: "Connect with wellness practitioners and community members",
};

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const topics = await db.forumTopic.findMany({
    where: { published: true },
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <Nav />

      <section className="bg-paper px-6 py-16 md:px-14">
        <div className="mx-auto max-w-4xl">
          <Eyebrow>Community</Eyebrow>
          <h1 className="mt-4 font-display text-6xl leading-tight text-ink md:text-7xl">
            Connect & Discuss
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-xl leading-relaxed text-inkSoft">
            Join fellow practitioners and community members in conversation. Share
            knowledge, ask questions, and build relationships across modalities.
          </p>

          {/* Forum Topics */}
          <div className="mt-16">
            <h2 className="mb-6 font-display text-3xl text-ink">Forums</h2>
            <div className="space-y-3">
              {topics.length > 0 ? (
                topics.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/community/topics/${topic.slug}`}
                    className="block rounded-lg border border-rule bg-white p-6 hover:bg-cream"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-serif text-lg font-semibold text-ink">
                          {topic.title}
                        </h3>
                        {topic.description && (
                          <p className="mt-2 font-serif text-sm text-inkSoft">
                            {topic.description}
                          </p>
                        )}
                      </div>
                      <div className="rounded-lg bg-cream px-4 py-2 text-center">
                        <div className="font-display text-2xl text-ink">
                          {topic._count.posts}
                        </div>
                        <div className="font-sans text-xs uppercase tracking-widest text-sage">
                          Posts
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-rule bg-cream/50 px-8 py-12 text-center">
                  <p className="font-serif text-lg text-inkSoft">
                    Forum topics coming soon.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Guidelines */}
          <div className="mt-16 rounded-lg border border-rule bg-cream p-8">
            <h3 className="font-display text-2xl text-ink">Community Guidelines</h3>
            <div className="mt-4 space-y-3 font-serif text-inkSoft">
              <p>✓ Be respectful and supportive</p>
              <p>✓ Share knowledge and experience</p>
              <p>✓ Ask genuine questions</p>
              <p>✗ No self-promotion or spam</p>
              <p>✗ No disrespect toward any modality</p>
              <p>✗ No medical advice (unless qualified)</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

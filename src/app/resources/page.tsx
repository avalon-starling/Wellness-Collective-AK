import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { Eyebrow, Pill } from "@/components/ui";
import { getPublishedResources } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resources",
  description: "Articles, guides, and education from The Wellness Collective.",
};

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const resources = await getPublishedResources();

  return (
    <div>
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_60%_10%,#3a2954_0%,#1f1830_58%,#0c0815_100%)] pb-16 text-cream">
        <div className="pointer-events-none absolute -right-24 -top-16">
          <FlowerOfLife size={480} stroke="#c4978a" opacity={0.15} />
        </div>
        <Nav dark />
        <div className="relative max-w-2xl px-6 pt-8 md:px-14">
          <Eyebrow>Learn</Eyebrow>
          <h1 className="mt-6 font-display text-6xl leading-[0.98] tracking-tight md:text-7xl">
            Guides &amp; <em className="not-italic text-rose">education.</em>
          </h1>
          <p className="mt-6 max-w-lg font-serif text-xl leading-relaxed text-cream/78">
            Articles and guides on choosing a practitioner, understanding modalities, and building a
            wellness practice in Alaska. Courses are coming in time.
          </p>
        </div>
      </section>

      <section className="bg-paper px-6 py-16 md:px-14">
        {resources.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <Link
                key={r.id}
                href={`/resources/${r.slug}`}
                className="flex flex-col rounded-card border border-rule bg-cream p-7 transition-transform hover:-translate-y-0.5"
              >
                <Pill tone="sage">{r.category}</Pill>
                <h3 className="mt-4 font-display text-2xl leading-tight text-ink">{r.title}</h3>
                <p className="mt-3 flex-1 font-serif text-[16px] leading-relaxed text-inkSoft">{r.excerpt}</p>
                <div className="mt-5 flex items-center justify-between border-t border-dashed border-rule pt-4">
                  <span className="font-sans text-[11px] text-inkSoft">
                    {r.publishedAt ? formatDate(r.publishedAt) : ""}
                  </span>
                  <span className="font-serif italic text-plum">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-card border border-dashed border-rule bg-cream px-8 py-16 text-center">
            <h3 className="font-display text-3xl text-ink">The resource library is coming together</h3>
            <p className="mx-auto mt-3 max-w-md font-serif text-lg text-inkSoft">
              We're publishing our first guides on finding a practitioner, understanding modalities, and
              building a practice in Alaska. Check back soon — or join the list to hear when they're up.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

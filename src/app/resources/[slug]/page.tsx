import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { Eyebrow, Pill } from "@/components/ui";
import { getResourceBySlug } from "@/lib/data";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) return {};
  return { title: resource.title, description: resource.excerpt };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) notFound();

  return (
    <div className="bg-paper">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_30%_20%,#3a2954_0%,#1f1830_60%,#0c0815_100%)] pb-16 text-cream">
        <div className="pointer-events-none absolute -right-20 -top-16">
          <FlowerOfLife size={400} stroke="#c4978a" opacity={0.15} />
        </div>
        <Nav dark />
        <div className="relative max-w-2xl px-6 pt-8 md:px-14">
          <Eyebrow>{resource.category}</Eyebrow>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
            {resource.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 font-sans text-xs text-cream/60">
            {resource.author && <Pill tone="deep">{resource.author}</Pill>}
            {resource.publishedAt && <span>{formatDate(resource.publishedAt)}</span>}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-14">
        <div className="mx-auto max-w-2xl">{renderMarkdown(resource.content)}</div>
      </section>

      <Footer />
    </div>
  );
}

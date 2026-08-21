import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { Eyebrow, ButtonLink } from "@/components/ui";
import { PractitionerCard } from "@/components/PractitionerCard";
import { getPractitioners, getDirectoryFacets } from "@/lib/data";
import type { Format } from "@prisma/client";

export const metadata: Metadata = {
  title: "Find Wellness",
  description: "Search Alaska's directory of credentialed wellness practitioners — free, always.",
};

export const dynamic = "force-dynamic";

type SearchParams = { [key: string]: string | string[] | undefined };

function one(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function FindWellnessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const q = one(sp.q) || "";
  const modality = one(sp.modality) || "";
  const town = one(sp.town) || "";
  const format = one(sp.format) as Format | "" | undefined;
  const accepting = one(sp.accepting) === "1";
  const verified = one(sp.verified) === "1";

  const [practitioners, facets] = await Promise.all([
    getPractitioners({
      q: q || undefined,
      modality: modality || undefined,
      town: town || undefined,
      format: (format as Format) || undefined,
      accepting,
      verified,
    }),
    getDirectoryFacets(),
  ]);

  const hasFilters = q || modality || town || format || accepting || verified;

  return (
    <div>
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_70%_30%,#3a2954_0%,#1f1830_55%,#0e0a18_100%)] pb-16 text-cream">
        <div className="pointer-events-none absolute -right-32 -top-16">
          <FlowerOfLife size={520} stroke="#c4978a" opacity={0.16} strokeWidth={0.5} />
        </div>
        <Nav dark />
        <div className="relative max-w-2xl px-6 pt-6 md:px-14">
          <Eyebrow>A directory of credentialed practice — Alaska</Eyebrow>
          <h1 className="mt-6 font-display text-6xl leading-[0.98] tracking-tight md:text-7xl">
            Find a healer you can <em className="not-italic text-rose">trust.</em>
          </h1>
          <p className="mt-6 max-w-lg font-serif text-xl leading-relaxed text-cream/78">
            {facets.total > 0
              ? `${facets.total} practitioners across Alaska — every one with documented training on file.`
              : "The directory is just opening. New Alaska practitioners are added every week — check back, or apply if that's you."}
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-pill border border-sage/40 bg-sage/[0.18] px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-sage" />
            <span className="font-sans text-xs tracking-wide text-cream/90">
              Searching and contacting a provider is free, always.
            </span>
          </div>
        </div>

        {/* Search form */}
        <form
          method="GET"
          className="relative mx-6 mt-12 grid gap-4 rounded-2xl border border-cream/20 bg-cream/10 p-6 backdrop-blur md:mx-14 md:grid-cols-[1.6fr_1fr_1fr_auto_auto_auto] md:items-end"
        >
          <label className="block">
            <span className="font-sans text-[10px] uppercase tracking-widest text-cream/55">Search</span>
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Name, modality, or a feeling…"
              className="mt-1 w-full border-b border-cream/30 bg-transparent pb-1 font-serif italic text-lg text-cream placeholder:text-cream/40 outline-none focus:border-cream"
            />
          </label>
          <label className="block">
            <span className="font-sans text-[10px] uppercase tracking-widest text-cream/55">Modality</span>
            <select
              name="modality"
              defaultValue={modality}
              className="mt-1 w-full border-b border-cream/30 bg-deep py-1 font-serif text-lg text-cream outline-none"
            >
              <option value="">All</option>
              {facets.modalities.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="font-sans text-[10px] uppercase tracking-widest text-cream/55">Region</span>
            <select
              name="town"
              defaultValue={town}
              className="mt-1 w-full border-b border-cream/30 bg-deep py-1 font-serif text-lg text-cream outline-none"
            >
              <option value="">All</option>
              {facets.towns.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 whitespace-nowrap font-sans text-xs text-cream">
            <input type="checkbox" name="accepting" value="1" defaultChecked={accepting} className="accent-rose" />
            Accepting
          </label>
          <label className="flex items-center gap-2 whitespace-nowrap font-sans text-xs text-cream">
            <input type="checkbox" name="verified" value="1" defaultChecked={verified} className="accent-rose" />
            ✓ Verified
          </label>
          <button
            type="submit"
            className="rounded-pill bg-rose px-6 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-deep"
          >
            Search
          </button>
        </form>
      </section>

      <section className="bg-paper px-6 py-16 md:px-14">
        <div className="mb-9 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <Eyebrow tone="sage">The directory · {practitioners.length} found</Eyebrow>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-ink">
              {modality ? `${modality} practitioners` : "Everyone holding space, right now"}
            </h2>
          </div>
          {hasFilters && (
            <Link href="/find-wellness" className="font-serif italic text-plum">
              Clear filters ×
            </Link>
          )}
        </div>

        {practitioners.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {practitioners.map((p) => (
              <PractitionerCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-card border border-dashed border-rule bg-cream px-8 py-16 text-center">
            <h3 className="font-display text-3xl text-ink">
              {hasFilters ? "No one matches yet" : "The directory is just getting started"}
            </h3>
            <p className="mx-auto mt-3 max-w-md font-serif text-lg text-inkSoft">
              {hasFilters
                ? "Try a broader search, or clear your filters to see everyone currently listed."
                : "We're onboarding Alaska's first Collective providers now. Know a practitioner who belongs here?"}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              {hasFilters ? (
                <ButtonLink href="/find-wellness" variant="outlineDark">Clear filters</ButtonLink>
              ) : (
                <ButtonLink href="/apply">Apply as a provider</ButtonLink>
              )}
            </div>
          </div>
        )}

        {/* membership strip */}
        <div className="relative mt-16 grid overflow-hidden rounded-[22px] bg-deep text-cream md:grid-cols-[1.3fr_1fr]">
          <div className="pointer-events-none absolute right-[32%] -top-28">
            <FlowerOfLife size={340} stroke="#c4978a" opacity={0.13} />
          </div>
          <div className="relative p-11">
            <Eyebrow tone="rose">Searching is free — belonging is a choice</Eyebrow>
            <h3 className="mt-4 font-display text-4xl leading-tight tracking-tight">
              Practitioner? The listing costs nothing.
              <br />
              <em className="not-italic text-rose">Membership</em> gets you the network.
            </h3>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/join-the-collective">Compare membership</ButtonLink>
              <ButtonLink href="/apply" variant="outline">Apply free →</ButtonLink>
            </div>
          </div>
          <div className="relative border-t border-cream/15 p-9 md:border-l md:border-t-0">
            <div className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">Members also get</div>
            <div className="mt-4 grid gap-3">
              {[
                "Featured placement in search",
                "Collective events & member mixers",
                "Provider networking & referrals",
                "Discounts on Collective events",
              ].map((x) => (
                <div key={x} className="flex items-center gap-3">
                  <span className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-sage/30 font-mono text-[10px] text-sage">✓</span>
                  <span className="font-serif text-[17px]">{x}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

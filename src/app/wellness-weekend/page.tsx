import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { Eyebrow, ButtonLink } from "@/components/ui";
import { getFlagshipEvent } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Wellness Weekend",
  description: "The Collective's flagship gathering — Alaska practitioners and the public, together.",
};

export const dynamic = "force-dynamic";

const PILLARS = [
  {
    title: "Practitioner showcase",
    body: "Collective providers offer sessions, demos, and mini-workshops across modalities — sound, breath, movement, herbalism, bodywork, and more.",
  },
  {
    title: "Public open house",
    body: "A no-pressure way for Alaskans to meet practitioners in person, ask questions, and find the right fit before booking.",
  },
  {
    title: "Community & vendors",
    body: "Local wellness vendors, makers, and educators alongside the providers — a full afternoon of the ecosystem in one room.",
  },
];

export default async function WellnessWeekendPage() {
  const flagship = await getFlagshipEvent();

  return (
    <div>
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_10%,#3a2954_0%,#1f1830_58%,#0c0815_100%)] pb-24 text-cream">
        <div className="pointer-events-none absolute left-1/2 -top-16 -translate-x-1/2">
          <FlowerOfLife size={640} stroke="#c4978a" opacity={0.14} />
        </div>
        <Nav dark />
        <div className="relative px-6 pt-8 text-center md:px-14">
          <Eyebrow>The flagship gathering</Eyebrow>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-6xl leading-[0.98] tracking-tight md:text-8xl">
            Wellness <em className="not-italic text-rose">Weekend.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-serif text-xl leading-relaxed text-cream/78">
            Once a season, the Collective brings its practitioners and the public into one space —
            sessions, workshops, and the chance to meet the people behind the directory.
          </p>

          {flagship ? (
            <div className="mx-auto mt-9 inline-flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-cream/20 bg-cream/10 px-8 py-6">
              <div className="text-left">
                <div className="font-sans text-[9px] uppercase tracking-widest text-sage">Next Wellness Weekend</div>
                <div className="mt-1 font-display text-2xl">{formatDate(flagship.startsAt)}</div>
              </div>
              <div className="h-10 w-px bg-cream/20" />
              <div className="text-left">
                <div className="font-sans text-[9px] uppercase tracking-widest text-sage">Where</div>
                <div className="mt-1 font-display text-2xl">{flagship.location}</div>
              </div>
            </div>
          ) : (
            <div className="mx-auto mt-9 max-w-md rounded-2xl border border-dashed border-cream/25 px-8 py-6 font-serif italic text-cream/70">
              The next Wellness Weekend hasn't been scheduled yet — join the list to be first to know.
            </div>
          )}

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            {flagship ? (
              <ButtonLink href={`/events/${flagship.slug}`}>Reserve your spot</ButtonLink>
            ) : (
              <ButtonLink href="/#newsletter">Join the list</ButtonLink>
            )}
            <ButtonLink href="/for-providers" variant="outline">
              Showcase your practice →
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-paper px-6 py-20 md:px-14">
        <Eyebrow tone="sage">What it is</Eyebrow>
        <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight tracking-tight text-ink md:text-5xl">
          One room. Every corner of{" "}
          <em className="not-italic text-plum">Alaska wellness.</em>
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.title} className="rounded-card border border-rule bg-cream p-8">
              <h3 className="font-display text-2xl text-ink">{p.title}</h3>
              <p className="mt-3 font-serif text-[17px] leading-relaxed text-inkSoft">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-deep px-6 py-20 text-cream md:px-14">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="rose">For providers</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            Collective members get priority placement at Wellness Weekend.
          </h2>
          <p className="mt-5 font-serif text-lg leading-relaxed text-cream/75">
            Vendor tables, showcase slots, and workshop opportunities are offered to Collective
            providers first. Not a member yet?
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/join-the-collective">See membership</ButtonLink>
            <ButtonLink href="/apply" variant="outline">Apply free →</ButtonLink>
          </div>
          <p className="mt-8 font-sans text-xs text-cream/50">
            Questions about Wellness Weekend? <a href={`mailto:${SITE.contactEmail}`} className="text-rose">{SITE.contactEmail}</a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { Eyebrow, ButtonLink } from "@/components/ui";
import { VERIFICATION_DISCLAIMER } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "The Wellness Collective's mission, philosophy, and standards.",
};

const PRINCIPLES = [
  {
    title: "Trust is the product",
    body: "A directory is only as useful as it is honest. We show what training and credentials a provider actually has on file — nothing implied, nothing inflated.",
  },
  {
    title: "The directory stays free",
    body: "People looking for care should never hit a paywall to find it. Searching, reading a profile, and reaching a provider will always cost the public nothing.",
  },
  {
    title: "Providers shouldn't build alone",
    body: "Alaska's wellness practitioners are spread across a huge state, often working independently. The Collective exists to give them a professional community, not just a listing.",
  },
  {
    title: "Community, not just a directory",
    body: "The directory feeds the events. The events feed the community. The community feeds the directory back — that loop is the whole idea.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,#3a2954_0%,#1f1830_58%,#0c0815_100%)] pb-20 text-cream">
        <div className="pointer-events-none absolute -right-24 -top-20">
          <FlowerOfLife size={500} stroke="#c4978a" opacity={0.15} />
        </div>
        <Nav dark />
        <div className="relative max-w-2xl px-6 pt-8 md:px-14">
          <Eyebrow>Our mission</Eyebrow>
          <h1 className="mt-6 font-display text-6xl leading-[0.98] tracking-tight md:text-7xl">
            Wellness is better <em className="not-italic text-rose">together.</em>
          </h1>
          <p className="mt-6 max-w-lg font-serif text-xl leading-relaxed text-cream/78">
            The Wellness Collective exists to connect Alaskans with practitioners they can trust, and
            to connect those practitioners with a community that helps them do their work well —
            without a directory being all the Collective is.
          </p>
        </div>
      </section>

      <section className="bg-paper px-6 py-20 md:px-14">
        <Eyebrow tone="sage">Philosophy</Eyebrow>
        <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight tracking-tight text-ink md:text-5xl">
          What we actually believe.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="rounded-card border border-rule bg-cream p-8">
              <h3 className="font-display text-2xl text-ink">{p.title}</h3>
              <p className="mt-3 font-serif text-[17px] leading-relaxed text-inkSoft">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-deep px-6 py-20 text-cream md:px-14">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="rose">On standards</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            We don&rsquo;t call anyone an &ldquo;accredited healer.&rdquo;
          </h2>
          <p className="mt-6 font-serif text-lg leading-relaxed text-cream/78">{VERIFICATION_DISCLAIMER}</p>
          <p className="mt-4 font-serif text-lg leading-relaxed text-cream/78">
            Instead, we built a plain, tiered verification system so anyone can see exactly what a
            provider has told us, and what we've confirmed.
          </p>
          <div className="mt-8">
            <ButtonLink href="/verification">See how verification works →</ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-paper px-6 py-20 md:px-14">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="sage">A new organization</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight text-ink md:text-5xl">
            Alaska-based, launching in {new Date().getFullYear()}.
          </h2>
          <p className="mt-5 font-serif text-lg leading-relaxed text-inkSoft">
            The Wellness Collective is a new, independently run organization built specifically for
            Alaska's wellness community. We're onboarding our first providers now — if that's you,
            we'd love to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/apply">Apply as a provider</ButtonLink>
            <ButtonLink href="/find-wellness" variant="outlineDark">Browse the directory</ButtonLink>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

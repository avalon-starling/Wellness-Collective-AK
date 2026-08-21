import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { Eyebrow, ButtonLink } from "@/components/ui";
import { VERIFICATION_LEVELS, VERIFICATION_DISCLAIMER } from "@/lib/content";

export const metadata: Metadata = {
  title: "Verification",
  description: "How The Wellness Collective reviews and verifies provider information.",
};

const LEVEL_TONE: Record<number, string> = {
  1: "border-rule bg-cream",
  2: "border-sage/40 bg-sage/[0.06]",
  3: "border-plum/40 bg-plum/[0.06]",
  4: "border-rose/50 bg-rose/[0.08]",
};

export default function VerificationPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_70%_10%,#3a2954_0%,#1f1830_58%,#0c0815_100%)] pb-20 text-cream">
        <div className="pointer-events-none absolute -right-24 -top-16">
          <FlowerOfLife size={500} stroke="#c4978a" opacity={0.15} />
        </div>
        <Nav dark />
        <div className="relative max-w-2xl px-6 pt-8 md:px-14">
          <Eyebrow>Trust, made legible</Eyebrow>
          <h1 className="mt-6 font-display text-6xl leading-[0.98] tracking-tight md:text-7xl">
            Verified Wellness <em className="not-italic text-rose">Providers.</em>
          </h1>
          <p className="mt-6 max-w-lg font-serif text-xl leading-relaxed text-cream/78">{VERIFICATION_DISCLAIMER}</p>
        </div>
      </section>

      <section className="bg-paper px-6 py-20 md:px-14">
        <Eyebrow tone="sage">The four levels</Eyebrow>
        <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight tracking-tight text-ink md:text-5xl">
          What each badge on a profile actually means.
        </h2>

        <div className="mt-10 grid gap-6">
          {VERIFICATION_LEVELS.map((l) => (
            <div key={l.id} className={`rounded-card border p-8 ${LEVEL_TONE[l.level]}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="font-sans text-[10px] uppercase tracking-[0.25em] text-inkSoft">Level {l.level}</div>
                  <h3 className="mt-1 font-display text-3xl text-ink">{l.name}</h3>
                </div>
              </div>
              <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink">{l.description}</p>
              {l.criteria && (
                <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {l.criteria.map((c) => (
                    <div key={c} className="flex items-center gap-3">
                      <span className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-sage/25 font-mono text-[10px] text-sage">✓</span>
                      <span className="font-serif text-[16px] text-ink">{c}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-deep px-6 py-20 text-cream md:px-14">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="rose">Why it matters</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            Trust becomes part of the product.
          </h2>
          <p className="mt-6 font-serif text-lg leading-relaxed text-cream/78">
            We review what a provider submits — we don't license or certify anyone ourselves. The badge
            on a profile tells you exactly how far that review has gone, so you can make your own
            informed choice.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/find-wellness">Browse verified providers</ButtonLink>
            <ButtonLink href="/apply" variant="outline">Apply as a provider</ButtonLink>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

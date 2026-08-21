import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { Eyebrow, ButtonLink } from "@/components/ui";
import { MEMBERSHIP_TIERS } from "@/lib/content";
import { formatCents } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Join the Collective",
  description: "Provider membership for Alaska wellness practitioners — verified profile, community, and events.",
};

const paidTiers = MEMBERSHIP_TIERS.filter((t) => t.id === "provider" || t.id === "professional");
const founding = MEMBERSHIP_TIERS.find((t) => t.id === "founding")!;

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const sp = await searchParams;
  const annual = sp.period === "annual";

  return (
    <div>
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,#3a2954_0%,#1f1830_58%,#0c0815_100%)] pb-24 text-cream">
        <div className="pointer-events-none absolute left-1/2 -top-20 -translate-x-1/2">
          <FlowerOfLife size={680} stroke="#c4978a" opacity={0.13} />
        </div>
        <Nav dark />

        <div className="relative px-6 pt-6 text-center md:px-14">
          <Eyebrow>Two ways to be here</Eyebrow>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-6xl leading-[0.98] tracking-tight md:text-7xl">
            The directory is free.
            <br />
            The <em className="not-italic text-rose">circle</em> is a choice.
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-serif text-xl leading-relaxed text-cream/78">
            Anyone can search the directory, read a profile, and reach a practitioner directly — that
            will never cost anything. Membership is for providers who want the network behind the
            listing.
          </p>
        </div>

        <div className="relative mt-10 flex justify-center">
          <div className="flex gap-1 rounded-pill border border-cream/20 bg-cream/10 p-1">
            <Link
              href="/join-the-collective"
              className={`rounded-pill px-6 py-2.5 font-sans text-[11px] uppercase tracking-widest ${
                !annual ? "bg-rose font-semibold text-deep" : "text-cream"
              }`}
            >
              Monthly
            </Link>
            <Link
              href="/join-the-collective?period=annual"
              className={`rounded-pill px-6 py-2.5 font-sans text-[11px] uppercase tracking-widest ${
                annual ? "bg-rose font-semibold text-deep" : "text-cream"
              }`}
            >
              Annual · save
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-5xl gap-6 px-6 md:grid-cols-2 md:px-0">
          {paidTiers.map((t) => {
            const price = annual ? t.annualCents : t.monthlyCents;
            return (
              <div
                key={t.id}
                className={`relative overflow-hidden rounded-[22px] p-9 ${
                  t.featured
                    ? "bg-cream text-ink shadow-[0_30px_70px_rgba(0,0,0,0.45)]"
                    : "border border-cream/20 bg-cream/[0.07] text-cream"
                }`}
              >
                {t.featured && (
                  <div className="pointer-events-none absolute -bottom-16 -right-16">
                    <FlowerOfLife size={240} stroke="#3a2954" opacity={0.09} />
                  </div>
                )}
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className={`font-sans text-[10px] uppercase tracking-[0.25em] ${t.featured ? "text-rose" : "text-sage"}`}>
                      {t.pitch}
                    </div>
                    <h2 className="mt-2 font-display text-4xl">{t.name}</h2>
                  </div>
                  {t.featured && (
                    <span className="rounded-pill bg-plum px-3.5 py-1.5 font-sans text-[9px] font-semibold uppercase tracking-widest text-cream">
                      ✦ Most join here
                    </span>
                  )}
                </div>

                <div className="relative mt-6 flex items-baseline gap-2">
                  <span className="font-display text-6xl">{formatCents(price ?? 0)}</span>
                  <span className={`font-serif italic ${t.featured ? "text-inkSoft" : "text-cream/65"}`}>
                    {annual ? "per year" : "per month"}
                  </span>
                </div>
                {annual && t.annualSavingsLabel && (
                  <div className="relative mt-1 font-sans text-xs text-sage">{t.annualSavingsLabel}</div>
                )}
                <div className={`relative mt-1 font-serif italic ${t.featured ? "text-inkSoft" : "text-cream/70"}`}>
                  {t.forWho}
                </div>

                <div className={`relative mt-7 grid gap-2.5 border-t pt-6 ${t.featured ? "border-rule" : "border-cream/20"}`}>
                  {t.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <span
                        className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full font-mono text-[10px] ${
                          t.featured ? "bg-sage text-cream" : "bg-sage/30 text-sage"
                        }`}
                      >
                        ✓
                      </span>
                      <span className="font-serif text-[17px]">{f}</span>
                    </div>
                  ))}
                </div>

                <form action="/api/checkout" method="POST" className="relative mt-8">
                  <input type="hidden" name="plan" value={t.id} />
                  <input type="hidden" name="period" value={annual ? "annual" : "monthly"} />
                  <button
                    type="submit"
                    className={`w-full rounded-pill py-4 font-sans text-xs font-semibold uppercase tracking-widest ${
                      t.featured ? "bg-deep text-cream" : "border border-cream/40 text-cream"
                    }`}
                  >
                    {t.cta} →
                  </button>
                </form>
              </div>
            );
          })}
        </div>
      </section>

      {/* Founding member banner */}
      <section className="bg-paper px-6 py-16 md:px-14">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[22px] border border-rose/40 bg-cream p-10 text-center md:p-14">
          <div className="pointer-events-none absolute -left-16 -top-16">
            <FlowerOfLife size={200} stroke="#c4978a" opacity={0.15} />
          </div>
          <span className="inline-flex items-center gap-2 rounded-pill bg-rose/20 px-4 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-widest text-rose">
            🌱 Limited launch offer
          </span>
          <h2 className="mx-auto mt-5 max-w-xl font-display text-4xl leading-tight text-ink md:text-5xl">
            {founding.name} — {formatCents(founding.annualCents ?? 0)}/year
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-serif text-lg leading-relaxed text-inkSoft">
            {founding.forWho}. Limited to the first 50 providers — a locked-in rate and permanent
            recognition as one of the practitioners who built the Collective from the start.
          </p>
          <ul className="mx-auto mt-7 flex max-w-md flex-col gap-2.5 text-left">
            {founding.features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-sage/20 font-mono text-[10px] text-sage">✓</span>
                <span className="font-serif text-[17px] text-ink">{f}</span>
              </li>
            ))}
          </ul>
          <form action="/api/checkout" method="POST" className="mt-8 inline-block">
            <input type="hidden" name="plan" value="founding" />
            <input type="hidden" name="period" value="annual" />
            <button
              type="submit"
              className="rounded-pill bg-rose px-8 py-4 font-sans text-xs font-semibold uppercase tracking-widest text-deep"
            >
              {founding.cta} →
            </button>
          </form>
        </div>
      </section>

      {/* Public tier note */}
      <section className="bg-paper px-6 pb-20 md:px-14">
        <div className="mx-auto max-w-4xl rounded-card border border-rule bg-deep px-8 py-10 text-center text-cream">
          <Eyebrow tone="sage">The public — always free</Eyebrow>
          <p className="mx-auto mt-4 max-w-xl font-serif text-lg leading-relaxed text-cream/80">
            Full directory access, provider profiles, and event listings will never require an account
            or a payment. That's the whole point of a directory.
          </p>
          <ButtonLink href="/find-wellness" variant="outline" className="mt-6 inline-flex">
            Browse the directory
          </ButtonLink>
        </div>
      </section>

      <Footer />
    </div>
  );
}

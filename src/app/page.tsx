import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { Eyebrow, ButtonLink, SectionEyebrowHeading } from "@/components/ui";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getDirectoryStats, getFlagshipEvent } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [stats, flagship] = await Promise.all([getDirectoryStats(), getFlagshipEvent()]);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_70%_30%,#3a2954_0%,#1f1830_55%,#0e0a18_100%)] pb-24 text-cream">
        <div className="pointer-events-none absolute -right-32 -top-16">
          <FlowerOfLife size={600} stroke="#c4978a" opacity={0.18} strokeWidth={0.5} />
        </div>
        <div className="pointer-events-none absolute -bottom-52 -left-44">
          <FlowerOfLife size={420} stroke="#7a8b6f" opacity={0.12} strokeWidth={0.5} />
        </div>

        <Nav dark />

        <div className="relative max-w-3xl px-6 pt-10 md:px-14">
          <Eyebrow>A community &amp; directory for Alaska wellness</Eyebrow>
          <h1 className="mt-6 font-display text-6xl leading-[0.98] tracking-tight text-cream md:text-8xl">
            Wellness in Alaska,{" "}
            <em className="font-display not-italic text-rose">gathered in one place.</em>
          </h1>
          <p className="mt-8 max-w-xl font-serif text-xl leading-relaxed text-cream/80 md:text-2xl">
            The Wellness Collective connects Alaskans with practitioners they can trust, and connects
            practitioners with a community built around their work — a searchable directory, honest
            credential information, and the events that bring both sides together.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <ButtonLink href="/find-wellness">Find a provider</ButtonLink>
            <ButtonLink href="/join-the-collective" variant="outline">
              Join the Collective
            </ButtonLink>
          </div>
        </div>

        {/* Five-question strip */}
        <div className="relative mt-16 grid gap-px overflow-hidden rounded-2xl border border-cream/15 bg-cream/15 px-6 md:mx-14 md:grid-cols-3 md:px-0">
          {[
            {
              q: "What is this?",
              a: "A community and directory connecting people with wellness practitioners and experiences across Alaska.",
            },
            {
              q: "Who is it for?",
              a: "People seeking wellness support, and the providers offering it — doulas, bodyworkers, herbalists, and more.",
            },
            {
              q: "Why trust it?",
              a: "Transparent provider profiles with clear credential and qualification information — see our verification standards.",
              href: "/verification",
            },
          ].map((item) => (
            <div key={item.q} className="bg-deep p-7">
              <div className="font-display text-xl text-rose">{item.q}</div>
              <p className="mt-3 font-serif text-[15px] leading-relaxed text-cream/75">{item.a}</p>
              {item.href && (
                <Link href={item.href} className="mt-3 inline-block font-sans text-[11px] uppercase tracking-widest text-sage">
                  Read our standards →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* STATS & CTA */}
      <section className="bg-paper px-6 py-16 md:px-14">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              [String(stats.total), "Practitioners"],
              [String(stats.modalityCount), "Modalities"],
              [String(stats.townCount), "Towns"],
              [`${stats.verifiedPct}%`, "Verified"],
            ].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="font-display text-4xl text-ink">{n}</div>
                <div className="mt-2 font-sans text-[10px] uppercase tracking-[0.2em] text-inkSoft">{l}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <ButtonLink href="/find-wellness">Find a practitioner</ButtonLink>
            <ButtonLink href="/apply" variant="outline">Apply free →</ButtonLink>
          </div>
        </div>
      </section>


      {/* FLAGSHIP EVENT TEASER */}
      {flagship && (
        <section className="bg-paper px-6 py-20 md:px-14">
          <div className="relative overflow-hidden rounded-[28px] bg-deep p-10 text-cream md:p-14">
            <div className="pointer-events-none absolute -right-24 -top-24">
              <FlowerOfLife size={320} stroke="#c4978a" opacity={0.15} />
            </div>
            <Eyebrow tone="rose">The flagship gathering</Eyebrow>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{flagship.title}</h2>
            <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-cream/75">
              {formatDate(flagship.startsAt)} · {flagship.location}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/wellness-weekend">About Wellness Weekend</ButtonLink>
              <ButtonLink href="/events" variant="outline">
                All events
              </ButtonLink>
            </div>
          </div>
        </section>
      )}

      {/* NEWSLETTER SIGNUP */}
      <section className="bg-cream px-6 py-20 md:px-14">
        <div className="mx-auto max-w-2xl rounded-[28px] border-2 border-sage/30 bg-sage/5 p-10 md:p-14">
          <Eyebrow tone="sage">Stay connected</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ink md:text-5xl">
            Get local events in your inbox.
          </h2>
          <p className="mt-4 max-w-lg font-serif text-lg leading-relaxed text-inkSoft">
            Be first to hear about upcoming Collective events, practitioner mixers, Wellness Weekend, and community gatherings across Alaska.
          </p>
          <div className="mt-8">
            <NewsletterForm source="homepage" />
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}

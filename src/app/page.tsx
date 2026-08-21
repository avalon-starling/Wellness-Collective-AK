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

      {/* WHAT CAN I DO HERE */}
      <section className="bg-paper px-6 py-20 md:px-14">
        <SectionEyebrowHeading
          eyebrow="What you can do here"
          eyebrowTone="rose"
          title={<>Three doors in. <em className="font-display not-italic text-plum">Take any of them.</em></>}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Find a practitioner",
              desc: "Search the free directory by modality, location, format, and specialty. Every listing shows what training and credentials are on file.",
              cta: "Browse the directory",
              href: "/find-wellness",
            },
            {
              title: "Discover an event",
              desc: "Sound baths, workshops, practitioner mixers, seasonal gatherings, and the Collective's flagship Wellness Weekend.",
              cta: "See what's coming up",
              href: "/events",
            },
            {
              title: "Join the community",
              desc: "Practitioners get a verified profile, a professional network, and a stake in a growing Alaska wellness ecosystem.",
              cta: "See provider benefits",
              href: "/for-providers",
            },
          ].map((card) => (
            <div key={card.title} className="rounded-card border border-rule bg-cream p-8">
              <h3 className="font-display text-2xl text-ink">{card.title}</h3>
              <p className="mt-3 font-serif text-[17px] leading-relaxed text-inkSoft">{card.desc}</p>
              <Link href={card.href} className="mt-5 inline-block font-serif italic text-plum">
                {card.cta} →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 border-t border-rule pt-8 md:grid-cols-4">
          {[
            [String(stats.total), "Practitioners listed"],
            [String(stats.modalityCount), "Modalities"],
            [String(stats.townCount), "Alaska towns"],
            [`${stats.verifiedPct}%`, "Credential-reviewed"],
          ].map(([n, l]) => (
            <div key={l} className="border-r border-rule pr-6 last:border-r-0">
              <div className="font-display text-4xl text-ink">{n}</div>
              <div className="mt-2 font-sans text-[10px] uppercase tracking-[0.2em] text-inkSoft">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ECOSYSTEM: three audiences */}
      <section className="bg-deep px-6 py-20 text-cream md:px-14">
        <Eyebrow tone="rose">How it fits together</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight tracking-tight text-cream md:text-5xl">
          The directory feeds the events. The events feed the community.{" "}
          <em className="not-italic text-rose">The community feeds the directory.</em>
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              mark: "🌿",
              title: "The Public",
              subtitle: "Discover wellness. Find your people.",
              body: "Free directory access — search by location, modality, practitioner, event, category, format, specialty, price range, and credentials.",
              cta: "Find a provider",
              href: "/find-wellness",
            },
            {
              mark: "✨",
              title: "Wellness Providers",
              subtitle: "Build your network. Be discovered.",
              body: "A directory profile, credential display, events access, provider networking, member discounts, and opportunities to teach, collaborate, and be featured.",
              cta: "See membership",
              href: "/for-providers",
            },
            {
              mark: "🔥",
              title: "The Collective",
              subtitle: "Where the brand becomes a community.",
              body: "Gatherings, workshops, practitioner mixers, sound baths, community circles, seasonal events, and the flagship Wellness Weekend.",
              cta: "See events",
              href: "/events",
            },
          ].map((a) => (
            <div key={a.title} className="rounded-card border border-cream/15 bg-cream/[0.06] p-8">
              <div className="text-2xl">{a.mark}</div>
              <h3 className="mt-4 font-display text-2xl text-cream">{a.title}</h3>
              <div className="mt-1 font-serif italic text-rose">{a.subtitle}</div>
              <p className="mt-4 font-serif text-[15px] leading-relaxed text-cream/70">{a.body}</p>
              <Link href={a.href} className="mt-5 inline-block font-sans text-[11px] uppercase tracking-widest text-sage">
                {a.cta} →
              </Link>
            </div>
          ))}
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

      {/* PROVIDER CTA STRIP */}
      <section className="bg-paper px-6 pb-24 md:px-14">
        <div className="relative overflow-hidden rounded-[28px] border border-rule bg-cream p-10 md:p-14">
          <div className="pointer-events-none absolute -bottom-24 -right-16">
            <FlowerOfLife size={260} stroke="#3a2954" opacity={0.08} />
          </div>
          <Eyebrow tone="sage">Searching is free — belonging is a choice</Eyebrow>
          <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight text-ink md:text-5xl">
            Practitioner in Alaska?{" "}
            <em className="not-italic text-plum">The Collective is built for you.</em>
          </h2>
          <p className="mt-4 max-w-lg font-serif text-lg leading-relaxed text-inkSoft">
            Applying for a listing costs nothing. Membership gets you the professional network, member
            events, and featured visibility behind it.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/apply">Apply free →</ButtonLink>
            <ButtonLink href="/for-providers" variant="outlineDark">
              See provider benefits
            </ButtonLink>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

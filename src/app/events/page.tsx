import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { Eyebrow, ButtonLink } from "@/components/ui";
import { NewsletterForm } from "@/components/NewsletterForm";
import { EventCard } from "@/components/EventCard";
import { getUpcomingEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events",
  description: "Collective gatherings, workshops, and member events across Alaska.",
};

export const dynamic = "force-dynamic";

const MODALITY_FILTERS = [
  "All",
  "Sound Healing",
  "Breathwork",
  "Yoga",
  "Doula",
  "Midwifery",
  "Herbalism",
  "Movement",
];

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ modality?: string }>;
}) {
  const sp = await searchParams;
  const modality = sp.modality && sp.modality !== "All" ? sp.modality : undefined;
  const events = await getUpcomingEvents({ modality });

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-warm to-deep pb-20 text-cream">
        <div className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2">
          <FlowerOfLife size={560} stroke="#c4978a" opacity={0.1} />
        </div>
        <Nav dark />
        <div className="relative px-6 pt-10 text-center md:px-14">
          <Eyebrow>The calendar</Eyebrow>
          <h1 className="mx-auto mt-6 max-w-2xl font-display text-6xl leading-[0.98] tracking-tight md:text-7xl">
            Where the collective <em className="not-italic text-rose">gathers.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-serif text-xl leading-relaxed text-cream/78">
            Some gatherings are open to everyone. Most member events are held for the Collective —
            that's part of what membership is for.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <ButtonLink href="/wellness-weekend">Wellness Weekend →</ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto mt-12 flex w-fit flex-wrap justify-center gap-1.5 rounded-pill border border-cream/20 bg-cream/[0.08] p-1">
          {MODALITY_FILTERS.map((m) => {
            const active = (m === "All" && !modality) || m === modality;
            return (
              <Link
                key={m}
                href={m === "All" ? "/events" : `/events?modality=${encodeURIComponent(m)}`}
                className={`rounded-pill px-4 py-2 font-sans text-[11px] tracking-widest ${
                  active ? "bg-rose font-semibold text-deep" : "text-cream"
                }`}
              >
                {m}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-paper px-6 py-16 md:px-14">
        <div className="mb-8 flex flex-wrap gap-5 font-sans text-[10px] uppercase tracking-widest text-inkSoft">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-sage" />Open to all</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-plum" />Members only</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-rose" />Ticketed</span>
        </div>

        {events.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {events.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <div className="rounded-card border border-dashed border-rule bg-cream px-8 py-16 text-center">
            <h3 className="font-display text-3xl text-ink">Nothing on the calendar yet</h3>
            <p className="mx-auto mt-3 max-w-md font-serif text-lg text-inkSoft">
              We're building out the events calendar as the Collective grows.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <span className="font-sans text-[11px] uppercase tracking-widest text-ink">Join the list for event announcements</span>
              <div className="w-full max-w-xs">
                <NewsletterForm source="events" />
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

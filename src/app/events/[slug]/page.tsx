import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { Eyebrow, Pill } from "@/components/ui";
import { getEventBySlug } from "@/lib/data";
import { formatDate, formatTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};
  return { title: event.title, description: event.description.slice(0, 150) };
}

const ACCESS_LABEL: Record<string, string> = {
  OPEN: "Open to all",
  MEMBER: "Collective members only",
  TICKETED: "Ticketed",
};

export default async function EventDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ rsvp?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const locked = event.access === "MEMBER";

  return (
    <div className="bg-paper">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_75%_20%,#3a2954_0%,#1f1830_60%,#0c0815_100%)] pb-16 text-cream">
        <div className="pointer-events-none absolute -right-20 -top-16">
          <FlowerOfLife size={420} stroke="#c4978a" opacity={0.15} />
        </div>
        <Nav dark />
        <div className="relative px-6 pt-8 md:px-14">
          <Eyebrow>{event.modality ?? "Collective gathering"}{event.town ? ` · ${event.town}` : ""}</Eyebrow>
          <h1 className="mt-5 max-w-2xl font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
            {event.title}
          </h1>
          <div className="mt-5 flex flex-wrap gap-2">
            <Pill tone={locked ? "plum" : event.access === "TICKETED" ? "rose" : "sage"}>
              {locked ? "✦ " : ""}
              {ACCESS_LABEL[event.access]}
            </Pill>
            {event.host && <Pill tone="deep">Held by {event.host}</Pill>}
          </div>
        </div>
      </section>

      <section className="grid gap-14 px-6 py-16 md:grid-cols-[1.4fr_1fr] md:px-14">
        <div>
          <Eyebrow tone="sage">About this gathering</Eyebrow>
          <p className="mt-5 max-w-xl whitespace-pre-line font-serif text-xl leading-relaxed text-ink">
            {event.description}
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {[
              ["Date", formatDate(event.startsAt)],
              ["Time", formatTime(event.startsAt)],
              ["Where", event.location],
              event.price ? ["Price", event.price] : null,
              event.capacity ? ["Capacity", `${event.capacity} seats`] : null,
            ]
              .filter((row): row is [string, string] => row !== null)
              .map(([k, v]) => (
                <div key={k} className="border-t border-rule pt-5">
                  <div className="font-sans text-[9px] uppercase tracking-widest text-sage">{k}</div>
                  <div className="mt-1.5 font-display text-xl text-ink">{v}</div>
                </div>
              ))}
          </div>
        </div>

        <aside className="h-fit rounded-card border border-rule bg-cream p-8">
          {locked ? (
            <>
              <Eyebrow tone="plum">Members only</Eyebrow>
              <p className="mt-4 font-serif text-lg leading-relaxed text-inkSoft">
                This gathering is reserved for Collective members. Join to reserve your seat.
              </p>
              <a
                href="/join-the-collective"
                className="mt-6 inline-flex w-full items-center justify-center rounded-pill bg-plum px-6 py-4 font-sans text-xs font-semibold uppercase tracking-widest text-cream"
              >
                See membership →
              </a>
            </>
          ) : sp.rsvp === "success" ? (
            <>
              <Eyebrow tone="sage">You're on the list</Eyebrow>
              <p className="mt-4 font-serif text-lg leading-relaxed text-inkSoft">
                We'll see you there — details will follow by email as the date gets closer.
              </p>
            </>
          ) : (
            <>
              <Eyebrow tone="sage">Reserve your seat</Eyebrow>
              <form action="/api/rsvp" method="POST" className="mt-5 flex flex-col gap-3">
                <input type="hidden" name="eventId" value={event.id} />
                <input type="hidden" name="redirectTo" value={`/events/${event.slug}`} />
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  className="rounded-xl border border-rule bg-paper px-4 py-3 font-serif text-lg outline-none focus:border-plum"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="rounded-xl border border-rule bg-paper px-4 py-3 font-serif text-lg outline-none focus:border-plum"
                />
                <textarea
                  name="notes"
                  placeholder="Anything we should know? (optional)"
                  rows={2}
                  className="resize-none rounded-xl border border-rule bg-paper px-4 py-3 font-serif text-base outline-none focus:border-plum"
                />
                <button
                  type="submit"
                  className="mt-1 rounded-pill bg-deep px-6 py-4 font-sans text-xs font-semibold uppercase tracking-widest text-cream"
                >
                  Reserve →
                </button>
                {sp.rsvp === "error" && (
                  <p className="font-sans text-xs text-rose">Something didn't go through — try again.</p>
                )}
              </form>
            </>
          )}
        </aside>
      </section>

      <Footer />
    </div>
  );
}

import Link from "next/link";
import type { Event } from "@prisma/client";
import { FlowerOfLife } from "./FlowerOfLife";
import { formatDateShort, formatTime } from "@/lib/utils";

const ACCESS_META: Record<string, [string, string]> = {
  OPEN: ["Open to all", "text-sage border-sage/40 bg-sage/10"],
  MEMBER: ["Members only", "text-plum border-plum/40 bg-plum/10"],
  TICKETED: ["Ticketed · members save", "text-rose border-rose/40 bg-rose/10"],
};

export function EventCard({ event }: { event: Event }) {
  const [label, classes] = ACCESS_META[event.access] ?? ACCESS_META.OPEN;
  const locked = event.access === "MEMBER";

  return (
    <Link
      href={`/events/${event.slug}`}
      className="grid grid-cols-[92px_1fr] gap-5 rounded-card border border-rule bg-cream p-6 transition-transform hover:-translate-y-0.5"
    >
      <div className="relative flex h-[92px] w-[92px] flex-col items-center justify-center overflow-hidden rounded-xl bg-deep text-cream">
        <div className="absolute inset-0 grid place-items-center opacity-25">
          <FlowerOfLife size={92} stroke="#c4978a" opacity={1} strokeWidth={0.4} />
        </div>
        <div className="relative font-sans text-[9px] uppercase tracking-widest text-rose">
          {formatDateShort(event.startsAt).split(" ")[0]}
        </div>
        <div className="relative font-display text-4xl leading-none">
          {formatDateShort(event.startsAt).split(" ")[1]}
        </div>
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage">
            {event.modality ?? "Gathering"} · {event.town ?? event.location}
          </span>
          <span className={`rounded-pill border px-2.5 py-0.5 font-sans text-[9px] font-semibold uppercase tracking-widest ${classes}`}>
            {locked ? "✦ " : ""}
            {label}
          </span>
        </div>
        <h3 className="mt-1.5 font-display text-2xl leading-tight text-ink">{event.title}</h3>
        <div className="mt-1 font-serif italic text-sm text-inkSoft">
          {event.host ? `Held by ${event.host} · ` : ""}
          {formatTime(event.startsAt)}
        </div>
      </div>
    </Link>
  );
}

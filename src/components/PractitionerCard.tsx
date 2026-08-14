import Link from "next/link";
import Image from "next/image";
import type { Practitioner } from "@prisma/client";
import { Pill } from "./ui";

export function PractitionerCard({ p }: { p: Practitioner }) {
  const isMember = p.verificationLevel === "MEMBER" || p.verificationLevel === "FEATURED";
  const isVerified = p.verificationLevel !== "LISTED";

  return (
    <Link
      href={`/find-wellness/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-rule bg-cream shadow-[0_1px_0_rgba(31,24,48,0.04)] transition-transform hover:-translate-y-0.5"
    >
      <div className="relative p-4">
        <div className="relative h-[220px] w-full overflow-hidden rounded-xl bg-plum/10">
          {p.photoUrl ? (
            <Image src={p.photoUrl} alt={p.name} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,#dccfb1_0_12px,#d2c4a0_12px_24px)] font-mono text-[10px] uppercase tracking-widest text-inkSoft">
              portrait · {p.name.split(" ")[0]}
            </div>
          )}
        </div>
        <div className="absolute right-7 top-7 flex flex-col items-end gap-1.5">
          {isMember && <Pill tone="deep">✦ Member</Pill>}
          {isVerified && <Pill tone="sage">✓ Verified</Pill>}
          {p.accepting && (
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-white/90 px-3 py-1 font-sans text-[9px] font-semibold uppercase tracking-widest text-sage">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" /> Accepting
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col px-6 pb-6">
        <div className="mb-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-rose">{p.primaryModality}</div>
        <h3 className="font-display text-[28px] leading-tight text-ink">{p.name}</h3>
        <div className="mt-1 font-serif italic text-inkSoft">
          {p.town}, AK{p.yearsPracticing ? ` · ${p.yearsPracticing} years` : ""}
        </div>
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {p.modalities.slice(0, 3).map((m) => (
            <span key={m} className="rounded-pill bg-sage/15 px-2.5 py-1 font-sans text-[10px] text-sage">
              {m}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-4">
          <div className="mt-3 flex items-center justify-between border-t border-dashed border-rule pt-3.5">
            <span className="font-sans text-[11px] text-inkSoft">
              {p.credentials[0] ?? "Directory listing"}
            </span>
            <span className="font-serif italic text-plum">View profile →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

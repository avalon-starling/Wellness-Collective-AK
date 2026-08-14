import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { Eyebrow, ButtonLink, Pill } from "@/components/ui";
import { getPractitionerBySlug } from "@/lib/data";
import { VERIFICATION_LEVELS } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPractitionerBySlug(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.primaryModality} in ${p.town}, AK — ${p.bio.slice(0, 140)}`,
  };
}

export default async function PractitionerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getPractitionerBySlug(slug);
  if (!p) notFound();

  const levelMeta = VERIFICATION_LEVELS.find(
    (l) =>
      l.id ===
      { LISTED: "listed", VERIFIED: "verified", MEMBER: "member", FEATURED: "featured" }[p.verificationLevel]
  );

  const [firstName, ...rest] = p.name.split(" ");

  return (
    <div className="bg-paper">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_50%,#3a2954_0%,#1f1830_60%,#0c0815_100%)] pb-20 text-cream">
        <div className="pointer-events-none absolute -right-24 -top-20">
          <FlowerOfLife size={480} stroke="#c4978a" opacity={0.15} />
        </div>
        <Nav dark />
        <div className="relative px-6 md:px-14">
          <Link href="/find-wellness" className="font-sans text-[11px] uppercase tracking-widest text-cream/70">
            ← Back to directory
          </Link>
        </div>

        <div className="relative mt-8 grid gap-12 px-6 md:grid-cols-[1.2fr_1fr] md:items-center md:px-14">
          <div>
            <Eyebrow>{levelMeta ? `Level ${levelMeta.level} — ${levelMeta.name}` : "Directory listing"}</Eyebrow>
            <h1 className="mt-5 font-display text-6xl leading-[0.95] tracking-tight md:text-7xl">
              {firstName}
              <br />
              <em className="not-italic text-rose">{rest.join(" ")}</em>
            </h1>
            <div className="mt-5 flex flex-wrap gap-2">
              {(p.verificationLevel === "MEMBER" || p.verificationLevel === "FEATURED") && (
                <Pill tone="rose">✦ Collective member</Pill>
              )}
              {p.modalities.map((m) => (
                <span key={m} className="rounded-pill border border-cream/35 px-3.5 py-1.5 font-sans text-[11px] tracking-wide">
                  {m}
                </span>
              ))}
              <span className="rounded-pill border border-cream/35 px-3.5 py-1.5 font-sans text-[11px] tracking-wide">
                {p.town}, AK
              </span>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              {p.bookingUrl ? (
                <ButtonLink href={p.bookingUrl}>Request a session</ButtonLink>
              ) : p.contactEmail ? (
                <ButtonLink href={`mailto:${p.contactEmail}`}>Request a session</ButtonLink>
              ) : null}
              {p.website && (
                <ButtonLink href={p.website} variant="outline">
                  Visit website ↗
                </ButtonLink>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
              {p.photoUrl ? (
                <div className="relative h-[440px] w-full">
                  <Image src={p.photoUrl} alt={p.name} fill className="object-cover" sizes="480px" />
                </div>
              ) : (
                <div className="flex h-[440px] w-full items-center justify-center bg-[repeating-linear-gradient(135deg,#1a1224_0_12px,#251a33_12px_24px)] font-mono text-[10px] uppercase tracking-widest text-cream/50">
                  portrait · {p.name}
                </div>
              )}
            </div>
            {p.accepting && (
              <div className="absolute -bottom-7 -left-7 w-[200px] rounded-xl bg-cream p-4 text-ink shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                <div className="font-sans text-[9px] uppercase tracking-widest text-sage">Availability</div>
                <div className="mt-1 font-display text-2xl">Currently accepting</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-16 px-6 py-20 md:grid-cols-[1.4fr_1fr] md:px-14">
        <div>
          <Eyebrow tone="sage">About the practice</Eyebrow>
          <p className="mt-6 max-w-xl font-serif text-xl leading-relaxed text-ink">{p.bio}</p>

          <div className="mt-11 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              ["Format", { IN_PERSON: "In-person", VIRTUAL: "Virtual", BOTH: "In-person · Virtual" }[p.format]],
              ["Languages", p.languages.length ? p.languages.join(", ") : "English"],
              ["Rate", p.rateLabel ?? "Contact for rate"],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-rule pt-5">
                <div className="font-sans text-[9px] uppercase tracking-widest text-sage">{k}</div>
                <div className="mt-1.5 font-display text-xl text-ink">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <aside className="relative overflow-hidden rounded-card border border-rule bg-cream p-8">
          <div className="pointer-events-none absolute -bottom-16 -right-16">
            <FlowerOfLife size={240} stroke="#3a2954" opacity={0.08} />
          </div>
          <Eyebrow tone="plum">Credentials on file</Eyebrow>
          <div className="relative mt-5 grid gap-3.5">
            {p.credentials.length ? (
              p.credentials.map((c) => (
                <div key={c} className="flex items-center gap-3">
                  <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-sage font-mono text-[11px] text-cream">✓</span>
                  <span className="font-serif text-[17px] text-ink">{c}</span>
                </div>
              ))
            ) : (
              <p className="font-serif italic text-inkSoft">
                Credential details for this listing are still being reviewed by the Collective.
              </p>
            )}
          </div>
          <Link href="/verification" className="relative mt-6 inline-block font-sans text-[11px] uppercase tracking-widest text-plum">
            How verification works →
          </Link>
        </aside>
      </section>

      <Footer />
    </div>
  );
}

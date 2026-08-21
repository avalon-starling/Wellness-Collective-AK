import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { Eyebrow, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "For Providers",
  description: "Why Alaska wellness practitioners join the Collective — benefits, community, and how to apply.",
};

const BENEFITS = [
  ["Directory profile", "A searchable listing that puts your practice in front of Alaskans actively looking for what you offer."],
  ["Credential display", "Your training, certifications, and licenses shown clearly — so trust does the selling for you."],
  ["Website & social links", "Send directory visitors straight to your own site, booking page, or Instagram."],
  ["Booking & contact info", "However you take clients — a booking link, email, or phone — it's one click away."],
  ["Events listing", "List your own workshops and offerings on the shared Collective calendar."],
  ["Provider networking", "Meet the other practitioners building Alaska's wellness ecosystem alongside you."],
  ["Member discounts", "Reduced rates on Collective events, workshops, and gatherings."],
  ["Teach & speak opportunities", "First consideration when the Collective is looking for workshop leads or speakers."],
  ["Vendor opportunities", "Early access to vendor tables at Wellness Weekend and seasonal markets."],
  ["Collaboration opportunities", "Get introduced to complementary practitioners for referrals and joint offerings."],
  ["Featured placement", "Higher tiers get enhanced visibility across the directory and events."],
  ["Educational resources", "Business and practice-building resources exclusive to members."],
];

export default function ForProvidersPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_70%_20%,#3a2954_0%,#1f1830_58%,#0c0815_100%)] pb-20 text-cream">
        <div className="pointer-events-none absolute -right-24 -top-16">
          <FlowerOfLife size={520} stroke="#c4978a" opacity={0.15} />
        </div>
        <Nav dark />
        <div className="relative max-w-2xl px-6 pt-8 md:px-14">
          <Eyebrow>✨ Wellness providers</Eyebrow>
          <h1 className="mt-6 font-display text-6xl leading-[0.98] tracking-tight md:text-7xl">
            You don&rsquo;t have to build your wellness business{" "}
            <em className="not-italic text-rose">alone.</em>
          </h1>
          <p className="mt-6 max-w-lg font-serif text-xl leading-relaxed text-cream/78">
            Build your network. Grow your practice. Be discovered by the Alaskans looking for exactly
            what you offer.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/apply">Apply — it&rsquo;s free →</ButtonLink>
            <ButtonLink href="/join-the-collective" variant="outline">See membership pricing</ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-paper px-6 py-20 md:px-14">
        <Eyebrow tone="sage">What membership includes</Eyebrow>
        <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight tracking-tight text-ink md:text-5xl">
          Everything a growing practice actually needs.
        </h2>
        <div className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-3">
          {BENEFITS.map(([title, body]) => (
            <div key={title} className="border-t border-rule pt-5">
              <h3 className="font-display text-xl text-ink">{title}</h3>
              <p className="mt-2 font-serif text-[16px] leading-relaxed text-inkSoft">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-deep px-6 py-20 text-cream md:px-14">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow tone="rose">How it works</Eyebrow>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              From application to <em className="not-italic text-rose">Verified</em> profile.
            </h2>
            <p className="mt-5 font-serif text-lg leading-relaxed text-cream/75">
              Submitting an application is free and takes about ten minutes. Here's what happens next.
            </p>
          </div>
          <ol className="grid gap-5">
            {[
              ["1", "Apply", "Tell us about your training, credentials, and practice."],
              ["2", "Review", "The Collective reviews your submitted information against our verification standards."],
              ["3", "Listed", "Your profile goes live in the directory — free, at any membership level."],
              ["4", "Join (optional)", "Add a paid membership any time for the network, events, and featured placement."],
            ].map(([n, title, body]) => (
              <li key={n} className="flex gap-5 rounded-card border border-cream/15 bg-cream/[0.06] p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose font-display text-lg text-deep">
                  {n}
                </span>
                <div>
                  <div className="font-display text-xl">{title}</div>
                  <div className="mt-1 font-serif text-[15px] text-cream/70">{body}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-14 flex justify-center">
          <ButtonLink href="/apply">Start your application →</ButtonLink>
        </div>
      </section>

      <Footer />
    </div>
  );
}

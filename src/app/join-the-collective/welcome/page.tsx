import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { Eyebrow, ButtonLink } from "@/components/ui";
import { SITE } from "@/lib/content";

export const metadata: Metadata = { title: "Welcome" };

export default function WelcomePage() {
  return (
    <div>
      <section className="relative min-h-[70vh] overflow-hidden bg-[radial-gradient(ellipse_at_50%_20%,#3a2954_0%,#1f1830_60%,#0c0815_100%)] pb-24 text-cream">
        <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2">
          <FlowerOfLife size={420} stroke="#c4978a" opacity={0.16} />
        </div>
        <Nav dark />
        <div className="relative mx-auto max-w-xl px-6 pt-16 text-center">
          <Eyebrow>Payment received</Eyebrow>
          <h1 className="mt-6 font-display text-6xl leading-[0.98] tracking-tight">
            Welcome to the <em className="not-italic text-rose">Collective.</em>
          </h1>
          <p className="mt-6 font-serif text-xl leading-relaxed text-cream/78">
            Thank you for joining. We'll follow up at the email you used at checkout with your profile
            questionnaire and next steps — usually within a couple of days.
          </p>
          <p className="mt-4 font-serif text-lg text-cream/60">
            Questions in the meantime? Reach us at{" "}
            <a href={`mailto:${SITE.contactEmail}`} className="text-rose">
              {SITE.contactEmail}
            </a>
            .
          </p>
          <div className="mt-9 flex justify-center gap-4">
            <ButtonLink href="/">Back home</ButtonLink>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

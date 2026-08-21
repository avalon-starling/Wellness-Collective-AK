import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { Eyebrow, ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div>
      <section className="relative min-h-[70vh] overflow-hidden bg-[radial-gradient(ellipse_at_50%_20%,#3a2954_0%,#1f1830_58%,#0c0815_100%)] pb-24 text-cream">
        <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2">
          <FlowerOfLife size={420} stroke="#c4978a" opacity={0.15} />
        </div>
        <Nav dark />
        <div className="relative mx-auto max-w-xl px-6 pt-16 text-center">
          <Eyebrow>404</Eyebrow>
          <h1 className="mt-6 font-display text-6xl leading-[0.98] tracking-tight">
            This page hasn&rsquo;t <em className="not-italic text-rose">found its way yet.</em>
          </h1>
          <p className="mt-6 font-serif text-xl leading-relaxed text-cream/78">
            Let's get you back to something real.
          </p>
          <div className="mt-9 flex justify-center gap-4">
            <ButtonLink href="/">Back home</ButtonLink>
            <ButtonLink href="/find-wellness" variant="outline">Find a provider</ButtonLink>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

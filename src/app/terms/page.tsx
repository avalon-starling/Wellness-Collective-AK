import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/content";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <div className="bg-paper">
      <Nav dark={false} />
      <section className="mx-auto max-w-2xl px-6 py-16 md:px-0">
        <h1 className="font-display text-5xl text-ink">Terms of Use</h1>
        <p className="mt-4 font-sans text-xs uppercase tracking-widest text-rose">
          Draft — have this reviewed by an Alaska-licensed attorney before launch
        </p>

        <div className="mt-10 flex flex-col gap-6 font-serif text-lg leading-relaxed text-ink">
          <p>
            These Terms of Use govern your access to and use of {SITE.name} (the "Collective," "we," or
            "us"), including our website, directory, and events. By using the site, you agree to these
            terms.
          </p>

          <h2 className="mt-4 font-display text-2xl">The directory is informational</h2>
          <p>
            {SITE.name} is a directory and community platform. We do not provide medical, mental
            health, or other healthcare services, and nothing on this site is medical advice. We do not
            employ the practitioners listed in our directory — each provider operates their own
            independent practice.
          </p>

          <h2 className="mt-4 font-display text-2xl">Verification is not certification</h2>
          <p>
            The Wellness Collective does not certify or license practitioners. Our verification levels
            reflect the information a provider has submitted and, at higher levels, our review of that
            information. Verification is not a guarantee of a provider's skill, safety, or fitness for
            any particular purpose. You are responsible for your own due diligence before booking with
            any provider.
          </p>

          <h2 className="mt-4 font-display text-2xl">Provider listings</h2>
          <p>
            Providers are responsible for the accuracy of the information in their applications and
            profiles, including credentials, licenses, and insurance status. We may remove or suspend a
            listing at our discretion, including for violations of our code of conduct.
          </p>

          <h2 className="mt-4 font-display text-2xl">Membership & payments</h2>
          <p>
            Paid membership tiers renew on the billing cycle you select (monthly or annual) until
            cancelled. Payments are processed by a third-party payment processor; we do not store your
            full payment card details. Fees are described on our{" "}
            <a href="/join-the-collective" className="text-plum underline">
              membership page
            </a>
            .
          </p>

          <h2 className="mt-4 font-display text-2xl">Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {SITE.name} is not liable for any interactions,
            services, or agreements between directory users and listed providers, including any
            outcomes of services obtained through the directory.
          </p>

          <h2 className="mt-4 font-display text-2xl">Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${SITE.contactEmail}`} className="text-plum underline">
              {SITE.contactEmail}
            </a>
            .
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

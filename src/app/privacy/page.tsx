import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/content";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="bg-paper">
      <Nav dark={false} />
      <section className="mx-auto max-w-2xl px-6 py-16 md:px-0">
        <h1 className="font-display text-5xl text-ink">Privacy Policy</h1>
        <p className="mt-4 font-sans text-xs uppercase tracking-widest text-rose">
          Draft — have this reviewed by an Alaska-licensed attorney before launch
        </p>

        <div className="mt-10 flex flex-col gap-6 font-serif text-lg leading-relaxed text-ink">
          <p>
            This policy describes how {SITE.name} collects and uses information when you use our
            website.
          </p>

          <h2 className="mt-4 font-display text-2xl">What we collect</h2>
          <ul className="ml-5 list-disc space-y-2">
            <li>Directory searches — no account is required to search or contact a provider.</li>
            <li>Provider application details, when you apply to be listed.</li>
            <li>Event RSVP information (name and email) when you reserve a seat.</li>
            <li>Your email address, if you join our mailing list.</li>
            <li>
              Payment information, if you purchase a membership — handled directly by our payment
              processor, Square. We do not store your full card details.
            </li>
          </ul>

          <h2 className="mt-4 font-display text-2xl">How we use it</h2>
          <p>
            We use this information to operate the directory, review provider applications, manage
            event RSVPs, process membership payments, and send occasional updates to subscribers. We do
            not sell personal information to third parties.
          </p>

          <h2 className="mt-4 font-display text-2xl">Provider profiles</h2>
          <p>
            Information a provider submits for their public profile — name, modality, credentials, bio,
            and contact details — is displayed publicly as part of the directory, by design.
          </p>

          <h2 className="mt-4 font-display text-2xl">Your choices</h2>
          <p>
            You can unsubscribe from our mailing list at any time using the link in any email, or by
            contacting us directly. Providers can request updates or removal of their listing by
            contacting us.
          </p>

          <h2 className="mt-4 font-display text-2xl">Contact</h2>
          <p>
            Questions about this policy can be sent to{" "}
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

import Link from "next/link";
import { SITE } from "@/lib/content";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

const columns = [
  {
    title: "Directory",
    links: [
      { href: "/find-wellness", label: "Find Wellness" },
      { href: "/verification", label: "Verification" },
      { href: "/resources", label: "Resources" },
    ],
  },
  {
    title: "Providers",
    links: [
      { href: "/for-providers", label: "For Providers" },
      { href: "/apply", label: "Apply" },
      { href: "/join-the-collective", label: "Membership" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/events", label: "Events" },
      { href: "/wellness-weekend", label: "Wellness Weekend" },
      { href: "/about", label: "About" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-deep text-cream">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-14">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-xs font-serif italic text-cream/70 text-lg leading-relaxed">
              {SITE.tagline}
            </p>
            <div id="newsletter" className="mt-6 scroll-mt-24">
              <div className="font-sans text-[10px] tracking-[0.25em] uppercase text-sage mb-2">
                Join the list
              </div>
              <NewsletterForm />
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div className="font-sans text-[10px] tracking-[0.25em] uppercase text-sage mb-4">
                {col.title}
              </div>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="font-serif text-lg text-cream/85 hover:text-cream">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/15 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-xs tracking-wide text-cream/50">
            © {new Date().getFullYear()} {SITE.name}. {SITE.region}.
          </p>
          <div className="flex flex-wrap items-center gap-6 font-sans text-xs tracking-wide text-cream/50">
            <a href={`mailto:${SITE.contactEmail}`} className="hover:text-cream/80">
              {SITE.contactEmail}
            </a>
            <Link href="/terms" className="hover:text-cream/80">Terms</Link>
            <Link href="/privacy" className="hover:text-cream/80">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

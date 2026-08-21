import Link from "next/link";
import { Logo } from "@/components/Logo";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/practitioners", label: "Practitioners" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/resources", label: "Resources" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-rule bg-deep px-6 py-8 text-cream md:flex">
          <div>
            <Logo dark />
            <nav className="mt-10 flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-3 py-2.5 font-sans text-sm text-cream/75 hover:bg-cream/10 hover:text-cream"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/" className="font-sans text-xs text-cream/50 hover:text-cream/80">
              ← Back to site
            </Link>
            <form action="/api/admin/logout" method="POST">
              <button type="submit" className="font-sans text-xs text-cream/50 hover:text-cream/80">
                Sign out
              </button>
            </form>
          </div>
        </aside>

        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-rule bg-cream px-6 py-4 md:hidden">
            <Logo dark={false} />
            <form action="/api/admin/logout" method="POST">
              <button type="submit" className="font-sans text-xs text-inkSoft">
                Sign out
              </button>
            </form>
          </header>
          <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">{children}</div>
        </div>
      </div>
    </div>
  );
}

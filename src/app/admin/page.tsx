import Link from "next/link";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [pendingApplications, practitionerCount, publishedCount, upcomingEvents, subscriberCount] =
    await Promise.all([
      db.application.count({ where: { status: "PENDING" } }),
      db.practitioner.count(),
      db.practitioner.count({ where: { published: true } }),
      db.event.count({ where: { startsAt: { gte: new Date() } } }),
      db.subscriber.count(),
    ]);

  const stats = [
    { label: "Pending applications", value: pendingApplications, href: "/admin/applications" },
    { label: "Published practitioners", value: publishedCount, href: "/admin/practitioners" },
    { label: "Total practitioners", value: practitionerCount, href: "/admin/practitioners" },
    { label: "Upcoming events", value: upcomingEvents, href: "/admin/events" },
    { label: "Newsletter subscribers", value: subscriberCount, href: null },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl text-ink">Dashboard</h1>
      <p className="mt-2 font-serif text-lg text-inkSoft">The master control panel for the Collective.</p>

      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => {
          const content = (
            <div className="rounded-card border border-rule bg-cream p-6">
              <div className="font-display text-4xl text-ink">{s.value}</div>
              <div className="mt-2 font-sans text-[11px] uppercase tracking-widest text-inkSoft">{s.label}</div>
            </div>
          );
          return s.href ? (
            <Link key={s.label} href={s.href}>
              {content}
            </Link>
          ) : (
            <div key={s.label}>{content}</div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/admin/practitioners/new" className="rounded-pill bg-deep px-6 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-cream">
          + New practitioner
        </Link>
        <Link href="/admin/events/new" className="rounded-pill border border-ink/25 px-6 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-ink">
          + New event
        </Link>
        <Link href="/admin/resources/new" className="rounded-pill border border-ink/25 px-6 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-ink">
          + New resource
        </Link>
      </div>

      {pendingApplications > 0 && (
        <div className="mt-10 rounded-card border border-rose/40 bg-rose/10 p-6">
          <div className="font-display text-xl text-ink">
            {pendingApplications} application{pendingApplications === 1 ? "" : "s"} waiting on review
          </div>
          <Link href="/admin/applications" className="mt-2 inline-block font-serif italic text-plum">
            Review now →
          </Link>
        </div>
      )}
    </div>
  );
}

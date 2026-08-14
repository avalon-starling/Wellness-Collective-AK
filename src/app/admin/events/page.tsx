import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = await db.event.findMany({ orderBy: { startsAt: "desc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-4xl text-ink">Events</h1>
        <Link
          href="/admin/events/new"
          className="rounded-pill bg-deep px-6 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-cream"
        >
          + New event
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-card border border-rule bg-cream">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-rule font-sans text-[10px] uppercase tracking-widest text-inkSoft">
              <th className="px-5 py-4">Title</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Access</th>
              <th className="px-5 py-4">Flagship</th>
              <th className="px-5 py-4">Published</th>
              <th className="px-5 py-4" />
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-b border-rule last:border-0">
                <td className="px-5 py-4 font-serif text-lg text-ink">{e.title}</td>
                <td className="px-5 py-4 font-sans text-sm text-inkSoft">{formatDate(e.startsAt)}</td>
                <td className="px-5 py-4 font-sans text-sm text-inkSoft">{e.access}</td>
                <td className="px-5 py-4 font-sans text-sm text-inkSoft">{e.isFlagship ? "✦" : "—"}</td>
                <td className="px-5 py-4 font-sans text-sm">
                  {e.published ? <span className="text-sage">Live</span> : <span className="text-inkSoft">Draft</span>}
                </td>
                <td className="px-5 py-4">
                  <Link href={`/admin/events/${e.id}`} className="font-sans text-xs uppercase tracking-widest text-plum">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center font-serif italic text-inkSoft">
                  No events yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

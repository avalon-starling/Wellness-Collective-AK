import Link from "next/link";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminResourcesPage() {
  const resources = await db.resource.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-4xl text-ink">Resources</h1>
        <Link
          href="/admin/resources/new"
          className="rounded-pill bg-deep px-6 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-cream"
        >
          + New resource
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-card border border-rule bg-cream">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-b border-rule font-sans text-[10px] uppercase tracking-widest text-inkSoft">
              <th className="px-5 py-4">Title</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Published</th>
              <th className="px-5 py-4" />
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r.id} className="border-b border-rule last:border-0">
                <td className="px-5 py-4 font-serif text-lg text-ink">{r.title}</td>
                <td className="px-5 py-4 font-sans text-sm text-inkSoft">{r.category}</td>
                <td className="px-5 py-4 font-sans text-sm">
                  {r.published ? <span className="text-sage">Live</span> : <span className="text-inkSoft">Draft</span>}
                </td>
                <td className="px-5 py-4">
                  <Link href={`/admin/resources/${r.id}`} className="font-sans text-xs uppercase tracking-widest text-plum">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {resources.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center font-serif italic text-inkSoft">
                  No resources yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import Link from "next/link";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminPractitionersPage() {
  const practitioners = await db.practitioner.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-4xl text-ink">Practitioners</h1>
        <Link
          href="/admin/practitioners/new"
          className="rounded-pill bg-deep px-6 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-cream"
        >
          + New practitioner
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-card border border-rule bg-cream">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-rule font-sans text-[10px] uppercase tracking-widest text-inkSoft">
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Modality</th>
              <th className="px-5 py-4">Town</th>
              <th className="px-5 py-4">Verification</th>
              <th className="px-5 py-4">Published</th>
              <th className="px-5 py-4" />
            </tr>
          </thead>
          <tbody>
            {practitioners.map((p) => (
              <tr key={p.id} className="border-b border-rule last:border-0">
                <td className="px-5 py-4 font-serif text-lg text-ink">{p.name}</td>
                <td className="px-5 py-4 font-sans text-sm text-inkSoft">{p.primaryModality}</td>
                <td className="px-5 py-4 font-sans text-sm text-inkSoft">{p.town}</td>
                <td className="px-5 py-4 font-sans text-sm text-inkSoft">{p.verificationLevel}</td>
                <td className="px-5 py-4 font-sans text-sm">
                  {p.published ? (
                    <span className="text-sage">Live</span>
                  ) : (
                    <span className="text-inkSoft">Draft</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <Link href={`/admin/practitioners/${p.id}`} className="font-sans text-xs uppercase tracking-widest text-plum">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {practitioners.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center font-serif italic text-inkSoft">
                  No practitioners yet — add one, or approve an application.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

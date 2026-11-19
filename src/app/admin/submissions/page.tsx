import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Marketing Submissions",
  description: "Review and approve marketing content submissions",
};

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  const submissions = await db.marketingSubmission.findMany({
    include: { practitioner: { select: { id: true, name: true, slug: true } } },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });

  const stats = {
    pending: submissions.filter((s) => s.status === "PENDING").length,
    approved: submissions.filter((s) => s.status === "APPROVED").length,
    rejected: submissions.filter((s) => s.status === "REJECTED").length,
  };

  const grouped = {
    pending: submissions.filter((s) => s.status === "PENDING"),
    approved: submissions.filter((s) => s.status === "APPROVED"),
    rejected: submissions.filter((s) => s.status === "REJECTED"),
  };

  return (
    <div className="space-y-8">
      <div>
        <Eyebrow>Submissions</Eyebrow>
        <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">
          Marketing Submissions
        </h1>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-rule bg-cream p-6">
          <div className="font-sans text-xs uppercase tracking-widest text-sage">
            Pending Review
          </div>
          <div className="mt-2 font-display text-3xl text-amber-700">
            {stats.pending}
          </div>
        </div>
        <div className="rounded-lg border border-rule bg-cream p-6">
          <div className="font-sans text-xs uppercase tracking-widest text-sage">
            Approved
          </div>
          <div className="mt-2 font-display text-3xl text-sage">
            {stats.approved}
          </div>
        </div>
        <div className="rounded-lg border border-rule bg-cream p-6">
          <div className="font-sans text-xs uppercase tracking-widest text-sage">
            Rejected
          </div>
          <div className="mt-2 font-display text-3xl text-red-700">
            {stats.rejected}
          </div>
        </div>
      </div>

      {/* Pending Submissions */}
      {grouped.pending.length > 0 && (
        <div>
          <h2 className="mb-4 font-display text-2xl text-ink">
            Pending Review ({grouped.pending.length})
          </h2>
          <div className="space-y-4">
            {grouped.pending.map((sub) => (
              <Link
                key={sub.id}
                href={`/admin/submissions/${sub.id}`}
                className="block rounded-lg border border-rule bg-white p-6 hover:bg-cream"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-semibold text-ink">
                      {sub.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-4 text-sm text-inkSoft">
                      <span>{sub.practitioner.name}</span>
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-xs capitalize text-amber-700">
                        {sub.submittedFor}
                      </span>
                      <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="mt-2 line-clamp-2 font-serif text-inkSoft">
                      {sub.content}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                      Pending
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Approved Submissions */}
      {grouped.approved.length > 0 && (
        <div>
          <h2 className="mb-4 font-display text-2xl text-ink">
            Approved ({grouped.approved.length})
          </h2>
          <div className="space-y-3">
            {grouped.approved.map((sub) => (
              <Link
                key={sub.id}
                href={`/admin/submissions/${sub.id}`}
                className="block rounded-lg border border-rule bg-white p-4 hover:bg-cream"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif font-semibold text-ink">
                      {sub.title}
                    </h3>
                    <p className="text-sm text-inkSoft">{sub.practitioner.name}</p>
                  </div>
                  <span className="rounded-full bg-sage/20 px-3 py-1 text-xs font-medium text-sage">
                    Approved
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Rejected Submissions */}
      {grouped.rejected.length > 0 && (
        <div>
          <h2 className="mb-4 font-display text-2xl text-ink">
            Rejected ({grouped.rejected.length})
          </h2>
          <div className="space-y-3">
            {grouped.rejected.map((sub) => (
              <Link
                key={sub.id}
                href={`/admin/submissions/${sub.id}`}
                className="block rounded-lg border border-rule bg-white p-4 hover:bg-cream"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif font-semibold text-ink">
                      {sub.title}
                    </h3>
                    <p className="text-sm text-inkSoft">{sub.practitioner.name}</p>
                  </div>
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    Rejected
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {submissions.length === 0 && (
        <div className="rounded-lg border border-dashed border-rule bg-cream/50 px-8 py-16 text-center">
          <p className="font-serif text-inkSoft">No submissions yet.</p>
        </div>
      )}
    </div>
  );
}

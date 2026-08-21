import { db } from "@/lib/db";
import { approveApplication, rejectApplication } from "@/lib/admin-actions";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage() {
  const applications = await db.application.findMany({ orderBy: { createdAt: "desc" } });
  const pending = applications.filter((a) => a.status === "PENDING");
  const reviewed = applications.filter((a) => a.status !== "PENDING");

  return (
    <div>
      <h1 className="font-display text-4xl text-ink">Applications</h1>
      <p className="mt-2 font-serif text-lg text-inkSoft">
        {pending.length} pending · {applications.length} total
      </p>

      <div className="mt-8 flex flex-col gap-5">
        {pending.length === 0 && (
          <p className="font-serif italic text-inkSoft">Nothing waiting on review.</p>
        )}
        {pending.map((app) => (
          <div key={app.id} className="rounded-card border border-rule bg-cream p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-ink">{app.name}</h2>
                <div className="mt-1 font-serif italic text-inkSoft">
                  {app.primaryModality} · {app.town} · applied {formatDate(app.createdAt)}
                </div>
              </div>
              <span className="rounded-pill bg-rose/20 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-widest text-rose">
                Pending
              </span>
            </div>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <Row label="Email" value={app.email} />
              <Row label="Phone" value={app.phone || "—"} />
              <Row label="Modalities" value={app.modalities.join(", ") || app.primaryModality} />
              <Row label="Years practicing" value={app.yearsPracticing?.toString() || "—"} />
              <Row label="Website" value={app.website || "—"} />
              <Row label="Instagram" value={app.instagram || "—"} />
              <Row label="Insurance" value={app.insurance ? "Yes" : "Not indicated"} />
              <Row label="Format" value={app.format} />
            </dl>

            <div className="mt-5">
              <div className="font-sans text-[10px] uppercase tracking-widest text-inkSoft">Bio</div>
              <p className="mt-1.5 font-serif text-[17px] leading-relaxed text-ink">{app.bio}</p>
            </div>
            <div className="mt-4">
              <div className="font-sans text-[10px] uppercase tracking-widest text-inkSoft">
                Training / certifications / licenses
              </div>
              <p className="mt-1.5 whitespace-pre-line font-serif text-[17px] leading-relaxed text-ink">
                {app.credentials}
              </p>
            </div>
            {app.businessInfo && (
              <div className="mt-4">
                <div className="font-sans text-[10px] uppercase tracking-widest text-inkSoft">Business info</div>
                <p className="mt-1.5 font-serif text-[17px] leading-relaxed text-ink">{app.businessInfo}</p>
              </div>
            )}
            {app.message && (
              <div className="mt-4">
                <div className="font-sans text-[10px] uppercase tracking-widest text-inkSoft">Message</div>
                <p className="mt-1.5 font-serif text-[17px] leading-relaxed text-ink">{app.message}</p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-dashed border-rule pt-5">
              <form action={approveApplication.bind(null, app.id)}>
                <button
                  type="submit"
                  className="rounded-pill bg-sage px-6 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-cream"
                >
                  Approve → creates listing
                </button>
              </form>
              <form action={rejectApplication.bind(null, app.id)} className="flex items-center gap-2">
                <input
                  name="notes"
                  placeholder="Rejection note (optional)"
                  className="rounded-lg border border-rule bg-white px-3 py-2.5 font-sans text-sm outline-none focus:border-plum"
                />
                <button
                  type="submit"
                  className="rounded-pill border border-ink/25 px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-widest text-ink"
                >
                  Reject
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {reviewed.length > 0 && (
        <div className="mt-14">
          <h2 className="font-display text-2xl text-ink">Reviewed</h2>
          <div className="mt-4 flex flex-col gap-2">
            {reviewed.map((app) => (
              <div key={app.id} className="flex items-center justify-between rounded-lg border border-rule bg-cream px-5 py-3">
                <span className="font-serif text-lg text-ink">
                  {app.name} <span className="text-inkSoft">· {app.primaryModality}</span>
                </span>
                <span
                  className={`rounded-pill px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-widest ${
                    app.status === "APPROVED" ? "bg-sage/20 text-sage" : "bg-ink/10 text-inkSoft"
                  }`}
                >
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-sans text-[10px] uppercase tracking-widest text-inkSoft">{label}</div>
      <div className="mt-1 font-serif text-[17px] text-ink">{value}</div>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Eyebrow, ButtonLink } from "@/components/ui";
import { ApprovalForm } from "./form";

export const metadata: Metadata = {
  title: "Review Submission",
};

export const dynamic = "force-dynamic";

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const submission = await db.marketingSubmission.findUnique({
    where: { id },
    include: {
      practitioner: { select: { id: true, name: true, slug: true, email: true } },
    },
  });

  if (!submission) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Eyebrow>Marketing Submission</Eyebrow>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">
            {submission.title}
          </h1>
        </div>
        <ButtonLink href="/admin/submissions">← Back</ButtonLink>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_300px]">
        <div>
          {/* Submission Details */}
          <div className="rounded-lg border border-rule bg-cream p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-sage">
                  Submitted by
                </p>
                <p className="mt-1 font-serif text-lg text-ink">
                  {submission.practitioner.name}
                </p>
                <p className="font-serif text-sm text-inkSoft">
                  {submission.practitioner.email}
                </p>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-sage">
                  Submitted for
                </p>
                <p className="mt-1 font-serif text-lg capitalize text-ink">
                  {submission.submittedFor}
                </p>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-sage">
                  Date
                </p>
                <p className="mt-1 font-serif text-lg text-ink">
                  {new Date(submission.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="border-t border-rule pt-6">
              <h2 className="font-display text-xl text-ink">Content</h2>
              <div className="mt-4 font-serif leading-relaxed text-ink">
                {submission.content}
              </div>

              {submission.imageUrl && (
                <div className="mt-6">
                  <p className="font-sans text-xs uppercase tracking-widest text-sage">
                    Image
                  </p>
                  <div className="mt-2 overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={submission.imageUrl}
                      alt="Submission image"
                      className="max-h-64 w-auto"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Review History */}
            {submission.status !== "PENDING" && (
              <div className="border-t border-rule pt-6">
                <h2 className="font-display text-xl text-ink">Review</h2>
                <div className="mt-4 space-y-2">
                  <p className="font-serif text-sm text-ink">
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        submission.status === "APPROVED"
                          ? "text-sage"
                          : submission.status === "REJECTED"
                            ? "text-red-700"
                            : "text-amber-700"
                      }
                    >
                      {submission.status}
                    </span>
                  </p>
                  {submission.reviewedAt && (
                    <p className="font-serif text-sm text-inkSoft">
                      Reviewed on{" "}
                      {new Date(submission.reviewedAt).toLocaleDateString()}
                    </p>
                  )}
                  {submission.reviewNotes && (
                    <div className="mt-3 rounded-lg bg-cream/50 p-3">
                      <p className="font-sans text-xs uppercase tracking-widest text-sage">
                        Admin Notes
                      </p>
                      <p className="mt-1 font-serif text-sm text-ink">
                        {submission.reviewNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Approval Form Sidebar */}
        {submission.status === "PENDING" && <ApprovalForm submissionId={id} />}
      </div>
    </div>
  );
}

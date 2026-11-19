"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

export function ApprovalForm({ submissionId }: { submissionId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [notes, setNotes] = useState("");

  async function handleApprove() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/submissions/${submissionId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to approve");
      }

      router.refresh();
      router.push("/admin/submissions");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to approve");
      setLoading(false);
    }
  }

  async function handleReject() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/submissions/${submissionId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to reject");
      }

      router.refresh();
      router.push("/admin/submissions");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reject");
      setLoading(false);
    }
  }

  if (action === "approve") {
    return (
      <div className="sticky top-6 space-y-4 rounded-lg border border-rule bg-sage/10 p-6">
        <h2 className="font-display text-xl text-ink">Approve Submission</h2>
        <div>
          <label className="block font-serif text-sm text-ink">
            Admin Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={loading}
            rows={4}
            className="mt-2 w-full rounded-lg border border-rule px-3 py-2 font-serif text-ink"
            placeholder="e.g., Feature in next week's newsletter..."
          />
        </div>
        {error && (
          <div className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        <div className="flex gap-2">
          <Button
            onClick={handleApprove}
            disabled={loading}
            className="flex-1 bg-sage"
          >
            {loading ? "Approving..." : "Confirm Approval"}
          </Button>
          <button
            onClick={() => setAction(null)}
            disabled={loading}
            className="rounded-lg border border-rule bg-white px-4 py-2 font-serif text-ink hover:bg-cream"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (action === "reject") {
    return (
      <div className="sticky top-6 space-y-4 rounded-lg border border-rule bg-red-50 p-6">
        <h2 className="font-display text-xl text-red-700">Reject Submission</h2>
        <div>
          <label className="block font-serif text-sm text-ink">
            Reason for rejection
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={loading}
            rows={4}
            className="mt-2 w-full rounded-lg border border-rule px-3 py-2 font-serif text-ink"
            placeholder="Let them know why this wasn't approved..."
          />
        </div>
        {error && (
          <div className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        <div className="flex gap-2">
          <Button
            onClick={handleReject}
            disabled={loading}
            className="flex-1 bg-red-700"
          >
            {loading ? "Rejecting..." : "Confirm Rejection"}
          </Button>
          <button
            onClick={() => setAction(null)}
            disabled={loading}
            className="rounded-lg border border-rule bg-white px-4 py-2 font-serif text-ink hover:bg-cream"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-6 space-y-3 rounded-lg border border-rule bg-cream p-6">
      <h2 className="font-display text-xl text-ink">Actions</h2>
      <button
        onClick={() => setAction("approve")}
        disabled={loading}
        className="w-full rounded-lg bg-sage px-4 py-3 font-serif text-cream hover:bg-sage/90"
      >
        ✓ Approve
      </button>
      <button
        onClick={() => setAction("reject")}
        disabled={loading}
        className="w-full rounded-lg bg-red-700 px-4 py-3 font-serif text-cream hover:bg-red-800"
      >
        ✕ Reject
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Button } from "@/components/ui";

export function SubmissionForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/member/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          content: formData.get("content"),
          imageUrl: formData.get("imageUrl"),
          submittedFor: formData.get("submittedFor"),
        }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to submit");
      }

      setSuccess(true);
      form.reset();
      setTimeout(() => router.refresh(), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-sage/30 bg-sage/10 px-4 py-3 text-sm text-sage">
          ✓ Submission received! Admin will review and respond.
        </div>
      )}

      <div className="space-y-4 rounded-lg border border-rule bg-cream p-6">
        <div>
          <label className="block font-serif text-sm text-ink">
            What are you submitting for?
          </label>
          <select
            name="submittedFor"
            required
            disabled={loading}
            className="mt-1 w-full rounded-lg border border-rule px-3 py-2 font-serif text-ink"
          >
            <option value="">Select...</option>
            <option value="newsletter">Weekly Newsletter</option>
            <option value="blog">Blog Article</option>
            <option value="event">Event Highlight</option>
          </select>
        </div>

        <Field
          label="Title"
          name="title"
          required
          disabled={loading}
          placeholder="e.g., 'Winter Wellness Tips' or 'New Workshop Announcement'"
        />

        <div>
          <label className="block font-serif text-sm text-ink">Content</label>
          <textarea
            name="content"
            required
            disabled={loading}
            rows={8}
            className="mt-1 w-full rounded-lg border border-rule px-3 py-2 font-serif text-ink"
            placeholder="Write your content here. You can use markdown formatting."
          />
        </div>

        <Field
          label="Image URL (optional)"
          name="imageUrl"
          type="url"
          disabled={loading}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit for Review"}
        </Button>
      </div>

      <p className="font-serif text-sm text-inkSoft">
        📋 Admin will review your submission and get back to you within 48 hours.
        Check your email for updates.
      </p>
    </form>
  );
}

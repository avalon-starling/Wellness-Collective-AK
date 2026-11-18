"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Button } from "@/components/ui";

export function BlogSubmitForm() {
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
      const res = await fetch("/api/member/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          excerpt: formData.get("excerpt"),
          content: formData.get("content"),
          coverImageUrl: formData.get("coverImageUrl"),
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
          ✓ Article submitted! Admin will review within 48 hours.
        </div>
      )}

      <div className="space-y-4 rounded-lg border border-rule bg-cream p-6">
        <h2 className="font-display text-xl text-ink">Article Details</h2>

        <Field
          label="Title"
          name="title"
          required
          disabled={loading}
          placeholder="e.g., 'Understanding Acupuncture for Anxiety'"
        />

        <Field
          label="Excerpt (1-2 sentences)"
          name="excerpt"
          required
          disabled={loading}
          placeholder="A brief summary that appears in listings..."
        />

        <div>
          <label className="block font-serif text-sm text-ink">
            Article Content (supports markdown)
          </label>
          <textarea
            name="content"
            required
            disabled={loading}
            rows={12}
            className="mt-1 w-full rounded-lg border border-rule px-3 py-2 font-serif text-ink"
            placeholder={`# Your Title

Write your full article here.

## Formatting Guide
- Use **bold** for emphasis
- Use *italic* for terms
- Use # for headings
- Use - for bullet points

---

Happy writing!`}
          />
        </div>

        <Field
          label="Cover Image URL (optional)"
          name="coverImageUrl"
          type="url"
          disabled={loading}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="rounded-lg border border-dashed border-rule bg-cream/50 p-6">
        <h3 className="font-serif font-semibold text-ink">📋 Publishing Process</h3>
        <ul className="mt-3 space-y-2 font-serif text-sm text-inkSoft">
          <li>✓ Submit your article</li>
          <li>✓ Admin reviews within 48 hours</li>
          <li>✓ Get published on /blog with your name</li>
          <li>✓ Featured in our weekly newsletter</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Article"}
        </Button>
      </div>
    </form>
  );
}

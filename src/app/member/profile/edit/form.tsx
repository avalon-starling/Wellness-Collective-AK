"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Button } from "@/components/ui";
import type { Practitioner } from "@prisma/client";

export function ProfileEditForm({ practitioner }: { practitioner: Practitioner }) {
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

    const data = {
      name: formData.get("name"),
      pronouns: formData.get("pronouns"),
      primaryModality: formData.get("primaryModality"),
      modalities: (formData.get("modalities") as string)
        .split(";")
        .map((m) => m.trim())
        .filter(Boolean),
      specialties: (formData.get("specialties") as string)
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean),
      bio: formData.get("bio"),
      credentials: (formData.get("credentials") as string)
        .split(";")
        .map((c) => c.trim())
        .filter(Boolean),
      yearsPracticing: formData.get("yearsPracticing")
        ? parseInt(formData.get("yearsPracticing") as string)
        : null,
      languages: (formData.get("languages") as string)
        .split(";")
        .map((l) => l.trim())
        .filter(Boolean),
      rateLabel: formData.get("rateLabel"),
      website: formData.get("website"),
      instagram: formData.get("instagram"),
      bookingUrl: formData.get("bookingUrl"),
      contactEmail: formData.get("contactEmail"),
      contactPhone: formData.get("contactPhone"),
      photoUrl: formData.get("photoUrl"),
      town: formData.get("town"),
      format: formData.get("format"),
      accepting: formData.get("accepting") === "on",
      published: formData.get("published") === "on",
    };

    try {
      const res = await fetch("/api/member/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to save profile");
      }

      setSuccess(true);
      setTimeout(() => router.push("/member/dashboard"), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
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
          ✓ Profile updated! Redirecting...
        </div>
      )}

      {/* Basic Info */}
      <div className="space-y-4 rounded-lg border border-rule bg-cream p-6">
        <h2 className="font-display text-2xl text-ink">Basic Information</h2>
        <Field
          label="Full Name"
          name="name"
          defaultValue={practitioner.name}
          required
          disabled={loading}
        />
        <Field
          label="Pronouns (optional)"
          name="pronouns"
          defaultValue={practitioner.pronouns || ""}
          disabled={loading}
          placeholder="e.g., they/them"
        />
        <Field
          label="Town"
          name="town"
          defaultValue={practitioner.town}
          required
          disabled={loading}
        />
        <div>
          <label className="block font-serif text-sm text-ink">Format</label>
          <select
            name="format"
            defaultValue={practitioner.format}
            className="mt-1 w-full rounded-lg border border-rule px-3 py-2 font-serif text-ink"
            disabled={loading}
          >
            <option value="IN_PERSON">In-Person</option>
            <option value="VIRTUAL">Virtual</option>
            <option value="BOTH">Both</option>
          </select>
        </div>
      </div>

      {/* Modalities & Credentials */}
      <div className="space-y-4 rounded-lg border border-rule bg-cream p-6">
        <h2 className="font-display text-2xl text-ink">Practice Info</h2>
        <Field
          label="Primary Modality"
          name="primaryModality"
          defaultValue={practitioner.primaryModality}
          required
          disabled={loading}
          placeholder="e.g., Acupuncture"
        />
        <Field
          label="All Modalities (semicolon-separated)"
          name="modalities"
          defaultValue={practitioner.modalities.join("; ")}
          disabled={loading}
          placeholder="e.g., Acupuncture; Herbal Medicine; TCM"
        />
        <Field
          label="Specialties (semicolon-separated)"
          name="specialties"
          defaultValue={practitioner.specialties.join("; ")}
          disabled={loading}
          placeholder="e.g., Women's Health; Pain Management"
        />
        <Field
          label="Credentials (semicolon-separated)"
          name="credentials"
          defaultValue={practitioner.credentials.join("; ")}
          disabled={loading}
          placeholder="e.g., Licensed Acupuncturist; Dipl. Ac. (NCCAOM)"
        />
        <Field
          label="Years Practicing (optional)"
          name="yearsPracticing"
          type="number"
          defaultValue={practitioner.yearsPracticing?.toString() || ""}
          disabled={loading}
        />
        <Field
          label="Languages Spoken (semicolon-separated)"
          name="languages"
          defaultValue={practitioner.languages.join("; ")}
          disabled={loading}
          placeholder="e.g., English; Mandarin"
        />
      </div>

      {/* Bio & Contact */}
      <div className="space-y-4 rounded-lg border border-rule bg-cream p-6">
        <h2 className="font-display text-2xl text-ink">About You</h2>
        <div>
          <label className="block font-serif text-sm text-ink">Bio</label>
          <textarea
            name="bio"
            defaultValue={practitioner.bio}
            required
            disabled={loading}
            rows={6}
            className="mt-1 w-full rounded-lg border border-rule px-3 py-2 font-serif text-ink"
            placeholder="Tell the community about your practice..."
          />
        </div>
        <Field
          label="Rate Label (optional)"
          name="rateLabel"
          defaultValue={practitioner.rateLabel || ""}
          disabled={loading}
          placeholder="e.g., $120/session · sliding scale"
        />
      </div>

      {/* Links */}
      <div className="space-y-4 rounded-lg border border-rule bg-cream p-6">
        <h2 className="font-display text-2xl text-ink">Online Presence</h2>
        <Field
          label="Website (optional)"
          name="website"
          type="url"
          defaultValue={practitioner.website || ""}
          disabled={loading}
        />
        <Field
          label="Instagram Handle (optional)"
          name="instagram"
          defaultValue={practitioner.instagram || ""}
          disabled={loading}
          placeholder="@yourusername"
        />
        <Field
          label="Booking URL (optional)"
          name="bookingUrl"
          type="url"
          defaultValue={practitioner.bookingUrl || ""}
          disabled={loading}
          placeholder="https://calendly.com/yourname"
        />
        <Field
          label="Photo URL (optional)"
          name="photoUrl"
          type="url"
          defaultValue={practitioner.photoUrl || ""}
          disabled={loading}
          placeholder="https://example.com/photo.jpg"
        />
      </div>

      {/* Contact */}
      <div className="space-y-4 rounded-lg border border-rule bg-cream p-6">
        <h2 className="font-display text-2xl text-ink">Contact Information</h2>
        <Field
          label="Email"
          name="contactEmail"
          type="email"
          defaultValue={practitioner.contactEmail || ""}
          disabled={loading}
        />
        <Field
          label="Phone (optional)"
          name="contactPhone"
          type="tel"
          defaultValue={practitioner.contactPhone || ""}
          disabled={loading}
        />
      </div>

      {/* Visibility */}
      <div className="space-y-4 rounded-lg border border-rule bg-cream p-6">
        <h2 className="font-display text-2xl text-ink">Visibility</h2>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="accepting"
            defaultChecked={practitioner.accepting}
            disabled={loading}
            className="accent-plum"
          />
          <span className="font-serif text-ink">Currently accepting new clients</span>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="published"
            defaultChecked={practitioner.published}
            disabled={loading}
            className="accent-plum"
          />
          <span className="font-serif text-ink">Publish to directory</span>
        </label>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
        </Button>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="rounded-lg border border-rule bg-white px-6 py-2 font-serif text-ink hover:bg-cream disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

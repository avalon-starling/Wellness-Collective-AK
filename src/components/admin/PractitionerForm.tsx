import type { Practitioner } from "@prisma/client";
import { savePractitioner, deletePractitioner } from "@/lib/admin-actions";
import { Field, TextAreaField, SelectField, Checkbox, SubmitButton } from "./fields";

export function PractitionerForm({ practitioner }: { practitioner?: Practitioner }) {
  const action = savePractitioner.bind(null, practitioner?.id ?? null);

  return (
    <>
    <form action={action} className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" name="name" defaultValue={practitioner?.name} required />
        <Field label="Slug (URL)" name="slug" defaultValue={practitioner?.slug} placeholder="auto-generated from name if blank" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Primary modality" name="primaryModality" defaultValue={practitioner?.primaryModality} required />
        <Field label="Town" name="town" defaultValue={practitioner?.town} required />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="All modalities (comma-separated)" name="modalities" defaultValue={practitioner?.modalities.join(", ")} />
        <Field label="Specialties (comma-separated)" name="specialties" defaultValue={practitioner?.specialties.join(", ")} />
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <SelectField
          label="Format"
          name="format"
          defaultValue={practitioner?.format}
          options={[
            ["IN_PERSON", "In-person"],
            ["VIRTUAL", "Virtual"],
            ["BOTH", "In-person & virtual"],
          ]}
        />
        <Field label="Years practicing" name="yearsPracticing" type="number" min={0} max={80} defaultValue={practitioner?.yearsPracticing ?? undefined} />
        <Field label="Pronouns" name="pronouns" defaultValue={practitioner?.pronouns ?? undefined} />
      </div>

      <TextAreaField label="Bio" name="bio" defaultValue={practitioner?.bio} required rows={5} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Credentials (comma-separated)" name="credentials" defaultValue={practitioner?.credentials.join(", ")} />
        <Field label="Languages (comma-separated)" name="languages" defaultValue={practitioner?.languages.join(", ") || "English"} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Rate label" name="rateLabel" placeholder="e.g. $120 / session · sliding scale" defaultValue={practitioner?.rateLabel ?? undefined} />
        <Field label="Price range" name="priceRange" placeholder="$, $$, or $$$" defaultValue={practitioner?.priceRange ?? undefined} />
      </div>

      <Field label="Photo URL" name="photoUrl" type="url" defaultValue={practitioner?.photoUrl ?? undefined} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Website" name="website" type="url" defaultValue={practitioner?.website ?? undefined} />
        <Field label="Instagram" name="instagram" defaultValue={practitioner?.instagram ?? undefined} />
        <Field label="Booking URL" name="bookingUrl" type="url" defaultValue={practitioner?.bookingUrl ?? undefined} />
        <Field label="Contact email" name="contactEmail" type="email" defaultValue={practitioner?.contactEmail ?? undefined} />
        <Field label="Contact phone" name="contactPhone" type="tel" defaultValue={practitioner?.contactPhone ?? undefined} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          label="Verification level"
          name="verificationLevel"
          defaultValue={practitioner?.verificationLevel}
          options={[
            ["LISTED", "Level 1 — Listed"],
            ["VERIFIED", "Level 2 — Verified"],
            ["MEMBER", "Level 3 — Collective Member"],
            ["FEATURED", "Level 4 — Featured Provider"],
          ]}
        />
        <SelectField
          label="Membership tier"
          name="membershipTier"
          defaultValue={practitioner?.membershipTier}
          options={[
            ["NONE", "None"],
            ["PROVIDER", "Collective Provider"],
            ["PROFESSIONAL", "Collective Professional"],
            ["FOUNDING", "Founding Collective Member"],
          ]}
        />
        <SelectField
          label="Billing period"
          name="membershipPeriod"
          defaultValue={practitioner?.membershipPeriod ?? ""}
          options={[
            ["", "—"],
            ["MONTHLY", "Monthly"],
            ["ANNUAL", "Annual"],
          ]}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <Checkbox label="Published (visible in directory)" name="published" defaultChecked={practitioner?.published ?? false} />
        <Checkbox label="Currently accepting clients" name="accepting" defaultChecked={practitioner?.accepting ?? true} />
        <Checkbox label="Membership active" name="membershipActive" defaultChecked={practitioner?.membershipActive ?? false} />
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-rule pt-6">
        <SubmitButton>{practitioner ? "Save changes" : "Create practitioner"}</SubmitButton>
      </div>
    </form>
    {practitioner && (
      <form action={deletePractitioner.bind(null, practitioner.id)} className="mt-4">
        <button type="submit" className="font-sans text-xs uppercase tracking-widest text-rose">
          Delete listing
        </button>
      </form>
    )}
    </>
  );
}

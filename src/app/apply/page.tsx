import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { Eyebrow, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply to be listed as a provider in The Wellness Collective directory — free, always.",
};

interface InviteData {
  name?: string;
  email?: string;
  phone?: string;
  town?: string;
  modality?: string;
  preFilled?: boolean;
}

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string; error?: string; tier?: string; checkout?: string; invite?: string; data?: string }>;
}) {
  const sp = await searchParams;
  const submitted = sp.submitted === "1";

  let inviteData: InviteData = {};
  if (sp.data) {
    try {
      const decoded = Buffer.from(sp.data, "base64url").toString("utf-8");
      inviteData = JSON.parse(decoded);
    } catch (e) {
      // Ignore invalid invite data
    }
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_70%_10%,#3a2954_0%,#1f1830_58%,#0c0815_100%)] pb-16 text-cream">
        <div className="pointer-events-none absolute -right-24 -top-16">
          <FlowerOfLife size={480} stroke="#c4978a" opacity={0.15} />
        </div>
        <Nav dark />
        <div className="relative max-w-2xl px-6 pt-8 md:px-14">
          <Eyebrow>Provider application</Eyebrow>
          <h1 className="mt-6 font-display text-6xl leading-[0.98] tracking-tight md:text-7xl">
            Apply to the <em className="not-italic text-rose">Collective.</em>
          </h1>
          <p className="mt-6 max-w-lg font-serif text-xl leading-relaxed text-cream/78">
            A basic directory listing is free — always. Tell us about your practice and we'll review
            it against our verification standards.
          </p>
        </div>
      </section>

      <section className="bg-paper px-6 py-16 md:px-14">
        <div className="mx-auto max-w-2xl">
          {submitted ? (
            <div className="rounded-card border border-sage/40 bg-cream p-10 text-center">
              <Eyebrow tone="sage">Application received</Eyebrow>
              <h2 className="mt-4 font-display text-3xl text-ink">Thank you — we've got it.</h2>
              <p className="mt-3 font-serif text-lg leading-relaxed text-inkSoft">
                We review applications on a rolling basis. You'll hear from us by email once your
                listing has been reviewed.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-4">
                <ButtonLink href="/find-wellness" variant="outlineDark">Browse the directory</ButtonLink>
                <ButtonLink href="/for-providers">See provider benefits</ButtonLink>
              </div>
            </div>
          ) : (
            <>
              {sp.checkout === "unavailable" && (
                <div className="mb-6 rounded-xl border border-rose/40 bg-rose/10 px-5 py-4 font-serif text-[15px] text-ink">
                  Online payment for the <strong className="font-semibold">{sp.tier ?? "membership"}</strong>{" "}
                  tier isn't live quite yet — submit your application below and we'll follow up directly
                  to get your membership set up.
                </div>
              )}
              {sp.error === "1" && (
                <div className="mb-6 rounded-xl border border-rose/40 bg-rose/10 px-5 py-4 font-serif text-[15px] text-ink">
                  A few fields need a second look — please check the form and try again.
                </div>
              )}

              <form action="/api/apply" method="POST" className="grid gap-6">
                {inviteData.preFilled && (
                  <div className="rounded-xl border border-sage/40 bg-sage/10 px-4 py-3 font-serif text-sm text-ink">
                    ✨ Welcome! Your info is pre-filled below. Just review and complete the rest.
                  </div>
                )}
                <Field label="Full name" name="name" required defaultValue={inviteData.name} />
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Email" name="email" type="email" required defaultValue={inviteData.email} />
                  <Field label="Phone" name="phone" type="tel" defaultValue={inviteData.phone} />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Primary modality" name="primaryModality" placeholder="e.g. Doula, Reiki, Massage" required defaultValue={inviteData.modality} />
                  <Field label="Town" name="town" placeholder="e.g. Anchorage" required defaultValue={inviteData.town} />
                </div>

                <Field
                  label="All modalities"
                  name="modalities"
                  placeholder="Comma-separated — e.g. Doula, Postpartum Care, Lactation Support"
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <SelectField
                    label="Format"
                    name="format"
                    options={[
                      ["IN_PERSON", "In-person"],
                      ["VIRTUAL", "Virtual"],
                      ["BOTH", "In-person & virtual"],
                    ]}
                  />
                  <Field label="Years practicing" name="yearsPracticing" type="number" min={0} max={80} />
                </div>

                <TextAreaField
                  label="Training, certifications & licenses"
                  name="credentials"
                  required
                  placeholder="List what you'd like reviewed for verification — trainings, certifications, professional licenses."
                />

                <label className="flex items-center gap-3 font-sans text-sm text-ink">
                  <input type="checkbox" name="insurance" className="h-4 w-4 accent-plum" />
                  I carry liability insurance for my practice
                </label>

                <TextAreaField
                  label="Business information"
                  name="businessInfo"
                  placeholder="Business name, entity type, or Alaska business license number, if applicable."
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Website" name="website" type="url" placeholder="https://" />
                  <Field label="Instagram" name="instagram" placeholder="@yourhandle" />
                </div>

                <TextAreaField
                  label="About your practice"
                  name="bio"
                  required
                  placeholder="What you offer, who you work with, and what someone should know before booking with you."
                />

                <TextAreaField label="Anything else?" name="message" placeholder="Optional — questions, notes for our team." />

                <label className="flex items-start gap-3 font-sans text-sm text-ink">
                  <input type="checkbox" name="agreedToCodeOfConduct" required className="mt-0.5 h-4 w-4 accent-plum" />
                  <span>
                    I agree to the Collective's code of conduct and confirm the information above is
                    accurate to the best of my knowledge.
                  </span>
                </label>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-pill bg-deep py-4 font-sans text-xs font-semibold uppercase tracking-widest text-cream md:w-fit md:px-10"
                >
                  Submit application →
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  min,
  max,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="font-sans text-[11px] uppercase tracking-widest text-inkSoft">
        {label}
        {required && <span className="text-rose"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-xl border border-rule bg-cream px-4 py-3 font-serif text-lg outline-none focus:border-plum"
      />
    </label>
  );
}

function TextAreaField({
  label,
  name,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="font-sans text-[11px] uppercase tracking-widest text-inkSoft">
        {label}
        {required && <span className="text-rose"> *</span>}
      </span>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={4}
        className="mt-2 w-full resize-y rounded-xl border border-rule bg-cream px-4 py-3 font-serif text-lg outline-none focus:border-plum"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: [string, string][];
}) {
  return (
    <label className="block">
      <span className="font-sans text-[11px] uppercase tracking-widest text-inkSoft">{label}</span>
      <select
        name={name}
        className="mt-2 w-full rounded-xl border border-rule bg-cream px-4 py-3 font-serif text-lg outline-none focus:border-plum"
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}

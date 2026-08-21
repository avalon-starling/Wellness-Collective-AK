"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "./db";
import { requireAdmin } from "./auth";
import { slugify, parseList } from "./utils";
import type { Format, VerificationLevel, MembershipTier, BillingPeriod, EventAccess } from "@prisma/client";

async function uniqueSlug(base: string, table: "practitioner" | "event" | "resource", excludeId?: string) {
  const baseSlug = slugify(base) || "listing";
  let slug = baseSlug;
  let n = 1;
  // Small tables (single-operator directory) — a loop here is simpler and
  // plenty fast; no need for a fancier collision strategy.
  while (true) {
    const existing =
      table === "practitioner"
        ? await db.practitioner.findUnique({ where: { slug } })
        : table === "event"
        ? await db.event.findUnique({ where: { slug } })
        : await db.resource.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    n += 1;
    slug = `${baseSlug}-${n}`;
  }
}

function str(form: FormData, key: string): string | null {
  const v = form.get(key);
  return v ? String(v).trim() || null : null;
}

// ─── Practitioners ───

export async function savePractitioner(id: string | null, form: FormData) {
  await requireAdmin();

  const name = String(form.get("name") || "").trim();
  if (!name) throw new Error("Name is required");

  const slugInput = str(form, "slug") || name;
  const slug = await uniqueSlug(slugInput, "practitioner", id ?? undefined);

  const data = {
    slug,
    published: form.get("published") === "on",
    name,
    pronouns: str(form, "pronouns"),
    primaryModality: String(form.get("primaryModality") || ""),
    modalities: parseList(form.get("modalities")),
    specialties: parseList(form.get("specialties")),
    town: String(form.get("town") || ""),
    region: str(form, "region"),
    format: (form.get("format") as Format) || "IN_PERSON",
    bio: String(form.get("bio") || ""),
    credentials: parseList(form.get("credentials")),
    yearsPracticing: form.get("yearsPracticing") ? Number(form.get("yearsPracticing")) : null,
    languages: parseList(form.get("languages")),
    rateLabel: str(form, "rateLabel"),
    priceRange: str(form, "priceRange"),
    photoUrl: str(form, "photoUrl"),
    website: str(form, "website"),
    instagram: str(form, "instagram"),
    bookingUrl: str(form, "bookingUrl"),
    contactEmail: str(form, "contactEmail"),
    contactPhone: str(form, "contactPhone"),
    verificationLevel: (form.get("verificationLevel") as VerificationLevel) || "LISTED",
    membershipTier: (form.get("membershipTier") as MembershipTier) || "NONE",
    membershipPeriod: (form.get("membershipPeriod") as BillingPeriod) || null,
    membershipActive: form.get("membershipActive") === "on",
    accepting: form.get("accepting") === "on",
  };

  if (id) {
    await db.practitioner.update({ where: { id }, data });
  } else {
    await db.practitioner.create({ data });
  }

  revalidatePath("/find-wellness");
  revalidatePath("/admin/practitioners");
  redirect("/admin/practitioners");
}

export async function deletePractitioner(id: string) {
  await requireAdmin();
  await db.practitioner.delete({ where: { id } });
  revalidatePath("/find-wellness");
  revalidatePath("/admin/practitioners");
  redirect("/admin/practitioners");
}

// ─── Applications ───

export async function approveApplication(applicationId: string) {
  await requireAdmin();
  const app = await db.application.findUniqueOrThrow({ where: { id: applicationId } });

  const slug = await uniqueSlug(app.name, "practitioner");

  await db.$transaction([
    db.practitioner.create({
      data: {
        slug,
        published: true,
        name: app.name,
        primaryModality: app.primaryModality,
        modalities: app.modalities.length ? app.modalities : [app.primaryModality],
        town: app.town,
        format: app.format,
        bio: app.bio,
        credentials: app.credentials
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        yearsPracticing: app.yearsPracticing,
        website: app.website,
        instagram: app.instagram,
        contactEmail: app.email,
        contactPhone: app.phone,
        verificationLevel: "VERIFIED",
        applicationId: app.id,
      },
    }),
    db.application.update({
      where: { id: applicationId },
      data: { status: "APPROVED", reviewedAt: new Date() },
    }),
  ]);

  revalidatePath("/find-wellness");
  revalidatePath("/admin/applications");
  revalidatePath("/admin/practitioners");
  redirect("/admin/applications");
}

export async function rejectApplication(applicationId: string, form: FormData) {
  await requireAdmin();
  const notes = str(form, "notes");
  await db.application.update({
    where: { id: applicationId },
    data: { status: "REJECTED", reviewedAt: new Date(), reviewNotes: notes },
  });
  revalidatePath("/admin/applications");
  redirect("/admin/applications");
}

// ─── Events ───

export async function saveEvent(id: string | null, form: FormData) {
  await requireAdmin();

  const title = String(form.get("title") || "").trim();
  if (!title) throw new Error("Title is required");

  const slug = await uniqueSlug(str(form, "slug") || title, "event", id ?? undefined);
  const startsAt = new Date(String(form.get("startsAt")));
  const endsAtRaw = str(form, "endsAt");

  const data = {
    slug,
    published: form.get("published") === "on",
    title,
    description: String(form.get("description") || ""),
    modality: str(form, "modality"),
    host: str(form, "host"),
    startsAt,
    endsAt: endsAtRaw ? new Date(endsAtRaw) : null,
    location: String(form.get("location") || ""),
    locationType: (form.get("locationType") as Format) || "IN_PERSON",
    town: str(form, "town"),
    access: (form.get("access") as EventAccess) || "OPEN",
    price: str(form, "price"),
    capacity: form.get("capacity") ? Number(form.get("capacity")) : null,
    isFlagship: form.get("isFlagship") === "on",
    imageUrl: str(form, "imageUrl"),
  };

  if (id) {
    await db.event.update({ where: { id }, data });
  } else {
    await db.event.create({ data });
  }

  revalidatePath("/events");
  revalidatePath("/wellness-weekend");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  await requireAdmin();
  await db.event.delete({ where: { id } });
  revalidatePath("/events");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

// ─── Resources ───

export async function saveResource(id: string | null, form: FormData) {
  await requireAdmin();

  const title = String(form.get("title") || "").trim();
  if (!title) throw new Error("Title is required");

  const slug = await uniqueSlug(str(form, "slug") || title, "resource", id ?? undefined);
  const published = form.get("published") === "on";

  const existing = id ? await db.resource.findUnique({ where: { id } }) : null;

  const data = {
    slug,
    published,
    title,
    category: String(form.get("category") || "Guide"),
    excerpt: String(form.get("excerpt") || ""),
    content: String(form.get("content") || ""),
    coverImageUrl: str(form, "coverImageUrl"),
    author: str(form, "author"),
    publishedAt: published ? existing?.publishedAt ?? new Date() : existing?.publishedAt ?? null,
  };

  if (id) {
    await db.resource.update({ where: { id }, data });
  } else {
    await db.resource.create({ data });
  }

  revalidatePath("/resources");
  revalidatePath("/admin/resources");
  redirect("/admin/resources");
}

export async function deleteResource(id: string) {
  await requireAdmin();
  await db.resource.delete({ where: { id } });
  revalidatePath("/resources");
  revalidatePath("/admin/resources");
  redirect("/admin/resources");
}

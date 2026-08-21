import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { applicationSchema } from "@/lib/validation";

function splitList(value: FormDataEntryValue | null): string[] {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function POST(req: NextRequest) {
  const form = await req.formData();

  const parsed = applicationSchema.safeParse({
    name: form.get("name"),
    email: form.get("email"),
    phone: form.get("phone"),
    primaryModality: form.get("primaryModality"),
    modalities: splitList(form.get("modalities")),
    town: form.get("town"),
    format: form.get("format") || "IN_PERSON",
    yearsPracticing: form.get("yearsPracticing") || undefined,
    credentials: form.get("credentials"),
    insurance: form.get("insurance") === "on",
    businessInfo: form.get("businessInfo"),
    website: form.get("website"),
    instagram: form.get("instagram"),
    bio: form.get("bio"),
    message: form.get("message"),
    agreedToCodeOfConduct: form.get("agreedToCodeOfConduct") === "on",
  });

  if (!parsed.success) {
    const url = new URL("/apply", req.url);
    url.searchParams.set("error", "1");
    return NextResponse.redirect(url);
  }

  const data = parsed.data;

  await db.application.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      primaryModality: data.primaryModality,
      modalities: data.modalities,
      town: data.town,
      format: data.format,
      yearsPracticing: data.yearsPracticing ?? null,
      credentials: data.credentials,
      insurance: data.insurance,
      businessInfo: data.businessInfo || null,
      website: data.website || null,
      instagram: data.instagram || null,
      bio: data.bio,
      message: data.message || null,
      agreedToCodeOfConduct: data.agreedToCodeOfConduct,
    },
  });

  const url = new URL("/apply", req.url);
  url.searchParams.set("submitted", "1");
  return NextResponse.redirect(url);
}

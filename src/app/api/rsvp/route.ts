import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rsvpSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const parsed = rsvpSchema.safeParse({
    eventId: form.get("eventId"),
    name: form.get("name"),
    email: form.get("email"),
    notes: form.get("notes"),
  });

  const redirectTo = String(form.get("redirectTo") || "/events");

  if (!parsed.success) {
    const url = new URL(redirectTo, req.url);
    url.searchParams.set("rsvp", "error");
    return NextResponse.redirect(url);
  }

  const { eventId, name, email, notes } = parsed.data;

  const event = await db.event.findUnique({ where: { id: eventId } });
  if (!event) {
    const url = new URL(redirectTo, req.url);
    url.searchParams.set("rsvp", "error");
    return NextResponse.redirect(url);
  }

  await db.eventRSVP.create({
    data: { eventId, name, email, notes: notes || null },
  });

  const url = new URL(redirectTo, req.url);
  url.searchParams.set("rsvp", "success");
  return NextResponse.redirect(url);
}

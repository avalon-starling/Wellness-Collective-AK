import { getSession } from "@/lib/member-auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const updated = await db.practitioner.update({
      where: { id: session.practitionerId },
      data: {
        name: data.name,
        pronouns: data.pronouns || null,
        primaryModality: data.primaryModality,
        modalities: data.modalities || [],
        specialties: data.specialties || [],
        bio: data.bio,
        credentials: data.credentials || [],
        yearsPracticing: data.yearsPracticing || null,
        languages: data.languages || [],
        rateLabel: data.rateLabel || null,
        website: data.website || null,
        instagram: data.instagram || null,
        bookingUrl: data.bookingUrl || null,
        contactEmail: data.contactEmail || null,
        contactPhone: data.contactPhone || null,
        photoUrl: data.photoUrl || null,
        town: data.town,
        format: data.format,
        accepting: data.accepting,
        published: data.published,
      },
    });

    return Response.json({
      success: true,
      practitioner: {
        id: updated.id,
        name: updated.name,
        slug: updated.slug,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update profile";
    return Response.json({ error: message }, { status: 500 });
  }
}

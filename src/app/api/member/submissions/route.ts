import { getSession } from "@/lib/member-auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content, imageUrl, submittedFor } = await request.json();

    if (!title || !content || !submittedFor) {
      return Response.json(
        { error: "Title, content, and submission type are required" },
        { status: 400 }
      );
    }

    const submission = await db.marketingSubmission.create({
      data: {
        practitionerId: session.practitionerId,
        title,
        content,
        imageUrl: imageUrl || null,
        submittedFor,
        status: "PENDING",
      },
    });

    return Response.json({
      success: true,
      submission: {
        id: submission.id,
        title: submission.title,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to submit";
    return Response.json({ error: message }, { status: 500 });
  }
}

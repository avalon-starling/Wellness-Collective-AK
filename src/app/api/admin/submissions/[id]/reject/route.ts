import { db } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { notes } = await request.json();

    const submission = await db.marketingSubmission.update({
      where: { id },
      data: {
        status: "REJECTED",
        reviewNotes: notes || null,
        reviewedAt: new Date(),
      },
    });

    return Response.json({
      success: true,
      submission,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to reject submission";
    return Response.json({ error: message }, { status: 500 });
  }
}

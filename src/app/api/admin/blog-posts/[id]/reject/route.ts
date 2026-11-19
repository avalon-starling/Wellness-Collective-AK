import { db } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { notes } = await request.json();

    const post = await db.blogPost.update({
      where: { id },
      data: {
        status: "REJECTED",
      },
    });

    return Response.json({
      success: true,
      post,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to reject article";
    return Response.json({ error: message }, { status: 500 });
  }
}

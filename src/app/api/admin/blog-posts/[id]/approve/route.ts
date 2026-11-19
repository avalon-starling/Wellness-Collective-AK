import { db } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { notes, isMonthlySpotlight } = await request.json();

    const post = await db.blogPost.update({
      where: { id },
      data: {
        status: "APPROVED",
        publishedAt: new Date(),
        isMonthlySpotlight: isMonthlySpotlight || false,
      },
    });

    return Response.json({
      success: true,
      post,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to publish article";
    return Response.json({ error: message }, { status: 500 });
  }
}

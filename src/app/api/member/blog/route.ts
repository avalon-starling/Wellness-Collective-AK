import { getSession } from "@/lib/member-auth";
import { db } from "@/lib/db";
import crypto from "crypto";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, excerpt, content, coverImageUrl } = await request.json();

    if (!title || !excerpt || !content) {
      return Response.json(
        { error: "Title, excerpt, and content are required" },
        { status: 400 }
      );
    }

    // Generate unique slug
    let slug = generateSlug(title);
    let attempt = 0;
    let finalSlug = slug;

    while (attempt < 100) {
      const existing = await db.blogPost.findUnique({ where: { slug: finalSlug } });
      if (!existing) break;
      attempt++;
      finalSlug = `${slug}-${attempt}`;
    }

    const post = await db.blogPost.create({
      data: {
        slug: finalSlug,
        title,
        excerpt,
        content,
        coverImageUrl: coverImageUrl || null,
        authorId: session.practitionerId,
        status: "PENDING",
      },
    });

    return Response.json({
      success: true,
      post: {
        id: post.id,
        title: post.title,
        slug: post.slug,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to submit article";
    return Response.json({ error: message }, { status: 500 });
  }
}

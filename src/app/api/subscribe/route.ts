import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { subscribeSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  await db.subscriber.upsert({
    where: { email: parsed.data.email },
    update: {},
    create: { email: parsed.data.email, source: parsed.data.source || null },
  });

  return NextResponse.json({ ok: true });
}

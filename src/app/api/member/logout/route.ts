import { destroySession } from "@/lib/member-auth";
import { redirect } from "next/navigation";

export async function POST() {
  await destroySession();
  redirect("/member/login");
}

import { NextRequest, NextResponse } from "next/server";
import { createMembershipCheckoutUrl, type BillingPeriod, type MembershipPlan } from "@/lib/square";

const PLANS: MembershipPlan[] = ["provider", "professional", "founding"];
const PERIODS: BillingPeriod[] = ["monthly", "annual"];

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const plan = String(form.get("plan") ?? "");
  const period = String(form.get("period") ?? "");
  const email = form.get("email") ? String(form.get("email")) : undefined;

  if (!PLANS.includes(plan as MembershipPlan) || !PERIODS.includes(period as BillingPeriod)) {
    return NextResponse.redirect(new URL("/join-the-collective", req.url));
  }

  const checkoutUrl = await createMembershipCheckoutUrl(plan as MembershipPlan, period as BillingPeriod, {
    email,
  });

  if (checkoutUrl) {
    return NextResponse.redirect(checkoutUrl);
  }

  // Square isn't configured for this plan yet — fall back to the apply flow
  // so a "Join" click never dead-ends.
  const fallback = new URL("/apply", req.url);
  fallback.searchParams.set("tier", plan);
  fallback.searchParams.set("period", period);
  fallback.searchParams.set("checkout", "unavailable");
  return NextResponse.redirect(fallback);
}

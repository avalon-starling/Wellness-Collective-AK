import "server-only";
import { randomUUID } from "crypto";

// Membership checkout via Square's hosted Payment Links, called directly
// against Square's REST API (no SDK dependency — one call, well-documented
// wire format, nothing to fight version drift on).
//
// Each plan/period combo maps to a Subscription Plan Variation you create in
// the Square Dashboard (Items & Orders → Subscriptions) once a real Square
// account is connected. Until the matching env var is set, createMembership-
// CheckoutUrl() returns null and the UI falls back to a "contact us to join"
// flow instead of a broken payment button — nothing here requires Square to
// be live for the rest of the site to work.
//
//   SQUARE_ACCESS_TOKEN
//   SQUARE_LOCATION_ID
//   SQUARE_ENVIRONMENT                 "sandbox" | "production" (default: sandbox)
//   SQUARE_API_VERSION                 optional, defaults to a pinned date
//   SQUARE_PLAN_PROVIDER_MONTHLY       Subscription Plan Variation ID
//   SQUARE_PLAN_PROVIDER_ANNUAL
//   SQUARE_PLAN_PROFESSIONAL_MONTHLY
//   SQUARE_PLAN_PROFESSIONAL_ANNUAL
//   SQUARE_PLAN_FOUNDING_ANNUAL

export type MembershipPlan = "provider" | "professional" | "founding";
export type BillingPeriod = "monthly" | "annual";

const PLAN_ENV_VARS: Record<string, string | undefined> = {
  "provider:monthly": process.env.SQUARE_PLAN_PROVIDER_MONTHLY,
  "provider:annual": process.env.SQUARE_PLAN_PROVIDER_ANNUAL,
  "professional:monthly": process.env.SQUARE_PLAN_PROFESSIONAL_MONTHLY,
  "professional:annual": process.env.SQUARE_PLAN_PROFESSIONAL_ANNUAL,
  "founding:annual": process.env.SQUARE_PLAN_FOUNDING_ANNUAL,
};

// Mirrors the pricing on /join-the-collective. The Square subscription plan
// variation is the source of truth for what the buyer is actually billed —
// this amount is only used as the required `price_money` on the initial
// phase when generating the checkout link, so keep it in sync with Square.
const MEMBERSHIP_PRICE_CENTS: Record<string, number> = {
  "provider:monthly": 2900,
  "provider:annual": 29000,
  "professional:monthly": 5900,
  "professional:annual": 59000,
  "founding:annual": 19900,
};

function isSquareConfigured() {
  return Boolean(process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID);
}

function baseUrl() {
  return process.env.SQUARE_ENVIRONMENT === "production"
    ? "https://connect.squareup.com"
    : "https://connect.squareupsandbox.com";
}

export function planIsConfigured(plan: MembershipPlan, period: BillingPeriod) {
  return isSquareConfigured() && Boolean(PLAN_ENV_VARS[`${plan}:${period}`]);
}

/**
 * Creates a Square-hosted payment link for a membership plan and returns its
 * URL, or null if Square / that specific plan isn't configured yet.
 */
export async function createMembershipCheckoutUrl(
  plan: MembershipPlan,
  period: BillingPeriod,
  opts: { email?: string } = {}
): Promise<string | null> {
  const planVariationId = PLAN_ENV_VARS[`${plan}:${period}`];
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  const priceCents = MEMBERSHIP_PRICE_CENTS[`${plan}:${period}`];

  if (!accessToken || !locationId || !planVariationId || !priceCents) return null;

  try {
    const res = await fetch(`${baseUrl()}/v2/online-checkout/payment-links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Square-Version": process.env.SQUARE_API_VERSION || "2025-01-23",
      },
      body: JSON.stringify({
        idempotency_key: randomUUID(),
        subscription_plan_id: planVariationId,
        price_money: { amount: priceCents, currency: "USD" },
        location_id: locationId,
        checkout_options: {
          redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/join-the-collective/welcome`,
        },
        pre_populated_data: opts.email ? { buyer_email: opts.email } : undefined,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[square] payment link creation failed", res.status, await res.text());
      return null;
    }

    const data = await res.json();
    return data?.payment_link?.url ?? null;
  } catch (err) {
    console.error("[square] payment link creation errored", err);
    return null;
  }
}

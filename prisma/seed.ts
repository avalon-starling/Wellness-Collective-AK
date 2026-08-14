import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Launch-day seed: no fabricated practitioners, events, or testimonials —
// this is a real business and the directory should only ever show real
// listings. What we *can* seed honestly is original educational content for
// the Resources section, written for the Collective itself.

const resources = [
  {
    slug: "how-verification-works",
    title: "How Provider Verification Works",
    category: "Education",
    excerpt:
      "The Wellness Collective doesn't certify or license anyone — here's exactly what each verification level means.",
    author: "The Wellness Collective",
    content: `The Wellness Collective does not certify or license practitioners. We help the public discover providers by making their professional background, training, certifications, credentials, and areas of practice easier to understand.

To make that clear at a glance, every profile in the directory carries one of four verification levels.

## Level 1 — Listed

A basic directory profile. The provider has submitted their information, but the Collective has not yet reviewed it.

## Level 2 — Verified

The Collective has reviewed the provider's submitted professional information, including:

- Training and certifications
- Professional credentials
- Business information
- Relevant licenses, where applicable
- Insurance, where appropriate
- Code of conduct agreement

## Level 3 — Collective Member

A Verified provider with an active, paid Collective membership.

## Level 4 — Featured Provider

A Collective Member who meets our criteria for enhanced visibility across the directory and events.

## Why this matters

A badge on a profile should mean something specific, not just "trust us." Verification tells you exactly how far our review has gone — you still make the final call on who's right for you.`,
    published: true,
  },
  {
    slug: "choosing-a-wellness-practitioner-in-alaska",
    title: "Choosing a Wellness Practitioner in Alaska",
    category: "Guide",
    excerpt: "A few questions worth asking before you book your first session with any provider.",
    author: "The Wellness Collective",
    content: `Alaska is a big state with a small, spread-out wellness community. Finding the right practitioner — someone whose training matches what you need, in a format that works for you — takes a bit more than a search engine.

## Start with what you actually need

Modalities can overlap in confusing ways. If you're not sure whether you want a somatic therapist, a bodyworker, or a breathwork facilitator, it's worth reading a few profiles side by side before reaching out.

## Check the credentials, not just the title

Look for what specific training, certification, or license a provider holds — not just their job title. Our [verification levels](/verification) exist to make this easier to see at a glance.

## Ask about format and cost up front

Many Alaska practitioners offer both in-person and virtual sessions, and most have some flexibility on rate. It's normal to ask about sliding-scale availability before your first session.

## Trust your first conversation

A good fit usually shows up in the first exchange — how a provider answers your questions, not just what's on their profile. If something feels off, it's fine to look further.

Ready to look? [Browse the directory](/find-wellness).`,
    published: true,
  },
];

async function main() {
  for (const r of resources) {
    await db.resource.upsert({
      where: { slug: r.slug },
      update: {},
      create: { ...r, publishedAt: new Date() },
    });
  }
  console.log(`Seeded ${resources.length} resource(s). No practitioners or events were seeded — add real ones via /admin.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

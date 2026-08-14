// Central place for the Collective's business copy — pricing, verification
// levels, nav structure. Editing here changes it everywhere it's used.

export const SITE = {
  name: "The Wellness Collective",
  shortName: "The Collective",
  region: "Alaska",
  established: "2026",
  tagline: "Alaska's community and directory of wellness practitioners.",
  contactEmail: "avalon@thesoundspace.us",
};

export const NAV_LINKS = [
  { href: "/find-wellness", label: "Find Wellness" },
  { href: "/join-the-collective", label: "Join the Collective" },
  { href: "/events", label: "Events" },
  { href: "/for-providers", label: "For Providers" },
  { href: "/about", label: "About" },
  { href: "/verification", label: "Verification" },
  { href: "/resources", label: "Resources" },
] as const;

export const FOOTER_LINKS = [
  { href: "/wellness-weekend", label: "Wellness Weekend" },
  { href: "/apply", label: "Apply as a Provider" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
] as const;

export type MembershipTierId = "public" | "provider" | "professional" | "founding";

export interface MembershipTier {
  id: MembershipTierId;
  name: string;
  pitch: string;
  forWho: string;
  monthlyCents: number | null;
  annualCents: number | null;
  annualSavingsLabel?: string;
  features: string[];
  cta: string;
  featured?: boolean;
  limited?: boolean;
}

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "public",
    name: "Public",
    pitch: "Discover wellness",
    forWho: "Anyone searching for a practitioner",
    monthlyCents: 0,
    annualCents: 0,
    features: [
      "Full directory access",
      "Search by location, modality & specialty",
      "Read verified provider profiles",
      "Contact providers directly",
      "See community events",
    ],
    cta: "Browse the directory",
  },
  {
    id: "provider",
    name: "Collective Provider",
    pitch: "The core membership",
    forWho: "Practitioners building their Alaska practice",
    monthlyCents: 2900,
    annualCents: 29000,
    annualSavingsLabel: "save $58/yr",
    features: [
      "Verified directory profile",
      "Searchable listing",
      "Events listing",
      "Collective provider community",
      "Provider networking",
      "Member-only opportunities",
      "Discounts on Collective events",
      "Early access to vendor opportunities",
      "Collaboration opportunities",
    ],
    cta: "Join as a Provider",
    featured: true,
  },
  {
    id: "professional",
    name: "Collective Professional",
    pitch: "For established practices",
    forWho: "Providers who want maximum visibility",
    monthlyCents: 5900,
    annualCents: 59000,
    annualSavingsLabel: "save $118/yr",
    features: [
      "Everything in Collective Provider",
      "Enhanced profile",
      "Featured placement",
      "More photos & media",
      "Featured event opportunities",
      "Priority consideration for Collective programming",
      "Promotional opportunities",
      "Member spotlight opportunities",
      "Additional business resources",
    ],
    cta: "Join as Professional",
  },
  {
    id: "founding",
    name: "Founding Collective Member",
    pitch: "Limited launch offer",
    forWho: "The first providers to join the Collective",
    monthlyCents: null,
    annualCents: 19900,
    features: [
      "Everything in Collective Provider",
      "Rate locked at $199/yr for as long as you stay a member",
      "Limited to the first 50 founding providers",
      "Founding Member badge on your profile",
      "Name recognition as a founding provider",
    ],
    cta: "Claim a founding spot",
    limited: true,
  },
];

export interface VerificationLevel {
  level: number;
  id: string;
  name: string;
  description: string;
  criteria?: string[];
}

export const VERIFICATION_LEVELS: VerificationLevel[] = [
  {
    level: 1,
    id: "listed",
    name: "Listed",
    description: "A basic directory profile. The provider has submitted their information, but the Collective has not yet reviewed it.",
  },
  {
    level: 2,
    id: "verified",
    name: "Verified",
    description: "The Collective has reviewed the provider's submitted professional information.",
    criteria: [
      "Training and certifications",
      "Professional credentials",
      "Business information",
      "Relevant licenses, where applicable",
      "Insurance, where appropriate",
      "Code of conduct agreement",
    ],
  },
  {
    level: 3,
    id: "member",
    name: "Collective Member",
    description: "A Verified provider with an active, paid Collective membership.",
  },
  {
    level: 4,
    id: "featured",
    name: "Featured Provider",
    description: "A Collective Member who meets our criteria for enhanced visibility across the directory and events.",
  },
];

export const VERIFICATION_DISCLAIMER =
  "The Wellness Collective does not certify or license practitioners. We help the public discover providers by making their professional background, training, certifications, credentials, and areas of practice easier to understand.";

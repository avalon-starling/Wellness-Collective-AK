/**
 * Create partner invite links for faster signup
 *
 * Usage:
 *   npx tsx scripts/create-invite.ts --name "Sarah Johnson" --email "sarah@email.com"
 *   npx tsx scripts/create-invite.ts --name "Dr. James" --modality "Acupuncture" --town "Anchorage"
 *
 * Output: A link like /apply?invite=ABC123DEF456
 * Share this link with your partner — their info will be pre-filled!
 */

import crypto from "crypto";

interface InviteData {
  name?: string;
  email?: string;
  phone?: string;
  town?: string;
  modality?: string;
  preFilled?: boolean;
}

function generateInviteCode(): string {
  return crypto.randomBytes(8).toString("hex").toUpperCase();
}

function encodeInviteData(data: InviteData): string {
  const json = JSON.stringify(data);
  return Buffer.from(json).toString("base64url");
}

function createInviteLink(data: InviteData): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://wellnesscollectiveak.com";
  const code = generateInviteCode();
  const encoded = encodeInviteData(data);

  return `${base}/apply?invite=${code}&data=${encoded}`;
}

async function main() {
  const args = process.argv.slice(2);
  const data: InviteData = { preFilled: true };

  // Parse command-line arguments
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, "");
    const value = args[i + 1];

    if (key === "name") data.name = value;
    else if (key === "email") data.email = value;
    else if (key === "phone") data.phone = value;
    else if (key === "town") data.town = value;
    else if (key === "modality") data.modality = value;
  }

  if (!data.name) {
    console.log("\n📋 Create Partner Invite Links\n");
    console.log("Usage:");
    console.log("  npx tsx scripts/create-invite.ts --name 'Sarah Johnson' --email 'sarah@email.com'\n");
    console.log("Options:");
    console.log("  --name        Partner name (required)");
    console.log("  --email       Email address");
    console.log("  --phone       Phone number");
    console.log("  --town        Town/city");
    console.log("  --modality    Primary modality (e.g., 'Acupuncture')\n");
    console.log("Example:\n");
    console.log("  npx tsx scripts/create-invite.ts \\");
    console.log("    --name 'Dr. Sarah Johnson' \\");
    console.log("    --email 'sarah@example.com' \\");
    console.log("    --town 'Anchorage' \\");
    console.log("    --modality 'Acupuncture'\n");
    return;
  }

  const link = createInviteLink(data);

  console.log("\n✨ Partner Invite Link Created\n");
  console.log(`Partner: ${data.name}`);
  if (data.email) console.log(`Email:   ${data.email}`);
  if (data.town) console.log(`Town:    ${data.town}`);
  if (data.modality) console.log(`Modality: ${data.modality}`);
  console.log("\n📋 Share this link:\n");
  console.log(link);
  console.log("\n💡 When they click the link, their info will be pre-filled in the signup form.\n");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});

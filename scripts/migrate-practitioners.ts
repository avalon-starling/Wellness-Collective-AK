/**
 * Migration script to import practitioners from an external source
 * Supports multiple input formats: JSON, CSV, or direct data objects
 *
 * Usage:
 *   npx tsx scripts/migrate-practitioners.ts --file practitioners.json
 *   npx tsx scripts/migrate-practitioners.ts --file practitioners.csv
 *   npx tsx scripts/migrate-practitioners.ts --url https://api.example.com/practitioners
 */

import { PrismaClient, Format, VerificationLevel, MembershipTier } from "@prisma/client";
import fs from "fs";

const db = new PrismaClient();

interface RawPractitionerData {
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  instagram?: string;
  bookingUrl?: string;
  town: string;
  region?: string;
  primaryModality: string;
  modalities?: string[];
  specialties?: string[];
  bio?: string;
  credentials?: string | string[];
  yearsPracticing?: number;
  languages?: string[];
  format?: "IN_PERSON" | "VIRTUAL" | "BOTH";
  rateLabel?: string;
  priceRange?: string;
  photoUrl?: string;
  accepting?: boolean;
  verificationLevel?: "LISTED" | "VERIFIED" | "MEMBER" | "FEATURED";
  membershipTier?: "NONE" | "PROVIDER" | "PROFESSIONAL" | "FOUNDING";
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function normalizePractitionerData(
  raw: RawPractitionerData
): Promise<Omit<RawPractitionerData, "id"> & { slug: string }> {
  const slug = generateSlug(raw.name);

  // Check if practitioner already exists
  const existing = await db.practitioner.findUnique({ where: { slug } });
  if (existing) {
    console.warn(`Skipping ${raw.name} — already exists with slug "${slug}"`);
    return null as any;
  }

  return {
    ...raw,
    slug,
    credentials: Array.isArray(raw.credentials)
      ? raw.credentials
      : raw.credentials
      ? [raw.credentials]
      : [],
    modalities: raw.modalities || [],
    specialties: raw.specialties || [],
    languages: raw.languages || [],
    format: (raw.format as Format) || "IN_PERSON",
    verificationLevel:
      (raw.verificationLevel as VerificationLevel) || "LISTED",
    membershipTier: (raw.membershipTier as MembershipTier) || "NONE",
    accepting: raw.accepting ?? true,
  };
}

function parseCSV(content: string): RawPractitionerData[] {
  const lines = content.split("\n").filter((line) => line.trim());
  if (lines.length < 2) {
    throw new Error("CSV file must have a header row");
  }

  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const data: RawPractitionerData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i]
      .split(",")
      .map((v) => v.trim())
      .slice(0, header.length);
    const row: RawPractitionerData = {} as any;

    header.forEach((field, index) => {
      const value = values[index];
      if (!value) return;

      // Handle array fields
      if (
        ["modalities", "specialties", "credentials", "languages"].includes(
          field
        )
      ) {
        (row[field as any] as any) = value
          .split(";")
          .map((v) => v.trim())
          .filter(Boolean);
      } else if (["accepting", "insurance"].includes(field)) {
        (row[field as any] as any) = value.toLowerCase() === "true";
      } else if (field === "yearspracticing") {
        (row["yearsPracticing" as any] as any) = parseInt(value, 10);
      } else if (field === "primarymodality") {
        (row["primaryModality" as any] as any) = value;
      } else if (field === "bookingurl") {
        (row["bookingUrl" as any] as any) = value;
      } else if (field === "contactemail") {
        (row["contactEmail" as any] as any) = value;
      } else if (field === "contactphone") {
        (row["contactPhone" as any] as any) = value;
      } else if (field === "photourl") {
        (row["photoUrl" as any] as any) = value;
      } else {
        (row[field as any] as any) = value;
      }
    });

    if (row.name) {
      data.push(row);
    }
  }

  return data;
}

async function importFromFile(filePath: string): Promise<void> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, "utf-8");
  let data: RawPractitionerData[];

  if (filePath.endsWith(".json")) {
    data = JSON.parse(content);
    if (!Array.isArray(data)) {
      throw new Error("JSON file must contain an array of practitioners");
    }
  } else if (filePath.endsWith(".csv")) {
    data = parseCSV(content);
  } else {
    throw new Error("Unsupported file format. Use .json or .csv");
  }

  console.log(`\n📥 Importing ${data.length} practitioners...`);

  let imported = 0;
  let skipped = 0;

  for (const rawData of data) {
    try {
      const normalized = await normalizePractitionerData(rawData);
      if (!normalized) {
        skipped++;
        continue;
      }

      const created = await db.practitioner.create({
        data: {
          ...normalized,
          published: false, // Start unpublished for review
        },
      });

      console.log(
        `  ✓ ${created.name} (${created.primaryModality}) — ${created.town}`
      );
      imported++;
    } catch (error) {
      console.error(`  ✗ Error importing ${rawData.name}:`, error);
    }
  }

  console.log(
    `\n✅ Import complete: ${imported} created, ${skipped} skipped\n`
  );
  console.log(
    "Next: Review and publish practitioners in /admin/practitioners"
  );
}

async function main() {
  const args = process.argv.slice(2);
  const fileIndex = args.indexOf("--file");
  const urlIndex = args.indexOf("--url");

  try {
    if (fileIndex !== -1 && args[fileIndex + 1]) {
      const filePath = args[fileIndex + 1];
      await importFromFile(filePath);
    } else if (urlIndex !== -1 && args[urlIndex + 1]) {
      // TODO: Implement URL-based import if you have an API endpoint
      console.error(
        "URL-based import not yet implemented. Please provide a file instead."
      );
      console.log("\nUsage:");
      console.log("  npx tsx scripts/migrate-practitioners.ts --file data.json");
      console.log("  npx tsx scripts/migrate-practitioners.ts --file data.csv");
    } else {
      console.log("\n📋 Practitioner Migration Script\n");
      console.log("Usage:");
      console.log(
        "  npx tsx scripts/migrate-practitioners.ts --file practitioners.json"
      );
      console.log(
        "  npx tsx scripts/migrate-practitioners.ts --file practitioners.csv"
      );
      console.log("\nJSON format:");
      console.log(
        JSON.stringify(
          {
            name: "Dr. Sarah Johnson",
            email: "sarah@example.com",
            town: "Anchorage",
            primaryModality: "Acupuncture",
            modalities: ["Traditional Chinese Medicine"],
            credentials: "Licensed Acupuncturist",
            bio: "15+ years of practice in classical acupuncture...",
            website: "https://sarah-acupuncture.com",
            format: "IN_PERSON",
            accepting: true,
          },
          null,
          2
        )
      );
      console.log("\nCSV format (header row required):");
      console.log(
        "name,email,town,primaryModality,modalities,credentials,bio,website,format,accepting"
      );
    }
  } finally {
    await db.$disconnect();
  }
}

main().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});

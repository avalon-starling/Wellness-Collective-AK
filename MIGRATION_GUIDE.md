# Wellness Collective — Data Migration Guide

This guide covers importing your existing practitioner directory and other data from your previous website into the new Wellness Collective platform.

## Overview

The migration process supports several input formats:

- **JSON** — Most flexible format for complete practitioner records
- **CSV** — Spreadsheet format with header row and delimited values
- **API** — Direct integration if your existing site has data endpoints

## Prerequisites

Before starting, ensure you have:

1. **Database Connection** — A real `DATABASE_URL` set in your environment
   ```bash
   # Verify connection:
   npm run db:studio
   ```

2. **Node.js Environment** — Can run migration scripts locally or in a deployment environment

3. **Data Export** — Your existing practitioner data in one of the supported formats

## JSON Format

The most straightforward format. Create a file `practitioners.json`:

```json
[
  {
    "name": "Dr. Sarah Johnson",
    "email": "sarah@example.com",
    "phone": "+1-907-555-1234",
    "town": "Anchorage",
    "region": "South-Central",
    "primaryModality": "Acupuncture",
    "modalities": ["Traditional Chinese Medicine", "Herbal Medicine"],
    "specialties": ["Women's Health", "Chronic Pain"],
    "credentials": ["Licensed Acupuncturist", "Dipl. Ac. (NCCAOM)", "Certificate in Chinese Herbal Medicine"],
    "yearsPracticing": 15,
    "languages": ["English", "Mandarin"],
    "bio": "15+ years of practice in classical acupuncture and herbal medicine. Specializing in women's health and chronic pain management.",
    "website": "https://sarah-acupuncture.com",
    "instagram": "@sarahacupuncture",
    "bookingUrl": "https://calendly.com/sarah-acupuncture",
    "rateLabel": "$120 / session · sliding scale available",
    "priceRange": "$$",
    "photoUrl": "https://example.com/sarah.jpg",
    "format": "IN_PERSON",
    "accepting": true,
    "verificationLevel": "LISTED",
    "membershipTier": "NONE"
  }
]
```

### Running JSON Migration

```bash
npx tsx scripts/migrate-practitioners.ts --file practitioners.json
```

## CSV Format

Create a spreadsheet with a header row. The migration script will infer column types.

**Required columns:**
- `name`
- `town`
- `primaryModality`

**Optional columns:**
- `email`, `phone`, `website`, `instagram`, `bookingUrl`
- `modalities` (semicolon-separated: "Massage; Energy Work")
- `specialties` (semicolon-separated)
- `credentials` (semicolon-separated)
- `languages` (semicolon-separated)
- `yearsPracticing` (integer)
- `bio`
- `rateLabel` (e.g., "$120 / session · sliding scale")
- `priceRange` ("$", "$$", or "$$$")
- `photoUrl`
- `format` ("IN_PERSON", "VIRTUAL", or "BOTH")
- `accepting` ("true" or "false")
- `region`

### CSV Example

```
name,email,town,primaryModality,modalities,credentials,bio,website,format,accepting
Dr. Sarah Johnson,sarah@example.com,Anchorage,"Acupuncture","Traditional Chinese Medicine;Herbal Medicine","Licensed Acupuncturist;Certificate in Chinese Herbal Medicine","15+ years of practice...",https://sarah-acupuncture.com,IN_PERSON,true
```

### Running CSV Migration

```bash
npx tsx scripts/migrate-practitioners.ts --file practitioners.csv
```

## Export from Existing Website

If your existing Wellness Collective site is built with specific technology, here's how to extract data:

### From WordPress

1. Export via **Tools → Export**
2. Look for custom fields containing practitioner data
3. Convert exported XML to JSON/CSV format

### From Wix

1. Contact Wix support for a database export
2. Or use Wix's API to fetch collection data
3. Transform the export to JSON format

### From a Custom Database

If you have direct database access:

```sql
-- Export practitioners as JSON
SELECT JSON_AGG(
  JSON_BUILD_OBJECT(
    'name', name,
    'email', email,
    'town', town,
    'primaryModality', modality,
    'bio', biography,
    'credentials', ARRAY[certification1, certification2],
    -- ... include other fields
  )
) FROM practitioners;
```

### From a REST API

If your site has an API:

```bash
# Fetch data
curl https://existing-site.com/api/practitioners > raw-data.json

# Then transform to the required schema (you may need a custom script)
npx tsx scripts/transform-api-data.ts --input raw-data.json --output practitioners.json
```

## Migration Steps

1. **Prepare Your Data**
   - Export from your existing site
   - Convert to JSON or CSV
   - Place file in the repository root

2. **Validate Format**
   ```bash
   # Check structure (run dry run first if available)
   npx tsx scripts/migrate-practitioners.ts --file data.json
   ```

3. **Run Migration**
   ```bash
   npx tsx scripts/migrate-practitioners.ts --file practitioners.json
   ```

4. **Verify in Admin**
   - Visit `/admin/practitioners`
   - Review imported practitioners
   - Set verification levels (default: LISTED)
   - Publish practitioners to make them searchable

## Important Notes

### Default Settings

After import, practitioners are created with:
- **Published**: `false` (unpublished for review)
- **Verification Level**: `LISTED` (basic directory profile)
- **Membership Tier**: `NONE` (no active membership)
- **Accepting**: `true` (default)

You'll need to:
1. Review credentials and set appropriate verification levels in admin
2. Publish practitioners one-by-one or in batch via admin dashboard
3. Set membership status if practitioners are paid members

### Slug Generation

Practitioner URLs are auto-generated from names using the slug algorithm:
- Lowercased: "Dr. Sarah Johnson" → "dr-sarah-johnson"
- Special characters removed
- Spaces converted to hyphens
- Duplicates prevented with numeric suffixes

If a practitioner with the same slug already exists, they will be skipped.

### Duplicate Detection

The migration script checks for duplicate slugs. If a practitioner with the same name already exists:
- The import is **skipped**
- No error is raised
- Check the console output for "skipped" count

To re-import over existing data, delete the practitioner from admin first.

## SEO Considerations

### URL Preservation

If your existing site has practitioner pages like:
```
/practitioners/dr-sarah-johnson
/providers/acupuncture/sarah-johnson
```

The new site uses: `/find-wellness/[slug]`

To preserve SEO authority:
1. Set up 301 redirects from old URLs to new ones
2. Update any external links or directories (Yelp, etc.)
3. Submit updated sitemap to Google Search Console

### Metadata Preservation

If your existing practitioners have custom meta descriptions or images:
1. Include those in the JSON/CSV export
2. Map them to the `bio` field or create a migration script variant
3. Update `photoUrl` to point to new image storage

### Schema.org Markup

The new site includes structured data for:
- Organization
- LocalBusiness (practitioners)
- Event
- NewsArticle (resources)

Ensure Google has re-indexed by:
1. Visiting Google Search Console
2. Submitting the new sitemap
3. Running the URL inspection tool on a few practitioner pages

## Post-Migration Tasks

1. **Review Practitioners**
   - Verify credentials
   - Check photos load correctly
   - Test booking links

2. **Set Verification Levels**
   - Move trusted practitioners to `VERIFIED`
   - Set `FEATURED` for premium members

3. **Activate Memberships**
   - If practitioners have active paid memberships, update their tier and active status
   - Note: Billing history not imported (subscription management should continue via Square)

4. **Publish**
   - Make practitioners visible in directory
   - Verify search functionality works

5. **Newsletter Setup**
   - Optionally import existing subscribers via CSV
   - Test newsletter signup on homepage

## Troubleshooting

### "File not found"

```
Error: File not found: practitioners.json
```

Ensure file is in the repository root or provide absolute path:
```bash
npx tsx scripts/migrate-practitioners.ts --file /full/path/to/practitioners.json
```

### "Array must have at least one item"

The JSON array is empty or the import format is wrong. Verify:
- File is valid JSON (check with `npx json-validate file.json`)
- Array has at least one practitioner object
- Required fields are present: `name`, `town`, `primaryModality`

### "Duplicate slug" warnings

This is normal if running the same import twice. Skip these—they're already in the database. To re-run:
1. Delete practitioners from admin
2. Run migration again

### Connection timeout

If running against a remote database:
```bash
# Increase timeout
DATABASE_URL="..." NODE_OPTIONS="--no-warnings" npx tsx --timeout 60000 scripts/migrate-practitioners.ts --file data.json
```

## Support

For questions or issues:
1. Check the migration log output
2. Review the Prisma schema: `prisma/schema.prisma`
3. Inspect data in Prisma Studio: `npm run db:studio`
4. Contact: avalon@thesoundspace.us

---

**Last Updated**: August 2026
**Supported Formats**: JSON, CSV
**Target Database**: PostgreSQL via Prisma

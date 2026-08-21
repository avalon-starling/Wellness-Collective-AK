# Admin Dashboard Guide

Everything for managing The Wellness Collective directory is at **`/admin`** — practitioners, applications, events, and resources.

---

## 🔐 Step 1: Set Up Admin Login

You need three environment variables in Vercel for admin access:

### Generate Your Credentials

Run these commands locally:

```bash
# Generate SESSION_SECRET (copy the output)
openssl rand -base64 32
# Output: abc123def456...xyz (32 random characters)

# Generate ADMIN_PASSWORD_HASH (replace "your-password" with your actual password)
npx tsx -e "import bcrypt from 'bcryptjs'; bcrypt.hash(process.argv[1], 10).then(console.log)" "your-password"
# Output: $2a$10$... (bcrypt hash)
```

### Add to Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your "Wellness Collective" project
3. Go to **Settings → Environment Variables**
4. Add three new variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `ADMIN_EMAIL` | your@email.com | Your email for login |
| `ADMIN_PASSWORD_HASH` | $2a$10$... | From `npx tsx` output above |
| `SESSION_SECRET` | abc123def456...xyz | From `openssl` output above |

5. Click "Save" on each variable
6. Trigger a redeployment (Vercel will auto-redeploy, or click "Redeploy")

### Log In

Once deployed (takes 2-5 minutes):
1. Visit `https://wellnesscollectiveak.com/admin/login`
2. Enter your email and password
3. You're in! 🎉

---

## 👥 Managing Practitioners

### View All Practitioners

Click **Practitioners** in the admin nav.

You'll see:
- **Published** checkbox — visible in `/find-wellness` directory
- **Name & Modality** — primary practice focus
- **Town** — Alaska location
- **Verification level** — LISTED, VERIFIED, MEMBER, or FEATURED

### Edit a Practitioner Profile

Click a practitioner name to edit:

**Profile Info:**
- Name, pronouns, contact info
- Primary modality & all modalities
- Town/region, format (in-person/virtual/both)

**Credentials:**
- Credentials (array of certifications/licenses)
- Years practicing
- Languages spoken

**Business:**
- Bio/description
- Website, Instagram, booking URL
- Rate label (e.g., "$120/session · sliding scale")
- Photo URL

**Directory:**
- **Published** — Show in `/find-wellness`
- **Verification level** — LISTED (basic), VERIFIED (reviewed), MEMBER (paying), FEATURED (premium)
- **Membership** — Status and tier if paying
- **Accepting** — Taking new clients?
- **Featured until** — Auto-hide featured status on this date

### Batch Actions

You can:
- Publish multiple at once (select checkboxes, click Publish)
- Set verification level in bulk
- Archive old practitioners (unpublish if no longer practicing)

---

## 📋 Managing Applications

When someone applies via `/apply`, their application appears here.

### Review Applications

Click **Applications** in admin nav.

Status options:
- **PENDING** — Needs review
- **APPROVED** — Creates a published Practitioner profile (auto-linked)
- **REJECTED** — Decline application with optional notes

### Approve an Application

1. Click the application
2. Review all fields:
   - Credentials and insurance
   - Business info
   - Bio and website
3. Check credentials meet your standards
4. Click **Approve**
   - Auto-creates a Practitioner record
   - Sets verification level to LISTED (you can change to VERIFIED if already vetted)
   - Application marked APPROVED

### Reject an Application

1. Click the application
2. Add optional notes for your records
3. Click **Reject**
   - Application marked REJECTED
   - No Practitioner profile created
   - You can re-open if they reapply

---

## 🎟️ Creating Invite Links for Partners

Use the invite system to give partners pre-filled signup forms.

### Generate an Invite Link

Run this command locally or in your terminal:

```bash
npx tsx scripts/create-invite.ts --name "Sarah Johnson" --email "sarah@email.com" --town "Anchorage" --modality "Acupuncture"
```

Output:
```
✨ Partner Invite Link Created

Partner: Sarah Johnson
Email:   sarah@email.com
Town:    Anchorage
Modality: Acupuncture

📋 Share this link:

https://wellnesscollectiveak.com/apply?invite=ABC123&data=eyJuYW1l...

💡 When they click the link, their info will be pre-filled in the signup form.
```

### Share the Link

Send the link to your partner:
- Email it directly
- Include in welcome packet
- Text message or Slack
- Their name, email, town, and modality will be pre-filled
- They just need to complete credentials, bio, and other details
- No need for them to re-type basic info

### Usage Examples

```bash
# Full invite with all fields
npx tsx scripts/create-invite.ts \
  --name "Dr. James Chen" \
  --email "james@example.com" \
  --phone "+1-907-555-1234" \
  --town "Juneau" \
  --modality "Acupuncture"

# Minimal invite (just name)
npx tsx scripts/create-invite.ts --name "Jessica Martinez"

# Invite with modality but no email yet
npx tsx scripts/create-invite.ts --name "Robert Alaska" --modality "Massage Therapy"
```

---

## 🎪 Creating & Managing Events

### Create an Event

Click **Events → New Event**

**Essential Info:**
- **Title** — Event name (e.g., "Summer Sound Bath")
- **Description** — What to expect
- **Dates** — Starts at, Ends at (optional)
- **Location** — Venue name & address
- **Type** — In-person, Virtual, or Hybrid
- **Town** — Which Alaska region

**Details:**
- **Modality tag** — E.g., "Sound Healing" (for filtering)
- **Access** — Open to all, Members only, or Ticketed
- **Capacity** — Max attendees (optional)
- **Price** — "$25" or leave blank if free
- **Host** — Who's hosting? (optional)
- **Image** — Event poster URL

**Publishing:**
- **Published** — Show in `/events` calendar
- **Is Wellness Weekend** — The flagship event gets special treatment

### Publish an Event

1. Create/edit event
2. Check **Published** checkbox
3. Click Save
4. Event appears in `/events` calendar and newsletter promotions

### Wellness Weekend (Flagship)

The Wellness Weekend is featured:
- At top of `/events` page
- In homepage teaser section
- Newsletter highlights
- Featured badge

To mark an event as Wellness Weekend:
1. Edit the event
2. Check **"This is Wellness Weekend (flagship)"**
3. Save

Only one event can be flagship at a time.

---

## 📖 Creating Resources (Articles/Guides)

Resources are educational articles about wellness topics.

### Create a Resource

Click **Resources → New Resource**

**Content:**
- **Title** — Article title
- **Category** — "Guide", "Article", "Education", etc.
- **Excerpt** — 1-2 sentence summary
- **Content** — Full text (markdown supported)
- **Author** — Who wrote this?

**Presentation:**
- **Cover image** — Article header image URL
- **Published** — Show in `/resources` library

### Markdown Support

Resources support basic markdown:

```markdown
# Heading 1
## Heading 2

**Bold text**
*Italic text*

- Bullet points
- Like this

1. Numbered lists
2. Work too

[Link text](https://url.com)
```

### Publish a Resource

Check **Published** and click Save.
Resource appears in `/resources` and search results.

---

## 📊 Monitoring & Analytics

### Subscribers

Visit **Subscribers** to see who signed up for the newsletter:
- **Email** — Their address
- **Source** — Where they signed up (homepage, events, footer)
- **Date** — When they subscribed

### Statistics

While in `/admin`, you can see:
- Total practitioners listed
- Verified vs. unverified
- Practitioners by modality & town
- Event attendance

---

## 🔑 Admin Workflow: Weekly Checklist

### Monday
- [ ] Review new applications
- [ ] Approve/reject and send notes
- [ ] Check applications with questions

### Wednesday
- [ ] Update events for the week
- [ ] Publish upcoming events
- [ ] Monitor newsletter subscriber growth

### Friday
- [ ] Review any practitioner profile updates
- [ ] Verify new credentials
- [ ] Plan next week's content

### Monthly
- [ ] Audit practitioner profiles (photos load? links work?)
- [ ] Update verification levels for vetted practitioners
- [ ] Feature new members (set Featured status)
- [ ] Archive inactive practitioners (unpublish if gone)
- [ ] Plan next month's events

---

## ⚙️ Settings & Configuration

### Membership Tiers (Pricing)

Membership tiers and pricing are in **`src/lib/content.ts`**:

```typescript
export const MEMBERSHIP_TIERS = [
  {
    slug: "provider",
    name: "Provider",
    description: "For new practitioners building their practice",
    monthlyPrice: 2900, // $29/month in cents
    annualPrice: 29000, // $290/year in cents
    features: ["Featured placement in search", "Community access", ...],
  },
  // ... more tiers
];
```

To change pricing:
1. Edit `src/lib/content.ts`
2. Update the price values (in cents: $29 = 2900)
3. Commit and push
4. Vercel auto-deploys

### Verification Levels

Four levels exist:
- **LISTED** — Basic free directory profile (default)
- **VERIFIED** — You've reviewed credentials
- **MEMBER** — Paid membership active
- **FEATURED** — Premium visibility (set with Featured until date)

Use these to mark your trust level.

### Newsletter Signup

Newsletter form appears:
- **Homepage** — "Get local events in your inbox"
- **Events page** — When no events published yet
- **Footer** — On every page

Subscribers are stored in the database. Future: integrate with email service (Mailchimp, SendGrid).

---

## 🚀 Going Live Checklist

- [ ] Login credentials set in Vercel
- [ ] Can access `/admin` dashboard
- [ ] Imported practitioners from old site
- [ ] Verified at least 10 practitioner profiles
- [ ] Published 5+ practitioners to directory
- [ ] Created at least one event (Wellness Weekend ideally)
- [ ] Generated invite links for first partners
- [ ] Tested apply form submission
- [ ] Checked newsletter signup works
- [ ] Tested on mobile (responsive?)
- [ ] Announced to network (email, social media)
- [ ] Monitor first week for applications

---

## 🔧 Troubleshooting

### Can't login to admin

**Problem:** "Invalid email or password"

**Solutions:**
1. Check credentials in Vercel Environment Variables
2. Verify `ADMIN_EMAIL` matches what you're typing
3. Verify `ADMIN_PASSWORD_HASH` is the full bcrypt output (starts with $2a$)
4. Verify `SESSION_SECRET` is set (min 32 chars)
5. Force redeploy: Go to Vercel → Redeploy

### Images not loading

**Problem:** Practitioner photos show broken image

**Solution:**
1. Check the URL in practice profile (Image URL field)
2. URL must be publicly accessible (not localhost or private)
3. Use full URL: `https://example.com/photo.jpg` not `/photos/...`

### Application form not submitting

**Problem:** Submit button does nothing or error message appears

**Solution:**
1. Check all required fields have values (marked with red *)
2. Verify email format is valid
3. Credentials field should have at least one certification
4. Check browser console (F12) for error messages
5. Make sure database connection is active

### Practitioners not showing in directory

**Problem:** Applied practitioners don't appear in `/find-wellness`

**Solutions:**
1. Check **Published** checkbox is enabled
2. Check verification level (should be at least LISTED)
3. Try clearing your browser cache (Ctrl+Shift+Delete)
4. Check the town name matches what's in the directory filters

### Newsletter signup not working

**Problem:** Newsletter form doesn't respond or error on submit

**Solutions:**
1. Check email entered is valid format
2. Try a different email (might be duplicate)
3. Check browser console for JavaScript errors
4. Verify database connection is working (check `/admin` loads)

---

## 📞 Support

- **Can't remember your password?** Reset it by re-generating `ADMIN_PASSWORD_HASH` and updating Vercel
- **Lost login credentials?** See Setup section to regenerate
- **Database issues?** Check `DATABASE_URL` is set in Vercel
- **Questions?** Email avalon@thesoundspace.us

---

**Last Updated:** August 21, 2026  
**Status:** Live & Ready to Manage  
**Next Action:** Set up login credentials in Vercel

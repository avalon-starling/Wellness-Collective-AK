# Next Steps — Launch Checklist for The Wellness Collective

The website is live at **wellnesscollectiveak.com** and ready for data import. This document walks you through the remaining steps to achieve a flawless launch with your existing practitioner directory.

## 📋 Pre-Launch Checklist

### Phase 1: Data & Environment (This Week)

- [ ] **Export existing practitioner data** from your previous website
  - See: **MIGRATION_GUIDE.md** for export instructions per platform
  - Format as JSON or CSV
  - Validate all required fields are present (name, town, primaryModality)

- [ ] **Connect PostgreSQL database to production**
  - In Vercel dashboard: Storage → Postgres (or use your existing Neon/Supabase)
  - Copy `DATABASE_URL` to production environment variables
  - Test connection: `npm run db:studio` locally

- [ ] **Set admin credentials**
  - Generate SESSION_SECRET: `openssl rand -base64 32`
  - Generate ADMIN_PASSWORD_HASH (see README.md for command)
  - Set ADMIN_EMAIL (your email)
  - Add to Vercel environment variables

- [ ] **Configure domain DNS**
  - Point `wellnesscollectiveak.com` A/CNAME records to Vercel
  - Vercel dashboard shows exact records needed
  - Verify with: `nslookup wellnesscollectiveak.com`
  - May take 24-48 hours to propagate

### Phase 2: Data Import (Days 2-3)

- [ ] **Run migration script**
  ```bash
  npx tsx scripts/migrate-practitioners.ts --file practitioners.json
  ```
  - Creates practitioners in database (unpublished)
  - Auto-generates URL slugs
  - Reports duplicates and skips
  - See console output for errors

- [ ] **Review imported practitioners in admin**
  - Visit `/admin` (login with your credentials)
  - Go to **Practitioners** section
  - Check photos load, links work, credentials display correctly
  - Fix any missing data or broken URLs

- [ ] **Set verification levels**
  - Credentials already reviewed? Set to `VERIFIED`
  - Current members? Set to appropriate `MembershipTier`
  - Others? Keep as `LISTED`
  - See admin interface for batch actions if available

- [ ] **Publish practitioners**
  - Individual publish: Edit each practitioner, toggle "Published"
  - Batch publish: Use admin dashboard if available
  - Verified practitioners should be published first
  - You can unpublish anytime if you need to review

### Phase 3: SEO Setup (Days 3-4)

- [ ] **Set up Google Search Console**
  - Go to https://search.google.com/search-console
  - Add property for `wellnesscollectiveak.com`
  - Verify ownership (DNS or HTML file method)
  - Submit sitemap: `/sitemap.xml` (auto-generated)

- [ ] **Configure redirects from old URLs**
  - See: **SEO_PRESERVATION.md** for redirect setup instructions
  - If practitioners had individual pages on old site, set up 301 redirects
  - Examples:
    - `/practitioners/:slug` → `/find-wellness/:slug`
    - `/providers/acupuncture/:slug` → `/find-wellness/:slug`
  - Use Option A (Vercel), B (Next.js), or C (your server)

- [ ] **Request index of new practitioner pages in GSC**
  - URL Inspection → Paste a practitioner URL
  - Click "Request Indexing"
  - Repeat for 5-10 key pages
  - Google will crawl the rest via sitemap

- [ ] **Create Google Business Profile** (if not already created)
  - Go to https://business.google.com
  - Claim or create profile for "The Wellness Collective"
  - Location: Anchorage, AK
  - Add website, phone, hours, description
  - Practitioners should have their own GBP too

### Phase 4: Newsletter & Events (Days 4-5)

- [ ] **Test newsletter signup**
  - Visit homepage → scroll to "Get local events in your inbox"
  - Enter test email → confirm signup works
  - Check admin dashboard for subscriber
  - Test from events page empty state too

- [ ] **Import events** (if migrating from old site)
  - Visit `/admin/events`
  - Click "New Event" or import via script if available
  - Add flagship event: Wellness Weekend
  - Mark as published to appear on `/events`

- [ ] **Configure Square membership** (when ready for paid memberships)
  - Create subscription plans in Square Dashboard
  - Copy Variation IDs for five plans (Provider monthly/annual, etc.)
  - Add to Vercel environment variables:
    - `SQUARE_ACCESS_TOKEN`
    - `SQUARE_LOCATION_ID`
    - `SQUARE_ENVIRONMENT` (sandbox or production)
    - `SQUARE_PLAN_*` (five variables)
  - Test in sandbox mode first

### Phase 5: Quality Assurance (Days 5-7)

- [ ] **Test all public pages**
  - [ ] Homepage loads, newsletter works
  - [ ] Directory `/find-wellness` shows practitioners
  - [ ] Practitioner profile pages load with correct data
  - [ ] Search/filter by modality, location, format works
  - [ ] Events page shows events (or newsletter signup)
  - [ ] Apply form validates and submits
  - [ ] Join membership page displays tiers
  - [ ] Mobile responsive on phone/tablet

- [ ] **Test admin dashboard**
  - [ ] Login at `/admin/login`
  - [ ] Practitioners: list, create, edit, delete
  - [ ] Applications: view, approve (creates practitioner), reject
  - [ ] Events: create, edit, delete
  - [ ] Resources: create, edit, delete
  - [ ] Can logout and login again

- [ ] **Test SEO elements**
  - [ ] Page titles appear in browser tab
  - [ ] Meta descriptions in page source
  - [ ] Images have alt text
  - [ ] Open Graph tags for social sharing (test on Facebook)
  - [ ] Structured data valid: https://search.google.com/test/rich-results

- [ ] **Test forms end-to-end**
  - [ ] Newsletter signup (check admin for subscriber)
  - [ ] Provider application (check admin for application)
  - [ ] Event RSVP (if available)
  - [ ] Error messages display for invalid input

- [ ] **Performance check**
  - PageSpeed Insights: https://pagespeed.web.dev/
  - Target: 90+ performance score
  - Check Core Web Vitals

### Phase 6: Launch Day (Day 7)

- [ ] **Announce to network**
  - Email existing practitioners: "Your profile is live at..."
  - Post on social media
  - Update business partner sites
  - Send announcement to subscriber list

- [ ] **Monitor first 24 hours**
  - Check Google Search Console for crawl errors
  - Monitor Vercel deployment for errors
  - Watch email for application submissions
  - Respond quickly to first applicants

- [ ] **Post-launch tasks**
  - [ ] Watch newsletters for typos/issues
  - [ ] Respond to practitioner inquiries
  - [ ] Add events for upcoming Wellness Weekend
  - [ ] Start promoting membership tiers

---

## 🎯 Success Metrics

**By Month 1:**
- [ ] 100+ practitioners in directory
- [ ] 50+ newsletter subscribers
- [ ] No critical crawl errors in GSC
- [ ] Pages ranking for "Alaska wellness"

**By Month 3:**
- [ ] 300+ practitioners
- [ ] 200+ newsletter subscribers
- [ ] 5-10 first members
- [ ] Pages visible in search results for modality + location

**By End of Year:**
- [ ] 1000+ members (goal)
- [ ] 500+ active newsletter subscribers
- [ ] Featured in local directories & news
- [ ] Wellness Weekend as flagship event

---

## 📱 Recommended Tools

### During Migration
- **Notion** — Checklist tracking
- **Google Sheets** — Data validation before import
- **Postman** — Test APIs if using webhooks

### After Launch
- **Google Search Console** — Monitor rankings, crawl errors
- **Google Analytics 4** — Track visitor behavior
- **Vercel Analytics** — Monitor site performance & errors
- **SendGrid/Mailgun** — Future: email campaigns (optional)
- **Stripe/Zapier** — Future: automate workflows (optional)

### Data Management
- **Prisma Studio** — Inspect database (`npm run db:studio`)
- **pgAdmin** — Advanced database management
- **Airtable** — Backup/archive practitioner data

---

## ⚠️ Common Mistakes to Avoid

1. **Not setting up 301 redirects**
   - Will lose SEO authority from old URLs
   - Start this early! See SEO_PRESERVATION.md

2. **Publishing practitioners before verification**
   - Review credentials, photos, contact info first
   - Invalid links hurt credibility
   - Unpublish if something looks wrong

3. **Not testing forms end-to-end**
   - Email deliverability issues discovered too late
   - Test with real email account before launch

4. **Forgetting to update external links**
   - Directory listings (Yelp, Google My Business, etc.)
   - Partner websites
   - Email signatures with old links

5. **Not monitoring search performance**
   - Watch rankings closely first month
   - If drops detected, check redirects
   - GSC will alert you to issues

6. **Rushing the newsletter strategy**
   - Newsletter should highlight LOCAL events
   - Segment subscribers by interest if possible
   - Encourage practitioners to promote

---

## 🔗 Key Documentation

1. **MIGRATION_GUIDE.md** — How to export & import practitioner data
2. **SEO_PRESERVATION.md** — Preserve search rankings, set up redirects
3. **README.md** — Tech stack, local development, deployment
4. **Database Schema** — See `prisma/schema.prisma` for data model
5. **Admin Guide** — See `/admin` for interface walkthrough

---

## 🚀 Your Next 48 Hours

### Hour 1-4: Preparation
```
☐ Export practitioner data from old site
☐ Save as JSON or CSV
☐ Validate structure
```

### Hour 4-8: Setup
```
☐ Connect PostgreSQL to production
☐ Set admin credentials
☐ Point domain DNS to Vercel
```

### Hour 8-16: Import & Test
```
☐ Run migration script
☐ Review imported data in admin
☐ Fix any errors
☐ Publish verified practitioners
```

### Hour 16-24: SEO & Newsletter
```
☐ Set up Google Search Console
☐ Configure URL redirects
☐ Request indexing for key pages
☐ Test newsletter signup
```

### Hour 24-48: QA & Launch
```
☐ Test all pages & forms
☐ Performance check
☐ Announce to network
☐ Monitor first day
```

---

## 📞 Need Help?

- **Technical Questions:** See README.md, MIGRATION_GUIDE.md
- **SEO Issues:** See SEO_PRESERVATION.md
- **Data Structure Questions:** Check `prisma/schema.prisma`
- **Contact:** avalon@thesoundspace.us

---

## Version History

- **v1.0** — August 21, 2026 — Initial launch checklist
- **Status** — Site live and ready for data import

---

**Good luck with launch! 🌿✨**

The Wellness Collective is now ready to scale. Focus on:
1. Getting real data in (practitioners)
2. Making it discoverable (SEO, newsletters)
3. Growing membership (Square integration)

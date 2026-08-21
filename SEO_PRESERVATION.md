# SEO Preservation & Migration Strategy

This document outlines how to maintain search engine rankings and SEO authority when migrating from your previous Wellness Collective website to this new platform.

## Quick Summary

✅ **What's Preserved:**
- Domain: `wellnesscollectiveak.com` (no change)
- Brand authority accumulated on this domain
- Google Search Console history (if already configured)

⚠️ **What Changes:**
- URL structure for practitioners: `/practitioners/*` → `/find-wellness/*`
- URL structure for events: `/events/*` → `/events/*` (may differ)
- Internal linking patterns
- Site architecture and navigation

🔧 **What You Must Do:**
- Set up 301 redirects from old URLs to new ones
- Update internal links to use new URL structure
- Verify in Google Search Console
- Monitor rankings and crawl stats

---

## 1. URL Mapping & Redirects

### Practitioner Pages

**Old URL Pattern:**
```
https://wellnesscollectiveak.com/practitioners/dr-sarah-johnson
https://wellnesscollectiveak.com/providers/acupuncture/sarah-johnson
https://wellnesscollectiveak.com/profile/sarah-johnson
```

**New URL Pattern:**
```
https://wellnesscollectiveak.com/find-wellness/dr-sarah-johnson
```

### Setting Up Redirects in Vercel

The migration script automatically generates slug-compatible URLs. To preserve SEO:

#### Option A: Vercel Redirects (Recommended)

Edit `vercel.json`:

```json
{
  "framework": "nextjs",
  "redirects": [
    {
      "source": "/practitioners/:slug",
      "destination": "/find-wellness/:slug",
      "permanent": true
    },
    {
      "source": "/providers/:category/:slug",
      "destination": "/find-wellness/:slug",
      "permanent": true
    },
    {
      "source": "/profile/:slug",
      "destination": "/find-wellness/:slug",
      "permanent": true
    }
  ]
}
```

#### Option B: Next.js Redirects

Update `src/middleware.ts` or add to `next.config.js`:

```javascript
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/practitioners/:slug',
        destination: '/find-wellness/:slug',
        permanent: true,
      },
      {
        source: '/providers/:category/:slug',
        destination: '/find-wellness/:slug',
        permanent: true,
      },
    ];
  },
};
```

#### Option C: Nginx/Server Redirects

If hosting outside Vercel, add to Nginx config:

```nginx
location ~ ^/practitioners/(.+)$ {
  return 301 /find-wellness/$1;
}

location ~ ^/providers/[^/]+/(.+)$ {
  return 301 /find-wellness/$1;
}
```

### Event Pages

Map old event URLs to new structure:

```json
{
  "source": "/events/:slug",
  "destination": "/events/:slug",
  "permanent": true
}
```

(URL structure is the same, so minimal changes needed)

### Other Pages

Common pages to redirect:

```json
{
  "redirects": [
    {
      "source": "/about-us",
      "destination": "/about",
      "permanent": true
    },
    {
      "source": "/membership",
      "destination": "/join-the-collective",
      "permanent": true
    },
    {
      "source": "/directory",
      "destination": "/find-wellness",
      "permanent": true
    },
    {
      "source": "/wellness-weekend-2024",
      "destination": "/wellness-weekend",
      "permanent": true
    }
  ]
}
```

---

## 2. Google Search Console Setup

### Verify the New Site

1. **Add domain property in GSC**
   ```
   https://search.google.com/search-console
   ```

2. **Verify ownership** (if not already verified)
   - Use DNS record or HTML file method
   - Choose the method that works with your domain host

3. **Submit sitemap**
   - Go to **Sitemaps** section
   - Submit: `https://wellnesscollectiveak.com/sitemap.xml`
   - It will auto-generate dynamic entries for practitioners, events, resources

### Monitor Redirects

In Google Search Console:

1. **Reports → Coverage**
   - Check for any excluded pages
   - Verify crawl is progressing

2. **Reports → Enhancements**
   - Review any crawl errors
   - Look for broken redirects

3. **Performance → Queries**
   - Monitor rankings for key terms
   - Watch for ranking drops

### Request Indexing of New URLs

1. Go to **Indexing → URL Inspection**
2. Paste a new practitioner URL like: `/find-wellness/dr-sarah-johnson`
3. Click **Request Indexing**
4. Repeat for a few key pages to speed up crawling

---

## 3. Canonical Tags & Metadata

All pages automatically include appropriate `<link rel="canonical">` tags to prevent duplicate content issues.

**Homepage:**
```html
<canonical href="https://wellnesscollectiveak.com/" />
```

**Practitioner pages:**
```html
<canonical href="https://wellnesscollectiveak.com/find-wellness/dr-sarah-johnson" />
```

**Event pages:**
```html
<canonical href="https://wellnesscollectiveak.com/events/wellness-weekend-2025" />
```

These are automatically set by Next.js metadata, so no manual action needed.

---

## 4. Schema.org Structured Data

The site includes proper structured data for:

- **Organization** (homepage, footer)
- **LocalBusiness** (practitioner profiles)
- **Event** (event pages)
- **NewsArticle** (resource articles)
- **BreadcrumbList** (navigation)

This structured data helps Google understand content and display rich results (reviews, pricing, etc.).

**To verify:**
1. Use Google's Rich Results Test: https://search.google.com/test/rich-results
2. Paste a practitioner URL
3. Should show valid markup for LocalBusiness

---

## 5. Open Graph & Twitter Cards

All pages include Open Graph and Twitter Card metadata for social sharing.

**Practitioner Example:**
```html
<meta property="og:title" content="Dr. Sarah Johnson — Acupuncturist | The Wellness Collective" />
<meta property="og:description" content="15+ years of practice in classical acupuncture and herbal medicine. Specializing in women's health." />
<meta property="og:image" content="[photo URL]" />
<meta property="og:url" content="https://wellnesscollectiveak.com/find-wellness/dr-sarah-johnson" />
```

This ensures proper previews when practitioners share their profiles on social media.

---

## 6. Mobile SEO & Core Web Vitals

✅ The site is fully mobile-responsive (Tailwind CSS responsive design)

✅ Performance optimized:
- Next.js automatic code splitting
- Image optimization via `<Image>` component
- Server-side rendering for dynamic content
- Static generation where possible

### Check Core Web Vitals

Monitor your site's Core Web Vitals in Google Search Console:

1. **Largest Contentful Paint (LCP)** — Time to main content
2. **Cumulative Layout Shift (CLS)** — Visual stability
3. **First Input Delay (FID)** — Interactivity

Use PageSpeed Insights: https://pagespeed.web.dev/

---

## 7. Link Equity & Backlinks

### Internal Links

Update any existing internal links from:
- `/practitioners/slug` → `/find-wellness/slug`
- `/providers/category/slug` → `/find-wellness/slug`

### External Backlinks

Third-party sites linking to practitioners:
- Directory listings (Yelp, Google My Business, etc.)
- Local directories
- Wellness networks
- Business partner sites

**Action items:**
1. Audit where you're linked (use Ahrefs, SEMrush, or free tools)
2. Update critical backlinks to new URLs
3. Use 301 redirects to handle the rest automatically

---

## 8. Migration Timeline

### Week 1: Preparation
- [ ] Verify GSC access
- [ ] Set up redirects (Option A, B, or C above)
- [ ] Prepare redirect map
- [ ] Document all old URLs

### Week 2: Deployment
- [ ] Deploy with redirects active
- [ ] Monitor crawl errors in GSC
- [ ] Request indexing of key new pages
- [ ] Verify 301 redirects working (test 5-10 URLs)

### Week 3-4: Monitoring
- [ ] Monitor rankings in GSC
- [ ] Check crawl stats
- [ ] Watch for 404 errors
- [ ] Update external backlinks if possible

### Month 2: Verification
- [ ] Most old URLs indexed and redirecting
- [ ] Ranking keywords stable or improving
- [ ] No major crawl errors
- [ ] Submit new sitemap weekly if needed

---

## 9. Monitoring & Alerts

### Set Up Alerts in GSC

1. **Go to Settings → Coverage alerts**
2. Enable alerts for:
   - Crawl errors
   - Indexing issues
   - Manual actions

### Track Rankings

Use free tools:
- **Google Search Console** (organic traffic & queries)
- **Google Analytics 4** (traffic source attribution)
- **PageSpeed Insights** (Core Web Vitals)

Or paid tools:
- **Ahrefs** — Rank tracking
- **SEMrush** — Rank tracking & competitor analysis
- **Moz** — Rank tracking & domain authority

---

## 10. Common Issues & Solutions

### 301 Redirects Not Working

**Problem:** Old URLs return 404 or 200 instead of 301

**Solution:**
- Verify redirect rule syntax
- Test with `curl -I https://old-url`
- Ensure rule matches URL pattern exactly
- Check Vercel/server logs

### Google Not Crawling New URLs

**Problem:** New pages not appearing in GSC after 2 weeks

**Solution:**
1. Submit sitemap again in GSC
2. Use URL Inspection tool to request indexing
3. Check if robots.txt is blocking
4. Verify page has links from indexed pages
5. Check for noindex tags

### Ranking Drop After Migration

**Problem:** Keyword rankings fell after launch

**Likely causes:**
- 301 redirects not set up correctly
- Page content changed significantly
- New URLs have different word count/structure
- Site speed issues

**Solutions:**
1. Verify 301 redirects are working
2. Keep page content and structure similar to originals
3. Add redirects for any other URL patterns
4. Optimize Core Web Vitals
5. Wait 4-6 weeks (Google needs time to re-index and re-evaluate)

---

## 11. Long-Term SEO Best Practices

### Keep Rankings Strong

1. **Update Practitioner Profiles Regularly**
   - Fresh credentials
   - New photos
   - Updated bio
   - Recent testimonials (future feature)

2. **Publish Resources Regularly**
   - Blog posts about wellness topics
   - Educational guides
   - Local event coverage
   - Link to related practitioner profiles

3. **Build Internal Links**
   - Link related practitioners
   - Link events to relevant practitioner profiles
   - Link resources to related content

4. **Monitor & Respond to Reviews**
   - Encourage verified practitioners to get Google reviews
   - Respond to reviews professionally
   - This boosts local SEO

5. **Content Updates**
   - Use GSC to find underperforming pages
   - Improve pages with high impressions but low CTR
   - Update outdated information

### Local SEO Optimization

Since Wellness Collective is Alaska-focused:

1. **Claim/Create Google Business Profile**
   - Go to Google Business Profile
   - Claim "The Wellness Collective, Anchorage, AK"
   - Add location, hours, phone, website
   - Post events regularly

2. **Build Local Citations**
   - Alaska business directories
   - Local wellness networks
   - Chamber of commerce listings
   - Consistent NAP (Name, Address, Phone)

3. **Location Pages** (Future Enhancement)
   - `/locations/anchorage`
   - `/locations/juneau`
   - Target geographic searches

---

## Support & Questions

For SEO issues or questions:

1. **Check Google Search Console** — Most common issues visible there
2. **Review Google's SEO Starter Guide** — https://developers.google.com/search/docs/beginner/seo-starter-guide
3. **Check this guide** — Sections above often have the answer
4. **Contact:** avalon@thesoundspace.us

---

**Last Updated:** August 2026
**Status:** Live & Optimized
**Tools Used:** Next.js, Vercel, Google Search Console

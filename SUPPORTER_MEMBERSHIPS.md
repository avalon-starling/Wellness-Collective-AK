# Free Memberships for Long-Term Supporters

Create limited free memberships for your founding members and long-term supporters who helped build The Wellness Collective.

---

## 🔐 Your Admin Credentials

### Generate Yours Now

**Step 1: Create SESSION_SECRET (random 32-char string)**

```bash
openssl rand -base64 32
```

You'll get something like:
```
abc123def456ghi789jkl012mnopqr345stu678vwxyz
```
**Copy this value** → It's your `SESSION_SECRET`

**Step 2: Create ADMIN_PASSWORD_HASH (encrypted password)**

Replace `your-secure-password` with whatever password you want:

```bash
npx tsx -e "import bcrypt from 'bcryptjs'; bcrypt.hash(process.argv[1], 10).then(console.log)" "your-secure-password"
```

You'll get something like:
```
$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86AGR0Ij0i6
```
**Copy this value** → It's your `ADMIN_PASSWORD_HASH`

### Step 3: Add to Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select "Wellness Collective" project
3. Click **Settings → Environment Variables**
4. Add these 3 variables:

| Variable | Value | Example |
|----------|-------|---------|
| `ADMIN_EMAIL` | Your email | `avalon@thesoundspace.us` |
| `SESSION_SECRET` | From step 1 | `abc123def456...` |
| `ADMIN_PASSWORD_HASH` | From step 2 | `$2a$10$...` |

5. Click "Save" on each one
6. Vercel auto-redeploys (takes 2-5 minutes)

### Step 4: Login

Once redeployed:
1. Visit `https://wellnesscollectiveak.com/admin/login`
2. Enter your email
3. Enter your password
4. ✅ You're in the admin dashboard!

---

## 💝 Offering Free Memberships to Supporters

You have two options:

### Option A: Fast-Track via Invite Links (Recommended)

Use the partner invite system to pre-fill applications for supporters:

```bash
npx tsx scripts/create-invite.ts \
  --name "Jane Supporter" \
  --email "jane@example.com" \
  --town "Anchorage" \
  --modality "Yoga"
```

**They get a link like:** 
```
https://wellnesscollectiveak.com/apply?invite=ABC123&data=...
```

**What happens:**
1. They click the link
2. Their name, email, town, modality are pre-filled
3. They fill in credentials, bio, and submit
4. Application appears in your admin
5. You approve it → They get a free LISTED profile

**Then in admin:** Set their membership tier and mark as active (see below)

---

### Option B: Direct Upgrade in Admin (Faster)

Once they have a profile (published practitioner):

1. Go to `/admin/practitioners`
2. Click their name
3. Scroll to **Membership** section
4. Set:
   - **Membership Tier** → `PROFESSIONAL` (or `PROVIDER`)
   - **Membership Period** → `MONTHLY` or `ANNUAL`
   - **Membership Active** → ✅ (check the box)
5. Click Save

**That's it** — they now have a paid membership tier without paying!

---

## 📋 Free Membership Workflow

### For Each Long-Term Supporter:

**Step 1: Invite Them**
```bash
npx tsx scripts/create-invite.ts \
  --name "Their Name" \
  --email "their@email.com" \
  --town "Their Town" \
  --modality "Their Modality"
```

Send them the link via email:
```
Hi [Name]!

As a founding supporter of The Wellness Collective, 
we'd like to offer you a free PROFESSIONAL membership.

Click here to claim your profile:
[INVITE LINK]

Just fill in your credentials and bio, and we'll activate it right away!

— Avalon
```

**Step 2: They Apply**
- Click link
- Info is pre-filled
- Complete application
- Submit

**Step 3: You Approve**
- Admin dashboard → Applications
- Review their submission
- Click Approve
- Their LISTED profile is created

**Step 4: Upgrade to Paid Membership (Free)**
- Admin → Practitioners
- Click their name
- Set Membership Tier: `PROFESSIONAL`
- Check Membership Active: ✅
- Save

**Step 5: Done!**
They now have:
- ✅ Directory listing (visible in `/find-wellness`)
- ✅ PROFESSIONAL membership (featured placement, networking access)
- ✅ Free (you paid for them as supporters)

---

## 🎯 Membership Tiers Explained

### LISTED (Free)
- Basic directory profile
- Visible in search
- No featured placement
- Can upgrade to paid

### PROVIDER ($29/mo or $290/yr)
- Featured in search results
- Community access
- Networking opportunities
- Member events discount

### PROFESSIONAL ($59/mo or $590/yr)
- Enhanced featured placement
- All PROVIDER benefits
- Priority support
- Exclusive marketing

### FOUNDING ($199/yr — limited)
- Premium featured placement
- Everything above
- Special founder badge
- Founding member community

---

## 💡 How to Track Free Memberships

In admin, you'll see:
- **Published:** ✅ (shows in directory)
- **Verification:** VERIFIED (if you've checked credentials)
- **Membership Tier:** PROFESSIONAL
- **Membership Active:** ✅
- **Membership Period:** MONTHLY

To find all your free members:
1. Go `/admin/practitioners`
2. Look for ones with:
   - Membership Active: ✅
   - No associated payment record

(Future enhancement: Add a "Free Member" label for easier tracking)

---

## 🎁 Example: Setting Up Your First Supporter

**Scenario:** You want to offer Paula Ciniero (Healing Hands) a free PROFESSIONAL membership as a founding supporter.

### Step 1: Send Invite Link
```bash
npx tsx scripts/create-invite.ts \
  --name "Paula Ciniero" \
  --email "paula@healinghandshealinghearts.com" \
  --town "Fairbanks" \
  --modality "Sound Healing"
```

Email her:
```
Hi Paula!

As one of our founding supporters, we're thrilled to offer you 
a FREE PROFESSIONAL membership in The Wellness Collective.

Your info is pre-filled here:
[LINK]

Just fill in your details and submit!

— Avalon
```

### Step 2: She Applies
- Clicks link
- Pre-filled: name, email, town, modality
- Fills: credentials, bio, practice details
- Clicks Submit

### Step 3: You Approve
```
Admin Dashboard → Applications
↓
Click: Paula Ciniero
↓
Review application
↓
Click: Approve
```

She now has a LISTED profile in the directory.

### Step 4: Upgrade Her to Free PROFESSIONAL
```
Admin Dashboard → Practitioners
↓
Click: Paula Ciniero
↓
Scroll to "Membership" section
↓
Membership Tier: PROFESSIONAL
Membership Period: ANNUAL
Membership Active: ✅ (check box)
↓
Click: Save Changes
```

**Done!** Paula now has:
- ✅ Full directory profile (Sound Healing in Fairbanks)
- ✅ PROFESSIONAL tier (featured search placement)
- ✅ Access to member events
- ✅ Free (no payment needed)

---

## 🚀 Scale to 10+ Free Supporters

### Quick Process (for multiple people):

**Batch 1: Generate all invite links**
```bash
# Create a script file: invite_supporters.sh
npx tsx scripts/create-invite.ts --name "Paula Ciniero" --email "paula@..." --town "Fairbanks" --modality "Sound Healing"
npx tsx scripts/create-invite.ts --name "Terisa Brenna" --email "terisa@..." --town "Anchorage" --modality "Spiritual Coaching"
npx tsx scripts/create-invite.ts --name "Lynn Masson" --email "lynn@..." --town "Anchorage" --modality "Mindfulness Coaching"
# ... add more

# Run it:
bash invite_supporters.sh
```

**Batch 2: Send all links**
- Email each supporter their personal link
- Include: "Apply by [DATE]"
- Include: "We'll activate your free membership within 24 hours"

**Batch 3: Review & approve**
- Check admin daily for applications
- Approve as they come in
- Send them a confirmation email

**Batch 4: Bulk upgrade to PROFESSIONAL**
- Once approved, go to each practitioner
- Set Membership Tier: PROFESSIONAL
- Check Membership Active
- Save

---

## 📊 Tracking Your Free Memberships

### Check in Admin:
```
/admin/practitioners
→ Filter by: Membership Tier = PROFESSIONAL or PROVIDER
→ Count active ones
→ Track growth
```

### Email Confirmation to Send:
```
Subject: Your Wellness Collective Membership is Active!

Hi [Name],

Welcome to The Collective! Your PROFESSIONAL membership is now active.

Your profile: wellnesscollectiveak.com/find-wellness/[slug]

Benefits:
✅ Featured placement in directory search
✅ Access to member-only events
✅ Professional networking community
✅ Discounts on Collective workshops

Questions? Reply to this email.

— Avalon
```

---

## 🎯 Success Metrics

**Week 1:**
- [ ] Admin login working
- [ ] First 3 supporters have invites sent
- [ ] At least 1 application approved

**Week 2:**
- [ ] 5-10 supporters invited
- [ ] 3-5 memberships activated
- [ ] Directory showing 10+ practitioners (existing + free members)

**Month 1:**
- [ ] 10-15 free member supporters
- [ ] 50% of directory are members
- [ ] Monthly revenue starting from paid members

**By Year-End:**
- [ ] 100+ free supporter members
- [ ] 1000+ total members (mix of free supporters + paid)
- [ ] Strong community foundation

---

## 💬 Sample Email to Supporters

```
Subject: Join The Wellness Collective as a Founding Member (Free!)

Hi [Name],

We're launching The Wellness Collective and we'd like to offer YOU 
a FREE PROFESSIONAL membership as a thank you for your support.

As a founding member, you'll get:

✨ Premium profile in our Alaska wellness directory
✨ Featured placement in search results
✨ Access to exclusive member-only events
✨ Discounts on Collective workshops
✨ Professional networking with other Alaska practitioners

To get started, click here:
[INVITE LINK]

Your info is pre-filled — just add your credentials and practice details.

We'll activate your membership within 24 hours of approval.

Thank you for believing in The Collective!

— Avalon & The Wellness Collective Team
```

---

## 🔧 Troubleshooting

### Admin login not working
- ✅ Check ADMIN_EMAIL is set correctly in Vercel
- ✅ Check ADMIN_PASSWORD_HASH starts with `$2a$`
- ✅ Check SESSION_SECRET is set (32+ characters)
- ✅ Wait 5 minutes for Vercel redeploy
- ✅ Clear browser cache (Ctrl+Shift+Delete)

### Invite link doesn't pre-fill
- ✅ Check invite script ran successfully
- ✅ Copy full link including `?invite=...&data=...`
- ✅ Test link yourself first before sending

### Can't see membership tier in admin
- ✅ Make sure database is connected (DATABASE_URL set)
- ✅ Make sure practitioner is published
- ✅ Scroll down in edit form — Membership section is near bottom

### Supporter didn't receive email
- ✅ Check email address in invite command
- ✅ Check their spam folder
- ✅ Resend link manually

---

**Last Updated:** August 21, 2026  
**Status:** Ready to Activate  
**Next Action:** Generate your admin credentials (10 minutes)

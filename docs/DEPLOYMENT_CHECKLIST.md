# 🚀 Production Deployment Checklist

## Pre-Deployment Steps

### ☐ 1. Database Migration
Run in Supabase SQL Editor:
```bash
# Execute this file:
scripts/add-property-edit-fields.sql
```

**Verify:**
- [ ] `pending_changes` column exists
- [ ] `approval_status` column exists
- [ ] `is_active` column exists
- [ ] `contact_email`, `contact_phone`, `house_rules`, `minimum_stay` exist
- [ ] Indexes created successfully

---

### ☐ 2. Environment Variables
Add to Vercel/production environment:

```env
# Stripe (should already exist)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRICE_ID=price_...

# NEW - Add these
STRIPE_WEBHOOK_SECRET=whsec_...
CRON_SECRET=[generate random string]

# Resend (should already exist)
RESEND_API_KEY=re_...
ADMIN_EMAIL=hello@trustyourhost.com

# App URL (should already exist)
NEXT_PUBLIC_APP_URL=https://trustyourhost.com
```

**Generate CRON_SECRET:**
```bash
openssl rand -base64 32
```

---

### ☐ 3. Stripe Webhook Setup

1. **Go to:** [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)

2. **Add Endpoint:**
   - **URL:** `https://trustyourhost.com/api/stripe/webhooks`
   - **Description:** Production subscription webhooks
   - **Version:** Latest (2024-11-20.acacia)

3. **Select Events:**
   - [x] `checkout.session.completed`
   - [x] `customer.subscription.updated`
   - [x] `customer.subscription.deleted`
   - [x] `invoice.payment_succeeded`
   - [x] `invoice.payment_failed`

4. **Copy Signing Secret:**
   - Click endpoint → Reveal signing secret
   - Copy to `STRIPE_WEBHOOK_SECRET` env var

5. **Test:**
   ```bash
   stripe trigger checkout.session.completed --stripe-account acct_xxx
   ```

**Verify:**
- [ ] Webhook endpoint created
- [ ] All 5 events selected
- [ ] Signing secret added to env vars
- [ ] Test event received successfully

---

### ☐ 4. Vercel Cron Job Setup

1. **Go to:** Vercel Dashboard → Your Project → Settings → Cron Jobs

2. **Add Cron Job:**
   - **Name:** Trial Reminder Emails
   - **Path:** `/api/cron/trial-reminders`
   - **Schedule:** `0 9 * * *` (Daily at 9am UTC)
   - **Region:** Auto

3. **Test Cron Job:**
   ```bash
   curl -X POST https://trustyourhost.com/api/cron/trial-reminders \
     -H "Authorization: Bearer ${CRON_SECRET}"
   ```

**Verify:**
- [ ] Cron job created
- [ ] Correct schedule set
- [ ] Manual test returns success
- [ ] Check Vercel function logs

---

### ☐ 5. Test End-to-End Workflow

#### Test 1: Property Submission → Approval → Billing
1. [ ] Submit test property via `/submit-property`
2. [ ] Approve in admin `/admin/submissions`
3. [ ] Receive approval email
4. [ ] Click billing setup link
5. [ ] Complete Stripe Checkout (use test card)
6. [ ] Verify property goes live with trial status
7. [ ] Check dashboard shows "Trial: 60 days left"

#### Test 2: Property Editing (3-Tier Permissions)
1. [ ] Go to `/host/properties`
2. [ ] Click "Edit Property"
3. [ ] **Instant Tab:** Edit description, save → Updates immediately
4. [ ] **Approval Tab:** Change property name → Goes to "pending_changes"
5. [ ] **System Tab:** View-only fields display correctly

#### Test 3: Analytics Page
1. [ ] Go to `/host/analytics`
2. [ ] Verify all charts render
3. [ ] Check metrics cards show data
4. [ ] Test property selector (if multiple properties)

#### Test 4: Stripe Webhooks
1. [ ] Trigger `invoice.payment_failed` in Stripe
2. [ ] Verify property goes to "paused" status
3. [ ] Verify `is_active` set to false
4. [ ] Verify email sent to host
5. [ ] Check webhook logs in Stripe

#### Test 5: Trial Reminder Email
1. [ ] Create property with `trial_ends_at` = 7 days from now
2. [ ] Manually trigger cron: `POST /api/cron/trial-reminders`
3. [ ] Verify email received
4. [ ] Check email formatting
5. [ ] Test "Update Payment Method" link

**Verify:**
- [ ] All 5 tests pass
- [ ] No errors in logs
- [ ] Emails deliver correctly
- [ ] Database updates properly

---

### ☐ 6. Security Review

- [ ] Webhook signature verification working
- [ ] Cron job requires `CRON_SECRET` header
- [ ] Admin routes protected (`/admin/*`)
- [ ] Host routes require authentication (`/host/*`)
- [ ] RLS policies prevent unauthorized edits
- [ ] No API keys exposed in client code

---

### ☐ 7. Performance Check

- [ ] Webhook endpoint responds < 3s
- [ ] Property edit saves < 2s
- [ ] Analytics page loads < 4s
- [ ] Cron job processes all properties < 10s
- [ ] Database queries optimized with indexes

---

### ☐ 8. Monitoring Setup

#### Vercel:
- [ ] Function logs enabled
- [ ] Error tracking active
- [ ] Cron job monitoring on

#### Stripe:
- [ ] Webhook delivery monitoring
- [ ] Failed payment alerts
- [ ] Subscription metrics dashboard

#### Resend:
- [ ] Email delivery tracking
- [ ] Bounce rate monitoring
- [ ] Spam complaint alerts

#### Sentry (Optional):
- [ ] Error tracking configured
- [ ] Performance monitoring on
- [ ] Alerts set up

---

## Deployment

### ☐ 9. Deploy to Production

```bash
# Push to main branch (if using Git deploy)
git push origin main

# Or deploy via Vercel CLI
vercel --prod
```

**Verify:**
- [ ] Build succeeds
- [ ] No deployment errors
- [ ] Environment variables loaded
- [ ] All routes accessible

---

### ☐ 10. Post-Deployment Verification

#### Immediately After Deploy:

1. **Homepage:**
   - [ ] Loads without errors
   - [ ] Navigation works

2. **For Hosts Page:**
   - [ ] `/for-hosts` renders correctly
   - [ ] Floating promo displays
   - [ ] All CTAs link properly

3. **Host Dashboard:**
   - [ ] Login works
   - [ ] Dashboard displays
   - [ ] Property list shows
   - [ ] Analytics page loads

4. **Property Editing:**
   - [ ] Edit page accessible
   - [ ] All tabs functional
   - [ ] Save actions work

5. **Stripe Integration:**
   - [ ] Billing page loads
   - [ ] Checkout redirects properly
   - [ ] Webhooks receiving events

6. **Emails:**
   - [ ] Test submission notification
   - [ ] Test approval email
   - [ ] Test trial reminder

#### Within 24 Hours:

- [ ] Monitor webhook delivery rate (should be 100%)
- [ ] Check cron job executed successfully
- [ ] Review function logs for errors
- [ ] Verify no failed payments
- [ ] Check email delivery rate

#### Within 1 Week:

- [ ] Monitor trial → paid conversion rate
- [ ] Track property edit usage
- [ ] Review analytics page engagement
- [ ] Check for any error patterns
- [ ] Gather host feedback

---

## Rollback Plan

If critical issues arise:

### Option 1: Quick Fix
1. Identify issue in logs
2. Push hotfix to `main`
3. Vercel auto-deploys

### Option 2: Rollback
1. Go to Vercel Dashboard → Deployments
2. Find last stable deployment
3. Click "Promote to Production"

### Option 3: Feature Flag
1. Add env var: `FEATURE_PROPERTY_EDIT=false`
2. Wrap new features in conditional
3. Disable problematic feature

---

## Success Criteria

### All Green When:
✅ Database migration complete  
✅ Environment variables set  
✅ Stripe webhooks configured  
✅ Cron jobs scheduled  
✅ End-to-end tests pass  
✅ Security review complete  
✅ Performance acceptable  
✅ Monitoring active  
✅ Production deployed  
✅ Post-deploy verification done  

---

## Support Contacts

**Technical Issues:**
- Vercel: support.vercel.com
- Stripe: support.stripe.com
- Supabase: support.supabase.com
- Resend: support@resend.com

**Emergency:**
- Check Vercel function logs first
- Review Stripe webhook logs
- Check Supabase database logs
- Contact support with specific error messages

---

## Timeline

**Pre-Deployment:** 30-45 minutes
- Database: 5 min
- Env vars: 5 min
- Stripe setup: 10 min
- Cron setup: 5 min
- Testing: 15-20 min

**Deployment:** 5-10 minutes
- Build & deploy
- Smoke tests

**Post-Deployment:** 15-20 minutes
- Verification
- Monitoring setup

**Total:** ~1 hour

---

## 🎉 Launch Checklist Complete!

Once all boxes are checked, you're ready to go live!

**Final Verification:**
```bash
# Test key endpoints
curl https://trustyourhost.com/api/health
curl https://trustyourhost.com/for-hosts
curl -H "Authorization: Bearer ${CRON_SECRET}" \
     https://trustyourhost.com/api/cron/trial-reminders
```

**If all return 200 OK → YOU'RE LIVE! 🚀**

---

## Post-Launch TODO

- [ ] Announce launch on social media
- [ ] Send email to waitlist (if any)
- [ ] Monitor first 10 signups closely
- [ ] Gather feedback from first hosts
- [ ] Schedule weekly review meeting
- [ ] Plan next feature sprint

**Documentation:** See `PRE_LAUNCH_FEATURES_COMPLETE.md` for full technical details.

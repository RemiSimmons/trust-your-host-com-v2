# Billing Setup Flow & Troubleshooting

## How It Works

When a host completes billing setup, this is the expected flow:

1. **User clicks "Complete Setup"** → Redirects to `/host/billing`
2. **Billing page creates Stripe checkout session** via `/api/stripe/create-checkout-session`
   - Includes metadata: `property_id`, `host_id`, `property_name`
3. **User completes Stripe checkout** → Stripe redirects to `/host?setup=success`
4. **Stripe sends webhook** to `/api/stripe/webhooks`
   - Event: `checkout.session.completed`
   - Updates database: `subscription_status = 'trial'`, `is_active = true`
5. **User sees dashboard** → Banner disappears, property is active

---

## Automatic Fix Mechanisms

### 1. Auto-Sync on Return (NEW ✨)

When user returns from Stripe with `?setup=success`, the dashboard automatically:

- Checks if subscription status is still `pending_payment`
- If yes, calls `/api/stripe/sync-subscription` to fetch from Stripe
- Updates database with correct status
- Refreshes page to show updated data

**Code:** `components/host/properties-grid.tsx` lines 34-49

### 2. Manual Sync Button (NEW ✨)

If auto-sync fails, a "Sync Status" button appears in the banner:

- User can click to manually trigger sync
- Shows loading spinner while syncing
- Displays error message if sync fails

### 3. Enhanced Webhook Logging (NEW ✨)

Webhook now logs detailed information for debugging:

- Session metadata received
- Subscription details from Stripe
- Database update attempts and results
- **Auto-retry** if first update fails

**Code:** `app/api/stripe/webhooks/route.ts`

---

## Common Issues & Fixes

### Issue 1: "Complete Your Billing Setup" banner won't go away

**Symptoms:**
- User completed Stripe checkout
- Stripe shows successful payment
- Dashboard still shows "Complete Your Billing Setup"

**Cause:**
- Webhook didn't fire or failed
- Database wasn't updated

**Fix:**
1. **Auto-fix:** Click "Sync Status" button (appears when `?setup=success` in URL)
2. **Manual SQL fix:**
   ```sql
   -- Check current status
   SELECT 
     pr.name,
     pr.subscription_status,
     pr.stripe_subscription_id,
     p.email
   FROM properties pr
   JOIN profiles p ON p.id = pr.host_id
   WHERE p.email = 'user@email.com';
   
   -- If subscription_status is NULL or 'pending_payment', fix it:
   UPDATE properties
   SET 
     subscription_status = 'trial',
     is_active = true,
     trial_ends_at = NOW() + INTERVAL '60 days',
     updated_at = NOW()
   WHERE host_id IN (
     SELECT id FROM profiles WHERE email = 'user@email.com'
   );
   ```

### Issue 2: Webhook is firing but database not updating

**Symptoms:**
- Stripe webhook logs show success (200 status)
- Database still shows old status

**Debug Steps:**

1. **Check Vercel/Server Logs:**
   ```
   Search for: "checkout.session.completed"
   Look for: Error messages, missing metadata warnings
   ```

2. **Check Stripe Webhook Logs:**
   - Go to: https://dashboard.stripe.com/webhooks
   - Click on your webhook endpoint
   - View recent deliveries
   - Look for the specific session ID
   - Check response body for errors

3. **Verify Metadata:**
   ```
   Should see in logs:
   {
     "propertyId": "uuid-here",
     "hostId": "uuid-here",
     "property_name": "Property Name"
   }
   
   If missing, checkout session creation is broken
   ```

**Fix:**
- Run SQL manual fix (see Issue 1)
- If repeated, check webhook secret matches `.env.local`

### Issue 3: Multiple properties, only one not syncing

**Cause:**
- Primary vs additional property pricing confusion
- Metadata missing for that specific property

**Fix:**
```sql
-- Check which property is missing subscription
SELECT 
  id,
  name,
  subscription_status,
  stripe_subscription_id,
  is_primary_property
FROM properties
WHERE host_id = 'HOST_ID_HERE';

-- Update the specific property
UPDATE properties
SET 
  subscription_status = 'trial', -- or 'active'
  is_active = true,
  trial_ends_at = NOW() + INTERVAL '60 days',
  stripe_subscription_id = 'sub_XXX', -- Get from Stripe
  stripe_customer_id = 'cus_XXX',     -- Get from Stripe
  updated_at = NOW()
WHERE id = 'PROPERTY_ID_HERE';
```

---

## Prevention Checklist

### Before Deployment:

- [ ] Verify `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
- [ ] Test webhook endpoint is reachable: `curl https://yourdomain.com/api/stripe/webhooks`
- [ ] Confirm webhook events are enabled:
  - `checkout.session.completed` ✅
  - `customer.subscription.updated` ✅
  - `customer.subscription.deleted` ✅
  - `invoice.payment_succeeded` ✅
  - `invoice.payment_failed` ✅

### After User Reports Issue:

1. **First:** Have user click "Sync Status" button
2. **Second:** Check Stripe webhook delivery logs
3. **Third:** Check Vercel/server logs for errors
4. **Last Resort:** Manual SQL update (see Issue 1)

---

## Monitoring & Alerts

### What to Monitor:

1. **Webhook Success Rate:**
   - Should be >99% success
   - Check daily: https://dashboard.stripe.com/webhooks

2. **Database Sync Lag:**
   ```sql
   -- Properties with subscription in Stripe but pending_payment in DB
   SELECT COUNT(*) 
   FROM properties 
   WHERE subscription_status = 'pending_payment' 
     AND stripe_subscription_id IS NOT NULL;
   
   -- Should always be 0
   ```

3. **Failed Sync Attempts:**
   - Check server logs for `❌ CRITICAL: Failed to update property`
   - Set up alert if this appears

### Weekly Health Check:

```sql
-- All properties should have matching Stripe IDs
SELECT 
  COUNT(*) as total_active,
  COUNT(stripe_subscription_id) as with_stripe_id,
  COUNT(*) - COUNT(stripe_subscription_id) as missing_stripe_id
FROM properties
WHERE is_active = true;

-- missing_stripe_id should be 0
```

---

## Useful Stripe Dashboard Links

- **Webhooks:** https://dashboard.stripe.com/webhooks
- **Subscriptions:** https://dashboard.stripe.com/subscriptions
- **Customers:** https://dashboard.stripe.com/customers
- **Logs:** https://dashboard.stripe.com/logs

---

## Code References

| File | Purpose |
|------|---------|
| `app/api/stripe/create-checkout-session/route.ts` | Creates Stripe checkout with metadata |
| `app/api/stripe/webhooks/route.ts` | Receives Stripe events, updates database |
| `app/api/stripe/sync-subscription/route.ts` | **NEW:** Fallback sync endpoint |
| `components/host/properties-grid.tsx` | **NEW:** Auto-sync on page load |

---

## Quick Reference: SQL Queries

### Check User's Subscription Status
```sql
SELECT 
  p.email,
  p.full_name,
  pr.name as property_name,
  pr.subscription_status,
  pr.stripe_subscription_id,
  pr.is_active,
  pr.trial_ends_at
FROM profiles p
JOIN properties pr ON pr.host_id = p.id
WHERE p.email = 'user@email.com';
```

### Fix Pending Payment (Emergency)
```sql
UPDATE properties
SET 
  subscription_status = 'trial',
  is_active = true,
  trial_ends_at = NOW() + INTERVAL '60 days'
WHERE host_id IN (
  SELECT id FROM profiles WHERE email = 'user@email.com'
);
```

### Get Stripe IDs from Database
```sql
SELECT 
  stripe_customer_id,
  stripe_subscription_id
FROM properties
WHERE host_id IN (
  SELECT id FROM profiles WHERE email = 'user@email.com'
);
```

---

**Last Updated:** Feb 4, 2026  
**Version:** 2.0 (Auto-sync enabled)

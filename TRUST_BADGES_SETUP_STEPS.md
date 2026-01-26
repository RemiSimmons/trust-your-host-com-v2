# Trust Badges - Setup Steps (No Errors!)

## Step-by-Step Instructions

### Step 1: Run Database Migration ✅

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "New query"

3. **Copy & Paste Migration**
   - Open: `/scripts/add-trust-badges.sql`
   - Copy entire file
   - Paste into SQL Editor
   - Click "Run"

**Expected Result:** 
```
Success. No rows returned
```

4. **Verify Columns Added**
   ```sql
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'properties' 
   AND column_name IN (
     'verified_badge', 
     'fifa_featured', 
     'quick_response_host', 
     'distance_to_stadium',
     'weekly_views'
   );
   ```

Should return 5 rows.

---

### Step 2: Assign Initial Badges ✅

Use the **FIXED SQL** in `/scripts/assign-initial-badges.sql`

#### Option A: Manual Assignment (Safest)

```sql
-- 1. Find your best properties
SELECT id, name, city, total_clicks 
FROM properties 
ORDER BY total_clicks DESC NULLS LAST 
LIMIT 10;

-- 2. Copy the IDs you want to verify

-- 3. Mark them as verified (replace with actual IDs)
UPDATE properties 
SET verified_badge = true 
WHERE id IN (
  'actual-property-id-here',
  'another-property-id-here'
);
```

#### Option B: Auto-assign Top Properties

```sql
-- Mark top 5 properties as verified
UPDATE properties 
SET verified_badge = true 
WHERE id IN (
  SELECT id 
  FROM properties 
  ORDER BY total_clicks DESC NULLS LAST 
  LIMIT 5
);
```

#### Option C: Auto-assign FIFA Featured

```sql
-- Feature top 3 FIFA properties per city
WITH ranked_fifa AS (
  SELECT 
    id,
    city,
    ROW_NUMBER() OVER (
      PARTITION BY city 
      ORDER BY total_clicks DESC NULLS LAST
    ) as rank
  FROM properties 
  WHERE is_fifa_2026 = true
)
UPDATE properties p
SET fifa_featured = true
FROM ranked_fifa r
WHERE p.id = r.id AND r.rank <= 3;
```

---

### Step 3: Verify Badges Were Assigned ✅

```sql
-- Count badges
SELECT 
  COUNT(*) as total_properties,
  COUNT(*) FILTER (WHERE verified_badge = true) as verified,
  COUNT(*) FILTER (WHERE fifa_featured = true) as fifa_featured,
  COUNT(*) FILTER (WHERE quick_response_host = true) as quick_response
FROM properties;
```

**Expected:** You should see some properties with badges now!

---

### Step 4: View Properties with Badges ✅

```sql
SELECT 
  name,
  city,
  verified_badge,
  fifa_featured,
  quick_response_host
FROM properties 
WHERE verified_badge = true 
   OR fifa_featured = true 
   OR quick_response_host = true;
```

---

## Common Errors & Fixes

### ❌ Error: "syntax error at or near LIMIT"

**Problem:** Can't use `LIMIT` directly in `UPDATE`

**Fix:** Use subquery instead:
```sql
-- WRONG ❌
UPDATE properties SET verified_badge = true LIMIT 5;

-- CORRECT ✅
UPDATE properties 
SET verified_badge = true 
WHERE id IN (
  SELECT id FROM properties LIMIT 5
);
```

---

### ❌ Error: "column does not exist"

**Problem:** Migration didn't run yet

**Fix:** Run `/scripts/add-trust-badges.sql` first

---

### ❌ Error: "permission denied"

**Problem:** Not using service role key

**Fix:** Make sure you're logged into Supabase dashboard with proper access

---

## Stripe Price ID Setup

### Current Status:
```env
STRIPE_PRICE_ID=price_xxxxx  ← Placeholder, needs real ID
```

### How to Get Real Price ID:

1. **Go to Stripe Dashboard**
   - https://dashboard.stripe.com/test/products (test mode)
   - OR https://dashboard.stripe.com/products (live mode)

2. **Create Product** (if you haven't)
   - Click "+ Add product"
   - Name: `TrustYourHost Property Listing`
   - Description: `Monthly subscription for property visibility`

3. **Add Recurring Price**
   - Click "Add price"
   - Model: Recurring
   - Amount: $49.00
   - Billing period: Monthly
   - Click "Add price"

4. **Copy Price ID**
   - Look for the ID that starts with `price_`
   - Example: `price_1OabcdEF2GHI3jkl4MNO5pqr`
   - Click to copy

5. **Update .env.local**
   ```env
   # Replace this:
   STRIPE_PRICE_ID=price_xxxxx
   
   # With your actual ID:
   STRIPE_PRICE_ID=price_1OabcdEF2GHI3jkl4MNO5pqr
   ```

6. **Restart Dev Server**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

### Verify Stripe Setup:

```bash
# Check if price exists in Stripe
curl https://api.stripe.com/v1/prices/price_YOUR_ID_HERE \
  -u sk_test_YOUR_SECRET_KEY:
```

---

## Quick Test Checklist

After setup, test this:

- [ ] Database migration ran successfully
- [ ] At least 5 properties have badges
- [ ] Can see badges in SQL query
- [ ] Stripe Price ID is real (not placeholder)
- [ ] Dev server restarted
- [ ] Homepage loads without errors
- [ ] Property cards show badges ✨

---

## Need to Start Over?

If something went wrong, you can reset:

```sql
-- Remove all badges
UPDATE properties 
SET 
  verified_badge = false,
  fifa_featured = false,
  quick_response_host = false,
  distance_to_stadium = NULL,
  weekly_views = 0;
```

Then start again from Step 2.

---

## Next Steps After Setup

1. **Award more badges gradually**
   - Add 2-3 verified badges per day
   - Feature 3-5 properties per FIFA city
   
2. **Set distances for FIFA properties**
   ```sql
   UPDATE properties 
   SET distance_to_stadium = 1.5 
   WHERE city = 'Atlanta' AND is_fifa_2026 = true;
   ```

3. **Test on frontend**
   - Visit http://localhost:3001
   - Check property cards
   - Badges should be visible!

4. **Monitor impact**
   - Track click-through rates
   - Compare verified vs non-verified
   - Adjust strategy

---

## Summary

**Migration:** `/scripts/add-trust-badges.sql` (adds columns)  
**Assignment:** `/scripts/assign-initial-badges.sql` (assigns badges)  
**Stripe Price ID:** Get from Stripe Dashboard, update .env.local

**Any errors?** Check "Common Errors & Fixes" section above.

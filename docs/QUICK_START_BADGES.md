# Quick Start - Trust Badges (2 Minutes)

## Fix 1: Get Correct Stripe Price ID

### You Have (WRONG):
```env
STRIPE_PRICE_ID=prod_Tq5tGubFxl9xX7  ❌ Product ID
```

### You Need (CORRECT):
```env
STRIPE_PRICE_ID=price_1OabcdEF2GHI...  ✅ Price ID
```

### How to Find It:

1. **Go to Stripe Dashboard**
   - Test mode: https://dashboard.stripe.com/test/products
   - Live mode: https://dashboard.stripe.com/products

2. **Click on your product**
   - "TrustYourHost Property Listing" or similar

3. **Scroll to "Pricing" section**
   ```
   Pricing
   ├─ $49.00 / month  ← Your recurring price
   │  └─ API ID: price_1O2jK...  ← COPY THIS!
   ```

4. **Click the price to see details**
   - The ID at the top starts with `price_`
   - Click to copy

5. **Update .env.local**
   ```env
   STRIPE_PRICE_ID=price_1O2jK3B1CN3ZwMvJabcdefgh
   ```

6. **Restart server**
   ```bash
   # Kill current server (Ctrl+C)
   npm run dev
   ```

---

## Fix 2: Run Error-Free SQL

### ✅ Use This File (NO ERRORS):
`/scripts/assign-badges-safe.sql`

### Steps:

1. **Open Supabase SQL Editor**
   - https://supabase.com/dashboard
   - Select your project
   - Click "SQL Editor" → "New query"

2. **Run Migration First (if not done)**
   ```sql
   -- Copy entire content from:
   /scripts/add-trust-badges.sql
   
   -- Paste and click "Run"
   ```
   
   **Expected:** "Success. No rows returned"

3. **Then Assign Badges**
   ```sql
   -- Copy entire content from:
   /scripts/assign-badges-safe.sql
   
   -- Paste and click "Run"
   ```
   
   **Expected:** Multiple "Success" messages

4. **Check Results**
   - Scroll to bottom
   - Should see table with properties + badges
   - Example:
   ```
   name               city      ✓    🏆   ⚡   📍 mi  👀
   Luxury Villa       Atlanta   t    t    t    2.0    45
   Beach House        Miami     t    f    t    1.5    32
   ```

---

## Quick Verification

After running SQL, verify badges work:

```sql
-- Quick check
SELECT 
  name,
  city,
  verified_badge,
  fifa_featured
FROM properties 
WHERE verified_badge = true 
LIMIT 5;
```

**Should return:** 5 properties with `verified_badge = true`

---

## Common Mistakes

### ❌ Mistake 1: Product ID instead of Price ID
```env
STRIPE_PRICE_ID=prod_...  ← WRONG (Product)
STRIPE_PRICE_ID=price_... ← CORRECT (Price)
```

### ❌ Mistake 2: Using old SQL with LIMIT bug
```sql
-- OLD (has errors)
/scripts/assign-initial-badges.sql  ❌

-- NEW (no errors)
/scripts/assign-badges-safe.sql  ✅
```

### ❌ Mistake 3: Not restarting server
After changing .env.local:
```bash
# Must restart!
npm run dev
```

---

## Test Everything Works

### 1. Check Database:
```sql
SELECT COUNT(*) FROM properties WHERE verified_badge = true;
-- Should return: 5
```

### 2. Check Frontend:
- Go to: http://localhost:3001
- Look at property cards
- Should see badges: ✅ 🏆 ⚡

### 3. Check Stripe:
- Approval workflow will work now
- Can create subscriptions
- No "invalid price ID" errors

---

## Summary

**Fix #1:** Get Price ID from Stripe (starts with `price_`)  
**Fix #2:** Use `/scripts/assign-badges-safe.sql` (no errors)  
**Verify:** See badges in database and on homepage

**Time:** ~2 minutes total

---

## Still Getting Errors?

### Error: "column does not exist"
→ Run `/scripts/add-trust-badges.sql` first

### Error: "syntax error at LIMIT"  
→ Use `/scripts/assign-badges-safe.sql` (fixed version)

### Error: "No such price: prod_..."
→ Use Price ID (starts with `price_`) not Product ID

### Badges don't show on homepage
→ Restart dev server: `npm run dev`

---

Need help? Check:
- `TRUST_BADGES_SETUP_STEPS.md` - Detailed guide
- `TRUST_SYSTEM_GUIDE.md` - Full documentation

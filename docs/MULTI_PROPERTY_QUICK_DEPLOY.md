# Multi-Property & Change Requests - Quick Deploy Guide ⚡

## 5-Minute Setup

### Step 1: Database (2 minutes)
```bash
# In Supabase SQL Editor, run:
scripts/add-multi-property-support.sql
```

**Verify:** Check that these tables/columns exist:
- `property_change_requests` table
- `properties.is_primary_property`
- `properties.monthly_amount`
- `profiles.property_count`

---

### Step 2: Stripe Additional Price (2 minutes)

1. **Go to:** [Stripe Dashboard → Products](https://dashboard.stripe.com/products)

2. **Find:** Your existing "TrustYourHost Listing" product

3. **Add New Price:**
   - Amount: **$39.00**
   - Billing period: **Monthly**
   - Currency: **USD**

4. **Copy Price ID:** `price_1XYZ...`

5. **Add to Environment:**
   ```env
   STRIPE_ADDITIONAL_PRICE_ID=price_1XYZ...
   ```

---

### Step 3: Deploy (1 minute)

```bash
# Push to production
git push origin main

# Or deploy via Vercel CLI
vercel --prod
```

---

## ✅ Post-Deploy Verification (2 minutes)

### Test 1: Multi-Property Dashboard
```
1. Log in as host with 1 property
2. Go to /host
3. Verify: Property grid displays
4. Verify: "Add Property" button visible
5. Verify: Pricing info banner shows "$49/month"
```

### Test 2: Volume Pricing
```
1. Submit 2nd property via /submit-property
2. Admin approves in /admin/submissions
3. Verify: monthly_amount = $39.00
4. Verify: is_primary_property = false
5. Host sets up billing
6. Verify: No trial period (immediate charge)
7. Dashboard shows: "Total: $88/mo"
```

### Test 3: Property Editing
```
1. Go to /host/properties/[id]/edit
2. Tab 1 (GREEN): Edit description → Saves instantly
3. Tab 2 (YELLOW): Change property name → Creates change request
4. Tab 3 (RED/GRAY): View-only system fields
5. Admin goes to /admin/change-requests
6. Approve change request
7. Verify: Property name updated
```

---

## 🚨 Troubleshooting

### Issue: "No approved property pending billing setup"
**Solution:** Ensure property has `subscription_status = 'pending_payment'` after admin approval

### Issue: Additional property getting trial
**Solution:** Verify `STRIPE_ADDITIONAL_PRICE_ID` is set and `is_primary_property = false`

### Issue: Change requests not showing in admin
**Solution:** Check RLS policies on `property_change_requests` table

### Issue: Can't approve change request
**Solution:** Verify admin role in `profiles.role = 'admin'`

---

## 📊 Quick Reference

### Pricing Structure
| Property | Monthly Cost | Trial Period |
|----------|--------------|--------------|
| 1st      | $49          | 60 days      |
| 2nd      | $39          | None         |
| 3rd+     | $39 each     | None         |

### Edit Permissions
| Color | Permission | Approval | Examples |
|-------|------------|----------|----------|
| 🟢 Green | Instant | No | Description, pricing, photos |
| 🟡 Yellow | Requires Approval | Yes | Name, address, capacity |
| 🔴 Red | System Only | N/A | Verification, badges |

---

## 🎯 Expected Results

After successful deployment:

✅ **Hosts can:**
- Manage multiple properties from one account
- See combined analytics
- Edit properties with visual permission indicators
- Pay $39/month for additional properties
- Track pending change requests

✅ **Admins can:**
- Review property change requests
- See side-by-side comparisons
- Approve/reject with notes
- Track change history

✅ **System automatically:**
- Calculates volume pricing
- Applies correct Stripe price
- Tracks primary vs. additional properties
- Updates property count per host

---

## 📞 Need Help?

- **Documentation:** `MULTI_PROPERTY_COMPLETE.md` (full details)
- **Database Migration:** `scripts/add-multi-property-support.sql`
- **Issues:** Check terminal/Vercel logs first

---

**Total Setup Time:** ~10 minutes
**Features Added:** Multi-property support + Change request system
**Ready:** Production deployment! 🚀

# Billing Setup Flow - Payment After Approval ✅

## Summary
Implemented a low-friction signup flow where hosts only enter payment information AFTER their property is approved. This reduces signup friction and ensures only approved hosts provide payment details.

---

## 🎯 Flow Overview

```
1. Host Submits Property
   ↓ (no payment info required)
   
2. Admin Reviews & Approves
   ↓
   
3. Approval Email Sent
   - "Congratulations! Property approved"
   - "Set up billing to activate listing"
   - Big CTA: "Activate My Listing Now" → /host/billing
   ↓
   
4. Host Clicks Link → Billing Setup Page
   - Shows $49/month pricing
   - Emphasizes 60-day FREE trial
   - "Due today: $0.00"
   - CTA: "Activate My Listing"
   ↓
   
5. Stripe Checkout Opens
   - Secure payment form
   - Card info collected
   - Creates subscription with 60-day trial
   ↓
   
6. Success!
   - Property goes live immediately
   - Trial countdown starts (60 days)
   - First charge in 60 days
```

---

## 📄 Files Created

### 1. `/app/host/billing/page.tsx`
**Billing Setup Page**

**Features:**
- ✅ Shows approval congratulations message
- ✅ Clear pricing breakdown ($49/month)
- ✅ Emphasizes $0 due today
- ✅ 60-day trial highlighted
- ✅ What happens next (bullet points)
- ✅ FAQ section (when charged, cancellation, etc.)
- ✅ "Activate My Listing" CTA button
- ✅ Powered by Stripe badge

**Security:**
- Requires authentication (redirects to /host/login if not logged in)
- Checks for existing subscription (redirects to /host if already set up)
- Verifies host has an approved property

**User Experience:**
- Clean, trustworthy design
- Green "approved" banner
- Blue trial benefits card
- Clear call-to-action
- Mobile responsive

### 2. `/app/api/stripe/create-checkout-session/route.ts`
**Stripe Checkout API**

**What It Does:**
- Authenticates the user
- Gets host profile and property info
- Creates Stripe Checkout Session with:
  - 60-day trial
  - $49/month subscription
  - Metadata (host_id, property_id, property_name)
  - Success URL: `/host?setup=success`
  - Cancel URL: `/host/billing?canceled=true`

**Security:**
- Server-side only (no client access to Stripe secret key)
- Validates user authentication
- Checks for approved property
- Includes proper error handling

---

## 🔄 Updated Files

### 1. `/app/admin/submissions/actions.ts`
**Approval Process Changes**

**REMOVED:**
- ❌ Stripe customer creation at approval
- ❌ Stripe subscription creation at approval
- ❌ Trial countdown at approval

**ADDED:**
- ✅ Property created with `subscription_status: 'pending_payment'`
- ✅ `stripe_subscription_id: null` (set by webhook later)
- ✅ `stripe_customer_id: null` (set by webhook later)
- ✅ `trial_ends_at: null` (set when billing configured)
- ✅ `billingSetupUrl` passed to approval email

**Why:**
- Hosts only enter payment AFTER approval
- Reduces friction in submission process
- Only approved hosts provide credit cards

### 2. `/lib/email/resend.ts`
**Approval Email Template**

**New Email Content:**
```
Subject: 🎉 [Property Name] is Approved! Set up billing to go live

Body:
- Congratulations message
- ⚡ "One More Step: Set Up Billing" (yellow callout)
- 🎁 60-Day Free Trial benefits (blue box):
  • $0 due today
  • Property goes live immediately
  • $49/month after trial
  • Cancel anytime
  • Keep 100% of revenue
- Big orange CTA: "Activate My Listing Now"
- What happens next (numbered list)
- Link to host portal
- Questions? Contact info
- Stripe security badge
```

**Design:**
- HTML email with inline styles
- Color-coded callout boxes
- Prominent CTA button
- Professional, trustworthy layout
- Mobile-friendly

---

## 💳 Stripe Integration

### Checkout Session Configuration

```typescript
stripe.checkout.sessions.create({
  mode: 'subscription',
  payment_method_types: ['card'],
  customer_email: host.email,
  line_items: [{
    price: process.env.STRIPE_PRICE_ID, // $49/month
    quantity: 1,
  }],
  subscription_data: {
    trial_period_days: 60,
    metadata: {
      host_id: user.id,
      property_id: property.id,
      property_name: property.name,
    },
  },
  success_url: '/host?setup=success',
  cancel_url: '/host/billing?canceled=true',
  allow_promotion_codes: true, // Optional promo codes
})
```

### What Stripe Handles:
- ✅ Secure card collection
- ✅ PCI compliance
- ✅ Trial countdown (60 days)
- ✅ Automatic billing after trial
- ✅ Failed payment retries
- ✅ Customer portal for card updates

---

## 🔒 Security & Validation

### Billing Page (`/host/billing`):
1. **Authentication Check:**
   ```typescript
   const { data: { user } } = await supabase.auth.getUser()
   if (!user) redirect('/host/login')
   ```

2. **Property Check:**
   ```typescript
   const { data: property } = await supabase
     .from('properties')
     .select('*')
     .eq('host_id', user.id)
     .single()
   
   if (!property) {
     // No approved property found
   }
   ```

3. **Duplicate Prevention:**
   ```typescript
   if (property?.stripe_subscription_id) {
     redirect('/host') // Already set up
   }
   ```

### Checkout API (`/api/stripe/create-checkout-session`):
1. **Server-Side Auth:**
   - Validates Supabase session
   - Only authenticated users can create sessions

2. **Property Validation:**
   - Ensures user has an approved property
   - Returns 404 if no property found

3. **Error Handling:**
   - Catches Stripe API errors
   - Returns proper HTTP status codes
   - Logs errors for debugging

---

## 📧 Email Flow

### Approval Email Sent:
```
From: TrustYourHost <hello@trustyourhost.com>
To: host@example.com
Subject: 🎉 Sunset Villa is Approved! Set up billing to go live

[Congratulations message]
[Trial benefits]
[Big CTA: "Activate My Listing Now"]
```

### Host Clicks CTA:
- Opens: `trustyourhost.com/host/billing`
- Sees billing setup page
- Clicks "Activate My Listing"

### Stripe Checkout Opens:
- Secure payment form
- Collects card details
- Shows trial terms
- $0 due today

### Success:
- Redirects to: `/host?setup=success`
- Property now has `stripe_subscription_id`
- Property status updated to `trial`
- Trial ends in 60 days

---

## 🎨 User Experience

### Before (Old Flow):
```
1. Host submits property
   ❌ Must enter credit card upfront
   ❌ High friction
   ❌ Card charged before approval

2. Admin approves
   ✅ Property goes live

3. Trial starts immediately
```

### After (New Flow):
```
1. Host submits property
   ✅ No payment info required
   ✅ Low friction
   ✅ Quick signup

2. Admin approves
   ✅ Sends email with billing link

3. Host sets up billing when ready
   ✅ Only approved hosts enter cards
   ✅ Clear trial terms
   ✅ $0 due today emphasized

4. Property goes live immediately
```

---

## 🧪 Testing Checklist

### 1. Submission Flow:
- [ ] Submit property without payment info
- [ ] Verify submission saves correctly
- [ ] Check admin sees submission

### 2. Approval Flow:
- [ ] Admin approves property
- [ ] Check property created with `subscription_status: 'pending_payment'`
- [ ] Verify `stripe_subscription_id` is null
- [ ] Confirm approval email sent
- [ ] Check email includes billing setup link

### 3. Billing Setup Page:
- [ ] Visit `/host/billing`
- [ ] Verify authentication required
- [ ] Check page loads with correct property info
- [ ] See "approved" banner
- [ ] Trial end date calculated correctly
- [ ] FAQ section displays

### 4. Stripe Checkout:
- [ ] Click "Activate My Listing"
- [ ] Stripe Checkout opens
- [ ] Use test card: `4242 4242 4242 4242`
- [ ] Enter any future expiry date
- [ ] Enter any 3-digit CVC
- [ ] Complete checkout

### 5. Success:
- [ ] Redirects to `/host?setup=success`
- [ ] Property now has `stripe_subscription_id`
- [ ] Subscription status updated to `trial`
- [ ] Trial end date set (60 days)

### 6. Duplicate Prevention:
- [ ] Try visiting `/host/billing` again
- [ ] Should redirect to `/host` (already set up)

---

## 🔧 Stripe Test Cards

### Success:
- **Card:** `4242 4242 4242 4242`
- **Expiry:** Any future date
- **CVC:** Any 3 digits

### Declined:
- **Card:** `4000 0000 0000 0002`

### Insufficient Funds:
- **Card:** `4000 0000 0000 9995`

### More test cards:** https://stripe.com/docs/testing

---

## 📊 Database States

### After Submission:
```sql
-- property_submissions table
status: 'pending'
```

### After Approval (Before Billing Setup):
```sql
-- properties table
subscription_status: 'pending_payment'
stripe_subscription_id: NULL
stripe_customer_id: NULL
trial_ends_at: NULL
verified: true
```

### After Billing Setup:
```sql
-- properties table
subscription_status: 'trial'
stripe_subscription_id: 'sub_xxx' -- Set by Stripe webhook
stripe_customer_id: 'cus_xxx'     -- Set by Stripe webhook
trial_ends_at: '2026-03-27'       -- 60 days from setup
verified: true
```

### After Trial Ends (60 days):
```sql
-- properties table
subscription_status: 'active'
trial_ends_at: '2026-03-27' (past date)
-- Stripe auto-charges $49
```

---

## 🎯 Benefits of This Flow

### For Hosts:
✅ **Lower Signup Friction** - No credit card before approval  
✅ **Build Trust** - Only enter payment after approval  
✅ **Clear Trial Terms** - $0 due today emphasized  
✅ **Control** - Set up billing when ready  
✅ **Transparency** - See exact trial end date  

### For You (TrustYourHost):
✅ **More Signups** - Reduced friction increases submissions  
✅ **Better Quality** - Only approved hosts enter cards  
✅ **Less Refunds** - Hosts know they're approved first  
✅ **Clear Process** - Approval → Billing → Live  
✅ **Professional** - Matches industry standards (like Airbnb)  

### Technical:
✅ **Stripe Checkout** - Handles all payment complexity  
✅ **PCI Compliant** - Card details never touch your servers  
✅ **Automatic Trials** - Stripe manages trial countdown  
✅ **Webhook Ready** - Subscription events update database  

---

## 🚨 Important Notes

### 1. Webhook Required (Next Step):
To fully automate this flow, you need to set up Stripe webhooks to:
- Update `stripe_subscription_id` when subscription created
- Update `stripe_customer_id` when customer created
- Update `subscription_status` when trial ends
- Handle failed payments

**Webhook Setup:**
```
Stripe Dashboard → Developers → Webhooks
→ Add endpoint: https://trustyourhost.com/api/stripe/webhook
→ Events to listen for:
  - customer.subscription.created
  - customer.subscription.updated
  - customer.subscription.deleted
  - invoice.payment_failed
```

### 2. Environment Variables Required:
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...          # $49/month price
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
RESEND_API_KEY=re_...
```

### 3. Host Dashboard Update Needed:
After billing setup, hosts should see:
- Trial status
- Days remaining
- Next billing date
- Cancel subscription button
- Update payment method button

---

## 🔄 Next Steps

### 1. Test the Flow:
```bash
# 1. Submit a test property (no payment)
# 2. Approve it in admin
# 3. Check email for billing link
# 4. Click link → goes to /host/billing
# 5. Click "Activate My Listing"
# 6. Use test card: 4242 4242 4242 4242
# 7. Complete checkout
# 8. Verify subscription created in Stripe Dashboard
```

### 2. Set Up Webhooks:
- Add webhook endpoint: `/api/stripe/webhook`
- Handle subscription events
- Update database on events

### 3. Add to Host Dashboard:
- Show trial status
- Display days remaining
- Cancel subscription button
- Update payment method link

### 4. Email Reminders:
- 7 days before trial ends
- 3 days before trial ends
- Trial ended (payment processed)

---

## 📧 Email Timing

### Approval Email:
- **When:** Immediately after admin approval
- **To:** Host email
- **CTA:** "Activate My Listing Now"
- **Link:** `/host/billing`

### Trial Reminder (Future):
- **When:** 7 days before trial ends
- **Subject:** "Your trial ends in 7 days"
- **CTA:** "Update payment method" or "Cancel"

### Trial Ending (Future):
- **When:** 3 days before trial ends
- **Subject:** "Your trial ends in 3 days"
- **CTA:** "Keep your listing active"

### Payment Processed:
- **When:** When $49 charged (after 60 days)
- **Subject:** "Payment received - $49"
- **Content:** Receipt, thank you message

---

## 🎨 Billing Page Design

### Layout:
```
┌─────────────────────────────────────────┐
│ ✅ Your property is approved! 🎉       │ ← Green banner
└─────────────────────────────────────────┘

Set Up Your Subscription
Complete your billing setup to activate

┌─────────────────────────────────────────┐
│ Subscription Details                    │
│                                         │
│ Monthly listing fee        $49/month   │
│ First 60 days                    FREE  │ ← Green text
│ ───────────────────────────────────────│
│ Due today                       $0.00  │ ← Bold, large
│                                         │
│ [Blue box: 60-Day Free Trial]          │
│ • $0 due today                          │
│ • Property goes live immediately        │
│ • First charge on Mar 27, 2026         │
│ • Cancel anytime                        │
│ • Keep 100% of revenue                 │
└─────────────────────────────────────────┘

  [Activate My Listing]  ← Big orange button

Powered by Stripe. Secure payment.

FAQ
───
• When will I be charged?
• Can I cancel anytime?
• Commission on bookings?
• Payment security?
```

---

## 💰 Pricing Breakdown (For Host)

```
Monthly Subscription:      $49/month
Trial Period:              60 days FREE
Due Today:                 $0.00
First Charge:              Mar 27, 2026
Amount:                    $49.00

What You Get:
✓ Directory listing
✓ Search visibility
✓ AI recommendations
✓ Click tracking
✓ Analytics dashboard
✓ Badge eligibility
✓ Customer support

What You Keep:
✓ 100% of booking revenue
✓ Full control of pricing
✓ Your own booking system
✓ Direct guest relationships
```

---

## 🔐 Security & Compliance

### PCI Compliance:
- ✅ Card details collected by Stripe (not us)
- ✅ Never stored on our servers
- ✅ Stripe is PCI-DSS Level 1 certified

### Data Security:
- ✅ HTTPS/TLS encryption
- ✅ Supabase database encryption
- ✅ Server-side API routes only
- ✅ Authentication required

### User Privacy:
- ✅ Email only used for transactional messages
- ✅ Card details never visible to TrustYourHost
- ✅ Hosts can delete account anytime

---

**Result:** Professional, low-friction billing setup that only requires payment AFTER approval. Hosts feel trusted, you reduce friction, and Stripe handles all the complexity! 🎉

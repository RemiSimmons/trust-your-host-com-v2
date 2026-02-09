# Property Approval & Discounts Update

**Date:** February 5, 2026  
**Summary:** Added weekly/monthly discount display on property pages, email notifications for approval workflow, and property visibility management during approval process.

---

## 🎯 Features Implemented

### 1. Weekly & Monthly Discounts on Property Detail Page

**Changes:**
- Updated `Property` type to include `weeklyDiscount` and `monthlyDiscount` in the pricing object
- Modified `PropertyCTA` component to display discount information when values are set (including 0)
- Updated database property mapper to include discount fields

**Files Modified:**
- `lib/types/index.ts` - Added discount fields to pricing interface
- `lib/db/properties.ts` - Map discount fields from database
- `components/property/property-cta.tsx` - Display discounts on property detail page

**Display Logic:**
```typescript
// Discounts only shown if value is set (including 0)
if (property.pricing.weeklyDiscount !== undefined && property.pricing.weeklyDiscount !== null) {
  // Show: "X% discount for 7+ nights"
}
if (property.pricing.monthlyDiscount !== undefined && property.pricing.monthlyDiscount !== null) {
  // Show: "X% discount for 30+ nights"
}
```

---

### 2. Email Notifications for Approval Workflow

**New Email Functions in `lib/email/resend.ts`:**

#### a. `sendPropertyChangeRequestNotification()`
- **Recipient:** Site admin (from `ADMIN_EMAIL` env var)
- **Triggered:** When host submits changes requiring approval
- **Contains:**
  - Property name and host details
  - List of requested changes
  - Link to admin change requests page
  - Note that property is temporarily hidden from search

#### b. `sendPropertyChangeApprovedNotification()`
- **Recipient:** Host who submitted changes
- **Triggered:** When admin approves property changes
- **Contains:**
  - Confirmation that changes are live
  - Optional admin notes
  - Link to host property dashboard
  - Notice that property is back in search results

#### c. `sendPropertyChangeRejectedNotification()`
- **Recipient:** Host who submitted changes
- **Triggered:** When admin rejects property changes
- **Contains:**
  - Explanation that changes were not approved
  - Admin notes with rejection reason (required)
  - Information about property status (remains live with original info)
  - Link to host property dashboard
  - Option to submit revised changes

---

### 3. Property Visibility During Approval

**Workflow:**

#### When Host Submits Changes Requiring Approval:
```typescript
// In app/host/properties/actions.ts - updatePropertyRequiresApproval()
await supabase
  .from('properties')
  .update({
    pending_changes: pendingChanges,
    approval_status: 'pending_changes',
    is_active: false, // ⬅️ Property hidden from search
    updated_at: new Date().toISOString(),
  })
  .eq('id', propertyId)

// Send email to admin
await sendPropertyChangeRequestNotification({ ... })
```

#### When Admin Approves Changes:
```typescript
// In app/admin/change-requests/actions.ts - approveChangeRequest()
await supabase
  .from('properties')
  .update({
    // Apply requested changes
    name: changes.name,
    property_type: changes.property_type,
    location: changes.location,
    capacity: changes.capacity,
    postal_code: changes.postal_code,
    
    // Reset approval status
    approval_status: 'approved',
    pending_changes: null,
    is_active: true, // ⬅️ Property visible in search again
    updated_at: new Date().toISOString(),
  })
  .eq('id', request.property_id)

// Send email to host
await sendPropertyChangeApprovedNotification({ ... })
```

#### When Admin Rejects Changes:
```typescript
// In app/admin/change-requests/actions.ts - rejectChangeRequest()
await supabase
  .from('properties')
  .update({
    approval_status: 'approved',
    pending_changes: null,
    is_active: true, // ⬅️ Property visible with ORIGINAL information
    updated_at: new Date().toISOString(),
  })
  .eq('id', request.property_id)

// Send email to host with rejection reason
await sendPropertyChangeRejectedNotification({ ... })
```

---

## 📊 Database Impact

**No schema changes required!**

All necessary columns already exist:
- `properties.pricing.weeklyDiscount` (JSONB field)
- `properties.pricing.monthlyDiscount` (JSONB field)
- `properties.is_active` (BOOLEAN)
- `properties.approval_status` (TEXT)
- `properties.pending_changes` (JSONB)
- `property_change_requests` table (created in earlier migration)

---

## 🔄 Complete Approval Workflow

### Step 1: Host Submits Changes
1. Host edits property name, location, or capacity (fields requiring approval)
2. System creates record in `property_change_requests` table
3. System sets `properties.is_active = false`
4. System sends email to admin with change details
5. Property removed from search results immediately

### Step 2: Admin Reviews
1. Admin receives email notification
2. Admin navigates to `/admin/change-requests`
3. Admin sees side-by-side comparison of current vs. requested values
4. Admin can approve or reject with notes

### Step 3a: Approval
1. Admin clicks "Approve & Apply Changes"
2. System applies changes to property
3. System sets `is_active = true`, `approval_status = 'approved'`
4. System sends approval email to host
5. Property rejoins search results with new information
6. Host receives confirmation email

### Step 3b: Rejection
1. Admin clicks "Reject Request" (requires notes)
2. System marks request as rejected
3. System sets `is_active = true`, clears `pending_changes`
4. System sends rejection email to host with reason
5. Property rejoins search results with ORIGINAL information
6. Host can submit revised changes if needed

---

## 🧪 Testing Checklist

### Weekly/Monthly Discounts
- [ ] Property with weeklyDiscount=10 shows "10% discount for 7+ nights"
- [ ] Property with monthlyDiscount=15 shows "15% discount for 30+ nights"
- [ ] Property with weeklyDiscount=0 shows "0% discount for 7+ nights"
- [ ] Property without discounts set shows no discount text
- [ ] Discounts display correctly on mobile and desktop
- [ ] Discounts appear in sticky CTA and compact CTA

### Email Notifications
- [ ] Host submits change → Admin receives email
- [ ] Admin email contains property name, host details, and changes
- [ ] Admin email has link to change requests page
- [ ] Admin approves → Host receives approval email
- [ ] Admin rejects → Host receives rejection email with reason
- [ ] Rejection email requires admin notes

### Property Visibility
- [ ] Property hidden from `/search` when pending approval
- [ ] Property hidden from homepage featured properties when pending
- [ ] Property hidden from FIFA 2026 search when pending
- [ ] Property visible again after approval
- [ ] Property visible again after rejection (with original data)
- [ ] `getProperties()` function respects `is_active` flag

### Admin Dashboard
- [ ] Pending requests appear in `/admin/change-requests`
- [ ] Side-by-side comparison displays correctly
- [ ] Approval applies changes and reactivates property
- [ ] Rejection restores property and requires notes
- [ ] Page revalidates after approval/rejection

---

## 🔧 Configuration Requirements

**Environment Variables:**
```bash
# Required for email notifications
RESEND_API_KEY=re_xxxxx
ADMIN_EMAIL=admin@trustyourhost.com
NEXT_PUBLIC_APP_URL=https://trustyourhost.com
```

**Email Templates:**
All email templates use TrustYourHost branding with orange accent color (#ea580c) and include:
- Professional HTML formatting
- Clear call-to-action buttons
- Helpful context for recipients
- Links back to relevant dashboard pages

---

## 📝 Notes for Deployment

1. **No database migration required** - All columns exist
2. **Email testing** - Verify RESEND_API_KEY is set in production
3. **Admin email** - Ensure ADMIN_EMAIL points to correct recipient
4. **Search revalidation** - Approval/rejection triggers cache revalidation for:
   - `/search`
   - `/admin/change-requests`
   - `/host/properties`
   - `/properties/[slug]`

---

## 🚀 Future Enhancements

Potential improvements for later:
- [ ] Batch approval for multiple requests
- [ ] Email digest for admins (daily summary of pending requests)
- [ ] Host notification when property is automatically paused
- [ ] Analytics tracking for approval/rejection rates
- [ ] Auto-approve certain changes for verified hosts

---

## 📚 Related Files

**Core Implementation:**
- `lib/types/index.ts` - Type definitions
- `lib/db/properties.ts` - Database queries
- `lib/email/resend.ts` - Email notifications
- `app/host/properties/actions.ts` - Host actions
- `app/admin/change-requests/actions.ts` - Admin approval actions
- `components/property/property-cta.tsx` - Discount display
- `components/admin/change-requests-list.tsx` - Admin UI

**Related Documentation:**
- `MULTI_PROPERTY_COMPLETE.md` - Original approval system setup
- `HOST_DASHBOARD_FIXES.md` - Property editing workflow
- `EMAIL_SETUP.md` - Resend email configuration

---

## ✅ Completed Features Summary

1. ✅ Weekly and monthly discounts visible on property detail pages
2. ✅ Discounts only shown when host sets a value (including 0)
3. ✅ Admin email notification when host requests changes
4. ✅ Host email notification when changes approved
5. ✅ Host email notification when changes rejected (with reason)
6. ✅ Properties hidden from search during approval process
7. ✅ Properties automatically reactivated after approval/rejection
8. ✅ Pending changes cleared appropriately
9. ✅ Approval status managed correctly throughout workflow
10. ✅ All cache paths revalidated for consistency

**Status:** ✅ COMPLETE - Ready for testing and deployment

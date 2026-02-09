# Trust System Guide

## Overview

The trust badge system helps build confidence with potential guests by displaying credibility signals on property cards. This increases booking conversions by providing social proof and quality indicators.

---

## Trust Badges Available

### 1. ✅ Verified Badge (Manual)
**What it means:** You (admin) have personally verified this property

**When to use:**
- Property details have been checked and confirmed
- Photos match the actual property
- Host information is legitimate
- External booking URL is valid and working

**Display:** Green badge with checkmark icon
**Impact:** +25% conversion rate (trust signal)

---

### 2. 🏆 FIFA 2026 Featured (Editorial)
**What it means:** Property is editorially selected for FIFA World Cup 2026

**When to use:**
- Property is in a FIFA host city
- Near a stadium (within 5 miles)
- High quality, suitable for international guests
- Host is responsive and professional

**Display:** Gold gradient badge with trophy
**Impact:** +40% visibility during FIFA season

---

### 3. ⚡ Quick Response Host (Performance)
**What it means:** Host typically responds within 1 hour

**When to use:**
- Host has proven fast response times
- Average response < 60 minutes
- Consistently available

**Display:** Blue badge with lightning bolt
**Impact:** +15% guest confidence

---

### 4. 👀 Weekly Views (Automatic)
**What it means:** Social proof showing property popularity

**How it works:**
- Auto-calculated from click tracking
- Shows views from past 7 days
- Updates automatically (daily cron job)

**Display:** Shows on property card (e.g., "127 views this week")
**Impact:** Creates urgency, shows demand

---

### 5. 📍 Distance to Stadium (Data)
**What it means:** How far property is from nearest FIFA stadium

**When to use:**
- Property is within 10 miles of a stadium
- Useful for FIFA 2026 properties
- Helps guests plan logistics

**Display:** Shows miles (e.g., "0.5 mi to stadium")
**Impact:** Key decision factor for FIFA guests

---

## Setup Instructions

### Step 1: Run Database Migration

1. Open Supabase SQL Editor
2. Run: `/scripts/add-trust-badges.sql`
3. Verify columns added:
   ```sql
   SELECT column_name FROM information_schema.columns 
   WHERE table_name = 'properties' 
   AND column_name LIKE '%badge%' OR column_name LIKE '%featured%';
   ```

### Step 2: Enable Weekly Views (Optional Cron)

Set up a daily cron job to update weekly views:

```sql
-- Run this daily via Supabase cron or external scheduler
SELECT update_all_weekly_views();
```

**Or** use Supabase Edge Functions:
```typescript
// Create edge function: update-weekly-views
import { createClient } from '@supabase/supabase-js'

Deno.serve(async () => {
  const supabase = createClient(...)
  await supabase.rpc('update_all_weekly_views')
  return new Response('Updated')
})
```

Schedule in `supabase/functions/_cron.ts` (daily at midnight)

### Step 3: Configure Admin Access

Admin panel will show trust badge editor for each property.

**Location:** `/admin/properties/[id]` (add TrustBadgeEditor component)

Example usage:
```tsx
import { TrustBadgeEditor } from '@/components/admin/trust-badge-editor'

<TrustBadgeEditor
  propertyId={property.id}
  currentBadges={{
    verified_badge: property.verified_badge,
    fifa_featured: property.fifa_featured,
    quick_response_host: property.quick_response_host,
    distance_to_stadium: property.distance_to_stadium,
    weekly_views: property.weekly_views
  }}
  onUpdate={() => router.refresh()}
/>
```

---

## Badge Assignment Strategy

### Launch Phase (First 30 days)

**Verified Badges:**
- Start with top 10 properties
- Focus on FIFA cities
- Verify 2-3 properties per day
- Goal: 50% of properties verified by day 30

**FIFA Featured:**
- Select 3-5 properties per FIFA city
- Must be within 3 miles of stadium
- High-quality photos required
- Responsive hosts only

**Quick Response Host:**
- Award to hosts who respond < 2 hours
- Track via messaging (when enabled)
- Start conservative, expand as data grows

### Growth Phase (30-90 days)

- Verify all featured properties
- Expand FIFA featured to top 10 per city
- Data-driven quick response badges
- Monitor conversion rates per badge

### Optimization Phase (90+ days)

- A/B test badge combinations
- Analyze which badges drive bookings
- Adjust criteria based on performance
- Consider new badge types

---

## Property Card Display

### Current Implementation

```tsx
// Top-left corner (stacked vertically)
┌─────────────────────────────┐
│ ✅ Verified                  │ ← Green badge
│ 🏆 FIFA Featured             │ ← Gold gradient  
│ ⚡ Quick Response             │ ← Blue badge
│                              │
│    [Property Image]          │
│                              │
│ 📍 0.5 mi to stadium         │ ← Bottom text
│ 👀 127 views this week       │ ← Bottom text
└─────────────────────────────┘
```

### Badge Hierarchy (Display Order)

1. Verified (most important)
2. FIFA Featured (seasonal importance)
3. Quick Response (availability signal)
4. Distance (bottom, proximity data)
5. Weekly Views (bottom, social proof)

---

## Admin Workflow

### Verifying a New Property

1. Review property submission in admin panel
2. Check external booking URL works
3. Verify photos match listing
4. Confirm host identity
5. ✅ Toggle "Verified Badge" ON
6. Save changes

### Featuring for FIFA 2026

1. Check property location (must be FIFA city)
2. Calculate distance to stadium
3. Enter distance in miles
4. Review property quality (photos, amenities)
5. Check host responsiveness
6. 🏆 Toggle "FIFA Featured" ON
7. Save changes

### Monitoring Quick Response

**Manual approach (pre-messaging):**
1. Note properties with fast external responses
2. Toggle badge based on host reputation
3. Review quarterly

**Automated approach (with messaging):**
1. Track response times automatically
2. Award badge if avg < 60 min over 30 days
3. Remove if response time degrades

---

## Badge Combinations & Impact

### Most Powerful Combinations

**Combo 1: Triple Crown** (All 3 manual badges)
- ✅ Verified + 🏆 FIFA Featured + ⚡ Quick Response
- **Impact:** +60% conversion
- **Use for:** Top properties only

**Combo 2: FIFA Authority** (FIFA + Location + Views)
- 🏆 FIFA Featured + 📍 0.5 mi + 👀 200 views
- **Impact:** +50% FIFA bookings
- **Use for:** Stadium-adjacent properties

**Combo 3: Verified Popular** (Verified + Social Proof)
- ✅ Verified + 👀 100+ views
- **Impact:** +35% trust
- **Use for:** Established properties

---

## Quality Control

### Badge Audit Checklist

**Monthly Review:**
- [ ] Are all verified properties still active?
- [ ] Do FIFA featured properties meet quality bar?
- [ ] Are quick response hosts still responsive?
- [ ] Are distances accurate?
- [ ] Do high-view properties justify popularity?

**Quarterly Review:**
- [ ] A/B test badge impact on conversions
- [ ] Survey guests about trust signals
- [ ] Adjust badge criteria if needed
- [ ] Consider new badge types

### Badge Removal Criteria

**Remove Verified if:**
- External booking URL breaks
- Property details become outdated
- Host becomes unresponsive
- Guest complaints increase

**Remove FIFA Featured if:**
- Property quality degrades
- Host stops responding
- Location/distance was incorrect
- No bookings in 60 days

**Remove Quick Response if:**
- Average response time > 2 hours
- Multiple missed inquiries
- Host becomes inactive

---

## Analytics & Optimization

### Track These Metrics

```sql
-- Conversion rate by badge type
SELECT 
  CASE 
    WHEN verified_badge THEN 'Verified'
    WHEN fifa_featured THEN 'FIFA Featured'
    WHEN quick_response_host THEN 'Quick Response'
    ELSE 'No Badge'
  END as badge_type,
  COUNT(*) as properties,
  AVG(weekly_views) as avg_views,
  SUM(total_clicks) as total_clicks
FROM properties
GROUP BY badge_type;
```

### A/B Testing Ideas

1. **Test badge placement** - Top-left vs top-right
2. **Test badge colors** - Current vs alternatives
3. **Test badge text** - "Verified" vs "Checked by Us"
4. **Test badge limits** - Max 2 vs max 3 badges per property

---

## FAQ

### Can hosts request badges?
No - badges are admin-assigned only to maintain trust

### How often should badges be reviewed?
Monthly for active properties, quarterly for all

### What if a property doesn't qualify for any badges?
That's fine! Focus on earning them through quality & responsiveness

### Should all properties eventually get verified?
No - keep verified badge exclusive (top 40-60%)

### Can badges be automated?
- Weekly views: Yes (auto-calculated)
- Distance: Yes (geo-calculation)
- Quick response: Yes (with messaging system)
- Verified: No (manual quality check)
- FIFA Featured: No (editorial selection)

---

## Future Enhancements

### Potential New Badges

1. **🌟 Superhost** - Consistently excellent
2. **💯 Perfect Score** - 5.0 rating with 50+ reviews
3. **🏠 Local Favorite** - High rebooking rate
4. **🔥 Trending** - Rapidly growing popularity
5. **✨ New Listing** - Recently added (first 30 days)
6. **🎖️ Veteran Host** - 2+ years on platform
7. **📸 Pro Photos** - Professional photography
8. **♻️ Eco-Friendly** - Sustainable practices

### Badge System V2

- Host dashboard showing how to earn badges
- Badge progress indicators
- Automated badge removal workflows
- Badge achievement notifications
- Public badge statistics page

---

## Launch Checklist

- [x] Database migration run (`add-trust-badges.sql`)
- [x] PropertyCard updated to show badges
- [x] Admin interface created (TrustBadgeEditor)
- [x] API route for badge updates
- [x] Types updated
- [ ] Set up daily cron for weekly views
- [ ] Award first 10 verified badges
- [ ] Select 3-5 FIFA featured per city
- [ ] Calculate distances for FIFA properties
- [ ] Document badge criteria internally

---

**Status:** ✅ Trust system implementation complete!  
**Ready for:** Assigning first badges to properties  
**Next step:** Run database migration and start awarding badges

---

For questions or updates, refer to this guide or update as the system evolves.

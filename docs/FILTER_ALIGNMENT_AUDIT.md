# Search Filter Alignment Audit

**Date:** February 3, 2026  
**Status:** CRITICAL GAPS FOUND

## Overview
Audited alignment between search filters, search utility logic, and property submission form to ensure all filterable fields are properly collected and handled.

---

## ✅ PROPERLY ALIGNED FILTERS

### 1. Price Range
- **Filter Sidebar:** ✓ Min/Max price inputs
- **Search Utility:** ✓ Filters by `property.pricing.baseNightlyRate`
- **Submission Form:** ✓ Collects `nightly_rate_min` and `nightly_rate_max`
- **Status:** ALIGNED

### 2. Bedrooms
- **Filter Sidebar:** ✓ Buttons for 0 (Any), 1+, 2+, 3+, 4+, 5+
- **Search Utility:** ✓ Filters by `property.capacity.bedrooms`
- **Submission Form:** ✓ Collects `bedrooms` field
- **Status:** ALIGNED

### 3. FIFA 2026 Event
- **Filter Sidebar:** ✓ Special Events dropdown
- **Search Utility:** ✓ Filters by `property.is_fifa_2026`
- **Submission Form:** ✓ Checkbox for FIFA availability
- **Status:** ALIGNED

### 4. Verified Properties
- **Filter Sidebar:** ✓ "Verified Only" checkbox
- **Search Utility:** ✓ Filters by `property.verified`
- **Submission Form:** N/A (admin-controlled)
- **Status:** ALIGNED (expected behavior)

---

## ❌ CRITICAL MISALIGNMENTS

### 1. EXPERIENCE CATEGORIES - COMPLETE MISMATCH

**Filter Sidebar Categories (10):**
1. Hiking & Trails
2. Wellness Retreats
3. Mountain Lodges
4. Island Getaways
5. Waterfront Escapes
6. Glamping
7. Desert Solitude
8. Adventure Sports
9. Culinary Experiences
10. Eco-Tourism

**Submission Form Categories (12):**
1. Mountain Retreats
2. Beachfront Escapes
3. Wine Country
4. Historic Charm
5. Desert Oasis
6. Lakefront Leisure
7. Urban Exploration
8. Countryside Calm
9. Island Paradise
10. Forest Hideaways
11. Ski & Snow
12. Coastal Towns

**Impact:** HIGH - Users cannot filter by categories they submitted, or filter for categories that don't exist in the database.

**Resolution Required:** Standardize to ONE master list and update both files.

---

### 2. AMENITIES - PARTIAL MISMATCH

**Filter Sidebar Amenities (10):**
1. Hot Tub ✓
2. Pool ✓
3. Wifi ✓
4. Kitchen ✓
5. Fireplace ✓
6. Mountain Views ❌ (not in submission)
7. Pet Friendly ✓
8. Washer/Dryer ✓
9. Air Conditioning ✓
10. Beach Access ❌ (not in submission)

**Submission Form Amenities (12):**
1. WiFi ✓
2. Full Kitchen ✓
3. Free Parking ❌ (not in filters)
4. Pet Friendly ✓
5. Washer/Dryer ✓
6. Air Conditioning ✓
7. Pool ✓
8. Hot Tub ✓
9. EV Charging ❌ (not in filters)
10. Fireplace ✓
11. BBQ Grill ❌ (not in filters)
12. Gym/Fitness ❌ (not in filters)

**Issues:**
- Case inconsistency: "Wifi" vs "WiFi", "Kitchen" vs "Full Kitchen"
- Submission form has 4 amenities not filterable: Free Parking, EV Charging, BBQ Grill, Gym/Fitness
- Filter sidebar has 2 amenities not collectable: Mountain Views, Beach Access

**Impact:** MEDIUM - Some amenities can't be searched, others can't be submitted.

**Resolution Required:** Create unified amenity list with exact matching strings.

---

### 3. PROPERTY TYPES - MINOR MISMATCH

**Filter Sidebar Types (8):**
1. cabin ✓
2. villa ✓
3. apartment ✓
4. lodge ✓
5. glamping ✓
6. treehouse ✓
7. historic ✓
8. unique-stay ✓

**Submission Form Types (11):**
1. villa ✓
2. cabin ✓
3. apartment ✓
4. house ❌ (not filterable)
5. townhouse ❌ (not filterable)
6. lodge ✓
7. glamping ✓
8. treehouse ✓
9. historic ✓
10. unique-stay ✓
11. other ❌ (not filterable)

**Impact:** LOW-MEDIUM - Properties submitted as "house", "townhouse", or "other" cannot be filtered.

**Resolution Required:** Add missing types to filter sidebar.

---

### 4. PET FRIENDLY - LOGIC INCONSISTENCY

**Filter Sidebar:** Checkbox for "Pet Friendly"

**Search Utility:** Checks `property.capacity.allowsPets`

**Submission Form:** "Pet Friendly" collected as an **amenity**, not as a capacity field

**Impact:** MEDIUM - Pet friendly filtering might fail if:
- Property stores "Pet Friendly" in amenities array only
- Search expects boolean `capacity.allowsPets` field

**Resolution Required:** Clarify if pet-friendly should be:
- Option A: An amenity (stored in amenities array)
- Option B: A capacity boolean (stored in capacity.allowsPets)
- Option C: Both (redundant but safe)

---

## 📋 RECOMMENDED FIXES

### Priority 1: Fix Experience Categories (CRITICAL)
Create master list and update both filter-sidebar.tsx and submission-form.tsx to use identical categories.

**Recommended Master List (12 categories):**
```typescript
const EXPERIENCE_CATEGORIES = [
  'Mountain Retreats',
  'Beachfront Escapes', 
  'Lakefront Leisure',
  'Desert Oasis',
  'Wine Country',
  'Historic Charm',
  'Urban Exploration',
  'Island Paradise',
  'Forest Hideaways',
  'Ski & Snow',
  'Wellness Retreats',
  'Adventure Sports'
]
```

### Priority 2: Standardize Amenities (HIGH)
Create master list with exact string matching.

**Recommended Master List (15 amenities):**
```typescript
const AMENITIES = [
  'WiFi',
  'Full Kitchen',
  'Pool',
  'Hot Tub',
  'Air Conditioning',
  'Fireplace',
  'Washer/Dryer',
  'Free Parking',
  'Pet Friendly',
  'EV Charging',
  'BBQ Grill',
  'Gym/Fitness',
  'Mountain Views',
  'Beach Access',
  'Workspace'
]
```

### Priority 3: Add Property Types (MEDIUM)
Add to filter-sidebar.tsx:
- house
- townhouse
- other (or map to unique-stay)

### Priority 4: Resolve Pet Friendly Logic (MEDIUM)
**Recommended approach:** Store in both places:
- Keep "Pet Friendly" as amenity (for display/filtering)
- Add `allows_pets` boolean to capacity object (for structured data)

---

## 🔧 FILES TO UPDATE

1. **components/search/filter-sidebar.tsx**
   - Update EXPERIENCE_CATEGORIES to match submission form
   - Add missing amenities
   - Add missing property types
   - Fix any case inconsistencies

2. **components/submit/submission-form.tsx**
   - Update EXPERIENCE_CATEGORIES to match filter sidebar
   - Update AMENITIES to match filter sidebar
   - Consider adding explicit pet-friendly toggle

3. **lib/utils/search.ts**
   - Verify amenity matching is case-sensitive
   - Document pet-friendly logic

4. **Create shared constants file (RECOMMENDED)**
   - `lib/data/property-constants.ts`
   - Export EXPERIENCE_CATEGORIES, AMENITIES, PROPERTY_TYPES
   - Import in all relevant files to ensure consistency

---

## ✅ NEXT STEPS

1. Create shared constants file with master lists
2. Update filter sidebar with new lists
3. Update submission form with new lists
4. Test end-to-end: submit → search → filter
5. Update any database migrations if needed
6. Document final structure

---

## 📊 SUMMARY

- **Total Filters Audited:** 10
- **Properly Aligned:** 4 ✅
- **Misaligned:** 4 ❌
- **Critical Issues:** 2 (Experiences, Amenities)
- **Medium Issues:** 2 (Property Types, Pet Friendly)

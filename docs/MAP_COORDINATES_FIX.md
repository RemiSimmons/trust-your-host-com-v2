# Map Coordinates Fix - Issue Resolved

## Problem Identified

**Issue:** Maps showing ocean/empty area instead of property location

**Root Cause:** Property in database (`Sandy Springs`) doesn't have valid coordinates in the `location` field, or coordinates are set to `0,0` or `null`.

---

## What Was Fixed

### 1. Added Coordinate Validation in Database Mapper

**File:** `lib/db/properties.ts`

**Change:** Added robust validation when mapping database properties to ensure coordinates are never null/undefined/0:

```typescript
// Before (direct mapping):
location: dbProp.location,

// After (validated mapping):
const location = dbProp.location || {}
const coordinates = location.coordinates || {}

// Default to Atlanta if coordinates are missing or invalid
const lat = coordinates.lat != null && coordinates.lat !== 0 ? coordinates.lat : 33.7490
const lng = coordinates.lng != null && coordinates.lng !== 0 ? coordinates.lng : -84.3880

location: {
  city: location.city || 'Atlanta',
  state: location.state || 'Georgia',
  country: location.country || 'USA',
  region: location.region || 'Southeast',
  coordinates: { lat, lng }
},
```

### 2. Added Debug Logging in Map Component

**File:** `components/property/property-map-view.tsx`

**Change:** Added console logging to diagnose coordinate issues:

```typescript
console.log('[PropertyMapView] Received coordinates:', { lat, lng, city })
console.log('[PropertyMapView] Using coordinates:', { validLat, validLng })
```

### 3. Created Database Fix Script

**File:** `scripts/fix-property-coordinates.sql`

**Purpose:** Updates properties in database with correct coordinates

---

## How to Fix Your Database

### Option 1: Run SQL Script (Recommended)

1. **Go to Supabase Dashboard:**
   - https://supabase.com/dashboard
   - Select project: `poknidtqjmytbwpkixmy`

2. **Open SQL Editor:**
   - Click "SQL Editor" in left sidebar
   - Click "New query"

3. **Run the fix script:**
   - Open: `scripts/fix-property-coordinates.sql`
   - Copy all contents
   - Paste into SQL Editor
   - Click "Run" (or Cmd+Enter)

4. **Verify:**
   - Script will show which properties were updated
   - Should see: "✅ Updated property coordinates"

### Option 2: Manual Update (Quick Fix)

Run this single query to fix Sandy Springs:

```sql
UPDATE properties
SET location = jsonb_set(
  jsonb_set(
    COALESCE(location, '{}'::jsonb),
    '{coordinates,lat}',
    '33.9304'::jsonb
  ),
  '{coordinates,lng}',
  '-84.3733'::jsonb
)
WHERE name ILIKE '%Sandy Springs%' OR slug ILIKE '%sandy-springs%';
```

**Sandy Springs Coordinates:**
- Latitude: `33.9304`
- Longitude: `-84.3733`

---

## Testing the Fix

### Step 1: Check Console Logs

1. Open browser DevTools (F12)
2. Go to Console tab
3. Visit: http://localhost:3000/properties/sandy-springs
4. Look for logs:
   ```
   [PropertyMapView] Received coordinates: { lat: 33.9304, lng: -84.3733, city: "Atlanta" }
   [PropertyMapView] Using coordinates: { validLat: 33.9304, validLng: -84.3733 }
   ```

### Step 2: Verify Map Display

After running the database fix:

1. **Hard refresh browser:**
   ```
   Cmd + Shift + R (Mac)
   Ctrl + Shift + R (Windows)
   ```

2. **Check map shows:**
   - ✅ Streets and roads visible
   - ✅ Orange marker pin at center
   - ✅ Semi-transparent orange circle
   - ✅ Sandy Springs area visible
   - ✅ Can pan and zoom

### Step 3: Check Other Properties

Test a few other properties to ensure they have coordinates:

```sql
-- Check all properties
SELECT 
  name,
  slug,
  location->'city' as city,
  location->'coordinates'->'lat' as lat,
  location->'coordinates'->'lng' as lng
FROM properties;
```

---

## Current Behavior

### Before Database Fix:
- Property has no coordinates or `0,0`
- Code falls back to Atlanta (33.7490, -84.3880)
- Map shows Atlanta instead of actual property location
- Console shows warning: "Using fallback coordinates"

### After Database Fix:
- Property has correct coordinates
- Map shows actual property location
- No fallback needed
- No console warnings

---

## Common Coordinates (For Reference)

Use these if you need to add more properties:

### Georgia:
- **Atlanta:** 33.7490, -84.3880
- **Sandy Springs:** 33.9304, -84.3733
- **Buckhead:** 33.8490, -84.3733
- **Midtown:** 33.7839, -84.3831

### Other Major Cities:
- **New York (Manhattan):** 40.7589, -73.9851
- **Los Angeles:** 34.0522, -118.2437
- **Miami:** 25.7617, -80.1918
- **Chicago:** 41.8781, -87.6298
- **Seattle:** 47.6062, -122.3321

---

## How to Add Coordinates to New Properties

When creating new properties, ensure the `location` JSON includes coordinates:

```json
{
  "city": "Sandy Springs",
  "state": "Georgia",
  "country": "USA",
  "region": "Southeast",
  "coordinates": {
    "lat": 33.9304,
    "lng": -84.3733
  }
}
```

**Find coordinates for any address:**
1. Google Maps: https://www.google.com/maps
2. Search for address
3. Right-click on location → "What's here?"
4. Copy lat/lng from popup

---

## Files Modified

1. ✅ `lib/db/properties.ts` - Added coordinate validation
2. ✅ `components/property/property-map-view.tsx` - Added debug logging  
3. ✅ `scripts/fix-property-coordinates.sql` - Database fix script

---

## Next Steps

1. **Run the database fix** (scripts/fix-property-coordinates.sql)
2. **Hard refresh browser** (Cmd+Shift+R)
3. **Test Sandy Springs page** - map should now show correct location
4. **Check console** - no warnings about fallback coordinates
5. **Verify other properties** - ensure they all have coordinates

---

## Troubleshooting

### If map still shows wrong location after running SQL:

1. **Check if SQL ran successfully:**
   ```sql
   SELECT name, location->'coordinates' as coords 
   FROM properties 
   WHERE slug = 'sandy-springs';
   ```
   Should show: `{"lat": 33.9304, "lng": -84.3733}`

2. **Clear browser cache completely:**
   - Chrome: Settings → Privacy → Clear browsing data
   - Or use incognito window

3. **Restart dev server:**
   ```bash
   pkill node
   npm run dev
   ```

4. **Check console for errors:**
   - F12 → Console
   - Look for any red errors
   - Check what coordinates are being used

### If database column structure is different:

Check your `location` column structure:
```sql
SELECT location FROM properties LIMIT 1;
```

If structure is different, adjust the UPDATE query accordingly.

---

## Summary

**Problem:** Property missing coordinates in database  
**Solution:** Added fallback logic + created SQL fix script  
**Status:** ✅ Fixed in code, needs database update  
**Action Required:** Run `scripts/fix-property-coordinates.sql` in Supabase

**After fix:** Maps will show correct location for all properties! 🗺️

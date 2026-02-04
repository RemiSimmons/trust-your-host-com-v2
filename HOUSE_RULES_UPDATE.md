# House Rules System Update

## Overview

Completely redesigned house rules system with both standard checkbox options and custom text fields for maximum flexibility.

---

## Features Added

### 1. Standard House Rules Checkboxes ✅

**Edit Form**: Hosts can now select from 9 standard house rules:
- ✓ No smoking
- ✓ No pets
- ✓ No parties or events
- ✓ Quiet hours (10 PM - 8 AM)
- ✓ No unregistered guests
- ✓ Respect neighbors
- ✓ Clean up after yourself
- ✓ No shoes inside
- ✓ Maximum occupancy strictly enforced

**Benefits**:
- Quick and easy for hosts to set up
- Standardized wording for consistency
- Visual checkboxes for better UX
- Commonly expected rules pre-defined

### 2. Custom House Rules Text Field ✅

**Edit Form**: Hosts can add additional custom rules in free-form text area
- For property-specific guidelines
- Flexible for unique situations
- Complements standard rules

### 3. Minimalistic Public Display ✅

**Property Detail Page**: House rules shown in elegant collapsible section
- **Collapsed by default** - doesn't overwhelm visitors
- **Arrow indicator** - rotates when expanded
- **Icon badge** - orange clock icon in circular background
- **Rule count preview** - shows number of rules before expanding
- **Smooth transition** - professional animation

**When Expanded**:
- Standard rules shown as checkmark list (✓)
- Custom rules shown below a divider
- Clean, easy to read formatting

---

## User Interface

### Edit Form Layout

```
┌─────────────────────────────────────┐
│ House Rules                         │
│ Set expectations for guests         │
├─────────────────────────────────────┤
│                                     │
│ Standard Rules                      │
│ ☑ No smoking        ☑ No pets      │
│ ☑ No parties        ☐ Quiet hours  │
│ ☐ No guests         ☐ Respect...   │
│ ...                                 │
│                                     │
│ Additional Custom Rules             │
│ ┌─────────────────────────────────┐│
│ │ Add any additional custom       ││
│ │ rules specific to your property ││
│ │                                 ││
│ └─────────────────────────────────┘│
│                                     │
└─────────────────────────────────────┘
```

### Public Display Layout

**Collapsed** (default):
```
┌─────────────────────────────────────┐
│ [icon] House Rules              →   │
│        5 rules + custom guidelines  │
└─────────────────────────────────────┘
```

**Expanded**:
```
┌─────────────────────────────────────┐
│ [icon] House Rules              ↓   │
│        5 rules + custom guidelines  │
│                                     │
│ ✓ No smoking                        │
│ ✓ No pets                           │
│ ✓ No parties or events              │
│ ✓ Quiet hours (10 PM - 8 AM)        │
│ ✓ Respect neighbors                 │
│                                     │
│ ─────────────────────────────────   │
│ Additional Guidelines:              │
│ Please remove shoes at entrance.    │
│ Guests must check in person...      │
└─────────────────────────────────────┘
```

---

## Technical Implementation

### Database Schema

**New Column**:
```sql
ALTER TABLE properties 
ADD COLUMN standard_house_rules TEXT[] DEFAULT ARRAY[]::TEXT[];
```

**Existing Column** (unchanged):
```sql
house_rules TEXT  -- Custom text rules
```

### Type Definitions

```typescript
interface Property {
  // ... other fields
  house_rules?: string              // Custom text
  standard_house_rules?: string[]   // Selected standard rules
}
```

### Data Flow

1. **Edit Form** → Collects both checkbox values and textarea
2. **Actions** → Saves both arrays and text to database
3. **Property Mapper** → Loads both fields from database
4. **Public Display** → Shows both in collapsible section

---

## Files Modified

### Components
1. ✅ `components/host/property-edit-form.tsx`
   - Added standard rules checkboxes (2-column grid)
   - Separated custom rules textarea
   - Updated form data collection

2. ✅ `components/property/house-rules-card.tsx`
   - Complete redesign with Collapsible component
   - Minimalistic arrow indicator
   - Shows standard rules as checkmark list
   - Shows custom rules below divider
   - Only displays if rules exist

### Data & Types
3. ✅ `lib/data/property-constants.ts`
   - Added `STANDARD_HOUSE_RULES` constant array
   - Added `StandardHouseRule` type

4. ✅ `lib/types/index.ts`
   - Added `standard_house_rules?: string[]` to Property interface

### Actions & Database
5. ✅ `app/host/properties/actions.ts`
   - Updated `updatePropertyInstant` to accept `standard_house_rules`
   - Saves both fields to database

6. ✅ `lib/db/properties.ts`
   - Updated property mapper to include `standard_house_rules`

### Database Migration
7. ✅ `scripts/add-standard-house-rules.sql`
   - New migration script
   - Adds column with index
   - Safe to run multiple times (IF NOT EXISTS)

---

## Database Migration

Run this command to add the new column:

```bash
psql $DATABASE_URL -f scripts/add-standard-house-rules.sql
```

Or manually:
```sql
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS standard_house_rules TEXT[] DEFAULT ARRAY[]::TEXT[];

CREATE INDEX IF NOT EXISTS idx_properties_standard_house_rules 
ON properties USING GIN(standard_house_rules);
```

---

## Testing Checklist

### Edit Form
- [ ] Navigate to host dashboard → Edit property
- [ ] Scroll to "House Rules" section
- [ ] Verify two sections: "Standard Rules" and "Additional Custom Rules"
- [ ] Check/uncheck standard rule checkboxes
- [ ] Type custom text in textarea
- [ ] Save changes
- [ ] Refresh page
- [ ] Verify both sections persist correctly

### Public Display
- [ ] View property detail page
- [ ] Scroll to "Important Information"
- [ ] Verify house rules is **collapsed by default**
- [ ] Verify shows rule count preview
- [ ] Click to expand
- [ ] Verify arrow rotates to point down
- [ ] Verify standard rules show with green checkmarks
- [ ] Verify custom rules show below divider (if present)
- [ ] Click to collapse
- [ ] Verify smooth transition

### Edge Cases
- [ ] Test with only standard rules (no custom text)
- [ ] Test with only custom text (no standard rules checked)
- [ ] Test with both standard and custom rules
- [ ] Test with no rules at all (section should not appear)

---

## Benefits

### For Hosts
1. **Faster Setup** - Check boxes instead of typing common rules
2. **Professional** - Standardized wording looks more credible
3. **Flexible** - Can still add property-specific rules
4. **Clear Organization** - Separation between standard and custom

### For Guests
1. **Quick Scan** - Collapsible doesn't overwhelm the page
2. **Easy to Read** - Checkmark list format is intuitive
3. **Consistent** - Same rules worded the same across properties
4. **Complete Info** - Both standard and custom rules visible

### For Platform
1. **Data Structure** - Can analyze which rules are most common
2. **Filtering** - Could add "No smoking" filter in future
3. **Consistency** - Reduces variations in rule descriptions
4. **Professional** - Polished UI enhances brand perception

---

## Future Enhancements

### Possible Improvements
1. **Smart Defaults** - Pre-check most common rules for new properties
2. **Rule Icons** - Add icons for each standard rule
3. **Search Filters** - "Show only pet-friendly properties"
4. **Rule Categories** - Group into Safety, Courtesy, House Policies
5. **Translations** - Standardized rules easier to translate
6. **Check-in Times** - Make check-in/out times editable
7. **Mobile Optimization** - Single column on mobile devices

---

## Deployment Steps

1. **Run database migration**:
   ```bash
   psql $DATABASE_URL -f scripts/add-standard-house-rules.sql
   ```

2. **Restart development server**:
   ```bash
   npm run dev
   ```

3. **Or deploy to production**:
   ```bash
   git add .
   git commit -m "Add standard house rules checkboxes and minimalistic public display"
   git push
   ```

4. **Test thoroughly** using checklist above

---

## Design Principles

### Minimalism
- Collapsed by default to avoid overwhelming users
- Simple arrow indicator (no fancy buttons)
- Clean typography and spacing

### Clarity
- Clear labeling: "Standard Rules" vs "Additional Custom Rules"
- Visual indicators: checkmarks for standard rules
- Divider line separates sections

### Flexibility
- Hosts can use standard rules, custom rules, or both
- Not forced to use either option
- Graceful handling of empty states

### Professionalism
- Smooth animations and transitions
- Consistent with rest of the site's design
- Mobile-responsive layout

---

**Status**: ✅ Complete and ready to deploy  
**Date**: February 4, 2026  
**Breaking Changes**: None (backward compatible)  
**Database Migration Required**: Yes (add column)

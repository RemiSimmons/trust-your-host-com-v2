# Sample Listing Watermark Update

## Problem
The "Sample Listing" label on mock property cards was too subtle:
- Small text below the image in the card footer
- Easy to miss or overlook
- Not prominent enough to clearly indicate mock/sample properties

## Solution
Replaced the subtle footer label with a **prominent diagonal watermark overlay** across the property card image.

## Implementation Details

### Visual Specifications
- **Text**: "SAMPLE LISTING" (uppercase)
- **Font**: Bold, large size (responsive)
  - Mobile: `text-3xl`
  - Tablet: `text-4xl`  
  - Desktop: `text-5xl`
- **Color**: White text
- **Rotation**: -30 degrees diagonal across the card
- **Text Shadow**: Layered shadows for readability on any background
  - `2px 2px 8px rgba(0,0,0,0.5)` (bottom-right dark shadow)
  - `-2px -2px 8px rgba(0,0,0,0.3)` (top-left lighter shadow)
- **Opacity**: 0.45 (45%) - visible but not obscuring property photo
- **Position**: Centered over the card image
- **Z-index**: 20 (above image, below hover overlay)
- **Pointer Events**: None (doesn't interfere with card interactions)
- **Spacing**: `tracking-wider` for better readability

### Code Changes

**File**: `components/home/featured-properties.tsx`

**Removed** (lines 69-78):
```tsx
{/* Sample Listing overlay - only for mock properties */}
{isMockProperty(property) && (
  <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
    <div className="bg-white/80 backdrop-blur-md border-t border-white/50 px-4 py-2">
      <span className="text-gray-800 font-medium text-xs">
        Sample Listing
      </span>
    </div>
  </div>
)}
```

**Added** (lines 69-83):
```tsx
{/* Diagonal "SAMPLE LISTING" watermark - only for mock properties */}
{isMockProperty(property) && (
  <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
    <div 
      className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider whitespace-nowrap"
      style={{
        transform: 'rotate(-30deg)',
        textShadow: '2px 2px 8px rgba(0,0,0,0.5), -2px -2px 8px rgba(0,0,0,0.3)',
        opacity: 0.45,
      }}
    >
      SAMPLE LISTING
    </div>
  </div>
)}
```

## Behavior

### Mock Properties (Sample Listings)
- ✅ Display diagonal "SAMPLE LISTING" watermark across card image
- ✅ Watermark spans most of card width
- ✅ Rotated -30 degrees
- ✅ Semi-transparent (45% opacity)
- ✅ White text with shadow for contrast
- ✅ Non-interactive (doesn't block clicks)

### Real Properties (from Supabase)
- ✅ NO watermark displayed
- ✅ Clean card appearance
- ✅ Full image visibility

## Testing Checklist

- [ ] Visit homepage → Mock properties show diagonal "SAMPLE LISTING" watermark
- [ ] Visit `/search` → Mock properties show watermark
- [ ] Verify watermark is readable on both light and dark property images
- [ ] Verify watermark doesn't block important card information
- [ ] Verify watermark doesn't interfere with:
  - Favorite button (top-right)
  - Badge overlays (top-left)
  - Card hover effects
  - Quick View button
  - View Details link
- [ ] Confirm real properties (e.g., the one with "4.8 (194 reviews)") have NO watermark
- [ ] Test on mobile, tablet, and desktop screen sizes
- [ ] Verify old "Sample Listing" footer label is completely removed

## Files Modified
- `components/home/featured-properties.tsx` - Updated PropertyCard component

## Component Reuse
The `PropertyCard` component is used throughout the application:
- Homepage featured properties
- Search results page
- Split view (map + list)
- City results groups
- Related properties sections
- Similar properties sections
- AI recommendations
- User favorites page

**All instances** will now display the diagonal watermark for mock properties automatically.

## Visual Impact
- **Before**: Subtle text label at bottom of card, easy to miss
- **After**: Bold diagonal watermark across card center, impossible to miss
- **UX**: Users immediately understand these are sample/demo listings
- **Design**: Professional watermark treatment maintains aesthetic appeal

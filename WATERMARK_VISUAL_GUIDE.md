# Sample Listing Watermark - Visual Comparison

## Before vs After

### BEFORE (Subtle Footer Label)
```
┌─────────────────────────────────────┐
│                                     │
│        Property Image               │
│                                     │
│  [Favorite ❤️]        [Badges 🏆]   │
│                                     │
│                                     │
│   Property Name          $285/night │
│   📍 Blue Ridge, GA     [Category]  │
│                                     │
├─────────────────────────────────────┤  ← Bottom Footer (Easy to Miss)
│  Sample Listing                     │  ← Small text
└─────────────────────────────────────┘
```

**Problems:**
- ❌ Subtle text at bottom
- ❌ Small font size (text-xs)
- ❌ Only visible in default state
- ❌ Easy to overlook
- ❌ Disappears on hover

---

### AFTER (Diagonal Watermark)
```
┌─────────────────────────────────────┐
│                                     │
│        Property Image      ╲        │
│                        SAMPLE╲      │
│  [Favorite ❤️]   ╲     LISTING ╲    │ ← Diagonal across center
│            ╲                    ╲   │
│        ╲                            │
│   Property Name          $285/night │
│   📍 Blue Ridge, GA     [Category]  │
│                                     │
└─────────────────────────────────────┘
```

**Improvements:**
- ✅ Bold diagonal watermark
- ✅ Large font size (text-3xl to 5xl)
- ✅ Centered over image
- ✅ Impossible to miss
- ✅ Visible in all states (default + hover)

---

## Technical Specifications

### Positioning & Layout
```css
position: absolute;
inset: 0;              /* Covers entire card */
z-index: 20;           /* Above image, below badges */
display: flex;
align-items: center;   /* Vertical center */
justify-content: center; /* Horizontal center */
pointer-events: none;  /* Doesn't block interactions */
```

### Typography & Transform
```css
font-size: clamp(1.875rem, 5vw, 3rem);  /* Responsive 3xl → 5xl */
font-weight: 700;      /* Bold */
letter-spacing: 0.05em; /* tracking-wider */
transform: rotate(-30deg); /* Diagonal */
white-space: nowrap;   /* Single line */
```

### Visual Effects
```css
color: white;
text-shadow: 
  2px 2px 8px rgba(0,0,0,0.5),    /* Dark shadow for depth */
  -2px -2px 8px rgba(0,0,0,0.3);  /* Lighter shadow for glow */
opacity: 0.45;         /* 45% transparency */
```

---

## Layering Order (Z-Index Stack)

```
z-30: Hover overlay (dark gradient + details)
z-20: Sample watermark + Favorite button + Badges  ← NEW WATERMARK HERE
z-10: Property info (name, price, location)
z-0:  Property image
```

The watermark sits at z-20, making it:
- ✅ Visible over the image
- ✅ Visible in default state
- ✅ Still visible during hover (behind dark overlay)
- ✅ Above property info text
- ✅ Same layer as badges (non-competing)

---

## Responsive Sizing

| Screen Size | Text Size | Example Dimensions |
|-------------|-----------|-------------------|
| Mobile      | text-3xl  | ~1.875rem (30px) |
| Tablet      | text-4xl  | ~2.25rem (36px)  |
| Desktop     | text-5xl  | ~3rem (48px)     |

Watermark scales proportionally with card size while maintaining readability.

---

## User Experience Flow

### 1. First Impression (Default State)
- User sees property card
- **Diagonal "SAMPLE LISTING" immediately visible**
- User understands this is a demo/sample property
- User can still see property details underneath

### 2. Hover State
- User hovers over card
- Dark gradient overlay appears with full details
- **Watermark remains visible** through semi-transparent overlay
- User can click "Quick View" or "View Details"
- Watermark doesn't interfere with buttons

### 3. Interaction
- Watermark has `pointer-events: none`
- Clicks pass through to underlying card
- All card functionality works normally
- No interference with:
  - Favorite button
  - Badge overlays
  - Quick View button
  - View Details link

---

## Accessibility Considerations

### Visual Accessibility
- ✅ High contrast (white on varied backgrounds)
- ✅ Large text size (easily readable)
- ✅ Text shadow ensures legibility on light/dark images
- ✅ 45% opacity prevents overwhelming the card

### Semantic HTML
- Watermark is presentational only
- No accessibility attributes needed (not interactive)
- Property information remains accessible
- Screen readers will announce property details normally

---

## Design Rationale

### Why Diagonal?
- Professional watermark aesthetic
- Doesn't block horizontal text (property name, price)
- Doesn't align with any card element (stands out)
- Industry standard for "sample" or "demo" indicators

### Why 45% Opacity?
- Visible enough to notice immediately
- Transparent enough to see property image
- Balances "sample" indication with property preview
- Maintains aesthetic appeal

### Why Large Text?
- Mock properties should be **obviously different**
- Prevents confusion with real listings
- Professional demo/staging standard
- Impossible to miss or overlook

---

## Real Property Behavior

Properties from Supabase database (not mock/sample):
```tsx
if (!isMockProperty(property)) {
  // NO watermark rendered
  // Clean card appearance
  // Full professional presentation
}
```

Example: Property with "4.8 (194 reviews)"
- ✅ NO watermark
- ✅ Full image visibility
- ✅ Professional appearance
- ✅ No "sample" indicators

---

## Component Reusability

The `PropertyCard` component is used in:
1. Homepage featured properties section
2. Search results page (`/search`)
3. Split view (map + list)
4. City results groups
5. Related properties sections
6. Similar properties sections  
7. AI recommendations
8. User favorites page (`/dashboard/favorites`)

**All locations** now show the diagonal watermark for mock properties automatically with this single change.

# OG Image Optimization Required ⚠️

## Current Status

✅ OG image created: `/public/og-image.png`  
⚠️ **File size: 5.1MB** (Too large!)

## Issue

The generated OG image is 5.1MB, which is:
- **Too large for optimal performance**
- **May not load on slow connections**
- **Affects page load speed**
- **Not recommended by social platforms**

## Recommended File Size

- **Ideal:** < 300KB
- **Maximum:** < 1MB
- **Facebook limit:** 8MB (but < 1MB recommended)
- **Twitter limit:** 5MB (but < 1MB recommended)

## Optimization Options

### Option 1: Online Compression (Fastest)

**Tools:**
1. **TinyPNG** - https://tinypng.com/
   - Upload `og-image.png`
   - Download compressed version
   - Replace original file

2. **Squoosh** - https://squoosh.app/
   - Upload image
   - Adjust quality slider (80-85% recommended)
   - Download optimized version

3. **ImageOptim** (Mac) - https://imageoptim.com/
   - Drag and drop image
   - Automatically optimizes
   - Lossless compression

### Option 2: Command Line (If available)

**Using ImageMagick:**
```bash
# Navigate to project directory
cd /Users/aderemisimmons/Desktop/trust-your-host-com-v2/public

# Optimize with quality 85%
convert og-image.png -quality 85 -strip og-image-optimized.png

# Replace original
mv og-image-optimized.png og-image.png
```

**Using pngquant:**
```bash
# Install (Mac)
brew install pngquant

# Optimize
pngquant --quality 80-90 og-image.png --output og-image.png --force
```

### Option 3: Convert to JPG

If PNG optimization doesn't achieve < 1MB:

```bash
# Convert to JPG with 85% quality
convert og-image.png -quality 85 -background white -flatten og-image.jpg

# Update metadata to use .jpg instead of .png
```

Then update `app/layout.tsx` and `lib/seo/metadata.ts` to use `.jpg` instead of `.png`.

## After Optimization

1. **Verify file size:**
   ```bash
   ls -lh public/og-image.png
   ```
   Should show < 1MB

2. **Check image quality:**
   - Open in browser
   - Verify text is still readable
   - Check gradient quality

3. **Test social sharing:**
   - Use Facebook Sharing Debugger
   - Verify image loads quickly
   - Check preview quality

## Alternative: Recreate with Lower Quality

If optimization tools aren't available, you can:

1. Use a design tool (Canva, Figma, etc.)
2. Create the same design
3. Export as:
   - **PNG:** Quality 80-85%
   - **JPG:** Quality 85-90%
4. Ensure dimensions: 1200x630px
5. Target file size: < 500KB

## Quick Fix Commands

**Check current size:**
```bash
ls -lh public/og-image.png
```

**After optimization, commit:**
```bash
git add public/og-image.png
git commit -m "Optimize OG image for better performance"
```

---

**Priority:** HIGH - Optimize before testing social sharing

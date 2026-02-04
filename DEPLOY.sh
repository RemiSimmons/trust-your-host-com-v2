#!/bin/bash

# ============================================
# TrustYourHost - Deployment Script
# ============================================

echo "🚀 TrustYourHost Deployment Script"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check OG image size
echo "📊 Step 1: Checking OG image size..."
if [ -f "public/og-image.png" ]; then
    SIZE=$(ls -lh public/og-image.png | awk '{print $5}')
    SIZE_BYTES=$(ls -l public/og-image.png | awk '{print $5}')
    echo "   OG Image size: $SIZE"
    
    if [ $SIZE_BYTES -gt 1048576 ]; then
        echo -e "${RED}⚠️  WARNING: OG image is > 1MB ($SIZE)${NC}"
        echo "   Recommended: Optimize to < 500KB using TinyPNG"
        echo "   URL: https://tinypng.com/"
        echo ""
        read -p "   Continue anyway? (y/n) " -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "   Deployment cancelled. Please optimize image first."
            exit 1
        fi
    else
        echo -e "   ${GREEN}✅ OG image size OK${NC}"
    fi
else
    echo -e "${YELLOW}   ⚠️  OG image not found${NC}"
fi
echo ""

# Step 2: Run type check
echo "🔍 Step 2: Running type check..."
if npx tsc --noEmit 2>&1 | grep -q "error"; then
    echo -e "${RED}❌ Type errors found${NC}"
    npx tsc --noEmit
    exit 1
else
    echo -e "${GREEN}✅ Type check passed${NC}"
fi
echo ""

# Step 3: Run linter
echo "🔍 Step 3: Running linter..."
if npm run lint 2>&1 | grep -q "Error"; then
    echo -e "${RED}❌ Linter errors found${NC}"
    npm run lint
    exit 1
else
    echo -e "${GREEN}✅ Linter passed${NC}"
fi
echo ""

# Step 4: Build check
echo "🏗️  Step 4: Running build check..."
if npm run build; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi
echo ""

# Step 5: Git status
echo "📝 Step 5: Checking git status..."
git status --short
echo ""

# Step 6: Confirm deployment
echo "🎯 Ready to deploy!"
echo ""
echo "Changes include:"
echo "  - Mobile view improvements (navigation, touch targets)"
echo "  - Open Graph tags and SEO enhancements"
echo "  - NAP consistency (footer, schema)"
echo "  - Gallery swipe gestures"
echo "  - Property card improvements"
echo ""
read -p "Proceed with git commit and push? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 1
fi
echo ""

# Step 7: Git add
echo "📦 Step 7: Staging all changes..."
git add .
echo -e "${GREEN}✅ Changes staged${NC}"
echo ""

# Step 8: Git commit
echo "💾 Step 8: Creating commit..."
git commit -m "Major update: Mobile improvements, SEO enhancements, and NAP consistency

Mobile View Improvements:
- Add mobile navigation to host dashboard (sidebar Sheet + hamburger menu)
- Enhance touch targets across site (44px minimum for WCAG compliance)
- Add gallery swipe gestures for touch devices
- Improve property card image aspect ratios
- Optimize form inputs (44px height)
- Add responsive text sizing for property cards

SEO & Open Graph:
- Add default OG tags to root layout
- Create default OG image (1200x630px)
- Update 7 static pages with SEO helper functions
- Add Twitter Card support site-wide
- Implement title templating

NAP Consistency:
- Add contact section to footer (email, phone, location)
- Enhance organization schema with telephone and address
- Add schema markup to contact page
- Ensure 100% NAP consistency across site

Gallery & Cards:
- Add touch/swipe navigation to image lightbox
- Change property cards from fixed height to aspect ratios

Documentation:
- Add 11 comprehensive guides
- Create deployment checklist

Files modified: 26 code files, 1 asset, 1 script
All changes linted and type-checked"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Commit created${NC}"
else
    echo -e "${RED}❌ Commit failed${NC}"
    exit 1
fi
echo ""

# Step 9: Git push
echo "🚀 Step 9: Pushing to remote..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Successfully pushed to remote!${NC}"
    echo ""
    echo "🎉 Deployment initiated!"
    echo ""
    echo "Next steps:"
    echo "  1. Monitor build logs in your hosting platform"
    echo "  2. Test critical features after deployment"
    echo "  3. Run Facebook Sharing Debugger"
    echo "  4. Check mobile navigation on actual device"
    echo ""
    echo "📚 Documentation: See DEPLOYMENT_READY.md for testing checklist"
else
    echo -e "${RED}❌ Push failed${NC}"
    echo "Check your git remote configuration and try again."
    exit 1
fi

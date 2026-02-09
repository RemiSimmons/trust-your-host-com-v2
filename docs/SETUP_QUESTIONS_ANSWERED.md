# Setup Questions - Answered

## Q1: What do I need Gemini API key for?

**Answer:** AI-Powered Property Recommendations (Optional Feature)

### What it does:
The Gemini API provides **AI-powered property recommendations** for users based on:
- Their search preferences
- Browse history
- Property attributes
- User interests

**Code Location:** `/app/api/recommendations/route.ts`

### Is it required?
**NO!** ✅ The site works without it.

**What happens without the API key:**
- The recommendation system automatically falls back to **mock data**
- Returns properties based on popularity/ratings
- No AI features, but everything else works perfectly

### Do you need it for launch?
**Optional** - You can:
1. **Launch without it** - Everything works fine
2. **Add it later** - Easy to enable when you want AI recommendations

### How to get it (if you want):
1. Go to: https://ai.google.dev/
2. Sign up for Google AI Studio (free tier available)
3. Create API key
4. Add to `.env.local`: `GEMINI_API_KEY=your-key-here`

**Recommendation:** ✅ Launch without it first, add later if needed.

---

## Q2: Supabase Security Warnings - What are they?

Looking at your screenshot, you have **4 warnings**:

### ⚠️ Warning 1 & 2: "Function Search Path Mutable"
**What it means:** Some database functions don't have hardcoded search paths

**Is it critical?** 🟡 Low priority
- Won't break your site
- Minor security best practice
- Can be fixed later

**How to fix (optional):**
Run this in Supabase SQL Editor:
```sql
-- For public.increment_property_clicks function
ALTER FUNCTION public.increment_property_clicks(uuid) 
SET search_path = public, pg_temp;

-- For any other custom functions you created
ALTER FUNCTION public.your_function_name 
SET search_path = public, pg_temp;
```

### ⚠️ Warning 3: "RLS Policy Always True"
**What it means:** One of your Row Level Security policies uses `USING (true)` 

**Is it critical?** 🟡 Medium priority
- Means that policy allows all access
- Might be intentional (for public data)
- Review to ensure it's what you want

**How to check:**
```sql
-- See all your RLS policies
SELECT * FROM pg_policies 
WHERE schemaname = 'public';
```

**Should you fix it?**
- If it's for public data (like property listings) → ✅ Fine
- If it's for private data (like user profiles) → ⚠️ Review and restrict

### ⚠️ Warning 4: "Leaked Password Protection Disabled"
**What it means:** Supabase isn't checking if passwords have been leaked in data breaches

**Is it critical?** 🟢 Low priority (for you)
- You're using **magic links** (passwordless auth)
- Users don't set passwords on your platform
- Google OAuth doesn't use passwords

**Should you fix it?**
- Since you're not using password auth → Not needed
- If you add password auth later → Enable it in Supabase Auth settings

### Summary of Security Warnings:
✅ **Your site is safe to launch with these warnings**
🟡 **Low/Medium priority** - Can be addressed post-launch
🔒 **Using passwordless auth** already improves security

---

## Q3: Database Setup - How to check if it's complete?

### Quick Check in Supabase Dashboard:

1. **Go to:** https://supabase.com/dashboard
2. **Select your project:** trust-your-host-com-v2
3. **Click:** Table Editor (left sidebar)

### ✅ You should see these tables:

**Core Tables (should already exist):**
- `profiles`
- `properties`
- `bookings` (disabled)
- `reviews` (disabled)
- `messages` (disabled)

**New Tables (from directory model migration):**
- `property_submissions` ⭐
- `property_clicks` ⭐
- `subscription_analytics` ⭐

### 🔍 How to verify:

**Option 1: Visual Check**
- Open Table Editor
- Look for the 3 new tables listed above
- If you see them → ✅ Migration already run!

**Option 2: SQL Query**
Go to SQL Editor and run:
```sql
-- Check if new tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('property_submissions', 'property_clicks', 'subscription_analytics');
```

**Expected result:** Should return 3 rows with those table names

### ❓ If tables are missing:

Run the migration script:
1. Open: `/scripts/setup-directory-model.sql`
2. Copy entire file contents
3. Go to Supabase → SQL Editor
4. Paste and run

### 🔒 Check RLS Policies:

```sql
-- Verify RLS is enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('property_submissions', 'property_clicks', 'subscription_analytics');
```

All should show `rowsecurity = true`

### 🛡️ Set Admin Role:

Make sure you're an admin:
```sql
-- Check your current role
SELECT email, role FROM profiles WHERE email = 'contact@remisimmons.com';

-- If not admin, set it:
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'contact@remisimmons.com';
```

---

## Q4: APP_URL in .env.local - How to set it?

### Current value:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### ✅ For Development (Current):
**Keep it as is!**
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
or update to match your dev server:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 🚀 For Production (When deploying):
**Replace entirely** with your production domain:

```env
NEXT_PUBLIC_APP_URL=https://trustyourhost.com
```

**NOT:**
- ❌ `NEXT_PUBLIC_APP_URL=trustyourhost` (missing protocol)
- ❌ `NEXT_PUBLIC_APP_URL=www.trustyourhost.com` (missing protocol)
- ❌ `NEXT_PUBLIC_APP_URL=https://trustyourhost.com/` (no trailing slash)

**Correct format:**
✅ `https://yourdomain.com` (no www, no trailing slash)
✅ `https://www.yourdomain.com` (if using www)

### 📝 What it's used for:

This URL is used in:
1. **Email links** - "View your listing at https://..."
2. **OAuth redirects** - Google redirects back to this URL
3. **Stripe webhooks** - Stripe sends events to this URL
4. **Magic link redirects** - Where users land after clicking email

### 🔄 When to update:

**Development:**
```env
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

**Staging (if you have one):**
```env
NEXT_PUBLIC_APP_URL=https://staging.trustyourhost.com
```

**Production:**
```env
NEXT_PUBLIC_APP_URL=https://trustyourhost.com
```

### ⚠️ Important:
- **No trailing slash** at the end
- **Include protocol** (http:// or https://)
- **Match your actual domain** exactly
- Update **Google OAuth redirect URIs** to match
- Update **Stripe webhook URL** to match

---

## Quick Action Checklist

### Before Launch:

- [ ] **Gemini API:** ✅ Not needed (can launch without)
- [ ] **Security Warnings:** 🟡 Review but not critical
- [ ] **Database Tables:** ✅ Check if 3 new tables exist
- [ ] **Admin Role:** ✅ Set your role to 'admin'
- [ ] **APP_URL:** Update to production domain when deploying

### Priority Order:

1. **High:** Database tables + admin role
2. **High:** APP_URL (when deploying)
3. **Medium:** Security warnings (RLS policies)
4. **Low:** Gemini API (nice to have)
5. **Low:** Function search path warnings

---

## Need Help?

### Check if database is setup:
```sql
-- Run in Supabase SQL Editor
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

Should include: `property_submissions`, `property_clicks`, `subscription_analytics`

### Make yourself admin:
```sql
UPDATE profiles SET role = 'admin' 
WHERE email = 'contact@remisimmons.com';
```

### Your .env.local should have:
```env
# Development
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Production (when deploying)
NEXT_PUBLIC_APP_URL=https://trustyourhost.com

# Optional (for AI recommendations)
GEMINI_API_KEY=your-key-here-or-leave-blank
```

---

**Bottom Line:**
1. ✅ Gemini API = Optional (for AI features)
2. 🟡 Security warnings = Can be fixed post-launch
3. 🔍 Database = Check if 3 tables exist
4. 🌐 APP_URL = Use localhost for dev, change for production

You're good to continue development with current setup! 🚀

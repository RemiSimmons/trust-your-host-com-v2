# OAuth Login Debug Guide

## Step 1: Check Browser Console

1. Open your live site: https://trustyourhost.com
2. Open browser Developer Tools (F12 or Right-click → Inspect)
3. Go to the **Console** tab
4. Try to sign in with Google
5. Look for any red error messages

## Step 2: Check Production Environment Variables

Your hosting platform needs these environment variables set:

```bash
# Critical for OAuth
NEXT_PUBLIC_SUPABASE_URL=https://poknidtqjmytbwpkixmy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=https://trustyourhost.com

# Other required variables
SUPABASE_SERVICE_ROLE_KEY=sb_secret_RO-DbJ_hGMUfmOV_P705gQ_AyF0WrGG
```

### How to Check (Vercel):
1. Go to https://vercel.com/dashboard
2. Select your project
3. Click "Settings" → "Environment Variables"
4. Verify all variables above are present

### How to Check (Netlify):
1. Go to https://app.netlify.com
2. Select your site
3. Click "Site settings" → "Environment variables"
4. Verify all variables above are present

## Step 3: Check Network Tab

1. Open Developer Tools → **Network** tab
2. Try to sign in with Google
3. Look for:
   - Request to `/auth/callback?code=...`
   - Does it return 200 or an error?
   - Where does it redirect to?

## Step 4: Test Auth Callback Directly

After clicking "Sign in with Google", you should see a URL like:
```
https://trustyourhost.com/auth/callback?code=SOME_CODE&next=/dashboard
```

If the URL shows `localhost:3000` instead of `trustyourhost.com`, the issue is environment variables.

## Step 5: Common Issues

### Issue: "Auth callback redirects to localhost"
**Cause:** Production environment missing `NEXT_PUBLIC_APP_URL`
**Fix:** Add `NEXT_PUBLIC_APP_URL=https://trustyourhost.com` to production environment

### Issue: "Login completes but doesn't redirect"
**Cause:** Cookie domain mismatch or session not persisting
**Fix:** Check browser console for cookie errors

### Issue: "Shows Supabase branding"
**Cause:** Google OAuth consent screen updates can take up to 24 hours to propagate
**Fix:** Wait a few hours, this is cosmetic only

### Issue: "Error: Invalid redirect URI"
**Cause:** Redirect URI not in Google Cloud Console
**Fix:** Already configured correctly ✓

## What to Report Back

Please share:
1. Hosting platform you're using
2. Any error messages from Console tab
3. What URL shows in browser after clicking "Sign in with Google"
4. Whether you've set environment variables on your hosting platform

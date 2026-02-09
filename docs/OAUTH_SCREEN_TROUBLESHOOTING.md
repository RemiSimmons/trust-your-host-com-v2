# OAuth Consent Screen Still Showing Supabase URL?

## Problem
Even after setting "App name" to "TrustYourHost" in Google Cloud Console, the OAuth screen still shows "poknidtqjmytbwpkixmy.supabase.co"

## Why This Happens
Google caches the OAuth consent screen for users who have already granted permissions. Testing mode vs Production mode doesn't affect the app name display.

---

## Solutions (Try in Order)

### Solution 1: Revoke Previous Access ✅ (Most Effective)

1. **Revoke access from your Google account:**
   - Go to: https://myaccount.google.com/permissions
   - Find "poknidtqjmytbwpkixmy.supabase.co" in the list
   - Click on it
   - Click "Remove Access" or "Delete"

2. **Test with fresh consent:**
   - Go to: http://localhost:3001/login
   - Click "Continue with Google"
   - You should now see: **"Sign in to TrustYourHost"** ✨

### Solution 2: Use Incognito Window + Different Account

1. **Open incognito/private window**
2. **Go to:** http://localhost:3001/login
3. **Click:** "Continue with Google"
4. **Use a different Google account** (one that hasn't connected before)
5. **You should see:** "Sign in to TrustYourHost"

### Solution 3: Wait for Propagation

- Google can take **5-30 minutes** to propagate OAuth consent screen changes
- Try again after waiting
- Use incognito to avoid browser cache

### Solution 4: Force Update in Google Cloud Console

1. **Go to:** https://console.cloud.google.com/apis/credentials/consent
2. **Click:** "EDIT APP"
3. **Verify:** App name shows "TrustYourHost"
4. **Click:** "SAVE AND CONTINUE" on each page
5. **Click:** "BACK TO DASHBOARD"
6. **Wait:** 5-10 minutes
7. **Try again** with Solution 1 (revoke access)

---

## Verification Checklist

### Check Your Google Cloud Console Setup:

1. **OAuth Consent Screen** (https://console.cloud.google.com/apis/credentials/consent)
   - ✅ App name: `TrustYourHost`
   - ✅ User support email: Your email
   - ✅ Status: Testing or Production (doesn't matter for app name)

2. **Authorized Domains** (in same page, scroll down)
   - ✅ `localhost` (for development)
   - ✅ `supabase.co` (required!)
   - ✅ Your production domain (when ready)

3. **OAuth Credentials** (https://console.cloud.google.com/apis/credentials)
   - ✅ Authorized redirect URIs include:
     - `https://poknidtqjmytbwpkixmy.supabase.co/auth/v1/callback`
     - `http://localhost:3001/auth/callback`

---

## What You Should See

### Before (Cached):
```
┌─────────────────────────────────────────┐
│  Sign in to                             │
│  poknidtqjmytbwpkixmy.supabase.co      │
└─────────────────────────────────────────┘
```

### After (Fixed):
```
┌─────────────────────────────────────────┐
│  Sign in to TrustYourHost               │
└─────────────────────────────────────────┘
```

---

## Testing Mode vs Production Mode

### Common Misconception:
"I need to switch to Production mode for the app name to show"

### Reality:
- ❌ **False** - App name shows in both Testing and Production mode
- ✅ **Testing Mode:** Perfect for development, shows app name correctly
- ✅ **Production Mode:** Same app name display, but allows unlimited users

### What Testing Mode Actually Affects:
- **User limit:** Max 100 test users
- **User list:** Must manually add test users
- **Verification warning:** Shows "This app isn't verified" (removable by user)

### What Testing Mode DOESN'T Affect:
- ❌ App name display (shows "TrustYourHost" in both modes)
- ❌ OAuth functionality
- ❌ Redirect URIs
- ❌ Scopes

### When to Switch to Production:
- You want **unlimited users** without manually adding them
- You want to **remove the "unverified" warning** (requires Google review)
- You're **ready to launch** publicly

**For Development:** Stay in Testing mode! ✅

---

## Still Not Working?

### Debug Steps:

1. **Check browser console:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for errors during OAuth flow

2. **Verify Supabase setup:**
   - Go to: https://supabase.com/dashboard
   - Select your project
   - Authentication → Providers → Google
   - Make sure it's **Enabled** (green toggle)

3. **Check redirect URL in Supabase:**
   - In Supabase Google provider settings
   - Copy the "Callback URL" shown
   - Make sure this EXACT URL is in Google Cloud Console authorized redirect URIs

4. **Test with curl (advanced):**
   ```bash
   # Check if your OAuth client is properly configured
   # This should return your app name
   ```

---

## Production Launch Checklist

When you're ready to go public:

- [ ] App name set to "TrustYourHost" ✅
- [ ] Logo uploaded (120x120px) (optional)
- [ ] Privacy policy URL added and publicly accessible
- [ ] Terms of service URL added and publicly accessible
- [ ] Production domain added to authorized domains
- [ ] Production redirect URIs added
- [ ] Test users can successfully sign in
- [ ] Submit for Google verification (if removing unverified warning)
- [ ] Switch from Testing to Production mode

---

## Common Errors & Fixes

### Error: "This app isn't verified"
- **Normal** in Testing mode
- Users can click "Advanced" → "Continue to TrustYourHost (unsafe)"
- To remove: Submit for Google verification (Production mode)

### Error: "redirect_uri_mismatch"
- Check authorized redirect URIs in Google Cloud Console
- Must include: `https://[your-project].supabase.co/auth/v1/callback`

### Error: "access_denied"
- User clicked "Cancel" on consent screen
- Or app doesn't have required scopes
- Check scopes include: email, profile, openid

### Error: "invalid_client"
- Client ID or Secret is wrong in Supabase
- Re-copy from Google Cloud Console
- Make sure no extra spaces

---

## Quick Test Script

Run this to verify everything:

1. Clear all Google permissions: https://myaccount.google.com/permissions
2. Clear browser cache
3. Open incognito window
4. Go to: http://localhost:3001/login
5. Click "Continue with Google"
6. Check: Does it say "Sign in to TrustYourHost"? ✅

If YES → Success! Issue was cached consent
If NO → Check Google Cloud Console app name again

---

## Summary

**Most Common Fix:** Revoke access at https://myaccount.google.com/permissions and try again

**Why:** Google caches the consent screen for users who already granted permissions

**Testing vs Production:** Doesn't affect app name display - stay in Testing for development

**Wait Time:** 5-30 minutes for Google to propagate changes (after first setup)

---

Need more help? Check the other guides:
- `GOOGLE_OAUTH_SETUP.md` - Initial setup
- `OAUTH_BRANDING_SETUP.md` - Customizing appearance
- `GOOGLE_OAUTH_COMPLETE.md` - Implementation overview

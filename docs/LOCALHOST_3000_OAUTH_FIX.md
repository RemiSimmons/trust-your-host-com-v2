# Fix Google OAuth for localhost:3000

## Why Google OAuth Doesn't Work on localhost:3000

Google OAuth requires **authorized redirect URIs** to be explicitly configured in your Google Cloud Console. Your app is currently set up for `localhost:3001`, but you're running on `localhost:3000`.

---

## Quick Fix - Two Options:

### Option 1: Add localhost:3000 to Google Cloud Console (Recommended)

This allows you to use port 3000.

#### Steps:

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/apis/credentials
   - Select your project (TrustYourHost)

2. **Edit OAuth Client:**
   - Find your OAuth 2.0 Client ID
   - Click the pencil icon (Edit)

3. **Add localhost:3000 URLs:**
   
   **Authorized JavaScript origins** (scroll down):
   ```
   http://localhost:3000
   ```
   
   **Authorized redirect URIs**:
   ```
   http://localhost:3000/auth/callback
   ```

4. **Keep existing URLs too:**
   - Don't remove `localhost:3001` URLs
   - Don't remove Supabase URLs
   - Just ADD the new localhost:3000 URLs

5. **Click "SAVE"**

6. **Wait 2-5 minutes** for Google to propagate changes

7. **Test:**
   ```bash
   npm run dev
   # Visit http://localhost:3000/login
   # Click "Continue with Google"
   ```

---

### Option 2: Change Your Port to 3001 (Quick Alternative)

If you want to use the already-configured port:

#### Steps:

1. **Update package.json:**
   ```json
   {
     "scripts": {
       "dev": "next dev -p 3001"
     }
   }
   ```

2. **Restart server:**
   ```bash
   npm run dev
   ```

3. **Visit:**
   ```
   http://localhost:3001
   ```

---

## Complete OAuth Configuration Checklist

### In Google Cloud Console:

**Authorized JavaScript origins:**
- ✅ `http://localhost:3000` (your current port)
- ✅ `http://localhost:3001` (backup/alternate)
- ✅ `https://your-domain.com` (production - when ready)

**Authorized redirect URIs:**
- ✅ `http://localhost:3000/auth/callback`
- ✅ `http://localhost:3001/auth/callback`
- ✅ `https://poknidtqjmytbwpkixmy.supabase.co/auth/v1/callback` (required!)
- ✅ `https://your-domain.com/auth/callback` (production - when ready)

**OAuth Consent Screen:**
- ✅ App name: `TrustYourHost`
- ✅ User support email: Your email
- ✅ Authorized domains:
  - `localhost`
  - `supabase.co`
  - Your production domain (when ready)

---

## Common Errors & Solutions

### Error: "redirect_uri_mismatch"

**Problem:** Your redirect URI isn't authorized

**Fix:**
1. Check the error message for the exact URI being used
2. Copy that exact URI
3. Add it to "Authorized redirect URIs" in Google Cloud Console
4. Save and wait 2-5 minutes

### Error: "invalid_client"

**Problem:** Client ID or Secret is incorrect

**Fix:**
1. Go to Google Cloud Console → Credentials
2. Copy Client ID and Client Secret
3. Go to Supabase → Authentication → Providers → Google
4. Paste the credentials (no extra spaces!)
5. Save

### Error: "access_denied"

**Problem:** User clicked "Cancel" or scopes not configured

**Fix:**
- Try clicking "Continue with Google" again
- Check that Google provider is enabled in Supabase
- Verify scopes include: email, profile, openid

### OAuth Screen Shows "supabase.co" Instead of "TrustYourHost"

**Problem:** Google cached your previous consent

**Fix:**
1. Go to: https://myaccount.google.com/permissions
2. Find and remove "supabase.co" or "TrustYourHost"
3. Try signing in again
4. Should now show "TrustYourHost"

---

## Verification Steps

After making changes, verify everything works:

1. **Clear browser cache** (or use incognito)

2. **Visit login page:**
   ```
   http://localhost:3000/login
   ```

3. **Click "Continue with Google"**

4. **Check for errors:**
   - Open DevTools (F12) → Console
   - Look for any red errors

5. **Should see:**
   - "Sign in to TrustYourHost" (if first time)
   - Or direct sign-in (if previously authorized)
   - Redirect to `/dashboard` after success

6. **Check session:**
   - After login, you should stay logged in
   - Refresh page - still logged in
   - Check user icon in header

---

## Localhost Security Note

**Why localhost works without HTTPS:**

Google OAuth allows `http://localhost` for development without requiring HTTPS. This is the ONLY exception - all other domains must use `https://`.

**For production:**
- Must use HTTPS
- Must have valid SSL certificate
- Update all redirect URIs to use `https://`

---

## Environment Variables Check

Make sure your `.env.local` has the correct URLs:

```env
# For localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# For localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

The app will use this for OAuth redirects.

---

## Testing Checklist

After setup, test these scenarios:

### Guest Login:
- [ ] Visit `/login`
- [ ] Click "Continue with Google"
- [ ] Authorize with Google account
- [ ] Redirected to `/dashboard`
- [ ] User icon shows in header
- [ ] Can log out and log back in

### Guest Signup:
- [ ] Visit `/signup`
- [ ] Click "Sign up with Google"
- [ ] Creates new account
- [ ] Redirected to `/dashboard`

### Host Login:
- [ ] Visit `/host/login`
- [ ] Click "Continue with Google"
- [ ] Redirected to `/host`

---

## Multiple Ports Setup (Advanced)

If you want to support multiple ports simultaneously:

**Add ALL these to Google Cloud Console:**

Authorized JavaScript origins:
```
http://localhost:3000
http://localhost:3001
http://localhost:3002
```

Authorized redirect URIs:
```
http://localhost:3000/auth/callback
http://localhost:3001/auth/callback
http://localhost:3002/auth/callback
```

This way OAuth works regardless of which port you use.

---

## Summary

**Problem:** Google OAuth not working on localhost:3000

**Root Cause:** Port 3000 not in authorized redirect URIs

**Solution:** Add `http://localhost:3000` and `http://localhost:3000/auth/callback` to Google Cloud Console

**Time:** 2-5 minutes for changes to propagate

**Alternative:** Change your dev server to port 3001 (already configured)

---

## Still Having Issues?

1. **Check Google Cloud Console:**
   - Verify URLs are saved correctly
   - No typos in URLs
   - No extra slashes or spaces

2. **Check Supabase:**
   - Google provider is enabled (green toggle)
   - Client ID and Secret match Google Cloud Console
   - Callback URL is correct

3. **Check browser:**
   - Clear cache
   - Try incognito mode
   - Check console for errors

4. **Wait:**
   - Google can take 5-10 minutes to propagate changes
   - Try again after waiting

5. **Contact support:**
   - Google Cloud Support (for Google-side issues)
   - Supabase Support (for Supabase-side issues)

---

**Quick Start:** Add `http://localhost:3000/auth/callback` to Google Cloud Console → Save → Wait 5 min → Test!

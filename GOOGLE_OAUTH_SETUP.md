# Google OAuth Setup Guide

Google OAuth has been added to your login and signup pages! Follow these steps to configure it:

## 1. Create Google OAuth Credentials

### Step 1: Go to Google Cloud Console
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Make sure the project is selected in the top dropdown

### Step 2: Enable Google+ API (if needed)
1. Go to "APIs & Services" > "Library"
2. Search for "Google+ API" 
3. Click "Enable" if not already enabled

### Step 3: Create OAuth Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "+ CREATE CREDENTIALS" at the top
3. Select "OAuth client ID"
4. If prompted, configure the OAuth consent screen first:
   - User Type: External (for testing) or Internal (for workspace)
   - App name: `TrustYourHost`
   - User support email: Your email
   - Developer contact: Your email
   - Scopes: Add `email`, `profile`, and `openid`
   - Save and continue

### Step 4: Configure OAuth Client
1. Application type: **Web application**
2. Name: `TrustYourHost - Production` (or Dev)
3. **Authorized JavaScript origins:**
   ```
   http://localhost:3001
   https://your-production-domain.com
   ```

4. **Authorized redirect URIs:**
   ```
   http://localhost:3001/auth/callback
   https://your-production-domain.com/auth/callback
   ```

5. Click "CREATE"
6. **Copy your Client ID and Client Secret** (you'll need these next!)

---

## 2. Configure Supabase

### Step 1: Go to Supabase Dashboard
1. Visit [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to "Authentication" > "Providers"

### Step 2: Enable Google Provider
1. Find "Google" in the provider list
2. Toggle it to **Enabled**
3. Paste your **Client ID** from Google Cloud Console
4. Paste your **Client Secret** from Google Cloud Console
5. Click "Save"

---

## 3. Update Environment Variables

Add to your `.env.local`:

```bash
# No additional variables needed! 
# Supabase handles the OAuth credentials
```

The credentials are stored securely in Supabase, not in your codebase.

---

## 4. Test the Integration

### Local Testing:
1. Start your dev server: `npm run dev`
2. Go to `http://localhost:3001/login` or `http://localhost:3001/signup`
3. Click "Continue with Google" or "Sign up with Google"
4. You should be redirected to Google's OAuth consent screen
5. After approval, you'll be redirected back to `/dashboard`

### Production Testing:
1. Deploy your app
2. Add your production domain to:
   - Google Cloud Console authorized origins/redirects
   - Supabase site URL (Settings > URL Configuration)
3. Test the same flow on production

---

## 5. Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure the redirect URI in Google Cloud Console **exactly matches**:
  - `http://localhost:3001/auth/callback` (dev)
  - `https://yourdomain.com/auth/callback` (prod)
- No trailing slashes!

### Error: "Access blocked: This app's request is invalid"
- Check that you've configured the OAuth consent screen
- Make sure you've added test users (if in Testing mode)
- Verify the scopes include `email`, `profile`, and `openid`

### Users Can't Sign In
- Check Supabase logs: Authentication > Logs
- Verify Google provider is enabled in Supabase
- Confirm Client ID and Secret are correct

### Redirect Goes to Wrong URL
- Check the `next` parameter in callback: `/auth/callback?next=/dashboard`
- Verify the redirect logic in `/app/auth/callback/route.ts`

---

## 6. What's Been Added

### New Files:
- ✅ `/app/auth/callback/route.ts` - OAuth callback handler
- ✅ Updated `/app/login/page.tsx` - Added Google sign-in button
- ✅ Updated `/app/signup/page.tsx` - Added Google sign-up button

### Features:
- ✅ One-click Google sign-in/sign-up
- ✅ Automatic account creation on first sign-in
- ✅ Profile data synced from Google (name, email, avatar)
- ✅ Seamless redirect to dashboard after auth
- ✅ Loading states and error handling
- ✅ Beautiful Google brand button with official colors

---

## 7. User Experience

### Login Flow:
1. User clicks "Continue with Google"
2. Redirected to Google OAuth consent screen
3. User approves access
4. Redirected back to `/auth/callback`
5. Session created automatically
6. Redirected to `/dashboard`

### Signup Flow:
Same as login! Google OAuth automatically:
- Creates account if new user
- Signs in if existing user
- No separate signup needed

---

## 8. Security Notes

✅ **Secure:** OAuth credentials stored in Supabase (not in code)
✅ **PKCE Flow:** Supabase uses PKCE for added security
✅ **HTTPS Only:** Production OAuth requires HTTPS
✅ **Token Refresh:** Supabase automatically refreshes tokens

---

## Next Steps

1. Set up Google OAuth credentials (Steps 1-2 above)
2. Configure Supabase provider (Step 2 above)
3. Test locally first
4. Deploy and test in production
5. Optional: Add Facebook, GitHub, or other OAuth providers

---

Need help? Check:
- [Supabase OAuth Docs](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth 2.0 Docs](https://developers.google.com/identity/protocols/oauth2)

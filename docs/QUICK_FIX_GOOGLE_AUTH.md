# Quick Fix: Enable Google OAuth in Supabase

## Error You're Seeing:
```json
{
  "code": 400,
  "error_code": "validation_failed",
  "msg": "Unsupported provider: provider is not enabled"
}
```

## Solution: Enable Google Provider in Supabase

### Step 1: Go to Supabase Dashboard
1. Open https://supabase.com/dashboard
2. Select your project: **trust-your-host-com-v2**
3. Click **Authentication** in the left sidebar
4. Click **Providers** in the submenu

### Step 2: Enable Google Provider

You'll see a list of authentication providers. Find **Google** and:

1. Toggle the switch to **ON** (Enabled)
2. You'll see two fields appear:
   - **Client ID** (from Google Cloud Console)
   - **Client Secret** (from Google Cloud Console)

### Step 3A: If You DON'T Have Google Credentials Yet

**For Development/Testing Only:**

Supabase provides development credentials you can use temporarily:

1. Look for a checkbox or option that says:
   - "Use Supabase OAuth credentials for development" OR
   - "Enable for development"
   
2. Check that box if available

3. Click **Save**

**Note:** This only works for development. You'll need real credentials for production.

### Step 3B: If You HAVE Google Credentials

Follow the full setup in `GOOGLE_OAUTH_SETUP.md`:

1. **Get Google OAuth Credentials:**
   - Go to https://console.cloud.google.com/
   - Create a project (or select existing)
   - Go to "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS" → "OAuth client ID"
   - Configure OAuth consent screen if prompted
   - Application type: **Web application**
   - Name: `TrustYourHost Dev`
   
2. **Add Redirect URIs:**
   ```
   http://localhost:3001/auth/callback
   ```
   
3. **Add Authorized JavaScript origins:**
   ```
   http://localhost:3001
   ```
   
4. **Copy the credentials:**
   - Client ID (looks like: `123456789-abc123.apps.googleusercontent.com`)
   - Client Secret (looks like: `GOCSPX-abc123...`)

5. **Paste into Supabase:**
   - Go back to Supabase → Authentication → Providers → Google
   - Paste **Client ID**
   - Paste **Client Secret**
   - Click **Save**

### Step 4: Verify It's Enabled

After saving, you should see:
- ✅ Google provider shows as **Enabled** (green toggle)
- ✅ A redirect URL shown (this is what Google needs)

Copy the redirect URL shown in Supabase (it should be something like):
```
https://your-project-id.supabase.co/auth/v1/callback
```

**Important:** Add this to Google Cloud Console too!

### Step 5: Test Again

1. Restart your dev server:
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

2. Go to http://localhost:3001/login

3. Click **Continue with Google**

4. You should now be redirected to Google (instead of getting an error)

---

## Full Google OAuth Setup (For Production)

When you're ready for production, follow the complete guide in `GOOGLE_OAUTH_SETUP.md`.

### Quick Reference:

**Google Cloud Console:**
- URL: https://console.cloud.google.com/apis/credentials
- Create OAuth 2.0 Client ID
- Add your redirect URIs

**Supabase Dashboard:**
- URL: https://supabase.com/dashboard
- Authentication → Providers → Google
- Enable and add credentials

---

## Troubleshooting

### Still Getting "provider is not enabled"?
- Make sure you clicked **Save** in Supabase
- Try refreshing the Supabase page
- Check the toggle is green (enabled)

### Getting "redirect_uri_mismatch"?
You need to add the redirect URI to Google Cloud Console:
1. Go to Google Cloud Console → Credentials
2. Edit your OAuth client
3. Add: `http://localhost:3001/auth/callback`
4. Add: `https://your-project-id.supabase.co/auth/v1/callback`

### Google OAuth consent screen not configured?
1. Go to Google Cloud Console
2. APIs & Services → OAuth consent screen
3. Fill in required fields:
   - App name: `TrustYourHost`
   - User support email: Your email
   - Developer email: Your email
4. Add scopes: `email`, `profile`, `openid`
5. Save

---

## Environment Check

Make sure your `.env.local` has these Supabase variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

(You should already have these)

---

## Expected Flow After Fix

1. Click "Continue with Google"
2. Redirected to Google consent screen
3. Choose your Google account
4. Approve permissions
5. Redirected back to your app
6. Signed in automatically! 🎉

---

Need more help? The full setup guide is in `GOOGLE_OAUTH_SETUP.md`

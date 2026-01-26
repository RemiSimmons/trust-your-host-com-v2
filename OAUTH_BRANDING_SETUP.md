# OAuth Consent Screen Branding Setup

## Goal
Make Google OAuth show "TrustYourHost" instead of the Supabase URL

## Quick Setup

### 1. Go to OAuth Consent Screen
https://console.cloud.google.com/apis/credentials/consent

### 2. Edit App Configuration

Click "EDIT APP" and fill in:

#### **App Information**
```
App name: TrustYourHost

User support email: hello@trustyourhost.com
(or your personal email)

App logo: (Optional - 120x120px PNG/JPG)
```

#### **App Domain (Optional but Recommended)**
```
Application home page: http://localhost:3001
(or your production URL when ready)

Application Privacy Policy link: http://localhost:3001/privacy

Application Terms of Service link: http://localhost:3001/terms
```

#### **Authorized Domains**
Add these domains:
```
localhost
supabase.co
```

When you deploy to production, also add:
```
yourdomain.com
```

#### **Developer Contact Information**
```
Email address(es): your-email@example.com
```

### 3. Configure Scopes

Click "ADD OR REMOVE SCOPES" and ensure these are selected:

- ✅ `.../auth/userinfo.email` - See your primary Google Account email address
- ✅ `.../auth/userinfo.profile` - See your personal info
- ✅ `openid` - Associate you with your personal info on Google

Click "UPDATE" → "SAVE AND CONTINUE"

### 4. Test Users (If in Testing Mode)

Add email addresses that can test the OAuth:
```
your-email@gmail.com
another-tester@gmail.com
```

Click "ADD" → "SAVE AND CONTINUE"

### 5. Review & Save

Review everything and click "BACK TO DASHBOARD"

---

## Result

### Before:
```
Sign in to poknidtqjmytbwpkixmy.supabase.co
```

### After:
```
Sign in to TrustYourHost
```

Much more professional! ✨

---

## Publishing Status

### Testing Mode (Current)
- ✅ Fast setup
- ✅ No Google review needed
- ⚠️ Limited to 100 test users
- ⚠️ Shows "This app isn't verified" warning
- ⚠️ Test users must be added manually

**Use for:** Development and internal testing

### Production Mode (For Launch)
- ✅ Unlimited users
- ✅ No test user restrictions
- ✅ Looks more trustworthy (no warning)
- ⚠️ Requires Google verification (1-4 weeks)
- ⚠️ Need privacy policy, terms, video demo

**Use for:** Public launch

---

## Verification Requirements (Production)

When ready to go public, you'll need:

### Required Documents:
1. **Privacy Policy** (must be publicly accessible)
   - Already created: `/privacy` page
   - URL: `https://yourdomain.com/privacy`

2. **Terms of Service** (must be publicly accessible)
   - Already created: `/terms` page
   - URL: `https://yourdomain.com/terms`

3. **YouTube Video** showing OAuth flow
   - Record: Click "Sign in with Google" → consent screen → success
   - 1-2 minutes max
   - Can be unlisted

### Verification Process:
1. Go to OAuth consent screen
2. Click "PUBLISH APP"
3. Click "PREPARE FOR VERIFICATION"
4. Fill out the form:
   - Why you need scopes (email/profile for authentication)
   - Upload video demo
   - Provide privacy policy & terms URLs
5. Submit for review
6. Wait 1-4 weeks for Google's response

### Domain Verification:
You may need to verify domain ownership:
1. Go to Google Search Console
2. Add your domain
3. Verify via DNS or HTML file upload
4. Link verified domain to OAuth app

---

## Branding Tips

### App Logo:
- Size: 120x120 pixels
- Format: PNG (with transparency) or JPG
- Should be: Your TrustYourHost logo/icon
- Make it simple and recognizable

### App Name:
- Keep it short: "TrustYourHost" ✅
- Don't use: "TrustYourHost - Vacation Rentals" ❌ (too long)

### Authorized Domains:
Always include:
- Your production domain
- `supabase.co` (required for OAuth callback)
- `localhost` (for development)

---

## Testing the Changes

1. **Clear browser cache or use incognito**
2. Go to: http://localhost:3001/login
3. Click "Continue with Google"
4. You should now see: **"Sign in to TrustYourHost"** 🎉

If you still see the old name:
- Wait 5-10 minutes for Google to update
- Clear browser cache completely
- Try incognito/private window

---

## Common Issues

### Still showing Supabase URL?
- Make sure you saved the OAuth consent screen
- Wait 5-10 minutes for changes to propagate
- Try incognito window

### "This app isn't verified" warning?
- Normal for Testing mode
- Users can click "Advanced" → "Go to TrustYourHost (unsafe)"
- To remove: Publish app and get verified (production)

### Can't add test users?
- Make sure you're in Testing mode
- Maximum 100 test users
- They must have Google accounts

### Domain verification errors?
- Make sure you didn't add `http://` or `https://` to domains
- Just add the domain: `yourdomain.com` not `https://yourdomain.com`
- `localhost` and `supabase.co` are required

---

## Next Steps

### For Development:
✅ You're all set! OAuth shows "TrustYourHost" now.

### For Production Launch:
1. Deploy your app to production
2. Add production domain to authorized domains
3. Update privacy policy & terms URLs to production
4. Submit for Google verification
5. Wait for approval (1-4 weeks)
6. Switch from Testing to Production mode

---

## Reference Links

- OAuth Consent Screen: https://console.cloud.google.com/apis/credentials/consent
- Google Verification Guide: https://support.google.com/cloud/answer/9110914
- Branding Guidelines: https://developers.google.com/identity/branding-guidelines

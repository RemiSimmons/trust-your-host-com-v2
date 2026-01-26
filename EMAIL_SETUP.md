# Email Setup Guide for TrustYourHost

## Issue: Emails Not Being Sent

Your emails are not working because the `RESEND_API_KEY` in `.env.local` is set to a placeholder value.

## Solution: Set Up Resend

### Step 1: Create a Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free)
3. Verify your email address

### Step 2: Get Your API Key
1. Log in to your Resend dashboard
2. Go to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "TrustYourHost Production")
5. Copy the API key (starts with `re_...`)

### Step 3: Add Domain (Optional but Recommended)
1. In Resend dashboard, go to **Domains**
2. Add your domain: `trustyourhost.com`
3. Follow the DNS setup instructions
4. Wait for verification (usually takes a few minutes)

**Note:** Without a verified domain, emails will be sent from `onboarding@resend.dev` which may look less professional.

### Step 4: Update Environment Variables

Update your `.env.local` file:

```bash
# Replace with your actual Resend API key
RESEND_API_KEY=re_your_actual_api_key_here

# This is where property submission notifications will be sent
ADMIN_EMAIL=contact@remisimmons.com

# Your app URL (for email links)
NEXT_PUBLIC_APP_URL=https://trustyourhost.com
```

### Step 5: Update Email Sender

Once your domain is verified, update the sender email in `/lib/email/resend.ts`:

**Current:**
```typescript
from: 'TrustYourHost <notifications@trustyourhost.com>',
```

**If domain not verified, use:**
```typescript
from: 'TrustYourHost <onboarding@resend.dev>',
```

### Step 6: Restart Your Development Server

```bash
npm run dev
```

## Testing Emails

### Test Property Submission Email

1. Go to `/submit-property`
2. Fill out the form
3. Submit the property
4. Check the admin email: `contact@remisimmons.com`

### Current Email Triggers

The app sends emails for:
- ✉️ **Property Submission** - To admin when a host submits a property
- ✉️ **Property Approved** - To host when their property is approved
- ✉️ **Trial Ending** - To host 7 days before trial ends
- ✉️ **Payment Failed** - To host when payment fails
- ✉️ **Monthly Analytics** - Monthly performance summary to host

## Email Templates Location

All email templates are in: `/lib/email/resend.ts`

You can customize the HTML content for each email type.

## Troubleshooting

### Emails Still Not Sending?

1. **Check API Key Format:**
   - Should start with `re_`
   - No spaces or quotes around it

2. **Check Environment Variables:**
   ```bash
   # In your terminal
   echo $RESEND_API_KEY
   ```

3. **Check Resend Dashboard:**
   - Go to **Logs** section
   - Look for recent send attempts
   - Check for errors

4. **Check Console Logs:**
   - Open browser console (F12)
   - Look for `[Email Mock]` messages
   - If you see these, the API key is not set correctly

### Rate Limits

- **Free Plan:** 100 emails/day
- **Pro Plan:** $20/month for 50,000 emails/month
- **Business Plan:** Custom pricing

## Alternative: Test Without Resend

For development testing, leave `RESEND_API_KEY` empty. The app will log email content to the console instead of sending real emails.

Check server logs to see what would have been sent:
```
[Email Mock] Property submission notification: { ... }
```

## Production Checklist

Before going live:
- [ ] Create Resend account
- [ ] Get API key
- [ ] Verify domain (trustyourhost.com)
- [ ] Update `.env.local` with real API key
- [ ] Update sender email in `resend.ts`
- [ ] Test all email types
- [ ] Monitor Resend dashboard for deliverability

---

**Need Help?** Contact Resend support at support@resend.com or check their docs at https://resend.com/docs

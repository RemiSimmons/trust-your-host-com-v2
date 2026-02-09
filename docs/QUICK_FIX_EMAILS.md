# 🚨 QUICK FIX: Enable Emails

Your emails aren't working because the Resend API key is not configured.

## Fast Fix (5 minutes):

### 1. Get API Key
```bash
1. Go to https://resend.com
2. Sign up (free - 100 emails/day)
3. Get your API key (starts with re_...)
```

### 2. Update .env.local
```bash
# Open .env.local and replace this line:
RESEND_API_KEY=your-resend-api-key-here

# With your actual key:
RESEND_API_KEY=re_abc123xyz...
```

### 3. Restart Server
```bash
npm run dev
```

### 4. Test It
```bash
1. Go to http://localhost:3000/submit-property
2. Submit a test property
3. Check email: contact@remisimmons.com
```

## ✅ You'll Know It's Working When:
- You receive an email at contact@remisimmons.com
- No `[Email Mock]` messages in console logs
- Resend dashboard shows sent emails

## 📖 Full Guide:
See `EMAIL_SETUP.md` for complete instructions.

---

**Current Status:** ⚠️ Emails disabled (mock mode)
**After Fix:** ✅ Full email notifications enabled

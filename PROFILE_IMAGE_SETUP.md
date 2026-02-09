# Profile Image Upload Setup Guide

This guide explains how to set up profile image uploads for Trust Your Host.

## Prerequisites

The profile image upload feature requires:
1. Supabase Storage bucket named `profile-images`
2. Proper RLS (Row Level Security) policies on the bucket
3. `profiles` table with `avatar_url` column

## Setup Instructions

### 1. Create Storage Bucket

In your Supabase Dashboard:

1. Navigate to **Storage** section
2. Click **New bucket**
3. Configure the bucket:
   - **Name**: `profile-images`
   - **Public**: Yes (checked)
   - **File size limit**: 5MB (optional)
   - **Allowed MIME types**: `image/jpeg, image/jpg, image/png, image/webp` (optional)
4. Click **Create bucket**

### 2. Set Up RLS Policies

Run the SQL script located at `scripts/setup-profile-images-storage.sql` in your Supabase SQL Editor.

This will create the following policies:
- ✅ Users can upload their own profile images
- ✅ Users can update their own profile images
- ✅ Users can delete their own profile images
- ✅ Everyone can view all profile images (public read)

### 3. Verify Setup

To verify the setup is working:

1. Log in as a host
2. Navigate to **Settings** (`/host/settings`)
3. Try uploading a profile image
4. Check that the image appears in:
   - Settings page avatar preview
   - Host header dropdown
   - Property listings (as host photo)

## How It Works

### Upload Flow

1. **Client Side** (`components/host/profile-image-upload.tsx`)
   - User selects image (drag-drop or click)
   - File validation (type, size)
   - POST to `/api/upload/profile-image`

2. **Server Side** (`app/api/upload/profile-image/route.ts`)
   - Authenticate user
   - Validate file
   - Generate unique filename: `{userId}/{timestamp}.{ext}`
   - Upload to Supabase Storage
   - Update `profiles.avatar_url`
   - Update `auth.users` metadata

3. **Display** (`components/host/host-header.tsx`)
   - Fetch avatar from `profiles.avatar_url`
   - Fallback to `auth.users` metadata
   - Show initials if no image

### File Structure

```
{userId}/
  ├── 1234567890.jpg
  ├── 1234567891.png
  └── ...
```

Each user's images are stored in their own folder (by user ID).

## Troubleshooting

### Upload fails with "Failed to upload image"

**Possible causes:**
1. Storage bucket doesn't exist → Create it (see Step 1)
2. Bucket is private → Make it public (see Step 1)
3. RLS policies missing → Run SQL script (see Step 2)
4. File too large → Max 5MB
5. Wrong file type → Only JPG, PNG, WebP

### Image doesn't display after upload

**Possible causes:**
1. Profile table not updated → Check `profiles.avatar_url` in database
2. Caching issue → Hard refresh browser (Cmd/Ctrl + Shift + R)
3. RLS policy missing for SELECT → Check public read policy exists

### Check bucket exists

Run in Supabase SQL Editor:
```sql
SELECT * FROM storage.buckets WHERE name = 'profile-images';
```

Should return one row with `public: true`.

### Check policies exist

Run in Supabase SQL Editor:
```sql
SELECT * FROM pg_policies 
WHERE schemaname = 'storage' 
  AND tablename = 'objects' 
  AND policyname ILIKE '%profile%';
```

Should return 4 policies.

### Check user's current avatar

Run in Supabase SQL Editor:
```sql
SELECT id, email, avatar_url FROM profiles WHERE email = 'your-email@example.com';
```

## API Endpoints

### POST /api/upload/profile-image
Upload a new profile image.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (File object)

**Response:**
```json
{
  "success": true,
  "url": "https://...supabase.co/storage/v1/object/public/profile-images/user-id/123456.jpg",
  "path": "user-id/123456.jpg"
}
```

### DELETE /api/upload/profile-image
Remove current profile image.

**Response:**
```json
{
  "success": true,
  "message": "Profile image removed"
}
```

## Security

- ✅ Only authenticated users can upload
- ✅ Users can only modify their own images (folder-based isolation)
- ✅ File type validation (server-side)
- ✅ File size limit (5MB)
- ✅ Public read access (images are viewable by all)

## Future Enhancements

- [ ] Image optimization/resizing
- [ ] Thumbnail generation
- [ ] Multiple image sizes
- [ ] CDN integration
- [ ] Image moderation

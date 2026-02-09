-- Fix Property Images Storage RLS Policies for Trust Your Host
-- This script drops existing policies and recreates them with proper permissions
--
-- Run this in your Supabase SQL Editor to fix the "new row violates row-level security policy" error

-- ==========================
-- STEP 1: Drop existing policies
-- ==========================

DROP POLICY IF EXISTS "Users can upload property images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update property images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete property images" ON storage.objects;
DROP POLICY IF EXISTS "Property images are publicly accessible" ON storage.objects;

-- ==========================
-- STEP 2: Create new policies
-- ==========================

-- Allow authenticated users to upload images to their own property folders
-- This policy checks if the user owns the property OR allows uploads to submissions folder
CREATE POLICY "Users can upload property images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'property-images'
  AND (
    -- Allow uploads to the 'submissions/' folder (for new property submissions)
    (storage.foldername(name))[1] = 'submissions'
    
    -- OR check if property exists and belongs to the authenticated user
    OR EXISTS (
      SELECT 1 FROM public.properties
      WHERE properties.id::text = (storage.foldername(name))[1]
      AND properties.host_id = auth.uid()
    )
    
    -- OR allow admins to upload to any property folder
    OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
);

-- Allow authenticated users to update ONLY their own property images
CREATE POLICY "Users can update property images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'property-images'
  AND (
    -- Allow updates to submissions folder
    (storage.foldername(name))[1] = 'submissions'
    
    -- OR property must belong to the authenticated user
    OR EXISTS (
      SELECT 1 FROM public.properties
      WHERE properties.id::text = (storage.foldername(name))[1]
      AND properties.host_id = auth.uid()
    )
    
    -- OR allow admins
    OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
);

-- Allow authenticated users to delete ONLY their own property images
CREATE POLICY "Users can delete property images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'property-images'
  AND (
    -- Allow deleting from submissions folder
    (storage.foldername(name))[1] = 'submissions'
    
    -- OR property must belong to the authenticated user
    OR EXISTS (
      SELECT 1 FROM public.properties
      WHERE properties.id::text = (storage.foldername(name))[1]
      AND properties.host_id = auth.uid()
    )
    
    -- OR allow admins
    OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
);

-- Allow public read access to all property images (needed for website display)
CREATE POLICY "Property images are publicly accessible"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'property-images');

-- ==========================
-- STEP 3: Verification queries
-- ==========================

-- Run these to verify policies are set up correctly:

-- 1. Check all policies on storage.objects
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'objects'
AND schemaname = 'storage'
ORDER BY policyname;

-- 2. Check if the property-images bucket exists and is public
SELECT id, name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
WHERE name = 'property-images';

-- ==========================
-- TROUBLESHOOTING TIPS
-- ==========================

-- If you still get RLS errors after running this script:
--
-- 1. Verify the property exists and belongs to the user:
--    SELECT id, host_id, name FROM properties WHERE id = 'YOUR_PROPERTY_ID';
--
-- 2. Check the authenticated user ID matches the host_id:
--    SELECT auth.uid();
--
-- 3. Verify the bucket exists and RLS is enabled:
--    SELECT * FROM storage.buckets WHERE name = 'property-images';
--
-- 4. Test the policy manually:
--    SELECT (storage.foldername('YOUR_PROPERTY_ID/test.jpg'))[1];
--    
-- 5. Check if profiles table has the user:
--    SELECT id, role FROM profiles WHERE id = auth.uid();

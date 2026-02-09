-- Property Images Storage Setup for Trust Your Host
-- Run this in your Supabase SQL Editor AFTER creating the storage bucket
--
-- SECURITY NOTE: These policies enforce ownership checks. Images are stored
-- in folders named by property ID (e.g., property-images/{property_id}/image.jpg).
-- Each policy verifies the authenticated user owns the property before allowing changes.

-- NOTE: You must first create the storage bucket manually in the Supabase Dashboard:
-- 1. Go to Storage in your Supabase dashboard
-- 2. Click "New bucket"
-- 3. Name: "property-images"
-- 4. Set to PUBLIC (so images can be viewed by anyone)
-- 5. Click "Create bucket"

-- MIGRATION: If upgrading from permissive policies, first drop the old ones:
-- DROP POLICY IF EXISTS "Users can upload property images" ON storage.objects;
-- DROP POLICY IF EXISTS "Users can update property images" ON storage.objects;
-- DROP POLICY IF EXISTS "Users can delete property images" ON storage.objects;
-- DROP POLICY IF EXISTS "Property images are publicly accessible" ON storage.objects;

-- Then run these secure policies:

-- Allow authenticated users to upload images ONLY to their own property folders
-- OR to the 'submissions/' folder (for new property submissions before approval)
-- Verifies the folder name (property ID) belongs to a property owned by the user
CREATE POLICY "Users can upload property images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'property-images'
  AND (
    -- Allow uploads to the 'submissions/' folder (new property submissions)
    (storage.foldername(name))[1] = 'submissions'
    -- OR property must belong to the authenticated user
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
    EXISTS (
      SELECT 1 FROM public.properties
      WHERE properties.id::text = (storage.foldername(name))[1]
      AND properties.host_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
);

-- Allow authenticated users to delete ONLY their own property images
-- OR images in the 'submissions/' folder
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

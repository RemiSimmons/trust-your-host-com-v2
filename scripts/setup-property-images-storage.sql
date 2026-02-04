-- Property Images Storage Setup for Trust Your Host
-- Run this in your Supabase SQL Editor AFTER creating the storage bucket

-- NOTE: You must first create the storage bucket manually in the Supabase Dashboard:
-- 1. Go to Storage in your Supabase dashboard
-- 2. Click "New bucket"
-- 3. Name: "property-images"
-- 4. Set to PUBLIC (so images can be viewed by anyone)
-- 5. Click "Create bucket"

-- Then run these policies:

-- Allow authenticated users to upload images to their property folders
CREATE POLICY "Users can upload property images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images');

-- Allow authenticated users to update their property images
CREATE POLICY "Users can update property images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'property-images');

-- Allow authenticated users to delete their property images
CREATE POLICY "Users can delete property images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'property-images');

-- Allow public read access to all property images
CREATE POLICY "Property images are publicly accessible"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'property-images');

-- Add capacity column to property_submissions table
-- Run this in your Supabase SQL Editor

-- Add the capacity JSONB column to store guests, bedrooms, beds, bathrooms, allowsPets
ALTER TABLE property_submissions 
ADD COLUMN IF NOT EXISTS capacity JSONB DEFAULT '{}'::jsonb;

-- Add comment to document the structure
COMMENT ON COLUMN property_submissions.capacity IS 'JSON object containing: guests (int), bedrooms (int), beds (int), bathrooms (numeric), allowsPets (boolean)';

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'property_submissions' 
AND column_name = 'capacity';

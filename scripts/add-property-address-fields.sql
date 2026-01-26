-- ================================================
-- Migration: Add Full Address and Optional Fields
-- ================================================
-- Run this in Supabase SQL Editor to add new fields
-- for enhanced property submissions

-- Add columns to property_submissions table
ALTER TABLE public.property_submissions
ADD COLUMN IF NOT EXISTS street_address TEXT,
ADD COLUMN IF NOT EXISTS postal_code TEXT,
ADD COLUMN IF NOT EXISTS full_address JSONB,
ADD COLUMN IF NOT EXISTS listed_on_platforms TEXT[],
ADD COLUMN IF NOT EXISTS other_platforms TEXT,
ADD COLUMN IF NOT EXISTS typical_response_hours INTEGER;

-- Add columns to properties table (for approved listings)
ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS street_address TEXT,
ADD COLUMN IF NOT EXISTS postal_code TEXT,
ADD COLUMN IF NOT EXISTS full_address JSONB,
ADD COLUMN IF NOT EXISTS listed_on_platforms TEXT[],
ADD COLUMN IF NOT EXISTS other_platforms TEXT,
ADD COLUMN IF NOT EXISTS typical_response_hours INTEGER;

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_submissions_postal_code 
ON property_submissions(postal_code);

CREATE INDEX IF NOT EXISTS idx_properties_postal_code 
ON properties(postal_code);

CREATE INDEX IF NOT EXISTS idx_submissions_full_address_city 
ON property_submissions USING GIN ((full_address->'city'));

CREATE INDEX IF NOT EXISTS idx_properties_full_address_city 
ON properties USING GIN ((full_address->'city'));

-- Add comment for documentation
COMMENT ON COLUMN property_submissions.full_address IS 'JSONB containing {street, city, state, postal_code, country}';
COMMENT ON COLUMN property_submissions.listed_on_platforms IS 'Array of platforms host currently lists on (Airbnb, VRBO, Booking.com, etc)';
COMMENT ON COLUMN property_submissions.typical_response_hours IS 'Expected response time in hours (1, 4, 24, or 48)';

COMMENT ON COLUMN properties.full_address IS 'JSONB containing {street, city, state, postal_code, country}';
COMMENT ON COLUMN properties.listed_on_platforms IS 'Array of platforms host currently lists on (Airbnb, VRBO, Booking.com, etc)';
COMMENT ON COLUMN properties.typical_response_hours IS 'Expected response time in hours (1, 4, 24, or 48)';

-- ================================================
-- Verification Queries
-- ================================================

-- Check if columns were added successfully
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'property_submissions'
AND column_name IN ('street_address', 'postal_code', 'full_address', 'listed_on_platforms', 'other_platforms', 'typical_response_hours')
ORDER BY column_name;

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'properties'
AND column_name IN ('street_address', 'postal_code', 'full_address', 'listed_on_platforms', 'other_platforms', 'typical_response_hours')
ORDER BY column_name;

-- Check indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename IN ('property_submissions', 'properties')
AND indexname LIKE '%postal%' OR indexname LIKE '%address%';

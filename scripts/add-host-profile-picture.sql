-- Add missing columns to property_submissions table
-- These were added to the form but not the database schema

ALTER TABLE public.property_submissions 
ADD COLUMN IF NOT EXISTS host_profile_picture TEXT,
ADD COLUMN IF NOT EXISTS street_address TEXT,
ADD COLUMN IF NOT EXISTS postal_code TEXT,
ADD COLUMN IF NOT EXISTS full_address JSONB,
ADD COLUMN IF NOT EXISTS listed_on_platforms TEXT[],
ADD COLUMN IF NOT EXISTS other_platforms TEXT,
ADD COLUMN IF NOT EXISTS typical_response_hours INTEGER;

-- Add comments for documentation
COMMENT ON COLUMN public.property_submissions.host_profile_picture IS 'Optional URL to host profile picture for display';
COMMENT ON COLUMN public.property_submissions.street_address IS 'Street address of the property';
COMMENT ON COLUMN public.property_submissions.postal_code IS 'Postal/ZIP code';
COMMENT ON COLUMN public.property_submissions.full_address IS 'Complete address as JSON object';
COMMENT ON COLUMN public.property_submissions.listed_on_platforms IS 'Array of platforms where property is listed (Airbnb, VRBO, etc)';
COMMENT ON COLUMN public.property_submissions.other_platforms IS 'Free-text field for other platforms not in the list';
COMMENT ON COLUMN public.property_submissions.typical_response_hours IS 'How many hours the host typically takes to respond';

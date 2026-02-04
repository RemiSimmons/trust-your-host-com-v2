-- Add ALL missing columns to properties table
-- Run this in Supabase SQL Editor

-- Subscription-related columns (from previous script)
ALTER TABLE properties ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT false;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT NULL;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT DEFAULT NULL;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT DEFAULT NULL;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMPTZ DEFAULT NULL;

-- Property details columns
ALTER TABLE properties ADD COLUMN IF NOT EXISTS house_rules TEXT DEFAULT NULL;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS minimum_stay INTEGER DEFAULT 1;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS external_booking_url TEXT DEFAULT NULL;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS contact_email TEXT DEFAULT NULL;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS contact_phone TEXT DEFAULT NULL;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS typical_response_hours INTEGER DEFAULT 24;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS postal_code TEXT DEFAULT NULL;

-- Approval workflow columns
ALTER TABLE properties ADD COLUMN IF NOT EXISTS pending_changes JSONB DEFAULT NULL;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS approval_status TEXT DEFAULT 'approved';

-- Timestamps
ALTER TABLE properties ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Add comments for documentation
COMMENT ON COLUMN properties.house_rules IS 'Host-defined house rules for guests';
COMMENT ON COLUMN properties.minimum_stay IS 'Minimum number of nights required';
COMMENT ON COLUMN properties.external_booking_url IS 'URL to host own booking website';
COMMENT ON COLUMN properties.contact_email IS 'Contact email for inquiries';
COMMENT ON COLUMN properties.contact_phone IS 'Contact phone for inquiries';
COMMENT ON COLUMN properties.typical_response_hours IS 'Typical response time in hours (1, 4, 24, 48)';
COMMENT ON COLUMN properties.postal_code IS 'Property postal/zip code';
COMMENT ON COLUMN properties.pending_changes IS 'JSON of changes awaiting admin approval';
COMMENT ON COLUMN properties.approval_status IS 'approved, pending_changes, rejected';

-- Verify all columns were added
SELECT column_name, data_type, column_default
FROM information_schema.columns 
WHERE table_name = 'properties'
ORDER BY ordinal_position;

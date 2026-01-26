-- ============================================
-- Property Edit System - Database Migration
-- ============================================
-- Add fields needed for the 3-tier property editing system
-- Run this in Supabase SQL Editor before deploying

-- Add pending changes field (stores changes awaiting approval)
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS pending_changes JSONB;

-- Add approval status field
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS approval_status TEXT DEFAULT 'active';

-- Add active status flag (controls directory visibility)
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Add contact fields (instant edit)
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS contact_email TEXT;

ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS contact_phone TEXT;

-- Add house rules field (instant edit)
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS house_rules TEXT;

-- Add minimum stay field (instant edit)
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS minimum_stay INTEGER DEFAULT 1;

-- Create index for trial reminder cron job performance
CREATE INDEX IF NOT EXISTS idx_properties_trial_status 
ON properties(subscription_status, trial_ends_at) 
WHERE subscription_status = 'trial';

-- Create index for active properties query
CREATE INDEX IF NOT EXISTS idx_properties_active 
ON properties(is_active, subscription_status) 
WHERE is_active = true;

-- Add comments for documentation
COMMENT ON COLUMN properties.pending_changes IS 'JSONB object storing changes that require admin approval before going live';
COMMENT ON COLUMN properties.approval_status IS 'Possible values: active, pending_changes, changes_rejected';
COMMENT ON COLUMN properties.is_active IS 'Controls directory visibility. False if payment failed or property paused.';
COMMENT ON COLUMN properties.house_rules IS 'Property rules set by host (e.g., No smoking, No parties)';
COMMENT ON COLUMN properties.minimum_stay IS 'Minimum number of nights required for booking';

-- ============================================
-- Property Submissions - Add new fields
-- ============================================
-- Add the same fields to property_submissions table

ALTER TABLE property_submissions 
ADD COLUMN IF NOT EXISTS contact_email TEXT;

ALTER TABLE property_submissions 
ADD COLUMN IF NOT EXISTS contact_phone TEXT;

ALTER TABLE property_submissions 
ADD COLUMN IF NOT EXISTS house_rules TEXT;

ALTER TABLE property_submissions 
ADD COLUMN IF NOT EXISTS minimum_stay INTEGER DEFAULT 1;

-- ============================================
-- Verification - Update default values
-- ============================================
-- Ensure all existing properties have correct defaults

UPDATE properties 
SET 
  approval_status = 'active',
  is_active = true,
  minimum_stay = 1
WHERE 
  approval_status IS NULL 
  OR is_active IS NULL 
  OR minimum_stay IS NULL;

-- ============================================
-- RLS Policies (if not already set)
-- ============================================
-- Ensure hosts can update their own properties

-- Policy: Hosts can update instant-edit fields on their own properties
CREATE POLICY IF NOT EXISTS "Hosts can update own property instant fields"
ON properties
FOR UPDATE
USING (auth.uid() = host_id)
WITH CHECK (auth.uid() = host_id);

-- Policy: Hosts can view their own pending changes
CREATE POLICY IF NOT EXISTS "Hosts can view own property pending changes"
ON properties
FOR SELECT
USING (auth.uid() = host_id OR is_active = true);

-- ============================================
-- Success message
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ Property edit system migration complete!';
  RAISE NOTICE '✅ Added: pending_changes, approval_status, is_active';
  RAISE NOTICE '✅ Added: contact_email, contact_phone, house_rules, minimum_stay';
  RAISE NOTICE '✅ Created indexes for performance';
  RAISE NOTICE '✅ Updated RLS policies';
END $$;

-- Add missing subscription-related columns to properties table
-- Run this in Supabase SQL Editor

-- Add is_active column
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT false;

-- Add subscription_status column
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT NULL;

-- Add stripe_subscription_id column
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT DEFAULT NULL;

-- Add stripe_customer_id column
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT DEFAULT NULL;

-- Add trial_ends_at column
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMPTZ DEFAULT NULL;

-- Add comments for documentation
COMMENT ON COLUMN properties.is_active IS 'Whether the property listing is currently active and visible';
COMMENT ON COLUMN properties.subscription_status IS 'Current subscription status: pending_payment, trial, active, canceled, expired';
COMMENT ON COLUMN properties.stripe_subscription_id IS 'Stripe subscription ID for billing';
COMMENT ON COLUMN properties.stripe_customer_id IS 'Stripe customer ID for billing';
COMMENT ON COLUMN properties.trial_ends_at IS 'When the trial period ends (if applicable)';

-- Verify columns were added
SELECT column_name, data_type, column_default
FROM information_schema.columns 
WHERE table_name = 'properties' 
AND column_name IN ('is_active', 'subscription_status', 'stripe_subscription_id', 'stripe_customer_id', 'trial_ends_at');

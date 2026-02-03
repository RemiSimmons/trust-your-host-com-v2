-- Add missing columns needed for Stripe checkout
-- These columns track which property is primary and the monthly subscription amount

ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS is_primary_property BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS monthly_amount DECIMAL(10,2) DEFAULT 49.00;

-- Set existing properties to primary with $49/month pricing
UPDATE properties 
SET 
  is_primary_property = true,
  monthly_amount = 49.00
WHERE is_primary_property IS NULL OR monthly_amount IS NULL;

-- Verify the changes
SELECT id, name, subscription_status, is_primary_property, monthly_amount 
FROM properties 
LIMIT 5;

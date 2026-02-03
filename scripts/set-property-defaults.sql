-- Set default values for existing properties
UPDATE properties 
SET 
  is_primary_property = COALESCE(is_primary_property, true),
  monthly_amount = COALESCE(monthly_amount, 49.00)
WHERE is_primary_property IS NULL OR monthly_amount IS NULL;

-- Verify the update
SELECT 
  id, 
  name, 
  host_id,
  subscription_status, 
  is_primary_property, 
  monthly_amount 
FROM properties
ORDER BY created_at DESC;

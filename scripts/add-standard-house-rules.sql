-- Add standard_house_rules column to properties table
-- This stores the checkbox-selected standard rules

ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS standard_house_rules TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Add index for querying
CREATE INDEX IF NOT EXISTS idx_properties_standard_house_rules 
ON properties USING GIN(standard_house_rules);

-- Add comment
COMMENT ON COLUMN properties.standard_house_rules IS 'Array of standard house rules selected by host (e.g., No smoking, No pets, etc.)';

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Added standard_house_rules column to properties table';
END $$;

-- Fix property coordinates for properties missing or with invalid coordinates

-- First, let's check current coordinates
SELECT 
  name, 
  slug,
  location->'city' as city,
  location->'coordinates'->'lat' as lat,
  location->'coordinates'->'lng' as lng
FROM properties
WHERE 
  location->'coordinates' IS NULL 
  OR location->'coordinates'->'lat' IS NULL
  OR location->'coordinates'->'lng' IS NULL
  OR (location->'coordinates'->>'lat')::float = 0
  OR (location->'coordinates'->>'lng')::float = 0;

-- Update Sandy Springs property with correct coordinates
-- Sandy Springs, GA coordinates: 33.9304° N, 84.3733° W
UPDATE properties
SET location = jsonb_set(
  jsonb_set(
    COALESCE(location, '{}'::jsonb),
    '{coordinates,lat}',
    '33.9304'::jsonb
  ),
  '{coordinates,lng}',
  '-84.3733'::jsonb
)
WHERE name ILIKE '%Sandy Springs%'
  OR slug ILIKE '%sandy-springs%';

-- Atlanta properties (if any need updating)
UPDATE properties
SET location = jsonb_set(
  jsonb_set(
    COALESCE(location, '{}'::jsonb),
    '{coordinates,lat}',
    '33.7490'::jsonb
  ),
  '{coordinates,lng}',
  '-84.3880'::jsonb
)
WHERE (location->'city')::text ILIKE '%Atlanta%'
  AND (
    location->'coordinates' IS NULL
    OR (location->'coordinates'->>'lat')::float = 0
    OR (location->'coordinates'->>'lng')::float = 0
  );

-- Verify updates
SELECT 
  name,
  slug,
  location->'city' as city,
  location->'state' as state,
  location->'coordinates'->'lat' as lat,
  location->'coordinates'->'lng' as lng
FROM properties
WHERE 
  name ILIKE '%Sandy Springs%' 
  OR slug ILIKE '%sandy-springs%'
  OR (location->'city')::text ILIKE '%Atlanta%';

-- Output confirmation
DO $$
BEGIN
  RAISE NOTICE '✅ Updated property coordinates';
  RAISE NOTICE 'Sandy Springs: 33.9304, -84.3733';
  RAISE NOTICE 'Atlanta default: 33.7490, -84.3880';
END $$;

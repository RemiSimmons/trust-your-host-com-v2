-- Trust Badges - SAFE Assignment (NO SYNTAX ERRORS)
-- Run this AFTER add-trust-badges.sql completes

-- ==============================================
-- STEP 1: Assign Verified Badges (Top 5)
-- ==============================================

UPDATE properties 
SET verified_badge = true 
WHERE id IN (
  SELECT id 
  FROM properties 
  WHERE id IS NOT NULL
  ORDER BY COALESCE(total_clicks, 0) DESC 
  LIMIT 5
);

-- Verify it worked:
SELECT COUNT(*) as verified_count 
FROM properties 
WHERE verified_badge = true;
-- Should return: 5

-- ==============================================
-- STEP 2: FIFA Featured Properties (Safe Method)
-- ==============================================

-- Method A: All FIFA properties in specific cities
UPDATE properties 
SET fifa_featured = true,
    distance_to_stadium = 2.0
WHERE is_fifa_2026 = true 
  AND location->>'city' IN ('Atlanta', 'Miami', 'Los Angeles');

-- Method B: Top 3 FIFA properties (any city)
UPDATE properties 
SET fifa_featured = true,
    distance_to_stadium = 1.5
WHERE id IN (
  SELECT id 
  FROM properties 
  WHERE is_fifa_2026 = true
  ORDER BY COALESCE(total_clicks, 0) DESC 
  LIMIT 3
);

-- Verify it worked:
SELECT name, location->>'city' as city, fifa_featured, distance_to_stadium 
FROM properties 
WHERE fifa_featured = true;

-- ==============================================
-- STEP 3: Quick Response Hosts (Simple)
-- ==============================================

-- Mark all featured properties as quick response
UPDATE properties 
SET quick_response_host = true 
WHERE featured = true;

-- OR manually select specific properties:
-- UPDATE properties 
-- SET quick_response_host = true 
-- WHERE id IN (
--   'your-property-id-1',
--   'your-property-id-2'
-- );

-- Verify it worked:
SELECT COUNT(*) as quick_response_count 
FROM properties 
WHERE quick_response_host = true;

-- ==============================================
-- STEP 4: Set Stadium Distances (By City)
-- ==============================================

-- Atlanta (Mercedes-Benz Stadium)
UPDATE properties 
SET distance_to_stadium = 2.0 
WHERE location->>'city' = 'Atlanta' 
  AND is_fifa_2026 = true
  AND distance_to_stadium IS NULL;

-- Miami/Miami Gardens (Hard Rock Stadium)
UPDATE properties 
SET distance_to_stadium = 1.5 
WHERE location->>'city' IN ('Miami', 'Miami Gardens') 
  AND is_fifa_2026 = true
  AND distance_to_stadium IS NULL;

-- Los Angeles/Inglewood (SoFi Stadium)
UPDATE properties 
SET distance_to_stadium = 3.0 
WHERE location->>'city' IN ('Los Angeles', 'Inglewood') 
  AND is_fifa_2026 = true
  AND distance_to_stadium IS NULL;

-- Boston (Gillette Stadium in Foxborough)
UPDATE properties 
SET distance_to_stadium = 2.5 
WHERE location->>'city' IN ('Boston', 'Foxborough') 
  AND is_fifa_2026 = true
  AND distance_to_stadium IS NULL;

-- New York/New Jersey (MetLife Stadium)
UPDATE properties 
SET distance_to_stadium = 2.0 
WHERE location->>'city' IN ('New York', 'East Rutherford', 'Jersey City', 'Newark') 
  AND is_fifa_2026 = true
  AND distance_to_stadium IS NULL;

-- Philadelphia (Lincoln Financial Field)
UPDATE properties 
SET distance_to_stadium = 1.8 
WHERE location->>'city' = 'Philadelphia' 
  AND is_fifa_2026 = true
  AND distance_to_stadium IS NULL;

-- Dallas (AT&T Stadium in Arlington)
UPDATE properties 
SET distance_to_stadium = 2.2 
WHERE location->>'city' IN ('Dallas', 'Arlington') 
  AND is_fifa_2026 = true
  AND distance_to_stadium IS NULL;

-- Houston (NRG Stadium)
UPDATE properties 
SET distance_to_stadium = 1.5 
WHERE location->>'city' = 'Houston' 
  AND is_fifa_2026 = true
  AND distance_to_stadium IS NULL;

-- Kansas City (Arrowhead Stadium)
UPDATE properties 
SET distance_to_stadium = 2.5 
WHERE location->>'city' = 'Kansas City' 
  AND is_fifa_2026 = true
  AND distance_to_stadium IS NULL;

-- San Francisco/Santa Clara (Levi's Stadium)
UPDATE properties 
SET distance_to_stadium = 3.5 
WHERE location->>'city' IN ('San Francisco', 'Santa Clara', 'San Jose') 
  AND is_fifa_2026 = true
  AND distance_to_stadium IS NULL;

-- Seattle (Lumen Field)
UPDATE properties 
SET distance_to_stadium = 1.0 
WHERE location->>'city' = 'Seattle' 
  AND is_fifa_2026 = true
  AND distance_to_stadium IS NULL;

-- ==============================================
-- FINAL VERIFICATION: Check All Badges
-- ==============================================

-- Summary counts
SELECT 
  COUNT(*) as total_properties,
  COUNT(*) FILTER (WHERE verified_badge = true) as verified,
  COUNT(*) FILTER (WHERE fifa_featured = true) as fifa_featured,
  COUNT(*) FILTER (WHERE quick_response_host = true) as quick_response,
  COUNT(*) FILTER (WHERE distance_to_stadium IS NOT NULL) as has_distance
FROM properties;

-- List all properties with badges
SELECT 
  name,
  location->>'city' as city,
  verified_badge as "✓",
  fifa_featured as "🏆",
  quick_response_host as "⚡",
  ROUND(distance_to_stadium::numeric, 1) as "📍 mi",
  COALESCE(weekly_views, 0) as "👀"
FROM properties 
WHERE verified_badge = true 
   OR fifa_featured = true 
   OR quick_response_host = true
   OR distance_to_stadium IS NOT NULL
ORDER BY 
  verified_badge DESC NULLS LAST,
  fifa_featured DESC NULLS LAST,
  distance_to_stadium ASC NULLS LAST;

-- Expected output: Should see properties with badges!

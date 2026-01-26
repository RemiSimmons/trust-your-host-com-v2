-- Initial Trust Badge Assignment
-- Run this AFTER running add-trust-badges.sql

-- ============================================
-- Method 1: Assign to Specific Properties
-- ============================================

-- Mark specific properties as verified (replace with actual IDs)
UPDATE properties 
SET verified_badge = true 
WHERE id IN (
  'your-property-id-1',
  'your-property-id-2',
  'your-property-id-3'
);

-- ============================================
-- Method 2: Auto-assign to Featured Properties
-- ============================================

-- Mark all featured properties as verified
UPDATE properties 
SET verified_badge = true 
WHERE featured = true;

-- ============================================
-- Method 3: Assign to Top 5 by Clicks (Safe)
-- ============================================

-- Mark top 5 most-clicked properties as verified
UPDATE properties 
SET verified_badge = true 
WHERE id IN (
  SELECT id 
  FROM properties 
  WHERE total_clicks IS NOT NULL 
  ORDER BY total_clicks DESC 
  LIMIT 5
);

-- ============================================
-- FIFA Featured Properties
-- ============================================

-- Feature top FIFA 2026 properties in each city (3 per city)
WITH ranked_fifa AS (
  SELECT 
    id,
    city,
    ROW_NUMBER() OVER (PARTITION BY city ORDER BY total_clicks DESC NULLS LAST) as rank
  FROM properties 
  WHERE is_fifa_2026 = true
)
UPDATE properties p
SET 
  fifa_featured = true,
  distance_to_stadium = 1.5 -- Default distance, update manually
FROM ranked_fifa r
WHERE p.id = r.id 
  AND r.rank <= 3;

-- ============================================
-- Quick Response Hosts (Manual Selection)
-- ============================================

-- Mark specific hosts as quick responders
UPDATE properties 
SET quick_response_host = true 
WHERE host_id IN (
  SELECT id 
  FROM profiles 
  WHERE role = 'host' 
    AND created_at < NOW() - INTERVAL '30 days' -- Established hosts
  LIMIT 10
);

-- ============================================
-- Set Distances for FIFA Cities
-- ============================================

-- Atlanta properties (Mercedes-Benz Stadium)
UPDATE properties 
SET distance_to_stadium = 2.0 
WHERE city = 'Atlanta' 
  AND is_fifa_2026 = true;

-- Miami Gardens properties (Hard Rock Stadium)
UPDATE properties 
SET distance_to_stadium = 1.5 
WHERE city IN ('Miami', 'Miami Gardens') 
  AND is_fifa_2026 = true;

-- Los Angeles properties (SoFi Stadium)
UPDATE properties 
SET distance_to_stadium = 3.0 
WHERE city IN ('Los Angeles', 'Inglewood') 
  AND is_fifa_2026 = true;

-- New York/New Jersey properties (MetLife Stadium)
UPDATE properties 
SET distance_to_stadium = 2.5 
WHERE city IN ('New York', 'East Rutherford', 'Jersey City') 
  AND is_fifa_2026 = true;

-- ============================================
-- Verification: Check Your Badges
-- ============================================

-- See how many properties have each badge
SELECT 
  COUNT(*) FILTER (WHERE verified_badge = true) as verified_count,
  COUNT(*) FILTER (WHERE fifa_featured = true) as fifa_featured_count,
  COUNT(*) FILTER (WHERE quick_response_host = true) as quick_response_count,
  COUNT(*) FILTER (WHERE distance_to_stadium IS NOT NULL) as has_distance_count
FROM properties;

-- List properties with badges
SELECT 
  name,
  city,
  verified_badge,
  fifa_featured,
  quick_response_host,
  distance_to_stadium
FROM properties 
WHERE verified_badge = true 
   OR fifa_featured = true 
   OR quick_response_host = true
ORDER BY 
  verified_badge DESC,
  fifa_featured DESC,
  quick_response_host DESC;

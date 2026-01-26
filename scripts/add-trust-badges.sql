-- Trust System - Add badge fields to properties table
-- Run this in Supabase SQL Editor

-- Add trust badge columns to properties table
ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS verified_badge BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS fifa_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS quick_response_host BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS distance_to_stadium NUMERIC(5, 2), -- in miles
ADD COLUMN IF NOT EXISTS weekly_views INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_response_time INTEGER, -- in minutes
ADD COLUMN IF NOT EXISTS host_response_rate NUMERIC(5, 2); -- percentage

-- Add indexes for filtering
CREATE INDEX IF NOT EXISTS idx_properties_verified_badge ON public.properties(verified_badge);
CREATE INDEX IF NOT EXISTS idx_properties_fifa_featured ON public.properties(fifa_featured);
CREATE INDEX IF NOT EXISTS idx_properties_quick_response ON public.properties(quick_response_host);

-- Function to calculate weekly views from property_clicks
CREATE OR REPLACE FUNCTION calculate_weekly_views(property_uuid UUID)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  view_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO view_count
  FROM property_clicks
  WHERE property_id = property_uuid
    AND clicked_at >= NOW() - INTERVAL '7 days';
  
  RETURN COALESCE(view_count, 0);
END;
$$;

-- Function to update weekly views for all properties (run this in a cron job)
CREATE OR REPLACE FUNCTION update_all_weekly_views()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE properties
  SET weekly_views = calculate_weekly_views(id);
END;
$$;

-- Add comments for documentation
COMMENT ON COLUMN properties.verified_badge IS 'Admin-verified property (manually checked)';
COMMENT ON COLUMN properties.fifa_featured IS 'Featured for FIFA 2026 (editorial curation)';
COMMENT ON COLUMN properties.quick_response_host IS 'Host responds quickly (< 1 hour avg)';
COMMENT ON COLUMN properties.distance_to_stadium IS 'Distance to nearest FIFA stadium in miles';
COMMENT ON COLUMN properties.weekly_views IS 'Number of views in past 7 days';
COMMENT ON COLUMN properties.last_response_time IS 'Last response time in minutes';
COMMENT ON COLUMN properties.host_response_rate IS 'Host response rate percentage';

-- Sample data: Mark some properties as verified (optional - for testing)
-- UPDATE properties SET verified_badge = true WHERE featured = true LIMIT 5;
-- UPDATE properties SET fifa_featured = true WHERE is_fifa_2026 = true LIMIT 3;

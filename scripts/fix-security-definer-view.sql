-- Fix Security Definer View Issue
-- The host_aggregate_analytics view is flagged by Supabase Security Advisor
-- as using SECURITY DEFINER which bypasses RLS
-- This script recreates it with SECURITY INVOKER (the secure option)

-- Drop the existing view
DROP VIEW IF EXISTS public.host_aggregate_analytics;

-- Recreate with explicit SECURITY INVOKER setting
-- This ensures the view respects the RLS policies of the querying user
CREATE VIEW public.host_aggregate_analytics 
WITH (security_invoker = true)
AS
SELECT 
  p.host_id,
  COUNT(p.id) as total_properties,
  SUM(COALESCE(p.monthly_amount, 49.00)) as total_monthly_cost,
  MIN(p.created_at) as first_property_date
FROM properties p
GROUP BY p.host_id;

COMMENT ON VIEW public.host_aggregate_analytics IS 
  'Aggregated property stats for hosts. Uses SECURITY INVOKER for RLS compliance.';

-- Grant appropriate permissions
GRANT SELECT ON public.host_aggregate_analytics TO authenticated;

-- Verify the fix
SELECT 
    schemaname,
    viewname,
    viewowner
FROM pg_views 
WHERE viewname = 'host_aggregate_analytics';

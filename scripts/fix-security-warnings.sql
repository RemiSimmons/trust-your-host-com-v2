-- ===========================================
-- Fix Security Advisor Warnings
-- Run this in Supabase SQL Editor
-- ===========================================

-- ============================================
-- 1. FIX: Function Search Path Mutable
-- Setting search_path prevents SQL injection attacks
-- ============================================

-- Fix increment_property_clicks
ALTER FUNCTION public.increment_property_clicks SET search_path = public;

-- Fix delete_user_by_email
ALTER FUNCTION public.delete_user_by_email SET search_path = public;

-- Fix calculate_weekly_views
ALTER FUNCTION public.calculate_weekly_views SET search_path = public;

-- Fix update_all_weekly_views
ALTER FUNCTION public.update_all_weekly_views SET search_path = public;

-- Fix update_host_property_count
ALTER FUNCTION public.update_host_property_count SET search_path = public;

-- Fix is_primary_property
ALTER FUNCTION public.is_primary_property SET search_path = public;

-- Fix calculate_property_subscription_amount
ALTER FUNCTION public.calculate_property_subscription_amount SET search_path = public;

-- Fix get_host_total_monthly_cost
ALTER FUNCTION public.get_host_total_monthly_cost SET search_path = public;

-- Fix approve_change_request
ALTER FUNCTION public.approve_change_request SET search_path = public;

-- Fix reject_change_request
ALTER FUNCTION public.reject_change_request SET search_path = public;

-- Fix handle_new_user
ALTER FUNCTION public.handle_new_user SET search_path = public;

-- ============================================
-- 2. FIX: RLS Policy Always True
-- property_submissions has overly permissive policy
-- ============================================

-- First, let's see the current policies
-- SELECT * FROM pg_policies WHERE tablename = 'property_submissions';

-- Drop ALL existing policies on property_submissions first
DROP POLICY IF EXISTS "Anyone can view submissions" ON public.property_submissions;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.property_submissions;
DROP POLICY IF EXISTS "Users can view own submissions" ON public.property_submissions;
DROP POLICY IF EXISTS "Anyone can submit properties" ON public.property_submissions;
DROP POLICY IF EXISTS "Admins can view all submissions" ON public.property_submissions;
DROP POLICY IF EXISTS "Admins can update submissions" ON public.property_submissions;
DROP POLICY IF EXISTS "Admins can delete submissions" ON public.property_submissions;

-- Create proper restrictive policies

-- Submitters can view their own submissions (using host_email column)
CREATE POLICY "Users can view own submissions"
ON public.property_submissions
FOR SELECT
USING (
  -- Allow if host_email matches the authenticated user's email
  auth.jwt() ->> 'email' = host_email
  OR
  -- Or if user is an admin
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Allow public inserts for the submission form (anonymous + authenticated)
CREATE POLICY "Anyone can submit properties"
ON public.property_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can update submissions (for approval/rejection)
CREATE POLICY "Admins can update submissions"
ON public.property_submissions
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Only admins can delete submissions
CREATE POLICY "Admins can delete submissions"
ON public.property_submissions
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- ============================================
-- 3. FIX: Leaked Password Protection
-- This needs to be enabled in Supabase Dashboard
-- Go to: Authentication > Settings > Security
-- Enable "Leaked password protection"
-- ============================================

-- Note: This cannot be fixed via SQL. 
-- You must enable it in the Supabase Dashboard:
-- 1. Go to Authentication
-- 2. Click on "Providers" or "Settings"
-- 3. Find "Security" section
-- 4. Enable "Leaked password protection" (HaveIBeenPwned check)

-- ============================================
-- Verify all fixes
-- ============================================

-- Check functions have search_path set
SELECT 
  proname as function_name,
  proconfig as config
FROM pg_proc 
WHERE proname IN (
  'increment_property_clicks',
  'delete_user_by_email', 
  'calculate_weekly_views',
  'update_all_weekly_views',
  'update_host_property_count',
  'is_primary_property',
  'calculate_property_subscription_amount',
  'get_host_total_monthly_cost',
  'approve_change_request',
  'reject_change_request',
  'handle_new_user'
)
AND pronamespace = 'public'::regnamespace;

-- Check RLS policies on property_submissions
SELECT 
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'property_submissions';

-- ============================================
-- DONE! Remember to also:
-- Enable "Leaked Password Protection" in Dashboard
-- Authentication > Settings > Security
-- ============================================

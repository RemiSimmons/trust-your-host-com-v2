-- Fix RLS Policy for Property Submissions
-- This allows anonymous (unauthenticated) users to submit properties

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Anyone can submit properties" ON public.property_submissions;

-- Recreate the policy to allow anonymous inserts
CREATE POLICY "Anyone can submit properties"
  ON public.property_submissions 
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Verify RLS is enabled
ALTER TABLE public.property_submissions ENABLE ROW LEVEL SECURITY;

-- Test: This should show the policy exists
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'property_submissions';

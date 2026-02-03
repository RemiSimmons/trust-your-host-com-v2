-- ================================================================
-- AUTOMATIC USER DELETION - NO MANUAL IDS NEEDED
-- ================================================================
-- This script automatically finds and deletes all aderemis@gmail.com accounts
-- ================================================================

-- STEP 1: See what we're about to delete
SELECT 
  'auth.users' as table_name,
  id,
  email,
  created_at
FROM auth.users
WHERE email = 'aderemis@gmail.com'

UNION ALL

SELECT 
  'profiles' as table_name,
  id,
  email,
  created_at
FROM public.profiles
WHERE email = 'aderemis@gmail.com';

-- STEP 2: Delete all data for aderemis@gmail.com users
-- Delete bookings
DELETE FROM public.bookings 
WHERE user_id IN (SELECT id FROM public.profiles WHERE email = 'aderemis@gmail.com');

-- Delete reviews
DELETE FROM public.reviews 
WHERE user_id IN (SELECT id FROM public.profiles WHERE email = 'aderemis@gmail.com');

-- Delete properties
DELETE FROM public.properties 
WHERE host_id IN (SELECT id FROM public.profiles WHERE email = 'aderemis@gmail.com');

-- Delete profiles (this might fail if auth.users still exists)
DELETE FROM public.profiles 
WHERE email = 'aderemis@gmail.com';

-- Delete from auth.users (should cascade if setup correctly)
DELETE FROM auth.users 
WHERE email = 'aderemis@gmail.com';

-- STEP 3: Set admin role
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'contact@remisimmons.com';

-- STEP 4: VERIFY - Should only show contact@remisimmons.com
SELECT 
  au.id,
  au.email,
  p.role,
  p.full_name,
  au.created_at
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
ORDER BY au.created_at DESC;

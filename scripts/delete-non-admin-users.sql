-- ================================================================
-- DELETE NON-ADMIN USERS
-- ================================================================
-- This script will delete all users EXCEPT the admin account
-- CAUTION: This is irreversible! Review the users to be deleted first.
-- ================================================================

-- STEP 1: First, let's see who will be kept (ADMIN)
-- Copy this query result to confirm the admin account
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.profiles
WHERE email = 'contact@remisimmons.com';

-- ================================================================
-- STEP 2: See who will be DELETED (all non-admin users)
-- Review this list carefully before proceeding
-- ================================================================
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.profiles
WHERE email != 'contact@remisimmons.com'
ORDER BY created_at DESC;

-- ================================================================
-- STEP 3: DELETE non-admin users from auth.users
-- This will cascade and delete from profiles table automatically
-- due to the foreign key constraint
-- ================================================================
-- UNCOMMENT THE LINE BELOW ONLY AFTER REVIEWING STEPS 1 & 2

-- DELETE FROM auth.users
-- WHERE email != 'contact@remisimmons.com';

-- ================================================================
-- STEP 4: Verify deletion - should only show admin
-- ================================================================
-- Run this after deletion to confirm
-- SELECT 
--   id,
--   email,
--   full_name,
--   role,
--   created_at
-- FROM public.profiles
-- ORDER BY created_at DESC;

-- ================================================================
-- ADDITIONAL: Update admin role if needed
-- ================================================================
-- If the admin user doesn't have role='admin', update it:
-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE email = 'contact@remisimmons.com';

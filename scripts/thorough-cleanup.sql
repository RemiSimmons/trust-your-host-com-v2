-- ================================================================
-- THOROUGH ACCOUNT CLEANUP
-- ================================================================

-- STEP 1: Check what's in auth.users (the source of truth)
SELECT 
  id,
  email,
  created_at,
  last_sign_in_at
FROM auth.users
ORDER BY created_at DESC;

-- STEP 2: Check what's in profiles
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.profiles
ORDER BY created_at DESC;

-- STEP 3: Delete ALL aderemis@gmail.com accounts from auth.users
-- This should cascade to profiles automatically
DELETE FROM auth.users
WHERE email = 'aderemis@gmail.com';

-- STEP 4: Double-check: If any orphaned profiles exist, delete them too
DELETE FROM public.profiles
WHERE email = 'aderemis@gmail.com'
  AND id NOT IN (SELECT id FROM auth.users);

-- STEP 5: Update admin role
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'contact@remisimmons.com';

-- STEP 6: Final verification - should only show admin
SELECT 
  au.id,
  au.email,
  au.created_at as auth_created,
  p.full_name,
  p.role,
  p.created_at as profile_created
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
ORDER BY au.created_at DESC;

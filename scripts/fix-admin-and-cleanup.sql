-- ================================================================
-- FIX ADMIN ROLE & DELETE TEST ACCOUNTS
-- ================================================================

-- STEP 1: Update admin role for contact@remisimmons.com
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'contact@remisimmons.com';

-- STEP 2: Verify admin was updated
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.profiles
WHERE email = 'contact@remisimmons.com';

-- STEP 3: Delete the other test accounts (aderemis@gmail.com)
DELETE FROM auth.users
WHERE email = 'aderemis@gmail.com';

-- STEP 4: Verify only admin account remains
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.profiles
ORDER BY created_at DESC;

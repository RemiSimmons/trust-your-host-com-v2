-- ================================================================
-- PERMANENT USER DELETION (Handles Active Sessions)
-- ================================================================
-- This deletes users AND revokes all their sessions/tokens
-- ================================================================

-- STEP 1: Check current users
SELECT 
  id,
  email,
  created_at,
  last_sign_in_at,
  confirmed_at
FROM auth.users
ORDER BY created_at DESC;

-- STEP 2: Find the ID of aderemis@gmail.com account
-- Copy the ID from the result above

-- STEP 3: Delete user by ID (not by email)
-- Replace 'USER_ID_HERE' with the actual UUID from Step 1
-- Example: DELETE FROM auth.users WHERE id = 'f97cc4cb-019c-44ad-827a-5914d0a7c24c';

-- DELETE FROM auth.users WHERE id = 'PASTE_ID_HERE';

-- STEP 4: If multiple aderemis@gmail.com accounts exist, delete all at once
DELETE FROM auth.users 
WHERE email = 'aderemis@gmail.com';

-- STEP 5: Ensure admin role is set
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'contact@remisimmons.com';

-- STEP 6: Final check - should only show contact@remisimmons.com
SELECT 
  au.id,
  au.email,
  au.last_sign_in_at,
  p.role,
  p.full_name
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
ORDER BY au.created_at DESC;

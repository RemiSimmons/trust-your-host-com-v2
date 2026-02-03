-- ================================================================
-- FORCE DELETE USER (Bypasses RLS)
-- ================================================================
-- This creates a function with security definer to bypass RLS
-- and force delete users even with foreign key constraints
-- ================================================================

-- Step 1: Create admin function to delete users
CREATE OR REPLACE FUNCTION delete_user_by_email(user_email TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER -- This runs with elevated privileges
AS $$
BEGIN
  -- Delete from auth.users (cascades to profiles and all related tables)
  DELETE FROM auth.users WHERE email = user_email;
END;
$$;

-- Step 2: Use the function to delete aderemis@gmail.com
SELECT delete_user_by_email('aderemis@gmail.com');

-- Step 3: Update admin role
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'contact@remisimmons.com';

-- Step 4: Verify deletion
SELECT 
  au.email,
  p.role,
  p.full_name,
  au.created_at
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
ORDER BY au.created_at DESC;

-- Step 5: Clean up - drop the function (optional, for security)
-- DROP FUNCTION IF EXISTS delete_user_by_email(TEXT);

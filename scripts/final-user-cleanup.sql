-- ================================================================
-- FINAL USER CLEANUP - Handles ALL Foreign Key Constraints
-- ================================================================
-- This includes property_submissions which was blocking deletion
-- ================================================================

-- STEP 1: Check what submissions are blocking deletion
SELECT 
  ps.id,
  ps.property_name,
  ps.host_email,
  ps.status,
  ps.reviewed_by,
  p.email as reviewed_by_email
FROM public.property_submissions ps
LEFT JOIN public.profiles p ON ps.reviewed_by = p.id
WHERE p.email = 'aderemis@gmail.com';

-- STEP 2: Clear reviewed_by references (set to NULL for submissions they reviewed)
UPDATE public.property_submissions
SET reviewed_by = NULL
WHERE reviewed_by IN (
  SELECT id FROM public.profiles WHERE email = 'aderemis@gmail.com'
);

-- STEP 3: Delete property submissions BY them (if any)
DELETE FROM public.property_submissions
WHERE host_email = 'aderemis@gmail.com';

-- STEP 4: Delete all other related data
DELETE FROM public.bookings 
WHERE user_id IN (SELECT id FROM public.profiles WHERE email = 'aderemis@gmail.com');

DELETE FROM public.reviews 
WHERE user_id IN (SELECT id FROM public.profiles WHERE email = 'aderemis@gmail.com');

DELETE FROM public.properties 
WHERE host_id IN (SELECT id FROM public.profiles WHERE email = 'aderemis@gmail.com');

-- STEP 5: Delete the profile
DELETE FROM public.profiles 
WHERE email = 'aderemis@gmail.com';

-- STEP 6: Delete from auth.users
DELETE FROM auth.users 
WHERE email = 'aderemis@gmail.com';

-- STEP 7: Set admin role
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'contact@remisimmons.com';

-- STEP 8: FINAL VERIFICATION (should only show contact@remisimmons.com)
SELECT 
  au.email,
  p.role,
  p.full_name,
  au.created_at
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
ORDER BY au.created_at DESC;

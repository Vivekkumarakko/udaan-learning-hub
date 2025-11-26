-- Drop the insecure view
DROP VIEW IF EXISTS public.user_overview;

-- We'll query the tables directly from the admin dashboard with proper RLS instead of using a view
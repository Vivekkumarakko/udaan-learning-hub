-- Add admin role to app_role enum
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'admin';

-- Create admin activity log table
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  action text NOT NULL,
  details jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on admin activity logs
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view activity logs
CREATE POLICY "Admins can view all activity logs"
ON public.admin_activity_logs
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Create a view for user overview (for admin panel)
CREATE OR REPLACE VIEW public.user_overview AS
SELECT 
  p.user_id,
  p.full_name,
  p.role,
  p.created_at as profile_created_at,
  sp.class_level as student_class,
  sp.points as student_points,
  tp.verified as tutor_verified,
  tp.subjects as tutor_subjects,
  (SELECT COUNT(*) FROM class_enrollments ce WHERE ce.student_id = p.user_id) as classes_enrolled,
  (SELECT COUNT(*) FROM classes c WHERE c.tutor_id = p.user_id) as classes_created
FROM profiles p
LEFT JOIN student_profiles sp ON sp.user_id = p.user_id
LEFT JOIN tutor_profiles tp ON tp.user_id = p.user_id;

-- Grant access to the view for admins
GRANT SELECT ON public.user_overview TO authenticated;

-- RLS policy for viewing user overview
CREATE POLICY "Admins can view user overview"
ON profiles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin') OR auth.uid() = user_id);
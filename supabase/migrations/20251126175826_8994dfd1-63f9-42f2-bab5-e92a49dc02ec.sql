-- Create a function to auto-assign admin role for specific emails
CREATE OR REPLACE FUNCTION public.handle_admin_users()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if the user's email should have admin privileges
  IF NEW.email IN ('manaeevivek@gmail.com', 'vivekkumargreat9@gmail.com') THEN
    -- Insert admin role if it doesn't exist
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
    
    -- Update the profile role to admin
    UPDATE public.profiles
    SET role = 'admin'::app_role
    WHERE user_id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to run after user is created
DROP TRIGGER IF EXISTS on_auth_user_admin_check ON auth.users;
CREATE TRIGGER on_auth_user_admin_check
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_admin_users();

-- Grant admin role to existing users with these emails (if they exist)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email IN ('manaeevivek@gmail.com', 'vivekkumargreat9@gmail.com')
ON CONFLICT (user_id, role) DO NOTHING;

-- Update existing profiles to admin role
UPDATE public.profiles
SET role = 'admin'::app_role
WHERE user_id IN (
  SELECT id FROM auth.users 
  WHERE email IN ('manaeevivek@gmail.com', 'vivekkumargreat9@gmail.com')
);
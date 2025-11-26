import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Shield, Lock, Mail } from 'lucide-react';
import { z } from 'zod';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Check if already logged in as admin
  useEffect(() => {
    const checkAdminSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (data) {
          navigate('/admin-dashboard');
        }
      }
    };
    
    checkAdminSession();
  }, [navigate]);

  const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  });

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validated = loginSchema.parse({ email: email.trim(), password });

      const { data, error } = await supabase.auth.signInWithPassword({
        email: validated.email,
        password: validated.password,
      });

      if (error) throw error;

      if (data.user) {
        // Verify user has admin role
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (roleError || !roleData) {
          // Not an admin - sign them out
          await supabase.auth.signOut();
          throw new Error('Access denied. This login is for administrators only.');
        }

        toast({
          title: 'Admin Access Granted',
          description: 'Welcome to the admin panel',
        });

        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 1000);
      }
    } catch (error: any) {
      console.error('Admin login error:', error);
      toast({
        title: 'Login Failed',
        description: error.message || 'Invalid credentials or insufficient permissions',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-destructive/90 via-destructive to-destructive/80 flex items-center justify-center p-4 animate-fade-in-up">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
        }} />
      </div>

      <Card className="w-full max-w-md animate-bounce-in shadow-2xl border-destructive/20 relative z-10">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-20 h-20 bg-destructive rounded-2xl flex items-center justify-center shadow-colored animate-pulse-glow">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-destructive animate-slide-in-right flex items-center justify-center gap-2">
              <Lock className="w-6 h-6" />
              Admin Access
            </CardTitle>
            <CardDescription className="text-base mt-2 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
              Authorized personnel only
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="admin-email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Admin Email
              </Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={255}
                className="border-destructive/30 focus:border-destructive"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                maxLength={100}
                className="border-destructive/30 focus:border-destructive"
                autoComplete="current-password"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-destructive hover:bg-destructive/90 text-white font-semibold py-6 text-lg shadow-lg" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Verifying...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Access Admin Panel
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground"
            >
              ← Back to Home
            </Button>
          </div>

          {/* Security notice */}
          <div className="mt-6 p-4 bg-warning/10 border border-warning/30 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              🔒 All admin access attempts are logged and monitored for security purposes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;

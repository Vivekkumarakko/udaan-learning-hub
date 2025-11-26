import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { z } from 'zod';

const Auth = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if user is already logged in
  useState(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Redirect based on role
        supabase.from('user_roles').select('role').eq('user_id', session.user.id).single()
          .then(({ data }) => {
            if (data?.role === 'admin') navigate('/admin-dashboard');
            else if (data?.role === 'tutor') navigate('/tutor-dashboard');
            else navigate('/student-dashboard');
          });
      }
    });
  });

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'student' | 'tutor' | 'parent'>('student');
  const [classLevel, setClassLevel] = useState('');

  // Validation schema
  const signupSchema = z.object({
    email: z.string().email('Invalid email address').max(255),
    password: z.string().min(6, 'Password must be at least 6 characters').max(100),
    fullName: z.string().trim().min(1, 'Name is required').max(100),
  });

  const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate inputs
      const validated = signupSchema.parse({ email: email.trim(), password, fullName: fullName.trim() });

      const { data, error } = await supabase.auth.signUp({
        email: validated.email,
        password: validated.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: validated.fullName,
            role,
            ...(role === 'student' && classLevel ? { class_level: classLevel } : {}),
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Create role-specific profile
        if (role === 'student') {
          await supabase.from('student_profiles').insert({
            user_id: data.user.id,
            class_level: classLevel || 'nursery',
          });
        } else if (role === 'tutor') {
          await supabase.from('tutor_profiles').insert({
            user_id: data.user.id,
          });
        }

        toast({
          title: 'Success!',
          description: 'Account created successfully. Redirecting...',
        });

        setTimeout(() => {
          if (role === 'student') navigate('/student-dashboard');
          else if (role === 'tutor') navigate('/tutor-dashboard');
          else navigate('/');
        }, 1000);
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: 'Signup Failed',
        description: error.message || 'Please check your information and try again',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
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
        // Get user role
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .single();

        toast({
          title: 'Welcome back!',
          description: 'Logging you in...',
        });

        setTimeout(() => {
          if (roleData?.role === 'admin') navigate('/admin-dashboard');
          else if (roleData?.role === 'student') navigate('/student-dashboard');
          else if (roleData?.role === 'tutor') navigate('/tutor-dashboard');
          else navigate('/');
        }, 1000);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: 'Login Failed',
        description: error.message || 'Invalid email or password',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-rainbow flex items-center justify-center p-4 animate-fade-in-up">
      <LanguageToggle />
      
      <Card className="w-full max-w-md animate-bounce-in shadow-colored">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary animate-slide-in-right">
            {t('app.title')}
          </CardTitle>
          <CardDescription className="text-base animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
            {isLogin ? 'Sign in to your account' : 'Create your free account'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={isLogin ? 'login' : 'signup'} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login" onClick={() => setIsLogin(true)}>
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" onClick={() => setIsLogin(false)}>
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    maxLength={255}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    maxLength={100}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">I am a...</Label>
                  <Select value={role} onValueChange={(value: any) => setRole(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student (बच्चा)</SelectItem>
                      <SelectItem value="tutor">Volunteer Tutor (शिक्षक)</SelectItem>
                      <SelectItem value="parent">Parent (माता-पिता)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    maxLength={100}
                  />
                </div>

                {role === 'student' && (
                  <div className="space-y-2">
                    <Label htmlFor="classLevel">Class</Label>
                    <Select value={classLevel} onValueChange={setClassLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nursery">Nursery</SelectItem>
                        <SelectItem value="kg">KG</SelectItem>
                        <SelectItem value="1">Class 1</SelectItem>
                        <SelectItem value="2">Class 2</SelectItem>
                        <SelectItem value="3">Class 3</SelectItem>
                        <SelectItem value="4">Class 4</SelectItem>
                        <SelectItem value="5">Class 5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    maxLength={255}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    maxLength={100}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => navigate('/')}
              className="text-muted-foreground"
            >
              ← Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

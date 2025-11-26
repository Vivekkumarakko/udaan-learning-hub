import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LanguageToggle } from '@/components/LanguageToggle';
import { BookOpen, Users, Calendar, Upload, LogOut, Video } from 'lucide-react';
import { SectionCard } from '@/components/SectionCard';
import { useToast } from '@/components/ui/use-toast';

const TutorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tutor, setTutor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ classes: 0, students: 0, content: 0 });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    // Get or create tutor profile
    const { data: existingProfile, error: profileError } = await supabase
      .from('tutor_profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .maybeSingle();

    if (profileError) {
      console.error('Error loading tutor profile', profileError);
      toast({
        title: 'Error',
        description: 'Could not load your tutor profile. Please try again.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    let tutorProfile = existingProfile;

    if (!tutorProfile) {
      const { data: newProfile, error: insertError } = await supabase
        .from('tutor_profiles')
        .insert({
          user_id: session.user.id,
        })
        .select('*')
        .maybeSingle();

      if (insertError || !newProfile) {
        console.error('Error creating tutor profile', insertError);
        toast({
          title: 'Profile not found',
          description: 'We could not create your tutor profile. Please contact support.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      tutorProfile = newProfile;
    }

    // Load basic user info for greeting
    const { data: profileInfo } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('user_id', session.user.id)
      .maybeSingle();

    setTutor({ ...tutorProfile, full_name: profileInfo?.full_name });

    // Get stats
    const { count: classCount } = await supabase
      .from('classes')
      .select('*', { count: 'exact', head: true })
      .eq('tutor_id', session.user.id);

    const { count: contentCount } = await supabase
      .from('learning_content')
      .select('*', { count: 'exact', head: true })
      .eq('tutor_id', session.user.id);

    setStats({ classes: classCount || 0, students: 0, content: contentCount || 0 });
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Logged out',
      description: 'Thank you for your service!',
    });
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const sections = [
    {
      title: 'My Classes',
      subtitle: `${stats.classes} Active`,
      icon: BookOpen,
      gradient: 'bg-gradient-primary',
      route: '/tutor/classes',
    },
    {
      title: 'Schedule Class',
      subtitle: 'Create Live Session',
      icon: Calendar,
      gradient: 'bg-gradient-secondary',
      route: '/tutor/schedule',
    },
    {
      title: 'Upload Content',
      subtitle: 'Add Learning Material',
      icon: Upload,
      gradient: 'bg-gradient-success',
      route: '/tutor/upload',
    },
    {
      title: 'My Students',
      subtitle: 'View Progress',
      icon: Users,
      gradient: 'bg-gradient-warm',
      route: '/tutor/students',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <LanguageToggle />

      {/* Header */}
      <div className="bg-gradient-rainbow py-8 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              Welcome, Teacher {tutor?.full_name || 'Udaan Mentor'}! 📚
            </h1>
            <p className="text-white/90 mt-1">
              {tutor?.verified ? '✓ Verified Tutor' : 'Pending Verification'}
            </p>
          </div>
          <Button onClick={handleLogout} variant="secondary" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section, idx) => (
            <SectionCard
              key={idx}
              title={section.title}
              subtitle={section.subtitle}
              icon={section.icon}
              gradient={section.gradient}
              onClick={() => navigate(section.route)}
            />
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-primary rounded-full p-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold">{stats.classes}</div>
                <div className="text-muted-foreground">Total Classes</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-success rounded-full p-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold">{stats.content}</div>
                <div className="text-muted-foreground">Content Uploaded</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-warm rounded-full p-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold">{stats.students}</div>
                <div className="text-muted-foreground">Students Reached</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="h-auto py-4" onClick={() => navigate('/tutor/schedule')}>
              <Calendar className="w-5 h-5 mr-2" />
              <div className="text-left">
                <div className="font-semibold">Schedule a Live Class</div>
                <div className="text-xs opacity-90">Create a new teaching session</div>
              </div>
            </Button>
            <Button className="h-auto py-4" variant="secondary" onClick={() => navigate('/tutor/upload')}>
              <Video className="w-5 h-5 mr-2" />
              <div className="text-left">
                <div className="font-semibold">Upload Learning Material</div>
                <div className="text-xs opacity-90">Add videos, worksheets, or quizzes</div>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TutorDashboard;

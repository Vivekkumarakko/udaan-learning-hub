import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Video, Sparkles, Trophy, LogOut } from 'lucide-react';
import { SectionCard } from '@/components/SectionCard';
import { useToast } from '@/components/ui/use-toast';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    // Get student profile
    const { data: profile } = await supabase
      .from('student_profiles')
      .select('*, profiles(*)')
      .eq('user_id', session.user.id)
      .single();

    if (!profile) {
      navigate('/auth');
      return;
    }

    setStudent(profile);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Logged out',
      description: 'See you soon!',
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
      title: t('nav.study'),
      subtitle: `Class ${student?.class_level}`,
      icon: BookOpen,
      gradient: 'bg-gradient-primary',
      route: '/study',
    },
    {
      title: t('nav.videos'),
      subtitle: 'Watch & Learn',
      icon: Video,
      gradient: 'bg-gradient-success',
      route: '/videos',
    },
    {
      title: t('nav.fun'),
      subtitle: 'Games & Activities',
      icon: Sparkles,
      gradient: 'bg-gradient-secondary',
      route: '/fun',
    },
    {
      title: 'My Progress',
      subtitle: `${student?.points || 0} Points`,
      icon: Trophy,
      gradient: 'bg-gradient-warm',
      route: '/progress',
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
              Welcome, {student?.profiles?.full_name}! 👋
            </h1>
            <p className="text-white/90 mt-1">Ready to learn something new today?</p>
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

        {/* Recent Activity */}
        <Card className="mt-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Your Recent Activity</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Keep learning every day to unlock more badges and rewards! 🎯
            </p>
            <div className="flex gap-4">
              <div className="bg-gradient-primary rounded-lg p-4 flex-1 text-white">
                <div className="text-3xl font-bold">{student?.badges?.length || 0}</div>
                <div className="text-sm opacity-90">Badges Earned</div>
              </div>
              <div className="bg-gradient-success rounded-lg p-4 flex-1 text-white">
                <div className="text-3xl font-bold">{student?.points || 0}</div>
                <div className="text-sm opacity-90">Total Points</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;

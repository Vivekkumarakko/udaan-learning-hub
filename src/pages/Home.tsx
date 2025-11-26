import { BookOpen, Sparkles, Video, Heart, Users, Trash2, LogIn, Shield } from 'lucide-react';
import { SectionCard } from '@/components/SectionCard';
import { LanguageToggle } from '@/components/LanguageToggle';
import { UdaanBuddy } from '@/components/UdaanBuddy';
import { FloatingElements } from '@/components/FloatingElements';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const sections = [
    {
      title: t('nav.study'),
      icon: BookOpen,
      gradient: 'bg-gradient-primary',
      route: '/study',
    },
    {
      title: t('nav.fun'),
      icon: Sparkles,
      gradient: 'bg-gradient-secondary',
      route: '/fun',
    },
    {
      title: t('nav.videos'),
      icon: Video,
      gradient: 'bg-gradient-success',
      route: '/videos',
    },
    {
      title: t('nav.lifeskills'),
      icon: Heart,
      gradient: 'bg-gradient-warm',
      route: '/life-skills',
    },
    {
      title: t('nav.civic'),
      icon: Trash2,
      gradient: 'bg-gradient-success',
      route: '/civic-sense',
    },
    {
      title: t('nav.parents'),
      icon: Users,
      gradient: 'bg-gradient-primary',
      route: '/parents',
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingElements />
      <LanguageToggle />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-rainbow py-16 px-4 animate-fade-in-up">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          {/* Animated Logo/Icon */}
          <div className="mb-6 flex justify-center animate-bounce-fun">
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 inline-block animate-rainbow-pulse shadow-2xl">
              <BookOpen className="w-16 h-16 text-white" strokeWidth={2.5} />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl animate-bounce-in">
            {t('app.title')}
          </h1>
          <p className="text-2xl md:text-3xl text-white/95 font-semibold animate-slide-in-right mb-2" style={{ animationDelay: '0.2s' }}>
            {t('app.subtitle')}
          </p>
          <p className="text-lg md:text-xl text-white/90 mt-3 max-w-2xl mx-auto animate-slide-in-right leading-relaxed" style={{ animationDelay: '0.3s' }}>
            {t('app.tagline')}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Button 
              onClick={() => navigate('/auth')} 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold shadow-2xl animate-bounce-in hover:scale-110 transition-all text-lg py-6 px-8"
              style={{ animationDelay: '0.4s' }}
            >
              <LogIn className="w-6 h-6 mr-2" />
              Student / Tutor Login
            </Button>
            <Button 
              onClick={() => navigate('/admin-login')} 
              size="lg"
              variant="secondary"
              className="bg-destructive text-white hover:bg-destructive/90 font-bold shadow-2xl animate-bounce-in hover:scale-110 transition-all border-4 border-white text-lg py-6 px-8"
              style={{ animationDelay: '0.5s' }}
            >
              <Shield className="w-6 h-6 mr-2" />
              Admin Access
            </Button>
          </div>
        </div>
      </div>

      {/* Main Sections Grid */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground animate-fade-in-up">
          Explore Learning Sections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sections.map((section, idx) => (
            <div 
              key={idx}
              className="animate-bounce-in hover:scale-105 transition-transform"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <SectionCard
                title={section.title}
                icon={section.icon}
                gradient={section.gradient}
                onClick={() => navigate(section.route)}
              />
            </div>
          ))}
        </div>
      </div>

      <UdaanBuddy />
    </div>
  );
};

export default Home;

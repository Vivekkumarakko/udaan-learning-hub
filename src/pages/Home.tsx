import { BookOpen, Sparkles, Video, Heart, Users, Trash2, LogIn, Shield, Star, Zap, Award } from 'lucide-react';
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingElements />
      <LanguageToggle />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-rainbow py-20 px-4 animate-fade-in-up">
        {/* Enhanced Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/4 right-1/4 w-36 h-36 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-1/4 left-1/4 w-28 h-28 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Floating Stars */}
          <Star className="absolute top-20 left-20 w-8 h-8 text-white/30 animate-bounce" style={{ animationDelay: '0.3s' }} />
          <Star className="absolute top-32 right-32 w-6 h-6 text-white/40 animate-bounce" style={{ animationDelay: '0.8s' }} />
          <Sparkles className="absolute bottom-32 left-40 w-10 h-10 text-white/20 animate-pulse" style={{ animationDelay: '1.2s' }} />
          <Zap className="absolute bottom-40 right-40 w-7 h-7 text-white/30 animate-pulse" style={{ animationDelay: '0.6s' }} />
          <Award className="absolute top-40 right-60 w-8 h-8 text-white/25 animate-bounce" style={{ animationDelay: '1.5s' }} />
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          {/* Enhanced Animated Logo with Pulsing Glow */}
          <div className="mb-8 flex justify-center animate-bounce-fun">
            <div className="relative">
              <div className="absolute inset-0 bg-white/30 rounded-3xl blur-xl animate-pulse" />
              <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 inline-block animate-rainbow-pulse shadow-2xl border-4 border-white/30">
                <BookOpen className="w-20 h-20 text-white drop-shadow-lg" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          
          {/* Animated Title with Shadow */}
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl animate-bounce-in" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            {t('app.title')}
          </h1>
          
          {/* Subtitle with Stagger Effect */}
          <div className="space-y-3">
            <p className="text-3xl md:text-4xl text-white/95 font-bold animate-slide-in-right tracking-wide" style={{ animationDelay: '0.2s', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
              {t('app.subtitle')}
            </p>
            <p className="text-xl md:text-2xl text-white/90 mt-4 max-w-3xl mx-auto animate-slide-in-right leading-relaxed font-medium" style={{ animationDelay: '0.3s', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
              {t('app.tagline')}
            </p>
          </div>
          
          {/* Enhanced Action Buttons with Glow */}
          <div className="flex flex-col sm:flex-row gap-5 mt-12 justify-center">
            <Button 
              onClick={() => navigate('/auth')} 
              size="lg"
              className="relative bg-white text-primary hover:bg-white/90 font-bold shadow-2xl animate-bounce-in hover:scale-110 transition-all text-xl py-7 px-10 border-4 border-white/50 group overflow-hidden"
              style={{ animationDelay: '0.4s' }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <LogIn className="w-7 h-7 mr-3 relative z-10" />
              <span className="relative z-10">Student / Tutor Login</span>
            </Button>
            <Button 
              onClick={() => navigate('/admin-login')} 
              size="lg"
              variant="secondary"
              className="relative bg-destructive text-white hover:bg-destructive/90 font-bold shadow-2xl animate-bounce-in hover:scale-110 transition-all border-4 border-white text-xl py-7 px-10 group overflow-hidden"
              style={{ animationDelay: '0.5s' }}
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Shield className="w-7 h-7 mr-3 relative z-10" />
              <span className="relative z-10">Admin Access</span>
            </Button>
          </div>

          {/* Decorative Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full border-2 border-white/30 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-semibold">Free Learning</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full border-2 border-white/30 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-300" />
              <span className="text-white font-semibold">Fun Activities</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full border-2 border-white/30 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-300" />
              <span className="text-white font-semibold">Earn Badges</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Section */}
      <div className="relative py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose Udaan Learning?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Making education accessible, fun, and engaging for every child
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {[
              { icon: BookOpen, title: 'Quality Content', desc: 'Curriculum-aligned lessons', color: 'text-blue-500', delay: '0.1s' },
              { icon: Video, title: 'Video Learning', desc: 'Engaging visual lessons', color: 'text-purple-500', delay: '0.2s' },
              { icon: Sparkles, title: 'Fun Activities', desc: 'Games, puzzles & quizzes', color: 'text-pink-500', delay: '0.3s' },
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="bg-card border-2 border-border rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all animate-bounce-in"
                style={{ animationDelay: feature.delay }}
              >
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10`}>
                    <feature.icon className={`w-12 h-12 ${feature.color}`} strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Main Sections Grid */}
          <div className="text-center mb-10 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Explore Learning Sections
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose your adventure and start learning today!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sections.map((section, idx) => (
              <div 
                key={idx}
                className="animate-bounce-in hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${idx * 0.1}s` }}
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
      </div>

      <UdaanBuddy />
    </div>
  );
};

export default Home;

import { BookOpen, Sparkles, Video, Heart, Users, Trash2 } from 'lucide-react';
import { SectionCard } from '@/components/SectionCard';
import { LanguageToggle } from '@/components/LanguageToggle';
import { UdaanBuddy } from '@/components/UdaanBuddy';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen bg-background">
      <LanguageToggle />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-rainbow py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
            {t('app.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/95 font-medium">
            {t('app.subtitle')}
          </p>
          <p className="text-base md:text-lg text-white/90 mt-2 max-w-2xl mx-auto">
            {t('app.tagline')}
          </p>
        </div>
      </div>

      {/* Main Sections Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sections.map((section, idx) => (
            <SectionCard
              key={idx}
              title={section.title}
              icon={section.icon}
              gradient={section.gradient}
              onClick={() => navigate(section.route)}
            />
          ))}
        </div>
      </div>

      <UdaanBuddy />
    </div>
  );
};

export default Home;
